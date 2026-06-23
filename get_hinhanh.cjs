const fs = require('fs');
let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

let hinhAnhIndex = content.lastIndexOf('HÌNH ẢNH');
console.log(content.substring(Math.max(0, hinhAnhIndex - 500), hinhAnhIndex + 1500));
