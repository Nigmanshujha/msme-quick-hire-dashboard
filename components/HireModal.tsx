
import React, { useState, useEffect } from 'react';
import { X, Copy, Send, CheckCircle2, Loader2, FileText, MessageSquare } from 'lucide-react';
import { Candidate } from '../types';
import { generateJobDescription, generateOfferMessage } from '../services/geminiService';

interface HireModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export const HireModal: React.FC<HireModalProps> = ({ candidate, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [jd, setJd] = useState('');
  const [offer, setOffer] = useState('');
  const [activeTab, setActiveTab] = useState<'offer' | 'jd'>('offer');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [newJd, newOffer] = await Promise.all([
        generateJobDescription(candidate.role, candidate.salaryExpectation, "9 AM - 6 PM"),
        generateOfferMessage(candidate.name, candidate.role, candidate.salaryExpectation)
      ]);
      setJd(newJd);
      setOffer(newOffer);
      setLoading(false);
    };
    fetchData();
  }, [candidate]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col h-[80vh] animate-in slide-in-from-bottom-10 duration-300">
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Hiring {candidate.name}</h2>
              <p className="text-gray-500 text-sm">Send official offer & job details</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('offer')}
            className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'offer' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              WhatsApp Offer
            </div>
          </button>
          <button
            onClick={() => setActiveTab('jd')}
            className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'jd' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Job Description
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
              <p className="animate-pulse">Generating AI content for your hire...</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 relative group border border-gray-100">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed text-sm">
                {activeTab === 'offer' ? offer : jd}
              </pre>
              <button
                onClick={() => copyToClipboard(activeTab === 'offer' ? offer : jd)}
                className="absolute top-4 right-4 bg-white shadow-sm border border-gray-200 p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all opacity-0 group-hover:opacity-100"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4">
          <button 
            disabled={loading}
            className="flex-1 bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg shadow-green-200 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            Send on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};
