import React from 'react';
import { Zap, Home, Package, MapPin, Circle, Server, Battery, Layers } from 'lucide-react';
import { BRANCHES } from './constants';
import { VOLTAGES, MOCK_CONG_TRINH, MOCK_DUONG_DAY, MOCK_TRAM, MOCK_VI_TRI, MOCK_NHANH_RE, MOCK_THIET_BI } from '../modules/thiet-bi/constants';
import { REPORTS_5100, REPORTS_QT } from '../modules/bao-cao/constants';

export const formatNumber = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const getDetailedType = (name: string) => {
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
  if (name.includes('Máy cắt') || name.includes('MC')) return 'MC';
  if (name.includes('Tụ')) return 'Tụ điện';
  if (name.includes('Sứ')) return 'Sứ';
  if (name.includes('Xà')) return 'Xà';
  if (name.includes('Dây dẫn')) return 'Dây dẫn';
  return 'Thiết bị';
};

export const getTypeIcon = (type: string, className = "w-4 h-4") => {
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

export const getDeviceTypes = (path: string[]) => {
  if (path.length === 0) return ["Đơn vị"];
  if (path.length === 1) return ["Đường dây", "Trạm", "Kho"];
  
  if (path.length === 3) {
    const type = path[1];
    if (type === "Đường dây") return ["Vị trí", "Nút", "Trạm"];
    if (type === "Trạm") return ["Ngăn lộ", "Máy biến áp", "Hệ thống"];
    if (type === "Kho") return ["Thiết bị"];
  }
  
  if (path.length === 5) {
    return ["Thiết bị"];
  }

  return [];
};

export const getDeviceInstances = (path: string[], type: string) => {
  if (type === "Đơn vị") return ["Công ty Điện lực Hưng Yên", ...BRANCHES];
  
  const lastInstance = path[path.length - 1] || "";
  
  if (type === "Đường dây") {
    return [
      "Đường dây 110kV 171 E3.1 - 173 E3.2",
      "Đường dây 110kV 172 E3.1 - 174 E3.4",
      "Đường dây 110kV 173 E3.5 - 175 E3.6",
      "Đường dây 110kV 174 E3.7 - 176 E3.8",
      "Đường dây 110kV 111 E3.1",
      "Đường dây 110kV 112 E3.1",
      ...Array.from({length: 20}, (_, i) => `Đường dây 110kV ${i + 171} E${i + 3}.1`)
    ];
  }
  
  if (type === "Trạm") {
    if (lastInstance.includes("Đường dây")) {
      return Array.from({length: 5}, (_, i) => `Trạm biến áp trung gian ${i + 1} trên ${lastInstance}`);
    }
    return [
      "Trạm biến áp 110kV Khoái Châu",
      "Trạm biến áp 110kV Văn Lâm",
      "Trạm biến áp 110kV Kim Động",
      "Trạm biến áp 110kV Phù Cừ",
      "Trạm biến áp 110kV Tiên Lữ",
      "Trạm biến áp 110kV Mỹ Hào",
      "Trạm biến áp 110kV Phố Nối",
      "Trạm biến áp 110kV Giai Phạm",
      ...Array.from({length: 20}, (_, i) => `Trạm biến áp 110kV ${i + 1}`)
    ];
  }
  
  if (type === "Kho") return ["Kho vật tư trung tâm", "Kho thiết bị dự phòng", "Kho vật tư B", "Kho vật tư C", "Kho thiết bị A"];
  
  if (type === "Nút") return Array.from({length: 10}, (_, i) => `Nút vị trí ${i + 1} trên ${lastInstance}`);
  if (type === "Vị trí") return Array.from({length: 25}, (_, i) => `Vị trí cột số ${i + 100} - ${lastInstance}`);
  
  if (type === "Ngăn lộ") return [
    "Ngăn lộ 110kV 171",
    "Ngăn lộ 110kV 172",
    "Ngăn lộ 110kV 112",
    "Ngăn lộ 110kV 113",
    "Ngăn lộ MBA T1",
    "Ngăn lộ MBA T2",
    ...Array.from({length: 15}, (_, i) => `Ngăn lộ 110kV ${i + 111}`)
  ];
  if (type === "Máy biến áp") return [
    "Máy biến áp T1 - 63MVA",
    "Máy biến áp T2 - 63MVA",
    "Máy biến áp T3 - 40MVA",
    "Máy biến áp T1 - 25MVA",
    ...Array.from({length: 4}, (_, i) => `Máy biến áp T${i + 1}`)
  ];
  if (type === "Hệ thống") return ["Dàn tụ bù 110kV", "Hệ thống tự dùng", "Tủ điều khiển", "Hệ thống SCADA"];
  
  if (type === "Thiết bị") return ["Sứ", "Cầu chì", "Thanh cái", "Móng", "Cột", "Xà", "Tụ", "Máy biến áp dự phòng 63MVA", "Máy cắt 110kV ABB", "Sứ cách điện chuỗi 110kV", "Tụ điện cao thế"];
  
  return Array.from({length: 4}, (_, i) => `${type} ${i + 1}`);
};

export const getNextOptions = (rawPath: string[]) => {
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

export const BRANCH_ABBR: Record<string, string> = {
  "Công ty Điện lực Hưng Yên": "PC HY",
  "Điện lực Thành phố Hưng Yên": "ĐL TP HY",
  "Điện lực Văn Lâm": "ĐL VL",
  "Điện lực Văn Giang": "ĐL VG",
  "Điện lực Yên Mỹ": "ĐL YM",
  "Điện lực Mỹ Hào": "ĐL MH",
  "Điện lực Ân Thi": "ĐL AT",
  "Điện lực Khoái Châu": "ĐL KC",
  "Điện lực Kim Động": "ĐL KĐ",
  "Điện lực Tiên Lữ": "ĐL TL",
  "Điện lực Phù Cừ": "ĐL PC",
  "Xưởng 110kV": "XƯỞNG 110",
  "Công ty dịch vụ Điện lực": "PC SERV",
  "Trung tâm Thí nghiệm điện": "ETC"
};

export const TYPE_ABBR: Record<string, string> = {
  "Đường dây": "ĐD",
  "Trạm": "TBA",
  "Trạm biến áp": "TBA",
  "Máy biến áp": "MBA",
  "Máy cắt": "MC",
  "Dao cách ly": "DCL",
  "Biến điện áp": "TU",
  "Biến dòng điện": "TI",
  "Chống sét van": "CSV",
  "Ngăn lộ": "NL",
  "Tụ điện": "TD",
  "Kháng điện": "KD",
  "Vị trí": "VT",
  "Cột": "Cột",
  "Xà": "Xà",
  "Sứ": "Sứ",
  "Tụ": "Tụ",
  "Lưới điện 110": "Lưới 110",
  "Lưới điện trung gian": "Lưới TG",
  "Đường dây 110": "ĐD 110",
  "Trạm 110": "TBA 110",
  "TBA": "TBA",
  "ĐD": "ĐD",
  "MBA": "MBA"
};

export const getDeviceTreeChildren = (path: string[]) => {
  if (path.length === 0) return ["Công ty Điện lực Hưng Yên"];
  
  const level1 = ["Lưới điện 110", "Lưới điện trung gian", "Trạm 110", "Đường dây 110", "Kho"];
  if (path.length === 1) return level1;
  
  // Level 2 depends on what was selected in level 1
  if (path.length === 2) {
    const type = path[1];
    if (type === "Lưới điện 110" || type === "Lưới điện trung gian" || type === "Đường dây 110") return ["Đường dây 111", "Đường dây 112", "Đường dây 171", "Đường dây 172"];
    if (type === "Trạm 110") return ["Trạm biến áp 110kV Khoái Châu", "Trạm biến áp 110kV Văn Lâm", "Trạm biến áp 110kV Kim Động"];
    if (type === "Kho") return ["Kho vật tư trung tâm", "Kho thiết bị dự phòng"];
    return [];
  }

  if (path.length === 3) {
    const parent = path[1];
    if (parent === "Lưới điện 110" || parent === "Đường dây 110") return ["Vị trí", "Nút", "Nhánh rẽ"];
    if (parent === "Trạm 110") return ["Ngăn lộ 110kV", "Máy biến áp", "Hệ thống tự dùng"];
    if (parent === "Kho") return ["Thiết bị trung gian", "Thiết bị đầu cuối"];
    return [];
  }

  if (path.length === 4) {
    const type = path[3];
    if (type === "Vị trí") return Array.from({length: 10}, (_, i) => `Vị trí cột số ${i + 100}`);
    if (type === "Ngăn lộ 110kV") return ["Ngăn lộ 171", "Ngăn lộ 172", "Ngăn lộ 112"];
    if (type === "Máy biến áp") return ["Máy biến áp T1", "Máy biến áp T2"];
    return [`${type} số 1`, `${type} số 2`];
  }
  
  if (path.length === 5) {
    const devices = ["Sứ cách điện", "Chuỗi sứ", "Máy cắt ABB", "Dao cách ly", "Biến dòng TI", "Biến áp TU", "Chống sét van CSV", "Tủ trung thế", "Rơ le bảo vệ"];
    return Array.from({ length: 45 }, (_, i) => i < devices.length ? devices[i] : `Thiết bị con ${i + 1}`);
  }

  if (path.length === 6) {
    return ["Bộ phận 1", "Bộ phận 2", "Chi tiết máy"];
  }

  return [];
};

export const formatDevicePath = (path: string[]) => {
  if (!path || path.length === 0) return "";
  return path.filter((_, i) => i % 2 === 0).join(" > ");
};

export const getDeviceDetails = (deviceName: string) => {
  return {
    specs: [
      { label: 'Mã thiết bị', value: `TB-${deviceName.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000 + 1000)}` },
      { label: 'Tên thiết bị', value: deviceName },
      { label: 'Loại thiết bị', value: deviceName.includes('Máy biến áp') ? 'Máy biến áp' : deviceName.includes('Máy cắt') ? 'Máy cắt' : deviceName.includes('Ngăn lộ') ? 'Ngăn lộ' : deviceName.includes('Đường dây') ? 'Đường dây' : 'Máy cắt' },
      { label: 'Cấp điện áp', value: '110 kV' },
      { label: 'Dòng điện định mức', value: '1200 A' },
      { label: 'Tần số định mức', value: '50 Hz' },
      { label: 'Loại cách điện', value: 'Khí SF6' },
      { label: 'Hãng sản xuất', value: 'ABB' },
      { label: 'Nước sản xuất', value: 'Thụy Điển' },
      { label: 'Năm sản xuất', value: '2019' },
      { label: 'Ngày đưa vào vận hành', value: '01/01/2020' },
      { label: 'Số chế tạo', value: `SN-${deviceName.split(' ').pop() || '001'}` },
      { label: 'Trạng thái', value: 'Đang vận hành' },
    ],
    technicalData: [
      { group: 'Thông số chung', items: [
        { name: 'Tiêu chuẩn chế tạo', value: 'IEC 62271-100' },
        { name: 'Khả năng chịu dòng ngắn mạch', value: '40 kA/3s' },
        { name: 'Độ bền điện môi (1min)', value: '230 kV' },
        { name: 'Xung sét (1.2/50µs)', value: '550 kV' },
      ]},
      { group: 'Thông số cơ cấu truyền động', items: [
        { name: 'Loại cơ cấu', value: 'Lò xo tích năng' },
        { name: 'Điện áp cuộn đóng', value: '220 VDC' },
        { name: 'Điện áp cuộn cắt 1/2', value: '220 VDC' },
        { name: 'Thời gian đóng', value: '≤ 65 ms' },
        { name: 'Thời gian cắt', value: '≤ 45 ms' },
      ]},
    ],
    images: [
      `https://picsum.photos/seed/${deviceName}-1/800/450`,
      `https://picsum.photos/seed/${deviceName}-2/800/450`,
      `https://picsum.photos/seed/${deviceName}-3/800/450`,
    ],
    tracking: [
      { id: 'su-co', title: 'Sự cố', color: 'red', items: [
        { date: '25/03/2024', content: `Sự cố tại ${deviceName}: Quá tải`, status: 'Đã hoàn thành' },
        { date: '10/03/2024', content: `Kiểm tra sau sự cố ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'cong-viec', title: 'Công việc', color: 'green', items: [
        { date: '26/03/2024', content: `Bảo dưỡng định kỳ ${deviceName}`, status: 'Đang thực hiện' },
        { date: '20/03/2024', content: `Vệ sinh thiết bị ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'sua-chua', title: 'Sửa chữa', color: 'purple', items: [
        { date: '24/03/2024', content: `Sửa chữa xà thép ${deviceName}`, status: 'Đang thực hiện' },
        { date: '10/03/2024', content: `Sơn lại cột ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'thi-nghiem', title: 'Thí nghiệm', color: 'pink', items: [
        { date: '21/03/2024', content: `Thí nghiệm định kỳ ${deviceName}`, status: 'Đã hoàn thành' },
        { date: '05/03/2024', content: `Kiểm tra điện trở tiếp địa ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'thong-so', title: 'Thông số', color: 'blue', items: [
        { date: '27/03/2024', content: `Ghi chỉ số vận hành ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
      { id: 'lich-su', title: 'Lịch sử', color: 'gray', items: [
        { date: '27/03/2024', content: `Thay đổi trạng thái ${deviceName}`, status: 'Đã hoàn thành' },
        { date: '01/01/2009', content: `Khởi tạo thiết bị ${deviceName}`, status: 'Đã hoàn thành' }
      ]},
    ]
  };
};
