const fs = require('fs');

let file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix colSpan
content = content.replace(
  /<td colSpan=\{7\} className="py-2 px-4 shadow-inner">/g,
  '<td colSpan={10} className="py-2 px-4 shadow-inner">'
);

// Fix Bảo dưỡng
content = content.replace(
  /dev\.testType \|\| \(idx % 3 === 0 \? 'Kiểm định' : idx % 2 === 0 \? 'Bảo dưỡng' : 'Thí nghiệm'\)/g,
  "dev.testType || (idx % 3 === 0 ? 'Kiểm định' : idx % 2 === 0 ? 'Kiểm định' : 'Thí nghiệm')"
);

fs.writeFileSync(file, content);
console.log('Fixed YeuCauThiNghiemScreen part 4');
