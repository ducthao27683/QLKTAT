const fs = require('fs');

const file = 'src/modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// The wrapper currently is:
// <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-[9.5pt]">
// Let's replace overflow-hidden with flex flex-col to allow inner scrolling
content = content.replace(/<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-\[9\.5pt\]">/g, 
  '<div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col text-[9.5pt] min-h-0">');

// Then wrap the table in a scrollable div
content = content.replace(/<table className="w-full relative">/g, 
  '<div className="flex-1 overflow-auto custom-scrollbar min-h-0"><table className="w-full relative">');

// Then close the wrapper after </table>
content = content.replace(/<\/tbody>\s*<\/table>\s*<\/div>/g, 
  '</tbody>\n                  </table>\n</div>\n                </div>');

// Ensure the outer wrapper is a full height flex column if possible, but actually we just removed `overflow-hidden` so sticky can work inside `overflow-auto`.
// In a flex column `flex-1 overflow-auto` takes remaining height and `sticky top-0` sticks.

// Also make z-index large enough
content = content.replace(/sticky top-0 z-10/g, 'sticky top-0 z-[50]');

fs.writeFileSync(file, content);
