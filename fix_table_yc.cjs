const fs = require('fs');

const file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. hide showTestingFilter by default on viewType === 'thiet_bi'
// Replace "setShowTestingFilter(true);" -> "// setShowTestingFilter(true);"
// Wait, better regex:
content = content.replace(/setShowTestingFilter\(true\);/g, 'setShowTestingFilter(false);');

// 2. State for hasPlanFilter
if (!content.includes('const [hasPlanFilter')) {
  content = content.replace(
    /const \[deviceFilter, setDeviceFilter\] = useState<string>\('Tất cả'\);/g, 
    "const [deviceFilter, setDeviceFilter] = useState<string>('Tất cả');\n  const [hasPlanFilter, setHasPlanFilter] = useState<'Chưa Kế hoạch' | 'Có Kế hoạch'>('Chưa Kế hoạch');"
  );
}

// 3. Filter devices based on hasPlan
if (!content.includes('let matchHasPlan')) {
  // Add hasPlan check in flattenedDevices
  const origListPush = `        let matchStatus = deviceFilter === 'Tất cả' || dev.approvalStatus === deviceFilter;
        let matchType = deviceTypeFilter === 'Tất cả' || dev.type === deviceTypeFilter;
        
        // App-wide Status checks if search filter
        
        if (matchStatus && matchType) {`;
        
  const newListPush = `        let matchStatus = deviceFilter === 'Tất cả' || dev.approvalStatus === deviceFilter;
        let matchType = deviceTypeFilter === 'Tất cả' || dev.type === deviceTypeFilter;
        
        const hasPlanStr = String(plan.id) + String(dev.id || dev.name);
        const hasPlanHash = hasPlanStr.split('').reduce((a,b) => a+b.charCodeAt(0), 0);
        const hasPlanAssigned = hasPlanHash % 3 === 0;
        const mockPrevDate = dev.nextDue ? dev.nextDue.replace('2026', '2025').replace('2027', '2026') : '2025-05-15';
        const mockNextDate = dev.nextDue || plan.startDate || '2026-05-15';

        let matchHasPlan = true;
        if (hasPlanFilter === 'Chưa Kế hoạch') matchHasPlan = !hasPlanAssigned;
        if (hasPlanFilter === 'Có Kế hoạch') matchHasPlan = !!hasPlanAssigned;

        if (matchStatus && matchType && matchHasPlan) {
          dev.hasPlan = hasPlanAssigned;
          dev.prevDate = mockPrevDate;
          dev.nextDate = mockNextDate;`;
  content = content.replace(origListPush, newListPush);

  // Add hasPlanFilter to dependency array of flattenedDevices
  content = content.replace(/\]\);\n\n  \/\/ Extract distinct types/, ', hasPlanFilter]);\n\n  // Extract distinct types');
  // Or handle carefully
  content = content.replace(/\[filteredPlans, deviceFilter, deviceTypeFilter\]\);/g, '[filteredPlans, deviceFilter, deviceTypeFilter, hasPlanFilter]);');
  content = content.replace(/\[filteredPlans, deviceFilter\]\);/g, '[filteredPlans, deviceFilter, deviceTypeFilter, hasPlanFilter]);');
}

// 4. Update the "Chưa Kế hoạch" / "Có Kế hoạch" Switch
// Near `TRẠNG THÁI DUYỆT`
const filterHtml = `<label className="text-[9pt] font-black text-[#164399] uppercase tracking-widest pl-2">TRẠNG THÁI DUYỆT</label>`;
content = content.replace(filterHtml, '');

const selectHtml = `<select 
                          value={deviceFilter}
                          onChange={(e) => setDeviceFilter(e.target.value)}
                          className="bg-white border border-blue-200 text-[#164399] rounded-lg px-2.5 py-1 text-[9pt] outline-none font-bold h-8 focus:border-blue-400 min-w-[140px] shadow-sm"
                        >
                          <option value="Tất cả">Tất cả</option>
                          <option value="Chờ duyệt">Chờ duyệt</option>
                          <option value="Đã duyệt">Đã duyệt</option>
                          <option value="Không duyệt">Không duyệt</option>
                        </select>`;

const newSelectHtml = `${selectHtml}
                        <div className="flex bg-slate-100 p-0.5 rounded-full border border-slate-200 ml-2">
                          <button 
                            onClick={() => setHasPlanFilter('Chưa Kế hoạch')}
                            className={\`px-3 py-1 rounded-full text-[8.5pt] font-bold transition-all \${hasPlanFilter === 'Chưa Kế hoạch' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}\`}
                          >
                            Chưa Kế hoạch
                          </button>
                          <button 
                            onClick={() => setHasPlanFilter('Có Kế hoạch')}
                            className={\`px-3 py-1 rounded-full text-[8.5pt] font-bold transition-all \${hasPlanFilter === 'Có Kế hoạch' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}\`}
                          >
                            Có Kế hoạch
                          </button>
                        </div>`;
content = content.replace(selectHtml, newSelectHtml);

// Try fallback if rounded-lg replaced failed above (maybe it's rounded-[6px])
const selectHtmlFallback = `<select 
                          value={deviceFilter}
                          onChange={(e) => setDeviceFilter(e.target.value)}
                          className="bg-white border border-blue-200 text-[#164399] rounded-[6px] px-2.5 py-1 text-[9pt] outline-none font-bold h-8 focus:border-blue-400 min-w-[140px] shadow-sm"
                        >`;
if (content.includes(selectHtmlFallback) && !content.includes('hasPlanFilter ===')) {
  // Try alternative replacement
  content = content.replace(selectHtmlFallback, `${selectHtmlFallback}
                        <div className="flex bg-slate-100 p-0.5 rounded-full border border-slate-200 ml-2">
                          <button 
                            onClick={() => setHasPlanFilter('Chưa Kế hoạch')}
                            className={\`px-3 py-1 rounded-full text-[8.5pt] font-bold transition-all \${hasPlanFilter === 'Chưa Kế hoạch' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}\`}
                          >
                            Chưa Kế hoạch
                          </button>
                          <button 
                            onClick={() => setHasPlanFilter('Có Kế hoạch')}
                            className={\`px-3 py-1 rounded-full text-[8.5pt] font-bold transition-all \${hasPlanFilter === 'Có Kế hoạch' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}\`}
                          >
                            Có Kế hoạch
                          </button>
                        </div>`);
}

// + Lập Kế hoạch conditional button
const originalButtonsHtml = `<div className="flex gap-2">
                       {selectedGlobalDeviceIds.length > 0 && (
                          <div className="flex gap-2">`;
if (content.includes(originalButtonsHtml)) {
  const newButtonsHtml = `<div className="flex gap-2">
                       {hasPlanFilter === 'Chưa Kế hoạch' && (
                          <button className="px-4 h-8 bg-[#164399] hover:bg-blue-800 text-white rounded-lg flex items-center gap-1.5 text-[9pt] font-bold shadow-sm whitespace-nowrap transition-colors">
                              <Plus className="w-4 h-4" /> Lập KH từ TB này
                          </button>
                       )}
                       {selectedGlobalDeviceIds.length > 0 && (
                          <div className="flex gap-2">`;
  content = content.replace(originalButtonsHtml, newButtonsHtml);
}

// 5. Fix table header positions and columns
// sticky top-0 z-10 => sticky top-0 z-[100]
// Cột "Đã có KH" after Loại Kì (before "Loại kiểm tra")
// Add "Ngày KT Gần nhất", "Ngày KT tiếp theo"
const thThead = `<thead className="bg-[#f0f4fa] sticky top-0 z-10 text-[#164399] font-black text-[9pt] uppercase tracking-wider text-left border-b border-gray-200 shadow-xs">
                      <tr>
                        <th className="py-3 px-4 w-12 text-center text-[#164399]/80 cursor-pointer hover:bg-black/5" title="Chọn tất cả để duyệt/không duyệt">
                           <input 
                             type="checkbox" 
                             checked={paginatedDevices.length > 0 && paginatedDevices.every(d => selectedGlobalDeviceIds.includes(d.globalId))}
                             onChange={(e) => {
                               if (e.target.checked) {
                                 const newIds = new Set(selectedGlobalDeviceIds);
                                 paginatedDevices.forEach(d => newIds.add(d.globalId));
                                 setSelectedGlobalDeviceIds(Array.from(newIds));
                               } else {
                                 const toRemove = new Set(paginatedDevices.map(d => d.globalId));
                                 setSelectedGlobalDeviceIds(selectedGlobalDeviceIds.filter(id => !toRemove.has(id)));
                               }
                             }}
                             className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                           />
                        </th>
                        <th className="py-3 px-2 border-r border-[#164399]/10">Ngày YC</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Thiết bị</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Loại kỳ</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10 text-center">Đã có KH</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Gần nhất</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Tiếp theo</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Loại kiểm tra</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Phiếu yêu cầu</th>
                        <th className="py-3 px-4 text-center">Phê duyệt</th>
                      </tr>
                    </thead>`;
                    
// But let's just replace the raw TH elements
content = content.replace(/<th className="py-3 px-2 border-r border-\[#164399\]\/10">Ngày YC<\/th>\s*<th className="py-3 px-4 border-r border-\[#164399\]\/10">Thiết bị<\/th>\s*<th className="py-3 px-4 border-r border-\[#164399\]\/10">Loại kỳ<\/th>\s*<th className="py-3 px-4 border-r border-\[#164399\]\/10">Loại kiểm tra<\/th>\s*<th className="py-3 px-4 border-r border-\[#164399\]\/10">Phiếu yêu cầu<\/th>\s*<th className="py-3 px-4 text-center">Phê duyệt<\/th>/g, 
`<th className="py-3 px-2 border-r border-[#164399]/10">Ngày YC</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Thiết bị</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Loại kỳ</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10 text-center">Đã có KH</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Gần nhất</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Tiếp theo</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Loại kiểm tra</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Phiếu yêu cầu</th>
                        <th className="py-3 px-4 text-center">Phê duyệt</th>`);

// 6. Update the Td rows for Thiết Bị list
const origNgayYc = `<td className={\`py-3 px-2 font-mono text-[9pt] font-medium \${isRejected ? 'text-gray-500' : 'text-gray-600'} whitespace-nowrap text-center\`}>
                                     {dev.fullPlan?.createdDate || '12/04/2026'}
                                  </td>`;
content = content.replace(origNgayYc, `<td className={\`py-3 px-2 font-mono text-[9pt] font-medium \${isRejected ? 'text-gray-500' : 'text-blue-600'} whitespace-nowrap text-center\`}>
                                     {dev.fullPlan?.createdDate || '12/04/2026'}
                                  </td>`);

// Update Thiết bị - nhỏ mờ lại
content = content.replace(/text-\[8\.5pt\] font-mono font-bold px-1\.5 py-0\.5 rounded border shadow-xs min-w-\[50px\] text-center/g, 'text-[7.5pt] font-mono font-medium px-1.5 py-0.5 rounded border border-gray-100 bg-gray-50 text-gray-500 min-w-[50px] text-center');
content = content.replace(/bg-red-50 text-red-600 border-red-200/g, 'bg-gray-50 text-gray-400 border-gray-100'); // make sure error color is replaced for this row
content = content.replace(/text-\[8\.5pt\] font-bold border px-1\.5 py-0\.5 rounded/g, 'text-[7.5pt] font-medium border px-1.5 py-0.5 rounded border-gray-100 bg-gray-50 text-gray-400');
content = content.replace(/bg-gray-100 text-gray-600 border-gray-200/g, 'bg-gray-50 text-gray-400 border-gray-100');

// Inject the custom Columns logic inside `paginatedDevices.map`
const insertColsHtml = `<td className="py-3 px-4">
                                    <span className={\`font-bold px-2 py-0.5 rounded text-[8.5pt] \${isRejected ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-[#164399]'}\`}>
                                      {dev.fullPlan?.type === 'Đột xuất' ? 'ĐỘT XUẤT' : 'ĐỊNH KỲ'}
                                    </span>
                                  </td>`;
const insertedColsReplacement = `<td className="py-3 px-4">
                                    <span className={\`font-bold px-2 py-0.5 rounded text-[8.5pt] \${isRejected ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-[#164399]'}\`}>
                                      {dev.fullPlan?.type === 'Đột xuất' ? 'ĐỘT XUẤT' : 'ĐỊNH KỲ'}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                      <input type="checkbox" disabled checked={!!dev.hasPlan} className="w-4 h-4 rounded border-gray-300 text-emerald-600 text-opacity-70 disabled:opacity-70" />
                                  </td>
                                  <td className="py-3 px-4 whitespace-nowrap text-gray-500 text-[8.5pt] font-mono">
                                      {dev.prevDate}
                                  </td>
                                  <td className="py-3 px-4 whitespace-nowrap text-blue-600 text-[8.5pt] font-mono font-bold">
                                      {dev.nextDate}
                                  </td>`;
content = content.replace(insertColsHtml, insertedColsReplacement);

// 7. Phiếu yêu cầu: Chỉ hiện mã phiếu.
const phieuTextHtml = `<div className="flex flex-col text-left">
                                         <button 
                                            onClick={() => {
                                               setDetailForm({ type: 'testing_plan', mode: 'view', data: dev.fullPlan });
                                            }}
                                            className={\`text-[9pt] font-black uppercase text-left hover:underline \${isRejected ? 'text-gray-600 hover:text-gray-800' : 'text-sky-600 hover:text-sky-800'}\`}
                                         >
                                            {dev.planCode}
                                         </button>
                                         <span className={\`text-[8.5pt] line-clamp-1 \${isRejected ? 'text-gray-500' : 'text-gray-600'}\`}>{dev.planTitle}</span>
                                      </div>`;
const fixPhieuText = `<div className="flex flex-col text-left">
                                         <button 
                                            onClick={() => {
                                               setDetailForm({ type: 'testing_plan', mode: 'view', data: dev.fullPlan });
                                            }}
                                            className={\`text-[9pt] font-black uppercase text-left hover:underline \${isRejected ? 'text-gray-600 hover:text-gray-800' : 'text-sky-600 hover:text-sky-800'}\`}
                                         >
                                            {dev.planCode}
                                         </button>
                                      </div>`;                                      
content = content.replace(phieuTextHtml, fixPhieuText);

// Make sure colSpan on group rows (bg-slate-100) matches the new number of columns (was 7, now 10)
content = content.replace(/colSpan={7} className="py-2 px-4 shadow-inner"/g, 'colSpan={10} className="py-2 px-4 shadow-inner"');


fs.writeFileSync(file, content);
console.log('Fixed YeuCauThiNghiem table layout for thiết bị');
