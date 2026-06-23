const fs = require('fs');

function fixRadiuses(dir) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      fixRadiuses(name);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      let c = fs.readFileSync(name, 'utf8');
      let original = c;

      // modals and large cards
      c = c.replace(/max-w-\w+.*bg-white.*rounded-full/g, match => match.replace('rounded-full', 'rounded-2xl'));
      c = c.replace(/max-w-\[.*?\].*bg-white.*rounded-full/g, match => match.replace('rounded-full', 'rounded-2xl'));
      c = c.replace(/bg-white rounded-full shadow-sm border border-gray-100 overflow-hidden/g, 'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden');
      
      c = c.replace(/bg-white p-8 md:p-12 rounded-full shadow-lg/g, 'bg-white p-8 md:p-12 rounded-lg shadow-lg');
      
      c = c.replace(/bg-white rounded-full border/g, match => {
        // if it contains something like w-8, w-10, h-8, h-10, h-12 etc inside the same tag, we leave it
        // actually we just do a generic replacement for inputs because they usually have w-full or similar
        return match;
      });

      // Inputs / textareas / selects
      c = c.replace(/border border-gray-[0-9]+ rounded-full/g, match => match.replace('rounded-full', 'rounded-lg'));
      c = c.replace(/border border-slate-[0-9]+ rounded-full/g, match => match.replace('rounded-full', 'rounded-lg'));
      c = c.replace(/border border-indigo-[0-9]+ rounded-full/g, match => match.replace('rounded-full', 'rounded-lg'));
      c = c.replace(/border-amber-[0-9]+ focus-within:border-amber-[0-9]+ rounded-full/g, match => match.replace('rounded-full', 'rounded-lg'));
      c = c.replace(/border border-amber-[0-9]+ rounded-full/g, match => match.replace('rounded-full', 'rounded-lg'));
      c = c.replace(/border border-emerald-[0-9]+ rounded-full/g, match => match.replace('rounded-full', 'rounded-lg'));
      c = c.replace(/border border-gray-[0-9]+ text-gray-[0-9]+ text-\[12pt\] font-normal rounded-full/g, match => match.replace('rounded-full', 'rounded-lg'));
      
      
      c = c.replace(/bg-gray-50 border border-gray-[0-9]+ rounded-full/g, match => match.replace('rounded-full', 'rounded-lg'));
      
      // List items / cards
      c = c.replace(/p-3 bg-white rounded-full border border-[a-z]+-[0-9]+/g, match => match.replace('rounded-full', 'rounded-lg'));
      c = c.replace(/p-3 bg-white border rounded-full/g, 'p-3 bg-white border rounded-lg');
      c = c.replace(/bg-white border rounded-full/g, 'bg-white border rounded-lg'); // risky but let's see
      c = c.replace(/p-\d+ bg-white\/20 backdrop-blur-md rounded-full shadow-lg/g, match => match.replace('rounded-full', 'rounded-2xl'));

      // Revert the risky change just in case
      c = c.replace(/w-\d+ h-\d+ bg-white border rounded-lg/g, match => match.replace('rounded-lg', 'rounded-full'));
      c = c.replace(/w-\d+ flex items-center justify-center bg-white border rounded-lg/g, match => match.replace('rounded-lg', 'rounded-full'));

      // Fix some weird ones from ThietBiDuPhong
      c = c.replace(/px-6 py-3\.5 bg-white text-slate-800 rounded-full shadow-2xl/g, 'px-6 py-3.5 bg-white text-slate-800 rounded-lg shadow-2xl');
      c = c.replace(/bg-white rounded-full w-full max-w-4xl/g, 'bg-white rounded-2xl w-full max-w-4xl');
      c = c.replace(/bg-white border border-gray-200 rounded-full shadow-2xl/g, 'bg-white border border-gray-200 rounded-lg shadow-2xl');
      
      c = c.replace(/py-20 bg-white rounded-full border border-gray-100/g, 'py-20 bg-white rounded-2xl border border-gray-100');

      if (c !== original) {
        fs.writeFileSync(name, c);
      }
    }
  }
}

fixRadiuses('src/modules');
