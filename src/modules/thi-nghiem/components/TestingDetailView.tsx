import React from 'react';
import { 
  Check, Share2, Lock, Eye, Zap, ListChecks, Database, 
  Trash2, Box, History, Camera, FileText, Download, Plus, KeyRound
} from 'lucide-react';
import { EvnLogo } from '../../../components/EvnLogo';
import { FileUploader } from '../../../components/FileUploader';

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
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
      {isTestingPlan && (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-[10pt] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Loại hình công tác:</span>
            <div className="flex flex-wrap gap-4">
              {['Thí nghiệm', 'Kiểm định', 'Hiệu chuẩn'].map(type => (
                <label key={type} className={`flex items-center gap-2 cursor-pointer group px-3 py-1.5 rounded-lg border transition-all ${detailForm.data?.type?.includes?.(type) ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:border-blue-100'}`}>
                  <div 
                    onClick={() => {
                      if (detailForm.mode === 'view') return;
                      const currentValues = detailForm.data?.type || [];
                      const updatedValues = currentValues.includes(type)
                        ? currentValues.filter((v: string) => v !== type)
                        : [...currentValues, type];
                      setDetailForm({ ...detailForm, data: { ...detailForm.data, type: updatedValues } });
                    }}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${detailForm.data?.type?.includes?.(type) ? 'bg-[#164399] border-[#164399]' : 'border-gray-200'}`}
                  >
                    {detailForm.data?.type?.includes?.(type) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                  </div>
                  <span className={`text-[11pt] font-black ${detailForm.data?.type?.includes?.(type) ? 'text-[#164399]' : 'text-gray-400'}`}>{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10pt] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Phân loại:</span>
            <div className="flex bg-gray-100 p-1 rounded-full w-fit">
              <button 
                onClick={() => detailForm.mode !== 'view' && setDetailForm({ ...detailForm, data: { ...detailForm.data, category: 'Kế hoạch' } })}
                className={`px-6 py-2 rounded-full text-[11pt] font-black transition-all ${detailForm.data?.category === 'Kế hoạch' || (!detailForm.data?.category && activeSubMenu === 'Kế hoạch thí nghiệm') ? 'bg-white text-[#164399] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Kế hoạch
              </button>
              <button 
                onClick={() => detailForm.mode !== 'view' && setDetailForm({ ...detailForm, data: { ...detailForm.data, category: 'Yêu cầu' } })}
                className={`px-6 py-2 rounded-full text-[11pt] font-black transition-all ${detailForm.data?.category === 'Yêu cầu' || (!detailForm.data?.category && activeSubMenu === 'Yêu cầu thí nghiệm') ? 'bg-white text-[#164399] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Yêu cầu
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
            {isTestingPlan ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Loại</label>
                    <select 
                      disabled={detailForm.mode === 'view'}
                      value={detailForm.data?.planType || "Định kỳ"}
                      onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, planType: e.target.value } })}
                      className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                    >
                      <option>Định kỳ</option>
                      <option>Đột xuất</option>
                      <option>CBM</option>
                      <option>Sau sự cố</option>
                      <option>Nâng cấp</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Mã hiệu</label>
                    <input 
                      type="text" 
                      value={detailForm.data?.code || `${activeSubMenu === 'Yêu cầu thí nghiệm' ? 'YC' : 'KH'}-TN-2026-XXX`} 
                      onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, code: e.target.value } })}
                      readOnly={detailForm.mode === 'view'}
                      className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Trạng thái hồ sơ</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <select 
                        disabled={true}
                        value={detailForm.data?.status || "Đang lập"}
                        className={`w-full px-3 py-2 text-[11pt] rounded-lg transition-all appearance-none bg-blue-50/50 border border-blue-100 text-[#164399]`}
                      >
                         <option>Đang lập</option>
                         <option>Đang duyệt</option>
                         <option>Đã duyệt</option>
                         <option>Từ chối</option>
                      </select>
                      <Lock className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-blue-300" />
                    </div>
                    {detailForm.mode !== 'view' && (detailForm.data?.status === 'Đang lập' || !detailForm.data?.status) && (
                      <button 
                        onClick={() => setDetailForm({ ...detailForm, data: { ...detailForm.data, status: 'Đang duyệt' } })}
                        className="px-4 py-1.5 bg-[#164399] text-white rounded-lg font-black text-[10pt] shadow-lg shadow-blue-100 flex items-center gap-2"
                      >
                        <Share2 className="w-3.5 h-3.5" /> Trình duyệt
                      </button>
                    )}
                    {detailForm.mode === 'view' && detailForm.data?.status === 'Đang duyệt' && config.role === 'Admin' && (
                      <button 
                        onClick={() => setShowApprovalPopup(true)}
                        className="px-4 py-1.5 bg-green-600 text-white rounded-lg font-black text-[10pt] shadow-lg shadow-green-100"
                      >
                        Duyệt
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Tên Yêu cầu / Kế hoạch</label>
                  <input 
                    type="text" 
                    value={detailForm.data?.title || `${devicePath[devicePath.length - 1] || 'Thiết bị'} - ${new Date().getFullYear()}`} 
                    onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, title: e.target.value } })}
                    readOnly={detailForm.mode === 'view'}
                    placeholder={`Nhập tên yêu cầu / kế hoạch...`}
                    className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Đơn vị thí nghiệm</label>
                    <select 
                      disabled={detailForm.mode === 'view'}
                      value={detailForm.data?.team || "Đội thí nghiệm 1"}
                      onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, team: e.target.value } })}
                      className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                    >
                      <option>TT Thí nghiệm điện - Đội 1</option>
                      <option>TT Thí nghiệm điện - Đội 2</option>
                      <option>TT Thí nghiệm điện - Đội 3</option>
                      <option>Tổ thí nghiệm chuyên sâu</option>
                      <option>Đơn vị thuê ngoài (ETC)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Hợp đồng thí nghiệm</label>
                    <select 
                      disabled={detailForm.mode === 'view'}
                      value={detailForm.data?.contract || "Không xác định"}
                      onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, contract: e.target.value } })}
                      className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200'}`}
                    >
                      <option>Không xác định</option>
                      <option>HĐ/TN/2026/001</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest leading-none">Dự kiến bắt đầu</label>
                    <input 
                      type="datetime-local" 
                      value={detailForm.data?.startDate?.replace(' ', 'T') || ""} 
                      onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, startDate: e.target.value.replace('T', ' ') } })}
                      readOnly={detailForm.mode === 'view'}
                      className={`w-full px-3 py-2 text-[11pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none font-bold' : 'bg-white border border-gray-200'}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest leading-none">Dự kiến kết thúc</label>
                    <input 
                      type="datetime-local" 
                      value={detailForm.data?.endDate?.replace(' ', 'T') || ""} 
                      onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, endDate: e.target.value.replace('T', ' ') } })}
                      readOnly={detailForm.mode === 'view'}
                      className={`w-full px-3 py-2 text-[11pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none font-bold' : 'bg-white border border-gray-200'}`}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Nội dung thực hiện</label>
                  <textarea 
                    rows={3}
                    value={detailForm.data?.description || ""} 
                    onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, description: e.target.value } })}
                    readOnly={detailForm.mode === 'view'}
                    placeholder="Nhập nội dung chi tiết các hạng mục cần thí nghiệm..."
                    className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                  />
                </div>

                {/* Phương án cắt điện */}
                <div className={`p-4 rounded-xl border border-l-4 transition-all ${detailForm.data?.outage?.required ? 'bg-red-50/50 border-red-200 border-l-red-500' : 'bg-green-50/30 border-green-100 border-l-green-500'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Zap className={`w-5 h-5 ${detailForm.data?.outage?.required ? 'text-red-600 fill-red-500' : 'text-green-600'}`} />
                      <span className="text-[11pt] font-black text-gray-600 uppercase">Phương án cắt điện</span>
                    </div>
                    {detailForm.mode !== 'view' ? (
                      <div className="flex bg-gray-100 p-1 rounded-full w-fit shadow-inner">
                        <button 
                          onClick={() => setDetailForm({ ...detailForm, data: { ...detailForm.data, outage: { ...detailForm.data?.outage, required: false } } })}
                          className={`px-6 py-1.5 rounded-full text-[10pt] font-black transition-all ${!detailForm.data?.outage?.required ? 'bg-white text-green-600 shadow-[0_2px_4px_rgba(0,0,0,0.1)]' : 'text-gray-400 hover:text-gray-500'}`}
                        >
                          KHÔNG
                        </button>
                        <button 
                          onClick={() => setDetailForm({ ...detailForm, data: { ...detailForm.data, outage: { ...detailForm.data?.outage, required: true } } })}
                          className={`px-6 py-1.5 rounded-full text-[10pt] font-black transition-all ${detailForm.data?.outage?.required ? 'bg-white text-red-600 shadow-[0_2px_4px_rgba(0,0,0,0.1)]' : 'text-gray-400 hover:text-gray-500'}`}
                        >
                          CÓ
                        </button>
                      </div>
                    ) : (
                      <span className={`text-[10pt] font-black px-3 py-1 rounded-full ${detailForm.data?.outage?.required ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {detailForm.data?.outage?.required ? 'YÊU CẦU CẮT ĐIỆN' : 'VẬN HÀNH BÌNH THƯỜNG'}
                      </span>
                    )}
                  </div>
                  
                  {detailForm.data?.outage?.required && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="space-y-1">
                        <label className="text-[9pt] font-bold text-red-400 uppercase">Phạm vi cắt điện</label>
                        <textarea 
                          rows={2}
                          readOnly={detailForm.mode === 'view'}
                          value={detailForm.data?.outage?.scope || ""}
                          onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, outage: { ...detailForm.data?.outage, scope: e.target.value } } })}
                          className={`w-full px-2 py-1.5 text-[11pt] rounded border outline-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent' : 'bg-white border-red-200 focus:border-red-500'}`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9pt] font-bold text-red-300 uppercase leading-none">Thời điểm CẮT</label>
                          <input 
                            type="datetime-local" 
                            readOnly={detailForm.mode === 'view'}
                            value={detailForm.data?.outage?.startTime || ""}
                            onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, outage: { ...detailForm.data?.outage, startTime: e.target.value } } })}
                            className={`w-full px-2 py-1 text-[11pt] rounded border outline-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent font-bold' : 'bg-white border-red-100'}`}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9pt] font-bold text-red-300 uppercase leading-none">Thời điểm ĐÓNG</label>
                          <input 
                            type="datetime-local" 
                            readOnly={detailForm.mode === 'view'}
                            value={detailForm.data?.outage?.endTime || ""}
                            onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, outage: { ...detailForm.data?.outage, endTime: e.target.value } } })}
                            className={`w-full px-2 py-1 text-[11pt] rounded border outline-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent font-bold' : 'bg-white border-red-100'}`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Tên thiết bị trong danh mục</label>
                  <input 
                    type="text" 
                    defaultValue={detailForm.data?.device || ""} 
                    readOnly={detailForm.mode === 'view'}
                    placeholder="Nhập tên thiết bị (ví dụ: MBA T1 - TBA Phố Nối)..."
                    className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Chu kỳ thí nghiệm</label>
                    <select 
                      disabled={detailForm.mode === 'view'}
                      defaultValue={detailForm.data?.interval || "12 tháng"}
                      className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                    >
                      <option>3 tháng</option>
                      <option>6 tháng</option>
                      <option>12 tháng</option>
                      <option>24 tháng</option>
                      <option>36 tháng</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Trạng thái danh mục</label>
                    <select 
                      disabled={detailForm.mode === 'view'}
                      defaultValue={detailForm.data?.status || "Bình thường"}
                      className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                    >
                      <option>Bình thường</option>
                      <option>Sắp đến hạn</option>
                      <option>Đến hạn</option>
                      <option>Quá hạn</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Lần thí nghiệm cuối</label>
                    <input 
                      type="date" 
                      defaultValue={detailForm.data?.lastTest || ""} 
                      readOnly={detailForm.mode === 'view'}
                      className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Hạn thí nghiệm tiếp theo</label>
                    <input 
                      type="date" 
                      defaultValue={detailForm.data?.nextDue || ""} 
                      readOnly={detailForm.mode === 'view'}
                      className={`w-full px-3 py-2 text-[12pt] text-red-600 rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Độ khẩn cấp</label>
                    <select 
                      disabled={detailForm.mode === 'view'}
                      defaultValue={detailForm.data?.urgency || "Thấp"}
                      className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                    >
                      <option>Thấp</option>
                      <option>Trung bình</option>
                      <option>Cao</option>
                      <option>Rất cao</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Ghi chú thiết lập</label>
                    <textarea 
                      rows={3}
                      defaultValue={detailForm.data?.urgency ? `Mức độ ưu tiên: ${detailForm.data.urgency}` : ""} 
                      readOnly={detailForm.mode === 'view'}
                      placeholder="Nhập ghi chú thiết lập chu kỳ thí nghiệm..."
                      className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Devices/Attachments */}
        <div className="space-y-8">
          {isTestingPlan ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <Database className="w-3.5 h-3.5" />
                     Danh sách thiết bị ({detailForm.data?.devices?.length || 0})
                  </h4>
                  {detailForm.mode !== 'view' && (
                    <button 
                      onClick={() => setShowDeviceSelection(true)}
                      className="text-[11pt] font-black text-[#164399] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Thêm
                    </button>
                  )}
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                  {detailForm.data?.devices?.map((dev: any) => (
                    <div key={dev.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer group" onClick={() => setShowDeviceParams(dev)}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <Box className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[12pt] font-bold text-gray-700 group-hover:text-[#164399] transition-colors">{dev.name}</p>
                          <p className="text-[10pt] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">{dev.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10pt] font-black uppercase px-2 py-0.5 rounded ${dev.status === 'Đã xong' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                          {dev.status}
                        </span>
                        {detailForm.mode !== 'view' && (
                          <button className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lịch sử trình duyệt button - only visible in view mode */}
              {detailForm.mode === 'view' && (
                <div className="pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setShowHistory(true)}
                    className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl font-black text-[11pt] border border-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <History className="w-4 h-4" /> Chi tiết Lịch sử trình duyệt
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                 <h4 className="text-[11pt] font-black text-gray-400 uppercase tracking-widest">
                    Vị trí hiện tại
                 </h4>
                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-[12pt] font-bold text-gray-700">{devicePath?.join(' / ')}</p>
                 </div>
              </div>
            </div>
          )}

          {/* Attachments / Images (shared style) */}
          <div className="space-y-4">
            <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Camera className="w-3.5 h-3.5" />
              Hình ảnh liên quan
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {(() => {
                const images = [1, 2]; // Mock images
                const displayImages = [...images];
                if (displayImages.length % 2 !== 0) {
                  displayImages.push(-1); // Placeholder
                }
                return (
                  <>
                    {displayImages.map((imgId, idx) => (
                      imgId === -1 ? (
                        <div key={`placeholder-${idx}`} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-200 flex items-center justify-center">
                          <div className="scale-75 opacity-40">
                            <EvnLogo />
                          </div>
                        </div>
                      ) : (
                        <div key={imgId} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group">
                          <img src={`https://picsum.photos/seed/${detailForm.type}-${imgId}/400/225`} alt="Image" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          {detailForm.mode !== 'view' && (
                            <button className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )
                    ))}
                    {detailForm.mode !== 'view' && (
                      <div className={images.length % 2 === 0 ? "col-span-2" : ""}>
                        <FileUploader 
                          type="image" 
                          mode={detailForm.mode} 
                          onFileSelect={(files) => console.log('Selected images:', files)} 
                        />
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Tài liệu đính kèm
            </h4>
            <div className="space-y-2">
              {[1].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[12pt] font-bold text-gray-700">Tai_lieu_001.pdf</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">1.2 MB</p>
                    </div>
                  </div>
                  {detailForm.mode !== 'view' && (
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <FileUploader 
                 type="document" 
                 mode={detailForm.mode} 
                 onFileSelect={(files) => console.log('Selected documents:', files)} 
              />
            </div>
          </div>

        </div>
      </div>

      {/* History Popup */}
      {showHistory && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowHistory(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95">
             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-[13pt] font-black text-gray-800">Lịch sử trình duyệt hồ sơ</h3>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-gray-100 rounded-full">
                   <Check className="w-5 h-5 text-gray-400" />
                </button>
             </div>
             <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4 relative before:absolute before:left-[17px] before:top-4 before:bottom-0 before:w-0.5 before:bg-gray-100">
                   {(detailForm.data?.history || [
                     { id: 1, type: 'Lập lần 1', user: 'Vũ Văn Mới', time: '2026-05-24 08:30', note: 'Tạo hồ sơ yêu cầu mới' },
                   ]).map((item: any) => (
                     <div key={item.id} className="relative z-10 pl-10">
                       <div className={`absolute left-0 top-1.5 w-9 h-9 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                         item.type.includes('Duyệt') ? 'bg-green-500 text-white' : 
                         item.type.includes('Từ chối') ? 'bg-red-500 text-white' : 
                         item.type.includes('Trình') ? 'bg-blue-500 text-white' : 
                         'bg-gray-400 text-white'
                       }`}>
                         <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                       </div>
                       <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                             <span className="text-[10pt] font-black uppercase tracking-widest text-[#164399]">{item.type}</span>
                             <span className="text-[9pt] font-bold text-gray-400">{item.time}</span>
                          </div>
                          <p className="text-[11pt] font-black text-gray-700">{item.user}</p>
                          <p className="text-[10pt] text-gray-500 font-medium italic mt-1 leading-tight">"{item.note}"</p>
                       </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
