const fs = require('fs');

let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

// Title text `#164399` instead of `gray-800`
content = content.replace(
  /<span className="text-\[9\.5pt\] font-extrabold text-gray-800 leading-tight">Đơn vị đăng ký<\/span>/g,
  '<span className="text-[9.5pt] font-extrabold text-[#164399] leading-tight">Đơn vị đăng ký</span>'
);

content = content.replace(
  /<span className="text-\[9\.5pt\] font-extrabold text-gray-800 leading-tight">Đơn vị thí nghiệm<\/span>/g,
  '<span className="text-[9.5pt] font-extrabold text-[#164399] leading-tight">Đơn vị thí nghiệm</span>'
);

// Add border bottom to Row 1
content = content.replace(
  /<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 bg-transparent pb-0 border-none">(\s*<div className="flex flex-col text-left shrink-0">\s*<span className="text-\[9\.5pt\] font-extrabold text-\[#164399\] leading-tight">Đơn vị đăng ký)/,
  '<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 bg-transparent pb-3 border-b border-gray-100">$1'
);

fs.writeFileSync(file, content);
console.log('Fixed TestingDetailView part 3');
