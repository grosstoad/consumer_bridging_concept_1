import React from 'react';
import { Card } from '../ui/Card';
import { Info, PenLine, ChevronRight } from 'lucide-react';

export const LoanCard = () => {
  return (
    <Card className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-gray-900 mr-2">Your loan</h2>
          <Info size={16} className="text-gray-400" />
        </div>
        <button className="text-gray-500 flex items-center text-sm hover:text-gray-700">
          <PenLine size={14} className="mr-1" /> Edit
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Your rate</div>
          <div className="text-xl font-bold text-gray-900">8.00%</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Repayment</div>
          <div className="text-xl font-bold text-gray-900">$5,000/m</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Lowest market rate</div>
          <div className="text-xl font-bold text-green-600">5.14%</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Repayment</div>
          <div className="text-xl font-bold text-green-600">$3,321/m</div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Based on your 61% LVR, you may be able to get a lower rate.
      </div>

      <button className="text-blue-600 text-sm font-medium flex items-center hover:underline">
        View lower rate options <ChevronRight size={16} />
      </button>
    </Card>
  );
};

