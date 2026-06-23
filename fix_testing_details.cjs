const fs = require('fs');

const file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix large cards incorrectly marked rounded-full
content = content.replace(/p-6 bg-slate-50\/55 rounded-full/g, 'p-6 bg-slate-50/55 rounded-xl');
content = content.replace(/p-6 rounded-full/g, 'p-6 rounded-xl');
content = content.replace(/p-3 rounded-full border border-slate-100/g, 'p-3 rounded-xl border border-slate-100');
content = content.replace(/p-4 rounded-full rounded-tl-none/g, 'p-4 rounded-xl rounded-tl-none');
content = content.replace(/p-4 rounded-full rounded-tr-none/g, 'p-4 rounded-xl rounded-tr-none');
content = content.replace(/rounded-full text-\[9\.5pt\]/g, 'rounded-xl text-[9.5pt]'); // textarea
content = content.replace(/p-3 bg-gray-50\/50 rounded-full/g, 'p-3 bg-gray-50/50 rounded-xl');
content = content.replace(/p-3 rounded-full border border-slate-200 shadow-3xs inline-block/g, 'p-3 rounded-xl border border-slate-200 shadow-3xs inline-block');
content = content.replace(/p-4 bg-white rounded-full/g, 'p-4 bg-white rounded-xl');

content = content.replace(/rounded-\[2rem\]/g, 'rounded-xl');

fs.writeFileSync(file, content);
console.log("Fixed detail view cards.");
