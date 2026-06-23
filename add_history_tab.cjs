const fs = require('fs');
const file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

const historyTabStr = `
             {isTestingPlan && activeFormTab === 'history' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[10pt] font-black text-[#164399] uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                        Ý KIẾN VÀ LỊCH SỬ THỰC HIỆN
                      </h4>
                      <p className="text-[9pt] font-medium text-slate-500 italic">Chưa có dữ liệu lịch sử hoặc ý kiến ghi nhận.</p>
                    </div>
                  </div>
                </div>
             )}
`;

content = content.replace(/\{isTestingPlan && activeFormTab === 'safety_attachments' && \(/g, historyTabStr + "\n              {isTestingPlan && activeFormTab === 'safety_attachments' && (");

fs.writeFileSync(file, content);
console.log("Added history tab placeholder!");
