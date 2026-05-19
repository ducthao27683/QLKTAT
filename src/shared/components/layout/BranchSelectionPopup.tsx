import React, { useState } from 'react';
import { Network, X, ChevronRight, ChevronDown } from 'lucide-react';

interface BranchSelectionPopupProps {
  showBranchTreePopup: boolean;
  setShowBranchTreePopup: (show: boolean) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
}

const BRANCH_TREE = {
  name: "Tổng công ty Điện lực Miền Bắc",
  children: [
    {
      name: "Điện lực Thành phố Hưng Yên",
      children: [
        { name: "Điện lực Thành phố Hưng Yên" },
        { name: "Điện lực thị xã Mỹ Hào" },
        { name: "Điện lực huyện Văn Lâm" },
        { name: "Điện lực huyện Văn Giang" },
        { name: "Xưởng 110kV" },
        { name: "Công ty dịch vụ Điện lực" },
        { name: "Trung tâm Thí nghiệm điện" }
      ]
    },
    {
      name: "Công ty Điện lực Hải Dương",
      children: [
        { name: "Điện lực thành phố Hải Dương" }
      ]
    },
    {
      name: "Công ty Điện lực Bắc Ninh",
      children: []
    }
  ]
};

const TreeNode = ({ node, selectedBranch, setSelectedBranch, setShowBranchTreePopup }: any) => {
  const [expanded, setExpanded] = useState(true);
  const isSelected = selectedBranch === node.name;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="pl-4 py-1">
      <div className="flex items-center gap-1 group">
        {hasChildren ? (
          <button onClick={() => setExpanded(!expanded)} className="p-0.5 hover:bg-gray-200 rounded text-gray-500">
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <div className="w-5" />
        )}
        <div 
          onClick={() => {
            setSelectedBranch(node.name);
            setShowBranchTreePopup(false);
          }}
          className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
            isSelected 
              ? 'bg-blue-50 text-blue-700 font-bold' 
              : 'text-gray-700 hover:bg-gray-100 font-medium'
          }`}
        >
          {node.name}
        </div>
      </div>
      {expanded && hasChildren && (
        <div className="border-l border-gray-200 ml-2.5 mt-1">
          {node.children.map((child: any, idx: number) => (
            <TreeNode 
              key={idx} 
              node={child} 
              selectedBranch={selectedBranch} 
              setSelectedBranch={setSelectedBranch} 
              setShowBranchTreePopup={setShowBranchTreePopup}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const BranchSelectionPopup = ({
  showBranchTreePopup,
  setShowBranchTreePopup,
  selectedBranch,
  setSelectedBranch
}: BranchSelectionPopupProps) => {

  if (!showBranchTreePopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 animate-in fade-in zoom-in-95">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden max-h-[80vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <h3 className="font-bold text-[13pt] text-[#164399] flex items-center gap-2">
            <Network className="w-5 h-5" />
            Chọn đơn vị làm việc
          </h3>
          <button 
            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500" 
            onClick={() => setShowBranchTreePopup(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-2 border-b border-gray-100 bg-blue-50/50 shrink-0">
          <div className="px-4 py-2">
            <div className="text-[10pt] text-gray-500 font-semibold uppercase tracking-wider mb-1">Đang chọn:</div>
            <div className="font-bold text-[#164399] text-[12pt]">{selectedBranch}</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-white/50">
          <div className="-ml-4">
             <TreeNode 
               node={BRANCH_TREE} 
               selectedBranch={selectedBranch} 
               setSelectedBranch={setSelectedBranch} 
               setShowBranchTreePopup={setShowBranchTreePopup} 
             />
          </div>
        </div>
      </div>
    </div>
  );
};
