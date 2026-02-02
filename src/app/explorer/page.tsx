'use client';

import { useState, useMemo, useEffect } from 'react';
import { Sector, DistanceBucket, BrandSize } from '@/types';
import {
  SECTORS,
  DISTANCE_BUCKETS,
  BRAND_SIZES,
  filterAggregatedData,
  computeComparisonMetrics,
  getAvailableIndustries,
  getAvailableSubIndustries,
  getAvailableKeywords,
  industryMetrics,
} from '@/data/mockData';
import MetricCard from '@/components/MetricCard';
import ComparisonBar from '@/components/ComparisonBar';
import {
  Filter,
  Building2,
  MapPin,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  X,
  Layers,
  Tag,
  Search,
} from 'lucide-react';

export default function Explorer() {
  // Cascading filter state
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSubIndustries, setSelectedSubIndustries] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedDistances, setSelectedDistances] = useState<DistanceBucket[]>([]);
  const [selectedBrandSize, setSelectedBrandSize] = useState<BrandSize | 'all'>('all');

  // Expanded sections
  const [expandedSections, setExpandedSections] = useState({
    sector: true,
    industry: false,
    subIndustry: false,
    keyword: false,
    distance: true,
    brandSize: false,
  });

  // Available options based on cascading selections
  const availableIndustries = useMemo(
    () => getAvailableIndustries(selectedSectors),
    [selectedSectors]
  );

  const availableSubIndustries = useMemo(
    () => getAvailableSubIndustries(selectedSectors, selectedIndustries),
    [selectedSectors, selectedIndustries]
  );

  const availableKeywords = useMemo(
    () => getAvailableKeywords(selectedSectors, selectedIndustries, selectedSubIndustries),
    [selectedSectors, selectedIndustries, selectedSubIndustries]
  );

  // Clear downstream selections when upstream changes
  useEffect(() => {
    setSelectedIndustries(prev =>
      prev.filter(i => availableIndustries.includes(i))
    );
  }, [availableIndustries]);

  useEffect(() => {
    setSelectedSubIndustries(prev =>
      prev.filter(s => availableSubIndustries.includes(s))
    );
  }, [availableSubIndustries]);

  useEffect(() => {
    setSelectedKeywords(prev =>
      prev.filter(k => availableKeywords.includes(k))
    );
  }, [availableKeywords]);

  // Filter and compute metrics
  const filteredData = useMemo(() => {
    return filterAggregatedData(
      selectedSectors,
      selectedDistances,
      'all',
      selectedIndustries,
      selectedSubIndustries
    );
  }, [selectedSectors, selectedDistances, selectedIndustries, selectedSubIndustries]);

  const metrics = useMemo(() => {
    return computeComparisonMetrics(filteredData);
  }, [filteredData]);

  // Filtered industry metrics
  const filteredIndustryMetrics = useMemo(() => {
    return industryMetrics.filter(m => {
      const sectorMatch = selectedSectors.length === 0 || selectedSectors.includes(m.sector);
      const industryMatch = selectedIndustries.length === 0 || selectedIndustries.includes(m.industry);
      return sectorMatch && industryMatch;
    });
  }, [selectedSectors, selectedIndustries]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleSector = (sector: Sector) => {
    setSelectedSectors(prev =>
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    );
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };

  const toggleSubIndustry = (subIndustry: string) => {
    setSelectedSubIndustries(prev =>
      prev.includes(subIndustry) ? prev.filter(s => s !== subIndustry) : [...prev, subIndustry]
    );
  };

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword) ? prev.filter(k => k !== keyword) : [...prev, keyword]
    );
  };

  const toggleDistance = (distance: DistanceBucket) => {
    setSelectedDistances(prev =>
      prev.includes(distance) ? prev.filter(d => d !== distance) : [...prev, distance]
    );
  };

  const clearAllFilters = () => {
    setSelectedSectors([]);
    setSelectedIndustries([]);
    setSelectedSubIndustries([]);
    setSelectedKeywords([]);
    setSelectedDistances([]);
    setSelectedBrandSize('all');
  };

  const hasFilters =
    selectedSectors.length > 0 ||
    selectedIndustries.length > 0 ||
    selectedSubIndustries.length > 0 ||
    selectedKeywords.length > 0 ||
    selectedDistances.length > 0 ||
    selectedBrandSize !== 'all';

  // Active filter count
  const activeFilterCount =
    selectedSectors.length +
    selectedIndustries.length +
    selectedSubIndustries.length +
    selectedKeywords.length +
    selectedDistances.length +
    (selectedBrandSize !== 'all' ? 1 : 0);

  return (
    <div className="flex h-full">
      {/* Filter Sidebar */}
      <div className="w-80 bg-white border-r border-mist p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-electric-blue" />
            <h2 className="font-semibold text-midnight">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-electric-blue text-white text-xs px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          {hasFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-coral hover:text-red-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Sector Filter */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('sector')}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-mist/50"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-midnight/60" />
              <span className="font-medium text-sm">Sector</span>
              {selectedSectors.length > 0 && (
                <span className="bg-frost-blue text-electric-blue text-xs px-1.5 py-0.5 rounded">
                  {selectedSectors.length}
                </span>
              )}
            </div>
            {expandedSections.sector ? (
              <ChevronDown className="w-4 h-4 text-midnight/40" />
            ) : (
              <ChevronRight className="w-4 h-4 text-midnight/40" />
            )}
          </button>
          {expandedSections.sector && (
            <div className="mt-2 space-y-1 pl-2">
              {SECTORS.map(sector => (
                <label
                  key={sector}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-mist/30 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(sector)}
                    onChange={() => toggleSector(sector)}
                    className="rounded border-mist text-electric-blue focus:ring-electric-blue"
                  />
                  <span className="text-sm text-midnight">{sector}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Industry Filter */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('industry')}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-mist/50"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-midnight/60" />
              <span className="font-medium text-sm">Industry</span>
              {selectedIndustries.length > 0 && (
                <span className="bg-frost-blue text-electric-blue text-xs px-1.5 py-0.5 rounded">
                  {selectedIndustries.length}
                </span>
              )}
            </div>
            {expandedSections.industry ? (
              <ChevronDown className="w-4 h-4 text-midnight/40" />
            ) : (
              <ChevronRight className="w-4 h-4 text-midnight/40" />
            )}
          </button>
          {expandedSections.industry && (
            <div className="mt-2 space-y-1 pl-2 max-h-48 overflow-y-auto">
              {availableIndustries.length === 0 ? (
                <p className="text-sm text-midnight/40 italic p-2">Select a sector first</p>
              ) : (
                availableIndustries.map(industry => (
                  <label
                    key={industry}
                    className="flex items-center gap-2 p-1.5 rounded hover:bg-mist/30 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndustries.includes(industry)}
                      onChange={() => toggleIndustry(industry)}
                      className="rounded border-mist text-electric-blue focus:ring-electric-blue"
                    />
                    <span className="text-sm text-midnight">{industry}</span>
                  </label>
                ))
              )}
            </div>
          )}
        </div>

        {/* Sub-Industry Filter */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('subIndustry')}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-mist/50"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-midnight/60" />
              <span className="font-medium text-sm">Sub-Industry</span>
              {selectedSubIndustries.length > 0 && (
                <span className="bg-frost-blue text-electric-blue text-xs px-1.5 py-0.5 rounded">
                  {selectedSubIndustries.length}
                </span>
              )}
            </div>
            {expandedSections.subIndustry ? (
              <ChevronDown className="w-4 h-4 text-midnight/40" />
            ) : (
              <ChevronRight className="w-4 h-4 text-midnight/40" />
            )}
          </button>
          {expandedSections.subIndustry && (
            <div className="mt-2 space-y-1 pl-2 max-h-48 overflow-y-auto">
              {availableSubIndustries.length === 0 ? (
                <p className="text-sm text-midnight/40 italic p-2">Select an industry first</p>
              ) : (
                availableSubIndustries.map(subIndustry => (
                  <label
                    key={subIndustry}
                    className="flex items-center gap-2 p-1.5 rounded hover:bg-mist/30 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubIndustries.includes(subIndustry)}
                      onChange={() => toggleSubIndustry(subIndustry)}
                      className="rounded border-mist text-electric-blue focus:ring-electric-blue"
                    />
                    <span className="text-sm text-midnight">{subIndustry}</span>
                  </label>
                ))
              )}
            </div>
          )}
        </div>

        {/* Keyword Filter */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('keyword')}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-mist/50"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-midnight/60" />
              <span className="font-medium text-sm">Keyword</span>
              {selectedKeywords.length > 0 && (
                <span className="bg-frost-blue text-electric-blue text-xs px-1.5 py-0.5 rounded">
                  {selectedKeywords.length}
                </span>
              )}
            </div>
            {expandedSections.keyword ? (
              <ChevronDown className="w-4 h-4 text-midnight/40" />
            ) : (
              <ChevronRight className="w-4 h-4 text-midnight/40" />
            )}
          </button>
          {expandedSections.keyword && (
            <div className="mt-2 space-y-1 pl-2 max-h-48 overflow-y-auto">
              {availableKeywords.length === 0 ? (
                <p className="text-sm text-midnight/40 italic p-2">Select a sub-industry first</p>
              ) : (
                availableKeywords.map(keyword => (
                  <label
                    key={keyword}
                    className="flex items-center gap-2 p-1.5 rounded hover:bg-mist/30 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedKeywords.includes(keyword)}
                      onChange={() => toggleKeyword(keyword)}
                      className="rounded border-mist text-electric-blue focus:ring-electric-blue"
                    />
                    <span className="text-sm text-midnight">{keyword}</span>
                  </label>
                ))
              )}
            </div>
          )}
        </div>

        {/* Distance Filter */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('distance')}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-mist/50"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-midnight/60" />
              <span className="font-medium text-sm">Distance</span>
              {selectedDistances.length > 0 && (
                <span className="bg-frost-blue text-electric-blue text-xs px-1.5 py-0.5 rounded">
                  {selectedDistances.length}
                </span>
              )}
            </div>
            {expandedSections.distance ? (
              <ChevronDown className="w-4 h-4 text-midnight/40" />
            ) : (
              <ChevronRight className="w-4 h-4 text-midnight/40" />
            )}
          </button>
          {expandedSections.distance && (
            <div className="mt-2 space-y-1 pl-2">
              {DISTANCE_BUCKETS.map(distance => (
                <label
                  key={distance}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-mist/30 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedDistances.includes(distance)}
                    onChange={() => toggleDistance(distance)}
                    className="rounded border-mist text-electric-blue focus:ring-electric-blue"
                  />
                  <span className="text-sm text-midnight">{distance}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brand Size Filter */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('brandSize')}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-mist/50"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-midnight/60" />
              <span className="font-medium text-sm">Brand Size</span>
              {selectedBrandSize !== 'all' && (
                <span className="bg-frost-blue text-electric-blue text-xs px-1.5 py-0.5 rounded">
                  1
                </span>
              )}
            </div>
            {expandedSections.brandSize ? (
              <ChevronDown className="w-4 h-4 text-midnight/40" />
            ) : (
              <ChevronRight className="w-4 h-4 text-midnight/40" />
            )}
          </button>
          {expandedSections.brandSize && (
            <div className="mt-2 space-y-1 pl-2">
              <label className="flex items-center gap-2 p-1.5 rounded hover:bg-mist/30 cursor-pointer">
                <input
                  type="radio"
                  name="brandSize"
                  checked={selectedBrandSize === 'all'}
                  onChange={() => setSelectedBrandSize('all')}
                  className="border-mist text-electric-blue focus:ring-electric-blue"
                />
                <span className="text-sm text-midnight">All Sizes</span>
              </label>
              {BRAND_SIZES.map(size => (
                <label
                  key={size}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-mist/30 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="brandSize"
                    checked={selectedBrandSize === size}
                    onChange={() => setSelectedBrandSize(size)}
                    className="border-mist text-electric-blue focus:ring-electric-blue"
                  />
                  <span className="text-sm text-midnight">{size}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-midnight mb-2">
            Data <span className="text-electric-blue">Explorer</span>
          </h1>
          <p className="text-midnight/60">
            Filter and analyze Scout data across the full hierarchy
          </p>
        </div>

        {/* Active Filters Display */}
        {hasFilters && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedSectors.map(sector => (
              <span
                key={sector}
                className="inline-flex items-center gap-1 px-3 py-1 bg-frost-blue text-sea-blue rounded-full text-sm"
              >
                {sector}
                <button onClick={() => toggleSector(sector)} className="hover:text-coral">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedIndustries.map(industry => (
              <span
                key={industry}
                className="inline-flex items-center gap-1 px-3 py-1 bg-electric-blue/10 text-electric-blue rounded-full text-sm"
              >
                {industry}
                <button onClick={() => toggleIndustry(industry)} className="hover:text-coral">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedSubIndustries.map(sub => (
              <span
                key={sub}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {sub}
                <button onClick={() => toggleSubIndustry(sub)} className="hover:text-coral">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedKeywords.map(kw => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                &quot;{kw}&quot;
                <button onClick={() => toggleKeyword(kw)} className="hover:text-coral">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedDistances.map(dist => (
              <span
                key={dist}
                className="inline-flex items-center gap-1 px-3 py-1 bg-mist text-midnight/70 rounded-full text-sm"
              >
                {dist}
                <button onClick={() => toggleDistance(dist)} className="hover:text-coral">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Metrics Cards */}
        {metrics ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Rank Advantage"
                value={`+${metrics.rankAdvantage}`}
                subtitle="Yext vs non-Yext"
                trend="up"
                trendValue="positions"
                icon={<TrendingUp className="w-5 h-5" />}
                highlight
              />
              <MetricCard
                title="Completeness Gap"
                value={`+${metrics.completenessGap}%`}
                subtitle={`${metrics.avgCompletenessYext}% vs ${metrics.avgCompletenessNonYext}%`}
                icon={<Building2 className="w-5 h-5" />}
              />
              <MetricCard
                title="Top 3 Improvement"
                value={`+${metrics.top3Improvement}%`}
                subtitle={`${(metrics.top3RateYext * 100).toFixed(1)}% vs ${(metrics.top3RateNonYext * 100).toFixed(1)}%`}
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <MetricCard
                title="Data Volume"
                value={(metrics.yextResults + metrics.nonYextResults).toLocaleString()}
                subtitle={`${metrics.yextBusinesses.toLocaleString()} Yext businesses`}
                icon={<Users className="w-5 h-5" />}
              />
            </div>

            {/* Comparison Bars */}
            <div className="bg-white rounded-2xl border border-mist p-6 mb-8">
              <h2 className="text-lg font-semibold text-midnight mb-6">Performance Comparison</h2>
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
                  label="Profile Completeness"
                  format="number"
                />
                <ComparisonBar
                  yextValue={metrics.top3RateYext}
                  nonYextValue={metrics.top3RateNonYext}
                  label="Top 3 Appearance Rate"
                  format="percent"
                />
              </div>
            </div>

            {/* Industry Breakdown */}
            {filteredIndustryMetrics.length > 0 && (
              <div className="bg-white rounded-2xl border border-mist p-6">
                <h2 className="text-lg font-semibold text-midnight mb-6">Industry Breakdown</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-mist/50">
                        <th className="text-left p-3 text-sm font-semibold text-midnight/70">Industry</th>
                        <th className="text-left p-3 text-sm font-semibold text-midnight/70">Sector</th>
                        <th className="text-right p-3 text-sm font-semibold text-midnight/70">Yext Rank</th>
                        <th className="text-right p-3 text-sm font-semibold text-midnight/70">Non-Yext Rank</th>
                        <th className="text-right p-3 text-sm font-semibold text-midnight/70">Advantage</th>
                        <th className="text-right p-3 text-sm font-semibold text-midnight/70">Completeness Gap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIndustryMetrics.slice(0, 15).map((m, i) => (
                        <tr key={`${m.sector}-${m.industry}`} className={i % 2 === 0 ? 'bg-white' : 'bg-mist/20'}>
                          <td className="p-3 font-medium text-midnight">{m.industry}</td>
                          <td className="p-3 text-midnight/60 text-sm">{m.sector}</td>
                          <td className="p-3 text-right text-electric-blue font-semibold">#{m.avgRankYext}</td>
                          <td className="p-3 text-right text-midnight/60">#{m.avgRankNonYext}</td>
                          <td className="p-3 text-right">
                            <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                              +{m.rankAdvantage}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <span className="inline-block px-2 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue font-semibold text-sm">
                              +{m.completenessGap}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-mist p-12 text-center">
            <p className="text-midnight/60">
              No data matches your current filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
