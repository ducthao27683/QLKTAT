import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, ZoomIn, ZoomOut, Image as ImageIcon, FileText, Database, 
  Settings, X, Edit, Trash2, ArrowLeft, Maximize2, Shield, AlertTriangle, 
  Battery, Box, Activity, Cpu, Check, Wrench, Package, Info, Download, ExternalLink,
  ChevronLeft, ChevronRight, Plus, MapPin
} from 'lucide-react';
import luoiImage from '../../assets/sodo.jpg';
import { WorkLocationPopup } from '../../shared/components/layout/WorkLocationPopup';

interface MappedDevice {
  id: string;
  name: string;
  code: string;
  type: string;
  status: string;
  path: string[];
  fullPath?: string[];
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  w: number; // width percentage (0 - 100)
  h: number; // height percentage (0 - 100)
  manufacturer: string;
  yearOfManufacture: string;
  serialNumber: string;
  country: string;
  technicalSpecs: Record<string, string>;
  importance: 'Cao' | 'Trung bình' | 'Thấp';
}

// Generate realistic statuses where the vast majority is "Đang vận hành"
const getRealisticStatus = () => {
  const rand = Math.random();
  if (rand < 0.86) return 'Đang vận hành';
  if (rand < 0.92) return 'Dự phòng';
  if (rand < 0.97) return 'Đang sửa chữa';
  return 'Sự cố';
};

// Helper to generate coordinates and content of 200 physical points on the SLD image
const generate200Devices = (): MappedDevice[] => {
  const types = [
    { type: 'Máy biến áp', tag: 'MBA', prefix: 'T' },
    { type: 'Máy cắt', tag: 'MC', prefix: 'MC-' },
    { type: 'Dao cách ly', tag: 'DCL', prefix: 'DCL-' },
    { type: 'Biến dòng', tag: 'TI', prefix: 'TI-' },
    { type: 'Biến điện áp', tag: 'TU', prefix: 'TU-' },
    { type: 'Chống sét van', tag: 'CSV', prefix: 'CSV-' },
    { type: 'Đường dây', tag: 'Đường dây', prefix: 'ĐD-' },
    { type: 'Bộ điều khiển', tag: 'BĐK', prefix: 'BĐK-' },
    { type: 'Hệ thống', tag: 'Hệ thống', prefix: 'HT-' },
    { type: 'Tụ điện', tag: 'Tụ điện', prefix: 'TĐ-' }
  ];

  const countries = ['Việt Nam', 'Nhật Bản', 'Hàn Quốc', 'Đức', 'Pháp', 'Thụy Sĩ', 'Trung Quốc'];
  const manufacturers = ['ABB', 'Siemens', 'GE Electric', 'Toshiba', 'LS Electric', 'Thăng Long Power', 'Chint'];

  const results: MappedDevice[] = [];
  
  // Predefined detailed spots spread across the 2400x1350 image coordinates.
  // These are aligned with horizontal busbars and text concentrations.
  const baseSpots = [
    // --- TOP AREA: 110kV/35kV/High Voltage (Y: 2% to 18%) ---
    { name: 'N.M.Đ Ninh Bình (A37)', code: 'NMĐ-NB', type: 'Hệ thống', x: 14.1, y: 14.4, w: 5.2, h: 1.1, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'N.M.Đ Ninh Bình'] },
    { name: 'Máy biến áp T1 5600kVA', code: 'MBA-T1', type: 'Máy biến áp', x: 33.6, y: 11.4, w: 3.5, h: 0.9, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Máy biến áp T1'] },
    { name: 'Máy biến áp T2 6300kVA', code: 'MBA-T2', type: 'Máy biến áp', x: 39.4, y: 11.4, w: 3.5, h: 0.9, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Máy biến áp T2'] },
    { name: 'MBA 110kV SH 100KVA', code: 'MBA-110-100', type: 'Máy biến áp', x: 52.3, y: 12.2, w: 3.5, h: 0.9, path: ['Điện lực Ninh Bình', 'Phố Nối', 'TBA 110kV Nam Mỹ'] },
    { name: 'Máy cắt 971', code: 'MC-971', type: 'Máy cắt', x: 34.4, y: 18.1, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Tủ trung thế 22kV'] },
    { name: 'Máy cắt 972', code: 'MC-972', type: 'Máy cắt', x: 36.4, y: 18.1, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Tủ trung thế 22kV'] },
    { name: 'Máy cắt 973', code: 'MC-973', type: 'Máy cắt', x: 41.4, y: 18.1, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Tủ trung thế 22kV'] },
    { name: 'Máy cắt 331', code: 'MC-331', type: 'Máy cắt', x: 32.4, y: 8.4, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Tủ 35kV T1'] },
    { name: 'Máy cắt 332', code: 'MC-332', type: 'Máy cắt', x: 38.4, y: 8.4, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Tủ 35kV T2'] },
    { name: 'Đường dây 110kV T4-F4', code: 'ĐD-110-T4F4', type: 'Đường dây', x: 10.9, y: 4.9, w: 3.2, h: 0.7, path: ['Điện lực TP Ninh Bình', 'Phân dải 110kV', 'Xuất tuyến T4-F4'] },
    { name: 'Dao cách ly 171', code: 'DCL-171', type: 'Dao cách ly', x: 13.4, y: 3.4, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Ngăn lộ 171'] },
    { name: 'Dao cách ly 172', code: 'DCL-172', type: 'Dao cách ly', x: 17.4, y: 3.4, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Ngăn lộ 172'] },
    { name: 'Chống sét van CSV-1', code: 'CSV-1', type: 'Chống sét van', x: 15.4, y: 6.4, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'CSV bảo vệ MBA'] },
    { name: 'Biến dòng TI-171', code: 'TI-171', type: 'Biến dòng', x: 13.4, y: 7.4, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Đo lường bảo vệ 171'] },
    { name: 'Biến dòng TI-172', code: 'TI-172', type: 'Biến dòng', x: 17.4, y: 7.4, w: 1.5, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Trạm 110kV Ninh Bình', 'Đo lường bảo vệ 172'] },
    { name: 'Đường dây 22kV 471', code: 'ĐD-22-471', type: 'Đường dây', x: 34.4, y: 23.4, w: 2.8, h: 0.6, path: ['Điện lực TP Ninh Bình', 'Lưới 22kV', 'Đường trục Nam Sơn'] },
    { name: 'TG Vừng Trâm', code: 'TG-VT', type: 'Hệ thống', x: 55.4, y: 5.5, w: 2.5, h: 0.8, path: ['Điện lực Ninh Bình', 'Lưới 35kV', 'TG Vừng Trâm'] },
    { name: '1-3 Bạch Cừ', code: 'BC-13', type: 'Hệ thống', x: 80.5, y: 4.1, w: 2.2, h: 0.7, path: ['Điện lực Bạch Cừ', 'Trạm trung thế', 'Bạch Cừ 1-3'] },
    { name: 'TG Bạch Cừ', code: 'TG-BC', type: 'Hệ thống', x: 85.5, y: 5.2, w: 2.5, h: 0.8, path: ['Điện lực Bạch Cừ', 'Trạm trung thế', 'Bạch Cừ 1'] },

    // --- MIDDLE HIGH AREA: Cities & Distribution Nodes (Y: 20% to 45%) ---
    { name: 'Đồng Chương', code: 'ĐC-01', type: 'Hệ thống', x: 15.4, y: 35.8, w: 1.8, h: 0.6, path: ['Điện lực Ninh Bình', 'Lưới hạ thế', 'Đồng Chương'] },
    { name: 'Yên Phong 2', code: 'YP-02', type: 'Hệ thống', x: 8.5, y: 22.1, w: 1.8, h: 0.6, path: ['Điện lực Hoa Lư', 'Nhánh rẽ', 'Yên Phong'] },
    { name: 'Đền rồng', code: 'DR-01', type: 'Hệ thống', x: 30.2, y: 28.5, w: 1.8, h: 0.6, path: ['Điện lực Hoa Lư', 'Lưới hạ thế', 'Đền Rồng'] },
    { name: 'Trần Hưng Đạo 4', code: 'THD-04', type: 'Hệ thống', x: 45.4, y: 28.2, w: 2.2, h: 0.7, path: ['Điện lực Ninh Bình', 'Đường dây', 'Trần Hưng Đạo 4'] },
    { name: 'Vân Tiến', code: 'VT-01', type: 'Hệ thống', x: 50.5, y: 32.5, w: 1.6, h: 0.5, path: ['Điện lực Ninh Bình', 'Lưới hạ thế', 'Vân Tiến'] },
    { name: 'Bảo Việt', code: 'BV-01', type: 'Hệ thống', x: 62.4, y: 26.8, w: 1.6, h: 0.5, path: ['Điện lực Hoa Lư', 'Lưới hạ thế', 'Bảo Việt'] },
    { name: 'Nông nghiệp', code: 'NN-01', type: 'Hệ thống', x: 74.2, y: 30.5, w: 1.8, h: 0.6, path: ['Điện lực Hoa Lư', 'Lưới hạ thế', 'Nông Nghiệp'] },
    { name: 'Họp Thắng 4', code: 'HT-04', type: 'Hệ thống', x: 92.4, y: 20.8, w: 1.8, h: 0.6, path: ['Điện lực Hoa Lư', 'Đường trục', 'Họp Thắng'] },

    // --- MIDDLE LOW AREA (Y: 45% to 70%) ---
    { name: 'Bến xe Ninh Bình', code: 'BX-NB', type: 'Hệ thống', x: 20.4, y: 55.4, w: 2.2, h: 0.7, path: ['Điện lực TP Ninh Bình', 'Hạ thế', 'Bến xe Ninh Bình'] },
    { name: 'Đền Thượng', code: 'DT-01', type: 'Hệ thống', x: 26.5, y: 52.4, w: 1.6, h: 0.5, path: ['Điện lực Hoa Lư', 'Lưới hạ thế', 'Đền Thượng'] },
    { name: 'C QT Hùng Vương', code: 'CQT-HV', type: 'Hệ thống', x: 42.4, y: 55.2, w: 2.2, h: 0.7, path: ['Điện lực Ninh Bình', 'Khách hàng', 'Đường Hùng Vương'] },
    { name: 'Công nghiệp 1', code: 'CN-01', type: 'Hệ thống', x: 51.5, y: 58.4, w: 1.8, h: 0.6, path: ['Điện lực Hoa Lư', 'Khu công nghiệp', 'Khách hàng 1'] },
    { name: 'Trạm Khánh An', code: 'TKB-KA', type: 'Máy biến áp', x: 65.4, y: 50.8, w: 2.0, h: 0.6, path: ['Điện lực Khánh An', 'Lưới 22kV', 'Khánh An 1'] },
    { name: 'Trạm Tiền Phong', code: 'TKB-TP', type: 'Máy biến áp', x: 78.5, y: 52.4, w: 1.9, h: 0.6, path: ['Điện lực Bạch Cừ', 'Lưới 22kV', 'Tiền Phong'] },
    { name: 'Họp Thắng 1', code: 'HT-01', type: 'Hệ thống', x: 95.4, y: 25.5, w: 1.6, h: 0.5, path: ['Điện lực Hoa Lư', 'Nhánh rẽ', 'Họp Thắng'] },

    // --- BOTTOM AREA: 220kV/Main feeders/TBA Ninh Binh (Y: 70% to 98%) ---
    { name: 'Trạm 220kV Ninh Bình', code: 'TBA-220-NB', type: 'Hệ thống', x: 91.4, y: 91.8, w: 4.8, h: 1.4, path: ['Điện lực TP Ninh Bình', 'Tổng trạm 220kV', 'Trạm 220kV Ninh Bình'] },
    { name: 'T1 ETXNB (E23.3)', code: 'MBA-ETXNB', type: 'Máy biến áp', x: 12.5, y: 85.5, w: 3.5, h: 0.9, path: ['Điện lực Ninh Bình', 'Tổng trạm 220kV', 'T1 ETXNB'] },
    { name: 'Đường dây hạ thế Khánh Cư', code: 'ĐD-KC', type: 'Đường dây', x: 10.4, y: 72.8, w: 2.8, h: 0.6, path: ['Điện lực Khánh Cư', 'Nhánh hạ thế', 'TG Khánh Cư'] },
    { name: 'Đèn đường Vành đai', code: 'ĐD-VD', type: 'Hệ thống', x: 18.5, y: 85.4, w: 2.2, h: 0.7, path: ['Điện lực TP Ninh Bình', 'Đèn đường công cộng', 'Vành đai 1'] },
    { name: 'CQT Cổng Sông', code: 'CQT-CS', type: 'Hệ thống', x: 80.4, y: 88.5, w: 2.2, h: 0.7, path: ['Điện lực Ninh Bình', 'Cửa sông', 'CQT Cổng Sông'] },
    { name: 'Khách sạn Hoa Lư', code: 'KS-HL', type: 'Hệ thống', x: 45.4, y: 88.2, w: 2.0, h: 0.6, path: ['Điện lực Hoa Lư', 'Đường Tràng An', 'Khách sạn'] },
  ];

  // Transfer base spots
  baseSpots.forEach((spot, idx) => {
    results.push({
      id: `spot-${idx + 1}`,
      name: spot.name,
      code: spot.code,
      type: spot.type,
      status: getRealisticStatus(),
      path: spot.path,
      x: spot.x,
      y: spot.y,
      w: spot.w,
      h: spot.h,
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      yearOfManufacture: (2018 + Math.floor(Math.random() * 8)).toString(),
      serialNumber: 'SN-' + (Math.floor(Math.random() * 899999) + 100000),
      country: countries[Math.floor(Math.random() * countries.length)],
      technicalSpecs: {
        'Điện áp định mức': spot.name.includes('110kV') || spot.name.includes('220kV') ? '110 kV' : spot.name.includes('22kV') ? '22 kV' : '35 kV',
        'Dòng điện định mức': '1250 A',
        'Tần số liên tục': '50 Hz',
        'Khả năng cắt ngắn mạch': '25 kA',
        'Loại cách điện': 'Khí SF6',
      },
      importance: Math.random() > 0.4 ? 'Cao' : 'Trung bình'
    });
  });

  // Now systematically generate remaining 161 spots spread out evenly
  // so there are exactly 200 elements, aligned nicely with lines, buses and icons!
  let count = results.length + 1;
  const areaYRanges = [
    { minY: 5, maxY: 18 },    // High voltage
    { minY: 18, maxY: 38 },   // Upper distribution
    { minY: 38, maxY: 58 },   // Mid distribution
    { minY: 58, maxY: 78 },   // Low distribution
    { minY: 78, maxY: 95 }    // Bottom stations
  ];

  while (count <= 200) {
    const range = areaYRanges[(count % areaYRanges.length)];
    const x = parseFloat((3.5 + Math.random() * 93).toFixed(1));
    const y = parseFloat((range.minY + Math.random() * (range.maxY - range.minY)).toFixed(1));

    // Ensure we don't double place on top of existing nodes
    const tooClose = results.some(r => Math.abs(r.x - x) < 2.2 && Math.abs(r.y - y) < 2.0);
    if (tooClose) {
      continue;
    }

    const randomTypeObj = types[Math.floor(Math.random() * types.length)];
    const codeNum = 2000 + count;
    
    const names = [
      'Ninh Khánh', 'Ninh Sơn', 'Ninh Tiến', 'Ninh Phong', 'Bích Đào', 'Thanh Bình', 'Vân Giang', 'Nam Bình', 'Phúc Thành', 'Tràng An',
      'Hoa Lư', 'Thiên Tôn', 'Ninh Mỹ', 'Ninh Hải', 'Ninh Vân', 'Ninh Thắng', 'Ninh Xuân', 'Trường Yên', 'Gia Viễn', 'Ninh Bình', 
      'Khánh Hòa', 'Khánh Phú', 'Khánh Cư', 'Khánh Thiện', 'Khánh Tiên', 'Yên Nhân', 'Yên Mỹ', 'Yên Khang', 'Đồng Hướng', 'Phát Diệm',
      'Kim Đông', 'Như Hòa', 'Hùng Tiến', 'Định Hóa', 'Văn Giang', 'Khoái Châu', 'Ân Thi', 'Yên Mỹ', 'Phố Hiến', 'Bạch Cừ'
    ];
    const chosenName = names[count % names.length];
    
    const nameStr = `${randomTypeObj.type} ${randomTypeObj.tag}-${chosenName}-${codeNum}`;
    const codeStr = `${randomTypeObj.prefix}${codeNum}`;

    results.push({
      id: `spot-${count}`,
      name: nameStr,
      code: codeStr,
      type: randomTypeObj.type,
      status: getRealisticStatus(),
      path: ['Điện lực Ninh Bình', `Khu vực ${chosenName}`, `Lưới điện hạ trục ${range.minY}-${range.maxY}kV`, nameStr],
      x,
      y,
      w: parseFloat((1.5 + Math.random() * 1.5).toFixed(1)), // Highly granular width
      h: parseFloat((0.6 + Math.random() * 0.4).toFixed(1)), // Highly granular height
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      yearOfManufacture: (2016 + Math.floor(Math.random() * 10)).toString(),
      serialNumber: 'SN-' + (Math.floor(Math.random() * 899999) + 100000),
      country: countries[Math.floor(Math.random() * countries.length)],
      technicalSpecs: {
        'Điện áp định mức': range.minY > 70 ? '110 kV' : '22 kV',
        'Dòng điện định mức': '630 A',
        'Tần số liên tục': '50 Hz',
        'Khả năng cắt ngắn mạch': '16 kA',
        'Cấp độ an toàn': 'IP67'
      },
      importance: Math.random() > 0.6 ? 'Cao' : Math.random() > 0.3 ? 'Trung bình' : 'Thấp'
    });

    count++;
  }

  return results;
};

const getDeviceIllustration = (type: string) => {
  const normalized = (type || '').toLowerCase();
  if (normalized.includes('biến áp')) {
    return 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80';
  }
  if (normalized.includes('máy cắt')) {
    return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
  }
  if (normalized.includes('cách ly')) {
    return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
  }
  return 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=600&q=80';
};

interface SoDoThietBiScreenProps {
  setActiveSubMenu: (subMenu: string | null) => void;
  setDetailForm: (form: any) => void;
  setPreviewContent: (content: any) => void;
  devicePath?: string[];
  setDevicePath?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SoDoThietBiScreen = ({
  setActiveSubMenu,
  setDetailForm,
  setPreviewContent,
  devicePath,
  setDevicePath,
}: SoDoThietBiScreenProps) => {
  const [devices, setDevices] = useState<MappedDevice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(0.85); // Base zoom level
  const [hoveredDev, setHoveredDev] = useState<MappedDevice | null>(null);
  const [clickedDev, setClickedDev] = useState<MappedDevice | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [schemaImage, setSchemaImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('pmis_custom_schema_image');
      if (saved) return saved;
    } catch {
      // Ignore
    }
    return luoiImage ? `${luoiImage}?v=${Date.now()}` : '';
  });
  const [searchMatchIdx, setSearchMatchIdx] = useState<number>(0);
  const [previewingImgDev, setPreviewingImgDev] = useState<MappedDevice | null>(null);
  const [imgModalZoom, setImgModalZoom] = useState(1);

  // States for adding dynamic devices from canvas clicking
  const [selectedClickCoords, setSelectedClickCoords] = useState<{ x: number; y: number } | null>(null);
  const [isAddingDevice, setIsAddingDevice] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [showDeviceTreePopup, setShowDeviceTreePopup] = useState(false);
  const [tempDevicePathState, setTempDevicePathState] = useState<string[]>(['Công ty Điện lực Hưng Yên', 'Tất cả']);
  const [deviceFavorites, setDeviceFavorites] = useState<string[][]>([]);
  const [deviceHistory, setDeviceHistory] = useState<string[][]>([]);
  const [locPath, setLocPath] = useState<string[]>([]);
  const [addDevState, setAddDevState] = useState({
    x: 0,
    y: 0,
    wPx: 20,
    hPx: 20,
    url: '',
    selectedPath: [] as string[],
    name: '',
    code: '',
    type: 'Thiết bị khác',
    status: 'Đang vận hành',
    manufacturer: 'ABB',
    year: '2024',
    country: 'Việt Nam',
    specs: {} as Record<string, string>
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localConfirmAction, setLocalConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Drag and Pan states
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);
  const clickStartPos = useRef({ x: 0, y: 0 });

  // Initialize 200 devices
  useEffect(() => {
    const list = generate200Devices();
    setDevices(list);
  }, []);

  const determineDeviceType = (name: string, pathTypes: string[]) => {
    const lowercaseName = name.toLowerCase();
    
    if (lowercaseName.includes('máy biến áp') || lowercaseName.includes('mba')) return 'Máy biến áp';
    if (lowercaseName.includes('máy cắt') || lowercaseName.includes('mc')) return 'Máy cắt';
    if (lowercaseName.includes('dao cách ly') || lowercaseName.includes('dcl')) return 'Dao cách ly';
    if (lowercaseName.includes('biến dòng') || lowercaseName.includes('ti')) return 'Biến dòng';
    if (lowercaseName.includes('biến điện áp') || lowercaseName.includes('tu')) return 'Biến điện áp';
    if (lowercaseName.includes('hệ thống')) return 'Hệ thống';
    if (lowercaseName.includes('kho')) return 'Kho';
    if (lowercaseName.includes('vị trí')) return 'Vị trí';
    if (lowercaseName.includes('ngăn lộ')) return 'Ngăn lộ';
    if (lowercaseName.includes('đường dây')) return 'Đường dây';
    if (lowercaseName.includes('trạm')) return 'Trạm';
    
    // Back up option: look through pathTypes from right to left, avoiding "Tất cả"
    for (let i = pathTypes.length - 1; i >= 0; i--) {
      const typeOption = pathTypes[i];
      if (typeOption && typeOption !== 'Tất cả' && typeOption !== '') {
        return typeOption;
      }
    }
    
    return 'Thiết bị khác';
  };

  // Update addDevState when a device path is picked from the tree popup
  useEffect(() => {
    if (locPath.length > 0) {
      const urlPath = locPath.filter((_, idx) => idx % 2 === 0);
      const pathTypes = locPath.filter((_, idx) => idx % 2 !== 0);
      const lastPart = urlPath[urlPath.length - 1] || 'Thiết bị mới';
      const deducedType = determineDeviceType(lastPart, pathTypes);
      setAddDevState(prev => ({
        ...prev,
        selectedPath: locPath,
        name: lastPart,
        url: urlPath.join(' → '),
        code: 'PMIS-' + (Math.floor(Math.random() * 89999) + 10000),
        type: deducedType,
        manufacturer: 'ABB',
        specs: {
          'Điện áp định mức': '22 kV',
          'Dòng điện định mức': '630 A',
          'Khả năng cắt ngắn mạch': '25 kA',
          'Tần số liên tục': '50 Hz'
        }
      }));
    }
  }, [locPath]);

  // Filtered/search matches for cycling
  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return devices.filter(dev => 
      dev.name.toLowerCase().includes(query) ||
      dev.code.toLowerCase().includes(query) ||
      dev.type.toLowerCase().includes(query)
    );
  }, [searchQuery, devices]);

  // Reset matched index on search query update
  useEffect(() => {
    setSearchMatchIdx(0);
  }, [searchQuery]);

  // Sơ đồ Zoom in vào vị trí tìm thấy đầu tiên (có hiện tooltip)
  useEffect(() => {
    if (searchMatches.length > 0) {
      const idx = searchMatchIdx % searchMatches.length;
      const currentMatch = searchMatches[idx >= 0 ? idx : searchMatches.length + idx];
      if (currentMatch) {
         setHoveredDev(currentMatch);
         setClickedDev(currentMatch);
         // Zoom-in comfort level
         setZoom(1.25);

         // Center viewport scrolling smoothly to highlighted element coordinates
         const timer = setTimeout(() => {
           if (containerRef.current) {
             const pixelX = (currentMatch.x + currentMatch.w / 2) / 100 * 2400;
             const pixelY = (currentMatch.y + currentMatch.h / 2) / 100 * 1350;

             const targetScrollLeft = pixelX * 1.25 - containerRef.current.clientWidth / 2;
             const targetScrollTop = pixelY * 1.25 - containerRef.current.clientHeight / 2;

             containerRef.current.scrollTo({
               left: targetScrollLeft,
               top: targetScrollTop,
               behavior: 'smooth'
             });
           }
         }, 80);
         return () => clearTimeout(timer);
      }
    } else {
      setHoveredDev(null);
    }
  }, [searchMatches, searchMatchIdx]);

  // Filter devices by simple display
  const filteredDevices = devices;

  // Handle Zoom In/Out
  const handleZoomIn = () => {
    setZoom(z => Math.min(3.0, parseFloat((z + 0.15).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom(z => Math.max(0.2, parseFloat((z - 0.15).toFixed(2))));
  };

  // Handle Wheel Zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const zoomDelta = e.deltaY < 0 ? 0.1 : -0.1;
      setZoom(z => Math.max(0.2, Math.min(3.0, parseFloat((z + zoomDelta).toFixed(2)))));
    }
  };

  // Container Dragging / Panning
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('.interactive-spot') || target.closest('.popup-card') || target.closest('.navigation-btn') || target.closest('.no-canvas-click')) return;

    clickStartPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = true;
    startX.current = e.clientX - (containerRef.current?.offsetLeft || 0);
    startY.current = e.clientY - (containerRef.current?.offsetTop || 0);
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
    scrollTop.current = containerRef.current?.scrollTop || 0;
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.clientX - (containerRef.current?.offsetLeft || 0);
    const y = e.clientY - (containerRef.current?.offsetTop || 0);
    const walkX = x - startX.current;
    const walkY = y - startY.current;
    
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft.current - walkX;
      containerRef.current.scrollTop = scrollTop.current - walkY;
    }
  };

  const handleMouseUpOrLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }

    // Measure mouse travel distance to verify if it was a plain click and not a swipe action
    const dx = e.clientX - clickStartPos.current.x;
    const dy = e.clientY - clickStartPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 6) {
      handleCanvasClick(e);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('.interactive-spot') || 
      target.closest('.popup-card') || 
      target.closest('.navigation-btn') ||
      target.closest('.no-canvas-click')
    ) {
      return;
    }

    const canvasElement = containerRef.current?.querySelector('.canvas-wrapper') as HTMLDivElement;
    if (!canvasElement) return;

    const rect = canvasElement.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert relative click coordinates to percentage scale (0 to 100)
    const pctX = parseFloat(((clickX / rect.width) * 100).toFixed(2));
    const pctY = parseFloat(((clickY / rect.height) * 100).toFixed(2));

    const clampedX = Math.max(0, Math.min(100, pctX));
    const clampedY = Math.max(0, Math.min(100, pctY));

    setSelectedClickCoords({ x: clampedX, y: clampedY });
    setHoveredDev(null);
  };

  const handleStartAddingDevice = () => {
    if (selectedClickCoords) {
      setEditingDeviceId(null);
      setAddDevState({
        x: selectedClickCoords.x,
        y: selectedClickCoords.y,
        wPx: 20,
        hPx: 20,
        url: '',
        selectedPath: [],
        name: '',
        code: '',
        type: 'Thiết bị khác',
        status: 'Đang vận hành',
        manufacturer: 'ABB',
        year: '2024',
        country: 'Việt Nam',
        specs: {
          'Điện áp định mức': '22 kV',
          'Dòng điện định mức': '630 A',
          'Khả năng cắt ngắn mạch': '25 kA',
          'Tần số liên tục': '50 Hz'
        }
      });
      setIsAddingDevice(true);
      setSelectedClickCoords(null);
    }
  };

  // File replacement configuration
  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const base64Data = event.target.result;
          try {
            localStorage.setItem('pmis_custom_schema_image', base64Data);
          } catch (err) {
            console.warn('Image is too large for localStorage, using temporary URL only.', err);
          }
          setSchemaImage(base64Data);
        }
      };
      reader.readAsDataURL(file);

      const objectUrl = URL.createObjectURL(file);
      setSchemaImage(objectUrl);
      setAlertMsg(`Đã thiết lập ảnh sơ đồ mặc định mới: ${file.name}`);
      setIsAlertOpen(true);
      setTimeout(() => setIsAlertOpen(false), 3000);
    }
  };

  // Status visual representations
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đang vận hành':
        return 'bg-emerald-500 text-white';
      case 'Sự cố':
        return 'bg-red-500 text-white animate-pulse';
      case 'Đang sửa chữa':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Get visual color based on device type
  const getTypeBadgeColor = (type: string) => {
    if (type === 'Máy biến áp') return 'bg-blue-100 text-[#164399] border-blue-200';
    if (type === 'Máy cắt') return 'bg-green-100 text-green-700 border-green-200';
    if (type === 'Dao cách ly') return 'bg-purple-100 text-purple-700 border-purple-200';
    if (type === 'Biến dòng' || type === 'Biến điện áp') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (type === 'Hệ thống') return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Render specifications
  const keySpecs = clickedDev ? Object.entries(clickedDev.technicalSpecs) : [];
  const activeTooltipDev = hoveredDev || (searchMatches.length > 0 ? searchMatches[searchMatchIdx % searchMatches.length] : null);

  const handleDeleteDevice = (id: string, name: string) => {
    setLocalConfirmAction({
      title: 'Xác nhận xóa vị trí Thiết bị',
      message: `Bạn có chắc chắn muốn xóa vị trí Thiết bị "${name}" này không?`,
      onConfirm: () => {
        setDevices(prev => prev.filter(d => d.id !== id));
        setClickedDev(null);
        setAlertMsg(`Đã xóa liên kết thiết bị "${name}" thành công!`);
        setIsAlertOpen(true);
        setTimeout(() => setIsAlertOpen(false), 3000);
        setLocalConfirmAction(null);
      }
    });
  };

  const handleEditDevice = (dev: MappedDevice) => {
    setEditingDeviceId(dev.id);
    setIsAddingDevice(true);
    setClickedDev(null); // Smoothly dismiss the right panel to show the left panel clearly

    // Build locPath alternating names & types
    const reconstructedLocPath: string[] = [];
    dev.path.forEach((segment, idx) => {
      reconstructedLocPath.push(segment);
      reconstructedLocPath.push(idx === 0 ? 'Công ty Điện lực Hưng Yên' : 'Cấp');
    });

    setLocPath(reconstructedLocPath);
    setAddDevState({
      x: dev.x,
      y: dev.y,
      wPx: Math.round((dev.w / 100) * 2400) || 20,
      hPx: Math.round((dev.h / 100) * 1350) || 20,
      url: dev.path.join(' → '),
      selectedPath: reconstructedLocPath,
      name: dev.name,
      code: dev.code,
      status: dev.status,
      type: dev.type,
      manufacturer: dev.manufacturer || 'ABB',
      year: dev.yearOfManufacture || '2020',
      country: dev.country || 'Thụy Điển',
      specs: dev.technicalSpecs || {},
    });
  };

  const handlePrevMatch = () => {
    if (searchMatches.length === 0) return;
    setSearchMatchIdx(prev => (prev - 1 + searchMatches.length) % searchMatches.length);
  };

  const handleNextMatch = () => {
    if (searchMatches.length === 0) return;
    setSearchMatchIdx(prev => (prev + 1) % searchMatches.length);
  };

  return (
    <div className="bg-[#F8FAFC] flex flex-col h-full overflow-hidden select-none relative">
      {/* Hidden file selector */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Search and Filters Header */}
      <div id="filter-header" className="bg-white border-b border-gray-200 px-6 py-4 shrink-0 shadow-sm z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveSubMenu(null)}
              className="p-1.5 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex flex-col justify-center">
              <h2 className="text-[13.5pt] font-extrabold flex items-center leading-none">
                <span className="text-[#7C7267] font-extrabold">Thiết bị |</span>
                <span className="text-[#164399] font-black ml-1.5">Sơ đồ lưới điện</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Search with Nav Controls - Styled to completely remove any inner boundaries, borders, or boxes */}
            <div className="flex items-center gap-1.5 bg-slate-100/80 rounded-full px-2 py-0.5 border border-transparent">
              <div className="relative w-60 flex items-center">
                <span className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </span>
                <input 
                  type="text"
                  placeholder="Tìm nhanh mã, tên thiết bị..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 shadow-none pl-7 pr-6 py-1.5 text-[9.5pt] font-bold text-gray-700 placeholder-gray-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {searchMatches.length > 0 && (
                <div className="flex items-center border-l border-slate-200 pl-1.5 gap-1 select-none">
                  <span className="text-[8pt] font-extrabold text-[#164399] tracking-tight bg-blue-50 px-1.5 py-0.5 rounded-full min-w-[50px] text-center">
                    {searchMatchIdx + 1}/{searchMatches.length}
                  </span>
                  <button 
                    onClick={handlePrevMatch}
                    title="Tìm kiếm trước đó"
                    className="navigation-btn p-1 hover:bg-slate-200 rounded text-gray-500 hover:text-blue-600 transition-colors active:scale-90"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleNextMatch}
                    title="Tìm kiếm tiếp theo"
                    className="navigation-btn p-1 hover:bg-slate-200 rounded text-gray-500 hover:text-blue-600 transition-colors active:scale-90"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden p-1">
              <button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                <ZoomOut className="w-4.5 h-4.5" />
              </button>
              <span className="px-2 text-[9pt] font-black text-gray-600 min-w-[50px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                <ZoomIn className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Updated interactive file picker trigger */}
            <button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">
              <ImageIcon className="w-4 h-4" />
              <span>Cập nhật</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Panel thêm Thiết bị bên trái với 2 Phần thông tin trên dưới */}
        {isAddingDevice && (
          <div className="no-canvas-click w-96 bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-2xl z-30 animate-in slide-in-from-left duration-300 popup-card relative h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between sticky top-0 z-10 shadow-sm">
              <h3 className="font-extrabold text-[11.5pt] text-gray-700 flex items-center gap-2">
                {editingDeviceId ? (
                  <Edit className="w-5 h-5 text-blue-600" />
                ) : (
                  <Plus className="w-5 h-5 text-emerald-600" />
                )}
                <span className="font-black text-slate-800">
                  {editingDeviceId ? 'Cập nhật vị trí thiết bị' : 'Thêm điểm thiết bị sơ đồ'}
                </span>
              </h3>
              <button 
                onClick={() => {
                  setIsAddingDevice(false);
                  setEditingDeviceId(null);
                  setLocPath([]);
                }}
                className="p-1 hover:bg-slate-200 rounded-xl transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Core */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-5">
              
              {/* PHẦN TRÊN: 2 ô nhập tọa độ + 2 ô nhập kích thước */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3.5 shadow-sm">
                <div className="flex items-center gap-2 pb-1.5 border-b border-gray-200">
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></div>
                  <h4 className="text-[9pt] font-black uppercase text-gray-700 tracking-wider">
                    Vị trí tương đối & Kích thước vùng
                  </h4>
                </div>

                {/* 2 ô tọa độ hiện tại */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[8pt] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Tọa độ X (%)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="0"
                      max="100"
                      value={addDevState.x}
                      onChange={(e) => {
                        const val = parseFloat(parseFloat(e.target.value).toFixed(2));
                        setAddDevState(prev => ({ ...prev, x: isNaN(val) ? 0 : Math.max(0, Math.min(100, val)) }));
                      }}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2 text-[9.5pt] font-extrabold text-slate-800 outline-none focus:ring-1 focus:ring-[#164399]"
                    />
                  </div>
                  <div>
                    <label className="block text-[8pt] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Tọa độ Y (%)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="0"
                      max="100"
                      value={addDevState.y}
                      onChange={(e) => {
                        const val = parseFloat(parseFloat(e.target.value).toFixed(2));
                        setAddDevState(prev => ({ ...prev, y: isNaN(val) ? 0 : Math.max(0, Math.min(100, val)) }));
                      }}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2 text-[9.5pt] font-extrabold text-slate-800 outline-none focus:ring-1 focus:ring-[#164399]"
                    />
                  </div>
                </div>

                {/* 2 ô nhập chiều rộng & chiều cao */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[8pt] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Chiều rộng (px)
                    </label>
                    <input 
                      type="number" 
                      min="5"
                      max="500"
                      value={addDevState.wPx}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setAddDevState(prev => ({ ...prev, wPx: isNaN(val) ? 20 : Math.max(5, val) }));
                      }}
                      className="w-full bg-white border border-orange-200 rounded-xl p-2 text-[9.5pt] font-bold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[8pt] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Chiều cao (px)
                    </label>
                    <input 
                      type="number" 
                      min="5"
                      max="500"
                      value={addDevState.hPx}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setAddDevState(prev => ({ ...prev, hPx: isNaN(val) ? 20 : Math.max(5, val) }));
                      }}
                      className="w-full bg-white border border-orange-200 rounded-xl p-2 text-[9.5pt] font-bold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* PHẦN DƯỚI: Nút chọn mở popup và hiển thị thông tin chung */}
              <div className="bg-[#f0f4fa] p-4 rounded-2xl border border-[#164399]/10 space-y-4">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#164399]/10">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-[#164399]" />
                    <h4 className="text-[9pt] font-black uppercase text-gray-700 tracking-wider">
                      Thông tin thiết bị liên kết
                    </h4>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowDeviceTreePopup(true)}
                    className="px-3 py-1.5 bg-[#164399] hover:bg-[#113272] text-white text-[8.5pt] font-black rounded-lg transition-colors shadow"
                  >
                    Chọn...
                  </button>
                </div>

                {/* Selected information of the PMIS device */}
                {addDevState.url ? (
                  <div className="space-y-4">
                    
                    {/* URL Path / Vị trí */}
                    <div className="flex flex-col gap-1 text-[9pt]">
                      <span className="text-[7.5pt] font-extrabold text-gray-700/80 uppercase tracking-wider">Vị trí trong cây thiết bị (URL)</span>
                      <p className="text-slate-700 font-extrabold leading-relaxed bg-white border border-slate-100 p-2.5 rounded-lg text-[8.5pt] break-words">
                        {addDevState.url}
                      </p>
                    </div>

                    {/* Common fields detail display */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-[7.5pt] font-extrabold text-gray-700 uppercase tracking-wider">Mã thiết bị</span>
                        <input 
                          type="text" 
                          value={addDevState.code}
                          onChange={(e) => setAddDevState(prev => ({ ...prev, code: e.target.value }))}
                          className="bg-white border border-gray-200 rounded-lg p-2 text-[9pt] font-bold text-red-600 outline-none focus:ring-1 focus:ring-[#164399]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[7.5pt] font-extrabold text-gray-700 uppercase tracking-wider">Loại thiết bị</span>
                        <input 
                          type="text" 
                          readOnly
                          value={addDevState.type}
                          className="bg-slate-100 border border-gray-200 rounded-lg p-2 text-[9pt] font-semibold text-slate-600 outline-none cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[7.5pt] font-extrabold text-gray-700 uppercase tracking-wider">Tên đầy đủ thiết bị</span>
                      <input 
                        type="text" 
                        value={addDevState.name}
                        onChange={(e) => setAddDevState(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-white border border-gray-200 rounded-lg p-2 text-[9.5pt] font-black text-slate-800 outline-none focus:ring-1 focus:ring-[#164399]"
                      />
                    </div>

                    {/* Technical Specifications details */}
                    <div className="border-t border-dashed border-[#164399]/20 pt-3 space-y-2">
                      <span className="text-[7.5pt] font-extrabold text-gray-700 uppercase tracking-wider block">Thông số kỹ thuật chung</span>
                      <div className="space-y-1.5 text-[8.5pt]">
                        {Object.entries(addDevState.specs).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-center bg-white px-2 py-1.5 rounded shadow-sm border border-slate-100">
                            <span className="text-gray-500 font-medium">{key}</span>
                            <span className="text-slate-800 font-extrabold">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-6 px-4 border border-dashed border-slate-200 bg-white/50 rounded-xl leading-relaxed">
                    <p className="text-[8.5pt] font-semibold text-gray-400 italic">
                      Bấm nút "Chọn" bên phải để duyệt cây thiết bị PMIS và lấy lại URL, Mã, Loại, Cấu hình kỹ thuật.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-2 sticky bottom-0 z-10 shadow-sm">
              <button 
                onClick={() => {
                  setIsAddingDevice(false);
                  setEditingDeviceId(null);
                  setLocPath([]);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 text-[9pt] hover:bg-slate-50 font-bold transition-all active:scale-95"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  if (!addDevState.url) {
                    setAlertMsg('Quy trình yêu cầu bạn phải chọn thiết bị/vị trí làm việc từ cây thư mục PMIS bằng nút Chọn!');
                    setIsAlertOpen(true);
                    return;
                  }
                  const wPct = parseFloat(((addDevState.wPx / 2400) * 100).toFixed(2));
                  const hPct = parseFloat(((addDevState.hPx / 1350) * 100).toFixed(2));

                  if (editingDeviceId) {
                    const originalDev = devices.find(d => d.id === editingDeviceId);
                    const updatedDevice: MappedDevice = {
                      id: editingDeviceId,
                      name: addDevState.name,
                      code: addDevState.code,
                      type: addDevState.type,
                      status: addDevState.status,
                      path: addDevState.selectedPath.filter((_, idx) => idx % 2 === 0),
                      fullPath: addDevState.selectedPath,
                      x: addDevState.x,
                      y: addDevState.y,
                      w: wPct,
                      h: hPct,
                      manufacturer: addDevState.manufacturer,
                      yearOfManufacture: addDevState.year,
                      serialNumber: originalDev?.serialNumber || 'SN-' + (Math.floor(Math.random() * 899999) + 100000),
                      country: addDevState.country,
                      technicalSpecs: addDevState.specs,
                      importance: originalDev?.importance || 'Trung bình'
                    };

                    setDevices(prev => prev.map(d => d.id === editingDeviceId ? updatedDevice : d));
                    setClickedDev(updatedDevice);
                    setIsAddingDevice(false);
                    setEditingDeviceId(null);
                    setLocPath([]);
                    setAlertMsg(`Đã cập nhật vị trí thiết bị "${updatedDevice.name}" thành công!`);
                    setIsAlertOpen(true);
                    setTimeout(() => setIsAlertOpen(false), 3000);
                  } else {
                    const idStr = `mapped-dev-${Date.now()}`;
                    const newDevice: MappedDevice = {
                      id: idStr,
                      name: addDevState.name,
                      code: addDevState.code,
                      type: addDevState.type,
                      status: addDevState.status,
                      path: addDevState.selectedPath.filter((_, idx) => idx % 2 === 0),
                      fullPath: addDevState.selectedPath,
                      x: addDevState.x,
                      y: addDevState.y,
                      w: wPct,
                      h: hPct,
                      manufacturer: addDevState.manufacturer,
                      yearOfManufacture: addDevState.year,
                      serialNumber: 'SN-' + (Math.floor(Math.random() * 899999) + 100000),
                      country: addDevState.country,
                      technicalSpecs: addDevState.specs,
                      importance: 'Trung bình'
                    };

                    setDevices(prev => [newDevice, ...prev]);
                    setClickedDev(newDevice);
                    setIsAddingDevice(false);
                    setLocPath([]);
                    setAlertMsg(`Đã lưu và liên kết thiết bị "${newDevice.name}" thành công!`);
                    setIsAlertOpen(true);
                    setTimeout(() => setIsAlertOpen(false), 3000);
                  }
                }}
                className="px-5 py-2 bg-[#164399] hover:bg-[#113272] text-white text-[9.5pt] font-black rounded-lg transition-all shadow-md active:scale-95"
              >
                Lưu
              </button>
            </div>
          </div>
        )}

        {/* Schematic Stage Container */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onWheel={handleWheel}
          className="flex-1 overflow-auto custom-scrollbar cursor-grab bg-slate-100/50 p-4 select-none relative"
        >
          {/* Zoom & Pan Scale Wrapper */}
          <div 
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: '0 0',
              width: '2400px', // Full resolution SLD width
              height: '1350px' // Proportionate 16:9 canvas
            }}
            className="canvas-wrapper relative bg-white shadow-lg border border-gray-200 transition-transform duration-75"
          >
            {/* The main high-res Single Line Diagram */}
            <img 
              src={schemaImage} 
              alt="Schematic Diagram Of Power Grid" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Mapped Hotspots Overlay - Showing the real physical boundary coordinate boxes */}
            {filteredDevices.map((dev) => {
              // Apply a shrink factor to make hotspots tightly wrap text labels and correspond to actual text dimensions
              const shrinkFactor = 0.55; // 55% of original size for ultimate precision on text labels
              const wVal = dev.w * shrinkFactor;
              const hVal = dev.h * shrinkFactor;
              // Center the shrunk box within the original coordinate bounding area
              const xOffset = (dev.w - wVal) / 2;
              const yOffset = (dev.h - hVal) / 2;

              const rectStyle: React.CSSProperties = {
                left: `${dev.x + xOffset}%`,
                top: `${dev.y + yOffset}%`,
                width: `${wVal}%`,
                height: `${hVal}%`,
              };

              const isDevSelectedBySearch = searchMatches.length > 0 && searchMatches[searchMatchIdx % searchMatches.length]?.id === dev.id;
              const isDevHovered = hoveredDev?.id === dev.id;
              const isDevClicked = clickedDev?.id === dev.id;

              return (
                <div
                  key={dev.id}
                  style={rectStyle}
                  onMouseEnter={() => setHoveredDev(dev)}
                  onMouseLeave={() => setHoveredDev(null)}
                  onClick={() => setClickedDev(dev)}
                  className={`absolute interactive-spot z-10 cursor-pointer rounded transition-all border duration-150 ${
                    isDevHovered || isDevSelectedBySearch
                      ? 'border-red-500 bg-red-400/20 shadow-md ring-2 ring-red-500/30' 
                      : isDevClicked 
                      ? 'border-blue-600 bg-blue-500/20 ring-2 ring-blue-500/40 shadow-sm'
                      : 'border-blue-400/[0.04] bg-transparent hover:border-red-500/30 hover:bg-red-500/10'
                  }`}
                  title={dev.name}
                >
                  {/* Subtle blink radar for failures / warnings */}
                  {dev.status === 'Sự cố' && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-xl h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  )}
                </div>
              );
            })}

            {/* Visual indicators when editing coordinates or plotting new device */}
            {isAddingDevice && (
              <div 
                style={{
                  position: 'absolute',
                  left: `${addDevState.x}%`,
                  top: `${addDevState.y}%`,
                  width: `${(addDevState.wPx / 2400) * 100}%`,
                  height: `${(addDevState.hPx / 1350) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 border-2 border-dashed border-orange-500 bg-orange-500/20 shadow-lg pointer-events-none transition-all duration-75"
              >
                {/* Red dot in the exact coordinates */}
                <div className="absolute w-2.5 h-2.5 bg-red-600 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ring-4 ring-red-400/60 animate-pulse"></div>
              </div>
            )}

            {/* Prompt Tooltip asking if they want to add a device at the clicked spot */}
            {selectedClickCoords && !isAddingDevice && (
              <div 
                style={{
                  position: 'absolute',
                  left: `${selectedClickCoords.x}%`,
                  top: `${selectedClickCoords.y}%`,
                  transform: 'translate(-50%, -100%)',
                }}
                className="no-canvas-click z-50 bg-white border border-slate-200 text-slate-800 p-3.5 rounded-xl shadow-2xl w-[250px] flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-150 mb-3"
              >
                <p className="text-[9.5pt] font-extrabold leading-relaxed text-center text-slate-800">
                  Bạn có muốn thêm vị trí thiết bị ở đây không?
                </p>
                <div className="flex items-center justify-end gap-1.5 text-[8.5pt]">
                  <button 
                    onClick={() => setSelectedClickCoords(null)}
                    className="px-2.5 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors font-bold"
                  >
                    Hủy
                  </button>
                  <button 
                    onClick={handleStartAddingDevice}
                    className="px-3.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded shadow active:scale-95 transition-all text-center"
                  >
                    Có
                  </button>
                </div>
              </div>
            )}

            {/* Hover/Search Tooltip - LIGHT-THEMED positioned right below the active hotspot on the canvas */}
            {activeTooltipDev && !isAddingDevice && !selectedClickCoords && (
              <div 
                style={{ 
                  position: 'absolute',
                  left: `${activeTooltipDev.x + activeTooltipDev.w / 2}%`,
                  top: `${activeTooltipDev.y + activeTooltipDev.h}%`,
                  transform: 'translateX(-50%)',
                  pointerEvents: 'none',
                }}
                className="z-50 bg-white text-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-200 w-[320px] flex flex-col gap-2 pointer-events-none animate-in fade-in slide-in-from-top-2 duration-150 mt-2 h-auto"
              >
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                  <span className="text-[10pt] font-black text-gray-700 uppercase tracking-wider">{activeTooltipDev.code}</span>
                  <div className="bg-[#f0f4fa] font-mono text-[8pt] font-bold text-[#164399] py-0.5 px-2 rounded-xl border border-blue-100">
                    {activeTooltipDev.type}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[10.5pt] font-black tracking-tight text-gray-700">{activeTooltipDev.name}</h4>
                  <p className="text-[8.5pt] text-gray-500 font-bold leading-normal break-words whitespace-normal mt-1">
                    Vị trí: {activeTooltipDev.path.join(' → ')}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1 justify-between text-[9pt]">
                  <span className="text-slate-500 italic font-normal">Trạng thái thiết bị:</span>
                  <span className={`px-2 py-0.5 text-[8.5pt] font-extrabold rounded-[10px] ${
                    activeTooltipDev.status === 'Đang vận hành' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
                    activeTooltipDev.status === 'Sự cố' ? 'text-red-700 bg-red-50 border border-red-200' :
                    'text-orange-700 bg-orange-50 border border-orange-200'
                  }`}>
                    {activeTooltipDev.status}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Side Info Panel (Mirrors General Info Tab) when a Device is Left-Clicked */}
        {clickedDev && !isAddingDevice && (
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col shrink-0 shadow-2xl z-30 animate-in slide-in-from-right duration-300 popup-card relative">
            
            {/* STICKY/NEO Header showing detailed device status and Actions (reduced height) */}
            <div className="py-2.5 px-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between sticky top-0 z-10 shadow-sm gap-2">
              {/* Trang thai thiet bi o tren cung */}
              <div className="min-w-0 flex-1">
                <span className={`inline-block px-2.5 py-1 text-[8pt] font-black uppercase leading-none rounded-full shadow-sm text-center ${getStatusColor(clickedDev.status)}`}>
                  {clickedDev.status}
                </span>
              </div>
              
              {/* Actions: Edit, Delete, Close matching the exact general form style */}
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <button 
                  onClick={() => handleEditDevice(clickedDev)}
                  title="Chỉnh sửa vị trí thiết bị trên sơ đồ"
                  className="p-1.5 text-[#164399] hover:bg-blue-50 rounded-xl transition-all border border-gray-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteDevice(clickedDev.id, clickedDev.name)}
                  title="Xóa mapping thiết bị khỏi sơ đồ"
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-xl transition-all border border-gray-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setClickedDev(null)}
                  title="Đóng trang"
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all border border-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable specs and additional technical parameters container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
              
              {/* Mã và Loại thiết bị đưa lên trên trước Tên (Bỏ các tiêu đề) */}
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-gray-100">
                <span className="bg-red-50 text-red-600 font-mono font-black text-[9pt] uppercase px-3 py-2 rounded-full border border-red-100 text-center w-full flex items-center justify-center">
                  {clickedDev.code}
                </span>
                <span className={`font-black text-[8.5pt] uppercase px-3 py-2 rounded-[10px] border flex items-center justify-center gap-1.5 w-full text-center ${getTypeBadgeColor(clickedDev.type)}`}>
                  <Cpu className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{clickedDev.type}</span>
                </span>
              </div>

              {/* Tên Thiết Bị & Vị trí trực thuộc quản lý (Hủy bỏ các nhãn tiêu đề, vị trí cha nhỏ mờ ngay dưới) */}
              <div className="space-y-1.5 pb-4 border-b border-gray-100">
                <h3 className="text-[12pt] font-black text-gray-700 tracking-tight leading-relaxed">
                  {clickedDev.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[8.5pt] font-medium text-gray-400 hover:text-gray-500 transition-colors leading-tight">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span className="truncate" title={clickedDev.path.slice(0, clickedDev.path.length - 1).join(' → ') || 'Đơn vị gốc'}>
                    {clickedDev.path.slice(0, clickedDev.path.length - 1).join(' → ') || 'Đơn vị gốc'}
                  </span>
                </div>
              </div>

              {/* Hình ảnh giả lập minh họa thiết bị có hỗ trợ click để Xem, Zoom và Tải ảnh rõ nét */}
              <div 
                onClick={() => {
                  setPreviewingImgDev(clickedDev);
                  setImgModalZoom(1);
                }}
                className="overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50 relative aspect-video shadow-inner group cursor-pointer"
                title="Bấm vào để xem ảnh đầy đủ"
              >
                <img 
                  src={getDeviceIllustration(clickedDev.type)}
                  alt={clickedDev.name}
                  className="w-full h-full object-cover select-none transition-all duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center gap-1.5 text-white">
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 transform scale-90 group-hover:scale-100 transition-all">
                    <ZoomIn className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-gray-700 text-[8.5pt] font-black uppercase tracking-wider text-white">Xem & Phóng to ảnh</span>
                </div>
              </div>

              {/* Specific details specifications */}
              <div className="space-y-3 bg-[#f0f4fa] rounded-xl p-4 border border-[#164399]/10">
                <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#164399]/10">
                  <Settings className="w-4 h-4" /> Thông số kỹ thuật
                </h4>
                <div className="space-y-2 text-[9.5pt]">
                  <div className="flex items-center justify-between border-b border-gray-100 py-1.5 group">
                    <span className="text-gray-500 font-bold">Hãng sản xuất</span>
                    <span className="text-[#164399] font-extrabold">{clickedDev.manufacturer}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-1.5 group">
                    <span className="text-gray-500 font-bold">Năm sản xuất</span>
                    <span className="text-[#164399] font-extrabold">{clickedDev.yearOfManufacture}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-1.5 group">
                    <span className="text-gray-500 font-bold">Nước chế tạo</span>
                    <span className="text-[#164399] font-extrabold">{clickedDev.country}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-1.5 group">
                    <span className="text-gray-500 font-bold">Số Serial</span>
                    <span className="text-red-500 font-mono font-bold">{clickedDev.serialNumber}</span>
                  </div>
                  {keySpecs.map(([key, val], idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-gray-100 py-1.5 group">
                      <span className="text-gray-500 font-medium">{key}</span>
                      <span className="text-gray-800 font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Full details screen trigger redirected to the respective Device view */}
              <button 
                onClick={() => {
                  if (setDevicePath) {
                    const alternatingPath: string[] = [];
                    clickedDev.path.forEach((segment, idx) => {
                      alternatingPath.push(segment);
                      if (idx < clickedDev.path.length - 1) {
                        let lvlType = 'Phân cấp';
                        if (idx === 1) lvlType = 'Thiết bị chính';
                        else if (idx === 0) lvlType = 'Đơn vị';
                        alternatingPath.push(lvlType);
                      }
                    });
                    setDevicePath(alternatingPath);
                  }
                  setActiveSubMenu('Danh sách thiết bị');
                }}
                className="w-full py-3 text-[10.5pt] font-extrabold text-[#164399] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Xem thông tin chi tiết</span>
              </button>

            </div>
          </div>
        )}
      </div>

      {/* Actual WorkLocationPopup integration popup cards */}
      <WorkLocationPopup 
        showDeviceTreePopup={showDeviceTreePopup}
        setShowDeviceTreePopup={setShowDeviceTreePopup}
        tempDevicePath={tempDevicePathState}
        setTempDevicePath={setTempDevicePathState}
        deviceFavorites={deviceFavorites}
        setDeviceFavorites={setDeviceFavorites}
        deviceHistory={deviceHistory}
        setDeviceHistory={setDeviceHistory}
        setDevicePath={setLocPath}
        setDeviceFormCurrentPage={() => {}}
      />

      {/* Floating Status alert messages banner (Toast counterpart) */}
      {isAlertOpen && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3.5 bg-white text-slate-800 rounded-lg shadow-2xl flex items-center gap-3 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-[10pt] font-extrabold tracking-tight">{alertMsg}</span>
        </div>
      )}

      {/* Interactive High-Fidelity Device Image Viewer Mockup Modal */}
      {previewingImgDev && (
        <div className="fixed inset-0 bg-slate-900/85 backdrop-blur-sm z-[200] flex flex-col items-center justify-center p-4 animate-in fade-in duration-200">
          
          {/* Modal Box */}
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50 gap-4 flex-wrap">
              <div className="flex flex-col min-w-0">
                <span className="text-[7.5pt] font-black uppercase tracking-widest text-gray-700">Hồ sơ ảnh thiết bị chính</span>
                <h4 className="text-[11.5pt] font-black text-gray-700 tracking-tight flex items-center gap-2 truncate">
                  <span className="bg-red-50 text-red-600 font-mono text-[8pt] px-2 py-0.5 rounded border border-red-100 shrink-0">
                    {previewingImgDev.code}
                  </span>
                  <span className="truncate">{previewingImgDev.name}</span>
                </h4>
              </div>
              
              {/* Modal controls in the header */}
              <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                <button 
                  onClick={() => setImgModalZoom(prev => Math.max(0.5, prev - 0.25))}
                  title="Thu nhỏ"
                  className="p-1.5 text-slate-600 hover:bg-slate-100 active:scale-95 rounded-xl border border-gray-200 transition-all"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <div className="text-[8.5pt] font-bold text-slate-500 font-mono px-2 py-1 bg-white border border-gray-200 rounded-lg min-w-[50px] text-center select-none">
                  {Math.round(imgModalZoom * 100)}%
                </div>
                <button 
                  onClick={() => setImgModalZoom(prev => Math.min(3, prev + 0.25))}
                  title="Phóng to"
                  className="p-1.5 text-slate-600 hover:bg-slate-100 active:scale-95 rounded-xl border border-gray-200 transition-all"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setImgModalZoom(1)}
                  title="Reset kích thước"
                  className="px-2.5 py-1 text-[8pt] font-black uppercase text-[#164399] bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-full transition-all"
                >
                  100%
                </button>
                <a 
                  href={getDeviceIllustration(previewingImgDev.type)}
                  download={`PMIS-${previewingImgDev.code}-Image.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  title="Tải ảnh gốc rõ nét"
                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 active:scale-95 rounded-xl border border-emerald-200 transition-all flex items-center gap-1 bg-emerald-50/25 px-2.5"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span className="text-[8.5pt] font-black uppercase">Tải về</span>
                </a>
                <button 
                  onClick={() => setPreviewingImgDev(null)}
                  title="Đóng trang"
                  className="p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all rounded-full border border-gray-200 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body / Scrollable Viewer Grid */}
            <div className="flex-1 overflow-auto bg-slate-900 p-8 flex items-center justify-center min-h-[400px] relative custom-scrollbar">
              <div 
                className="transition-transform duration-200 ease-out origin-center select-none"
                style={{ transform: `scale(${imgModalZoom})` }}
              >
                <img 
                  src={getDeviceIllustration(previewingImgDev.type)}
                  alt={previewingImgDev.name}
                  className="max-w-full max-h-[50vh] object-contain rounded-xl shadow-2xl pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating absolute badges inside the viewer */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white/95 text-[7.5pt] font-mono p-3 rounded-xl border border-white/10 flex flex-col gap-1 select-none pointer-events-none">
                <div>• Thiết bị: <span className="font-bold text-blue-400">{previewingImgDev.name}</span></div>
                <div>• Loại: <span className="font-bold text-blue-400">{previewingImgDev.type}</span></div>
                <div>• Hãng SX: <span className="font-bold text-gray-300">{previewingImgDev.manufacturer}</span></div>
                <div>• Chế độ: <span className="font-bold text-emerald-400">Hình ảnh mô phỏng chất lượng cao</span></div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-gray-100 bg-slate-50 flex items-center justify-between text-[8pt] font-bold text-gray-400">
              <div className="truncate text-slate-500">Vị trí PMIS: {previewingImgDev.path.join(' → ')}</div>
              <div className="shrink-0 text-slate-400">Sử dụng nút thu nhỏ / phóng to để kiểm tra chi tiết thiết bị</div>
            </div>
          </div>
        </div>
      )}

      {localConfirmAction && (
        <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col p-6 text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-50 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-[12.5pt] font-extrabold text-gray-700 mb-2">{localConfirmAction.title}</h3>
            <p className="text-[10pt] text-gray-500 leading-relaxed mb-6">
              {localConfirmAction.message}
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                type="button"
                onClick={() => setLocalConfirmAction(null)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-650 hover:bg-slate-50 font-bold text-[9pt] transition-all cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button 
                type="button"
                onClick={() => {
                  localConfirmAction.onConfirm();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-[9pt] transition-all shadow-sm cursor-pointer"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
