import React from 'react';
import { Zap, Home, Package, MapPin, Circle, Server, Battery, Layers } from 'lucide-react';
import { BRANCHES, VOLTAGES, MOCK_CONG_TRINH, MOCK_DUONG_DAY, MOCK_TRAM, MOCK_VI_TRI, MOCK_NHANH_RE, MOCK_THIET_BI, REPORTS_5100, REPORTS_QT } from './constants';

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
