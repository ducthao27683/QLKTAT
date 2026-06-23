const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'components', 'PmisLuoiApp.tsx');
let content = fs.readFileSync(file, 'utf8');

const regex = /\{detailForm\.type === 'device' \? \([\s\S]*?<div className="col-span-2 flex items-center justify-between bg-gray-100\/80 p-3 rounded-xl border border-slate-200\/50 mt-4 mb-2">/;

const newBlock = `{detailForm.type === 'device' ? (
                          <div className="space-y-4">
                             <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-black text-[#8B5A2B] uppercase">Cấp điện áp</label>
                                 <select 
                                   disabled={detailForm.mode === 'view'}
                                   defaultValue="110kV"
                                   className={\`w-full px-3 py-2 text-[12pt] font-bold text-amber-800 rounded-[10px] transition-all appearance-none \${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}\`}
                                 >
                                   <option>110kV</option>
                                   <option>220kV</option>
                                   <option>500kV</option>
                                   <option>35kV</option>
                                   <option>22kV</option>
                                 </select>
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-black text-[#164399] uppercase">Loại thiết bị</label>
                                 <select 
                                   disabled={detailForm.mode === 'view'}
                                   defaultValue="Máy cắt"
                                   className={\`w-full px-3 py-2 text-[12pt] font-bold text-[#164399] rounded-[10px] transition-all appearance-none \${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}\`}
                                 >
                                   <option>Máy cắt</option>
                                   <option>Biến áp</option>
                                   <option>Dao cách ly</option>
                                   <option>Biến dòng</option>
                                   <option>Chống sét van</option>
                                 </select>
                               </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-black text-red-600 uppercase">Mã thiết bị</label>
                                 <input 
                                   type="text" 
                                   defaultValue="TB-PCHY-001" 
                                   readOnly={detailForm.mode === 'view'}
                                   className={\`w-full px-3 py-2 text-[12pt] font-bold text-red-600 rounded-[10px] transition-all \${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}\`}
                                 />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-black text-gray-500 uppercase">Trạng thái</label>
                                 <select 
                                   disabled={detailForm.mode === 'view'}
                                   defaultValue="Đang vận hành"
                                   className={\`w-full px-3 py-2 text-[12pt] font-bold rounded-[10px] transition-all appearance-none \${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}\`}
                                 >
                                   <option>Đang vận hành</option>
                                   <option>Dự phòng</option>
                                   <option>Sửa chữa</option>
                                 </select>
                               </div>
                             </div>

                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Tên thiết bị</label>
                               <input 
                                 type="text" 
                                 defaultValue={detailForm.data || ""} 
                                 readOnly={detailForm.mode === 'view'}
                                 className={\`w-full px-3 py-2 text-[12pt] font-medium rounded-[10px] transition-all text-slate-700 \${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}\`}
                               />
                             </div>
                             <div className="col-span-2 flex items-center justify-between bg-gray-100/80 p-3 rounded-xl border border-slate-200/50 mt-4 mb-2">`;
if(regex.test(content)) {
  content = content.replace(regex, newBlock);
  fs.writeFileSync(file, content);
  console.log('REPLACED DEVICE FORM');
} else {
  console.log('NO MATCH');
}

