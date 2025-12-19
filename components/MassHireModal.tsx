
import React from 'react';
import { X, CheckCircle2, Phone, Zap, Users } from 'lucide-react';
import { Candidate } from '../types';

interface MassHireModalProps {
  candidates: Candidate[];
  onClose: () => void;
  onConfirm: (ids: string[]) => void;
}

export const MassHireModal: React.FC<MassHireModalProps> = ({ candidates, onClose, onConfirm }) => {
  const topMatches = candidates
    .sort((a, b) => (a.status === 'actively_looking' ? -1 : 1))
    .slice(0, 5);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Mass Hire Suggestions</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-500 text-sm mb-4">We found {topMatches.length} top matches ready to join tomorrow:</p>
          <div className="space-y-3 mb-6">
            {topMatches.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <img src={c.imageUrl} className="w-10 h-10 rounded-full border border-white shadow-sm" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{c.name}</p>
                    <p className="text-[10px] text-gray-500">{c.location} • {c.experience} exp</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">MATCH</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onClose}
              className="py-4 rounded-2xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => onConfirm(topMatches.map(c => c.id))}
              className="py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Hire All {topMatches.length}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
