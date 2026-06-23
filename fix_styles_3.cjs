const fs = require('fs');

function fix(dir) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      fix(name);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      let c = fs.readFileSync(name, 'utf8');
      
      // Filter button
      c = c.replace(/className=\"w-10 h-10 rounded-full border transition-all/g, 'className="w-10 h-10 rounded-lg border transition-all');
      c = c.replace(/className={\`w-10 h-10 rounded-full/g, 'className={`w-10 h-10 rounded-lg');

      // buttons wrapper => Add whitespace-nowrap
      // Find "Thêm"
      c = c.replace(/px-4 h-10 bg-\[#164399\] text-white rounded-(lg|xl|full)/g, 'px-4 h-10 bg-[#164399] text-white rounded-lg whitespace-nowrap');
      c = c.replace(/px-6 py-2 bg-blue-50 text-\[#164399\] rounded-(lg|xl|full) font-bold text-\[10pt\]/g, 'px-6 py-2 bg-blue-50 text-[#164399] rounded-lg font-bold text-[10pt] whitespace-nowrap'); 

      // Device info
      c = c.replace(/rounded-full shadow-xs border([^>]+title="Mã thiết bị")/g, 'rounded border shadow-xs$1');
      c = c.replace(/border px-1\.5 py-0\.5 rounded-full([^>]+title="Loại thiết bị")/g, 'border px-1.5 py-0.5 rounded$1');
      
      // bg-white rounded-full border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0
      c = c.replace(/rounded-full bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm/g, 'rounded-lg bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm');
      
      // Tên chi nhánh
      c = c.replace(/rounded-full inline-block border border-slate-200/g, 'rounded-lg inline-block border border-slate-200');
      c = c.replace(/rounded-full font-mono uppercase bg-red-50 text-red-600 border border-red-100/g, 'rounded-lg font-mono uppercase bg-red-50 text-red-600 border border-red-100');
      c = c.replace(/bg-blue-105 px-2\.5 py-0\.5 rounded-full border/g, 'bg-blue-105 px-2.5 py-0.5 rounded border');

      fs.writeFileSync(name, c);
    }
  }
}
fix('src');
console.log('Fixed styling details.');
