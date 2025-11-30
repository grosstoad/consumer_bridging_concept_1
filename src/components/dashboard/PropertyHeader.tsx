import React from 'react';
import { ChevronLeft, Share2, PenLine } from 'lucide-react';
import Link from 'next/link';

export const PropertyHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="#" className="text-blue-600 text-sm flex items-center hover:underline mb-2">
          <ChevronLeft size={16} /> Back to My Properties
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">6 Alverna Close, Greensborough</h1>
            <div className="flex items-center text-gray-500 text-sm mt-1 space-x-2">
               <span>4 🛏️</span> <span>•</span>
               <span>2 🛁</span> <span>•</span>
               <span>2 🚗</span> <span>•</span>
               <button className="text-blue-600 flex items-center hover:underline">
                 <PenLine size={12} className="mr-1" /> Update
               </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-6 mt-6 border-b border-transparent">
            {['Overview', 'Property value', 'Sell', 'Finance', 'Rent out'].map((tab) => (
                <button 
                    key={tab}
                    className={`pb-3 text-sm font-medium border-b-2 ${
                        tab === 'Finance' 
                        ? 'border-red-600 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

