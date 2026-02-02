'use client';

import MetricCard from '@/components/MetricCard';
import ComparisonBar from '@/components/ComparisonBar';
import DataTable from '@/components/DataTable';
import {
  overallMetrics,
  sectorMetrics,
  distanceMetrics,
} from '@/data/mockData';
import {
  Trophy,
  Target,
  TrendingUp,
  Building2,
  MapPin,
  Percent,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-midnight mb-2">
          Scout <span className="text-electric-blue">Dashboard</span>
        </h1>
        <p className="text-midnight/60">
          Competitive intelligence insights from {overallMetrics.totalResults.toLocaleString()} search results
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Rank Advantage"
          value={`+${overallMetrics.overallRankAdvantage}`}
          subtitle="Yext vs non-Yext average"
          trend="up"
          trendValue="positions higher"
          icon={<Trophy className="w-5 h-5" />}
          highlight
        />
        <MetricCard
          title="Profile Completeness"
          value={`${overallMetrics.avgCompletenessYext}%`}
          subtitle={`vs ${overallMetrics.avgCompletenessNonYext}% non-Yext`}
          trend="up"
          trendValue={`+${overallMetrics.completenessGap}%`}
          icon={<Target className="w-5 h-5" />}
        />
        <MetricCard
          title="Top 3 Rate"
          value={`${(overallMetrics.top3RateYext * 100).toFixed(1)}%`}
          subtitle={`vs ${(overallMetrics.top3RateNonYext * 100).toFixed(1)}% non-Yext`}
          trend="up"
          trendValue={`${Math.round(((overallMetrics.top3RateYext / overallMetrics.top3RateNonYext) - 1) * 100)}% better`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Businesses Analyzed"
          value={`${(overallMetrics.uniqueBusinesses / 1000000).toFixed(1)}M`}
          subtitle={`${(overallMetrics.yextBusinesses / 1000).toFixed(0)}K Yext-powered`}
          icon={<Building2 className="w-5 h-5" />}
        />
      </div>

      {/* Comparison Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Yext vs Non-Yext Comparison */}
        <div className="bg-white rounded-2xl border border-mist p-6">
          <h2 className="text-lg font-semibold text-midnight mb-6 flex items-center gap-2">
            <Percent className="w-5 h-5 text-electric-blue" />
            Yext Performance Advantage
          </h2>
          <div className="space-y-6">
            <ComparisonBar
              yextValue={overallMetrics.avgRankYext}
              nonYextValue={overallMetrics.avgRankNonYext}
              label="Average Elo Rank"
              format="rank"
            />
            <ComparisonBar
              yextValue={overallMetrics.avgCompletenessYext}
              nonYextValue={overallMetrics.avgCompletenessNonYext}
              label="Profile Completeness"
              format="number"
            />
            <ComparisonBar
              yextValue={overallMetrics.top3RateYext}
              nonYextValue={overallMetrics.top3RateNonYext}
              label="Top 3 Appearance Rate"
              format="percent"
            />
          </div>
        </div>

        {/* Distance Performance */}
        <div className="bg-white rounded-2xl border border-mist p-6">
          <h2 className="text-lg font-semibold text-midnight mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-electric-blue" />
            Performance by Distance
          </h2>
          <div className="space-y-4">
            {distanceMetrics.map((metric) => (
              <div
                key={metric.distanceBucket}
                className="flex items-center justify-between p-4 bg-mist/30 rounded-xl"
              >
                <div>
                  <p className="font-medium text-midnight">{metric.distanceBucket}</p>
                  <p className="text-sm text-midnight/60">
                    Yext: #{metric.yextAvgRank} vs Others: #{metric.nonYextAvgRank}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold">
                    +{metric.rankAdvantage} positions
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sector Table */}
      <div className="bg-white rounded-2xl border border-mist p-6">
        <h2 className="text-lg font-semibold text-midnight mb-6 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-electric-blue" />
          Performance by Sector
        </h2>
        <DataTable data={sectorMetrics} />
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-mist text-center">
          <p className="text-2xl font-semibold text-electric-blue">{overallMetrics.keywords.toLocaleString()}</p>
          <p className="text-sm text-midnight/60">Keywords Tracked</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-mist text-center">
          <p className="text-2xl font-semibold text-electric-blue">{overallMetrics.coordinates.toLocaleString()}</p>
          <p className="text-sm text-midnight/60">Geographic Points</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-mist text-center">
          <p className="text-2xl font-semibold text-electric-blue">{overallMetrics.scans.toLocaleString()}</p>
          <p className="text-sm text-midnight/60">Total Scans</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-mist text-center">
          <p className="text-2xl font-semibold text-electric-blue">7</p>
          <p className="text-sm text-midnight/60">Sectors Covered</p>
        </div>
      </div>
    </div>
  );
}
