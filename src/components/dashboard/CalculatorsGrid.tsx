'use client';

import React, { useState } from 'react';
import { ChevronRight, DollarSign, Percent, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FormattedInput } from '../ui/FormattedInput';

interface CalculatorCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  href: string;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ icon, title, description, href }) => (
  <Link href={href} className="block group">
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between hover:shadow-lg transition-all duration-200 cursor-pointer h-full hover:border-blue-200">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-50 p-3 rounded-full text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      </div>
      <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" />
    </div>
  </Link>
);

export const CalculatorsGrid = () => {
  const [loanBalance, setLoanBalance] = useState<number>(450000);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Tools & Calculators</h2>
      
      <div className="space-y-6">
        {/* Standard Calculators Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorCard 
            icon={<DollarSign size={24} />}
            title="Repayment Calculator"
            description="Estimate your monthly repayments"
            href="#"
            />
            <CalculatorCard 
            icon={<Percent size={24} />}
            title="Borrowing Power"
            description="Find out how much you could borrow"
            href="#"
            />
        </div>

        {/* Feature Bridging CTA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#009ca6] to-[#00727a] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
             
             <div className="p-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
                        <Home size={12} className="mr-1.5" /> Bridging Finance
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        Found your dream home <br />
                        <span className="text-teal-200">but haven't sold yours?</span>
                    </h3>
                    
                    <p className="text-teal-50 text-sm md:text-base leading-relaxed max-w-md">
                        Don't let timing cost you the perfect property. Unlock your equity to buy now and sell later with confidence.
                    </p>

                </div>

                {/* Interactive Engagement Element */}
                <div className="bg-white rounded-xl p-6 shadow-xl transform group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center mb-4">
                         <div className="w-10 h-10 rounded-full bg-teal-50 text-[#009ca6] flex items-center justify-center mr-3 font-bold">
                            $
                         </div>
                         <div>
                             <h4 className="font-bold text-gray-900">Quick Check</h4>
                             <p className="text-xs text-gray-500">See what's possible instantly</p>
                         </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Existing Loan Balance</label>
                            <FormattedInput 
                                value={loanBalance}
                                onChange={setLoanBalance}
                                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#009ca6] focus:border-transparent outline-none transition-all text-lg font-semibold text-gray-900 bg-gray-50"
                            />
                        </div>
                        
                        <div className="pt-2">
                    <Link 
                        href="/bridging-calculator"
                        className="w-full inline-flex items-center justify-center px-4 py-3 bg-[#009ca6] text-white font-bold rounded-lg hover:bg-[#00727a] transition-colors shadow-sm group-hover:shadow-md"
                    >
                        Calculate your buying power <ArrowRight size={18} className="ml-2" />
                    </Link>
                             <p className="text-[10px] text-gray-400 mt-2 text-center">Takes less than 2 minutes</p>
                        </div>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};
