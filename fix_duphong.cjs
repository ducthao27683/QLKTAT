const fs = require('fs');
let file = 'src/modules/thiet-bi/ThietBiDuPhongScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Mã đăng ký: Bo góc 20% (rounded-lg instead of rounded-full?)
// Where is Mã đăng ký rendered? Let me search for text-red-500 font-mono font-black or something.
// Oh wait, inside "TAB 1: GENERAL INFO" there's a status badge and a code.
// Or in the list table?
// Let's replace all `rounded-full` connected with ticket code to `rounded-lg` inside ThietBiDuPhongScreen.

// Replace the icon in tab
content = content.replace(
  /<div className="w-20 h-20 rounded-full(.*?)>[\s\S]*?<\/div>/,
  ''
);

// Tên thiết bị không in đậm
content = content.replace(
  /<p className="text-\[12pt\] font-black text-\[#164399\] leading-tight line-clamp-2">/g,
  '<p className="text-[12pt] font-medium text-[#164399] leading-tight line-clamp-2">'
);

// Tách số liệu thành 3 cột Vận hành | Đề xuất | Duyệt
const oldStats = `<div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 shrink-0 bg-slate-50/80 p-2 px-3 rounded-xl border border-slate-100 sm:min-w-[170px] justify-between sm:justify-start">
                                <span className="flex items-center gap-1.5 bg-blue-50/80 text-blue-800 px-2.5 py-1 rounded-full border border-blue-100/60 shadow-2xs w-full justify-between">
                                  <span className="text-[7.5pt] font-extrabold text-gray-550 uppercase tracking-wider">Vận hành:</span>
                                  <span className="text-[10pt] font-mono font-black text-[#113880]">{it.runningQty}</span>
                                </span>
                                
                                <span className="flex items-center gap-1.5 bg-orange-50/80 text-orange-850 px-2.5 py-1 rounded-full border border-orange-100/60 shadow-2xs w-full justify-between">
                                  <span className="text-[7.5pt] font-extrabold text-gray-550 uppercase tracking-wider">Đề xuất:</span>
                                  <span className="text-[10pt] font-mono font-black text-orange-600">{it.proposedQty}</span>
                                </span>
                                
                                {selectedTicket.status === 'Đã duyệt' && (
                                  <span className="flex items-center gap-1.5 bg-emerald-50/80 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-100/60 shadow-2xs w-full justify-between">
                                    <span className="text-[7.5pt] font-extrabold text-gray-550 uppercase tracking-wider">Duyệt cấp:</span>
                                    <span className="text-[10pt] font-mono font-black text-emerald-600">
                                      {it.approvedQty !== undefined ? it.approvedQty : it.proposedQty}
                                    </span>
                                  </span>
                                )}
                              </div>`;

const newStats = `<div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 bg-slate-50/80 p-2 px-4 rounded-xl border border-slate-100 sm:min-w-[300px]">
                                <div className="flex flex-col items-center">
                                  <span className="text-[7.5pt] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Vận hành</span>
                                  <span className="text-[11pt] font-mono font-black text-[#113880]">{it.runningQty}</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <div className="flex flex-col items-center">
                                  <span className="text-[7.5pt] font-extrabold text-orange-400 uppercase tracking-wider mb-1">Đề xuất</span>
                                  <span className="text-[11pt] font-mono font-black text-orange-600">{it.proposedQty}</span>
                                </div>
                                {selectedTicket.status === 'Đã duyệt' && (
                                  <>
                                    <div className="w-px h-8 bg-gray-200"></div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-[7.5pt] font-extrabold text-emerald-500 uppercase tracking-wider mb-1">Duyệt</span>
                                      <span className="text-[11pt] font-mono font-black text-emerald-600">
                                        {it.approvedQty !== undefined ? it.approvedQty : it.proposedQty}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>`;

content = content.replace(oldStats, newStats);

fs.writeFileSync(file, content);
console.log('Fixed ThietBiDuPhongScreen part 1');
