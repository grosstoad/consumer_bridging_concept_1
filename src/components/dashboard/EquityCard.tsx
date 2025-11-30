import React from 'react';
import { Card } from '../ui/Card';
import { Info, PenLine } from 'lucide-react';

export const EquityCard = () => {
  return (
    <Card className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-gray-900 mr-2">Your equity</h2>
          <Info size={16} className="text-gray-400" />
        </div>
        <button className="text-gray-500 flex items-center text-sm hover:text-gray-700">
          <PenLine size={14} className="mr-1" /> Edit
        </button>
      </div>
      
      <div className="text-3xl font-bold text-gray-900 mb-1">$410,100</div>
      <div className="text-xs text-gray-500 mb-6">Last updated 1 year 7 months ago</div>

      {/* Bar Chart */}
      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex mb-4">
        <div className="h-full bg-orange-500" style={{ width: '30%' }}></div>
        <div className="h-full bg-green-600" style={{ width: '30%' }}></div>
        <div className="h-full bg-blue-500" style={{ width: '40%' }}></div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="flex items-center mb-1">
            <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-gray-600 text-xs font-medium">Inaccessible</span>
             <Info size={12} className="text-gray-400 ml-1" />
          </div>
          <div className="font-semibold text-gray-900">$200,000</div>
        </div>
        <div>
          <div className="flex items-center mb-1">
            <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
            <span className="text-gray-600 text-xs font-medium">Accessible</span>
             <Info size={12} className="text-gray-400 ml-1" />
          </div>
          <div className="font-semibold text-gray-900">$210,100</div>
        </div>
        <div>
          <div className="flex items-center mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-600 text-xs font-medium">Remaining</span>
          </div>
          <div className="font-semibold text-gray-900">$589,900</div>
        </div>
      </div>
    </Card>
  );
};

