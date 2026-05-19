import React from 'react';
import { Search, Plus, ListChecks, MoreVertical, Edit, Move, Copy, Shield, Trash2, FileText, Database, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { DesignTooltip } from '../../../../components/DesignTooltip';
import { DEVICE_TYPE_COLORS } from '../../constants';

interface DeviceListProps {
  devicePath: string[];
  setDevicePath: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveSubMenu: (menu: string | null) => void;
  childSearch: string;
  setChildSearch: (search: string) => void;
  deviceFormCurrentPage: number;
  setDeviceFormCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setDetailForm: (form: any) => void;
  getDeviceTreeChildren: (path: string[]) => string[];
  getDetailedType: (name: string) => string;
}

export const DeviceList = ({
  devicePath,
  setDevicePath,
  setActiveSubMenu,
  childSearch,
  setChildSearch,
  deviceFormCurrentPage,
  setDeviceFormCurrentPage,
  setDetailForm,
  getDeviceTreeChildren,
  getDetailedType
}: DeviceListProps) => {
  const [deviceFormMenuOpen, setDeviceFormMenuOpen] = React.useState(false);

  const children = getDeviceTreeChildren(devicePath);
  const filteredChildren = children.filter(c => c.toLowerCase().includes(childSearch.toLowerCase()));
  
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);
  const startIndex = (deviceFormCurrentPage - 1) * itemsPerPage;
  const paginatedChildren = filteredChildren.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Custom Header for Device Info */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (devicePath.length > 2) {
                setDevicePath(prev => prev.slice(0, -2));
              } else if (devicePath.length > 0) {
                setDevicePath(prev => prev.slice(0, -1));
              } else {
                setActiveSubMenu(null);
              }
            }}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-[12pt] font-semibold flex items-center gap-2" style={{ color: '#164399' }}>
            <span className="font-bold">
              {devicePath[devicePath.length - 1]}
            </span>
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Tìm kiếm thiết bị con..."
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all"
              value={childSearch}
              onChange={(e) => setChildSearch(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setDetailForm({ type: 'device', mode: 'add' })}
            className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-lg text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm whitespace-nowrap"
            title="Thêm thiết bị con"
          >
            <Plus className="w-4 h-4" />
            Thêm
          </button>
          <button className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm" title="Sửa hàng loạt">
            <ListChecks className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setDeviceFormMenuOpen(!deviceFormMenuOpen)}
              className={`p-2 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm ${deviceFormMenuOpen ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            
            {deviceFormMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {[
                  { label: 'Sửa', icon: <Edit className="w-4 h-4" />, color: 'text-blue-600' },
                  { label: 'Di chuyển', icon: <Move className="w-4 h-4" />, color: 'text-orange-600' },
                  { label: 'Copy', icon: <Copy className="w-4 h-4" />, color: 'text-green-600' },
                  { label: 'Phân quyền', icon: <Shield className="w-4 h-4" />, color: 'text-purple-600' },
                  { label: 'Xóa', icon: <Trash2 className="w-4 h-4" />, color: 'text-red-600' },
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[12pt] text-gray-700 hover:bg-gray-50 transition-colors group"
                    onClick={() => setDeviceFormMenuOpen(false)}
                  >
                    <span className={`${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <div className="overflow-y-auto flex-1 custom-scrollbar min-h-0">
          <table className="w-full text-[12pt] text-left border-collapse table-fixed">
            <thead className="bg-white text-[#555555] text-[12pt] font-bold sticky top-0 z-20 shadow-sm">
              <tr>
                <th className="px-4 h-12 border-b border-gray-200 w-12 text-center bg-white font-bold">
                  <DesignTooltip id="th_stt">STT</DesignTooltip>
                </th>
                <th className="px-4 h-12 border-b border-gray-200 w-32 bg-white font-bold">
                  <DesignTooltip id="th_loai_tb">Loại TB</DesignTooltip>
                </th>
                <th className="px-4 h-12 border-b border-gray-200 bg-white font-bold">
                  <DesignTooltip id="th_ten_tb_chi_tiet">Tên Thiết Bị chi tiết</DesignTooltip>
                </th>
                <th className="px-4 h-12 border-b border-gray-200 w-12 text-center bg-white font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedChildren.map((child, idx) => {
                const actualIdx = startIndex + idx;
                const isLocked = actualIdx === 2; // Mock locked state
                const type = getDetailedType(child);
                
                return (
                  <tr 
                    key={actualIdx} 
                    className={`group hover:bg-blue-50/50 transition-colors border-b border-gray-100 cursor-pointer ${isLocked ? 'opacity-50 grayscale-[0.5]' : ''}`}
                    onDoubleClick={() => {
                      setDevicePath([...devicePath, getDetailedType(child), child]);
                      setDeviceFormCurrentPage(1);
                    }}
                  >
                    <td className="px-4 py-3 text-center text-gray-400 text-secondary">{actualIdx + 1}</td>
                    <td className="px-4 py-3">
                      <div className={`px-2.5 py-1 rounded-md text-secondary uppercase tracking-wider text-center border text-[10pt] whitespace-nowrap ${DEVICE_TYPE_COLORS[type] || DEVICE_TYPE_COLORS['default']}`}>
                        {type}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 group-hover:text-blue-700 transition-colors truncate text-[12pt]">
                      {child}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="relative group/menu inline-block">
                        <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-400 hover:text-blue-600 transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 hidden group-hover/menu:block">
                          <button 
                            className="w-full text-left px-3 py-2 text-secondary hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                            onClick={() => setDetailForm({ type: 'device', mode: 'view', data: child })}
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-500" /> Xem lý lịch
                          </button>
                          <button className="w-full text-left px-3 py-2 text-secondary hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                            <Database className="w-3.5 h-3.5 text-green-500" /> Mã TSCĐ
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button className="w-full text-left px-3 py-2 text-secondary hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                            <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> Di chuyển lên trên
                          </button>
                          <button className="w-full text-left px-3 py-2 text-secondary hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                            <ChevronDown className="w-3.5 h-3.5 text-gray-500" /> Di chuyển xuống dưới
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
            <div className="text-secondary text-gray-500 font-medium">
              Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredChildren.length)} / {filteredChildren.length}
            </div>
            <div className="flex items-center gap-1">
              <button 
                disabled={deviceFormCurrentPage === 1}
                onClick={() => setDeviceFormCurrentPage(prev => prev - 1)}
                className="p-1.5 rounded hover:bg-white border border-transparent hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setDeviceFormCurrentPage(i + 1)}
                  className={`w-7 h-7 text-secondary font-bold rounded transition-all ${deviceFormCurrentPage === i + 1 ? 'bg-[#164399] text-white shadow-md' : 'hover:bg-white border border-transparent hover:border-gray-200 text-gray-600'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                disabled={deviceFormCurrentPage === totalPages}
                onClick={() => setDeviceFormCurrentPage(prev => prev + 1)}
                className="p-1.5 rounded hover:bg-white border border-transparent hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
