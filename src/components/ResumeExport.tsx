'use client';

import { useReactToPrint } from 'react-to-print';
import { FiDownload } from 'react-icons/fi';

interface ResumeExportProps {
  componentRef: React.RefObject<HTMLDivElement>;
}

export default function ResumeExport({ componentRef }: ResumeExportProps) {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'resume',
    pageStyle: `
      @media print { 
        @page { size: A4; margin: 20mm; }
        body { -webkit-print-color-adjust: exact; }
      }
    `,
  });

  return (
    <button
      onClick={handlePrint}
      className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-blue-700 transition-all flex items-center gap-2"
    >
      <FiDownload className="w-5 h-5" />
      Export PDF
    </button>
  );
} 