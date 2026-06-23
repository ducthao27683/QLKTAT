import React from 'react';
import { 
  ArrowLeft, ArrowUp, ArrowDown, Search, Plus, ListChecks, MoreVertical, Edit, Move, Copy, Shield, Trash2, 
  FileText, Database, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Settings, 
  ExternalLink, Eye, Box, Camera, Upload, Download, Maximize2, Activity, Filter, X, Check, Flame, Layout,
  ClipboardList, FlaskConical, Wrench, GitCommit, Zap, Package, Layers, MapPin,
  Building2, Network, Binary
} from 'lucide-react';
import { DesignTooltip } from '../../../components/DesignTooltip';
import { EvnLogo } from '../../../components/EvnLogo';
import { getDetailedType, formatNumber, getDeviceTypes, getDeviceInstances } from '../../../shared/utils';
import { DEVICE_TYPE_COLORS } from '../constants';

const DOCUMENT_LIBRARY = [
  { id: 'D1', name: 'QCVN 01:2020/BCT - Quy chuẩn kỹ thuật quốc gia về an toàn điện', category: 'quy-chuan', type: 'Quy chuẩn', size: '2.8 MB', code: 'QCVN 01:2020' },
  { id: 'D2', name: 'TCVN 1985:2015 - Thử nghiệm và nghiệm thu máy biến áp lực', category: 'quy-chuan', type: 'TCVN', size: '1.4 MB', code: 'TCVN 1985' },
  { id: 'D3', name: 'Thông tư 33/2015/TT-BCT - Quy định về kiểm định an toàn thiết bị, dụng cụ điện', category: 'quy-chuan', type: 'Thông tư', size: '1.2 MB', code: 'TT 33/2015' },
  { id: 'D4', name: 'Quy trình thí nghiệm Máy biến áp lực trạm 110kV-500kV - EVN 2023', category: 'quy-trinh', type: 'Quy trình EVN', size: '4.5 MB', code: 'QT-MBA-EVN' },
  { id: 'D5', name: 'Quy trình bảo dưỡng thí nghiệm Máy cắt SF6 cấp điện thế 110kV - EVN', category: 'quy-trinh', type: 'Quy trình EVN', size: '3.1 MB', code: 'QT-MC-SF6' },
  { id: 'D6', name: 'Hướng dẫn kiểm thử và bảo trì Hệ thống đo biến dòng TI - EVN SPC', category: 'quy-trinh', type: 'Hướng dẫn EVN', size: '2.2 MB', code: 'HD-TI-SPC' },
  { id: 'D7', name: 'Hướng dẫn chuẩn hóa đo lường biến điện áp TU - EVN NPC', category: 'quy-trinh', type: 'Hướng dẫn EVN', size: '1.9 MB', code: 'HD-TU-NPC' },
  { id: 'D8', name: 'Sổ tay kỹ thuật vận hành và kiểm tra chống sét van (CSV)', category: 'huong-dan-nsx', type: 'Sách HD NSX', size: '5.2 MB', code: 'ST-CSV' },
  { id: 'D9', name: 'Quy trình kiểm tra định kỳ hành lang an toàn và điện trở nối đất Đường dây', category: 'quy-trinh', type: 'Quy trình', size: '1.7 MB', code: 'QT-DD-ND' },
  { id: 'D10', name: 'Biểu mẫu tiêu chuẩn kiểm tra trạm biến áp súc', category: 'bieu-mau', type: 'Biểu mẫu', size: '0.4 MB', code: 'BM-TBA' },
  { id: 'D11', name: 'Quy trình Kiểm định Trạm Biến Áp Điện 110kV đồng bộ', category: 'quy-chuan', type: 'Quy trình', size: '2.5 MB', code: 'QT-KĐ-TBA' },
  { id: 'D12', name: 'Hướng dẫn hiệu chuẩn thiết bị đo dòng rò trạm biến áp', category: 'huong-dan-nsx', type: 'Hướng dẫn', size: '1.1 MB', code: 'HD-HC-TB' },
];

const getTypeKey = (typeStr: string) => {
  const t = (typeStr || '').toUpperCase();
  if (t === 'MBA' || t === 'MÁY BIẾN ÁP' || t === 'TRẠM') return 'MBA';
  if (t === 'MC' || t === 'MÁY CẮT' || t.includes('SF6')) return 'MC';
  if (t === 'TI' || t === 'BIẾN DÒNG' || t === 'BIẾN DÒNG ĐIỆN') return 'TI';
  if (t === 'TU' || t === 'BIẾN ĐIỆP ÁP' || t === 'BIẾN ĐIỆN ÁP') return 'TU';
  if (t === 'CSV' || t === 'CHỐNG SÉT VAN') return 'CSV';
  if (t === 'ĐD' || t === 'ĐƯỜNG DÂY') return 'ĐD';
  return 'MBA';
};

const getDeviceVoltage = (deviceStr: string) => {
  const text = (deviceStr || '').toLowerCase();
  if (text.includes('110kv') || text.includes('110 kv')) return '110kV';
  if (text.includes('220kv') || text.includes('220 kv')) return '220kV';
  if (text.includes('35kv') || text.includes('35 kv')) return '35kV';
  if (text.includes('22kv') || text.includes('22 kv')) return '22kV';
  if (text.includes('500kv') || text.includes('500 kv')) return '500kV';
  if (text.includes('6kv') || text.includes('6 kv')) return '6kV';
  if (text.includes('0.4kv') || text.includes('0.4 kv') || text.includes('0,4kv')) return '0.4kV';
  return '110kV';
};

interface DeviceModuleProps {
  devicePath: string[];
  setDevicePath: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveSubMenu: (menu: string | null) => void;
  childSearch: string;
  setChildSearch: (search: string) => void;
  deviceFormCurrentPage: number;
  setDeviceFormCurrentPage: (page: number) => void;
  deviceFormTab: 'info' | 'tracking' | 'reports';
  setDeviceFormTab: (tab: 'info' | 'tracking' | 'reports') => void;
  deviceFormMenuOpen: boolean;
  setDeviceFormMenuOpen: (open: boolean) => void;
  setDetailForm: (form: any) => void;
  setPreviewContent: (content: any) => void;
  setConfirmAction: (action: any) => void;
  getDeviceDetails: (name: string) => any;
}

const normalizeType = (type: string) => {
  const t = type?.toUpperCase() || '';
  if (t === 'TBA' || t === 'TRẠM' || t.includes('TRẠM') || t.includes('TBA')) return 'Trạm';
  if (t === 'ĐD' || t === 'ĐƯỜNG DÂY' || t.includes('ĐƯỜNG DÂY') || t.includes('ĐĐ')) return 'Đường dây';
  if (t === 'MC' || t === 'MÁY CẮT' || t.includes('MÁY CẮT') || t.includes('MC')) return 'Máy cắt';
  if (t === 'MBA' || t === 'MÁY BIẾN ÁP' || t.includes('MÁY BIẾN ÁP') || t.includes('MBA')) return 'Máy biến áp';
  if (t === 'TI' || t === 'BIẾN DÒNG' || t === 'BIẾN DÒNG ĐIỆN' || t.includes('BIẾN DÒNG') || t.includes('TI')) return 'Biến dòng';
  if (t === 'TU' || t === 'BIẾN ĐIỆN ÁP' || t.includes('BIẾN ĐIỆN ÁP') || t.includes('TU')) return 'Biến điện áp';
  if (t === 'DCL' || t === 'DAO CÁCH LY' || t.includes('DAO CÁCH LY') || t.includes('DCL')) return 'Dao cách ly';
  if (t === 'CSV' || t === 'CHỐNG SÉT VAN' || t.includes('CHỐNG SÉT VAN') || t.includes('CSV')) return 'Chống sét van';
  return type;
};

const getDeviceItemVisual = (type: string, isSelected?: boolean) => {
  const t = normalizeType(type);
  if (t === 'Trạm') {
    return {
      icon: <Building2 className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100/50',
    };
  }
  if (t === 'Đường dây') {
    return {
      icon: <Network className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-50 text-purple-600 border border-purple-100 hover:bg-purple-100/50',
    };
  }
  if (t === 'Máy cắt') {
    return {
      icon: <Zap className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100/50',
    };
  }
  if (t === 'Máy biến áp') {
    return {
      icon: <Box className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-amber-600 text-white shadow-md' : 'bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100/50',
    };
  }
  if (t === 'Biến dòng') {
    return {
      icon: <Activity className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-teal-600 text-white shadow-md' : 'bg-teal-50 text-teal-600 border border-teal-100 hover:bg-teal-100/50',
    };
  }
  if (t === 'Biến điện áp') {
    return {
      icon: <Binary className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-pink-600 text-white shadow-md' : 'bg-pink-50 text-pink-600 border border-pink-100 hover:bg-pink-100/50',
    };
  }
  if (t === 'Dao cách ly') {
    return {
      icon: <GitCommit className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100/50',
    };
  }
  if (t === 'Chống sét van') {
    return {
      icon: <Shield className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-sky-600 text-white shadow-md' : 'bg-sky-50 text-sky-600 border border-sky-100 hover:bg-sky-100/50',
    };
  }
  if (t?.includes('Vị trí') || t?.includes('Cột')) {
    return {
      icon: <MapPin className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100/50',
    };
  }
  if (t?.includes('Ngăn lộ')) {
    return {
      icon: <ListChecks className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-violet-600 text-white shadow-md' : 'bg-violet-50 text-violet-600 border border-violet-100 hover:bg-violet-100/50',
    };
  }
  if (t?.includes('Hệ thống')) {
    return {
      icon: <Layers className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-fuchsia-600 text-white shadow-md' : 'bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100 hover:bg-fuchsia-100/50',
    };
  }
  if (t === 'Bộ điều khiển' || t?.includes('điều khiển') || t?.includes('BĐK')) {
    return {
      icon: <Wrench className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-orange-600 text-white shadow-md' : 'bg-orange-50 text-orange-600 border border-orange-100 hover:bg-orange-100/50',
    };
  }
  if (t === 'Sứ cách điện' || t === 'Phụ kiện' || t?.includes('Sứ') || t?.includes('Phụ') || t?.includes('PK')) {
    return {
      icon: <Settings className="w-5 h-5 shrink-0" />,
      bg: isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100/50',
    };
  }
  return {
    icon: <Package className="w-5 h-5 shrink-0" />,
    bg: isSelected ? 'bg-gray-600 text-white shadow-md' : 'bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100/50',
  };
};

const getDeviceIcon = (type: string, isSelected?: boolean) => {
  return getDeviceItemVisual(type, isSelected).icon;
};

const getDeviceStatus = (index: number) => {
  const mod = index % 8;
  if (mod === 5) return 'Khóa';
  if (mod === 4) return 'Sửa chữa';
  if (mod === 3) return 'Dự phòng';
  return 'Đang vận hành';
};

const getDetailedChildType = (name: string) => {
  const n = name || '';
  if (n.includes('Đường dây') || n.includes('ĐD') || n.includes('kV')) return 'Đường dây';
  if (n.includes('Trạm biến áp') || n.includes('TBA') || n.startsWith('Trạm')) return 'Trạm';
  if (n.includes('Kho')) return 'Kho';
  if (n.includes('Vị trí cột') || n.includes('Vị trí') || n.includes('Cột') || n.includes('Móng')) return 'Vị trí';
  if (n.includes('Nút')) return 'Nút';
  if (n.includes('Ngăn lộ')) return 'Ngăn lộ';
  if (n.includes('Hệ thống') || n.includes('Tủ AC') || n.includes('Tủ DC') || n.includes('ắc quy') || n.includes('RTU') || n.includes('Tủ bảo vệ') || n.includes('Giàn')) return 'Hệ thống';
  if (n.includes('Máy biến áp') || n.includes('MBA')) return 'Máy biến áp';
  if (n.includes('Máy cắt') || n.includes('MC')) return 'Máy cắt';
  if (n.includes('Tụ')) return 'Tụ điện';
  if (n.includes('Biến dòng') || n.includes('TI')) return 'Biến dòng';
  if (n.includes('Biến điện áp') || n.includes('TU')) return 'Biến điện áp';
  if (n.includes('Dao cách ly') || n.includes('DCL')) return 'Dao cách ly';
  if (n.includes('Chống sét van') || n.includes('CSV')) return 'Chống sét van';
  if (n.includes('Rơ le') || n.includes('Bộ điều khiển') || n.includes('Tủ điều khiển')) return 'Bộ điều khiển';
  if (n.includes('Sứ') || n.includes('Cách điện')) return 'Sứ cách điện';
  if (n.includes('Thanh cái') || n.includes('Kẹp cực') || n.includes('Hộp đầu cáp') || n.includes('Cáp')) return 'Phụ kiện';
  return 'Thiết bị';
};

const getDeviceCode = (itemName: string, index: number) => {
  const t = normalizeType(getDetailedChildType(itemName));
  const num = 1000 + index;
  if (t === 'Trạm') return `TBA-${num}`;
  if (t === 'Đường dây') return `ĐD-${num}`;
  if (t === 'Máy biến áp') return `MBA-${num}`;
  if (t === 'Máy cắt') return `MC-${num}`;
  if (t === 'Biến dòng') return `TI-${num}`;
  if (t === 'Biến điện áp') return `TU-${num}`;
  if (t === 'Dao cách ly') return `DCL-${num}`;
  if (t === 'Chống sét van') return `CSV-${num}`;
  if (t === 'Ngăn lộ') return `NL-${num}`;
  if (t === 'Vị trí') return `VT-${num}`;
  if (t === 'Hệ thống') return `HT-${num}`;
  if (t === 'Bộ điều khiển') return `BĐK-${num}`;
  if (t === 'Sứ cách điện' || t === 'Phụ kiện') return `PK-${num}`;
  return `TB-${num}`;
};

export const DeviceModule = ({
  devicePath,
  setDevicePath,
  setActiveSubMenu,
  childSearch,
  setChildSearch,
  deviceFormCurrentPage,
  setDeviceFormCurrentPage,
  deviceFormTab,
  setDeviceFormTab,
  deviceFormMenuOpen,
  setDeviceFormMenuOpen,
  setDetailForm,
  setPreviewContent,
  setConfirmAction,
  getDeviceDetails
}: DeviceModuleProps) => {
  const getRealDeviceName = (path: string[]) => {
    for (let i = path.length - 1; i >= 0; i--) {
      if (i % 2 === 0) {
        const val = path[i];
        if (val && val !== "Tất cả") {
          return val;
        }
      }
    }
    return path[0] || "";
  };

  const currentDevice = devicePath[devicePath.length - 1] || "Thiết bị";
  const [selectedChild, setSelectedChild] = React.useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [showTypeSelector, setShowTypeSelector] = React.useState(false);
  const [deviceFilterStatuses, setDeviceFilterStatuses] = React.useState<string[]>(['Đang vận hành']);
  const [openMenuIdx, setOpenMenuIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleGlobalClick = () => {
      setOpenMenuIdx(null);
    };
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const lastInstance = React.useMemo(() => {
    // Find the last instance name in the path (even indices)
    for (let i = devicePath.length - 1; i >= 0; i--) {
      if (i % 2 === 0 && devicePath[i]) return devicePath[i];
    }
    return "Thiết bị";
  }, [devicePath]);

  const defaultChildren = React.useMemo(() => {
    // Get ALL child instances of the current path
    return getDeviceInstances(devicePath, "Tất cả");
  }, [devicePath]);

  const [childrenOrderMap, setChildrenOrderMap] = React.useState<Record<string, string[]>>({});

  const childrenKey = React.useMemo(() => {
    return devicePath.join(' > ');
  }, [devicePath]);

  const children = React.useMemo(() => {
    const customOrder = childrenOrderMap[childrenKey];
    if (customOrder && customOrder.length === defaultChildren.length && customOrder.every(x => defaultChildren.includes(x))) {
      return customOrder;
    }
    return defaultChildren;
  }, [defaultChildren, childrenOrderMap, childrenKey]);

  const moveItemUp = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx === 0) return;
    const currentList = [...children];
    const item1 = filteredChildren[idx];
    const item2 = filteredChildren[idx - 1];
    const absIdx1 = currentList.indexOf(item1);
    const absIdx2 = currentList.indexOf(item2);
    if (absIdx1 === -1 || absIdx2 === -1) return;

    currentList[absIdx1] = item2;
    currentList[absIdx2] = item1;

    setChildrenOrderMap(prev => ({
      ...prev,
      [childrenKey]: currentList
    }));
  };

  const moveItemDown = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx === filteredChildren.length - 1) return;
    const currentList = [...children];
    const item1 = filteredChildren[idx];
    const item2 = filteredChildren[idx + 1];
    const absIdx1 = currentList.indexOf(item1);
    const absIdx2 = currentList.indexOf(item2);
    if (absIdx1 === -1 || absIdx2 === -1) return;

    currentList[absIdx1] = item2;
    currentList[absIdx2] = item1;

    setChildrenOrderMap(prev => ({
      ...prev,
      [childrenKey]: currentList
    }));
  };

  const deviceTypesList = React.useMemo(() => {
    return getDeviceTypes(devicePath).filter(t => t !== "Tất cả");
  }, [devicePath]);

  const filteredChildren = children.filter(c => {
    const matchesSearch = c.toLowerCase().includes(childSearch.toLowerCase());
    if (selectedTypes.length === 0) return matchesSearch;
    // Map tag selection to rough keyword matching for mock data
    const matchesType = selectedTypes.some(t => {
      if (t === 'Máy biến áp' || t === 'MBA') return c.includes('MBA') || c.includes('Máy biến áp') || c.includes('TBA');
      if (t === 'Máy cắt' || t === 'MC') return c.includes('Máy cắt') || c.includes('MC');
      if (t === 'Dao cách ly' || t === 'DCL') return c.includes('Dao cách ly') || c.includes('DCL');
      if (t === 'Biến dòng' || t === 'TI') return c.includes('Biến dòng') || c.includes('TI');
      if (t === 'Biến điện áp' || t === 'TU') return c.includes('Biến điện áp') || c.includes('TU');
      return c.includes(t);
    });
    return matchesSearch && matchesType;
  });
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);
  const startIndex = (deviceFormCurrentPage - 1) * itemsPerPage;
  const paginatedChildren = filteredChildren.slice(startIndex, startIndex + itemsPerPage);

  const currentPathEnd = devicePath[devicePath.length - 1];
  let effectiveDevice = selectedChild;
  if (!effectiveDevice) {
    if (filteredChildren && filteredChildren.length > 0) {
      effectiveDevice = filteredChildren[0];
    } else if (currentPathEnd === 'Tất cả' && devicePath.length > 1) {
      effectiveDevice = devicePath.slice().reverse().find(p => p !== 'Tất cả') || currentPathEnd;
    } else {
      effectiveDevice = currentPathEnd;
    }
  }
  if (effectiveDevice === 'Tất cả') {
    effectiveDevice = devicePath.slice().reverse().find(p => p !== 'Tất cả') || 'Thiết bị';
  }
  const details = getDeviceDetails(effectiveDevice);
  const [showDeviceFilter, setShowDeviceFilter] = React.useState(false);

  const LIFECYCLE_STEPS = [
    { date: '20/05/2026', type: 'Thí nghiệm', content: 'Thí nghiệm định kỳ đạt yêu cầu', result: 'Đạt', operator: 'Trần Văn Đức (Ban Kỹ thuật)' },
    { date: '15/02/2026', type: 'Sửa chữa thường xuyên', content: 'Vệ sinh sứ, siết lại kẹp cực', result: 'Hoàn thành', operator: 'Lê Hoàng Nam (Đội sửa chữa)' },
    { date: '10/01/2026', type: 'Hòa lưới', content: 'Hòa lưới sau đại tu', result: 'Thành công', operator: 'Phạm Minh Hải (Trưởng ca vận hành)' },
    { date: '05/12/2025', type: 'Sửa chữa lớn', content: 'Thay thế bộ truyền động máy cắt', result: 'Hoàn thành', operator: 'Nguyễn Tiến Dũng (CBM Centric)' },
    { date: '12/11/2025', type: 'Bảo dưỡng định kỳ', content: 'Bảo dưỡng cơ cấu truyền lực', result: 'Hoàn thành', operator: 'Vũ Quốc Việt (Đội bảo trì)' },
    { date: '08/10/2025', type: 'Sự cố', content: 'Nhảy máy cắt do tác động của bảo vệ so lệch', result: 'Đã xử lý', operator: 'Hoàng Văn Bách (KTV rơ-le)' },
    { date: '01/10/2025', type: 'Kiểm định', content: 'Kiểm định định kỳ thiết bị', result: 'Đạt', operator: 'Đỗ Mạnh Thắng (Trung tâm thí nghiệm)' },
    { date: '15/09/2025', type: 'Điều động', content: 'Điều động từ Trạm A sang Trạm B', result: 'Hoàn thành', operator: 'Nguyễn Văn Hòa (Phòng điều độ)' },
    { date: '01/09/2025', type: 'Nhập kho', content: 'Nhập kho thiết bị mới', result: 'Hoàn thành', operator: 'Nguyễn Thị Hoa (Thủ kho)' },
  ];

  React.useEffect(() => {
    setSelectedChild(null);
  }, [devicePath]);

  const handleDoubleClick = (child: string) => {
    let category = "";
    const rawPathLength = devicePath.length;
    
    if (rawPathLength === 1) {
      if (child.includes("TBA") || child.includes("Trạm")) category = "Trạm";
      else if (child.includes("ĐD") || child.includes("Đường dây") || child.includes("kV")) category = "Đường dây";
      else if (child.includes("Kho")) category = "Kho TB mới";
      else if (child.includes("Dự án") || child.includes("Công trình") || child.includes("Dự án xuất tuyến") || child.includes("Lắp đặt")) category = "Công trình";
      else if (child.includes("Nút") || child.includes("Nhanh rẽ") || child.includes("Điểm đấu")) category = "Nút";
      else category = "Trạm";
    } else if (rawPathLength === 3) {
      if (child.includes("Ngăn lộ")) category = "Ngăn lộ";
      else if (child.includes("MBA") || child.includes("Máy biến áp")) category = "Máy biến áp";
      else if (child.includes("Tủ") || child.includes("Hệ thống") || child.includes("Giàn") || child.includes("RTU") || child.includes("ắc quy")) category = "Hệ thống";
      else if (child.includes("Vị trí") || child.includes("Cột")) category = "Vị trí";
      else if (child.includes("Nhánh")) category = "Nhánh rẽ";
      else if (child.includes("Nút") || child.includes("Điểm")) category = "Nút";
      else category = "Thiết bị";
    } else if (rawPathLength === 5) {
      const isBreaker = child.includes("Máy cắt") || child.includes("Dao cách ly") || child.includes("TI") || child.includes("TU") || child.includes("Biến dòng") || child.includes("Biến điện áp") || child.includes("Cuộn dây") || child.includes("Sứ xuyên") || child.includes("Thân cột") || child.includes("Móng");
      const isPart = child.includes("Sứ đứng") || child.includes("Thanh cái") || child.includes("Kẹp cực") || child.includes("Hộp đầu cáp") || child.includes("Bình dầu") || child.includes("quạt làm mát") || child.includes("bộ lọc") || child.includes("Chuỗi sứ") || child.includes("Kẹp ép") || child.includes("Tạ") || child.includes("Tiếp địa");
      const isControl = child.includes("Rơ le") || child.includes("Bộ điều khiển") || child.includes("Tủ điều khiển") || child.includes("RTU") || child.includes("Gateway");
      
      if (isBreaker) category = "Thiết bị chính";
      else if (isPart) category = "Phụ kiện";
      else if (isControl) category = "Hệ thống điều khiển";
      else category = "Thiết bị chính";
    }
    
    if (category) {
      setDevicePath([...devicePath, category, child]);
      setDeviceFormCurrentPage(1);
    }
  };

  return (
    <div className="bg-[#F8FAFC] flex flex-col h-full overflow-hidden">
      {/* Search and Filters Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex flex-col gap-0 shrink-0 shadow-sm relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (devicePath.length > 2) setDevicePath(prev => prev.slice(0, -2));
                else if (devicePath.length > 0) setDevicePath(prev => prev.slice(0, -1));
                else setActiveSubMenu(null);
              }}
              className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-[12pt] font-medium flex items-center gap-1.5 leading-[1.5] text-[#164399]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1 shrink-0 animate-pulse"></span>
              <span>Danh sách thiết bị của - {getRealDeviceName(devicePath)}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowDeviceFilter(!showDeviceFilter)}
              className={`p-2 rounded-[10px] border transition-all ${showDeviceFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
            >
              <Filter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setDetailForm({ type: 'device', mode: 'add' })}
              className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-[10px] text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
          </div>
        </div>

        {/* Filter Bar Row - Exact Match to Su Co Module Style */}
        {showDeviceFilter && (
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-[10px] animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-4">
               <div className="flex flex-col gap-1">
                  <label className="text-[9pt] font-bold text-gray-400 uppercase">Loại TB</label>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap items-center gap-1 min-h-[36px] bg-white px-2 py-1 rounded-[12px] border border-gray-200 min-w-[220px] max-w-[450px]">
                      {selectedTypes.length === 0 ? (
                        <span className="text-gray-400 font-bold italic text-[10pt] px-2 py-1">Tất cả</span>
                      ) : (
                        selectedTypes.map(t => (
                          <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ECF3FE] text-gray-700 text-[10pt] font-black rounded-full border border-blue-100 uppercase tracking-tighter">
                            {t}
                            <button onClick={() => setSelectedTypes(prev => prev.filter(x => x !== t))} className="hover:text-red-500 transition-colors ml-1">
                              <X className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                          </span>
                        ))
                      )}
                      <div className="relative">
                        <button 
                          onClick={() => setShowTypeSelector(!showTypeSelector)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-[#164399] transition-all"
                          title="Thêm loại thiết bị"
                        >
                          <Plus className="w-5 h-5 stroke-[3]" />
                        </button>
                        {showTypeSelector && (
                          <div className="absolute top-full left-0 mt-3 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl z-[100] py-3 animate-in fade-in slide-in-from-top-2 duration-300">
                             <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                               <p className="text-[9pt] font-black text-gray-700 uppercase tracking-widest">Chọn loại thiết bị</p>
                             </div>
                             <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                {deviceTypesList.map(t => (
                                  <button 
                                    key={t}
                                    onClick={() => {
                                      setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-[11pt] font-bold flex items-center justify-between hover:bg-blue-50 transition-colors ${selectedTypes.includes(t) ? 'text-[#164399] bg-blue-50/50' : 'text-gray-600'}`}
                                  >
                                    {t}
                                    {selectedTypes.includes(t) && (
                                      <div className="w-5 h-5 bg-[#164399] rounded-full flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5 text-white stroke-[4]" />
                                      </div>
                                    )}
                                  </button>
                                ))}
                             </div>
                            <div className="px-4 mt-3 pt-3 border-t border-gray-50">
                               <button 
                                 onClick={() => setShowTypeSelector(false)}
                                 className="w-full py-2.5 bg-[#164399] text-white text-[10pt] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                               >
                                 HOÀN TẤT
                               </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
               </div>
               
               <div className="flex flex-col gap-1">
                  <label className="text-[9pt] font-bold text-gray-400 uppercase">Trạng thái</label>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-[20px] border border-gray-200">
                    {['Đang vận hành', 'Sửa chữa', 'Dự phòng'].map(s => (
                      <button 
                        key={s}
                        onClick={() => setDeviceFilterStatuses(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                        className={`px-3 py-1 text-[10pt] rounded-[20px] transition-all whitespace-nowrap ${deviceFilterStatuses.includes(s) ? 'bg-[#ECF3FE] text-[#164399] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
               </div>
            </div>

             <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                <label className="text-[9pt] font-bold text-gray-400 uppercase">Tìm kiếm nhanh</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Tìm thiết bị..."
                    className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full transition-all"
                    value={childSearch}
                    onChange={(e) => setChildSearch(e.target.value)}
                  />
                </div>
             </div>
           </div>
         )}
       </div>
       
       <div className="flex-1 flex overflow-hidden">
         <div className="flex-1 flex bg-white overflow-hidden">
           {/* Left Column: Device Cards List */}
           <div className="w-[45%] flex flex-col border-r border-slate-100 bg-[#f8fafc] overflow-hidden px-3.5 py-0 animate-in fade-in duration-300">
             <div className="flex-1 overflow-y-auto custom-scrollbar pl-1 pr-1.5 space-y-3 pt-4 pb-4 animate-in slide-in-from-left duration-500">
              {filteredChildren.map((child, idx) => {
                const type = getDetailedChildType(child);
                const normType = normalizeType(type);
                const isSelected = selectedChild === child;
                const deviceCode = getDeviceCode(child, idx);
                const childCount = Math.floor(Math.random() * 8);
                const status = getDeviceStatus(idx);
                const isLocked = status === 'Khóa';
                
                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedChild(child)}
                    onDoubleClick={() => handleDoubleClick(child)}
                    className={`relative group rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer w-full ${
                      isSelected 
                        ? 'bg-blue-50/40 border-blue-200/90 shadow-sm ring-1 ring-blue-400/10' 
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/30 shadow-xs'
                    } ${isLocked ? 'opacity-50 grayscale-[0.6]' : 'opacity-100'}`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#164399] z-20"></div>
                    )}
                    <div className="p-4 flex gap-4">
                      {/* Device Icon/Type Badge with STT under it */}
                      <div className="flex flex-col items-center shrink-0">
                        {(() => {
                          const visual = getDeviceItemVisual(type, isSelected);
                          return (
                            <div className={`w-11 h-11 rounded-lg flex flex-col items-center justify-center ${visual.bg}`}>
                              {visual.icon}
                            </div>
                          );
                        })()}
                        <div className="text-[8pt] font-extrabold mt-2 select-none flex items-center justify-center gap-0.5">
                          <span className="text-gray-400">STT:</span>
                          <span className="text-red-650 font-black">{idx + 1}</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1.5 pb-1.5 border-b border-gray-100 transition-all">
                          <div className="flex items-center gap-1.5 pt-1 transition-all flex-1">
                             <span className={`text-[8.5pt] tracking-wider uppercase px-2 py-0.5 rounded-[20px] transition-all font-bold ${
                               isSelected 
                                 ? 'bg-amber-100/60 text-amber-700 font-extrabold' 
                                 : 'bg-slate-100/80 text-gray-400 group-hover:bg-amber-100/60 group-hover:text-amber-700 group-hover:font-extrabold'
                             }`}>
                               {getDeviceVoltage(child)}
                             </span>
                             <span className={`text-[8.5pt] tracking-wider uppercase px-2 py-0.5 rounded-[20px] transition-all font-bold ${
                               isSelected 
                                 ? 'bg-blue-100/60 text-[#164399] font-extrabold' 
                                 : 'bg-slate-100/80 text-gray-400 group-hover:bg-blue-100/60 group-hover:text-[#164399] group-hover:font-extrabold'
                             }`}>
                               {normType}
                             </span>
                             <span className={`text-[8.5pt] tracking-wider font-mono px-2 py-0.5 rounded-[20px] transition-all font-bold ${
                               isLocked 
                                 ? 'bg-slate-100/80 text-gray-300' 
                                 : isSelected 
                                   ? 'bg-red-100/60 text-red-600 font-extrabold' 
                                   : 'bg-slate-100/80 text-gray-400 group-hover:bg-red-100/60 group-hover:text-red-600 group-hover:font-extrabold'
                             }`}>
                               {deviceCode}
                             </span>
                          </div>
                          
                          {/* Reordering Controls (Move Up/Down) that replace the old short kebab menu */}
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <button
                              onClick={(e) => moveItemUp(idx, e)}
                              disabled={idx === 0}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-150/40 shadow-xs hover:bg-slate-50 text-[#164399] hover:text-blue-800 hover:scale-110 active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                              title="Dịch chuyển lên vị trí trước"
                            >
                              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                            </button>
                            <button
                              onClick={(e) => moveItemDown(idx, e)}
                              disabled={idx === filteredChildren.length - 1}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-150/40 shadow-xs hover:bg-slate-50 text-[#164399] hover:text-blue-800 hover:scale-110 active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                              title="Dịch chuyển xuống vị trí sau"
                            >
                              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                        <h4 className={`text-[11.5pt] font-medium mb-1.5 line-clamp-2 leading-tight transition-all tracking-tight ${isSelected ? 'text-[#164399] font-black' : 'text-gray-800 group-hover:text-blue-600'}`}>{child}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[7pt] font-black uppercase text-gray-400">{childCount} thiết bị con</span>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <span className={`text-[7pt] font-bold uppercase ${
                            status === 'Sửa chữa' ? 'text-purple-600' :
                            status === 'Dự phòng' ? 'text-amber-600' :
                            status === 'Khóa' ? 'text-gray-400' : 'text-green-600'
                          }`}>{status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Statistics Bar */}
            {(() => {
              let total = filteredChildren.length;
              let cover = 0, repair = 0, reserve = 0, active = 0;
              filteredChildren.forEach((_, i) => {
                 const status = getDeviceStatus(i);
                 if (status === 'Khóa') cover++;
                 else if (status === 'Sửa chữa') repair++;
                 else if (status === 'Dự phòng') reserve++;
                 else active++;
              });
              return (
                <div className="mt-4 pt-4 border-t border-slate-200/55 bg-gray-50/50 -mx-6 px-6 pb-2 shrink-0 select-none animate-in slide-in-from-bottom duration-500">
                  <div className="grid grid-cols-5 gap-1.5 text-center">
                     <div className="bg-blue-50/60 border border-blue-200/60 rounded-xl p-1.5 flex flex-col justify-center shadow-xs">
                        <span className="text-[7pt] font-black uppercase text-blue-800 tracking-tighter leading-none mb-1">Tổng số</span>
                        <span className="text-[12pt] font-mono font-black text-[#164399] leading-none">{total}</span>
                     </div>
                     <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-1.5 flex flex-col justify-center shadow-xs">
                        <span className="text-[7pt] font-black uppercase text-emerald-800 tracking-tighter leading-none mb-1">Vận hành</span>
                        <span className="text-[11.5pt] font-mono font-black text-emerald-700 leading-none">{active}</span>
                     </div>
                     <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-1.5 flex flex-col justify-center shadow-xs">
                        <span className="text-[7pt] font-black uppercase text-amber-800 tracking-tighter leading-none mb-1">Dự phòng</span>
                        <span className="text-[11.5pt] font-mono font-black text-amber-700 leading-none">{reserve}</span>
                     </div>
                     <div className="bg-purple-50/60 border border-purple-200/60 rounded-xl p-1.5 flex flex-col justify-center shadow-xs">
                        <span className="text-[7pt] font-black uppercase text-purple-700 tracking-tighter leading-none mb-1">Sửa chữa</span>
                        <span className="text-[11.5pt] font-mono font-black text-purple-700 leading-none">{repair}</span>
                     </div>
                     <div className="bg-gray-50/60 border border-slate-200 rounded-lg p-1.5 flex flex-col justify-center shadow-xs">
                        <span className="text-[7pt] font-black uppercase text-gray-500 tracking-tighter leading-none mb-1">Khóa</span>
                        <span className="text-[11.5pt] font-mono font-black text-gray-500 leading-none">{cover}</span>
                     </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right Column: Detailed Preview */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 bg-white shrink-0">
            {[
              { id: 'info', label: 'Thông tin chung' },
              { id: 'reports', label: 'Theo dõi thiết bị' },
              { id: 'tracking', label: 'Vòng đời thiết bị' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setDeviceFormTab(tab.id as any)}
                className={`flex-1 h-12 text-[12pt] font-bold transition-all relative ${deviceFormTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                {tab.label}
                {deviceFormTab === tab.id && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {deviceFormTab === 'info' ? (
              <div className="space-y-10 animate-in fade-in duration-500">
                <div className="flex items-start justify-between pb-2 mb-6 w-full">
                    <div className="flex-1 space-y-3">
                       {/* Row 1: Code, Type and Status shapes placed closely together with auto-width, no titles */}
                       <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-amber-100/50 text-amber-700 font-black text-[9pt] uppercase px-3 py-1.5 rounded-md border border-amber-100 block w-auto shadow-sm select-none">
                             {getDeviceVoltage(effectiveDevice)}
                          </span>

                          <div className="bg-blue-100/50 text-[#164399] font-black text-[9pt] uppercase px-3 py-1.5 rounded-md border border-blue-100 flex items-center gap-1.5 w-auto shadow-sm select-none">
                             {normalizeType(getDetailedType(effectiveDevice))}
                          </div>

                          <span className="bg-red-50 text-[#cb1c1c] font-mono font-black text-[9pt] uppercase px-3 py-1.5 rounded-md border border-red-100 block w-auto shadow-sm select-none">
                             {(() => {
                                const idxInPage = filteredChildren.indexOf(effectiveDevice);
                                const devIndex = idxInPage >= 0 ? idxInPage : 0;
                                return getDeviceCode(effectiveDevice, devIndex);
                             })()}
                          </span>
                       </div>

                       {/* Row 2: Device Name with NO title */}
                       <div className="pt-1.5 pb-2">
                          <h3 className="text-[17pt] md:text-[19pt] font-extrabold text-gray-700 leading-tight tracking-tight mt-0.5">{effectiveDevice}</h3>
                          <div className="text-[9.5pt] text-gray-400 font-medium leading-relaxed mt-1 flex items-center gap-1.5 flex-wrap">
                            <MapPin className="w-3.5 h-3.5" />
                            {(() => {
                              const instances = devicePath.filter((p, i) => i % 2 === 0 && p !== "Tất cả");
                              const idx = instances.indexOf(effectiveDevice);
                              if (idx !== -1) {
                                return instances.slice(0, idx).join(' / ');
                              }
                              return instances.join(' / ');
                            })()}
                          </div>
                       </div>
                    </div>

                    {/* Action Button right-aligned */}
                    <div className="mt-5 shrink-0 ml-4">
                      <button 
                        onClick={() => {
                          const currentPathEnd = devicePath[devicePath.length - 1];
                          if (effectiveDevice && effectiveDevice !== currentPathEnd && effectiveDevice !== "Tất cả") {
                            const category = getDetailedChildType(effectiveDevice);
                            setDevicePath([...devicePath, category, effectiveDevice]);
                          }
                          setDetailForm({ type: 'device', mode: 'view', data: effectiveDevice });
                        }}
                        className="px-6 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-[12pt] whitespace-nowrap hover:bg-blue-100 transition-all flex items-center gap-2 whitespace-nowrap border border-blue-100 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" /> Xem
                      </button>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4 p-7 bg-blue-50/20 rounded-xl border border-blue-100/30 shadow-inner">
                      <div className="bg-gray-150/70 p-3 rounded-xl border border-gray-200/50 mb-2 flex items-center justify-between">
                        <h4 className="text-[11pt] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                          <Settings className="w-4 h-4 text-slate-500" /> Thông số kỹ thuật
                        </h4>
                        {(() => {
                             const idxInPage = filteredChildren.indexOf(effectiveDevice);
                             const devIndex = idxInPage >= 0 ? idxInPage : 0;
                             const status = getDeviceStatus(devIndex);
                             const statusColors: Record<string, string> = {
                                'Khóa': 'bg-gray-50 text-gray-400 border-gray-100 shadow-sm',
                                'Sửa chữa': 'bg-purple-50 text-purple-600 border-purple-100/50 shadow-sm',
                                'Dự phòng': 'bg-amber-50 text-amber-600 border-amber-100/50 shadow-sm',
                                'Đang vận hành': 'bg-emerald-50 text-emerald-800 border-emerald-100/50 shadow-sm',
                             };
                             return (
                                <span className={`text-[9pt] font-black uppercase px-3 py-1.5 rounded-full border flex items-center gap-1.5 w-auto shadow-sm select-none ${statusColors[status] || statusColors['Đang vận hành']}`}>
                                   {status}
                                </span>
                             );
                        })()}
                      </div>
                      <div className="grid grid-cols-2 gap-x-10 gap-y-1">
                         {details.specs.filter((s:any) => s.label !== 'Mã thiết bị' && s.label !== 'Tên thiết bị' && s.label !== 'Vị trí' && s.label !== 'Loại thiết bị' && s.label !== 'Trạng thái').map((spec: any, i: number) => (
                           <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 hover:bg-white/40 transition-colors group px-0">
                              <span className="text-[10pt] font-black text-gray-700 uppercase tracking-tight">{spec.label}</span>
                              <span className="text-[11pt] font-black text-[#164399] tracking-tight">{spec.value}</span>
                           </div>
                         ))}
                      </div>
                    </div>

                    <div className="space-y-8">
                      {(() => {
                         // Compute dynamic references loaded from Category Configurations
                         let localDocs: Record<string, string[]> = {};
                         let localImages: Record<string, string[]> = {};
                         try {
                           localDocs = JSON.parse(localStorage.getItem('pmis_reference_docs_map') || '{}');
                           localImages = JSON.parse(localStorage.getItem('pmis_reference_images_map') || '{}');
                         } catch (e) {
                           console.error(e);
                         }

                         const devDetailedType = getDetailedType(effectiveDevice);
                         const devTypeKey = getTypeKey(devDetailedType);
                         const devVoltage = getDeviceVoltage(effectiveDevice);

                         const docIds: string[] = [];
                         const imageUrls: string[] = [];

                         const targetSuffix = `-${devTypeKey}-${devVoltage}`;
                         
                         Object.keys(localDocs).forEach(k => {
                           if (k.toLowerCase().endsWith(targetSuffix.toLowerCase())) {
                             (localDocs[k] || []).forEach(dId => {
                               if (!docIds.includes(dId)) docIds.push(dId);
                             });
                           }
                         });

                         Object.keys(localImages).forEach(k => {
                           if (k.toLowerCase().endsWith(targetSuffix.toLowerCase())) {
                             (localImages[k] || []).forEach(imgUrl => {
                               if (!imageUrls.includes(imgUrl)) imageUrls.push(imgUrl);
                             });
                           }
                         });

                         // Fallbacks to guarantee visual excellence if they have not set up configs yet
                         if (docIds.length === 0) {
                           if (devTypeKey === 'MBA') docIds.push('D4', 'D2', 'D10');
                           else if (devTypeKey === 'MC') docIds.push('D5', 'D2');
                           else if (devTypeKey === 'TI') docIds.push('D6');
                           else if (devTypeKey === 'TU') docIds.push('D7');
                           else if (devTypeKey === 'CSV') docIds.push('D8');
                           else docIds.push('D1');
                         }

                         if (imageUrls.length === 0) {
                           if (devTypeKey === 'MBA') {
                             imageUrls.push(
                               'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
                               'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
                             );
                           } else if (devTypeKey === 'MC') {
                             imageUrls.push(
                               'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
                               'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80'
                             );
                           } else {
                             imageUrls.push(
                               'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80'
                             );
                           }
                         }

                         const loadedDocs = docIds.map(id => DOCUMENT_LIBRARY.find(d => d.id === id)).filter(Boolean) as typeof DOCUMENT_LIBRARY;

                         return (
                            <>
                              <div className="space-y-4 pt-4 border-t border-slate-100 first:border-0 first:pt-0 pb-6 w-full max-w-full">
                                 <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                   <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                     <Camera className="w-5 h-5 text-orange-500" /> HÌNH ẢNH MINH HỌA
                                   </h4>
                                 </div>
                                 <div className="grid grid-cols-2 gap-3 w-full">
                                    {imageUrls.map((img: string, idx: number) => (
                                       <div 
                                         key={idx} 
                                         className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group relative shadow-sm hover:shadow-md transition-all duration-300 cursor-zoom-in"
                                         onClick={() => setPreviewContent({ type: 'image', url: img, name: effectiveDevice, imagesList: imageUrls, currentIndex: idx })} 
                                       >
                                          <img 
                                            src={img} 
                                            alt="TB" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                            referrerPolicy="no-referrer"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                                            <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                               </div>

                               <div className="space-y-4 pt-6 w-full max-w-full">
                                 <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                   <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                     <FileText className="w-5 h-5 text-red-500" /> TÀI LIỆU ĐÍNH KÈM
                                   </h4>
                                 </div>
                                 <div className="space-y-3 w-full">
                                   {loadedDocs.map((doc, i) => (
                                     <div 
                                       key={i} 
                                       className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100 group hover:border-slate-300 hover:bg-white transition-all cursor-pointer shadow-xs" 
                                       onClick={() => setPreviewContent({ type: 'file', url: '#', name: doc.name, fileCode: doc.code, fileDate: '15/06/2026', fileSize: doc.size, fileName: doc.name })}
                                     >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                           <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                             <FileText className="w-4.5 h-4.5 text-red-500" />
                                           </div>
                                           <div className="flex flex-col min-w-0 text-left">
                                             <p className="text-[9.5pt] font-bold text-gray-800 line-clamp-1 group-hover:text-[#164399] transition-colors">{doc.name}</p>
                                             <p className="text-[8.5pt] text-slate-400 font-medium tracking-tight text-left mt-0.5">Hệ thống | 15/06/2026 | {doc.size}</p>
                                           </div>
                                        </div>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             
                            </>
                         );
                      })()}
                    </div>
                </div>
              </div>
            ) : deviceFormTab === 'reports' ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                {(() => {
                  const orderMap: Record<string, number> = {
                    'thong-so': 1,
                    'su-co': 2,
                    'sua-chua': 3,
                    'thi-nghiem': 4,
                    'cong-viec': 5
                  };
                  const trackingData = details.tracking
                    .filter((s:any) => s.id !== 'lich-su')
                    .sort((a:any, b:any) => (orderMap[a.id] || 99) - (orderMap[b.id] || 99));
                    
                  return trackingData.map((section: any, i: number) => {
                    const typeStyles: Record<string, { color: string, headerBg: string, bodyBg: string, border: string, btnStyle: string, icon: any }> = {
                      'su-co': { 
                        color: 'text-red-600', 
                        headerBg: 'bg-red-50/70 border-red-100', 
                        bodyBg: 'bg-red-50/10', 
                        border: 'border-red-100/60',
                        btnStyle: 'text-gray-500 hover:text-blue-600',
                        icon: <Flame className="w-5 h-5 text-red-600 animate-pulse" /> 
                      },
                      'thi-nghiem': { 
                        color: 'text-violet-600', 
                        headerBg: 'bg-violet-50/70 border-violet-100', 
                        bodyBg: 'bg-violet-50/10', 
                        border: 'border-violet-100/60',
                        btnStyle: 'text-gray-500 hover:text-blue-600',
                        icon: <FlaskConical className="w-5 h-5 text-violet-600" /> 
                      },
                      'thong-so': { 
                        color: 'text-green-600', 
                        headerBg: 'bg-green-50/70 border-green-100', 
                        bodyBg: 'bg-green-50/10', 
                        border: 'border-green-100/60',
                        btnStyle: 'text-gray-500 hover:text-blue-600',
                        icon: <Activity className="w-5 h-5 text-green-600" /> 
                      },
                      'cong-viec': { 
                        color: 'text-amber-700', 
                        headerBg: 'bg-amber-50/70 border-amber-100', 
                        bodyBg: 'bg-amber-50/10', 
                        border: 'border-amber-100/60',
                        btnStyle: 'text-gray-500 hover:text-blue-600',
                        icon: <ClipboardList className="w-5 h-5 text-amber-700" /> 
                      },
                      'sua-chua': { 
                        color: 'text-sky-600', 
                        headerBg: 'bg-sky-50/70 border-sky-100', 
                        bodyBg: 'bg-sky-50/10', 
                        border: 'border-sky-100/60',
                        btnStyle: 'text-gray-500 hover:text-blue-600',
                        icon: <Wrench className="w-5 h-5 text-sky-600" /> 
                      },
                      'default': { 
                        color: 'text-blue-600', 
                        headerBg: 'bg-blue-50/70 border-blue-100', 
                        bodyBg: 'bg-blue-50/10', 
                        border: 'border-blue-100/60',
                        btnStyle: 'text-gray-500 hover:text-blue-600',
                        icon: <Activity className="w-5 h-5 text-blue-600" /> 
                      }
                    };

                    const style = typeStyles[section.id as string] || typeStyles.default;

                    return (
                      <div key={i} className={`rounded-xl border overflow-hidden shadow-sm transition-all hover:shadow-md ${style.border} ${style.bodyBg}`}>
                         <div className={`px-6 py-3.5 flex items-center justify-between border-b ${style.headerBg}`}>
                            <div className="flex items-center gap-3">
                               <span>{style.icon}</span>
                               <h4 className={`text-[12pt] font-black uppercase tracking-tight ${style.color}`}>{section.title} ({section.items.length})</h4>
                            </div>
                            <button className={`text-[10pt] font-black hover:underline ${style.btnStyle}`}>Xem tất cả</button>
                         </div>
                         <div className={`${style.bodyBg}`}>
                            <div className="divide-y divide-gray-200/60">
                               {section.items.map((item: any, idx: number) => (
                                 <div 
                                    key={idx} 
                                    className="px-6 py-4 flex items-center gap-4 transition-all cursor-pointer group hover:bg-white/50"
                                    onClick={() => {
                                      if (section.id === 'su-co') {
                                        setActiveSubMenu('Danh sách sự cố');
                                      } else if (section.id === 'cong-viec') {
                                        setDetailForm({ type: 'job', mode: 'view', data: item });
                                      }
                                    }}
                                 >
                                    {(() => {
                                      const parts = item.date.split('/');
                                      const d = parts[0] || '11';
                                      const m = parts[1] || '06';
                                      const y = parts[2] || '2026';
                                      return (
                                        <div className="w-12 h-12 rounded-[10px] border border-gray-200/70 overflow-hidden flex flex-col items-center bg-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                          <div className="w-full bg-[#164399] text-[6.5pt] font-black text-white py-0.5 text-center leading-none tracking-wider uppercase">
                                            T {m}
                                          </div>
                                          <div className="flex-1 flex flex-col items-center justify-center bg-white leading-none">
                                            <span className="text-[11pt] font-black text-slate-800 font-mono">{d}</span>
                                            <span className="text-[5.5pt] text-gray-400 font-black tracking-tighter mt-0.5">{y}</span>
                                          </div>
                                        </div>
                                      );
                                    })()}
                                    <div className="w-[1px] h-6 bg-gray-250 shrink-0"></div>
                                    <span className="flex-1 text-[11pt] font-normal text-slate-705 tracking-tight leading-snug group-hover:text-blue-700 transition-colors">{item.content}</span>
                                    <div className={`px-2.5 py-1 rounded-full text-[8pt] font-bold uppercase tracking-tighter shrink-0 border shadow-sm ${
                                       item.status === 'Đã hoàn thành' || item.status === 'Hoàn thành' ? 'bg-green-50/85 text-green-700 border-green-200/40' : 'bg-blue-50/85 text-[#164399] border-blue-200/40'
                                    }`}>
                                       {item.status}
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                    );
                  });
                })() }
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                 <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <h5 className="text-[10pt] font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                       <Activity className="w-4 h-4 text-blue-500" /> Vòng đời thiết bị 
                    </h5>
                    <button className="text-[9pt] font-bold text-blue-600 hover:underline">Xem tất cả</button>
                 </div>
                 <div className="relative pl-8 border-l-2 border-slate-100 space-y-6 ml-4 pt-2">
                    {LIFECYCLE_STEPS.map((item, j) => {
                      const colors: Record<string, { bg: string, border: string, text: string, dot: string }> = {
                        'Sự cố': { bg: 'bg-red-500/10', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
                        'Thí nghiệm': { bg: 'bg-blue-500/10', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-600' },
                        'Sửa chữa lớn': { bg: 'bg-purple-500/10', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-500' },
                        'Hòa lưới': { bg: 'bg-green-500/10', border: 'border-green-200', text: 'text-green-700', dot: 'bg-green-600' },
                        'default': { bg: 'bg-slate-500/10', border: 'border-slate-200', text: 'text-slate-700', dot: 'bg-slate-500' }
                      };
                      const c = colors[item.type] || colors.default;

                      return (
                        <div key={j} className="relative group text-left">
                          {/* Timeline circular dot on the vertical line */}
                          <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-blue-500 transition-all z-10 shadow-sm">
                            <div className={`w-2 h-2 rounded-full ${c.dot} group-hover:scale-125 transition-transform`}></div>
                          </div>

                          {/* Content Card */}
                          <div onClick={() => { setDetailForm({ type: "event_detail", mode: "view", data: { device: effectiveDevice, description: item.content, cause: item.result ? "Kết quả kiểm định đạt tiêu chuẩn: " + item.result : "Mốc thời gian quản lý vận hành thiết bị tự động", time: item.date, status: item.result || "Hoàn thành", operator: item.operator } }); }} className="p-4 bg-white rounded-2xl border border-gray-200 hover:shadow-md hover:border-blue-300 hover:bg-slate-50/25 transition-all relative cursor-pointer">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`px-2 py-0.5 rounded text-[7.5pt] font-black uppercase tracking-wider border ${c.bg} ${c.border} ${c.text}`}>
                                    {item.type}
                                  </span>
                                  <span className="text-[9pt] text-gray-400 font-bold font-mono">{item.date}</span>
                                </div>
                                <p className="text-[11.5pt] text-slate-800 font-extrabold leading-snug tracking-tight">
                                  {item.content}
                                </p>
                                
                                <div className="flex items-center justify-between gap-2 text-[8.5pt] mt-2 pt-2 border-t border-gray-100 flex-wrap">
                                  {item.result ? (
                                    <div className="flex items-center gap-1">
                                      <span className="text-gray-700 font-bold uppercase tracking-tighter">Kết quả:</span>
                                      <span className="text-gray-700 font-black uppercase tracking-tight">{item.result}</span>
                                    </div>
                                  ) : (
                                    <div />
                                  )}
                                  <div className="flex items-center gap-1 text-right">
                                    <span className="text-gray-700 font-bold uppercase tracking-tighter">Thực hiện:</span>
                                    {(() => {
                                      const val = item.operator || 'Hệ thống';
                                      const match = val.match(/^([^\(]+)(?:\((.+)\))?/);
                                      if (match) {
                                        const name = match[1].trim();
                                        const title = match[2] ? match[2].trim() : '';
                                        if (title) {
                                          return (
                                            <span className="text-right">
                                              <span className="text-[#164399] font-black">{name}</span>{' '}
                                              <span className="text-gray-450 font-normal">({title})</span>
                                            </span>
                                          );
                                        }
                                      }
                                      if (val === 'Hệ thống' || val === 'Lãnh đạo đơn vị' || val === 'Kỹ sư Trạm') {
                                        return <span className="text-gray-450 font-normal">{val}</span>;
                                      }
                                      return <span className="text-[#164399] font-black">{val}</span>;
                                    })()}
                                  </div>
                                </div>
                              </div>
                              <div className="pt-1.5 shrink-0">
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
