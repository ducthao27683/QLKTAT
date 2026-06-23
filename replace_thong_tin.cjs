const fs = require('fs');
const file = 'src/modules/thiet-bi/thong-tin-thiet-bi/ThongTinThietBiScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<h4 className="text-\[10pt\] font-black text-\[#164399\] uppercase tracking-widest flex items-center gap-2">\s*<Camera className="w-4 h-4 text-orange-500" \/> Hình ảnh minh họa\s*<\/h4>[\s\S]*?(?=<\/\>)/;

const replacement = `<div className="space-y-4 pt-4 border-t border-slate-100 first:border-0 first:pt-0 pb-6 w-full max-w-full">
                                 <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                   <h4 className="text-[10pt] font-black text-[#164399] uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                     <Camera className="w-5 h-5 text-orange-500" /> HÌNH ẢNH MINH HỌA
                                   </h4>
                                 </div>
                                 <div className="grid grid-cols-2 gap-3 w-full">
                                    {imageUrls.map((img: string, idx: number) => (
                                       <div 
                                         key={idx} 
                                         className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group relative shadow-sm hover:shadow-md transition-all duration-300 cursor-zoom-in"
                                         onClick={() => setPreviewContent({ type: 'image', url: img, name: effectiveDevice, imagesList: imageUrls, currentIndex: idx })} 
                                       >
                                          <img 
                                            src={img} 
                                            alt="TB" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                            referrerPolicy="no-referrer"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                                            <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                               </div>

                               <div className="space-y-4 pt-6 w-full max-w-full">
                                 <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                   <h4 className="text-[10pt] font-black text-[#164399] uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                     <FileText className="w-5 h-5 text-red-500" /> TÀI LIỆU ĐÍNH KÈM
                                   </h4>
                                 </div>
                                 <div className="space-y-3 w-full">
                                   {loadedDocs.map((doc, i) => (
                                     <div 
                                       key={i} 
                                       className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100 group hover:border-slate-300 hover:bg-white transition-all cursor-pointer shadow-xs" 
                                       onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name, fileCode: doc.code, fileDate: '15/06/2026', fileSize: doc.size, fileName: doc.name })}
                                     >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                           <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                             <FileText className="w-4.5 h-4.5 text-red-500" />
                                           </div>
                                           <div className="flex flex-col min-w-0 text-left">
                                             <p className="text-[9.5pt] font-bold text-gray-800 line-clamp-1 group-hover:text-[#164399] transition-colors">{doc.name}</p>
                                             <p className="text-[8.5pt] text-slate-400 font-medium tracking-tight text-left mt-0.5">Hệ thống | 15/06/2026 | {doc.size}</p>
                                           </div>
                                        </div>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             `;

content = content.replace(/<div className="space-y-4">\s*<h4 className="text-\[10pt\] font-black text-\[#164399\] uppercase tracking-widest flex items-center gap-2">\s*<Camera className="w-4 h-4 text-orange-500" \/> Hình ảnh minh họa\s*<\/h4>[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*<\/div>\s*<div className="mt-8 pt-8 border-t border-slate-100">|\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div className="lg:w-\[420px\])/, "THIS_IS_A_MARKER");

// Ah, wait. The previous is inside a <> ... </>
content = content.replace(/<div className="space-y-4">\s*<h4 className="text-\[10pt\] font-black text-\[#164399\] uppercase tracking-widest flex items-center gap-2">\s*<Camera className="w-4 h-4 text-orange-500" \/> Hình ảnh minh họa\s*<\/h4>[\s\S]*?<div className="space-y-4 pt-4">[\s\S]*?(?=\s*<\/>\s*\);\s*}\)\(\)})/, replacement);

fs.writeFileSync(file, content);
console.log("Replaced with regex 2!");
