const fs = require('fs');

function fixDanhMucThiNghiem() {
  let file = 'src/modules/thi-nghiem/danh-muc-thi-nghiem/DanhMucThiNghiemScreen.tsx';
  let content = fs.readFileSync(file, 'utf8');

  // DanhMucThiNghiemScreen: Tên thiết bị không in đậm
  content = content.replace(
    /<h4 className=\{\`text-\[11\.5pt\] font-black mb-1 line-clamp-2 leading-snug/g,
    '<h4 className={`text-[11.5pt] font-medium mb-1 line-clamp-2 leading-snug'
  );

  // Ô Mã, Loại thiết bị bo góc 20%
  content = content.replace(
    /font-mono px-1\.5 py-0\.5 rounded-full bg-red-50/g,
    'font-mono px-1.5 py-0.5 rounded-lg bg-red-50'
  );
  content = content.replace(
    /gap-1 px-2 py-0\.5 rounded-\[10px\]/g,
    'gap-1 px-2 py-0.5 rounded-lg'
  );
  content = content.replace(
    /px-3 py-1\.5 rounded-full border border-red-100/g,
    'px-3 py-1.5 rounded-lg border border-red-100'
  );
  content = content.replace(
    /px-3 py-1\.5 rounded-\[10px\] border border-blue-100/g,
    'px-3 py-1.5 rounded-lg border border-blue-100'
  );

  // Switch Hạn: Bo góc 50%
  // Line 813: bg-slate-100 p-0.5 rounded-xl border border-slate-200
  // Line 825: px-4 h-full rounded-xl transition-all
  content = content.replace(
    /<div className="hidden md:flex bg-slate-100 p-0\.5 rounded-xl border border-slate-200/g,
    '<div className="hidden md:flex bg-slate-100 p-0.5 rounded-full border border-slate-200'
  );
  content = content.replace(
    /className=\{\`px-4 h-full rounded-xl transition-all/g,
    'className={`px-4 h-full rounded-full transition-all'
  );

  // Tab Hạng mục kiểm tra: Chữ trên Header của Bảng màu Xanh chính
  // Need to search for "Hạng mục kiểm tra" table header... I'll check what className it is.
  content = content.replace(
    /<thead className="bg-\[#f8fafc\] text-slate-500 font-extrabold text-\[8pt\] border-y border-slate-200 shadow-xs uppercase">/g,
    '<thead className="bg-[#f8fafc] text-[#164399] font-extrabold text-[8pt] border-y border-slate-200 shadow-xs uppercase">'
  );

  fs.writeFileSync(file, content);
}

fixDanhMucThiNghiem();
console.log('Fixed Danh Muc Thi Nghiem');
