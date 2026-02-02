'use client';

import { useState, useMemo } from 'react';
import { Sector, DistanceBucket, BrandSize } from '@/types';
import {
  SECTORS,
  DISTANCE_BUCKETS,
  BRAND_SIZES,
  filterAggregatedData,
  computeComparisonMetrics,
  sectorMetrics,
  distanceMetrics,
  brandSizeMetrics,
} from '@/data/mockData';
import { FileText, Copy, Check, Sparkles, Download } from 'lucide-react';

interface GeneratedProofPoint {
  text: string;
  category: string;
}

export default function ProofPoints() {
  const [selectedSector, setSelectedSector] = useState<Sector | 'all'>('all');
  const [selectedDistance, setSelectedDistance] = useState<DistanceBucket | 'all'>('all');
  const [selectedBrandSize, setSelectedBrandSize] = useState<BrandSize | 'all'>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    const sectors = selectedSector === 'all' ? [] : [selectedSector];
    const distances = selectedDistance === 'all' ? [] : [selectedDistance];
    return filterAggregatedData(sectors, distances, 'all');
  }, [selectedSector, selectedDistance]);

  const metrics = useMemo(() => {
    return computeComparisonMetrics(filteredData);
  }, [filteredData]);

  const proofPoints = useMemo<GeneratedProofPoint[]>(() => {
    const points: GeneratedProofPoint[] = [];

    if (!metrics) return points;

    // Build context strings
    const sectorContext = selectedSector === 'all' ? 'across all sectors' : `in the ${selectedSector} sector`;
    const distanceContext = selectedDistance === 'all' ? '' : ` ${selectedDistance.toLowerCase()}`;
    const brandContext = selectedBrandSize === 'all' ? '' : ` for ${selectedBrandSize.toLowerCase()} businesses`;

    // Rank Advantage
    points.push({
      category: 'Rank Advantage',
      text: `${sectorContext.charAt(0).toUpperCase() + sectorContext.slice(1)}${distanceContext}, Yext-powered listings rank an average of ${metrics.rankAdvantage} positions higher than non-Yext businesses.`,
    });

    // Profile Completeness
    points.push({
      category: 'Profile Completeness',
      text: `Yext customers ${sectorContext} have ${metrics.completenessGap}% higher profile completeness (${metrics.avgCompletenessYext}% vs ${metrics.avgCompletenessNonYext}% for non-Yext).`,
    });

    // Top 3 Rate
    points.push({
      category: 'Top 3 Performance',
      text: `${sectorContext.charAt(0).toUpperCase() + sectorContext.slice(1)}, Yext-powered businesses are ${metrics.top3Improvement}% more likely to appear in the top 3 search results.`,
    });

    // Volume-based
    points.push({
      category: 'Data Scale',
      text: `Analysis based on ${metrics.yextResults.toLocaleString()} Yext results and ${metrics.nonYextResults.toLocaleString()} non-Yext results ${sectorContext}${distanceContext}.`,
    });

    // Sector-specific insights
    if (selectedSector !== 'all') {
      const sectorData = sectorMetrics.find((s) => s.sector === selectedSector);
      if (sectorData) {
        points.push({
          category: 'Sector Insight',
          text: `In ${selectedSector}, Yext powers ${sectorData.yextCount.toLocaleString()} businesses with an average rank of #${sectorData.avgRankYext}, compared to #${sectorData.avgRankNonYext} for the ${sectorData.nonYextCount.toLocaleString()} non-Yext businesses.`,
        });
      }
    }

    // Distance-specific insights
    if (selectedDistance !== 'all') {
      const distData = distanceMetrics.find((d) => d.distanceBucket === selectedDistance);
      if (distData) {
        points.push({
          category: 'Distance Insight',
          text: `${selectedDistance} from search locations, Yext businesses achieve a ${distData.rankAdvantage} position advantage and a ${((distData.yextTop3Rate - distData.nonYextTop3Rate) * 100).toFixed(1)} percentage point higher top 3 rate.`,
        });
      }
    }

    // Brand size insights
    if (selectedBrandSize !== 'all') {
      const brandData = brandSizeMetrics.find((b) => b.brandSize === selectedBrandSize);
      if (brandData) {
        points.push({
          category: 'Brand Size Insight',
          text: `For ${selectedBrandSize.toLowerCase()} businesses, Yext delivers a ${brandData.rankAdvantage} position rank advantage (#${brandData.yextAvgRank} vs #${brandData.nonYextAvgRank}).`,
        });
      }
    }

    return points;
  }, [metrics, selectedSector, selectedDistance, selectedBrandSize]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    const allText = proofPoints.map((p) => `[${p.category}] ${p.text}`).join('\n\n');
    navigator.clipboard.writeText(allText);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-midnight mb-2">
          Proof Point <span className="text-electric-blue">Generator</span>
        </h1>
        <p className="text-midnight/60">
          Generate copy-pasteable statistics for sales decks and presentations
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl border border-mist p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sector */}
          <div>
            <label className="block text-sm font-medium text-midnight/60 mb-3 uppercase tracking-wide">
              Sector
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value as Sector | 'all')}
              className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-midnight focus:outline-none focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue"
            >
              <option value="all">All Sectors</option>
              {SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          {/* Distance */}
          <div>
            <label className="block text-sm font-medium text-midnight/60 mb-3 uppercase tracking-wide">
              Distance
            </label>
            <select
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value as DistanceBucket | 'all')}
              className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-midnight focus:outline-none focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue"
            >
              <option value="all">All Distances</option>
              {DISTANCE_BUCKETS.map((distance) => (
                <option key={distance} value={distance}>
                  {distance}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Size */}
          <div>
            <label className="block text-sm font-medium text-midnight/60 mb-3 uppercase tracking-wide">
              Brand Size
            </label>
            <select
              value={selectedBrandSize}
              onChange={(e) => setSelectedBrandSize(e.target.value as BrandSize | 'all')}
              className="w-full px-4 py-3 rounded-xl border border-mist bg-white text-midnight focus:outline-none focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue"
            >
              <option value="all">All Sizes</option>
              {BRAND_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Generated Proof Points */}
      <div className="bg-white rounded-2xl border border-mist p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-electric-blue" />
            <h2 className="text-lg font-semibold text-midnight">Generated Proof Points</h2>
          </div>
          <button
            onClick={copyAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-blue text-white font-medium hover:bg-sea-blue transition-colors"
          >
            {copiedIndex === -1 ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Copy All
              </>
            )}
          </button>
        </div>

        <div className="space-y-4">
          {proofPoints.map((point, index) => (
            <div
              key={index}
              className="group p-4 bg-mist/30 rounded-xl hover:bg-frost-blue/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="inline-block text-xs font-semibold text-electric-blue bg-frost-blue px-2 py-1 rounded-full mb-2">
                    {point.category}
                  </span>
                  <p className="text-midnight leading-relaxed">{point.text}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(point.text, index)}
                  className="flex-shrink-0 p-2 rounded-lg bg-white border border-mist hover:border-electric-blue hover:text-electric-blue transition-all opacity-0 group-hover:opacity-100"
                  title="Copy to clipboard"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-6 bg-gradient-to-br from-frost-blue to-white rounded-2xl border border-electric-blue/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-electric-blue" />
          <h3 className="font-semibold text-midnight">Usage Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-midnight/70">
          <div>
            <p className="font-medium text-midnight mb-1">For Sales Decks</p>
            <p>Use sector-specific proof points to match your prospect&apos;s industry. Combine rank advantage with profile completeness for maximum impact.</p>
          </div>
          <div>
            <p className="font-medium text-midnight mb-1">For Proposals</p>
            <p>Include data scale metrics to emphasize the statistical significance of the analysis. Add distance-based insights for location-sensitive prospects.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
