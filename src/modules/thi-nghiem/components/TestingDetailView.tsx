import React from 'react';
import { 
  Check, Share2, Lock, Eye, Zap, ListChecks, Database, 
  Trash2, Box, History, Camera, FileText, Download, Plus, KeyRound,
  ChevronRight, Calendar, Clock, User, ArrowRight, Activity
} from 'lucide-react';
import { EvnLogo } from '../../../components/EvnLogo';
import { FileUploader } from '../../../components/FileUploader';
import { capitalizeBusinessName } from '../../../shared/utils';

const normalizeType = (type: string) => {
  const t = type?.toUpperCase();
  if (t === 'TBA') return 'Trạm';
  if (t === 'ĐD') return 'Đường dây';
  if (t === 'MC') return 'Máy cắt';
  if (t === 'MBA') return 'Máy biến áp';
  if (t === 'TI' || t === 'BIẾN DÒNG') return 'Biến dòng';
  if (t === 'TU' || t === 'BIẾN ĐIỆN ÁP') return 'Biến điện áp';
  if (t === 'DCL') return 'Dao cách ly';
  if (t === 'CSV') return 'Chống sét van';
  return type;
};

interface TestingDetailViewProps {
  detailForm: any;
  setDetailForm: (form: any) => void;
  activeSubMenu: string | null;
  setActiveSubMenu: (submenu: string) => void;
  devicePath: string[];
  config: any;
  setShowApprovalPopup: (show: boolean) => void;
  setShowDeviceSelection: (show: boolean) => void;
  setShowDeviceParams: (val: any) => void;
  setConfirmAction: (action: any) => void;
}

export const TestingDetailView = ({
  detailForm,
  setDetailForm,
  activeSubMenu,
  setActiveSubMenu,
  devicePath,
  config,
  setShowApprovalPopup,
  setShowDeviceSelection,
  setShowDeviceParams,
  setConfirmAction
}: TestingDetailViewProps) => {
  const [showHistory, setShowHistory] = React.useState(false);

  if (!detailForm) return null;

  const isTestingPlan = detailForm.type === 'testing_plan';
  const isTestingCatalog = detailForm.type === 'testing_catalog';

  if (!isTestingPlan && !isTestingCatalog) return null;

  return (
    <>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-gray-50/30">
      {isTestingPlan && (
        <div className="bg-white p-4 px-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex bg-gray-200 p-0.5 rounded-[50px] shadow-inner w-fit shrink-0">
              <button 
                onClick={() => setDetailForm({ ...detailForm, data: { ...detailForm.data, category: 'Kế hoạch' } })}
                disabled={detailForm.mode === 'view'}
                className={`px-8 py-2 rounded-[50px] text-[9pt] font-black transition-all ${detailForm.data?.category === 'Kế hoạch' || (!detailForm.data?.category && activeSubMenu === 'Kế hoạch thí nghiệm') ? 'bg-white text-[#164399] shadow-sm' : 'text-gray-400'}`}
              >
                KẾ HOẠCH
              </button>
              <button 
                onClick={() => setDetailForm({ ...detailForm, data: { ...detailForm.data, category: 'Yêu cầu' } })}
                disabled={detailForm.mode === 'view'}
                className={`px-8 py-2 rounded-[50px] text-[9pt] font-black transition-all ${detailForm.data?.category === 'Yêu cầu' || (!detailForm.data?.category && activeSubMenu === 'Yêu cầu thí nghiệm') ? 'bg-white text-[#164399] shadow-sm' : 'text-gray-400'}`}
              >
                YÊU CẦU
              </button>
            </div>

            <div className="flex items-center gap-2 border-l border-gray-100 pl-6">
               <span className="text-[10pt] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Loại hình công tác:</span>
               <div className="flex flex-wrap gap-2">
                 {['Thí nghiệm', 'Kiểm định', 'Hiệu chuẩn'].map(type => (
                   <label key={type} className={`flex items-center gap-2 cursor-pointer group px-3 py-1.5 rounded-lg border transition-all ${detailForm.data?.workTypes?.includes?.(type) ? 'bg-[#164399] border-[#164399]/10 shadow-sm' : 'bg-white border-gray-100 hover:border-blue-100'}`}>
                     <div 
                       onClick={() => {
                         if (detailForm.mode === 'view') return;
                         const currentValues = detailForm.data?.workTypes || [];
                         const updatedValues = currentValues.includes(type)
                           ? currentValues.filter((v: string) => v !== type)
                           : [...currentValues, type];
                         setDetailForm({ ...detailForm, data: { ...detailForm.data, workTypes: updatedValues } });
                       }}
                       className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${detailForm.data?.workTypes?.includes?.(type) ? 'bg-white border-white' : 'border-gray-200'}`}
                     >
                       {detailForm.data?.workTypes?.includes?.(type) && <Check className="w-2.5 h-2.5 text-[#164399]" strokeWidth={6} />}
                     </div>
                     <span className={`text-[10pt] font-black ${detailForm.data?.workTypes?.includes?.(type) ? 'text-white' : 'text-gray-400'}`}>{type}</span>
                   </label>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Core Info */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-8 min-h-fit">
            {isTestingPlan ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-red-50 text-red-600 font-mono font-black text-[10pt] uppercase px-2 py-0.5 rounded border border-red-100">
                      {detailForm.data?.code || (activeSubMenu === 'Yêu cầu thí nghiệm' ? 'YC' : 'KH') + '-TN-2026-XXX'}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="bg-blue-50 text-blue-600 font-black text-[9pt] uppercase px-3 py-1 rounded-full border border-blue-100">
                      {detailForm.data?.category === 'Yêu cầu' ? 'Yêu cầu thí nghiệm' : 'Kế hoạch thí nghiệm'}
                    </span>
                  </div>
                  <textarea 
                    rows={2}
                    value={detailForm.data?.title || `${devicePath[devicePath.length - 1] || 'Thiết thiết bị'} - ${new Date().getFullYear()}`} 
                    onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, title: e.target.value } })}
                    readOnly={detailForm.mode === 'view'}
                    placeholder={`Nhập tiêu đề hồ sơ...`}
                    className={`w-full px-0 py-1 text-[16pt] font-black rounded-lg transition-all text-[#164399] leading-tight resize-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-transparent border-b border-gray-100'}`}
                  />
                </div>

                <div className="bg-gray-50/50 p-6 rounded-[1.5rem] border border-gray-100 space-y-6 shadow-inner">
                   <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-[0.1em] border-b border-gray-200 pb-3 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <History className="w-5 h-5 text-blue-600" /> THÔNG TIN HỒ SƠ
                      </span>
                      <div className="flex items-center gap-2 text-[10pt] font-black text-gray-700">
                         <Calendar className="w-4 h-4 text-gray-300" />
                         <span>{detailForm.data?.createdDate || '19/05/2026'}</span>
                      </div>
                   </h4>
                   <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-2">
                          <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Loại hình</label>
                          <select 
                            disabled={detailForm.mode === 'view'}
                            value={detailForm.data?.planType || "Định kỳ"}
                            onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, planType: e.target.value } })}
                            className={`w-full px-4 py-2 text-[11pt] font-medium rounded-[10px] transition-all appearance-none bg-white border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm disabled:bg-gray-50 disabled:border-gray-100`}
                          >
                            <option>Định kỳ</option>
                            <option>Đột xuất</option>
                            <option>Theo công trình</option>
                            <option>Dụng cụ an toàn</option>
                            <option>Sau sự cố</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Chu kỳ</label>
                          <select 
                            disabled={detailForm.mode === 'view'}
                            value={detailForm.data?.cycle || "Lần đầu"}
                            onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, cycle: e.target.value } })}
                            className={`w-full px-4 py-2 text-[11pt] font-medium rounded-[10px] transition-all appearance-none bg-white border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm disabled:bg-gray-50 disabled:border-gray-100`}
                          >
                            <option>Lần đầu</option>
                            <option>Định kỳ 1 năm</option>
                            <option>Định kỳ 2 năm</option>
                            <option>Định kỳ 3 năm</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Ngày bắt đầu</label>
                          <div className="relative">
                            <input 
                              type="date" 
                              value={detailForm.data?.startDate?.split(' ')[0] || ""} 
                              onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, startDate: e.target.value } })}
                              readOnly={detailForm.mode === 'view'}
                              className={`w-full px-4 py-2 text-[11pt] font-medium rounded-[10px] transition-all bg-white border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm read-only:bg-gray-50 read-only:border-gray-100`}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Ngày hoàn thành</label>
                          <div className="relative">
                            <input 
                              type="date" 
                              value={detailForm.data?.endDate?.split(' ')[0] || ""} 
                              onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, endDate: e.target.value } })}
                              readOnly={detailForm.mode === 'view'}
                              className={`w-full px-4 py-2 text-[11pt] font-medium rounded-[10px] transition-all bg-white border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm read-only:bg-gray-50 read-only:border-gray-100`}
                            />
                          </div>
                        </div>
                   </div>
                </div>

                <div className="bg-red-50/20 p-6 rounded-[1.5rem] border border-red-100 space-y-6">
                   <h4 className="text-[10pt] font-black text-red-600 flex items-center gap-2 mb-3">
                     <Zap className="w-5 h-5 text-red-500" /> Phương án an toàn
                   </h4>
                   <div className="space-y-6">
                        {detailForm.mode !== 'view' ? (
                          <div className="flex items-center bg-white p-1 rounded-full border border-gray-100 shadow-inner w-fit mx-auto">
                            <button 
                              onClick={() => setDetailForm({ ...detailForm, data: { ...detailForm.data, outage: { ...detailForm.data?.outage, required: true } } })}
                              className={`px-8 py-2 rounded-full text-[9pt] font-black transition-all ${detailForm.data?.outage?.required ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                              CẦN CẮT ĐIỆN
                            </button>
                            <button 
                              onClick={() => setDetailForm({ ...detailForm, data: { ...detailForm.data, outage: { ...detailForm.data?.outage, required: false } } })}
                              className={`px-8 py-2 rounded-full text-[9pt] font-black transition-all ${!detailForm.data?.outage?.required ? 'bg-green-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                              LÀM VIỆC NÓNG
                            </button>
                          </div>
                        ) : (
                          <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-2xl text-[10pt] font-bold shadow-sm ${detailForm.data?.outage?.required ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                            {detailForm.data?.outage?.required ? <Zap className="w-4 h-4 fill-white" /> : <Zap className="w-4 h-4 text-green-200" />}
                            {detailForm.data?.outage?.required ? 'Phương án Cắt điện' : 'Làm việc Nóng'}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Thời gian bắt đầu</label>
                            <div className="grid grid-cols-5 gap-2">
                              <input 
                                type="date" 
                                readOnly={detailForm.mode === 'view'}
                                className="col-span-3 px-3 py-2 text-[10pt] font-medium rounded-lg border border-gray-100 focus:border-blue-400 bg-white/50"
                                defaultValue={detailForm.data?.outage?.startDate || "2026-05-19"}
                              />
                              <input 
                                type="time" 
                                readOnly={detailForm.mode === 'view'}
                                className="col-span-2 px-2 py-2 text-[10pt] font-medium rounded-lg border border-gray-100 focus:border-blue-400 bg-white/50"
                                defaultValue={detailForm.data?.outage?.startTime || "08:00"}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Thời gian kết thúc</label>
                            <div className="grid grid-cols-5 gap-2">
                              <input 
                                type="date" 
                                readOnly={detailForm.mode === 'view'}
                                className="col-span-3 px-3 py-2 text-[10pt] font-medium rounded-lg border border-gray-100 focus:border-blue-400 bg-white/50"
                                defaultValue={detailForm.data?.outage?.endDate || "2026-05-19"}
                              />
                              <input 
                                type="time" 
                                readOnly={detailForm.mode === 'view'}
                                className="col-span-2 px-2 py-2 text-[10pt] font-medium rounded-lg border border-gray-100 focus:border-blue-400 bg-white/50"
                                defaultValue={detailForm.data?.outage?.endTime || "17:00"}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Biện pháp kỹ thuật</label>
                           <textarea 
                             readOnly={detailForm.mode === 'view'} 
                             rows={2} 
                             defaultValue={detailForm.data?.outage?.scope || "Biện pháp an toàn chi tiết khi thực hiện công tác."} 
                             className={`w-full p-4 rounded-[1rem] text-[11pt] font-medium leading-relaxed transition-all focus:outline-none ${detailForm.mode === 'view' ? 'bg-white/40 border-transparent' : 'bg-white border border-red-100 focus:border-red-300 focus:ring-4 focus:ring-red-50 shadow-inner'}`}
                           />
                        </div>
                   </div>
                </div>

                <div className="space-y-3 pt-4">
                   <h4 className="text-[10pt] font-black text-[#164399] flex items-center gap-2 ml-1">
                     <ListChecks className="w-5 h-5 text-blue-600" /> Nội dung thực hiện
                   </h4>
                   <textarea 
                     rows={4}
                     value={detailForm.data?.description || "Thực hiện công tác thí nghiệm định kỳ theo quy trình kỹ thuật hiện hành."} 
                     onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, description: e.target.value } })}
                     readOnly={detailForm.mode === 'view'}
                     className={`w-full p-5 text-[12pt] font-medium leading-relaxed rounded-[1.2rem] transition-all bg-gray-50 border border-transparent focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-inner`}
                   />
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <span className="bg-red-50 text-red-600 font-mono font-black text-[12pt] uppercase px-3 py-1 rounded shadow-sm border border-red-100">
                       {detailForm.data?.code || 'PD-MBA-001'}
                     </span>
                     <span className="text-gray-300">|</span>
                     <span className="bg-blue-50 text-[#164399] font-black text-[11pt] uppercase px-3 py-1 rounded-full border border-blue-100 flex items-center gap-2">
                        <Box className="w-4 h-4" /> {normalizeType(detailForm.data?.type) || 'Loại thiết bị'}
                     </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest block mb-2">Tên thiết bị</label>
                    <textarea 
                      rows={2}
                      value={detailForm.data?.device || ""} 
                      onChange={(e) => setDetailForm({...detailForm, data: {...detailForm.data, device: e.target.value}})}
                      readOnly={detailForm.mode === 'view'}
                      placeholder="Nhập tên thiết bị..."
                      className={`w-full px-0 py-2 text-[18pt] font-black rounded-lg transition-all text-[#164399] leading-tight resize-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-transparent border-b border-gray-200 focus:border-sky-400 focus:ring-0'}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                   <div className="space-y-6">
                      <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
                        <History className="w-5 h-5 text-blue-600" /> CHU KỲ
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest ml-1">Chu kỳ định kỳ</label>
                          <select 
                            disabled={detailForm.mode === 'view'}
                            defaultValue={detailForm.data?.interval || "12 tháng"}
                            className={`w-full px-4 py-2 text-[11pt] font-medium rounded-[10px] transition-all bg-white border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm disabled:bg-gray-50`}
                          >
                            <option>3 tháng</option>
                            <option>6 tháng</option>
                            <option>12 tháng</option>
                          </select>
                        </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-500" /> THỜI GIAN
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest ml-1">Lần cuối</label>
                          <input type="date" className={`w-full px-4 py-2 text-[11pt] font-medium rounded-[10px] transition-all bg-white border border-gray-200 shadow-sm read-only:bg-gray-50`} readOnly={detailForm.mode === 'view'} />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Devices & Assets */}
        <div className="space-y-8">
          {isTestingPlan && (
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Database className="w-5 h-5 text-blue-600" /> DANH SÁCH THIẾT BỊ ({detailForm.data?.devices?.length || 0})
                </h4>
                {detailForm.mode !== 'view' && (
                  <button 
                    onClick={() => setShowDeviceSelection(true)}
                    className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-black text-[9pt] hover:bg-blue-100 transition-all flex items-center gap-1 shadow-sm border border-blue-100"
                  >
                    <Plus className="w-4 h-4" /> THÊM
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {(detailForm.data?.devices || [
                  { id: 'MBA-01', name: 'Máy biến áp T1 - 110kV', type: 'MBA', status: 'Đã xong', date: '15/05/2026' },
                  { id: 'MC-01', name: 'Máy cắt 171 - Ngăn lộ 110kV', type: 'MC', status: 'Đã xong', date: '16/05/2026' },
                  { id: 'TI-01', name: 'Biến dòng chân sứ 110kV', type: 'TI', status: 'Chờ thực hiện' },
                ]).map((dev: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="p-4 bg-gray-50/50 rounded-[1.2rem] border border-gray-100 hover:border-blue-300 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-xl"
                    onClick={() => setShowDeviceParams(dev)}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[7.5pt] font-black text-gray-400 font-mono tracking-tighter bg-gray-200/50 px-1.5 py-0.5 rounded uppercase">[{dev.type || 'TB'}]</span>
                          <span className="text-[9pt] font-black text-red-600/70 font-mono">PMIS-{dev.id}</span>
                        </div>
                        <p className="text-[11pt] font-black text-gray-800 group-hover:text-[#164399] transition-colors leading-snug truncate">{dev.name}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className={`text-[7.5pt] font-black uppercase px-2 py-0.5 rounded-full border ${dev.status === 'Đã xong' ? 'bg-green-500 text-white border-green-400' : 'bg-white text-gray-400 border-gray-200'}`}>
                          {dev.status}
                        </div>
                        {dev.date && (
                          <span className="text-[8pt] font-bold text-gray-400 flex items-center gap-1">
                            <Check className="w-3 h-3" /> {dev.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
             <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Camera className="w-5 h-5 text-orange-500" /> HÌNH ẢNH HIỆN TRƯỜNG
                </h4>
             </div>
             <div className="space-y-4">
                {/* Images Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                   {[1, 2].map(i => (
                     <div key={i} className="aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group relative shadow-md hover:shadow-lg transition-all duration-500">
                        <img src={`https://picsum.photos/seed/test-v3-${i}/400/300`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" alt="" />
                        {detailForm.mode !== 'view' && (
                          <div className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                            <Trash2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                     </div>
                   ))}
                </div>
                
                {/* Full width uploader only in Edit/Add mode */}
                {detailForm.mode !== 'view' && (
                  <div className="pt-2">
                    <FileUploader 
                      type="image" 
                      mode={detailForm.mode} 
                      onFileSelect={() => {}} 
                    />
                  </div>
                )}
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
             <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" /> TÀI LIỆU ĐÍNH KÈM
                </h4>
             </div>
             <div className="space-y-3">
               {[1].map(i => (
                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:border-[#164399] transition-all">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-red-500">
                       <FileText className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-[10pt] font-black text-gray-800 line-clamp-1">Phuong_an_thi_nghiem.pdf</p>
                       <p className="text-[7.5pt] text-gray-400 font-bold uppercase">2.4 MB</p>
                     </div>
                   </div>
                   <Download className="w-4 h-4 text-gray-300 group-hover:text-[#164399] cursor-pointer" />
                 </div>
               ))}
               <FileUploader type="document" mode={detailForm.mode} onFileSelect={() => {}} />
             </div>
          </div>
        </div>
      </div>
    </div>

      {/* History Popup */}
      {showHistory && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowHistory(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
             <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h3 className="text-[14pt] font-black text-gray-800 tracking-tight">Lịch sử trình duyệt hồ sơ</h3>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                   <Plus className="w-6 h-6 text-gray-400 rotate-45" />
                </button>
             </div>
             <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-6 relative before:absolute before:left-[17px] before:top-4 before:bottom-0 before:w-0.5 before:bg-gray-100">
                   {(detailForm.data?.history || [
                     { id: 1, type: 'Lập lần 1', user: 'Vũ Văn Mới', time: '2026-05-24 08:30', note: 'Khởi tạo hồ sơ kế hoạch định kỳ' },
                     { id: 2, type: 'Trình duyệt', user: 'Vũ Văn Mới', time: '2026-05-24 09:00', note: 'Kính trình lãnh đạo phê duyệt phương án' },
                   ]).map((item: any) => (
                     <div key={item.id} className="relative z-10 pl-10">
                       <div className={`absolute left-0 top-1.5 w-9 h-9 rounded-full border-4 border-white flex items-center justify-center shadow-md ${
                         item.type.includes('Duyệt') ? 'bg-green-500 text-white' : 
                         item.type.includes('Từ chối') ? 'bg-red-500 text-white' : 
                         item.type.includes('Trình') ? 'bg-blue-500 text-white' : 
                         'bg-gray-600 text-white'
                       }`}>
                         <Check className="w-4 h-4" />
                       </div>
                       <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[9pt] font-black tracking-widest text-blue-600">{item.type}</span>
                             <span className="text-[9pt] font-bold text-gray-400 font-mono">{item.time}</span>
                          </div>
                          <p className="text-[12pt] font-black text-gray-800">{item.user}</p>
                          <p className="text-[10pt] text-gray-500 font-medium mt-1 leading-snug">"{item.note}"</p>
                       </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};
