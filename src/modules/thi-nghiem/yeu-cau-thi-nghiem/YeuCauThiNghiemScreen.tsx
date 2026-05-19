import React, { useState } from 'react';
import { ArrowLeft, Filter, Plus, Search, User, Database, Zap, Clock, ExternalLink, Calendar, ClipboardList } from 'lucide-react';
import { MOCK_TESTING_PLANS } from '../constants';

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

  const filteredPlans = React.useMemo(() => {
    let result = MOCK_TESTING_PLANS;

    // Filter by Active Unit
    if (activeUnit && activeUnit !== "Công ty Điện lực Hưng Yên") {
       // Simulate that only some plans are in this unit
       result = result.filter(p => p.id % (activeUnit.length % 3 + 2) !== 0);
    }

    // Filter by Device Path
    if (devicePath && devicePath.length > 1) {
      const currentDeviceName = devicePath[devicePath.length - 1];
      const isDevice = devicePath.length > 2;
      
      if (isDevice) {
        result = result.filter(p => 
          p.devices.some(d => d.name.toLowerCase().includes(currentDeviceName.toLowerCase())) ||
          p.title.toLowerCase().includes(currentDeviceName.toLowerCase())
        );
      }
    }
    
    return result;
  }, [devicePath, activeUnit]);

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
                <span className="font-bold text-[#164399]">- {activeSubMenu === 'Yêu cầu thí nghiệm' ? 'Danh sách yêu cầu/kế hoạch' : 'Danh mục thí nghiệm'}</span>
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
          <div className="mt-4 p-4 bg-gray-50 rounded-[20px] border border-gray-100 grid grid-cols-4 gap-4 animate-in slide-in-from-top-2">
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Trạng thái</label>
              <select className="w-full bg-white border border-gray-200 rounded-[20px] px-3 py-1.5 outline-none font-bold text-[10pt]">
                <option>Tất cả</option>
                <option>Mới lập</option>
                <option>Đã trình duyệt</option>
                <option>Đã duyệt</option>
                <option>Từ chối</option>
                <option>Đang thực hiện</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Phân loại</label>
              <select className="w-full bg-white border border-gray-200 rounded-[20px] px-3 py-1.5 outline-none font-bold text-[10pt]">
                <option>Tất cả</option>
                <option>Yêu cầu</option>
                <option>Kế hoạch</option>
              </select>
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Tìm kiếm</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Tên yêu cầu/kế hoạch, mã số..." className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-[20px] outline-none font-semibold text-[10pt]" />
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
                
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9pt] font-black uppercase text-red-600 tracking-wider font-mono">{plan.code}</span>
                  <span className={`px-2 py-0.5 rounded text-[8pt] font-black uppercase tracking-tighter ${
                    plan.status === 'Đã duyệt' ? 'bg-green-100 text-green-700' : 
                    plan.status === 'Đang thực hiện' ? 'bg-blue-600 text-white' :
                    'bg-gray-100 text-gray-500'
                  }`}>{plan.status}</span>
                </div>
                
                <h3 className={`text-[11pt] font-bold mb-3 line-clamp-2 leading-snug transition-colors ${
                  selectedTestingPlanId === plan.id ? 'text-[#164399]' : 'text-gray-700 group-hover:text-blue-600'
                }`}>
                  {plan.title}
                </h3>
                
                <div className="flex items-center justify-between text-[9pt] text-gray-400 font-bold uppercase">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {plan.startDate.split('/')[0]}/{plan.startDate.split('/')[1]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Database className="w-3.5 h-3.5" />
                      {plan.devices.length} TB
                    </div>
                  </div>
                  <span className="text-gray-300">Lập: {plan.creator}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="p-3 border-t border-gray-100 bg-white flex items-center justify-between text-[10pt] font-bold text-gray-400 shrink-0">
             <button className="px-3 py-1 hover:bg-gray-50 rounded border border-gray-100 text-gray-400 cursor-not-allowed uppercase">Trước</button>
             <div className="flex items-center gap-2">
                <span className="text-blue-600">1</span>
                <span>/</span>
                <span>4</span>
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
                  { id: 'history', label: 'Lịch sử trình duyệt' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setPreviewTab(tab.id as any)}
                    className={`flex-1 h-12 text-[12pt] font-bold transition-all relative ${
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
                {previewTab === 'info' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest mb-1">Tiêu đề yêu cầu/kế hoạch</p>
                        <h4 className="text-[15pt] font-bold text-[#164399] leading-snug">{selectedPlan.title}</h4>
                      </div>
                      <button 
                         onClick={() => setDetailForm({ type: 'testing_plan', mode: 'view', data: selectedPlan })}
                         className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-[10pt] hover:bg-blue-100 transition-all flex items-center gap-2 whitespace-nowrap shadow-sm border border-blue-100"
                      >
                         <ExternalLink className="w-4 h-4" /> Xem chi tiết
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                             <p className="text-[9pt] font-bold text-gray-400 uppercase mb-2">Thông tin định danh</p>
                             <div className="space-y-2">
                                <div className="flex justify-between">
                                   <span className="text-gray-500">Mã yêu cầu:</span>
                                   <span className="font-bold text-red-600 font-mono">{selectedPlan.code}</span>
                                </div>
                                <div className="flex justify-between">
                                   <span className="text-gray-500">Phân loại:</span>
                                   <span className="font-bold text-blue-600">{selectedPlan.type}</span>
                                </div>
                                <div className="flex justify-between">
                                   <span className="text-gray-500">Người lập:</span>
                                   <span className="font-bold text-gray-700">{selectedPlan.creator}</span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                             <p className="text-[9pt] font-bold text-gray-400 uppercase mb-2">Cắt điện & Vận hành</p>
                             <div className="space-y-2">
                                <div className="flex justify-between">
                                   <span className="text-gray-500">Yêu cầu cắt điện:</span>
                                   <span className={`font-bold ${selectedPlan.outage?.required ? 'text-red-500' : 'text-green-500'}`}>
                                      {selectedPlan.outage?.required ? 'Có' : 'Không'}
                                   </span>
                                </div>
                                {selectedPlan.outage?.required && (
                                   <div className="flex justify-between">
                                      <span className="text-gray-500">Thời gian mất điện:</span>
                                      <span className="font-bold text-red-600">{selectedPlan.outage?.duration}</span>
                                   </div>
                                )}
                             </div>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-100">
                             <p className="text-[9pt] font-bold text-blue-400 uppercase mb-2">Kế hoạch thời gian</p>
                             <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                   <Calendar className="w-4 h-4 text-blue-500" />
                                   <div>
                                      <p className="text-[9pt] text-gray-400 font-bold uppercase leading-none">Ngày bắt đầu</p>
                                      <p className="text-[12pt] font-bold text-gray-700">{selectedPlan.startDate}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-3">
                                   <Calendar className="w-4 h-4 text-blue-500" />
                                   <div>
                                      <p className="text-[9pt] text-gray-400 font-bold uppercase leading-none">Ngày kết thúc</p>
                                      <p className="text-[12pt] font-bold text-gray-700">{selectedPlan.endDate}</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                             <p className="text-[9pt] font-bold text-gray-400 uppercase mb-2">Mô tả mục tiêu</p>
                             <p className="text-[11pt] text-gray-600 italic">"{selectedPlan.title} theo quy trình định kỳ QĐ-123 của EVN..."</p>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {previewTab === 'devices' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                       <h5 className="text-[12pt] font-bold text-gray-700 uppercase tracking-tight">Thiết bị trong danh sách ({selectedPlan.devices.length})</h5>
                       <span className="text-[10pt] text-gray-400">Đơn vị: {selectedPlan.unit || 'Xí nghiệp Thí nghiệm'}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedPlan.devices.map((dev, i) => (
                         <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:border-blue-200 transition-all">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm">
                                  <Zap className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-[11pt] font-bold text-gray-700 group-hover:text-blue-700 transition-colors">{dev.name}</p>
                                  <p className="text-[9pt] text-gray-400 font-bold uppercase">Mã: PMIS-DEV-00{i+1}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-[10pt] font-bold text-gray-500">{dev.type}</p>
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
