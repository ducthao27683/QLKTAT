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

    // 1. Status Badges -> rounded-full
    const badgeBgColors = ['blue', 'emerald', 'green', 'amber', 'orange', 'red', 'purple', 'gray', 'slate'];
    badgeBgColors.forEach(color => {
        const regex1 = new RegExp(`(bg-${color}-(?:50|100|200|500\\\\/10|500\\\\/20|600\\\\/10)[\\s\\S]*?text-${color}-(?:600|700|800|900)[\\s\\S]*?)rounded-(?:sm|md|lg|xl|2xl|3xl)`, 'g');
        content = content.replace(regex1, '$1rounded-full');
        
        const regex2 = new RegExp(`(text-${color}-(?:600|700|800|900)[\\s\\S]*?bg-${color}-(?:50|100|200|500\\\\/10|500\\\\/20|600\\\\/10)[\\s\\S]*?)rounded-(?:sm|md|lg|xl|2xl|3xl)`, 'g');
        content = content.replace(regex2, '$1rounded-full');
    });

    content = content.replace(/className="([^"]*)px-2 py-0\.5([^"]*)rounded-(lg|md)/g, 'className="$1px-2 py-0.5$2rounded-full');
    content = content.replace(/className="([^"]*)px-2\.5 py-1([^"]*)rounded-(lg|md)/g, 'className="$1px-2.5 py-1$2rounded-full');
    content = content.replace(/className="([^"]*)px-3 py-1([^"]*)rounded-(lg|md|xl)/g, 'className="$1px-3 py-1$2rounded-full');
    content = content.replace(/className="([^"]*)px-2 py-1([^"]*)rounded-(lg|md|xl)/g, 'className="$1px-2 py-1$2rounded-full');

    // 2. Buttons -> rounded-xl (bo tròn 4 góc 20%)
    content = content.replace(/<button([^>]+)rounded-(sm|md|lg|2xl|3xl|full)([^>]*)>/g, '<button$1rounded-xl$3>');
    content = content.replace(/(px-\d(?:\.\d)? py-\d(?:\.\d)?\s+bg-(?:\[#164399\]|blue-\d00)[^"']*?)rounded-(?:sm|md|lg|xl|2xl|full)/g, '$1rounded-xl');

    // 3. Info boxes -> rounded-lg (bo óc 10%)
    content = content.replace(/rounded-\[2rem\]/g, 'rounded-xl');
    content = content.replace(/rounded-3xl/g, 'rounded-xl');
    content = content.replace(/rounded-2xl/g, 'rounded-xl');

    // 4. Headings text -> text-slate-600
    content = content.replace(/<h4 className="([^"]*)text-\[#164399\]/g, '<h4 className="$1text-slate-600');
    content = content.replace(/<h3 className="([^"]*)text-\[#164399\]/g, '<h3 className="$1text-slate-600');
    content = content.replace(/<label className="([^"]*)text-gray-800([^"]*)uppercase/g, '<label className="$1text-slate-600$2uppercase');

    if (content !== original) {
        fs.writeFileSync(file, content);
    }
});

// Also run through app root components if any
const rootFiles = getFiles('src/components');
rootFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/<button([^>]+)rounded-(sm|md|lg|2xl|3xl|full)([^>]*)>/g, '<button$1rounded-xl$3>');
    content = content.replace(/<h4 className="([^"]*)text-\[#164399\]/g, '<h4 className="$1text-slate-600');
    content = content.replace(/<h3 className="([^"]*)text-\[#164399\]/g, '<h3 className="$1text-slate-600');

    if (content !== original) {
        fs.writeFileSync(file, content);
    }
});


console.log("Applied rounded and text colors globally!");
