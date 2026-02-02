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

export interface AggregatedMetrics {
  sector: Sector;
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
  distanceBucket: DistanceBucket;
  competitiveness: Competitiveness;
  avgTop3Completeness: number;
  avgTop10Completeness: number;
  medianRank: number;
  businessCount: number;
}

export interface FilterState {
  sectors: Sector[];
  distanceBuckets: DistanceBucket[];
  brandSizes: BrandSize[];
  yextStatus: YextStatus | 'all';
}

export interface ProofPoint {
  text: string;
  category: string;
  filters: Partial<FilterState>;
}
