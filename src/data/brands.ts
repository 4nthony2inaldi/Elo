import { Brand, BrandMetrics, BrandComparison, Sector, BrandSize } from '@/types';

// Mock brands across different sectors and industries
export const brands: BrandMetrics[] = [
  // Healthcare - Pharmacy
  { brandName: 'CVS Pharmacy', sector: 'Healthcare', industry: 'Pharmacy', brandSize: 'National (50+)', isYext: true, locationCount: 9900, avgRank: 4.2, avgCompleteness: 89.5, top3Rate: 0.42, totalAppearances: 285000, scanSearchIds: ['h1', 'h2', 'h3', 'h4', 'h5'] },
  { brandName: 'Walgreens', sector: 'Healthcare', industry: 'Pharmacy', brandSize: 'National (50+)', isYext: true, locationCount: 8800, avgRank: 4.8, avgCompleteness: 87.2, top3Rate: 0.38, totalAppearances: 275000, scanSearchIds: ['h1', 'h2', 'h3', 'h4', 'h6'] },
  { brandName: 'Rite Aid', sector: 'Healthcare', industry: 'Pharmacy', brandSize: 'National (50+)', isYext: false, locationCount: 2400, avgRank: 7.2, avgCompleteness: 62.4, top3Rate: 0.22, totalAppearances: 125000, scanSearchIds: ['h1', 'h2', 'h5', 'h6'] },
  { brandName: 'Walmart Pharmacy', sector: 'Healthcare', industry: 'Pharmacy', brandSize: 'National (50+)', isYext: false, locationCount: 5000, avgRank: 6.1, avgCompleteness: 71.8, top3Rate: 0.28, totalAppearances: 195000, scanSearchIds: ['h1', 'h3', 'h4', 'h5'] },
  { brandName: 'Costco Pharmacy', sector: 'Healthcare', industry: 'Pharmacy', brandSize: 'National (50+)', isYext: false, locationCount: 590, avgRank: 8.4, avgCompleteness: 58.2, top3Rate: 0.15, totalAppearances: 45000, scanSearchIds: ['h2', 'h4', 'h6'] },

  // Healthcare - Dental
  { brandName: 'Aspen Dental', sector: 'Healthcare', industry: 'Dental', brandSize: 'National (50+)', isYext: true, locationCount: 1000, avgRank: 5.1, avgCompleteness: 85.6, top3Rate: 0.35, totalAppearances: 89000, scanSearchIds: ['d1', 'd2', 'd3'] },
  { brandName: 'Heartland Dental', sector: 'Healthcare', industry: 'Dental', brandSize: 'National (50+)', isYext: true, locationCount: 1700, avgRank: 5.8, avgCompleteness: 82.1, top3Rate: 0.31, totalAppearances: 78000, scanSearchIds: ['d1', 'd2', 'd4'] },
  { brandName: 'Pacific Dental', sector: 'Healthcare', industry: 'Dental', brandSize: 'National (50+)', isYext: false, locationCount: 900, avgRank: 7.9, avgCompleteness: 64.5, top3Rate: 0.19, totalAppearances: 52000, scanSearchIds: ['d1', 'd3', 'd4'] },

  // Healthcare - Urgent Care
  { brandName: 'CityMD', sector: 'Healthcare', industry: 'Urgent & Emergency', brandSize: 'Regional (2-49)', isYext: true, locationCount: 170, avgRank: 3.8, avgCompleteness: 91.2, top3Rate: 0.48, totalAppearances: 42000, scanSearchIds: ['u1', 'u2'] },
  { brandName: 'GoHealth Urgent Care', sector: 'Healthcare', industry: 'Urgent & Emergency', brandSize: 'National (50+)', isYext: true, locationCount: 200, avgRank: 4.5, avgCompleteness: 88.4, top3Rate: 0.41, totalAppearances: 38000, scanSearchIds: ['u1', 'u3'] },
  { brandName: 'MedExpress', sector: 'Healthcare', industry: 'Urgent & Emergency', brandSize: 'National (50+)', isYext: false, locationCount: 250, avgRank: 6.8, avgCompleteness: 72.1, top3Rate: 0.26, totalAppearances: 35000, scanSearchIds: ['u1', 'u2', 'u3'] },

  // Finance - Banking
  { brandName: 'Chase Bank', sector: 'Finance', industry: 'Banking', brandSize: 'National (50+)', isYext: true, locationCount: 4700, avgRank: 3.2, avgCompleteness: 94.5, top3Rate: 0.52, totalAppearances: 420000, scanSearchIds: ['b1', 'b2', 'b3', 'b4', 'b5'] },
  { brandName: 'Bank of America', sector: 'Finance', industry: 'Banking', brandSize: 'National (50+)', isYext: true, locationCount: 3800, avgRank: 3.8, avgCompleteness: 92.1, top3Rate: 0.48, totalAppearances: 385000, scanSearchIds: ['b1', 'b2', 'b3', 'b4', 'b6'] },
  { brandName: 'Wells Fargo', sector: 'Finance', industry: 'Banking', brandSize: 'National (50+)', isYext: true, locationCount: 4500, avgRank: 4.1, avgCompleteness: 91.8, top3Rate: 0.45, totalAppearances: 395000, scanSearchIds: ['b1', 'b2', 'b3', 'b5', 'b6'] },
  { brandName: 'PNC Bank', sector: 'Finance', industry: 'Banking', brandSize: 'National (50+)', isYext: false, locationCount: 2600, avgRank: 5.8, avgCompleteness: 78.4, top3Rate: 0.32, totalAppearances: 185000, scanSearchIds: ['b1', 'b3', 'b4'] },
  { brandName: 'TD Bank', sector: 'Finance', industry: 'Banking', brandSize: 'National (50+)', isYext: false, locationCount: 1200, avgRank: 6.2, avgCompleteness: 74.2, top3Rate: 0.28, totalAppearances: 125000, scanSearchIds: ['b2', 'b4', 'b5'] },
  { brandName: 'US Bank', sector: 'Finance', industry: 'Banking', brandSize: 'National (50+)', isYext: false, locationCount: 2200, avgRank: 5.5, avgCompleteness: 76.8, top3Rate: 0.30, totalAppearances: 165000, scanSearchIds: ['b1', 'b2', 'b6'] },

  // Finance - Insurance
  { brandName: 'State Farm', sector: 'Finance', industry: 'Insurance', brandSize: 'National (50+)', isYext: true, locationCount: 19000, avgRank: 4.5, avgCompleteness: 86.2, top3Rate: 0.38, totalAppearances: 520000, scanSearchIds: ['i1', 'i2', 'i3', 'i4'] },
  { brandName: 'Allstate', sector: 'Finance', industry: 'Insurance', brandSize: 'National (50+)', isYext: true, locationCount: 10000, avgRank: 5.2, avgCompleteness: 84.5, top3Rate: 0.34, totalAppearances: 380000, scanSearchIds: ['i1', 'i2', 'i3', 'i5'] },
  { brandName: 'Farmers Insurance', sector: 'Finance', industry: 'Insurance', brandSize: 'National (50+)', isYext: false, locationCount: 14000, avgRank: 6.8, avgCompleteness: 68.2, top3Rate: 0.24, totalAppearances: 295000, scanSearchIds: ['i1', 'i2', 'i4', 'i5'] },
  { brandName: 'Progressive', sector: 'Finance', industry: 'Insurance', brandSize: 'National (50+)', isYext: false, locationCount: 500, avgRank: 8.2, avgCompleteness: 62.4, top3Rate: 0.18, totalAppearances: 85000, scanSearchIds: ['i2', 'i3'] },

  // Retail - Grocery
  { brandName: 'Kroger', sector: 'Retail', industry: 'Grocery & Supermarkets', brandSize: 'National (50+)', isYext: true, locationCount: 2750, avgRank: 3.5, avgCompleteness: 91.2, top3Rate: 0.49, totalAppearances: 310000, scanSearchIds: ['g1', 'g2', 'g3', 'g4'] },
  { brandName: 'Publix', sector: 'Retail', industry: 'Grocery & Supermarkets', brandSize: 'National (50+)', isYext: true, locationCount: 1350, avgRank: 4.1, avgCompleteness: 89.8, top3Rate: 0.44, totalAppearances: 185000, scanSearchIds: ['g1', 'g2', 'g5'] },
  { brandName: 'Safeway', sector: 'Retail', industry: 'Grocery & Supermarkets', brandSize: 'National (50+)', isYext: true, locationCount: 900, avgRank: 4.8, avgCompleteness: 87.5, top3Rate: 0.39, totalAppearances: 145000, scanSearchIds: ['g1', 'g3', 'g4'] },
  { brandName: 'Whole Foods', sector: 'Retail', industry: 'Grocery & Supermarkets', brandSize: 'National (50+)', isYext: false, locationCount: 500, avgRank: 5.2, avgCompleteness: 82.1, top3Rate: 0.35, totalAppearances: 95000, scanSearchIds: ['g2', 'g3', 'g5'] },
  { brandName: 'Trader Joe\'s', sector: 'Retail', industry: 'Grocery & Supermarkets', brandSize: 'National (50+)', isYext: false, locationCount: 560, avgRank: 5.8, avgCompleteness: 78.4, top3Rate: 0.31, totalAppearances: 88000, scanSearchIds: ['g1', 'g4', 'g5'] },
  { brandName: 'ALDI', sector: 'Retail', industry: 'Grocery & Supermarkets', brandSize: 'National (50+)', isYext: false, locationCount: 2200, avgRank: 6.5, avgCompleteness: 72.8, top3Rate: 0.26, totalAppearances: 165000, scanSearchIds: ['g2', 'g3', 'g4'] },

  // Food & Beverage - Quick Service
  { brandName: 'McDonald\'s', sector: 'Food & Beverage', industry: 'Quick Service', brandSize: 'National (50+)', isYext: true, locationCount: 13400, avgRank: 3.1, avgCompleteness: 92.4, top3Rate: 0.54, totalAppearances: 890000, scanSearchIds: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] },
  { brandName: 'Starbucks', sector: 'Food & Beverage', industry: 'Cafes & Coffee', brandSize: 'National (50+)', isYext: true, locationCount: 16000, avgRank: 2.8, avgCompleteness: 94.1, top3Rate: 0.58, totalAppearances: 920000, scanSearchIds: ['c1', 'c2', 'c3', 'c4'] },
  { brandName: 'Chick-fil-A', sector: 'Food & Beverage', industry: 'Quick Service', brandSize: 'National (50+)', isYext: true, locationCount: 3000, avgRank: 3.5, avgCompleteness: 90.8, top3Rate: 0.51, totalAppearances: 425000, scanSearchIds: ['f1', 'f2', 'f3', 'f5'] },
  { brandName: 'Wendy\'s', sector: 'Food & Beverage', industry: 'Quick Service', brandSize: 'National (50+)', isYext: false, locationCount: 5700, avgRank: 5.8, avgCompleteness: 74.2, top3Rate: 0.32, totalAppearances: 385000, scanSearchIds: ['f1', 'f2', 'f4', 'f6'] },
  { brandName: 'Burger King', sector: 'Food & Beverage', industry: 'Quick Service', brandSize: 'National (50+)', isYext: false, locationCount: 7000, avgRank: 6.2, avgCompleteness: 71.5, top3Rate: 0.28, totalAppearances: 420000, scanSearchIds: ['f1', 'f3', 'f4', 'f5'] },
  { brandName: 'Taco Bell', sector: 'Food & Beverage', industry: 'Quick Service', brandSize: 'National (50+)', isYext: false, locationCount: 8200, avgRank: 5.5, avgCompleteness: 76.8, top3Rate: 0.34, totalAppearances: 465000, scanSearchIds: ['f2', 'f3', 'f5', 'f6'] },

  // Food & Beverage - Coffee
  { brandName: 'Dunkin\'', sector: 'Food & Beverage', industry: 'Cafes & Coffee', brandSize: 'National (50+)', isYext: true, locationCount: 9500, avgRank: 3.2, avgCompleteness: 88.5, top3Rate: 0.52, totalAppearances: 580000, scanSearchIds: ['c1', 'c2', 'c3', 'c5'] },
  { brandName: 'Peet\'s Coffee', sector: 'Food & Beverage', industry: 'Cafes & Coffee', brandSize: 'National (50+)', isYext: false, locationCount: 350, avgRank: 6.8, avgCompleteness: 72.4, top3Rate: 0.25, totalAppearances: 42000, scanSearchIds: ['c1', 'c4'] },
  { brandName: 'Dutch Bros', sector: 'Food & Beverage', industry: 'Cafes & Coffee', brandSize: 'National (50+)', isYext: false, locationCount: 800, avgRank: 5.5, avgCompleteness: 78.2, top3Rate: 0.35, totalAppearances: 68000, scanSearchIds: ['c2', 'c3', 'c5'] },

  // Hospitality - Hotels
  { brandName: 'Marriott', sector: 'Hospitality', industry: 'Lodging', brandSize: 'National (50+)', isYext: true, locationCount: 8500, avgRank: 3.8, avgCompleteness: 91.2, top3Rate: 0.47, totalAppearances: 520000, scanSearchIds: ['l1', 'l2', 'l3', 'l4'] },
  { brandName: 'Hilton', sector: 'Hospitality', industry: 'Lodging', brandSize: 'National (50+)', isYext: true, locationCount: 7200, avgRank: 4.2, avgCompleteness: 89.8, top3Rate: 0.43, totalAppearances: 485000, scanSearchIds: ['l1', 'l2', 'l3', 'l5'] },
  { brandName: 'Hyatt', sector: 'Hospitality', industry: 'Lodging', brandSize: 'National (50+)', isYext: true, locationCount: 1200, avgRank: 4.8, avgCompleteness: 87.4, top3Rate: 0.38, totalAppearances: 145000, scanSearchIds: ['l1', 'l3', 'l4'] },
  { brandName: 'IHG', sector: 'Hospitality', industry: 'Lodging', brandSize: 'National (50+)', isYext: false, locationCount: 6000, avgRank: 5.8, avgCompleteness: 78.2, top3Rate: 0.31, totalAppearances: 380000, scanSearchIds: ['l2', 'l3', 'l5'] },
  { brandName: 'Wyndham', sector: 'Hospitality', industry: 'Lodging', brandSize: 'National (50+)', isYext: false, locationCount: 9000, avgRank: 6.5, avgCompleteness: 72.5, top3Rate: 0.26, totalAppearances: 425000, scanSearchIds: ['l1', 'l4', 'l5'] },
];

// Get all unique brand names for search
export function getAllBrandNames(): string[] {
  return brands.map(b => b.brandName).sort();
}

// Search brands by name
export function searchBrands(query: string): BrandMetrics[] {
  const lowerQuery = query.toLowerCase();
  return brands.filter(b =>
    b.brandName.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => {
    // Exact match first, then starts with, then contains
    const aLower = a.brandName.toLowerCase();
    const bLower = b.brandName.toLowerCase();
    if (aLower === lowerQuery) return -1;
    if (bLower === lowerQuery) return 1;
    if (aLower.startsWith(lowerQuery) && !bLower.startsWith(lowerQuery)) return -1;
    if (bLower.startsWith(lowerQuery) && !aLower.startsWith(lowerQuery)) return 1;
    return a.brandName.localeCompare(b.brandName);
  });
}

// Get brand by name
export function getBrandByName(name: string): BrandMetrics | undefined {
  return brands.find(b => b.brandName.toLowerCase() === name.toLowerCase());
}

// Get industry peers (same industry)
export function getIndustryPeers(brand: BrandMetrics): BrandMetrics[] {
  return brands.filter(b =>
    b.industry === brand.industry && b.brandName !== brand.brandName
  );
}

// Get competitive set (brands that appear in same scan searches)
export function getCompetitiveSet(brand: BrandMetrics): BrandMetrics[] {
  const brandSearches = new Set(brand.scanSearchIds);
  return brands
    .filter(b => b.brandName !== brand.brandName)
    .map(b => ({
      ...b,
      overlapCount: b.scanSearchIds.filter(id => brandSearches.has(id)).length,
    }))
    .filter(b => b.overlapCount > 0)
    .sort((a, b) => b.overlapCount - a.overlapCount);
}

// Calculate percentile (higher is better for rank, meaning lower number)
function calculateRankPercentile(brandValue: number, allValues: number[]): number {
  // For rank, lower is better, so we count how many have WORSE (higher) rank
  const betterCount = allValues.filter(v => v > brandValue).length;
  return Math.round((betterCount / allValues.length) * 100);
}

// Calculate percentile (higher is better)
function calculatePercentile(brandValue: number, allValues: number[]): number {
  const betterCount = allValues.filter(v => v < brandValue).length;
  return Math.round((1 - betterCount / allValues.length) * 100);
}

// Generate full brand comparison
export function getBrandComparison(brandName: string): BrandComparison | null {
  const brand = getBrandByName(brandName);
  if (!brand) return null;

  // Industry peers
  const industryPeers = getIndustryPeers(brand);
  const allIndustryBrands = [brand, ...industryPeers];

  const industryAvgRank = industryPeers.length > 0
    ? industryPeers.reduce((sum, b) => sum + b.avgRank, 0) / industryPeers.length
    : brand.avgRank;
  const industryAvgCompleteness = industryPeers.length > 0
    ? industryPeers.reduce((sum, b) => sum + b.avgCompleteness, 0) / industryPeers.length
    : brand.avgCompleteness;
  const industryAvgTop3 = industryPeers.length > 0
    ? industryPeers.reduce((sum, b) => sum + b.top3Rate, 0) / industryPeers.length
    : brand.top3Rate;

  // Competitive set
  const competitiveSetRaw = getCompetitiveSet(brand);
  const competitiveSet = competitiveSetRaw.map(b => ({
    brandName: b.brandName,
    avgRank: b.avgRank,
    avgCompleteness: b.avgCompleteness,
    // @ts-ignore - we added overlapCount in getCompetitiveSet
    overlapPercent: Math.round((b.overlapCount / brand.scanSearchIds.length) * 100),
  }));

  const allCompetitorBrands = competitiveSetRaw;
  const competitiveAvgRank = allCompetitorBrands.length > 0
    ? allCompetitorBrands.reduce((sum, b) => sum + b.avgRank, 0) / allCompetitorBrands.length
    : brand.avgRank;
  const competitiveAvgCompleteness = allCompetitorBrands.length > 0
    ? allCompetitorBrands.reduce((sum, b) => sum + b.avgCompleteness, 0) / allCompetitorBrands.length
    : brand.avgCompleteness;
  const competitiveAvgTop3 = allCompetitorBrands.length > 0
    ? allCompetitorBrands.reduce((sum, b) => sum + b.top3Rate, 0) / allCompetitorBrands.length
    : brand.top3Rate;

  return {
    brand,
    industryPeers: {
      avgRank: Math.round(industryAvgRank * 10) / 10,
      avgCompleteness: Math.round(industryAvgCompleteness * 10) / 10,
      top3Rate: Math.round(industryAvgTop3 * 1000) / 1000,
      totalBrands: allIndustryBrands.length,
      brandRankPercentile: calculateRankPercentile(brand.avgRank, allIndustryBrands.map(b => b.avgRank)),
      brandCompletenessPercentile: calculatePercentile(brand.avgCompleteness, allIndustryBrands.map(b => b.avgCompleteness)),
      brandTop3Percentile: calculatePercentile(brand.top3Rate, allIndustryBrands.map(b => b.top3Rate)),
    },
    competitiveSet: {
      avgRank: Math.round(competitiveAvgRank * 10) / 10,
      avgCompleteness: Math.round(competitiveAvgCompleteness * 10) / 10,
      top3Rate: Math.round(competitiveAvgTop3 * 1000) / 1000,
      totalBrands: allCompetitorBrands.length + 1,
      brandRankPercentile: calculateRankPercentile(brand.avgRank, [brand, ...allCompetitorBrands].map(b => b.avgRank)),
      brandCompletenessPercentile: calculatePercentile(brand.avgCompleteness, [brand, ...allCompetitorBrands].map(b => b.avgCompleteness)),
      brandTop3Percentile: calculatePercentile(brand.top3Rate, [brand, ...allCompetitorBrands].map(b => b.top3Rate)),
      topCompetitors: competitiveSet.slice(0, 5),
    },
  };
}

// Get brands by sector
export function getBrandsBySector(sector: Sector): BrandMetrics[] {
  return brands.filter(b => b.sector === sector);
}

// Get brands by industry
export function getBrandsByIndustry(industry: string): BrandMetrics[] {
  return brands.filter(b => b.industry === industry);
}
