'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ResumeForm from '@/components/ResumeForm';
import TemplatePreview from '@/components/TemplatePreview';

export default function Builder() {
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Your Resume</h1>
            <p className="text-gray-600 mt-1">Fill in your details and let AI help you create a professional resume</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Progress
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className={`flex-1 transition-all duration-300 ${showPreview ? 'w-2/3' : 'w-full'}`}>
            <ResumeForm />
          </div>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-1/3"
            >
              <TemplatePreview template="modern" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 