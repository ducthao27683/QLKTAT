const fs = require('fs');

let file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// Title text `#164399` instead of `gray-800`
content = content.replace(
  /<span className="text-\[10pt\] font-extrabold text-gray-800 leading-tight">Đơn vị đăng ký<\/span>/g,
  '<span className="text-[10pt] font-extrabold text-[#164399] leading-tight">Đơn vị đăng ký</span>'
);

content = content.replace(
  /<span className="text-\[10pt\] font-extrabold text-gray-800 leading-tight">Đơn vị thí nghiệm<\/span>/g,
  '<span className="text-[10pt] font-extrabold text-[#164399] leading-tight">Đơn vị thí nghiệm</span>'
);

// Add border bottom to Row 1
content = content.replace(
  /<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white px-4 py-2\.5 rounded-2xl shadow-3xs border-none">(\s*<div className="flex flex-col text-left shrink-0">\s*<span className="text-\[10pt\] font-extrabold text-\[#164399\] leading-tight">Đơn vị đăng ký)/,
  '<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-none border border-slate-100">$1'
);

content = content.replace(
  /<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white px-4 py-2\.5 rounded-2xl shadow-3xs border-none">(\s*<div className="flex flex-col text-left shrink-0">\s*<span className="text-\[10pt\] font-extrabold text-\[#164399\] leading-tight">Đơn vị thí nghiệm)/,
  '<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-none border border-slate-100">$1'
);

fs.writeFileSync(file, content);
console.log('Fixed YeuCauThiNghiemScreen part 3');
