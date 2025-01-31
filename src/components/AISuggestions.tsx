'use client';

import React, { useState } from 'react';
import { FiSparkles, FiRefreshCw } from 'react-icons/fi';

interface AISuggestionsProps {
  content: string;
  section: string;
  onApply?: (suggestion: string) => void;
}

export default function AISuggestions({ content, section, onApply }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSuggestions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, section })
      });
      
      if (!response.ok) throw new Error('Failed to generate suggestions');
      
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
      console.error('AI Suggestion Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-suggestions mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <FiSparkles className="text-yellow-600" />
          AI Suggestions
        </h4>
        <button 
          onClick={generateSuggestions}
          disabled={loading}
          className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center p-4">
          <FiRefreshCw className="animate-spin text-blue-600" />
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-700">{suggestion}</p>
            {onApply && (
              <button 
                onClick={() => onApply(suggestion)}
                className="mt-2 text-sm text-green-600 hover:text-green-700"
              >
                Apply Suggestion
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 