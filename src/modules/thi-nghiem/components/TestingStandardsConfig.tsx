import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, ListOrdered, FileText } from 'lucide-react';

export const normalizeType = (type: string) => {
  const t = type?.toUpperCase();
  if (t === 'TBA' || t === 'TRẠM') return 'Trạm';
  if (t === 'ĐD' || t === 'ĐƯỜNG DÂY') return 'Đường dây';
  if (t === 'MC' || t === 'MÁY CẮT') return 'Máy cắt';
  if (t === 'MBA' || t === 'MÁY BIẾN ÁP') return 'Máy biến áp';
  if (t === 'TI' || t === 'BIẾN DÒNG' || t === 'BIẾN DÒNG ĐIỆN') return 'Biến dòng';
  if (t === 'TU' || t === 'BIẾN ĐIỆN ÁP') return 'Biến điện áp';
  if (t === 'DCL' || t === 'DAO CÁCH LY') return 'Dao cách ly';
  if (t === 'CSV' || t === 'CHỐNG SÉT VAN') return 'Chống sét van';
  if (t === 'TU-TI') return 'TU-TI';
  return type || 'Máy biến áp';
};

export const CONFIGURED_STANDARDS_TYPES = [
  'MBA', 'MÁY BIẾN ÁP', 'TRẠM', 'MC', 'MÁY CẮT', 'TI', 
  'BIẾN DÒNG', 'BIẾN DÒNG ĐIỆN', 'TU', 'BIẾN ĐIỆN ÁP', 
  'CSV', 'CHỐNG SÉT VAN', 'ĐD', 'ĐƯỜNG DÂY'
];

export const hasStandardsConfigured = (type: string): boolean => {
  if (!type) return false;
  return CONFIGURED_STANDARDS_TYPES.includes(type.toUpperCase());
};

export const getStandardsForType = (type: string) => {
  const t = type?.toUpperCase() || 'MBA';
  if (t === 'MBA' || t === 'MÁY BIẾN ÁP' || t === 'TRẠM') {
    return [
      { id: 'S1', name: 'Đo điện trở cách điện cuộn dây (R60)', unit: 'MΩ', limit: '≥ 2005', standard: 'TCVN 1985-2015' },
      { id: 'S2', name: 'Đo tỷ số biến áp (Tỉ số biến)', unit: '%', limit: '≤ 0.5', standard: 'IEC 60076' },
      { id: 'S3', name: 'Đo điện trở một chiều các cuộn dây', unit: 'mΩ', limit: '≤ 13.0', standard: 'IEEE C57.152' },
      { id: 'S4', name: 'Thử độ bền điện môi dầu cách điện', unit: 'kV', limit: '≥ 35', standard: 'TCVN 7447' },
      { id: 'S5', name: 'Đo chiết suất & hàm lượng ẩm dầu', unit: 'ppm', limit: '≤ 15', standard: 'IEC 60076-1' }
    ];
  }
  if (t === 'MC' || t === 'MÁY CẮT') {
    return [
      { id: 'S1', name: 'Đo điện trở tiếp xúc cực tiếp điểm chính', unit: 'μΩ', limit: '≤ 50', standard: 'IEC 62271-100' },
      { id: 'S2', name: 'Đo thời gian đóng cắt đồng thời (3 pha)', unit: 'ms', limit: '≤ 45', standard: 'IEEE C37.09' },
      { id: 'S3', name: 'Kiểm tra độ dòng rò rỉ cơ học', unit: 'MΩ', limit: '≥ 5000', standard: 'TCVN 5767' },
      { id: 'S4', name: 'Thử nghiệm áp lực cơ cấu nén lò xo (SF6)', unit: 'MPa', limit: '0.55 ± 0.02', standard: 'NSX standard' }
    ];
  }
  if (t === 'TI' || t === 'BIẾN DÒNG' || t === 'BIẾN DÒNG ĐIỆN') {
    return [
      { id: 'S1', name: 'Đo điện trở cách điện cuộn dây sơ/thứ cấp', unit: 'MΩ', limit: '≥ 1000', standard: 'IEC 61869' },
      { id: 'S2', name: 'Đo góc sai số tỉ số biến dòng (Accuracy class)', unit: '%', limit: '≤ 0.5 (Cl 0.5)', standard: 'TCVN 11845' },
      { id: 'S3', name: 'Kiểm tra đặc tính từ hóa của lõi từ', unit: 'V/A', limit: 'Đặc tuyến bão hòa', standard: 'IEC 61869-2' }
    ];
  }
  if (t === 'TU' || t === 'BIẾN ĐIỆN ÁP') {
    return [
      { id: 'S1', name: 'Đo điện trở cách điện cuộn dây', unit: 'MΩ', limit: '≥ 1000', standard: 'IEC 61869' },
      { id: 'S2', name: 'Thử nghiệm tổn hao điện môi cuộn dây tgδ', unit: '%', limit: '≤ 1.0', standard: 'IEC 60137' },
      { id: 'S3', name: 'Đo tỷ số điện áp biến đổi tỉ lệ', unit: '%', limit: '≤ 0.5 (Cl 0.5)', standard: 'IEEE C57.13' }
    ];
  }
  if (t === 'CSV' || t === 'CHỐNG SÉT VAN') {
    return [
      { id: 'S1', name: 'Đo dòng rò xoay chiều dưới điện áp cực đại', unit: 'μA', limit: '≤ 150', standard: 'IEC 60099-4' },
      { id: 'S2', name: 'Đo điện trở cách điện vỏ sứ và van cách điện', unit: 'MΩ', limit: '≥ 2500', standard: 'TCVN 8097' },
      { id: 'S3', name: 'Kiểm tra thông số kỹ thuật bộ đếm sét', unit: 'Lần', limit: 'Hoạt động nhạy', standard: 'NSX standard' }
    ];
  }
  if (t === 'ĐD' || t === 'ĐƯỜNG DÂY') {
    return [
      { id: 'S1', name: 'Kiểm tra khoảng cách pha-phòng an toàn', unit: 'm', limit: '≥ Quy chuẩn QCVN', standard: 'QCVN 01:2020/BCT' },
      { id: 'S2', name: 'Đo trị số điện trở nối đất cột sắt/cột bê tông', unit: 'Ω', limit: '≤ 10', standard: 'TCVN 4756:1989' },
      { id: 'S3', name: 'Đo điện trở tiếp xúc của mối nối lèo dây', unit: 'μΩ', limit: '≤ 1.2 lần dây nguyên', standard: 'Quy trình EVN' }
    ];
  }
  
  return [];
};

export interface TestingStandardsConfigProps {
  mode: 'view' | 'edit' | 'create';
  deviceType: string;
  enabledForms?: string[];
  standardsUse?: Record<string, Record<string, boolean>>;
  standardsNotes?: Record<string, Record<string, string>>;
  onUpdateStandardsUse?: (formName: string, usedStates: Record<string, boolean>) => void;
  onUpdateStandardsNotes?: (formName: string, notesStates: Record<string, string>) => void;
}

export const TestingStandardsConfig: React.FC<TestingStandardsConfigProps> = ({
  mode,
  deviceType,
  enabledForms = ['Thí nghiệm', 'Kiểm định'],
  standardsUse = {},
  standardsNotes = {},
  onUpdateStandardsUse,
  onUpdateStandardsNotes
}) => {
  const normType = normalizeType(deviceType);
  const items = getStandardsForType(deviceType);
  const [activeItemMap, setActiveItemMap] = useState<Record<string, string>>({});

  if (!hasStandardsConfigured(deviceType) || items.length === 0) {
    return (
      <div className="lg:col-span-2 p-12 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-[#f0f4fa] rounded-full flex items-center justify-center mx-auto text-[#164399]/40 border border-[#164399]/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-[12pt] font-black text-gray-700 uppercase tracking-tight">Cấu hình hạng mục kiểm tra</h4>
          <p className="text-[10pt] font-semibold text-gray-500 leading-relaxed">
            Loại thiết bị này chưa có thiết lập
          </p>
          <div className="pt-2">
            <span className="px-3 py-1 text-[8.5pt] font-black text-slate-500 bg-slate-50 border border-gray-200 rounded-lg">
              Loại: {normType}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 space-y-8 animate-in fade-in duration-300">
      {enabledForms.map((formName: string) => {
        const usedStates = standardsUse[formName] || {};
        const notesStates = standardsNotes[formName] || {};
        
        const activeItemId = activeItemMap[formName] || items[0]?.id;
        const activeItem = items.find(i => i.id === activeItemId);
        
        // Helper to check if an item is fully "used" (since we only have 1 param per item, it's just the item's state)
        // If undefined, it defaults to true (used).
        const toggleItem = (itemId: string, checked: boolean) => {
          if (mode === 'view') return;
          const newUsedStates = {
            ...usedStates,
            [itemId]: checked
          };
          if (onUpdateStandardsUse) {
            onUpdateStandardsUse(formName, newUsedStates);
          }
        };
        
        const updateNote = (itemId: string, note: string) => {
          if (mode === 'view') return;
          const newNotesStates = {
            ...notesStates,
            [itemId]: note
          };
          if (onUpdateStandardsNotes) {
            onUpdateStandardsNotes(formName, newNotesStates);
          }
        };
        
        return (
          <div key={formName} className="bg-white rounded-xl border border-gray-100 shadow-sm p-0 overflow-hidden flex flex-col items-stretch text-left animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-slate-50/50 flex-wrap gap-2 shrink-0">
              <h3 className="text-[11pt] font-black flex items-center gap-2 flex-wrap">
                <CheckCircle2 className="w-5 h-5 text-[#164399]" />
                <span className="text-gray-700 uppercase tracking-wider">{formName}:</span>
                <span className="text-gray-700 uppercase tracking-wider">Danh sách hạng mục kiểm tra</span>
              </h3>
              <span className="text-[8.5pt] font-black text-gray-500 bg-white uppercase px-3 py-1 rounded-full border border-gray-200 shadow-xs">
                Loại thiết bị: <span className="text-[#164399]">{normType}</span>
              </span>
            </div>

            {/* Split Content: 2 Columns */}
            <div className="flex flex-col md:flex-row h-full min-h-[400px]">
              
              {/* Left Column: Danh sách hạng mục */}
              <div className="w-full md:w-5/12 border-r border-gray-100 flex flex-col bg-slate-50/20">
                <div className="p-3 bg-[#eaf0fa]/50 border-b border-gray-200">
                  <h4 className="text-[9pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <ListOrdered className="w-4 h-4" /> Danh sách hạng mục
                  </h4>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#f0f4fa] sticky top-0 z-10 text-slate-500 font-bold text-[8pt] uppercase tracking-wider">
                      <tr>
                        <th className="px-3 py-3 w-10 text-center">Sử dụng</th>
                        <th className="px-3 py-3 w-10 text-center">STT</th>
                        <th className="px-3 py-3 text-left">Tên hạng mục</th>
                        <th className="px-2 py-3 w-28 text-center">Đ.Giá</th>
                        <th className="px-2 py-3 w-14 text-center">Cấp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[9pt] font-semibold text-slate-700">
                      {items.map((item, idx) => {
                        const isSelected = activeItemId === item.id;
                        // Determine if it has any used param. Since 1 item = 1 param, we check its own state.
                        const isUsed = usedStates[item.id] !== false;
                        
                        return (
                          <tr 
                            key={item.id}
                            onClick={() => setActiveItemMap(prev => ({ ...prev, [formName]: item.id }))}
                            className={`cursor-pointer transition-colors ${
                              isSelected 
                                ? 'bg-blue-50/60 text-[#164399]' 
                                : 'hover:bg-slate-50/80 bg-white'
                            }`}
                          >
                            <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                disabled={mode === 'view'}
                                checked={isUsed}
                                onChange={(e) => toggleItem(item.id, e.target.checked)}
                                className="w-4 h-4 rounded text-[#164399] border-gray-300 focus:ring-[#164399] cursor-pointer"
                              />
                            </td>
                            <td className="px-3 py-3 text-center font-mono font-black text-slate-400">{idx + 1}</td>
                            <td className="px-3 py-3">
                              <div className={`font-bold ${isSelected ? 'text-[#164399] font-black' : 'text-slate-700'}`}>
                                {item.name}
                              </div>
                            </td>
                            <td className="px-2 py-3 text-center text-[7.5pt]">
                              <span className={`px-1.5 py-0.5 rounded border font-bold ${
                                item.unit !== 'mΩ' && item.unit !== 'μΩ' && item.unit !== 'μA'
                                  ? 'bg-orange-50 text-orange-700 border-orange-100'
                                  : 'bg-green-50 text-green-700 border-green-100'
                              }`}>
                                {item.unit !== 'mΩ' && item.unit !== 'μΩ' && item.unit !== 'μA' ? 'Đạt/K.Đạt' : 'Nhập Text'}
                              </span>
                            </td>
                            <td className="px-2 py-3 text-center">
                              <span className="px-1.5 py-0.5 bg-red-50 text-red-700 rounded border border-red-100 text-[7.5pt] font-extrabold uppercase">
                                EVN
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Bảng Thông số chi tiết */}
              <div className="w-full md:w-7/12 flex flex-col bg-white hidden md:flex">
                <div className="p-3 bg-white border-b border-gray-100 flex items-center justify-between">
                  <h4 className="text-[9pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Thông số chi tiết 
                    {activeItem && <span className="lowercase text-slate-500 font-medium">({activeItem.name})</span>}
                  </h4>
                </div>
                
                <div className="flex-1 p-0 overflow-y-auto">
                  {activeItem ? (
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 sticky top-0 z-10 text-slate-500 font-bold text-[8pt] uppercase tracking-wider shadow-sm">
                        <tr>
                          <th className="px-3 py-3 w-16 text-center" title="Sử dụng tham số này">Sử dụng</th>
                          <th className="px-3 py-3 w-12 text-center">STT</th>
                          <th className="px-3 py-3 text-left">Tên thông số - ĐVT - Kiểu đo</th>
                          <th className="px-3 py-3 w-40 text-center">Giới hạn - Tiêu chuẩn</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-[9pt] font-semibold text-slate-700">
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-4 text-center">
                            <input
                              type="checkbox"
                              disabled={mode === 'view'}
                              checked={usedStates[activeItem.id] !== false}
                              onChange={(e) => toggleItem(activeItem.id, e.target.checked)}
                              className="w-4 h-4 rounded text-[#164399] border-gray-300 focus:ring-[#164399] cursor-pointer"
                            />
                          </td>
                          <td className="px-3 py-4 text-center font-mono font-black text-slate-400">1</td>
                          <td className="px-3 py-4">
                            <div className="font-bold text-slate-800">
                              Đo thông số {activeItem.name.toLowerCase()}
                            </div>
                            <div className="text-[8.5pt] mt-1 space-x-2">
                              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">{activeItem.unit}</span>
                              <span className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 italic">Kiểu đo mặc định</span>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-center">
                            <div className="inline-flex flex-col items-center justify-center gap-1">
                              <span className="text-[8.5pt] font-black px-2 py-0.5 border border-slate-200 rounded-[8px] bg-white font-mono text-slate-600 block shadow-sm">
                                {activeItem.limit}
                              </span>
                              <span className="text-[7.5pt] font-bold text-slate-400">
                                {activeItem.standard}
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-[9pt] italic">
                      Chọn một hạng mục bên trái để xem thông số chi tiết
                    </div>
                  )}
                </div>
              </div>
              
              {/* Mobile placeholder for right column */}
              <div className="w-full p-4 border-t border-gray-100 flex flex-col md:hidden items-center justify-center text-slate-400 text-[9pt] italic bg-slate-50">
                <span>Vui lòng xem trên màn hình lớn hơn để cấu hình thông số chi tiết</span>
              </div>
              
            </div>
          </div>
        );
      })}
    </div>
  );
};
