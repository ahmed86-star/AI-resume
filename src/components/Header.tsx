'use client';

import React from 'react';
import Link from 'next/link';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-blue-600">ResumeAI</span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link 
              href="/templates" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Templates
            </Link>
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              My Resumes
            </Link>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create New
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
} 