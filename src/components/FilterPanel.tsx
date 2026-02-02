'use client';

import { Sector, DistanceBucket, BrandSize } from '@/types';
import { SECTORS, DISTANCE_BUCKETS, BRAND_SIZES } from '@/data/mockData';
import { X, Filter } from 'lucide-react';

interface FilterPanelProps {
  selectedSectors: Sector[];
  selectedDistances: DistanceBucket[];
  selectedBrandSizes: BrandSize[];
  onSectorChange: (sectors: Sector[]) => void;
  onDistanceChange: (distances: DistanceBucket[]) => void;
  onBrandSizeChange: (sizes: BrandSize[]) => void;
  onClearAll: () => void;
}

export default function FilterPanel({
  selectedSectors,
  selectedDistances,
  selectedBrandSizes,
  onSectorChange,
  onDistanceChange,
  onBrandSizeChange,
  onClearAll,
}: FilterPanelProps) {
  const hasActiveFilters =
    selectedSectors.length > 0 ||
    selectedDistances.length > 0 ||
    selectedBrandSizes.length > 0;

  const toggleSector = (sector: Sector) => {
    if (selectedSectors.includes(sector)) {
      onSectorChange(selectedSectors.filter((s) => s !== sector));
    } else {
      onSectorChange([...selectedSectors, sector]);
    }
  };

  const toggleDistance = (distance: DistanceBucket) => {
    if (selectedDistances.includes(distance)) {
      onDistanceChange(selectedDistances.filter((d) => d !== distance));
    } else {
      onDistanceChange([...selectedDistances, distance]);
    }
  };

  const toggleBrandSize = (size: BrandSize) => {
    if (selectedBrandSizes.includes(size)) {
      onBrandSizeChange(selectedBrandSizes.filter((s) => s !== size));
    } else {
      onBrandSizeChange([...selectedBrandSizes, size]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-mist p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-electric-blue" />
          <h3 className="font-semibold text-midnight">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-sm text-coral hover:text-coral/80 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Sectors */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-midnight/60 mb-3 uppercase tracking-wide">
          Sector
        </h4>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map((sector) => (
            <button
              key={sector}
              onClick={() => toggleSector(sector)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                selectedSectors.includes(sector)
                  ? 'bg-electric-blue text-white'
                  : 'bg-mist text-midnight/70 hover:bg-frost-blue'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Distance Buckets */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-midnight/60 mb-3 uppercase tracking-wide">
          Distance
        </h4>
        <div className="flex flex-wrap gap-2">
          {DISTANCE_BUCKETS.map((distance) => (
            <button
              key={distance}
              onClick={() => toggleDistance(distance)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                selectedDistances.includes(distance)
                  ? 'bg-electric-blue text-white'
                  : 'bg-mist text-midnight/70 hover:bg-frost-blue'
              }`}
            >
              {distance}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Size */}
      <div>
        <h4 className="text-sm font-medium text-midnight/60 mb-3 uppercase tracking-wide">
          Brand Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {BRAND_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleBrandSize(size)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                selectedBrandSizes.includes(size)
                  ? 'bg-electric-blue text-white'
                  : 'bg-mist text-midnight/70 hover:bg-frost-blue'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
