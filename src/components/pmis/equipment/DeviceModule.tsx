import React from 'react';
import { 
  ArrowLeft, Search, Plus, ListChecks, MoreVertical, Edit, Move, Copy, Shield, Trash2, 
  FileText, Database, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Settings, 
  ExternalLink, Box, Camera, Upload, Download, Maximize2
} from 'lucide-react';
import { DesignTooltip } from '../../DesignTooltip';
import { EvnLogo } from '../../EvnLogo';
import { getDetailedType, formatNumber } from '../utils';
import { DEVICE_TYPE_COLORS } from '../constants';

interface DeviceModuleProps {
  devicePath: string[];
  setDevicePath: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveSubMenu: (menu: string | null) => void;
  childSearch: string;
  setChildSearch: (search: string) => void;
  deviceFormCurrentPage: number;
  setDeviceFormCurrentPage: (page: number) => void;
  deviceFormTab: 'info' | 'tracking';
  setDeviceFormTab: (tab: 'info' | 'tracking') => void;
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
  const children = getDeviceTreeChildren(devicePath);
  const filteredChildren = children.filter(c => c.toLowerCase().includes(childSearch.toLowerCase()));
  
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);
  const startIndex = (deviceFormCurrentPage - 1) * itemsPerPage;
  const paginatedChildren = filteredChildren.slice(startIndex, startIndex + itemsPerPage);

  const currentDevice = devicePath[devicePath.length - 1] || "Thiết bị";
  const details = getDeviceDetails(currentDevice);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
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
        
        <div className="flex-1 flex overflow-hidden bg-white border-t border-gray-200">
          {/* Left Column: Child Devices List */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white border-r border-gray-100">
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
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
                    Hiển thị {startIndex + 1} - {Math.min(deviceFormCurrentPage * itemsPerPage, filteredChildren.length)} / {filteredChildren.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      disabled={deviceFormCurrentPage === 1}
                      onClick={() => setDeviceFormCurrentPage(deviceFormCurrentPage - 1)}
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
                      onClick={() => setDeviceFormCurrentPage(deviceFormCurrentPage + 1)}
                      className="p-1.5 rounded hover:bg-white border border-transparent hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Info & Tracking */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="flex border-b border-gray-200 bg-white shrink-0 sticky top-0 z-30">
              <button 
                className={`flex-1 h-12 text-[12pt] font-bold transition-all border-b-2 ${deviceFormTab === 'info' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setDeviceFormTab('info')}
              >
                Thông tin chung
              </button>
              <button 
                className={`flex-1 h-12 text-[12pt] font-bold transition-all border-b-2 ${deviceFormTab === 'tracking' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setDeviceFormTab('tracking')}
              >
                Theo dõi thiết bị
              </button>
            </div>

            <div className="flex-1 overflow-hidden relative">
              {deviceFormTab === 'info' ? (
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-6">
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Settings className="w-3.5 h-3.5" />
                            Thông tin chi tiết
                          </h4>
                          <button 
                            onClick={() => setDetailForm({ type: 'device', mode: 'view', data: currentDevice })}
                            className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Xem chi tiết
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {details.info.slice(0, 2).map((item: any, i: number) => (
                            <div key={i} className="flex items-start gap-4 group p-3 bg-white rounded-xl border border-blue-100 hover:border-blue-300 transition-all">
                              <div className="mt-0.5 p-1.5 bg-blue-50 rounded-md border border-blue-100 group-hover:border-blue-200 transition-colors shrink-0">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <DesignTooltip id={`lbl_dev_info_${i}`}>
                                  <p className="text-[12pt] font-bold text-[#555555] mb-0.5">{item.label}</p>
                                </DesignTooltip>
                                <div className="flex items-center gap-2">
                                  <p className={`text-[12pt] font-normal ${item.valueColor || 'text-[#555555]'}`}>{item.value}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                          {details.info.slice(2).map((item: any, i: number) => (
                            <div key={i} className="flex items-start gap-3 group p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                              <div className="mt-0.5 p-1.5 bg-white rounded-md border border-gray-100 group-hover:border-blue-200 transition-colors shrink-0">
                                {item.icon || <Box className="w-4 h-4 text-gray-400" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <DesignTooltip id={`lbl_dev_info_col2_${i}`}>
                                  <p className="text-[12pt] font-bold text-[#555555] mb-0.5 truncate">{item.label}</p>
                                </DesignTooltip>
                                {item.badge ? (
                                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10pt] font-bold uppercase ${item.badge}`}>
                                    {item.value}
                                  </span>
                                ) : (
                                  <p className="text-[12pt] font-normal text-[#555555] truncate">{item.value}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <Camera className="w-3.5 h-3.5" />
                              Hình ảnh thiết bị
                            </h4>
                            <div className="flex gap-2">
                              <DesignTooltip id="btn_upload_img_tb">
                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Tải ảnh lên">
                                  <Upload className="w-4 h-4" />
                                </button>
                              </DesignTooltip>
                              <DesignTooltip id="btn_camera_img_tb">
                                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Mở Camera">
                                  <Camera className="w-4 h-4" />
                                </button>
                              </DesignTooltip>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {(() => {
                              const images = [...details.images];
                              const displayImages = [...images];
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
                                    <img src={img} alt="Device" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" onClick={() => setPreviewContent({ type: 'image', url: img, name: 'Hình ảnh thiết bị' })} />
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
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                              <FileText className="w-3.5 h-3.5" />
                              Tài liệu đính kèm
                            </h4>
                            <div className="flex-1"></div>
                            <DesignTooltip id="btn_upload_doc_tb">
                              <button className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap">
                                <Upload className="w-3.5 h-3.5" />
                                Tải lên
                              </button>
                            </DesignTooltip>
                          </div>
                          <div className="space-y-2">
                            {[
                              { name: 'Lý lý thiết bị.pdf', size: '2.4 MB', date: '12/05/2024' },
                              { name: 'Biên bản thí nghiệm.docx', size: '1.1 MB', date: '20/05/2024' },
                              { name: 'Ảnh hiện trạng.zip', size: '15.8 MB', date: '25/05/2024' },
                            ].map((doc, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group" onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name })}>
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm shrink-0">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[12pt] font-bold text-gray-700 group-hover:text-blue-600 transition-colors truncate">{doc.name}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{doc.size} • {doc.date}</p>
                                  </div>
                                </div>
                                <div className="flex gap-1 shrink-0">
                                  <DesignTooltip id={`btn_tai_ve_tai_lieu_tb_${i}`}>
                                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Tải về">
                                      <Download className="w-4 h-4" />
                                    </button>
                                  </DesignTooltip>
                                  <DesignTooltip id={`btn_xoa_tai_lieu_tb_${i}`}>
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
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-6">
                  <div className="space-y-4 pb-6">
                    {details.tracking.map((section: any, i: number) => {
                      const colorMap: Record<string, string> = {
                        red: 'bg-red-50 border-red-100 text-red-600',
                        green: 'bg-green-50 border-green-100 text-green-600',
                        purple: 'bg-purple-50 border-purple-100 text-purple-600',
                        pink: 'bg-pink-50 border-pink-100 text-pink-600',
                        blue: 'bg-blue-50 border-blue-100 text-blue-600',
                        gray: 'bg-gray-50 border-gray-200 text-gray-700',
                      };
                      return (
                        <div key={i} className="space-y-3">
                          <h5 className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            {section.icon}
                            {section.title}
                          </h5>
                          <div className="space-y-2">
                            {section.items.map((item: any, j: number) => (
                              <div key={j} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-all group">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex flex-col items-center justify-center border border-gray-100 group-hover:border-blue-100">
                                    <span className="text-[7pt] text-gray-400 font-bold uppercase leading-none mb-0.5">Tháng</span>
                                    <span className="text-[12pt] font-bold text-gray-700 leading-none">{item.date.split('/')[1]}</span>
                                  </div>
                                  <div>
                                    <p className="text-[12pt] font-bold text-gray-700">{item.content}</p>
                                    <p className="text-[10pt] text-gray-400">{item.date}</p>
                                  </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[8pt] font-bold uppercase tracking-wider ${colorMap[item.status === 'Hoàn thành' ? 'green' : item.status === 'Đang xử lý' ? 'blue' : 'gray'] || colorMap.gray}`}>
                                  {item.status}
                                </span>
                              </div>
                            ))}
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
