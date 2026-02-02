'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  FileText,
  Building2,
  Users,
  Target,
  Download,
  ChevronRight,
  TrendingUp,
  Award,
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowUp,
  Printer
} from 'lucide-react';
import { Sector } from '@/types';
import { SECTORS } from '@/data/mockData';
import { brands, getBrandComparison, searchBrands } from '@/data/brands';
import { sectorHierarchy } from '@/data/hierarchy';

type ReportType = 'industry' | 'client' | 'prospect';

interface ReportConfig {
  type: ReportType;
  industry?: string;
  sector?: Sector;
  brandName?: string;
  prospectName?: string;
  prospectIndustry?: string;
}

export default function Reports() {
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);
  const [config, setConfig] = useState<ReportConfig>({ type: 'industry' });
  const [showPreview, setShowPreview] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const reportTypes = [
    {
      id: 'industry' as ReportType,
      title: 'Industry Report',
      description: 'Showcase Yext advantage in a specific vertical',
      icon: Building2,
      useCase: 'Perfect for: Prospecting calls, trade shows, vertical marketing',
      color: 'electric-blue',
    },
    {
      id: 'client' as ReportType,
      title: 'Client Report',
      description: 'Show how a Yext customer outperforms their peers',
      icon: Award,
      useCase: 'Perfect for: QBRs, renewal conversations, upsell opportunities',
      color: 'green-600',
    },
    {
      id: 'prospect' as ReportType,
      title: 'Prospect Report',
      description: 'Reveal competitive gaps for non-Yext businesses',
      icon: Target,
      useCase: 'Perfect for: Sales pitches, competitive displacement, demos',
      color: 'coral',
    },
  ];

  const industries = config.sector
    ? sectorHierarchy.find(s => s.sector === config.sector)?.industries.map(i => i.name) || []
    : [];

  const brandResults = brandSearch.trim()
    ? searchBrands(brandSearch).slice(0, 6)
    : [];

  const handleGenerateReport = () => {
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const canGenerate = () => {
    if (selectedType === 'industry') {
      return config.sector && config.industry;
    }
    if (selectedType === 'client') {
      return config.brandName;
    }
    if (selectedType === 'prospect') {
      return config.prospectName && config.prospectIndustry;
    }
    return false;
  };

  // Get data for reports
  const getClientData = () => {
    if (!config.brandName) return null;
    return getBrandComparison(config.brandName);
  };

  const getIndustryData = () => {
    // Mock industry-level data
    const yextAdvantage = 2.3 + Math.random() * 1.5;
    const completenessGap = 15 + Math.floor(Math.random() * 20);
    const top3Improvement = 18 + Math.floor(Math.random() * 15);

    return {
      industry: config.industry,
      sector: config.sector,
      yextAvgRank: 3.2 + Math.random() * 2,
      nonYextAvgRank: 3.2 + Math.random() * 2 + yextAdvantage,
      rankAdvantage: yextAdvantage,
      yextCompleteness: 78 + Math.floor(Math.random() * 15),
      nonYextCompleteness: 78 + Math.floor(Math.random() * 15) - completenessGap,
      completenessGap,
      yextTop3Rate: 0.42 + Math.random() * 0.2,
      nonYextTop3Rate: 0.42 + Math.random() * 0.2 - (top3Improvement / 100),
      top3Improvement,
      totalBusinesses: 5000 + Math.floor(Math.random() * 10000),
      yextBusinesses: 800 + Math.floor(Math.random() * 1500),
    };
  };

  const getProspectData = () => {
    // Simulate what a prospect is missing
    return {
      prospectName: config.prospectName,
      industry: config.prospectIndustry,
      estimatedRank: 6.2 + Math.random() * 3,
      industryYextAvg: 3.4 + Math.random() * 1.5,
      rankGap: 2.8 + Math.random() * 2,
      estimatedCompleteness: 45 + Math.floor(Math.random() * 25),
      yextAvgCompleteness: 82 + Math.floor(Math.random() * 10),
      completenessGap: 25 + Math.floor(Math.random() * 20),
      missedTop3: 35 + Math.floor(Math.random() * 25),
      potentialImprovement: 40 + Math.floor(Math.random() * 30),
      competitorsUsingYext: 3 + Math.floor(Math.random() * 5),
    };
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-midnight mb-2">
          Report <span className="text-electric-blue">Generator</span>
        </h1>
        <p className="text-midnight/60">
          Create compelling visual reports for sales conversations and client reviews
        </p>
      </div>

      {!showPreview ? (
        <>
          {/* Report Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;

              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setConfig({ type: type.id });
                  }}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? `border-${type.color} bg-${type.color}/5`
                      : 'border-mist hover:border-midnight/20 bg-white'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected ? `bg-${type.color} text-white` : 'bg-mist text-midnight/60'
                  }`}
                  style={isSelected ? { backgroundColor: type.color === 'electric-blue' ? '#259BBC' : type.color === 'green-600' ? '#16a34a' : '#FF6B5B' } : {}}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-midnight mb-2">{type.title}</h3>
                  <p className="text-sm text-midnight/60 mb-3">{type.description}</p>
                  <p className="text-xs text-midnight/40">{type.useCase}</p>
                </button>
              );
            })}
          </div>

          {/* Configuration Panel */}
          {selectedType && (
            <div className="bg-white rounded-2xl border border-mist p-6 mb-6">
              <h2 className="text-lg font-semibold text-midnight mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-electric-blue" />
                Configure Your Report
              </h2>

              {/* Industry Report Config */}
              {selectedType === 'industry' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-midnight/70 mb-2">
                      Select Sector
                    </label>
                    <select
                      value={config.sector || ''}
                      onChange={(e) => setConfig({ ...config, sector: e.target.value as Sector, industry: undefined })}
                      className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
                    >
                      <option value="">Choose a sector...</option>
                      {SECTORS.map((sector) => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-midnight/70 mb-2">
                      Select Industry
                    </label>
                    <select
                      value={config.industry || ''}
                      onChange={(e) => setConfig({ ...config, industry: e.target.value })}
                      disabled={!config.sector}
                      className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue disabled:bg-mist/50 disabled:cursor-not-allowed"
                    >
                      <option value="">Choose an industry...</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Client Report Config */}
              {selectedType === 'client' && (
                <div className="max-w-md">
                  <label className="block text-sm font-medium text-midnight/70 mb-2">
                    Select Yext Client
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for a client..."
                      value={brandSearch}
                      onChange={(e) => {
                        setBrandSearch(e.target.value);
                        setShowBrandDropdown(true);
                      }}
                      onFocus={() => setShowBrandDropdown(true)}
                      className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
                    />
                    {showBrandDropdown && brandResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-mist rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        {brandResults.filter(b => b.isYext).map((brand) => (
                          <button
                            key={brand.brandName}
                            onClick={() => {
                              setConfig({ ...config, brandName: brand.brandName });
                              setBrandSearch(brand.brandName);
                              setShowBrandDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-mist/50 first:rounded-t-xl last:rounded-b-xl"
                          >
                            <p className="font-medium text-midnight">{brand.brandName}</p>
                            <p className="text-sm text-midnight/60">{brand.industry} • {brand.locationCount.toLocaleString()} locations</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {config.brandName && (
                    <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-200">
                      <p className="text-sm text-green-700 font-medium">Selected: {config.brandName}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Prospect Report Config */}
              {selectedType === 'prospect' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-midnight/70 mb-2">
                      Prospect Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., ABC Dental Group"
                      value={config.prospectName || ''}
                      onChange={(e) => setConfig({ ...config, prospectName: e.target.value })}
                      className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-midnight/70 mb-2">
                      Their Industry
                    </label>
                    <select
                      value={config.prospectIndustry || ''}
                      onChange={(e) => setConfig({ ...config, prospectIndustry: e.target.value })}
                      className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
                    >
                      <option value="">Choose an industry...</option>
                      {Object.values(sectorHierarchy).flatMap(s => s.industries.map(i => i.name)).map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Generate Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleGenerateReport}
                  disabled={!canGenerate()}
                  className="px-6 py-3 bg-electric-blue text-white font-semibold rounded-xl hover:bg-sea-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Generate Report
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Report Preview Actions */}
          <div className="flex items-center justify-between mb-6 print:hidden">
            <button
              onClick={() => setShowPreview(false)}
              className="text-midnight/60 hover:text-midnight flex items-center gap-2"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back to Configuration
            </button>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 border border-mist rounded-xl hover:bg-mist/50 flex items-center gap-2 text-midnight"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>
          </div>

          {/* Report Preview */}
          <div ref={reportRef} className="bg-white rounded-2xl border border-mist overflow-hidden print:border-0 print:rounded-none">

            {/* Industry Report */}
            {selectedType === 'industry' && (
              <IndustryReportTemplate data={getIndustryData()} />
            )}

            {/* Client Report */}
            {selectedType === 'client' && (
              <ClientReportTemplate data={getClientData()} />
            )}

            {/* Prospect Report */}
            {selectedType === 'prospect' && (
              <ProspectReportTemplate data={getProspectData()} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Industry Report Template
function IndustryReportTemplate({ data }: { data: ReturnType<typeof Object> | null }) {
  if (!data) return null;
  const d = data as {
    industry: string;
    sector: string;
    rankAdvantage: number;
    yextAvgRank: number;
    nonYextAvgRank: number;
    completenessGap: number;
    yextCompleteness: number;
    nonYextCompleteness: number;
    top3Improvement: number;
    yextTop3Rate: number;
    nonYextTop3Rate: number;
    totalBusinesses: number;
    yextBusinesses: number;
  };

  return (
    <div className="p-8 print:p-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-mist">
        <div>
          <p className="text-sm text-electric-blue font-semibold uppercase tracking-wider mb-1">Industry Analysis</p>
          <h1 className="text-3xl font-bold text-midnight">{d.industry}</h1>
          <p className="text-midnight/60 mt-1">{d.sector} Sector</p>
        </div>
        <div className="text-right">
          <Image
            src="/images/Yext_Logo_SQUARE.svg"
            alt="Yext"
            width={48}
            height={48}
            className="mb-2 ml-auto rounded-xl"
          />
          <p className="text-xs text-midnight/40">Powered by Yext Scout</p>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-gradient-to-r from-electric-blue to-sea-blue rounded-2xl p-6 text-white mb-8">
        <p className="text-white/80 text-sm mb-2">Key Finding</p>
        <p className="text-2xl font-semibold">
          Yext customers in {d.industry} rank <span className="text-3xl font-bold">{d.rankAdvantage.toFixed(1)}</span> positions higher on average
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-mist/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-electric-blue" />
            <span className="font-semibold text-midnight">Rank Advantage</span>
          </div>
          <div className="flex items-end gap-4">
            <div>
              <p className="text-4xl font-bold text-electric-blue">#{d.yextAvgRank.toFixed(1)}</p>
              <p className="text-sm text-midnight/60">Yext Avg</p>
            </div>
            <div className="text-midnight/40">vs</div>
            <div>
              <p className="text-2xl font-semibold text-midnight/60">#{d.nonYextAvgRank.toFixed(1)}</p>
              <p className="text-sm text-midnight/40">Non-Yext</p>
            </div>
          </div>
        </div>

        <div className="bg-mist/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-midnight">Profile Completeness</span>
          </div>
          <div className="flex items-end gap-4">
            <div>
              <p className="text-4xl font-bold text-green-600">{d.yextCompleteness}%</p>
              <p className="text-sm text-midnight/60">Yext Avg</p>
            </div>
            <div className="text-midnight/40">vs</div>
            <div>
              <p className="text-2xl font-semibold text-midnight/60">{d.nonYextCompleteness}%</p>
              <p className="text-sm text-midnight/40">Non-Yext</p>
            </div>
          </div>
        </div>

        <div className="bg-mist/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-semibold text-midnight">Top 3 Appearance</span>
          </div>
          <div className="flex items-end gap-4">
            <div>
              <p className="text-4xl font-bold text-amber-500">{(d.yextTop3Rate * 100).toFixed(0)}%</p>
              <p className="text-sm text-midnight/60">Yext Rate</p>
            </div>
            <div className="text-midnight/40">vs</div>
            <div>
              <p className="text-2xl font-semibold text-midnight/60">{(d.nonYextTop3Rate * 100).toFixed(0)}%</p>
              <p className="text-sm text-midnight/40">Non-Yext</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Comparison */}
      <div className="mb-8">
        <h3 className="font-semibold text-midnight mb-4">Performance Comparison</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-midnight/60">Average Search Rank (lower is better)</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex-1 bg-mist rounded-full h-8 overflow-hidden flex">
                <div
                  className="bg-electric-blue h-full flex items-center justify-end pr-3"
                  style={{ width: `${(1 - d.yextAvgRank / 10) * 100}%` }}
                >
                  <span className="text-white text-sm font-semibold">Yext #{d.yextAvgRank.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <div className="flex-1 bg-mist rounded-full h-8 overflow-hidden flex">
                <div
                  className="bg-midnight/30 h-full flex items-center justify-end pr-3"
                  style={{ width: `${(1 - d.nonYextAvgRank / 10) * 100}%` }}
                >
                  <span className="text-midnight text-sm font-semibold">Non-Yext #{d.nonYextAvgRank.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="flex justify-between pt-6 border-t border-mist text-sm text-midnight/60">
        <p>Based on {d.totalBusinesses.toLocaleString()} businesses analyzed</p>
        <p>{d.yextBusinesses.toLocaleString()} Yext customers in dataset</p>
      </div>
    </div>
  );
}

// Client Report Template
function ClientReportTemplate({ data }: { data: ReturnType<typeof getBrandComparison> }) {
  if (!data) return <div className="p-8 text-center text-midnight/60">No data available</div>;

  return (
    <div className="p-8 print:p-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-mist">
        <div>
          <p className="text-sm text-green-600 font-semibold uppercase tracking-wider mb-1">Client Performance Report</p>
          <h1 className="text-3xl font-bold text-midnight">{data.brand.brandName}</h1>
          <p className="text-midnight/60 mt-1">{data.brand.industry} • {data.brand.locationCount.toLocaleString()} locations</p>
        </div>
        <div className="text-right">
          <Image
            src="/images/Yext_Logo_SQUARE.svg"
            alt="Yext"
            width={48}
            height={48}
            className="mb-2 ml-auto rounded-xl"
          />
          <p className="text-xs text-midnight/40">Yext Customer</p>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white mb-8">
        <p className="text-white/80 text-sm mb-2">Performance Summary</p>
        <p className="text-2xl font-semibold">
          {data.brand.brandName} outperforms <span className="text-3xl font-bold">{100 - data.industryPeers.brandRankPercentile}%</span> of industry peers
        </p>
      </div>

      {/* Your Performance */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-mist/30 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-midnight">#{data.brand.avgRank.toFixed(1)}</p>
          <p className="text-sm text-midnight/60">Avg Rank</p>
        </div>
        <div className="bg-mist/30 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-midnight">{data.brand.avgCompleteness}%</p>
          <p className="text-sm text-midnight/60">Completeness</p>
        </div>
        <div className="bg-mist/30 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-midnight">{(data.brand.top3Rate * 100).toFixed(0)}%</p>
          <p className="text-sm text-midnight/60">Top 3 Rate</p>
        </div>
        <div className="bg-mist/30 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-midnight">{data.brand.totalAppearances.toLocaleString()}</p>
          <p className="text-sm text-midnight/60">Search Appearances</p>
        </div>
      </div>

      {/* vs Industry Peers */}
      <div className="mb-8">
        <h3 className="font-semibold text-midnight mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-electric-blue" />
          vs Industry Peers ({data.industryPeers.totalBrands} brands)
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-mist rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">Better Rank</span>
            </div>
            <p className="text-2xl font-bold text-midnight">
              +{(data.industryPeers.avgRank - data.brand.avgRank).toFixed(1)} positions
            </p>
            <p className="text-sm text-midnight/60">vs industry avg #{data.industryPeers.avgRank.toFixed(1)}</p>
          </div>
          <div className="border border-mist rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">More Complete</span>
            </div>
            <p className="text-2xl font-bold text-midnight">
              +{data.brand.avgCompleteness - data.industryPeers.avgCompleteness}%
            </p>
            <p className="text-sm text-midnight/60">vs industry avg {data.industryPeers.avgCompleteness}%</p>
          </div>
          <div className="border border-mist rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">Higher Visibility</span>
            </div>
            <p className="text-2xl font-bold text-midnight">
              +{((data.brand.top3Rate - data.industryPeers.top3Rate) * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-midnight/60">top 3 rate vs peers</p>
          </div>
        </div>
      </div>

      {/* Competitive Position */}
      <div className="mb-8">
        <h3 className="font-semibold text-midnight mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-coral" />
          Competitive Position
        </h3>
        <div className="bg-mist/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-midnight/60">Industry Rank Percentile</span>
            <span className="text-sm font-semibold text-midnight">Top {100 - data.industryPeers.brandRankPercentile}%</span>
          </div>
          <div className="h-4 bg-mist rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              style={{ width: `${100 - data.industryPeers.brandRankPercentile}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-6 border-t border-mist text-sm text-midnight/60">
        <p>Report generated {new Date().toLocaleDateString()}</p>
        <p>Powered by Yext Scout Analytics</p>
      </div>
    </div>
  );
}

// Prospect Report Template
function ProspectReportTemplate({ data }: { data: ReturnType<typeof Object> | null }) {
  if (!data) return null;
  const d = data as {
    prospectName: string;
    industry: string;
    estimatedRank: number;
    industryYextAvg: number;
    rankGap: number;
    estimatedCompleteness: number;
    yextAvgCompleteness: number;
    completenessGap: number;
    missedTop3: number;
    potentialImprovement: number;
    competitorsUsingYext: number;
  };

  return (
    <div className="p-8 print:p-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-mist">
        <div>
          <p className="text-sm text-coral font-semibold uppercase tracking-wider mb-1">Competitive Analysis</p>
          <h1 className="text-3xl font-bold text-midnight">{d.prospectName}</h1>
          <p className="text-midnight/60 mt-1">{d.industry}</p>
        </div>
        <div className="text-right">
          <Image
            src="/images/Yext_Logo_SQUARE.svg"
            alt="Yext"
            width={48}
            height={48}
            className="mb-2 ml-auto rounded-xl"
          />
          <p className="text-xs text-midnight/40">Opportunity Analysis</p>
        </div>
      </div>

      {/* Opportunity Alert */}
      <div className="bg-gradient-to-r from-coral to-red-500 rounded-2xl p-6 text-white mb-8">
        <p className="text-white/80 text-sm mb-2">Opportunity Identified</p>
        <p className="text-2xl font-semibold">
          {d.prospectName} is missing <span className="text-3xl font-bold">{d.missedTop3}%</span> of potential top 3 placements
        </p>
      </div>

      {/* Current State */}
      <div className="mb-8">
        <h3 className="font-semibold text-midnight mb-4 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-coral" />
          Current Performance Gaps
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-coral/30 bg-coral/5 rounded-xl p-4">
            <p className="text-sm text-coral font-medium mb-1">Search Rank</p>
            <p className="text-3xl font-bold text-midnight">#{d.estimatedRank.toFixed(1)}</p>
            <p className="text-sm text-midnight/60 mt-2">
              Yext customers avg: <span className="font-semibold text-electric-blue">#{d.industryYextAvg.toFixed(1)}</span>
            </p>
            <div className="mt-2 px-2 py-1 bg-coral/20 rounded text-coral text-xs font-semibold inline-block">
              {d.rankGap.toFixed(1)} positions behind
            </div>
          </div>
          <div className="border-2 border-coral/30 bg-coral/5 rounded-xl p-4">
            <p className="text-sm text-coral font-medium mb-1">Profile Completeness</p>
            <p className="text-3xl font-bold text-midnight">{d.estimatedCompleteness}%</p>
            <p className="text-sm text-midnight/60 mt-2">
              Yext customers avg: <span className="font-semibold text-electric-blue">{d.yextAvgCompleteness}%</span>
            </p>
            <div className="mt-2 px-2 py-1 bg-coral/20 rounded text-coral text-xs font-semibold inline-block">
              {d.completenessGap}% gap
            </div>
          </div>
          <div className="border-2 border-coral/30 bg-coral/5 rounded-xl p-4">
            <p className="text-sm text-coral font-medium mb-1">Competitors on Yext</p>
            <p className="text-3xl font-bold text-midnight">{d.competitorsUsingYext}</p>
            <p className="text-sm text-midnight/60 mt-2">
              in their competitive set
            </p>
            <div className="mt-2 px-2 py-1 bg-coral/20 rounded text-coral text-xs font-semibold inline-block">
              Competitive risk
            </div>
          </div>
        </div>
      </div>

      {/* Yext Opportunity */}
      <div className="mb-8">
        <h3 className="font-semibold text-midnight mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          With Yext: Projected Improvement
        </h3>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <ArrowUp className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-green-600">+{d.rankGap.toFixed(1)}</p>
              <p className="text-sm text-midnight/60">Rank Positions</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <ArrowUp className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-green-600">+{d.completenessGap}%</p>
              <p className="text-sm text-midnight/60">Completeness</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <ArrowUp className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-green-600">+{d.potentialImprovement}%</p>
              <p className="text-sm text-midnight/60">More Top 3 Results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-midnight rounded-xl p-6 text-white text-center">
        <p className="text-lg font-semibold mb-2">Ready to outrank the competition?</p>
        <p className="text-white/70 text-sm">Contact your Yext representative to learn how we can help {d.prospectName} improve their local search visibility.</p>
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-6 mt-6 border-t border-mist text-sm text-midnight/60">
        <p>Analysis based on {d.industry} industry data</p>
        <p>Powered by Yext Scout Analytics</p>
      </div>
    </div>
  );
}
