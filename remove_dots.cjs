const fs = require('fs');

const file = 'src/modules/thiet-bi/ThietBiDuPhongScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// remove lines like <span className="w-1.5 h-1.5 rounded-full bg-...
content = content.replace(/.*<span className="w-1\.5 h-1\.5 rounded-full.*<\/span>\n?/g, '');

fs.writeFileSync(file, content);
console.log('Removed dots from ThietBiDuPhongScreen.tsx');
