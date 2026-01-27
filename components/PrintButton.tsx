'use client';

import { Download } from 'lucide-react';

export function PrintButton() {
  return (
    <button 
        onClick={() => {
            if (typeof window !== 'undefined') {
                window.print();
            }
        }} 
        className="hidden print:hidden inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
    >
        <Download className="w-4 h-4" /> Print / Save as PDF
    </button>
  );
}
