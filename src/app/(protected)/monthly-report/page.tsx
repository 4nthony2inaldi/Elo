'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  CalendarClock,
  Building2,
  Hash,
  Layers,
  Tag,
  FileText,
  BarChart3,
  Check,
  Copy,
  Plus,
  X,
  Info,
  ClipboardList,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Most recently closed calendar month (client-side default)
function lastClosedMonth() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return { month: d.getMonth(), year: d.getFullYear() };
}

export default function MonthlyReportBuilder() {
  const defaults = lastClosedMonth();

  const [clientName, setClientName] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [month, setMonth] = useState(defaults.month);
  const [year, setYear] = useState(defaults.year);
  const [hasCohorts, setHasCohorts] = useState(false);
  const [cohorts, setCohorts] = useState<string[]>(['', '']);
  const [brandTerms, setBrandTerms] = useState('');
  const [includePages, setIncludePages] = useState(false);
  const [includeBenchmarks, setIncludeBenchmarks] = useState(true);
  const [copied, setCopied] = useState(false);

  const yearOptions = useMemo(() => {
    const y = new Date().getFullYear();
    return [y, y - 1, y - 2];
  }, []);

  const cleanCohorts = cohorts.map((c) => c.trim()).filter(Boolean);
  const effectiveBrandTerms = brandTerms.trim() || clientName.trim();
  const ready = clientName.trim().length > 0 && businessId.trim().length > 0;

  const request = useMemo(() => {
    const period = `${MONTHS[month]} ${year}`;
    const client = clientName.trim() || '[Client name]';
    const id = businessId.trim() || '[Yext Business ID]';

    const cohortLine =
      hasCohorts && cleanCohorts.length > 0
        ? `Location cohorts: ${cleanCohorts.join(', ')}`
        : 'Locations: single cohort (all locations reported together)';

    const lines = [
      `Build the Yext monthly report for ${client} for ${period}.`,
      '',
      'Details:',
      `- Yext Business ID: ${id}`,
      `- ${cohortLine}`,
      `- Brand terms for branded vs unbranded classification: ${effectiveBrandTerms || '[brand name]'}`,
      `- Include Pages / Google Search Console slides: ${includePages ? 'Yes' : 'No'}`,
      `- Include peer benchmark slides: ${includeBenchmarks ? 'Yes' : 'No'}`,
      '',
      'Show me the plan first, then pull the data, build the deck, render it to PDF, and share it.',
    ];
    return lines.join('\n');
  }, [
    clientName,
    businessId,
    month,
    year,
    hasCohorts,
    cleanCohorts,
    effectiveBrandTerms,
    includePages,
    includeBenchmarks,
  ]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(request);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the textarea below is still selectable.
    }
  };

  const updateCohort = (i: number, value: string) => {
    setCohorts((prev) => prev.map((c, idx) => (idx === i ? value : c)));
  };

  const addCohort = () => setCohorts((prev) => [...prev, '']);
  const removeCohort = (i: number) =>
    setCohorts((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== i)));

  return (
    <div className="min-h-screen bg-snow">
      {/* Header */}
      <div className="bg-gradient-to-br from-midnight via-sea-blue to-electric-blue text-white py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Image src="/images/Yext_Logo_White.svg" alt="Yext" width={22} height={22} />
            <span>Insights Hub</span>
            <ChevronRight className="w-3 h-3" />
            <span>Monthly Report Builder</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Monthly Report Builder</h1>
          <p className="text-lg text-white/80 max-w-3xl">
            Set up a client&apos;s monthly performance deck in a few fields. We turn your choices into a
            ready-to-run request that builds the full on-brand PowerPoint for you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Client */}
          <section className="bg-white rounded-2xl border border-mist p-6">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-5 h-5 text-electric-blue" />
              <h2 className="font-semibold text-midnight">Which client?</h2>
            </div>
            <p className="text-sm text-midnight/60 mb-5">
              Tell us the brand and its Yext account so we pull the right numbers.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-midnight/70 mb-2">
                  Client name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Nordstrom"
                  className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-midnight/70 mb-2">
                  <span className="inline-flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5" /> Yext Business ID
                  </span>
                </label>
                <input
                  type="text"
                  value={businessId}
                  onChange={(e) => setBusinessId(e.target.value)}
                  placeholder="e.g. 1234567"
                  className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
                />
                <p className="text-xs text-midnight/40 mt-1.5">
                  Found in the client&apos;s Yext account URL, or ask your Yext contact.
                </p>
              </div>
            </div>
          </section>

          {/* Period */}
          <section className="bg-white rounded-2xl border border-mist p-6">
            <div className="flex items-center gap-2 mb-1">
              <CalendarClock className="w-5 h-5 text-electric-blue" />
              <h2 className="font-semibold text-midnight">Which month?</h2>
            </div>
            <p className="text-sm text-midnight/60 mb-5">
              The report focuses on this month and compares it to the month before and the same month
              last year.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-midnight/70 mb-2">Month</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-midnight/70 mb-2">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
                >
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3 flex items-start gap-2 text-xs text-midnight/50 bg-mist/40 rounded-lg p-3">
              <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
              <span>
                Defaults to the most recently closed month. Pick an earlier month to rebuild a past
                report.
              </span>
            </div>
          </section>

          {/* Cohorts */}
          <section className="bg-white rounded-2xl border border-mist p-6">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-electric-blue" />
              <h2 className="font-semibold text-midnight">How are locations grouped?</h2>
            </div>
            <p className="text-sm text-midnight/60 mb-5">
              Some brands report separate location groups side by side (for example, a full-line store
              group and an outlet group). Most brands report everything together.
            </p>

            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setHasCohorts(false)}
                className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                  !hasCohorts
                    ? 'border-electric-blue bg-frost-blue/40'
                    : 'border-mist hover:border-midnight/20'
                }`}
              >
                <p className="font-medium text-midnight text-sm">One group</p>
                <p className="text-xs text-midnight/60 mt-0.5">All locations reported together</p>
              </button>
              <button
                onClick={() => setHasCohorts(true)}
                className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                  hasCohorts
                    ? 'border-electric-blue bg-frost-blue/40'
                    : 'border-mist hover:border-midnight/20'
                }`}
              >
                <p className="font-medium text-midnight text-sm">Separate groups</p>
                <p className="text-xs text-midnight/60 mt-0.5">Each group gets its own section</p>
              </button>
            </div>

            {hasCohorts && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-midnight/70">
                  Name each group
                </label>
                {cohorts.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => updateCohort(i, e.target.value)}
                      placeholder={i === 0 ? 'e.g. Full Line' : i === 1 ? 'e.g. Rack' : 'Group name'}
                      className="flex-1 p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
                    />
                    <button
                      onClick={() => removeCohort(i)}
                      disabled={cohorts.length <= 1}
                      className="p-2 text-midnight/40 hover:text-coral disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Remove group"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addCohort}
                  className="inline-flex items-center gap-1.5 text-sm text-electric-blue hover:text-sea-blue font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add another group
                </button>
              </div>
            )}
          </section>

          {/* Options */}
          <section className="bg-white rounded-2xl border border-mist p-6">
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-5 h-5 text-electric-blue" />
              <h2 className="font-semibold text-midnight">A few final options</h2>
            </div>
            <p className="text-sm text-midnight/60 mb-5">
              These fine-tune what goes into the deck. The defaults work for most clients.
            </p>

            <div className="mb-5">
              <label className="block text-sm font-medium text-midnight/70 mb-2">
                Brand terms
              </label>
              <input
                type="text"
                value={brandTerms}
                onChange={(e) => setBrandTerms(e.target.value)}
                placeholder={clientName.trim() ? clientName.trim() : 'e.g. Nordstrom, Nordstroms'}
                className="w-full p-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue"
              />
              <p className="text-xs text-midnight/40 mt-1.5">
                Used to split branded from unbranded searches. Add common misspellings, separated by
                commas. Leave blank to use the client name.
              </p>
            </div>

            <div className="space-y-3">
              <ToggleRow
                icon={<FileText className="w-4 h-4" />}
                title="Include Pages / Google Search Console"
                subtitle="Turn on if this brand uses Yext-built store pages."
                checked={includePages}
                onChange={() => setIncludePages((v) => !v)}
              />
              <ToggleRow
                icon={<BarChart3 className="w-4 h-4" />}
                title="Include peer benchmarks"
                subtitle="Compares the client against the median of similar brands."
                checked={includeBenchmarks}
                onChange={() => setIncludeBenchmarks((v) => !v)}
              />
            </div>
          </section>
        </div>

        {/* Sticky output panel */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-6 space-y-6">
            {/* Request */}
            <div className="bg-white rounded-2xl border border-mist overflow-hidden">
              <div className="bg-midnight px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <ClipboardList className="w-5 h-5 text-frost-blue" />
                  <span className="font-semibold">Your report request</span>
                </div>
                <button
                  onClick={handleCopy}
                  disabled={!ready}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    !ready
                      ? 'bg-white/10 text-white/40 cursor-not-allowed'
                      : copied
                      ? 'bg-green-500 text-white'
                      : 'bg-electric-blue text-white hover:bg-cta-blue'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-5">
                <textarea
                  readOnly
                  value={request}
                  rows={12}
                  className="w-full text-sm font-mono text-midnight/80 bg-mist/40 rounded-xl p-4 resize-none focus:outline-none border border-mist"
                />
                {!ready && (
                  <p className="text-xs text-coral mt-2 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    Add a client name and Business ID to finish the request.
                  </p>
                )}
              </div>
            </div>

            {/* How to run */}
            <div className="bg-frost-blue/40 border border-frost-blue rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-sea-blue" />
                <h3 className="font-semibold text-midnight">How to run it</h3>
              </div>
              <ol className="space-y-3 text-sm text-midnight/70">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sea-blue text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Fill in the fields on the left, then copy the request.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sea-blue text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>
                    Paste it into Claude Code (the workspace with the monthly report skill installed).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sea-blue text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span>
                    Review the plan it shows back, confirm, and it pulls the data and builds the deck.
                  </span>
                </li>
              </ol>
            </div>

            {/* What you get */}
            <div className="bg-white rounded-2xl border border-mist p-5">
              <h3 className="font-semibold text-midnight mb-3">What you get</h3>
              <p className="text-sm text-midnight/60 mb-4">
                An on-brand PowerPoint of about 23 slides, ready for the client call.
              </p>
              <ul className="space-y-2 text-sm text-midnight/70">
                {[
                  'At-a-glance snapshot with month-over-month and year-over-year metrics',
                  '12-month trends for impressions, actions, and reviews',
                  'Peer benchmark divergence' + (includeBenchmarks ? '' : ' (off)'),
                  'Top branded and unbranded search terms',
                  'Reviews broken out by star rating and response priority',
                  'Pages and Search Console performance' + (includePages ? '' : ' (off)'),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  icon,
  title,
  subtitle,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="w-full flex items-center gap-3 p-3 rounded-xl border border-mist hover:border-midnight/20 text-left transition-all"
    >
      <span
        className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
          checked ? 'bg-electric-blue text-white' : 'bg-mist text-midnight/50'
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-medium text-midnight text-sm">{title}</span>
        <span className="block text-xs text-midnight/60">{subtitle}</span>
      </span>
      <span
        className={`flex-shrink-0 w-11 h-6 rounded-full p-0.5 transition-colors ${
          checked ? 'bg-electric-blue' : 'bg-mist'
        }`}
      >
        <span
          className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  );
}
