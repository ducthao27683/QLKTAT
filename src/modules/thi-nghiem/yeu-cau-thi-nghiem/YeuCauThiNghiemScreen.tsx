import React, { useState } from 'react';
import { ArrowLeft, Filter, Plus, Search, User, Database, Zap, Clock, ExternalLink, Calendar, ClipboardList, FileText, Eye, Activity, Lock, ArrowRight, ListChecks, History } from 'lucide-react';
import { MOCK_TESTING_PLANS } from '../constants';
import { capitalizeBusinessName } from '../../../shared/utils';

interface YeuCauThiNghiemScreenProps {
  setActiveSubMenu: (menu: string | null) => void;
  setDetailForm: (form: any) => void;
  activeSubMenu: string;
  devicePath: string[];
  activeUnit: string;
}

export const YeuCauThiNghiemScreen = ({
  setActiveSubMenu,
  setDetailForm,
  activeSubMenu,
  devicePath,
  activeUnit
}: YeuCauThiNghiemScreenProps) => {
  const [showTestingFilter, setShowTestingFilter] = useState(false);
  const [selectedTestingPlanId, setSelectedTestingPlanId] = useState<number | null>(MOCK_TESTING_PLANS[0]?.id || null);
  const [previewTab, setPreviewTab] = useState<'info' | 'devices' | 'history'>('info');

  const lastInstance = React.useMemo(() => {
    for (let i = devicePath.length - 1; i >= 0; i--) {
      if (i % 2 === 0 && devicePath[i]) return devicePath[i];
    }
    return "";
  }, [devicePath]);

  const filteredPlans = React.useMemo(() => {
    let result = MOCK_TESTING_PLANS;

    // Filter by Active Unit
    if (activeUnit && activeUnit !== "Điện lực Thành phố Hưng Yên") {
       // Simulate that only some plans are in this unit
       result = result.filter(p => p.id % (activeUnit.length % 3 + 2) !== 0);
    }

    // Filter by Device Path (Location)
    if (lastInstance) {
       result = result.filter(p => 
         p.title.toLowerCase().includes(lastInstance.toLowerCase()) || 
         p.devices.some(d => d.name.toLowerCase().includes(lastInstance.toLowerCase()))
       );
    }
    
    // If we filtered too much, show everything to avoid empty screen in demo
    if (result.length === 0 && lastInstance) {
       return MOCK_TESTING_PLANS;
    }

    return result;
  }, [lastInstance, activeUnit]);

  const selectedPlan = filteredPlans.find(p => p.id === selectedTestingPlanId) || filteredPlans[0];

  React.useEffect(() => {
    if (filteredPlans.length > 0 && (!selectedTestingPlanId || !filteredPlans.find(p => p.id === selectedTestingPlanId))) {
      setSelectedTestingPlanId(filteredPlans[0].id);
    }
  }, [filteredPlans]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden text-[12pt]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSubMenu(null)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-[12pt] font-semibold flex items-center gap-2 leading-[1.5]">
                <span className="text-[#555555]">Thí nghiệm</span>
                <span className="font-bold text-[#164399]">- Danh sách Yêu cầu / Kế hoạch</span>
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowTestingFilter(!showTestingFilter)}
              className={`p-2 rounded-lg border transition-all ${showTestingFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
            >
              <Filter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setDetailForm({ type: 'testing_plan', mode: 'add', data: { category: activeSubMenu === 'Yêu cầu thí nghiệm' ? 'Yêu cầu' : 'Kế hoạch' } })}
              className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-lg font-bold hover:bg-blue-800 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
          </div>
        </div>
        {showTestingFilter && (
          <div className="mt-4 p-4 bg-gray-50 rounded-[10pt] border border-gray-100 grid grid-cols-4 gap-4 animate-in slide-in-from-top-2">
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Trạng thái</label>
              <select className="w-full bg-white border border-gray-200 rounded-[8px] px-3 py-1.5 outline-none font-normal text-[10pt] appearance-none focus:border-sky-400 focus:ring-1 focus:ring-sky-100">
                <option>Tất cả</option>
                <option>Mới lập</option>
                <option>Đang duyệt</option>
                <option>Đã duyệt</option>
                <option>Từ chối</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Loại phiếu</label>
              <select className="w-full bg-white border border-gray-200 rounded-[8px] px-3 py-1.5 outline-none font-normal text-[10pt] appearance-none focus:border-sky-400 focus:ring-1 focus:ring-sky-100">
                <option>Tất cả</option>
                <option>Theo công trình</option>
                <option>Không theo công trình</option>
                <option>Dụng cụ an toàn</option>
                <option>Yêu cầu khách hàng</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Đơn vị</label>
              <select className="w-full bg-white border border-gray-200 rounded-[8px] px-3 py-1.5 outline-none font-normal text-[10pt] appearance-none focus:border-sky-400 focus:ring-1 focus:ring-sky-100">
                <option>Tất cả đơn vị</option>
                <option>Điện lực Thành phố Hưng Yên</option>
                <option>Công ty Bê tông Hưng Yên</option>
                <option>Công ty May mặc Hưng Yên</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Tìm kiếm</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Tên, mã, nội dung..." className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-[8px] outline-none font-normal text-[10pt] focus:border-sky-400 focus:ring-1 focus:ring-sky-100" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Card List */}
        <div className="w-1/2 border-r border-gray-100 flex flex-col bg-gray-50/20">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {filteredPlans.map((plan) => (
              <div 
                key={plan.id}
                onClick={() => setSelectedTestingPlanId(plan.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
                  selectedTestingPlanId === plan.id 
                    ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                    : 'bg-white border-gray-100 hover:border-blue-100/60 shadow-sm'
                }`}
              >
                {selectedTestingPlanId === plan.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                )}
                
                <div className="flex justify-between items-start mb-2 group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9pt] font-black uppercase text-red-600 tracking-wider font-mono px-1.5 py-0.5 bg-red-50 rounded shadow-sm border border-red-100">{plan.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[8pt] font-black uppercase tracking-widest border ${
                      plan.category === 'Yêu cầu' ? 'bg-orange-50 border-orange-100 text-orange-600' : 'bg-blue-50 border-blue-100 text-blue-600'
                    }`}>
                      {plan.category === 'Yêu cầu' ? 'YÊU CẦU' : 'KẾ HOẠCH'}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8pt] font-black uppercase tracking-tighter ${
                    plan.status === 'Đã duyệt' ? 'bg-green-100 text-green-700' : 
                    plan.status === 'Đang thực hiện' ? 'bg-[#164399] text-white' :
                    'bg-gray-100 text-gray-500'
                  }`}>{plan.status}</span>
                </div>
                
                <h3 className={`text-[12pt] font-normal text-slate-700 mb-3 line-clamp-2 leading-tight transition-all whitespace-normal break-words ${
                  selectedTestingPlanId === plan.id ? 'text-[#164399]' : 'text-gray-800 group-hover:text-blue-600 group-hover:translate-x-1'
                }`}>
                  {plan.title.replace(/Yêu cầu |Kế hoạch /g, '')}
                </h3>
                
                <div className="flex items-center justify-between text-[9pt] font-bold pt-3 border-t border-gray-50 mt-1">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="flex items-center gap-1 uppercase">
                      <Calendar className="w-3.5 h-3.5" />
                      {plan.startDate.split('/')[0]} {plan.startDate.split('/')[1]}
                    </div>
                    <div className="flex items-center gap-1 text-[#164399] uppercase">
                      <Database className="w-3.5 h-3.5" />
                      {plan.devices.length} THIẾT BỊ
                    </div>
                  </div>
                  <span className="text-gray-500 italic font-medium">Người cập nhật: <span className="text-black font-bold not-italic">{plan.creator ? plan.creator.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ') : ''}</span></span>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="p-3 border-t border-gray-100 bg-white flex items-center justify-between text-[10pt] font-bold text-gray-400 shrink-0">
             <button className="px-3 py-1 hover:bg-gray-50 rounded border border-gray-100 text-gray-400 cursor-not-allowed uppercase">Trước</button>
             <div className="flex items-center gap-2">
                <span>Trang</span>
                <span className="text-blue-600">1</span>
                <span>/</span>
                <span>4</span>
                <span className="text-[9pt] text-gray-400 font-normal ml-2">(Hiển thị {filteredPlans.length}/{filteredPlans.length * 4} bản ghi)</span>
             </div>
             <button className="px-3 py-1 hover:bg-blue-50 rounded border border-blue-100 text-blue-600 uppercase">Tiếp</button>
          </div>
        </div>

        {/* Right Column: Quick Content */}
        <div className="w-1/2 flex flex-col bg-white overflow-hidden">
          {selectedPlan ? (
            <>
              <div className="flex border-b border-gray-100 shrink-0 bg-white">
                {[
                  { id: 'info', label: 'Thông tin chung' },
                  { id: 'devices', label: 'Danh sách thiết bị' },
                  { id: 'results', label: 'Kết quả thí nghiệm' },
                  { id: 'history', label: 'Lịch sử trình duyệt' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setPreviewTab(tab.id as any)}
                    className={`flex-1 h-12 text-[11pt] font-bold transition-all relative ${
                      previewTab === tab.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab.label}
                    {previewTab === tab.id && (
                      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {previewTab === 'results' && (
                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <h5 className="text-[12pt] font-black text-gray-700 uppercase tracking-tight">Biên bản & Kết quả đo lường</h5>
                        <button 
                          onClick={() => setDetailForm({ type: 'test_report', mode: 'add', data: { planId: selectedPlan.id } })}
                          className="px-4 py-2 bg-[#164399] text-white rounded-lg text-[10pt] font-black shadow-lg hover:bg-blue-800 transition-all flex items-center gap-2"
                        >
                           <Plus className="w-4 h-4" /> LẬP BIÊN BẢN MỚI
                        </button>
                     </div>
                     
                     <div className="grid grid-cols-1 gap-4">
                        {selectedPlan.status === 'Đã duyệt' || selectedPlan.status === 'Đang thực hiện' ? (
                           <>
                             <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                                      <FileText className="w-6 h-6" />
                                   </div>
                                   <div>
                                      <p className="text-[12pt] font-bold text-gray-800">Biên bản thí nghiệm định kỳ số 01</p>
                                      <p className="text-[10pt] text-gray-500 font-normal">Ngày thực hiện: <span className="font-bold">15/05/2026</span> • Người chủ trì: <span className="font-bold">Nguyễn Văn A</span></p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-2">
                                   <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[9pt] font-black uppercase">ĐÃ DUYỆT</span>
                                   <button 
                                     onClick={() => setDetailForm({ type: 'test_report', mode: 'view', data: { id: 1, device: selectedPlan.devices[0]?.name, result: 'Đạt', leader: 'Nguyễn Văn A' } })}
                                     className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-blue-100"
                                   >
                                      <Eye className="w-5 h-5" />
                                   </button>
                                </div>
                             </div>
                             <div className="p-10 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-300">
                                <Activity className="w-10 h-10 mb-2 opacity-20" />
                                <p className="text-[10pt] font-bold uppercase tracking-widest">Chưa có thêm kết quả đo lường</p>
                             </div>
                           </>
                        ) : (
                           <div className="p-12 text-center bg-gray-50 rounded-3xl border border-gray-100 italic text-gray-400">
                              <Lock className="w-10 h-10 mx-auto mb-3 opacity-20" />
                              <p className="text-[11pt] font-bold uppercase tracking-widest">Hồ sơ chưa được duyệt để nhập kết quả</p>
                           </div>
                        )}
                     </div>
                  </div>
                )}

                {previewTab === 'info' && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10pt] font-black text-red-600 font-mono tracking-wider bg-red-50 px-2 py-0.5 rounded border border-red-100">{selectedPlan.code}</span>
                          <span className="text-gray-300">|</span>
                          <span className="text-[10pt] font-black text-blue-600 uppercase tracking-widest">{selectedPlan.category === 'Yêu cầu' ? 'Yêu cầu thí nghiệm' : 'Kế hoạch thí nghiệm'}</span>
                        </div>
                        <h4 className="text-[18pt] font-black text-[#164399] leading-tight whitespace-normal break-words">{selectedPlan.title}</h4>
                      </div>
                      <button 
                         onClick={() => setDetailForm({ type: 'testing_plan', mode: 'view', data: selectedPlan })}
                         className="px-6 py-2 bg-blue-50 text-[#164399] rounded-xl font-bold text-[10pt] hover:bg-blue-100 transition-all flex items-center gap-2 whitespace-nowrap border border-blue-100"
                      >
                         <Eye className="w-4 h-4" /> Xem
                      </button>
                    </div>

                    <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-6">
                        <h4 className="text-[10pt] font-black text-[#164399] flex items-center gap-2 mb-2">
                           <History className="w-4 h-4 text-blue-600" /> Thông tin chung
                        </h4>
                        <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <div>
                                   <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Loại hình & Chu kỳ</label>
                                   <p className="text-[11pt] font-black text-gray-700">{selectedPlan.planType || 'Định kỳ'} • {selectedPlan.cycle || 'Định kỳ 1 năm'}</p>
                                </div>
                                <div>
                                   <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Đơn vị quản lý</label>
                                   <p className="text-[11pt] font-black text-gray-700">{selectedPlan.unit || 'Công ty Điện lực Hưng Yên'}</p>
                                </div>
                             </div>
                             <div className="space-y-4">
                                <div>
                                   <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Thời gian dự kiến</label>
                                   <div className="flex items-center gap-2 text-[11pt] font-black text-gray-800">
                                      <Calendar className="w-4 h-4 text-blue-400" />
                                      <span>{selectedPlan.startDate}</span>
                                      <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                                      <span>{selectedPlan.endDate}</span>
                                   </div>
                                </div>
                                <div>
                                   <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Người lập hồ sơ</label>
                                   <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm font-black text-[9pt]">
                                         {selectedPlan.creator?.[0] || 'A'}
                                      </div>
                                      <span className="text-[11pt] font-black text-gray-700">{selectedPlan.creator || 'Nguyễn Văn A'}</span>
                                   </div>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="bg-red-50/30 p-6 rounded-3xl border border-red-100 space-y-4">
                        <h4 className="text-[10pt] font-black text-red-600 flex items-center gap-2 mb-2">
                           <Zap className="w-4 h-4" /> Phương án an toàn
                        </h4>
                        <div className="grid grid-cols-2 gap-8">
                           <div>
                              <label className="text-[8pt] font-black text-red-400 uppercase tracking-widest block mb-1">Trạng thái cắt điện</label>
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9pt] font-black uppercase ${selectedPlan.outage?.required ? 'bg-red-600 text-white shadow-sm shadow-red-100' : 'bg-green-600 text-white shadow-sm shadow-green-100'}`}>
                                 {selectedPlan.outage?.required ? <Zap className="w-3.5 h-3.5 fill-white" /> : <Zap className="w-3.5 h-3.5 text-green-200" />}
                                 {selectedPlan.outage?.required ? 'Cần cắt điện' : 'Làm việc nóng'}
                              </div>
                              {selectedPlan.outage?.required && (
                                 <div className="mt-3 text-[10pt] font-bold text-red-700">
                                    <Clock className="w-3.5 h-3.5 inline mr-1" /> Dự kiến: {selectedPlan.outage?.duration || '8h'} (08:00 - 17:00)
                                 </div>
                              )}
                           </div>
                           <div>
                              <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Biện pháp an toàn</label>
                              <p className="text-[10pt] font-medium text-gray-600">"{selectedPlan.outage?.scope || 'Theo phương án an toàn của đội.'}"</p>
                           </div>
                        </div>
                    </div>

                    <div className="bg-[#164399]/5 p-6 rounded-3xl border border-blue-50 space-y-4">
                        <h4 className="text-[10pt] font-black text-[#164399] flex items-center gap-2 mb-2">
                           <ListChecks className="w-4 h-4" /> Nội dung thực hiện
                        </h4>
                        <p className="text-[12pt] font-medium text-gray-700 leading-relaxed">
                          "{selectedPlan.description || 'Thực hiện công tác thí nghiệm định kỳ các thiết bị theo quy trình kỹ thuật hiện hành của EVN.'}"
                        </p>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                       <div className="flex items-center gap-8">
                          <div>
                            <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Người lập hồ sơ</label>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-[#164399] text-white flex items-center justify-center text-[10pt] font-black shadow-lg shadow-blue-50 rotate-[-3deg]">
                                {selectedPlan.creator?.[0]}
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-[12pt] font-black text-gray-800 leading-none">{selectedPlan.creator}</span>
                                 <span className="text-[8pt] font-bold text-blue-400 uppercase tracking-tighter">Ban Quản lý Kỹ thuật</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-px h-10 bg-gray-100"></div>
                          <div>
                            <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Ngày khởi tạo</label>
                            <div className="flex items-center gap-2 text-gray-700">
                               <Calendar className="w-4 h-4 text-gray-400" />
                               <span className="text-[11pt] font-black">19/05/2026</span>
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {previewTab === 'devices' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                       <h5 className="text-[12pt] font-bold text-gray-700 uppercase tracking-tight">Thiết bị trong danh sách ({selectedPlan.devices.length})</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedPlan.devices.map((dev, i) => (
                         <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:border-blue-200 transition-all">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm">
                                  <Zap className="w-5 h-5" />
                               </div>
                         <div className="flex flex-col">
                             <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10pt] font-black text-red-600 font-mono italic">PMIS-DEV-00{i+1}</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-[10pt] text-gray-400 font-normal uppercase tracking-tighter">{dev.type}</span>
                             </div>
                             <p className="text-[11pt] font-bold text-gray-700 group-hover:text-blue-700 transition-colors whitespace-normal break-words">{capitalizeBusinessName(dev.name)}</p>
                          </div>
                            </div>
                            <div className="text-right">
                               <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[8pt] font-bold">Sẵn sàng</span>
                            </div>
                         </div>
                      ))}
                    </div>
                  </div>
                )}

                {previewTab === 'history' && (
                  <div className="space-y-6 relative ml-4">
                     <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100"></div>
                     {[
                        { time: '12/04/2026 14:20', action: 'Phê duyệt kế hoạch', user: 'Lãnh đạo đơn vị', status: 'Approved' },
                        { time: '11/04/2026 09:30', action: 'Trình duyệt kế hoạch', user: selectedPlan.creator, status: 'Submitted' },
                        { time: '10/04/2026 16:45', action: 'Cập nhật danh sách thiết bị', user: selectedPlan.creator, status: 'Updated' },
                        { time: '10/04/2026 08:30', action: 'Khởi tạo yêu cầu', user: selectedPlan.creator, status: 'Created' },
                     ].map((item, idx) => (
                        <div key={idx} className="relative pl-8 group">
                           <div className={`absolute left-[-4px] top-1.5 w-2 h-2 rounded-full ring-4 ring-white ${idx === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                           <div>
                              <p className="text-[9pt] font-black text-gray-400 font-mono">{item.time}</p>
                              <div className="mt-1">
                                 <p className="text-[11pt] font-bold text-gray-700">{item.action}</p>
                                 <p className="text-[10pt] text-gray-500">Thực hiện bởi: <span className="font-bold">{item.user}</span></p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-12 text-center">
              <ClipboardList className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-[12pt] font-bold">Chọn một yêu cầu/kế hoạch từ danh sách bên trái để xem thông tin nhanh.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
