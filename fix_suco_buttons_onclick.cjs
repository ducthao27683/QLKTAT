const fs = require('fs');

let tScreen = 'src/modules/su-co/thong-tin-su-co/ThongTinSuCoScreen.tsx';
let tContent = fs.readFileSync(tScreen, 'utf8');

// 1. Fixing onClick and restoring design of "Giảm trừ" tab buttons
// Từ Thư viện
tContent = tContent.replace(
  /<button className="px-3 py-1\.5 flex items-center gap-2 rounded-lg text-\[10pt\] font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm cursor-pointer"><Archive className="w-4 h-4" \/> Từ Thư viện<\/button>/,
  `<button onClick={(e) => { e.stopPropagation(); document.getElementById('giam-tru-upload') && document.getElementById('giam-tru-upload').click(); }} className="px-3 py-1.5 flex items-center gap-2 rounded-lg text-[9pt] font-black uppercase text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm cursor-pointer"><Archive className="w-4 h-4 text-gray-400" /> Từ Thư viện</button>`
);
// Tải lên
tContent = tContent.replace(
  /<button className="px-3 py-1\.5 flex items-center gap-2 rounded-lg text-\[10pt\] font-bold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors bg-white shadow-sm cursor-pointer"><Upload className="w-4 h-4" \/> Tải lên<\/button>/,
  `<button onClick={(e) => { e.stopPropagation(); document.getElementById('giam-tru-upload') && document.getElementById('giam-tru-upload').click(); }} className="px-3 py-1.5 flex items-center gap-2 rounded-lg text-[9pt] font-black uppercase text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors bg-blue-50/50 shadow-sm cursor-pointer"><Upload className="w-4 h-4 text-blue-500" /> Tải lên</button>`
);
// Đăng ký
tContent = tContent.replace(
  /<button className="flex-1 py-2 flex items-center justify-center gap-1\.5 rounded-lg text-emerald-600 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors font-bold text-\[10pt\] shadow-sm"><CheckCircle className="w-4 h-4" \/> Đăng ký<\/button>/,
  `<button onClick={(e) => { e.stopPropagation(); setConfirmAction({ title: 'Xác nhận Đăng ký', message: 'Bạn có chắc chắn muốn đăng ký giảm trừ cho sự cố này?', confirmLabel: 'ĐỒNG Ý', cancelLabel: 'HỦY', onConfirm: () => { console.log('DANG_KY'); window.location.reload(); } }); }} className="p-2 px-3 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"><CheckCircle className="w-4 h-4" /> Đăng ký</button>`
);
// Gửi
tContent = tContent.replace(
  /<button className="flex-\[2\] py-2 flex items-center justify-center gap-2 rounded-lg bg-\[#164399\] text-white hover:bg-blue-800 transition-colors font-bold text-\[10pt\] shadow-md cursor-pointer"><Send className="w-4 h-4" \/> Gửi duyệt giảm trừ \/ Cập nhật<\/button>/,
  `<button onClick={(e) => { e.stopPropagation(); setConfirmAction({ title: 'Gửi phê duyệt', message: 'Hồ sơ sẽ được gửi lên cấp trên. Bạn có chắc chắn?', confirmLabel: 'GỬI', cancelLabel: 'HỦY', onConfirm: () => { console.log('GUI'); window.location.reload(); } }); }} className="flex-1 p-2 bg-[#164399] text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md font-bold text-[10pt]"><Send className="w-4 h-4" /> Gửi duyệt giảm trừ</button>`
);

fs.writeFileSync(tScreen, tContent);
console.log('Restored onClick and designs for ThongTinSuCoScreen buttons');
