'use client';

interface ComparisonBarProps {
  yextValue: number;
  nonYextValue: number;
  label: string;
  format?: 'number' | 'percent' | 'rank';
  showDifference?: boolean;
}

export default function ComparisonBar({
  yextValue,
  nonYextValue,
  label,
  format = 'number',
  showDifference = true,
}: ComparisonBarProps) {
  const formatValue = (val: number) => {
    if (format === 'percent') return `${(val * 100).toFixed(1)}%`;
    if (format === 'rank') return `#${val.toFixed(1)}`;
    return val.toFixed(1);
  };

  const maxValue = Math.max(yextValue, nonYextValue);
  const yextWidth = (yextValue / maxValue) * 100;
  const nonYextWidth = (nonYextValue / maxValue) * 100;

  const difference = format === 'rank'
    ? nonYextValue - yextValue
    : yextValue - nonYextValue;

  const isYextBetter = format === 'rank' ? yextValue < nonYextValue : yextValue > nonYextValue;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-midnight/70">{label}</span>
        {showDifference && (
          <span
            className={`text-sm font-semibold ${
              isYextBetter ? 'text-green-600' : 'text-coral'
            }`}
          >
            {isYextBetter ? '+' : ''}
            {format === 'rank'
              ? `${difference.toFixed(1)} positions`
              : format === 'percent'
              ? `${(difference * 100).toFixed(1)}pp`
              : difference.toFixed(1)}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {/* Yext bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-electric-blue w-16">Yext</span>
          <div className="flex-1 h-6 bg-mist rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-electric-blue to-sea-blue rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${yextWidth}%` }}
            >
              <span className="text-xs font-semibold text-white">
                {formatValue(yextValue)}
              </span>
            </div>
          </div>
        </div>

        {/* Non-Yext bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-midnight/50 w-16">Others</span>
          <div className="flex-1 h-6 bg-mist rounded-full overflow-hidden">
            <div
              className="h-full bg-midnight/30 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${nonYextWidth}%` }}
            >
              <span className="text-xs font-semibold text-midnight/70">
                {formatValue(nonYextValue)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
