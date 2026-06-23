import React, { useEffect, useRef } from 'react';
import { Search, ZoomIn, Network, Eye, AlertTriangle, Wrench, Activity, ChevronDown, FlaskConical } from 'lucide-react';
import { getDeviceInstances, getDeviceTypes, getDeviceTreeChildren, getDetailedType, BRANCH_ABBR, TYPE_ABBR } from '../../utils';

interface BreadcrumbBarProps {
  isEditing?: boolean;
  devicePath: string[];
  setDevicePath: React.Dispatch<React.SetStateAction<string[]>>;
  setTempDevicePath: React.Dispatch<React.SetStateAction<string[]>>;
  setShowDeviceTreePopup: (show: boolean) => void;
  setDeviceFormCurrentPage: (page: number) => void;
  activeBreadcrumbDropdown: string | null;
  setActiveBreadcrumbDropdown: (dropdown: string | null) => void;
  breadcrumbSearch: string;
  setBreadcrumbSearch: (search: string) => void;
  setDetailForm: (form: any) => void;
  detailForm: any;
  setActiveSubMenu: (submenu: string) => void;
  setActiveMenu?: (menu: string | null) => void;
}

export const BreadcrumbBar = ({
  isEditing,
  devicePath,
  setDevicePath,
  setTempDevicePath,
  setShowDeviceTreePopup,
  setDeviceFormCurrentPage,
  activeBreadcrumbDropdown,
  setActiveBreadcrumbDropdown,
  breadcrumbSearch,
  setBreadcrumbSearch,
  setDetailForm,
  detailForm,
  setActiveSubMenu,
  setActiveMenu
}: BreadcrumbBarProps) => {
  const isLocked = detailForm !== null && detailForm.mode !== 'view';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveBreadcrumbDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setActiveBreadcrumbDropdown]);

  return (
    <div ref={containerRef} className={`flex items-center justify-between px-4 min-h-[48px] py-1 bg-white border-b border-gray-200 shrink-0 z-40 shadow-sm relative w-full ${(isEditing || isLocked) ? 'pointer-events-none opacity-50' : ''}`}>
      <div className="flex items-center gap-1 flex-wrap flex-1">
          <button 
            className="p-1.5 hover:bg-blue-50 rounded-[10px] text-blue-600 transition-colors shrink-0 mr-2"
            onClick={() => {
              setTempDevicePath(devicePath);
              setShowDeviceTreePopup(true);
            }}
            title="Chọn Vị trí/Thiết bị làm việc"
          >
            <Network className="w-5 h-5" />
          </button>
          
          <div className="flex items-center text-[12pt] whitespace-nowrap">
            {(() => {
              const items = [];
              
              for (let i = 0; i < devicePath.length; i += 2) {
                const label = devicePath[i];
                if (!label || label === "Tất cả") continue;
                
                let options: string[] = [];
                // Level 1 options should show all top level entities
                if (i === 0) {
                  options = getDeviceInstances([], "Tất cả");
                } else {
                  // Get parent path and type to find siblings (same level instances)
                  const parentPath = devicePath.slice(0, i - 1);
                  const type = devicePath[i - 1]; // The type of this level
                  options = getDeviceInstances(parentPath, type);
                }
                
                if (!options || options.length === 0) continue; 
                
                let displayLabel = label;
                if (i === 0) {
                  // Cấp 1 là Đơn vị thì không lấy viết tắt nữa, lấy đầy đủ tên.
                  displayLabel = label;
                } else {
                  // Try to find if there is an abbreviation for this type too
                  // or just keep as is
                }
                
                items.push({
                  label: displayLabel,
                  fullLabel: label,
                  icon: null,
                  dropdownOptions: options,
                  onSelect: (opt: string) => {
                    // Replace the instance at this level and truncate everything after
                    const newPath = [...devicePath.slice(0, i), opt];
                    setDevicePath(newPath);
                    setDeviceFormCurrentPage(1);
                    setActiveBreadcrumbDropdown(null);
                    setDetailForm(null);
                  },
                  dropdownId: `item-${i}`
                });
              }

              return items.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <div className="flex items-center gap-1 mx-1 shrink-0">
                      <span className="text-gray-300 font-light">/</span>
                    </div>
                  )}
                  <div className="relative group shrink min-w-0 max-w-[200px] lg:max-w-[300px]">
                    <button 
                      className={`px-2 py-1 hover:bg-blue-50 hover:text-blue-600 rounded-[10px] transition-colors flex items-center gap-1.5 w-full text-[12pt] ${activeBreadcrumbDropdown === item.dropdownId ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 font-medium'}`}
                      title={item.fullLabel}
                      onClick={() => {
                        setActiveBreadcrumbDropdown(activeBreadcrumbDropdown === item.dropdownId ? null : item.dropdownId);
                        setBreadcrumbSearch('');
                      }}
                    >
                      <span className="truncate text-left">{item.label}</span>
                      <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-200 ${activeBreadcrumbDropdown === item.dropdownId ? 'rotate-180' : ''}`} />
                    </button>
                    {activeBreadcrumbDropdown === item.dropdownId && (
                      <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 overflow-hidden flex flex-col max-h-80">
                        <div className="px-3 pb-2 border-b border-gray-100 shrink-0">
                          <div className="relative">
                            <input 
                              type="text" 
                              placeholder="Tìm kiếm..." 
                              className="w-full px-3 py-1.5 text-[12pt] border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow bg-gray-50 focus:bg-white" 
                              onChange={(e) => setBreadcrumbSearch(e.target.value)}
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="overflow-y-auto p-1.5 custom-scrollbar flex-1">
                          {item.dropdownOptions
                            .filter(opt => opt.toLowerCase().includes(breadcrumbSearch.toLowerCase()))
                            .map(opt => (
                            <button 
                              key={opt} 
                              className={`w-full text-left px-3 py-2 text-[10pt] rounded-md transition-all mb-0.5 flex items-center justify-between ${item.label === opt ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-700 border border-transparent hover:border-gray-300'}`}
                              onClick={() => {
                                item.onSelect(opt);
                                setBreadcrumbSearch('');
                                setDetailForm(null);
                              }}
                            >
                              <span className="truncate pr-2">{opt}</span>
                              {item.label === opt && <div className="w-1.5 h-1.5 rounded-full bg-[#164399] shrink-0"></div>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ));
            })()}
          </div>
        </div>
        
        {/* Action Bar */}
        <div className="flex items-center gap-2 shrink-0 pl-4 border-l border-gray-200 ml-4">
          <button 
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12pt] font-medium text-pink-700 hover:bg-pink-50 rounded-[10px] transition-all duration-300 group bg-transparent"
            onClick={() => {
              setActiveSubMenu('Danh sách thiết bị');
              setDetailForm(null);
            }}
          >
            <Eye className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
            Xem
          </button>
          <button 
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12pt] font-medium text-green-700 hover:bg-green-50 rounded-[10px] transition-all duration-300 group bg-transparent"
            onClick={() => {
              setActiveSubMenu('Giám sát thông số');
              setDetailForm(null);
            }}
          >
            <Activity className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
            Thông số
          </button>
          <button 
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12pt] font-medium text-red-700 hover:bg-red-50 rounded-[10px] transition-all duration-300 group bg-transparent"
            onClick={() => {
              setActiveSubMenu('Danh sách sự cố');
              setDetailForm(null);
            }}
          >
            <AlertTriangle className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
            Sự cố
          </button>
          <button 
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12pt] font-medium text-sky-700 hover:bg-sky-50 rounded-[10px] transition-all duration-300 group bg-transparent"
            onClick={() => {
              setActiveSubMenu('Sửa chữa theo CBM/RCM');
              if (setActiveMenu) setActiveMenu('scbd');
              setDetailForm(null);
            }}
          >
            <Wrench className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
            SCBD
          </button>
          <button 
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12pt] font-medium text-violet-700 hover:bg-violet-50 rounded-[10px] transition-all duration-300 group bg-transparent"
            onClick={() => {
              setActiveSubMenu('Thiết lập thiết bị');
              if (setActiveMenu) setActiveMenu('thi-nghiem');
              setDetailForm(null);
            }}
          >
            <FlaskConical className="w-4 h-4 text-violet-600 group-hover:scale-110 transition-transform" />
            Thí nghiệm
          </button>
        </div>
      </div>
  );
};
