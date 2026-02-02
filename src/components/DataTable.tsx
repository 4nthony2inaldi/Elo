'use client';

import { SectorMetrics } from '@/types';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';

interface DataTableProps {
  data: SectorMetrics[];
}

type SortKey = keyof SectorMetrics;

export default function DataTable({ data }: DataTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('rankAdvantage');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return sortDirection === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 inline ml-1" />
    );
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-mist">
      <table className="w-full">
        <thead>
          <tr className="bg-mist/50">
            <th
              className="text-left p-4 text-sm font-semibold text-midnight/70 cursor-pointer hover:bg-mist"
              onClick={() => handleSort('sector')}
            >
              Sector <SortIcon column="sector" />
            </th>
            <th
              className="text-right p-4 text-sm font-semibold text-midnight/70 cursor-pointer hover:bg-mist"
              onClick={() => handleSort('avgRankYext')}
            >
              Yext Avg Rank <SortIcon column="avgRankYext" />
            </th>
            <th
              className="text-right p-4 text-sm font-semibold text-midnight/70 cursor-pointer hover:bg-mist"
              onClick={() => handleSort('avgRankNonYext')}
            >
              Non-Yext Avg Rank <SortIcon column="avgRankNonYext" />
            </th>
            <th
              className="text-right p-4 text-sm font-semibold text-midnight/70 cursor-pointer hover:bg-mist"
              onClick={() => handleSort('rankAdvantage')}
            >
              Rank Advantage <SortIcon column="rankAdvantage" />
            </th>
            <th
              className="text-right p-4 text-sm font-semibold text-midnight/70 cursor-pointer hover:bg-mist"
              onClick={() => handleSort('completenessGap')}
            >
              Completeness Gap <SortIcon column="completenessGap" />
            </th>
            <th
              className="text-right p-4 text-sm font-semibold text-midnight/70 cursor-pointer hover:bg-mist"
              onClick={() => handleSort('uniqueBusinesses')}
            >
              Businesses <SortIcon column="uniqueBusinesses" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={row.sector}
              className={`border-t border-mist ${
                index % 2 === 0 ? 'bg-white' : 'bg-mist/20'
              } hover:bg-frost-blue/30 transition-colors`}
            >
              <td className="p-4 font-medium text-midnight">{row.sector}</td>
              <td className="p-4 text-right text-electric-blue font-semibold">
                #{row.avgRankYext}
              </td>
              <td className="p-4 text-right text-midnight/60">
                #{row.avgRankNonYext}
              </td>
              <td className="p-4 text-right">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                  +{row.rankAdvantage}
                </span>
              </td>
              <td className="p-4 text-right">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-electric-blue/10 text-electric-blue font-semibold text-sm">
                  +{row.completenessGap}%
                </span>
              </td>
              <td className="p-4 text-right text-midnight/60">
                {row.uniqueBusinesses.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
