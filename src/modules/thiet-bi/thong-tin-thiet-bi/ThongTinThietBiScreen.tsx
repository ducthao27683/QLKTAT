import React from 'react';
import { 
  ArrowLeft, Search, Plus, ListChecks, MoreVertical, Edit, Move, Copy, Shield, Trash2, 
  FileText, Database, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Settings, 
  ExternalLink, Box, Camera, Upload, Download, Maximize2, Activity, Filter, X, Check, Flame, Layout,
  ClipboardList, FlaskConical, Wrench, GitCommit, Zap, Package, Layers, MapPin,
  Building2, Network, Binary
} from 'lucide-react';
import { DesignTooltip } from '../../../components/DesignTooltip';
import { EvnLogo } from '../../../components/EvnLogo';
import { getDetailedType, formatNumber, getDeviceTypes, getDeviceInstances } from '../../../shared/utils';
import { DEVICE_TYPE_COLORS } from '../constants';

interface DeviceModuleProps {
  devicePath: string[];
  setDevicePath: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveSubMenu: (menu: string | null) => void;
  childSearch: string;
  setChildSearch: (search: string) => void;
  deviceFormCurrentPage: number;
  setDeviceFormCurrentPage: (page: number) => void;
  deviceFormTab: 'info' | 'tracking' | 'reports';
  setDeviceFormTab: (tab: 'info' | 'tracking' | 'reports') => void;
  deviceFormMenuOpen: boolean;
  setDeviceFormMenuOpen: (open: boolean) => void;
  setDetailForm: (form: any) => void;
  setPreviewContent: (content: any) => void;
  setConfirmAction: (action: any) => void;
  getDeviceDetails: (name: string) => any;
}

const normalizeType = (type: string) => {
  const t = type?.toUpperCase() || '';
  if (t === 'TBA' || t === 'TRẠM' || t.includes('TRẠM') || t.includes('TBA')) return 'Trạm';
  if (t === 'ĐD' || t === 'ĐƯỜNG DÂY' || t.includes('ĐƯỜNG DÂY') || t.includes('ĐĐ')) return 'Đường dây';
  if (t === 'MC' || t === 'MÁY CẮT' || t.includes('MÁY CẮT') || t.includes('MC')) return 'Máy cắt';
  if (t === 'MBA' || t === 'MÁY BIẾN ÁP' || t.includes('MÁY BIẾN ÁP') || t.includes('MBA')) return 'Máy biến áp';
  if (t === 'TI' || t === 'BIẾN DÒNG' || t === 'BIẾN DÒNG ĐIỆN' || t.includes('BIẾN DÒNG') || t.includes('TI')) return 'Biến dòng';
  if (t === 'TU' || t === 'BIẾN ĐIỆN ÁP' || t.includes('BIẾN ĐIỆN ÁP') || t.includes('TU')) return 'Biến điện áp';
  if (t === 'DCL' || t === 'DAO CÁCH LY' || t.includes('DAO CÁCH LY') || t.includes('DCL')) return 'Dao cách ly';
  if (t === 'CSV' || t === 'CHỐNG SÉT VAN' || t.includes('CHỐNG SÉT VAN') || t.includes('CSV')) return 'Chống sét van';
  return type;
};

const getDeviceItemVisual = (type: string, isSelected?: boolean) => {
  const t = normalizeType(type);
  if (t === 'Trạm') {
    return {
      icon: <Building2 className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100/50',
    };
  }
  if (t === 'Đường dây') {
    return {
      icon: <Network className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-50 text-purple-600 border border-purple-100 hover:bg-purple-100/50',
    };
  }
  if (t === 'Máy cắt') {
    return {
      icon: <Zap className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100/50',
    };
  }
  if (t === 'Máy biến áp') {
    return {
      icon: <Box className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-amber-600 text-white shadow-md' : 'bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100/50',
    };
  }
  if (t === 'Biến dòng') {
    return {
      icon: <Activity className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-teal-600 text-white shadow-md' : 'bg-teal-50 text-teal-600 border border-teal-100 hover:bg-teal-100/50',
    };
  }
  if (t === 'Biến điện áp') {
    return {
      icon: <Binary className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-pink-600 text-white shadow-md' : 'bg-pink-50 text-pink-600 border border-pink-100 hover:bg-pink-100/50',
    };
  }
  if (t === 'Dao cách ly') {
    return {
      icon: <GitCommit className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100/50',
    };
  }
  if (t === 'Chống sét van') {
    return {
      icon: <Shield className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-sky-600 text-white shadow-md' : 'bg-sky-50 text-sky-600 border border-sky-100 hover:bg-sky-100/50',
    };
  }
  if (t?.includes('Vị trí') || t?.includes('Cột')) {
    return {
      icon: <MapPin className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100/50',
    };
  }
  if (t?.includes('Ngăn lộ')) {
    return {
      icon: <ListChecks className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-violet-600 text-white shadow-md' : 'bg-violet-50 text-violet-600 border border-violet-100 hover:bg-violet-100/50',
    };
  }
  if (t?.includes('Hệ thống')) {
    return {
      icon: <Layers className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-fuchsia-600 text-white shadow-md' : 'bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100 hover:bg-fuchsia-100/50',
    };
  }
  if (t === 'Bộ điều khiển' || t?.includes('điều khiển') || t?.includes('BĐK')) {
    return {
      icon: <Wrench className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-orange-600 text-white shadow-md' : 'bg-orange-50 text-orange-600 border border-orange-100 hover:bg-orange-100/50',
    };
  }
  if (t === 'Sứ cách điện' || t === 'Phụ kiện' || t?.includes('Sứ') || t?.includes('Phụ') || t?.includes('PK')) {
    return {
      icon: <Settings className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100/50',
    };
  }
  return {
    icon: <Package className="w-5 h-5 shrink-0" />,
    bg: isSelected ? 'bg-gray-600 text-white shadow-md' : 'bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100/50',
  };
};

const getDeviceIcon = (type: string, isSelected?: boolean) => {
  return getDeviceItemVisual(type, isSelected).icon;
};

const getDeviceStatus = (index: number) => {
  const mod = index % 8;
  if (mod === 5) return 'Khóa';
  if (mod === 4) return 'Sửa chữa';
  if (mod === 3) return 'Dự phòng';
  return 'Đang vận hành';
};

const getDetailedChildType = (name: string) => {
  const n = name || '';
  if (n.includes('Đường dây') || n.includes('ĐD') || n.includes('kV')) return 'Đường dây';
  if (n.includes('Trạm biến áp') || n.includes('TBA') || n.startsWith('Trạm')) return 'Trạm';
  if (n.includes('Kho')) return 'Kho';
  if (n.includes('Vị trí cột') || n.includes('Vị trí') || n.includes('Cột') || n.includes('Móng')) return 'Vị trí';
  if (n.includes('Nút')) return 'Nút';
  if (n.includes('Ngăn lộ')) return 'Ngăn lộ';
  if (n.includes('Hệ thống') || n.includes('Tủ AC') || n.includes('Tủ DC') || n.includes('ắc quy') || n.includes('RTU') || n.includes('Tủ bảo vệ') || n.includes('Giàn')) return 'Hệ thống';
  if (n.includes('Máy biến áp') || n.includes('MBA')) return 'Máy biến áp';
  if (n.includes('Máy cắt') || n.includes('MC')) return 'Máy cắt';
  if (n.includes('Tụ')) return 'Tụ điện';
  if (n.includes('Biến dòng') || n.includes('TI')) return 'Biến dòng';
  if (n.includes('Biến điện áp') || n.includes('TU')) return 'Biến điện áp';
  if (n.includes('Dao cách ly') || n.includes('DCL')) return 'Dao cách ly';
  if (n.includes('Chống sét van') || n.includes('CSV')) return 'Chống sét van';
  if (n.includes('Rơ le') || n.includes('Bộ điều khiển') || n.includes('Tủ điều khiển')) return 'Bộ điều khiển';
  if (n.includes('Sứ') || n.includes('Cách điện')) return 'Sứ cách điện';
  if (n.includes('Thanh cái') || n.includes('Kẹp cực') || n.includes('Hộp đầu cáp') || n.includes('Cáp')) return 'Phụ kiện';
  return 'Thiết bị';
};

const getDeviceCode = (itemName: string, index: number) => {
  const t = normalizeType(getDetailedChildType(itemName));
  const num = 1000 + index;
  if (t === 'Trạm') return `TBA-${num}`;
  if (t === 'Đường dây') return `ĐD-${num}`;
  if (t === 'Máy biến áp') return `MBA-${num}`;
  if (t === 'Máy cắt') return `MC-${num}`;
  if (t === 'Biến dòng') return `TI-${num}`;
  if (t === 'Biến điện áp') return `TU-${num}`;
  if (t === 'Dao cách ly') return `DCL-${num}`;
  if (t === 'Chống sét van') return `CSV-${num}`;
  if (t === 'Ngăn lộ') return `NL-${num}`;
  if (t === 'Vị trí') return `VT-${num}`;
  if (t === 'Hệ thống') return `HT-${num}`;
  if (t === 'Bộ điều khiển') return `BĐK-${num}`;
  if (t === 'Sứ cách điện' || t === 'Phụ kiện') return `PK-${num}`;
  return `TB-${num}`;
};

export const DeviceModule = ({
  devicePath,
  setDevicePath,
  setActiveSubMenu,
  childSearch,
  setChildSearch,
  deviceFormCurrentPage,
  setDeviceFormCurrentPage,
  deviceFormTab,
  setDeviceFormTab,
  deviceFormMenuOpen,
  setDeviceFormMenuOpen,
  setDetailForm,
  setPreviewContent,
  setConfirmAction,
  getDeviceDetails
}: DeviceModuleProps) => {
  const currentDevice = devicePath[devicePath.length - 1] || "Thiết bị";
  const [selectedChild, setSelectedChild] = React.useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [showTypeSelector, setShowTypeSelector] = React.useState(false);
  const [deviceFilterStatuses, setDeviceFilterStatuses] = React.useState<string[]>(['Đang vận hành']);
  const [openMenuIdx, setOpenMenuIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleGlobalClick = () => {
      setOpenMenuIdx(null);
    };
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const lastInstance = React.useMemo(() => {
    // Find the last instance name in the path (even indices)
    for (let i = devicePath.length - 1; i >= 0; i--) {
      if (i % 2 === 0 && devicePath[i]) return devicePath[i];
    }
    return "Thiết bị";
  }, [devicePath]);

  const children = React.useMemo(() => {
    // Get ALL child instances of the current path
    return getDeviceInstances(devicePath, "Tất cả");
  }, [devicePath]);

  const deviceTypesList = React.useMemo(() => {
    return getDeviceTypes(devicePath).filter(t => t !== "Tất cả");
  }, [devicePath]);

  const filteredChildren = children.filter(c => {
    const matchesSearch = c.toLowerCase().includes(childSearch.toLowerCase());
    if (selectedTypes.length === 0) return matchesSearch;
    // Map tag selection to rough keyword matching for mock data
    const matchesType = selectedTypes.some(t => {
      if (t === 'Máy biến áp' || t === 'MBA') return c.includes('MBA') || c.includes('Máy biến áp') || c.includes('TBA');
      if (t === 'Máy cắt' || t === 'MC') return c.includes('Máy cắt') || c.includes('MC');
      if (t === 'Dao cách ly' || t === 'DCL') return c.includes('Dao cách ly') || c.includes('DCL');
      if (t === 'Biến dòng' || t === 'TI') return c.includes('Biến dòng') || c.includes('TI');
      if (t === 'Biến điện áp' || t === 'TU') return c.includes('Biến điện áp') || c.includes('TU');
      return c.includes(t);
    });
    return matchesSearch && matchesType;
  });
  
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);
  const startIndex = (deviceFormCurrentPage - 1) * itemsPerPage;
  const paginatedChildren = filteredChildren.slice(startIndex, startIndex + itemsPerPage);

  const effectiveDevice = selectedChild || lastInstance;
  const details = getDeviceDetails(effectiveDevice);
  const [showDeviceFilter, setShowDeviceFilter] = React.useState(false);

  const LIFECYCLE_STEPS = [
    { date: '20/05/2026', type: 'Thí nghiệm', content: 'Thí nghiệm định kỳ đạt yêu cầu', result: 'Đạt' },
    { date: '15/02/2026', type: 'Sửa chữa thường xuyên', content: 'Vệ sinh sứ, siết lại kẹp cực', result: 'Hoàn thành' },
    { date: '10/01/2026', type: 'Hòa lưới', content: 'Hòa lưới sau đại tu', result: 'Thành công' },
    { date: '05/12/2025', type: 'Sửa chữa lớn', content: 'Thay thế bộ truyền động máy cắt', result: 'Hoàn thành' },
    { date: '12/11/2025', type: 'Bảo dưỡng định kỳ', content: 'Bảo dưỡng cơ cấu truyền lực', result: 'Hoàn thành' },
    { date: '08/10/2025', type: 'Sự cố', content: 'Nhảy máy cắt do tác động của bảo vệ so lệch', result: 'Đã xử lý' },
    { date: '01/10/2025', type: 'Kiểm định', content: 'Kiểm định định kỳ thiết bị', result: 'Đạt' },
    { date: '15/09/2025', type: 'Điều động', content: 'Điều động từ Trạm A sang Trạm B', result: 'Hoàn thành' },
    { date: '01/09/2025', type: 'Nhập kho', content: 'Nhập kho thiết bị mới', result: 'Hoàn thành' },
  ];

  React.useEffect(() => {
    setSelectedChild(null);
  }, [devicePath]);

  const handleDoubleClick = (child: string) => {
    let category = "";
    const rawPathLength = devicePath.length;
    
    if (rawPathLength === 1) {
      if (child.includes("TBA") || child.includes("Trạm")) category = "Trạm";
      else if (child.includes("ĐD") || child.includes("Đường dây") || child.includes("kV")) category = "Đường dây";
      else if (child.includes("Kho")) category = "Kho TB mới";
      else if (child.includes("Dự án") || child.includes("Công trình") || child.includes("Dự án xuất tuyến") || child.includes("Lắp đặt")) category = "Công trình";
      else if (child.includes("Nút") || child.includes("Nhanh rẽ") || child.includes("Điểm đấu")) category = "Nút";
      else category = "Trạm";
    } else if (rawPathLength === 3) {
      if (child.includes("Ngăn lộ")) category = "Ngăn lộ";
      else if (child.includes("MBA") || child.includes("Máy biến áp")) category = "Máy biến áp";
      else if (child.includes("Tủ") || child.includes("Hệ thống") || child.includes("Giàn") || child.includes("RTU") || child.includes("ắc quy")) category = "Hệ thống";
      else if (child.includes("Vị trí") || child.includes("Cột")) category = "Vị trí";
      else if (child.includes("Nhánh")) category = "Nhánh rẽ";
      else if (child.includes("Nút") || child.includes("Điểm")) category = "Nút";
      else category = "Thiết bị";
    } else if (rawPathLength === 5) {
      const isBreaker = child.includes("Máy cắt") || child.includes("Dao cách ly") || child.includes("TI") || child.includes("TU") || child.includes("Biến dòng") || child.includes("Biến điện áp") || child.includes("Cuộn dây") || child.includes("Sứ xuyên") || child.includes("Thân cột") || child.includes("Móng");
      const isPart = child.includes("Sứ đứng") || child.includes("Thanh cái") || child.includes("Kẹp cực") || child.includes("Hộp đầu cáp") || child.includes("Bình dầu") || child.includes("quạt làm mát") || child.includes("bộ lọc") || child.includes("Chuỗi sứ") || child.includes("Kẹp ép") || child.includes("Tạ") || child.includes("Tiếp địa");
      const isControl = child.includes("Rơ le") || child.includes("Bộ điều khiển") || child.includes("Tủ điều khiển") || child.includes("RTU") || child.includes("Gateway");
      
      if (isBreaker) category = "Thiết bị chính";
      else if (isPart) category = "Phụ kiện";
      else if (isControl) category = "Hệ thống điều khiển";
      else category = "Thiết bị chính";
    }
    
    if (category) {
      setDevicePath([...devicePath, category, child]);
      setDeviceFormCurrentPage(1);
    }
  };

  return (
    <div className="bg-[#F8FAFC] flex flex-col h-full overflow-hidden">
      {/* Search and Filters Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex flex-col gap-0 shrink-0 shadow-sm relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (devicePath.length > 2) setDevicePath(prev => prev.slice(0, -2));
                else if (devicePath.length > 0) setDevicePath(prev => prev.slice(0, -1));
                else setActiveSubMenu(null);
              }}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-[12pt] font-semibold flex items-center gap-2 leading-[1.5]">
                <span className="text-[#555555]">Thiết bị</span>
                <span className="font-bold text-[#164399] tracking-tight">- Danh sách thiết bị của {lastInstance}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowDeviceFilter(!showDeviceFilter)}
              className={`p-2 rounded-[10px] border transition-all ${showDeviceFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
            >
              <Filter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setDetailForm({ type: 'device', mode: 'add' })}
              className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-[10px] text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
          </div>
        </div>

        {/* Filter Bar Row - Exact Match to Su Co Module Style */}
        {showDeviceFilter && (
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-[10px] animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-4">
               <div className="flex flex-col gap-1">
                  <label className="text-[9pt] font-bold text-gray-400 uppercase">Loại TB</label>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap items-center gap-1 min-h-[36px] bg-white px-2 py-1 rounded-[12px] border border-gray-200 min-w-[220px] max-w-[450px]">
                      {selectedTypes.length === 0 ? (
                        <span className="text-gray-400 font-bold italic text-[10pt] px-2 py-1">Tất cả</span>
                      ) : (
                        selectedTypes.map(t => (
                          <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ECF3FE] text-[#164399] text-[10pt] font-black rounded-lg border border-blue-100 uppercase tracking-tighter">
                            {t}
                            <button onClick={() => setSelectedTypes(prev => prev.filter(x => x !== t))} className="hover:text-red-500 transition-colors ml-1">
                              <X className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                          </span>
                        ))
                      )}
                      <div className="relative">
                        <button 
                          onClick={() => setShowTypeSelector(!showTypeSelector)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg text-[#164399] transition-all"
                          title="Thêm loại thiết bị"
                        >
                          <Plus className="w-5 h-5 stroke-[3]" />
                        </button>
                        {showTypeSelector && (
                          <div className="absolute top-full left-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[100] py-3 animate-in fade-in slide-in-from-top-2 duration-300">
                             <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                               <p className="text-[9pt] font-black text-gray-400 uppercase tracking-widest">Chọn loại thiết bị</p>
                             </div>
                             <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                {deviceTypesList.map(t => (
                                  <button 
                                    key={t}
                                    onClick={() => {
                                      setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-[11pt] font-bold flex items-center justify-between hover:bg-blue-50 transition-colors ${selectedTypes.includes(t) ? 'text-[#164399] bg-blue-50/50' : 'text-gray-600'}`}
                                  >
                                    {t}
                                    {selectedTypes.includes(t) && (
                                      <div className="w-5 h-5 bg-[#164399] rounded-full flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5 text-white stroke-[4]" />
                                      </div>
                                    )}
                                  </button>
                                ))}
                             </div>
                            <div className="px-4 mt-3 pt-3 border-t border-gray-50">
                               <button 
                                 onClick={() => setShowTypeSelector(false)}
                                 className="w-full py-2.5 bg-[#164399] text-white text-[10pt] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                               >
                                 HOÀN TẤT
                               </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
               </div>
               
               <div className="flex flex-col gap-1">
                  <label className="text-[9pt] font-bold text-gray-400 uppercase">Trạng thái</label>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-[20px] border border-gray-200">
                    {['Đang vận hành', 'Sửa chữa', 'Dự phòng'].map(s => (
                      <button 
                        key={s}
                        onClick={() => setDeviceFilterStatuses(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                        className={`px-3 py-1 text-[10pt] rounded-[20px] transition-all whitespace-nowrap ${deviceFilterStatuses.includes(s) ? 'bg-[#ECF3FE] text-[#164399] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
               <label className="text-[9pt] font-bold text-gray-400 uppercase">Tìm kiếm nhanh</label>
               <div className="relative">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="text"
                   placeholder="Tìm thiết bị..."
                   className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full transition-all"
                   value={childSearch}
                   onChange={(e) => setChildSearch(e.target.value)}
                 />
               </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex bg-white overflow-hidden">
          {/* Left Column: Device Cards List */}
          <div className="w-[45%] flex flex-col border-r border-gray-100 overflow-hidden px-6 py-0">
            <div className="flex-1 overflow-y-auto custom-scrollbar pl-1.5 pr-2 space-y-3 pt-6 pb-6">
              {paginatedChildren.map((child, idx) => {
                const type = getDetailedChildType(child);
                const normType = normalizeType(type);
                const isSelected = selectedChild === child;
                const deviceCode = getDeviceCode(child, idx);
                const childCount = Math.floor(Math.random() * 8);
                const status = getDeviceStatus(idx);
                const isLocked = status === 'Khóa';
                
                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedChild(child)}
                    onDoubleClick={() => handleDoubleClick(child)}
                    className={`relative group rounded-xl border overflow-visible transition-all duration-300 cursor-pointer w-full ${
                      isSelected 
                        ? 'bg-blue-50/50 border-blue-200 shadow-md transform scale-[1.01]' 
                        : 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-md hover:scale-[1.01] hover:bg-slate-50/50 shadow-sm'
                    } ${isLocked ? 'opacity-50 grayscale-[0.6]' : 'opacity-100'}`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-l-xl z-20"></div>
                    )}
                    <div className="p-4 flex gap-4">
                      {/* Device Icon/Type Badge */}
                      {(() => {
                        const visual = getDeviceItemVisual(type, isSelected);
                        return (
                          <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${visual.bg}`}>
                            {visual.icon}
                          </div>
                        );
                      })()}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                             <span className={`text-[8.5pt] font-black tracking-wider font-mono px-1.5 py-0.5 rounded ${isLocked ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-red-600'}`}>{deviceCode}</span>
                             <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-all ${isSelected ? 'bg-blue-100 border-blue-200 text-[#164399]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                <span className="text-[7.5pt] font-black uppercase tracking-tighter">
                                  {normType}
                                </span>
                             </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="relative inline-block">
                              <button 
                                onClick={(e) => {
                                   e.stopPropagation();
                                   setOpenMenuIdx(openMenuIdx === idx ? null : idx);
                                }}
                                className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-all active:scale-90"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              {openMenuIdx === idx && (
                                <div 
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] py-2 border-blue-100 animate-in fade-in slide-in-from-top-1 duration-200"
                                >
                                   <button 
                                     onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuIdx(null);
                                        setDetailForm({ type: 'device', mode: 'view', data: child });
                                     }}
                                     className="w-full text-left px-4 py-2 text-[10pt] font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3"
                                   >
                                     <FileText className="w-4 h-4 text-blue-500" /> Xem lý lịch
                                   </button>
                                   <button 
                                     onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuIdx(null);
                                     }}
                                     className="w-full text-left px-4 py-2 text-[10pt] font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3"
                                   >
                                     <Database className="w-4 h-4 text-green-500" /> Mã TSCĐ
                                   </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <h4 className={`text-[11.5pt] font-bold mb-1.5 line-clamp-2 leading-tight transition-colors tracking-tight ${isSelected ? 'text-[#164399]' : 'text-gray-800 group-hover:text-blue-800'}`}>{child}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[7pt] font-black uppercase text-gray-400">{childCount} thiết bị con</span>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <span className={`text-[7pt] font-bold uppercase ${
                            status === 'Sửa chữa' ? 'text-purple-600' :
                            status === 'Dự phòng' ? 'text-amber-600' :
                            status === 'Khóa' ? 'text-gray-400' : 'text-green-600'
                          }`}>{status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                 <span className="text-[9pt] font-black text-gray-400 uppercase">
                    Đang xem {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredChildren.length)} / {filteredChildren.length} thiết bị
                 </span>
                 <div className="flex items-center gap-1">
                    <button 
                      disabled={deviceFormCurrentPage === 1}
                      onClick={() => setDeviceFormCurrentPage(Math.max(1, deviceFormCurrentPage - 1))}
                      className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1 px-1">
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (totalPages > 5 && Math.abs(page - deviceFormCurrentPage) > 1 && page !== 1 && page !== totalPages) {
                          if (page === 2 || page === totalPages - 1) return <span key={page} className="text-gray-300 px-0.5">.</span>;
                          return null;
                        }
                        return (
                          <button 
                            key={page}
                            onClick={() => setDeviceFormCurrentPage(page)}
                            className={`w-7 h-7 rounded-lg text-[9pt] font-bold transition-all ${deviceFormCurrentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    <button 
                      disabled={deviceFormCurrentPage === totalPages}
                      onClick={() => setDeviceFormCurrentPage(Math.min(totalPages, deviceFormCurrentPage + 1))}
                      className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Preview */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 bg-white shrink-0">
            {[
              { id: 'info', label: 'Thông tin chung' },
              { id: 'reports', label: 'Theo dõi thiết bị' },
              { id: 'tracking', label: 'Vòng đời thiết bị' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setDeviceFormTab(tab.id as any)}
                className={`flex-1 h-12 text-[12pt] font-bold transition-all relative ${deviceFormTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                {tab.label}
                {deviceFormTab === tab.id && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {deviceFormTab === 'info' ? (
              <div className="space-y-10 animate-in fade-in duration-500">
                <div className="flex items-start justify-between border-b border-gray-100 pb-6 mb-8 w-full">
                   <div className="flex-1 space-y-4">
                      {/* Row 1: Code and Type side-by-side */}
                      <div className="flex items-center gap-4">
                         <div className="flex flex-col gap-1">
                            <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest ml-1">Mã thiết bị / PMIS</label>
                            <span className="bg-red-50 text-red-600 font-mono font-black text-[11pt] uppercase px-3 py-1.5 rounded shadow-sm border border-red-100 block w-fit">
                               {(() => {
                                  const idxInPage = paginatedChildren.indexOf(effectiveDevice);
                                  const devIndex = idxInPage >= 0 ? idxInPage : 0;
                                  return getDeviceCode(effectiveDevice, devIndex);
                               })()}
                            </span>
                         </div>
                         <span className="text-gray-200 mt-6 h-10 w-[1px] bg-gray-100"></span>
                         <div className="flex flex-col gap-1">
                            <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest ml-1">Loại thiết bị</label>
                            <div className="bg-blue-50 text-[#164399] font-black text-[9.5pt] uppercase px-3 py-1.5 rounded-xl border border-blue-100 flex items-center gap-2 w-fit">
                               {getDeviceItemVisual(getDetailedType(effectiveDevice), true).icon}
                               {normalizeType(getDetailedType(effectiveDevice))}
                            </div>
                         </div>
                      </div>

                      {/* Row 2: Device Name below them */}
                      <div className="pt-2">
                         <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest ml-1">Tên thiết bị</label>
                         <h3 className="text-[16pt] font-bold text-[#164399] leading-tight tracking-tight mt-0.5">{effectiveDevice}</h3>
                      </div>
                   </div>

                   {/* Action Button right-aligned */}
                   <div className="mt-5 shrink-0 ml-4">
                     <button 
                       onClick={() => setDetailForm({ type: 'device', mode: 'view', data: effectiveDevice })}
                       className="px-4 py-2.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2 shadow-sm border border-blue-100"
                     >
                       <ExternalLink className="w-4 h-4" /> Xem
                     </button>
                   </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4 p-7 bg-blue-50/20 rounded-2xl border border-blue-100/30 shadow-inner">
                      <h4 className="text-[11pt] font-black text-[#164399] uppercase tracking-widest flex items-center gap-2">
                        <Settings className="w-4 h-4" /> Đặc tính kỹ thuật
                      </h4>
                      <div className="grid grid-cols-2 gap-x-10 gap-y-1">
                         {details.specs.filter((s:any) => s.label !== 'Mã thiết bị' && s.label !== 'Tên thiết bị' && s.label !== 'Vị trí').map((spec: any, i: number) => (
                           <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 hover:bg-white/40 transition-colors group px-0">
                              <span className="text-[10pt] font-black text-[#475569] uppercase tracking-tight">{spec.label}</span>
                              <span className="text-[11pt] font-black text-[#164399] tracking-tight">{spec.value}</span>
                           </div>
                         ))}
                      </div>
                    </div>

                    <div className="space-y-8 pt-8 border-t border-gray-100">
                      <div className="space-y-4">
                        <h4 className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Camera className="w-4 h-4" /> Hình ảnh thiết bị
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                           {details.images.slice(0, 4).map((img: string, idx: number) => (
                              <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 group cursor-pointer shadow-sm">
                                 <img src={img} alt="TB" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onClick={() => setPreviewContent({ type: 'image', url: img, name: effectiveDevice })} />
                                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Maximize2 className="w-5 h-5 text-white" />
                                 </div>
                              </div>
                           ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between">
                           <h4 className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                             <FileText className="w-4 h-4" /> Tài liệu đính kèm
                           </h4>
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: 'Sổ lý lịch thiết bị.pdf', size: '2.4 MB' },
                            { name: 'Biên bản nghiệm thu bàn giao.pdf', size: '1.2 MB' },
                            { name: 'Kết quả thí nghiệm 2026.pdf', size: '0.8 MB' }
                          ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50/50 border border-gray-100 rounded-xl hover:border-blue-200 transition-all cursor-pointer group shadow-sm" onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name })}>
                               <div className="flex items-center gap-3 min-w-0">
                                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                                     <FileText className="w-4 h-4" />
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-[10pt] font-bold text-[#164399] group-hover:text-blue-600 transition-colors truncate">{doc.name}</span>
                                    <span className="text-[8pt] text-gray-400 font-bold uppercase">{doc.size}</span>
                                  </div>
                               </div>
                               <Download className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            ) : deviceFormTab === 'reports' ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                {(() => {
                  const trackingData = details.tracking.filter((s:any) => s.id !== 'lich-su');
                  return trackingData.map((section: any, i: number) => {
                    const typeStyles: Record<string, { color: string, bg: string, icon: any }> = {
                      'su-co': { color: 'text-red-700', bg: 'bg-red-50/30', icon: <Flame className="w-5 h-5 text-red-600" /> },
                      'thi-nghiem': { color: 'text-pink-700', bg: 'bg-pink-50/30', icon: <FlaskConical className="w-5 h-5 text-pink-600" /> },
                      'thong-so': { color: 'text-sky-700', bg: 'bg-sky-50/30', icon: <Activity className="w-5 h-5 text-sky-600" /> },
                      'cong-viec': { color: 'text-green-700', bg: 'bg-green-50/30', icon: <ClipboardList className="w-5 h-5 text-green-600" /> },
                      'sua-chua': { color: 'text-purple-700', bg: 'bg-purple-50/30', icon: <Wrench className="w-5 h-5 text-purple-600" /> },
                      'default': { color: 'text-[#164399]', bg: 'bg-gray-50/30', icon: <Activity className="w-5 h-5 text-[#164399]" /> }
                    };

                    const style = typeStyles[section.id as string] || typeStyles.default;

                    return (
                      <div key={i} className={`rounded-2xl border border-gray-100 overflow-hidden shadow-sm ${style.bg}`}>
                         <div className="px-6 py-3.5 flex items-center justify-between border-b border-gray-100/50">
                            <div className="flex items-center gap-3">
                               <span>{style.icon}</span>
                               <h4 className={`text-[12pt] font-black uppercase tracking-tight ${style.color}`}>{section.title} ({section.items.length})</h4>
                            </div>
                            <button className="text-[10pt] font-bold text-blue-600 hover:underline">Xem tất cả</button>
                         </div>
                         <div className="bg-white">
                            <div className="divide-y divide-gray-50">
                               {section.items.map((item: any, idx: number) => (
                                 <div 
                                    key={idx} 
                                    className="px-6 py-4 flex items-center gap-4 transition-all cursor-pointer group hover:bg-gray-50/50"
                                    onClick={() => {
                                      if (section.id === 'su-co') {
                                        setActiveSubMenu('Danh sách sự cố');
                                      } else if (section.id === 'cong-viec') {
                                        setDetailForm({ type: 'job', mode: 'view', data: item });
                                      }
                                    }}
                                 >
                                    {(() => {
                                      const parts = item.date.split('/');
                                      const d = parts[0] || '11';
                                      const m = parts[1] || '06';
                                      const y = parts[2] || '2026';
                                      return (
                                        <div className="w-12 h-12 rounded-xl border border-gray-200 overflow-hidden flex flex-col items-center bg-white shrink-0 shadow-sm">
                                          <div className="w-full bg-[#164399] text-[6.5pt] font-black uppercase text-white py-0.5 text-center leading-none tracking-wider">
                                            T.{m}
                                          </div>
                                          <div className="flex-1 flex flex-col items-center justify-center bg-white leading-none">
                                            <span className="text-[11pt] font-black text-slate-800 font-mono">{d}</span>
                                            <span className="text-[5.5pt] text-gray-400 font-black tracking-tighter mt-0.5">{y}</span>
                                          </div>
                                        </div>
                                      );
                                    })()}
                                    <div className="w-[1px] h-6 bg-gray-100 shrink-0"></div>
                                    <span className="flex-1 text-[12pt] font-medium text-gray-700 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">{item.content}</span>
                                    <div className={`px-2.5 py-1 rounded-lg text-[8pt] font-bold uppercase tracking-tighter shrink-0 ${
                                       item.status === 'Đã hoàn thành' || item.status === 'Hoàn thành' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-[#164399]'
                                    }`}>
                                       {item.status}
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                    );
                  });
                })() }
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                 <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <h5 className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <Activity className="w-4 h-4 text-blue-500" /> Vòng đời thiết bị 
                    </h5>
                    <button className="text-[9pt] font-bold text-blue-600 hover:underline">Xem tất cả</button>
                 </div>
                 <div className="relative pl-8 border-l-2 border-slate-100 space-y-6 ml-4 pt-2">
                    {LIFECYCLE_STEPS.map((item, j) => {
                      const colors: Record<string, { bg: string, border: string, text: string, dot: string }> = {
                        'Sự cố': { bg: 'bg-red-500/10', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
                        'Thí nghiệm': { bg: 'bg-blue-500/10', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-600' },
                        'Sửa chữa lớn': { bg: 'bg-purple-500/10', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-500' },
                        'Hòa lưới': { bg: 'bg-green-500/10', border: 'border-green-200', text: 'text-green-700', dot: 'bg-green-600' },
                        'default': { bg: 'bg-slate-500/10', border: 'border-slate-200', text: 'text-slate-700', dot: 'bg-slate-500' }
                      };
                      const c = colors[item.type] || colors.default;

                      return (
                        <div key={j} className="relative group text-left">
                          {/* Timeline circular dot on the vertical line */}
                          <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-blue-500 transition-all z-10 shadow-sm">
                            <div className={`w-2 h-2 rounded-full ${c.dot} group-hover:scale-125 transition-transform`}></div>
                          </div>

                          {/* Content Card */}
                          <div className="p-4 bg-white rounded-xl border border-gray-150 hover:shadow-sm hover:border-blue-200 transition-all relative">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`px-2 py-0.5 rounded text-[7.5pt] font-black uppercase tracking-wider border ${c.bg} ${c.border} ${c.text}`}>
                                    {item.type}
                                  </span>
                                  <span className="text-[9pt] text-gray-400 font-bold font-mono">{item.date}</span>
                                </div>
                                <p className="text-[11.5pt] text-slate-800 font-extrabold leading-snug tracking-tight">
                                  {item.content}
                                </p>
                                {item.result && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className="text-[8.5pt] font-bold text-gray-400 uppercase tracking-tighter">Kết quả:</span>
                                    <span className="text-[9pt] font-bold text-green-600 uppercase tracking-tight">{item.result}</span>
                                  </div>
                                )}
                              </div>
                              <div className="pt-1.5 shrink-0">
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
