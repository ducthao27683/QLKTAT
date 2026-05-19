import React from 'react';
import { X, Check, Share2, Plus, Database, Box, Trash2, Search, ClipboardList, Info, FileText, Download, Target, ChevronRight, ChevronDown, Activity, Zap, User } from 'lucide-react';
import { FileUploader } from '../../../components/FileUploader';

interface TestingDialogsProps {
  showApprovalPopup: boolean;
  setShowApprovalPopup: (show: boolean) => void;
  showDeviceSelection: boolean;
  setShowDeviceSelection: (show: boolean) => void;
  showRecordCreation: boolean;
  setShowRecordCreation: (show: boolean) => void;
  showDeviceParams: any;
  setShowDeviceParams: (val: any) => void;
  detailForm: any;
  setDetailForm: (form: any) => void;
  devicePath: string[];
  selectedPlanDevices: any[];
  setSelectedPlanDevices: (devices: any[]) => void;
  deviceSearchQuery: string;
  setDeviceSearchQuery: (query: string) => void;
  deviceTypeFilter: string;
  setDeviceTypeFilter: (filter: string) => void;
  config: any;
}

export const TestingDialogs = ({
  showApprovalPopup,
  setShowApprovalPopup,
  showDeviceSelection,
  setShowDeviceSelection,
  showRecordCreation,
  setShowRecordCreation,
  showDeviceParams,
  setShowDeviceParams,
  detailForm,
  setDetailForm,
  devicePath,
  selectedPlanDevices,
  setSelectedPlanDevices,
  deviceSearchQuery,
  setDeviceSearchQuery,
  deviceTypeFilter,
  setDeviceTypeFilter,
  config
}: TestingDialogsProps) => {
  return (
    <>
      {/* Approval Popup */}
      {showApprovalPopup && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowApprovalPopup(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-blue-50/30">
              <h3 className="text-[13pt] font-black text-[#164399] uppercase tracking-widest leading-none">Phê duyệt kế hoạch</h3>
              <button onClick={() => setShowApprovalPopup(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Ý kiến phê duyệt</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-blue-500 font-bold"
                  rows={3}
                  placeholder="Nhập ý kiến hoặc lý do từ chối..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    setDetailForm({ ...detailForm, data: { ...detailForm.data, status: 'Từ chối' } });
                    setShowApprovalPopup(false);
                  }}
                  className="py-3 rounded-xl border border-red-200 text-red-600 font-black text-[11pt] hover:bg-red-50 transition-all"
                >
                  TỪ CHỐI
                </button>
                <button 
                  onClick={() => {
                    setDetailForm({ ...detailForm, data: { ...detailForm.data, status: 'Đã duyệt' } });
                    setShowApprovalPopup(false);
                  }}
                  className="py-3 rounded-xl bg-green-600 text-white font-black text-[11pt] shadow-lg shadow-green-100 hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase"
                >
                  PHÊ DUYỆT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Device Selection Popup */}
      {showDeviceSelection && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeviceSelection(false)}></div>
          <div className="relative w-full max-w-6xl h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-blue-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#164399] text-white rounded-xl">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14pt] font-black text-gray-800">Chọn thiết bị</h3>
                  <p className="text-[10pt] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">
                    Nhánh: {devicePath?.join(' / ') || ""}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowDeviceSelection(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="flex-1 flex overflow-hidden min-h-0">
              {/* Left Column: Device Tree (Available) */}
              <div className="w-[60%] flex flex-col border-r border-gray-100">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-col gap-3">
                  <div className="flex gap-3">
                     <div className="flex-1 relative">
                       <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                         type="text" 
                         placeholder="Tìm tên hoặc mã thiết bị..." 
                         className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[20px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[10pt] outline-none transition-all font-bold"
                         onChange={(e) => setDeviceSearchQuery(e.target.value)}
                       />
                     </div>
                    <div className="flex bg-white border border-gray-200 rounded-[50px] p-1 shadow-sm shrink-0">
                      <button 
                        onClick={() => setDeviceTypeFilter('')}
                        className={`px-4 py-1 rounded-[50px] text-[10pt] font-black transition-all ${deviceTypeFilter === '' ? 'bg-[#164399] text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                      >
                        Tất cả
                      </button>
                      <button 
                        onClick={() => setDeviceTypeFilter('Đến kỳ TN')}
                        className={`px-4 py-1 rounded-[50px] text-[10pt] font-black transition-all ${deviceTypeFilter === 'Đến kỳ TN' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                      >
                        Đến kỳ TN
                      </button>
                    </div>
                     <select 
                       className="px-3 py-2 bg-white border border-gray-200 rounded-[20px] text-[10pt] font-bold outline-none"
                       onChange={(e) => {
                         if (e.target.value !== 'FILTER_CYCLE') setDeviceTypeFilter(e.target.value);
                       }}
                     >
                       <option value="">Loại thiết bị</option>
                       <option>Máy cắt</option>
                       <option>Dao cách ly</option>
                       <option>Biến dòng</option>
                       <option>Biến điện áp</option>
                       <option>Chống sét van</option>
                       <option>Máy biến áp</option>
                     </select>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                     <span className="text-[9pt] font-black text-gray-400 uppercase tracking-tighter shrink-0">Lọc vị trí:</span>
                     <div className="relative">
                       <select className="pl-3 pr-8 py-1.5 bg-blue-50 text-[#164399] border border-blue-200 rounded-[20px] text-[10pt] font-black transition-all appearance-none outline-none cursor-pointer focus:ring-1 focus:ring-blue-500">
                         <option>{devicePath.join(' / ')} [Tất cả]</option>
                         <option>{devicePath[devicePath.length - 1]} / Ngăn lộ 171</option>
                         <option>{devicePath[devicePath.length - 1]} / Ngăn lộ 172</option>
                         <option>{devicePath[devicePath.length - 1]} / Ngăn lộ 112</option>
                       </select>
                       <ChevronDown className="w-4 h-4 text-[#164399] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                     </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: '1', name: 'Máy cắt 171', type: 'Máy cắt', path: 'Ngăn lộ 110kV 171', nextDue: '2026-05-20' },
                      { id: '2', name: 'Biến dòng 171-A', type: 'Biến dòng', path: 'Ngăn lộ 110kV 171', nextDue: '2026-06-15' },
                      { id: '3', name: 'Biến dòng 171-B', type: 'Biến dòng', path: 'Ngăn lộ 110kV 171', nextDue: '2026-06-15' },
                      { id: '4', name: 'Biến dòng 171-C', type: 'Biến dòng', path: 'Ngăn lộ 110kV 171', nextDue: '2026-06-15' },
                      { id: '5', name: 'Biến điện áp 171', type: 'Biến điện áp', path: 'Ngăn lộ 110kV 171', nextDue: '2026-05-10' },
                      { id: '6', name: 'Dao cách ly 171-1', type: 'Dao cách ly', path: 'Ngăn lộ 110kV 171', nextDue: '2026-07-22' },
                      { id: '7', name: 'Chống sét van 171', type: 'Chống sét van', path: 'Ngăn lộ 110kV 171', nextDue: '2026-04-12' },
                      { id: '8', name: 'Máy cắt 172', type: 'Máy cắt', path: 'Ngăn lộ 110kV 172', nextDue: '2026-08-05' },
                    ].filter(d => 
                       !selectedPlanDevices.find(sd => sd.id === d.id) &&
                       (deviceSearchQuery === '' || d.name.toLowerCase().includes(deviceSearchQuery.toLowerCase())) &&
                       (deviceTypeFilter === '' || deviceTypeFilter === 'Đến kỳ TN' || d.type === deviceTypeFilter) &&
                       (deviceTypeFilter !== 'Đến kỳ TN' || new Date(d.nextDue) <= new Date('2026-06-30'))
                    ).map(dev => (
                      <div 
                        key={dev.id} 
                        onClick={() => setSelectedPlanDevices([...selectedPlanDevices, dev])}
                        className="p-3 rounded-xl border border-gray-50 hover:border-[#164399] hover:bg-blue-50/30 transition-all cursor-pointer group flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded border-2 border-gray-200 flex items-center justify-center group-hover:border-[#164399]">
                            <Plus className="w-3 h-3 text-[#164399] opacity-0 group-hover:opacity-100" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[11pt] font-black text-gray-700 group-hover:text-[#164399]">{dev.name}</p>
                            <p className="text-[9pt] font-bold text-gray-400 uppercase tracking-tighter">{dev.type} • {dev.path}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[8pt] font-black text-gray-400 uppercase leading-none">Hạn TN kế tiếp</p>
                           <p className={`text-[10pt] font-black ${new Date(dev.nextDue) < new Date() ? 'text-red-500' : 'text-blue-600'}`}>{dev.nextDue.split('-').reverse().join('/')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Selected Devices */}
              <div className="w-[40%] flex flex-col bg-gray-50/50">
                <div className="px-6 py-4 bg-[#164399]/5 border-b border-gray-100 flex items-center justify-between shrink-0">
                   <h4 className="text-[11pt] font-black text-[#164399] uppercase tracking-widest">Đã chọn ({selectedPlanDevices.length})</h4>
                   <button onClick={() => setSelectedPlanDevices([])} className="text-[10pt] font-bold text-red-500 hover:underline">Xóa tất cả</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                   <div className="space-y-3">
                      {selectedPlanDevices.map(dev => (
                        <div key={dev.id} className="p-3 bg-white rounded-xl border border-blue-100 shadow-sm flex items-center justify-between group animate-in slide-in-from-right-2">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#164399] flex items-center justify-center">
                                 <Box className="w-4 h-4" />
                              </div>
                              <div>
                                 <p className="text-[11pt] font-black text-gray-700">{dev.name}</p>
                                 <p className="text-[9pt] font-bold text-gray-400 uppercase leading-none">{dev.type}</p>
                              </div>
                           </div>
                           <button 
                             onClick={() => setSelectedPlanDevices(selectedPlanDevices.filter(d => d.id !== dev.id))}
                             className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      ))}
                      {selectedPlanDevices.length === 0 && (
                         <div className="p-10 text-center text-gray-300 italic flex flex-col items-center justify-center h-full opacity-50">
                            <Plus className="w-8 h-8 mb-2" />
                            Chọn thiết bị từ cột trái
                         </div>
                      )}
                   </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
              <span className="text-[11pt] text-gray-500 font-bold">Tổng số thiết bị được chọn: <span className="text-[#164399] font-black">{selectedPlanDevices.length}</span></span>
              <div className="flex gap-3">
                <button onClick={() => setShowDeviceSelection(false)} className="px-6 py-2.5 text-[12pt] font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">Hủy</button>
                <button 
                  onClick={() => {
                    const newDevices = selectedPlanDevices.map(d => ({
                      id: d.id, name: d.name, type: d.type, status: 'Chưa thực hiện', params: [] 
                    }));
                    setDetailForm({
                      ...detailForm,
                      data: { ...detailForm.data, devices: [...(detailForm.data?.devices || []), ...newDevices] }
                    });
                    setShowDeviceSelection(false);
                    setSelectedPlanDevices([]);
                  }} 
                  className="px-8 py-2.5 bg-[#164399] text-white rounded-xl font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record Creation Popup */}
      {showRecordCreation && (
        <div className="fixed inset-0 z-[305] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowRecordCreation(false)}></div>
          <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
            <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-pink-50/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-600 text-white rounded-2xl shadow-lg shadow-pink-200">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[16pt] font-black text-gray-800">Lập biên bản thí nghiệm mới</h3>
                  <p className="text-[10pt] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Kế hoạch: {detailForm.data?.title}</p>
                </div>
              </div>
              <button onClick={() => setShowRecordCreation(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
                <X className="w-8 h-8 text-gray-300 group-hover:text-pink-600 transition-colors" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-1 space-y-6">
                  <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                    <h4 className="text-[11pt] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">Thông tin cơ bản</h4>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9pt] font-bold text-gray-500 uppercase">Thiết bị thí nghiệm</label>
                        <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[11pt] font-bold text-gray-700 outline-none">
                           {detailForm.data?.devices?.map((dev: any) => (
                             <option key={dev.id} value={dev.id}>{dev.name}</option>
                           ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9pt] font-bold text-gray-500 uppercase">Ngày thí nghiệm</label>
                        <input type="date" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[11pt] font-bold text-gray-700 outline-none" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9pt] font-bold text-gray-500 uppercase">Người thí nghiệm chính</label>
                        <input type="text" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[11pt] font-bold text-gray-700 outline-none" placeholder="Nhập tên..." />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 space-y-6">
                   <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[12pt] font-black text-gray-800 flex items-center gap-2">
                           <Target className="w-5 h-5 text-blue-600" />
                           Các hạng mục thí nghiệm cần nhập liệu
                        </h4>
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[9pt] font-black uppercase">Chờ xử lý</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                         {[
                           "Kiểm tra bên ngoài và các mối nối",
                           "Đo điện trở cách điện cuộn dây",
                           "Đo điện trở thuần cuộn dây",
                           "Đo tỷ số biến và cực tính",
                           "Đo dòng điện không tải",
                           "Kiểm tra độ bền cách điện xoay chiều"
                         ].map((item, idx) => (
                           <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-500 transition-all cursor-pointer">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                   {idx + 1}
                                </div>
                                <span className="text-[11pt] font-bold text-gray-700">{item}</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end gap-4 shrink-0">
              <button 
                onClick={() => setShowRecordCreation(false)}
                className="px-8 py-3 text-[12pt] font-bold text-gray-500 hover:bg-gray-200 rounded-2xl transition-all"
              >
                Đóng
              </button>
              <button 
                onClick={() => {
                   alert('Chức năng đang được cập nhật...');
                   setShowRecordCreation(false);
                }}
                className="px-10 py-3 bg-pink-600 text-white rounded-2xl font-black shadow-xl shadow-pink-100 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest text-[11pt]"
              >
                Khởi tạo biểu mẫu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Device Params Detail View (Modal) */}
      {showDeviceParams && (
        <div className="fixed inset-0 z-[410] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowDeviceParams(null)}></div>
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500 border border-white/20">
             <div className="bg-[#164399] px-8 py-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
                <div className="relative z-10 flex items-start justify-between">
                   <div className="space-y-1">
                      <h3 className="text-[20pt] font-black leading-tight tracking-tight">{showDeviceParams.name}</h3>
                      <div className="flex items-center gap-3">
                         <span className="px-3 py-1 bg-white/20 rounded-full text-[10pt] font-black uppercase tracking-widest">{showDeviceParams.type}</span>
                         <span className={`px-3 py-1 rounded-full text-[10pt] font-black uppercase tracking-widest ${showDeviceParams.status === 'Đã xong' ? 'bg-green-400 text-white' : 'bg-orange-400 text-white'}`}>
                            {showDeviceParams.status}
                         </span>
                      </div>
                   </div>
                   <button onClick={() => setShowDeviceParams(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                      <X className="w-8 h-8" />
                   </button>
                </div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gray-50/50">
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                         <h4 className="text-[11pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Info className="w-4 h-4" /> Thông tin vị trí
                         </h4>
                         <div className="grid grid-cols-1 gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl">
                               <p className="text-[9pt] font-bold text-gray-400 uppercase leading-none mb-1">Đường dẫn thiết bị</p>
                               <p className="text-[11pt] font-bold text-gray-700">{showDeviceParams.path}</p>
                            </div>
                         </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                         <h4 className="text-[11pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-500" /> Kết quả đo gần nhất
                         </h4>
                         <div className="space-y-3">
                            {[
                              { label: 'Cách điện R15', value: '500 MΩ', status: 'Binh thường' },
                              { label: 'Cách điện R60', value: '1200 MΩ', status: 'Binh thường' },
                              { label: 'Hệ số hấp thụ K', value: '2.4', status: 'Tốt' },
                              { label: 'Tỉ số biến n', value: '110/35.5', status: 'Đạt' }
                            ].map((p, i) => (
                               <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                  <span className="text-[11pt] font-medium text-gray-600">{p.label}</span>
                                  <div className="text-right">
                                     <p className="text-[11pt] font-black text-gray-800">{p.value}</p>
                                     <p className="text-[8pt] font-bold text-green-600 uppercase">{p.status}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                         <h4 className="text-[11pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <FileText className="w-4 h-4 text-pink-500" /> Biên bản & Hồ sơ
                         </h4>
                         <div className="space-y-2">
                           <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-pink-50 rounded-xl border border-transparent hover:border-pink-200 transition-all group">
                              <div className="flex items-center gap-3">
                                 <FileText className="w-5 h-5 text-gray-400 group-hover:text-pink-600" />
                                 <div className="text-left">
                                    <p className="text-[11pt] font-black text-gray-700">Biên bản TN định kỳ 2025</p>
                                    <p className="text-[9pt] text-gray-400 font-bold">12/05/2025 • 2.4 MB</p>
                                 </div>
                              </div>
                              <Download className="w-5 h-5 text-gray-300 group-hover:text-pink-600" />
                           </button>
                         </div>
                      </div>
                      
                      <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-4">
                         <div className="flex items-center gap-3 text-orange-600">
                            <Zap className="w-6 h-6 fill-orange-500" />
                            <h4 className="text-[12pt] font-black uppercase">Cảnh báo vận hành</h4>
                         </div>
                         <p className="text-[10pt] font-bold text-orange-700 leading-relaxed italic">
                            * Thiết bị có hiện tượng phóng điện cục bộ nhẹ tại chân sứ A. Cần theo dõi sát thông số PD trong kỳ thí nghiệm này.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button 
                  onClick={() => setShowDeviceParams(null)}
                  className="px-8 py-3 bg-white border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest"
                >
                   Đóng
                </button>
                <button 
                  className="px-10 py-3 bg-[#164399] text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest"
                  onClick={() => setShowRecordCreation(true)}
                >
                   Nhập liệu Thí nghiệm
                </button>
             </div>
          </div>
        </div>
      )}
      {/* Test Report Form Dialog */}
      {detailForm?.type === 'test_report' && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDetailForm(null)}></div>
          <div className="relative w-full max-w-6xl h-[95vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#164399] text-white">
               <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/10 rounded-xl">
                     <ClipboardList className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[13pt] font-black uppercase tracking-widest leading-none">
                      {detailForm.mode === 'add' ? 'Lập biên bản thí nghiệm' : 
                       detailForm.mode === 'edit' ? 'Cập nhật biên bản thí nghiệm' : 'Chi tiết biên bản thí nghiệm'}
                    </h3>
                    <p className="text-[9pt] text-white/60 font-bold uppercase mt-1 tracking-tighter">PMIS LƯỚI - QUẢN LÝ THÍ NGHIỆM ĐỊNH KỲ</p>
                  </div>
               </div>
               <button onClick={() => setDetailForm(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                 <X className="w-5 h-5 text-white/70" />
               </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-gray-50/30">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: General Info */}
                  <div className="lg:col-span-2 space-y-6">
                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-4 mb-2">
                           <Info className="w-5 h-5 text-blue-600" />
                           <h4 className="text-[11pt] font-black text-[#164399] uppercase tracking-widest">Thông tin chung</h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-1">
                              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest">Tên thiết bị / Đối tượng</label>
                              <div className="relative">
                                 <Database className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                 <input 
                                   type="text" 
                                   defaultValue={detailForm.data?.device}
                                   disabled={detailForm.mode === 'view'}
                                   className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-[11pt] focus:border-blue-500 focus:bg-white transition-all disabled:opacity-75" 
                                 />
                              </div>
                           </div>
                           <div className="space-y-1">
                              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest">Loại hình thí nghiệm</label>
                              <select 
                                defaultValue={detailForm.data?.type || 'Định kỳ'}
                                disabled={detailForm.mode === 'view'}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-[11pt] focus:border-blue-500 focus:bg-white transition-all disabled:opacity-75"
                              >
                                 <option>Định kỳ</option>
                                 <option>Sửa chữa</option>
                                 <option>Mới lắp</option>
                                 <option>Sau sự cố</option>
                              </select>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-1">
                              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest">Đội thực hiện</label>
                              <input 
                                type="text" 
                                defaultValue={detailForm.data?.team || 'Đội thí nghiệm 1'}
                                disabled={detailForm.mode === 'view'}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-[11pt] focus:border-blue-500 focus:bg-white transition-all disabled:opacity-75" 
                              />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest">Người chủ trì</label>
                              <div className="relative">
                                 <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                 <input 
                                   type="text" 
                                   defaultValue={detailForm.data?.leader}
                                   disabled={detailForm.mode === 'view'}
                                   className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-[11pt] focus:border-blue-500 focus:bg-white transition-all disabled:opacity-75" 
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-1">
                           <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest">Kết quả đánh giá chung</label>
                           <div className="flex bg-gray-100 p-1 rounded-full w-full">
                              <button 
                                disabled={detailForm.mode === 'view'}
                                className={`flex-1 py-3 rounded-full text-[12pt] font-black transition-all ${detailForm.data?.result === 'Đạt' || !detailForm.data?.result ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400'}`}
                              >
                                ĐẠT
                              </button>
                              <button 
                                disabled={detailForm.mode === 'view'}
                                className={`flex-1 py-3 rounded-full text-[12pt] font-black transition-all ${detailForm.data?.result === 'Không đạt' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400'}`}
                              >
                                KHÔNG ĐẠT
                              </button>
                           </div>
                        </div>
                     </div>

                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-2">
                           <div className="flex items-center gap-3">
                              <Activity className="w-5 h-5 text-blue-600" />
                              <h4 className="text-[11pt] font-black text-[#164399] uppercase tracking-widest">Các hạng mục thí nghiệm</h4>
                           </div>
                           {detailForm.mode !== 'view' && (
                             <button className="flex items-center gap-1.5 text-[10pt] font-bold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-full transition-colors">
                               <Plus className="w-4 h-4" /> Thêm hạng mục
                             </button>
                           )}
                        </div>
                        
                        <div className="overflow-hidden border border-gray-100 rounded-2xl">
                           <table className="w-full text-left bg-white border-collapse">
                              <thead className="bg-[#164399] text-white text-[9pt] font-bold uppercase tracking-widest">
                                 <tr>
                                    <th className="px-4 py-3">STT</th>
                                    <th className="px-4 py-3">Hạng mục thí nghiệm</th>
                                    <th className="px-4 py-3 text-center">ĐVT</th>
                                    <th className="px-4 py-3 text-center">Trị số đo</th>
                                    <th className="px-4 py-3 text-center">ĐG</th>
                                    <th className="px-4 py-3 text-center w-20"></th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                 {(detailForm.data?.items || [
                                    { name: 'Điện trở cách điện CA-V', unit: 'MΩ', value: '2500', eval: 'Đạt' },
                                    { name: 'Tỷ số biến Phase A', unit: '-', value: '1.02', eval: 'Đạt' },
                                    { name: 'Tỷ số biến Phase B', unit: '-', value: '1.01', eval: 'Đạt' },
                                    { name: 'Tỷ số biến Phase C', unit: '-', value: '1.01', eval: 'Đạt' },
                                 ]).map((it: any, i: number) => (
                                    <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                       <td className="px-4 py-3.5 text-gray-400 font-bold text-center">{i+1}</td>
                                       <td className="px-4 py-3.5 font-bold text-gray-700 text-[11pt]">{it.name}</td>
                                       <td className="px-4 py-3.5 text-center text-gray-400 font-bold">{it.unit}</td>
                                       <td className="px-4 py-3.5 text-center">
                                          <input 
                                            type="text" 
                                            defaultValue={it.value}
                                            disabled={detailForm.mode === 'view'}
                                            className="w-20 text-center px-1 py-1 border-b border-blue-200 focus:border-blue-600 outline-none text-blue-600 font-black bg-transparent disabled:border-transparent text-[12pt]" 
                                          />
                                       </td>
                                       <td className="px-4 py-3.5 text-center">
                                          <span className={`text-[9pt] font-black uppercase px-2 py-0.5 rounded ${it.eval === 'Đạt' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{it.eval}</span>
                                       </td>
                                       <td className="px-4 py-3.5 text-center">
                                          {detailForm.mode !== 'view' && <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>}
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

                  {/* Right: Specifics & Signing */}
                  <div className="space-y-6">
                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-4 mb-2">
                           <FileText className="w-5 h-5 text-blue-600" />
                           <h4 className="text-[11pt] font-black text-[#164399] uppercase tracking-widest">Chi tiết biên bản</h4>
                        </div>
                        
                        <div className="space-y-4">
                           <div className="space-y-1">
                              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest">Thời gian thực hiện</label>
                              <input 
                                type="datetime-local" 
                                defaultValue={detailForm.data?.time}
                                disabled={detailForm.mode === 'view'}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-[11pt] focus:border-blue-500 focus:bg-white transition-all disabled:opacity-75" 
                              />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest">Điều kiện môi trường</label>
                              <textarea 
                                defaultValue={detailForm.data?.condition || 'Nhiệt độ 25°C, Độ ẩm 65%, Trời nắng ráo.'}
                                disabled={detailForm.mode === 'view'}
                                rows={2}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-[11pt] focus:border-blue-500 focus:bg-white transition-all disabled:opacity-75" 
                              />
                           </div>
                        </div>

                        <div className="space-y-4 pt-2">
                           <p className="text-[10pt] font-bold text-gray-400 uppercase tracking-tighter border-b border-gray-50 pb-2">Ký duyệt & Chứng thực</p>
                           <div className="space-y-3">
                              {(detailForm.data?.signing || [
                                 { role: 'Người thí nghiệm', name: 'Nguyễn Văn A', status: 'Đã ký' },
                                 { role: 'Người chủ trì', name: 'Lê Văn B', status: 'Chờ ký' },
                                 { role: 'Lãnh đạo đơn vị', name: 'Trần Văn C', status: 'Chờ ký' },
                              ]).map((s: any, i: number) => (
                                 <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-[#164399] text-white flex items-center justify-center font-black text-[10pt] italic shrink-0">{i+1}</div>
                                    <div className="flex-1 min-w-0">
                                       <p className="text-[8pt] font-black text-gray-400 uppercase tracking-widest truncate">{s.role}</p>
                                       <p className="text-[11pt] font-bold text-gray-700 truncate">{s.name}</p>
                                    </div>
                                    <span className={`text-[8pt] font-black px-2 py-0.5 rounded whitespace-nowrap ${s.status === 'Đã ký' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>{s.status}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                           <h4 className="text-[11pt] font-black text-[#164399] uppercase tracking-widest">Đính kèm</h4>
                           {detailForm.mode !== 'view' && <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"><Plus className="w-4 h-4" /></button>}
                        </div>
                        <FileUploader 
                          type="document"
                          onFileSelect={() => {}}
                          mode={detailForm.mode}
                        />
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0">
               <button 
                 onClick={() => setDetailForm(null)}
                 className="px-8 py-3 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all uppercase tracking-widest"
               >
                 Đóng
               </button>
               {detailForm.mode !== 'view' && (
                 <button className="px-10 py-3 bg-[#164399] text-white font-black rounded-xl shadow-xl shadow-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest">
                   Lưu biên bản
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
