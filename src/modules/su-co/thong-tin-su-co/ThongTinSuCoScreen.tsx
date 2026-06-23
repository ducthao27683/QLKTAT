import React from 'react';
import { 
  ArrowLeft, Search, Plus, Filter, Calendar, Clock, FileText, Camera, Upload, Download, 
  Trash2, Maximize2, Share2, MessageSquare, History, Archive, CheckCircle2, PlayCircle,
  AlertTriangle, ExternalLink, Eye, ChevronRight, ChevronLeft
} from 'lucide-react';
import { DesignTooltip } from '../../../components/DesignTooltip';
import { EvnLogo } from '../../../components/EvnLogo';
import { MOCK_INCIDENTS } from '../constants';
import CSKH_ICON from '../../../assets/CSKH.png';

interface IncidentModuleProps {
  setActiveSubMenu: (menu: string | null) => void;
  devicePath: string[];
  incidentViewMode: 'latest' | 'range';
  setIncidentViewMode: (mode: 'latest' | 'range') => void;
  incidentPeriod: string;
  setIncidentPeriod: (period: string) => void;
  incidentFromDate: string;
  setIncidentFromDate: (date: string) => void;
  incidentToDate: string;
  setIncidentToDate: (date: string) => void;
  showIncidentFilter: boolean;
  setShowIncidentFilter: (show: boolean) => void;
  incidentFilterType: string[];
  setIncidentFilterType: React.Dispatch<React.SetStateAction<string[]>>;
  incidentFilterVoltage: string[];
  setIncidentFilterVoltage: React.Dispatch<React.SetStateAction<string[]>>;
  incidentFilterStatus: string[];
  setIncidentFilterStatus: React.Dispatch<React.SetStateAction<string[]>>;
  incidentSearch: string;
  setIncidentSearch: (search: string) => void;
  selectedIncidentId: number | null;
  setSelectedIncidentId: (id: number | null) => void;
  incidentDetailTab: 'detail' | 'reduction' | 'tracking';
  setIncidentDetailTab: (tab: 'detail' | 'reduction' | 'tracking') => void;
  setDetailForm: (form: any) => void;
  setPreviewContent: (content: any) => void;
  setConfirmAction: (action: any) => void;
  selectedBranch: string;
}

export const IncidentModule = ({
  setActiveSubMenu,
  devicePath,
  incidentViewMode,
  setIncidentViewMode,
  incidentPeriod,
  setIncidentPeriod,
  incidentFromDate,
  setIncidentFromDate,
  incidentToDate,
  setIncidentToDate,
  showIncidentFilter,
  setShowIncidentFilter,
  incidentFilterType,
  setIncidentFilterType,
  incidentFilterVoltage,
  setIncidentFilterVoltage,
  incidentFilterStatus,
  setIncidentFilterStatus,
  incidentSearch,
  setIncidentSearch,
  selectedIncidentId,
  setSelectedIncidentId,
  incidentDetailTab,
  setIncidentDetailTab,
  setDetailForm,
  setPreviewContent,
  setConfirmAction,
  selectedBranch
}: IncidentModuleProps) => {
  const lastInstance = React.useMemo(() => {
    // Find the last instance name in the path (even indices)
    for (let i = devicePath.length - 1; i >= 0; i--) {
      if (i % 2 === 0 && devicePath[i]) return devicePath[i];
    }
    return "Đơn vị";
  }, [devicePath]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const filteredIncidents = React.useMemo(() => {
    let res = MOCK_INCIDENTS;
    if (incidentSearch) {
      res = res.filter(i => 
        i.device.toLowerCase().includes(incidentSearch.toLowerCase()) ||
        i.description.toLowerCase().includes(incidentSearch.toLowerCase()) ||
        i.cause.toLowerCase().includes(incidentSearch.toLowerCase())
      );
    }
    return res;
  }, [incidentSearch]);

  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIncidents = React.useMemo(() => {
    return filteredIncidents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredIncidents, startIndex]);

  const inc = filteredIncidents.find(i => i.id === selectedIncidentId) || filteredIncidents[0];

  React.useEffect(() => {
    setCurrentPage(1);
  }, [incidentSearch, devicePath]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between mb-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveSubMenu(null)}
              className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-[12pt] font-semibold flex items-center gap-2 leading-[1.5]">
                <span className="text-[#555555]">Sự cố</span>
                <span className="font-bold text-[#164399] tracking-tight">- Danh sách sự cố của {lastInstance}</span>
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            <button 
              onClick={() => setShowIncidentFilter(!showIncidentFilter)}
              className={`p-2 rounded-[10px] border transition-all ${showIncidentFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
            >
              <Filter className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setDetailForm({ type: 'incident', mode: 'add' })}
              className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-[10px] text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        {showIncidentFilter && (
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-[10px] animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-4">
               <div className="flex flex-col gap-1">
                  <label className="text-[9pt] font-bold text-gray-400 uppercase">Loại TB</label>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-[20px] border border-gray-200">
                    {['TBA', 'Dz', 'CN'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setIncidentFilterType(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                        className={`px-3 py-1 text-[10pt] rounded-[20px] transition-all whitespace-nowrap ${incidentFilterType.includes(t) ? 'bg-[#ECF3FE] text-[#164399] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
               </div>
               
               <div className="flex flex-col gap-1">
                  <label className="text-[9pt] font-bold text-gray-400 uppercase">Trạng thái</label>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-[20px] border border-gray-200">
                    {['Mới', 'Đang xử lý', 'Đang tồn tại', 'Xử lý xong'].map(s => (
                      <button 
                        key={s}
                        onClick={() => setIncidentFilterStatus(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                        className={`px-3 py-1 text-[10pt] rounded-[20px] transition-all whitespace-nowrap ${incidentFilterStatus.includes(s) ? 'bg-[#ECF3FE] text-[#164399] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
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
                   placeholder="Tìm tên thiết bị, diễn biến, mã sự cố..."
                   className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full transition-all"
                   value={incidentSearch}
                   onChange={(e) => setIncidentSearch(e.target.value)}
                 />
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Incident List */}
        <div className="w-1/2 flex flex-col border-r border-slate-100 bg-[#f8fafc] overflow-hidden px-3.5 py-0">
          <div className="flex-1 overflow-y-auto custom-scrollbar pl-1 pr-1.5 space-y-3 pt-4 pb-4">
            {paginatedIncidents.map((item) => {
              const isSelected = selectedIncidentId === item.id;
              const dateParts = item.time.split(' ');
              const [year, month, day] = dateParts[0].split('-');
              const time = dateParts[1];

              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedIncidentId(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                    isSelected 
                      ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                      : 'bg-white border-gray-100 hover:border-blue-100/60 shadow-sm'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#164399]"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                       <span className="text-[9pt] font-black tracking-wider font-mono text-red-600 px-2 py-0.5 rounded border border-red-100 bg-red-50">SC-00{item.id}</span>
                       <span className="text-[10pt] font-black text-blue-600">• {day}/{month}/{year} {time}</span>
                    </div>
                    {(() => {
                      if (item.status === 'Xử lý xong') {
                        return (
                          <span className="text-gray-700 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[7.5pt] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {item.status}
                          </span>
                        );
                      } else if (item.status === 'Đang xử lý') {
                        return (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[7.5pt] font-black uppercase tracking-wider bg-amber-50 text-gray-700 border border-amber-200/60 shadow-xs animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            {item.status}
                          </span>
                        );
                      } else {
                        return (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[7.5pt] font-black uppercase tracking-wider bg-rose-50 text-gray-700 border border-rose-200/60 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Mới tạo
                          </span>
                        );
                      }
                    })()}
                  </div>
                  
                  <h3 className={`text-[11pt] font-black mb-2 line-clamp-1 leading-tight transition-colors transition-colors uppercase tracking-tight ${
                    isSelected ? 'text-[#164399]' : 'text-[#164399] group-hover:text-blue-800'
                  }`}>
                    {item.device}
                  </h3>
                  
                  <p className="text-[10pt] text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-[10pt]">
                     <div className="flex items-center gap-1 text-gray-400 px-0 py-0 rounded-none border-none">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-black">Nguyên nhân:</span> 
                        <span className="text-purple-600 font-normal">{item.cause}</span>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Custom Pagination Panel styled exactly like the Device list paging */}
          {totalPages > 1 && (
            <div className="py-4 border-t border-gray-200 flex items-center justify-between container-paging shrink-0 bg-white px-6">
              <span className="text-[8.5pt] font-black text-gray-700 uppercase tracking-wider">
                Xem {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredIncidents.length)} / {filteredIncidents.length} sự cố
              </span>
              <div className="flex items-center gap-1">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="p-1.5 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-gray-500 border-none bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 px-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button 
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-7 h-7 rounded-full text-[9pt] font-bold transition-all cursor-pointer border-none ${currentPage === page ? 'bg-blue-100 text-[#164399]' : 'text-gray-500 hover:bg-gray-100'}`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className="p-1.5 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-gray-500 border-none bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Incident Details */}
        <div className="w-1/2 flex flex-col bg-white overflow-hidden">
          {!inc ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">Chọn một sự cố để xem chi tiết</div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-gray-100 bg-white shrink-0">
                {[
                  { id: 'detail', label: 'Chi tiết' },
                  { id: 'reduction', label: 'Giảm trừ' },
                  { id: 'tracking', label: 'Theo dõi' }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setIncidentDetailTab(tab.id as any)}
                    className={`flex-1 h-12 text-[12pt] font-bold transition-all relative ${incidentDetailTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                  >
                    {tab.label}
                    {incidentDetailTab === tab.id && (
                      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {incidentDetailTab === 'detail' && (
                  <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-500">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-2">
                       <div className="space-y-1">
                          <p className="text-[10pt] font-black text-gray-700 uppercase tracking-widest font-mono">SC-00{inc.id}</p>
                          <h3 className="text-[14pt] font-bold text-gray-700 leading-tight uppercase tracking-tight">{inc.device}</h3>
                          <div className="flex items-center gap-2 pt-1">
                             <Calendar className="w-3.5 h-3.5 text-gray-400" />
                             <span className="text-[10pt] font-bold text-gray-500 uppercase">{inc.time}</span>
                             <span className="w-1 h-1 rounded-full bg-gray-300 mx-1"></span>
                             <span className={`text-[10pt] font-black uppercase ${
                                inc.status === 'Xử lý xong' ? 'text-green-600' : 'text-red-600'
                             }`}>{inc.status}</span>
                          </div>
                       </div>
                       <button 
                         onClick={() => setDetailForm({ type: 'incident', mode: 'view', data: inc })}
                         className="px-4 py-2 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors flex items-center gap-2 shadow-sm border border-blue-100"
                       >
                         <Eye className="w-4 h-4" /> Xem
                       </button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[12pt] font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" />
                        Mô tả sự cố
                      </h4>
                      
  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
      <div>
        <p className="text-[10pt] text-gray-500 mb-1">Khởi tạo</p>
        <p className="text-[11pt] font-bold text-slate-700">Nguyễn Văn A - 10/06/2026</p>
      </div>
      <div>
        <p className="text-[10pt] text-gray-500 mb-1">Cập nhật mới nhất</p>
        <p className="text-[11pt] font-bold text-slate-700">Trần Thị B - 12/06/2026</p>
      </div>
    </div>
                        <div>
                          <DesignTooltip id="lbl_dien_bien">
                            <p className="text-[12pt] text-gray-700 mb-1 font-black uppercase tracking-tight">Diễn biến chi tiết</p>
                          </DesignTooltip>
                          <p className="text-[12pt] text-gray-700 leading-relaxed font-normal">{inc.description}</p>
                        </div>
                        <div className="pt-4 border-t border-gray-100 bg-transparent p-0 rounded-none">
                          <DesignTooltip id="lbl_nguyen_nhan">
                            <p className="text-[12pt] text-gray-700 mb-1 font-black uppercase tracking-tight">Nguyên nhân xác định</p>
                          </DesignTooltip>
                          <p className="text-[12pt] text-purple-700 leading-relaxed font-normal">"{inc.cause}"</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[12pt] font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                          <Camera className="w-3.5 h-3.5" />
                          Hình ảnh hiện trường
                        </h4>
                      </div>
                        {inc.images.length > 0 ? (
                          <div className="grid grid-cols-2 gap-3">
                            {(() => {
                              const displayImages = [...inc.images];
                              if (displayImages.length % 2 !== 0) {
                                displayImages.push(""); // Placeholder
                              }
                              return displayImages.map((img, idx) => (
                                img === "" ? (
                                  <div key={`placeholder-${idx}`} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-200 flex items-center justify-center">
                                    <div className="scale-75 opacity-40">
                                      <EvnLogo />
                                    </div>
                                  </div>
                                ) : (
                                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 group cursor-pointer">
                                    <img src={img} alt="Incident" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" onClick={() => setPreviewContent({ type: 'image', url: img, name: 'Hình ảnh hiện trường' })} />
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                                        <Download className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                                      <Maximize2 className="w-6 h-6 text-white" />
                                    </div>
                                  </div>
                                )
                              ));
                            })()}
                          </div>
                        ) : (
                          <div className="h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-[12pt]">
                            Chưa có hình ảnh
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-[12pt] font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                            <Share2 className="w-3.5 h-3.5" />
                            Tài liệu đính kèm
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {inc.attachments.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group" onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name })}>
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12pt] font-bold text-gray-700 group-hover:text-blue-600 transition-colors truncate">{doc.name}</p>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase">Nguyễn Văn A | 08/04/2026 | {doc.size}</p>
                                </div>
                              </div>
                              {null}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                {incidentDetailTab === 'reduction' && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                      <div className="flex items-center justify-between">
                        <DesignTooltip id="title_thong_tin_giam_tru">
                          <h4 className="text-[12pt] font-bold text-gray-700 uppercase tracking-widest">Thông tin giảm trừ sự cố</h4>
                        </DesignTooltip>
                        {(() => {
                          if (inc.reduction.status === 'Đã duyệt') {
                            return (
                              <span className="text-gray-700 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8.5pt] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                {inc.reduction.status}
                              </span>
                            );
                          } else if (inc.reduction.status === 'Chờ duyệt') {
                            return (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8.5pt] font-black uppercase tracking-wider bg-amber-50 text-gray-700 border border-amber-200/60 shadow-xs animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                {inc.reduction.status}
                              </span>
                            );
                          } else {
                            return (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8.5pt] font-black uppercase tracking-wider bg-gray-50 text-gray-700 border border-gray-200/60 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                {inc.reduction.status}
                              </span>
                            );
                          }
                        })()}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <DesignTooltip id="lbl_ly_do_giam_tru">
                            <label className="text-[12pt] text-[#555555] block mb-1.5 font-bold">Lý do giảm trừ</label>
                          </DesignTooltip>
                          <DesignTooltip id="select_ly_do_giam_tru">
                            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                              <option>Do nguyên nhân bất khả kháng</option>
                              <option>Do lỗi của bên thứ 3</option>
                              <option>Do động vật vi phạm khoảng cách</option>
                              <option>Khác</option>
                            </select>
                          </DesignTooltip>
                        </div>

                        <div>
                          <DesignTooltip id="lbl_ghi_chu_giam_tru">
                            <label className="text-[12pt] text-[#555555] block mb-1.5 font-bold">Ghi chú</label>
                          </DesignTooltip>
                          <textarea 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[80px]"
                            placeholder="Nhập ghi chú giảm trừ..."
                            defaultValue={inc.reduction.content}
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-start items-center gap-6 w-full">
                          <DesignTooltip id="btn_dang_ky_giam_tru">
                            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md cursor-pointer whitespace-nowrap flex items-center justify-center gap-2">Đăng ký</button>
                          </DesignTooltip>
                          <span className="text-[10pt] text-gray-400 font-medium italic whitespace-nowrap">Đăng ký mới nhất: 08/04/2026 15:30</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <DesignTooltip id="title_tai_lieu_dinh_kem">
                          <h4 className="text-[12pt] font-bold text-gray-700 uppercase tracking-widest whitespace-nowrap">Tài liệu đính kèm</h4>
                        </DesignTooltip>
                        <div className="flex gap-2">
                          <DesignTooltip id="btn_thu_vien_tai_lieu">
                            <button onClick={(e) => { e.stopPropagation(); document.getElementById('giam-tru-upload') && document.getElementById('giam-tru-upload').click(); }} className="px-3 py-1.5 flex items-center gap-2 rounded-lg text-[9pt] font-black uppercase text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm cursor-pointer"><Archive className="w-4 h-4 text-gray-400" /> Từ Thư viện</button>
                          </DesignTooltip>
                          <DesignTooltip id="btn_tai_len_tai_lieu">
                            <button onClick={(e) => { e.stopPropagation(); document.getElementById('giam-tru-upload') && document.getElementById('giam-tru-upload').click(); }} className="px-3 py-1.5 flex items-center gap-2 rounded-lg text-[9pt] font-black uppercase text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors bg-blue-50/50 shadow-sm cursor-pointer"><Upload className="w-4 h-4 text-blue-500" /> Tải lên</button>
                          </DesignTooltip>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {inc.attachments.map((doc, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group" onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name })}>
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[12pt] font-bold text-gray-700 group-hover:text-blue-600 transition-colors truncate">{doc.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{i === 0 ? 'Đức Thảo' : i === 1 ? 'Lê Minh' : 'Phan Anh'} | 08/04/2026 | {doc.size}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              {null}
                              <DesignTooltip id={`btn_xoa_tai_lieu_dinh_kem_${i}`}>
                                <button 
                                  className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
                                  title="Xóa"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirmAction({
                                      title: 'Xác nhận xóa tài liệu',
                                      message: 'Chỉ có User đã tải lên mới có quyền thực hiện việc này.\nBạn có chắc chắn muốn Xóa chứ?',
                                      onConfirm: () => console.log('Deleted reduction doc', i)
                                    });
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </DesignTooltip>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                      <DesignTooltip id="title_trao_doi_thao_luan">
                        <h4 className="text-[12pt] font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                          Trao đổi & Thảo luận
                        </h4>
                      </DesignTooltip>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <span className="text-blue-700 font-bold text-[12pt]">NV</span>
                          </div>
                          <div className="flex-1 bg-gray-50 p-3 rounded-xl rounded-tl-none border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[12pt] font-bold text-gray-700">Nguyễn Văn A</span>
                              <span className="text-[10pt] text-gray-400">08/04/2026 10:30</span>
                            </div>
                            <p className="text-[12pt] text-gray-600">Đã bổ sung biên bản xác nhận của bên thứ 3.</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                            <span className="text-orange-700 font-bold text-[12pt]">QL</span>
                          </div>
                          <div className="flex-1 bg-gray-50 p-3 rounded-xl rounded-tl-none border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[12pt] font-bold text-gray-700">Trần Quản Lý</span>
                              <span className="text-[10pt] text-gray-400">08/04/2026 14:15</span>
                            </div>
                            <p className="text-[12pt] text-gray-600">Biên bản hợp lệ, đã duyệt giảm trừ.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border-2 border-white shadow-sm overflow-hidden">
                          <img src={CSKH_ICON} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                          <textarea 
                            placeholder="Nhập ý kiến trao đổi..." 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px]"
                          ></textarea>
                          <div className="flex justify-end">
                            <DesignTooltip id="btn_gui_trao_doi">
                              <button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                                Gửi
                              </button>
                            </DesignTooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {incidentDetailTab === 'tracking' && (
                  <div className="space-y-6">
                    <h4 className="text-[12pt] font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                      <History className="w-3.5 h-3.5" />
                      DIỄN BIẾN SỰ CỐ
                    </h4>
                    <div className="relative pl-8 border-l-2 border-slate-100 space-y-6 ml-4 pt-2">
                      {inc.tracking.length > 0 ? inc.tracking.map((t, i) => {
                        const typeVal = (t as any).type || (i === 0 ? 'Khắc phục' : 'Sự cố');
                        const dotColor = typeVal === 'Khắc phục' ? 'bg-green-500' : 'bg-red-500';
                        const badgeStyle = typeVal === 'Khắc phục' 
                          ? 'bg-green-50 px-2 py-0.5 rounded text-[7.5pt] font-black uppercase tracking-wider border border-green-200 text-green-700'
                          : 'bg-red-50 px-2 py-0.5 rounded text-[7.5pt] font-black uppercase tracking-wider border border-red-200 text-red-700';
                        return (
                          <div key={i} className="relative group text-left">
                            {/* Timeline circular dot on the vertical line */}
                            <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-blue-500 transition-all z-10 shadow-sm">
                              <div className={`w-2 h-2 rounded-full ${dotColor} group-hover:scale-125 transition-transform`}></div>
                            </div>

                            {/* Content Card */}
                            <div className="p-4 bg-white rounded-2xl border border-gray-200 hover:shadow-sm hover:border-blue-200 transition-all relative">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0 space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className={badgeStyle}>
                                      {typeVal}
                                    </span>
                                    <span className="text-[9pt] text-gray-400 font-bold font-mono">{t.date}</span>
                                  </div>
                                  <p className="text-[11.5pt] text-slate-800 font-extrabold leading-snug tracking-tight">
                                    {t.content}
                                  </p>
                                </div>
                                <div className="pt-1.5 shrink-0">
                                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }) : (
                        <div className="text-center py-12 text-gray-400">
                          <Clock className="w-8 h-8 mx-auto mb-2 opacity-20" />
                          <p className="text-[12pt]">Chưa có diễn biến theo dõi</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
