const fs = require('fs');

let file = 'src/modules/su-co/thong-tin-su-co/ThongTinSuCoScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Mã viền mờ nhạt
content = content.replace(
  /<span className="text-\[9pt\] font-black tracking-wider font-mono text-red-600">SC-00\{item\.id\}<\/span>/g,
  '<span className="text-[9pt] font-black tracking-wider font-mono text-red-600 px-2 py-0.5 rounded border border-red-100 bg-red-50">SC-00{item.id}</span>'
);

// 2. Ngày giờ chữ BLUE
content = content.replace(
  /<span className="text-\[10pt\] font-black text-\[#164399\]">• \{day\}\/\{month\}\/\{year\} \{time\}<\/span>/g,
  '<span className="text-[10pt] font-black text-blue-600">• {day}/{month}/{year} {time}</span>'
);

// 3. Buttons from ThongTinSuCoScreen Tab "Giảm trừ"
const dangKyMatch = /<button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">\s*Đăng ký\s*<\/button>/;
const btnDangKyNew = `<button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md cursor-pointer whitespace-nowrap flex items-center justify-center gap-2">Đăng ký</button>`;
content = content.replace(dangKyMatch, btnDangKyNew);

const btnThuVienMatch = /<button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">\s*<Archive className="w-3\.5 h-3\.5" \/>\s*Thư viện\s*<\/button>/;
const btnThuVienNew = `<button className="px-3 py-1.5 flex items-center gap-2 rounded-lg text-[10pt] font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm cursor-pointer"><Archive className="w-4 h-4" /> Từ Thư viện</button>`;
content = content.replace(btnThuVienMatch, btnThuVienNew);

const btnTaiLenMatch = /<button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">\s*<Upload className="w-3\.5 h-3\.5" \/>\s*Tải lên\s*<\/button>/;
const btnTaiLenNew = `<button className="px-3 py-1.5 flex items-center gap-2 rounded-lg text-[10pt] font-bold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors bg-white shadow-sm cursor-pointer"><Upload className="w-4 h-4" /> Tải lên</button>`;
content = content.replace(btnTaiLenMatch, btnTaiLenNew);

// Nut Gui
const guiMatch = /<button className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer">\s*Gửi\s*<\/button>/g;
const btnGuiNew = `<button className="px-6 h-full bg-[#164399] text-white font-bold rounded-lg hover:bg-[#164399]/90 transition-all shadow-md cursor-pointer whitespace-nowrap flex items-center justify-center gap-2">Gửi</button>`;
content = content.replace(guiMatch, btnGuiNew);

// Tab thong tin chung (Chi tiet): Them thong tin Nguoi - Ngay khoi tao
const descLoc = /<div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">/;
const newDescLoc = `
  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
      <div>
        <p className="text-[10pt] text-gray-500 mb-1">Khởi tạo</p>
        <p className="text-[11pt] font-bold text-slate-700">Nguyễn Văn A - 10/06/2026</p>
      </div>
      <div>
        <p className="text-[10pt] text-gray-500 mb-1">Cập nhật mới nhất</p>
        <p className="text-[11pt] font-bold text-slate-700">Trần Thị B - 12/06/2026</p>
      </div>
    </div>`;
content = content.replace(descLoc, newDescLoc);

fs.writeFileSync(file, content);
console.log('Fixed Su Co screen buttons and info');
