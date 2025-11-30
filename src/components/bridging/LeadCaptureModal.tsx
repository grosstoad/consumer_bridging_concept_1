import React, { Fragment } from 'react';
import { X, CheckCircle, ArrowRight, User, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, title = "Unlock Your Property Insights" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100">
            
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
                <X size={20} />
            </button>

            <div className="grid grid-cols-1">
                {/* Visual Header */}
                <div className="bg-[#009ca6] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-teal-900 opacity-10 rounded-full blur-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                            <CheckCircle size={24} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{title}</h3>
                        <p className="text-teal-50 text-sm">
                            Get a comprehensive property report and bridging finance assessment tailored to your goals.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                <input 
                                    type="text" 
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#009ca6] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 bg-gray-50/50"
                                    placeholder="Jane Smith"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                    <input 
                                        type="tel" 
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#009ca6] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 bg-gray-50/50"
                                        placeholder="0400 000 000"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                    <input 
                                        type="email" 
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#009ca6] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 bg-gray-50/50"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Buying Timeline</label>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                <select className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#009ca6] focus:border-transparent outline-none transition-all text-gray-900 bg-gray-50/50 appearance-none">
                                    <option>Just researching</option>
                                    <option>Buying in 1-3 months</option>
                                    <option>Buying in 3-6 months</option>
                                    <option>Buying in 6+ months</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="w-full py-3 bg-[#009ca6] hover:bg-[#007f87] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center transform hover:scale-[1.01]"
                            >
                                View My Results <ArrowRight size={18} className="ml-2" />
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-3">
                                By continuing, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

