const fs = require('fs');

let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

// Insert useState
content = content.replace(
  /const \[isDocLibraryOpen, setIsDocLibraryOpen\] = React\.useState\(false\);/,
  'const [isDocLibraryOpen, setIsDocLibraryOpen] = React.useState(false);\n  const [newComment, setNewComment] = React.useState("");\n  const [comments, setComments] = React.useState<any[]>([]);'
);

// Tab Ý kiến trao đổi
const oldComment = `<textarea 
                            rows={2}
                            placeholder="Nhập ý kiến trao đổi..." 
                            className="flex-1 resize-none p-3 border border-slate-200 rounded-lg text-[9.5pt] focus:outline-none focus:border-blue-500 hover:border-slate-300 bg-white placeholder:text-slate-400 shadow-sm"
                          ></textarea>
                          <button className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer">
                            Gửi
                          </button>`;

const newComment = `<textarea 
                            rows={2}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Nhập ý kiến trao đổi..." 
                            className="flex-1 resize-none p-3 border border-slate-200 rounded-lg text-[9.5pt] focus:outline-none focus:border-blue-500 hover:border-slate-300 bg-white placeholder:text-slate-400 shadow-sm transition-colors"
                          ></textarea>
                          <button 
                            onClick={() => {
                              if (!newComment.trim()) return;
                              setComments([...comments, { id: Date.now(), user: 'Tôi', text: newComment, time: 'Vừa xong' }]);
                              setNewComment("");
                            }}
                            className="h-full px-6 bg-[#164399] text-white font-bold rounded-lg hover:bg-[#164399]/90 transition-all shadow-md cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" /> Gửi
                          </button>`;
content = content.replace(oldComment, newComment);

const commentListRegex = /(<div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-6">)/;
const commentListReplacement = `$1
                          {comments.map(c => (
                            <div key={c.id} className="flex gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0">
                                <span className="font-bold text-slate-500">T</span>
                              </div>
                              <div className="flex-1 space-y-1 text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-[9.5pt] text-slate-800">{c.user}</span>
                                  <span className="text-slate-400 text-[8pt] font-medium">{c.time}</span>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl rounded-tl-none border border-slate-200 shadow-sm text-[9.5pt] text-slate-700 leading-relaxed font-medium">
                                  {c.text}
                                </div>
                              </div>
                            </div>
                          ))}
`;
content = content.replace(commentListRegex, commentListReplacement);

fs.writeFileSync(file, content);
console.log('Fixed TestingDetailView part 4');
