const fs = require('fs');

const file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/bg-white rounded-full border border-gray-100 shadow-2xl w-full/g, 'bg-white rounded-2xl border border-gray-100 shadow-2xl w-full');
content = content.replace(/bg-white rounded-full border border-gray-100 shadow-sm overflow-hidden text-\[9\.5pt\]/g, 'bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-[9.5pt]');
content = content.replace(/bg-white rounded-full border border-gray-100 min-h-0/g, 'bg-white rounded-2xl border border-gray-100 min-h-0');
content = content.replace(/border border-slate-100 rounded-full max-h-\[160px\]/g, 'border border-slate-100 rounded-2xl max-h-[160px]');
content = content.replace(/px-4 py-2 border border-slate-200 hover:bg-slate-100 text-gray-500 font-bold rounded-full/g, 'px-4 py-2 border border-slate-200 hover:bg-slate-100 text-gray-500 font-bold rounded-lg');


// Input text fields (should probably be rounded-lg)
content = content.replace(/rounded-full text-\[9\.5pt\] font-medium/g, 'rounded-lg text-[9.5pt] font-medium');
content = content.replace(/rounded-full text-\[9\.5pt\] font-black/g, 'rounded-lg text-[9.5pt] font-black');
content = content.replace(/border border-gray-200 rounded-full px-3\.5 py-2/g, 'border border-gray-200 rounded-lg px-3.5 py-2');
content = content.replace(/border border-gray-250 rounded-full px-3\.5 py-2/g, 'border border-gray-250 rounded-lg px-3.5 py-2');

// Chat bubbles (maybe rounded-xl)
content = content.replace(/max-w-\[85%\] flex-1 rounded-full p-3/g, 'max-w-[85%] flex-1 rounded-2xl p-3');

fs.writeFileSync(file, content);
console.log('Fixed YCTN screen remaining radius issues');
