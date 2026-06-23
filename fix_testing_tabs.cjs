const fs = require('fs');

let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

const regexTestingPlanTabs = /\{\s*\[\s*\{\s*id:\s*'general',\s*label:\s*'Thông tin chung'\s*\},\s*\{\s*id:\s*'devices',\s*label:\s*'Danh sách thiết bị đăng ký'\s*\},(?:\s*...\(detailForm\.mode === 'view' \? \[\{\s*id:\s*'history',\s*label:\s*'Ý kiến & Lịch sử'\s*\}\] : \[\]\)|\s*\{\s*id:\s*'history',\s*label:\s*'Ý kiến & Lịch sử'\s*\})\s*\]\.map\(tab => \{/s;

const newTestingPlanTabs = `{
            [
              { id: 'general', label: 'Thông tin chung' },
              { id: 'devices', label: 'Danh sách thiết bị đăng ký' },
              ...(detailForm.mode === 'view' ? [{ id: 'history', label: 'Ý kiến & Lịch sử' }] : [])
            ].map(tab => {`;

if (content.match(regexTestingPlanTabs)) {
    content = content.replace(regexTestingPlanTabs, newTestingPlanTabs);
} else {
    // try fallback 
    content = content.replace(
`            [
              { id: 'general', label: 'Thông tin chung' },
              { id: 'devices', label: 'Danh sách thiết bị đăng ký' },
              { id: 'history', label: 'Ý kiến & Lịch sử' }
            ].map(tab => {`, newTestingPlanTabs);
}

fs.writeFileSync(file, content);
console.log('Fixed TestingDetailTabs');
