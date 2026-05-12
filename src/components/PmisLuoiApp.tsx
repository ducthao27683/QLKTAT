import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Menu, Search, Bell, Bug, User, 
  Cpu, Activity, ClipboardList, AlertTriangle, 
  Wrench, BarChart2, Layers, Shield, Home, Package, MapPin, Circle,
  ChevronDown, ChevronLeft, ArrowLeft, Clock, Star, Calendar, Minus, Check, Filter, AlertCircle, CheckCircle2, Clock3, FileWarning,
  Network, ZoomIn, ZoomOut, Plus, Copy, Share2, Map, MoreVertical, Trash2, Edit, Lock, Key, RefreshCw, Move, X, LayoutDashboard, List, GitMerge, ListChecks, ExternalLink,
  Zap, GitCommit, Database, Server, Battery, Box, Archive, Eye, ChevronRight, FileText, FileX, History, Settings, FlaskConical, Maximize2, Minimize2, ChevronUp, Hash,
  MessageSquare, Download, Upload, Camera, Image, PlayCircle, Info, Printer, ShieldQuestion
} from 'lucide-react';
import { EvnLogo } from './EvnLogo';
import { UserConfig } from '../data';
import { DesignTooltip } from './DesignTooltip';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, LabelList, Label
} from 'recharts';
import CSKH_ICON from '../assets/CSKH.png';

const formatNumber = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

interface PmisLuoiAppProps {
  config: UserConfig;
  onBack: () => void;
}

const MENU_ITEMS = [
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
    subItems: ['Kế hoạch thí nghiệm', 'Kết quả thí nghiệm', 'Danh mục thí nghiệm']
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

const ALL_SUB_ITEMS = MENU_ITEMS.flatMap(item => item.subItems);

const MOCK_CHART_DATA_EQ_CURRENT = [
  { name: 'Vận hành', value: 4500, color: '#10b981' },
  { name: 'Bảo trì', value: 1200, color: '#3b82f6' },
  { name: 'Sự cố', value: 300, color: '#ef4444' },
];

const MOCK_CHART_DATA_EQ_LAST_MONTH = [
  { name: 'Vận hành', value: 4400, color: '#10b981' },
  { name: 'Bảo trì', value: 1300, color: '#3b82f6' },
  { name: 'Sự cố', value: 350, color: '#ef4444' },
];

const MOCK_CHART_DATA_EQ_LAST_YEAR = [
  { name: 'Vận hành', value: 4200, color: '#10b981' },
  { name: 'Bảo trì', value: 1500, color: '#3b82f6' },
  { name: 'Sự cố', value: 500, color: '#ef4444' },
];

const MOCK_CHART_DATA_INCIDENT_3_MONTHS = [
  { name: 'Tháng 1', thietBi: 15, duongDay: 10, tram: 8 },
  { name: 'Tháng 2', thietBi: 12, duongDay: 15, tram: 5 },
  { name: 'Tháng 3', thietBi: 18, duongDay: 5, tram: 12 },
];

const MOCK_CHART_DATA_3 = [
  { name: 'Tháng 1', anToan: 45, vanHanh: 30, suaChua: 20, thiNghiem: 15 },
  { name: 'Tháng 2', anToan: 52, vanHanh: 45, suaChua: 25, thiNghiem: 18 },
  { name: 'Tháng 3', anToan: 48, vanHanh: 38, suaChua: 22, thiNghiem: 20 },
  { name: 'Tháng 4', anToan: 61, vanHanh: 52, suaChua: 30, thiNghiem: 25 },
  { name: 'Tháng 5', anToan: 55, vanHanh: 48, suaChua: 28, thiNghiem: 22 },
  { name: 'Tháng 6', anToan: 67, vanHanh: 55, suaChua: 35, thiNghiem: 28 },
];

const HOT_COLORS = ['#800000', '#dc2626', '#f97316'];

const BRANCHES = [
  "Điện lực thành phố Hưng Yên",
  "Điện lực thị xã Mỹ Hào",
  "Điện lực huyện Văn Lâm",
  "Điện lực huyện Văn Giang",
  "Xưởng 110kV",
  "Công ty dịch vụ Điện lực",
  "Trung tâm Thí nghiệm điện"
];

const VOLTAGES = ["500kV", "220kV", "110kV", "<110kV"];

const REPORTS_5100 = [
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

const REPORTS_QT = [
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

const MOCK_CONG_TRINH = Array.from({length: 10}, (_, i) => `Công trình lưới điện ${i+1} - Hưng Yên`);
const MOCK_DUONG_DAY = Array.from({length: 10}, (_, i) => `Đường dây 110kV lộ ${170 + i} Hưng Yên`);
const MOCK_TRAM = Array.from({length: 10}, (_, i) => `Trạm biến áp 110kV E28.${i+1}`);
const MOCK_VI_TRI = Array.from({length: 10}, (_, i) => `Vị trí cột số ${i+1} - ĐD 110kV`);
const MOCK_NHANH_RE = Array.from({length: 10}, (_, i) => `Nhánh rẽ ${i+1} - KCN Thăng Long II`);
const MOCK_THIET_BI = Array.from({length: 10}, (_, i) => `Máy biến áp T${i+1} - 63MVA`);

const BRANCH_ABBR: Record<string, string> = {
  "Công ty Điện lực Hưng Yên": "PC HUNG YEN",
  "Điện lực thành phố Hưng Yên": "ĐL THANH PHO",
  "Điện lực thị xã Mỹ Hào": "ĐL MY HAO",
  "Điện lực huyện Văn Lâm": "ĐL VAN LAM",
  "Điện lực huyện Văn Giang": "ĐL VAN GIANG",
  "Xưởng 110kV": "XUONG 110KV",
  "Công ty dịch vụ Điện lực": "CTY DICH VU",
  "Trung tâm Thí nghiệm điện": "TT THI NGHIEM"
};

const MOCK_INCIDENTS = [
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

const getDeviceTreeChildren = (path: string[]) => {
  const types = getDeviceTypes(path);
  let allInstances: string[] = [];
  types.forEach(type => {
    const instances = getDeviceInstances(path, type);
    allInstances = [...allInstances, ...instances];
  });
  return allInstances;
};

const getDetailedType = (name: string) => {
  if (name.includes('Đường dây')) return 'Đường dây';
  if (name.includes('Trạm biến áp 110kV')) return 'Trạm 110';
  if (name.includes('Trạm biến áp 220kV')) return 'Trạm 220';
  if (name.includes('Trạm biến áp 500kV')) return 'Trạm 500';
  if (name.includes('Trạm biến áp phụ') || name.includes('Trạm biến áp trung gian')) return 'Trạm';
  if (name.includes('Kho')) return 'Kho';
  if (name.includes('Vị trí cột')) return 'Móng cột';
  if (name.includes('Nút')) return 'Nút';
  if (name.includes('Ngăn lộ')) return 'Ngăn lộ';
  if (name.includes('Máy biến áp') || name.includes('MBA')) return 'MBA';
  if (name.includes('Tụ')) return 'Tụ điện';
  if (name.includes('Sứ')) return 'Sứ';
  if (name.includes('Xà')) return 'Xà';
  if (name.includes('Dây dẫn')) return 'Dây dẫn';
  return 'Thiết bị';
};

const autoCompletePath = (path: string[]) => {
  return path;
};

const MOCK_NOTIFICATIONS = [
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

const getNextOptions = (rawPath: string[]) => {
  const path = rawPath.map(t => t.split(': ')[0]);
  const lastRaw = rawPath[rawPath.length - 1] || "";
  const needsValue = lastRaw && !lastRaw.includes(': ') && [
    "Theo Năm", "Theo Quý", "Theo Tháng", "Theo Tuần", "Theo Ngày", 
    "Chi nhánh", "Công trình", "Đường dây", "Trạm", "Vị trí", "Nhánh rẽ", "Thiết bị",
    "Năm", "Quý", "Tháng"
  ].includes(path[path.length - 1]);

  if (needsValue) {
    const p = path[path.length - 1];
    if (p === "Theo Năm" || p === "Năm") return ["2026", "2025", "2024", "2023", "2022"];
    if (p === "Theo Quý" || p === "Quý") return ["Quý 1", "Quý 2", "Quý 3", "Quý 4"];
    if (p === "Theo Tháng" || p === "Tháng") return Array.from({length: 12}, (_, i) => `Tháng ${i+1}`);
    if (p === "Theo Tuần") return ["Tuần này", "Tuần trước", "Tuần tới"];
    if (p === "Theo Ngày") return ["Hôm nay", "Hôm qua", "7 ngày qua"];
    if (p === "Chi nhánh") return BRANCHES;
    
    if (path[0] === "Thêm mới") {
      if (p === "Công trình") return MOCK_CONG_TRINH;
      if (p === "Đường dây") return MOCK_DUONG_DAY;
      if (p === "Trạm") return MOCK_TRAM;
      if (p === "Vị trí") return MOCK_VI_TRI;
      if (p === "Nhánh rẽ") return MOCK_NHANH_RE;
      if (p === "Thiết bị") return MOCK_THIET_BI;
    } else {
      if (["Công trình", "Đường dây", "Trạm", "Vị trí"].includes(p)) return VOLTAGES;
    }
  }

  if (path.length === 0) return ["Xem thông tin", "Thống kê", "Xem báo cáo", "Thêm mới"];
  
  const root = path[0];
  if (root === "Xem thông tin") {
    if (path.length === 1) return ["Công trình", "Đường dây", "Trạm", "Vị trí", "Nhánh rẽ", "Thiết bị", "Khác"];
    if (path.length === 2) return ["Tên tìm kiếm", "Loại", "Có thuộc tính"];
    return [];
  }
  
  if (root === "Thống kê") {
    if (path.length === 1) return ["Theo Năm", "Theo Quý", "Theo Tháng", "Theo Tuần", "Theo Ngày"];
    if (path.length === 2) return ["Thiết bị", "Vận hành", "Công việc", "Sự cố"];
    if (path.length === 3) return ["Toàn đơn vị", "Chi nhánh", "Công trình", "Đường dây", "Trạm", "Vị trí"];
    if (path.length === 4) return ["Tên tìm kiếm", "Loại", "Có thuộc tính"];
    return [];
  }
  
  if (root === "Xem báo cáo") {
    if (path.length === 1) return ["Báo cáo 5100 EVN", "Báo cáo quản trị"];
    if (path.length === 2) {
      if (path[1] === "Báo cáo 5100 EVN") return REPORTS_5100;
      if (path[1] === "Báo cáo quản trị") return REPORTS_QT;
    }
  }

  return [];
};

const getTypeIcon = (type: string, className = "w-4 h-4") => {
  const t = type.toLowerCase();
  if (t.includes('đường dây')) return <Zap className={className} />;
  if (t.includes('trạm')) return <Home className={className} />;
  if (t.includes('kho')) return <Package className={className} />;
  if (t.includes('vị trí') || t.includes('móng')) return <MapPin className={className} />;
  if (t.includes('nút')) return <Circle className={className} />;
  if (t.includes('ngăn lộ')) return <Server className={className} />;
  if (t.includes('máy biến áp') || t.includes('mba')) return <Battery className={className} />;
  return <Layers className={className} />;
};

const formatDevicePath = (path: string[]) => {
  // Only show instances (even indices) in the breadcrumb
  return path.filter((_, i) => i % 2 === 0).join(' > ');
};

const getDeviceTypes = (path: string[]) => {
  if (path.length === 0) return ["Đơn vị"];
  if (path.length === 1) return ["Đường dây", "Trạm", "Kho"];
  
  // path[0] is branch, path[1] is type, path[2] is instance
  if (path.length === 3) {
    const type = path[1];
    if (type === "Đường dây") return ["Vị trí", "Nút", "Trạm"];
    if (type === "Trạm") return ["Ngăn lộ", "Máy biến áp", "Hệ thống"];
    if (type === "Kho") return ["Thiết bị"];
  }
  
  // path[3] is sub-type, path[4] is sub-instance
  if (path.length === 5) {
    return ["Thiết bị"];
  }

  return [];
};

const getDeviceInstances = (path: string[], type: string) => {
  if (type === "Đơn vị") return ["Công ty Điện lực Hưng Yên", ...BRANCHES];
  
  const lastInstance = path[path.length - 1] || "";
  
  if (type === "Đường dây") {
    return Array.from({length: 15}, (_, i) => `Đường dây 110kV ${i + 171} E${i + 3}.1`);
  }
  
  if (type === "Trạm") {
    if (lastInstance.includes("Đường dây")) {
      return Array.from({length: 3}, (_, i) => `Trạm biến áp trung gian ${i + 1} trên ${lastInstance}`);
    }
    return Array.from({length: 10}, (_, i) => `Trạm biến áp 110kV ${i + 1}`);
  }
  
  if (type === "Kho") return ["Kho vật tư trung tâm", "Kho thiết bị dự phòng", "Kho vật tư B", "Kho vật tư C", "Kho thiết bị A"];
  
  if (type === "Nút") return Array.from({length: 10}, (_, i) => `Nút vị trí ${i + 1} trên ${lastInstance}`);
  if (type === "Vị trí") return Array.from({length: 25}, (_, i) => `Vị trí cột số ${i + 100} - ${lastInstance}`);
  
  if (type === "Ngăn lộ") return Array.from({length: 10}, (_, i) => `Ngăn lộ 110kV ${i + 111}`);
  if (type === "Máy biến áp") return Array.from({length: 4}, (_, i) => `Máy biến áp T${i + 1}`);
  if (type === "Hệ thống") return ["Dàn tụ bù 110kV", "Hệ thống tự dùng", "Tủ điều khiển", "Hệ thống SCADA"];
  
  if (type === "Thiết bị") return ["Sứ", "Cầu chì", "Thanh cái", "Móng", "Cột", "Xà", "Tụ", "Máy biến áp dự phòng 63MVA", "Máy cắt 110kV ABB", "Sứ cách điện chuỗi 110kV", "Tụ điện cao thế"];
  
  return Array.from({length: 4}, (_, i) => `${type} ${i + 1}`);
};

const GroupedDeviceColumn = ({ 
  typeOptions, 
  selectedType, 
  onSelectType,
  instanceOptions,
  selectedInstance,
  onSelectInstance,
  headerLabel,
  hideHeader = false,
  hideTypeSelection = false,
  hideSearch = false
}: {
  typeOptions: string[],
  selectedType?: string,
  onSelectType: (opt: string) => void,
  instanceOptions?: string[],
  selectedInstance?: string,
  onSelectInstance?: (opt: string) => void,
  headerLabel?: string,
  hideHeader?: boolean,
  hideTypeSelection?: boolean,
  hideSearch?: boolean
}) => {
  const [search, setSearch] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const filteredInstances = instanceOptions ? instanceOptions.filter(o => o.toLowerCase().includes(search.toLowerCase())) : [];

  useEffect(() => {
    if (selectedInstance && listRef.current) {
      const selectedElement = listRef.current.querySelector(`[data-instance="${selectedInstance}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedInstance]);

  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg flex flex-col shrink-0 shadow-sm overflow-hidden h-full">
      {/* Header if provided */}
      {!hideHeader && headerLabel && (
        <div className="p-2 border-b border-gray-200 bg-gray-50 font-bold text-secondary text-gray-700 text-center shrink-0 uppercase tracking-wider">
          {headerLabel}
        </div>
      )}

      {/* Type Selection (Short) - Sticky at top */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        {!hideTypeSelection && (
          <div className="p-2 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-1">
            {typeOptions.map(opt => (
              <button
                key={opt}
                className={`px-2 py-1.5 text-[10pt] rounded-md transition-all flex-1 text-center whitespace-nowrap flex items-center justify-center gap-1.5 ${selectedType === opt ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-600 border border-transparent hover:border-gray-300'}`}
                onClick={() => onSelectType(opt)}
                title={opt}
              >
                {getTypeIcon(opt, "w-3.5 h-3.5")}
                <span className="truncate">{opt}</span>
              </button>
            ))}
          </div>
        )}
        
        {/* Search - Sticky at top */}
        {!hideSearch && selectedType && instanceOptions && (
          <div className="p-2 border-b border-gray-100 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder={`Tìm ${selectedType.toLowerCase()}...`} 
                className="w-full pl-8 pr-3 py-1.5 text-secondary border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow bg-gray-50 focus:bg-white"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const currentIndex = filteredInstances.indexOf(selectedInstance || '');
                    const nextIndex = (currentIndex + 1) % filteredInstances.length;
                    if (onSelectInstance) onSelectInstance(filteredInstances[nextIndex]);
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const currentIndex = filteredInstances.indexOf(selectedInstance || '');
                    const prevIndex = (currentIndex - 1 + filteredInstances.length) % filteredInstances.length;
                    if (onSelectInstance) onSelectInstance(filteredInstances[prevIndex]);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Instance Selection (Takes remaining height) */}
      {(selectedType || hideTypeSelection) && instanceOptions && (
        <div className="flex-1 overflow-y-auto p-1.5 custom-scrollbar bg-white" ref={listRef}>
          {filteredInstances.map(opt => (
            <button 
              key={opt}
              data-instance={opt}
              className={`w-full text-left px-3 py-2 text-[10pt] rounded-md transition-all duration-200 flex items-center justify-between group ${selectedInstance === opt ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-300'}`}
              onClick={() => onSelectInstance && onSelectInstance(opt)}
            >
              <span className="truncate pr-2">{opt}</span>
              {selectedInstance === opt && <div className="w-1.5 h-1.5 rounded-full bg-[#164399] shrink-0"></div>}
            </button>
          ))}
          {filteredInstances.length === 0 && (
            <div className="py-8 text-center text-secondary text-gray-400 italic">Không tìm thấy kết quả</div>
          )}
        </div>
      )}
      {!selectedType && !hideTypeSelection && (
        <div className="flex-1 flex items-center justify-center p-4 text-secondary text-gray-400 italic bg-gray-50/50 text-center">
          Chọn loại ở trên để xem danh sách
        </div>
      )}
    </div>
  );
};

const DEVICE_TYPE_COLORS: Record<string, string> = {
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

const FileUploader = ({ 
  type, 
  onFileSelect, 
  mode 
}: { 
  type: 'image' | 'document', 
  onFileSelect: (files: FileList) => void,
  mode: 'view' | 'edit' | 'add'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (mode === 'view') return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const accept = type === 'image' ? 'image/*' : '.doc,.docx,.xls,.xlsx,.pdf,.csv,.txt,.rar,.zip';

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`relative cursor-pointer transition-all border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 min-h-[120px] ${
        isDragging ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500'
      }`}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        multiple 
        accept={accept}
        onChange={(e) => e.target.files && onFileSelect(e.target.files)}
      />
      {type === 'image' ? (
        <>
          <Plus className="w-8 h-8 mb-2" />
          <span className="text-[12pt] font-bold">Tải ảnh lên</span>
        </>
      ) : (
        <>
          <Upload className="w-8 h-8 mb-2" />
          <span className="text-[12pt] font-bold">Tải tài liệu lên</span>
        </>
      )}
      <p className="text-[10pt] mt-1 opacity-60">Kéo thả file vào đây</p>
    </div>
  );
};

const getDeviceDetails = (deviceName: string) => {
  const seed = deviceName.length;
  const isLine = deviceName.includes('Đường dây');
  const isStation = deviceName.includes('Trạm');
  const isPole = deviceName.includes('Vị trí cột');

  return {
    info: [
      { label: 'Mã thiết bị, công trình', value: `${deviceName.substring(0, 4).toUpperCase()}_${seed}_${Math.floor(Math.random() * 10000)}`, icon: <Key className="w-4 h-4 text-red-500" />, valueColor: 'text-red-600' },
      { label: 'Tên thiết bị, công trình', value: deviceName, icon: <Box className="w-4 h-4 text-blue-500" />, valueColor: 'text-blue-600' },
      { label: 'Trạng thái', value: seed % 2 === 0 ? 'Đang sử dụng' : 'Dự phòng', badge: seed % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700' },
      { label: 'Ngày vận hành', value: `01/0${(seed % 9) + 1}/20${10 + (seed % 10)}`, icon: <Clock className="w-4 h-4 text-orange-500" /> },
      { label: 'Mã liên kết khác', value: '-', icon: <GitMerge className="w-4 h-4 text-purple-500" /> },
      { label: 'Số S/N', value: `SN-${seed * 1234}`, icon: <Hash className="w-4 h-4 text-gray-500" /> },
      { label: 'Mã CMIS', value: `CMIS-${seed}`, icon: <Database className="w-4 h-4 text-indigo-500" /> },
      { label: 'Số thẻ TSCD', value: `${3000 + seed}`, icon: <Archive className="w-4 h-4 text-amber-500" /> },
      { label: 'Góc lái', value: isPole ? '15.5' : '0.0', icon: <RefreshCw className="w-4 h-4 text-teal-500" /> },
      { label: 'Khoảng cách vị trí', value: isLine ? `${seed * 100}` : '0', icon: <Map className="w-4 h-4 text-rose-500" /> },
      { label: 'Tiếp địa', value: isPole ? '- RC2' : '- RC1', icon: <Zap className="w-4 h-4 text-yellow-500" /> },
      { label: 'Khu vực', value: seed % 3 === 0 ? '- Miền núi' : '- Đồng bằng', icon: <Map className="w-4 h-4 text-emerald-500" /> },
    ],
    images: [
      `https://picsum.photos/seed/${deviceName}-1/800/450`,
      `https://picsum.photos/seed/${deviceName}-2/800/450`,
      `https://picsum.photos/seed/${deviceName}-3/800/450`,
    ],
    tracking: [
      { id: 'su-co', title: 'Sự cố', icon: <AlertTriangle />, color: 'red', items: [
        { date: '25/03/2024', content: `Sự cố tại ${deviceName}: Quá tải`, status: 'Đã hoàn thành' },
        { date: '10/03/2024', content: `Kiểm tra sau sự cố ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'cong-viec', title: 'Công việc', icon: <ClipboardList />, color: 'green', items: [
        { date: '26/03/2024', content: `Bảo dưỡng định kỳ ${deviceName}`, status: 'Đang thực hiện' },
        { date: '20/03/2024', content: `Vệ sinh thiết bị ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'sua-chua', title: 'Sửa chữa', icon: <Wrench />, color: 'purple', items: [
        { date: '24/03/2024', content: `Sửa chữa xà thép ${deviceName}`, status: 'Đang thực hiện' },
        { date: '10/03/2024', content: `Sơn lại cột ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'thi-nghiem', title: 'Thí nghiệm', icon: <FlaskConical />, color: 'pink', items: [
        { date: '21/03/2024', content: `Thí nghiệm định kỳ ${deviceName}`, status: 'Đã hoàn thành' },
        { date: '05/03/2024', content: `Kiểm tra điện trở tiếp địa ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'thong-so', title: 'Thông số', icon: <Activity className="text-sky-500" />, color: 'blue', items: [
        { date: '27/03/2024', content: `Ghi chỉ số vận hành ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'lich-su', title: 'Lịch sử', icon: <History />, color: 'gray', items: [
        { date: '27/03/2024', content: `Thay đổi trạng thái ${deviceName}`, status: 'Đã hoàn thành' },
        { date: '01/01/2009', content: `Khởi tạo thiết bị ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
    ]
  };
};

export const PmisLuoiApp = ({ config, onBack }: PmisLuoiAppProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<string[][]>([]);
  const [history, setHistory] = useState<string[][]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Công ty Điện lực Hưng Yên");
  
  // Device Bar State
  const [devicePath, setDevicePath] = useState<string[]>(["Công ty Điện lực Hưng Yên"]);
  const [showDeviceTreePopup, setShowDeviceTreePopup] = useState(false);
  const [tempDevicePath, setTempDevicePath] = useState<string[]>(["Công ty Điện lực Hưng Yên"]);
  const [activeBreadcrumbDropdown, setActiveBreadcrumbDropdown] = useState<string | null>(null);
  const [breadcrumbSearch, setBreadcrumbSearch] = useState('');
  const [deviceFavorites, setDeviceFavorites] = useState<string[][]>([]);
  const [activeForm, setActiveForm] = useState<{type: string, target: string} | null>(null);
  const [deviceHistory, setDeviceHistory] = useState<string[][]>([]);
  const [showDeviceFavorites, setShowDeviceFavorites] = useState(false);
  const [showDeviceHistory, setShowDeviceHistory] = useState(false);
  const [detailForm, setDetailForm] = useState<{
    type: 'device' | 'incident',
    mode: 'view' | 'edit' | 'add',
    data?: any
  } | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [deviceFormMenuOpen, setDeviceFormMenuOpen] = useState(false);
  const [childSearch, setChildSearch] = useState('');
  const [deviceFormTab, setDeviceFormTab] = useState<'info' | 'tracking'>('info');
  const [deviceFormCurrentPage, setDeviceFormCurrentPage] = useState(1);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Incident Form States
  const [incidentSearch, setIncidentSearch] = useState('');
  const [incidentViewMode, setIncidentViewMode] = useState<'latest' | 'range'>('latest');
  const [incidentPeriod, setIncidentPeriod] = useState('1 Tháng');
  const [incidentFromDate, setIncidentFromDate] = useState('2026-03-06');
  const [incidentToDate, setIncidentToDate] = useState(new Date().toISOString().split('T')[0]);
  const [showIncidentFilter, setShowIncidentFilter] = useState(false);
  const [incidentFilterType, setIncidentFilterType] = useState(['TBA', 'Dz', 'CN']);
  const [incidentFilterVoltage, setIncidentFilterVoltage] = useState(['500kV', '220kV', '110kV', '35kV', '22kV']);
  const [incidentFilterStatus, setIncidentFilterStatus] = useState(['Mới', 'Đang xử lý', 'Đang tồn tại', 'Xử lý xong']);
  const [selectedIncidentId, setSelectedIncidentId] = useState<number | null>(1);
  const [selectedTestingId, setSelectedTestingId] = useState<number | null>(1);
  const [selectedTestingPlanId, setSelectedTestingPlanId] = useState<number | null>(1);
  const [testingDetailTab, setTestingDetailTab] = useState<'info' | 'result' | 'attachments' | 'signing'>('info');
  const [testingPlanDetailTab, setTestingPlanDetailTab] = useState<'plan-info' | 'device-list' | 'outage' | 'approval'>('plan-info');
  
  const [testingFilterStatus, setTestingFilterStatus] = useState(['Mới', 'Đang thực hiện', 'Đã hoàn thành', 'Kế hoạch']);
  const [testingFilterType, setTestingFilterType] = useState(['Định kỳ', 'Đột xuất', 'CBM', 'Sau sự cố']);
  const [testingSearch, setTestingSearch] = useState('');
  const [showTestingFilter, setShowTestingFilter] = useState(false);

  const MOCK_TESTING_PLANS = [
    {
      id: 1,
      code: 'KH-TN-2026-001',
      title: 'Kế hoạch thí nghiệm định kỳ Trạm 110kV Phố Nối - Quý II/2026',
      type: 'Định kỳ',
      status: 'Đã duyệt',
      createdDate: '2026-04-10',
      startDate: '2026-05-15',
      endDate: '2026-05-30',
      creator: 'Nguyễn Kế Hoạch',
      approver: 'Phạm Duyệt Vốn',
      description: 'Thực hiện thí nghiệm định kỳ cho toàn bộ thiết bị ngăn lộ 110kV và MBA T1 Phố Nối.',
      devices: [
        { id: 'MBA-T1', name: 'Máy biến áp T1', type: 'Máy biến áp', status: 'Đã xong' },
        { id: 'MC-171', name: 'Máy cắt 171', type: 'Máy cắt', status: 'Chưa làm' },
        { id: 'TI-171', name: 'Biến dòng 171', type: 'Biến dòng', status: 'Chưa làm' }
      ],
      outage: {
        required: true,
        startTime: '2026-05-15 08:00',
        endTime: '2026-05-15 17:00',
        scope: 'Ngừng cung cấp điện phía 110kV trạm Phố Nối'
      }
    },
    {
      id: 2,
      code: 'KH-TN-2026-042',
      title: 'Thí nghiệm kiểm định thiết bị sau sự cố đường dây 171 E3.1',
      type: 'Sau sự cố',
      status: 'Đang thực hiện',
      createdDate: '2026-05-18',
      startDate: '2026-05-20',
      endDate: '2026-05-21',
      creator: 'Lê Văn Đo',
      approver: 'Trần Văn Duyệt',
      description: 'Kiểm tra đặc tính cách điện chuỗi sứ và phụ kiện sau sự cố phóng điện ngày 03/04.',
      devices: [
        { id: 'DD-110-171', name: 'Đường dây 110kV 171', type: 'Đường dây', status: 'Đang làm' }
      ],
      outage: {
        required: true,
        startTime: '2026-05-20 09:30',
        endTime: '2026-05-20 12:00',
        scope: 'Cắt điện đường dây 171 E3.1'
      }
    }
  ];

  const MOCK_TESTING_CATALOG = [
    { id: 1, device: 'Máy biến áp T1 - TBA Phố Nối', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao' },
    { id: 2, device: 'Máy cắt 112 - TBA Khoái Châu', lastTest: '2023-06-01', nextDue: '2026-06-01', interval: '36 tháng', status: 'Sắp đến hạn', urgency: 'Trung bình' },
    { id: 3, device: 'Chống sét van Lộ 173', lastTest: '2025-04-12', nextDue: '2026-04-12', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao' },
    { id: 4, device: 'Máy biến áp T2 - TBA Gia Lâm', lastTest: '2024-08-20', nextDue: '2026-08-20', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp' }
  ];

  const MOCK_TESTING_DATA = [
    {
      id: 1,
      time: '2026-05-15 08:00',
      device: 'Máy biến áp T1 - TBA 110kV Phố Nối',
      type: 'Thí nghiệm định kỳ',
      status: 'Đã hoàn thành',
      team: 'Đội thí nghiệm 1 - TT Thí nghiệm điện',
      leader: 'Nguyễn Văn Kết',
      result: 'Đạt',
      project: 'Kế hoạch thí nghiệm định kỳ năm 2026',
      condition: 'Thời tiết nắng ráo, nhiệt độ 30°C, độ ẩm 65%',
      items: [
        { name: 'Đo điện trở cách điện cuộn dây', unit: 'MΩ', value: '2500', limit: '> 2000', eval: 'Đạt' },
        { name: 'Đo tỷ số biến', unit: '%', value: '0.05', limit: '< 0.5', eval: 'Đạt' },
        { name: 'Đo điện trở một chiều', unit: 'mΩ', value: '12.5', limit: '< 13.0', eval: 'Đạt' },
        { name: 'Thử nghiệm không tải', unit: 'A', value: '1.2', limit: '< 1.5', eval: 'Đạt' },
        { name: 'Phân tích hàm lượng ẩm trong dầu', unit: 'ppm', value: '15', limit: '< 20', eval: 'Đạt' },
        { name: 'Kiểm tra độ chọc thủng điện trường dầu', unit: 'kV', value: '55', limit: '> 50', eval: 'Đạt' },
        { name: 'Thử nghiệm tăng cao điện áp tần số công nghiệp', unit: 'kV', value: 'OK', limit: '38kV/1p', eval: 'Đạt' }
      ],
      images: ['https://picsum.photos/seed/test1/800/600', 'https://picsum.photos/seed/test2/800/600', 'https://picsum.photos/seed/test3/800/600', 'https://picsum.photos/seed/test4/800/600'],
      attachments: [{ name: 'Bien_ban_thi_nghiem_T1_2026.pdf', size: '2.5 MB' }, { name: 'Giay_chung_nhan_hieu_chuan.pdf', size: '1.1 MB' }],
      signing: [
        { role: 'Trưởng nhóm TN', name: 'Nguyễn Văn Kết', time: '15/05/2026 16:30', status: 'Đã ký' },
        { role: 'Đội trưởng TN', name: 'Trần Văn Duyệt', time: '15/05/2026 17:15', status: 'Đã ký' },
        { role: 'Phòng Kỹ thuật', name: 'Lê Văn Kiểm', time: '16/05/2026 08:45', status: 'Đã ký' },
        { role: 'Lãnh đạo đơn vị', name: 'Phạm Thế Ký', time: '16/05/2026 10:20', status: 'Đã ký' }
      ]
    },
    {
      id: 2,
      time: '2026-05-20 09:30',
      device: 'Đường dây 110kV 171 E3.1',
      type: 'Thí nghiệm sau sự cố',
      status: 'Đang thực hiện',
      team: 'Đội thí nghiệm 2 - TT Thí nghiệm điện',
      leader: 'Lê Văn Đo',
      result: 'Chưa có',
      project: 'Xử lý sự cố lộ 171 ngày 03/04',
      condition: 'Thời tiết có mây, nhiệt độ 28°C',
      items: [
        { name: 'Đo điện trở cách điện chuỗi sứ', unit: 'MΩ', value: '-', limit: '> 1000', eval: '-' },
        { name: 'Kiểm tra độ võng dây dẫn', unit: 'm', value: '2.5', limit: '2.4 - 2.6', eval: 'Đạt' },
        { name: 'Đo thông mạch dây chống sét', unit: 'Ω', value: '1.2', limit: '< 5.0', eval: 'Đạt' }
      ],
      images: ['https://picsum.photos/seed/test5/800/600'],
      attachments: [],
      signing: [
        { role: 'Trưởng nhóm TN', name: 'Lê Văn Đo', time: '-', status: 'Chưa ký' },
        { role: 'Đội trưởng TN', name: 'Trần Văn Duyệt', time: '-', status: 'Chờ duyệt' }
      ]
    },
    {
      id: 3,
      time: '2026-06-01 08:00',
      device: 'Máy cắt 112 - TBA 110kV Khoái Châu',
      type: 'Thí nghiệm CBM',
      status: 'Kế hoạch',
      team: 'Tổ thí nghiệm chuyên sâu',
      leader: 'Phạm Văn Máy',
      result: 'Chưa có',
      project: 'Bảo dưỡng CBM trạm Khoái Châu đợt 1/2026',
      condition: '-',
      items: [],
      images: [],
      attachments: [],
      signing: []
    },
    {
      id: 4,
      time: '2026-04-12 14:00',
      device: 'Chống sét van pha A - Đường dây 110kV 173',
      type: 'Thí nghiệm định kỳ',
      status: 'Đã hoàn thành',
      team: 'Đội thí nghiệm 3 - TT Thí nghiệm điện',
      leader: 'Hoàng Văn Thử',
      result: 'Không đạt',
      project: 'Kế hoạch kiểm tra chống sét van mùa mưa bão',
      condition: 'Nắng nóng, 35°C',
      items: [
        { name: 'Đo dòng điện rò', unit: 'μA', value: '250', limit: '< 100', eval: 'K.Đạt' },
        { name: 'Kiểm tra bề mặt cách điện', unit: '-', value: 'OK', limit: 'Sạch sẽ', eval: 'Đạt' }
      ],
      images: ['https://picsum.photos/seed/test_fail/800/600'],
      attachments: [{ name: 'Bien_ban_K_Dat_CSV.pdf', size: '0.8 MB' }],
      signing: [
        { role: 'Trưởng nhóm TN', name: 'Hoàng Văn Thử', time: '12/04/2026 17:00', status: 'Đã ký' },
        { role: 'Đội trưởng TN', name: 'Trần Văn Duyệt', time: '13/04/2026 09:00', status: 'Đã ký' }
      ]
    }
  ];
  const [incidentDetailTab, setIncidentDetailTab] = useState<'detail' | 'reduction' | 'tracking'>('detail');
  const [previewContent, setPreviewContent] = useState<{type: 'image' | 'file', url: string, name?: string} | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  useEffect(() => {
    if (detailForm && detailForm.type === 'device' && detailForm.mode === 'view') {
      const currentDevice = devicePath[devicePath.length - 1];
      if (detailForm.data !== currentDevice) {
        setDetailForm({ ...detailForm, data: currentDevice });
      }
    }
  }, [devicePath, detailForm]);

  const isEditing = detailForm && (detailForm.mode === 'add' || detailForm.mode === 'edit');

  const getFormTitle = () => {
    if (!detailForm) return null;
    const type = detailForm.type;
    const mode = detailForm.mode;
    const deviceName = devicePath[devicePath.length - 1];

    if (type === 'device') {
      if (mode === 'view') return <><span className="text-gray-900">Chi tiết thiết bị:</span> <span className="text-[#164399]">{deviceName}</span></>;
      if (mode === 'add') return <><span className="text-gray-900">Thêm mới:</span> <span className="text-[#164399]">Thiết bị</span></>;
      if (mode === 'edit') return <><span className="text-gray-900">Cập nhật thiết bị:</span> <span className="text-[#164399]">{deviceName}</span></>;
    } else if (type === 'testing_plan') {
      const planTitle = detailForm.data?.title || 'Kế hoạch mới';
      const label = mode === 'view' ? 'Chi tiết Kế hoạch:' : mode === 'add' ? 'Lập Kế hoạch mới' : 'Cập nhật Kế hoạch:';
      return <><span className="text-gray-900">{label}</span> <span className="text-[#164399]">{planTitle}</span></>;
    } else if (type === 'testing_catalog') {
      const deviceName = detailForm.data?.device || 'Thiết bị mới';
      const label = mode === 'view' ? 'Chi tiết Danh mục:' : mode === 'add' ? 'Thiết lập Thiết bị mới:' : 'Cập nhật Danh mục:';
      return <><span className="text-gray-900">{label}</span> <span className="text-[#164399]">{deviceName}</span></>;
    } else {
      const label = mode === 'view' ? 'Chi tiết Sự cố của:' : mode === 'add' ? 'Thêm mới Sự cố của:' : 'Cập nhật Sự cố của:';
      return <><span className="text-gray-900">{label}</span> <span className="text-[#164399]">{deviceName}</span></>;
    }
    return null;
  };

  const getBranchMultiplier = (branchName: string) => {
    if (branchName === "Công ty Điện lực Hưng Yên") {
      return BRANCHES.reduce((sum, _, idx) => sum + (idx + 1), 0);
    }
    const index = BRANCHES.indexOf(branchName) + 1;
    return index > 0 ? index : 1;
  };

  const branchMultiplier = getBranchMultiplier(selectedBranch);

  const currentChartDataEqCurrent = React.useMemo(() => MOCK_CHART_DATA_EQ_CURRENT.map(d => ({
    ...d,
    value: d.value * branchMultiplier
  })), [branchMultiplier]);

  const currentChartDataEqLastMonth = React.useMemo(() => MOCK_CHART_DATA_EQ_LAST_MONTH.map(d => ({
    ...d,
    value: d.value * branchMultiplier
  })), [branchMultiplier]);

  const currentChartDataEqLastYear = React.useMemo(() => MOCK_CHART_DATA_EQ_LAST_YEAR.map(d => ({
    ...d,
    value: d.value * branchMultiplier
  })), [branchMultiplier]);

  const currentChartDataIncident3Months = React.useMemo(() => {
    const seed = selectedBranch.length;
    return MOCK_CHART_DATA_INCIDENT_3_MONTHS.map((d, index) => {
      return {
        ...d,
        thietBi: d.thietBi * branchMultiplier + (seed * (index + 1) * 7) % 10,
        duongDay: d.duongDay * branchMultiplier + (seed * (index + 1) * 5) % 10,
        tram: d.tram * branchMultiplier + (seed * (index + 1) * 3) % 10,
      };
    });
  }, [branchMultiplier, selectedBranch]);

  const currentChartData3 = React.useMemo(() => MOCK_CHART_DATA_3.map(d => ({
    ...d,
    anToan: d.anToan * branchMultiplier,
    vanHanh: d.vanHanh * branchMultiplier,
    suaChua: d.suaChua * branchMultiplier,
    thiNghiem: d.thiNghiem * branchMultiplier
  })), [branchMultiplier]);

  const dynamicIncidentList = React.useMemo(() => {
    const seed = selectedBranch.length;
    return [1, 2, 3, 4, 5].map((i) => {
      const type = ['Thiết bị', 'Đường dây', 'Trạm', 'Nút', 'Thiết bị'][i % 5];
      return {
        id: i,
        type,
        title: `Sự cố ${['MBA T1', 'ĐD 110kV', 'Cột 25', 'Ngăn lộ 171', 'Tủ RMU'][i % 5]} - ${selectedBranch.split(' ').pop()}`,
        time: `${10 + (i * seed) % 10}:30 24/02/2026`,
        desc: [
          'Quá nhiệt dầu máy biến áp T1, cần kiểm tra ngay hệ thống làm mát và quạt tản nhiệt.',
          'Đứt dây pha C tại khoảng cột 12-13, nguyên nhân do cây đổ đè vào đường dây.',
          'Nghiêng cột do sạt lở đất sau mưa lớn, nguy cơ mất an toàn cao, cần gia cố khẩn cấp.',
          'Hỏng rơ le bảo vệ quá dòng ngăn lộ 171, không thể đóng cắt tự động, cần thay thế.',
          'Rò rỉ khí SF6 tại tủ RMU trạm biến áp phân phối, áp suất giảm dưới mức cho phép.'
        ][i % 5]
      };
    });
  }, [selectedBranch]);

  const dynamicCbmList = React.useMemo(() => {
    const seed = selectedBranch.length;
    return [1, 2, 3, 4, 5].map((i) => ({
      id: i,
      title: `Chỉ đạo #${1000 + i * seed}`,
      status: ['Đang xử lý', 'Chờ duyệt', 'Mới tạo', 'Đã hoàn thành', 'Mới tạo'][i % 5],
      date: `2${i}/05/2024`,
      desc: [
        'Thay thế sứ cách điện bị nứt vỡ tại vị trí cột 15-16 đường dây 110kV E28.1.',
        'Bảo dưỡng định kỳ máy biến áp T2 trạm 110kV: lọc dầu, kiểm tra hệ thống làm mát.',
        'Đo lại hệ thống tiếp địa tại các trạm biến áp phân phối khu vực ngập lụt.',
        'Vệ sinh công nghiệp thiết bị phân phối 22kV, kiểm tra xiết chặt các đầu cốt.',
        'Kiểm tra phát nhiệt bằng camera nhiệt tại các điểm đấu nối trạm 110kV.'
      ][i % 5]
    }));
  }, [selectedBranch]);

  const currentOptions = getNextOptions(activeTagIndex !== null ? searchTags.slice(0, activeTagIndex) : searchTags);
  const filteredOptions = currentOptions.filter(o => o.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectOption = (option: string) => {
    const currentTags = activeTagIndex !== null ? searchTags.slice(0, activeTagIndex) : [...searchTags];
    const lastTag = currentTags[currentTags.length - 1] || "";
    
    const needsValue = lastTag && !lastTag.includes(': ') && [
      "Theo Năm", "Theo Quý", "Theo Tháng", "Theo Tuần", "Theo Ngày", 
      "Chi nhánh", "Công trình", "Đường dây", "Trạm", "Vị trí", "Nhánh rẽ", "Thiết bị",
      "Năm", "Quý", "Tháng"
    ].includes(lastTag);

    if (needsValue) {
      currentTags[currentTags.length - 1] = `${lastTag}: ${option}`;
    } else if (["Tên tìm kiếm", "Loại", "Có thuộc tính"].includes(option)) {
      currentTags.push(`${option}: `);
    } else {
      currentTags.push(option);
    }
    
    setSearchTags(currentTags);
    setActiveTagIndex(null);
    setSearchQuery('');
  };

  const handleSearchSubmit = () => {
    setShowSearchPopup(false);
    let finalTags = [...searchTags];
    
    if (searchTags.length === 0 && searchQuery) {
      finalTags = ["Xem thông tin", "Thiết bị", "Tên tìm kiếm: " + searchQuery];
    } else if (searchTags.length > 0) {
      const lastTag = finalTags[finalTags.length - 1];
      if (lastTag.endsWith(': ') && searchQuery) {
        finalTags[finalTags.length - 1] = lastTag + searchQuery;
      } else if (searchQuery) {
        finalTags.push(searchQuery);
      }
    }

    setSearchTags(finalTags);
    
    // Add to history
    setHistory(prev => {
      const filtered = prev.filter(h => JSON.stringify(h) !== JSON.stringify(finalTags));
      return [finalTags, ...filtered].slice(0, 10);
    });

    setActiveSubMenu('Kết quả tìm kiếm');
    setSearchQuery('');
  };

  const toggleFavorite = (search: string[], e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.filter(f => JSON.stringify(f) !== JSON.stringify(search)));
  };

  const loadSearch = (search: string[]) => {
    setSearchTags(search);
    setSearchQuery('');
    setShowFavorites(false);
    setShowHistory(false);
    setShowSearchPopup(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden text-[12pt]">
      {/* Header Bar */}
      <header className={`flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200 shrink-0 z-[100] ${isEditing ? 'pointer-events-none opacity-50' : ''}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer group" onClick={onBack} title="Quay lại Modules Board">
            <EvnLogo className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-[16pt] font-bold tracking-tight group-hover:text-blue-800 transition-colors duration-300">
              <span className="text-[#164399]">PMIS</span> <span className="text-red-600 italic">Lưới</span>
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl px-12 relative flex items-center">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3 group shrink-0" 
            title="Thông tin nhanh"
            onClick={() => { setActiveMenu(null); setActiveSubMenu(null); }}
          >
            <LayoutDashboard className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          <div className="flex items-stretch w-full h-10">
            <div 
              className="flex-1 flex items-center rounded-l-full px-4 bg-gray-100 hover:bg-gray-200 cursor-text relative h-full transition-colors overflow-hidden"
              onClick={() => setShowSearchPopup(true)}
            >
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <div className="flex-1 text-gray-700 text-[9pt] truncate select-none whitespace-nowrap">
                {searchTags.length > 0 ? searchTags.join(' > ') + (searchQuery ? ` > ${searchQuery}` : '') : "Bạn muốn làm gì?"}
              </div>
            </div>
            <div className="relative h-full flex shrink-0">
              <DesignTooltip id="btn_luu_tim_kiem">
                <button className="bg-gray-100 hover:bg-gray-200 px-4 h-full transition-colors flex items-center justify-center relative" title="Lưu tìm kiếm" onClick={() => {setShowFavorites(!showFavorites); setShowHistory(false); setShowSearchPopup(false);}}>
                  <Star className={`w-4 h-4 ${showFavorites ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
                </button>
              </DesignTooltip>
              {showFavorites && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Tìm kiếm ưa thích ({favorites.length}/10)
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {favorites.length > 0 ? favorites.map((fav, idx) => (
                      <div key={idx} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 flex justify-between items-start group" onClick={() => loadSearch(fav)}>
                        <div className="text-[12pt] text-gray-700 pr-2 whitespace-normal break-words leading-relaxed">{fav.join(' > ')}</div>
                        <button className="text-yellow-500 hover:text-gray-400 transition-colors mt-0.5 shrink-0" onClick={(e) => toggleFavorite(fav, e)} title="Bỏ ưa thích">
                          <Star className="w-4 h-4 fill-yellow-500" />
                        </button>
                      </div>
                    )) : <div className="p-4 text-[12pt] text-gray-500 italic text-center">Chưa có mục ưa thích nào</div>}
                  </div>
                </div>
              )}
            </div>
            <div className="relative h-full flex shrink-0">
              <DesignTooltip id="btn_lich_su_tim_kiem">
                <button className="bg-gray-100 hover:bg-gray-200 px-4 h-full rounded-r-full transition-colors flex items-center justify-center relative" title="Lịch sử tìm kiếm" onClick={() => {setShowHistory(!showHistory); setShowFavorites(false); setShowSearchPopup(false);}}>
                  <Clock className={`w-4 h-4 ${showHistory ? 'text-blue-500' : 'text-gray-600'}`} />
                </button>
              </DesignTooltip>
              {showHistory && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" /> Lịch sử tìm kiếm
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {history.length > 0 ? history.map((hist, idx) => {
                      const isFav = favorites.some(f => JSON.stringify(f) === JSON.stringify(hist));
                      return (
                      <div key={idx} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 flex justify-between items-start" onClick={() => loadSearch(hist)}>
                        <div className="text-[12pt] text-gray-700 whitespace-normal break-words pr-2 leading-relaxed">{hist.join(' > ')}</div>
                        <button className={`${isFav ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'} transition-colors mt-0.5 shrink-0`} onClick={(e) => { e.stopPropagation(); if (isFav) toggleFavorite(hist, e); else setFavorites(prev => [hist, ...prev].slice(0, 10)); }} title={isFav ? "Bỏ ưa thích" : "Thêm vào ưa thích"}>
                          <Star className={`w-4 h-4 ${isFav ? 'fill-yellow-500' : ''}`} />
                        </button>
                      </div>
                    )}) : <div className="p-4 text-[12pt] text-gray-500 italic text-center">Chưa có lịch sử tìm kiếm</div>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Popup */}
          {showSearchPopup && (
            <div className="absolute top-full left-12 right-12 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[999] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                  {searchTags.map((tag, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center text-[12pt] px-3 py-1.5 rounded-md border cursor-pointer shadow-sm transition-colors ${activeTagIndex === idx ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
                      onClick={() => setActiveTagIndex(idx)}
                    >
                      <span>{tag}</span>
                      <button 
                        className="ml-2 text-blue-400 hover:text-blue-800" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setSearchTags(searchTags.slice(0, idx));
                          setActiveTagIndex(null);
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {searchTags.length === 0 && <span className="text-[12pt] text-gray-400 italic py-1.5">Chưa có thẻ nào được chọn</span>}
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-shadow">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input 
                      type="text" 
                      placeholder="Nhập từ khóa" 
                      className="w-full py-2.5 outline-none bg-transparent text-gray-700 text-secondary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && searchQuery === '' && searchTags.length > 0) {
                          setSearchTags(searchTags.slice(0, -1));
                        }
                        if (e.key === 'Enter') {
                          handleSearchSubmit();
                        }
                      }}
                      autoFocus
                    />
                  </div>
                  {(() => {
                    const currentSearchState = [...searchTags];
                    if (searchQuery) currentSearchState.push(searchQuery);
                    const isCurrentFavorite = favorites.some(f => JSON.stringify(f) === JSON.stringify(currentSearchState));
                    return (
                      <button 
                        className={`px-3 rounded-lg border transition-colors flex items-center justify-center ${isCurrentFavorite ? 'bg-yellow-50 border-yellow-200 text-yellow-500' : 'bg-white border-gray-300 text-gray-400 hover:text-yellow-500 hover:border-yellow-300'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentSearchState.length === 0) return;
                          if (isCurrentFavorite) {
                            setFavorites(prev => prev.filter(f => JSON.stringify(f) !== JSON.stringify(currentSearchState)));
                          } else {
                            setFavorites(prev => [currentSearchState, ...prev].slice(0, 10));
                          }
                        }}
                        title={isCurrentFavorite ? "Bỏ ưa thích" : "Thêm vào ưa thích"}
                      >
                        <Star className={`w-5 h-5 ${isCurrentFavorite ? 'fill-yellow-500' : ''}`} />
                      </button>
                    );
                  })()}
                  <button 
                    className="bg-[#164399] hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    onClick={handleSearchSubmit}
                  >
                    OK
                  </button>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto py-2">
                <div className="px-4 py-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Gợi ý từ điển
                </div>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((suggestion, idx) => (
                    <div 
                      key={idx} 
                      className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-gray-700 transition-colors"
                      onClick={() => handleSelectOption(suggestion)}
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Search className="w-3 h-3 text-gray-500" />
                      </div>
                      <span className="font-medium text-[12pt]">{suggestion}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 italic text-center">Không tìm thấy kết quả phù hợp</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <DesignTooltip id="btn_bao_loi">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" title="Báo lỗi">
              <Bug className="w-6 h-6 text-gray-600" />
            </button>
          </DesignTooltip>
          <div className="relative">
            <DesignTooltip id="btn_thong_bao">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" 
                title="Thông báo"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </DesignTooltip>
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] overflow-hidden flex flex-col max-h-[32rem]">
                <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-700 text-[12pt]">Thông báo</h3>
                  <span className="text-[12pt] text-blue-600 hover:underline cursor-pointer">Đánh dấu đã đọc</span>
                </div>
                <div className="overflow-y-auto custom-scrollbar flex-1">
                  {MOCK_NOTIFICATIONS.map(n => (
                    <div key={n.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-blue-50/50' : ''}`}>
                      <div className="flex gap-3">
                        <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[12pt] truncate ${!n.read ? 'font-semibold text-[#555555]' : 'text-gray-600'}`}>{n.title}</p>
                          <p className="text-[12pt] text-gray-500 mt-1 line-clamp-2">{n.desc}</p>
                          <p className="text-[12pt] text-gray-400 mt-1.5">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100 text-center bg-gray-50">
                  <DesignTooltip id="btn_xem_tat_ca_thong_bao">
                    <button className="text-[10pt] text-gray-400 hover:text-blue-600 hover:font-bold transition-all">Xem tất cả</button>
                  </DesignTooltip>
                </div>
              </div>
            )}
          </div>
          <div className="relative ml-2">
            <button 
              className="w-8 h-8 rounded-full overflow-hidden border border-gray-200"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img src={config.avatarUrl} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                  <img src={config.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-medium text-[#555555] text-[12pt]">{config.fullName}</div>
                    <div className="text-[12pt] text-gray-500">{config.username}</div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[12pt] text-gray-700">Quản lý tài khoản</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-secondary text-gray-700">Cài đặt</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-secondary text-gray-700" onClick={onBack}>Quay lại Modules Board</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-secondary text-gray-700">Đăng xuất</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <aside 
          className={`bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide transition-all duration-300 flex-shrink-0 z-10 flex flex-col ${
            isMenuOpen ? 'w-64' : 'w-0 opacity-0 md:w-20 md:opacity-100'
          } ${isEditing ? 'pointer-events-none opacity-50' : ''}`}
        >
          <div className="py-3 flex-1">
            {MENU_ITEMS.map((item) => (
              <React.Fragment key={item.id}>
                {item.id === 'tien-ich' && <div className="my-2 border-t border-gray-200"></div>}
                <div className="mb-1">
                  <button 
                    className={`w-full flex items-center px-4 py-2.5 hover:bg-[#f6f8fc] hover:text-[#555555] transition-colors group ${
                      activeMenu === item.id ? 'bg-[#f6f8fc] font-medium text-[#555555]' : 'text-gray-700'
                    } ${!isMenuOpen ? 'justify-center md:flex-col md:py-3 md:gap-1' : 'justify-between'}`}
                    onClick={() => {
                      if (!isMenuOpen) {
                        setIsMenuOpen(true);
                        setActiveMenu(item.id);
                      } else {
                        setActiveMenu(activeMenu === item.id ? null : item.id);
                      }
                    }}
                    title={!isMenuOpen ? item.title : undefined}
                  >
                  <div className={`flex items-center ${!isMenuOpen ? 'justify-center flex-col gap-1' : 'gap-4'}`}>
                    <div className={`${activeMenu === item.id ? 'text-blue-600' : ''} ${!isMenuOpen ? 'group-hover:scale-125 group-hover:text-blue-600 transition-all duration-300' : ''}`}>
                      {item.icon}
                    </div>
                    {isMenuOpen && <span className="text-secondary">{item.title}</span>}
                    {!isMenuOpen && <span className="text-[10pt] font-bold hidden md:block text-center leading-tight mt-1 text-gray-400 group-hover:text-blue-600 transition-colors duration-300">{item.title}</span>}
                  </div>
                  {isMenuOpen && (
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeMenu === item.id ? 'rotate-180' : ''}`} />
                  )}
                </button>
                
                {/* Sub Menu */}
                {isMenuOpen && activeMenu === item.id && (
                  <div className="bg-gray-50 py-1">
                    {item.subItems.map((subItem, idx) => (
                      <button 
                        key={idx}
                        className={`w-full text-left pl-14 pr-4 py-2.5 text-secondary transition-all duration-200 ${
                          activeSubMenu === subItem 
                            ? 'text-blue-700 font-bold bg-blue-50' 
                            : 'text-gray-600 hover:text-blue-700 hover:font-bold hover:bg-blue-50'
                        }`}
                        onClick={() => {
                          setActiveSubMenu(subItem);
                          setIsMenuOpen(false);
                        }}
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              </React.Fragment>
            ))}
          </div>

          {/* Most Opened & Recent */}
          {isMenuOpen && (
            <div className="mt-auto border-t border-gray-200 py-4 px-4 space-y-5">
              <div>
                <h4 className="text-secondary font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5" /> Mở nhiều nhất
                </h4>
                <div className="space-y-1">
                  <button 
                    className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate"
                    onClick={() => setActiveSubMenu('Bản đồ thiết bị')}
                  >
                    Bản đồ thiết bị
                  </button>
                  <button 
                    className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate"
                    onClick={() => setActiveSubMenu('Thông tin sự cố')}
                  >
                    Thông tin sự cố
                  </button>
                  <button 
                    className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate"
                    onClick={() => setActiveSubMenu('Sổ vận hành')}
                  >
                    Sổ vận hành
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-secondary font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> Mở gần đây
                </h4>
                <div className="space-y-1">
                  <button 
                    className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate"
                    onClick={() => setActiveSubMenu('Báo cáo quản trị đơn vị')}
                  >
                    Báo cáo quản trị đơn vị
                  </button>
                  <button 
                    className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate"
                    onClick={() => setActiveSubMenu('Giám sát thông số')}
                  >
                    Giám sát thông số
                  </button>
                  <button 
                    className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate"
                    onClick={() => setActiveSubMenu('Thực hiện CBM')}
                  >
                    Thực hiện CBM
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Frame */}
        <div className="flex-1 flex flex-col overflow-hidden w-full relative">
          {/* Device Bar */}
          <div className={`flex items-center justify-between px-4 min-h-[48px] py-1 bg-white border-b border-gray-200 shrink-0 z-40 shadow-sm relative w-full ${isEditing ? 'pointer-events-none opacity-50' : ''}`}>
            <div className="flex items-center gap-1 flex-wrap flex-1">
                <button 
                  className="p-1.5 hover:bg-blue-50 rounded text-blue-600 transition-colors shrink-0 mr-2"
                  onClick={() => {
                    setTempDevicePath(devicePath);
                    setShowDeviceTreePopup(true);
                  }}
                  title="Chọn Vị trí/Thiết bị làm việc"
                >
                  <Network className="w-5 h-5" />
                </button>
                
                <div className="flex items-center text-[12pt] whitespace-nowrap">
                  {(() => {
                    const items = [];
                    
                    for (let i = 0; i < devicePath.length; i += 2) {
                      const label = devicePath[i];
                      const type = i === 0 ? "Đơn vị" : devicePath[i - 1];
                      const options = getDeviceInstances(devicePath.slice(0, i), type);
                      const displayLabel = i === 0 && devicePath.length >= 4 ? (BRANCH_ABBR[label] || label) : label;
                      const truncatedLabel = displayLabel.length > 20 ? displayLabel.substring(0, 17) + "..." : displayLabel;
                      
                      items.push({
                        label: truncatedLabel,
                        fullLabel: displayLabel,
                        icon: null,
                        dropdownOptions: options,
                        onSelect: (opt: string) => {
                          const newPath = [...devicePath.slice(0, i), opt];
                          setDevicePath(newPath);
                          setDeviceFormCurrentPage(1);
                          setActiveBreadcrumbDropdown(null);
                        },
                        dropdownId: `item-${i}`
                      });
                    }

                    return items.map((item, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && (
                          <div className="flex items-center gap-1 mx-1">
                            <span className="text-gray-300 font-light">/</span>
                          </div>
                        )}
                        <div className="relative group">
                          <button 
                            className="px-2 py-1 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors text-gray-700 flex items-center gap-1.5 whitespace-nowrap"
                            title={item.fullLabel}
                            onClick={() => {
                              setActiveBreadcrumbDropdown(activeBreadcrumbDropdown === item.dropdownId ? null : item.dropdownId);
                              setBreadcrumbSearch('');
                            }}
                          >
                            <span>{item.label}</span>
                          </button>
                          {activeBreadcrumbDropdown === item.dropdownId && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 overflow-hidden flex flex-col max-h-80">
                              <div className="px-3 pb-2 border-b border-gray-100 shrink-0">
                                <div className="relative">
                                  <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                  <input 
                                    type="text" 
                                    placeholder="Tìm kiếm..." 
                                    className="w-full pl-8 pr-3 py-1.5 text-[12pt] border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow bg-gray-50 focus:bg-white" 
                                    onChange={(e) => setBreadcrumbSearch(e.target.value)}
                                    autoFocus
                                  />
                                </div>
                              </div>
                              <div className="overflow-y-auto p-1.5 custom-scrollbar flex-1">
                                {item.dropdownOptions
                                  .filter(opt => opt.toLowerCase().includes(breadcrumbSearch.toLowerCase()))
                                  .map(opt => (
                                  <button 
                                    key={opt} 
                                    className={`w-full text-left px-3 py-2 text-[10pt] rounded-md transition-all mb-0.5 flex items-center justify-between ${item.label === opt ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-700 border border-transparent hover:border-gray-300'}`}
                                    onClick={() => {
                                      item.onSelect(opt);
                                      setBreadcrumbSearch('');
                                    }}
                                  >
                                    <span className="truncate pr-2">{opt}</span>
                                    {item.label === opt && <div className="w-1.5 h-1.5 rounded-full bg-[#164399] shrink-0"></div>}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    ));
                  })()}
                  
                  <div className="flex items-center gap-0.5 ml-1">
                    {getDeviceTreeChildren(devicePath).length > 0 && (
                      <div className="relative group flex items-center">
                        <button 
                          className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors" 
                          title="Thêm cấp"
                          onClick={() => {
                            setActiveBreadcrumbDropdown(activeBreadcrumbDropdown === `add-${devicePath.length}` ? null : `add-${devicePath.length}`);
                            setBreadcrumbSearch('');
                          }}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                        {activeBreadcrumbDropdown === `add-${devicePath.length}` && (
                          <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 overflow-hidden flex flex-col max-h-80">
                            <div className="px-3 pb-2 border-b border-gray-100 shrink-0">
                              <div className="relative">
                                <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                  type="text" 
                                  placeholder="Tìm kiếm..." 
                                  className="w-full pl-8 pr-3 py-1.5 text-[12pt] border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow bg-gray-50 focus:bg-white" 
                                  onChange={(e) => setBreadcrumbSearch(e.target.value)}
                                  autoFocus
                                />
                              </div>
                            </div>
                            <div className="overflow-y-auto p-1.5 custom-scrollbar flex-1">
                              {getDeviceTreeChildren(devicePath)
                                .filter(opt => opt.toLowerCase().includes(breadcrumbSearch.toLowerCase()))
                                .map(opt => (
                                <button 
                                  key={opt} 
                                  className="w-full text-left px-3 py-2 text-[12pt] rounded-md transition-colors mb-0.5 hover:bg-gray-50 text-gray-700 flex items-center justify-between"
                                  onClick={() => {
                                    const type = getDetailedType(opt);
                                    const newPath = [...devicePath, type, opt];
                                    setDevicePath(newPath);
                                    setDeviceFormCurrentPage(1);
                                    setActiveBreadcrumbDropdown(null);
                                    setBreadcrumbSearch('');
                                  }}
                                >
                                  <span className="truncate pr-2">{opt}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {devicePath.length > 1 && (
                      <button 
                        className="p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors" 
                        title="Tìm kiếm thông minh"
                        onClick={() => {
                          setShowDeviceTreePopup(true);
                          setTempDevicePath(devicePath);
                        }}
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action Bar */}
              <div className="flex items-center gap-2 shrink-0 pl-4 border-l border-gray-200 ml-4">
                {/* 4 Action Buttons */}
                <button 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[12pt] font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300 group"
                  onClick={() => setActiveSubMenu('Thông tin thiết bị')}
                >
                  <Eye className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  Xem
                </button>
                <button 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[12pt] font-medium text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 group"
                  onClick={() => setActiveSubMenu('Thông tin sự cố')}
                >
                  <AlertTriangle className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  Sự cố
                </button>
                <button 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[12pt] font-medium text-green-700 hover:bg-green-50 rounded-lg transition-all duration-300 group"
                  onClick={() => setActiveSubMenu('Kết quả công việc')}
                >
                  <Wrench className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
                  Công việc
                </button>
                <button 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[12pt] font-medium text-sky-700 hover:bg-sky-50 rounded-lg transition-all duration-300 group"
                  onClick={() => setActiveSubMenu('Giám sát thông số')}
                >
                  <Activity className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
                  Thông số
                </button>
              </div>
            </div>

          {/* Device Tree Popup */}
          {showDeviceTreePopup && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl w-[90vw] h-[90vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <h3 className="font-bold text-[12pt] text-[#164399] flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Chọn Vị trí/Thiết bị làm việc
                  </h3>
                  <button className="p-1 hover:bg-gray-200 rounded-full transition-colors" onClick={() => setShowDeviceTreePopup(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="p-3 border-b border-gray-200 bg-white flex items-center justify-between relative">
                  <div className="font-medium text-blue-700 text-[12pt] flex-1 truncate pr-4 flex items-center gap-1.5">
                    <span className="text-gray-400">Đang chọn:</span>
                    {tempDevicePath.length > 0 ? (
                      tempDevicePath.filter((_, i) => i % 2 === 0).map((part, i, arr) => (
                        <React.Fragment key={i}>
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{part}</span>
                          {i < arr.length - 1 && <span className="text-gray-300">/</span>}
                        </React.Fragment>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">Chưa chọn vị trí/thiết bị</span>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <div className="relative group">
                      <button 
                        className={`p-1.5 rounded transition-colors ${deviceFavorites.some(f => JSON.stringify(f) === JSON.stringify(tempDevicePath)) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`} 
                        title="Ưa thích"
                        onClick={() => {
                          const exists = deviceFavorites.some(f => JSON.stringify(f) === JSON.stringify(tempDevicePath));
                          if (exists) {
                            setDeviceFavorites(prev => prev.filter(f => JSON.stringify(f) !== JSON.stringify(tempDevicePath)));
                          } else {
                            setDeviceFavorites(prev => [tempDevicePath, ...prev].slice(0, 10));
                          }
                        }}
                      >
                        <Star className={`w-5 h-5 ${deviceFavorites.some(f => JSON.stringify(f) === JSON.stringify(tempDevicePath)) ? 'fill-yellow-500' : ''}`} />
                      </button>
                      
                      <button 
                        className="p-1.5 rounded transition-colors text-gray-400 hover:text-blue-500" 
                        title="Danh sách ưa thích"
                        onClick={() => setShowDeviceFavorites(!showDeviceFavorites)}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {showDeviceFavorites && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" /> Ưa thích ({deviceFavorites.length}/10)
                          </div>
                          <div className="max-h-64 overflow-y-auto custom-scrollbar">
                            {deviceFavorites.length > 0 ? deviceFavorites.map((fav, idx) => (
                              <div key={idx} className="px-4 py-3 hover:bg-yellow-50 cursor-pointer border-b border-gray-50 flex justify-between items-start group" onClick={() => { setTempDevicePath(fav); setShowDeviceFavorites(false); }}>
                                <div className="text-[12pt] text-gray-700 whitespace-normal break-words pr-2 leading-relaxed">{formatDevicePath(fav)}</div>
                                <button 
                                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeviceFavorites(prev => prev.filter(f => JSON.stringify(f) !== JSON.stringify(fav)));
                                  }}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )) : <div className="p-4 text-[12pt] text-gray-500 italic text-center">Chưa có mục ưa thích nào</div>}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="relative">
                      <button 
                        className="p-1.5 hover:bg-blue-50 rounded transition-colors text-gray-400 hover:text-blue-500" 
                        title="Lịch sử"
                        onClick={() => setShowDeviceHistory(!showDeviceHistory)}
                      >
                        <Clock className="w-5 h-5" />
                      </button>
                      {showDeviceHistory && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" /> Lịch sử chọn ({deviceHistory.length}/10)
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {deviceHistory.length > 0 ? deviceHistory.map((hist, idx) => (
                              <div key={idx} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 flex justify-between items-start" onClick={() => { setTempDevicePath(hist); setShowDeviceHistory(false); }}>
                                <div className="text-[12pt] text-gray-700 whitespace-normal break-words pr-2 leading-relaxed">{formatDevicePath(hist)}</div>
                              </div>
                            )) : <div className="p-4 text-[12pt] text-gray-500 italic text-center">Chưa có lịch sử</div>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 flex overflow-x-auto p-4 gap-4 bg-gray-100 custom-scrollbar" onClick={() => { setShowDeviceHistory(false); setShowDeviceFavorites(false); }}>
                  {/* Column 1: Branch (Level 0) */}
                  <GroupedDeviceColumn 
                    hideHeader={true}
                    hideTypeSelection={true}
                    hideSearch={true}
                    typeOptions={getDeviceTypes([])}
                    selectedType="Đơn vị"
                    onSelectType={() => {}}
                    instanceOptions={getDeviceInstances([], "Đơn vị")}
                    selectedInstance={tempDevicePath[0]}
                    onSelectInstance={(opt) => setTempDevicePath([opt])}
                  />

                  {/* Column 2: Type & Instance (Level 1 & 2) */}
                  {tempDevicePath.length >= 1 && (
                    <GroupedDeviceColumn 
                      hideHeader={true}
                      typeOptions={getDeviceTypes(tempDevicePath.slice(0, 1))}
                      selectedType={tempDevicePath[1]}
                      onSelectType={(opt) => setTempDevicePath([tempDevicePath[0], opt])}
                      instanceOptions={tempDevicePath[1] ? getDeviceInstances(tempDevicePath.slice(0, 1), tempDevicePath[1]) : undefined}
                      selectedInstance={tempDevicePath[2]}
                      onSelectInstance={(opt) => setTempDevicePath([tempDevicePath[0], tempDevicePath[1], opt])}
                    />
                  )}

                  {/* Column 3: SubType & SubInstance (Level 3 & 4) */}
                  {tempDevicePath.length >= 3 && (
                    <GroupedDeviceColumn 
                      hideHeader={true}
                      typeOptions={getDeviceTypes(tempDevicePath.slice(0, 3))}
                      selectedType={tempDevicePath[3]}
                      onSelectType={(opt) => setTempDevicePath([...tempDevicePath.slice(0, 3), opt])}
                      instanceOptions={tempDevicePath[3] ? getDeviceInstances(tempDevicePath.slice(0, 3), tempDevicePath[3]) : undefined}
                      selectedInstance={tempDevicePath[4]}
                      onSelectInstance={(opt) => setTempDevicePath([...tempDevicePath.slice(0, 3), tempDevicePath[3], opt])}
                    />
                  )}

                  {/* Column 4: Level 5 & 6 */}
                  {tempDevicePath.length >= 5 && (
                    <GroupedDeviceColumn 
                      hideHeader={true}
                      typeOptions={getDeviceTypes(tempDevicePath.slice(0, 5))}
                      selectedType={tempDevicePath[5]}
                      onSelectType={(opt) => setTempDevicePath([...tempDevicePath.slice(0, 5), opt])}
                      instanceOptions={tempDevicePath[5] ? getDeviceInstances(tempDevicePath.slice(0, 5), tempDevicePath[5]) : undefined}
                      selectedInstance={tempDevicePath[6]}
                      onSelectInstance={(opt) => setTempDevicePath([...tempDevicePath.slice(0, 5), tempDevicePath[5], opt])}
                    />
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-3">
                  <button 
                    className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors" 
                    onClick={() => setShowDeviceTreePopup(false)}
                  >
                    Hủy
                  </button>
                  <button 
                    className="px-5 py-2 bg-[#164399] hover:bg-blue-800 text-white rounded-lg font-medium transition-colors shadow-sm" 
                    onClick={() => {
                      setDevicePath(tempDevicePath);
                      setDeviceFormCurrentPage(1);
                      setShowDeviceTreePopup(false);
                      setDeviceHistory(prev => {
                        const filtered = prev.filter(h => JSON.stringify(h) !== JSON.stringify(tempDevicePath));
                        return [tempDevicePath, ...filtered].slice(0, 10);
                      });
                    }}
                  >
                    Chọn
                  </button>
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#F9F9F9] p-6 w-full">
          {detailForm ? (
            <div key={detailForm.type === 'device' ? detailForm.data : (detailForm.data?.id || 'new')} className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
              <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setDetailForm(null)} 
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                  </button>
                  <h2 className="text-[12pt] font-bold">
                    {getFormTitle()}
                  </h2>
                </div>
                
                  <div className="flex items-center gap-2">
                    {(detailForm.mode === 'edit' || detailForm.mode === 'add') && (
                      <>
                        <button 
                          onClick={() => {
                            if (detailForm.mode === 'add') {
                              setDetailForm(null);
                            } else {
                              setDetailForm({ ...detailForm, mode: 'view' });
                            }
                          }}
                          className="px-4 py-1.5 bg-white border border-gray-300 text-gray-500 rounded-lg text-[12pt] font-bold hover:bg-gray-50 transition-all"
                        >
                          Hủy
                        </button>
                        <button 
                          onClick={() => setDetailForm({ ...detailForm, mode: 'view' })}
                          className="px-4 py-1.5 bg-[#164399] text-white rounded-lg text-[12pt] font-bold hover:bg-blue-800 transition-all flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Lưu
                        </button>
                      </>
                    )}
                  
                  {detailForm.mode === 'view' && (
                    <>
                      <button 
                        onClick={() => setDetailForm({ ...detailForm, mode: 'edit' })}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-gray-200" 
                        title="Sửa"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setDetailForm({ ...detailForm, mode: 'add' })}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all border border-gray-200" 
                        title="Copy"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => {
                          setConfirmAction({
                            title: 'Thông báo',
                            message: 'Đã phát sinh số liệu liên quan, bạn không thể thực hiện việc này!',
                            onConfirm: () => {}
                          });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all border border-gray-200" 
                        title="Xóa"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Column 1: Info */}
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                       {detailForm.type === 'device' ? (
                         <div className="space-y-4">
                           <div className="space-y-1">
                             <label className="text-[10pt] font-bold text-gray-500 uppercase">Tên thiết bị</label>
                             <input 
                               type="text" 
                               defaultValue={detailForm.data || ""} 
                               readOnly={detailForm.mode === 'view'}
                               className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                             />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Mã thiết bị</label>
                               <input 
                                 type="text" 
                                 defaultValue="TB-001" 
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Trạng thái</label>
                               <select 
                                 disabled={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               >
                                 <option>Đang vận hành</option>
                                 <option>Dự phòng</option>
                                 <option>Sửa chữa</option>
                               </select>
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Ngày vận hành</label>
                               <input 
                                 type="date" 
                                 defaultValue="2020-01-01"
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Mã liên kết khác</label>
                               <input 
                                 type="text" 
                                 defaultValue="-"
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Số S/N</label>
                               <input 
                                 type="text" 
                                 defaultValue="SN-123456"
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Mã CMIS</label>
                               <input 
                                 type="text" 
                                 defaultValue="CMIS-001"
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Số thẻ TSCD</label>
                               <input 
                                 type="text" 
                                 defaultValue="3001"
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Góc lái</label>
                               <input 
                                 type="text" 
                                 defaultValue="0.0"
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Khoảng cách vị trí</label>
                               <input 
                                 type="text" 
                                 defaultValue="0"
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Tiếp địa</label>
                               <input 
                                 type="text" 
                                 defaultValue="RC1"
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest">Khu vực</label>
                               <input 
                                 type="text" 
                                 defaultValue="Đồng bằng"
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                           </div>
                           <div className="space-y-1">
                             <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest">Mô tả chi tiết</label>
                             <textarea 
                               rows={3}
                               readOnly={detailForm.mode === 'view'}
                               className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               placeholder="Nhập mô tả..."
                             />
                           </div>
                         </div>
                       ) : detailForm.type === 'testing_plan' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Mã kế hoạch</label>
                              <input 
                                type="text" 
                                defaultValue={detailForm.data?.code || "KH-TN-2026-XXX"} 
                                readOnly={detailForm.mode === 'view'}
                                className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Trạng thái</label>
                              <select 
                                disabled={detailForm.mode === 'view'}
                                defaultValue={detailForm.data?.status || "Chờ duyệt"}
                                className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              >
                                <option>Chờ duyệt</option>
                                <option>Đã duyệt</option>
                                <option>Đang thực hiện</option>
                                <option>Đã hoàn thành</option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Tên kế hoạch</label>
                            <input 
                              type="text" 
                              defaultValue={detailForm.data?.title || ""} 
                              readOnly={detailForm.mode === 'view'}
                              placeholder="Nhập tên kế hoạch thí nghiệm..."
                              className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Loại kế hoạch</label>
                              <select 
                                disabled={detailForm.mode === 'view'}
                                defaultValue={detailForm.data?.type || "Định kỳ"}
                                className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              >
                                <option>Định kỳ</option>
                                <option>Đột xuất</option>
                                <option>CBM</option>
                                <option>Sau sự cố</option>
                                <option>Nâng cấp</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Đơn vị chủ trì</label>
                              <input 
                                type="text" 
                                defaultValue="Trung tâm Thí nghiệm điện" 
                                readOnly={detailForm.mode === 'view'}
                                className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Ngày bắt đầu</label>
                              <input 
                                type="date" 
                                defaultValue={detailForm.data?.startDate || ""} 
                                readOnly={detailForm.mode === 'view'}
                                className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Ngày kết thúc</label>
                              <input 
                                type="date" 
                                defaultValue={detailForm.data?.endDate || ""} 
                                readOnly={detailForm.mode === 'view'}
                                className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Nội dung thực hiện</label>
                            <textarea 
                              rows={4}
                              defaultValue={detailForm.data?.description || ""} 
                              readOnly={detailForm.mode === 'view'}
                              placeholder="Nhập nội dung chi tiết các hạng mục cần thí nghiệm..."
                              className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                            />
                          </div>
                        </div>
                       ) : detailForm.type === 'testing_catalog' ? (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Tên thiết bị trong danh mục</label>
                            <input 
                              type="text" 
                              defaultValue={detailForm.data?.device || ""} 
                              readOnly={detailForm.mode === 'view'}
                              placeholder="Nhập tên thiết bị (ví dụ: MBA T1 - TBA Phố Nối)..."
                              className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Chu kỳ thí nghiệm</label>
                              <select 
                                disabled={detailForm.mode === 'view'}
                                defaultValue={detailForm.data?.interval || "12 tháng"}
                                className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              >
                                <option>3 tháng</option>
                                <option>6 tháng</option>
                                <option>12 tháng</option>
                                <option>24 tháng</option>
                                <option>36 tháng</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Trạng thái danh mục</label>
                              <select 
                                disabled={detailForm.mode === 'view'}
                                defaultValue={detailForm.data?.status || "Bình thường"}
                                className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              >
                                <option>Bình thường</option>
                                <option>Sắp đến hạn</option>
                                <option>Đến hạn</option>
                                <option>Quá hạn</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Lần thí nghiệm cuối</label>
                              <input 
                                type="date" 
                                defaultValue={detailForm.data?.lastTest || ""} 
                                readOnly={detailForm.mode === 'view'}
                                className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Hạn thí nghiệm tiếp theo</label>
                              <input 
                                type="date" 
                                defaultValue={detailForm.data?.nextDue || ""} 
                                readOnly={detailForm.mode === 'view'}
                                className={`w-full px-3 py-2 text-[12pt] font-black text-red-600 rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest">Ghi chú thiết lập</label>
                            <textarea 
                              rows={3}
                              defaultValue={detailForm.data?.urgency ? `Mức độ ưu tiên: ${detailForm.data.urgency}` : ""} 
                              readOnly={detailForm.mode === 'view'}
                              placeholder="Nhập ghi chú thiết lập chu kỳ thí nghiệm..."
                              className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                            />
                          </div>
                        </div>
                       ) : (
                         <div className="space-y-4">
                           <div className="space-y-1">
                             <label className="text-[10pt] font-bold text-gray-500 uppercase">Thiết bị xảy ra sự cố</label>
                             {detailForm.mode === 'view' ? (
                               <input 
                                 type="text" 
                                 defaultValue={detailForm.data?.device || ""} 
                                 readOnly={true}
                                 className="w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all bg-transparent border-transparent focus:outline-none"
                               />
                             ) : (
                               <select 
                                 className="w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
                                 defaultValue={detailForm.data?.device || ""}
                               >
                                 <option value="">-- Chọn thiết bị --</option>
                                 {(() => {
                                   const parent = devicePath[devicePath.length - 1];
                                   return [
                                     `${parent} - Thiết bị 1`,
                                     `${parent} - Thiết bị 2`,
                                     `${parent} - Thiết bị 3`,
                                     `${parent} - Thiết bị 4`,
                                   ].map(d => <option key={d} value={d}>{d}</option>);
                                 })()}
                               </select>
                             )}
                           </div>
                           <div className="space-y-1">
                             <label className="text-[10pt] font-bold text-gray-500 uppercase">Diễn biến sự cố</label>
                             <textarea 
                               rows={4}
                               defaultValue={detailForm.data?.description || ""} 
                               readOnly={detailForm.mode === 'view'}
                               className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                             />
                           </div>
                           <div className="space-y-1">
                             <label className="text-[10pt] font-bold text-gray-500 uppercase">Nguyên nhân</label>
                             <textarea 
                               rows={3}
                               defaultValue={detailForm.data?.cause || ""} 
                               readOnly={detailForm.mode === 'view'}
                               className={`w-full px-3 py-2 text-[12pt] text-purple-600 rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                             />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Thời điểm</label>
                               <input 
                                 type="datetime-local" 
                                 defaultValue={detailForm.data?.time?.replace(' ', 'T') || new Date().toISOString().slice(0, 16)} 
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-500 uppercase">Trạng thái</label>
                               <select 
                                 disabled={detailForm.mode === 'view'}
                                 defaultValue={detailForm.data?.status || "Mới tạo"}
                                 className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                               >
                                 <option>Mới tạo</option>
                                 <option>Đang xử lý</option>
                                 <option>Đã hoàn thành</option>
                                 <option>Chờ duyệt</option>
                               </select>
                             </div>
                           </div>
                         </div>
                       )}
                    </div>
                  </div>

                  {/* Column 2: Images & Attachments or Devices List */}
                  <div className="space-y-8">
                    {detailForm.type === 'testing_plan' ? (
                      <div className="space-y-6">
                        <div className="p-5 bg-white rounded-2xl border border-blue-50 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                           <h4 className="text-[10pt] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative">
                             <ShieldQuestion className="w-4 h-4" /> Phương án cắt điện
                           </h4>
                           <div className="space-y-3 relative">
                             <div className="flex items-center gap-3">
                               <div className={`p-2 rounded-lg ${detailForm.data?.outage?.required ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                 <Zap className={`w-5 h-5 ${detailForm.data?.outage?.required ? 'fill-red-500' : ''}`} />
                               </div>
                               <div>
                                 <p className="text-[12pt] font-bold text-gray-700">Yêu cầu cắt điện: <span className={detailForm.data?.outage?.required ? 'text-red-600' : 'text-green-600'}>{detailForm.data?.outage?.required ? 'CÓ' : 'KHÔNG'}</span></p>
                                 {detailForm.data?.outage?.required && (
                                   <p className="text-[11pt] text-red-400 font-medium italic mt-0.5">{detailForm.data?.outage?.scope}</p>
                                 )}
                               </div>
                             </div>
                             {detailForm.data?.outage?.required && (
                               <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-red-50/30 rounded-xl border border-red-50">
                                 <div>
                                   <p className="text-[10pt] font-black text-red-300 uppercase mb-0.5">Thời điểm cắt</p>
                                   <p className="text-[12pt] font-bold text-red-700">{detailForm.data?.outage?.startTime}</p>
                                 </div>
                                 <div>
                                   <p className="text-[10pt] font-black text-red-300 uppercase mb-0.5">Thời điểm đóng</p>
                                   <p className="text-[12pt] font-bold text-red-700">{detailForm.data?.outage?.endTime}</p>
                                 </div>
                               </div>
                             )}
                           </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                             <Database className="w-3.5 h-3.5" />
                             Danh sách thiết bị ({detailForm.data?.devices?.length || 0})
                          </h4>
                          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                            {detailForm.data?.devices?.map((dev: any) => (
                              <div key={dev.id} className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Box className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-[12pt] font-bold text-gray-700">{dev.name}</p>
                                    <p className="text-[10pt] text-gray-400 font-bold uppercase">{dev.type}</p>
                                  </div>
                                </div>
                                <span className={`text-[10pt] font-black uppercase px-2 py-0.5 rounded ${dev.status === 'Đã xong' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                  {dev.status}
                                </span>
                              </div>
                            ))}
                            {detailForm.mode !== 'view' && (
                              <button className="w-full p-3 text-blue-600 hover:bg-blue-50 text-[12pt] font-bold transition-all flex items-center justify-center gap-2 border-t border-gray-100">
                                <Plus className="w-4 h-4" /> Thêm thiết bị vào kế hoạch
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <ClipboardList className="w-3.5 h-3.5" /> Biên bản liên quan
                            </h4>
                            <button 
                              onClick={() => {
                                setActiveSubMenu('Kết quả thí nghiệm');
                                setDetailForm(null);
                              }}
                              className="text-[10pt] font-bold text-blue-600 hover:underline"
                            >
                              Xem tất cả
                            </button>
                          </div>
                          <div className="space-y-2">
                            {MOCK_TESTING_DATA.filter(t => t.project === detailForm.data?.title).length > 0 ? (
                              MOCK_TESTING_DATA.filter(t => t.project === detailForm.data?.title).slice(0, 3).map((test) => (
                                <div key={test.id} className="p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all cursor-pointer flex items-center justify-between group" onClick={() => { setDetailForm(null); setSelectedTestingId(test.id); setActiveSubMenu('Kết quả thí nghiệm'); }}>
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                                      <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-[11pt] font-bold text-gray-700 group-hover:text-pink-600 transition-colors">{test.device}</p>
                                      <p className="text-[9pt] text-gray-400 font-bold uppercase">{test.type} • {test.time.split(' ')[0]}</p>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-pink-600 transition-all group-hover:translate-x-1" />
                                </div>
                              ))
                            ) : (
                              <div className="p-6 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <FileX className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-[11pt] text-gray-400 italic font-medium">Chưa có biên bản thí nghiệm nào được lập cho kế hoạch này</p>
                                {detailForm.mode !== 'add' && (
                                  <button className="mt-3 px-4 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-lg text-[10pt] font-bold hover:bg-blue-50 transition-all flex items-center gap-2 mx-auto">
                                    <Plus className="w-3.5 h-3.5" /> Lập biên bản ngay
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4">
                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Camera className="w-3.5 h-3.5" />
                            Hình ảnh liên quan
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {(() => {
                              const images = [1, 2]; // Mock images
                              const displayImages = [...images];
                              if (displayImages.length % 2 !== 0) {
                                displayImages.push(-1); // Placeholder
                              }
                              return (
                                <>
                                  {displayImages.map((imgId, idx) => (
                                    imgId === -1 ? (
                                      <div key={`placeholder-${idx}`} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-200 flex items-center justify-center">
                                        <div className="scale-75 opacity-40">
                                          <EvnLogo />
                                        </div>
                                      </div>
                                    ) : (
                                      <div key={imgId} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group">
                                        <img src={`https://picsum.photos/seed/${detailForm.type}-${imgId}/400/225`} alt="Image" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                        {detailForm.mode !== 'view' && (
                                          <button className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    )
                                  ))}
                                  {detailForm.mode !== 'view' && (
                                    <div className={images.length % 2 === 0 ? "col-span-2" : ""}>
                                      <FileUploader 
                                        type="image" 
                                        mode={detailForm.mode} 
                                        onFileSelect={(files) => console.log('Selected images:', files)} 
                                      />
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" />
                            Tài liệu đính kèm
                          </h4>
                          <div className="space-y-2">
                            {[1].map(i => (
                              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-[12pt] font-bold text-gray-700">Tai_lieu_001.pdf</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">1.2 MB</p>
                                  </div>
                                </div>
                                {detailForm.mode !== 'view' && (
                                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                            <FileUploader 
                               type="document" 
                               mode={detailForm.mode} 
                               onFileSelect={(files) => console.log('Selected documents:', files)} 
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border-t border-gray-200 px-6 py-2 flex items-center justify-between shrink-0 text-[10pt] text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Khởi tạo: <span className="font-bold">{detailForm.data?.creator || 'admin'}</span> - {detailForm.data?.createdDate || '10/04/2026'} 08:30</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{detailForm.data?.approver ? `Phê duyệt: ` : `Cập nhật: `}<span className="font-bold">{detailForm.data?.approver || detailForm.data?.creator || 'admin'}</span> - {detailForm.data?.createdDate || '10/04/2026'} 09:15</span>
                </div>
              </div>
            </div>
          ) : activeSubMenu ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
              {activeSubMenu === 'Thông tin thiết bị' ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Custom Header for Device Info */}
                  <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => {
                          if (devicePath.length > 2) {
                            setDevicePath(prev => prev.slice(0, -2));
                          } else if (devicePath.length > 0) {
                            setDevicePath(prev => prev.slice(0, -1));
                          } else {
                            setActiveSubMenu(null);
                          }
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                      </button>
                      <h2 className="text-[12pt] font-semibold flex items-center gap-2" style={{ color: '#164399' }}>
                        <span className="font-bold">
                          {devicePath[devicePath.length - 1]}
                        </span>
                      </h2>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Search child devices */}
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text"
                          placeholder="Tìm kiếm thiết bị con..."
                          className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all"
                          value={childSearch}
                          onChange={(e) => setChildSearch(e.target.value)}
                        />
                      </div>
                      
                      {/* Action Icons */}
                      <button 
                        onClick={() => setDetailForm({ type: 'device', mode: 'add' })}
                        className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-lg text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm whitespace-nowrap"
                        title="Thêm thiết bị con"
                      >
                        <Plus className="w-4 h-4" />
                        Thêm
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm" title="Sửa hàng loạt">
                        <ListChecks className="w-5 h-5" />
                      </button>
                      
                      {/* Sub-menu */}
                      <div className="relative">
                        <button 
                          onClick={() => setDeviceFormMenuOpen(!deviceFormMenuOpen)}
                          className={`p-2 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm ${deviceFormMenuOpen ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {deviceFormMenuOpen && (
                          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {[
                              { label: 'Sửa', icon: <Edit className="w-4 h-4" />, color: 'text-blue-600' },
                              { label: 'Di chuyển', icon: <Move className="w-4 h-4" />, color: 'text-orange-600' },
                              { label: 'Copy', icon: <Copy className="w-4 h-4" />, color: 'text-green-600' },
                              { label: 'Phân quyền', icon: <Shield className="w-4 h-4" />, color: 'text-purple-600' },
                              { label: 'Xóa', icon: <Trash2 className="w-4 h-4" />, color: 'text-red-600' },
                            ].map((item, idx) => (
                              <button 
                                key={idx}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-[12pt] text-gray-700 hover:bg-gray-50 transition-colors group"
                                onClick={() => setDeviceFormMenuOpen(false)}
                              >
                                <span className={`${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Form Content */}
                  <div className="flex-1 flex overflow-hidden bg-white border-t border-gray-200">
                    {/* Left Column: Child Devices List */}
                    <div className="flex-1 flex flex-col overflow-hidden bg-white border-r border-gray-100">
                      
                      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                        <div className="overflow-y-auto flex-1 custom-scrollbar min-h-0">
                          <table className="w-full text-[12pt] text-left border-collapse table-fixed">
                            <thead className="bg-white text-[#555555] text-[12pt] font-bold sticky top-0 z-20 shadow-sm">
                              <tr>
                                <th className="px-4 h-12 border-b border-gray-200 w-12 text-center bg-white font-bold">
                                  <DesignTooltip id="th_stt">STT</DesignTooltip>
                                </th>
                                <th className="px-4 h-12 border-b border-gray-200 w-32 bg-white font-bold">
                                  <DesignTooltip id="th_loai_tb">Loại TB</DesignTooltip>
                                </th>
                                <th className="px-4 h-12 border-b border-gray-200 bg-white font-bold">
                                  <DesignTooltip id="th_ten_tb_chi_tiet">Tên Thiết Bị chi tiết</DesignTooltip>
                                </th>
                                <th className="px-4 h-12 border-b border-gray-200 w-12 text-center bg-white font-bold"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {(() => {
                                const children = getDeviceTreeChildren(devicePath);
                                const filteredChildren = children.filter(c => c.toLowerCase().includes(childSearch.toLowerCase()));
                                
                                const itemsPerPage = 20;
                                const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);
                                const startIndex = (deviceFormCurrentPage - 1) * itemsPerPage;
                                const paginatedChildren = filteredChildren.slice(startIndex, startIndex + itemsPerPage);

                                return paginatedChildren.map((child, idx) => {
                                  const actualIdx = startIndex + idx;
                                  const isLocked = actualIdx === 2; // Mock locked state
                                  const type = getDetailedType(child);
                                  
                                  return (
                                    <tr 
                                      key={actualIdx} 
                                      className={`group hover:bg-blue-50/50 transition-colors border-b border-gray-100 cursor-pointer ${isLocked ? 'opacity-50 grayscale-[0.5]' : ''}`}
                                      onDoubleClick={() => {
                                        setDevicePath([...devicePath, getDetailedType(child), child]);
                                        setDeviceFormCurrentPage(1);
                                      }}
                                    >
                                      <td className="px-4 py-3 text-center text-gray-400 text-secondary">{actualIdx + 1}</td>
                                      <td className="px-4 py-3">
                                        <div className={`px-2.5 py-1 rounded-md text-secondary uppercase tracking-wider text-center border text-[10pt] whitespace-nowrap ${DEVICE_TYPE_COLORS[type] || DEVICE_TYPE_COLORS['default']}`}>
                                          {type}
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-gray-700 group-hover:text-blue-700 transition-colors truncate text-[12pt]">
                                        {child}
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <div className="relative group/menu inline-block">
                                          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-400 hover:text-blue-600 transition-all">
                                            <MoreVertical className="w-4 h-4" />
                                          </button>
                                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 hidden group-hover/menu:block">
                                            <button 
                                              className="w-full text-left px-3 py-2 text-secondary hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                                              onClick={() => setDetailForm({ type: 'device', mode: 'view', data: child })}
                                            >
                                              <FileText className="w-3.5 h-3.5 text-blue-500" /> Xem lý lịch
                                            </button>
                                            <button className="w-full text-left px-3 py-2 text-secondary hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                                              <Database className="w-3.5 h-3.5 text-green-500" /> Mã TSCĐ
                                            </button>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button className="w-full text-left px-3 py-2 text-secondary hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                                              <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> Di chuyển lên trên
                                            </button>
                                            <button className="w-full text-left px-3 py-2 text-secondary hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                                              <ChevronDown className="w-3.5 h-3.5 text-gray-500" /> Di chuyển xuống dưới
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                });
                              })()}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        {(() => {
                          const children = getDeviceTreeChildren(devicePath);
                          const filteredChildren = children.filter(c => c.toLowerCase().includes(childSearch.toLowerCase()));
                          const itemsPerPage = 20;
                          const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);
                          
                          if (totalPages <= 1) return null;

                          return (
                            <div className="p-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                              <div className="text-secondary text-gray-500 font-medium">
                                Hiển thị {(deviceFormCurrentPage - 1) * itemsPerPage + 1} - {Math.min(deviceFormCurrentPage * itemsPerPage, filteredChildren.length)} / {filteredChildren.length}
                              </div>
                              <div className="flex items-center gap-1">
                                <button 
                                  disabled={deviceFormCurrentPage === 1}
                                  onClick={() => setDeviceFormCurrentPage(prev => prev - 1)}
                                  className="p-1.5 rounded hover:bg-white border border-transparent hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                  <button 
                                    key={i}
                                    onClick={() => setDeviceFormCurrentPage(i + 1)}
                                    className={`w-7 h-7 text-secondary font-bold rounded transition-all ${deviceFormCurrentPage === i + 1 ? 'bg-[#164399] text-white shadow-md' : 'hover:bg-white border border-transparent hover:border-gray-200 text-gray-600'}`}
                                  >
                                    {i + 1}
                                  </button>
                                ))}
                                <button 
                                  disabled={deviceFormCurrentPage === totalPages}
                                  onClick={() => setDeviceFormCurrentPage(prev => prev + 1)}
                                  className="p-1.5 rounded hover:bg-white border border-transparent hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Right Column: Info & Tracking */}
                    <div className="flex-1 flex flex-col overflow-hidden bg-white">
                      {/* Tabs - Sticky */}
                      <div className="flex border-b border-gray-200 bg-white shrink-0 sticky top-0 z-30">
                        <button 
                          className={`flex-1 h-12 text-[12pt] font-bold transition-all border-b-2 ${deviceFormTab === 'info' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                          onClick={() => setDeviceFormTab('info')}
                        >
                          Thông tin chung
                        </button>
                        <button 
                          className={`flex-1 h-12 text-[12pt] font-bold transition-all border-b-2 ${deviceFormTab === 'tracking' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                          onClick={() => setDeviceFormTab('tracking')}
                        >
                          Theo dõi thiết bị
                        </button>
                      </div>

                      <div className="flex-1 overflow-hidden relative">
                        {deviceFormTab === 'info' ? (
                          <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-6">
                            <div className="space-y-8">
                              {(() => {
                                const details = getDeviceDetails(devicePath[devicePath.length - 1] || "Thiết bị");
                                return (
                                  <>
                                    <div className="grid grid-cols-1 gap-8">
                                      {/* Left Column: Info */}
                                      <div className="space-y-4">
                                          <div className="flex items-center justify-between">
                                            <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                              <Settings className="w-3.5 h-3.5" />
                                              Thông tin chi tiết
                                            </h4>
                                            <button 
                                              onClick={() => setDetailForm({ type: 'device', mode: 'view', data: devicePath[devicePath.length - 1] })}
                                              className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap"
                                            >
                                              <ExternalLink className="w-3.5 h-3.5" />
                                              Xem chi tiết
                                            </button>
                                          </div>
                                        
                                        {/* First 2 fields: Full width */}
                                        <div className="space-y-3">
                                          {details.info.slice(0, 2).map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 group p-3 bg-white rounded-xl border border-blue-100 hover:border-blue-300 transition-all">
                                              <div className="mt-0.5 p-1.5 bg-blue-50 rounded-md border border-blue-100 group-hover:border-blue-200 transition-colors shrink-0">
                                                {item.icon}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <DesignTooltip id={`lbl_dev_info_${i}`}>
                                                  <p className="text-[12pt] font-bold text-[#555555] mb-0.5">{item.label}</p>
                                                </DesignTooltip>
                                                <div className="flex items-center gap-2">
                                                  <p className={`text-[12pt] font-normal ${item.valueColor || 'text-[#555555]'}`}>{item.value}</p>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>

                                        {/* Remaining fields: 2 columns */}
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                          {details.info.slice(2).map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 group p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                                              <div className="mt-0.5 p-1.5 bg-white rounded-md border border-gray-100 group-hover:border-blue-200 transition-colors shrink-0">
                                                {item.icon || <Box className="w-4 h-4 text-gray-400" />}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <DesignTooltip id={`lbl_dev_info_col2_${i}`}>
                                                  <p className="text-[12pt] font-bold text-[#555555] mb-0.5 truncate">{item.label}</p>
                                                </DesignTooltip>
                                                {item.badge ? (
                                                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10pt] font-bold uppercase ${item.badge}`}>
                                                    {item.value}
                                                  </span>
                                                ) : (
                                                  <p className="text-[12pt] font-normal text-[#555555] truncate">{item.value}</p>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Right Column: Images & Attachments */}
                                      <div className="space-y-8">
                                        {/* Image Viewer */}
                                        <div className="space-y-4">
                                          <div className="flex items-center justify-between">
                                            <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                              <Camera className="w-3.5 h-3.5" />
                                              Hình ảnh thiết bị
                                            </h4>
                                            <div className="flex gap-2">
                                              <DesignTooltip id="btn_upload_img_tb">
                                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Tải ảnh lên">
                                                  <Upload className="w-4 h-4" />
                                                </button>
                                              </DesignTooltip>
                                              <DesignTooltip id="btn_camera_img_tb">
                                                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Mở Camera">
                                                  <Camera className="w-4 h-4" />
                                                </button>
                                              </DesignTooltip>
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-2 gap-3">
                                             {(() => {
                                               const images = [...details.images];
                                               const displayImages = [...images];
                                               if (displayImages.length % 2 !== 0) {
                                                 displayImages.push(""); // Placeholder
                                               }
                                               return displayImages.map((img, idx) => (
                                                 img === "" ? (
                                                   <div key={`placeholder-${idx}`} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-200 flex items-center justify-center">
                                                     <div className="scale-75 opacity-40">
                                                       <EvnLogo />
                                                     </div>
                                                   </div>
                                                 ) : (
                                                   <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group cursor-pointer">
                                                     <img src={img} alt="Device" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" onClick={() => setPreviewContent({ type: 'image', url: img, name: 'Hình ảnh thiết bị' })} />
                                                     <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                       <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-blue-600 hover:bg-white shadow-sm transition-all" title="Tải về">
                                                         <Download className="w-3.5 h-3.5" />
                                                       </button>
                                                       <button 
                                                         className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-red-600 hover:bg-white shadow-sm transition-all" 
                                                         title="Xóa"
                                                         onClick={(e) => {
                                                           e.stopPropagation();
                                                           setConfirmAction({
                                                             title: 'Xác nhận xóa ảnh',
                                                             message: 'Chỉ có User đã tải lên mới có quyền thực hiện việc này.\nBạn có chắc chắn muốn Xóa chứ?',
                                                             onConfirm: () => console.log('Deleted image', idx)
                                                           });
                                                         }}
                                                       >
                                                         <Trash2 className="w-3.5 h-3.5" />
                                                       </button>
                                                     </div>
                                                     <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                                                       <Maximize2 className="w-6 h-6 text-white" />
                                                     </div>
                                                   </div>
                                                 )
                                               ));
                                             })()}
                                          </div>
                                        </div>

                                        {/* Attached Documents */}
                                        <div className="space-y-4">
                                         <div className="flex items-center gap-4">
                                            <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                                              <FileText className="w-3.5 h-3.5" />
                                              Tài liệu đính kèm
                                            </h4>
                                            <div className="flex-1"></div>
                                            <DesignTooltip id="btn_upload_doc_tb">
                                              <button className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap">
                                                <Upload className="w-3.5 h-3.5" />
                                                Tải lên
                                              </button>
                                            </DesignTooltip>
                                          </div>
                                          <div className="space-y-2">
                                            {[
                                              { name: 'Lý lý thiết bị.pdf', size: '2.4 MB', date: '12/05/2024' },
                                              { name: 'Biên bản thí nghiệm.docx', size: '1.1 MB', date: '20/05/2024' },
                                              { name: 'Ảnh hiện trạng.zip', size: '15.8 MB', date: '25/05/2024' },
                                            ].map((doc, i) => (
                                              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group" onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name })}>
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                    <p className="text-[12pt] font-bold text-gray-700 group-hover:text-blue-600 transition-colors truncate">{doc.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{doc.size} • {doc.date}</p>
                                                  </div>
                                                </div>
                                                <div className="flex gap-1 shrink-0">
                                                  <DesignTooltip id={`btn_tai_ve_tai_lieu_tb_${i}`}>
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Tải về">
                                                      <Download className="w-4 h-4" />
                                                    </button>
                                                  </DesignTooltip>
                                                  <DesignTooltip id={`btn_xoa_tai_lieu_tb_${i}`}>
                                                    <button 
                                                      className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
                                                      title="Xóa"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setConfirmAction({
                                                          title: 'Xác nhận xóa tài liệu',
                                                          message: 'Chỉ có User đã tải lên mới có quyền thực hiện việc này.\nBạn có chắc chắn muốn Xóa chứ?',
                                                          onConfirm: () => console.log('Deleted doc', i)
                                                        });
                                                      }}
                                                    >
                                                      <Trash2 className="w-4 h-4" />
                                                    </button>
                                                  </DesignTooltip>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-6">
                            <div className="space-y-4 pb-6">
                              {(() => {
                                const details = getDeviceDetails(devicePath[devicePath.length - 1] || "Thiết bị");
                                return details.tracking.map((section, i) => {
                                  const colorMap: Record<string, string> = {
                                    red: 'bg-red-50 border-red-100 text-red-600',
                                    green: 'bg-green-50 border-green-100 text-green-600',
                                    purple: 'bg-purple-50 border-purple-100 text-purple-600',
                                    pink: 'bg-pink-50 border-pink-100 text-pink-600',
                                    blue: 'bg-blue-50 border-blue-100 text-blue-600',
                                    gray: 'bg-gray-50 border-gray-200 text-gray-700',
                                  };
                                  const hoverColorMap: Record<string, string> = {
                                    red: 'hover:bg-red-50/40 hover:text-red-700',
                                    green: 'hover:bg-green-50/40 hover:text-green-700',
                                    purple: 'hover:bg-purple-50/40 hover:text-purple-700',
                                    pink: 'hover:bg-pink-50/40 hover:text-pink-700',
                                    blue: 'hover:bg-blue-50/40 hover:text-blue-700',
                                    gray: 'hover:bg-gray-50/40 hover:text-[#555555]',
                                  };

                                    return (
                                      <div key={i} className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-300 opacity-100 ${colorMap[section.color].split(' ')[1]}`}>
                                      <div className={`px-4 py-3 flex items-center justify-between border-b transition-colors ${colorMap[section.color]}`}>
                                        <div className="flex items-center gap-2">
                                          {React.cloneElement(section.icon as React.ReactElement<any>, { className: "w-4 h-4" })}
                                          <h4 className="text-[12pt] font-bold uppercase tracking-wider">
                                            {section.title}
                                            <span className="ml-2 text-[12pt] font-bold opacity-70">({section.items.length})</span>
                                          </h4>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <button className="text-[10pt] text-gray-400 hover:text-blue-600 hover:font-bold transition-all">Xem tất cả</button>
                                        </div>
                                      </div>
                                        <div className="p-0 bg-white">
                                          <div className="divide-y divide-gray-50">
                                            {section.items.map((item, idx) => (
                                              <div 
                                                key={idx} 
                                                className={`px-4 py-2.5 text-[12pt] text-gray-600 transition-all flex items-center gap-0 cursor-pointer ${hoverColorMap[section.color]} hover:shadow-sm`}
                                                onClick={() => {
                                                  if (section.id === 'su-co') {
                                                    setActiveSubMenu('Thông tin sự cố');
                                                    setSelectedIncidentId(idx + 1); // Mock ID match
                                                  } else if (section.id === 'cong-viec') {
                                                    setActiveForm({ type: 'Công việc', target: item.content, data: item });
                                                  } else if (section.id === 'thong-so') {
                                                    setActiveForm({ type: 'Thông số', target: item.content, data: item });
                                                  }
                                                }}
                                              >
                                                <div className="w-20 shrink-0 text-gray-400 text-[12pt] flex items-center justify-center">{item.date}</div>
                                                <div className="w-[1px] h-4 bg-gray-100 mx-3 shrink-0"></div>
                                                <div className="flex-1 truncate pr-4">{item.content}</div>
                                                {section.id !== 'thong-so' && section.id !== 'lich-su' && (
                                                  <div className="w-12 shrink-0 flex justify-center">
                                                    {item.status === 'Đã hoàn thành' || item.status === 'Hoàn thành' ? (
                                                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    ) : (
                                                      <PlayCircle className="w-5 h-5 text-blue-500" />
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  });
                              })()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeSubMenu === 'Kế hoạch thí nghiệm' ? (
                <div className="flex-1 flex flex-col overflow-hidden text-[12pt]">
                  {/* Header */}
                  <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setActiveSubMenu(null)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                          <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h2 className="text-[12pt] font-semibold flex items-center gap-2">
                          <span className="text-[#555555]">Thí nghiệm</span>
                          <span className="font-bold text-[#164399]">- Kế hoạch công tác</span>
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setShowTestingFilter(!showTestingFilter)}
                          className={`p-2 rounded-lg border transition-all ${showTestingFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
                        >
                          <Filter className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => setDetailForm({ type: 'testing_plan', mode: 'add' })}
                          className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-lg font-bold hover:bg-blue-800 transition-all shadow-sm"
                        >
                          <Plus className="w-4 h-4" /> Lập kế hoạch
                        </button>
                      </div>
                    </div>
                    {showTestingFilter && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 grid grid-cols-4 gap-4 animate-in slide-in-from-top-2">
                        <div className="space-y-1">
                          <label className="text-[10pt] font-bold text-gray-400 uppercase">Trạng thái</label>
                          <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 outline-none">
                            <option>Tất cả</option>
                            <option>Chờ duyệt</option>
                            <option>Đã duyệt</option>
                            <option>Đang thực hiện</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10pt] font-bold text-gray-400 uppercase">Loại kế hoạch</label>
                          <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 outline-none">
                            <option>Tất cả</option>
                            <option>Định kỳ</option>
                            <option>Đột xuất</option>
                            <option>CBM</option>
                          </select>
                        </div>
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10pt] font-bold text-gray-400 uppercase">Tìm kiếm</label>
                          <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Tên kế hoạch, mã số..." className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg outline-none" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Plan List & Overview */}
                  <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-gray-50/30">
                    <div className="grid grid-cols-1 gap-4">
                      {MOCK_TESTING_PLANS.map((plan) => (
                        <div 
                          key={plan.id}
                          onClick={() => {
                            setSelectedTestingPlanId(plan.id);
                            setDetailForm({ type: 'testing_plan', mode: 'view', data: plan });
                          }}
                          className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="bg-blue-50 text-[#164399] px-2 py-0.5 rounded text-[10pt] font-bold border border-blue-100">{plan.code}</span>
                                <span className={`px-2 py-0.5 rounded text-[10pt] font-bold ${plan.status === 'Đã duyệt' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{plan.status}</span>
                              </div>
                              <h3 className="text-[13pt] font-bold text-gray-800 group-hover:text-[#164399] transition-colors">{plan.title}</h3>
                            </div>
                            <div className="text-right">
                              <p className="text-[10pt] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Thời gian thực hiện</p>
                              <p className="text-[12pt] font-bold text-gray-600">{plan.startDate} <span className="text-gray-300 mx-2">→</span> {plan.endDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2 text-gray-500">
                                <User className="w-4 h-4" />
                                <span className="text-[11pt]">Lập: <strong>{plan.creator}</strong></span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-500">
                                <Database className="w-4 h-4" />
                                <span className="text-[11pt]">Thiết bị: <strong>{plan.devices.length}</strong></span>
                              </div>
                              {plan.outage.required && (
                                <div className="flex items-center gap-2 text-red-500">
                                  <Zap className="w-4 h-4 fill-red-500" />
                                  <span className="text-[11pt] font-bold uppercase tracking-tighter">Có cắt điện</span>
                                </div>
                              )}
                            </div>
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8pt] font-bold text-gray-500">U{i}</div>
                              ))}
                              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[8pt] font-bold text-gray-400">+2</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeSubMenu === 'Kết quả thí nghiệm' ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Reuse the previously created rich Testing UI for Results/Records */}
                  <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setActiveSubMenu(null)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                          <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h2 className="text-[12pt] font-semibold flex items-center gap-2">
                          <span className="text-[#555555]">Thí nghiệm</span>
                          <span className="font-bold text-[#164399]">- Biên bản kết quả</span>
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="text" placeholder="Tìm biên bản..." className="pl-9 pr-4 py-2 bg-gray-100 border-none rounded-lg text-[11pt] focus:ring-2 focus:ring-blue-500/20 w-64 outline-none" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-lg text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm">
                          <Plus className="w-4 h-4" /> Ghi kết quả
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex overflow-hidden">
                    {/* Left: Records List */}
                    <div className="w-[450px] flex flex-col border-r border-gray-100 bg-white overflow-hidden">
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="divide-y divide-gray-50">
                          {MOCK_TESTING_DATA.map((test) => {
                            const isSelected = selectedTestingId === test.id;
                            return (
                              <div 
                                key={test.id}
                                onClick={() => setSelectedTestingId(test.id)}
                                className={`p-4 cursor-pointer transition-all border-l-4 ${isSelected ? 'bg-blue-50/50 border-blue-600' : 'border-transparent hover:bg-gray-50'}`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className={`text-[9pt] font-black uppercase px-2 py-0.5 rounded ${test.result === 'Đạt' ? 'bg-green-100 text-green-700' : test.result === 'Chưa có' ? 'bg-gray-100 text-gray-500' : 'bg-red-100 text-red-700'}`}>
                                    {test.result}
                                  </span>
                                  <span className="text-[10pt] text-gray-400 font-bold">{test.time.split(' ')[0]}</span>
                                </div>
                                <h3 className="text-[12pt] font-bold text-gray-800 mb-1 leading-tight">{test.device}</h3>
                                <p className="text-[11pt] text-gray-500 flex items-center gap-1">
                                  <FlaskConical className="w-3.5 h-3.5" /> {test.type}
                                </p>
                                <div className="mt-3 flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${test.status === 'Đã hoàn thành' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`} />
                                  <span className="text-[10pt] font-bold text-gray-400">{test.status}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right: Record Detail */}
                    <div className="flex-1 flex flex-col bg-gray-50/30 overflow-hidden">
                      {(() => {
                        const test = MOCK_TESTING_DATA.find(t => t.id === selectedTestingId);
                        if (!test) return <div className="flex-1 flex items-center justify-center text-gray-400 italic">Chọn một biên bản để xem chi tiết</div>;

                        return (
                          <>
                            <div className="flex border-b border-gray-200 bg-white shrink-0 shadow-sm relative z-10">
                              {[
                                { id: 'info', label: 'Thông tin chung', icon: <Info className="w-4 h-4" /> },
                                { id: 'result', label: 'Kết quả chi tiết', icon: <ClipboardList className="w-4 h-4" /> },
                                { id: 'attachments', label: 'Hình ảnh/Tài liệu', icon: <Package className="w-4 h-4" /> },
                                { id: 'signing', label: 'Ký duyệt', icon: <Shield className="w-4 h-4" /> }
                              ].map(tab => (
                                <button 
                                  key={tab.id}
                                  onClick={() => setTestingDetailTab(tab.id as any)}
                                  className={`flex-1 h-12 flex items-center justify-center gap-2 text-[12pt] font-bold transition-all border-b-2 ${testingDetailTab === tab.id ? 'border-pink-500 text-pink-600 bg-pink-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                >
                                  {tab.icon}
                                  {tab.label}
                                </button>
                              ))}
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                              {/* Content is same as previous, just reorganized for better separation */}
                              {testingDetailTab === 'info' && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                      <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest mb-4">Đơn vị & Nhân sự</h4>
                                      <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Database className="w-5 h-5"/></div>
                                          <div>
                                            <p className="text-[11pt] text-gray-400 font-bold uppercase tracking-tighter">Đội thực hiện</p>
                                            <p className="text-[12pt] font-bold text-gray-800">{test.team}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600"><User className="w-5 h-5"/></div>
                                          <div>
                                            <p className="text-[11pt] text-gray-400 font-bold uppercase tracking-tighter">Người chủ trì</p>
                                            <p className="text-[12pt] font-bold text-gray-800">{test.leader}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                      <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest mb-4">Đánh giá chung</h4>
                                      <div className="flex flex-col items-center justify-center h-[100px] gap-2">
                                        <div className={`text-[28pt] font-black uppercase ${test.result === 'Đạt' ? 'text-green-600' : test.result === 'Chưa có' ? 'text-gray-300' : 'text-red-500'}`}>
                                          {test.result}
                                        </div>
                                        <p className="text-[11pt] text-gray-400 font-medium italic">Ngày cập nhật: {test.time}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest mb-4">Bối cảnh công tác</h4>
                                    <div className="grid grid-cols-2 gap-8">
                                      <div>
                                        <p className="text-[11pt] text-gray-400 font-bold uppercase tracking-tighter mb-1">Loại hình</p>
                                        <p className="text-[13pt] font-bold text-[#164399]">{test.type}</p>
                                      </div>
                                      <div>
                                        <p className="text-[11pt] text-gray-400 font-bold uppercase tracking-tighter mb-1">Điều kiện môi trường</p>
                                        <p className="text-[12pt] font-medium text-gray-700 italic">{test.condition}</p>
                                      </div>
                                      <div className="col-span-2">
                                        <p className="text-[11pt] text-gray-400 font-bold uppercase tracking-tighter mb-1">Dự án/Kế hoạch liên kết</p>
                                        <p className="text-[12pt] font-bold text-gray-700">{test.project}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {testingDetailTab === 'result' && (
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm animate-in fade-in duration-300">
                                  <table className="w-full text-left">
                                    <thead className="bg-[#164399] text-white text-[10pt] font-bold uppercase tracking-widest">
                                      <tr>
                                        <th className="px-6 py-4">Hạng mục thí nghiệm</th>
                                        <th className="px-6 py-4 w-24 text-center">ĐVT</th>
                                        <th className="px-6 py-4 w-32 text-center">Trị số đo</th>
                                        <th className="px-6 py-4 w-32 text-center">Quy định</th>
                                        <th className="px-6 py-4 w-24 text-center">ĐG</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                      {test.items.map((it, i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                          <td className="px-6 py-4 text-[12pt] font-bold text-gray-700">{it.name}</td>
                                          <td className="px-6 py-4 text-center text-gray-400 font-black">{it.unit}</td>
                                          <td className="px-6 py-4 text-center font-bold text-blue-600 bg-blue-50/50">{it.value}</td>
                                          <td className="px-6 py-4 text-center text-gray-500 italic">{it.limit}</td>
                                          <td className="px-6 py-4 text-center">
                                            <span className={`text-[10pt] font-black uppercase ${it.eval === 'Đạt' ? 'text-green-600' : 'text-red-500'}`}>{it.eval}</span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                              {testingDetailTab === 'attachments' && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                  <div className="grid grid-cols-4 gap-4">
                                    {test.images.map((img, i) => (
                                      <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100 cursor-pointer hover:ring-blue-400 transition-all">
                                        <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" onClick={() => setPreviewContent({ type: 'image', url: img, name: 'Ảnh hiện trường' })} />
                                      </div>
                                    ))}
                                    <div className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                                      <Upload className="w-6 h-6 mb-2" />
                                      <span className="text-[10pt] font-black uppercase">Thêm ảnh</span>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <h4 className="text-[10pt] font-black text-gray-400 uppercase tracking-widest pl-2">Hồ sơ pháp lý</h4>
                                    {test.attachments.map((at, i) => (
                                      <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                          <div className="p-3 bg-pink-50 rounded-xl text-pink-600"><FileText className="w-6 h-6" /></div>
                                          <div>
                                            <p className="text-[12pt] font-bold text-gray-700">{at.name}</p>
                                            <p className="text-[10pt] text-gray-400 font-bold">{at.size} • 15/05/2026</p>
                                          </div>
                                        </div>
                                        <div className="flex gap-2">
                                          <button className="p-2 text-gray-400 hover:text-blue-600"><Download className="w-5 h-5"/></button>
                                          <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-5 h-5"/></button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {testingDetailTab === 'signing' && (
                                <div className="space-y-4 animate-in fade-in duration-300">
                                  {test.signing.map((s, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                                      <div className="w-10 h-10 rounded-full bg-[#164399]/10 text-[#164399] flex items-center justify-center font-black text-[12pt] shrink-0 italic">{i+1}</div>
                                      <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                          <span className="text-[10pt] font-black text-[#164399] uppercase tracking-widest">{s.role}</span>
                                          <span className="text-[10pt] font-bold text-gray-400">{s.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-[12pt] font-bold text-gray-700">{s.name}</span>
                                          <span className={`text-[10pt] font-black px-2 py-0.5 rounded ${s.status === 'Đã ký' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{s.status}</span>
                                        </div>
                                      </div>
                                      {s.status === 'Đã ký' && (
                                        <div className="w-20 h-10 border-2 border-green-200 rounded flex items-center justify-center bg-green-50/30 rotate-[-15deg]">
                                          <span className="text-green-600 font-black text-[8pt] uppercase">Valid</span>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ) : activeSubMenu === 'Danh mục thí nghiệm' ? (
                <div className="flex-1 flex flex-col overflow-hidden text-[12pt]">
                  <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setActiveSubMenu(null)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                          <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h2 className="text-[12pt] font-semibold flex items-center gap-2">
                          <span className="text-[#555555]">Thiết lập</span>
                          <span className="font-bold text-[#164399]">- Danh mục thiết bị thí nghiệm</span>
                        </h2>
                      </div>
                      <button 
                        onClick={() => setDetailForm({ type: 'testing_catalog', mode: 'add' })}
                        className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-lg font-bold hover:bg-blue-800 transition-all shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Thêm thiết bị
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-6 bg-gray-50/30 overflow-y-auto custom-scrollbar">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-[12pt]">
                      <table className="w-full text-left">
                        <thead className="bg-[#f8fafc] text-gray-500 font-bold uppercase tracking-widest text-[10pt] border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-4">Tên thiết bị</th>
                            <th className="px-6 py-4">Chu kỳ TN</th>
                            <th className="px-6 py-4">Lần TN cuối</th>
                            <th className="px-6 py-4">Hạn TN tiếp</th>
                            <th className="px-6 py-4 text-center">Trạng thái</th>
                            <th className="px-6 py-4 text-center">Ghi chú</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {MOCK_TESTING_CATALOG.map((cat) => (
                            <tr 
                              key={cat.id} 
                              className="hover:bg-gray-50 transition-colors cursor-pointer"
                              onClick={() => setDetailForm({ type: 'testing_catalog', mode: 'view', data: cat })}
                            >
                              <td className="px-6 py-4 font-bold text-gray-800">{cat.device}</td>
                              <td className="px-6 py-4 text-gray-500 font-bold">{cat.interval}</td>
                              <td className="px-6 py-4 text-gray-400 font-bold">{cat.lastTest}</td>
                              <td className="px-6 py-4 text-[#164399] font-black">{cat.nextDue}</td>
                              <td className="px-6 py-4 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10pt] font-black uppercase ${
                                  cat.status === 'Quá hạn' ? 'bg-red-100 text-red-600' : 
                                  cat.status === 'Đến hạn' ? 'bg-orange-100 text-orange-600' :
                                  cat.status === 'Sắp đến hạn' ? 'bg-blue-100 text-blue-600' :
                                  'bg-green-100 text-green-600'
                                }`}>
                                  {cat.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className={`text-[10pt] font-bold ${cat.urgency === 'Rất cao' ? 'text-red-500' : cat.urgency === 'Cao' ? 'text-orange-500' : 'text-gray-400'}`}>
                                  Mức độ: {cat.urgency}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : activeSubMenu === 'Thông tin sự cố' ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Header */}
                  <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
                    <div className="flex items-center justify-between mb-0">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setActiveSubMenu(null)}
                          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h2 className="text-[12pt] font-semibold flex items-center gap-2">
                          <span className="text-[#555555]">Thông tin sự cố</span>
                          <span className="font-bold" style={{ color: '#164399' }}>
                            {devicePath.length > 0 ? ` - ${devicePath[devicePath.length - 1]}` : ''}
                          </span>
                        </h2>
                      </div>
                      
                      <div className="flex items-center gap-3 ml-auto">
                        {/* View Mode Selector */}
                        <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
                          <button 
                            onClick={() => setIncidentViewMode('latest')}
                            className={`px-4 py-1.5 text-[10pt] font-bold rounded-full transition-all whitespace-nowrap ${incidentViewMode === 'latest' ? 'bg-[#164399] text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                          >
                            Mới nhất
                          </button>
                          <button 
                            onClick={() => setIncidentViewMode('range')}
                            className={`px-4 py-1.5 text-[10pt] font-bold rounded-full transition-all whitespace-nowrap ${incidentViewMode === 'range' ? 'bg-[#164399] text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                          >
                            Khoảng ngày
                          </button>
                        </div>

                        {/* Period/Date Selectors */}
                        {incidentViewMode === 'latest' ? (
                          <DesignTooltip id="select_incident_period">
                            <select 
                              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none font-normal text-gray-700"
                              value={incidentPeriod}
                              onChange={(e) => setIncidentPeriod(e.target.value)}
                            >
                              {['1 Tuần', '1 Tháng', '1 Quý', '6 Tháng', '1 Năm'].map(p => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>
                          </DesignTooltip>
                        ) : (
                          <div className="flex items-center gap-2">
                            <input 
                              type="date" 
                              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-[10pt] font-bold text-gray-700 focus:outline-none"
                              value={incidentFromDate}
                              onChange={(e) => setIncidentFromDate(e.target.value)}
                            />
                            <span className="text-gray-400 text-[10pt]">to</span>
                            <input 
                              type="date" 
                              className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-[10pt] font-bold text-gray-700 focus:outline-none"
                              value={incidentToDate}
                              onChange={(e) => setIncidentToDate(e.target.value)}
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          <DesignTooltip id="btn_filter">
                            <button 
                              onClick={() => setShowIncidentFilter(!showIncidentFilter)}
                              className={`p-2 rounded-lg border transition-all ${showIncidentFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
                            >
                              <Filter className="w-5 h-5" />
                            </button>
                          </DesignTooltip>

                          <DesignTooltip id="btn_them">
                            <button 
                              onClick={() => setDetailForm({ type: 'incident', mode: 'add' })}
                              className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-lg text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm whitespace-nowrap"
                            >
                              <Plus className="w-4 h-4" />
                              Thêm
                            </button>
                          </DesignTooltip>
                        </div>
                      </div>
                    </div>

                    {/* Filter Bar */}
                    {showIncidentFilter && (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-[10px] animate-in slide-in-from-top-2 duration-200 bg-gray-100 p-4 rounded-lg">
                        {/* Loại TB */}
                        <div className="flex items-center gap-2">
                          <DesignTooltip id="lbl_filter_loai_tb">
                            <span className="text-[10pt] text-[#555555] font-bold">Loại TB:</span>
                          </DesignTooltip>
                          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200">
                            {['TBA', 'Dz', 'CN'].map(t => (
                              <button 
                                key={t}
                                onClick={() => setIncidentFilterType(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                                className={`px-3 py-1 text-[10pt] rounded-md transition-all whitespace-nowrap ${incidentFilterType.includes(t) ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-500 hover:border-gray-300 border border-transparent'}`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Cấp ĐA */}
                        <div className="flex items-center gap-2">
                          <DesignTooltip id="lbl_filter_cap_da">
                            <span className="text-[10pt] text-[#555555] font-bold">Cấp Đ/A:</span>
                          </DesignTooltip>
                          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200">
                            {(selectedBranch.includes('Truyền tải') ? ['500kV', '220kV'] : ['220kV', '110kV', '35kV', '22kV']).map(v => (
                              <button 
                                key={v}
                                onClick={() => setIncidentFilterVoltage(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])}
                                className={`px-3 py-1 text-[10pt] rounded-md transition-all whitespace-nowrap ${incidentFilterVoltage.includes(v) ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-500 hover:border-gray-300 border border-transparent'}`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Trạng thái */}
                        <div className="flex items-center gap-2">
                          <DesignTooltip id="lbl_filter_trang_thai">
                            <span className="text-[10pt] text-[#555555] font-bold">Trạng thái:</span>
                          </DesignTooltip>
                          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200">
                            {['Mới', 'Đang xử lý', 'Đang tồn tại', 'Xử lý xong'].map(s => (
                              <button 
                                key={s}
                                onClick={() => setIncidentFilterStatus(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                                className={`px-3 py-1 text-[10pt] rounded-md transition-all whitespace-nowrap ${incidentFilterStatus.includes(s) ? 'bg-[#ECF3FE] text-[#555555] border border-transparent' : 'text-gray-500 hover:border-gray-300 border border-transparent'}`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Search */}
                        <div className="relative flex-1 min-w-[150px]">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="text"
                            placeholder="Tìm kiếm sự cố..."
                            className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full transition-all"
                            value={incidentSearch}
                            onChange={(e) => setIncidentSearch(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Left: Incident List */}
                    <div className="w-1/2 flex flex-col border-r border-gray-100 bg-white overflow-hidden">
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-white text-[#555555] text-[12pt] font-bold sticky top-0 z-10">
                            <tr className="border-b border-gray-200 h-12">
                              <th className="px-4 font-bold w-16 bg-white border-b border-gray-200 text-center">
                                <DesignTooltip id="th_thoi_diem">Sự cố</DesignTooltip>
                              </th>
                              <th className="px-4 font-bold bg-white border-b border-gray-200">
                                <DesignTooltip id="th_dien_bien_nguyen_nhan">Diễn biến & Nguyên nhân</DesignTooltip>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {MOCK_INCIDENTS.map((inc) => {
                              const isSelected = selectedIncidentId === inc.id;
                              const dateParts = inc.time.split(' ');
                              const [year, month, day] = dateParts[0].split('-');
                              const time = dateParts[1];

                              return (
                                <tr 
                                  key={inc.id}
                                  onClick={() => setSelectedIncidentId(inc.id)}
                                  onDoubleClick={() => setDetailForm({ type: 'incident', mode: 'view', data: inc })}
                                  className={`group cursor-pointer transition-all ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                                >
                                  <td className="px-4 py-4 vertical-top border-b border-gray-50">
                                    <div className="flex flex-col items-center gap-2">
                                      <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                        <span className="text-[10pt] font-bold whitespace-nowrap">{`${day}/${month}/${year}`}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                                        <span className="text-[10pt] font-mono font-bold">{time}</span>
                                      </div>
                                      <div className="mt-1">
                                        <span className={`px-3 py-1 rounded-full text-[10pt] font-bold uppercase whitespace-nowrap ${
                                          inc.status === 'Xử lý xong' ? 'bg-green-100 text-green-700' :
                                          inc.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-700' :
                                          inc.status === 'Mới' ? 'bg-purple-100 text-purple-700' :
                                          'bg-blue-100 text-blue-700'
                                        }`}>
                                          {inc.status}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="space-y-2">
                                      <h3 className="text-[12pt] font-bold text-[#164399] group-hover:text-blue-700 transition-colors">
                                        {inc.device}
                                      </h3>
                                      <div className="space-y-1">
                                        <p className="text-[12pt] text-[#555555] line-clamp-2 leading-relaxed">
                                          <span className="font-bold text-[#555555] mr-1">DB:</span>
                                          {inc.description}
                                        </p>
                                        <p className="text-[12pt] text-purple-600 line-clamp-2 leading-relaxed">
                                          <span className="font-bold text-[#555555] mr-1">NN:</span>
                                          {inc.cause}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Right: Incident Details */}
                    <div className="flex-1 flex flex-col bg-gray-50/30 overflow-hidden">
                      {(() => {
                        const inc = MOCK_INCIDENTS.find(i => i.id === selectedIncidentId);
                        if (!inc) return <div className="flex-1 flex items-center justify-center text-gray-400">Chọn một sự cố để xem chi tiết</div>;

                        return (
                          <>
                            {/* Tabs */}
                            <div className="flex border-b border-gray-200 bg-white shrink-0">
                              {[
                                { id: 'detail', label: 'Chi tiết' },
                                { id: 'reduction', label: 'Giảm trừ' },
                                { id: 'tracking', label: 'Theo dõi' }
                              ].map(tab => (
                                <button 
                                  key={tab.id}
                                  onClick={() => setIncidentDetailTab(tab.id as any)}
                                  className={`flex-1 h-12 text-[12pt] font-bold transition-all border-b-2 ${incidentDetailTab === tab.id ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                >
                                  {tab.label}
                                </button>
                              ))}
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                              {incidentDetailTab === 'detail' && (
                                  <div className="grid grid-cols-1 gap-8">
                                    {/* Left Column: Description */}
                                    <div className="space-y-4">
                                      <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <FileText className="w-3.5 h-3.5" />
                                        Mô tả sự cố
                                      </h4>
                                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
                                        <div>
                                          <DesignTooltip id="lbl_dien_bien">
                                            <p className="text-[12pt] text-[#555555] mb-1 font-bold">Diễn biến chi tiết</p>
                                          </DesignTooltip>
                                          <p className="text-[12pt] text-gray-700 leading-relaxed">{inc.description}</p>
                                        </div>
                                        <div className="pt-4 border-t border-gray-50">
                                          <DesignTooltip id="lbl_nguyen_nhan">
                                            <p className="text-[12pt] text-[#555555] mb-1 font-bold">Nguyên nhân xác định</p>
                                          </DesignTooltip>
                                          <p className="text-[12pt] text-purple-600 leading-relaxed">{inc.cause}</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right Column: Images & Attachments */}
                                    <div className="space-y-8">
                                      {/* Images */}
                                      <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <Camera className="w-3.5 h-3.5" />
                                            Hình ảnh hiện trường
                                          </h4>
                                          <div className="flex gap-2">
                                            <DesignTooltip id="btn_upload_img_inc">
                                              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Tải ảnh lên">
                                                <Upload className="w-4 h-4" />
                                              </button>
                                            </DesignTooltip>
                                            <DesignTooltip id="btn_camera_img_inc">
                                              <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Mở Camera">
                                                <Camera className="w-4 h-4" />
                                              </button>
                                            </DesignTooltip>
                                          </div>
                                        </div>
                                        {inc.images.length > 0 ? (
                                          <div className="grid grid-cols-2 gap-3">
                                            {(() => {
                                              const displayImages = [...inc.images];
                                              if (displayImages.length % 2 !== 0) {
                                                displayImages.push(""); // Placeholder
                                              }
                                              return displayImages.map((img, idx) => (
                                                img === "" ? (
                                                  <div key={`placeholder-${idx}`} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-200 flex items-center justify-center">
                                                    <div className="scale-75 opacity-40">
                                                      <EvnLogo />
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group cursor-pointer">
                                                    <img src={img} alt="Incident" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" onClick={() => setPreviewContent({ type: 'image', url: img, name: 'Hình ảnh hiện trường' })} />
                                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                      <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-blue-600 hover:bg-white shadow-sm transition-all" title="Tải về">
                                                        <Download className="w-3.5 h-3.5" />
                                                      </button>
                                                      <button 
                                                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-red-600 hover:bg-white shadow-sm transition-all" 
                                                        title="Xóa"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          setConfirmAction({
                                                            title: 'Xác nhận xóa ảnh',
                                                            message: 'Chỉ có User đã tải lên mới có quyền thực hiện việc này.\nBạn có chắc chắn muốn Xóa chứ?',
                                                            onConfirm: () => console.log('Deleted image', idx)
                                                          });
                                                        }}
                                                      >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                      </button>
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                                                      <Maximize2 className="w-6 h-6 text-white" />
                                                    </div>
                                                  </div>
                                                )
                                              ));
                                            })()}
                                          </div>
                                        ) : (
                                          <div className="h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-[12pt]">
                                            Chưa có hình ảnh
                                          </div>
                                        )}
                                      </div>

                                      {/* Attachments */}
                                      <div className="space-y-4">
                                        <div className="flex items-center justify-between gap-4">
                                          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                                            <Share2 className="w-3.5 h-3.5" />
                                            Tài liệu đính kèm
                                          </h4>
                                          <DesignTooltip id="btn_upload_doc_inc">
                                            <button className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap">
                                              <Upload className="w-3.5 h-3.5" />
                                              Tải lên
                                            </button>
                                          </DesignTooltip>
                                        </div>
                                        <div className="space-y-2">
                                          {inc.attachments.map((doc, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group" onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name })}>
                                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm shrink-0">
                                                  <FileText className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <p className="text-[12pt] font-bold text-gray-700 group-hover:text-blue-600 transition-colors truncate">{doc.name}</p>
                                                  <p className="text-[10px] text-gray-400 font-bold uppercase">{doc.size} • 08/04/2026</p>
                                                </div>
                                              </div>
                                              <div className="flex gap-1 shrink-0">
                                                <DesignTooltip id={`btn_tai_ve_tai_lieu_inc_${i}`}>
                                                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Tải về">
                                                    <Download className="w-4 h-4" />
                                                  </button>
                                                </DesignTooltip>
                                                <DesignTooltip id={`btn_xoa_tai_lieu_inc_${i}`}>
                                                  <button 
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
                                                    title="Xóa"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setConfirmAction({
                                                        title: 'Xác nhận xóa tài liệu',
                                                        message: 'Chỉ có User đã tải lên mới có quyền thực hiện việc này.\nBạn có chắc chắn muốn Xóa chứ?',
                                                        onConfirm: () => console.log('Deleted doc', i)
                                                      });
                                                    }}
                                                  >
                                                    <Trash2 className="w-4 h-4" />
                                                  </button>
                                                </DesignTooltip>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                              {incidentDetailTab === 'reduction' && (
                                <div className="space-y-6">
                                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                                    <div className="flex items-center justify-between">
                                    <DesignTooltip id="title_thong_tin_giam_tru">
                                      <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest">Thông tin giảm trừ sự cố</h4>
                                    </DesignTooltip>
                                      <span className={`px-3 py-1 rounded-full text-[10pt] font-bold uppercase whitespace-nowrap ${
                                        inc.reduction.status === 'Đã duyệt' ? 'bg-green-100 text-green-700' :
                                        inc.reduction.status === 'Chờ duyệt' ? 'bg-orange-100 text-orange-700' :
                                        'bg-gray-100 text-gray-500'
                                      }`}>
                                        {inc.reduction.status}
                                      </span>
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <div>
                                        <DesignTooltip id="lbl_ly_do_giam_tru">
                                          <label className="text-[12pt] text-[#555555] block mb-1.5 font-bold">Lý do giảm trừ</label>
                                        </DesignTooltip>
                                        <DesignTooltip id="select_ly_do_giam_tru">
                                          <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                            <option>Do nguyên nhân bất khả kháng</option>
                                            <option>Do lỗi của bên thứ 3</option>
                                            <option>Do động vật vi phạm khoảng cách</option>
                                            <option>Khác</option>
                                          </select>
                                        </DesignTooltip>
                                      </div>

                                      <div>
                                        <DesignTooltip id="lbl_ghi_chu_giam_tru">
                                          <label className="text-[12pt] text-[#555555] block mb-1.5 font-bold">Ghi chú</label>
                                        </DesignTooltip>
                                        <textarea 
                                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[80px]"
                                          placeholder="Nhập ghi chú giảm trừ..."
                                          defaultValue={inc.reduction.content}
                                        ></textarea>
                                      </div>
                                      
                                      <div className="flex justify-start items-center gap-6 w-full">
                                        <DesignTooltip id="btn_dang_ky_giam_tru">
                                          <button 
                                            className={`px-8 py-1.5 text-[12pt] font-bold rounded-lg transition-all whitespace-nowrap ${inc.reduction.status === 'Đã duyệt' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-blue-600 bg-blue-50 hover:bg-blue-100 active:scale-95'}`}
                                            disabled={inc.reduction.status === 'Đã duyệt'}
                                          >
                                            Đăng ký
                                          </button>
                                        </DesignTooltip>
                                        <span className="text-[10pt] text-gray-400 font-medium italic whitespace-nowrap">Đăng ký mới nhất: 08/04/2026 15:30</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Attachments Section */}
                                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between gap-4">
                                    <DesignTooltip id="title_tai_lieu_dinh_kem">
                                      <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Tài liệu đính kèm</h4>
                                    </DesignTooltip>
                                      <div className="flex gap-2">
                                        <DesignTooltip id="btn_thu_vien_tai_lieu">
                                          <button className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors whitespace-nowrap">
                                            <Archive className="w-3.5 h-3.5" />
                                            Thư viện
                                          </button>
                                        </DesignTooltip>
                                        <DesignTooltip id="btn_tai_len_tai_lieu">
                                          <button className="flex items-center gap-1 px-3 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap">
                                            <Upload className="w-3.5 h-3.5" />
                                            Tải lên
                                          </button>
                                        </DesignTooltip>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      {inc.attachments.map((doc, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group" onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name })}>
                                          <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm shrink-0">
                                              <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <p className="text-[12pt] font-bold text-gray-700 group-hover:text-blue-600 transition-colors truncate">{doc.name}</p>
                                              <p className="text-[10px] text-gray-400 font-bold uppercase">{doc.size} • 08/04/2026</p>
                                            </div>
                                          </div>
                                          <div className="flex gap-1 shrink-0">
                                            <DesignTooltip id="btn_tai_ve_tai_lieu_dinh_kem">
                                              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Tải về">
                                                <Download className="w-4 h-4" />
                                              </button>
                                            </DesignTooltip>
                                            <DesignTooltip id="btn_xoa_tai_lieu_dinh_kem">
                                              <button 
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
                                                title="Xóa"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setConfirmAction({
                                                    title: 'Xác nhận xóa tài liệu',
                                                    message: 'Chỉ có User đã tải lên mới có quyền thực hiện việc này.\nBạn có chắc chắn muốn Xóa chứ?',
                                                    onConfirm: () => console.log('Deleted reduction doc', i)
                                                  });
                                                }}
                                              >
                                                <Trash2 className="w-4 h-4" />
                                              </button>
                                            </DesignTooltip>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Comments Section */}
                                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                                  <DesignTooltip id="title_trao_doi_thao_luan">
                                    <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                      <MessageSquare className="w-4 h-4 text-blue-500" />
                                      Trao đổi & Thảo luận
                                    </h4>
                                  </DesignTooltip>
                                    <div className="space-y-4">
                                      <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                          <span className="text-blue-700 font-bold text-[12pt]">NV</span>
                                        </div>
                                        <div className="flex-1 bg-gray-50 p-3 rounded-lg rounded-tl-none border border-gray-100">
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-[12pt] font-bold text-gray-700">Nguyễn Văn A</span>
                                            <span className="text-[10pt] text-gray-400">08/04/2026 10:30</span>
                                          </div>
                                          <p className="text-[12pt] text-gray-600">Đã bổ sung biên bản xác nhận của bên thứ 3.</p>
                                        </div>
                                      </div>
                                      <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                          <span className="text-orange-700 font-bold text-[12pt]">QL</span>
                                        </div>
                                        <div className="flex-1 bg-gray-50 p-3 rounded-lg rounded-tl-none border border-gray-100">
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-[12pt] font-bold text-gray-700">Trần Quản Lý</span>
                                            <span className="text-[10pt] text-gray-400">08/04/2026 14:15</span>
                                          </div>
                                          <p className="text-[12pt] text-gray-600">Biên bản hợp lệ, đã duyệt giảm trừ.</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex gap-4 items-start">
                                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border-2 border-white shadow-sm overflow-hidden">
                                        <img src={CSKH_ICON} alt="User" className="w-full h-full object-cover" />
                                      </div>
                                      <div className="flex-1 flex flex-col gap-3">
                                        <textarea 
                                          placeholder="Nhập ý kiến trao đổi..." 
                                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[12pt] focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px]"
                                        ></textarea>
                                        <div className="flex justify-end">
                                          <DesignTooltip id="btn_gui_trao_doi">
                                            <button className="px-8 py-1.5 text-[12pt] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap">
                                              Gửi
                                            </button>
                                          </DesignTooltip>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {incidentDetailTab === 'tracking' && (
                                <div className="space-y-4">
                                  <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <History className="w-3.5 h-3.5" />
                                    Diễn biến sau sự cố
                                  </h4>
                                  <div className="relative pl-4 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                                    {inc.tracking.length > 0 ? inc.tracking.map((t, i) => (
                                      <div key={i} className="relative pl-8">
                                        <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-white border-2 border-blue-500 z-10"></div>
                                        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                          <p className="text-[10pt] font-bold text-blue-600 mb-1">{t.date}</p>
                                          <p className="text-[12pt] text-gray-700">{t.content}</p>
                                        </div>
                                      </div>
                                    )) : (
                                      <div className="text-center py-12 text-gray-400">
                                        <Clock className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                        <p className="text-[12pt]">Chưa có diễn biến theo dõi</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ) : (activeSubMenu === 'Kế hoạch thí nghiệm' || activeSubMenu === 'Kết quả thí nghiệm') ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Header */}
                  <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setActiveSubMenu(null)}
                          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h2 className="text-[12pt] font-semibold flex items-center gap-2">
                          <span className="text-[#555555]">Quản lý Thí nghiệm</span>
                          <span className="font-bold text-[#164399]">
                            {activeSubMenu === 'Kế hoạch thí nghiệm' ? '- Lập kế hoạch' : '- Biên bản thí nghiệm'}
                          </span>
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
                          <button className="px-4 py-1.5 text-[10pt] font-bold rounded-full bg-[#164399] text-white shadow-md">Đang thực hiện</button>
                          <button className="px-4 py-1.5 text-[10pt] font-bold rounded-full text-gray-500 hover:bg-gray-200 transition-all">Lịch sử</button>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-lg text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm">
                          <Plus className="w-4 h-4" />
                          Lập phiếu mới
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Left: Testing List */}
                    <div className="w-1/2 flex flex-col border-r border-gray-100 bg-white overflow-hidden">
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-white text-[#555555] text-[12pt] font-bold sticky top-0 z-10 shadow-sm">
                            <tr className="border-b border-gray-200 h-12">
                              <th className="px-4 w-20 text-center">Trạng thái</th>
                              <th className="px-4">Thiết bị & Công tác</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {MOCK_TESTING_DATA.map((test) => {
                              const isSelected = selectedTestingId === test.id;
                              return (
                                <tr 
                                  key={test.id}
                                  onClick={() => setSelectedTestingId(test.id)}
                                  className={`group cursor-pointer transition-all ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                                >
                                  <td className="px-4 py-4 align-top">
                                    <div className="flex flex-col items-center gap-2">
                                      <div className={`w-3 h-3 rounded-full ${
                                        test.status === 'Đã hoàn thành' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                                        test.status === 'Đang thực hiện' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse' :
                                        'bg-gray-300'
                                      }`} />
                                      <span className="text-[9pt] font-bold text-gray-400 uppercase tracking-tighter text-center leading-none">
                                        {test.status === 'Đã hoàn thành' ? 'Xong' : test.status === 'Đang thực hiện' ? 'Chạy' : 'Kế hoạch'}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="space-y-1.5">
                                      <div className="flex items-center justify-between">
                                        <h3 className="text-[12pt] font-bold text-[#164399] group-hover:text-blue-700 transition-colors">
                                          {test.device}
                                        </h3>
                                        <span className="text-[10pt] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                          {test.time.split(' ')[0]}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className="px-2 py-0.5 rounded bg-pink-50 text-pink-700 text-[10pt] font-bold border border-pink-100">
                                          {test.type}
                                        </span>
                                        <span className="text-[11pt] text-gray-500 flex items-center gap-1">
                                          <User className="w-3.5 h-3.5" />
                                          {test.leader}
                                        </span>
                                      </div>
                                      <p className="text-[11pt] text-gray-600 line-clamp-1 italic">
                                        Chu kỳ: {test.project}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Right: Testing Details */}
                    <div className="flex-1 flex flex-col bg-gray-50/30 overflow-hidden">
                      {(() => {
                        const test = MOCK_TESTING_DATA.find(t => t.id === selectedTestingId);
                        if (!test) return <div className="flex-1 flex items-center justify-center text-gray-400 italic">Chọn một phiếu thí nghiệm để xem chi tiết</div>;

                        return (
                          <>
                            {/* Tabs */}
                            <div className="flex border-b border-gray-200 bg-white shrink-0 shadow-sm relative z-10">
                              {[
                                { id: 'info', label: 'Thông tin chung', icon: <Info className="w-4 h-4" /> },
                                { id: 'result', label: 'Kết quả chi tiết', icon: <ClipboardList className="w-4 h-4" /> },
                                { id: 'attachments', label: 'Hình ảnh/Tài liệu', icon: <Package className="w-4 h-4" /> },
                                { id: 'signing', label: 'Ký duyệt', icon: <Shield className="w-4 h-4" /> }
                              ].map(tab => (
                                <button 
                                  key={tab.id}
                                  onClick={() => setTestingDetailTab(tab.id as any)}
                                  className={`flex-1 h-12 flex items-center justify-center gap-2 text-[12pt] font-bold transition-all border-b-2 ${testingDetailTab === tab.id ? 'border-pink-500 text-pink-600 bg-pink-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                >
                                  {tab.icon}
                                  {tab.label}
                                </button>
                              ))}
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                              {testingDetailTab === 'info' && (
                                <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest block mb-2">Đơn vị thực hiện</label>
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Database className="w-6 h-6" />
                                          </div>
                                          <div>
                                            <p className="text-[12pt] font-bold text-gray-800">{test.team}</p>
                                            <p className="text-[11pt] text-gray-500">Chủ trì: {test.leader}</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest block mb-2">Nội dung công tác</label>
                                        <p className="text-[12pt] font-bold text-[#164399] mb-1">{test.type}</p>
                                        <p className="text-[11pt] text-gray-600 leading-relaxed">{test.project}</p>
                                      </div>
                                    </div>
                                    <div className="space-y-6">
                                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest block mb-2">Điều kiện môi trường</label>
                                        <div className="flex items-start gap-2">
                                          <Clock className="w-4 h-4 text-orange-500 mt-1 shrink-0" />
                                          <p className="text-[12pt] text-gray-700 leading-relaxed font-medium italic">{test.condition}</p>
                                        </div>
                                      </div>
                                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest block mb-2">Đánh giá chung</label>
                                        <div className="flex items-center gap-2">
                                          <span className={`px-4 py-1.5 rounded-lg text-[14pt] font-black uppercase ${test.result === 'Đạt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {test.result}
                                          </span>
                                          <p className="text-[11pt] text-gray-500 italic">Cập nhật lúc: {test.time}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-200 border-l-4 flex gap-3">
                                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                                    <div>
                                      <p className="text-[12pt] font-bold text-yellow-800">Lưu ý nghiệp vụ</p>
                                      <p className="text-[11pt] text-yellow-700">Dữ liệu thí nghiệm này sẽ tự động được đồng bộ sang chức năng đánh giá CBM để tính lại điểm sức khỏe CHI sau khi lãnh đạo đơn vị phê duyệt.</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {testingDetailTab === 'result' && (
                                <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                      <thead className="bg-gray-50 text-gray-500 text-[10pt] font-bold uppercase tracking-widest">
                                        <tr className="border-b border-gray-200">
                                          <th className="px-6 py-4">Hạng mục kiểm tra</th>
                                          <th className="px-6 py-4 w-24 text-center">ĐVT</th>
                                          <th className="px-6 py-4 w-32 text-center text-[#164399]">Trị số đo</th>
                                          <th className="px-6 py-4 w-32 text-center">Trị số quy định</th>
                                          <th className="px-6 py-4 w-24 text-center">Đánh giá</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-100">
                                        {test.items.length > 0 ? test.items.map((item, i) => (
                                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-[12pt] font-bold text-gray-700">{item.name}</td>
                                            <td className="px-6 py-4 text-center text-gray-500 font-bold">{item.unit}</td>
                                            <td className="px-6 py-4 text-center">
                                              <input 
                                                type="text" 
                                                defaultValue={item.value} 
                                                className="w-full bg-[#ECF3FE] border border-blue-200 rounded px-2 py-1 text-center font-bold text-[#164399] focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                                              />
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-500 font-medium italic">{item.limit}</td>
                                            <td className="px-6 py-4 text-center">
                                              <span className={`px-2 py-1 rounded text-[10pt] font-black ${item.eval === 'Đạt' ? 'bg-green-100 text-green-700' : item.eval === '-' ? 'text-gray-400' : 'bg-red-100 text-red-700'}`}>
                                                {item.eval}
                                              </span>
                                            </td>
                                          </tr>
                                        )) : (
                                          <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">Chưa có hạng mục thí nghiệm nào được khai báo.</td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                  
                                  <div className="mt-4 flex justify-between items-center">
                                    <button className="flex items-center gap-2 px-4 py-2 text-blue-600 font-bold hover:bg-blue-50 rounded-lg transition-colors">
                                      <Plus className="w-4 h-4" /> Thêm hạng mục
                                    </button>
                                    <div className="flex gap-2">
                                      <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors">Hủy bỏ</button>
                                      <button className="px-6 py-2 bg-[#164399] text-white rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-sm">Lưu kết quả</button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {testingDetailTab === 'attachments' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                                  {/* Images */}
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <Camera className="w-3.5 h-3.5" />
                                        Hình ảnh thí nghiệm hiện trường
                                      </h4>
                                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11pt] font-bold text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                                        <Upload className="w-4 h-4" />
                                        Tải ảnh
                                      </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      {test.images.length > 0 ? test.images.map((img, idx) => (
                                        <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden border-2 border-white shadow-lg group cursor-pointer">
                                          <img src={img} alt="Testing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" onClick={() => setPreviewContent({ type: 'image', url: img, name: 'Ảnh thí nghiệm' })} />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <p className="text-white text-[10pt] font-bold">Hình ảnh #{idx+1} - {test.device}</p>
                                          </div>
                                          <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-red-600 hover:bg-white shadow-xl transform active:scale-90 transition-all">
                                              <Trash2 className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </div>
                                      )) : (
                                        <div className="col-span-2 h-40 bg-gray-100/50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2">
                                          <Camera className="w-8 h-8 opacity-20" />
                                          <p className="text-[12pt] font-bold opacity-30">Chưa có hình ảnh</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Documents */}
                                  <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                      <FileText className="w-3.5 h-3.5" />
                                      Hồ sơ thí nghiệm (Scan/PDF)
                                    </h4>
                                    <div className="space-y-3">
                                      {test.attachments.length > 0 ? test.attachments.map((doc, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all cursor-pointer group">
                                          <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="p-3 bg-pink-50 rounded-xl text-pink-600 shadow-inner group-hover:bg-pink-100 transition-colors">
                                              <FlaskConical className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <p className="text-[12pt] font-bold text-gray-700 group-hover:text-pink-600 transition-colors truncate">{doc.name}</p>
                                              <p className="text-[10px] text-gray-400 font-black uppercase mt-0.5 tracking-widest">{doc.size} • 15/05/2026</p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 shrink-0 ml-4">
                                            <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm">
                                              <Download className="w-4 h-4" />
                                            </button>
                                            <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm">
                                              <Trash2 className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </div>
                                      )) : (
                                        <div className="p-10 bg-gray-100/50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2">
                                          <Upload className="w-8 h-8 opacity-20" />
                                          <p className="text-[12pt] font-bold opacity-30">Chưa có tài liệu đính kèm</p>
                                          <button className="mt-2 px-6 py-2 bg-white border border-gray-300 rounded-lg text-[11pt] font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all">Tải hồ sơ lên</button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {testingDetailTab === 'signing' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="bg-[#164399] px-6 py-3 flex items-center justify-between">
                                      <h4 className="text-white text-[12pt] font-bold tracking-widest uppercase">Quy trình ký số điện tử</h4>
                                      <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10pt] font-bold">4/4 Cấp đã ký</span>
                                    </div>
                                    <div className="p-6">
                                      <div className="space-y-4">
                                        {test.signing.length > 0 ? test.signing.map((sign, idx) => (
                                          <div key={idx} className="flex items-center gap-6 p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                                            <div className="w-12 h-12 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-[#164399] text-[14pt] font-black shrink-0 italic">
                                              {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                              <div className="flex items-center justify-between mb-1">
                                                <p className="text-[11pt] font-black text-[#164399] uppercase tracking-widest">{sign.role}</p>
                                                <p className="text-[10pt] text-gray-400 font-bold">{sign.time}</p>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <span className="text-[13pt] font-bold text-gray-700">{sign.name}</span>
                                                <span className={`flex items-center gap-1 text-[10pt] font-bold px-2 py-0.5 rounded ${sign.status === 'Đã ký' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                  {sign.status === 'Đã ký' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                  {sign.status}
                                                </span>
                                              </div>
                                            </div>
                                            {sign.status === 'Đã ký' ? (
                                              <div className="w-24 h-12 border-2 border-green-500/30 rounded flex items-center justify-center relative rotate-[-12deg] bg-green-50/50">
                                                <span className="text-green-600 font-black text-[10pt] uppercase tracking-tighter">Sign Valid</span>
                                                <div className="absolute inset-x-1 bottom-1 h-0.5 bg-green-500/30"></div>
                                              </div>
                                            ) : (
                                              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-all">Ký ngay</button>
                                            )}
                                          </div>
                                        )) : (
                                          <div className="p-8 text-center text-gray-400 italic">Luồng ký chưa được khởi tạo</div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                                    <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 shadow-sm transition-all">
                                      <Copy className="w-4 h-4" /> Sao chép
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 shadow-sm transition-all" onClick={() => window.print()}>
                                      <Printer className="w-4 h-4" /> In biên bản
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#164399] text-white font-black rounded-xl hover:bg-blue-800 shadow-lg transform active:scale-95 transition-all">
                                      <Share2 className="w-4 h-4" /> Chia sẻ & Gửi thông báo
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <button 
                      onClick={() => setActiveSubMenu(null)}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <h2 className="text-[12pt] font-medium text-[#555555]">{activeSubMenu}</h2>
                  </div>
                  <div className="text-gray-500 flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-lg">
                    Nội dung form {activeSubMenu} sẽ được thiết kế sau...
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full space-y-4">
              <div className="flex justify-between items-start bg-white p-4 rounded-xl shadow-sm border border-gray-100 group">
                <div className="flex items-center gap-4">
                  <img src={CSKH_ICON} alt="CSKH" className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover bg-blue-50 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h2 className="text-[12pt] font-bold text-[#164399] flex items-center gap-2 group-hover:text-blue-700 transition-colors duration-300">
                      Xin chào, {config.fullName}!
                    </h2>
                    <p className="text-secondary text-gray-500 mt-1">
                      Bạn có: <span 
                        className="hover:underline cursor-pointer transition-all duration-300"
                        onClick={() => setActiveSubMenu('Kết quả công việc')}
                      ><span className="text-red-600 font-bold">05</span> <span className="text-secondary">công việc đang xử lý</span></span> - <span 
                        className="hover:underline cursor-pointer transition-all duration-300"
                        onClick={() => setActiveSubMenu('Thiết lập công việc')}
                      ><span className="text-red-600 font-bold">03</span> <span className="text-secondary">công việc sắp đến kỳ thực hiện</span></span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[12pt] text-gray-500 font-medium">Đơn vị:</span>
                  <div className="relative">
                    <DesignTooltip id="select_don_vi">
                      <select 
                        className="appearance-none bg-white border border-gray-300 text-gray-700 text-[12pt] font-normal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-4 pr-10 py-2.5 shadow-sm outline-none cursor-pointer hover:bg-gray-50 transition-colors"
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                      >
                        <option>Công ty Điện lực Hưng Yên</option>
                        {BRANCHES.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </DesignTooltip>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                    <Cpu className="w-7 h-7 text-green-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-secondary font-medium mb-1">Đang vận hành</div>
                    <div className="text-prominent font-bold text-green-600 hover:scale-110 transition-transform cursor-default">{1245 * branchMultiplier} <span className="text-secondary font-normal text-gray-400">thiết bị</span></div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Wrench className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-secondary font-medium mb-1">Đang bảo trì</div>
                    <div className="text-prominent font-bold text-[#164399] hover:scale-110 transition-transform cursor-default">{84 * branchMultiplier} <span className="text-secondary font-normal text-gray-400">thiết bị</span></div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                    <AlertTriangle className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-secondary font-medium mb-1">Đang gặp sự cố</div>
                    <div className="text-prominent font-bold text-red-600 hover:scale-110 transition-transform cursor-default">{12 * branchMultiplier} <span className="text-secondary font-normal text-gray-400">thiết bị</span></div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                    <ClipboardList className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-secondary font-medium mb-1">Công việc cần xử lý</div>
                    <div className="text-prominent font-bold text-[#555555] hover:scale-110 transition-transform cursor-default">{36 * branchMultiplier} <span className="text-secondary font-normal text-gray-400">nhiệm vụ</span></div>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                  <DesignTooltip id="title_thong_ke_thiet_bi">
                    <h3 className="text-gray-500 font-bold mb-4 flex items-center gap-2 uppercase text-[12pt]">
                      <BarChart2 className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      Thống kê thiết bị
                    </h3>
                  </DesignTooltip>
                  <div className="h-64 group-hover:scale-[1.02] transition-transform duration-300 flex gap-4">
                    <div className="flex-1 text-center relative flex flex-col">
                      <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={currentChartDataEqCurrent}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                              className="cursor-pointer"
                            >
                              {currentChartDataEqCurrent.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} className="hover:filter hover:drop-shadow-lg transition-all duration-300" />
                              ))}
                              <Label 
                                value={formatNumber(currentChartDataEqCurrent.reduce((sum, item) => sum + item.value, 0))} 
                                position="center" 
                                className="text-prominent font-bold fill-gray-800 hover:fill-blue-600 transition-colors cursor-default"
                              />
                            </Pie>
                            <Tooltip formatter={(value: number) => formatNumber(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <h4 className="text-secondary font-bold text-gray-600 mt-2">Tháng này năm nay</h4>
                    </div>
                    <div className="flex-1 text-center relative flex flex-col">
                      <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={currentChartDataEqLastMonth}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                              className="cursor-pointer"
                            >
                              {currentChartDataEqLastMonth.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} className="hover:filter hover:drop-shadow-lg transition-all duration-300" />
                              ))}
                              <Label 
                                value={formatNumber(currentChartDataEqLastMonth.reduce((sum, item) => sum + item.value, 0))} 
                                position="center" 
                                className="text-prominent font-bold fill-gray-800 hover:fill-blue-600 transition-colors cursor-default"
                              />
                            </Pie>
                            <Tooltip formatter={(value: number) => formatNumber(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <h4 className="text-secondary font-bold text-gray-600 mt-2">Số liệu tháng trước</h4>
                    </div>
                    <div className="flex-1 text-center relative flex flex-col">
                      <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={currentChartDataEqLastYear}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                              className="cursor-pointer"
                            >
                              {currentChartDataEqLastYear.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} className="hover:filter hover:drop-shadow-lg transition-all duration-300" />
                              ))}
                              <Label 
                                value={formatNumber(currentChartDataEqLastYear.reduce((sum, item) => sum + item.value, 0))} 
                                position="center" 
                                className="text-prominent font-bold fill-gray-800 hover:fill-blue-600 transition-colors cursor-default"
                              />
                            </Pie>
                            <Tooltip formatter={(value: number) => formatNumber(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <h4 className="text-secondary font-bold text-gray-600 mt-2">Cùng kỳ năm trước</h4>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div className="flex gap-6 text-[12pt] font-medium text-gray-500">
                      {MOCK_CHART_DATA_EQ_CURRENT.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                  <DesignTooltip id="title_su_co_3_thang">
                    <h3 className="text-gray-500 font-bold mb-4 flex items-center gap-2 uppercase text-[12pt]">
                      <AlertTriangle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                      Sự cố 3 tháng gần nhất
                    </h3>
                  </DesignTooltip>
                  <div className="h-64 group-hover:scale-[1.02] transition-transform duration-300">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentChartDataIncident3Months} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13.3 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13.3 }} />
                        <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Legend verticalAlign="bottom" height={36} />
                        <Bar dataKey="thietBi" name="Thiết bị" fill="#9333ea" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                        <Bar dataKey="duongDay" name="Đường dây" fill="#991b1b" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                        <Bar dataKey="tram" name="Trạm" fill="#f97316" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Lists Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <DesignTooltip id="title_su_co_moi_nhat">
                      <h3 className="text-gray-500 font-bold flex items-center gap-2 uppercase text-[12pt]">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Sự cố mới nhất
                      </h3>
                    </DesignTooltip>
                    <div className="flex items-center gap-4 ml-auto">
                      <DesignTooltip id="btn_xem_tat_ca_su_co">
                        <button className="text-[10pt] text-gray-400 hover:text-blue-600 hover:font-bold transition-all whitespace-nowrap">Xem tất cả</button>
                      </DesignTooltip>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {dynamicIncidentList.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-4 hover:bg-[#f6f8fc] transition-colors cursor-pointer flex gap-4 items-start group/card"
                        onClick={() => {
                          setActiveSubMenu('Thông tin sự cố');
                          setSelectedIncidentId(item.id);
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                          {item.type === 'Trạm' && <Database className="w-6 h-6 text-blue-500" />}
                          {item.type === 'Đường dây' && <Network className="w-6 h-6 text-green-500" />}
                          {item.type === 'Nút' && <GitCommit className="w-6 h-6 text-orange-500" />}
                          {item.type === 'Thiết bị' && <Box className="w-6 h-6 text-purple-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[#555555] text-[12pt] truncate pr-2 group-hover/card:text-blue-600 transition-colors">{item.title}</span>
                            <span className="text-[10pt] text-gray-500 shrink-0">{item.time}</span>
                          </div>
                          <p className="text-[12pt] text-gray-600 line-clamp-1" title={item.desc}>{item.desc.length > 100 ? item.desc.substring(0, 97) + '...' : item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <DesignTooltip id="title_chi_dao_cbm">
                      <h3 className="text-gray-500 font-bold flex items-center gap-2 uppercase text-[12pt]">
                        <Wrench className="w-5 h-5 text-orange-500" />
                        Chỉ đạo xử lý tồn tại CBM
                      </h3>
                    </DesignTooltip>
                    <div className="flex items-center gap-4 ml-auto">
                      <DesignTooltip id="btn_xem_tat_ca_cbm">
                        <button className="text-[10pt] text-gray-400 hover:text-blue-600 hover:font-bold transition-all whitespace-nowrap">Xem tất cả</button>
                      </DesignTooltip>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {dynamicCbmList.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-4 hover:bg-blue-50/80 transition-all cursor-pointer flex items-start gap-4 group/card hover:shadow-md"
                        onClick={() => setActiveSubMenu('Kết quả công việc')}
                      >
                        <div className="w-16 shrink-0 flex flex-col items-center group-hover/card:scale-110 transition-transform">
                          <div className="w-12 h-12 border border-gray-200 bg-white rounded-[10px] flex flex-col items-center justify-center shadow-sm group-hover/card:border-blue-300 group-hover/card:shadow-md transition-all border-t-2 border-t-[#164399]">
                            <span className="text-[7pt] text-[#164399] font-bold uppercase tracking-wider mb-0.5">Ngày</span>
                            <span className="text-secondary font-bold text-[#164399] leading-none text-[14pt]">{item.date.split('/')[0]}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between mb-1 items-center gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[#555555] text-[12pt] group-hover/card:text-blue-600 transition-colors truncate">{item.title}</span>
                              <span className="text-secondary px-2 py-0.5 rounded bg-gray-100 text-gray-500 shrink-0">{item.type}</span>
                            </div>
                            <span className={`text-[7pt] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 whitespace-nowrap ${
                              item.status === 'Đã hoàn thành' || item.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                              item.status === 'Chờ duyệt' ? 'bg-yellow-100 text-yellow-700' :
                              item.status === 'Mới tạo' ? 'bg-purple-100 text-purple-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>{item.status === 'Đã hoàn thành' ? 'Hoàn thành' : item.status}</span>
                          </div>
                          <p className="text-[12pt] text-gray-600 line-clamp-2">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                  <DesignTooltip id="title_khoi_luong_cong_viec">
                    <h3 className="text-gray-500 font-bold mb-4 flex items-center gap-2 uppercase text-[12pt]">
                      <Activity className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                      Khối lượng công việc
                    </h3>
                  </DesignTooltip>
                  <div className="h-64 group-hover:scale-[1.02] transition-transform duration-300">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentChartData3} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} tick={{fontSize: 10, fill: '#6b7280'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} tickCount={8} />
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                        <Line type="monotone" dataKey="anToan" name="An toàn" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                        <Line type="monotone" dataKey="vanHanh" name="Vận hành" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                        <Line type="monotone" dataKey="suaChua" name="Công việc" stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                        <Line type="monotone" dataKey="thiNghiem" name="Thí nghiệm" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <DesignTooltip id="title_thong_bao_he_thong">
                      <h3 className="text-gray-500 font-bold flex items-center gap-2 uppercase text-[12pt]">
                        <Bell className="w-5 h-5 text-blue-500" />
                        Thông báo hệ thống
                      </h3>
                    </DesignTooltip>
                  </div>
                  <div className="divide-y divide-gray-100 flex-1 overflow-y-auto custom-scrollbar">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="p-4 hover:bg-[#f6f8fc] transition-colors flex gap-3 cursor-pointer">
                        <div className="mt-0.5">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-[12pt] text-[#555555] font-medium line-clamp-2">Cập nhật phiên bản PMIS Lưới v2.4.5</p>
                          <span className="text-secondary text-gray-500 mt-1 block">Hôm qua</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Active Form Popup */}
          {activeForm && (
            <div className="fixed inset-0 bg-black/50 z-[110] flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <h3 className="font-bold text-[12pt] text-[#164399] flex items-center gap-2">
                    {activeForm.type === 'Xem' && <Eye className="w-5 h-5 text-blue-500" />}
                    {activeForm.type === 'Sự cố' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                    {activeForm.type === 'Công việc' && <Wrench className="w-5 h-5 text-orange-500" />}
                    {activeForm.type === 'Thông số' && <Activity className="w-5 h-5 text-green-500" />}
                    {activeForm.type === 'Xem' ? 'Thông tin thiết bị' : 
                     activeForm.type === 'Sự cố' ? 'Thông tin sự cố' : 
                     activeForm.type === 'Công việc' ? 'Kết quả công việc' : 'Giám sát thông số'}
                  </h3>
                  <button className="p-1 hover:bg-gray-200 rounded-full transition-colors" onClick={() => setActiveForm(null)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6 border border-blue-100 flex items-start gap-3">
                    <Info className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[12pt]">Đối tượng:</p>
                      <p className="text-[12pt]">{activeForm.target}</p>
                    </div>
                  </div>
                  
                  {activeForm.type === 'Công việc' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10pt] font-bold text-gray-400 uppercase">Ngày thực hiện</label>
                          <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20" defaultValue="2024-04-15" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10pt] font-bold text-gray-400 uppercase">Người chủ trì</label>
                          <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20">
                            <option>Nguyễn Văn A</option>
                            <option>Trần Văn B</option>
                            <option>Lê Thị C</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10pt] font-bold text-gray-400 uppercase">Nội dung xử lý</label>
                        <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px]" placeholder="Nhập kết quả thực hiện..." defaultValue={activeForm.data?.content || ""}></textarea>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10pt] font-bold text-gray-400 uppercase">Hình ảnh/Tài liệu</label>
                        <FileUploader type="document" mode="add" onFileSelect={() => {}} />
                      </div>
                    </div>
                  ) : activeForm.type === 'Thông số' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10pt] font-bold text-gray-400 uppercase">Chỉ số A (Ampe)</label>
                          <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20" defaultValue="120" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10pt] font-bold text-gray-400 uppercase">Chỉ số B (Ampe)</label>
                          <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20" defaultValue="118" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10pt] font-bold text-gray-400 uppercase">Chỉ số C (Ampe)</label>
                          <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20" defaultValue="122" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10pt] font-bold text-gray-400 uppercase">Điện áp (kV)</label>
                          <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20" defaultValue="115" />
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 flex gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                        <p className="text-[10pt] text-yellow-700">Các chỉ số trên vượt ngưỡng cảnh báo 5%. Hệ thống sẽ tự động tạo phiếu kiểm tra nếu lưu lại.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {activeForm.type === 'Xem' && <Eye className="w-8 h-8 text-gray-400" />}
                        {activeForm.type === 'Sự cố' && <AlertTriangle className="w-8 h-8 text-gray-400" />}
                        {activeForm.type === 'Công việc' && <Wrench className="w-8 h-8 text-gray-400" />}
                        {activeForm.type === 'Thông số' && <Activity className="w-8 h-8 text-gray-400" />}
                      </div>
                      <p>Form đang được phát triển...</p>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                  <button 
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveForm(null)}
                  >
                    Hủy
                  </button>
                  <button 
                    className="px-6 py-2 bg-[#164399] text-white rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-sm"
                    onClick={() => {
                      alert('Dữ liệu đã được lưu thành công!');
                      setActiveForm(null);
                    }}
                  >
                    Lưu dữ liệu
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Preview Modal */}
          {previewContent && (
            <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setPreviewContent(null)}>
              <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-white rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-[12pt] font-bold text-[#555555] truncate pr-4">
                    {previewContent.name || 'Preview'}
                  </h3>
                  <button 
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    onClick={() => setPreviewContent(null)}
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-100">
                  {previewContent.type === 'image' ? (
                    <img src={previewContent.url} alt="Preview" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="text-center space-y-4">
                      <FileText className="w-20 h-20 text-blue-500 mx-auto" />
                      <p className="text-[12pt] font-medium text-gray-700">Không thể xem trước file này trực tiếp</p>
                      <a 
                        href={previewContent.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold"
                      >
                        <Download className="w-5 h-5" />
                        Tải xuống file
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Confirm Modal */}
          {confirmAction && (
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmAction(null)}></div>
              <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-[14pt] font-bold text-gray-900 mb-2">{confirmAction.title}</h3>
                  <p className="text-[12pt] text-gray-600 leading-relaxed whitespace-pre-line">
                    {confirmAction.message}
                  </p>
                </div>
                <div className="flex border-t border-gray-100">
                  <button 
                    onClick={() => setConfirmAction(null)}
                    className="flex-1 px-6 py-4 text-[12pt] font-bold text-gray-500 hover:bg-gray-50 transition-colors border-r border-gray-100"
                  >
                    Không
                  </button>
                  <button 
                    onClick={() => {
                      confirmAction.onConfirm();
                      setConfirmAction(null);
                    }}
                    className="flex-1 px-6 py-4 text-[12pt] font-bold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Có
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  </div>
);
};
