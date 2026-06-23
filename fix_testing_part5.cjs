const fs = require('fs');

let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldPhieuView = /{detailForm\.mode === 'view' && \(\s*<td className="py-3 px-4">\s*<div className="flex flex-col gap-1 items-center justify-center w-\[120px\] mx-auto">\s*\{hasBranch && \(\s*<span className=\{\`px-2 py-0\.5 w-full text-center rounded text-\[7\.5pt\] font-bold uppercase tracking-wider border whitespace-nowrap \$\{cnStyle\}\`\}>\s*\{cnText\}\s*<\/span>\s*\)\}\s*<span className=\{\`px-2 py-0\.5 w-full text-center rounded text-\[7\.5pt\] font-bold uppercase tracking-wider border whitespace-nowrap \$\{ctStyle\}\`\}>\s*\{ctText\}\s*<\/span>\s*<\/div>\s*<\/td>\s*\)}/;

const newPhieuView = `{detailForm.mode === 'view' && (
                                      <td className="py-3 px-4 bg-gray-50/50">
                                        <div className="flex justify-center flex-col gap-1 items-center">
                                          {hasBranch && (
                                            <div className={\`text-[8pt] uppercase font-black tracking-widest px-2 py-0.5 rounded-full inline-block \${cnText.includes('KHÔNG') || cnText.includes('không') ? 'text-red-500' : cnText.includes('CHỜ') || cnText.includes('chờ') ? 'text-amber-500' : 'text-emerald-500'}\`}>
                                              {cnText}
                                            </div>
                                          )}
                                          <div className={\`text-[8pt] uppercase font-black tracking-widest px-2 py-0.5 rounded-full inline-block \${ctText.includes('KHÔNG') || ctText.includes('không') ? 'text-red-500' : ctText.includes('CHỜ') || ctText.includes('chờ') ? 'text-amber-500' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}\`}>
                                            {ctText}
                                          </div>
                                        </div>
                                      </td>
                                      )}`;

if (content.match(oldPhieuView)) {
    content = content.replace(oldPhieuView, newPhieuView);
} else {
    // try a simpler match if it already changed format
    console.log("Could not find the exact old string for Phê duyệt. Manual replace might be needed.");
}

fs.writeFileSync(file, content);
console.log('Fixed TestingDetailView part 5');
