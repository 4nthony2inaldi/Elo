'use client';

import { useState } from 'react';
import {
  benchmarkData,
  SECTORS,
  DISTANCE_BUCKETS,
  COMPETITIVENESS_LEVELS,
  sectorMetrics,
} from '@/data/mockData';
import { Sector, DistanceBucket, Competitiveness } from '@/types';
import { BarChart3, Target, Award, TrendingUp } from 'lucide-react';

export default function Benchmarks() {
  const [selectedSector, setSelectedSector] = useState<Sector>('Retail');
  const [selectedDistance, setSelectedDistance] = useState<DistanceBucket>('Within 1 mile');

  const filteredBenchmarks = benchmarkData.filter(
    (b) => b.sector === selectedSector && b.distanceBucket === selectedDistance
  );

  const sectorData = sectorMetrics.find((s) => s.sector === selectedSector);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-midnight mb-2">
          Market <span className="text-electric-blue">Benchmarks</span>
        </h1>
        <p className="text-midnight/60">
          What it takes to win in different market conditions
        </p>
      </div>

      {/* Selector Controls */}
      <div className="bg-white rounded-2xl border border-mist p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sector Selector */}
          <div>
            <label className="block text-sm font-medium text-midnight/60 mb-3 uppercase tracking-wide">
              Sector
            </label>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedSector === sector
                      ? 'bg-electric-blue text-white'
                      : 'bg-mist text-midnight/70 hover:bg-frost-blue'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Selector */}
          <div>
            <label className="block text-sm font-medium text-midnight/60 mb-3 uppercase tracking-wide">
              Distance from Search
            </label>
            <div className="flex flex-wrap gap-2">
              {DISTANCE_BUCKETS.map((distance) => (
                <button
                  key={distance}
                  onClick={() => setSelectedDistance(distance)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedDistance === distance
                      ? 'bg-electric-blue text-white'
                      : 'bg-mist text-midnight/70 hover:bg-frost-blue'
                  }`}
                >
                  {distance}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sector Overview */}
      {sectorData && (
        <div className="bg-gradient-to-br from-frost-blue to-white rounded-2xl border border-electric-blue/20 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-electric-blue" />
            <h2 className="text-lg font-semibold text-midnight">
              {selectedSector} Sector Overview
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="text-sm text-midnight/60">Total Businesses</p>
              <p className="text-2xl font-semibold text-midnight">
                {sectorData.uniqueBusinesses.toLocaleString()}
              </p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="text-sm text-midnight/60">Yext Rank Advantage</p>
              <p className="text-2xl font-semibold text-green-600">
                +{sectorData.rankAdvantage}
              </p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="text-sm text-midnight/60">Avg Completeness (Yext)</p>
              <p className="text-2xl font-semibold text-electric-blue">
                {sectorData.avgCompletenessYext}%
              </p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="text-sm text-midnight/60">Top 3 Rate (Yext)</p>
              <p className="text-2xl font-semibold text-electric-blue">
                {(sectorData.top3RateYext * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Benchmark Cards by Competitiveness */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-midnight mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-electric-blue" />
          Benchmarks by Competitiveness Level
        </h2>
        <p className="text-sm text-midnight/60 mb-6">
          Profile completeness thresholds needed to compete effectively in {selectedSector} ({selectedDistance})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMPETITIVENESS_LEVELS.map((level) => {
          const benchmark = filteredBenchmarks.find((b) => b.competitiveness === level);
          if (!benchmark) return null;

          const levelColors: Record<Competitiveness, { bg: string; border: string; badge: string }> = {
            'Uncompetitive': { bg: 'bg-gray-50', border: 'border-gray-200', badge: 'bg-gray-100 text-gray-600' },
            'Standard': { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-600' },
            'Competitive': { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-600' },
            'Ultra Competitive': { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-600' },
          };

          const colors = levelColors[level];

          return (
            <div
              key={level}
              className={`${colors.bg} rounded-2xl border ${colors.border} p-6 transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.badge}`}>
                  {level}
                </span>
                {level === 'Ultra Competitive' && (
                  <Award className="w-5 h-5 text-red-500" />
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-midnight/60 mb-1">Top 3 Completeness</p>
                  <p className="text-2xl font-semibold text-midnight">
                    {Math.round(benchmark.avgTop3Completeness)}%
                  </p>
                  <p className="text-xs text-midnight/50">minimum to rank top 3</p>
                </div>

                <div>
                  <p className="text-sm text-midnight/60 mb-1">Top 10 Completeness</p>
                  <p className="text-xl font-semibold text-midnight/70">
                    {Math.round(benchmark.avgTop10Completeness)}%
                  </p>
                </div>

                <div className="pt-4 border-t border-midnight/10">
                  <p className="text-sm text-midnight/60 mb-1">Median Rank</p>
                  <p className="text-lg font-semibold text-midnight">
                    #{benchmark.medianRank}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-midnight/60 mb-1">Businesses</p>
                  <p className="text-sm font-medium text-midnight/70">
                    {benchmark.businessCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Insights */}
      <div className="mt-8 bg-white rounded-2xl border border-mist p-6">
        <h2 className="text-lg font-semibold text-midnight mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-electric-blue" />
          Key Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-mist/30 rounded-xl">
            <p className="text-sm font-medium text-midnight mb-2">Proximity Matters</p>
            <p className="text-sm text-midnight/60">
              Businesses within 1 mile consistently outperform those further away,
              but Yext-powered listings punch above their weight at greater distances.
            </p>
          </div>
          <div className="p-4 bg-mist/30 rounded-xl">
            <p className="text-sm font-medium text-midnight mb-2">Completeness Threshold</p>
            <p className="text-sm text-midnight/60">
              In ultra-competitive markets, profile completeness above 80% is
              essential for top 3 placement. Yext averages {sectorData?.avgCompletenessYext || 78}% in {selectedSector}.
            </p>
          </div>
          <div className="p-4 bg-mist/30 rounded-xl">
            <p className="text-sm font-medium text-midnight mb-2">Elo Stability</p>
            <p className="text-sm text-midnight/60">
              Consistent performance over time builds Elo rating. One-time improvements
              in rank are less valuable than sustained presence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
