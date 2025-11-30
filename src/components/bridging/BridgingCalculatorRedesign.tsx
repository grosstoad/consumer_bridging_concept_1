import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, Info, Home, DollarSign, Settings, TrendingUp, Wallet, MapPin, Building2, EyeOff, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { MarketInsights } from './MarketInsights';
import { FormattedInput } from '@/components/ui/FormattedInput';
import { VerificationModal } from './VerificationModal';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for classes
const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

// Formatters
const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(val);

export default function BridgingCalculatorRedesign() {
  // --- State ---
  // Property
  const [existingValue, setExistingValue] = useState<number>(1000000);
  const [existingDebt, setExistingDebt] = useState<number>(400000);
  
  // Market Context
  const [suburb, setSuburb] = useState<string>('Richmond, VIC');
  const [propertyType, setPropertyType] = useState<string>('All');
  const [isLocked, setIsLocked] = useState(true); // Default to locked for engagement
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  // Funds
  const [savings, setSavings] = useState<number>(50000);
  const [cashOut, setCashOut] = useState<number>(0);

  // Settings
  const [capitaliseCosts, setCapitaliseCosts] = useState(true);
  const [capitaliseInterest, setCapitaliseInterest] = useState(true);
  const [interestRate, setInterestRate] = useState(8.5);

  // Results
  const [maxPropertyPrice, setMaxPropertyPrice] = useState<number>(0);
  const [peakDebt, setPeakDebt] = useState<number>(0);
  const [estimatedCosts, setEstimatedCosts] = useState<number>(0);
  
  // Constants
  const MAX_LVR = 0.80;
  const TERM_MONTHS = 12;

  // --- Calculation Logic ---
  useEffect(() => {
    calculate();
  }, [existingValue, existingDebt, savings, cashOut, capitaliseCosts, capitaliseInterest, interestRate]);

  const calculate = () => {
    const costRate = 0.05;
    const r = interestRate / 100;
    const t = TERM_MONTHS / 12;
    const interestMultiplier = capitaliseInterest ? (1 + r * t) : 1;
    
    const fees = 1000;
    const principalConstant = existingDebt + fees + cashOut - savings;
    const vnCoeff = 1 + (capitaliseCosts ? costRate : 0); 
    
    const lhs = (vnCoeff * interestMultiplier) - MAX_LVR;
    const rhs = (MAX_LVR * existingValue) - (principalConstant * interestMultiplier);
    
    if (lhs <= 0) {
        setMaxPropertyPrice(0);
        return;
    }
    
    let calculatedMax = rhs / lhs;
    if (calculatedMax < 0) calculatedMax = 0;
    
    setMaxPropertyPrice(calculatedMax);
    setEstimatedCosts(calculatedMax * costRate);
    
    // Calculate Peak
    const pPrincipal = principalConstant + calculatedMax * vnCoeff;
    setPeakDebt(pPrincipal * interestMultiplier);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        
      {/* Navigation / Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                 <div className="flex items-center">
                    <Link href="/" className="text-gray-500 hover:text-gray-900 mr-4">
                        <ChevronLeft size={20} />
                    </Link>
                    <h1 className="text-xl font-bold">Bridging Power</h1>
                 </div>
                 <div className="flex items-center space-x-4">
                     {/* Demo Toggle */}
                     <button 
                        onClick={() => setIsLocked(!isLocked)}
                        className="text-xs text-gray-400 hover:text-gray-600 flex items-center bg-gray-100 px-2 py-1 rounded"
                        title="Toggle Locked State Demo"
                     >
                        {isLocked ? <Eye size={12} className="mr-1" /> : <EyeOff size={12} className="mr-1" />}
                        {isLocked ? 'Show Data' : 'Simulate Lock'}
                     </button>
                     <div className="text-sm text-gray-500">
                        Need help? <a href="#" className="text-blue-600 hover:underline">Chat to a broker</a>
                     </div>
                 </div>
            </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Inputs & Breakdown */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Section 1: Current Property */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mr-3">
                            <Home size={20} />
                        </div>
                        <h2 className="text-lg font-bold">Current Property</h2>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Value</label>
                            <FormattedInput 
                                value={existingValue}
                                onChange={setExistingValue}
                                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mortgage Balance</label>
                            <FormattedInput 
                                value={existingDebt}
                                onChange={setExistingDebt}
                                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Finances */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="bg-green-50 p-2 rounded-lg text-green-600 mr-3">
                            <Wallet size={20} />
                        </div>
                        <h2 className="text-lg font-bold">Funds Available</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Available Savings</label>
                            <FormattedInput 
                                value={savings}
                                onChange={setSavings}
                                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-1">Cash you can contribute to the purchase</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cash Out Required</label>
                            <FormattedInput 
                                value={cashOut}
                                onChange={setCashOut}
                                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-1">Extra cash needed for renovations or lifestyle</p>
                        </div>
                    </div>
                </div>

                {/* Section 3: Preferences */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-600 mr-3">
                            <Settings size={20} />
                        </div>
                        <h2 className="text-lg font-bold">Preferences</h2>
                    </div>
                    
                    <div className="space-y-4">
                         {/* Toggle Capitalise Costs */}
                         <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">Capitalise Costs</div>
                                <div className="text-xs text-gray-500">Add stamp duty to loan</div>
                            </div>
                            <button 
                                onClick={() => setCapitaliseCosts(!capitaliseCosts)}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                    capitaliseCosts ? "bg-blue-600" : "bg-gray-200"
                                )}
                            >
                                <span className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    capitaliseCosts ? "translate-x-6" : "translate-x-1"
                                )} />
                            </button>
                        </div>

                        {/* Toggle Capitalise Interest */}
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">Capitalise Interest</div>
                                <div className="text-xs text-gray-500">No repayments during bridging</div>
                            </div>
                            <button 
                                onClick={() => setCapitaliseInterest(!capitaliseInterest)}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                    capitaliseInterest ? "bg-blue-600" : "bg-gray-200"
                                )}
                            >
                                <span className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    capitaliseInterest ? "translate-x-6" : "translate-x-1"
                                )} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 4: Funds Breakdown */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Funds Breakdown</h3>
                    <div className="space-y-3 text-sm">
                         <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Purchase Price</span>
                            <span className="font-semibold">{formatCurrency(maxPropertyPrice)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600 flex items-center">
                                Costs (Est. 5%)
                                {capitaliseCosts && <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Capitalised</span>}
                            </span>
                            <span className="font-semibold text-red-600">+{formatCurrency(estimatedCosts)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600 flex items-center">
                                Savings
                                {!capitaliseCosts && <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">Paying Costs</span>}
                            </span>
                            <span className="font-semibold text-green-600">-{formatCurrency(savings)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-blue-50/50 border border-blue-100 rounded-lg mt-2">
                            <span className="text-blue-900 font-medium">Loan Increase</span>
                            <span className="font-bold text-blue-900">
                                {formatCurrency(Math.max(0, maxPropertyPrice + (capitaliseCosts ? estimatedCosts : 0) + cashOut - savings))}
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN: Results & Viz */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* Hero Result Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2 flex items-center">
                                    <ShieldCheck size={16} className="text-green-400 mr-1.5" />
                                    Equity Capacity
                                </div>
                                <div className="text-5xl font-bold tracking-tight mb-2">
                                    {formatCurrency(maxPropertyPrice)}
                                </div>
                                <div className="text-gray-400 text-sm mb-6">
                                    Based on your current equity position.
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                                <h4 className="text-white font-bold mb-2 flex items-center">
                                    Can you afford the repayments?
                                </h4>
                                <p className="text-gray-300 text-sm mb-4">
                                    We've calculated this limit based on equity, but lenders also check your income and expenses.
                                </p>
                                <button 
                                    onClick={() => setIsVerifyModalOpen(true)}
                                    className="w-full py-2.5 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center text-sm"
                                >
                                    Verify my borrowing power <ArrowRight size={16} className="ml-2" />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 flex flex-col justify-center">
                            <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
                                <div>
                                    <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Peak Debt</div>
                                    <div className="font-bold text-2xl">{formatCurrency(peakDebt)}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Peak LVR</div>
                                    <div className={`font-bold text-2xl ${peakDebt > 0 && ((peakDebt / (existingValue + maxPropertyPrice)) > 0.8) ? 'text-red-400' : 'text-green-400'}`}>
                                        {peakDebt > 0 ? ((peakDebt / (existingValue + maxPropertyPrice)) * 100).toFixed(1) : 0}%
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Interest Rate</span>
                                    <span className="text-white font-medium">{interestRate}% p.a.</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Bridging Term</span>
                                    <span className="text-white font-medium">12 Months</span>
                                </div>
                                <div className="flex justify-between pt-2">
                                    <span className="text-gray-400">Estimated Costs</span>
                                    <span className="text-white font-medium">{formatCurrency(estimatedCosts)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Market Context Filter Row */}
                <div className="flex flex-col md:flex-row gap-4">
                     <div className="flex-1 relative">
                        <label className="text-xs text-gray-500 font-medium mb-1.5 block ml-1">TARGET SUBURB</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                value={suburb}
                                onChange={(e) => setSuburb(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                                placeholder="Enter suburb"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-64">
                         <label className="text-xs text-gray-500 font-medium mb-1.5 block ml-1">PROPERTY TYPE</label>
                         <div className="relative">
                            <Building2 className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <select 
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white appearance-none"
                            >
                                <option>All</option>
                                <option>Houses</option>
                                <option>Townhouses</option>
                                <option>Apartments</option>
                            </select>
                         </div>
                    </div>
                </div>

                {/* Market Insights */}
                <MarketInsights 
                    maxPrice={maxPropertyPrice}
                    suburb={suburb}
                    propertyType={propertyType}
                    isLocked={isLocked}
                />

            </div>
        </div>
      </main>

      <VerificationModal 
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />
    </div>
  );
}
