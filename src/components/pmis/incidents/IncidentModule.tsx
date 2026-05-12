import React from 'react';
import { 
  ArrowLeft, Search, Plus, Filter, Calendar, Clock, FileText, Camera, Upload, Download, 
  Trash2, Maximize2, Share2, MessageSquare, History, Archive, CheckCircle2, PlayCircle
} from 'lucide-react';
import { DesignTooltip } from '../../DesignTooltip';
import { EvnLogo } from '../../EvnLogo';
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
  const inc = MOCK_INCIDENTS.find(i => i.id === selectedIncidentId);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between mb-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveSubMenu(null)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-[12pt] font-semibold flex items-center gap-2">
              <span className="text-[#555555]">Thông tin sự cố</span>
              <span className="font-bold" style={{ color: '#164399' }}>
                {devicePath.length > 0 ? ` - ${devicePath[devicePath.length - 1]}` : ''}
              </span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            {/* View Mode Selector */}
            <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
              <button 
                onClick={() => setIncidentViewMode('latest')}
                className={`px-4 py-1.5 text-[10pt] font-bold rounded-full transition-all whitespace-nowrap ${incidentViewMode === 'latest' ? 'bg-[#164399] text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
              >
                Mới nhất
              </button>
              <button 
                onClick={() => setIncidentViewMode('range')}
                className={`px-4 py-1.5 text-[10pt] font-bold rounded-full transition-all whitespace-nowrap ${incidentViewMode === 'range' ? 'bg-[#164399] text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
              >
                Khoảng ngày
              </button>
            </div>

            {/* Period/Date Selectors */}
            {incidentViewMode === 'latest' ? (
              <DesignTooltip id="select_incident_period">
                <select 
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none font-normal text-gray-700"
                  value={incidentPeriod}
                  onChange={(e) => setIncidentPeriod(e.target.value)}
                >
                  {['1 Tuần', '1 Tháng', '1 Quý', '6 Tháng', '1 Năm'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </DesignTooltip>
            ) : (
              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-[10pt] font-bold text-gray-700 focus:outline-none"
                  value={incidentFromDate}
                  onChange={(e) => setIncidentFromDate(e.target.value)}
                />
                <span className="text-gray-400 text-[10pt]">to</span>
                <input 
                  type="date" 
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-[10pt] font-bold text-gray-700 focus:outline-none"
                  value={incidentToDate}
                  onChange={(e) => setIncidentToDate(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center gap-4">
              <DesignTooltip id="btn_filter">
                <button 
                  onClick={() => setShowIncidentFilter(!showIncidentFilter)}
                  className={`p-2 rounded-lg border transition-all ${showIncidentFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </DesignTooltip>

              <DesignTooltip id="btn_them">
                <button 
                  onClick={() => setDetailForm({ type: 'incident', mode: 'add' })}
                  className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-lg text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Thêm
                </button>
              </DesignTooltip>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        {showIncidentFilter && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-[10px] animate-in slide-in-from-top-2 duration-200 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <DesignTooltip id="lbl_filter_loai_tb">
                <span className="text-[10pt] text-[#555555] font-bold">Loại TB:</span>
              </DesignTooltip>
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200">
                {['TBA', 'Dz', 'CN'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setIncidentFilterType(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                    className={`px-3 py-1 text-[10pt] rounded-md transition-all whitespace-nowrap ${incidentFilterType.includes(t) ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-500 hover:border-gray-300 border border-transparent'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DesignTooltip id="lbl_filter_cap_da">
                <span className="text-[10pt] text-[#555555] font-bold">Cấp Đ/A:</span>
              </DesignTooltip>
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200">
                {(selectedBranch.includes('Truyền tải') ? ['500kV', '220kV'] : ['220kV', '110kV', '35kV', '22kV']).map(v => (
                  <button 
                    key={v}
                    onClick={() => setIncidentFilterVoltage(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])}
                    className={`px-3 py-1 text-[10pt] rounded-md transition-all whitespace-nowrap ${incidentFilterVoltage.includes(v) ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-500 hover:border-gray-300 border border-transparent'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DesignTooltip id="lbl_filter_trang_thai">
                <span className="text-[10pt] text-[#555555] font-bold">Trạng thái:</span>
              </DesignTooltip>
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200">
                {['Mới', 'Đang xử lý', 'Đang tồn tại', 'Xử lý xong'].map(s => (
                  <button 
                    key={s}
                    onClick={() => setIncidentFilterStatus(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                    className={`px-3 py-1 text-[10pt] rounded-md transition-all whitespace-nowrap ${incidentFilterStatus.includes(s) ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-500 hover:border-gray-300 border border-transparent'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex-1 min-w-[150px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Tìm kiếm sự cố..."
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full transition-all"
                value={incidentSearch}
                onChange={(e) => setIncidentSearch(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Incident List */}
        <div className="w-1/2 flex flex-col border-r border-gray-100 bg-white overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white text-[#555555] text-[12pt] font-bold sticky top-0 z-10">
                <tr className="border-b border-gray-200 h-12">
                  <th className="px-4 font-bold w-16 bg-white border-b border-gray-200 text-center">
                    <DesignTooltip id="th_thoi_diem">Sự cố</DesignTooltip>
                  </th>
                  <th className="px-4 font-bold bg-white border-b border-gray-200">
                    <DesignTooltip id="th_dien_bien_nguyen_nhan">Diễn biến & Nguyên nhân</DesignTooltip>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_INCIDENTS.map((item) => {
                  const isSelected = selectedIncidentId === item.id;
                  const dateParts = item.time.split(' ');
                  const [year, month, day] = dateParts[0].split('-');
                  const time = dateParts[1];

                  return (
                    <tr 
                      key={item.id}
                      onClick={() => setSelectedIncidentId(item.id)}
                      onDoubleClick={() => setDetailForm({ type: 'incident', mode: 'view', data: item })}
                      className={`group cursor-pointer transition-all ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-4 py-4 vertical-top border-b border-gray-50">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-[10pt] font-bold whitespace-nowrap">{`${day}/${month}/${year}`}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            <Clock className="w-3.5 h-3.5 text-orange-500" />
                            <span className="text-[10pt] font-mono font-bold">{time}</span>
                          </div>
                          <div className="mt-1">
                            <span className={`px-3 py-1 rounded-full text-[10pt] font-bold uppercase whitespace-nowrap ${
                              item.status === 'Xử lý xong' ? 'bg-green-100 text-green-700' :
                              item.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-700' :
                              item.status === 'Mới' ? 'bg-purple-100 text-purple-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-2">
                          <h3 className="text-[12pt] font-bold text-[#164399] group-hover:text-blue-700 transition-colors">
                            {item.device}
                          </h3>
                          <div className="space-y-1">
                            <p className="text-[12pt] text-[#555555] line-clamp-2 leading-relaxed">
                              <span className="font-bold text-[#555555] mr-1">DB:</span>
                              {item.description}
                            </p>
                            <p className="text-[12pt] text-purple-600 line-clamp-2 leading-relaxed">
                              <span className="font-bold text-[#555555] mr-1">NN:</span>
                              {item.cause}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Incident Details */}
        <div className="flex-1 flex flex-col bg-gray-50/30 overflow-hidden">
          {!inc ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">Chọn một sự cố để xem chi tiết</div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-white shrink-0">
                {[
                  { id: 'detail', label: 'Chi tiết' },
                  { id: 'reduction', label: 'Giảm trừ' },
                  { id: 'tracking', label: 'Theo dõi' }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setIncidentDetailTab(tab.id as any)}
                    className={`flex-1 h-12 text-[12pt] font-bold transition-all border-b-2 ${incidentDetailTab === tab.id ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {incidentDetailTab === 'detail' && (
                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" />
                        Mô tả sự cố
                      </h4>
                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
                        <div>
                          <DesignTooltip id="lbl_dien_bien">
                            <p className="text-[12pt] text-[#555555] mb-1 font-bold">Diễn biến chi tiết</p>
                          </DesignTooltip>
                          <p className="text-[12pt] text-gray-700 leading-relaxed">{inc.description}</p>
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                          <DesignTooltip id="lbl_nguyen_nhan">
                            <p className="text-[12pt] text-[#555555] mb-1 font-bold">Nguyên nhân xác định</p>
                          </DesignTooltip>
                          <p className="text-[12pt] text-purple-600 leading-relaxed">{inc.cause}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Camera className="w-3.5 h-3.5" />
                            Hình ảnh hiện trường
                          </h4>
                          <div className="flex gap-2">
                            <DesignTooltip id="btn_upload_img_inc">
                              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Tải ảnh lên">
                                <Upload className="w-4 h-4" />
                              </button>
                            </DesignTooltip>
                            <DesignTooltip id="btn_camera_img_inc">
                              <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Mở Camera">
                                <Camera className="w-4 h-4" />
                              </button>
                            </DesignTooltip>
                          </div>
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
                                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group cursor-pointer">
                                    <img src={img} alt="Incident" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" onClick={() => setPreviewContent({ type: 'image', url: img, name: 'Hình ảnh hiện trường' })} />
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-blue-600 hover:bg-white shadow-sm transition-all" title="Tải về">
                                        <Download className="w-3.5 h-3.5" />
                                      </button>
                                      <button 
                                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-red-600 hover:bg-white shadow-sm transition-all" 
                                        title="Xóa"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setConfirmAction({
                                            title: 'Xác nhận xóa ảnh',
                                            message: 'Chỉ có User đã tải lên mới có quyền thực hiện việc này.\nBạn có chắc chắn muốn Xóa chứ?',
                                            onConfirm: () => console.log('Deleted image', idx)
                                          });
                                        }}
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
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
                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                            <Share2 className="w-3.5 h-3.5" />
                            Tài liệu đính kèm
                          </h4>
                          <DesignTooltip id="btn_upload_doc_inc">
                            <button className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap">
                              <Upload className="w-3.5 h-3.5" />
                              Tải lên
                            </button>
                          </DesignTooltip>
                        </div>
                        <div className="space-y-2">
                          {inc.attachments.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group" onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name })}>
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12pt] font-bold text-gray-700 group-hover:text-blue-600 transition-colors truncate">{doc.name}</p>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase">{doc.size} • 08/04/2026</p>
                                </div>
                              </div>
                              <div className="flex gap-1 shrink-0">
                                <DesignTooltip id={`btn_tai_ve_tai_lieu_inc_${i}`}>
                                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Tải về">
                                    <Download className="w-4 h-4" />
                                  </button>
                                </DesignTooltip>
                                <DesignTooltip id={`btn_xoa_tai_lieu_inc_${i}`}>
                                  <button 
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
                                    title="Xóa"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setConfirmAction({
                                        title: 'Xác nhận xóa tài liệu',
                                        message: 'Chỉ có User đã tải lên mới có quyền thực hiện việc này.\nBạn có chắc chắn muốn Xóa chứ?',
                                        onConfirm: () => console.log('Deleted doc', i)
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
                    </div>
                  </div>
                )}

                {incidentDetailTab === 'reduction' && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                      <div className="flex items-center justify-between">
                        <DesignTooltip id="title_thong_tin_giam_tru">
                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest">Thông tin giảm trừ sự cố</h4>
                        </DesignTooltip>
                        <span className={`px-3 py-1 rounded-full text-[10pt] font-bold uppercase whitespace-nowrap ${
                          inc.reduction.status === 'Đã duyệt' ? 'bg-green-100 text-green-700' :
                          inc.reduction.status === 'Chờ duyệt' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {inc.reduction.status}
                        </span>
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
                            <button 
                              className={`px-8 py-1.5 text-[12pt] font-bold rounded-lg transition-all whitespace-nowrap ${inc.reduction.status === 'Đã duyệt' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-blue-600 bg-blue-50 hover:bg-blue-100 active:scale-95'}`}
                              disabled={inc.reduction.status === 'Đã duyệt'}
                            >
                              Đăng ký
                            </button>
                          </DesignTooltip>
                          <span className="text-[10pt] text-gray-400 font-medium italic whitespace-nowrap">Đăng ký mới nhất: 08/04/2026 15:30</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <DesignTooltip id="title_tai_lieu_dinh_kem">
                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Tài liệu đính kèm</h4>
                        </DesignTooltip>
                        <div className="flex gap-2">
                          <DesignTooltip id="btn_thu_vien_tai_lieu">
                            <button className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors whitespace-nowrap">
                              <Archive className="w-3.5 h-3.5" />
                              Thư viện
                            </button>
                          </DesignTooltip>
                          <DesignTooltip id="btn_tai_len_tai_lieu">
                            <button className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap">
                              <Upload className="w-3.5 h-3.5" />
                              Tải lên
                            </button>
                          </DesignTooltip>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {inc.attachments.map((doc, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group" onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name })}>
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[12pt] font-bold text-gray-700 group-hover:text-blue-600 transition-colors truncate">{doc.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{doc.size} • 08/04/2026</p>
                              </div>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <DesignTooltip id={`btn_tai_ve_tai_lieu_dinh_kem_${i}`}>
                                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Tải về">
                                  <Download className="w-4 h-4" />
                                </button>
                              </DesignTooltip>
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

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                      <DesignTooltip id="title_trao_doi_thao_luan">
                        <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                          Trao đổi & Thảo luận
                        </h4>
                      </DesignTooltip>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <span className="text-blue-700 font-bold text-[12pt]">NV</span>
                          </div>
                          <div className="flex-1 bg-gray-50 p-3 rounded-lg rounded-tl-none border border-gray-100">
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
                          <div className="flex-1 bg-gray-50 p-3 rounded-lg rounded-tl-none border border-gray-100">
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
                              <button className="px-8 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap">
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
                  <div className="space-y-4">
                    <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <History className="w-3.5 h-3.5" />
                      Diễn biến sau sự cố
                    </h4>
                    <div className="relative pl-4 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                      {inc.tracking.length > 0 ? inc.tracking.map((t, i) => (
                        <div key={i} className="relative pl-8">
                          <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-white border-2 border-blue-500 z-10"></div>
                          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-[10pt] font-bold text-blue-600 mb-1">{t.date}</p>
                            <p className="text-[12pt] text-gray-700">{t.content}</p>
                          </div>
                        </div>
                      )) : (
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
