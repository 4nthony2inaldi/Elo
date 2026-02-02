import {
  AggregatedMetrics,
  SectorMetrics,
  DistanceMetrics,
  BrandSizeMetrics,
  BenchmarkData,
  IndustryMetrics,
  Sector,
  DistanceBucket,
  YextStatus,
  BrandSize,
  Competitiveness
} from '@/types';
import { sectorHierarchy, getIndustriesForSector } from './hierarchy';

// Sectors
export const SECTORS: Sector[] = [
  'Retail',
  'Finance',
  'Business Services',
  'Food & Beverage',
  'Healthcare',
  'Hospitality',
  'Organizations'
];

export const DISTANCE_BUCKETS: DistanceBucket[] = [
  'Within 1 mile',
  '1-3 miles',
  '3-5 miles'
];

export const BRAND_SIZES: BrandSize[] = [
  'Single Location',
  'Regional (2-49)',
  'National (50+)',
  'Unknown'
];

export const COMPETITIVENESS_LEVELS: Competitiveness[] = [
  'Uncompetitive',
  'Standard',
  'Competitive',
  'Ultra Competitive'
];

// Overall summary metrics
export const overallMetrics = {
  totalResults: 19600000,
  uniqueBusinesses: 5000000,
  keywords: 3500,
  coordinates: 87000,
  scans: 700000,
  yextBusinesses: 850000,
  nonYextBusinesses: 4150000,
  avgRankYext: 8.2,
  avgRankNonYext: 11.4,
  overallRankAdvantage: 3.2,
  avgCompletenessYext: 78.5,
  avgCompletenessNonYext: 54.2,
  completenessGap: 24.3,
  top3RateYext: 0.187,
  top3RateNonYext: 0.124,
};

// Base sector-level data
const baseSectorData: Record<Sector, { yextRankBase: number; completenessBase: number; volumeMultiplier: number }> = {
  'Retail': { yextRankBase: 7.8, completenessBase: 81, volumeMultiplier: 1.8 },
  'Finance': { yextRankBase: 6.9, completenessBase: 85, volumeMultiplier: 0.8 },
  'Business Services': { yextRankBase: 7.4, completenessBase: 77, volumeMultiplier: 0.7 },
  'Food & Beverage': { yextRankBase: 8.2, completenessBase: 75, volumeMultiplier: 1.0 },
  'Healthcare': { yextRankBase: 7.1, completenessBase: 83, volumeMultiplier: 0.9 },
  'Hospitality': { yextRankBase: 7.5, completenessBase: 80, volumeMultiplier: 0.4 },
  'Organizations': { yextRankBase: 7.8, completenessBase: 75, volumeMultiplier: 0.3 },
};

// Generate aggregated metrics including industry level
function generateAggregatedMetrics(): AggregatedMetrics[] {
  const metrics: AggregatedMetrics[] = [];

  sectorHierarchy.forEach(sectorNode => {
    const sector = sectorNode.sector;
    const sectorBase = baseSectorData[sector];

    // Generate metrics for each industry
    sectorNode.industries.forEach((industry, industryIndex) => {
      // Add some variation by industry
      const industryVariation = (industryIndex % 3 - 1) * 0.3;

      // Generate metrics for each sub-industry
      industry.subIndustries.forEach((subIndustry, subIndex) => {
        const subVariation = (subIndex % 4 - 1.5) * 0.2;

        // Generate for each distance bucket and yext status
        DISTANCE_BUCKETS.forEach(distanceBucket => {
          const distanceModifier =
            distanceBucket === 'Within 1 mile' ? 0 :
            distanceBucket === '1-3 miles' ? 0.6 : 1.2;

          // Volume decreases with distance
          const distanceVolumeMultiplier =
            distanceBucket === 'Within 1 mile' ? 1.0 :
            distanceBucket === '1-3 miles' ? 0.5 : 0.25;

          // Yext metrics
          const baseYextVolume = Math.floor(50000 * sectorBase.volumeMultiplier * distanceVolumeMultiplier);
          metrics.push({
            sector,
            industry: industry.name,
            subIndustry: subIndustry.name,
            distanceBucket,
            yextStatus: 'Yext',
            resultCount: baseYextVolume + Math.floor(Math.random() * 10000),
            uniqueBusinesses: Math.floor(baseYextVolume * 0.15),
            avgRank: Math.round((sectorBase.yextRankBase + distanceModifier + industryVariation + subVariation) * 10) / 10,
            avgCompleteness: Math.round((sectorBase.completenessBase - distanceModifier * 2 + industryVariation * 2) * 10) / 10,
            top3Rate: Math.round((0.2 - distanceModifier * 0.02 + industryVariation * 0.01) * 1000) / 1000,
          });

          // Non-Yext metrics
          const baseNonYextVolume = Math.floor(150000 * sectorBase.volumeMultiplier * distanceVolumeMultiplier);
          metrics.push({
            sector,
            industry: industry.name,
            subIndustry: subIndustry.name,
            distanceBucket,
            yextStatus: 'Not Yext',
            resultCount: baseNonYextVolume + Math.floor(Math.random() * 30000),
            uniqueBusinesses: Math.floor(baseNonYextVolume * 0.2),
            avgRank: Math.round((sectorBase.yextRankBase + 3.2 + distanceModifier + industryVariation + subVariation) * 10) / 10,
            avgCompleteness: Math.round((sectorBase.completenessBase - 25 - distanceModifier * 2 + industryVariation * 2) * 10) / 10,
            top3Rate: Math.round((0.13 - distanceModifier * 0.015 + industryVariation * 0.01) * 1000) / 1000,
          });
        });
      });
    });
  });

  return metrics;
}

export const aggregatedMetrics: AggregatedMetrics[] = generateAggregatedMetrics();

// Industry-level metrics
export function generateIndustryMetrics(): IndustryMetrics[] {
  const industryMap = new Map<string, { sector: Sector; yextData: AggregatedMetrics[]; nonYextData: AggregatedMetrics[] }>();

  aggregatedMetrics.forEach(m => {
    if (!m.industry) return;
    const key = `${m.sector}|${m.industry}`;
    if (!industryMap.has(key)) {
      industryMap.set(key, { sector: m.sector, yextData: [], nonYextData: [] });
    }
    const entry = industryMap.get(key)!;
    if (m.yextStatus === 'Yext') {
      entry.yextData.push(m);
    } else {
      entry.nonYextData.push(m);
    }
  });

  const metrics: IndustryMetrics[] = [];
  industryMap.forEach((data, key) => {
    const [, industry] = key.split('|');
    const yextTotal = data.yextData.reduce((sum, m) => sum + m.resultCount, 0);
    const nonYextTotal = data.nonYextData.reduce((sum, m) => sum + m.resultCount, 0);

    if (yextTotal === 0 || nonYextTotal === 0) return;

    const avgRankYext = data.yextData.reduce((sum, m) => sum + m.avgRank * m.resultCount, 0) / yextTotal;
    const avgRankNonYext = data.nonYextData.reduce((sum, m) => sum + m.avgRank * m.resultCount, 0) / nonYextTotal;
    const avgCompletenessYext = data.yextData.reduce((sum, m) => sum + m.avgCompleteness * m.resultCount, 0) / yextTotal;
    const avgCompletenessNonYext = data.nonYextData.reduce((sum, m) => sum + m.avgCompleteness * m.resultCount, 0) / nonYextTotal;

    metrics.push({
      sector: data.sector,
      industry,
      totalResults: yextTotal + nonYextTotal,
      uniqueBusinesses: data.yextData.reduce((sum, m) => sum + m.uniqueBusinesses, 0) +
                        data.nonYextData.reduce((sum, m) => sum + m.uniqueBusinesses, 0),
      avgRankYext: Math.round(avgRankYext * 10) / 10,
      avgRankNonYext: Math.round(avgRankNonYext * 10) / 10,
      rankAdvantage: Math.round((avgRankNonYext - avgRankYext) * 10) / 10,
      avgCompletenessYext: Math.round(avgCompletenessYext * 10) / 10,
      avgCompletenessNonYext: Math.round(avgCompletenessNonYext * 10) / 10,
      completenessGap: Math.round((avgCompletenessYext - avgCompletenessNonYext) * 10) / 10,
    });
  });

  return metrics.sort((a, b) => b.rankAdvantage - a.rankAdvantage);
}

export const industryMetrics: IndustryMetrics[] = generateIndustryMetrics();

// Sector-level summary metrics
export const sectorMetrics: SectorMetrics[] = SECTORS.map(sector => {
  const sectorData = aggregatedMetrics.filter(m => m.sector === sector);
  const yextData = sectorData.filter(m => m.yextStatus === 'Yext');
  const nonYextData = sectorData.filter(m => m.yextStatus === 'Not Yext');

  const yextTotal = yextData.reduce((sum, m) => sum + m.resultCount, 0);
  const nonYextTotal = nonYextData.reduce((sum, m) => sum + m.resultCount, 0);

  const avgRankYext = yextData.reduce((sum, m) => sum + m.avgRank * m.resultCount, 0) / yextTotal;
  const avgRankNonYext = nonYextData.reduce((sum, m) => sum + m.avgRank * m.resultCount, 0) / nonYextTotal;

  const avgCompletenessYext = yextData.reduce((sum, m) => sum + m.avgCompleteness * m.resultCount, 0) / yextTotal;
  const avgCompletenessNonYext = nonYextData.reduce((sum, m) => sum + m.avgCompleteness * m.resultCount, 0) / nonYextTotal;

  const top3RateYext = yextData.reduce((sum, m) => sum + m.top3Rate * m.resultCount, 0) / yextTotal;
  const top3RateNonYext = nonYextData.reduce((sum, m) => sum + m.top3Rate * m.resultCount, 0) / nonYextTotal;

  return {
    sector,
    totalResults: yextTotal + nonYextTotal,
    uniqueBusinesses: sectorData.reduce((sum, m) => sum + m.uniqueBusinesses, 0),
    yextCount: yextData.reduce((sum, m) => sum + m.uniqueBusinesses, 0),
    nonYextCount: nonYextData.reduce((sum, m) => sum + m.uniqueBusinesses, 0),
    avgRankYext: Math.round(avgRankYext * 10) / 10,
    avgRankNonYext: Math.round(avgRankNonYext * 10) / 10,
    rankAdvantage: Math.round((avgRankNonYext - avgRankYext) * 10) / 10,
    avgCompletenessYext: Math.round(avgCompletenessYext * 10) / 10,
    avgCompletenessNonYext: Math.round(avgCompletenessNonYext * 10) / 10,
    completenessGap: Math.round((avgCompletenessYext - avgCompletenessNonYext) * 10) / 10,
    top3RateYext: Math.round(top3RateYext * 1000) / 1000,
    top3RateNonYext: Math.round(top3RateNonYext * 1000) / 1000,
  };
});

// Distance-level metrics
export const distanceMetrics: DistanceMetrics[] = DISTANCE_BUCKETS.map(bucket => {
  const bucketData = aggregatedMetrics.filter(m => m.distanceBucket === bucket);
  const yextData = bucketData.filter(m => m.yextStatus === 'Yext');
  const nonYextData = bucketData.filter(m => m.yextStatus === 'Not Yext');

  const yextTotal = yextData.reduce((sum, m) => sum + m.resultCount, 0);
  const nonYextTotal = nonYextData.reduce((sum, m) => sum + m.resultCount, 0);

  const yextAvgRank = yextData.reduce((sum, m) => sum + m.avgRank * m.resultCount, 0) / yextTotal;
  const nonYextAvgRank = nonYextData.reduce((sum, m) => sum + m.avgRank * m.resultCount, 0) / nonYextTotal;

  const yextTop3Rate = yextData.reduce((sum, m) => sum + m.top3Rate * m.resultCount, 0) / yextTotal;
  const nonYextTop3Rate = nonYextData.reduce((sum, m) => sum + m.top3Rate * m.resultCount, 0) / nonYextTotal;

  return {
    distanceBucket: bucket,
    yextAvgRank: Math.round(yextAvgRank * 10) / 10,
    nonYextAvgRank: Math.round(nonYextAvgRank * 10) / 10,
    rankAdvantage: Math.round((nonYextAvgRank - yextAvgRank) * 10) / 10,
    yextTop3Rate: Math.round(yextTop3Rate * 1000) / 1000,
    nonYextTop3Rate: Math.round(nonYextTop3Rate * 1000) / 1000,
  };
});

// Brand size metrics
export const brandSizeMetrics: BrandSizeMetrics[] = [
  { brandSize: 'Single Location', yextAvgRank: 9.2, nonYextAvgRank: 11.8, rankAdvantage: 2.6 },
  { brandSize: 'Regional (2-49)', yextAvgRank: 8.1, nonYextAvgRank: 11.2, rankAdvantage: 3.1 },
  { brandSize: 'National (50+)', yextAvgRank: 7.4, nonYextAvgRank: 10.5, rankAdvantage: 3.1 },
  { brandSize: 'Unknown', yextAvgRank: 8.5, nonYextAvgRank: 11.5, rankAdvantage: 3.0 },
];

// Benchmark data
export const benchmarkData: BenchmarkData[] = [];

// Generate benchmark data for all combinations
SECTORS.forEach(sector => {
  DISTANCE_BUCKETS.forEach(distanceBucket => {
    COMPETITIVENESS_LEVELS.forEach(competitiveness => {
      const baseCompleteness =
        competitiveness === 'Ultra Competitive' ? 82 :
        competitiveness === 'Competitive' ? 75 :
        competitiveness === 'Standard' ? 68 : 58;

      const distanceModifier =
        distanceBucket === 'Within 1 mile' ? 5 :
        distanceBucket === '1-3 miles' ? 0 : -5;

      benchmarkData.push({
        sector,
        distanceBucket,
        competitiveness,
        avgTop3Completeness: baseCompleteness + distanceModifier + Math.random() * 5,
        avgTop10Completeness: baseCompleteness + distanceModifier - 8 + Math.random() * 5,
        medianRank: competitiveness === 'Ultra Competitive' ? 12 :
                    competitiveness === 'Competitive' ? 9 :
                    competitiveness === 'Standard' ? 7 : 5,
        businessCount: Math.floor(Math.random() * 50000) + 10000,
      });
    });
  });
});

// Extended filter function supporting hierarchy
export interface HierarchyFilter {
  sectors: Sector[];
  industries: string[];
  subIndustries: string[];
  keywords: string[];
  distanceBuckets: DistanceBucket[];
}

export function filterAggregatedData(
  sectors: Sector[],
  distanceBuckets: DistanceBucket[],
  yextStatus: YextStatus | 'all',
  industries?: string[],
  subIndustries?: string[]
): AggregatedMetrics[] {
  return aggregatedMetrics.filter(m => {
    const sectorMatch = sectors.length === 0 || sectors.includes(m.sector);
    const distanceMatch = distanceBuckets.length === 0 || distanceBuckets.includes(m.distanceBucket);
    const yextMatch = yextStatus === 'all' || m.yextStatus === yextStatus;
    const industryMatch = !industries || industries.length === 0 || (m.industry && industries.includes(m.industry));
    const subIndustryMatch = !subIndustries || subIndustries.length === 0 || (m.subIndustry && subIndustries.includes(m.subIndustry));
    return sectorMatch && distanceMatch && yextMatch && industryMatch && subIndustryMatch;
  });
}

// Helper to compute comparison metrics from filtered data
export function computeComparisonMetrics(data: AggregatedMetrics[]) {
  const yextData = data.filter(m => m.yextStatus === 'Yext');
  const nonYextData = data.filter(m => m.yextStatus === 'Not Yext');

  const yextTotal = yextData.reduce((sum, m) => sum + m.resultCount, 0);
  const nonYextTotal = nonYextData.reduce((sum, m) => sum + m.resultCount, 0);

  if (yextTotal === 0 || nonYextTotal === 0) {
    return null;
  }

  const avgRankYext = yextData.reduce((sum, m) => sum + m.avgRank * m.resultCount, 0) / yextTotal;
  const avgRankNonYext = nonYextData.reduce((sum, m) => sum + m.avgRank * m.resultCount, 0) / nonYextTotal;

  const avgCompletenessYext = yextData.reduce((sum, m) => sum + m.avgCompleteness * m.resultCount, 0) / yextTotal;
  const avgCompletenessNonYext = nonYextData.reduce((sum, m) => sum + m.avgCompleteness * m.resultCount, 0) / nonYextTotal;

  const top3RateYext = yextData.reduce((sum, m) => sum + m.top3Rate * m.resultCount, 0) / yextTotal;
  const top3RateNonYext = nonYextData.reduce((sum, m) => sum + m.top3Rate * m.resultCount, 0) / nonYextTotal;

  const uniqueYext = yextData.reduce((sum, m) => sum + m.uniqueBusinesses, 0);
  const uniqueNonYext = nonYextData.reduce((sum, m) => sum + m.uniqueBusinesses, 0);

  return {
    yextResults: yextTotal,
    nonYextResults: nonYextTotal,
    yextBusinesses: uniqueYext,
    nonYextBusinesses: uniqueNonYext,
    avgRankYext: Math.round(avgRankYext * 10) / 10,
    avgRankNonYext: Math.round(avgRankNonYext * 10) / 10,
    rankAdvantage: Math.round((avgRankNonYext - avgRankYext) * 10) / 10,
    avgCompletenessYext: Math.round(avgCompletenessYext * 10) / 10,
    avgCompletenessNonYext: Math.round(avgCompletenessNonYext * 10) / 10,
    completenessGap: Math.round((avgCompletenessYext - avgCompletenessNonYext) * 10) / 10,
    top3RateYext: Math.round(top3RateYext * 1000) / 1000,
    top3RateNonYext: Math.round(top3RateNonYext * 1000) / 1000,
    top3Improvement: Math.round(((top3RateYext / top3RateNonYext) - 1) * 100),
  };
}

// Get available industries for selected sectors
export function getAvailableIndustries(sectors: Sector[]): string[] {
  if (sectors.length === 0) {
    return sectorHierarchy.flatMap(s => s.industries.map(i => i.name));
  }
  return sectors.flatMap(sector => getIndustriesForSector(sector));
}

// Get available sub-industries for selected industries
export function getAvailableSubIndustries(sectors: Sector[], industries: string[]): string[] {
  const filteredHierarchy = sectors.length === 0
    ? sectorHierarchy
    : sectorHierarchy.filter(s => sectors.includes(s.sector));

  const subIndustries: string[] = [];
  filteredHierarchy.forEach(s => {
    s.industries.forEach(i => {
      if (industries.length === 0 || industries.includes(i.name)) {
        i.subIndustries.forEach(sub => {
          if (!subIndustries.includes(sub.name)) {
            subIndustries.push(sub.name);
          }
        });
      }
    });
  });
  return subIndustries;
}

// Get available keywords for selected sub-industries
export function getAvailableKeywords(sectors: Sector[], industries: string[], subIndustries: string[]): string[] {
  const filteredHierarchy = sectors.length === 0
    ? sectorHierarchy
    : sectorHierarchy.filter(s => sectors.includes(s.sector));

  const keywords: string[] = [];
  filteredHierarchy.forEach(s => {
    s.industries.forEach(i => {
      if (industries.length === 0 || industries.includes(i.name)) {
        i.subIndustries.forEach(sub => {
          if (subIndustries.length === 0 || subIndustries.includes(sub.name)) {
            sub.keywords.forEach(kw => {
              if (!keywords.includes(kw)) {
                keywords.push(kw);
              }
            });
          }
        });
      }
    });
  });
  return keywords;
}
