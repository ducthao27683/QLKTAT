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

    // Pattern for Trash2
    content = content.replace(/(<(?:button|div)[^>]*>)\s*<Trash2 ([^>]+)\/>\s*<\/(?:button|div)>/g, (match, openTag, iconAttrs) => {
      if (openTag.includes('Trash2')) return match; // avoid nesting issue
      let newClass = 'p-1.5 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors rounded-[20%] border-none cursor-pointer';
      
      let newOpenTag;
      if (openTag.includes('className="')) {
        newOpenTag = openTag.replace(/className="[^"]*"/, `className="${newClass}"`);
      } else {
        newOpenTag = openTag.replace(/<([a-zA-Z0-9]+) /, `<$1 className="${newClass}" `);
      }
      return `${newOpenTag}\n<Trash2 ${iconAttrs}/>\n</${openTag.match(/<([a-zA-Z0-9]+)/)[1]}>`;
    });

    // Pattern for Edit
    content = content.replace(/(<(?:button|div)[^>]*>)\s*<Edit ([^>]+)\/>\s*<\/(?:button|div)>/g, (match, openTag, iconAttrs) => {
      if (openTag.includes('Edit')) return match;
      let newClass = 'p-1.5 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors rounded-[20%] border-none cursor-pointer';
      
      let newOpenTag;
      if (openTag.includes('className="')) {
        newOpenTag = openTag.replace(/className="[^"]*"/, `className="${newClass}"`);
      } else {
        newOpenTag = openTag.replace(/<([a-zA-Z0-9]+) /, `<$1 className="${newClass}" `);
      }
      return `${newOpenTag}\n<Edit ${iconAttrs}/>\n</${openTag.match(/<([a-zA-Z0-9]+)/)[1]}>`;
    });

    // Pattern for Copy
    content = content.replace(/(<(?:button|div)[^>]*>)\s*<Copy ([^>]+)\/>\s*<\/(?:button|div)>/g, (match, openTag, iconAttrs) => {
      // NOTE: Copy might have text like `<Copy ... /> Sao chép` - this simple regex only matches when `<Copy/>` is the ONLY child.
      // But the regex I wrote is `>\s*<Copy ([^>]+)\/>\s*</`, which MEANS it only replaces when it's exactly just the icon inside.
      if (openTag.includes('Copy')) return match;
      let newClass = 'p-1.5 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors rounded-[20%] border-none cursor-pointer';
      
      let newOpenTag;
      if (openTag.includes('className="')) {
        newOpenTag = openTag.replace(/className="[^"]*"/, `className="${newClass}"`);
      } else {
        newOpenTag = openTag.replace(/<([a-zA-Z0-9]+) /, `<$1 className="${newClass}" `);
      }
      return `${newOpenTag}\n<Copy ${iconAttrs}/>\n</${openTag.match(/<([a-zA-Z0-9]+)/)[1]}>`;
    });

    fs.writeFileSync(full, content);
  }
});
