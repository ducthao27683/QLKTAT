const fs = require('fs');

const file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/p-4 rounded-full border transition-all cursor-pointer/g, 'p-4 rounded-xl border transition-all cursor-pointer');
content = content.replace(/p-6 rounded-full border border-gray-100/g, 'p-6 rounded-xl border border-gray-100');
content = content.replace(/p-5 rounded-full space-y-4/g, 'p-5 rounded-xl space-y-4');
content = content.replace(/px-4 py-2\.5 rounded-full shadow-3xs/g, 'px-4 py-2.5 rounded-xl shadow-3xs');
content = content.replace(/p-6 rounded-full border border-blue-50/g, 'p-6 rounded-xl border border-blue-50');

// Just broadly catching p-X rounded-full for larger containers without affecting w-/h- circles
content = content.replace(/p-2 rounded-full cursor-pointer transition-colors/g, 'p-2 rounded-xl cursor-pointer transition-colors'); 

fs.writeFileSync(file, content);
console.log("Fixed main screen cards.");
