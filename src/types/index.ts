// Scout Data Types

export type Sector =
  | 'Retail'
  | 'Finance'
  | 'Business Services'
  | 'Food & Beverage'
  | 'Healthcare'
  | 'Hospitality'
  | 'Organizations';

export type DistanceBucket = 'Within 1 mile' | '1-3 miles' | '3-5 miles';

export type YextStatus = 'Yext' | 'Not Yext';

export type BrandSize = 'Single Location' | 'Regional (2-49)' | 'National (50+)' | 'Unknown';

export type Competitiveness = 'Uncompetitive' | 'Standard' | 'Competitive' | 'Ultra Competitive';

// Hierarchy: Sector > Industry > SubIndustry > Keyword
export interface Industry {
  name: string;
  sector: Sector;
}

export interface SubIndustry {
  name: string;
  industry: string;
  sector: Sector;
}

export interface Keyword {
  name: string;
  subIndustry: string;
  industry: string;
  sector: Sector;
}

export interface HierarchyNode {
  sector: Sector;
  industries: {
    name: string;
    subIndustries: {
      name: string;
      keywords: string[];
    }[];
  }[];
}

export interface AggregatedMetrics {
  sector: Sector;
  industry?: string;
  subIndustry?: string;
  keyword?: string;
  distanceBucket: DistanceBucket;
  yextStatus: YextStatus;
  resultCount: number;
  uniqueBusinesses: number;
  avgRank: number;
  avgCompleteness: number;
  top3Rate: number;
}

export interface SectorMetrics {
  sector: Sector;
  totalResults: number;
  uniqueBusinesses: number;
  yextCount: number;
  nonYextCount: number;
  avgRankYext: number;
  avgRankNonYext: number;
  rankAdvantage: number;
  avgCompletenessYext: number;
  avgCompletenessNonYext: number;
  completenessGap: number;
  top3RateYext: number;
  top3RateNonYext: number;
}

export interface IndustryMetrics {
  sector: Sector;
  industry: string;
  totalResults: number;
  uniqueBusinesses: number;
  avgRankYext: number;
  avgRankNonYext: number;
  rankAdvantage: number;
  avgCompletenessYext: number;
  avgCompletenessNonYext: number;
  completenessGap: number;
}

export interface DistanceMetrics {
  distanceBucket: DistanceBucket;
  yextAvgRank: number;
  nonYextAvgRank: number;
  rankAdvantage: number;
  yextTop3Rate: number;
  nonYextTop3Rate: number;
}

export interface BrandSizeMetrics {
  brandSize: BrandSize;
  yextAvgRank: number;
  nonYextAvgRank: number;
  rankAdvantage: number;
}

export interface BenchmarkData {
  sector: Sector;
  industry?: string;
  subIndustry?: string;
  distanceBucket: DistanceBucket;
  competitiveness: Competitiveness;
  avgTop3Completeness: number;
  avgTop10Completeness: number;
  medianRank: number;
  businessCount: number;
}

export interface FilterState {
  sectors: Sector[];
  industries: string[];
  subIndustries: string[];
  keywords: string[];
  distanceBuckets: DistanceBucket[];
  brandSizes: BrandSize[];
  yextStatus: YextStatus | 'all';
}

export interface ProofPoint {
  text: string;
  category: string;
  filters: Partial<FilterState>;
}
