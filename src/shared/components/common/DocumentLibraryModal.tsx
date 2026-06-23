import React, { useState } from 'react';
import { Database, Search, X, BookOpen, Check, FileText, Plus, Upload, Paperclip } from 'lucide-react';

export interface LibraryDocument {
  id: string;
  name: string;
  category: string;
  type: string;
  size: string;
  code: string;
  desc?: string;
}

export const STANDARD_LIBRARY_DOCUMENTS: LibraryDocument[] = [
  { id: 'D1', name: 'QCVN 01:2020/BCT - Quy chuẩn kỹ thuật quốc gia về an toàn điện', category: 'quy-chuan', type: 'Quy chuẩn', size: '2.8 MB', code: 'QCVN 01:2020', desc: 'Quy chuẩn quốc gia về an toàn lưới điện' },
  { id: 'D2', name: 'TCVN 1985:2015 - Thử nghiệm và nghiệm thu máy biến áp lực', category: 'quy-chuan', type: 'TCVN', size: '1.4 MB', code: 'TCVN 1985', desc: 'Quy chuẩn quốc gia kiểm nghiệm máy biến tải lực' },
  { id: 'D3', name: 'Thông tư 33/2015/TT-BCT - Quy định về kiểm định an toàn thiết bị, dụng cụ điện', category: 'quy-chuan', type: 'Thông tư', size: '1.2 MB', code: 'TT 33/2015', desc: 'Thông tư Bộ Công Thương về quy phạm an toàn điện' },
  { id: 'D4', name: 'Quy trình thí nghiệm Máy biến áp lực trạm 110kV-500kV - EVN 2023', category: 'quy-trinh', type: 'Quy trình EVN', size: '4.5 MB', code: 'QT-MBA-EVN', desc: 'Quy trình chính thống cho máy biến áp lưới trạm' },
  { id: 'D5', name: 'Quy trình bảo dưỡng thí nghiệm Máy cắt SF6 cấp điện thế 110kV - EVN', category: 'quy-trinh', type: 'Quy trình EVN', size: '3.1 MB', code: 'QT-MC-SF6', desc: 'Các bước thao tác bảo quản máy cắt cách điện khí SF6' },
  { id: 'D6', name: 'Hướng dẫn kiểm thử và bảo trì Hệ thống đo biến dòng TI - EVN SPC', category: 'quy-trinh', type: 'Hướng dẫn EVN', size: '2.2 MB', code: 'HD-TI-SPC', desc: 'Sổ tay bảo dưỡng đo đạc biến điện dòng TI miền Nam' },
  { id: 'D7', name: 'Hướng dẫn chuẩn hóa đo lường biến điện áp TU - EVN NPC', category: 'quy-trinh', type: 'Hướng dẫn EVN', size: '1.9 MB', code: 'HD-TU-NPC', desc: 'Sách hướng dẫn đo lường điện áp TU miền Bắc' },
  { id: 'D8', name: 'Sổ tay kỹ thuật vận hành và kiểm tra chống sét van (CSV)', category: 'huong-dan-nsx', type: 'Sách HD NSX', size: '5.2 MB', code: 'ST-CSV', desc: 'Bản hướng dẫn kỹ nghệ nhà sản xuất cho van chống sét' },
  { id: 'D9', name: 'Quy trình kiểm tra định kỳ hành lang an toàn và điện trở nối đất Đường dây', category: 'quy-trinh', type: 'Quy trình', size: '1.7 MB', code: 'QT-DD-ND', desc: 'Quy chuẩn thực tế hành lý đường cáp cao thế' },
  { id: 'D10', name: 'Biểu mẫu tiêu chuẩn kiểm tra trạm biến áp súc', category: 'bieu-mau', type: 'Biểu mẫu', size: '0.4 MB', code: 'BM-TBA', desc: 'Lập biểu báo cáo phục hồi thực địa trạm TBA' },
  { id: 'D11', name: 'Quy trình Kiểm định Trạm Biến Áp Điện 110kV đồng bộ', category: 'quy-chuan', type: 'Quy trình', size: '2.5 MB', code: 'QT-KĐ-TBA', desc: 'Trình tự thực thi kiểm định định điện từ đồng bộ' },
  { id: 'D12', name: 'Hướng dẫn hiệu chuẩn thiết bị đo dòng rò trạm biến áp', category: 'huong-dan-nsx', type: 'Hướng dẫn', size: '1.1 MB', code: 'HD-HC-TB', desc: 'Biên pháp đo dòng rò rỉ bọc chống sét van' }
];

export interface DocumentLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[]; // List of selected IDs or Names
  onToggleDoc: (doc: LibraryDocument) => void;
  // Visual config labels
  headerConfigLabel?: string;
  customDocumentsPool?: LibraryDocument[];
}

export const DocumentLibraryModal: React.FC<DocumentLibraryModalProps> = ({
  isOpen,
  onClose,
  selectedIds,
  onToggleDoc,
  headerConfigLabel,
  customDocumentsPool
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // States for adding custom documents
  const [customDocs, setCustomDocs] = useState<LibraryDocument[]>([]);
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [newDocFile, setNewDocFile] = useState<File | null>(null);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCode, setNewDocCode] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('');
  const [newDocDesc, setNewDocDesc] = useState('');

  if (!isOpen) return null;

  const basePool = customDocumentsPool || STANDARD_LIBRARY_DOCUMENTS;
  const pool = [...customDocs, ...basePool]; // Custom docs placed first so they are visible immediately

  const categories = [
    { id: 'all', name: 'Tất cả tài liệu' },
    { id: 'quy-chuan', name: 'Quy chuẩn, thông tư (QCVN/TCVN)' },
    { id: 'quy-trinh', name: 'Quy trình, Quy chuẩn EVN' },
    { id: 'huong-dan-nsx', name: 'Thư viện HD từ Nhà Sản Xuất' },
    { id: 'bieu-mau', name: 'Biểu mẫu thí nghiệm chuẩn' }
  ];

  const hasCustomCategory = basePool.some(item => 
    ['evn', 'nsx', 'standard', 'template'].includes(item.category)
  );

  const activeCategories = hasCustomCategory ? [
    { id: 'all', name: 'Tất cả' },
    { id: 'evn', name: 'Quy trình EVN' },
    { id: 'nsx', name: 'Bản vẽ & NSX' },
    { id: 'standard', name: 'Tiêu chuẩn' },
    { id: 'template', name: 'Mẫu biên bản' }
  ] : categories;

  // Filter pool based on category & search
  const filteredDocs = pool.filter(doc => {
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        (doc.code && doc.code.toLowerCase().includes(q)) ||
        (doc.desc && doc.desc.toLowerCase().includes(q)) ||
        (doc.type && doc.type.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 text-left">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/60 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5.5 h-5.5 text-[#164399]" />
            <div>
              <span className="text-[7.5pt] font-black text-gray-700 uppercase tracking-wider block">Thư viện tài liệu kỹ thuật EVN</span>
              <span className="text-[12pt] font-black text-slate-800 tracking-tight block">Chọn tài liệu kỹ thuật từ Thư viện hệ thống</span>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search & Config bar & Add File Button */}
        <div className="p-4 bg-slate-50/20 border-b border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[9.5pt] text-slate-500 font-bold">
              {headerConfigLabel ? (
                <span>Cấu hình hiện tại: <span className="text-[#164399] font-black">{headerConfigLabel}</span></span>
              ) : (
                <span>Thư viện dùng chung của hệ thống lưới điện truyền tải</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsAddingDoc(!isAddingDoc)}
              className="px-3 py-1.5 bg-blue-50 text-[#164399] hover:bg-[#164399]/10 rounded-xl text-[9pt] font-black transition-all border border-blue-100 flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Đính kèm mới
            </button>
            <div className="relative w-64 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm nhanh tài liệu..."
                className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-[9.5pt] font-semibold focus:outline-none focus:ring-2 focus:ring-[#164399]/15"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Categorization list */}
          <div className="w-[30%] border-r border-slate-200/60 bg-slate-50/55 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            <span className="text-[8.5pt] font-black text-gray-700 uppercase tracking-widest block mb-2 px-1">Danh mục</span>
            {activeCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-3.5 py-2.5 text-[9.5pt] font-black rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                  selectedCategory === cat.id 
                    ? 'bg-[#164399] text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-slate-200/50'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Right Column: Files List & New Document Form */}
          <div className="w-[70%] p-5 overflow-y-auto custom-scrollbar bg-white flex flex-col">
            
            {/* Input Form for Uploading Document */}
            {isAddingDoc && (
              <div className="mb-5 p-4 bg-slate-50/70 border border-blue-100 rounded-2xl space-y-4 animate-in slide-in-from-top-3 duration-200 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-[#164399]" />
                    Tải lên và đính kèm tài liệu mới
                  </span>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsAddingDoc(false);
                      setNewDocFile(null);
                    }}
                    className="text-[8.5pt] font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    Hủy tải lên
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Selector */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="flex items-center justify-center border border-dashed border-slate-200 hover:border-[#164399] bg-white rounded-xl py-3 cursor-pointer transition-colors group">
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setNewDocFile(file);
                            setNewDocName(file.name);
                          }
                        }}
                      />
                      <div className="text-center">
                        <Paperclip className="w-4 h-4 mx-auto text-gray-400 group-hover:text-[#164399]" />
                        <span className="text-[9pt] font-bold text-gray-500 group-hover:text-[#164399] mt-1 block">
                          {newDocFile ? `Đã chọn: ${newDocFile.name}` : "Đính kèm tệp PDF, Word, Excel..."}
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Tên tài liệu */}
                  <div className="space-y-1">
                    <label className="text-[8.5pt] font-bold text-slate-400 uppercase tracking-widest ml-1">Tên tài liệu <span className="text-red-500">*</span></label>
                    <input 
                      type="text"
                      className="w-full px-3 py-1.5 text-[9.5pt] font-semibold border border-slate-200 focus:border-blue-400 focus:outline-none rounded-xl"
                      placeholder="Tên tài liệu kỹ thuật"
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                    />
                  </div>

                  {/* Mã hiệu tài liệu */}
                  <div className="space-y-1">
                    <label className="text-[8.5pt] font-bold text-slate-400 uppercase tracking-widest ml-1">Mã / Số hiệu</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-1.5 text-[9.5pt] font-semibold border border-slate-200 focus:border-blue-400 focus:outline-none rounded-xl"
                      placeholder="Ví dụ: QT-MBA-EVN"
                      value={newDocCode}
                      onChange={(e) => setNewDocCode(e.target.value)}
                    />
                  </div>

                  {/* Loại tài liệu */}
                  <div className="space-y-1">
                    <label className="text-[8.5pt] font-bold text-slate-400 uppercase tracking-widest ml-1">Loại tài liệu</label>
                    {selectedCategory !== 'all' ? (
                      <div className="w-full px-3 py-1.5 text-[9.5pt] font-semibold border border-slate-100 bg-slate-100/50 text-slate-500 rounded-xl">
                        {activeCategories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                      </div>
                    ) : (
                      <select
                        className="w-full px-3 py-1.5 text-[9.5pt] font-semibold border border-slate-200 bg-white focus:border-blue-400 focus:outline-none rounded-xl"
                        value={newDocCategory}
                        onChange={(e) => setNewDocCategory(e.target.value)}
                      >
                        <option value="">-- Chọn loại tài liệu --</option>
                        {activeCategories.filter(c => c.id !== 'all').map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Mô tả ngắn */}
                  <div className="space-y-1">
                    <label className="text-[8.5pt] font-bold text-slate-400 uppercase tracking-widest ml-1">Mô tả ngắn</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-1.5 text-[9.5pt] font-semibold border border-slate-200 focus:border-blue-400 focus:outline-none rounded-xl"
                      placeholder="Quy chuẩn EVN, Hướng dẫn..."
                      value={newDocDesc}
                      onChange={(e) => setNewDocDesc(e.target.value)}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingDoc(false);
                        setNewDocFile(null);
                        setNewDocName('');
                        setNewDocCode('');
                        setNewDocCategory('');
                        setNewDocDesc('');
                      }}
                      className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-[9pt] transition-all cursor-pointer"
                    >
                      Bỏ qua
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newDocName.trim()) return;
                        const finalCat = selectedCategory !== 'all' ? selectedCategory : (newDocCategory || 'qy-chuan');
                        const catLabel = activeCategories.find(c => c.id === finalCat)?.name || 'Tài liệu hướng dẫn';
                        const newDoc: LibraryDocument = {
                          id: 'custom-' + Date.now(),
                          name: newDocName,
                          category: finalCat,
                          type: catLabel,
                          size: newDocFile ? `${(newDocFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
                          code: newDocCode || 'TL-EVN',
                          desc: newDocDesc || 'Tài liệu tải lên từ người dùng'
                        };

                        setCustomDocs(prev => [newDoc, ...prev]);
                        onToggleDoc(newDoc); // Auto-toggle selection key

                        // reset
                        setIsAddingDoc(false);
                        setNewDocFile(null);
                        setNewDocName('');
                        setNewDocCode('');
                        setNewDocCategory('');
                        setNewDocDesc('');
                      }}
                      className="px-4 py-1.5 bg-[#164399] hover:bg-blue-800 text-white font-black rounded-xl text-[9pt] transition-all cursor-pointer"
                    >
                      Lưu & Chọn
                    </button>
                  </div>
                </div>
              </div>
            )}

            <table className="w-full text-left border-collapse select-none">
              <thead className="bg-[#164399]/5 text-[#164399] text-[8.5pt] font-black uppercase tracking-wider border-b border-[#164399]/10 rounded-xl">
                <tr>
                  <th className="px-4 py-3 w-12 text-center">Chọn</th>
                  <th className="px-4 py-3">Tên tài liệu kĩ thuật / Hướng dẫn</th>
                  <th className="px-4 py-3 w-28 text-center">Định dạng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[9.5pt] font-semibold text-slate-700">
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-12 text-gray-400 font-bold uppercase tracking-wide">
                      Không tìm thấy tài liệu phù hợp
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => {
                    const isSelected = selectedIds.includes(doc.id) || selectedIds.includes(doc.name);
                    return (
                      <tr 
                        key={doc.id} 
                        onClick={() => onToggleDoc(doc)}
                        className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/20' : ''}`}
                      >
                        <td className="px-4 py-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}} // handled by row onClick
                            className="w-4 h-4 text-[#164399] border-gray-300 rounded focus:ring-[#164399] cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3.5 leading-snug">
                          <div className={`font-black text-[10.5pt] ${isSelected ? 'text-[#164399]' : 'text-slate-800'}`}>
                            {doc.name}
                          </div>
                          <div className="text-[8pt] font-bold text-gray-700 mt-1 uppercase tracking-wider max-w-lg truncate">
                            {doc.type} {doc.code ? `| Ký hiệu: ${doc.code}` : ''} {doc.desc ? `— ${doc.desc}` : ''}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span 
                            style={{ borderRadius: '10px' }} 
                            className="px-2.5 py-1 bg-red-50 text-red-600 font-bold border border-red-100 text-[7.5pt] font-mono whitespace-nowrap block w-fit mx-auto"
                          >
                            PDF ({doc.size})
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200/60 bg-slate-50/50 flex justify-end">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
