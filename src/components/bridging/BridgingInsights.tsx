import React from 'react';
import { Clock, TrendingUp, Lock, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface BridgingInsightsProps {
  suburb: string;
  isLocked?: boolean;
}

export const BridgingInsights: React.FC<BridgingInsightsProps> = ({ suburb, isLocked = false }) => {
  return (
    <div className="mt-6">
       <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Bridging Period Insights</h3>
            {isLocked && <Lock size={16} className="text-gray-400" />}
       </div>

       <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 relative ${isLocked ? 'pointer-events-none' : ''}`}>
          
          {/* Frosted Overlay if Locked */}
          {isLocked && (
            <div className="absolute inset-0 z-10 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl border border-gray-100 transition-all duration-300">
                 <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-center max-w-sm mx-4">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                        <TrendingUp size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Unlock Market Insights</h4>
                    <p className="text-gray-500 text-sm mb-6">
                        Sign up to see average days on market and clearance rates for {suburb} to better plan your bridging period.
                    </p>
                    <button className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
                        View Insights <ArrowRight size={16} className="ml-2" />
                    </button>
                 </div>
            </div>
          )}

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex items-start justify-between mb-2">
                <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                    <Clock size={20} />
                </div>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Safe Zone</span>
             </div>
             <div className="text-sm text-gray-500 mb-1">Avg. Days on Market</div>
             <div className="text-2xl font-bold text-gray-900">34 Days</div>
             <div className="mt-3 text-xs text-gray-500">
                Properties in <strong>{suburb}</strong> sell well within the 12-month bridging term.
             </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex items-start justify-between mb-2">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <TrendingUp size={20} />
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">High Demand</span>
             </div>
             <div className="text-sm text-gray-500 mb-1">Clearance Rate</div>
             <div className="text-2xl font-bold text-gray-900">72%</div>
             <div className="mt-3 text-xs text-gray-500">
                High auction clearance rates suggest strong buyer interest in your area.
             </div>
          </div>
       </div>
    </div>
  );
};

