
import React, { useState } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';
import { FilterState } from '../types';

interface FilterModalProps {
  currentFilters: FilterState;
  onApply: (filters: FilterState) => void;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ currentFilters, onApply, onClose }) => {
  const [tempFilters, setTempFilters] = useState<FilterState>(currentFilters);

  const handleReset = () => {
    const reset = {};
    setTempFilters(reset);
    onApply(reset);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-end z-50">
      <div className="bg-white h-full w-full max-w-sm p-6 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Filters
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Education</label>
            <div className="flex flex-wrap gap-2">
              {['10th Pass', '12th Pass', 'Graduate'].map((edu) => (
                <button
                  key={edu}
                  onClick={() => setTempFilters({ ...tempFilters, education: edu })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    tempFilters.education === edu ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {edu}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Experience</label>
            <select 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              value={tempFilters.role || ''}
              onChange={(e) => setTempFilters({ ...tempFilters, role: e.target.value })}
            >
              <option value="">Any Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="1-2 years">1-2 years</option>
              <option value="3+ years">3+ years</option>
            </select>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
          <button 
            onClick={handleReset}
            className="flex items-center justify-center gap-2 py-4 rounded-2xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button 
            onClick={() => onApply(tempFilters)}
            className="py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-100"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
