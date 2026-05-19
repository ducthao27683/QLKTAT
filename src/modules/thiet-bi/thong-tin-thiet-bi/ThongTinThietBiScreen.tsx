import React from 'react';
import { 
  ArrowLeft, Search, Plus, ListChecks, MoreVertical, Edit, Move, Copy, Shield, Trash2, 
  FileText, Database, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Settings, 
  ExternalLink, Box, Camera, Upload, Download, Maximize2, Activity, Filter, X, Check, Flame, Layout,
  ClipboardList, FlaskConical, Wrench, GitCommit, Zap
} from 'lucide-react';
import { DesignTooltip } from '../../../components/DesignTooltip';
import { EvnLogo } from '../../../components/EvnLogo';
import { getDetailedType, formatNumber } from '../../../shared/utils';
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
  getDeviceTreeChildren: (path: string[]) => string[];
  getDeviceDetails: (name: string) => any;
}

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
  getDeviceTreeChildren,
  getDeviceDetails
}: DeviceModuleProps) => {
  const currentDevice = devicePath[devicePath.length - 1] || "Thiết bị";
  const [selectedChild, setSelectedChild] = React.useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [showTypeSelector, setShowTypeSelector] = React.useState(false);
  const [deviceFilterStatuses, setDeviceFilterStatuses] = React.useState<string[]>(['Đang vận hành']);

  const children = React.useMemo(() => {
    if (devicePath.length === 1) {
      // Khi ở cấp Công ty, hiện thẳng danh sách các đơn vị/thiết bị chi tiết
      // Giả lập bằng cách lấy con của các danh mục chính
      const categories = ["Trạm 110", "Đường dây 110", "Lưới điện trung gian"];
      let allDetailedUnits: string[] = [];
      categories.forEach(cat => {
        const units = getDeviceTreeChildren([...devicePath, cat]);
        allDetailedUnits = [...allDetailedUnits, ...units];
      });
      return allDetailedUnits;
    }
    return getDeviceTreeChildren(devicePath);
  }, [devicePath, getDeviceTreeChildren]);

  const deviceTypesList = ['Máy biến áp', 'Máy cắt', 'Dao cách ly', 'Biến dòng', 'Biến điện áp', 'Trạm', 'Đường dây'];

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

  const effectiveDevice = selectedChild || currentDevice;
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
    if (paginatedChildren.length > 0 && !selectedChild) {
      setSelectedChild(paginatedChildren[0]);
    }
  }, [paginatedChildren, selectedChild]);

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
                <span className="font-bold text-[#164399]">- Danh sách {currentDevice}</span>
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
          <div className="w-[45%] flex flex-col border-r border-gray-100 overflow-hidden p-6">
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
              {paginatedChildren.map((child, idx) => {
                const type = getDetailedType(child);
                const isSelected = selectedChild === child;
                const deviceCode = `TB-${1000 + idx + (deviceFormCurrentPage - 1) * itemsPerPage}`;
                const childCount = Math.floor(Math.random() * 8);
                
                // Specific Icons for Device Types
                const getDeviceIcon = () => {
                  const iconColor = isSelected ? 'text-blue-600' : 'text-gray-400';
                  if (type.includes('Trạm')) return <Zap className={`w-6 h-6 ${iconColor}`} />;
                  if (type.includes('Đường dây')) return <Activity className={`w-6 h-6 ${iconColor}`} />;
                  if (type.includes('Kho')) return <Box className={`w-6 h-6 ${iconColor}`} />;
                  if (type.includes('Nút')) return <GitCommit className={`w-6 h-6 ${iconColor}`} />;
                  if (type.includes('MBA')) return <Settings className={`w-6 h-6 ${iconColor}`} />;
                  if (type.includes('Ngăn lộ')) return <ListChecks className={`w-6 h-6 ${iconColor}`} />;
                  if (type.includes('Hệ thống')) return <Layout className={`w-6 h-6 ${iconColor}`} />;
                  return <Box className={`w-6 h-6 ${iconColor}`} />;
                };
                
                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedChild(child)}
                    className={`relative group bg-white rounded-xl border transition-all duration-300 cursor-pointer ${isSelected ? 'bg-blue-100/30 border-blue-300 shadow-sm' : 'bg-white border-gray-100 hover:border-blue-100/60 shadow-sm'}`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-l-xl"></div>
                    )}
                    <div className="p-4 flex gap-4">
                      {/* Device Icon/Type Badge */}
                      <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border ${isSelected ? 'bg-white border-blue-200' : 'bg-gray-50 border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100'}`}>
                        {getDeviceIcon()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9pt] font-black text-red-600 uppercase tracking-wider font-mono">{deviceCode}</span>
                          <div className="flex items-center gap-1">
                            <div className="relative group/menu inline-block">
                              <button 
                                onClick={(e) => {
                                   e.stopPropagation();
                                }}
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg text-gray-400 hover:text-blue-600 transition-all active:scale-90 shadow-sm border border-transparent hover:border-gray-100"
                              >
                                <MoreVertical className="w-5 h-5" />
                              </button>
                              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] py-2 hidden group-hover/menu:block border-blue-100 animate-in fade-in slide-in-from-top-1 duration-200">
                                 <button className="w-full text-left px-4 py-2 text-[10pt] font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3">
                                   <FileText className="w-4 h-4 text-blue-500" /> Xem lý lịch
                                 </button>
                                 <button className="w-full text-left px-4 py-2 text-[10pt] font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3">
                                   <Database className="w-4 h-4 text-green-500" /> Mã TSCĐ
                                 </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h4 className={`text-[11pt] font-black mb-2 line-clamp-1 leading-tight transition-colors uppercase tracking-tight ${isSelected ? 'text-[#164399]' : 'text-[#164399] group-hover:text-blue-800'}`}>{child}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[8.5pt] font-bold text-gray-400 uppercase">{type}</span>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <span className="text-[8.5pt] font-black text-red-600 uppercase">{childCount} thiết bị con</span>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <span className="text-[8.5pt] font-bold text-green-600 uppercase">Đang vận hành</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setDevicePath(prev => [...prev, child]);
                      }}
                      className="absolute bottom-4 right-4 p-2 bg-blue-50 text-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-100 active:scale-95"
                      title="Vào cấp con"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                 <span className="text-[9pt] font-bold text-gray-400 uppercase">Trang {deviceFormCurrentPage} / {totalPages}</span>
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

          <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            {deviceFormTab === 'info' ? (
              <div className="space-y-10 animate-in fade-in duration-500">
                <div className="flex items-start justify-between border-b border-gray-100 pb-6 mb-8">
                   <div className="space-y-1">
                      <p className="text-[10pt] font-black text-red-600 uppercase tracking-widest font-mono">TB-PCHY-{1000 + paginatedChildren.indexOf(effectiveDevice) + startIndex}</p>
                      <h3 className="text-[14pt] font-bold text-[#164399] leading-tight uppercase tracking-tight">{effectiveDevice}</h3>
                   </div>
                   <button 
                     onClick={() => setDetailForm({ type: 'device', mode: 'view', data: effectiveDevice })}
                     className="px-4 py-2 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2 shadow-sm border border-blue-100"
                   >
                     <ExternalLink className="w-4 h-4" /> Xem
                   </button>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-[11pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Settings className="w-3.5 h-3.5" /> Đặc tính kỹ thuật
                      </h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-0">
                         {details.specs.filter((s:any) => s.label !== 'Mã thiết bị' && s.label !== 'Tên thiết bị' && s.label !== 'Vị trí').map((spec: any, i: number) => (
                           <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 hover:bg-gray-50/50 transition-colors group px-0">
                              <span className="text-[10pt] font-bold text-gray-400 uppercase tracking-tight">{spec.label}</span>
                              <span className="text-[11pt] font-black text-gray-800">{spec.value}</span>
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
                      'su-co': { color: 'text-red-600', bg: 'bg-red-50/50', icon: <Flame className="w-5 h-5 text-red-600" /> },
                      'thi-nghiem': { color: 'text-pink-600', bg: 'bg-pink-50/50', icon: <FlaskConical className="w-5 h-5 text-pink-600" /> },
                      'thong-so': { color: 'text-blue-600', bg: 'bg-blue-50/50', icon: <Activity className="w-5 h-5 text-blue-600" /> },
                      'cong-viec': { color: 'text-green-600', bg: 'bg-green-50/50', icon: <ClipboardList className="w-5 h-5 text-green-600" /> },
                      'sua-chua': { color: 'text-purple-600', bg: 'bg-purple-50/50', icon: <Wrench className="w-5 h-5 text-purple-600" /> },
                      'default': { color: 'text-[#164399]', bg: 'bg-gray-50/50', icon: <Activity className="w-5 h-5 text-[#164399]" /> }
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
                                    <span className="w-24 shrink-0 text-[10pt] font-bold text-blue-600 font-mono tracking-tight">{item.date}</span>
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
                 <div className="space-y-4">
                    {LIFECYCLE_STEPS.map((item, j) => (
                      <div key={j} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm hover:border-blue-200 transition-all group relative overflow-hidden">
                         <div className="w-14 h-14 rounded-xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100 group-hover:bg-blue-50 transition-all shrink-0">
                            <span className="text-[12pt] font-bold text-gray-700 leading-none">{item.date.split('/')[1]}</span>
                            <span className="text-[7pt] text-gray-400 font-bold uppercase leading-none mt-1">Tháng</span>
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                               <span className={`px-2 py-0.5 rounded text-[8pt] font-bold uppercase ${
                                 item.type === 'Sự cố' ? 'bg-red-50 text-red-600' : 
                                 item.type === 'Thí nghiệm' ? 'bg-blue-50 text-blue-600' :
                                 item.type === 'Sửa chữa lớn' ? 'bg-purple-50 text-purple-600' :
                                 item.type === 'Hòa lưới' ? 'bg-green-50 text-green-600' :
                                 'bg-blue-50 text-blue-500'
                               }`}>{item.type}</span>
                               <span className="text-[9pt] text-gray-400 font-medium">{item.date}</span>
                            </div>
                            <p className="text-[11pt] text-gray-800 font-semibold leading-snug">{item.content}</p>
                            <div className="flex items-center gap-2 mt-1">
                               <span className="text-[9pt] font-bold text-gray-400 uppercase tracking-tighter">Kết quả:</span>
                               <span className="text-[9pt] font-bold text-green-600 uppercase">{item.result}</span>
                            </div>
                         </div>
                         <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
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
