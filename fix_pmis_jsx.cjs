const fs = require('fs');

let file = 'src/components/PmisLuoiApp.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetFix = `</div></div>
                          
                          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                             <div className="flex items-center justify-between border-b border-gray-100 pb-3">`;

const replaceFix = `</div>
                             <div className="col-span-2 flex items-center justify-between border-b border-gray-100 pb-3 mt-4 pt-4 border-t">`;

if (content.includes(targetFix)) {
    content = content.replace(targetFix, replaceFix);
    fs.writeFileSync(file, content);
    console.log('Fixed PmisLuoiApp JSX error');
}

