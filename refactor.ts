import * as fs from 'fs';

const filePath = 'src/components/PmisLuoiApp.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the mock data arrays
content = content.replace(/const MOCK_TESTING_PLANS = \[[\s\S]*?\];\n\n  const MOCK_TESTING_CATALOG = \[[\s\S]*?\];\n\n  const MOCK_TESTING_DATA = \[[\s\S]*?\];/g, '');

// Identify the block to replace
const startMarker = `) : activeSubMenu === 'Yêu cầu thí nghiệm' ? (`;
const endMarker = `) : activeSubMenu === 'Thông tin sự cố' ? (`;

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `) : activeSubMenu === 'Yêu cầu thí nghiệm' ? (
                <YeuCauThiNghiemScreen 
                  setActiveSubMenu={setActiveSubMenu} 
                  setDetailForm={setDetailForm} 
                />
              ) : activeSubMenu === 'Kết quả thí nghiệm' ? (
                <KetQuaThiNghiemScreen 
                  setActiveSubMenu={setActiveSubMenu} 
                  setPreviewContent={setPreviewContent} 
                />
              ) : activeSubMenu === 'Danh mục thí nghiệm' ? (
                <DanhMucThiNghiemScreen 
                  setActiveSubMenu={setActiveSubMenu} 
                  setDetailForm={setDetailForm} 
                />
              `;
    
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    
    // Now remove the dead code at 4316 to 4755
    const deadCodeStartMarker = `) : (activeSubMenu === 'Yêu cầu thí nghiệm' || activeSubMenu === 'Kết quả thí nghiệm') ? (`;
    // We need to find the end of the deadcode. It's followed by some other `) : activeSubMenu === ...` or `) : (`
    // Let's just find `deadCodeStartMarker` and the next `) : (`
    const deadCodeStartIdx = content.indexOf(deadCodeStartMarker);
    if (deadCodeStartIdx !== -1) {
        const afterDeadCodeStart = content.substring(deadCodeStartIdx + deadCodeStartMarker.length);
        const nextBranchIdx = afterDeadCodeStart.indexOf(`) : activeSubMenu === '`);
        if (nextBranchIdx !== -1) {
            content = content.substring(0, deadCodeStartIdx) + afterDeadCodeStart.substring(nextBranchIdx);
        } else {
             const nextBranchIdx2 = afterDeadCodeStart.indexOf(`) : (`);
             if (nextBranchIdx2 !== -1) {
                 content = content.substring(0, deadCodeStartIdx) + afterDeadCodeStart.substring(nextBranchIdx2);
             }
        }
    }

// Add imports
if (!content.includes('YeuCauThiNghiemScreen')) {
    const importReplacement = `import { ThongTinSuCoScreen } from '../modules/su-co/thong-tin-su-co/ThongTinSuCoScreen';
import { YeuCauThiNghiemScreen } from '../modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen';
import { KetQuaThiNghiemScreen } from '../modules/thi-nghiem/ket-qua-thi-nghiem/KetQuaThiNghiemScreen';
import { DanhMucThiNghiemScreen } from '../modules/thi-nghiem/danh-muc-thi-nghiem/DanhMucThiNghiemScreen';`;
    content = content.replace("import { ThongTinSuCoScreen } from '../modules/su-co/thong-tin-su-co/ThongTinSuCoScreen';", importReplacement);
}

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Refactoring complete");
} else {
    console.error("Could not find start/end markers");
}
