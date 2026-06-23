const fs = require('fs');
let file = 'src/modules/thiet-bi/thong-tin-thiet-bi/ThongTinThietBiScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// The Device Code in info tab
content = content.replace(
  /<span className="bg-red-50 text-\[#cb1c1c\] font-mono font-black text-\[9pt\] uppercase px-3 py-1\.5 rounded-full border border-red-100 block w-auto shadow-sm select-none">/g,
  '<span className="bg-red-50 text-[#cb1c1c] font-mono font-black text-[9pt] uppercase px-3 py-1.5 rounded-lg border border-red-100 block w-auto shadow-sm select-none">'
);

fs.writeFileSync(file, content);
console.log('Fixed info tab code border radius in ThongTinThietBi');
