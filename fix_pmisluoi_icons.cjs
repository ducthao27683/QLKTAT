const fs = require('fs');

let file = 'src/components/PmisLuoiApp.tsx';
let content = fs.readFileSync(file, 'utf8');

// The Edit button
content = content.replace(
  /<button \s*onClick=\{\(\) => setDetailForm\(\{ \.\.\.detailForm, mode: 'edit' \}\)\}\s*className="p-2 text-\[#164399\] hover:bg-blue-50 rounded-lg transition-all border border-gray-200" \s*title="Sửa"\s*>/,
  `<button onClick={() => setDetailForm({ ...detailForm, mode: 'edit' })} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500" title="Sửa">`
);

// The Copy button
content = content.replace(
  /<button \s*onClick=\{\(\) => setDetailForm\(\{ \.\.\.detailForm, mode: 'add' \}\)\}\s*className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all border border-gray-200" \s*title="Copy"\s*>/,
  `<button onClick={() => setDetailForm({ ...detailForm, mode: 'add' })} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500" title="Copy">`
);

// The Delete button
content = content.replace(
  /<button \s*onClick=\{\(\) => \{\s*setConfirmAction\(\{[\s\S]*?\}\);\s*\}\}\s*className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all border border-gray-200 cursor-pointer" \s*title="Xóa"\s*>/,
  `<button onClick={() => { setConfirmAction({ title: 'Xác nhận xóa', message: 'Bạn có chắc chắn muốn xóa hồ sơ phiếu này không?', onConfirm: () => { setDetailForm(null); } }); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 cursor-pointer" title="Xóa">`
);

fs.writeFileSync(file, content);
console.log('Restored simple icons in PmisLuoiApp popup header');
