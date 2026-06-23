const fs = require('fs');

let file = 'src/modules/thiet-bi/thong-tin-thiet-bi/components/PopupCapNhatThietBi.tsx';
let content = fs.readFileSync(file, 'utf8');

// The exact structure in `PopupCapNhatThietBi.tsx` has `grid grid-cols-2 gap-4` for all fields. Let's isolate "Ngày vận hành" and onwards.
// "Ngày vận hành", "Mã liên kết", "Số S/N", "Mã CMIS", "Số thẻ TSCD", "Góc lái", "Khoảng cách", "Tiếp địa", "Khu vực"
// And put them under THÔNG SỐ KỸ THUẬT

const regexParams = /(<div className="space-y-1">\s*<label className="text-\[10pt\] font-bold text-gray-500 uppercase">Ngày vận hành<\/label>[\s\S]*?)<div className="space-y-1">\s*<label className="text-\[10pt\] font-bold text-gray-500 uppercase">Mô tả chi tiết<\/label>/;

const paramsBox = `</div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner mt-6">
              <h4 className="text-[11pt] font-black text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings w-4 h-4 text-slate-500"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                Thông số kỹ thuật
              </h4>
              <div className="grid grid-cols-2 gap-4">
                $1
              </div>
            </div>
            <div className="space-y-1 mt-6">
              <label className="text-[10pt] font-bold text-gray-500 uppercase">Mô tả chi tiết</label>`;

if (content.match(regexParams)) {
    content = content.replace(regexParams, paramsBox);
} else {
    console.log("Could not find params regex");
}

// And images / attachments layout
// Let's copy from what we did in fix_device_media.cjs
const imagesRegex = /<div className="space-y-8">\s*<div className="space-y-4">\s*<h4 className="text-\[12pt\] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">\s*<Camera className="w-3\.5 h-3\.5" \/>\s*Hình ảnh liên quan\s*<\/h4>[\s\S]*?(<div className="space-y-4">\s*<h4 className="text-\[12pt\] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">\s*<FileText className="w-3\.5 h-3\.5" \/>\s*Tài liệu đính kèm\s*<\/h4>[\s\S]*?<\/div>)\s*<\/div>/;

const newMediaLayout = `<div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-inner">
            <h4 className="text-[11pt] font-black text-slate-700 uppercase tracking-widest flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image w-4 h-4 text-slate-500"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                Hình ảnh liên quan
              </div>
              <span className="text-[9pt] font-medium text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">2 hình ảnh</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {(() => {
                const images = [1, 2];
                const displayImages = [...images];
                if (displayImages.length % 2 !== 0 && !isView) {
                  displayImages.push(-1);
                }
                return (
                  <>
                    {displayImages.map((imgId, idx) => (
                      imgId === -1 ? (
                        <div key={\`placeholder-\${idx}\`} className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-100 flex items-center justify-center">
                           <span className="text-slate-400 font-bold text-[9pt]">+ Thêm ảnh</span>
                        </div>
                      ) : (
                        <div key={imgId} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group bg-slate-200 shadow-sm">
                          <img src={\`https://picsum.photos/seed/device-\${imgId}/400/225\`} alt="Image" className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" />
                          {!isView && (
                            <button className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer transition-colors shadow-sm backdrop-blur-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 w-3.5 h-3.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </button>
                          )}
                        </div>
                      )
                    ))}
                    {!isView && (
                      <div className={displayImages.length % 2 === 0 ? "col-span-2 pt-2" : "col-span-2 pt-2"}>
                        <FileUploader type="image" mode={detailForm.mode} />
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-inner">
            <h4 className="text-[11pt] font-black text-slate-700 uppercase tracking-widest flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-4 h-4 text-slate-500"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                Tài liệu đính kèm
              </div>
              <span className="text-[9pt] font-medium text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">1 tài liệu</span>
            </h4>
            <div className="space-y-2">
              {[1].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <span className="text-blue-600 font-bold text-[9px] uppercase tracking-wider">PDF</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10pt] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Tai_lieu_HDSD_v1.pdf</span>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">1.2 MB • Nguyễn Văn A</p>
                    </div>
                  </div>
                  {!isView && (
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 w-4 h-4"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  )}
                </div>
              ))}
              {!isView && (
                <div className="pt-2">
                  <FileUploader type="document" mode={detailForm.mode} />
                </div>
              )}
            </div>
          </div>
        </div>`;

if (content.match(imagesRegex)) {
    content = content.replace(imagesRegex, newMediaLayout);
}

fs.writeFileSync(file, content);
console.log("Fixed Thiet bi detail layout");
