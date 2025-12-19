
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Search, Loader2 } from 'lucide-react';
import { parseVoiceCommand } from '../services/geminiService';
import { FilterState } from '../types';

interface VoiceSearchProps {
  onFilter: (filters: FilterState) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onFilter }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = async (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsListening(false);
        setIsLoading(true);
        const filters = await parseVoiceCommand(text);
        onFilter(filters);
        setIsLoading(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, [onFilter]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="relative flex-1 group">
      <div className="flex items-center bg-white border-2 border-gray-200 rounded-full px-4 py-2 transition-all group-focus-within:border-blue-500 shadow-sm">
        <Search className="text-gray-400 w-5 h-5 mr-3" />
        <input
          type="text"
          placeholder='Try: "Show delivery boys in JP Nagar" or "10th pass only"'
          className="flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-400"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              setIsLoading(true);
              const filters = await parseVoiceCommand(transcript);
              onFilter(filters);
              setIsLoading(false);
            }
          }}
        />
        <button
          onClick={toggleListening}
          className={`p-2 rounded-full transition-colors ${
            isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-gray-100 text-blue-600'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      </div>
      {isLoading && (
        <div className="absolute right-14 top-1/2 -translate-y-1/2">
          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
        </div>
      )}
    </div>
  );
};
