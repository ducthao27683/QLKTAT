const fs = require('fs');

let f1 = 'src/modules/thiet-bi/thong-tin-thiet-bi/ThongTinThietBiScreen.tsx';
let c1 = fs.readFileSync(f1, 'utf8');

c1 = c1.replace(/w-11 h-11 rounded-full flex flex-col items-center justify-center/g, 
                'w-11 h-11 rounded-lg flex flex-col items-center justify-center');
c1 = c1.replace(/<div className="text-\[8pt\] font-extrabold mt-1 select-none flex items-center justify-center gap-0\.5">/g,
                '<div className="text-[8pt] font-extrabold mt-2 select-none flex items-center justify-center gap-0.5">');
c1 = c1.replace(/<h4 className=\{\`text-\[11\.5pt\] font-bold mb-1\.5/g,
                '<h4 className={`text-[11.5pt] font-medium mb-1.5');
c1 = c1.replace(/px-1\.5 py-0\.5 rounded /g, 'px-1.5 py-0.5 rounded-lg ');
c1 = c1.replace(/px-1\.5 py-0\.5 rounded\`/g, 'px-1.5 py-0.5 rounded-lg`');

fs.writeFileSync(f1, c1);
console.log('Fixed ThongTinThietBiScreen');
