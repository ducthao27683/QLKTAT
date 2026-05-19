import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { getTypeIcon } from '../../utils';

interface GroupedDeviceColumnProps {
  typeOptions: string[];
  selectedType?: string;
  onSelectType: (opt: string) => void;
  instanceOptions?: string[];
  selectedInstance?: string;
  onSelectInstance?: (opt: string) => void;
  headerLabel?: string;
  hideHeader?: boolean;
  hideTypeSelection?: boolean;
  hideSearch?: boolean;
}

export const GroupedDeviceColumn = ({ 
  typeOptions, 
  selectedType, 
  onSelectType,
  instanceOptions,
  selectedInstance,
  onSelectInstance,
  headerLabel,
  hideHeader = false,
  hideTypeSelection = false,
  hideSearch = false
}: GroupedDeviceColumnProps) => {
  const [search, setSearch] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const filteredInstances = instanceOptions ? instanceOptions.filter(o => o.toLowerCase().includes(search.toLowerCase())) : [];

  useEffect(() => {
    if (selectedInstance && listRef.current) {
      const selectedElement = listRef.current.querySelector(`[data-instance="${selectedInstance}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedInstance]);

  return (
    <div className="w-80 bg-white border border-gray-200 rounded-xl flex flex-col shrink-0 shadow-sm overflow-hidden h-full">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        {!hideTypeSelection && (
          <div className="p-3 border-b border-gray-200 bg-[#F8FAFC]">
            <div className="relative">
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select 
                className="w-full pl-3 pr-10 py-2.5 text-[11pt] font-black text-[#164399] bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer uppercase tracking-tight"
                value={selectedType}
                onChange={(e) => onSelectType(e.target.value)}
              >
                {typeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {!hideSearch && selectedType && instanceOptions && (
          <div className="p-3 border-b border-gray-100 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder={`Tìm nhanh...`} 
                className="w-full pl-9 pr-3 py-2 text-[11pt] border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow bg-gray-50 focus:bg-white"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const currentIndex = filteredInstances.indexOf(selectedInstance || '');
                    const nextIndex = (currentIndex + 1) % filteredInstances.length;
                    if (onSelectInstance) onSelectInstance(filteredInstances[nextIndex]);
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const currentIndex = filteredInstances.indexOf(selectedInstance || '');
                    const prevIndex = (currentIndex - 1 + filteredInstances.length) % filteredInstances.length;
                    if (onSelectInstance) onSelectInstance(filteredInstances[prevIndex]);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      {(selectedType || hideTypeSelection) && instanceOptions && (
        <div className="flex-1 overflow-y-auto p-1.5 custom-scrollbar bg-white" ref={listRef}>
          {filteredInstances.map(opt => (
            <button 
              key={opt}
              data-instance={opt}
              className={`w-full text-left px-3 py-2 text-[10pt] rounded-md transition-all duration-200 flex items-center justify-between group ${selectedInstance === opt ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-300'}`}
              onClick={() => onSelectInstance && onSelectInstance(opt)}
            >
              <span className="truncate pr-2">{opt}</span>
              {selectedInstance === opt && <div className="w-1.5 h-1.5 rounded-full bg-[#164399] shrink-0"></div>}
            </button>
          ))}
          {filteredInstances.length === 0 && (
            <div className="py-8 text-center text-secondary text-gray-400 italic">Không tìm thấy kết quả</div>
          )}
        </div>
      )}
      {!selectedType && !hideTypeSelection && (
        <div className="flex-1 flex items-center justify-center p-4 text-secondary text-gray-400 italic bg-gray-50/50 text-center">
          Chọn loại ở trên để xem danh sách
        </div>
      )}
    </div>
  );
};
