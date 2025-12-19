
import React from 'react';
import { Phone, MapPin, Briefcase, GraduationCap, Clock, CheckCircle2 } from 'lucide-react';
import { Candidate } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
  onCall: (candidate: Candidate) => void;
  onHire: (candidate: Candidate) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onCall, onHire }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actively_looking': return 'bg-green-100 text-green-700 border-green-200';
      case 'available': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'recently_applied': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex items-start gap-4">
        <img 
          src={candidate.imageUrl} 
          alt={candidate.name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-lg text-gray-900">{candidate.name}</h3>
            <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold ${getStatusColor(candidate.status)}`}>
              {getStatusText(candidate.status)}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2">
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {candidate.location} <span className="text-gray-400 ml-1">({candidate.distance})</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Briefcase className="w-3.5 h-3.5 mr-1" />
              {candidate.experience} exp
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <GraduationCap className="w-3.5 h-3.5 mr-1" />
              {candidate.education}
            </div>
            <div className="flex items-center text-green-600 font-medium text-sm">
              ₹ {candidate.salaryExpectation}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center text-gray-400 text-xs">
          <Clock className="w-3 h-3 mr-1" />
          Active {candidate.lastActive}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onCall(candidate)}
            className="flex items-center px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-semibold text-sm"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </button>
          <button 
            onClick={() => onHire(candidate)}
            className="flex items-center px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold text-sm shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
};
