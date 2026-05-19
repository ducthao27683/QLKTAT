import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, Info, ClipboardList, Package, Shield, User, Database, Upload, FileText, Download, Trash2, Calendar, ChevronRight, AlertTriangle, Camera, FlaskConical, Filter, Clock, ExternalLink } from 'lucide-react';
import { MOCK_TESTING_DATA } from '../constants';
import { DesignTooltip } from '../../../components/DesignTooltip';

interface KetQuaThiNghiemScreenProps {
  setActiveSubMenu: (menu: string | null) => void;
  setPreviewContent: (content: { type: string; url: string; name: string } | null) => void;
  setDetailForm: (form: any) => void;
  devicePath: string[];
  activeUnit: string;
}

export const KetQuaThiNghiemScreen = ({
  setActiveSubMenu,
  setPreviewContent,
  setDetailForm,
  devicePath,
  activeUnit
}: KetQuaThiNghiemScreenProps) => {
  const [selectedTestingId, setSelectedTestingId] = useState<number | null>(MOCK_TESTING_DATA[0]?.id || null);
  const [testingDetailTab, setTestingDetailTab] = useState<'info' | 'result' | 'attachments' | 'signing'>('info');
  const [showFilter, setShowFilter] = useState(false);

  const filteredTests = React.useMemo(() => {
    let result = MOCK_TESTING_DATA;

    // Filter by Active Unit
    if (activeUnit && activeUnit !== "Công ty Điện lực Hưng Yên") {
       // Simulate filtering by unit
       result = result.filter(t => t.id % (activeUnit.length % 3 + 2) !== 0);
    }

    // Filter by Device Path
    if (devicePath && devicePath.length > 1) {
      const currentDeviceName = devicePath[devicePath.length - 1];
      const isDevice = devicePath.length > 2;
      
      if (isDevice) {
        result = result.filter(t => 
          t.device.toLowerCase().includes(currentDeviceName.toLowerCase())
        );
      }
    }
    
    return result;
  }, [devicePath, activeUnit]);

  const test = filteredTests.find(t => t.id === selectedTestingId) || filteredTests[0];

  React.useEffect(() => {
    if (filteredTests.length > 0 && (!selectedTestingId || !filteredTests.find(t => t.id === selectedTestingId))) {
      setSelectedTestingId(filteredTests[0].id);
    }
  }, [filteredTests]);

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
                <span className="font-bold text-[#164399]">- Biên bản kết quả</span>
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`p-2 rounded-[10px] border transition-all ${showFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
              title="Ẩn/Hiện thanh lọc"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setDetailForm({ type: 'test_report', mode: 'add', data: { device: devicePath[devicePath.length - 1] || 'Thiết bị mới', signing: [] } })}
              className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-[10px] text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-[10px] animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9pt] font-bold text-gray-400 uppercase">Trạng thái</label>
                <select className="px-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-bold text-gray-700 focus:outline-none focus:border-blue-500 shadow-sm min-w-[150px] appearance-none">
                  <option>Tất cả</option>
                  <option>Đã hoàn thành</option>
                  <option>Đang thực hiện</option>
                  <option>Mới tạo</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9pt] font-bold text-gray-400 uppercase">Phân loại</label>
                <select className="px-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-bold text-gray-700 focus:outline-none focus:border-blue-500 shadow-sm min-w-[150px] appearance-none">
                  <option>Tất cả</option>
                  <option>Định kỳ</option>
                  <option>Sửa chữa</option>
                  <option>Sau sự cố</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[300px]">
              <label className="text-[9pt] font-bold text-gray-400 uppercase">Tìm nhanh biên bản</label>
              <div className="relative group/search">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-blue-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Mã biên bản, tên thiết bị, người chủ trì..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-bold focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
            <button className="text-[10pt] font-bold text-blue-600 hover:underline">Xóa tất cả bộ lọc</button>
          </div>
        )}
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Records List */}
        <div className="w-1/2 border-r border-gray-100 flex flex-col bg-gray-50/20">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {filteredTests.map((atest) => {
              const isSelected = selectedTestingId === atest.id;
              return (
                <div 
                  key={atest.id}
                  onClick={() => setSelectedTestingId(atest.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
                    isSelected 
                      ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                      : 'bg-white border-gray-100 hover:border-blue-100/60 shadow-sm'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9pt] font-black uppercase text-red-600 tracking-wider font-mono">BB-TN-00{atest.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[8pt] font-black uppercase tracking-tighter ${
                      atest.result === 'Đạt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>{atest.result}</span>
                  </div>
                  
                  <h3 className={`text-[11pt] font-bold mb-1 line-clamp-2 leading-tight transition-colors ${
  isSelected ? 'text-[#164399]' : 'text-[#164399] group-hover:text-blue-800'
}`}>
  Biên bản {atest.type} - {atest.device}
</h3>
                  
                  <p className="text-[10pt] text-gray-500 mb-3 flex items-center gap-1">
                    <FlaskConical className="w-3.5 h-3.5" />
                    Mã TB: {atest.device.split(' ')[0]}
                  </p>
                  
                  <div className="flex items-center justify-between text-[9pt] text-gray-400 font-bold uppercase">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {atest.time.split(' ')[0]}
                      </div>
                    </div>
                    <span className="text-gray-300">CT: {atest.leader}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Pagination */}
          <div className="p-3 border-t border-gray-100 bg-white flex items-center justify-between text-[10pt] font-bold text-gray-400 shrink-0">
             <button className="px-3 py-1 hover:bg-gray-50 rounded border border-gray-100 text-gray-400 cursor-not-allowed uppercase">Trước</button>
             <div className="flex items-center gap-2">
                <span className="text-blue-600">1</span>
                <span>/</span>
                <span>12</span>
             </div>
             <button className="px-3 py-1 hover:bg-blue-50 rounded border border-blue-100 text-blue-600 uppercase">Tiếp</button>
          </div>
        </div>

        {/* Right: Record Detail */}
        <div className="w-1/2 flex flex-col bg-white overflow-hidden">
          {test ? (
            <>
              <div className="flex border-b border-gray-100 shrink-0 bg-white shadow-sm">
                {[
                  { id: 'info', label: 'Thông tin chung' },
                  { id: 'result', label: 'Kết quả đo' },
                  { id: 'attachments', label: 'Đính kèm' },
                  { id: 'signing', label: 'Ký duyệt' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setTestingDetailTab(tab.id as any)}
                    className={`flex-1 h-12 text-[12pt] font-bold transition-all relative ${
                      testingDetailTab === tab.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                    {testingDetailTab === tab.id && (
                      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {testingDetailTab === 'info' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[9pt] font-black text-red-600 uppercase tracking-widest font-mono mb-1">Biên bản: BB-TN-00{test.id}</p>
                        <h4 className="text-[15pt] font-black text-[#164399] leading-snug uppercase tracking-tight">{test.device}</h4>
                      </div>
                      <button 
                        onClick={() => setDetailForm({ type: 'test_report', mode: 'view', data: test })}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-[10pt] hover:bg-blue-100 transition-all flex items-center gap-2 whitespace-nowrap shadow-sm border border-blue-100"
                      >
                        <ExternalLink className="w-4 h-4" /> Xem chi tiết
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4">
                        <p className="text-[9pt] font-black text-gray-400 uppercase mb-2">Đơn vị & Nhân sự</p>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm"><Database className="w-5 h-5"/></div>
                            <div>
                              <p className="text-[9pt] text-gray-400 font-bold uppercase leading-none">Đội thực hiện</p>
                              <p className="text-[11pt] font-bold text-gray-800">{test.team}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-green-600 shadow-sm"><User className="w-5 h-5"/></div>
                            <div>
                              <p className="text-[9pt] text-gray-400 font-bold uppercase leading-none">Người chủ trì</p>
                              <p className="text-[11pt] font-bold text-gray-800">{test.leader}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 flex flex-col justify-center items-center text-center gap-1">
                        <p className="text-[9pt] font-black text-gray-400 uppercase mb-2">Đánh giá chung</p>
                        <div className={`text-[24pt] font-black uppercase ${test.result === 'Đạt' ? 'text-green-600' : 'text-red-500'}`}>
                          {test.result}
                        </div>
                        <p className="text-[10pt] text-gray-400 font-medium italic">Ngày cập nhật: {test.time}</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="text-[9pt] font-black text-gray-400 uppercase mb-4">Thông tin kề hoạch liên kết</p>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[9pt] text-gray-400 font-bold uppercase mb-1">Thuộc Kế hoạch/Yêu cầu</p>
                          <div className="text-[12pt] font-bold text-[#164399] flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-[#164399] rounded-full"></div>
                             {test.project}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[9pt] text-gray-400 font-bold uppercase mb-1">Loại hình thí nghiệm</p>
                            <p className="text-[11pt] font-bold text-gray-700">{test.type}</p>
                          </div>
                          <div>
                            <p className="text-[9pt] text-gray-400 font-bold uppercase mb-1">Điều kiện môi trường</p>
                            <p className="text-[11pt] font-medium text-gray-600 italic">{test.condition}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {testingDetailTab === 'result' && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                      <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                         <h5 className="text-[11pt] font-bold text-gray-700 uppercase tracking-tight">Tóm tắt kết quả theo thiết bị</h5>
                         <span className="text-[9pt] text-gray-400 font-bold italic">Danh sách thiết bị trong biên bản</span>
                      </div>
                      <table className="w-full text-left">
                        <thead className="bg-[#164399]/5 text-[#164399] text-[9pt] font-bold uppercase tracking-widest">
                          <tr>
                            <th className="px-6 py-4">Tên thiết bị</th>
                            <th className="px-6 py-4 text-center">Hạng mục chính</th>
                            <th className="px-6 py-4 w-32 text-center">Trị số đo</th>
                            <th className="px-6 py-4 w-24 text-center">ĐG</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {[
                            { name: test.device, item: 'Điện trở cách điện', val: '2500 MΩ', eval: 'Đạt' },
                            { name: test.device + ' (Phase A)', item: 'Tỷ số biến', val: '1.02', eval: 'Đạt' },
                            { name: test.device + ' (Phase B)', item: 'Tỷ số biến', val: '1.01', eval: 'Đạt' },
                            { name: test.device + ' (Phase C)', item: 'Tỷ số biến', val: '1.01', eval: 'Đạt' },
                          ].map((it, i) => (
                            <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                              <td className="px-6 py-3.5 text-[11pt] font-bold text-gray-700">{it.name}</td>
                              <td className="px-6 py-3.5 text-center text-gray-500 font-medium">{it.item}</td>
                              <td className="px-6 py-3.5 text-center font-black text-blue-600">{it.val}</td>
                              <td className="px-6 py-3.5 text-center">
                                <span className={`text-[9pt] font-black uppercase ${it.eval === 'Đạt' ? 'text-green-600' : 'text-red-500'}`}>{it.eval}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                      <div className="p-4 bg-gray-50 border-b border-gray-100">
                         <h5 className="text-[11pt] font-bold text-gray-700 uppercase tracking-tight">Chi tiết hạng mục thí nghiệm</h5>
                      </div>
                      <table className="w-full text-left">
                        <thead className="bg-[#164399] text-white text-[9pt] font-bold uppercase tracking-widest">
                          <tr>
                            <th className="px-6 py-4">Hạng mục thí nghiệm</th>
                            <th className="px-6 py-4 w-24 text-center">ĐVT</th>
                            <th className="px-6 py-4 w-32 text-center">Trị số đo</th>
                            <th className="px-6 py-4 w-32 text-center">Quy định</th>
                            <th className="px-6 py-4 w-24 text-center">ĐG</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {test.items.map((it, i) => (
                            <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                              <td className="px-6 py-3.5 text-[11pt] font-bold text-gray-700">{it.name}</td>
                              <td className="px-6 py-3.5 text-center text-gray-400 font-bold">{it.unit}</td>
                              <td className="px-6 py-3.5 text-center font-black text-blue-600">{it.value}</td>
                              <td className="px-6 py-3.5 text-center text-gray-500 italic text-[10pt]">{it.limit}</td>
                              <td className="px-6 py-3.5 text-center">
                                <span className={`text-[9pt] font-black uppercase ${it.eval === 'Đạt' ? 'text-green-600' : 'text-red-500'}`}>{it.eval}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {testingDetailTab === 'attachments' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4">
                      {test.images.map((img, i) => (
                        <div key={i} className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group relative">
                          <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" onClick={() => setPreviewContent({ type: 'image', url: img, name: 'Ảnh hiện trường' })} alt="" />
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      ))}
                      <div className="aspect-square border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-blue-200 transition-all cursor-pointer">
                        <Camera className="w-6 h-6 mb-1" />
                        <span className="text-[8pt] font-black uppercase">Thêm ảnh</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10pt] font-bold text-gray-400 uppercase tracking-tight pl-1">Hồ sơ pháp lý đính kèm</p>
                      {test.attachments.map((at, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm"><FileText className="w-5 h-5" /></div>
                            <div>
                              <p className="text-[11pt] font-bold text-gray-700">{at.name}</p>
                              <p className="text-[9pt] text-gray-400 font-bold">{at.size} • PDF Document</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Download className="w-4 h-4"/></button>
                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {testingDetailTab === 'signing' && (
                  <div className="space-y-4">
                    <p className="text-[10pt] font-bold text-gray-400 uppercase tracking-tight pl-1 mb-4">Tiến độ ký duyệt biên bản</p>
                    {test.signing.map((s, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 group relative overflow-hidden">
                        {s.status === 'Đã ký' && (
                           <div className="absolute right-[-10px] top-[-10px] w-12 h-12 bg-green-500/10 rounded-full blur-md"></div>
                        )}
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-100 text-[#164399] flex items-center justify-center font-black text-[10pt] shadow-sm italic z-10">{i+1}</div>
                        <div className="flex-1 z-10">
                          <div className="flex justify-between mb-0.5">
                            <span className="text-[8pt] font-black text-[#164399] uppercase tracking-wider">{s.role}</span>
                            <span className="text-[8pt] font-bold text-gray-400">{s.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11pt] font-bold text-gray-700">{s.name}</span>
                            <span className={`text-[8pt] font-black px-1.5 py-0.5 rounded ${s.status === 'Đã ký' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{s.status}</span>
                          </div>
                        </div>
                        {s.status === 'Đã ký' && (
                           <div className="w-16 h-8 border-2 border-green-300 rounded flex items-center justify-center bg-white rotate-[-12deg] z-10">
                             <span className="text-green-500 font-black text-[7pt] uppercase tracking-tighter">Verified</span>
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-12 text-center">
              <ClipboardList className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-[12pt] font-bold">Chọn một biên bản từ danh sách bên trái để xem nội dung nhanh.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
