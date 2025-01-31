'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ResumePreviewProps {
  personalInfo: any;
  sections: any[];
}

export default function ResumePreview({ personalInfo, sections }: ResumePreviewProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-8">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h1>
          <div className="mt-2 text-gray-600">
            <p>{personalInfo.email} • {personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
          </div>
        </div>

        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {section.title}
            </h2>
            {/* Render section content based on type */}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 