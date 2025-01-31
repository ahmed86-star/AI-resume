'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiEye, FiShare2 } from 'react-icons/fi';

interface TemplatePreviewProps {
  template: string;
}

export default function TemplatePreview({ template }: TemplatePreviewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl h-[calc(100vh-180px)] sticky top-24">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Preview</h3>
            <div className="flex space-x-3">
              <button 
                className="p-2.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-all duration-200"
                aria-label="Preview Resume"
                title="Preview Resume"
              >
                <FiEye className="w-5 h-5" />
              </button>
              <button 
                className="p-2.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-all duration-200"
                aria-label="Share Resume"
                title="Share Resume"
              >
                <FiShare2 className="w-5 h-5" />
              </button>
              <button 
                className="p-2.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-all duration-200"
                aria-label="Download Resume"
                title="Download Resume"
              >
                <FiDownload className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 font-medium">
              Modern
            </button>
            <button className="px-4 py-2 text-sm rounded-lg hover:bg-gray-50 text-gray-600">
              Professional
            </button>
            <button className="px-4 py-2 text-sm rounded-lg hover:bg-gray-50 text-gray-600">
              Creative
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="animate-pulse space-y-6">
              <div className="space-y-3">
                <div className="h-10 bg-gray-100 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded-lg w-1/2"></div>
                <div className="h-4 bg-gray-100 rounded-lg w-1/3"></div>
              </div>
              
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-100 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-100 rounded-lg w-3/4"></div>
              </div>

              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-100 rounded-lg w-5/6"></div>
                <div className="h-4 bg-gray-100 rounded-lg w-4/5"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
} 