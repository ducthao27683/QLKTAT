const fs = require('fs');

const file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. the Switch
if (!content.includes('>Chưa Kế hoạch</button>')) {
  content = content.replace(/<option value="Không duyệt">Không duyệt<\/option>\s*<\/select>/g, 
  `<option value="Không duyệt">Không duyệt</option>
                        </select>
                        <div className="flex bg-slate-100 p-0.5 rounded-full border border-slate-200 ml-2">
                          <button 
                            onClick={() => setHasPlanFilter('Chưa Kế hoạch')}
                            className={\`px-3 py-1 rounded-full text-[8.5pt] font-base font-bold transition-all \${hasPlanFilter === 'Chưa Kế hoạch' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}\`}
                          >
                            Chưa Kế hoạch
                          </button>
                          <button 
                            onClick={() => setHasPlanFilter('Có Kế hoạch')}
                            className={\`px-3 py-1 rounded-full text-[8.5pt] font-base font-bold transition-all \${hasPlanFilter === 'Có Kế hoạch' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}\`}
                          >
                            Có Kế hoạch
                          </button>
                        </div>`);
}

// 2. The Button "+ Lập Kế hoạch từ các thiết bị này"
if (!content.includes('Lập KH từ TB này')) {
  // It should be inside `<div className="flex gap-2">` which surrounds the bulk approve buttons.
  content = content.replace(/<div className="flex gap-2">\s*<button\s*type="button"\s*disabled=\{selectedGlobalDeviceIds.length === 0\}/g,
  `<div className="flex gap-2">
                       {hasPlanFilter === 'Chưa Kế hoạch' && (
                          <button className="px-4 h-8 bg-[#164399] hover:bg-blue-800 text-white rounded-lg flex items-center gap-1.5 text-[9pt] font-bold shadow-sm whitespace-nowrap transition-colors mr-2">
                              <Plus className="w-4 h-4" /> Lập KH từ TB này
                          </button>
                       )}
                       <button
                        type="button"
                        disabled={selectedGlobalDeviceIds.length === 0}`);
}

fs.writeFileSync(file, content);
console.log('Added hasPlan switch and button');
