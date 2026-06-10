import React from 'react';
import { 
  Check, Share2, Lock, Eye, Zap, ListChecks, Database, 
  Trash2, Box, History, Camera, FileText, Download, Plus, KeyRound,
  ChevronRight, Calendar, Clock, User, ArrowRight, FlaskConical,
  Settings, Printer, CheckCircle2, ClipboardList, Activity
} from 'lucide-react';
import { EvnLogo } from '../../../components/EvnLogo';
import { FileUploader } from '../../../components/FileUploader';
import { capitalizeBusinessName } from '../../../shared/utils';

interface ReportDetailViewProps {
  detailForm: any;
  setDetailForm: (form: any) => void;
  config: any;
  setPreviewContent: (content: any) => void;
}

export const ReportDetailView = ({
  detailForm,
  setDetailForm,
  config,
  setPreviewContent
}: ReportDetailViewProps) => {
  const [activeTab, setActiveTab] = React.useState<'info' | 'result' | 'attachments' | 'signing'>('info');

  if (!detailForm || detailForm.type !== 'test_report') return null;
  const test = detailForm.data;
  const isAddMode = detailForm.mode === 'add';

  if (isAddMode) {
    return (
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-gray-50/30">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-[#164399]/10 text-[#164399] rounded-2xl">
                <ClipboardList className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-[22pt] font-black text-gray-800 tracking-tight leading-tight">Lập biên bản thí nghiệm mới</h3>
                <p className="text-[11pt] text-gray-500 font-bold mt-1">Khởi tạo dữ liệu đo lường và biên bản hiện trường</p>
              </div>
            </div>
            <div className="hidden md:block">
               <EvnLogo className="h-12 text-[#164399]/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Core Source Info */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-8">
                <div className="space-y-6">
                  <h4 className="text-[10pt] font-black text-[#164399] uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                    <Database className="w-5 h-5" /> Thông tin nguồn dữ liệu
                  </h4>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Kế hoạch / Yêu cầu nguồn</label>
                      <select className="w-full px-5 py-3 text-[12pt] font-bold text-gray-700 outline-none bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all shadow-inner">
                         <option>{test.planName || 'Kế hoạch thí nghiệm định kỳ năm 2026'}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Thiết bị thí nghiệm</label>
                      <select className="w-full px-5 py-3 text-[12pt] font-bold text-gray-700 outline-none bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all shadow-inner">
                         <option>{test.device || 'MBA T1 - Trạm 110kV Phố Nối'}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <h4 className="text-[10pt] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                    <Clock className="w-5 h-5" /> Thời gian & Thực hiện
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Ngày thực hiện</label>
                      <input type="date" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[11pt] font-bold text-gray-700 outline-none focus:border-blue-500 shadow-sm" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Giờ bắt đầu</label>
                      <input type="time" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[11pt] font-bold text-gray-700 outline-none focus:border-blue-500 shadow-sm" defaultValue="08:00" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Personnel */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                  <User className="w-5 h-5 text-green-500" /> Nhân sự thực hiện
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Người chủ trì</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[11pt] font-bold text-gray-700" defaultValue={config.fullName} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Thành viên tham gia</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[11pt] font-bold text-gray-700 outline-none focus:border-blue-500 shadow-sm" placeholder="Nhập tên các thành viên..." />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Conditions */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                  <Activity className="w-5 h-5 text-orange-500" /> Điều kiện môi trường
                </h4>
                <div className="space-y-5">
                   <div className="space-y-2">
                      <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Thời tiết</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Nắng', 'Nhiều mây', 'Mưa', 'Độ ẩm cao'].map(w => (
                          <button key={w} className={`py-2 text-[10pt] rounded-lg font-bold border transition-all ${w === 'Nắng' ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm' : 'bg-white border-gray-100 text-gray-400'}`}>
                            {w}
                          </button>
                        ))}
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Nhiệt độ (°C)</label>
                         <input type="number" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[11pt] font-bold text-[#164399] outline-none focus:border-blue-500 shadow-sm" defaultValue={28} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1">Độ ẩm (%)</label>
                         <input type="number" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[11pt] font-bold text-[#164399] outline-none focus:border-blue-500 shadow-sm" defaultValue={75} />
                      </div>
                   </div>
                </div>
              </div>

              {/* Action */}
              <div className="space-y-4">
                <button 
                  onClick={() => {
                    setDetailForm({ 
                      type: 'test_report', 
                      mode: 'view', 
                      data: { 
                        id: 99, 
                        device: test.device || 'MBA T1 - Trạm 110kV Phố Nối', 
                        planName: test.planName || 'Kế hoạch thí nghiệm định kỳ năm 2026',
                        team: 'Đội Thí nghiệm Điện', 
                        leader: config.fullName, 
                        time: `${new Date().toLocaleDateString('vi-VN')} 08:30`,
                        result: 'Đang thực hiện',
                        type: 'Định kỳ',
                        items: [
                          { name: 'Đo điện trở cách điện cuộn dây', unit: 'MΩ', value: '4500', limit: '≥ 2000', eval: 'Đạt' },
                          { name: 'Đo điện trở một chiều cuộn dây', unit: 'Ω', value: '0.012', limit: '± 2% so với XM', eval: 'Đạt' },
                          { name: 'Thử nghiệm không tải', unit: 'A', value: '0.15', limit: 'XM', eval: 'Đạt' }
                        ],
                        images: [],
                        attachments: [],
                        signing: [
                          { role: 'Người thí nghiệm', name: config.fullName, status: 'Đang xử lý', time: '' },
                          { role: 'Lãnh đạo đơn vị', name: 'Nguyễn Văn A', status: 'Chờ duyệt', time: '' }
                        ]
                      } 
                    });
                  }}
                  className="w-full py-5 bg-[#164399] text-white rounded-2xl font-black text-[14pt] shadow-2xl shadow-blue-200 hover:bg-blue-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  Khởi tạo biểu mẫu <ArrowRight className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setDetailForm(null)}
                  className="w-full py-4 text-gray-400 font-bold text-[11pt] hover:text-gray-600 transition-colors uppercase tracking-widest"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-gray-50/30">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-100 shrink-0 bg-white shadow-sm -mx-6 -mt-6">
        {[
          { id: 'info', label: 'Thông tin chung', icon: InfoIcon },
          { id: 'result', label: 'Kết quả đo', icon: FlaskConical },
          { id: 'attachments', label: 'Đính kèm', icon: Camera },
          { id: 'signing', label: 'Ký duyệt', icon: Check }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 h-14 text-[12pt] font-black transition-all relative flex items-center justify-center gap-2 ${
              activeTab === tab.id ? 'text-blue-600 bg-blue-50/30' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8 min-h-[600px]">
            <div className="space-y-4">
               <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10pt] font-black text-red-600 font-mono tracking-wider px-2 py-0.5 bg-red-50 rounded shadow-sm border border-red-100">BB-TN-{test.id < 10 ? `00${test.id}` : test.id}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-[10pt] font-black text-[#164399] px-3 py-1 bg-blue-50 rounded-full border border-blue-100">Biên bản kết quả thí nghiệm</span>
               </div>
               <h2 className="text-[22pt] font-black text-gray-800 leading-none tracking-tight">
                 {test.device}
               </h2>
               <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[9pt] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Nguồn:</span>
                  <p className="text-[11pt] font-bold text-[#164399] truncate">{test.planName || 'Kế hoạch thí nghiệm định kỳ năm 2026'}</p>
               </div>
            </div>

            {activeTab === 'info' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-[10pt] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 border-b border-blue-50 pb-2">
                       <Activity className="w-4 h-4" /> Nhân sự thực hiện
                    </h4>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-blue-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all"><Database className="w-6 h-6"/></div>
                          <div>
                            <span className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest block">Đội thực hiện</span>
                            <span className="text-[12pt] font-black text-gray-800">{test.team}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-green-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all"><User className="w-6 h-6"/></div>
                          <div>
                            <span className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest block">Người chủ trì</span>
                            <span className="text-[12pt] font-black text-gray-800">{test.leader}</span>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10pt] font-black text-orange-500 uppercase tracking-widest flex items-center gap-2 border-b border-orange-50 pb-2">
                       <InfoIcon className="w-4 h-4" /> Đặc tính kỹ thuật
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                       <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 shadow-inner">
                          <span className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Loại hình thí nghiệm</span>
                          <span className="text-[12pt] font-black text-gray-700">{test.type}</span>
                       </div>
                       <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 shadow-inner">
                          <span className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Đánh giá chung</span>
                          <span className={`text-[12pt] font-black uppercase ${test.result === 'Đạt' ? 'text-green-600' : 'text-red-500'}`}>{test.result || 'Mới lập'}</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#164399]/5 rounded-3xl border border-blue-100">
                   <div className="flex items-center gap-8">
                      <div className="flex-1">
                        <span className="text-[8pt] font-black text-blue-400 uppercase tracking-[0.2em] block mb-2">Thông tin thời gian</span>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <span className="text-[12pt] font-black text-gray-700">{test.time.split(' ')[0]}</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-gray-400" />
                              <span className="text-[12pt] font-black text-gray-700">{test.time.split(' ')[1] || '08:30'}</span>
                           </div>
                        </div>
                      </div>
                      <div className="w-px h-12 bg-blue-100"></div>
                      <div className="flex-1">
                        <span className="text-[8pt] font-black text-blue-400 uppercase tracking-[0.2em] block mb-2">Mã biên bản PMIS</span>
                        <span className="text-[14pt] font-mono font-black text-[#164399]">EVN-HUNGYEN-2026-{test.id}</span>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'result' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center gap-4">
                      <div className="px-4 py-1.5 bg-blue-50 text-[#164399] rounded-lg border border-blue-100 text-[9pt] font-black uppercase">
                         Thiết bị: Trạm 110kV Phố Nối
                      </div>
                      <div className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-lg border border-gray-100 text-[9pt] font-bold uppercase">
                         Mã PMIS: PD- MBA110-01
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-lg text-[9pt] font-bold hover:bg-gray-50 transition-all">Nhập Excel</button>
                      <button className="px-4 py-1.5 bg-[#164399] text-white rounded-lg text-[9pt] font-bold hover:opacity-90 transition-all">Xuất mẫu</button>
                   </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-[#164399] text-white text-[9.5pt] font-black uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-5">Hạng mục thí nghiệm</th>
                        <th className="px-6 py-5 text-center">ĐVT</th>
                        <th className="px-6 py-5 text-center">Trị số đo</th>
                        <th className="px-6 py-5 text-center">Quy định</th>
                        <th className="px-8 py-5 text-center">Đánh giá</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {test.items?.map((it: any, i: number) => (
                        <tr key={i} className="hover:bg-blue-50/30 transition-all group">
                          <td className="px-8 py-5">
                             <p className="text-[12pt] font-black text-gray-800 group-hover:text-blue-600 leading-tight">{it.name}</p>
                             <p className="text-[9pt] text-gray-400 font-medium mt-0.5">Tiêu chuẩn: TCVN 6306-1:2015</p>
                          </td>
                          <td className="px-6 py-5 text-center text-gray-400 font-black">{it.unit}</td>
                          <td className="px-6 py-5 text-center font-mono font-black text-[13pt] text-blue-600">
                             {detailForm.mode !== 'view' ? (
                               <input type="text" defaultValue={it.value} className="w-24 px-2 py-1 bg-white border border-gray-100 rounded text-center focus:border-blue-500 outline-none" />
                             ) : (
                               it.value
                             )}
                          </td>
                          <td className="px-6 py-5 text-center text-gray-500 font-bold text-[10pt]">{it.limit}</td>
                          <td className="px-8 py-5 text-center">
                            <span className={`px-3 py-1 rounded-full text-[9pt] font-black uppercase ${it.eval === 'Đạt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{it.eval}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'attachments' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h4 className="text-[11pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Camera className="w-5 h-5 text-blue-600" /> Hình ảnh hiện trường
                       </h4>
                       <span className="text-[9pt] font-bold text-gray-400 uppercase tracking-widest">{test.images?.length || 0} Ảnh</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                       {test.images?.map((img: string, i: number) => (
                         <div key={i} className="aspect-[4/3] bg-white rounded-3xl overflow-hidden border border-gray-100 group relative shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-zoom-in" referrerPolicy="no-referrer" onClick={() => setPreviewContent({ type: 'image', url: img, name: 'Ảnh hiện trường' })} alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                               <p className="text-white font-black text-[9pt] uppercase tracking-widest mb-1">Ảnh hiện trường {i+1}</p>
                               <p className="text-white/70 text-[8pt] font-bold">Thực hiện: {test.time}</p>
                            </div>
                         </div>
                       ))}
                    </div>

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
                 
                 <div className="space-y-4 pt-8 border-t border-gray-100">
                    <h4 className="text-[11pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <FileText className="w-5 h-5 text-red-500" /> Tài liệu đính kèm
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                       {test.attachments?.map((at: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 group hover:border-blue-200 hover:shadow-xl transition-all shadow-sm">
                             <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shadow-inner group-hover:bg-red-100 transition-colors">
                                   <FileText className="w-7 h-7 text-red-600" />
                                </div>
                                <div>
                                   <p className="text-[11pt] font-black text-gray-800 line-clamp-1">{at.name}</p>
                                   <p className="text-[9pt] text-gray-400 font-black uppercase tracking-tighter mt-1">{at.size} • PDF Document</p>
                                </div>
                             </div>
                             <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#164399] hover:text-white transition-all shadow-sm">
                                <Download className="w-5 h-5" />
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'signing' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                 <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Lịch sử ký số & Phê duyệt
                 </h4>
                 <div className="space-y-4">
                    {test.signing?.map((s: any, i: number) => (
                       <div key={i} className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-gray-100 relative group hover:border-green-100 hover:shadow-lg transition-all shadow-sm overflow-hidden">
                          {s.status === 'Đã ký' && (
                             <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                          )}
                          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 text-[#164399] flex items-center justify-center font-black text-[11pt] shadow-inner italic z-10">{i+1}</div>
                          <div className="flex-1 z-10">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-[9pt] font-black text-[#164399] uppercase tracking-widest">{s.role}</span>
                                <span className="text-[9pt] font-bold text-gray-400 font-mono">{s.time || 'Đang chờ ký...'}</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <span className="text-[14pt] font-black text-gray-800">{s.name}</span>
                                <span className={`px-3 py-1 rounded-full text-[9pt] font-black uppercase tracking-widest shadow-sm ${s.status === 'Đã ký' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700 animate-pulse'}`}>{s.status}</span>
                             </div>
                          </div>
                          {s.status === 'Đã ký' && (
                             <div className="w-24 h-12 border-2 border-green-500/30 rounded-xl flex items-center justify-center bg-white rotate-[-8deg] z-10 shadow-sm">
                                <span className="text-green-500 font-black text-[9pt] uppercase tracking-tighter italic">Verified</span>
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h4 className="text-[11pt] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                 <Settings className="w-4 h-4" /> Thao tác
              </h4>
              <div className="grid grid-cols-1 gap-2">
                 <button className="w-full py-3 bg-[#164399] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all">
                    <Printer className="w-4 h-4" /> IN BIÊN BẢN
                 </button>
                 <button className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                    <Download className="w-4 h-4" /> TẢI PDF
                 </button>
                 <button className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                    <Share2 className="w-4 h-4" /> CHIA SẺ
                 </button>
              </div>
           </div>

           <div className="bg-[#164399] p-8 rounded-2xl shadow-xl shadow-blue-100 space-y-4 relative overflow-hidden group">
              <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                 <CheckCircle2 className="w-40 h-40 text-white" />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                 </div>
                 <h4 className="text-white font-black text-[14pt] uppercase tracking-tighter">Biên bản đã xác thực</h4>
                 <p className="text-blue-100/80 text-[10pt] font-medium mt-1 leading-tight">Hồ sơ đã được ký số đầy đủ bởi các bên liên quan và có giá trị pháp lý.</p>
                 <div className="mt-6 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20 w-full justify-center">
                    <Eye className="w-4 h-4 text-white" />
                    <span className="text-white text-[9pt] font-bold uppercase">Xem Chứng thư số</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const InfoIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
