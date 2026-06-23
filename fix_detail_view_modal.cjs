const fs = require('fs');

const file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

// Dialog container
content = content.replace(/max-w-lg bg-white rounded-full shadow-2xl/g, 'max-w-lg bg-white rounded-2xl shadow-2xl');

content = content.replace(/w-full px-0 py-1 text-\[13pt\] font-black rounded-full/g, 'w-full px-0 py-1 text-[13pt] font-black rounded-lg');
content = content.replace(/w-full px-3 py-1\.5 text-\[10pt\] font-bold rounded-full/g, 'w-full px-3 py-1.5 text-[10pt] font-bold rounded-lg');


fs.writeFileSync(file, content);
console.log('Fixed TestingDetailView remaining modal issues');
