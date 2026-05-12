import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';

interface GenericModuleProps {
  title: string;
  onBack: () => void;
}

export const GenericModule = ({ title, onBack }: GenericModuleProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 shrink-0">
        <button 
          onClick={onBack}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h2 className="text-[12pt] font-bold text-[#164399]">{title}</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <Settings className="w-12 h-12 text-blue-200 animate-spin-slow" />
        </div>
        <h3 className="text-[16pt] font-bold text-gray-700 mb-2">Tính năng đang phát triển</h3>
        <p className="text-[12pt] text-gray-500 max-w-md">
          Phân hệ <span className="font-bold text-blue-600">{title}</span> đang được xây dựng và sẽ sớm ra mắt trong phiên bản tiếp theo.
        </p>
      </div>
    </div>
  );
};
