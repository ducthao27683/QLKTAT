const fs = require('fs');

let file = 'src/modules/thiet-bi/ThietBiDuPhongScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

const regexCardsList = /{paginatedDevices\.length > 0 \? paginatedDevices\.map\(\(it, idx\) => \{.*?\}\)\s*:\s*\(\s*<div className="text-center py-10 text-gray-400 bg-slate-50\/50 rounded-xl border border-dashed border-gray-200">.*?<\/div>\s*\)\}/s;

const newTable = `{paginatedDevices.length > 0 ? (
                          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full relative">
                            <div className="overflow-auto flex-1 custom-scrollbar">
                              <table className="w-full relative">
                                <thead className="bg-[#f0f4fa] sticky top-0 z-10 text-[#164399] font-black text-[9pt] uppercase tracking-wider text-left border-b border-gray-200 shadow-xs">
                                  <tr>
                                    <th className="py-3 px-4 text-center w-12 border-r border-[#164399]/10">STT</th>
                                    <th className="py-3 px-4 border-r border-[#164399]/10">Thiết bị</th>
                                    <th className="py-3 px-4 text-center border-r border-[#164399]/10">SL Vận hành</th>
                                    <th className="py-3 px-4 text-center border-r border-[#164399]/10">SL Đề xuất</th>
                                    {selectedTicket.status === 'Đã duyệt' && <th className="py-3 px-4 text-center border-r border-[#164399]/10">Duyệt cấp</th>}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {paginatedDevices.map((it, idx) => {
                                    const vTag = getItemVoltage(it);
                                    const cTag = getItemCategory(it);
                                    return (
                                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="py-3 px-4 text-center text-gray-500 font-mono text-[9pt] border-r border-gray-100">{startIndex + idx + 1}</td>
                                        <td className="py-3 px-4 flex flex-col gap-1 border-r border-gray-100">
                                          <div className="flex flex-wrap items-center gap-2 text-[8.5pt]">
                                            <span className="text-red-500 font-mono font-black uppercase tracking-wider">{it.code}</span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-[#164399] font-black uppercase">{vTag}</span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-gray-700 font-bold uppercase">{cTag}</span>
                                          </div>
                                          <span className="text-[10pt] text-gray-700 leading-tight">
                                            {it.name}
                                          </span>
                                        </td>
                                        <td className="py-3 px-4 text-center border-r border-gray-100">
                                          <span className="font-mono font-black text-[#164399]">{it.runningQty}</span>
                                        </td>
                                        <td className="py-3 px-4 text-center border-r border-gray-100">
                                          <span className="font-mono font-black text-orange-600 bg-orange-50/80 px-2 py-0.5 rounded">{it.proposedQty}</span>
                                        </td>
                                        {selectedTicket.status === 'Đã duyệt' && (
                                          <td className="py-3 px-4 text-center border-r border-gray-100">
                                            <span className="font-mono font-black text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded">{it.approvedQty !== undefined ? it.approvedQty : it.proposedQty}</span>
                                          </td>
                                        )}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-10 text-gray-400 bg-slate-50/50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-[11pt] font-bold">Không tìm thấy thiết bị nào khớp điều kiện</p>
                          </div>
                        )}`;

if (content.match(regexCardsList)) {
  content = content.replace(regexCardsList, newTable);
}

// And fix code header style
// <span className="text-red-600 font-mono font-black text-[14pt]"> => bg-red-50 text-red-700 rounded-lg px-3 py-1
content = content.replace(
  /<span className="text-red-600 font-mono font-black text-\[14pt\]">/,
  `<span className="bg-red-50 text-red-700 rounded-lg px-3 py-1 font-mono font-black text-[14pt]">`
);

fs.writeFileSync(file, content);
console.log('Fixed Tab Thiet bi table in du phong');
