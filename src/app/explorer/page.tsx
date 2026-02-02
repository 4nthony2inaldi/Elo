'use client';

import { useState, useMemo } from 'react';
import FilterPanel from '@/components/FilterPanel';
import MetricCard from '@/components/MetricCard';
import ComparisonBar from '@/components/ComparisonBar';
import { Sector, DistanceBucket, BrandSize } from '@/types';
import {
  filterAggregatedData,
  computeComparisonMetrics,
  aggregatedMetrics,
  brandSizeMetrics,
} from '@/data/mockData';
import {
  Search,
  Trophy,
  Target,
  TrendingUp,
  BarChart2,
  Users,
} from 'lucide-react';

export default function Explorer() {
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);
  const [selectedDistances, setSelectedDistances] = useState<DistanceBucket[]>([]);
  const [selectedBrandSizes, setSelectedBrandSizes] = useState<BrandSize[]>([]);

  const filteredData = useMemo(() => {
    return filterAggregatedData(selectedSectors, selectedDistances, 'all');
  }, [selectedSectors, selectedDistances]);

  const metrics = useMemo(() => {
    return computeComparisonMetrics(filteredData);
  }, [filteredData]);

  const clearAllFilters = () => {
    setSelectedSectors([]);
    setSelectedDistances([]);
    setSelectedBrandSizes([]);
  };

  const hasFilters = selectedSectors.length > 0 || selectedDistances.length > 0 || selectedBrandSizes.length > 0;

  const getFilterDescription = () => {
    const parts: string[] = [];
    if (selectedSectors.length > 0) {
      parts.push(selectedSectors.length === 1 ? selectedSectors[0] : `${selectedSectors.length} sectors`);
    }
    if (selectedDistances.length > 0) {
      parts.push(selectedDistances.length === 1 ? selectedDistances[0] : `${selectedDistances.length} distance ranges`);
    }
    if (selectedBrandSizes.length > 0) {
      parts.push(selectedBrandSizes.length === 1 ? selectedBrandSizes[0] : `${selectedBrandSizes.length} brand sizes`);
    }
    return parts.length > 0 ? parts.join(' • ') : 'All data';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-midnight mb-2">
          Data <span className="text-electric-blue">Explorer</span>
        </h1>
        <p className="text-midnight/60">
          Filter and explore competitive intelligence data by segment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Panel */}
        <div className="lg:col-span-1">
          <FilterPanel
            selectedSectors={selectedSectors}
            selectedDistances={selectedDistances}
            selectedBrandSizes={selectedBrandSizes}
            onSectorChange={setSelectedSectors}
            onDistanceChange={setSelectedDistances}
            onBrandSizeChange={setSelectedBrandSizes}
            onClearAll={clearAllFilters}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* Current Filter Summary */}
          <div className="bg-white rounded-2xl border border-mist p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-electric-blue" />
              <span className="font-medium text-midnight">
                Showing: <span className="text-electric-blue">{getFilterDescription()}</span>
              </span>
            </div>
            {hasFilters && (
              <span className="text-sm text-midnight/60">
                {filteredData.length} segment combinations
              </span>
            )}
          </div>

          {metrics ? (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                  title="Rank Advantage"
                  value={`+${metrics.rankAdvantage}`}
                  subtitle="positions higher"
                  trend="up"
                  icon={<Trophy className="w-5 h-5" />}
                  highlight
                  size="sm"
                />
                <MetricCard
                  title="Completeness Gap"
                  value={`+${metrics.completenessGap}%`}
                  subtitle={`${metrics.avgCompletenessYext}% vs ${metrics.avgCompletenessNonYext}%`}
                  trend="up"
                  icon={<Target className="w-5 h-5" />}
                  size="sm"
                />
                <MetricCard
                  title="Top 3 Improvement"
                  value={`+${metrics.top3Improvement}%`}
                  subtitle="more likely to rank top 3"
                  trend="up"
                  icon={<TrendingUp className="w-5 h-5" />}
                  size="sm"
                />
              </div>

              {/* Detailed Comparisons */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Comparison Bars */}
                <div className="bg-white rounded-2xl border border-mist p-6">
                  <h2 className="text-lg font-semibold text-midnight mb-6 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-electric-blue" />
                    Performance Comparison
                  </h2>
                  <div className="space-y-6">
                    <ComparisonBar
                      yextValue={metrics.avgRankYext}
                      nonYextValue={metrics.avgRankNonYext}
                      label="Average Elo Rank"
                      format="rank"
                    />
                    <ComparisonBar
                      yextValue={metrics.avgCompletenessYext}
                      nonYextValue={metrics.avgCompletenessNonYext}
                      label="Profile Completeness (%)"
                      format="number"
                    />
                    <ComparisonBar
                      yextValue={metrics.top3RateYext}
                      nonYextValue={metrics.top3RateNonYext}
                      label="Top 3 Rate"
                      format="percent"
                    />
                  </div>
                </div>

                {/* Volume Stats */}
                <div className="bg-white rounded-2xl border border-mist p-6">
                  <h2 className="text-lg font-semibold text-midnight mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-electric-blue" />
                    Data Volume
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-frost-blue/30 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-midnight/70">Yext Results</span>
                        <span className="text-lg font-semibold text-electric-blue">
                          {metrics.yextResults.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-midnight/50">Unique businesses</span>
                        <span className="text-sm text-midnight/70">
                          {metrics.yextBusinesses.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-mist/50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-midnight/70">Non-Yext Results</span>
                        <span className="text-lg font-semibold text-midnight/70">
                          {metrics.nonYextResults.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-midnight/50">Unique businesses</span>
                        <span className="text-sm text-midnight/70">
                          {metrics.nonYextBusinesses.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-mist">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-midnight">Total</span>
                        <span className="font-semibold text-midnight">
                          {(metrics.yextResults + metrics.nonYextResults).toLocaleString()} results
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Size Breakdown */}
              <div className="bg-white rounded-2xl border border-mist p-6">
                <h2 className="text-lg font-semibold text-midnight mb-6">
                  Performance by Brand Size
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {brandSizeMetrics.map((metric) => (
                    <div
                      key={metric.brandSize}
                      className="p-4 bg-mist/30 rounded-xl hover:bg-frost-blue/20 transition-colors"
                    >
                      <p className="text-sm font-medium text-midnight/70 mb-2">
                        {metric.brandSize}
                      </p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-midnight/50">Yext</p>
                          <p className="text-lg font-semibold text-electric-blue">
                            #{metric.yextAvgRank}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-midnight/50">Others</p>
                          <p className="text-lg font-semibold text-midnight/50">
                            #{metric.nonYextAvgRank}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-mist">
                        <span className="text-sm font-semibold text-green-600">
                          +{metric.rankAdvantage} positions
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-mist p-12 text-center">
              <p className="text-midnight/60">
                No data available for the selected filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
