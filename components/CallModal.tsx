
import React from 'react';
import { X, User, Phone } from 'lucide-react';
import { Candidate, HireStatus } from '../types';

interface CallModalProps {
  candidate: Candidate;
  onClose: () => void;
  onStatusUpdate: (status: HireStatus) => void;
}

const statuses: HireStatus[] = ['Not Available', 'Salary Mismatch', 'No Answer', 'Hired', 'Next Round'];

export const CallModal: React.FC<CallModalProps> = ({ candidate, onClose, onStatusUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center border-b border-gray-100">
          <div className="relative inline-block mb-4">
            <img src={candidate.imageUrl} className="w-20 h-20 rounded-full mx-auto border-4 border-blue-50" />
            <div className="absolute bottom-0 right-0 bg-green-500 p-1.5 rounded-full border-2 border-white">
              <Phone className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Call with {candidate.name}</h2>
          <p className="text-gray-500 text-sm mt-1">How did the call go?</p>
        </div>

        <div className="p-6 grid gap-3">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onStatusUpdate(status)}
              className={`w-full py-3 px-4 rounded-xl text-left font-semibold transition-all ${
                status === 'Hired' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
          <button 
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl text-gray-400 font-medium hover:text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
