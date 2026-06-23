import React, { useState, useEffect } from 'react';
import { 
  X, Camera, FileText, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, RefreshCw, Download 
} from 'lucide-react';

export interface MediaViewerPopupProps {
  content: {
    type: 'image' | 'document' | 'file';
    url: string;
    name: string;
    fileCode?: string;
    fileSize?: string;
    imagesList?: string[];
    currentIndex?: number;
  } | null;
  onClose: () => void;
}

export const MediaViewerPopup: React.FC<MediaViewerPopupProps> = ({ content, onClose }) => {
  const [imageIdx, setImageIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (content) {
      setImageIdx(content.currentIndex || 0);
      setZoom(1);
      setPage(1);
    }
  }, [content]);

  if (!content) return null;

  const isImage = content.type === 'image';

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className={`relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] transition-all duration-300 border border-gray-100/50 ${
          isImage ? 'w-[80vw] max-w-[80vw]' : 'w-[75vw] max-w-[75vw]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-150 bg-gray-50/50 shrink-0 select-none">
          <h3 className="text-[12pt] font-black text-gray-700 tracking-tight truncate pr-4 uppercase flex items-center gap-2">
            {isImage ? (
              <>
                <Camera className="w-5 h-5 text-orange-500 shrink-0" />
                {(() => {
                  let rName = content.imagesList ? `MINH HỌA` : (content.name || 'MINH HỌA');
                  rName = rName.replace(/(\(.*?\)|\[.*?\])/g, '').trim();
                  return rName.toUpperCase().startsWith('HÌNH ẢNH') ? rName.toUpperCase() : `HÌNH ẢNH ${rName.toUpperCase()}`;
                })()}
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                XEM NỘI DUNG TỆP ONLINE
              </>
            )}
          </h3>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Main Preview Container */}
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-100">
          {isImage ? (
            <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-[55vh] bg-slate-950 transition-colors">
              {/* Left Arrow */}
              {content.imagesList && content.imagesList.length > 1 && (
                <button 
                  onClick={() => {
                    setImageIdx(prev => (prev - 1 + (content.imagesList?.length || 1)) % (content.imagesList?.length || 1));
                    setZoom(1);
                  }}
                  className="absolute left-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all shadow-md z-10 hover:scale-105 active:scale-95 border border-white/10 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 font-black" />
                </button>
              )}

              {/* Display Image with Scale Zoom */}
              <div className="w-full h-[65vh] overflow-auto custom-scrollbar flex items-center justify-center p-2 bg-slate-950">
                <img 
                  src={content.imagesList ? content.imagesList[imageIdx] : content.url} 
                  alt="Preview" 
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  className="max-w-full max-h-full object-contain transition-transform duration-250 ease-out shadow-lg" 
                  referrerPolicy="no-referrer" 
                />
              </div>

              {/* Right Arrow */}
              {content.imagesList && content.imagesList.length > 1 && (
                <button 
                  onClick={() => {
                    setImageIdx(prev => (prev + 1) % (content.imagesList?.length || 1));
                    setZoom(1);
                  }}
                  className="absolute right-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all shadow-md z-10 hover:scale-105 active:scale-95 border border-white/10 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 font-black" />
                </button>
              )}
            </div>
          ) : (
            /* Simulated Interactive Document Page Viewer */
            <div className="flex-1 overflow-auto bg-slate-200/50 p-6 flex flex-col items-center select-none">
              <div 
                style={{ width: `${645 * zoom}px`, minHeight: '800px' }}
                className="bg-white shadow-xl border border-gray-150 p-10 space-y-6 text-left relative overflow-hidden transition-all duration-300 rounded-[1.5rem]"
              >
                {/* Interactive Page rendered based on state page (1-5) */}
                {page === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-start justify-between border-b border-gray-150 pb-4">
                      <div className="text-gray-400 font-mono text-[7.5pt] font-black uppercase">
                        KHỐI: KỸ THUẬT & AN TOÀN EVN
                      </div>
                      <div className="text-right text-gray-400 font-mono text-[7.5pt] font-black uppercase">
                        PMIS-DOC-{content.fileCode || 'REF-2026'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-left leading-tight">
                        <p className="text-[7.5pt] font-extrabold uppercase text-slate-800">TẬP ĐOÀN ĐIỆN LỰC VIỆT NAM</p>
                        <p className="text-[7.5pt] font-semibold text-slate-600">Ban quản lý Kỹ thuật lưới điện</p>
                      </div>
                      <div className="text-right leading-tight">
                        <p className="text-[7.5pt] font-extrabold uppercase text-slate-800">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                        <p className="text-[7.5pt] font-bold text-slate-700 text-center">Độc lập - Tự do - Hạnh phúc</p>
                      </div>
                    </div>
                    <div className="pt-8 text-center space-y-2">
                       <h2 className="text-[14pt] font-black text-[#164399] tracking-wider uppercase">TIÊU CHUẨN KỸ THUẬT VÀ QUY TRÌNH KIỂM KIỆT CHẤT LƯỢNG</h2>
                       <p className="text-[10pt] font-bold text-slate-800 italic underline text-center">
                         "{content.name || 'Tài liệu hướng dẫn kỹ thuật'}"
                       </p>
                    </div>
                    <div className="pt-8 space-y-4 text-[10pt] text-slate-700 leading-relaxed font-medium">
                       <p className="font-bold text-[10.5pt] text-slate-800">Chương I: Quy định chung và phạm vi trách nhiệm</p>
                       <p><strong>Điều 1. Phạm vi điều chỉnh</strong>: Văn bản quy định chi tiết các tiêu chí đo đạc thực tế, chuẩn mức an toàn điện áp, bảo trì dự phòng, và quy phạm hòa lưới dành riêng cho các thiết bị phân kho, lưới trạm biến áp, máy cắt, dao cách ly lưới truyền tải trực thuộc Trung tâm Điều độ Hệ thống Điện Quốc gia.</p>
                       <p><strong>Điều 2. Quy chuẩn trích dẫn</strong>: Tuân thủ Nghị định số 14/2014/NĐ-CP hướng dẫn Luật Điện lực về an toàn điện và Thông tư số 33/2015/TT-BCT.</p>
                       <p><strong>Điều 3. Trách nhiệm thực thi</strong>: Kỹ sư trưởng, trưởng kíp vận hành, điều độ viên chịu trách nhiệm đo đạc, kiểm tra nhật ký và cập nhật báo cáo lên hệ thống PMIS định kỳ hàng tuần.</p>
                    </div>
                  </div>
                )}

                {page === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-start justify-between border-b border-gray-150 pb-4">
                      <span className="text-gray-400 font-mono text-[7.5pt] font-black">PHỤ LỤC 01A / EVN-KỸ THUẬT</span>
                      <span className="text-gray-400 font-mono text-[7.5pt] font-black">TRANG 2 / 5</span>
                    </div>
                    <h3 className="text-[12pt] font-black text-gray-700 border-l-4 border-blue-600 pl-3">BẢNG TIÊU CHUẨN THÔNG SỐ VÀ ĐỊNH MỨC GIỚI HẠN</h3>
                    <p className="text-[10pt] text-gray-600 font-medium">Chỉ số giới hạn vận hành an toàn cho phép áp dụng thử nghiệm lưới trạm TBA 110kV:</p>
                    
                    <table className="w-full text-left border border-gray-150 mt-4 text-[9.5pt]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-800 border-b border-gray-150 font-black">
                          <th className="p-2 border-r border-gray-150 text-center">STT</th>
                          <th className="p-2 border-r border-gray-150">Thông số kiểm tra</th>
                          <th className="p-2 border-r border-gray-150 text-center">Tiêu chuẩn</th>
                          <th className="p-2 text-center">Khuyến nghị Biên độ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-150 font-semibold text-slate-700">
                        <tr className="hover:bg-slate-50">
                          <td className="p-2 border-r border-gray-150 text-center">1</td>
                          <td className="p-2 border-r border-gray-150">Điện trở cách điện cuộn dây</td>
                          <td className="p-2 border-r border-gray-150 text-center">≥ 1000 MΩ</td>
                          <td className="p-2 text-center text-emerald-605 font-black">ĐẠT</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-2 border-r border-gray-150 text-center">2</td>
                          <td className="p-2 border-r border-gray-150">Tổn hao điện môi khí SF6 (tan δ)</td>
                          <td className="p-2 border-r border-gray-150 text-center font-mono">≤ 0.5 %</td>
                          <td className="p-2 text-center text-emerald-605 font-black">ĐẠT</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-2 border-r border-gray-150 text-center">3</td>
                          <td className="p-2 border-r border-gray-150">Hàm lượng ẩm trong dầu MBA</td>
                          <td className="p-2 border-r border-gray-150 text-center font-mono">≤ 15 ppm</td>
                          <td className="p-2 text-center text-emerald-650 font-black">ĐẠT</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-2 border-r border-gray-150 text-center">4</td>
                          <td className="p-2 border-r border-gray-150">Điện áp thử nghiệm xoay chiều</td>
                          <td className="p-2 border-r border-gray-150 text-center">95 kV / 1 min</td>
                          <td className="p-2 text-center text-emerald-650 font-black">ĐẠT</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="text-[9pt] bg-amber-50 text-amber-800 p-3 rounded-xl border border-amber-150 font-bold leading-relaxed mt-4">
                      ⚠️ *GHI CHÚ QUANG TRỌNG*: Trong trường hợp tổn hao điện môi tan δ vượt quá 0.8% hoặc điện trở sụt giảm dưới 500 MΩ, lập tức dừng hòa lưới và kích hoạt chế độ khóa khẩn cấp để xử lý cô lập bảo dưỡng màng lọc dầu.
                    </div>
                  </div>
                )}

                {page === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-start justify-between border-b border-gray-150 pb-4">
                      <span className="text-gray-400 font-mono text-[7.5pt] font-black">PHỤ LỤC 01B / EVN-KỸ THUẬT</span>
                      <span className="text-gray-400 font-mono text-[7.5pt] font-black">TRANG 3 / 5</span>
                    </div>
                    <h3 className="text-[12pt] font-black text-gray-700 border-l-4 border-blue-600 pl-3">CHỈ TIÊU KỸ THUẬT VÀ ĐO ĐẠC KIỂM TRA ĐỊNH KỲ</h3>
                    <div className="pt-4 space-y-4 text-[10pt] text-slate-700 leading-relaxed font-medium">
                      <p><strong>1. Thử nghiệm định kỳ hàng quý:</strong> Thực hiện chụp sóng dao động hành trình tiếp điểm máy cắt SF6, đo điện trở tiếp xúc (micro-ohm) lõi dẫn điện chính để đảm bảo tổn hao phát nóng khớp nối nằm dưới biên độ giới hạn an toàn 50 micro-ohm.</p>
                      <p><strong>2. Kiểm tra nhiệt độ tiếp xúc bằng camera hồng ngoại:</strong> Tiến hành quét nhiệt toàn trạm 15 ngày/lần vào khung giờ phụ tải cao (11h00 - 14h00 hoặc 18h30 - 21h30). Báo cáo khẩn cấp nếu độ lệch nhiệt độ giữa các pha vượt quá 5°C.</p>
                      <p><strong>3. Vệ sinh sứ cách điện và siết lực kẹp cực:</strong> Kết hợp cùng lịch cắt điện công tác đường dây để làm sạch bụi bẩn tích tụ trên chuỗi sứ cách điện silicon/ceramic nhằm triệt tiêu dòng rò văng tia lửa điện phóng hồ quang.</p>
                    </div>
                  </div>
                )}

                {page === 4 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-start justify-between border-b border-gray-150 pb-4">
                      <span className="text-gray-400 font-mono text-[7.5pt] font-black">PHỤ LỤC 01C / EVN-KỸ THUẬT</span>
                      <span className="text-gray-400 font-mono text-[7.5pt] font-black">TRANG 4 / 5</span>
                    </div>
                    <h3 className="text-[12pt] font-black text-gray-700 border-l-4 border-blue-600 pl-3">BIỆN PHÁP AN TOÀN VÀ PHÒNG NGỪA SỰ CỐ</h3>
                    <div className="pt-4 space-y-4 text-[10pt] text-slate-650 leading-relaxed font-semibold italic text-slate-600">
                      <p>"Mọi kỹ sư hiện trường bắt buộc tuân thủ nguyên tắc 5 bước an toàn cơ bản trước khi mở cửa khoang tủ điều khiển trung tâm hoặc tiếp xúc cơ khí lưỡi dao cách ly:"</p>
                      <ul className="list-decimal pl-5 space-y-2 text-[9.5pt] not-italic font-medium text-slate-700">
                        <li>Kiểm tra trạng thái máy cắt đã mở hoàn toàn và hiển thị chỉ thị cơ khí 'OFF'.</li>
                        <li>Cắt nguồn điều khiển AC/DC và nguồn khởi động khí nén.</li>
                        <li>Treo biển cảnh báo cấm đóng điện 'CẤM KHỞI ĐỘNG - CÓ NGƯỜI ĐANG LÀM VIỆC' tại tay quay liên động cơ khí.</li>
                        <li>Thực hiện nối đất tiếp địa lưu động hai đầu chạm công tác bằng sào chuyên dụng.</li>
                        <li>Thiết lập rào chắn an toàn cô lập khu lân cận mang điện áp cao.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {page === 5 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-start justify-between border-b border-gray-150 pb-4">
                      <span className="text-gray-400 font-mono text-[7.5pt] font-black">BAN KỸ THUẬT EVN</span>
                      <span className="text-gray-400 font-mono text-[7.5pt] font-black">TRANG 5 / 5</span>
                    </div>
                    <h3 className="text-[12pt] font-black text-gray-700 border-l-4 border-blue-600 pl-3">XÁC NHẬN PHÊ DUYỆT & KÝ TÊN THẨM ĐỊNH</h3>
                    <p className="text-[10pt] text-slate-600 font-medium leading-relaxed">Tài liệu đã được nghiên cứu, hiệu đính và chính thức ban hành áp dụng đồng bộ trên toàn bộ mạng lưới truyền tải lưới điện EVN. Các chi nhánh Grid, Công ty thí nghiệm điện chịu trách nhiệm triển khai huấn luyện sát hạch định kỳ hàng năm.</p>
                    
                    <div className="grid grid-cols-3 gap-4 pt-16 text-center text-[9.5pt]">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800 uppercase text-[8pt]">NGƯỜI LẬP BIỂU</p>
                        <p className="text-[7.5pt] text-gray-400 font-bold italic">(Ký, ghi rõ họ tên)</p>
                        <div className="h-20 flex items-center justify-center font-mono font-bold text-blue-500 italic text-[11pt]">
                          Lê Văn Hoàng
                        </div>
                        <p className="font-extrabold text-slate-700 text-[8pt]">Kỹ sư Trưởng Trạm</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800 uppercase text-[8pt]">THẨM ĐỊNH BAN KỸ THUẬT</p>
                        <p className="text-[7.5pt] text-gray-400 font-bold italic">(Ký, ghi rõ họ tên)</p>
                        <div className="h-20 flex items-center justify-center font-mono font-bold text-blue-500 italic text-[11pt]">
                          Trần Minh Đạt
                        </div>
                        <p className="font-extrabold text-slate-700 text-[8pt]">Trưởng phòng Giám sát</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800 uppercase text-[8pt]">LÃNH ĐẠO PHÊ DUYỆT</p>
                        <p className="text-[7.5pt] text-gray-400 font-bold italic">(Ký, đóng dấu hoặc chữ ký số)</p>
                        <div className="h-20 flex flex-col items-center justify-center font-mono font-bold text-red-650 italic leading-none border border-red-150 rounded-xl p-1 bg-red-50/50 scale-90 mx-auto w-28">
                          <span className="text-[6.5pt] font-black uppercase tracking-tighter not-italic text-gray-700">EVN SIGNED</span>
                          <span className="text-[8.5pt] font-black py-0.5">Ngô Sỹ Hội</span>
                          <span className="text-[5.5pt] font-bold not-italic text-gray-400">10/04/2026 09:15</span>
                        </div>
                        <p className="font-extrabold text-slate-700 text-[8pt]">Phó Giám đốc Kỹ thuật</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center gap-4 py-3.5 px-6 bg-slate-50 border-t border-gray-150 justify-between shrink-0 select-none">
          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}
              className="p-2 bg-white border border-gray-250 rounded-lg hover:bg-gray-100 text-gray-700 active:scale-95 transition-all cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4.5 h-4.5 font-bold" />
            </button>
            <span className="font-mono text-[9.5pt] font-black text-gray-500 w-11 text-center">{Math.round(zoom * 100)}%</span>
            <button 
              onClick={() => setZoom(z => Math.min(2.5, z + 0.2))}
              className="p-2 bg-white border border-gray-250 rounded-lg hover:bg-gray-100 text-gray-700 active:scale-95 transition-all cursor-pointer"
              title="Phóng to"
            >
              <ZoomIn className="w-4.5 h-4.5 font-bold" />
            </button>
            <button 
              onClick={() => setZoom(1)}
              className="p-2 bg-white border border-gray-250 rounded-lg hover:bg-gray-100 text-gray-500 active:scale-95 transition-all cursor-pointer"
              title="Reset kích thước"
            >
              <RefreshCw className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Middle Index Indicator */}
          {isImage ? (
            content.imagesList && content.imagesList.length > 1 && (
              <div className="text-[10pt] font-black text-slate-700 bg-blue-50/50 px-3.5 py-1 rounded-xl border border-blue-150 font-mono shadow-sm">
                Hình ảnh {imageIdx + 1} / {content.imagesList.length}
              </div>
            )
          ) : (
            <div className="flex items-center gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="p-2 bg-white border border-gray-250 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-gray-700 active:scale-95 transition-all cursor-pointer"
                title="Trang trước"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <span className="text-[10.5pt] font-black pointer-events-none px-2 font-mono text-[#164399]">
                {page} / 5
              </span>
              <button 
                disabled={page === 5}
                onClick={() => setPage(p => Math.min(5, p + 1))}
                className="p-2 bg-white border border-gray-250 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-gray-700 active:scale-95 transition-all cursor-pointer"
                title="Trang sau"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          )}

          {/* Download button */}
          <div>
            <button 
              onClick={() => {
                const currentUrl = (isImage && content.imagesList) 
                  ? content.imagesList[imageIdx] 
                  : (content.url || '#');
                const link = document.createElement('a');
                link.href = currentUrl;
                link.download = isImage 
                  ? `PMIS_HinhAnh_${imageIdx + 1}.jpg` 
                  : `${content.name || 'Tai_lieu_PMIS'}.pdf`;
                link.click();
              }}
              className="px-4 py-2 bg-[#164399] hover:bg-blue-800 text-white rounded-xl text-[10pt] font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md border-none cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              Tải Xuống
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
