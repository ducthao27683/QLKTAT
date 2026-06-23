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
  if (full.endsWith('.tsx') || full.endsWith('.ts')) {
    let content = fs.readFileSync(full, 'utf8');

    // Rule 3: Tất cả tiêu đề các vùng thông tin trên các Tab, Form chi tiết: Màu Xám đậm (text-gray-700).
    const regex = /(<(h[1-5]|p|span|div)[^>]*?className=")[^"]*?(uppercase tracking-(?:tight|wider|widest|tighter))[^"]*?(")/gs;
    content = content.replace(regex, (match) => {
      // replace anything like text-gray-xxx or text-slate-xxx with text-gray-700
      let updated = match.replace(/text-(?:gray|slate|blue|pink|red|green|sky|violet|purple|amber|teal|indigo|orange)-[0-9]+/g, 'text-gray-700');
      // What if it had `#xxxxxx` color?
      updated = updated.replace(/text-\[#[a-zA-Z0-9]+\]/g, 'text-gray-700');
      // If none of those existed, we might want to inject text-gray-700?
      if (!updated.includes('text-gray-700')) {
         updated = updated.replace(/className="/, 'className="text-gray-700 ');
      }
      return updated;
    });

    // Also look for `h[1-5]` that are titles but maybe not uppercase tracked.
    const regex2 = /(<(h[3-5])[^>]*?className=")[^"]*?(")/gs;
    content = content.replace(regex2, (match, open, tag, close) => {
      if (match.includes('text-gray-700')) return match;
      return match.replace(/text-(?:gray|slate|blue|pink|red|green|sky|violet|purple|amber|teal|indigo|orange)-[0-9]+/g, 'text-gray-700').replace(/text-\[#[a-zA-Z0-9]+\]/g, 'text-gray-700');
    });

    fs.writeFileSync(full, content);
  }
});
