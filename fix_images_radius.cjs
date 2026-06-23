const fs = require('fs');
let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/aspect-video bg-gray-50 rounded-full/g, "aspect-video bg-gray-50 rounded-xl");
fs.writeFileSync(file, content);
console.log("Fixed image border radius.");
