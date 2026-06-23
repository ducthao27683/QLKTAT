const fs = require('fs');
let file = 'src/modules/thi-nghiem/components/ReportDetailView.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
`        {[
          { id: 'info', label: 'Thông tin chung', icon: InfoIcon },
          { id: 'result', label: 'Kết quả đo', icon: FlaskConical },
          { id: 'attachments', label: 'Đính kèm', icon: Camera },
          { id: 'signing', label: 'Ký duyệt', icon: Check }
        ].map`,
`        {[
          { id: 'info', label: 'Thông tin chung', icon: InfoIcon },
          { id: 'result', label: 'Kết quả đo', icon: FlaskConical },
          { id: 'attachments', label: 'Đính kèm', icon: Camera },
          ...(detailForm.mode === 'view' ? [{ id: 'signing', label: 'Ký duyệt', icon: Check }] : [])
        ].map`
);

fs.writeFileSync(file, content);
console.log('Fixed ReportDetailView tabs');
