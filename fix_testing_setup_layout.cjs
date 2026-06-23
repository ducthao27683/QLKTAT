const fs = require('fs');

let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="space-y-1 col-span-2 md:col-span-1 flex gap-4 h-\[60px\]">/;
const replacement = `</div><div className="space-y-1 mt-4 col-span-full flex gap-4 h-[60px] max-w-[66%]">`; // close previous grid, open a new flex container for next row

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log('Fixed TestingDetailView setup layout');
} else {
    console.log('Not found');
}
