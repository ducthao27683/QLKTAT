const fs = require('fs');

const file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove "Chọn loại hình kiểm tra thiết lập"
content = content.replace(/<label className="text-\[8\.5pt\] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">Chọn loại hình kiểm tra thiết lập<\/label>/g, '');

// 2. Remove "Giờ thực hiện" block
content = content.replace(/<div className="space-y-1">\s*<label className="text-\[8\.5pt\] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">Giờ thực hiện<\/label>[\s\S]*?<\/div>/g, '');

// 3. Status limit rounded-full - find Trạng thái Hạn
content = content.replace(/text-red-600 bg-red-50 px-2\.5 py-1 rounded(-[a-z]+)?/g, 'text-red-600 bg-red-50 px-2.5 py-1 rounded-full');
content = content.replace(/text-amber-600 bg-amber-50 px-2\.5 py-1 rounded(-[a-z]+)?/g, 'text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full');
content = content.replace(/text-emerald-600 bg-emerald-50 px-2\.5 py-1 rounded(-[a-z]+)?/g, 'text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full');
content = content.replace(/text-gray-550 bg-slate-50 px-2\.5 py-1 rounded(-[a-z]+)?/g, 'text-gray-550 bg-slate-50 px-2.5 py-1 rounded-full');

fs.writeFileSync(file, content);

let c2 = fs.readFileSync('src/modules/thi-nghiem/components/TestingStandardsConfig.tsx', 'utf8');
c2 = c2.replace(/<thead className="bg-\[#f0f4fa\] sticky top-0 z-20 text-\[#164399\] font-black text-\[9pt\] uppercase tracking-wider text-left border-b border-gray-200">/g, '<thead className="bg-[#f0f4fa] sticky top-0 z-20 text-[#164399] font-black text-[9pt] uppercase tracking-wider text-left">');
c2 = c2.replace(/<tr className="text-\[8\.5pt\] font-black text-\[#164399\] uppercase tracking-widest">/g, '<tr className="text-[8.5pt] font-black text-[#164399] uppercase tracking-widest [&>th:first-child]:rounded-tl-2xl [&>th:last-child]:rounded-tr-2xl">');
c2 = c2.replace(/border-b border-gray-100 pb-4/g, 'pb-4');
fs.writeFileSync('src/modules/thi-nghiem/components/TestingStandardsConfig.tsx', c2);

console.log('Fixed TestingDetailView and Config');
