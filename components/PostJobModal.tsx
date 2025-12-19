
import React, { useState } from 'react';
import { X, Briefcase, IndianRupee, Clock, Zap } from 'lucide-react';
import { ROLE_TEMPLATES } from '../constants';
import { RoleTemplate } from '../types';

interface PostJobModalProps {
  onClose: () => void;
  onPost: (details: any) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ onClose, onPost }) => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<RoleTemplate | null>(null);

  const handlePost = () => {
    onPost(selectedTemplate);
    onClose();
    alert(`Success! Job for ${selectedTemplate?.title} is now live and matching candidates.`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-50/50">
          <div>
            <h2 className="text-xl font-black text-gray-900">Post a Job</h2>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-8">
          {step === 1 ? (
            <div className="space-y-4">
              <p className="font-bold text-gray-700 mb-2">Select a Role Template</p>
              <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {ROLE_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedTemplate?.id === tpl.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${selectedTemplate?.id === tpl.id ? 'bg-blue-600 text-white' : 'bg-white border border-gray-100 text-gray-400'}`}>
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{tpl.title}</p>
                      <p className="text-xs text-gray-500">₹{tpl.suggestedSalary}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button 
                disabled={!selectedTemplate}
                onClick={() => setStep(2)}
                className="w-full py-4 mt-4 bg-gray-900 text-white rounded-2xl font-bold disabled:opacity-50"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <h3 className="font-bold text-blue-900 text-lg mb-4">{selectedTemplate?.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-blue-700">
                    <IndianRupee className="w-4 h-4" />
                    <span className="text-sm font-medium">₹{selectedTemplate?.suggestedSalary}</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-700">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{selectedTemplate?.hours}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
                <Zap className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                <p className="text-sm text-orange-800 leading-relaxed">
                  We'll instantly notify <strong>{Math.floor(Math.random() * 50) + 10} matching candidates</strong> near your location.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setStep(1)} className="py-4 rounded-2xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50">Back</button>
                <button onClick={handlePost} className="py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">Go Live</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
