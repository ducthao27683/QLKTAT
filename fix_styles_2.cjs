const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      files.push(name);
    }
  }
  return files;
}

const files = getFiles('src/modules');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/<button([^>]+)rounded-xl([^>]*)>/g, '<button$1rounded-lg$2>');
    content = content.replace(/(px-\d(?:\.\d)? py-\d(?:\.\d)?\s+bg-(?:\[#164399\]|blue-\d00)[^\"]*)rounded-xl/g, '$1rounded-lg');

    content = content.replace(/p-6 bg-slate-50\/55 rounded-xl/g, 'p-6 bg-slate-50/55 rounded-2xl');
    content = content.replace(/p-6 bg-white rounded-xl/g, 'p-6 bg-white rounded-2xl');
    content = content.replace(/p-5 rounded-xl space-y-4/g, 'p-5 rounded-2xl space-y-4');
    content = content.replace(/px-4 py-2\.5 rounded-xl/g, 'px-4 py-2.5 rounded-2xl');
    content = content.replace(/bg-gray-50\/50 p-6 rounded-xl/g, 'bg-gray-50/50 p-6 rounded-2xl');
    content = content.replace(/p-6 rounded-xl border border-gray-100/g, 'p-6 rounded-2xl border border-gray-100');
    content = content.replace(/p-6 rounded-xl border border-blue-50/g, 'p-6 rounded-2xl border border-blue-50');
    content = content.replace(/p-4 rounded-xl border/g, 'p-4 rounded-2xl border');

    content = content.replace(/rounded-xl text-\[9\.5pt\]/g, 'rounded-lg text-[9.5pt]'); 
    content = content.replace(/p-3 bg-gray-50\/50 rounded-xl/g, 'p-3 bg-gray-50/50 rounded-lg');
    content = content.replace(/p-3 rounded-xl border border-slate-100/g, 'p-3 rounded-lg border border-slate-100');
    content = content.replace(/p-4 bg-white rounded-xl/g, 'p-4 bg-white rounded-xl'); 
    
    content = content.replace(/p-2 rounded-full cursor-pointer/g, 'p-2 rounded-lg cursor-pointer');

    if (content !== original) {
        fs.writeFileSync(file, content);
    }
});

const rootFiles = getFiles('src/components');
rootFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/<button([^>]+)rounded-xl([^>]*)>/g, '<button$1rounded-lg$2>');

    if (content !== original) {
        fs.writeFileSync(file, content);
    }
});

console.log("Fixed button and card radius to 20% and restoring cards.");
