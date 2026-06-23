const fs = require('fs');
let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1) Mã phiếu:
content = content.replace(
  /<span className="bg-red-50 text-red-650 font-mono font-black text-\[10pt\] uppercase px-2 py-0\.5 rounded-full border border-red-100">/,
  `<span className="bg-red-50/70 text-red-700 font-mono font-black text-[10.5pt] uppercase px-3 py-1 rounded-lg border border-red-100/50">`
);

// 2) Trạng thái xác nhận (bo góc 50% = full)
content = content.replace(
  /<span className=\{`inline-flex items-center gap-1\.5 px-3 py-1 rounded text-\[8pt\] font-black uppercase tracking-widest leading-none border \$\{/,
  `<span className={\`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8pt] font-black uppercase tracking-widest leading-none border \${`
);

// 3) 3 Nút bo góc 20%
content = content.replace(
  /className="px-3 py-1\.5 bg-emerald-600 text-white rounded-full text-\[8\.5pt\] font-black uppercase tracking-wider flex items-center gap-1\.5 hover:bg-emerald-700 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"/,
  `className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[8.5pt] font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-emerald-700 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"`
);
content = content.replace(
  /className="px-3 py-1\.5 bg-\[#164399\] text-white rounded-full text-\[8\.5pt\] font-black uppercase tracking-wider flex items-center gap-1\.5 hover:bg-blue-800 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"/,
  `className="px-3 py-1.5 bg-[#164399] text-white rounded-lg text-[8.5pt] font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-blue-800 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"`
);
content = content.replace(
  /className="px-3 py-1\.5 bg-amber-500 text-white rounded-full text-\[8\.5pt\] font-black uppercase tracking-wider flex items-center gap-1\.5 hover:bg-amber-600 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"/,
  `className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-[8.5pt] font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-amber-600 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"`
);

// 4) Chat Input Box
const chatInputHtml = `                      {/* Comment Input */}
                      <div className="shrink-0 pt-4 bg-slate-50 border-t border-slate-200">
                        <div className="flex gap-3 bg-slate-100 p-2 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-inner">
                          <textarea 
                            rows={2}
                            value={newComment}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  if (!newComment.trim()) return;
                                  setComments([...comments, { id: Date.now(), user: 'Tôi', text: newComment, time: 'Vừa xong' }]);
                                  setNewComment("");
                                }
                            }}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Nhập ý kiến trao đổi..." 
                            className="flex-1 resize-none p-2 rounded-lg text-[9.5pt] focus:outline-none bg-transparent placeholder:text-slate-400 transition-colors"
                          ></textarea>
                          <button 
                            onClick={() => {
                              if (!newComment.trim()) return;
                              setComments([...comments, { id: Date.now(), user: 'Tôi', text: newComment, time: 'Vừa xong' }]);
                              setNewComment("");
                            }}
                            className="h-full px-6 bg-[#164399] text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" /> Gửi
                          </button>
                        </div>
                      </div>`;

const commentRegex = /\{\/\* Comment Input \*\/\}.*?<\/button>\s*<\/div>\s*<\/div>/s;
if (content.match(commentRegex)) {
  content = content.replace(commentRegex, chatInputHtml);
} else {
  console.log("No comment input found");
}

fs.writeFileSync(file, content);
console.log("Fixed testing layout and chatbox");
