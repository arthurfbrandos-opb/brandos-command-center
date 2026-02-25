'use client';

import { FC } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterPanelProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear?: () => void;
}

export const FilterPanel: FC<FilterPanelProps> = ({
  title,
  options,
  selected,
  onToggle,
  onClear,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {selected.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);

          return (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(option.value)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
              {option.count !== undefined && (
                <span className="text-xs text-gray-500 ml-auto">({option.count})</span>
              )}
            </label>
          );
        })}
      </div>

      {options.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">No options available</p>
      )}
    </div>
  );
};
