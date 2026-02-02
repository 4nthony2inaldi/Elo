'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: ReactNode;
  highlight?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  highlight = false,
  size = 'md',
}: MetricCardProps) {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const valueSizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-coral' : 'text-gray-400';

  return (
    <div
      className={`rounded-2xl ${sizeClasses[size]} transition-all duration-300 hover:shadow-lg ${
        highlight
          ? 'bg-gradient-to-br from-frost-blue to-white border border-electric-blue/20'
          : 'bg-white border border-mist'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-midnight/60 uppercase tracking-wide">
          {title}
        </span>
        {icon && <span className="text-electric-blue">{icon}</span>}
      </div>

      <div className="flex items-end gap-3">
        <span className={`${valueSizeClasses[size]} font-semibold text-midnight`}>
          {value}
        </span>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 ${trendColor} mb-1`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-sm text-midnight/50">{subtitle}</p>
      )}
    </div>
  );
}
