const fs = require('fs');

let file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// Change the outer div
content = content.replace(
  /<div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">/,
  `<div className={\`flex-1 \${viewType === 'phieu' ? 'overflow-y-auto space-y-3 p-4' : 'flex flex-col p-4'} custom-scrollbar\`}>`
);

// We need to add flex-1 overflow-auto logic to the table's container
const scrollRegex = /<div className="overflow-x-auto block">/;
content = content.replace(scrollRegex, `<div className="overflow-auto block flex-1 custom-scrollbar">`);

const wrapperRegex = /<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-\[9\.5pt\] relative">/;
content = content.replace(wrapperRegex, `<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-[9.5pt] relative flex flex-col flex-1 min-h-0">`);

fs.writeFileSync(file, content);
console.log('Fixed YC thiet-bi table layout');
