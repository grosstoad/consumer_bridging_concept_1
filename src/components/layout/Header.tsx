import React from 'react';
import { User, Bell, FolderHeart, Menu, Search } from 'lucide-react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button className="p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-700 lg:hidden">
              <Menu size={24} />
            </button>
            <Link href="/" className="flex-shrink-0 flex items-center group">
               {/* REA Logo Recreation */}
               <div className="bg-[#E4002B] p-1.5 rounded-sm mr-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
               </div>
               <span className="text-gray-900 font-bold text-xl tracking-tight hidden sm:block">realestate.com.au</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64 lg:w-96 mx-4">
             <Search size={18} className="text-gray-400 mr-2" />
             <input type="text" placeholder="Search properties" className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-900 placeholder-gray-500" />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FolderHeart size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User size={20} />
            </button>
            <button className="hidden sm:block border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Need help?
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
