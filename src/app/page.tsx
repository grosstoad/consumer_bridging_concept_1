import React from 'react';
import { Header } from '@/components/layout/Header';
import { PropertyHeader } from '@/components/dashboard/PropertyHeader';
import { EquityCard } from '@/components/dashboard/EquityCard';
import { LoanCard } from '@/components/dashboard/LoanCard';
import { CalculatorsGrid } from '@/components/dashboard/CalculatorsGrid';
import { ChevronRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <PropertyHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EquityCard />
        <LoanCard />
        <CalculatorsGrid />

        {/* Mortgage Choice Banner */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
                <div className="bg-red-100 p-3 rounded-full text-red-600 mr-4">
                    <span className="text-xl font-bold">MC</span>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Introducing Mortgage Choice</h3>
                    <p className="text-sm text-gray-500">Our home lending specialist team from Mortgage Choice is here to help.</p>
                </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 whitespace-nowrap">
                Who is Mortgage Choice?
            </button>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Notifications</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {[
                    { title: 'Equity updates', sub: 'Set when to receive notification' },
                    { title: 'Save on repayment', sub: 'Get an alert when there is a suitable loan' },
                    { title: 'RBA updates and cashback offers', sub: 'Stay updated with market changes' }
                ].map((item, i) => (
                    <div key={i} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                        <div>
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-xs text-gray-500">{item.sub}</div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
