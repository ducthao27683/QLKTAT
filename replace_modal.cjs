const fs = require('fs');
const file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/setIsDetailModalOpen\(true\);\s*setDetailFormMode\('view'\);\s*setDetailForm\(dev\.fullPlan\);/, "setDetailForm({ type: 'testing_plan', mode: 'view', data: dev.fullPlan });");

fs.writeFileSync(file, content);
console.log("Replaced!");
