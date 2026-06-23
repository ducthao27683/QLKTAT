const fs = require('fs');

function fix(file, replaces) {
  let content = fs.readFileSync(file, 'utf8');
  replaces.forEach(r => content = content.replace(r[0], r[1]));
  fs.writeFileSync(file, content);
}

fix('src/modules/thi-nghiem/components/TestingDetailView.tsx', [
  [/Check, Share2, /, 'Check, Share2, MessageSquare, CheckCircle, '],
  [/<buttonrounded-lg>/g, '<button className="p-2 hover:bg-slate-100 rounded-xl cursor-pointer">']
]);

fix('src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx', [
  [/Check, X/, 'Check, X, Box, '],
  [/<buttonrounded-lg>/g, '<button className="p-2 hover:bg-slate-100 rounded-xl cursor-pointer">']
]);

function fixGlobal(dir) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      fixGlobal(name);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      let c = fs.readFileSync(name, 'utf8');
      if (c.includes('<buttonrounded-lg>')) {
        c = c.replace(/<buttonrounded-lg>/g, '<button className="p-1 px-3 hover:bg-slate-100 rounded-xl cursor-pointer">');
        fs.writeFileSync(name, c);
      }
    }
  }
}
fixGlobal('src/modules');
