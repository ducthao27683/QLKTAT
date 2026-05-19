import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getDeviceTypes, getDeviceInstances, getTypeIcon } from '../shared/utils';

export const DeviceTreeList = ({ 
  devicePath, 
  onSelectType, 
  onSelectInstance, 
  selectedType, 
  selectedInstance,
  hideTypeSelection = false
}: { 
  devicePath: string[], 
  onSelectType?: (type: string) => void, 
  onSelectInstance?: (instance: string) => void,
  selectedType?: string | null,
  selectedInstance?: string | null,
  hideTypeSelection?: boolean
}) => {
  const types = getDeviceTypes(devicePath);
  const [typeSearch, setTypeSearch] = useState('');
  const [instanceSearch, setInstanceSearch] = useState('');

  const filteredTypes = types.filter(t => t.toLowerCase().includes(typeSearch.toLowerCase()));
  const instances = selectedType ? getDeviceInstances(devicePath, selectedType) : [];
  const filteredInstances = instances.filter(i => i.toLowerCase().includes(instanceSearch.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-white">
      {!hideTypeSelection && (
        <div className="p-3 border-b border-gray-100 space-y-2 bg-gray-50/30">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm phân loại..." 
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-md text-[10pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={typeSearch}
              onChange={(e) => setTypeSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filteredTypes.map(type => (
              <button 
                key={type}
                className={`px-3 py-1 rounded-full text-[10pt] font-medium transition-all ${selectedType === type ? 'bg-[#164399] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                onClick={() => onSelectType && onSelectType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {selectedType && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          <div className="relative mb-2 px-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={`Tìm ${selectedType.toLowerCase()}...`} 
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md text-[10pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={instanceSearch}
              onChange={(e) => setInstanceSearch(e.target.value)}
            />
          </div>
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
}: {
  typeOptions: string[],
  selectedType?: string,
  onSelectType: (opt: string) => void,
  instanceOptions?: string[],
  selectedInstance?: string,
  onSelectInstance?: (opt: string) => void,
  headerLabel?: string,
  hideHeader?: boolean,
  hideTypeSelection?: boolean,
  hideSearch?: boolean
}) => {
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
    <div className="w-72 bg-white border border-gray-200 rounded-lg flex flex-col shrink-0 shadow-sm overflow-hidden h-full">
      {!hideHeader && headerLabel && (
        <div className="p-2 border-b border-gray-200 bg-gray-50 font-bold text-secondary text-gray-700 text-center shrink-0 uppercase tracking-wider">
          {headerLabel}
        </div>
      )}

      <div className="sticky top-0 z-10 bg-white shadow-sm">
        {!hideTypeSelection && (
          <div className="p-2 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-1">
            {typeOptions.map(opt => (
              <button
                key={opt}
                className={`px-2 py-1.5 text-[10pt] rounded-md transition-all flex-1 text-center whitespace-nowrap flex items-center justify-center gap-1.5 ${selectedType === opt ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-600 border border-transparent hover:border-gray-300'}`}
                onClick={() => onSelectType(opt)}
                title={opt}
              >
                {getTypeIcon(opt, "w-3.5 h-3.5")}
                <span className="truncate">{opt}</span>
              </button>
            ))}
          </div>
        )}
        
        {!hideSearch && selectedType && instanceOptions && (
          <div className="p-2 border-b border-gray-100 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder={`Tìm ${selectedType.toLowerCase()}...`} 
                className="w-full pl-8 pr-3 py-1.5 text-secondary border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow bg-gray-50 focus:bg-white"
                value={search}
                onChange={e => setSearch(e.target.value)}
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
