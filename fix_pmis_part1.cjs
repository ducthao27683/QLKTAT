const fs = require('fs');

let file = 'src/components/PmisLuoiApp.tsx';
let content = fs.readFileSync(file, 'utf8');

// The section is from Line 546 (Ngày vận hành)
const oldBlock = `<div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Ngày vận hành</label>`;

const newBlock = `</div></div>
                          
                          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                             <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <h4 className="text-[10pt] font-black text-slate-600 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                  <Settings className="w-5 h-5 text-gray-500" /> THÔNG SỐ KỸ THUẬT
                                </h4>
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Ngày vận hành</label>`;

content = content.replace(oldBlock, newBlock);

const oldImages = `<h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Camera className="w-3.5 h-3.5" />
                          Hình ảnh liên quan
                        </h4>`;

const newImages = `<div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <h4 className="text-[10pt] font-black text-slate-600 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                  <Camera className="w-5 h-5 text-orange-500" /> HÌNH ẢNH MINH HỌA
                                </h4>
                             </div>`;

content = content.replace(oldImages, newImages);

const oldDocs = `<h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5" />
                          Tài liệu đính kèm
                        </h4>`;

const newDocs = `<div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <h4 className="text-[10pt] font-black text-slate-600 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                  <FileText className="w-5 h-5 text-red-500" /> TÀI LIỆU ĐÍNH KÈM
                                </h4>
                             </div>`;

content = content.replace(oldDocs, newDocs);

fs.writeFileSync(file, content);
console.log('Fixed PmisLuoiApp part 1');
