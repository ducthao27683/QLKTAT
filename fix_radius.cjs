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

      // 1. Icon buttons: w-X h-X rounded-xl -> rounded-full
      c = c.replace(/w-10 h-10([^"']*)rounded-xl/g, 'w-10 h-10$1rounded-full');
      c = c.replace(/w-9 h-9([^"']*)rounded-xl/g, 'w-9 h-9$1rounded-full');
      c = c.replace(/w-8 h-8([^"']*)rounded-xl/g, 'w-8 h-8$1rounded-full');
      c = c.replace(/w-7 h-7([^"']*)rounded-xl/g, 'w-7 h-7$1rounded-full');
      c = c.replace(/w-6 h-6([^"']*)rounded-xl/g, 'w-6 h-6$1rounded-full');
      c = c.replace(/w-5 h-5([^"']*)rounded-xl/g, 'w-5 h-5$1rounded-full');
      c = c.replace(/h-10 w-10([^"']*)rounded-xl/g, 'h-10 w-10$1rounded-full');
      c = c.replace(/h-9 w-9([^"']*)rounded-xl/g, 'h-9 w-9$1rounded-full');
      c = c.replace(/h-8 w-8([^"']*)rounded-xl/g, 'h-8 w-8$1rounded-full');

      // Small hover actions that were rounded-full
      c = c.replace(/p-1([^"']*)rounded-xl/g, 'p-1$1rounded-full');
      c = c.replace(/p-1\.5([^"']*)rounded-xl/g, 'p-1.5$1rounded-full');
      c = c.replace(/p-2([^"']*)rounded-xl([^"']*)bg-gray-100/g, 'p-2$1rounded-full$2bg-gray-100'); // hover:bg-gray-100 buttons

      // 2. Info Cards: rounded-full or rounded-xl -> rounded-2xl or 3xl
      // We had changed p-6 rounded-\[2rem\] to rounded-xl.
      c = c.replace(/p-8([^"']*)rounded-xl/g, 'p-8$1rounded-3xl');
      c = c.replace(/p-6([^"']*)rounded-xl/g, 'p-6$1rounded-2xl');
      c = c.replace(/p-5([^"']*)rounded-xl/g, 'p-5$1rounded-2xl');
      c = c.replace(/p-4([^"']*)rounded-full/g, 'p-4$1rounded-2xl');
      c = c.replace(/p-5([^"']*)rounded-full/g, 'p-5$1rounded-2xl');
      c = c.replace(/p-6([^"']*)rounded-full/g, 'p-6$1rounded-2xl');

      // 3. Status badges. Let's make sure they are rounded-full (they should be, from earlier script, but just in case)

      if (c !== original) {
        fs.writeFileSync(name, c);
      }
    }
  }
}

fixRadiuses('src/modules');
