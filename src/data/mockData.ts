import {
  AggregatedMetrics,
  SectorMetrics,
  DistanceMetrics,
  BrandSizeMetrics,
  BenchmarkData,
  Sector,
  DistanceBucket,
  YextStatus,
  BrandSize,
  Competitiveness
} from '@/types';

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

// Aggregated metrics by sector, distance, and Yext status
export const aggregatedMetrics: AggregatedMetrics[] = [
  // Retail
  { sector: 'Retail', distanceBucket: 'Within 1 mile', yextStatus: 'Yext', resultCount: 1850000, uniqueBusinesses: 245000, avgRank: 7.8, avgCompleteness: 81.2, top3Rate: 0.198 },
  { sector: 'Retail', distanceBucket: 'Within 1 mile', yextStatus: 'Not Yext', resultCount: 4200000, uniqueBusinesses: 890000, avgRank: 10.9, avgCompleteness: 52.8, top3Rate: 0.132 },
  { sector: 'Retail', distanceBucket: '1-3 miles', yextStatus: 'Yext', resultCount: 980000, uniqueBusinesses: 178000, avgRank: 8.4, avgCompleteness: 79.8, top3Rate: 0.175 },
  { sector: 'Retail', distanceBucket: '1-3 miles', yextStatus: 'Not Yext', resultCount: 2100000, uniqueBusinesses: 520000, avgRank: 11.8, avgCompleteness: 51.2, top3Rate: 0.118 },
  { sector: 'Retail', distanceBucket: '3-5 miles', yextStatus: 'Yext', resultCount: 420000, uniqueBusinesses: 95000, avgRank: 9.2, avgCompleteness: 77.5, top3Rate: 0.152 },
  { sector: 'Retail', distanceBucket: '3-5 miles', yextStatus: 'Not Yext', resultCount: 890000, uniqueBusinesses: 285000, avgRank: 12.6, avgCompleteness: 49.8, top3Rate: 0.098 },

  // Finance
  { sector: 'Finance', distanceBucket: 'Within 1 mile', yextStatus: 'Yext', resultCount: 620000, uniqueBusinesses: 82000, avgRank: 6.9, avgCompleteness: 85.4, top3Rate: 0.224 },
  { sector: 'Finance', distanceBucket: 'Within 1 mile', yextStatus: 'Not Yext', resultCount: 1450000, uniqueBusinesses: 310000, avgRank: 10.2, avgCompleteness: 58.6, top3Rate: 0.145 },
  { sector: 'Finance', distanceBucket: '1-3 miles', yextStatus: 'Yext', resultCount: 340000, uniqueBusinesses: 58000, avgRank: 7.6, avgCompleteness: 83.8, top3Rate: 0.198 },
  { sector: 'Finance', distanceBucket: '1-3 miles', yextStatus: 'Not Yext', resultCount: 720000, uniqueBusinesses: 185000, avgRank: 11.1, avgCompleteness: 56.2, top3Rate: 0.128 },
  { sector: 'Finance', distanceBucket: '3-5 miles', yextStatus: 'Yext', resultCount: 145000, uniqueBusinesses: 32000, avgRank: 8.4, avgCompleteness: 81.2, top3Rate: 0.168 },
  { sector: 'Finance', distanceBucket: '3-5 miles', yextStatus: 'Not Yext', resultCount: 320000, uniqueBusinesses: 98000, avgRank: 12.2, avgCompleteness: 53.8, top3Rate: 0.105 },

  // Business Services
  { sector: 'Business Services', distanceBucket: 'Within 1 mile', yextStatus: 'Yext', resultCount: 480000, uniqueBusinesses: 68000, avgRank: 7.4, avgCompleteness: 76.8, top3Rate: 0.205 },
  { sector: 'Business Services', distanceBucket: 'Within 1 mile', yextStatus: 'Not Yext', resultCount: 1180000, uniqueBusinesses: 275000, avgRank: 10.8, avgCompleteness: 51.4, top3Rate: 0.138 },
  { sector: 'Business Services', distanceBucket: '1-3 miles', yextStatus: 'Yext', resultCount: 265000, uniqueBusinesses: 48000, avgRank: 8.1, avgCompleteness: 74.5, top3Rate: 0.182 },
  { sector: 'Business Services', distanceBucket: '1-3 miles', yextStatus: 'Not Yext', resultCount: 590000, uniqueBusinesses: 162000, avgRank: 11.5, avgCompleteness: 49.8, top3Rate: 0.122 },
  { sector: 'Business Services', distanceBucket: '3-5 miles', yextStatus: 'Yext', resultCount: 112000, uniqueBusinesses: 26000, avgRank: 8.9, avgCompleteness: 72.2, top3Rate: 0.158 },
  { sector: 'Business Services', distanceBucket: '3-5 miles', yextStatus: 'Not Yext', resultCount: 248000, uniqueBusinesses: 85000, avgRank: 12.4, avgCompleteness: 47.5, top3Rate: 0.102 },

  // Food & Beverage
  { sector: 'Food & Beverage', distanceBucket: 'Within 1 mile', yextStatus: 'Yext', resultCount: 720000, uniqueBusinesses: 95000, avgRank: 8.2, avgCompleteness: 74.5, top3Rate: 0.178 },
  { sector: 'Food & Beverage', distanceBucket: 'Within 1 mile', yextStatus: 'Not Yext', resultCount: 1680000, uniqueBusinesses: 420000, avgRank: 11.6, avgCompleteness: 56.8, top3Rate: 0.125 },
  { sector: 'Food & Beverage', distanceBucket: '1-3 miles', yextStatus: 'Yext', resultCount: 395000, uniqueBusinesses: 68000, avgRank: 8.9, avgCompleteness: 72.8, top3Rate: 0.158 },
  { sector: 'Food & Beverage', distanceBucket: '1-3 miles', yextStatus: 'Not Yext', resultCount: 840000, uniqueBusinesses: 248000, avgRank: 12.2, avgCompleteness: 54.2, top3Rate: 0.112 },
  { sector: 'Food & Beverage', distanceBucket: '3-5 miles', yextStatus: 'Yext', resultCount: 168000, uniqueBusinesses: 38000, avgRank: 9.6, avgCompleteness: 70.5, top3Rate: 0.142 },
  { sector: 'Food & Beverage', distanceBucket: '3-5 miles', yextStatus: 'Not Yext', resultCount: 365000, uniqueBusinesses: 125000, avgRank: 13.1, avgCompleteness: 52.1, top3Rate: 0.095 },

  // Healthcare
  { sector: 'Healthcare', distanceBucket: 'Within 1 mile', yextStatus: 'Yext', resultCount: 580000, uniqueBusinesses: 78000, avgRank: 7.1, avgCompleteness: 82.8, top3Rate: 0.218 },
  { sector: 'Healthcare', distanceBucket: 'Within 1 mile', yextStatus: 'Not Yext', resultCount: 1320000, uniqueBusinesses: 345000, avgRank: 10.4, avgCompleteness: 55.2, top3Rate: 0.142 },
  { sector: 'Healthcare', distanceBucket: '1-3 miles', yextStatus: 'Yext', resultCount: 318000, uniqueBusinesses: 55000, avgRank: 7.8, avgCompleteness: 80.5, top3Rate: 0.195 },
  { sector: 'Healthcare', distanceBucket: '1-3 miles', yextStatus: 'Not Yext', resultCount: 685000, uniqueBusinesses: 205000, avgRank: 11.2, avgCompleteness: 53.5, top3Rate: 0.125 },
  { sector: 'Healthcare', distanceBucket: '3-5 miles', yextStatus: 'Yext', resultCount: 135000, uniqueBusinesses: 30000, avgRank: 8.5, avgCompleteness: 78.2, top3Rate: 0.172 },
  { sector: 'Healthcare', distanceBucket: '3-5 miles', yextStatus: 'Not Yext', resultCount: 298000, uniqueBusinesses: 102000, avgRank: 12.0, avgCompleteness: 51.8, top3Rate: 0.108 },

  // Hospitality
  { sector: 'Hospitality', distanceBucket: 'Within 1 mile', yextStatus: 'Yext', resultCount: 285000, uniqueBusinesses: 42000, avgRank: 7.5, avgCompleteness: 79.5, top3Rate: 0.195 },
  { sector: 'Hospitality', distanceBucket: 'Within 1 mile', yextStatus: 'Not Yext', resultCount: 680000, uniqueBusinesses: 168000, avgRank: 10.6, avgCompleteness: 58.2, top3Rate: 0.138 },
  { sector: 'Hospitality', distanceBucket: '1-3 miles', yextStatus: 'Yext', resultCount: 158000, uniqueBusinesses: 30000, avgRank: 8.2, avgCompleteness: 77.8, top3Rate: 0.175 },
  { sector: 'Hospitality', distanceBucket: '1-3 miles', yextStatus: 'Not Yext', resultCount: 345000, uniqueBusinesses: 98000, avgRank: 11.4, avgCompleteness: 55.8, top3Rate: 0.118 },
  { sector: 'Hospitality', distanceBucket: '3-5 miles', yextStatus: 'Yext', resultCount: 68000, uniqueBusinesses: 16000, avgRank: 8.9, avgCompleteness: 75.5, top3Rate: 0.155 },
  { sector: 'Hospitality', distanceBucket: '3-5 miles', yextStatus: 'Not Yext', resultCount: 148000, uniqueBusinesses: 52000, avgRank: 12.1, avgCompleteness: 53.2, top3Rate: 0.098 },

  // Organizations
  { sector: 'Organizations', distanceBucket: 'Within 1 mile', yextStatus: 'Yext', resultCount: 165000, uniqueBusinesses: 28000, avgRank: 7.8, avgCompleteness: 75.2, top3Rate: 0.185 },
  { sector: 'Organizations', distanceBucket: 'Within 1 mile', yextStatus: 'Not Yext', resultCount: 420000, uniqueBusinesses: 115000, avgRank: 11.0, avgCompleteness: 52.5, top3Rate: 0.128 },
  { sector: 'Organizations', distanceBucket: '1-3 miles', yextStatus: 'Yext', resultCount: 92000, uniqueBusinesses: 19000, avgRank: 8.5, avgCompleteness: 73.5, top3Rate: 0.165 },
  { sector: 'Organizations', distanceBucket: '1-3 miles', yextStatus: 'Not Yext', resultCount: 215000, uniqueBusinesses: 68000, avgRank: 11.7, avgCompleteness: 50.2, top3Rate: 0.112 },
  { sector: 'Organizations', distanceBucket: '3-5 miles', yextStatus: 'Yext', resultCount: 40000, uniqueBusinesses: 10000, avgRank: 9.1, avgCompleteness: 71.2, top3Rate: 0.148 },
  { sector: 'Organizations', distanceBucket: '3-5 miles', yextStatus: 'Not Yext', resultCount: 92000, uniqueBusinesses: 35000, avgRank: 12.5, avgCompleteness: 48.5, top3Rate: 0.092 },
];

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

// Helper function to filter and aggregate data
export function filterAggregatedData(
  sectors: Sector[],
  distanceBuckets: DistanceBucket[],
  yextStatus: YextStatus | 'all'
): AggregatedMetrics[] {
  return aggregatedMetrics.filter(m => {
    const sectorMatch = sectors.length === 0 || sectors.includes(m.sector);
    const distanceMatch = distanceBuckets.length === 0 || distanceBuckets.includes(m.distanceBucket);
    const yextMatch = yextStatus === 'all' || m.yextStatus === yextStatus;
    return sectorMatch && distanceMatch && yextMatch;
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
