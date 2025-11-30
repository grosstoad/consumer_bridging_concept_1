import React, { useState } from 'react';
import { PropertyDistributionChart } from './PropertyDistributionChart';
import { SellingPerformanceChart } from './SellingPerformanceChart';
import { LeadCaptureModal } from './LeadCaptureModal';
import { Lock, TrendingUp, TrendingDown, Clock, ArrowRight, Activity, DollarSign, BarChart3 } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper
const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

interface MarketInsightsProps {
  maxPrice: number;
  suburb: string;
  propertyType: string;
  isLocked: boolean;
}

export const MarketInsights: React.FC<MarketInsightsProps> = ({
  maxPrice,
  suburb,
  propertyType,
  isLocked
}) => {
  const [activeTab, setActiveTab] = useState<'buying' | 'selling'>('buying');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Common Overlay Component
  const LockedOverlay = ({ title, description, buttonText }: { title: string, description: string, buttonText: string }) => (
    <div className="absolute inset-0 z-20 bg-white/10 backdrop-blur-[3px] flex flex-col items-center justify-center p-4 text-center transition-all duration-500 rounded-b-xl">
        <div className="max-w-xs w-full bg-white/95 p-5 rounded-xl shadow-xl border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-[#009ca6] shadow-sm">
                <Lock size={18} />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                {title}
            </h4>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {description}
            </p>
            
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2.5 bg-[#009ca6] hover:bg-[#007f87] text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center group"
            >
                {buttonText} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wider">Free for Members</p>
        </div>
    </div>
  );

  return (
    <>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        {/* Full Width Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/50">
            <button
                onClick={() => setActiveTab('buying')}
                className={cn(
                    "flex-1 py-4 text-sm font-bold text-center transition-all relative",
                    activeTab === 'buying' 
                        ? "text-[#009ca6] bg-white border-t-2 border-t-[#009ca6]" 
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
            >
                Buying New Property
            </button>
            <button
                onClick={() => setActiveTab('selling')}
                className={cn(
                    "flex-1 py-4 text-sm font-bold text-center transition-all relative",
                    activeTab === 'selling' 
                        ? "text-[#009ca6] bg-white border-t-2 border-t-[#009ca6]" 
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
            >
                Selling Existing Property
            </button>
        </div>

        {/* Header Area */}
        <div className="px-6 pt-6 pb-2 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Activity className="mr-2 text-[#009ca6]" size={20} />
                Market Insights
            </h3>
            <p className="text-sm text-gray-500 mt-1">Real-time data for <span className="font-medium text-gray-900">{suburb}</span></p>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
            
            {/* BUYING TAB */}
            <div className={cn("transition-opacity duration-300", activeTab === 'buying' ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none")}>
                
                {isLocked && (
                    <LockedOverlay 
                        title="Unlock Buying Insights" 
                        description={`See exactly how many properties fit your budget in ${suburb}. Get detailed affordability breakdowns.`}
                        buttonText="View Buying Data"
                    />
                )}

                <div className={cn(isLocked && "select-none")}>
                    <PropertyDistributionChart 
                        maxPrice={maxPrice} 
                        suburb={suburb} 
                        propertyType={propertyType} 
                        isLocked={isLocked}
                    />
                </div>
            </div>

            {/* SELLING TAB */}
            <div className={cn("p-6 transition-opacity duration-300", activeTab === 'selling' ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none")}>
                
                {isLocked && (
                     <LockedOverlay 
                        title="Don't Sell in the Dark" 
                        description={`Access exclusive vendor discounting data and clearance rates for ${suburb}. Know exactly where to set your reserve price.`}
                        buttonText="Unlock Selling Insights"
                    />
                )}

                {/* Underlying Content (Blurred when locked) */}
                <div className={cn("space-y-8", isLocked && "select-none")}>
                    
                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                            <div className="flex items-center text-orange-700 mb-2">
                                <Clock size={16} className="mr-2" />
                                <span className="text-xs font-bold uppercase tracking-wide">Avg Days on Market</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">34 Days</div>
                            <div className="text-xs text-orange-600 mt-1 flex items-center">
                                <TrendingDown size={12} className="mr-1" /> 5 days faster vs last year
                            </div>
                        </div>

                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center text-blue-700 mb-2">
                                <Activity size={16} className="mr-2" />
                                <span className="text-xs font-bold uppercase tracking-wide">Clearance Rate</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">72%</div>
                            <div className="text-xs text-blue-600 mt-1 flex items-center">
                                <TrendingUp size={12} className="mr-1" /> High demand area
                            </div>
                        </div>

                        <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                            <div className="flex items-center text-purple-700 mb-2">
                                <DollarSign size={16} className="mr-2" />
                                <span className="text-xs font-bold uppercase tracking-wide">Avg Discount</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">-3.2%</div>
                            <div className="text-xs text-purple-600 mt-1">
                                Sellers accepting less than listed
                            </div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div>
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h4 className="font-bold text-gray-900">Vendor Discounting Trends</h4>
                                <p className="text-sm text-gray-500">Percentage of properties sold below advertised price</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <SellingPerformanceChart />
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </div>

        <LeadCaptureModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title={activeTab === 'buying' ? "Unlock Buying Insights" : "Unlock Selling Insights"}
        />
    </>
  );
};
