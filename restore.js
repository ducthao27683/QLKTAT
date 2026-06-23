const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'modules', 'thi-nghiem', 'danh-muc-thi-nghiem', 'DanhMucThiNghiemScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find the start marker
const startString = `                    placeholder="e.g. MΩ, Ω, %"\n                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"\n                  />\n                </div>\n              </div>`;
const startIndex = content.indexOf(startString);

if (startIndex === -1) {
  console.error("Start string not found!");
  process.exit(1);
}

// Find the end marker
const endString = `                    <th className="px-3 py-3 w-16 text-center text-[8pt] font-black uppercase tracking-wider">STT</th>`;
const endIndex = content.indexOf(endString);

if (endIndex === -1) {
  console.error("End string not found!");
  process.exit(1);
}

// We will insert the correct code block in the middle
const replacement = `\n\n              {/* Kiểu đo (Kiểu giá trị đo) and Tiêu chuẩn: placed before Limit (Giới hạn) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Kiểu giá trị đo (Kiểu Đo)</label>
                  <select
                    value={newStdValueType}
                    onChange={(e) => setNewStdValueType(e.target.value as any)}
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none cursor-pointer"
                  >
                    <option value="Số">Số (Numeric)</option>
                    <option value="Text">Văn bản (Text)</option>
                    <option value="Có/Không">Có / Không (Boolean)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Tiêu chuẩn</label>
                  <input
                    type="text"
                    value={newStdStandard}
                    onChange={(e) => setNewStdStandard(e.target.value)}
                    placeholder="e.g. IEC 62271"
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Limits block (Giới hạn Dưới & Giới hạn Trên) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Giới hạn Dưới</label>
                  <input
                    type="text"
                    value={newStdLimitMin}
                    onChange={(e) => setNewStdLimitMin(e.target.value)}
                    placeholder="e.g. ≥ 10"
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Giới hạn Trên</label>
                  <input
                    type="text"
                    value={newStdLimitMax}
                    onChange={(e) => setNewStdLimitMax(e.target.value)}
                    placeholder="e.g. ≤ 100"
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Ghi chú</label>
                <textarea
                  value={newStdNote}
                  onChange={(e) => setNewStdNote(e.target.value)}
                  placeholder="e.g. Ghi chú tiêu chuẩn phụ hoặc điều kiện kiểm tra đặc biệt"
                  rows={4}
                  className="w-full px-4 py-3 text-[10pt] font-semibold bg-white border border-gray-200 rounded-xl shadow-sm focus:border-blue-400 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowAddEditModal(false)}
                className="px-4.5 py-1.5 border border-gray-250 bg-white hover:bg-slate-100 text-gray-600 font-bold rounded-lg text-[9pt] transition-colors cursor-pointer select-none"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveStandardItem}
                disabled={!newStdName.trim()}
                className="px-5 py-1.5 bg-[#164399] hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-lg text-[9pt] transition-all shadow-sm cursor-pointer select-none"
              >
                Lưu hạng mục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reusable Sub-modal 1: Choose document from Library modal */}
      <DocumentLibraryModal
        isOpen={showLibraryModal}
        onClose={() => setShowLibraryModal(false)}
        selectedIds={
          libraryTarget === 'hm'
            ? hmAttachedDocs.map(d => d.id)
            : libraryTarget === 'ts'
            ? tsAttachedDocs.map(d => d.id)
            : (docsMap[\`\${configTestType}-\${configDevType}-\${configVoltage}\`] || [])
        }
        headerConfigLabel={
          libraryTarget === 'hm'
            ? 'Danh mục tài liệu mẫu cho Hạng mục'
            : libraryTarget === 'ts'
            ? 'Danh mục tài liệu mẫu cho Thông số đo'
            : \`\${configTestType} - \${configDevType} - \${configVoltage}\`
        }
        onToggleDoc={(doc) => {
          if (libraryTarget === 'hm') {
            const exists = hmAttachedDocs.find(d => d.id === doc.id);
            if (exists) {
              setHmAttachedDocs(prev => prev.filter(d => d.id !== doc.id));
            } else {
              setHmAttachedDocs(prev => [...prev, doc]);
            }
          } else if (libraryTarget === 'ts') {
            const exists = tsAttachedDocs.find(d => d.id === doc.id);
            if (exists) {
              setTsAttachedDocs(prev => prev.filter(d => d.id !== doc.id));
            } else {
              setTsAttachedDocs(prev => [...prev, doc]);
            }
          } else {
            const configKey = \`\${configTestType}-\${configDevType}-\${configVoltage}\`;
            const currentDocs = docsMap[configKey] || [];
            if (currentDocs.includes(doc.id)) {
              handleRemoveDocFromConfig(doc.id);
            } else {
              handleAddDocToConfig(doc.id);
            }
          }
        }}
      />

      {/* Pop-up Chọn thông số đo kỹ thuật */}
      {showAddTsFromListModal && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowAddTsFromListModal(false)}
          ></div>
          <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#eaf0fa] text-[#154194] rounded-xl shrink-0">
                  <ListPlus className="w-5 h-5 animate-none" />
                </div>
                <div className="text-left">
                  <h3 className="text-[12.5pt] font-black text-slate-800 tracking-tight leading-tight">Chọn thông số đo từ Danh sách mẫu</h3>
                  <p className="text-[8.5pt] text-slate-400 font-medium mt-0.5">Liên kết nhanh các thông số đo kiểm kỹ thuật của loại thiết bị vào hạng mục: <span className="font-extrabold text-[#164399] underline">{tlhm_selectedCatalog?.name}</span></p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddTsFromListModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Filter controls row */}
            <div className="p-3 bg-slate-50/60 border-b border-gray-200/85 grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
              <div className="flex flex-col gap-1">
                <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Cấp điện áp</label>
                <select 
                  value={tsListVoltageFilter}
                  onChange={(e) => setTsListVoltageFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500"
                >
                  <option value="Tất cả">Tất cả cấp điện áp</option>
                  <option value="110kV">Cấp 110kV</option>
                  <option value="220kV">Cấp 220kV</option>
                  <option value="500kV">Cấp 500kV</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Loại thiết bị</label>
                <select 
                  value={tsListDeviceTypeFilter}
                  onChange={(e) => setTsListDeviceTypeFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500"
                >
                  <option value="Tất cả">Tất cả thiết bị</option>
                  <option value="MBA">Máy biến áp (MBA)</option>
                  <option value="MC">Máy cắt (MC)</option>
                  <option value="TI">Biến dòng điện (TI)</option>
                  <option value="TU">Biến điện áp (TU)</option>
                  <option value="CSV">Chống sét van (CSV)</option>
                  <option value="DCL">Dao cách ly (DCL)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Tìm kiếm nhanh</label>
                <div className="relative">
                  <input
                    type="text"
                    value={tsListSearchQuery}
                    onChange={(e) => setTsListSearchQuery(e.target.value)}
                    placeholder="Nhập tên thông số kỹ thuật..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500 placeholder-slate-400"
                  />
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Content Table list */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-slate-50/20">
              <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-slate-150">
                <thead className="bg-[#eaf0fa] text-[#154194] leading-none select-none border-b border-gray-250">
                  <tr>
                    <th className="px-4 py-3 w-12 text-center text-[8pt] font-black uppercase tracking-wider">Chọn</th>
\n`;

const targetSlice = content.slice(startIndex + startString.length, endIndex);
content = content.replace(targetSlice, replacement);
fs.writeFileSync(filePath, content, 'utf8');

console.log("Successfully restored file.");
