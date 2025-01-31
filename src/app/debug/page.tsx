'use client';

import { useResumeStore } from '@/store/useStore';

export default function DebugPage() {
  const store = useResumeStore();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Application Debug</h1>
      <pre className="bg-gray-100 p-4 rounded-lg">
        {JSON.stringify(store, null, 2)}
      </pre>
    </div>
  );
} 