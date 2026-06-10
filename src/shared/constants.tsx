import React from 'react';
import { 
  Cpu, Activity, ClipboardList, AlertTriangle, 
  Wrench, BarChart2, Layers, Shield, Home, Package, MapPin, Circle,
  Zap, Server, Battery, Box, Archive, FlaskConical, Key, Clock, Database, GitMerge, RefreshCw, Map, Hash, Trash2
} from 'lucide-react';

export const MENU_ITEMS = [
  {
    id: 'thiet-bi',
    title: 'Thiết bị',
    icon: <Cpu className="w-6 h-6 text-blue-500" />,
    subItems: ['Sơ đồ thiết bị', 'Danh sách thiết bị', 'Thiết bị dự phòng', 'Tồn kho và Điều động']
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
    subItems: ['Danh sách sự cố', 'Xử lý giảm trừ sự cố', 'Theo dõi sau sự cố']
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
    subItems: ['Danh mục thí nghiệm', 'Yêu cầu thí nghiệm', 'Kết quả thí nghiệm']
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

export const HOT_COLORS = ['#800000', '#dc2626', '#f97316'];

export const BRANCHES = [
  "Điện lực Thành phố Hưng Yên",
  "Điện lực Mỹ Hào",
  "Điện lực Văn Lâm",
  "Điện lực Văn Giang",
  "Điện lực Yên Mỹ",
  "Điện lực Ân Thi",
  "Điện lực Khoái Châu",
  "Điện lực Kim Động",
  "Điện lực Tiên Lữ",
  "Điện lực Phù Cừ"
];

