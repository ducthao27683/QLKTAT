const fs = require('fs');

let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

// Khi Thêm/Sửa: Ẩn vùng biên bản thí nghiệm gần nhất
content = content.replace(
  /\{detailForm\.mode !== 'add' && \(\s*<div className="space-y-2 mt-4 pt-3 border-t border-dashed border-gray-100 text-left">/g,
  '{detailForm.mode === \'view\' && (\n                                <div className="space-y-2 mt-4 pt-3 border-t border-dashed border-gray-100 text-left">'
);

fs.writeFileSync(file, content);
console.log('Fixed TestingDetailView part 2');
