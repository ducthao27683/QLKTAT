const fs = require('fs');
const path = require('path');

function walk(dir, call) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, call);
    else call(full);
  }
}

walk('./src', (full) => {
  if (full.endsWith('.tsx')) {
    let content = fs.readFileSync(full, 'utf8');

    // For Trash2:
    content = content.replace(/(<(button|div)[^>]*?className=")[^"]*?("[^>]*?>)\s*(<Trash2 [^>]*?\/>)\s*<\/\2>/gs, 
      (match, start, tag, end, icon) => {
        return `${start}p-1.5 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors rounded-[20%] border-none cursor-pointer${end}\n${icon}\n</${tag}>`;
    });

    // For Edit:
    content = content.replace(/(<(button|div)[^>]*?className=")[^"]*?("[^>]*?>)\s*(<Edit [^>]*?\/>)\s*<\/\2>/gs, 
      (match, start, tag, end, icon) => {
        return `${start}p-1.5 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors rounded-[20%] border-none cursor-pointer${end}\n${icon}\n</${tag}>`;
    });

    // For Copy:
    content = content.replace(/(<(button|div)[^>]*?className=")[^"]*?("[^>]*?>)\s*(<Copy [^>]*?\/>)\s*<\/\2>/gs, 
      (match, start, tag, end, icon) => {
        return `${start}p-1.5 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors rounded-[20%] border-none cursor-pointer${end}\n${icon}\n</${tag}>`;
    });
    
    // There are some specific ones that don't have className="" yet or have text "Sao chép"
    // like `<button onClick={handleCopyCurrentTicket} className="px-3 py-2 hover:bg-slate-100 text-slate-600 rounded-lg text-[10pt] font-bold transition-all flex items-center gap-2 cursor-pointer bg-transparent">`
    content = content.replace(/className="[^"]*?(hover:bg-slate-100 text-slate-600 rounded-lg)[^"]*?"([^>]*?>)\s*(<Copy className="[^"]+" \/>) Sao chép/gs, 
      `className="px-3 py-2 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 rounded-[20%] text-[10pt] font-bold transition-all flex items-center gap-2 cursor-pointer border-none"$2\n$3 Sao chép`
    );

    fs.writeFileSync(full, content);
  }
});
