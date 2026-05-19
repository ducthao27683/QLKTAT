import React from 'react';
import { Zap, Home, Package, MapPin, Circle, Server, Battery, Layers, Activity, Box, GitCommit, ListChecks, Settings } from 'lucide-react';
import { BRANCHES } from './constants';
import { VOLTAGES, MOCK_CONG_TRINH, MOCK_DUONG_DAY, MOCK_TRAM, MOCK_VI_TRI, MOCK_NHANH_RE, MOCK_THIET_BI } from '../modules/thiet-bi/constants';
import { REPORTS_5100, REPORTS_QT } from '../modules/bao-cao/constants';

export const formatNumber = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const getDetailedType = (name: string) => {
  if (name.includes('Đường dây')) return 'Đường dây';
  if (name.includes('Trạm biến áp 110kV')) return 'Trạm 110';
  if (name.includes('Trạm biến áp 220kV')) return 'Trạm 220';
  if (name.includes('Trạm biến áp 500kV')) return 'Trạm 500';
  if (name.includes('Trạm biến áp phụ') || name.includes('Trạm biến áp trung gian') || name.includes('Trạm')) return 'Trạm';
  if (name.includes('Kho')) return 'Kho';
  if (name.includes('Vị trí cột')) return 'Vị trí';
  if (name.includes('Nút')) return 'Nút';
  if (name.includes('Ngăn lộ')) return 'Ngăn lộ';
  if (name.includes('Hệ thống')) return 'Hệ thống';
  if (name.includes('Máy biến áp') || name.includes('MBA')) return 'Máy biến áp';
  if (name.includes('Máy cắt') || name.includes('MC')) return 'Máy cắt';
  if (name.includes('Tụ')) return 'Tụ điện';
  if (name.includes('Biến dòng') || name.includes('TI')) return 'Biến dòng';
  if (name.includes('Biến điện áp') || name.includes('TU')) return 'Biến điện áp';
  return 'Thiết bị';
};

export const getTypeIcon = (type: string, className = "w-4 h-4") => {
  const t = type.toLowerCase();
  if (t.includes('đường dây')) return <Activity className={className} />;
  if (t.includes('trạm')) return <Zap className={className} />;
  if (t.includes('kho')) return <Box className={className} />;
  if (t.includes('vị trí') || t.includes('móng')) return <MapPin className={className} />;
  if (t.includes('nút')) return <GitCommit className={className} />;
  if (t.includes('ngăn lộ')) return <ListChecks className={className} />;
  if (t.includes('máy biến áp') || t.includes('mba')) return <Settings className={className} />;
  return <Circle className={className} />;
};

export const getDeviceTypes = (rawPath: string[]) => {
  const path = rawPath.filter((_, i) => i % 2 === 0);
  
  if (path.length === 0) {
    return ["Tất cả", "ĐV Con", "Công trình", "Nhóm Trạm", "Nhóm DZ", "Kho"];
  }
  
  if (path.length === 1) {
    const p1Type = rawPath[1];
    if (p1Type === "Kho") return ["Tất cả", "Kho TB mới", "Kho thu hồi"];
    return ["Tất cả", "Công trình", "Trạm", "Đường dây", "Nút"];
  }
  
  if (path.length === 2) {
    return ["Tất cả", "Ngăn lộ", "Máy biến áp", "Vị trí", "Nút", "Nhánh rẽ", "Hệ thống", "Thiết bị"];
  }
  
  if (path.length === 3) {
    return ["Tất cả", "Thiết bị chính", "Phụ kiện", "Hệ thống điều khiển"];
  }

  return ["Tất cả"];
};

export const getDeviceInstances = (rawPath: string[], type: string): string[] => {
  const path = rawPath.filter((_, i) => i % 2 === 0);
  const lastInstance = path[path.length - 1] || "";

  // Helper to aggregate ALL instances if type is "Tất cả"
  if (type === "Tất cả") {
    const types = getDeviceTypes(rawPath).filter(t => t !== "Tất cả");
    const all = types.flatMap(t => getDeviceInstances(rawPath, t));
    return Array.from(new Set(all));
  }
  
  // Level 1 Instances (Root - Company level)
  if (path.length === 0) {
    if (type === "Đơn vị" || type === "Công ty" || type === "ĐV Con") return ["Công ty Điện lực Hưng Yên"];
    if (type === "Công trình") return [
      "Công trình nâng công suất TBA 110kV Phố Nối",
      "Dự án đường dây 110kV đấu nối TBA 110kV Mỹ Hào 2",
      "Dự án cải tạo lưới điện trung áp khu vực Văn Lâm",
      "Công trình lắp MBA T2 TBA 110kV Khoái Châu"
    ];
    if (type === "Nhóm Trạm") return ["Nhóm trạm biến áp 110kV", "Nhóm trạm biến áp Trung gian", "Nhóm trạm biến áp Phụ tải"];
    if (type === "Nhóm DZ") return ["Đường dây 110kV", "Đường dây 35kV", "Đường dây 22kV"];
    if (type === "Kho") return ["Kho vật tư thiết bị trung tâm"];
    return ["Công ty Điện lực Hưng Yên"];
  }

  // Level 2 Instances
  if (path.length === 1) {
    if (type === "ĐV Con" || type === "Chi nhánh") return BRANCHES;
    if (type === "Trạm") return [
      "TBA 110kV Khoái Châu (E3.1)", "TBA 110kV Mỹ Hào (E3.2)", "TBA 110kV Kim Động (E3.3)",
      "TBA 110kV Văn Lâm (E3.4)", "TBA 110kV Phố Nối (E3.5)", "TBA 110kV Giai Phạm (E3.6)"
    ];
    if (type === "Đường dây") return [
      "ĐD 110kV 171 E3.1 - 173 E3.2", "ĐD 110kV 172 E3.1 - 174 E3.4",
      "ĐD 110kV 111 E3.1 - 112 E3.5", "ĐD 35kV 371-372 E3.4", "ĐD 22kV 471-472 E3.2"
    ];
    if (type === "Kho TB mới") return ["Kho thiết bị vật tư 110kV Phố Nối", "Kho dự phòng Kim Động"];
    if (type === "Kho thu hồi") return ["Kho vật tư thu hồi Văn Lâm", "Kho thu hồi trung tâm"];
    if (type === "Công trình") return [
      "Dự án xuất tuyến 110kV sau TBA 220kV Kim Động",
      "Công trình cải tạo ĐD 110kV 171 E3.1",
      "Lắp đặt hệ thống PCCC TBA 110kV Mỹ Hào"
    ];
    if (type === "Nút") return ["Nút giao QL5", "Nút rẽ KCN Yên Mỹ", "Nút phân đoạn Văn Giang"];
    return [];
  }

  // Level 3 Instances
  if (path.length === 2) {
    if (lastInstance.includes("TBA") || lastInstance.includes("Trạm")) {
      if (type === "Ngăn lộ") return ["Ngăn lộ 171", "Ngăn lộ 172", "Ngăn lộ 110", "Ngăn lộ MBA T1", "Ngăn lộ MBA T2", "Ngăn lộ tụ 110kV", "Ngăn lộ liên lạc"];
      if (type === "Máy biến áp") return ["Số máy MBA T1 - 63MVA", "Số máy MBA T2 - 63MVA", "Số máy MBA T3 - 40MVA"];
      if (type === "Hệ thống") return ["Tủ AC phân phối", "Tủ DC 220V", "Giàn ắc quy kiềm", "Hệ thống RTU/Gateway", "Tủ bảo vệ 171"];
      if (type === "Thiết bị") return ["Hệ thống Camera trạm", "Hệ thống PCCC tự động", "Bản đồ nhất thứ", "Tủ trung gian thiết bị"];
    }
    if (lastInstance.includes("ĐD") || lastInstance.includes("Đường dây") || lastInstance.includes("kV")) {
      if (type === "Vị trí") return Array.from({length: 15}, (_, i) => `Vị trí cột số ${i + 101} - Cột néo góc`);
      if (type === "Nhánh rẽ") return ["Nhánh rẽ Trạm trung gian Văn Lâm", "Nhánh rẽ Khách hàng Hòa Phát", "Nhánh rẽ chuyển tiếp"];
      if (type === "Nút") return ["Nút giao chéo vượt sông", "Nút rẽ nhánh số 45", "Điểm đấu nối NR Hòa Phát"];
      if (type === "Thiết bị") return ["Chống sét van ĐD số 1", "Chống sét van ĐD số 2", "Bộ thu thập dữ liệu sự cố"];
    }
    return [];
  }

  // Level 4 Instances
  if (path.length === 3) {
    if (lastInstance.includes("Ngăn lộ")) {
      if (type === "Thiết bị chính") return ["Máy cắt SF6 - 110kV", "Dao cách ly - 110kV", "Bộ biến dòng TI pha A", "Bộ biến dòng TI pha B", "Bộ biến dòng TI pha C", "Bộ biến điện áp TU"];
      if (type === "Phụ kiện") return ["Sứ đứng cách điện", "Thanh cái nhôm", "Kẹp cực thiết bị", "Hộp đầu cáp"];
      if (type === "Hệ thống điều khiển") return ["Rơ le bảo vệ so lệch", "Rơ le khoảng cách", "Bộ điều khiển mức dầu", "Tủ điều khiển tại chỗ"];
    }
    if (lastInstance.includes("MBA")) {
      if (type === "Thiết bị chính") return ["Cuộn dây cao thế", "Cuộn dây hạ thế", "Bộ điều áp OLTC", "Sứ xuyên 110kV", "Sứ xuyên 35kV"];
      if (type === "Phụ kiện") return ["Bình dầu phụ MBA", "Rơ le hơi Buchholz", "Rơ le dòng dầu", "Hệ thống quạt làm mát T1", "Bộ lọc dầu thông minh"];
    }
    if (lastInstance.includes("Vị trí cột")) {
      if (type === "Thiết bị chính") return ["Móng bê tông cốt thép", "Thân cột thép hình mạ kẽm", "Xà néo 110kV", "Xà đỡ dây OPGW"];
      if (type === "Phụ kiện") return ["Chuỗi sứ Silicon POLYMER", "Kẹp ép căng dây", "Tạ chống rung", "Tạ bù trọng lượng", "Tiếp địa cột"];
    }
    // Specific devices if not matched above
    return ["Thiết bị đo lường đa năng", "Bộ chỉ thị sự cố", "Công tơ tổng"];
  }

  return [];
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

export const getDeviceTreeChildren = (rawPath: string[]) => {
  const path = rawPath.filter((_, i) => i % 2 === 0);
  if (path.length === 0) return ["Công ty Điện lực Hưng Yên"];
  
  const last = path[path.length - 1];
  
  // Level 1: Branches
  if (path.length === 1) return BRANCHES;
  
  // Level 2: Stations/Lines
  if (path.length === 2) {
    return [
      "Trạm biến áp 110kV Khoái Châu",
      "Trạm biến áp 110kV Văn Lâm",
      "110kV 171 E3.1-173 E3.2",
      "110kV 111 E3.1",
      "Kho vật tư trung tâm"
    ];
  }

  // Level 3: Components
  if (path.length === 3) {
    if (last.includes("Trạm biến áp")) return ["Ngăn lộ 110kV", "Máy biến áp", "Hệ thống tự dùng"];
    return ["Vị trí", "Nút", "Nhánh rẽ", "Thiết bị"];
  }

  // Level 4: Specific items
  if (path.length === 4) {
    if (last.includes("Ngăn lộ")) return ["Ngăn lộ 171", "Ngăn lộ 172"];
    if (last.includes("Máy biến áp")) return ["Máy biến áp T1", "Máy biến áp T2"];
    if (last.includes("Vị trí")) return ["Vị trí cột số 101", "Vị trí cột số 102"];
    return ["Mục 1", "Mục 2"];
  }

  return ["Chi tiết 1", "Chi tiết 2"];
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
      { label: 'Loại thiết bị', value: getDetailedType(deviceName) },
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
