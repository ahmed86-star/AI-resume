'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-6">
          AI-Powered Resume Builder
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create professional resumes with the power of AI
        </p>
        <Link
          href="/builder"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Resume
        </Link>
      </motion.div>
    </div>
  );
}