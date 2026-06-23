const fs = require('fs');

function fixTestingDetailView() {
  let file = 'src/modules/thi-nghiem/components/TestingDetailView.tsx';
  let content = fs.readFileSync(file, 'utf8');

  // Tab Thông tin chung: Mã, Loại bo góc 20%
  // Line 615: `rounded-full` -> `rounded-lg`
  content = content.replace(
    /font-mono font-bold text-\[10pt\] uppercase px-2\.5 py-1\.5 rounded-full border border-red-100/g,
    'font-mono font-bold text-[10pt] uppercase px-2.5 py-1.5 rounded-lg border border-red-100'
  );
  // Line 620: `rounded-[10px]` -> `rounded-lg`
  content = content.replace(
    /px-3 py-1\.5 rounded-\[10px\] border border-blue-100/g,
    'px-3 py-1.5 rounded-lg border border-blue-100'
  );

  // Chọn loại kiểm tra bo góc 20%
  content = content.replace(
    /px-4 py-2\.5 rounded-2xl border transition-all (.*?) bg-\[#164399\]\/10 border-\[#164399\]\/20/g,
    'px-4 py-2.5 rounded-lg border transition-all $1 bg-[#164399]/10 border-[#164399]/20'
  );
  content = content.replace(
    /className=\{\`flex items-center gap-2 cursor-pointer px-4 py-2\.5 rounded-2xl border transition-all/g,
    'className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg border transition-all'
  );

  // Ngày tiếp theo ở trước Trạng thái hạn và cùng hàng với Trạng thái
  // AND: Ô hiện trạng thái bo góc 50%
  // Replace the HTML structure inside config form
  // Find the exact grid structure
  const configBlockOld = `<div className="space-y-1">
                            <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">Ngày tiếp theo</label>
                            <input 
                              type="date" 
                              value={formConfig.nextTest || addMonthsToDate(formConfig.lastTest || '2024-05-15', formConfig.interval || '24 tháng')} 
                              onChange={(e) => updateFormConfig('nextTest', e.target.value)}
                              disabled={detailForm.mode === 'view'}
                              className={\`w-full px-3 py-1.5 text-[10pt] font-bold rounded-lg bg-white \${
                                detailForm.mode === 'view' 
                                  ? 'border-transparent shadow-none pointer-events-none appearance-none font-black' 
                                  : 'border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm font-black'
                              } disabled:bg-white text-gray-700 transition-all\`} 
                            />
                          </div>

                          <div className="space-y-1 col-span-2 md:col-span-1">
                            <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">Trạng thái hạn</label>
                            <div className={\`w-full px-3 py-1.5 text-[10pt] rounded-lg border flex items-center justify-center font-black h-[34px] shadow-sm select-none \${statusInfo.colorClass}\`}>
                              {statusInfo.label}
                            </div>
                          </div>`;
  const configBlockNew = `<div className="space-y-1 col-span-2 md:col-span-1 flex gap-4 h-[60px]">
                            <div className="flex-1 space-y-1">
                              <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">Ngày tiếp theo</label>
                              <input 
                                type="date" 
                                value={formConfig.nextTest || addMonthsToDate(formConfig.lastTest || '2024-05-15', formConfig.interval || '24 tháng')} 
                                onChange={(e) => updateFormConfig('nextTest', e.target.value)}
                                disabled={detailForm.mode === 'view'}
                                className={\`w-full px-3 py-1.5 text-[10pt] font-bold rounded-lg bg-white \${
                                  detailForm.mode === 'view' 
                                    ? 'border-transparent shadow-none pointer-events-none appearance-none font-black' 
                                    : 'border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm font-black'
                                } disabled:bg-white text-gray-700 transition-all\`} 
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">Trạng thái hạn</label>
                              <div className={\`w-full px-3 py-1 text-[9pt] rounded-full border flex items-center justify-center font-black h-[34px] shadow-sm select-none \${statusInfo.colorClass}\`}>
                                {statusInfo.label}
                              </div>
                            </div>
                          </div>`;
  content = content.replace(configBlockOld, configBlockNew);

  fs.writeFileSync(file, content);
}

fixTestingDetailView();
console.log('Fixed TestingDetailView part 1');
