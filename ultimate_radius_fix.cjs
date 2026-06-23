const fs = require('fs');

function globalRadiusFix(dir) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      globalRadiusFix(name);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      let c = fs.readFileSync(name, 'utf8');
      let original = c;

      // FIRST: Convert ALL rounded-full to rounded-xl
      // Wait, there might be border toggles that should stay rounded-full.
      c = c.replace(/rounded-full/g, 'rounded-xl');

      // THEN: Restore rounded-full for things that MUST be circles/pills.

      // 1. Icons / Avatars (w-X h-X)
      // Usually matching: `w-\d+ h-\d+ ... rounded-xl` or `rounded-xl ... w-\d+ h-\d+`
      // Let's do this safely
      const iconSizes = ['1', '1.5', '2', '2.5', '3', '4', '4.5', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24'];
      iconSizes.forEach(size => {
        const w_h = new RegExp(`w-${size}\\s+h-${size}([^"']*)rounded-xl`, 'g');
        c = c.replace(w_h, `w-${size} h-${size}$1rounded-full`);
        
        const rounded_w_h = new RegExp(`rounded-xl([^"']*)w-${size}\\s+h-${size}`, 'g');
        c = c.replace(rounded_w_h, `rounded-full$1w-${size} h-${size}`);
        
        const h_w = new RegExp(`h-${size}\\s+w-${size}([^"']*)rounded-xl`, 'g');
        c = c.replace(h_w, `h-${size} w-${size}$1rounded-full`);
      });

      // 2. Status badges / Pills (px-X py-Y)
      // Usually px-2 py-0.5, px-2.5 py-1, px-3 py-1, px-4 py-1.5, px-1.5 py-0.5
      // Typical classes: px-2.5 py-1 rounded-xl, etc.
      const pillPxs = ['1.5', '2', '2.5', '3', '4', '5', '6'];
      const pillPys = ['0.5', '1', '1.5', '2'];
      pillPxs.forEach(px => {
        pillPys.forEach(py => {
          const regex1 = new RegExp(`px-${px}\\s+py-${py}([^"']*)rounded-xl`, 'g');
          c = c.replace(regex1, `px-${px} py-${py}$1rounded-full`);
          
          const regex2 = new RegExp(`rounded-xl([^"']*)px-${px}\\s+py-${py}`, 'g');
           c = c.replace(regex2, `rounded-full$1px-${px} py-${py}`);
        });
      });
      // some badges only have p-1 px-3 or something
      c = c.replace(/px-3 py-0\.5([^"']*)rounded-xl/g, 'px-3 py-0.5$1rounded-full');
      c = c.replace(/px-6 py-2([^"']*)rounded-xl([^"']*?)bg-blue-50/g, 'px-6 py-2$1rounded-full$2bg-blue-50'); // exceptions if any? The user said "nút bấm (Xác nhận, thêm, xem) CHỈ 20%", so px-4 py-2 is a button, should stay XL!
      
      // Wait, "px-4 py-1.5 bg-blue-50 text-[#164399] rounded-full" is a pill button in some tables. We can leave it xl or full. Let's make sure BUTTONS are rounded-lg!
      
      // Fix Buttons to rounded-lg
      // Find all <button ... rounded-xl
      c = c.replace(/<button([^>]+)rounded-xl([^>]*)>/g, '<button$1rounded-lg$2>');
      c = c.replace(/<button([^>]+)rounded-full([^>]*)>/g, '<button$1rounded-lg$2>');
      // Any generic action buttons with bg-[#164399] or bg-blue-600
      c = c.replace(/(bg-\[#164399\]|bg-blue-[5-7]00|bg-emerald-[5-7]00|bg-red-[5-7]00)([^"']*?)rounded-xl([^"']*?)(hover:)/g, '$1$2rounded-lg$3$4');
      c = c.replace(/(bg-\[#164399\]|bg-blue-[5-7]00|bg-emerald-[5-7]00|bg-red-[5-7]00)([^"']*?)(text-white)([^"']*?)rounded-xl/g, '$1$2$3$4rounded-lg');
      
      // Wait, status pills that have text-red-600 bg-red-50 should be rounded-full
      c = c.replace(/bg-red-[5]0([^"']*)text-red-(600|700)([^"']*)rounded-(xl|lg)/g, 'bg-red-50$1text-red-$2$3rounded-full');
      c = c.replace(/bg-emerald-[5]0([^"']*)text-emerald-(600|700)([^"']*)rounded-(xl|lg)/g, 'bg-emerald-50$1text-emerald-$2$3rounded-full');
      c = c.replace(/bg-amber-[5]0([^"']*)text-amber-(600|700)([^"']*)rounded-(xl|lg)/g, 'bg-amber-50$1text-amber-$2$3rounded-full');
      c = c.replace(/bg-blue-[5]0([^"']*)text-(blue|\[#164399\])([^"']*)rounded-(xl|lg|2xl)([^"']*?)(inline-block|px-2|px-3)/g, 'bg-blue-50$1text-$2$3rounded-full$5$6');
      c = c.replace(/bg-slate-[5]0([^"']*)text-(gray|slate)-(500|600|550)([^"']*)rounded-(xl|lg|2xl)([^"']*?)(inline-block|px-2|px-3)/g, 'bg-slate-50$1text-$2-$3$4rounded-full$6$7');

      // Specific inputs, selects, textareas -> rounded-lg
      c = c.replace(/<input([^>]+)rounded-(xl|full)([^>]*)>/g, '<input$1rounded-lg$3>');
      c = c.replace(/<select([^>]+)rounded-(xl|full)([^>]*)>/g, '<select$1rounded-lg$3>');
      c = c.replace(/<textarea([^>]+)rounded-(xl|full)([^>]*)>/g, '<textarea$1rounded-lg$3>');

      // specific giant cards -> rounded-2xl
      c = c.replace(/(p-[6-8]\s+md:p-12|p-[6-8]\s+bg-white)([^"']*)rounded-xl/g, '$1$2rounded-2xl');

      // Toggles bg-gray-200 p-0.5 rounded-full -> that's fine as full or xl. Let's make sure it's rounded-full
      c = c.replace(/p-0\.5([^"']*)rounded-xl([^"']*?)select-none/g, 'p-0.5$1rounded-full$2select-none');

      // Pagination circles
      c = c.replace(/w-7 h-7([^"']*)rounded-xl/g, 'w-7 h-7$1rounded-full');

      if (c !== original) {
        fs.writeFileSync(name, c);
      }
    }
  }
}

globalRadiusFix('src/modules');
