const fs = require('fs');
let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');
if (!content.includes('Send') && !content.includes('Send,')) {
    content = content.replace('import { \n', 'import { Send, \n');
    fs.writeFileSync(file, content);
}
