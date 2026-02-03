'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Search,
  Building2,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Camera,
  MessageSquare,
  Clock,
  CheckCircle2,
  Users,
  Globe,
  BarChart3,
  Target,
  Zap,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';

// Mock SERP results for visualization
const serpResults = [
  { rank: 1, name: "Joe's Coffee House", distance: '0.2 mi', rating: 4.8, reviews: 342, isYext: true, photos: 89 },
  { rank: 2, name: 'Sunrise Cafe', distance: '0.4 mi', rating: 4.6, reviews: 218, isYext: false, photos: 34 },
  { rank: 3, name: 'Bean & Brew', distance: '0.3 mi', rating: 4.7, reviews: 456, isYext: true, photos: 124 },
  { rank: 4, name: 'Morning Glory Coffee', distance: '0.8 mi', rating: 4.5, reviews: 89, isYext: false, photos: 12 },
  { rank: 5, name: 'The Daily Grind', distance: '1.2 mi', rating: 4.4, reviews: 167, isYext: false, photos: 45 },
  { rank: 6, name: 'Central Perk', distance: '0.6 mi', rating: 4.3, reviews: 234, isYext: true, photos: 78 },
  { rank: 7, name: 'Espresso Express', distance: '1.5 mi', rating: 4.2, reviews: 56, isYext: false, photos: 8 },
];

// Elo simulation data
const eloSimulation = [
  { scan: 1, business: "Joe's Coffee", rank: 3, elo: 1500 },
  { scan: 2, business: "Joe's Coffee", rank: 2, elo: 1520 },
  { scan: 3, business: "Joe's Coffee", rank: 1, elo: 1548 },
  { scan: 4, business: "Joe's Coffee", rank: 1, elo: 1562 },
  { scan: 5, business: "Joe's Coffee", rank: 2, elo: 1555 },
  { scan: 6, business: "Joe's Coffee", rank: 1, elo: 1571 },
];

export default function MethodologyPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [eloStep, setEloStep] = useState(0);
  const [isEloPlaying, setIsEloPlaying] = useState(false);
  const [highlightedRank, setHighlightedRank] = useState<number | null>(null);

  // Auto-advance Elo simulation
  useEffect(() => {
    if (isEloPlaying && eloStep < eloSimulation.length - 1) {
      const timer = setTimeout(() => setEloStep(eloStep + 1), 1500);
      return () => clearTimeout(timer);
    } else if (eloStep >= eloSimulation.length - 1) {
      setIsEloPlaying(false);
    }
  }, [isEloPlaying, eloStep]);

  const sections = [
    { id: 'what', title: 'What Scout Does' },
    { id: 'scale', title: 'The Scale' },
    { id: 'distance', title: 'Distance Buckets' },
    { id: 'competition', title: 'Competitiveness' },
    { id: 'brands', title: 'Brand Size' },
    { id: 'elo', title: 'Elo Ranking' },
  ];

  return (
    <div className="min-h-screen bg-snow">
      {/* Hero */}
      <div className="bg-gradient-to-br from-midnight via-sea-blue to-electric-blue text-white py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Image src="/images/Yext_Logo_White.svg" alt="Yext" width={24} height={24} />
            <span>Scout Methodology</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How We Built a Dataset to Understand Local Search
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            For years, marketers relied on impressions and rank as north star metrics.
            But both numbers lie a little. We wanted something better. So we built it.
          </p>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="sticky top-0 z-10 bg-white border-b border-mist py-4 px-8">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto">
          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === i
                  ? 'bg-electric-blue text-white'
                  : 'bg-mist text-midnight/70 hover:bg-frost-blue hover:text-sea-blue'
              }`}
              onClick={() => setActiveSection(i)}
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12 space-y-24">

        {/* Section 1: What Scout Does */}
        <section id="what" className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-midnight mb-6">What Scout Does</h2>
          <p className="text-lg text-midnight/70 mb-8">
            Scout virtually travels to any geographic coordinate and runs searches for specific
            keywords on Google, then records everything that comes back.
          </p>

          {/* SERP Visualization */}
          <div className="bg-white rounded-2xl border border-mist p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-electric-blue" />
              </div>
              <div>
                <p className="font-semibold text-midnight">Search: "coffee shop near me"</p>
                <p className="text-sm text-midnight/60">Location: 40.7128° N, 74.0060° W (Manhattan)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* SERP Results */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-midnight/60 mb-2">Search Results (Top 7 of 20+)</p>
                {serpResults.map((result) => (
                  <div
                    key={result.rank}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      highlightedRank === result.rank
                        ? 'border-electric-blue bg-frost-blue'
                        : result.isYext
                        ? 'border-green-200 bg-green-50'
                        : 'border-mist bg-white'
                    }`}
                    onMouseEnter={() => setHighlightedRank(result.rank)}
                    onMouseLeave={() => setHighlightedRank(null)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        result.rank <= 3 ? 'bg-electric-blue text-white' : 'bg-mist text-midnight/60'
                      }`}>
                        {result.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-midnight truncate">{result.name}</p>
                          {result.isYext && (
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded font-medium">
                              Yext
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-midnight/60">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {result.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500" />
                            {result.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {result.reviews}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* What We Capture */}
              <div className="bg-mist/50 rounded-xl p-6">
                <p className="font-semibold text-midnight mb-4">What We Capture For Each Result</p>
                <div className="space-y-4">
                  {[
                    { icon: Target, label: 'Rank Position', desc: 'Where they appear in results (1-40)' },
                    { icon: MapPin, label: 'Distance', desc: 'How far from search coordinates' },
                    { icon: Star, label: 'Star Rating', desc: 'Average review rating' },
                    { icon: MessageSquare, label: 'Review Count', desc: 'Total number of reviews' },
                    { icon: Camera, label: 'Photo Count', desc: 'Images on their profile' },
                    { icon: Clock, label: 'Hours & Attributes', desc: 'Business hours, amenities' },
                    { icon: CheckCircle2, label: 'Profile Completeness', desc: 'How filled out the GBP is' },
                    { icon: Zap, label: 'Yext-Powered', desc: 'Whether Yext manages the listing' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-electric-blue mt-0.5" />
                      <div>
                        <p className="font-medium text-midnight text-sm">{item.label}</p>
                        <p className="text-xs text-midnight/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-xl p-6">
            <p className="text-midnight/80">
              <strong className="text-midnight">Why this matters:</strong> We don't just capture rank.
              We capture <em>operational excellence</em>: what businesses are doing that might explain
              why they rank where they do. This gives us a full picture of performance.
            </p>
          </div>
        </section>

        {/* Section 2: The Scale */}
        <section id="scale" className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-midnight mb-6">The Scale of the Data</h2>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { value: '3,500+', label: 'Keywords Scanned', color: 'electric-blue' },
              { value: '87,000', label: 'Geographic Coordinates', color: 'sea-blue' },
              { value: '17.6M', label: 'Results Captured', color: 'green-600' },
              { value: '6.2M', label: 'Unique Businesses', color: 'amber-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-mist p-6 text-center">
                <p className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-midnight/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Sectors Visual */}
          <div className="bg-white rounded-2xl border border-mist p-6">
            <p className="font-semibold text-midnight mb-4">Coverage Across Sectors</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Retail', icon: '🛍️', pct: 22 },
                { name: 'Healthcare', icon: '🏥', pct: 18 },
                { name: 'Food & Beverage', icon: '🍽️', pct: 16 },
                { name: 'Finance', icon: '🏦', pct: 14 },
                { name: 'Business Services', icon: '💼', pct: 12 },
                { name: 'Hospitality', icon: '🏨', pct: 10 },
                { name: 'Organizations', icon: '🏛️', pct: 8 },
              ].map((sector) => (
                <div key={sector.name} className="bg-mist/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{sector.icon}</span>
                    <span className="font-medium text-midnight text-sm">{sector.name}</span>
                  </div>
                  <div className="h-2 bg-mist rounded-full overflow-hidden">
                    <div
                      className="h-full bg-electric-blue rounded-full"
                      style={{ width: `${sector.pct * 4}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Distance Buckets */}
        <section id="distance" className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-midnight mb-6">Distance From Search</h2>
          <p className="text-lg text-midnight/70 mb-8">
            Google favors proximity for local searches. A business 10 miles away can be excellent
            in every dimension and still struggle to crack the top results. We bucket by distance
            to control for this.
          </p>

          {/* Distance Visualization */}
          <div className="bg-white rounded-2xl border border-mist p-8 mb-8">
            <div className="relative max-w-lg mx-auto">
              {/* Concentric circles representing distance */}
              <div className="relative aspect-square">
                {/* 5+ miles */}
                <div className="absolute inset-0 rounded-full bg-midnight/5 flex items-center justify-center">
                  <span className="absolute top-2 right-2 text-xs font-medium text-midnight/40">5+ miles</span>
                </div>
                {/* 3-5 miles */}
                <div className="absolute inset-[15%] rounded-full bg-electric-blue/10 flex items-center justify-center">
                  <span className="absolute top-2 right-2 text-xs font-medium text-electric-blue/60">3-5 mi</span>
                </div>
                {/* 1-3 miles */}
                <div className="absolute inset-[30%] rounded-full bg-electric-blue/20 flex items-center justify-center">
                  <span className="absolute top-1 right-1 text-xs font-medium text-electric-blue/80">1-3 mi</span>
                </div>
                {/* 0-1 mile */}
                <div className="absolute inset-[45%] rounded-full bg-electric-blue/40 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">0-1 mi</span>
                </div>
                {/* Center pin */}
                <div className="absolute inset-[48%] rounded-full bg-electric-blue flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>

                {/* Sample businesses */}
                <div className="absolute top-[20%] left-[25%] w-3 h-3 rounded-full bg-coral" title="Business 5+ mi away" />
                <div className="absolute top-[35%] right-[20%] w-3 h-3 rounded-full bg-amber-500" title="Business 3-5 mi away" />
                <div className="absolute bottom-[30%] left-[35%] w-3 h-3 rounded-full bg-green-500" title="Business 1-3 mi away" />
                <div className="absolute top-[45%] right-[42%] w-3 h-3 rounded-full bg-electric-blue" title="Business < 1 mi away" />
              </div>
            </div>
          </div>

          {/* Distance buckets explanation */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-electric-blue/10 border border-electric-blue/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-electric-blue" />
                <p className="font-semibold text-midnight">Within 1 Mile - "Fair Fight"</p>
              </div>
              <p className="text-sm text-midnight/70">
                Everyone has proximity on their side. This cohort isolates how operational
                excellence affects rank when distance isn't a factor.
              </p>
            </div>
            <div className="bg-coral/10 border border-coral/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-coral" />
                <p className="font-semibold text-midnight">5+ Miles - "Punching Above Weight"</p>
              </div>
              <p className="text-sm text-midnight/70">
                Businesses ranking despite the distance penalty. What do they have in common?
                Usually: exceptional profiles, high review counts, strong ratings.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Competitiveness */}
        <section id="competition" className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-midnight mb-6">Competitive Intensity</h2>
          <p className="text-lg text-midnight/70 mb-8">
            Ranking #5 in a 200-business battlefield means something different than ranking #5
            in a 15-business pond. We measure competitiveness by counting distinct businesses
            that have appeared for each keyword-location pair.
          </p>

          {/* Competitiveness Visual */}
          <div className="bg-white rounded-2xl border border-mist p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { level: 'Uncompetitive', range: '< 20 businesses', example: '"surf shop" in Iowa', color: 'green-500', density: 3 },
                { level: 'Standard', range: '20-49 businesses', example: '"dentist" in suburbs', color: 'electric-blue', density: 6 },
                { level: 'Competitive', range: '50-99 businesses', example: '"pizza" in small city', color: 'amber-500', density: 10 },
                { level: 'Ultra Competitive', range: '100+ businesses', example: '"coffee shop" in Manhattan', color: 'coral', density: 16 },
              ].map((tier) => (
                <div key={tier.level} className="text-center">
                  <div className="h-32 bg-mist/50 rounded-xl mb-3 flex items-end justify-center p-3 relative overflow-hidden">
                    {/* Dots representing businesses */}
                    <div className="absolute inset-3 flex flex-wrap gap-1 items-end justify-center">
                      {Array.from({ length: tier.density }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full bg-${tier.color}`}
                          style={{ opacity: 0.3 + (i / tier.density) * 0.7 }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className={`font-semibold text-${tier.color}`}>{tier.level}</p>
                  <p className="text-sm text-midnight/60">{tier.range}</p>
                  <p className="text-xs text-midnight/40 mt-1">{tier.example}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-midnight/80">
              <strong className="text-midnight">Why this matters:</strong> Benchmarks should be
              localized. A thousand photos might be overkill in rural Iowa and insufficient in
              Manhattan. Competitive intensity tells us what "good" looks like in each market.
            </p>
          </div>
        </section>

        {/* Section 5: Brand Size */}
        <section id="brands" className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-midnight mb-6">Brand Size Segmentation</h2>
          <p className="text-lg text-midnight/70 mb-8">
            Can a single-location mom-and-pop outrank Walmart? Under what conditions?
            We segment by brand size to answer these questions.
          </p>

          {/* Brand Size Visual */}
          <div className="bg-white rounded-2xl border border-mist p-6">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  size: 'Single Location',
                  range: '1 location',
                  icon: Building2,
                  example: "Joe's Corner Store",
                  visual: [1]
                },
                {
                  size: 'Regional',
                  range: '2-49 locations',
                  icon: Building2,
                  example: 'Midwest Auto Group',
                  visual: [1, 1, 1, 1, 1]
                },
                {
                  size: 'National',
                  range: '50-99 locations',
                  icon: Building2,
                  example: 'Premium Pet Supplies',
                  visual: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                },
                {
                  size: 'Large National',
                  range: '100+ locations',
                  icon: Globe,
                  example: 'Starbucks, CVS, etc.',
                  visual: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                },
              ].map((tier) => (
                <div key={tier.size} className="text-center">
                  <div className="h-24 bg-mist/50 rounded-xl mb-3 flex items-center justify-center p-3">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {tier.visual.map((_, i) => (
                        <tier.icon key={i} className="w-4 h-4 text-electric-blue" />
                      ))}
                    </div>
                  </div>
                  <p className="font-semibold text-midnight">{tier.size}</p>
                  <p className="text-sm text-midnight/60">{tier.range}</p>
                  <p className="text-xs text-midnight/40 mt-1 italic">{tier.example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Elo Ranking */}
        <section id="elo" className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-midnight mb-6">Why We Built Elo Ranking</h2>
          <p className="text-lg text-midnight/70 mb-8">
            Rank on any single search is noisy. Time of day, algorithm shifts, personalization
            all affect where a business shows up. We wanted a metric that reflects
            <strong> sustained performance over time</strong>.
          </p>

          {/* Elo Explanation */}
          <div className="bg-white rounded-2xl border border-mist p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold text-midnight">Elo Score Evolution Over Multiple Scans</p>
                <p className="text-sm text-midnight/60">Watch how Elo diverges from point-in-time rank</p>
              </div>
              <button
                onClick={() => {
                  if (eloStep >= eloSimulation.length - 1) {
                    setEloStep(0);
                  }
                  setIsEloPlaying(!isEloPlaying);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-sea-blue transition-colors"
              >
                {isEloPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isEloPlaying ? 'Pause' : eloStep >= eloSimulation.length - 1 ? 'Replay' : 'Play'}
              </button>
            </div>

            {/* Timeline */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {eloSimulation.map((scan, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all ${
                    i <= eloStep
                      ? 'border-electric-blue bg-frost-blue'
                      : 'border-mist bg-white'
                  }`}
                  style={{ minWidth: '140px' }}
                >
                  <p className="text-xs text-midnight/60 mb-1">Scan {scan.scan}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-midnight/60">Rank:</span>
                    <span className={`font-bold ${
                      i > 0 && scan.rank < eloSimulation[i - 1].rank
                        ? 'text-green-600'
                        : i > 0 && scan.rank > eloSimulation[i - 1].rank
                        ? 'text-coral'
                        : 'text-midnight'
                    }`}>
                      #{scan.rank}
                    </span>
                    {i > 0 && scan.rank < eloSimulation[i - 1].rank && (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    )}
                    {i > 0 && scan.rank > eloSimulation[i - 1].rank && (
                      <TrendingDown className="w-4 h-4 text-coral" />
                    )}
                    {i > 0 && scan.rank === eloSimulation[i - 1].rank && (
                      <Minus className="w-4 h-4 text-midnight/40" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-midnight/60">Elo:</span>
                    <span className="font-bold text-electric-blue">{scan.elo}</span>
                    {i > 0 && (
                      <span className={`text-xs ${
                        scan.elo > eloSimulation[i - 1].elo ? 'text-green-600' : 'text-coral'
                      }`}>
                        {scan.elo > eloSimulation[i - 1].elo ? '+' : ''}
                        {scan.elo - eloSimulation[i - 1].elo}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Current state explanation */}
            <div className="bg-mist/50 rounded-xl p-4">
              <p className="text-midnight/80">
                {eloStep === 0 && (
                  <>On the <strong>first scan</strong>, Google rank equals Elo rank. Everyone starts at 1500.</>
                )}
                {eloStep === 1 && (
                  <>Joe's Coffee moved up to <strong>rank #2</strong>. Because they beat higher-rated opponents, their Elo increased by 20 points.</>
                )}
                {eloStep === 2 && (
                  <>Now at <strong>#1</strong>! Elo jumps to 1548. Beating the previous #1 is worth more points than beating lower-ranked businesses.</>
                )}
                {eloStep === 3 && (
                  <>Holding <strong>#1</strong> again. Elo continues to climb, but gains slow down as the rating stabilizes.</>
                )}
                {eloStep === 4 && (
                  <>Dropped to <strong>#2</strong>. Elo takes a small hit (-7 points) but remains strong due to historical performance.</>
                )}
                {eloStep >= 5 && (
                  <>Back to <strong>#1</strong>! Over time, Elo reflects consistent performance, not single-scan noise. This business has proven staying power.</>
                )}
              </p>
            </div>
          </div>

          {/* Two views comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-mist p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-mist flex items-center justify-center">
                  <Target className="w-5 h-5 text-midnight/60" />
                </div>
                <div>
                  <p className="font-semibold text-midnight">Google Rank</p>
                  <p className="text-sm text-midnight/60">Point-in-time snapshot</p>
                </div>
              </div>
              <p className="text-midnight/70">
                What happened on this specific search, at this specific time.
                Useful for seeing current state, but noisy and volatile.
              </p>
            </div>
            <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-electric-blue" />
                </div>
                <div>
                  <p className="font-semibold text-midnight">Elo Rank</p>
                  <p className="text-sm text-electric-blue">Performance trajectory</p>
                </div>
              </div>
              <p className="text-midnight/70">
                How consistently you've outperformed competitors across many scans.
                Smooths out noise, reveals true competitive position.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-midnight to-sea-blue rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore the Data?</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Use Scout to see how your business (or your prospects) perform against
            competitors, identify opportunities, and prove the value of operational excellence.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/explorer"
              className="px-6 py-3 bg-white text-midnight font-semibold rounded-xl hover:bg-frost-blue transition-colors flex items-center gap-2"
            >
              Open Explorer
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="/brands"
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              Look Up a Brand
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
