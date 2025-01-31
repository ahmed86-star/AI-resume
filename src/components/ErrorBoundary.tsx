'use client';

import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error Boundary Caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 rounded-xl text-red-600">
          <div className="flex items-center gap-3 mb-4">
            <FiAlertTriangle className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Something went wrong</h2>
          </div>
          <p className="mb-4">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 