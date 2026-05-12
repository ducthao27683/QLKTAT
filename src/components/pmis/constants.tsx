import React from 'react';
import { 
  Cpu, Activity, ClipboardList, AlertTriangle, 
  Wrench, BarChart2, Layers, Shield, Home, Package, MapPin, Circle,
  Zap, Server, Battery, Box, Archive, FlaskConical
} from 'lucide-react';

export const MENU_ITEMS = [
  {
    id: 'thiet-bi',
    title: 'Thiết bị',
    icon: <Cpu className="w-6 h-6 text-blue-500" />,
    subItems: ['Bản đồ thiết bị', 'Thông tin thiết bị', 'Thiết bị dự phòng', 'Tồn kho và Điều động']
  },
  {
    id: 'cong-viec',
    title: 'Công việc',
    icon: <ClipboardList className="w-6 h-6 text-green-600" />,
    subItems: ['Sổ vận hành', 'Tiết giảm công việc', 'Kết quả công việc', 'Thiết lập công việc']
  },
  {
    id: 'su-co',
    title: 'Sự cố',
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    subItems: ['Thông tin sự cố', 'Xử lý giảm trừ sự cố', 'Theo dõi sau sự cố']
  },
  {
    id: 'thong-so',
    title: 'Vận hành',
    icon: <Activity className="w-6 h-6 text-sky-500" />,
    subItems: ['Giám sát thông số', 'Bảng thông số đo', 'Số liệu vận hành']
  },
  {
    id: 'scbd',
    title: 'SCBD',
    icon: <Wrench className="w-6 h-6 text-purple-500" />,
    subItems: ['Sửa chữa theo CBM/RCM', 'Sửa chữa thường xuyên', 'Sửa chữa lớn']
  },
  {
    id: 'thi-nghiem',
    title: 'Thí nghiệm',
    icon: <FlaskConical className="w-6 h-6 text-pink-500" />,
    subItems: ['Kế hoạch thí nghiệm', 'Kết quả thí nghiệm']
  },
  {
    id: 'bao-cao',
    title: 'Báo cáo',
    icon: <BarChart2 className="w-6 h-6 text-teal-500" />,
    subItems: ['Báo cáo quản trị đơn vị', 'Báo cáo 5100 - EVN']
  },
  {
    id: 'tien-ich',
    title: 'Tiện ích',
    icon: <Layers className="w-6 h-6 text-indigo-500" />,
    subItems: ['Tra cứu danh mục', 'Thư viện tài liệu', 'Cấp phát mã', 'Cấu hình thông báo']
  },
  {
    id: 'quan-tri',
    title: 'Quản trị',
    icon: <Shield className="w-6 h-6 text-slate-500" />,
    subItems: ['Quản trị User', 'Phân quyền hệ thống', 'Thiết lập hệ thống']
  }
];

export const ALL_SUB_ITEMS = MENU_ITEMS.flatMap(item => item.subItems);

export const MOCK_CHART_DATA_EQ_CURRENT = [
  { name: 'Vận hành', value: 4500, color: '#10b981' },
  { name: 'Bảo trì', value: 1200, color: '#3b82f6' },
  { name: 'Sự cố', value: 300, color: '#ef4444' },
];

export const MOCK_CHART_DATA_EQ_LAST_MONTH = [
  { name: 'Vận hành', value: 4400, color: '#10b981' },
  { name: 'Bảo trì', value: 1300, color: '#3b82f6' },
  { name: 'Sự cố', value: 350, color: '#ef4444' },
];

export const MOCK_CHART_DATA_EQ_LAST_YEAR = [
  { name: 'Vận hành', value: 4200, color: '#10b981' },
  { name: 'Bảo trì', value: 1500, color: '#3b82f6' },
  { name: 'Sự cố', value: 500, color: '#ef4444' },
];

export const MOCK_CHART_DATA_INCIDENT_3_MONTHS = [
  { name: 'Tháng 1', thietBi: 15, duongDay: 10, tram: 8 },
  { name: 'Tháng 2', thietBi: 12, duongDay: 15, tram: 5 },
  { name: 'Tháng 3', thietBi: 18, duongDay: 5, tram: 12 },
];

export const MOCK_CHART_DATA_3 = [
  { name: 'Tháng 1', anToan: 45, vanHanh: 30, suaChua: 20, thiNghiem: 15 },
  { name: 'Tháng 2', anToan: 52, vanHanh: 45, suaChua: 25, thiNghiem: 18 },
  { name: 'Tháng 3', anToan: 48, vanHanh: 38, suaChua: 22, thiNghiem: 20 },
  { name: 'Tháng 4', anToan: 61, vanHanh: 52, suaChua: 30, thiNghiem: 25 },
  { name: 'Tháng 5', anToan: 55, vanHanh: 48, suaChua: 28, thiNghiem: 22 },
  { name: 'Tháng 6', anToan: 67, vanHanh: 55, suaChua: 35, thiNghiem: 28 },
];

export const HOT_COLORS = ['#800000', '#dc2626', '#f97316'];

export const BRANCHES = [
  "Điện lực thành phố Hưng Yên",
  "Điện lực thị xã Mỹ Hào",
  "Điện lực huyện Văn Lâm",
  "Điện lực huyện Văn Giang",
  "Xưởng 110kV",
  "Công ty dịch vụ Điện lực",
  "Trung tâm Thí nghiệm điện"
];

export const VOLTAGES = ["500kV", "220kV", "110kV", "<110kV"];

export const REPORTS_5100 = [
  "01-LD - Chi tiêu QLKT lưới 110-500 kV",
  "2A-LD - Báo cáo tổng hợp điện năng giao nhận",
  "2B-LD - Báo cáo tổng hợp điện năng giao nhận",
  "2C-LD - Bảng tổng hợp điện năng giao nhận",
  "2D-LD - Điện năng giao nhận đầu nguồn",
  "2E-LD - Tổng hợp điện năng giao nhận",
  "03-LD - Báo cáo tình hình sự cố lưới điện 110kV - 500kV",
  "04-LD - Báo cáo công tác gây ngừng/giảm cung cấp điện trên lưới 110-500kV",
  "5A-LD - Báo cáo chi tiết thời gian điện áp vượt giới hạn cho phép của các nút",
  "5B-LD - Báo cáo chi tiết mức độ đầy tải và quá tải đường dây/MBA",
  "06-LD - Tổng hợp sự cố và suất sự cố DZ và TBA 110 - 500kV",
  "07-LD - Phân loại sự cố lưới điện 110kV - 500kV",
  "08-LD - Bảng tổng hợp độ tin cậy lưới 110 - 500kV",
  "09-LD - Tổng hợp chỉ tiêu QLKT lưới phân phối",
  "10-LD - Tình hình sự cố lưới điện trung, hạ áp",
  "11-LD - Công tác gây ngừng/giảm cung cấp điện trên lưới trung, hạ áp",
  "12-LD - Chi tiết mức độ mang tải đường dây trung áp",
  "13-LD - Vận hành MBA phân phối lưới điện trung, hạ áp",
  "14-LD - Tổng hợp số sự cố và suất sự cố DZ và TBA lưới trung, hạ áp",
  "15-LD - Chỉ số độ tin cậy lưới điện phân phối"
];

export const REPORTS_QT = [
  "NB-QLKT-Tình hình sự cố đường dây",
  "NB-QLKT-Tình hình sự cố trạm",
  "NB-QLKT-Tình hình sự cố TBA",
  "NB-QLKT-Tình hình đại tu, sửa chữa MBA",
  "NB-QLKT-Khối lượng thiết bị đang quản lý vận hành",
  "NB-QLKT-Tình hình sai hoặc hư hỏng của bảo vệ relay",
  "NB-QLKT-Thống kê TBA và MBA TG",
  "NB-QLKT-Thống kê khối lượng đường dây đang quản lý vận hành",
  "NB-QLKT-Thống kê TBA và MBA Phân Phối",
  "NB-QLKT-Thống kê TBA và MBA Tăng áp",
  "NB-QLKT-Thống kê MBA PP 35/0,4kV",
  "NB-QLKT-Thống kê MBA PP 22/0,4kV",
  "NB-QLKT-Thống kê thẻ tài sản cố định theo đường dây",
  "NB-QLKT-Thống kê MBA PP 10/0,4kV",
  "NB-QLKT-Thống kê tình hình quản lý máy cắt trong tháng",
  "NB-QLKT-Báo cáo chi tiết TSCĐ đang vận hành trên lưới",
  "NB-QLKT-Thống kê tài sản cố định đang vận hành trên lưới",
  "NB-QLKT-Thống kê khối máy bù và tụ điện đang quản lý vận hành",
  "NB-QLKT-Thống kê từng loại thiết bị",
  "NB-QLKT-Thống kê cáp ngầm thuộc tài sản điện lực",
  "NB-QLKT-Thống kê dao cách ly trung thế",
  "NB-QLKT-Thống kê TI trung thế",
  "NB-QLKT-Thống kê chống sét trung thế",
  "NB-QLKT-Bảng so sánh TSCĐ trên lưới với FMIS",
  "NB-QLKT-Thống kê TU trung thế",
  "NB-QLKT-Thống kê khối lượng trạm và máy biến áp 110KV",
  "Bảng kê chủng loại thiết bị trong TBA",
  "NB-QLKT-Kết quả kiểm tra kỹ thuật đường dây không",
  "NB-QLKT-Kết quả kiểm tra kỹ thuật MBA",
  "NB-QLKT-Tình hình kiểm tra kỹ thuật đường dây không",
  "NB-QLKT-Tình hình kiểm tra kỹ thuật MBA",
  "NB-QLKT-Thống kê số lần hoạt động của relay",
  "NB-QLKT-Thông số vận hành các trạm trung gian",
  "NB-QLKT-Danh sách máy biến áp mang tải",
  "NB-QLKT-Thông số phụ tải ngày"
];

export const MOCK_CONG_TRINH = Array.from({length: 10}, (_, i) => `Công trình lưới điện ${i+1} - Hưng Yên`);
export const MOCK_DUONG_DAY = Array.from({length: 10}, (_, i) => `Đường dây 110kV lộ ${170 + i} Hưng Yên`);
export const MOCK_TRAM = Array.from({length: 10}, (_, i) => `Trạm biến áp 110kV E28.${i+1}`);
export const MOCK_VI_TRI = Array.from({length: 10}, (_, i) => `Vị trí cột số ${i+1} - ĐD 110kV`);
export const MOCK_NHANH_RE = Array.from({length: 10}, (_, i) => `Nhánh rẽ ${i+1} - KCN Thăng Long II`);
export const MOCK_THIET_BI = Array.from({length: 10}, (_, i) => `Máy biến áp T${i+1} - 63MVA`);

export const BRANCH_ABBR: Record<string, string> = {
  "Công ty Điện lực Hưng Yên": "PC HUNG YEN",
  "Điện lực thành phố Hưng Yên": "ĐL THANH PHO",
  "Điện lực thị xã Mỹ Hào": "ĐL MY HAO",
  "Điện lực huyện Văn Lâm": "ĐL VAN LAM",
  "Điện lực huyện Văn Giang": "ĐL VAN GIANG",
  "Xưởng 110kV": "XUONG 110KV",
  "Công ty dịch vụ Điện lực": "CTY DICH VU",
  "Trung tâm Thí nghiệm điện": "TT THI NGHIEM"
};

export const MOCK_INCIDENTS = [
  {
    id: 1,
    time: '2026-04-05 08:30:15',
    device: 'Máy biến áp T1 - TBA 110kV Phố Nối',
    description: 'Phát hiện rò rỉ dầu tại van xả đáy máy biến áp T1. Mức dầu trong bình dầu phụ giảm nhanh. Đã thực hiện tách máy biến áp ra khỏi vận hành để kiểm tra và xử lý.',
    cause: 'Do gioăng cao su tại vị trí van xả đáy bị lão hóa dẫn đến mất khả năng làm kín.',
    status: 'Đang xử lý',
    voltage: '110kV',
    type: 'TBA',
    images: ['https://picsum.photos/seed/transformer1/800/600', 'https://picsum.photos/seed/transformer2/800/600'],
    attachments: [{ name: 'Bien_ban_su_co.pdf', size: '1.2 MB' }, { name: 'Anh_hien_truong.jpg', size: '0.8 MB' }],
    reduction: { status: 'Chờ duyệt', content: 'Đăng ký giảm trừ sự cố do nguyên nhân khách quan (lão hóa thiết bị).' },
    tracking: [
      { date: '2026-04-05 09:00', content: 'Đội sửa chữa có mặt tại hiện trường.' },
      { date: '2026-04-05 10:30', content: 'Hoàn thành công tác xả dầu để thay gioăng.' },
    ]
  },
  {
    id: 2,
    time: '2026-04-03 14:20:00',
    device: 'Đường dây 110kV 171 E3.1',
    description: 'Sự cố thoáng qua lộ 171. Rơ le khoảng cách F21 tác động tại vùng 1. Đã thực hiện đóng lại thành công (ARC). Kiểm tra hiện trường không phát hiện dấu vết phóng điện.',
    cause: 'Nghi ngờ do chim đậu hoặc vật lạ bay vào đường dây gây ngắn mạch thoáng qua.',
    status: 'Xử lý xong',
    voltage: '110kV',
    type: 'Dz',
    images: ['https://picsum.photos/seed/line1/800/600'],
    attachments: [{ name: 'Bao_cao_ARC.pdf', size: '0.5 MB' }],
    reduction: { status: 'Đã duyệt', content: 'Đã được duyệt giảm trừ sự cố thoáng qua.' },
    tracking: [
      { date: '2026-04-03 15:00', content: 'Kiểm tra hành lang tuyến, không phát hiện bất thường.' },
    ]
  },
  {
    id: 3,
    time: '2026-04-01 22:15:45',
    device: 'Ngăn lộ 112 - TBA 110kV Khoái Châu',
    description: 'Máy cắt 112 không đóng được từ xa. Kiểm tra tại chỗ phát hiện cuộn đóng bị cháy.',
    cause: 'Cuộn đóng bị ẩm dẫn đến chạm chập và cháy khi có lệnh đóng.',
    status: 'Mới',
    voltage: '110kV',
    type: 'TBA',
    images: [],
    attachments: [],
    reduction: { status: 'Chưa đăng ký', content: '' },
    tracking: []
  }
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Cảnh báo quá tải MBA T2', desc: 'Nhiệt độ dầu MBA T2 tăng cao bất thường vượt ngưỡng 85 độ C, yêu cầu kiểm tra ngay hệ thống làm mát và giảm tải.', time: '10 phút trước', read: false, type: 'alert' },
  { id: 2, title: 'Lịch cắt điện trạm E28.1', desc: 'Thông báo lịch cắt điện trạm E28.1 từ 08:00 đến 16:00 ngày 05/03/2026 để phục vụ công tác bảo dưỡng định kỳ thiết bị.', time: '1 giờ trước', read: false, type: 'info' },
  { id: 3, title: 'Phê duyệt phiếu công tác số 1234', desc: 'Phiếu công tác số 1234 về việc thay thế sứ cách điện tại vị trí cột 25 đường dây 110kV đã được giám đốc phê duyệt.', time: '2 giờ trước', read: false, type: 'success' },
  { id: 4, title: 'Báo cáo tháng 2 đã được duyệt', desc: 'Báo cáo tình hình vận hành lưới điện tháng 2/2026 đã được ban giám đốc phê duyệt và lưu trữ trên hệ thống.', time: '1 ngày trước', read: true, type: 'info' },
  { id: 5, title: 'Cập nhật phần mềm PMIS Lưới v2.1', desc: 'Hệ thống PMIS Lưới sẽ được cập nhật lên phiên bản v2.1 vào lúc 22:00 ngày 10/03/2026 với nhiều tính năng mới.', time: '2 ngày trước', read: true, type: 'info' },
  { id: 6, title: 'Hoàn thành sửa chữa ĐD 110kV', desc: 'Đội quản lý vận hành đã hoàn thành công tác sửa chữa, thay thế dây dẫn bị đứt tại khoảng cột 12-13 đường dây 110kV.', time: '3 ngày trước', read: true, type: 'success' },
  { id: 7, title: 'Cảnh báo nhiệt độ cao tại TBA', desc: 'Hệ thống CBM ghi nhận nhiệt độ tại các điểm tiếp xúc dao cách ly ngăn lộ 171 tăng cao, cần lên kế hoạch xử lý.', time: '4 ngày trước', read: true, type: 'alert' },
  { id: 8, title: 'Bàn giao ca trực thành công', desc: 'Ca trực sáng ngày 28/02/2026 đã bàn giao thành công cho ca chiều, tình hình vận hành lưới điện bình thường.', time: '5 ngày trước', read: true, type: 'success' },
  { id: 9, title: 'Lịch kiểm tra định kỳ thiết bị', desc: 'Nhắc nhở lịch kiểm tra định kỳ các thiết bị đóng cắt tại trạm biến áp 110kV E28.2 vào tuần tới.', time: '6 ngày trước', read: true, type: 'info' },
  { id: 10, title: 'Phát hiện bất thường tại nhánh rẽ', desc: 'Phát hiện hiện tượng phóng điện tại chuỗi sứ đỡ nhánh rẽ khu công nghiệp, cần cử nhân viên kiểm tra hiện trường.', time: '7 ngày trước', read: true, type: 'alert' },
  { id: 11, title: 'Đã xử lý sự cố lộ 171', desc: 'Sự cố nhảy máy cắt lộ 171 do sét đánh đã được xử lý xong, khôi phục cấp điện cho toàn bộ phụ tải.', time: '8 ngày trước', read: true, type: 'success' },
  { id: 12, title: 'Thông báo họp giao ban kỹ thuật', desc: 'Mời các trưởng phòng ban kỹ thuật tham dự cuộc họp giao ban định kỳ vào lúc 08:30 sáng thứ 2 tuần sau.', time: '9 ngày trước', read: true, type: 'info' },
  { id: 13, title: 'Nghiệm thu công trình lưới điện', desc: 'Hoàn thành công tác nghiệm thu đóng điện dự án cải tạo, nâng cấp đường dây trung thế khu vực trung tâm thành phố.', time: '10 ngày trước', read: true, type: 'success' },
];

export const DEVICE_TYPE_COLORS: Record<string, string> = {
  'Đơn vị': 'bg-blue-100 text-blue-700 border-blue-200',
  'Trạm': 'bg-orange-100 text-orange-700 border-orange-200',
  'Đường dây': 'bg-green-100 text-green-700 border-green-200',
  'Ngăn lộ': 'bg-purple-100 text-purple-700 border-purple-200',
  'Nút': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Móng cột': 'bg-amber-100 text-amber-700 border-amber-200',
  'Sứ': 'bg-teal-100 text-teal-700 border-teal-200',
  'Xà': 'bg-rose-100 text-rose-700 border-rose-200',
  'default': 'bg-gray-100 text-gray-700 border-gray-200'
};
