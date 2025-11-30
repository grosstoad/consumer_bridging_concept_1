import React from 'react';
import { X, Users, Building2, ArrowRight, Check } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:w-full sm:max-w-2xl border border-gray-100">
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
                <X size={20} />
            </button>

            <div className="p-8">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Borrowing Power</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Choose how you'd like to proceed with your bridging finance assessment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Broker Pathway */}
                    <div className="group relative bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-[#009ca6] transition-all cursor-pointer shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4 text-[#009ca6] group-hover:scale-110 transition-transform">
                            <Users size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Talk to a Broker</h4>
                        <p className="text-sm text-gray-500 mb-6 h-10">
                            Get expert advice tailored to your situation from our network of bridging specialists.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-sm text-gray-600">
                                <Check size={16} className="text-green-500 mr-3 flex-shrink-0" /> Compare 30+ lenders
                            </li>
                            <li className="flex items-center text-sm text-gray-600">
                                <Check size={16} className="text-green-500 mr-3 flex-shrink-0" /> Expert structuring advice
                            </li>
                            <li className="flex items-center text-sm text-gray-600">
                                <Check size={16} className="text-green-500 mr-3 flex-shrink-0" /> Full application support
                            </li>
                        </ul>
                        <button className="w-full py-3 bg-[#009ca6] text-white font-bold rounded-lg hover:bg-[#007f87] transition-colors flex items-center justify-center">
                            Connect Now <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>

                    {/* Lender Pathway */}
                    <div className="group bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-500 transition-all cursor-pointer shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                            <Building2 size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Apply Direct</h4>
                        <p className="text-sm text-gray-500 mb-6 h-10">
                            Already know what you need? Start your application directly with a digital lender.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-sm text-gray-600">
                                <Check size={16} className="text-blue-500 mr-3 flex-shrink-0" /> Fast online approval
                            </li>
                            <li className="flex items-center text-sm text-gray-600">
                                <Check size={16} className="text-blue-500 mr-3 flex-shrink-0" /> Self-service process
                            </li>
                            <li className="flex items-center text-sm text-gray-600">
                                <Check size={16} className="text-blue-500 mr-3 flex-shrink-0" /> Competitive direct rates
                            </li>
                        </ul>
                        <button className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                            Start Application <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>
                </div>
                
                <p className="text-center text-xs text-gray-400 mt-6">
                    Not sure? We recommend speaking with a broker for complex bridging scenarios.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

