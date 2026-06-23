const fs = require('fs');
let file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

const regexTableWrapperOpen = /<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-\[9\.5pt\]">\s*\{\/\* Action Bar & Status Filter \*\/\}/s;
const newTableWrapperOpen = `<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-[9.5pt] mb-3 flex items-center justify-between p-2.5">`;

if (content.match(regexTableWrapperOpen)) {
   content = content.replace(regexTableWrapperOpen, newTableWrapperOpen);
}

// remove the bg-blue-50/50 p-2.5 border-b border-blue-100 flex items-center justify-between
content = content.replace(/<div className="bg-blue-50\/50 p-2\.5 border-b border-blue-100 flex items-center justify-between">/, '');

// now find the end of this action bar, it ends just before the table or header
// let's look for `<div className="overflow-x-auto">` or similar
const afterActionBar = /<\/div>\s*<div className="overflow-x-auto block">/;
content = content.replace(afterActionBar, `</div></div>\n<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-[9.5pt] relative">\n<div className="overflow-x-auto block">`);

// Update logic of the button
const buttonLogic = /\{hasPlanFilter === 'Chưa Kế hoạch' && \(\s*<button className="px-4 h-8 bg-\[#164399\] hover:bg-blue-800 text-white rounded-lg flex items-center gap-1\.5 text-\[9pt\] font-bold shadow-sm whitespace-nowrap transition-colors mr-2">\s*<Plus className="w-4 h-4" \/> Lập KH từ TB này\s*<\/button>\s*\)\}/s;
const newButtonLogic = `{hasPlanFilter === 'Chưa Kế hoạch' && deviceFilter === 'Đã duyệt' && (
                          <button className="px-4 h-8 bg-[#164399] hover:bg-blue-800 text-white rounded-lg flex items-center gap-1.5 text-[9pt] font-bold shadow-sm whitespace-nowrap transition-colors mr-2">
                              <Plus className="w-4 h-4" /> Lập KH từ các TB này
                          </button>
                       )}`;
content = content.replace(buttonLogic, newButtonLogic);

fs.writeFileSync(file, content);
console.log('Fixed Xem TB list style in YC table');
