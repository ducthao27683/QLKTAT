const fs = require('fs');
let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/Từ chối: \{dvdkKhongDuyet\}/g, "Không duyệt: {dvdkKhongDuyet}");
content = content.replace(/Từ chối: \{dvtnKhongDuyet\}/g, "Không duyệt: {dvtnKhongDuyet}");
content = content.replace(/item\.type\.includes\('Từ chối'\)/g, "item.type.includes('Không duyệt')");

fs.writeFileSync(file, content);

let file2 = 'src/modules/thi-nghiem/components/TestingDialogs.tsx';
let content2 = fs.readFileSync(file2, 'utf8');
content2 = content2.replace(/status: 'Từ chối'/g, "status: 'Không duyệt'");
fs.writeFileSync(file2, content2);
console.log("Fixed Từ chối");
