'use client';

import { useState, useMemo } from 'react';
import {
  searchBrands,
  getBrandComparison,
  getAllBrandNames,
} from '@/data/brands';
import { BrandComparison } from '@/types';
import {
  Search,
  Building2,
  Trophy,
  Target,
  TrendingUp,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle2,
  XCircle,
  ChevronRight,
  BarChart3,
  Swords,
} from 'lucide-react';

function PercentileBar({ percentile, label }: { percentile: number; label: string }) {
  const getColor = (p: number) => {
    if (p >= 75) return 'bg-green-500';
    if (p >= 50) return 'bg-electric-blue';
    if (p >= 25) return 'bg-yellow-500';
    return 'bg-coral';
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-midnight/60">{label}</span>
        <span className="font-semibold text-midnight">Top {100 - percentile}%</span>
      </div>
      <div className="h-2 bg-mist rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(percentile)} transition-all duration-500`}
          style={{ width: `${percentile}%` }}
        />
      </div>
    </div>
  );
}

function ComparisonMetric({
  label,
  brandValue,
  peerValue,
  format = 'number',
  lowerIsBetter = false,
}: {
  label: string;
  brandValue: number;
  peerValue: number;
  format?: 'number' | 'percent' | 'rank';
  lowerIsBetter?: boolean;
}) {
  const diff = brandValue - peerValue;
  const isBetter = lowerIsBetter ? diff < 0 : diff > 0;
  const isEqual = Math.abs(diff) < 0.1;

  const formatValue = (v: number) => {
    if (format === 'percent') return `${(v * 100).toFixed(1)}%`;
    if (format === 'rank') return `#${v.toFixed(1)}`;
    return v.toFixed(1);
  };

  const formatDiff = (d: number) => {
    const absD = Math.abs(d);
    if (format === 'percent') return `${(absD * 100).toFixed(1)}pp`;
    if (format === 'rank') return absD.toFixed(1);
    return absD.toFixed(1);
  };

  return (
    <div className="p-4 bg-mist/30 rounded-xl">
      <p className="text-sm text-midnight/60 mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-midnight">{formatValue(brandValue)}</p>
          <p className="text-xs text-midnight/40">Brand</p>
        </div>
        <div className="text-right">
          <p className="text-lg text-midnight/60">{formatValue(peerValue)}</p>
          <p className="text-xs text-midnight/40">Peer Avg</p>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-mist">
        {isEqual ? (
          <span className="inline-flex items-center gap-1 text-sm text-midnight/60">
            <Minus className="w-4 h-4" />
            On par with peers
          </span>
        ) : isBetter ? (
          <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
            {lowerIsBetter ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
            {formatDiff(diff)} {lowerIsBetter ? 'better' : 'ahead'}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-sm text-coral font-medium">
            {lowerIsBetter ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {formatDiff(diff)} {lowerIsBetter ? 'behind' : 'behind'}
          </span>
        )}
      </div>
    </div>
  );
}

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [comparisonView, setComparisonView] = useState<'industry' | 'competitive'>('industry');

  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    return searchBrands(searchQuery).slice(0, 10);
  }, [searchQuery]);

  const comparison = useMemo(() => {
    if (!selectedBrand) return null;
    return getBrandComparison(selectedBrand);
  }, [selectedBrand]);

  const handleSelectBrand = (brandName: string) => {
    setSelectedBrand(brandName);
    setSearchQuery('');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-midnight mb-2">
          Brand <span className="text-electric-blue">Comparison</span>
        </h1>
        <p className="text-midnight/60">
          See how any brand stacks up against industry peers and direct competitors
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-mist p-6 mb-6">
        <label className="block text-sm font-medium text-midnight/60 mb-3 uppercase tracking-wide">
          Search for a brand
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-midnight/40" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g., CVS, Chase, McDonald's..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-mist focus:outline-none focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue text-lg"
          />

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-mist shadow-lg z-10 overflow-hidden">
              {searchResults.map((brand) => (
                <button
                  key={brand.brandName}
                  onClick={() => handleSelectBrand(brand.brandName)}
                  className="w-full px-4 py-3 text-left hover:bg-frost-blue/30 flex items-center justify-between transition-colors"
                >
                  <div>
                    <p className="font-medium text-midnight">{brand.brandName}</p>
                    <p className="text-sm text-midnight/60">
                      {brand.sector} • {brand.industry}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {brand.isYext ? (
                      <span className="px-2 py-0.5 bg-electric-blue/10 text-electric-blue text-xs rounded-full">
                        Yext
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-mist text-midnight/50 text-xs rounded-full">
                        Non-Yext
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-midnight/40" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick suggestions */}
        {!selectedBrand && searchResults.length === 0 && (
          <div className="mt-4">
            <p className="text-sm text-midnight/40 mb-2">Popular brands:</p>
            <div className="flex flex-wrap gap-2">
              {['CVS Pharmacy', 'Chase Bank', 'McDonald\'s', 'Marriott', 'Kroger'].map((name) => (
                <button
                  key={name}
                  onClick={() => handleSelectBrand(name)}
                  className="px-3 py-1.5 bg-mist/50 hover:bg-frost-blue/50 rounded-full text-sm text-midnight transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand Comparison View */}
      {comparison && (
        <>
          {/* Brand Header */}
          <div className="bg-white rounded-2xl border border-mist p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-semibold text-midnight">
                    {comparison.brand.brandName}
                  </h2>
                  {comparison.brand.isYext ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-electric-blue/10 text-electric-blue text-sm rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      Yext Powered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-mist text-midnight/50 text-sm rounded-full">
                      <XCircle className="w-4 h-4" />
                      Not Yext
                    </span>
                  )}
                </div>
                <p className="text-midnight/60">
                  {comparison.brand.sector} • {comparison.brand.industry} • {comparison.brand.brandSize}
                </p>
              </div>
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-sm text-midnight/40 hover:text-midnight"
              >
                Change brand
              </button>
            </div>

            {/* Brand Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-mist/30 rounded-xl">
                <p className="text-3xl font-semibold text-electric-blue">#{comparison.brand.avgRank.toFixed(1)}</p>
                <p className="text-sm text-midnight/60">Avg Elo Rank</p>
              </div>
              <div className="text-center p-4 bg-mist/30 rounded-xl">
                <p className="text-3xl font-semibold text-midnight">{comparison.brand.avgCompleteness.toFixed(1)}%</p>
                <p className="text-sm text-midnight/60">Profile Complete</p>
              </div>
              <div className="text-center p-4 bg-mist/30 rounded-xl">
                <p className="text-3xl font-semibold text-midnight">{(comparison.brand.top3Rate * 100).toFixed(1)}%</p>
                <p className="text-sm text-midnight/60">Top 3 Rate</p>
              </div>
              <div className="text-center p-4 bg-mist/30 rounded-xl">
                <p className="text-3xl font-semibold text-midnight">{comparison.brand.locationCount.toLocaleString()}</p>
                <p className="text-sm text-midnight/60">Locations</p>
              </div>
            </div>
          </div>

          {/* Comparison Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setComparisonView('industry')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                comparisonView === 'industry'
                  ? 'bg-electric-blue text-white'
                  : 'bg-white border border-mist text-midnight hover:bg-mist/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              vs Industry Peers
            </button>
            <button
              onClick={() => setComparisonView('competitive')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                comparisonView === 'competitive'
                  ? 'bg-electric-blue text-white'
                  : 'bg-white border border-mist text-midnight hover:bg-mist/50'
              }`}
            >
              <Swords className="w-4 h-4" />
              vs Competitive Set
            </button>
          </div>

          {/* Comparison Content */}
          {comparisonView === 'industry' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Metrics Comparison */}
              <div className="bg-white rounded-2xl border border-mist p-6">
                <h3 className="text-lg font-semibold text-midnight mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-electric-blue" />
                  vs {comparison.brand.industry} ({comparison.industryPeers.totalBrands} brands)
                </h3>
                <div className="space-y-4">
                  <ComparisonMetric
                    label="Average Elo Rank"
                    brandValue={comparison.brand.avgRank}
                    peerValue={comparison.industryPeers.avgRank}
                    format="rank"
                    lowerIsBetter
                  />
                  <ComparisonMetric
                    label="Profile Completeness"
                    brandValue={comparison.brand.avgCompleteness}
                    peerValue={comparison.industryPeers.avgCompleteness}
                    format="number"
                  />
                  <ComparisonMetric
                    label="Top 3 Appearance Rate"
                    brandValue={comparison.brand.top3Rate}
                    peerValue={comparison.industryPeers.top3Rate}
                    format="percent"
                  />
                </div>
              </div>

              {/* Percentile Rankings */}
              <div className="bg-white rounded-2xl border border-mist p-6">
                <h3 className="text-lg font-semibold text-midnight mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-electric-blue" />
                  Industry Percentile Rankings
                </h3>
                <div className="space-y-6">
                  <PercentileBar
                    percentile={comparison.industryPeers.brandRankPercentile}
                    label="Elo Rank"
                  />
                  <PercentileBar
                    percentile={comparison.industryPeers.brandCompletenessPercentile}
                    label="Profile Completeness"
                  />
                  <PercentileBar
                    percentile={comparison.industryPeers.brandTop3Percentile}
                    label="Top 3 Rate"
                  />
                </div>
                <div className="mt-6 p-4 bg-frost-blue/30 rounded-xl">
                  <p className="text-sm text-midnight">
                    <span className="font-semibold">{comparison.brand.brandName}</span> ranks in the{' '}
                    <span className="font-semibold text-electric-blue">
                      top {100 - comparison.industryPeers.brandRankPercentile}%
                    </span>{' '}
                    of {comparison.brand.industry} brands for Elo ranking.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Competitive Set Metrics */}
              <div className="bg-white rounded-2xl border border-mist p-6">
                <h3 className="text-lg font-semibold text-midnight mb-4 flex items-center gap-2">
                  <Swords className="w-5 h-5 text-electric-blue" />
                  vs Direct Competitors ({comparison.competitiveSet.totalBrands} brands)
                </h3>
                <p className="text-sm text-midnight/60 mb-4">
                  Brands that appear in the same search results
                </p>
                <div className="space-y-4">
                  <ComparisonMetric
                    label="Average Elo Rank"
                    brandValue={comparison.brand.avgRank}
                    peerValue={comparison.competitiveSet.avgRank}
                    format="rank"
                    lowerIsBetter
                  />
                  <ComparisonMetric
                    label="Profile Completeness"
                    brandValue={comparison.brand.avgCompleteness}
                    peerValue={comparison.competitiveSet.avgCompleteness}
                    format="number"
                  />
                  <ComparisonMetric
                    label="Top 3 Appearance Rate"
                    brandValue={comparison.brand.top3Rate}
                    peerValue={comparison.competitiveSet.top3Rate}
                    format="percent"
                  />
                </div>
              </div>

              {/* Top Competitors */}
              <div className="bg-white rounded-2xl border border-mist p-6">
                <h3 className="text-lg font-semibold text-midnight mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-electric-blue" />
                  Top Competitors
                </h3>
                <p className="text-sm text-midnight/60 mb-4">
                  Most frequently appearing in same searches
                </p>
                <div className="space-y-3">
                  {comparison.competitiveSet.topCompetitors.map((competitor, index) => (
                    <div
                      key={competitor.brandName}
                      className="flex items-center justify-between p-3 bg-mist/30 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-electric-blue/10 text-electric-blue text-sm font-semibold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-midnight">{competitor.brandName}</p>
                          <p className="text-xs text-midnight/50">
                            {competitor.overlapPercent}% search overlap
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-midnight">#{competitor.avgRank}</p>
                        <p className="text-xs text-midnight/50">{competitor.avgCompleteness}% complete</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-frost-blue/30 rounded-xl">
                  <p className="text-sm text-midnight">
                    <span className="font-semibold">{comparison.brand.brandName}</span> ranks in the{' '}
                    <span className="font-semibold text-electric-blue">
                      top {100 - comparison.competitiveSet.brandRankPercentile}%
                    </span>{' '}
                    against brands appearing in the same searches.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!comparison && (
        <div className="bg-white rounded-2xl border border-mist p-12 text-center">
          <Search className="w-12 h-12 text-midnight/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-midnight mb-2">Search for a brand</h3>
          <p className="text-midnight/60">
            Enter a brand name above to see how it compares to industry peers and direct competitors.
          </p>
        </div>
      )}
    </div>
  );
}
