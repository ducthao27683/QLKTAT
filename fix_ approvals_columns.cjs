const fs = require('fs');

let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

// Thead
const regexThead = /\{detailForm\.mode === 'view' && \(\s*<th className="py-3 px-4 text-center">Phê duyệt<\/th>\s*\)\}/s;
const newThead = `{detailForm.mode === 'view' && (
                                    <>
                                      <th className="py-3 px-2 text-center w-[110px]">ĐVĐK DUYỆT</th>
                                      <th className="py-3 px-2 text-center w-[110px]">ĐVTN DUYỆT</th>
                                    </>
                                  )}`;
if (content.match(regexThead)) {
   content = content.replace(regexThead, newThead);
}

// Tbody
const regexTbody = /\{detailForm\.mode === 'view' && \(\s*<td className="py-3 px-4 bg-gray-50\/50">\s*<div className="flex justify-center flex-col gap-1 items-center">\s*\{hasBranch && \(\s*<div className=\{`text-\[8pt\] uppercase font-black tracking-widest px-2 py-0\.5 rounded-full inline-block \$\{cnText\.includes\('KHÔNG'\) \|\| cnText\.includes\('không'\) \? 'text-red-500' : cnText\.includes\('CHỜ'\) \|\| cnText\.includes\('chờ'\) \? 'text-amber-500' : 'text-emerald-500'\}`\}>\s*\{cnText\}\s*<\/div>\s*\)\}\s*<div className=\{`text-\[8pt\] uppercase font-black tracking-widest px-2 py-0\.5 rounded-full inline-block \$\{ctText\.includes\('KHÔNG'\) \|\| ctText\.includes\('không'\) \? 'text-red-500' : ctText\.includes\('CHỜ'\) \|\| ctText\.includes\('chờ'\) \? 'text-amber-500' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'\}`\}>\s*\{ctText\}\s*<\/div>\s*<\/div>\s*<\/td>\s*\)\}/s;

const newTbody = `{detailForm.mode === 'view' && (
                                      <>
                                      <td className="py-3 px-2 text-center">
                                        <div className="flex justify-center flex-col gap-1 items-center">
                                          {hasBranch ? (
                                            <div className={\`text-[7.5pt] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full inline-block \${cnText.includes('KHÔNG') || cnText.includes('không') ? 'bg-red-50 text-red-600 border border-red-100' : cnText.includes('CHỜ') || cnText.includes('chờ') ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}\`}>
                                              {cnText}
                                            </div>
                                          ) : <span className="text-gray-300">-</span>}
                                        </div>
                                      </td>
                                      <td className="py-3 px-2 text-center">
                                        <div className="flex justify-center flex-col gap-1 items-center">
                                          <div className={\`text-[7.5pt] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full inline-block \${ctText.includes('KHÔNG') || ctText.includes('không') ? 'bg-red-50 text-red-600 border border-red-100' : ctText.includes('CHỜ') || ctText.includes('chờ') ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}\`}>
                                            {ctText}
                                          </div>
                                        </div>
                                      </td>
                                      </>
                                      )}`;

if (content.match(regexTbody)) {
   content = content.replace(regexTbody, newTbody);
   fs.writeFileSync(file, content);
   console.log('Fixed TestingDetailView approvals columns');
} else {
   console.log('not matched tbody');
}
