const fs = require('fs');

let file = 'src/modules/thi-nghiem/components/TestingStandardsConfig.tsx';
let content = fs.readFileSync(file, 'utf8');

// Giá trị Loại thiết bị màu xanh chính
content = content.replace(
  /<span className="text-\[8\.5pt\] font-black text-gray-500 bg-slate-55 uppercase px-3 py-1 rounded-full border border-gray-200">\s*Loại thiết bị: \{normType\}\s*<\/span>/,
  '<span className="text-[8.5pt] font-black text-gray-500 bg-slate-55 uppercase px-3 py-1 rounded-full border border-gray-200">Loại thiết bị: <span className="text-[#164399]">{normType}</span></span>'
);

// Bảng hạng mục nằm sát với tiêu đề bên trên hơn nữa
content = content.replace(
  /className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6 text-left animate-in fade-in duration-300"/g,
  'className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3 text-left animate-in fade-in duration-300"'
);

fs.writeFileSync(file, content);
console.log('Fixed TestingStandardsConfig.tsx');
