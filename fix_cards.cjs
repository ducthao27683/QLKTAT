const fs = require('fs');

function fixCards(dir) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      fixCards(name);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      let c = fs.readFileSync(name, 'utf8');
      let original = c;

      // Cards that have padding and bg-white
      // Example: p-4 bg-white rounded-full
      c = c.replace(/(p-\d+(?:\.\d+)?\s+(?:md:p-\d+\s+)?(?:bg-[a-z]+-\d+(?:\/\d+)?|bg-white)[\s\w-]*?)rounded-full/g, '$1rounded-2xl');
      
      // Containers that are flex row or col acting as cards
      c = c.replace(/(flex\s+flex-col\s+.*?)rounded-full/g, '$1rounded-2xl');
      // bg-white shadow-* rounded-full -> rounded-2xl
      c = c.replace(/(bg-white\s+shadow-[a-z0-9]+\s+.*?)rounded-full/g, '$1rounded-2xl');
      c = c.replace(/(rounded-full)(\s+[\w-]*\s*shadow-[a-z0-9]+.*?\s+bg-white)/g, 'rounded-2xl$2');

      // Make sure small circles aren't changed
      c = c.replace(/w-([1-9]|1[0-2]|16)\s+h-([1-9]|1[0-2]|16)(.*?)rounded-2xl/g, 'w-$1 h-$2$3rounded-full');
      c = c.replace(/h-([1-9]|1[0-2]|16)\s+w-([1-9]|1[0-2]|16)(.*?)rounded-2xl/g, 'h-$1 w-$2$3rounded-full');

      // Any remaining bg-white rounded-full that is a card?
      // let's replace "bg-white overflow-hidden rounded-full" -> 2xl
      c = c.replace(/bg-white\s+overflow-hidden\s+rounded-full/g, 'bg-white overflow-hidden rounded-2xl');
      c = c.replace(/bg-white\s+rounded-full\s+overflow-hidden/g, 'bg-white rounded-2xl overflow-hidden');

      if (c !== original) {
        fs.writeFileSync(name, c);
      }
    }
  }
}

fixCards('src/modules');
