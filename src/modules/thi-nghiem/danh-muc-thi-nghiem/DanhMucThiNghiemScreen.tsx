import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Plus, ListChecks, MoreVertical, Edit, Copy, Shield, Trash2, 
  FileText, Database, ChevronLeft, ChevronRight, Settings, ExternalLink, Box, 
  Activity, Filter, X, Check, Calendar, Clock, AlertCircle, MapPin, Building2, 
  Network, Binary, History, CheckCircle2, AlertTriangle, HelpCircle, Wrench, Zap, Eye,
  Camera, Download, Layers, Sparkles, BookOpen, Upload, Image, ListPlus
} from 'lucide-react';
import { MOCK_TESTING_CATALOG, MOCK_TESTING_DATA } from '../constants';
import { capitalizeBusinessName } from '../../../shared/utils';
import { FileUploader } from '../../../components/FileUploader';
import { DocumentLibraryModal } from '../../../shared/components/common/DocumentLibraryModal';

// Helper to normalize the display type translation
const normalizeType = (type: string) => {
  const t = type?.toUpperCase();
  if (t === 'TBA' || t === 'TRẠM') return 'Trạm';
  if (t === 'ĐD' || t === 'ĐƯỜNG DÂY') return 'Đường dây';
  if (t === 'MC' || t === 'MÁY CẮT') return 'Máy cắt';
  if (t === 'MBA' || t === 'MÁY BIẾN ÁP') return 'Máy biến áp';
  if (t === 'TI' || t === 'BIẾN DÒNG' || t === 'BIẾN DÒNG ĐIỆN') return 'Biến dòng';
  if (t === 'TU' || t === 'BIẾN ĐIỆN ÁP') return 'Biến điện áp';
  if (t === 'DCL' || t === 'DAO CÁCH LY') return 'Dao cách ly';
  if (t === 'CSV' || t === 'CHỐNG SÉT VAN') return 'Chống sét van';
  if (t === 'TU-TI') return 'TU-TI';
  return type;
};

// Helper to construct the full address path for any item, omitting the specific type
const getFullLocationPath = (cat: any) => {
  if (!cat) return "Công ty Điện lực Hưng Yên";
  const loc = cat.location || "";
  if (loc.includes("Phố Nối")) {
    return "Công ty Điện lực Hưng Yên > Tổ thao tác lưu động Phố Nối > TBA 110kV Phố Nối";
  }
  if (loc.includes("Khoái Châu")) {
    return "Công ty Điện lực Hưng Yên > Tổ thao tác lưu động Khoái Châu > TBA 110kV Khoái Châu";
  }
  if (loc.includes("Mỹ Hào")) {
    return "Công ty Điện lực Hưng Yên > Tổ thao tác lưu động Mỹ Hào > TBA 110kV Mỹ Hào";
  }
  if (loc.includes("Kim Động")) {
    return "Công ty Điện lực Hưng Yên > Tổ thao tác lưu động Kim Động > TBA 110kV Kim Động";
  }
  if (loc.includes("Văn Lâm")) {
    return "Công ty Điện lực Hưng Yên > Tổ thao tác lưu động Văn Lâm > TBA 110kV Văn Lâm";
  }
  if (loc.includes("Giai Phạm")) {
    return "Công ty Điện lực Hưng Yên > Tổ thao tác lưu động Giai Phạm > TBA 110kV Giai Phạm";
  }
  if (loc.includes("Thành phố Hưng Yên") || loc.includes("TP Hưng Yên")) {
    return "Công ty Điện lực Hưng Yên > Điện lực Thành phố Hưng Yên";
  }
  return `Công ty Điện lực Hưng Yên > ${loc}`;
};

// Custom visual stylings mapping for each category card
const getCatItemVisual = (type: string, isSelected: boolean) => {
  const normType = normalizeType(type);
  switch (normType) {
    case 'Trạm':
      return {
        icon: <Building2 className={`w-5 h-5 ${isSelected ? 'text-[#164399]' : 'text-blue-500'}`} />,
        bg: isSelected ? 'bg-blue-100/80' : 'bg-blue-50',
        text: 'text-[#164399]'
      };
    case 'Đường dây':
      return {
        icon: <Network className={`w-5 h-5 ${isSelected ? 'text-teal-600' : 'text-teal-500'}`} />,
        bg: isSelected ? 'bg-teal-100/80' : 'bg-teal-50',
        text: 'text-teal-700'
      };
    case 'Máy cắt':
      return {
        icon: <Zap className={`w-5 h-5 ${isSelected ? 'text-amber-600' : 'text-amber-500'}`} />,
        bg: isSelected ? 'bg-amber-100/80' : 'bg-amber-50',
        text: 'text-amber-700'
      };
    case 'Máy biến áp':
      return {
        icon: <Box className={`w-5 h-5 ${isSelected ? 'text-red-600' : 'text-red-500'}`} />,
        bg: isSelected ? 'bg-red-100/80' : 'bg-red-50',
        text: 'text-red-700'
      };
    case 'Biến dòng':
      return {
        icon: <Activity className={`w-5 h-5 ${isSelected ? 'text-indigo-600' : 'text-indigo-500'}`} />,
        bg: isSelected ? 'bg-indigo-100/80' : 'bg-indigo-50',
        text: 'text-indigo-700'
      };
    case 'Biến điện áp':
      return {
        icon: <Binary className={`w-5 h-5 ${isSelected ? 'text-emerald-600' : 'text-emerald-500'}`} />,
        bg: isSelected ? 'bg-emerald-100/80' : 'bg-emerald-50',
        text: 'text-emerald-700'
      };
    case 'Chống sét van':
      return {
        icon: <Shield className={`w-5 h-5 ${isSelected ? 'text-purple-600' : 'text-purple-500'}`} />,
        bg: isSelected ? 'bg-purple-100/80' : 'bg-purple-50',
        text: 'text-purple-700'
      };
    default:
      return {
        icon: <Database className={`w-5 h-5 ${isSelected ? 'text-gray-650' : 'text-gray-500'}`} />,
        bg: isSelected ? 'bg-gray-200/50' : 'bg-gray-50',
        text: 'text-gray-700'
      };
  }
};

// Pre-defined list of standard testing items for electrical machinery
const getStandardItems = (type: string) => {
  const t = type?.toUpperCase();
  if (t === 'MBA' || t === 'MÁY BIẾN ÁP' || t === 'TRẠM') {
    return [
      { id: 'S1', name: 'Đo điện trở cách điện cuộn dây (R60)', unit: 'MΩ', limit: '≥ 2000', standard: 'TCVN 1985-2015' },
      { id: 'S2', name: 'Đo tỷ số biến áp (Tỉ số biến)', unit: '%', limit: '≤ 0.5', standard: 'IEC 60076' },
      { id: 'S3', name: 'Đo điện trở một chiều các cuộn dây', unit: 'mΩ', limit: '≤ 13.0', standard: 'IEEE C57.152' },
      { id: 'S4', name: 'Thử độ bền điện môi dầu cách điện', unit: 'kV', limit: '≥ 35', standard: 'TCVN 7447' },
      { id: 'S5', name: 'Đo chiết suất & hàm lượng mỡ ẩm dầu', unit: 'ppm', limit: '≤ 15', standard: 'IEC 60076-1' }
    ];
  }
  if (t === 'MC' || t === 'MÁY CẮT') {
    return [
      { id: 'S1', name: 'Đo điện trở tiếp xúc cực tiếp điểm chính', unit: 'μΩ', limit: '≤ 50', standard: 'IEC 62271-100' },
      { id: 'S2', name: 'Đo thời gian đóng cắt đồng thời (3 pha)', unit: 'ms', limit: '≤ 45', standard: 'IEEE C37.09' },
      { id: 'S3', name: 'Kiểm tra độ dòng rò rỉ cơ học', unit: 'MΩ', limit: '≥ 5000', standard: 'TCVN 5767' },
      { id: 'S4', name: 'Thử nghiệm áp lực cơ cấu nén lò xo (SF6)', unit: 'MPa', limit: '0.55 ± 0.02', standard: 'NSX standard' }
    ];
  }
  if (t === 'TI' || t === 'BIẾN DÒNG' || t === 'BIẾN DÒNG ĐIỆN') {
    return [
      { id: 'S1', name: 'Đo điện trở cách điện cuộn dây sơ/thứ cấp', unit: 'MΩ', limit: '≥ 1000', standard: 'IEC 61869' },
      { id: 'S2', name: 'Đo góc sai số tỉ số biến dòng (Accuracy class)', unit: '%', limit: '≤ 0.5 (Cl 0.5)', standard: 'TCVN 11845' },
      { id: 'S3', name: 'Kiểm tra đặc tính từ hóa của lõi từ', unit: 'V/A', limit: 'Đặc tuyến bão hòa', standard: 'IEC 61869-2' }
    ];
  }
  if (t === 'TU' || t === 'BIẾN ĐIỆN ÁP') {
    return [
      { id: 'S1', name: 'Đo điện trở cách điện cuộn dây', unit: 'MΩ', limit: '≥ 1000', standard: 'IEC 61869' },
      { id: 'S2', name: 'Thử nghiệm tổn hao điện môi cuộn dây tgδ', unit: '%', limit: '≤ 1.0', standard: 'IEC 60137' },
      { id: 'S3', name: 'Đo tỷ số điện áp biến đổi tỉ lệ', unit: '%', limit: '≤ 0.5 (Cl 0.5)', standard: 'IEEE C57.13' }
    ];
  }
  if (t === 'CSV' || t === 'CHỐNG SÉT VAN') {
    return [
      { id: 'S1', name: 'Đo dòng rò xoay chiều dưới điện áp cực đại', unit: 'μA', limit: '≤ 150', standard: 'IEC 60099-4' },
      { id: 'S2', name: 'Đo điện trở cách điện vỏ sứ và van cách điện', unit: 'MΩ', limit: '≥ 2500', standard: 'TCVN 8097' },
      { id: 'S3', name: 'Kiểm tra thông số kỹ thuật bộ đếm sét', unit: 'Lần', limit: 'Hoạt động nhạy', standard: 'NSX standard' }
    ];
  }
  if (t === 'ĐD' || t === 'ĐƯỜNG DÂY') {
    return [
      { id: 'S1', name: 'Kiểm tra khoảng cách pha-phòng an toàn', unit: 'm', limit: '≥ Quy chuẩn QCVN', standard: 'QCVN 01:2020/BCT' },
      { id: 'S2', name: 'Đo trị số điện trở nối đất cột sắt/cột bê tông', unit: 'Ω', limit: '≤ 10', standard: 'TCVN 4756:1989' },
      { id: 'S3', name: 'Đo điện trở tiếp xúc của mối nối lèo dây', unit: 'μΩ', limit: '≤ 1.2 lần dây nguyên', standard: 'Quy trình EVN' }
    ];
  }
  return [
    { id: 'S1', name: 'Kiểm tra điện trở cách điện vỏ thiết bị', unit: 'MΩ', limit: '≥ 1000', standard: 'IEC 60364' },
    { id: 'S2', name: 'Kiểm tra đo điện trở tiếp xúc mối nối tiếp cực', unit: 'μΩ', limit: 'Tối ưu', standard: 'Quy trình EVN' },
    { id: 'S3', name: 'Kiểm tra độ trơn tru đóng cắt cơ học', unit: 'Lần', limit: 'Trơn hoạt động', standard: 'TCVN' }
  ];
};

interface DanhMucThiNghiemScreenProps {
  setActiveSubMenu: (menu: string | null) => void;
  setDetailForm: (form: any) => void;
  devicePath: string[];
  setPreviewContent?: (content: any) => void;
  activeSubMenu?: string | null;
}

const parseLimits = (limitStr: string) => {
  let lower = '-';
  let upper = '-';
  const trimmed = limitStr.trim();
  if (trimmed.startsWith('≥')) {
    lower = trimmed.replace('≥', '').trim();
  } else if (trimmed.startsWith('≤')) {
    upper = trimmed.replace('≤', '').trim();
  } else if (trimmed.includes('±')) {
    const parts = trimmed.split('±');
    const val = parseFloat(parts[0]);
    const delta = parseFloat(parts[1]);
    if (!isNaN(val) && !isNaN(delta)) {
      lower = (val - delta).toFixed(2);
      upper = (val + delta).toFixed(2);
    } else {
      lower = trimmed;
    }
  } else {
    lower = trimmed;
  }
  return { lower, upper };
};

const renderLimitValue = (limit: string, limitMin?: string, limitMax?: string) => {
  const lm = parseLimits(limit || '');
  const lMin = (limitMin !== undefined && limitMin !== '-') ? limitMin : lm.lower;
  const lMax = (limitMax !== undefined && limitMax !== '-') ? limitMax : lm.upper;

  if (lMin && lMin !== '-' && lMax && lMax !== '-') {
    if (lMin === lMax) return lMin;
    return `${lMin} ~ ${lMax}`;
  }
  if (lMin && lMin !== '-') {
    return `≥ ${lMin}`;
  }
  if (lMax && lMax !== '-') {
    return `≤ ${lMax}`;
  }
  return limit || '-';
};

const getDocIcon = (doc: { category?: string; type?: string; name?: string }) => {
  const category = (doc.category || '').toLowerCase();
  const type = (doc.type || '').toLowerCase();
  
  if (category === 'quy-chuan' || type.includes('quy chuẩn') || type.includes('thông tư')) {
    return <Shield className="w-4 h-4 text-rose-500 animate-pulse" />;
  }
  if (category === 'quy-trinh' || type.includes('quy trình')) {
    return <Activity className="w-4 h-4 text-blue-500" />;
  }
  if (category === 'bieu-mau' || type.includes('biểu mẫu')) {
    return <ListChecks className="w-4 h-4 text-emerald-500" />;
  }
  if (category === 'huong-dan-nsx' || type.includes('hướng dẫn') || type.includes('sách')) {
    return <Wrench className="w-4 h-4 text-amber-500" />;
  }
  return <FileText className="w-4 h-4 text-blue-500" />;
};

const getDeviceOptionsForVoltage = (voltage: string) => {
  if (['500kV', '220kV', '110kV'].includes(voltage)) {
    return [
      { value: 'MBA', label: 'Máy biến áp lực (MBA)' },
      { value: 'MC', label: 'Máy cắt SF6 (MC)' },
      { value: 'TI', label: 'Biến dòng điện cao thế (TI)' },
      { value: 'TU', label: 'Biến điện áp cao thế (TU)' },
      { value: 'CSV', label: 'Chống sét van lớn (CSV)' },
      { value: 'ĐD', label: 'Đường dây truyền tải (ĐD)' },
      { value: 'Other', label: 'Thiết bị cao thế khác' },
    ];
  } else if (['35kV', '22kV', '6kV'].includes(voltage)) {
    return [
      { value: 'MBA', label: 'Máy biến áp trung thế (MBA)' },
      { value: 'MC', label: 'Máy cắt phụ tải / Recloser (MC)' },
      { value: 'TI', label: 'Biến dòng trung thế (TI)' },
      { value: 'TU', label: 'Biến điện áp trung thế (TU)' },
      { value: 'CSV', label: 'Chống sét van trung áp (CSV)' },
      { value: 'ĐD', label: 'Cáp ngầm / Đường dây (ĐD)' },
      { value: 'Other', label: 'Thiết bị trung thế khác' },
    ];
  } else {
    return [
      { value: 'MBA', label: 'Máy biến áp hạ thế (MBA)' },
      { value: 'MC', label: 'Aptomat tổng (ACB / MCCB)' },
      { value: 'TI', label: 'Biến dòng hạ thế (TI)' },
      { value: 'TU', label: 'Bộ đo lường hạ thế' },
      { value: 'CSV', label: 'Thiết bị lọc sét hạ thế' },
      { value: 'ĐD', label: 'Cáp hạ thế (ĐD)' },
      { value: 'Other', label: 'Thiết bị / Phụ trợ hạ thế' },
    ];
  }
};

export const DanhMucThiNghiemScreen = ({
  setActiveSubMenu,
  setDetailForm,
  devicePath,
  setPreviewContent,
  activeSubMenu
}: DanhMucThiNghiemScreenProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'standards' | 'history'>('info');
  const [selectedCatId, setSelectedCatId] = useState<number | null>(MOCK_TESTING_CATALOG[0]?.id || null);
  const [tltbSelectedStdId, setTltbSelectedStdId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [activeTestType, setActiveTestType] = useState<'Thí nghiệm' | 'Kiểm định' | 'Hiệu chuẩn'>('Thí nghiệm');
  const [headerStatusFilter, setHeaderStatusFilter] = useState<'Quá hạn' | 'Đến hạn' | 'Tất cả'>('Quá hạn');
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);

  const handleDocPreview = (doc: any) => {
    if (setPreviewContent) {
      setPreviewContent({
        type: 'file',
        url: '#',
        name: doc.name,
        fileCode: doc.code || 'REF-2026',
        fileDate: '15/06/2026',
        fileSize: doc.size || '0.8 MB',
        fileName: doc.name
      });
    } else {
      setPreviewDoc(doc);
    }
  };

  const handleImgPreview = (imgUrl: string, list: string[], index: number) => {
    if (setPreviewContent) {
      setPreviewContent({
        type: 'image',
        url: imgUrl,
        name: 'HÌNH ẢNH MINH HỌA',
        imagesList: list,
        currentIndex: index
      });
    } else {
      setPreviewImgUrl(imgUrl);
    }
  };

  const [showCatalogsConfig, setShowCatalogsConfig] = useState(false);
  const [configTestType, setConfigTestType] = useState<'Thí nghiệm' | 'Kiểm định' | 'Hiệu chuẩn'>('Thí nghiệm');
  const [configDevType, setConfigDevType] = useState<string>('MBA');

  const [newStdName, setNewStdName] = useState('');
  const [newStdUnit, setNewStdUnit] = useState('');
  const [newStdLimitMin, setNewStdLimitMin] = useState('');
  const [newStdLimitMax, setNewStdLimitMax] = useState('');
  const [newStdStandard, setNewStdStandard] = useState('');
  const [newStdValueType, setNewStdValueType] = useState<'Số' | 'Text' | 'Có/Không'>('Số');
  const [newStdNote, setNewStdNote] = useState('');
  const [newStdSTT, setNewStdSTT] = useState<string>('');
  const [configVoltage, setConfigVoltage] = useState('110kV');

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingStdItem, setEditingStdItem] = useState<any | null>(null);

  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [searchDocQuery, setSearchDocQuery] = useState('');
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('all');

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

  const [docsMap, setDocsMap] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('pmis_reference_docs_map');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      'Thí nghiệm-MBA-110kV': ['D1', 'D2', 'D4'],
      'Thí nghiệm-MC-110kV': ['D1', 'D5'],
      'Thí nghiệm-TI-110kV': ['D6'],
      'Thí nghiệm-TU-110kV': ['D7'],
      'Thí nghiệm-CSV-110kV': ['D8'],
      'Thí nghiệm-ĐD-110kV': ['D9'],
      'Kiểm định-MBA-110kV': ['D3', 'D11'],
      'Hiệu chuẩn-MBA-110kV': ['D12'],
    };
  });

  useEffect(() => {
    localStorage.setItem('pmis_reference_docs_map', JSON.stringify(docsMap));
  }, [docsMap]);

  const [imagesMap, setImagesMap] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('pmis_reference_images_map');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      'Thí nghiệm-MBA-110kV': [
        'https://picsum.photos/seed/mba-1/400/300',
        'https://picsum.photos/seed/mba-2/400/300'
      ],
      'Thí nghiệm-MC-110kV': [
        'https://picsum.photos/seed/mc-1/400/300'
      ],
      'Thí nghiệm-TI-110kV': [
        'https://picsum.photos/seed/ti-1/400/300'
      ],
      'Thí nghiệm-TU-110kV': [
        'https://picsum.photos/seed/tu-1/400/300'
      ],
      'Thí nghiệm-CSV-110kV': [
        'https://picsum.photos/seed/csv-1/400/300'
      ],
      'Thí nghiệm-ĐD-110kV': [
        'https://picsum.photos/seed/dd-1/400/300'
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('pmis_reference_images_map', JSON.stringify(imagesMap));
  }, [imagesMap]);

  const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(null);

  const handleAddImageToConfig = () => {
    const configKey = `${configTestType}-${configDevType}-${configVoltage}`;
    const currentImages = imagesMap[configKey] || [];
    const nextIdx = currentImages.length + 1;
    const newImg = `https://picsum.photos/seed/ref-img-${nextIdx}-${Date.now()}/400/300`;
    setImagesMap(prev => ({
      ...prev,
      [configKey]: [...currentImages, newImg]
    }));
  };

  const handleRemoveImageFromConfig = (imgUrl: string) => {
    const configKey = `${configTestType}-${configDevType}-${configVoltage}`;
    const currentImages = imagesMap[configKey] || [];
    setImagesMap(prev => ({
      ...prev,
      [configKey]: currentImages.filter(img => img !== imgUrl)
    }));
  };

  const handleAddDocToConfig = (docId: string) => {
    const configKey = `${configTestType}-${configDevType}-${configVoltage}`;
    const currentDocs = docsMap[configKey] || [];
    if (!currentDocs.includes(docId)) {
      setDocsMap(prev => ({
        ...prev,
        [configKey]: [...currentDocs, docId]
      }));
    }
  };

  const handleRemoveDocFromConfig = (docId: string) => {
    const configKey = `${configTestType}-${configDevType}-${configVoltage}`;
    const currentDocs = docsMap[configKey] || [];
    setDocsMap(prev => ({
      ...prev,
      [configKey]: currentDocs.filter(id => id !== docId)
    }));
  };

  const [standardsMap, setStandardsMap] = useState<Record<string, any[]>>(() => {
    const saved = localStorage.getItem('pmis_custom_standards_map');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    const initial: Record<string, any[]> = {};
    const types = ['MBA', 'MC', 'TI', 'TU', 'CSV', 'ĐD', 'Other'];
    const categories = ['Thí nghiệm', 'Kiểm định', 'Hiệu chuẩn'];
    categories.forEach(cat => {
      types.forEach(ty => {
        initial[`${cat}-${ty}`] = getStandardItems(ty).map(item => ({
          ...item,
          name: cat === 'Kiểm định' ? item.name.replace('Đo ', 'Kiểm định ').replace('Thử ', 'Kiểm định ') : cat === 'Hiệu chuẩn' ? item.name.replace('Đo ', 'Hiệu chuẩn ').replace('Thử ', 'Hiệu chuẩn ') : item.name,
          limitMin: item.limit.startsWith('≥') ? item.limit.replace('≥', '').trim() : item.limit.startsWith('≤') ? '-' : item.limit.includes('~') ? item.limit.split('~')[0].trim() : item.limit,
          limitMax: item.limit.startsWith('≤') ? item.limit.replace('≤', '').trim() : item.limit.startsWith('≥') ? '-' : item.limit.includes('~') ? item.limit.split('~')[1].trim() : '-',
          valueType: 'Số',
          note: ty === 'MC' ? 'Độ nhạy cao' : 'Tiêu chuẩn ngành đạt'
        }));
      });
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('pmis_custom_standards_map', JSON.stringify(standardsMap));
  }, [standardsMap]);

  // ==========================================
  // CONFIGURATION FOR HẠNG MỤC & THÔNG SỐ THÍ NGHIỆM FORM
  // ==========================================
  const MOCK_DEVICE_TYPES = [
    { id: 'MBA-110kV', code: 'MBA', name: 'Máy biến áp lực', voltage: '110kV', category: 'Cao Áp', updatedAt: '18/06/2026', updatedBy: 'Lê Thế Hải', iconType: 'MBA' },
    { id: 'MC-110kV', code: 'MC', name: 'Máy cắt SF6', voltage: '110kV', category: 'Cao Áp', updatedAt: '12/06/2026', updatedBy: 'Phạm Minh Nam', iconType: 'MC' },
    { id: 'TI-110kV', code: 'TI', name: 'Biến dòng điện cao thế', voltage: '110kV', category: 'Cao Áp', updatedAt: '10/06/2026', updatedBy: 'Phạm Minh Nam', iconType: 'TI' },
    { id: 'TU-110kV', code: 'TU', name: 'Biến điện áp cao thế', voltage: '110kV', category: 'Cao Áp', updatedAt: '10/06/2026', updatedBy: 'Phạm Minh Nam', iconType: 'TU' },

    { id: 'MBA-35kV', code: 'MBA', name: 'Máy biến áp trung thế', voltage: '35kV', category: 'Trung Áp', updatedAt: '18/06/2026', updatedBy: 'Trần Bình Minh', iconType: 'MBA' },
    { id: 'MC-35kV', code: 'MC', name: 'Máy cắt phụ tải / Recloser', voltage: '35kV', category: 'Trung Áp', updatedAt: '14/06/2026', updatedBy: 'Kiều Minh Tuấn', iconType: 'MC' },
    { id: 'TI-35kV', code: 'TI', name: 'Biến dòng trung thế', voltage: '35kV', category: 'Trung Áp', updatedAt: '12/06/2026', updatedBy: 'Kiều Minh Tuấn', iconType: 'TI' },
    { id: 'TU-35kV', code: 'TU', name: 'Biến điện áp trung thế', voltage: '35kV', category: 'Trung Áp', updatedAt: '12/06/2026', updatedBy: 'Kiều Minh Tuấn', iconType: 'TU' },
    { id: 'CSV-35kV', code: 'CSV', name: 'Chống sét van trung áp', voltage: '35kV', category: 'Trung Áp', updatedAt: '10/06/2026', updatedBy: 'Trần Bính Minh', iconType: 'CSV' },
    { id: 'MBA-22kV', code: 'MBA', name: 'Máy biến áp trung thế', voltage: '22kV', category: 'Trung Áp', updatedAt: '18/06/2026', updatedBy: 'Trần Bình Minh', iconType: 'MBA' },
    { id: 'MC-22kV', code: 'MC', name: 'Máy cắt phụ tải / Recloser', voltage: '22kV', category: 'Trung Áp', updatedAt: '15/06/2026', updatedBy: 'Đỗ Đức Thảo', iconType: 'MC' },
    { id: 'ĐD-22kV', code: 'ĐD', name: 'Cáp ngầm / Đường dây', voltage: '22kV', category: 'Trung Áp', updatedAt: '09/06/2026', updatedBy: 'Đỗ Đức Thảo', iconType: 'ĐD' },
    { id: 'MBA-6kV', code: 'MBA', name: 'Máy biến áp trung thế', voltage: '6kV', category: 'Trung Áp', updatedAt: '11/06/2026', updatedBy: 'Nguyễn Tiến Dũng', iconType: 'MBA' },
    { id: 'MC-6kV', code: 'MC', name: 'Máy cắt phụ tải', voltage: '6kV', category: 'Trung Áp', updatedAt: '11/06/2026', updatedBy: 'Nguyễn Tiến Dũng', iconType: 'MC' },

    { id: 'MBA-0.4kV', code: 'MBA', name: 'Máy biến áp hạ thế', voltage: '0.4kV', category: 'Hạ Áp', updatedAt: '18/06/2026', updatedBy: 'Lê Hoàng Dương', iconType: 'MBA' },
    { id: 'MC-0.4kV', code: 'MC', name: 'Aptomat tổng (ACB/MCCB)', voltage: '0.4kV', category: 'Hạ Áp', updatedAt: '15/06/2026', updatedBy: 'Lê Hoàng Dương', iconType: 'MC' },
    { id: 'TI-0.4kV', code: 'TI', name: 'Biến dòng hạ thế', voltage: '0.4kV', category: 'Hạ Áp', updatedAt: '12/06/2026', updatedBy: 'Đỗ Tiến Minh', iconType: 'TI' },
    { id: 'ĐD-0.4kV', code: 'ĐD', name: 'Cáp hạ thế', voltage: '0.4kV', category: 'Hạ Áp', updatedAt: '10/06/2026', updatedBy: 'Đỗ Tiến Minh', iconType: 'ĐD' }
  ];

  const getDefaultParamsForCatalog = (catalogName: string, catalogId: string): any[] => {
    const nameLower = catalogName.toLowerCase();
    if (nameLower.includes('cách điện') || nameLower.includes('r60')) {
      return [
        { id: `${catalogId}-p1`, catalogId, stt: '1', name: 'Điện trở cách điện R15s', unit: 'MΩ', measureType: 'Nhập Số', limit: '≥ 2000', standard: 'TCVN 1985-2015', note: 'Đo cuộn Cao - Hạ' },
        { id: `${catalogId}-p2`, catalogId, stt: '2', name: 'Điện trở cách điện R60s', unit: 'MΩ', measureType: 'Nhập Số', limit: '≥ 2000', standard: 'TCVN 1985-2015', note: 'Đo cuộn Cao - Đất' },
        { id: `${catalogId}-p3`, catalogId, stt: '3', name: 'Hệ số hấp thụ (R60/R15)', unit: '-', measureType: 'Nhập Số', limit: '≥ 1.3', standard: 'TCVN 1985-2015', note: 'Đánh giá ẩm' }
      ];
    }
    if (nameLower.includes('dầu') || nameLower.includes('độ bền điện môi')) {
      return [
        { id: `${catalogId}-p1`, catalogId, stt: '1', name: 'Điện áp chọc thủng lần 1', unit: 'kV', measureType: 'Nhập Số', limit: '≥ 35', standard: 'TCVN 7447', note: 'Cốc đo tiêu chuẩn tầm 2.5mm' },
        { id: `${catalogId}-p2`, catalogId, stt: '2', name: 'Điện áp chọc thủng lần 2', unit: 'kV', measureType: 'Nhập Số', limit: '≥ 35', standard: 'TCVN 7447', note: 'Khoảng cách giữa các điện cực cách đều' },
        { id: `${catalogId}-p3`, catalogId, stt: '3', name: 'Điện áp phóng chọc thủng trung bình', unit: 'kV', measureType: 'Nhập Số', limit: '≥ 35', standard: 'TCVN 7447', note: 'Lấy trung bình cộng 6 lần đo' }
      ];
    }
    if (nameLower.includes('tỷ số') || nameLower.includes('tỉ số')) {
      return [
        { id: `${catalogId}-p1`, catalogId, stt: '1', name: 'Tỷ số biến áp nấc 1', unit: '%', measureType: 'Nhập Số', limit: '≤ 0.5', standard: 'IEC 60076', note: 'Nấc định mức cao' },
        { id: `${catalogId}-p2`, catalogId, stt: '2', name: 'Tỷ số biến áp nấc 2', unit: '%', measureType: 'Nhập Số', limit: '≤ 0.5', standard: 'IEC 60076', note: 'Kiểm tra độ cân pha cuộn dây' },
        { id: `${catalogId}-p3`, catalogId, stt: '3', name: 'Tỷ số biến áp nấc 3', unit: '%', measureType: 'Nhập Số', limit: '≤ 0.5', standard: 'IEC 60076', note: 'So sánh sai lệch giữa các phase' }
      ];
    }
    if (nameLower.includes('tiếp xúc') || nameLower.includes('điện trở tiếp xúc')) {
      return [
        { id: `${catalogId}-p1`, catalogId, stt: '1', name: 'Điện trở tiếp xúc Pha A', unit: 'μΩ', measureType: 'Nhập Số', limit: '≤ 50', standard: 'IEC 62271', note: 'Bơm dòng DC 100A' },
        { id: `${catalogId}-p2`, catalogId, stt: '2', name: 'Điện trở tiếp xúc Pha B', unit: 'μΩ', measureType: 'Nhập Số', limit: '≤ 50', standard: 'IEC 62271', note: 'Bơm dòng DC 100A' },
        { id: `${catalogId}-p3`, catalogId, stt: '3', name: 'Điện trở tiếp xúc Pha C', unit: 'μΩ', measureType: 'Nhập Số', limit: '≤ 50', standard: 'IEC 62271', note: 'Mối tiếp xúc chính' }
      ];
    }
    if (nameLower.includes('một chiều') || nameLower.includes('điện trở một chiều')) {
      return [
        { id: `${catalogId}-p1`, catalogId, stt: '1', name: 'Điện trở một chiều cuộn Cao Pha A-B', unit: 'mΩ', measureType: 'Nhập Số', limit: '≤ 13.0', standard: 'IEEE C57.152', note: 'Quấn chắc chắn kẹp dòng đo' },
        { id: `${catalogId}-p2`, catalogId, stt: '2', name: 'Điện trở một chiều cuộn Cao Pha B-C', unit: 'mΩ', measureType: 'Nhập Số', limit: '≤ 13.0', standard: 'IEEE C57.152', note: 'Đo ở trạng thái ổn định cơ nhiệt' },
        { id: `${catalogId}-p3`, catalogId, stt: '3', name: 'Điện trở một chiều cuộn Cao Pha C-A', unit: 'mΩ', measureType: 'Nhập Số', limit: '≤ 13.0', standard: 'IEEE C57.152', note: 'Quy đổi về nhiệt độ danh định' }
      ];
    }
    return [
      { id: `${catalogId}-p1`, catalogId, stt: '1', name: `Thông số hiệu chuẩn: ${catalogName} - Trị số phụ`, unit: 'V', measureType: 'Nhập Số', limit: 'Đạt', standard: 'TCVN', note: 'Tiêu chuẩn ngành điện lực' },
      { id: `${catalogId}-p2`, catalogId, stt: '2', name: `Trực quan chi tiết cơ khí: ${catalogName}`, unit: '-', measureType: 'Có/Một', limit: 'Có', standard: 'TCVN', note: 'Không nứt mẻ vỏ' }
    ];
  };

  // State hooks for "Thiết lập hạng mục"
  const [tlhm_testType, setTlhm_testType] = useState<'Thí nghiệm' | 'Kiểm định' | 'Hiệu chuẩn'>('Thí nghiệm');
  const [tlhm_searchQuery, setTlhm_searchQuery] = useState('');
  const [tlhm_voltageTab, setTlhm_voltageTab] = useState<'110kV' | '6->35kV' | '< 6kV'>('110kV');
  const [tlhm_selectedDevice, setTlhm_selectedDevice] = useState<any>(MOCK_DEVICE_TYPES[0]);
  const [tlhm_selectedCatalog, setTlhm_selectedCatalog] = useState<any>(null);
  const [tlhm_selectedSupCatalog, setTlhm_selectedSupCatalog] = useState<any>(null);

  const [tlhm_paramsMap, setTlhm_paramsMap] = useState<Record<string, any[]>>(() => {
    const saved = localStorage.getItem('pmis_custom_params_map_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('pmis_custom_params_map_v2', JSON.stringify(tlhm_paramsMap));
  }, [tlhm_paramsMap]);

  // Synchronize Hạng mục list based on active device Selection
  useEffect(() => {
    if (tlhm_selectedDevice) {
      const catalogs = standardsMap[`${tlhm_testType}-${tlhm_selectedDevice.code}`] || [];
      if (catalogs.length > 0) {
        setTlhm_selectedCatalog(catalogs[0]);
      } else {
        setTlhm_selectedCatalog(null);
      }
      setTlhm_selectedSupCatalog(null);
    }
  }, [tlhm_testType, tlhm_selectedDevice, standardsMap]);

  // Default parameters generator helper
  const getParamsList = (catalog: any) => {
    if (!catalog) return [];
    if (tlhm_paramsMap[catalog.id]) {
      return tlhm_paramsMap[catalog.id];
    }
    return getDefaultParamsForCatalog(catalog.name, catalog.id);
  };

  // Master template tables for choosing from lists
  const MASTER_CATALOGS_TEMPLATE = [
    { id: 'MC-TEM-1', code: 'MBA-01', name: 'Đo điện trở cách điện các cuộn dây', voltage: '110kV', deviceType: 'MBA', valueType: 'Đạt/Không đạt', note: 'Thực hiện phép đo bằng Megomet ở các cấp điện áp 1000V/2500V' },
    { id: 'MC-TEM-2', code: 'MBA-02', name: 'Đo điện trở một chiều các cuộn dây', voltage: '110kV', deviceType: 'MBA', valueType: 'Nhập Text', note: 'Sử dụng cầu đo một chiều điện tử kỹ thuật số ổn định cao' },
    { id: 'MC-TEM-3', code: 'MBA-03', name: 'Xác định tổ đấu dây và tỷ số biến áp', voltage: '110kV', deviceType: 'MBA', valueType: 'Đạt/Không đạt', note: 'Xác định sai số tỷ số biến và kiểm tra cực tính tổ đấu dây' },
    { id: 'MC-TEM-4', code: 'MBA-04', name: 'Đo tổn hao không tải và dòng điện không tải', voltage: '110kV', deviceType: 'MBA', valueType: 'Nhập Text', note: 'Áp dụng phương pháp gián tiếp theo tiêu chuẩn ngành' },
    { id: 'MC-TEM-5', code: 'MBA-05', name: 'Đo điện dung và Tang delta cuộn dây', voltage: '110kV', deviceType: 'MBA', valueType: 'Nhập Text', note: 'Hệ thống đo tang delta lắp đặt đúng vị trí nhiễu từ thấp' },
    { id: 'MC-TEM-6', code: 'MBA-06', name: 'Kiểm tra độ bền cách điện của dầu biến áp', voltage: '110kV', deviceType: 'MBA', valueType: 'Nhập Text', note: 'Chọc thủng 6 lần liên tiếp lấy giá trị trung bình cộng' },
    { id: 'MC-TEM-7', code: 'MC-01', name: 'Đo điện trở cách điện mạch động lực', voltage: '110kV', deviceType: 'MC', valueType: 'Đạt/Không đạt', note: 'Sử dụng Megomet đo ở trạng thái máy cắt đóng hoàn toàn' },
    { id: 'MC-TEM-8', code: 'MC-02', name: 'Đo điện trở tiếp xúc mạch vòng cực máy cắt', voltage: '110kV', deviceType: 'MC', valueType: 'Nhập Text', note: 'Áp dòng 100A DC đo sụt áp trực tiếp qua các cực' },
    { id: 'MC-TEM-9', code: 'MC-03', name: 'Đo thời gian đóng, cắt và độ đồng thời', voltage: '110kV', deviceType: 'MC', valueType: 'Nhập Text', note: 'Sử dụng thiết bị chuyên dụng giám sát chu kỳ cơ khí chuyển động' },
    { id: 'MC-TEM-10', code: 'MC-04', name: 'Kiểm tra áp lực khí SF6 và rơ le mật độ', voltage: '110kV', deviceType: 'MC', valueType: 'Đạt/Không đạt', note: 'Đọc trị số đồng hồ áp lực SF6 quy đổi về nhiệt độ tiêu chuẩn 20 độ C' },
    { id: 'MC-TEM-11', code: 'TI-01', name: 'Đo điện trở cách điện sơ cấp và thứ cấp TI', voltage: '110kV', deviceType: 'TI', valueType: 'Đạt/Không đạt', note: 'Thực hiện đo bằng đồng hồ cách điện 2500V' },
    { id: 'MC-TEM-12', code: 'TI-02', name: 'Kiểm tra tỷ số biến dòng và cực tính TI', voltage: '110kV', deviceType: 'TI', valueType: 'Đạt/Không đạt', note: 'Bảo đảm kết nối cuộn dây phụ đúng sơ đồ thiết kế lắp đặt kỹ thuật' },
    { id: 'MC-TEM-13', code: 'TI-03', name: 'Đo đặc tính vôn-ampe cuộn thứ cấp TI', voltage: '110kV', deviceType: 'TI', valueType: 'Nhập Text', note: 'Sử dụng máy thử chuyên dụng vẽ biểu đồ bão hòa lõi thép' },
    { id: 'MC-TEM-14', code: 'TU-01', name: 'Đo điện trở cách điện cuộn sơ cấp và thứ cấp TU', voltage: '110kV', deviceType: 'TU', valueType: 'Đạt/Không đạt', note: 'Cách ly hoàn toàn các kết nối phụ tải thứ cấp trước khi cấp nguồn đo' },
    { id: 'MC-TEM-15', code: 'CSV-01', name: 'Đo điện trở cách điện chống sét van CSV', voltage: '110kV', deviceType: 'CSV', valueType: 'Nhập Text', note: 'Không thực hiện đo khi độ ẩm môi trường không khí vượt quá 80%' },
    { id: 'MC-TEM-16', code: 'CSV-02', name: 'Đo dòng điện rò xoay chiều ở điện áp vận hành', voltage: '110kV', deviceType: 'CSV', valueType: 'Nhập Text', note: 'Phân tích thành phần dòng rò trở kháng bằng thiết bị chuyên dùng' },
    { id: 'MC-TEM-17', code: 'DCL-01', name: 'Kiểm tra tiếp xúc lưỡi dao và đo điện trở tiếp xúc', voltage: '110kV', deviceType: 'DCL', valueType: 'Nhập Text', note: 'Tăng lực ép lưỡi dao chính xác theo quy trình nhà chế tạo' },
    { id: 'MC-TEM-18', code: 'DCL-02', name: 'Kiểm tra cơ cấu truyền động và khóa liên động', voltage: '110kV', deviceType: 'DCL', valueType: 'Đạt/Không đạt', note: 'Bôi trơn các bánh răng khớp nối cơ khí định kỳ đầy đủ' }
  ];

  const MASTER_PARAMS_TEMPLATE = [
    { id: 'MP-TEM-1', stt: '1', name: 'Điện trở cách điện RCĐ cuộn Cao - Hạ (R60)', unit: 'MΩ', measureType: 'Nhập Số', limit: '>= 1000 MΩ', standard: 'TCVN', deviceType: 'MBA', voltage: '110kV' },
    { id: 'MP-TEM-2', stt: '2', name: 'Tỷ số hấp thụ Cuộn Cao - Hạ (R60/R15)', unit: '-', measureType: 'Nhập Số', limit: '>= 1.3', standard: 'TCVN', deviceType: 'MBA', voltage: '110kV' },
    { id: 'MP-TEM-3', stt: '3', name: 'Điện trở cách điện RCĐ cuộn Cao - Đất (R60)', unit: 'MΩ', measureType: 'Nhập Số', limit: '>= 1000 MΩ', standard: 'TCVN', deviceType: 'MBA', voltage: '110kV' },
    { id: 'MP-TEM-4', stt: '4', name: 'Điện trở một chiều cuộn dây pha A (R_A)', unit: 'mΩ', measureType: 'Nhập Số', limit: 'Sai số < 2% so với NSX', standard: 'TCVN', deviceType: 'MBA', voltage: '110kV' },
    { id: 'MP-TEM-5', stt: '5', name: 'Điện trở một chiều cuộn dây pha B (R_B)', unit: 'mΩ', measureType: 'Nhập Số', limit: 'Sai số < 2% so với NSX', standard: 'TCVN', deviceType: 'MBA', voltage: '110kV' },
    { id: 'MP-TEM-6', stt: '6', name: 'Điện trở một chiều cuộn dây pha C (R_C)', unit: 'mΩ', measureType: 'Nhập Số', limit: 'Sai số < 2% so với NSX', standard: 'TCVN', deviceType: 'MBA', voltage: '110kV' },
    { id: 'MP-TEM-7', stt: '7', name: 'Tổn hao tang delta cuộn dây cao áp', unit: '%', measureType: 'Nhập Số', limit: '<= 0.5%', standard: 'TCVN 1985', deviceType: 'MBA', voltage: '110kV' },
    { id: 'MP-TEM-8', stt: '8', name: 'Điện dung cuộn dây cuộn cao áp', unit: 'pF', measureType: 'Nhập Số', limit: 'Sai số < 5% so với NSX', standard: 'TCVN 1985', deviceType: 'MBA', voltage: '110kV' },
    { id: 'MP-TEM-9', stt: '9', name: 'Độ bền điện môi dầu biến áp chọc thủng', unit: 'kV', measureType: 'Nhập Số', limit: '>= 55 kV', standard: 'IEC 60156', deviceType: 'MBA', voltage: '110kV' },
    { id: 'MP-TEM-10', stt: '10', name: 'Chỉ số acid trong dầu máy biến áp', unit: 'mgKOH/g', measureType: 'Nhập Số', limit: '<= 0.1 mgKOH/g', standard: 'TCVN', deviceType: 'MBA', voltage: '110kV' },
    
    { id: 'MP-TEM-11', stt: '1', name: 'Điện trở cách điện cực mở mạch lực', unit: 'GΩ', measureType: 'Nhập Số', limit: '>= 10 GΩ', standard: 'TCVN', deviceType: 'MC', voltage: '110kV' },
    { id: 'MP-TEM-12', stt: '2', name: 'Điện trở tiếp xúc cực pha A', unit: 'µΩ', measureType: 'Nhập Số', limit: '<= 50 µΩ', standard: 'NSX', deviceType: 'MC', voltage: '110kV' },
    { id: 'MP-TEM-13', stt: '3', name: 'Điện trở tiếp xúc cực pha B', unit: 'µΩ', measureType: 'Nhập Số', limit: '<= 50 µΩ', standard: 'NSX', deviceType: 'MC', voltage: '110kV' },
    { id: 'MP-TEM-14', stt: '4', name: 'Điện trở tiếp xúc cực pha C', unit: 'µΩ', measureType: 'Nhập Số', limit: '<= 50 µΩ', standard: 'NSX', deviceType: 'MC', voltage: '110kV' },
    { id: 'MP-TEM-15', stt: '5', name: 'Thời gian cắt pha A', unit: 'ms', measureType: 'Nhập Số', limit: '<= 35 ms', standard: 'NSX', deviceType: 'MC', voltage: '110kV' },
    { id: 'MP-TEM-16', stt: '6', name: 'Thời gian cắt pha B', unit: 'ms', measureType: 'Nhập Số', limit: '<= 35 ms', standard: 'NSX', deviceType: 'MC', voltage: '110kV' },
    { id: 'MP-TEM-17', stt: '7', name: 'Thời gian cắt pha C', unit: 'ms', measureType: 'Nhập Số', limit: '<= 35 ms', standard: 'NSX', deviceType: 'MC', voltage: '110kV' },
    { id: 'MP-TEM-18', stt: '8', name: 'Độ không đồng thời đóng', unit: 'ms', measureType: 'Nhập Số', limit: '<= 4 ms', standard: 'TCVN', deviceType: 'MC', voltage: '110kV' },
    
    { id: 'MP-TEM-19', stt: '1', name: 'Điện trở cách điện cuộn sơ cấp với vỏ', unit: 'GΩ', measureType: 'Nhập Số', limit: '>= 5 GΩ', standard: 'TCVN', deviceType: 'TI', voltage: '110kV' },
    { id: 'MP-TEM-20', stt: '2', name: 'Điện trở cách điện cuộn thứ cấp với vỏ', unit: 'MΩ', measureType: 'Nhập Số', limit: '>= 50 MΩ', standard: 'TCVN', deviceType: 'TI', voltage: '110kV' },
    { id: 'MP-TEM-21', stt: '3', name: 'Điện trở một chiều cuộn sơ cấp TI', unit: 'mΩ', measureType: 'Nhập Số', limit: 'Sai số < 10% so với NSX', standard: 'TCVN', deviceType: 'TI', voltage: '110kV' },
    { id: 'MP-TEM-22', stt: '4', name: 'Điện trở một chiều cuộn thứ cấp đo lường', unit: 'Ω', measureType: 'Nhập Số', limit: 'Sai số < 5%', standard: 'NSX', deviceType: 'TI', voltage: '110kV' },
    
    { id: 'MP-TEM-23', stt: '1', name: 'Điện trở cách điện phần tử chống sét van', unit: 'GΩ', measureType: 'Nhập Số', limit: '>= 2 GΩ', standard: 'TCVN', deviceType: 'CSV', voltage: '110kV' },
    { id: 'MP-TEM-24', stt: '2', name: 'Dòng điện rò một chiều ở điện áp định mức', unit: 'µA', measureType: 'Nhập Số', limit: '<= 50 µA', standard: 'NSX', deviceType: 'CSV', voltage: '110kV' },
    { id: 'MP-TEM-25', stt: '3', name: 'Dòng điện rò xoay chiều tổng ở điện áp vận hành', unit: 'mA', measureType: 'Nhập Số', limit: '<= 2 mA', standard: 'TCVN', deviceType: 'CSV', voltage: '110kV' }
  ];

  // Shared library target state
  const [libraryTarget, setLibraryTarget] = useState<'global' | 'hm' | 'ts'>('global');

  // Add category & param modal states
  const [showAddHmModal, setShowAddHmModal] = useState(false);
  const [showAddTsModal, setShowAddTsModal] = useState(false);
  
  const [editingHmItem, setEditingHmItem] = useState<any>(null);
  const [isHmViewMode, setIsHmViewMode] = useState(false);
  const [editingTsItem, setEditingTsItem] = useState<any>(null);
  const [isTsViewMode, setIsTsViewMode] = useState(false);

  // States for attached docs and images inside the Add/Edit HM modal
  const [hmAttachedDocs, setHmAttachedDocs] = useState<any[]>([
    { id: 'hm-doc-1', name: 'Quy trinh thi nghiem - MBA.pdf', size: '420 KB', type: 'Quy trình' },
    { id: 'hm-doc-2', name: 'Tieu chuan quoc gia TCVN Quy Chuan.pdf', size: '1.5 MB', type: 'TCVN' }
  ]);
  const [hmAttachedImages, setHmAttachedImages] = useState<string[]>([
    'https://picsum.photos/seed/soce-mba/800/600'
  ]);

  // States for attached docs and images inside the Add/Edit TS modal
  const [tsAttachedDocs, setTsAttachedDocs] = useState<any[]>([
    { id: 'ts-doc-1', name: 'Giay_chung_nhan_hieu_chuan_MBA.pdf', size: '250 KB', type: 'Hướng dẫn' }
  ]);
  const [tsAttachedImages, setTsAttachedImages] = useState<string[]>([
    'https://picsum.photos/seed/soce-thong-so-mba/800/600'
  ]);

  // Hidden File Inputs Refs
  const fileInputRefHmDoc = React.useRef<HTMLInputElement>(null);
  const fileInputRefHmImg = React.useRef<HTMLInputElement>(null);
  const fileInputRefTsDoc = React.useRef<HTMLInputElement>(null);
  const fileInputRefTsImg = React.useRef<HTMLInputElement>(null);

  // Upload actions with mock fallback (prevents sandbox issues)
  const handleHmDocUploadSimulated = (e?: React.ChangeEvent<HTMLInputElement>) => {
    let fileName = '';
    let fileSize = '';
    if (e && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      fileName = file.name;
      fileSize = (file.size / 1024 / 1024).toFixed(1) + ' MB';
    } else {
      const codeType = tlhm_selectedDevice?.code || 'MBA';
      const mockNames = [
        `Quy_trinh_hieu_chuan_online_${codeType}_v2.pdf`,
        `Huong_dan_ky_thuat_kiem_tra_${codeType}.pdf`,
        `Tieu_chuan_kiem_dinh_${codeType}_nguon_cap.pdf`
      ];
      fileName = mockNames[Math.floor(Math.random() * mockNames.length)];
      fileSize = (0.5 + Math.random() * 2).toFixed(1) + ' MB';
    }
    const newDoc = {
      id: `D-UPLOAD-${Date.now()}`,
      name: fileName,
      category: 'quy-trinh',
      type: 'Tải lên',
      size: fileSize,
      code: 'REF-' + Math.floor(Math.random() * 1000)
    };
    setHmAttachedDocs(prev => [...prev, newDoc]);
  };

  const handleHmImgUploadSimulated = (e?: React.ChangeEvent<HTMLInputElement>) => {
    let imgUrl = '';
    if (e && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      imgUrl = URL.createObjectURL(file);
    } else {
      const seedVal = Math.floor(Math.random() * 50) + 1;
      imgUrl = `https://picsum.photos/seed/ref-img-upload-${seedVal}/800/600`;
    }
    setHmAttachedImages(prev => [...prev, imgUrl]);
  };

  const handleTsDocUploadSimulated = (e?: React.ChangeEvent<HTMLInputElement>) => {
    let fileName = '';
    let fileSize = '';
    if (e && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      fileName = file.name;
      fileSize = (file.size / 1024 / 1024).toFixed(1) + ' MB';
    } else {
      const codeType = tlhm_selectedDevice?.code || 'MBA';
      const mockNames = [
        `Phieu_kiem_dinh_hieu_chuan_${codeType}_dat_chuan.pdf`,
        `Duyet_phuong_an_thi_nghiem_${codeType}.pdf`,
        `Chung_chi_giam_dinh_${codeType}_TCVN.pdf`
      ];
      fileName = mockNames[Math.floor(Math.random() * mockNames.length)];
      fileSize = (0.3 + Math.random() * 1.5).toFixed(1) + ' MB';
    }
    const newDoc = {
      id: `D-UPLOAD-TS-${Date.now()}`,
      name: fileName,
      category: 'bieu-mau',
      type: 'Tải lên',
      size: fileSize,
      code: 'REF-TS-' + Math.floor(Math.random() * 1000)
    };
    setTsAttachedDocs(prev => [...prev, newDoc]);
  };

  const handleTsImgUploadSimulated = (e?: React.ChangeEvent<HTMLInputElement>) => {
    let imgUrl = '';
    if (e && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      imgUrl = URL.createObjectURL(file);
    } else {
      const seedVal = Math.floor(Math.random() * 50) + 1;
      imgUrl = `https://picsum.photos/seed/ref-ts-upload-${seedVal}/800/600`;
    }
    setTsAttachedImages(prev => [...prev, imgUrl]);
  };

  // Middle Column "Choose category from template list" modal state
  const [showAddHmFromListModal, setShowAddHmFromListModal] = useState(false);
  const [hmListVoltageFilter, setHmListVoltageFilter] = useState('Tất cả');
  const [hmListDeviceTypeFilter, setHmListDeviceTypeFilter] = useState('Tất cả');
  const [hmListSearchQuery, setHmListSearchQuery] = useState('');
  const [hmListSelectedIds, setHmListSelectedIds] = useState<string[]>([]);

  // Right Column "Choose parameter from template list" modal state
  const [showAddTsFromListModal, setShowAddTsFromListModal] = useState(false);
  const [tsListVoltageFilter, setTsListVoltageFilter] = useState('Tất cả');
  const [tsListDeviceTypeFilter, setTsListDeviceTypeFilter] = useState('Tất cả');
  const [tsListSearchQuery, setTsListSearchQuery] = useState('');
  const [tsListSelectedIds, setTsListSelectedIds] = useState<string[]>([]);

  // Input states for Add Hạng Mục modal
  const [newHmSTT, setNewHmSTT] = useState('');
  const [newHmName, setNewHmName] = useState('');
  const [newHmValueType, setNewHmValueType] = useState<'Đạt/Không đạt' | 'Nhập Text'>('Đạt/Không đạt');
  const [newHmNote, setNewHmNote] = useState('');

  // Input states for Add Thông Số modal
  const [newTsSTT, setNewTsSTT] = useState('');
  const [newTsName, setNewTsName] = useState('');
  const [newTsUnit, setNewTsUnit] = useState('');
  const [newTsMeasureType, setNewTsMeasureType] = useState<'Nhập Số' | 'Có/Không' | 'Nhập Text'>('Nhập Số');
  const [newTsLimit, setNewTsLimit] = useState('');
  const [newTsStandard, setNewTsStandard] = useState('');
  const [newTsNote, setNewTsNote] = useState('');

  const [localConfirmAction, setLocalConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Superior Regulations helper functions at component level
  const getSuperiorCatalogs = (deviceCode: string) => {
    if (deviceCode === 'MBA') {
      return [
        { id: 'sup-hm-mba-1', stt: '1', name: 'Đo điện trở một chiều cuộn dây ở nhiệt độ hiện tại', note: 'Quy định EVN số 123/QĐ-EVN-2024', valueType: 'Text', source: 'EVN', unit: 'mΩ' },
        { id: 'sup-hm-mba-2', stt: '2', name: 'Đo tổn hao không tải ở điện áp định mức', note: 'Quy trình Tổng công ty TCT-633', valueType: 'Text', source: 'TCT', unit: 'kW' },
        { id: 'sup-hm-mba-3', stt: '3', name: 'Phân tích khí hòa tan trong dầu cực (DGA) định kỳ', note: 'Thông tư Bộ Công Thương số 05/2021', valueType: 'Có/Không', source: 'EVN', unit: 'ppm' }
      ];
    }
    if (deviceCode === 'MC') {
      return [
        { id: 'sup-hm-mc-1', stt: '1', name: 'Đo thời gian đóng cắt và độ không đồng thời ba pha', note: 'Quy chuẩn EVN 2025', valueType: 'Text', source: 'EVN', unit: 'ms' },
        { id: 'sup-hm-mc-2', stt: '2', name: 'Thử nghiệm độ kín khí SF6', note: 'Chỉ thị TCT ban hành số 88', valueType: 'Có/Không', source: 'TCT', unit: '-' }
      ];
    }
    return [
      { id: 'sup-hm-gen-1', stt: '1', name: 'Kiểm tra tản nhiệt và rò rỉ cơ học', note: 'Quy chuẩn EVN', valueType: 'Có/Không', source: 'EVN', unit: '-' },
      { id: 'sup-hm-gen-2', stt: '2', name: 'Đo điện trở tiếp xúc các cực đấu nối', note: 'Tiêu chuẩn TCT', valueType: 'Text', source: 'TCT', unit: 'μΩ' }
    ];
  };

  const getSuperiorParams = (catId: string) => {
    if (catId.includes('mba-1')) {
      return [
        { id: 's-p-1', stt: '1', name: 'Điện trở cuộn dây Cao áp pha A-B', unit: 'mΩ', measureType: 'Nhập Số', limit: '< 15.2', standard: 'QĐ EVN 123', note: 'Đo bằng thiết bị chuyên dùng' },
        { id: 's-p-2', stt: '2', name: 'Điện trở cuộn dây Cao áp pha B-C', unit: 'mΩ', measureType: 'Nhập Số', limit: '< 15.2', standard: 'QĐ EVN 123', note: 'Đo bằng thiết bị chuyên dùng' }
      ];
    }
    if (catId.includes('mba-3')) {
      return [
        { id: 's-p-3', stt: '1', name: 'Hàm lượng khí Acetylene (C2H2)', unit: 'ppm', measureType: 'Nhập Số', limit: '< 1.0', standard: 'IEEE C57.104', note: 'Khí đặc trưng cho phóng điện hồ quang' },
        { id: 's-p-4', stt: '2', name: 'Hàm lượng khí Hydrogen (H2)', unit: 'ppm', measureType: 'Nhập Số', limit: '< 100', standard: 'IEEE C57.104', note: 'Phóng điện cục bộ' }
      ];
    }
    if (catId.includes('mc-1')) {
      return [
        { id: 's-p-5', stt: '1', name: 'Thời gian đóng pha A, B, C', unit: 'ms', measureType: 'Nhập Số', limit: '< 45', standard: 'QĐ 2025', note: 'Mức sai lệch tối đa 2ms' },
        { id: 's-p-6', stt: '2', name: 'Đo độ không đồng thời khi đóng phối hợp', unit: 'ms', measureType: 'Nhập Số', limit: '< 3.0', standard: 'QĐ 2025', note: 'Kiểm tra toàn chu kỳ cơ khí' }
      ];
    }
    return [
      { id: 's-p-gen-1', stt: '1', name: 'Đo điện trở cách điện R60s cuộn dây', unit: 'MΩ', measureType: 'Nhập Số', limit: '≥ 2000', standard: 'TCVN 1985-2015', note: 'Đánh giá cách điện cơ bản' },
      { id: 's-p-gen-2', stt: '2', name: 'Trực quan chi tiết sứ cách điện ngoại vi', unit: '-', measureType: 'Có/Không', limit: 'Có', standard: 'TCVN', note: 'Không rò dầu rạn nứt sứ' }
    ];
  };

  const getParamsListMerged = (catalog: any) => {
    if (!catalog) return [];
    if (tlhm_paramsMap[catalog.id]) {
      return tlhm_paramsMap[catalog.id];
    }
    const source = catalog.source || 'ĐV';
    if (source === 'EVN' || source === 'TCT') {
      const sp = getSuperiorParams(catalog.id);
      return sp.map(p => ({ ...p, source: source }));
    }
    return getDefaultParamsForCatalog(catalog.name, catalog.id).map(p => ({ ...p, source: 'ĐV' }));
  };

  const handleSaveNewHm = () => {
    if (!newHmName.trim() || !tlhm_selectedDevice) return;
    const key = `${tlhm_testType}-${tlhm_selectedDevice.code}`;
    const currentList = standardsMap[key] || [];

    if (editingHmItem) {
      const updatedList = currentList.map(item => {
        if (item.id === editingHmItem.id) {
          return {
            ...item,
            stt: newHmSTT.trim() || item.stt,
            name: newHmName.trim(),
            note: newHmNote.trim(),
            valueType: newHmValueType === 'Đạt/Không đạt' ? 'Có/Không' : 'Text',
            updatedAt: '21/06/2026',
            updatedBy: 'Nguyễn Văn Hải'
          };
        }
        return item;
      });
      setStandardsMap(prev => ({
        ...prev,
        [key]: updatedList
      }));
    } else {
      const newItem = {
        id: `HM-NEW-${Date.now()}`,
        name: newHmName.trim(),
        note: newHmNote.trim(),
        stt: newHmSTT.trim() || String(currentList.length + 1),
        valueType: newHmValueType === 'Đạt/Không đạt' ? 'Có/Không' : 'Text',
        unit: '-',
        limit: '-',
        standard: 'TCVN',
        source: 'ĐV',
        createdAt: '21/06/2026',
        createdBy: 'Nguyễn Văn Hải',
        updatedAt: '21/06/2026',
        updatedBy: 'Nguyễn Văn Hải'
      };
      setStandardsMap(prev => ({
        ...prev,
        [key]: [...currentList, newItem]
      }));
    }

    setEditingHmItem(null);
    setIsHmViewMode(false);
    setNewHmName('');
    setNewHmNote('');
    setNewHmSTT('');
    setShowAddHmModal(false);
  };

  const handleSaveNewTs = () => {
    if (!newTsName.trim() || !tlhm_selectedCatalog) return;
    const catId = tlhm_selectedCatalog.id;
    const currentList = getParamsListMerged(tlhm_selectedCatalog);

    if (editingTsItem) {
      const updatedList = currentList.map(item => {
        if (item.id === editingTsItem.id) {
          return {
            ...item,
            stt: newTsSTT.trim() || item.stt,
            name: newTsName.trim(),
            unit: newTsUnit.trim() || '-',
            measureType: newTsMeasureType,
            limit: newTsLimit.trim() || '-',
            standard: newTsStandard.trim() || 'TCVN',
            note: newTsNote.trim(),
            updatedAt: '21/06/2026',
            updatedBy: 'Nguyễn Văn Hải'
          };
        }
        return item;
      });
      setTlhm_paramsMap(prev => ({
        ...prev,
        [catId]: updatedList
      }));
    } else {
      const newItem = {
        id: `TS-NEW-${Date.now()}`,
        stt: newTsSTT.trim() || String(currentList.length + 1),
        name: newTsName.trim(),
        unit: newTsUnit.trim() || '-',
        measureType: newTsMeasureType,
        limit: newTsLimit.trim() || '-',
        standard: newTsStandard.trim() || 'TCVN',
        note: newTsNote.trim(),
        source: 'ĐV',
        createdAt: '21/06/2026',
        createdBy: 'Nguyễn Văn Hải',
        updatedAt: '21/06/2026',
        updatedBy: 'Nguyễn Văn Hải'
      };
      setTlhm_paramsMap(prev => ({
        ...prev,
        [catId]: [...currentList, newItem]
      }));
    }

    setEditingTsItem(null);
    setIsTsViewMode(false);
    setNewTsSTT('');
    setNewTsName('');
    setNewTsUnit('');
    setNewTsMeasureType('Nhập Số');
    setNewTsLimit('');
    setNewTsStandard('');
    setNewTsNote('');
    setShowAddTsModal(false);
  };

  const handleAddHmFromTemplateList = () => {
    const key = `${tlhm_testType}-${tlhm_selectedDevice?.code || 'MBA'}`;
    const currentList = standardsMap[key] || [];
    
    const newItems = MASTER_CATALOGS_TEMPLATE.filter(item => hmListSelectedIds.includes(item.id)).map((item, idx) => {
      return {
        id: `HM-IMP-${Date.now()}-${idx}`,
        stt: '',
        code: item.code,
        name: item.name,
        valueType: item.valueType,
        note: item.note,
        source: 'ĐV',
        createdAt: '22/06/2026',
        createdBy: 'Nguyễn Văn Hải',
        updatedAt: '22/06/2026',
        updatedBy: 'Nguyễn Văn Hải'
      };
    });

    const updatedList = [...currentList];
    newItems.forEach(newItem => {
      newItem.stt = String(updatedList.length + 1);
      updatedList.push(newItem);
    });

    setStandardsMap(prev => ({
      ...prev,
      [key]: updatedList
    }));

    setShowAddHmFromListModal(false);
    setHmListSelectedIds([]);
  };

  const handleAddTsFromTemplateList = () => {
    if (!tlhm_selectedCatalog) return;
    const catId = tlhm_selectedCatalog.id;
    const currentList = getParamsListMerged(tlhm_selectedCatalog);

    const newItems = MASTER_PARAMS_TEMPLATE.filter(item => tsListSelectedIds.includes(item.id)).map((item, idx) => {
      return {
        id: `TS-IMP-${Date.now()}-${idx}`,
        stt: '',
        name: item.name,
        unit: item.unit,
        measureType: item.measureType,
        limit: item.limit,
        standard: item.standard,
        note: '',
        source: 'ĐV',
        createdAt: '22/06/2026',
        createdBy: 'Nguyễn Văn Hải',
        updatedAt: '22/06/2026',
        updatedBy: 'Nguyễn Văn Hải'
      };
    });

    const updatedList = [...currentList];
    newItems.forEach(newItem => {
      newItem.stt = String(updatedList.length + 1);
      updatedList.push(newItem);
    });

    setTlhm_paramsMap(prev => ({
      ...prev,
      [catId]: updatedList
    }));

    setShowAddTsFromListModal(false);
    setTsListSelectedIds([]);
  };

  const renderThietLapHangMucView = () => {
    const workingUnit = devicePath && devicePath.length > 0 
      ? devicePath[devicePath.length - 1] 
      : 'Đơn vị';

    // Active Category Mapping
    const activeCategory = tlhm_voltageTab === '110kV' ? 'Cao Áp' : tlhm_voltageTab === '6->35kV' ? 'Trung Áp' : 'Hạ Áp';

    // Get active voltage devices
    const voltageDevicesSelection = MOCK_DEVICE_TYPES.filter(item => {
      if (item.category !== activeCategory) return false;
      if (tlhm_voltageTab === '110kV') {
        return item.voltage === '110kV';
      }
      return true;
    });

    // Determine current active device safely (fallback if category mismatch)
    let activeDevice = tlhm_selectedDevice;
    if (!activeDevice || activeDevice.category !== activeCategory || (tlhm_voltageTab === '110kV' && activeDevice.voltage !== '110kV')) {
      if (voltageDevicesSelection.length > 0) {
        activeDevice = voltageDevicesSelection[0];
      }
    }

    // Filter catalogs (Middle Column) based on search query
    const rawCatalogs = standardsMap[`${tlhm_testType}-${activeDevice?.code}`] || [];

    const superiorCatalogs = getSuperiorCatalogs(activeDevice?.code || 'MBA');

    const catalogsWithSource = rawCatalogs.map((c, idx) => ({
      ...c,
      source: c.source || 'ĐV',
      createdAt: (c as any).createdAt || '15/06/2026',
      createdBy: (c as any).createdBy || 'Nguyễn Văn Hải',
      updatedAt: (c as any).updatedAt || '18/06/2026',
      updatedBy: (c as any).updatedBy || 'Nguyễn Văn Hải'
    }));

    const supCatalogsWithInfo = superiorCatalogs.map(c => ({
      ...c,
      createdAt: (c as any).createdAt || '01/01/2026',
      createdBy: (c as any).createdBy || 'Hệ thống EVN',
      updatedAt: (c as any).updatedAt || '10/01/2026',
      updatedBy: (c as any).updatedBy || 'Ban Kỹ thuật EVN'
    }));

    const allCatalogs = [...catalogsWithSource, ...supCatalogsWithInfo];

    // Filter combined catalogs (Middle Column) based on search query
    const filteredAllCatalogs = allCatalogs.filter(cat => {
      if (!tlhm_searchQuery.trim()) return true;
      const q = tlhm_searchQuery.toLowerCase();
      const matchCat = cat.name.toLowerCase().includes(q) || (cat.note && cat.note.toLowerCase().includes(q));
      
      // also search children parameters
      const params = getParamsListMerged(cat);
      const matchParam = params.some(p => 
        p.name.toLowerCase().includes(q) || 
        (p.unit && p.unit.toLowerCase().includes(q)) ||
        (p.standard && p.standard.toLowerCase().includes(q))
      );
      
      return matchCat || matchParam;
    });

    const sortedFilteredAllCatalogs = [...filteredAllCatalogs].sort((a, b) => {
      const sourceOrderMap: Record<string, number> = { 'EVN': 1, 'TCT': 2, 'ĐV': 3 };
      const orderA = sourceOrderMap[a.source || 'ĐV'] || 99;
      const orderB = sourceOrderMap[b.source || 'ĐV'] || 99;
      if (orderA !== orderB) return orderA - orderB;
      const sttA = parseFloat(a.stt) || 999;
      const sttB = parseFloat(b.stt) || 999;
      if (sttA !== sttB) return sttA - sttB;
      return a.name.localeCompare(b.name);
    });

    // Unified Parameter list for selected catalog
    const rawParamsMerged = (() => {
      if (!tlhm_selectedCatalog) return [];
      return getParamsListMerged(tlhm_selectedCatalog);
    })();

    const filteredParamsMerged = rawParamsMerged.filter(p => {
      if (!tlhm_searchQuery.trim()) return true;
      const q = tlhm_searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.unit && p.unit.toLowerCase().includes(q)) ||
        (p.standard && p.standard.toLowerCase().includes(q)) ||
        (p.note && p.note.toLowerCase().includes(q))
      );
    });

    const sortedFilteredParamsMerged = [...filteredParamsMerged].sort((a, b) => {
      const sourceOrderMap: Record<string, number> = { 'EVN': 1, 'TCT': 2, 'ĐV': 3 };
      const orderA = sourceOrderMap[a.source || 'ĐV'] || 99;
      const orderB = sourceOrderMap[b.source || 'ĐV'] || 99;
      if (orderA !== orderB) return orderA - orderB;
      const sttA = parseFloat(a.stt) || 999;
      const sttB = parseFloat(b.stt) || 999;
      if (sttA !== sttB) return sttA - sttB;
      return a.name.localeCompare(b.name);
    });










    return (
      <div className="bg-[#F8FAFC] flex flex-col h-full overflow-hidden text-[11pt] font-sans">
        {/* POLISHED TITLE & SWITCH ROW (Header with NO Breadcrumbs) */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0 shadow-xs relative z-40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setNewHmName('');
                  setNewHmNote('');
                  setNewHmSTT('');
                  setEditingHmItem(null);
                  setIsHmViewMode(false);
                  setActiveSubMenu && setActiveSubMenu(null);
                }} 
                className="p-2 hover:bg-slate-100 rounded-xl transition-all cursor-pointer text-slate-500 hover:text-slate-800"
                id="back-btn-tlhm"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <div className="flex items-center gap-1">
                <h2 className="text-[13pt] font-black text-[#164399] tracking-tight">
                  Hạng mục & Thông số thí nghiệm - {workingUnit}
                </h2>
              </div>
            </div>

            {/* Selection Options & Search row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category selector switch "Thí nghiệm" | "Kiểm định" | "Hiệu chuẩn" */}
              <div className="flex bg-slate-100 p-1 rounded-full border-none shadow-inner shrink-0 leading-none h-10 items-center">
                {(['Thí nghiệm', 'Kiểm định', 'Hiệu chuẩn'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setTlhm_testType(type);
                      setTlhm_selectedCatalog(null);
                      setTlhm_selectedSupCatalog(null);
                    }}
                    className={`px-4 py-1.5 text-[9.5pt] rounded-full transition-all font-bold tracking-tight text-center cursor-pointer ${
                      tlhm_testType === type 
                        ? 'bg-[#164399] text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Fast Search input (STRICTLY NO LABEL) */}
              <div className="relative w-70">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[2.5]" />
                <input
                  type="text"
                  value={tlhm_searchQuery}
                  onChange={(e) => setTlhm_searchQuery(e.target.value)}
                  placeholder="Mã / Tên hạng mục hoặc thông số..."
                  className="w-full pl-9 pr-4 py-2 text-[9.5pt] font-semibold bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                />
                {tlhm_searchQuery && (
                  <button 
                    onClick={() => setTlhm_searchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3-COLUMN CONTENT GRID (Proportions matching 25% | 35% | 40%) */}
        <div className="flex-1 flex gap-4 p-4 md:p-6 overflow-hidden h-full">
          
          {/* COLUMN 1: LEFT PANEL (25% WIDTH) */}
          <div className="w-[25%] flex shrink-0 flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs h-full">
            {/* Tabs for Voltage Level: 110kV | 6->35kV | < 6kV */}
            <div className="p-3 border-b border-gray-100 bg-slate-50/50 flex gap-1 select-none">
              {(['110kV', '6->35kV', '< 6kV'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setTlhm_voltageTab(tab);
                    const cat = tab === '110kV' ? 'Cao Áp' : tab === '6->35kV' ? 'Trung Áp' : 'Hạ Áp';
                    const devices = MOCK_DEVICE_TYPES.filter(item => item.category === cat);
                    if (devices.length > 0) {
                      setTlhm_selectedDevice(devices[0]);
                    }
                  }}
                  className={`flex-1 py-1.5 text-[9pt] rounded-lg transition-all font-black tracking-tight text-center cursor-pointer ${
                    tlhm_voltageTab === tab 
                      ? 'bg-blue-50/70 text-[#164399] border border-blue-200/50 shadow-xs' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* List without voltage level grouping */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
              {voltageDevicesSelection.length === 0 ? (
                <div className="text-center py-8 text-gray-400 italic">Chưa cấu hình loại thiết bị nào</div>
              ) : (
                voltageDevicesSelection.map(item => {
                  const isSelected = activeDevice?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setTlhm_selectedDevice(item);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-50/20 border-blue-200/80 shadow-xs' 
                          : 'border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        {/* Icon loại */}
                        <span className={`p-1.5 rounded-lg border shrink-0 flex items-center justify-center ${
                          isSelected 
                            ? 'bg-blue-50 text-blue-800 border-blue-100' 
                            : 'bg-slate-50 text-slate-400 border-slate-100'
                        }`}>
                          {item.code === 'MBA' ? <Layers className="w-3.5 h-3.5 shrink-0" /> :
                           item.code === 'MC' ? <Settings className="w-3.5 h-3.5 shrink-0" /> :
                           item.code === 'TI' ? <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0" /> :
                           item.code === 'TU' ? <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> :
                           <Box className="w-3.5 h-3.5 shrink-0" />}
                        </span>
                        <div className="min-w-0">
                          <h4 className={`text-[9.5pt] leading-tight truncate ${isSelected ? 'font-black text-[#164399]' : 'font-semibold text-slate-800'}`}>
                            <span className="font-mono text-[9pt] font-black text-slate-400 mr-1 inline">{item.code}</span> - {item.name}
                          </h4>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[8pt] font-extrabold bg-slate-100 text-gray-700 border border-slate-200/50 shrink-0 uppercase tracking-tight ml-2">
                        {item.voltage}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* COLUMN 2: MIDDLE PANEL (35% WIDTH) - TWO VERTICAL BOARDS CONSOLIDATED */}
          <div className="w-[35%] flex shrink-0 flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-slate-50/50 shrink-0 select-none">
              <span className="text-[9.5pt] font-black text-gray-700 uppercase tracking-wider">
                Hạng mục kiểm tra ({sortedFilteredAllCatalogs.length})
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingHmItem(null);
                    setIsHmViewMode(false);
                    setNewHmSTT(String(rawCatalogs.length + 1));
                    setNewHmName('');
                    setNewHmNote('');
                    setNewHmValueType('Đạt/Không đạt');
                    setHmAttachedDocs([]);
                    setHmAttachedImages([]);
                    setShowAddHmModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#164399] hover:bg-blue-800 text-white rounded-lg text-[8pt] font-black uppercase tracking-tight shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" /> Thêm HM
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHmListVoltageFilter(configVoltage || 'Tất cả');
                    setHmListDeviceTypeFilter(configDevType || 'Tất cả');
                    setHmListSearchQuery('');
                    setHmListSelectedIds([]);
                    setShowAddHmFromListModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#0f5ca6] border border-sky-200 rounded-lg text-[8pt] font-black uppercase tracking-tight shadow-xs active:scale-95 transition-all cursor-pointer select-none"
                >
                  + Từ Danh sách
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#eaf0fa] sticky top-0 z-10 text-[#154194] leading-none select-none border-b border-gray-200">
                  <tr>
                    <th className="px-2 py-3.5 w-10 text-center text-[8pt] font-black uppercase tracking-wider">STT</th>
                    <th className="px-3 py-3.5 text-[8pt] font-black uppercase tracking-wider">Tên hạng mục</th>
                    <th className="px-2 py-3.5 w-24 text-center text-[8pt] font-black uppercase tracking-wider">Đ.Giá</th>
                    <th className="px-2 py-3.5 w-16 text-center text-[8pt] font-black uppercase tracking-wider">Cấp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[9pt] font-semibold text-gray-800">
                  {sortedFilteredAllCatalogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-400 italic">
                        Chưa có hạng mục thí nghiệm được thiết lập
                      </td>
                    </tr>
                  ) : (
                    sortedFilteredAllCatalogs.map((std, index) => {
                      const isSelected = tlhm_selectedCatalog?.id === std.id;
                      return (
                        <tr
                          key={std.id}
                          onClick={() => {
                            setTlhm_selectedCatalog(std);
                          }}
                          onDoubleClick={() => {
                            setEditingHmItem(std);
                            setIsHmViewMode(true);
                            setNewHmSTT(std.stt || '');
                            setNewHmName(std.name || '');
                            setNewHmValueType(std.valueType === 'Có/Không' ? 'Đạt/Không đạt' : 'Nhập Text');
                            setNewHmNote(std.note || '');
                            setHmAttachedDocs([
                              { id: `hm-doc-1-${std.id}`, name: `Quy trình thử nghiệm - ${std.name}.pdf`, size: '840 KB', type: 'Quy trình' },
                              { id: `hm-doc-2-${std.id}`, name: 'Quy chuẩn Quốc gia QCVN 01:2020.pdf', size: '2.8 MB', type: 'Quy chuẩn' }
                            ]);
                            setHmAttachedImages([
                              `https://picsum.photos/seed/hm-img-${std.id}/800/600`
                            ]);
                            setShowAddHmModal(true);
                          }}
                          className={`cursor-pointer transition-colors leading-snug ${
                            isSelected 
                              ? 'bg-blue-50/45 text-[#164399]' 
                              : 'hover:bg-slate-50/50 bg-white'
                          }`}
                          title="Kích đúp chuột để Xem chi tiết"
                        >
                          <td className="px-2 py-3 text-center font-mono font-black text-slate-350">{std.stt || index + 1}</td>
                          <td className="px-3 py-3 leading-snug font-semibold text-slate-705">
                            <div className={isSelected ? 'font-black text-[#164399]' : 'font-bold text-slate-700'}>
                              {std.name}
                            </div>
                            {std.note && (
                              <div className="text-[7.5pt] text-slate-450 font-normal italic mt-1 leading-normal">
                                {std.source === 'EVN' || std.source === 'TCT' ? `Quy chuẩn: ${std.note}` : std.note}
                              </div>
                            )}
                          </td>
                          <td className="px-2 py-3 text-center select-none">
                            <span className={`text-[7.5pt] font-bold px-1.5 py-0.5 rounded ${
                              std.valueType === 'Có/Không' || std.valueType === 'Đạt/Không đạt'
                                ? 'bg-orange-50 text-orange-700'
                                : 'bg-green-50 text-green-700 border border-green-100'
                            }`}>
                              {std.valueType === 'Có/Không' ? 'Đạt/K.Đạt' : 'Nhập Text'}
                            </span>
                          </td>
                          <td className="px-2 py-3 text-center select-none">
                            <span className={`text-[7.5pt] font-extrabold px-1.5 py-0.5 rounded border ${
                              std.source === 'EVN'
                                ? 'bg-red-50 text-red-700 border border-red-100'
                                : std.source === 'TCT'
                                ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                : 'bg-blue-50 text-blue-700 border border-blue-100'
                            }`}>
                              {std.source || 'ĐV'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* COLUMN 3: RIGHT PANEL (40% WIDTH) - CONSOLIDATED PARAMETERS */}
          <div className="w-[40%] flex shrink-0 flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-slate-50/50 shrink-0 select-none">
              <span className="text-[9.5pt] font-black text-gray-700 uppercase tracking-wider">
                Thông số kiểm tra ({sortedFilteredParamsMerged.length})
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={!tlhm_selectedCatalog}
                  onClick={() => {
                    setEditingTsItem(null);
                    setIsTsViewMode(false);
                    setNewTsSTT(String(sortedFilteredParamsMerged.length + 1));
                    setNewTsName('');
                    setNewTsUnit('');
                    setNewTsMeasureType('Nhập Số');
                    setNewTsLimit('');
                    setNewTsStandard('');
                    setNewTsNote('');
                    setTsAttachedDocs([]);
                    setTsAttachedImages([]);
                    setShowAddTsModal(true);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-[#164399] hover:bg-blue-800 text-white rounded-lg text-[8pt] font-black uppercase tracking-tight shadow-xs active:scale-95 transition-all disabled:opacity-55 disabled:pointer-events-none cursor-pointer border-none"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" /> Thêm TS
                </button>
                <button
                  type="button"
                  disabled={!tlhm_selectedCatalog}
                  onClick={() => {
                    setTsListVoltageFilter(configVoltage || 'Tất cả');
                    setTsListDeviceTypeFilter(configDevType || 'Tất cả');
                    setTsListSearchQuery('');
                    setTsListSelectedIds([]);
                    setShowAddTsFromListModal(true);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#0f5ca6] border border-sky-200 rounded-lg text-[8pt] font-black uppercase tracking-tight shadow-xs active:scale-95 transition-all disabled:opacity-55 disabled:pointer-events-none cursor-pointer select-none"
                >
                  + Từ Danh sách
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#eaf0fa] sticky top-0 z-10 text-[#154194] leading-none select-none border-b border-gray-200">
                  <tr>
                    <th className="px-2 py-3.5 w-10 text-center text-[8pt] font-black uppercase tracking-wider">STT</th>
                    <th className="px-3 py-3.5 text-[8pt] font-black uppercase tracking-wider">Tên thông số đo</th>
                    <th className="px-2 py-3.5 w-24 text-center text-[8pt] font-black uppercase tracking-wider">Kiểu/ĐVT</th>
                    <th className="px-3 py-3.5 w-32 text-center text-[8pt] font-black uppercase tracking-wider">Giới hạn/T.Chuẩn</th>
                    <th className="px-2 py-3.5 w-16 text-center text-[8pt] font-black uppercase tracking-wider">Cấp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[9pt] font-semibold text-gray-800 bg-white">
                  {!tlhm_selectedCatalog ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-400 italic">
                        Hãy chọn một hạng mục ở cột giữa để hiển thị danh sách thông số.
                      </td>
                    </tr>
                  ) : sortedFilteredParamsMerged.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-400 italic">
                        Chưa có thông số đo cho hạng mục này
                      </td>
                    </tr>
                  ) : (
                    sortedFilteredParamsMerged.map((param, index) => (
                      <tr 
                        key={param.id} 
                        onDoubleClick={() => {
                          setEditingTsItem(param);
                          setIsTsViewMode(true);
                          setNewTsSTT(param.stt || '');
                          setNewTsName(param.name || '');
                          setNewTsUnit(param.unit || '');
                          setNewTsMeasureType(param.measureType || 'Nhập Số');
                          setNewTsLimit(param.limit || '');
                          setNewTsStandard(param.standard || '');
                          setNewTsNote(param.note || '');
                          setTsAttachedDocs([
                            { id: `ts-doc-1-${param.id}`, name: `Giải trình chi tiết tham khảo - ${param.name}.pdf`, size: '540 KB', type: 'Hướng dẫn' }
                          ]);
                          setTsAttachedImages([
                            `https://picsum.photos/seed/ts-img-${param.id}/800/600`
                          ]);
                          setShowAddTsModal(true);
                        }}
                        className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        title="Kích đúp chuột để Xem chi tiết"
                      >
                        <td className="px-2 py-3 text-center font-mono font-black text-slate-350">{param.stt || index + 1}</td>
                        <td className="px-3 py-3 leading-snug">
                          <div className="font-bold text-slate-750">{param.name}</div>
                          {param.note && (
                            <div className="text-[7.5pt] text-slate-400 font-normal italic mt-1 leading-normal">
                              {param.note}
                            </div>
                          )}
                        </td>
                        <td className="px-2 py-3 text-center">
                          <div className="flex flex-col gap-0.5 items-center justify-center">
                            <span className={`text-[7.5pt] font-black uppercase px-2 py-0.5 rounded border ${
                              param.measureType?.includes('Số')
                                ? 'bg-blue-50 text-blue-700 border-blue-100'
                                : 'bg-indigo-50 text-indigo-700 border-indigo-100/50'
                            }`}>
                              {param.measureType || 'Nhập Số'}
                            </span>
                            <span className="text-[8pt] font-bold text-slate-400 font-mono mt-0.5">{param.unit || '-'}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center text-slate-700">
                          <div className="flex flex-col gap-1 items-center justify-center">
                            <span className="px-2 py-0.5 bg-blue-50/55 text-[#164399] rounded-lg text-[8pt] font-mono font-extrabold border border-blue-100 inline-block max-w-[120px] truncate" title={param.limit}>
                              {param.limit || '-'}
                            </span>
                            <span className="text-[8pt] font-bold text-slate-450 block truncate max-w-[110px]" title={param.standard}>
                              {param.standard || 'TCVN'}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-center select-none">
                          <span className={`text-[7.5pt] font-extrabold px-1.5 py-0.5 rounded border ${
                            param.source === 'EVN'
                              ? 'bg-red-50 text-red-700 border border-red-100'
                              : param.source === 'TCT'
                              ? 'bg-orange-50 text-orange-700 border border-orange-100'
                              : 'bg-blue-50 text-blue-700 border-blue-100'
                          }`}>
                            {param.source || 'ĐV'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ==================== POPUPS SECTION ==================== */}
        
        {/* POP-UP 1: ADD HM MODAL (REVISED TO 2-COLUMN PREMIUM MODAL) */}
        {showAddHmModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={() => setShowAddHmModal(false)}></div>
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-150 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="px-6 py-4.5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50 select-none shrink-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-[12pt] font-black text-gray-700 tracking-tight">
                    {editingHmItem 
                      ? (isHmViewMode ? 'Chi tiết hạng mục kiểm tra' : 'Chỉnh sửa hạng mục kiểm tra') 
                      : 'Thêm hạng mục kiểm tra mới'}
                  </h3>
                  {editingHmItem && (
                    <span className={`text-[7.5pt] font-extrabold px-2 py-0.5 rounded border ${
                      editingHmItem.source === 'EVN'
                        ? 'bg-red-50 text-red-700 border-red-100'
                        : editingHmItem.source === 'TCT'
                        ? 'bg-orange-50 text-orange-700 border-orange-100'
                        : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      Cấp {editingHmItem.source || 'ĐV'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Action Toolbar for View Mode */}
                  {isHmViewMode && editingHmItem && (
                    <div className="flex gap-2 items-center select-none mr-2">
                      <button
                        type="button"
                        onClick={() => {
                          const key = `${tlhm_testType}-${activeDevice?.code || 'MBA'}`;
                          const currentList = standardsMap[key] || [];
                          const duplicatedVal = {
                            ...editingHmItem,
                            id: `HM-NEW-${Date.now()}`,
                            name: `${editingHmItem.name} - Bản sao`,
                            stt: String(currentList.length + 1),
                            source: 'ĐV',
                            createdAt: '22/06/2026',
                            createdBy: 'Nguyễn Văn Hải',
                            updatedAt: '22/06/2026',
                            updatedBy: 'Nguyễn Văn Hải'
                          };
                          setStandardsMap(prev => ({
                            ...prev,
                            [key]: [...currentList, duplicatedVal]
                          }));
                          setEditingHmItem(duplicatedVal);
                          setIsHmViewMode(false);
                          setNewHmSTT(duplicatedVal.stt);
                          setNewHmName(duplicatedVal.name);
                          setNewHmValueType(duplicatedVal.valueType === 'Có/Không' ? 'Đạt/Không đạt' : 'Nhập Text');
                          setNewHmNote(duplicatedVal.note || '');
                        }}
                        className="flex items-center justify-center p-2 text-green-600 bg-transparent hover:bg-green-50/50 rounded-lg transition-all cursor-pointer"
                        title="Sao chép hạng mục này sang cấp Đơn vị để tùy biến"
                      >
                        <Copy className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      {editingHmItem.source === 'ĐV' && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setIsHmViewMode(false);
                            }}
                            className="flex items-center justify-center p-2 text-blue-600 border border-transparent hover:border-blue-200 hover:bg-blue-50/50 rounded-lg transition-all cursor-pointer"
                            title="Sửa hạng mục này"
                          >
                            <Edit className="w-4 h-4 stroke-[2.5]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setLocalConfirmAction({
                                title: 'Xác nhận xóa hạng mục',
                                message: 'Bạn có chắc chắn muốn xóa hạng mục thí nghiệm này hoàn toàn?',
                                onConfirm: () => {
                                  const key = `${tlhm_testType}-${activeDevice?.code || 'MBA'}`;
                                  const currentList = standardsMap[key] || [];
                                  const updatedList = currentList.filter(item => item.id !== editingHmItem.id);
                                  setStandardsMap(prev => ({
                                    ...prev,
                                    [key]: updatedList
                                  }));
                                  setShowAddHmModal(false);
                                  setEditingHmItem(null);
                                  setLocalConfirmAction(null);
                                }
                              });
                            }}
                            className="flex items-center justify-center p-2 text-red-600 bg-transparent hover:bg-red-50/50 rounded-lg transition-all cursor-pointer"
                            title="Xóa hạng mục hoàn toàn"
                          >
                            <Trash2 className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  <button 
                    onClick={() => setShowAddHmModal(false)}
                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-700 border-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content & Attachments - Two Column Layout (NO CONTEXT BAR, NO BỐI CẢNH) */}
              <div className="p-6 md:p-8 flex gap-8 overflow-y-auto custom-scrollbar flex-1">
                
                {/* Column Left: Input Fields (50% Width) */}
                <div className="w-1/2 flex flex-col gap-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1.5">STT</label>
                      <input
                        type="text"
                        disabled={isHmViewMode}
                        value={newHmSTT}
                        onChange={e => setNewHmSTT(e.target.value)}
                        placeholder="1"
                        className="w-full px-3 py-2 text-[10pt] font-bold bg-slate-50/50 disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-mono text-slate-700"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tên hạng mục <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        disabled={isHmViewMode}
                        value={newHmName}
                        onChange={e => setNewHmName(e.target.value)}
                        placeholder="Nhập tên hạng mục đo đạc kiểm tra..."
                        className="w-full px-4 py-2 text-[10pt] font-semibold bg-white disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1.5">Kiểu đánh giá</label>
                    <div className="grid grid-cols-2 bg-slate-100/80 p-1 rounded-xl w-full">
                      <button
                        type="button"
                        disabled={isHmViewMode}
                        onClick={() => setNewHmValueType('Đạt/Không đạt')}
                        className={`py-2 text-[9pt] rounded-lg transition-all font-bold cursor-pointer text-center ${
                          newHmValueType === 'Đạt/Không đạt' 
                            ? 'bg-[#164399] text-white shadow-xs' 
                            : 'text-slate-500 hover:text-slate-855'
                        }`}
                      >
                        Đạt/Không Đạt
                      </button>
                      <button
                        type="button"
                        disabled={isHmViewMode}
                        onClick={() => setNewHmValueType('Nhập Text')}
                        className={`py-2 text-[9pt] rounded-lg transition-all font-bold cursor-pointer text-center ${
                          newHmValueType === 'Nhập Text' 
                            ? 'bg-[#164399] text-white shadow-xs' 
                            : 'text-slate-500 hover:text-slate-855'
                        }`}
                      >
                        Nhập Text
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1.5">Ghi chú hướng dẫn</label>
                    <textarea
                      disabled={isHmViewMode}
                      value={newHmNote}
                      onChange={e => setNewHmNote(e.target.value)}
                      placeholder="Ghi chú điều kiện, phương pháp đo đạc mẫu..."
                      rows={4}
                      className="w-full px-4 py-3 text-[10pt] bg-white disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none font-semibold text-slate-800"
                    />
                  </div>

                  {/* Metadata Info Panel */}
                  {editingHmItem && (
                    <div className="mt-4 p-3.5 bg-slate-50 border border-slate-150 rounded-xl space-y-2 text-[8.5pt]">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-gray-700 uppercase tracking-wider text-[7.5pt]">Cấp khởi tạo:</span>
                        <span className={`px-2 py-0.5 rounded text-[8pt] font-black border ${
                          editingHmItem.source === 'EVN'
                            ? 'bg-red-50 text-red-700 border-red-100'
                            : editingHmItem.source === 'TCT'
                            ? 'bg-orange-50 text-orange-700 border-orange-100'
                            : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          {editingHmItem.source || 'ĐV'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200/60">
                        <div>
                          <div className="text-gray-700 text-[7.5pt] font-black uppercase tracking-wider">Người khởi tạo</div>
                          <div className="font-bold text-slate-700">{(editingHmItem as any).createdBy || 'Hệ thống'}</div>
                          <div className="text-[8pt] text-slate-450 font-mono font-bold mt-0.5">{(editingHmItem as any).createdAt || '01/01/2026'}</div>
                        </div>
                        <div>
                          <div className="text-gray-700 text-[7.5pt] font-black uppercase tracking-wider">Người cập nhật</div>
                          <div className="font-bold text-slate-700">{(editingHmItem as any).updatedBy || 'Hệ thống'}</div>
                          <div className="text-[8pt] text-slate-450 font-mono font-bold mt-0.5">{(editingHmItem as any).updatedAt || '01/01/2026'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Column Right: References Section (50% Width + Divider) */}
                <div className="w-1/2 flex flex-col gap-5 border-l border-slate-200/70 pl-8">
                  <div>
                    <h4 className="text-[9pt] font-black text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#164399]" /> Tài liệu tham chiếu
                    </h4>
                    
                    {/* Upload Buttons */}
                    {!isHmViewMode && (
                      <div className="grid grid-cols-2 gap-2.5 mb-3.5 select-none">
                        <button
                          type="button"
                          onClick={() => handleHmDocUploadSimulated()}
                          className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-[#164399]/40 hover:border-[#164399] bg-blue-50/20 rounded-xl text-[8.5pt] font-bold text-[#164399] hover:bg-blue-50/50 transition-all cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" /> Tải lên tài liệu
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLibraryTarget('hm');
                            setShowLibraryModal(true);
                          }}
                          className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl text-[8.5pt] font-bold text-slate-600 transition-all cursor-pointer"
                        >
                          <Layers className="w-3.5 h-3.5" /> Từ thư viện
                        </button>
                      </div>
                    )}

                    {/* Simple List Grid matching global App design */}
                    <div className="space-y-2">
                      {hmAttachedDocs.length === 0 ? (
                        <div className="text-[8.5pt] text-slate-400 italic text-center p-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                          Chưa có tài liệu đính kèm
                        </div>
                      ) : (
                        hmAttachedDocs.map((doc) => (
                          <div 
                            key={doc.id} 
                            onClick={() => handleDocPreview(doc)}
                            className="flex items-center justify-between p-2.5 bg-slate-50/60 rounded-xl border border-slate-100 text-[8.5pt] group hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <FileText className="w-4 h-4 text-red-500 shrink-0" />
                              <span className="font-semibold text-slate-700 truncate">{doc.name}</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                              <span className="text-[7.5pt] text-slate-400 font-mono font-bold mr-1.5">{doc.size || '420 KB'}</span>
                              <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500" title="Tải xuống" onClick={() => console.log('Download', doc.name)}><Download className="w-3 h-3" /></button>
                              {!isHmViewMode && (
                                <button 
                                  type="button" 
                                  onClick={() => setHmAttachedDocs(prev => prev.filter(d => d.id !== doc.id))}
                                  className="p-1 hover:bg-red-50 hover:text-red-600 rounded text-slate-350"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Reference Image with preview */}
                  <div>
                    <h4 className="text-[9pt] font-black text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-[#164399]" /> Hình ảnh tham khảo
                    </h4>

                    {!isHmViewMode && (
                      <button
                        type="button"
                        onClick={() => handleHmImgUploadSimulated()}
                        className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/40 rounded-xl text-[8.5pt] font-bold text-slate-600 hover:bg-slate-50 transition-all mb-3 cursor-pointer"
                      >
                        <Image className="w-3.5 h-3.5" /> Tải lên hình ảnh mẫu
                      </button>
                    )}

                    {/* Image Mockup container styled elegantly */}
                    {hmAttachedImages.length === 0 ? (
                      <div className="text-[8.5pt] text-slate-400 italic text-center p-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 animate-fade-in">
                        Chưa có hình ảnh tham khảo
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2.5">
                        {hmAttachedImages.map((img, idx) => (
                          <div 
                            key={idx}
                            onClick={() => handleImgPreview(img, hmAttachedImages, idx)}
                            className="relative border border-slate-250 rounded-xl overflow-hidden aspect-video bg-slate-100/50 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-slate-400 transition-all shadow-2xs"
                          >
                            <img src={img} className="w-full h-full object-cover" alt="HM Ref Asset" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/15 flex items-center justify-center transition-all">
                              <Search className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all drop-shadow-md" />
                            </div>
                            <span className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-[7.5pt] font-mono py-1 px-2 rounded-lg truncate text-center select-none backdrop-blur-xs">
                              Xem hình ảnh mẫu {idx + 1}
                            </span>
                            {!isHmViewMode && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setHmAttachedImages(prev => prev.filter((_, i) => i !== idx));
                                }}
                                className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded shadow-md cursor-pointer transition-transform duration-150 hover:scale-105"
                                title="Xóa hình ảnh"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-150 flex justify-end gap-3 shrink-0">
                {isHmViewMode ? (
                  <button
                    type="button"
                    onClick={() => setShowAddHmModal(false)}
                    className="px-6 py-2 text-[10pt] font-black bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    Đóng
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowAddHmModal(false)}
                      className="px-5 py-2 text-[10pt] font-bold text-gray-500 hover:text-gray-800 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      disabled={!newHmName.trim()}
                      onClick={handleSaveNewHm}
                      className="px-6 py-2 text-[10pt] font-black bg-[#164399] text-white hover:bg-blue-800 rounded-lg transition-all shadow-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      Lưu
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* POP-UP 2: ADD TS MODAL (REVISED TO 2-COLUMN PREMIUM MODAL) */}
        {showAddTsModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={() => setShowAddTsModal(false)}></div>
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-150 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="px-6 py-4.5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50 select-none shrink-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-[12pt] font-black text-gray-700 tracking-tight">
                    {editingTsItem 
                      ? (isTsViewMode ? 'Chi tiết thông số kiểm tra' : 'Chỉnh sửa thông số kiểm tra') 
                      : 'Thêm thông số kiểm tra mới'}
                  </h3>
                  {editingTsItem && (
                    <span className={`text-[7.5pt] font-extrabold px-2 py-0.5 rounded border ${
                      editingTsItem.source === 'EVN'
                        ? 'bg-red-50 text-red-700 border-red-100'
                        : editingTsItem.source === 'TCT'
                        ? 'bg-orange-50 text-orange-700 border-orange-100'
                        : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      Cấp {editingTsItem.source || 'ĐV'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Action Toolbar for View Mode */}
                  {isTsViewMode && editingTsItem && (
                    <div className="flex gap-2 items-center select-none mr-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!tlhm_selectedCatalog) return;
                          const currentList = getParamsListMerged(tlhm_selectedCatalog);
                          const duplicatedVal = {
                            ...editingTsItem,
                            id: `TS-NEW-${Date.now()}`,
                            name: `${editingTsItem.name} - Bản sao`,
                            stt: String(currentList.length + 1),
                            source: 'ĐV',
                            createdAt: '22/06/2026',
                            createdBy: 'Nguyễn Văn Hải',
                            updatedAt: '22/06/2026',
                            updatedBy: 'Nguyễn Văn Hải'
                          };
                          const updatedList = [...currentList, duplicatedVal];
                          setTlhm_paramsMap(prev => ({
                            ...prev,
                            [tlhm_selectedCatalog.id]: updatedList
                          }));
                          setEditingTsItem(duplicatedVal);
                          setIsTsViewMode(false);
                          setNewTsSTT(duplicatedVal.stt);
                          setNewTsName(duplicatedVal.name);
                          setNewTsUnit(duplicatedVal.unit || '');
                          setNewTsMeasureType(duplicatedVal.measureType || 'Nhập Số');
                          setNewTsLimit(duplicatedVal.limit || '');
                          setNewTsStandard(duplicatedVal.standard || '');
                          setNewTsNote(duplicatedVal.note || '');
                        }}
                        className="flex items-center justify-center p-2 text-green-600 bg-transparent hover:bg-green-50/50 rounded-lg transition-all cursor-pointer"
                        title="Sao chép thông số này sang cấp Đơn vị để tùy biến"
                      >
                        <Copy className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      {editingTsItem.source === 'ĐV' && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setIsTsViewMode(false);
                            }}
                            className="flex items-center justify-center p-2 text-blue-600 border border-transparent hover:border-blue-200 hover:bg-blue-50/50 rounded-lg transition-all cursor-pointer"
                            title="Sửa thông số này"
                          >
                            <Edit className="w-4 h-4 stroke-[2.5]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!tlhm_selectedCatalog) return;
                              setLocalConfirmAction({
                                title: 'Xác nhận xóa thông số',
                                message: 'Bạn có chắc chắn muốn xóa thông số kỹ thuật này không?',
                                onConfirm: () => {
                                  const currentList = getParamsListMerged(tlhm_selectedCatalog);
                                  const updatedList = currentList.filter(item => item.id !== editingTsItem.id);
                                  setTlhm_paramsMap(prev => ({
                                    ...prev,
                                    [tlhm_selectedCatalog.id]: updatedList
                                  }));
                                  setShowAddTsModal(false);
                                  setEditingTsItem(null);
                                  setLocalConfirmAction(null);
                                }
                              });
                            }}
                            className="flex items-center justify-center p-2 text-red-600 bg-transparent hover:bg-red-50/50 rounded-lg transition-all cursor-pointer"
                            title="Xóa thông số"
                          >
                            <Trash2 className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  <button 
                    onClick={() => setShowAddTsModal(false)}
                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-700 border-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content & Attachments - Two Column Layout (NO CONTEXT BAR, NO BỐI CẢNH) */}
              <div className="p-6 md:p-8 flex gap-8 overflow-y-auto custom-scrollbar flex-1">
                
                {/* Column Left: Input Fields (50% Width) */}
                <div className="w-1/2 flex flex-col gap-3.5">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1">STT</label>
                      <input
                        type="text"
                        disabled={isTsViewMode}
                        value={newTsSTT}
                        onChange={e => setNewTsSTT(e.target.value)}
                        placeholder="1"
                        className="w-full px-3 py-2 text-[10pt] font-bold bg-slate-50/50 disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-mono text-slate-700"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1">Tên thông số đo <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        disabled={isTsViewMode}
                        value={newTsName}
                        onChange={e => setNewTsName(e.target.value)}
                        placeholder="Nhập tên thông số kiểm thử cụ thể..."
                        className="w-full px-4 py-2 text-[10pt] font-semibold bg-white disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1">Đơn vị đo (ĐVT)</label>
                      <input
                        type="text"
                        disabled={isTsViewMode}
                        value={newTsUnit}
                        onChange={e => setNewTsUnit(e.target.value)}
                        placeholder="MΩ, kΩ, kV, %..."
                        className="w-full px-4 py-2 text-[10pt] font-semibold bg-white disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1">Kiểu đo</label>
                      <select
                        disabled={isTsViewMode}
                        value={newTsMeasureType}
                        onChange={e => setNewTsMeasureType(e.target.value as any)}
                        className="w-full px-4 py-2 text-[10pt] font-bold bg-white disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer text-slate-700"
                      >
                        <option value="Nhập Số">Nhập Số</option>
                        <option value="Có/Không">Có/Không</option>
                        <option value="Nhập Text">Nhập Text</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1">Giới hạn trị số</label>
                      <input
                        type="text"
                        disabled={isTsViewMode}
                        value={newTsLimit}
                        onChange={e => setNewTsLimit(e.target.value)}
                        placeholder="Nhập giới hạn, ví dụ: ≥ 1000..."
                        className="w-full px-4 py-2 text-[10pt] font-semibold bg-white disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1">Tiêu chuẩn ban hành</label>
                      <input
                        type="text"
                        disabled={isTsViewMode}
                        value={newTsStandard}
                        onChange={e => setNewTsStandard(e.target.value)}
                        placeholder="Ví dụ: TCVN 11845 hoặc IEC..."
                        className="w-full px-4 py-2 text-[10pt] font-semibold bg-white disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8.5pt] font-black text-slate-400 uppercase tracking-widest mb-1">Ghi chú cụ thể</label>
                    <textarea
                      disabled={isTsViewMode}
                      value={newTsNote}
                      onChange={e => setNewTsNote(e.target.value)}
                      placeholder="Ghi chú thêm về điều kiện đo, cách thức đo đạc thông số..."
                      rows={3}
                      className="w-full px-4 py-3 text-[10pt] bg-white disabled:bg-slate-100/70 border border-slate-200/80 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none font-semibold text-slate-800"
                    />
                  </div>

                  {/* Metadata Info Panel */}
                  {editingTsItem && (
                    <div className="mt-4 p-3.5 bg-slate-50 border border-slate-150 rounded-xl space-y-2 text-[8.5pt]">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-gray-700 uppercase tracking-wider text-[7.5pt]">Cấp khởi tạo:</span>
                        <span className={`px-2 py-0.5 rounded text-[8pt] font-black border ${
                          editingTsItem.source === 'EVN'
                            ? 'bg-red-50 text-red-700 border-red-100'
                            : editingTsItem.source === 'TCT'
                            ? 'bg-orange-50 text-orange-700 border-orange-100'
                            : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          {editingTsItem.source || 'ĐV'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200/60">
                        <div>
                          <div className="text-gray-700 text-[7.5pt] font-black uppercase tracking-wider">Người khởi tạo</div>
                          <div className="font-bold text-slate-700">{(editingTsItem as any).createdBy || 'Hệ thống'}</div>
                          <div className="text-[8pt] text-slate-450 font-mono font-bold mt-0.5">{(editingTsItem as any).createdAt || '01/01/2026'}</div>
                        </div>
                        <div>
                          <div className="text-gray-700 text-[7.5pt] font-black uppercase tracking-wider">Người cập nhật</div>
                          <div className="font-bold text-slate-700">{(editingTsItem as any).updatedBy || 'Hệ thống'}</div>
                          <div className="text-[8pt] text-slate-450 font-mono font-bold mt-0.5">{(editingTsItem as any).updatedAt || '01/01/2026'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Column Right: References Section (50% Width + Divider) */}
                <div className="w-1/2 flex flex-col gap-5 border-l border-slate-200/70 pl-8">
                  <div>
                    <h4 className="text-[9pt] font-black text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#164399]" /> Tài liệu tham chiếu
                    </h4>
                    
                    {/* Upload Buttons */}
                    {!isTsViewMode && (
                      <div className="grid grid-cols-2 gap-2.5 mb-3.5 select-none">
                        <button
                          type="button"
                          className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-[#164399]/40 hover:border-[#164399] bg-blue-50/20 rounded-xl text-[8.5pt] font-bold text-[#164399] hover:bg-blue-50/50 transition-all cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" /> Tải lên tài liệu
                        </button>
                        <button
                          type="button"
                          className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl text-[8.5pt] font-bold text-slate-600 transition-all cursor-pointer"
                        >
                          <Layers className="w-3.5 h-3.5" /> Từ thư viện
                        </button>
                      </div>
                    )}

                    {/* Simple List Grid matching global App design */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 bg-slate-50/60 rounded-xl border border-slate-100 text-[8.5pt]">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-red-500 shrink-0" />
                          <span className="font-semibold text-slate-700 truncate">Giay_chung_nhan_hieu_chuan_{activeDevice?.code || 'Device'}.pdf</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <span className="text-[7.5pt] text-slate-400 font-mono font-bold mr-1.5">250 KB</span>
                          <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500" title="Tải xuống"><Download className="w-3 h-3" /></button>
                          {!isTsViewMode && <button type="button" className="p-1.5 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors rounded-[20%] border-none cursor-pointer">
<Trash2 className="w-3 h-3" />
</button>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reference Image with preview */}
                  <div>
                    <h4 className="text-[9pt] font-black text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-[#164399]" /> Hình ảnh tham khảo
                    </h4>

                    {!isTsViewMode && (
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/40 rounded-xl text-[8.5pt] font-bold text-slate-600 hover:bg-slate-50 transition-all mb-3 cursor-pointer"
                      >
                        <Image className="w-3.5 h-3.5" /> Tải lên hình ảnh mẫu
                      </button>
                    )}

                    {/* Image Mockup container styled elegantly */}
                    <div className="relative border border-slate-200 rounded-xl overflow-hidden aspect-video bg-slate-100/50 flex flex-col items-center justify-center text-center p-4">
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 hover:bg-slate-900/10 transition-colors cursor-pointer">
                        <Image className="w-8 h-8 text-slate-300" />
                      </div>
                      <span className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-[7.5pt] font-bold py-1 px-2 rounded-lg truncate text-center select-none">
                        So_do_dau_noi_thong_so_{activeDevice?.code || 'TB'}.png
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-150 flex justify-end gap-3 shrink-0">
                {isTsViewMode ? (
                  <button
                    type="button"
                    onClick={() => setShowAddTsModal(false)}
                    className="px-6 py-2 text-[10pt] font-black bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    Đóng
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowAddTsModal(false)}
                      className="px-5 py-2 text-[10pt] font-bold text-gray-500 hover:text-gray-800 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      disabled={!newTsName.trim()}
                      onClick={handleSaveNewTs}
                      className="px-6 py-2 text-[10pt] font-black bg-[#164399] text-white hover:bg-blue-800 rounded-lg transition-all shadow-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      Lưu
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pop-up Chọn hạng mục từ Danh sách kiểm tra inside Thiết lập hạng mục */}
        {showAddHmFromListModal && (
          <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
              onClick={() => setShowAddHmFromListModal(false)}
            ></div>
            <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                    <ListPlus className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[12.5pt] font-black text-gray-700 tracking-tight leading-tight">Chọn hạng mục từ Danh sách kiểm tra</h3>
                    <p className="text-[8.5pt] text-slate-400 font-medium mt-0.5">Thêm nhanh nhiều hạng mục tiêu chuẩn của các loại thiết bị</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddHmFromListModal(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Filter controls row */}
              <div className="p-3 bg-slate-50/60 border-b border-gray-200/85 grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
                <div className="flex flex-col gap-1">
                  <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Cấp điện áp</label>
                  <select 
                    value={hmListVoltageFilter}
                    onChange={(e) => setHmListVoltageFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Tất cả">Tất cả cấp điện áp</option>
                    <option value="110kV">Cấp 110kV</option>
                    <option value="220kV">Cấp 220kV</option>
                    <option value="500kV">Cấp 500kV</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Loại thiết bị</label>
                  <select 
                    value={hmListDeviceTypeFilter}
                    onChange={(e) => setHmListDeviceTypeFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Tất cả">Tất cả thiết bị</option>
                    <option value="MBA">Máy biến áp (MBA)</option>
                    <option value="MC">Máy cắt (MC)</option>
                    <option value="TI">Biến dòng điện (TI)</option>
                    <option value="TU">Biến điện áp (TU)</option>
                    <option value="CSV">Chống sét van (CSV)</option>
                    <option value="DCL">Dao cách ly (DCL)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Tìm kiếm nhanh</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={hmListSearchQuery}
                      onChange={(e) => setHmListSearchQuery(e.target.value)}
                      placeholder="Nhập tên hạng mục cần tìm..."
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-255 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500 placeholder-slate-400"
                    />
                    <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Content Table list */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-slate-50/20">
                <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-slate-150">
                  <thead className="bg-[#eaf0fa] text-[#154194] leading-none select-none border-b border-gray-250">
                    <tr>
                      <th className="px-4 py-3 w-12 text-center text-[8pt] font-black uppercase tracking-wider">Chọn</th>
                      <th className="px-3 py-3 w-20 text-center text-[8pt] font-black uppercase tracking-wider">Mã số</th>
                      <th className="px-4 py-3 text-[8pt] font-black uppercase tracking-wider">Mô tả danh mục kiểm tra</th>
                      <th className="px-3 py-3 w-28 text-center text-[8pt] font-black uppercase tracking-wider">Đánh giá bằng</th>
                      <th className="px-3 py-3 w-16 text-center text-[8pt] font-black uppercase tracking-wider">Cấp áp</th>
                      <th className="px-3 py-3 w-20 text-center text-[8pt] font-black uppercase tracking-wider">Thiết bị</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150 text-[9pt] font-semibold text-gray-800">
                    {MASTER_CATALOGS_TEMPLATE.filter(item => {
                      const matchesVol = hmListVoltageFilter === 'Tất cả' || item.voltage === hmListVoltageFilter;
                      const matchesDev = hmListDeviceTypeFilter === 'Tất cả' || item.deviceType === hmListDeviceTypeFilter;
                      const matchesQuery = !hmListSearchQuery.trim() || item.name.toLowerCase().includes(hmListSearchQuery.toLowerCase().trim());
                      return matchesVol && matchesDev && matchesQuery;
                    }).length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-gray-400 italic bg-slate-50/25">
                          Không tìm thấy hạng mục kiểm tra tiêu chuẩn nào phù hợp với bộ lọc hiện tại.
                        </td>
                      </tr>
                    ) : (
                      MASTER_CATALOGS_TEMPLATE.filter(item => {
                        const matchesVol = hmListVoltageFilter === 'Tất cả' || item.voltage === hmListVoltageFilter;
                        const matchesDev = hmListDeviceTypeFilter === 'Tất cả' || item.deviceType === hmListDeviceTypeFilter;
                        const matchesQuery = !hmListSearchQuery.trim() || item.name.toLowerCase().includes(hmListSearchQuery.toLowerCase().trim());
                        return matchesVol && matchesDev && matchesQuery;
                      }).map((item) => {
                        const isChecked = hmListSelectedIds.includes(item.id);
                        return (
                          <tr 
                            key={item.id}
                            onClick={() => {
                              if (isChecked) {
                                setHmListSelectedIds(prev => prev.filter(x => x !== item.id));
                              } else {
                                setHmListSelectedIds(prev => [...prev, item.id]);
                              }
                            }}
                            className={`cursor-pointer transition-colors ${isChecked ? 'bg-blue-50/35 hover:bg-blue-50/50' : 'hover:bg-slate-50/50 bg-white'}`}
                          >
                            <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setHmListSelectedIds(prev => [...prev, item.id]);
                                  } else {
                                    setHmListSelectedIds(prev => prev.filter(x => x !== item.id));
                                  }
                                }}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                              />
                            </td>
                            <td className="px-3 py-3.5 text-center font-mono font-bold text-[#164399]">{item.code}</td>
                            <td className="px-4 py-3.5 text-left">
                              <div className="font-bold text-slate-755 leading-snug">{item.name}</div>
                              {item.note && <div className="text-[7.5pt] text-slate-450 font-normal italic mt-0.5 leading-snug">{item.note}</div>}
                            </td>
                            <td className="px-3 py-3.5 text-center">
                              <span className="text-[7.5pt] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200/50">
                                {item.valueType}
                              </span>
                            </td>
                            <td className="px-3 py-3.5 text-center font-mono text-slate-505">{item.voltage}</td>
                            <td className="px-3 py-3.5 text-center font-mono">
                              <span className="text-[8pt] font-black uppercase text-[#154194] bg-[#eaf0fa] px-2 py-0.5 rounded">
                                {item.deviceType}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer with counts & apply */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-200 flex justify-between items-center shrink-0">
                <span className="text-[8.5pt] font-bold text-slate-500 italic">
                  Đã chọn <span className="font-extrabold text-[#164399]">{hmListSelectedIds.length}</span> hạng mục kiểm tra tiêu chuẩn
                </span>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setShowAddHmFromListModal(false)}
                    className="px-4.5 py-1.5 border border-gray-250 bg-white hover:bg-slate-100 text-gray-655 font-bold rounded-lg text-[9pt] transition-colors cursor-pointer select-none"
                  >
                    Bỏ qua
                  </button>
                  <button
                    onClick={handleAddHmFromTemplateList}
                    disabled={hmListSelectedIds.length === 0}
                    className="px-5 py-1.5 bg-[#164399] hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-lg text-[9pt] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" /> Liên kết hạng mục ({hmListSelectedIds.length})
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Pop-up Chọn thông số đo kỹ thuật inside Thiết lập hạng mục */}
        {showAddTsFromListModal && (
          <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setShowAddTsFromListModal(false)}
            ></div>
            <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#eaf0fa] text-[#154194] rounded-xl shrink-0">
                    <ListPlus className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[12.5pt] font-black text-gray-700 tracking-tight leading-tight">Chọn thông số đo từ Danh sách mẫu</h3>
                    <p className="text-[8.5pt] text-slate-400 font-medium mt-0.5">Liên kết nhanh các thông số đo kiểm kỹ thuật của loại thiết bị vào hạng mục: <span className="font-extrabold text-[#164399] underline">{tlhm_selectedCatalog?.name}</span></p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddTsFromListModal(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Filter controls row */}
              <div className="p-3 bg-slate-50/60 border-b border-gray-200/85 grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
                <div className="flex flex-col gap-1">
                  <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Cấp điện áp</label>
                  <select 
                    value={tsListVoltageFilter}
                    onChange={(e) => setTsListVoltageFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Tất cả">Tất cả cấp điện áp</option>
                    <option value="110kV">Cấp 110kV</option>
                    <option value="220kV">Cấp 220kV</option>
                    <option value="500kV">Cấp 500kV</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Loại thiết bị</label>
                  <select 
                    value={tsListDeviceTypeFilter}
                    onChange={(e) => setTsListDeviceTypeFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Tất cả">Tất cả thiết bị</option>
                    <option value="MBA">Máy biến áp (MBA)</option>
                    <option value="MC">Máy cắt (MC)</option>
                    <option value="TI">Biến dòng điện (TI)</option>
                    <option value="TU">Biến điện áp (TU)</option>
                    <option value="CSV">Chống sét van (CSV)</option>
                    <option value="DCL">Dao cách ly (DCL)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Tìm kiếm nhanh</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={tsListSearchQuery}
                      onChange={(e) => setTsListSearchQuery(e.target.value)}
                      placeholder="Nhập tên thông số kỹ thuật..."
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-255 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500 placeholder-slate-400"
                    />
                    <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Content Table list */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-slate-50/20">
                <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-slate-150">
                  <thead className="bg-[#eaf0fa] text-[#154194] leading-none select-none border-b border-gray-250">
                    <tr>
                      <th className="px-4 py-3 w-12 text-center text-[8pt] font-black uppercase tracking-wider">Chọn</th>
                      <th className="px-3 py-3 w-16 text-center text-[8pt] font-black uppercase tracking-wider">STT</th>
                      <th className="px-4 py-3 text-[8pt] font-black uppercase tracking-wider">Tên thông số đo kỹ thuật</th>
                      <th className="px-3 py-3 w-24 text-center text-[8pt] font-black uppercase tracking-wider">Đơn vị</th>
                      <th className="px-3 py-3 w-28 text-center text-[8pt] font-black uppercase tracking-wider">Kiểu nhập</th>
                      <th className="px-3 py-3 w-36 text-center text-[8pt] font-black uppercase tracking-wider">Giới hạn tiêu chuẩn</th>
                      <th className="px-3 py-3 w-16 text-center text-[8pt] font-black uppercase tracking-wider">Cấp áp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150 text-[9pt] font-semibold text-gray-800">
                    {MASTER_PARAMS_TEMPLATE.filter(item => {
                      const matchesVol = tsListVoltageFilter === 'Tất cả' || item.voltage === tsListVoltageFilter;
                      const matchesDev = tsListDeviceTypeFilter === 'Tất cả' || item.deviceType === tsListDeviceTypeFilter;
                      const matchesQuery = !tsListSearchQuery.trim() || item.name.toLowerCase().includes(tsListSearchQuery.toLowerCase().trim());
                      return matchesVol && matchesDev && matchesQuery;
                    }).length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-gray-400 italic bg-slate-50/25">
                          Không tìm thấy thông số mẫu nào phù hợp với bộ lọc hiện tại.
                        </td>
                      </tr>
                    ) : (
                      MASTER_PARAMS_TEMPLATE.filter(item => {
                        const matchesVol = tsListVoltageFilter === 'Tất cả' || item.voltage === tsListVoltageFilter;
                        const matchesDev = tsListDeviceTypeFilter === 'Tất cả' || item.deviceType === tsListDeviceTypeFilter;
                        const matchesQuery = !tsListSearchQuery.trim() || item.name.toLowerCase().includes(tsListSearchQuery.toLowerCase().trim());
                        return matchesVol && matchesDev && matchesQuery;
                      }).map((item, index) => {
                        const isChecked = tsListSelectedIds.includes(item.id);
                        return (
                          <tr 
                            key={item.id}
                            onClick={() => {
                              if (isChecked) {
                                setTsListSelectedIds(prev => prev.filter(x => x !== item.id));
                              } else {
                                setTsListSelectedIds(prev => [...prev, item.id]);
                              }
                            }}
                            className={`cursor-pointer transition-colors ${isChecked ? 'bg-blue-50/35 hover:bg-blue-50/50' : 'hover:bg-slate-50/50 bg-white'}`}
                          >
                            <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setTsListSelectedIds(prev => [...prev, item.id]);
                                  } else {
                                    setTsListSelectedIds(prev => prev.filter(x => x !== item.id));
                                  }
                                }}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                              />
                            </td>
                            <td className="px-3 py-3.5 text-center font-mono font-bold text-slate-400">{index + 1}</td>
                            <td className="px-4 py-3.5 text-left font-bold text-slate-755 leading-snug">{item.name}</td>
                            <td className="px-3 py-3.5 text-center font-mono font-bold text-slate-500">{item.unit}</td>
                            <td className="px-3 py-3.5 text-center font-bold text-blue-705 bg-blue-50/20">{item.measureType}</td>
                            <td className="px-3 py-3.5 text-center font-semibold text-[#164399] bg-slate-50/50">{item.limit} ({item.standard})</td>
                            <td className="px-3 py-3.5 text-center font-mono text-slate-505">{item.voltage}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer with counts & apply */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-200 flex justify-between items-center shrink-0">
                <span className="text-[8.5pt] font-bold text-slate-500 italic">
                  Đã chọn <span className="font-extrabold text-[#164399]">{tsListSelectedIds.length}</span> thông số đo kỹ thuật tiêu chuẩn
                </span>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setShowAddTsFromListModal(false)}
                    className="px-4.5 py-1.5 border border-gray-250 bg-white hover:bg-slate-100 text-gray-655 font-bold rounded-lg text-[9pt] transition-colors cursor-pointer select-none"
                  >
                    Bỏ qua
                  </button>
                  <button
                    onClick={handleAddTsFromTemplateList}
                    disabled={tsListSelectedIds.length === 0}
                    className="px-5 py-1.5 bg-[#164399] hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-lg text-[9pt] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" /> Liên kết thông số ({tsListSelectedIds.length})
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    );
  };

  const handleSaveStandardItem = () => {
    if (!newStdName.trim()) return;
    const catKey = `${configTestType}-${configDevType}`;
    const currentList = standardsMap[catKey] || [];
    const cleanMin = newStdLimitMin.trim();
    const cleanMax = newStdLimitMax.trim();
    let combinedLimit = '-';
    if (cleanMin && cleanMin !== '-' && cleanMax && cleanMax !== '-') {
      combinedLimit = `${cleanMin} ~ ${cleanMax}`;
    } else if (cleanMin && cleanMin !== '-') {
      combinedLimit = cleanMin.startsWith('≥') ? cleanMin : `≥ ${cleanMin}`;
    } else if (cleanMax && cleanMax !== '-') {
      combinedLimit = cleanMax.startsWith('≤') ? cleanMax : `≤ ${cleanMax}`;
    }

    // Determine target index based on STT input
    let targetIdx = parseInt(newStdSTT, 10);
    if (isNaN(targetIdx) || targetIdx < 1) {
      targetIdx = editingStdItem ? (currentList.findIndex(item => item.id === editingStdItem.id) + 1) : (currentList.length + 1);
    }
    const maxPoss = currentList.length + (editingStdItem ? 0 : 1);
    const finalTargetIdx = Math.max(0, Math.min(targetIdx - 1, maxPoss - 1));

    if (editingStdItem) {
      const currentIdx = currentList.findIndex(item => item.id === editingStdItem.id);
      if (currentIdx !== -1) {
        const updatedItem = {
          ...editingStdItem,
          name: newStdName.trim(),
          unit: newStdUnit.trim() || '-',
          limitMin: cleanMin || '-',
          limitMax: cleanMax || '-',
          limit: combinedLimit,
          standard: newStdStandard.trim() || 'TCVN',
          valueType: newStdValueType,
          note: newStdNote.trim()
        };
        const filteredList = currentList.filter(item => item.id !== editingStdItem.id);
        filteredList.splice(finalTargetIdx, 0, updatedItem);
        setStandardsMap(prev => ({
          ...prev,
          [catKey]: filteredList
        }));
      }
    } else {
      const newId = `S${currentList.length + 1}-${Date.now()}`;
      const newItem = {
        id: newId,
        name: newStdName.trim(),
        unit: newStdUnit.trim() || '-',
        limitMin: cleanMin || '-',
        limitMax: cleanMax || '-',
        limit: combinedLimit,
        standard: newStdStandard.trim() || 'TCVN',
        valueType: newStdValueType,
        note: newStdNote.trim()
      };
      const updatedList = [...currentList];
      updatedList.splice(finalTargetIdx, 0, newItem);
      setStandardsMap(prev => ({
         ...prev,
         [catKey]: updatedList
      }));
    }

    setNewStdName('');
    setNewStdUnit('');
    setNewStdLimitMin('');
    setNewStdLimitMax('');
    setNewStdStandard('');
    setNewStdValueType('Số');
    setNewStdNote('');
    setNewStdSTT('');
    setEditingStdItem(null);
    setShowAddEditModal(false);
  };

  const handleDeleteStandardItem = (id: string) => {
    const catKey = `${configTestType}-${configDevType}`;
    const currentList = standardsMap[catKey] || [];
    setStandardsMap(prev => ({
      ...prev,
      [catKey]: currentList.filter(item => item.id !== id)
    }));
  };

  const getTypeKey = (type: string) => {
    const t = type?.toUpperCase() || '';
    if (t === 'MBA' || t === 'MÁY BIẾN ÁP' || t === 'TRẠM') return 'MBA';
    if (t === 'MC' || t === 'MÁY CẮT' || t.includes('SF6')) return 'MC';
    if (t === 'TI' || t === 'BIẾN DÒNG' || t === 'BIẾN DÒNG ĐIỆN') return 'TI';
    if (t === 'TU' || t === 'BIẾN ĐIỆN ÁP') return 'TU';
    if (t === 'CSV' || t === 'CHỐNG SÉT VAN') return 'CSV';
    if (t === 'ĐD' || t === 'ĐƯỜNG DÂY') return 'ĐD';
    return 'Other';
  };

  const getDeviceVoltage = (cat: any) => {
    if (!cat) return '110kV';
    const text = `${cat.device} ${cat.location || ''}`.toLowerCase();
    if (text.includes('110kv') || text.includes('110 kv')) return '110kV';
    if (text.includes('220kv') || text.includes('220 kv')) return '220kV';
    if (text.includes('35kv') || text.includes('35 kv')) return '35kV';
    if (text.includes('22kv') || text.includes('22 kv')) return '22kV';
    if (text.includes('500kv') || text.includes('500 kv')) return '500kV';
    if (text.includes('6kv') || text.includes('6 kv')) return '6kV';
    if (text.includes('0.4kv') || text.includes('0.4 kv') || text.includes('0,4kv')) return '0.4kV';
    return '110kV';
  };

  const itemsPerPage = 10;
  const availableTypesList = ['Trạm', 'Máy biến áp', 'Máy cắt', 'Biến dòng', 'Biến điện áp', 'Đường dây', 'Chống sét van'];
  const statusColors: Record<string, string> = {
    'Quá hạn': 'bg-red-50 text-red-600 border border-red-100',
    'Đến hạn': 'bg-amber-50 text-amber-600 border border-amber-100',
    'Sắp đến hạn': 'bg-blue-50 text-blue-600 border border-blue-100',
    'Bình thường': 'bg-green-50 text-green-600 border border-green-100',
  };

  const isClassificationLevel = (name: string) => {
    const n = name?.trim()?.toLowerCase() || '';
    if (!n) return true;
    const genericLevels = [
      'tất cả', 'trạm', 'nút', 'ngăn lộ', 'máy biến áp', 'máy cắt', 'biến dòng', 
      'biến điện áp', 'đường dây', 'chống sét van', 'thiết bị', 'loại thiết bị'
    ];
    return genericLevels.includes(n) || n === 'mba' || n === 'mc' || n === 'ti' || n === 'tu' || n === 'csv';
  };

  const realDevicesPath = (devicePath || []).filter(p => !isClassificationLevel(p));

  const lastDeviceName = realDevicesPath[realDevicesPath.length - 1] || 'Thiết bị';

  const getTestTypeForCat = (cat: any) => {
    const id = Number(cat.id);
    if (id % 3 === 1) return 'Kiểm định';
    if (id % 3 === 2) return 'Hiệu chuẩn';
    return 'Thí nghiệm';
  };

  const getSubTestTypeForCat = (cat: any) => {
    const id = Number(cat.id);
    const types = ["Định kỳ", "Trước lắp đặt", "Sau lắp đặt", "Sau sửa chữa", "Đột xuất"];
    return types[id % types.length];
  };

  const isDescendantOfCurrent = (cat: any): boolean => {
    if (!lastDeviceName || lastDeviceName === 'Thiết bị' || lastDeviceName === 'Công ty Điện lực Hưng Yên' || lastDeviceName.includes('Danh mục thí nghiệm') || lastDeviceName.includes('Thiết lập thí nghiệm')) {
      return true;
    }
    
    const target = lastDeviceName.toLowerCase().trim();
    
    let current = cat;
    while (current) {
      const dev = current.device.toLowerCase();
      const loc = (current.location || '').toLowerCase();
      const code = (current.code || '').toLowerCase();
      
      // Direct matching
      if (dev.includes(target) || target.includes(dev) || loc.includes(target) || target.includes(loc) || code.includes(target)) {
        return true;
      }
      
      // Broad branch keyword matching
      const keywords = ['phố nối', 'khoái châu', 'gia lâm', 'kim động', 'văn lâm', 'mỹ hào', 'giai phạm', 'thành phố hưng yên', 'tp hưng yên', 'điện lực thành phố hưng yên'];
      for (const kw of keywords) {
        if (target.includes(kw) && (dev.includes(kw) || loc.includes(kw))) {
          return true;
        }
      }
      
      if (current.parentId) {
        current = MOCK_TESTING_CATALOG.find(x => x.id === current.parentId);
      } else {
        break;
      }
    }
    
    return false;
  };

  // Filter Catalog Items
  const filteredCats = MOCK_TESTING_CATALOG.filter(cat => {
    // Filter by test type listbox ("Thí nghiệm" | "Kiểm định" | "Hiệu chuẩn")
    if (getTestTypeForCat(cat) !== activeTestType) return false;

    // Filter by status options ("Quá hạn" | "Đến hạn" | "Tất cả")
    if (headerStatusFilter === 'Quá hạn' && cat.status !== 'Quá hạn') return false;
    if (headerStatusFilter === 'Đến hạn' && cat.status !== 'Đến hạn') return false;

    // Filter by descendant of selected device node on tree
    if (!isDescendantOfCurrent(cat)) return false;

    // Search filter
    const matchesSearch = 
      cat.device.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (cat.code && cat.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (cat.location && cat.location.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Type Filter
    const normType = normalizeType(cat.type);
    const matchesType = selectedTypes.length === 0 || selectedTypes.some(t => {
      const normT = normalizeType(t);
      return normType === normT || cat.type?.toUpperCase().includes(t.toUpperCase());
    });

    // Status Filter
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(cat.status);

    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate Pagination
  const totalItems = filteredCats.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCats = filteredCats.slice(startIndex, startIndex + itemsPerPage);

  // Get active item details
  const effectiveCatId = selectedCatId || (filteredCats[0]?.id) || null;
  const activeCat = filteredCats.find(c => c.id === effectiveCatId) || filteredCats[0] || null;

  // Retrieve matching historical records dynamically from MOCK_TESTING_DATA
  const getRelatedHistory = () => {
    if (!activeCat) return [];
    const catNameLower = activeCat.device.toLowerCase();
    const catType = activeCat.type;
    const catTypeNormalized = normalizeType(catType).toLowerCase();
    
    let matches = MOCK_TESTING_DATA.filter(hist => {
      const histDeviceLower = hist.device.toLowerCase();
      return (
        histDeviceLower.includes(catNameLower) || 
        catNameLower.includes(histDeviceLower) ||
        (catType === 'Trạm' && (hist.device.includes('TBA') || hist.device.includes('Trạm'))) ||
        (catType === 'Máy biến áp' && hist.device.includes('T1'))
      );
    });

    if (matches.length === 0) {
      matches = MOCK_TESTING_DATA.filter(hist => {
        const histDeviceLower = hist.device.toLowerCase();
        return (
          histDeviceLower.includes(catTypeNormalized) ||
          (catTypeNormalized === 'máy biến áp' && (histDeviceLower.includes('mba') || histDeviceLower.includes('máy biến áp'))) ||
          (catTypeNormalized === 'máy cắt' && (histDeviceLower.includes('mc') || histDeviceLower.includes('máy cắt'))) ||
          (catTypeNormalized === 'biến dòng' && (histDeviceLower.includes('ti') || histDeviceLower.includes('biến dòng'))) ||
          (catTypeNormalized === 'biến điện áp' && (histDeviceLower.includes('tu') || histDeviceLower.includes('biến điện áp'))) ||
          (catTypeNormalized === 'chống sét van' && (histDeviceLower.includes('csv') || histDeviceLower.includes('chống sét van')))
        );
      });
    }

    if (matches.length === 0) {
      matches = MOCK_TESTING_DATA;
    }

    return matches;
  };

  const relatedHistory = getRelatedHistory();

  useEffect(() => {
    if (filteredCats.length > 0) {
      if (!filteredCats.some(c => c.id === selectedCatId)) {
        setSelectedCatId(filteredCats[0].id);
      }
    } else {
      setSelectedCatId(null);
    }
  }, [activeTestType, searchQuery, lastDeviceName]);

  // Reset page when queries change
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(x => x !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(x => x !== status) : [...prev, status]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setCurrentPage(1);
  };

  if (activeSubMenu === 'Thiết lập hạng mục') {
    return renderThietLapHangMucView();
  }

  return (
    <div className="bg-[#F8FAFC] flex flex-col h-full overflow-hidden text-[12pt] font-sans">
      
      {/* Dynamic Header exactly matching the Device List layout with absolute premium elements */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0 shadow-sm relative z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveSubMenu(null)} 
              className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors"
              id="back-button-catalog"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-[12pt] font-semibold flex items-center gap-1.5 leading-[1.5]">
                <span className="text-[#555555]">Thiết lập</span>
                <span className="font-bold text-[#164399] tracking-tight">- Danh sách thiết bị chi tiết của {lastDeviceName}</span>
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Premium Pill Switch: Option "Quá hạn" (mặc định, đỏ) | "Đến hạn" (da cam) | "Tất cả" (xám) */}
            <div className="hidden md:flex bg-slate-100 p-0.5 rounded-full border border-slate-200 shadow-inner shrink-0 leading-none h-10 items-center">
              {([
                { value: 'Quá hạn', label: 'Quá hạn', activeClass: 'bg-red-600 text-white shadow-md', inactiveClass: 'text-red-600 hover:bg-red-50' },
                { value: 'Đến hạn', label: 'Đến hạn', activeClass: 'bg-orange-500 text-white shadow-md', inactiveClass: 'text-orange-600 hover:bg-orange-50' },
                { value: 'Tất cả', label: 'Tất cả', activeClass: 'bg-gray-500 text-white shadow-md', inactiveClass: 'text-gray-500 hover:bg-gray-100' }
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setHeaderStatusFilter(opt.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 h-full rounded-full transition-all font-bold tracking-tight text-center cursor-pointer flex items-center justify-center text-[9.5pt] ${
                    headerStatusFilter === opt.value 
                      ? opt.activeClass 
                      : `text-slate-500 ${opt.inactiveClass}`
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className={`w-10 h-10 rounded-[10px] border transition-all cursor-pointer flex items-center justify-center ${showFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
                title="Ẩn/Hiện thanh lọc"
                id="toggle-filter-catalog"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Clean, fast Filter Bar Row matching Device List style */}
        {showFilter && (
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-[10px] animate-in slide-in-from-top-2 duration-300">
            {/* Type selector pillar */}
            <div className="flex flex-col gap-1">
              <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider">Loại thiết bị</label>
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap items-center gap-1 min-h-[36px] bg-white px-2 py-1 rounded-[12px] border border-gray-200 min-w-[210px] max-w-[450px]">
                  {selectedTypes.length === 0 ? (
                    <span className="text-gray-400 font-bold italic text-[10pt] px-2 py-1">Tất cả loại TB</span>
                  ) : (
                    selectedTypes.map(t => (
                      <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ECF3FE] text-gray-700 text-[9.5pt] font-black rounded-full border border-blue-100 uppercase tracking-tighter">
                        {normalizeType(t)}
                        <button onClick={() => setSelectedTypes(prev => prev.filter(x => x !== t))} className="hover:text-red-500 transition-colors ml-1 focus:outline-none">
                          <X className="w-3 h-3 stroke-[3]" />
                        </button>
                      </span>
                    ))
                  )}
                  <div className="relative">
                    <button 
                      onClick={() => setShowTypeSelector(!showTypeSelector)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-[#164399] transition-all cursor-pointer"
                      title="Chọn loại thiết bị"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                    {showTypeSelector && (
                      <div className="absolute top-full left-0 mt-3 w-60 bg-white border border-gray-200 rounded-lg shadow-2xl z-[100] py-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                          <p className="text-[8.5pt] font-black text-gray-700 uppercase tracking-widest">Chọn loại thiết bị</p>
                        </div>
                        <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                          {availableTypesList.map(t => (
                            <button 
                              key={t}
                              onClick={() => handleTypeSelect(t)}
                              className={`w-full text-left px-4 py-2 text-[10.5pt] font-bold flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${selectedTypes.includes(t) ? 'text-[#164399] bg-blue-50/50' : 'text-gray-600'}`}
                            >
                              {normalizeType(t)}
                              {selectedTypes.includes(t) && (
                                <div className="w-4 h-4 bg-[#164399] rounded-full flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                        <div className="px-4 mt-3 pt-3 border-t border-gray-50">
                          <button 
                            onClick={() => setShowTypeSelector(false)}
                            className="w-full py-2 bg-[#164399] text-white text-[9.5pt] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-blue-900/10 active:scale-95 transition-all cursor-pointer"
                          >
                            XÁC NHẬN
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Status filters */}
            <div className="flex flex-col gap-1">
              <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider">Hạn thí nghiệm</label>
              <div className="flex items-center gap-1 bg-white p-1 rounded-[16px] border border-gray-200">
                {['Bình thường', 'Sắp đến hạn', 'Đến hạn', 'Quá hạn'].map(st => (
                  <button 
                    key={st}
                    onClick={() => handleStatusSelect(st)}
                    className={`px-3 py-1 text-[10pt] rounded-[16px] transition-all whitespace-nowrap cursor-pointer ${selectedStatuses.includes(st) ? 'bg-[#ECF3FE] text-[#164399] font-bold' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick search input */}
            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
              <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider">Tìm kiếm nhanh</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Nhập tên thiết bị, mã hiệu PMIS..."
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full transition-all"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>

            {/* Reset button */}
            {(searchQuery || selectedTypes.length > 0 || selectedStatuses.length > 0) && (
              <button 
                onClick={clearAllFilters}
                className="text-[10pt] font-bold text-red-600 hover:underline px-2 mt-4 cursor-pointer"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main split dual-column layout */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex bg-white overflow-hidden relative">
          
          {/* Left Column: Device Catalog List (45% Width) */}
          <div className="w-[45%] flex flex-col border-r border-gray-200 overflow-hidden px-3.5 py-0 bg-slate-50/40 relative z-10">
            {/* Flat bottom line indicator tabs for Testing/Inspection/Calibration */}
            <div className="flex border-b border-gray-100 bg-white shrink-0 mt-3 mx-1 mb-2">
              {([
                { id: 'Thí nghiệm', label: 'Thí nghiệm' },
                { id: 'Kiểm định', label: 'Kiểm định' },
                { id: 'Hiệu chuẩn', label: 'Hiệu chuẩn' }
              ] as const).map(tab => {
                const isActive = activeTestType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTestType(tab.id);
                      setCurrentPage(1);
                    }}
                    className={`flex-1 h-12 text-center text-[12pt] font-bold transition-all relative cursor-pointer ${
                      isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pl-1.5 pr-2 space-y-3 pt-4 pb-6">
              {totalItems === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-white p-6 text-center shadow-inner">
                  <AlertCircle className="w-10 h-10 text-gray-350 mb-2" />
                  <p className="text-[11pt] font-bold text-gray-400">Không tìm thấy thiết bị thí nghiệm</p>
                  <p className="text-[9.5pt] text-gray-450 mt-1">Vui lòng điều chỉnh từ khóa tìm kiếm hoặc lọc thiết bị</p>
                </div>
              ) : (
                paginatedCats.map((cat, idx) => {
                  const isSelected = activeCat?.id === cat.id;
                  const visual = getCatItemVisual(cat.type, isSelected);
                  const startIndexInPage = (currentPage - 1) * itemsPerPage;
                  
                  return (
                    <div 
                      key={cat.id}
                      onClick={() => {
                        setSelectedCatId(cat.id);
                        setOpenMenuId(null);
                      }}
                      onDoubleClick={() => setDetailForm({ type: 'testing_catalog', mode: 'view', data: cat })}
                      className={`relative group rounded-xl border overflow-visible transition-all duration-300 cursor-pointer w-full ${
                        isSelected 
                          ? 'bg-blue-50/50 border-blue-300 shadow-md transform scale-[1.01]' 
                          : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-md hover:scale-[1.01] hover:bg-slate-50/50 shadow-sm'
                      }`}
                    >
                      {/* Active Left Indicator Strip */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#164399] rounded-l-xl z-20"></div>
                      )}
                      
                      <div className="p-4 flex items-center justify-between gap-4">
                        <div className="flex gap-4 items-start min-w-0 flex-1">
                          {/* Custom Category Icon Container */}
                          <div className="shrink-0">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              cat.status === 'Quá hạn' ? 'bg-red-50 border border-red-100' :
                              cat.status === 'Đến hạn' ? 'bg-amber-50 border border-amber-100' :
                              cat.status === 'Sắp đến hạn' ? 'bg-blue-50 border border-blue-100' :
                              'bg-green-50 border border-green-100'
                            }`}>
                              {cat.status === 'Quá hạn' ? <AlertCircle className="w-6 h-6 text-red-600" /> :
                               cat.status === 'Đến hạn' ? <Clock className="w-6 h-6 text-amber-600" /> :
                               cat.status === 'Sắp đến hạn' ? <Clock className="w-6 h-6 text-blue-600" /> :
                               <CheckCircle2 className="w-6 h-6 text-green-600" />
                              }
                            </div>
                          </div>

                          {/* Title and metadata */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[7.5pt] font-black tracking-wider font-mono px-1.5 py-0.5 rounded-lg bg-slate-100 text-slate-500 border border-slate-200 uppercase shadow-xs select-none">
                                  {(cat as any).voltage || getDeviceVoltage((cat as any).device || '')}
                                </span>
                                <span className="text-[8.5pt] font-black tracking-wider font-mono px-1.5 py-0.5 rounded-lg bg-red-50 text-red-600 border border-red-100 uppercase shadow-xs">
                                  {cat.code || 'CT-N/A'}
                                </span>
                                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all ${isSelected ? 'bg-blue-100 border-blue-200 text-[#164399]' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
                                  <span className="text-gray-700 text-[7.5pt] font-black uppercase tracking-tighter">
                                    {normalizeType(cat.type)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <h4 className={`text-[11.5pt] font-medium mb-1 line-clamp-2 leading-snug transition-colors tracking-tight ${isSelected ? 'text-[#164399]' : 'text-gray-800 group-hover:text-blue-800'}`}>
                              {cat.device}
                            </h4>
                          </div>
                        </div>

                        {/* Right part: Ngày Thí nghiệm / Kiểm định / Hiệu chuẩn tiếp theo */}
                        <div className="flex flex-col items-end shrink-0 text-right bg-slate-50/60 p-2.5 rounded-xl border border-gray-100 group-hover:bg-white transition-all min-w-[125px]">
                          <span className="text-[7.5pt] text-gray-700 font-extrabold uppercase tracking-wider">Ngày tiếp theo</span>
                          <span className="text-[10pt] font-black text-blue-600 tracking-tight mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 opacity-75 text-blue-500" />
                            {cat.nextDue || '15/06/2026'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Custom Pagination Panel styled exactly like the Device list paging */}
            {totalPages > 1 && (
              <div className="py-4 border-t border-gray-200 flex items-center justify-between container-paging shrink-0 bg-white -mx-6 px-6">
                <span className="text-[8.5pt] font-black text-gray-700 uppercase tracking-wider">
                  Xem {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} / {totalItems} hồ sơ
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="p-1.5 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer border-none bg-transparent text-gray-500"
                    id="prev-page-catalog"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1 px-1">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button 
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-7 h-7 rounded-full text-[9pt] font-bold transition-all cursor-pointer border-none ${currentPage === page ? 'bg-blue-100 text-[#164399]' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className="p-1.5 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer border-none bg-transparent text-gray-500"
                    id="next-page-catalog"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Premium Preview Panel */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
            {activeCat ? (
              <>
                 {/* Navigation Tab Header - Unified Pill Design */}
                 <div className="p-1 px-2 bg-white shrink-0 relative z-10">
                   <div className="flex border-b border-gray-100 bg-white w-full">
                     {[
                       { id: 'info', label: 'Thông tin chung' },
                       { id: 'standards', label: 'Hạng mục kiểm tra' },
                       { id: 'history', label: 'Lịch sử' }
                     ].map(tab => {
                       const isActive = activeTab === tab.id;
                       return (
                         <button 
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id as any)}
                           className={`flex-1 h-12 text-[12pt] font-bold transition-all relative cursor-pointer ${
                             isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                           }`}
                         >
                           {tab.label}
                           {isActive && (
                             <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600"></div>
                           )}
                         </button>
                       );
                     })}
                   </div>
                 </div>

                {/* Tab content area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/20 text-left">
                  
                  {/* TAB 1: GENERAL INFO (Thông tin chung) */}
                  {activeTab === 'info' && (
                    <div className="space-y-8 animate-in fade-in duration-350">
                      
                      {/* Premium Device Card Title Header */}
                      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col relative overflow-hidden text-left">
                        
                        <div className="flex-1">
                          {/* Row 1: Code and Type placed closely together with auto-width, no titles */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-slate-100 text-slate-600 font-mono font-black text-[9pt] uppercase px-3 py-1.5 rounded-lg border border-slate-200 block w-auto shadow-sm select-none">
                              {(activeCat as any).voltage || getDeviceVoltage((activeCat as any).device || '')}
                            </span>
                            <span className="bg-red-50 text-red-600 font-mono font-black text-[9pt] uppercase px-3 py-1.5 rounded-lg border border-red-100 block w-auto shadow-sm select-none">
                              {activeCat.code || 'PD-MBA-001'}
                            </span>
                            
                            <div className="bg-blue-50 text-[#164399] font-black text-[9pt] uppercase px-3 py-1.5 rounded-[10px] border border-[#164399]/10 flex items-center w-auto shadow-sm select-none">
                              <span>{normalizeType(activeCat.type)}</span>
                            </div>
                          </div>

                          {/* Row 2: Device Name and Tree Location Path */}
                          <div className="pt-2">
                            <h3 className="text-[17pt] md:text-[19pt] font-extrabold text-gray-700 leading-tight tracking-tight mt-0.5 font-sans">
                              {activeCat.device}
                            </h3>
                            <p className="text-[9.5pt] font-medium text-gray-400 mt-1.5 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-gray-350 shrink-0" />
                              <span>{getFullLocationPath(activeCat)}</span>
                            </p>
                          </div>

                          {/* Chu kỳ thực hiện, Trạng thái & Phân loại integrated inside the general info card */}
                          <div className="pt-4 border-t border-gray-100 mt-4">
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-slate-50/70 p-3 rounded-xl border border-gray-100">
                                  <span className="text-[7.5pt] text-gray-400 font-bold uppercase block tracking-wider">Chu kỳ {activeTestType.toLowerCase()}</span>
                                  <span className="text-[11pt] font-black text-gray-800 mt-0.5 block">
                                    {activeCat.interval || '24 tháng'}
                                  </span>
                                </div>
                                <div className="bg-slate-50/70 p-3 rounded-xl border border-gray-100">
                                  <span className="text-[7.5pt] text-gray-400 font-bold uppercase block tracking-wider">Ngày {activeTestType.toLowerCase()} gần nhất</span>
                                  <span className="text-[11pt] font-black text-gray-800 mt-0.5 block">
                                    {activeCat.lastTest || '15/06/2025'}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-slate-50/70 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                                  <div>
                                    <span className="text-[7.5pt] text-gray-400 font-bold uppercase block tracking-wider">Trạng thái đến hạn</span>
                                    <span className={`text-[11.5pt] font-black inline-block mt-1 uppercase ${
                                      activeCat.status === 'Quá hạn' ? 'text-red-600' :
                                      activeCat.status === 'Đến hạn' ? 'text-amber-600' :
                                      activeCat.status === 'Sắp đến hạn' ? 'text-blue-600' :
                                      'text-green-600'
                                    }`}>
                                      {activeCat.status || 'Bình thường'}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="bg-slate-50/70 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                                  <div>
                                    <span className="text-[7.5pt] text-gray-400 font-bold uppercase block tracking-wider">Ngày tiếp theo</span>
                                    <span className="text-[11pt] font-black text-blue-600 inline-block mt-1 uppercase">
                                      {activeCat.nextDue || '15/06/2027'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Button right-aligned */}
                        <div className="absolute top-6 right-6">
                          <button 
                            onClick={() => setDetailForm({ type: 'testing_catalog', mode: 'view', data: activeCat })}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-bold px-5 py-2 rounded-full shadow-sm active:scale-95 transition-all text-[12pt] flex items-center gap-2 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" /> Xem
                          </button>
                        </div>
                      </div>

                      {/* Technical specifications and Documents Grid */}
                      <div className="grid grid-cols-1 gap-6 pb-6">
                        
                        {/* Box 1: Reference Documents (Cấu hình và thiết kế giống ThongTinThietBiScreen) */}
                        <div className="space-y-4 pt-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-500" /> Tài liệu tham chiếu
                            </h4>
                          </div>
                          <div className="space-y-3">
                            {(() => {
                              const devKey = `${activeTestType}-${getTypeKey(activeCat.type)}-${getDeviceVoltage(activeCat)}`;
                              const activeDocIds = docsMap[devKey] || [];
                              if (activeDocIds.length === 0) {
                                return (
                                  <div className="py-6 text-center text-gray-400 italic text-[9.5pt] bg-white rounded-xl border border-gray-100">
                                    Không có tài liệu tham chiếu nào được cấu hình cho cặp nghiệp vụ/thiết bị này.
                                  </div>
                                );
                              }
                              return activeDocIds.map((docId) => {
                                const doc = DOCUMENT_LIBRARY.find(d => d.id === docId);
                                if (!doc) return null;
                                return (
                                  <div 
                                    key={doc.id} 
                                    className="flex items-center justify-between p-3.5 bg-gray-50/50 border border-slate-200/80 rounded-xl hover:border-blue-350 hover:bg-white hover:shadow-md transition-all cursor-pointer group shadow-xs animate-fade-in"
                                    onClick={() => handleDocPreview(doc)}
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="p-2 bg-white rounded-xl border border-gray-100 group-hover:border-blue-200 transition-all shadow-sm flex items-center justify-center shrink-0">
                                        {getDocIcon(doc)}
                                      </div>
                                      <div className="flex flex-col min-w-0 text-left">
                                        <span className="text-[10pt] font-bold text-[#164399] group-hover:text-blue-700 transition-colors truncate">{doc.name}</span>
                                        <span className="text-[8.5pt] text-slate-400 font-medium mt-0.5">Nguyễn Văn A | 15/06/2025 | {doc.size}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        </div>

                        {/* Box 2: Illustration Images (Cấu hình và thiết kế giống ThongTinThietBiScreen) */}
                        <div className="space-y-4 pt-4">
                          <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                            <Camera className="w-4 h-4 text-orange-500" /> Hình ảnh minh họa
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {(() => {
                              const devKey = `${activeTestType}-${getTypeKey(activeCat.type)}-${getDeviceVoltage(activeCat)}`;
                              const activeImages = imagesMap[devKey] || [];
                              if (activeImages.length === 0) {
                                return (
                                  <div className="col-span-full py-6 text-center text-gray-400 italic text-[9.5pt] bg-white rounded-xl border border-gray-100">
                                    Không có ảnh minh họa thiết bị nào được cấu hình cho cặp nghiệp vụ/thiết bị này.
                                  </div>
                                );
                              }
                              return activeImages.map((img, idx) => (
                                <div 
                                  key={idx} 
                                  className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 group cursor-pointer shadow-sm hover:border-[#164399]/40 hover:shadow-md transition-all"
                                  onClick={() => setPreviewImgUrl(img)}
                                >
                                  <img 
                                    src={img} 
                                    alt="TB" 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                                  />
                                </div>
                              ));
                            })()}
                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* TAB 2: TECHNICAL STANDARDS (Danh sách Hạng mục kiểm tra) */}
                  {activeTab === 'standards' && (
                    <div className="space-y-6 animate-in fade-in duration-350">
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead className="bg-[#f0f4fa] sticky top-0 z-20 text-[#164399] font-black text-[9pt] uppercase tracking-wider text-left border-b border-gray-200 select-none">
                              <tr>
                                <th className="px-4 py-3.5 w-14 text-center">STT</th>
                                <th className="px-6 py-3.5">Hạng mục kiểm tra</th>
                                <th className="px-6 py-3.5 text-center w-28">Đ.Giá</th>
                                <th className="px-6 py-3.5 text-center w-20">Cấp</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-[10.5pt] font-medium text-gray-750">
                              {(standardsMap[`${activeTestType}-${getTypeKey(activeCat.type)}`] || getStandardItems(activeCat.type)).map((std, i) => {
                                const isSelected = tltbSelectedStdId === std.id;
                                return (
                                  <tr 
                                    key={std.id} 
                                    onClick={() => setTltbSelectedStdId(isSelected ? null : std.id)}
                                    className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/50'}`}
                                  >
                                    <td className="px-4 py-3.5 text-center font-mono font-bold text-gray-400">
                                      {std.stt || (i + 1)}
                                    </td>
                                    
                                    <td className="px-6 py-3.5">
                                      <div className={`font-bold text-[11pt] ${isSelected ? 'text-[#164399]' : 'text-gray-800'}`}>{std.name}</div>
                                      {std.note && (
                                        <div className="text-[7.5pt] text-slate-400 font-normal italic mt-1 leading-normal">
                                          {std.note}
                                        </div>
                                      )}
                                    </td>

                                    <td className="px-6 py-3.5 text-center select-none">
                                      <span className={`text-[7.5pt] font-bold px-1.5 py-0.5 rounded border ${
                                        std.unit !== 'mΩ' && std.unit !== 'μΩ' && std.unit !== 'μA'
                                          ? 'bg-orange-50 text-orange-700 border-orange-100'
                                          : 'bg-green-50 text-green-700 border-green-100'
                                      }`}>
                                        {std.unit !== 'mΩ' && std.unit !== 'μΩ' && std.unit !== 'μA' ? 'Đạt/K.Đạt' : 'Nhập Text'}
                                      </span>
                                    </td>

                                    <td className="px-6 py-3.5 text-center select-none text-[10pt] font-semibold">
                                      <span className={`text-[7.5pt] font-extrabold px-1.5 py-0.5 rounded border ${
                                        std.source === 'EVN'
                                          ? 'bg-red-50 text-red-700 border border-red-100'
                                          : std.source === 'TCT'
                                          ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                          : 'bg-blue-50 text-blue-700 border border-blue-100'
                                      }`}>
                                        {std.source || 'ĐV'}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {tltbSelectedStdId && (() => {
                        const allStds = standardsMap[`${activeTestType}-${getTypeKey(activeCat.type)}`] || getStandardItems(activeCat.type);
                        const selectedStd = allStds.find((s: any) => s.id === tltbSelectedStdId);
                        if (!selectedStd) return null;
                        
                        return (
                          <div className="bg-white rounded-xl border border-blue-200 overflow-hidden shadow-sm animate-in zoom-in-95 duration-200">
                            <div className="px-4 py-3 bg-blue-50/50 border-b border-blue-100 flex items-center justify-between">
                              <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-500" />
                                Danh sách thông số ({selectedStd.name})
                              </h4>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead className="bg-[#f0f4fa] text-slate-500 font-bold text-[8.5pt] uppercase tracking-wider select-none">
                                  <tr>
                                    <th className="px-4 py-3 w-16 text-center">STT</th>
                                    <th className="px-6 py-3 text-left">Tên thông số - ĐVT - Kiểu đo</th>
                                    <th className="px-6 py-3 w-48 text-center">Giới hạn - Tiêu chuẩn</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-[9.5pt] font-semibold text-slate-700">
                                  <tr className="hover:bg-slate-50/50">
                                    <td className="px-4 py-4 text-center font-mono font-black text-slate-400">1</td>
                                    <td className="px-6 py-4">
                                      <div className="font-bold text-slate-800">
                                        Đo thông số {selectedStd.name.toLowerCase()}
                                      </div>
                                      <div className="text-[8.5pt] mt-1 space-x-2">
                                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">{selectedStd.unit}</span>
                                        <span className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 italic">Kiểu đo mặc định</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      <div className="inline-flex flex-col items-center justify-center gap-1">
                                        <span className="text-[8.5pt] font-black px-2 py-0.5 border border-slate-200 rounded-[8px] bg-white font-mono text-slate-600 shadow-sm block">
                                          {selectedStd.limit}
                                        </span>
                                        <span className="text-[7.5pt] font-bold text-slate-400">
                                          {selectedStd.standard}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* TAB 3: TIMELINE HISTORY (Lịch sử) */}
                  {activeTab === 'history' && (
                    <div className="space-y-6 animate-in fade-in duration-350 text-left">
                      {relatedHistory.length === 0 ? (
                        <div className="py-12 bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center p-6 text-center shadow-sm">
                          <History className="w-10 h-10 text-gray-300 mb-2" />
                          <h6 className="text-[11pt] font-bold text-gray-500">Chưa ghi nhận lịch sử đo đạc {activeTestType.toLowerCase()} trên hệ thống</h6>
                          <p className="text-[9.5pt] text-gray-400 max-w-sm mt-1">Các chu kỳ kiểm tra đo lường cũ chưa được ghi chép, hoặc thiết bị mới được cấu hình.</p>
                        </div>
                      ) : (
                        <div className="relative pl-8 border-l-2 border-slate-100 space-y-6 ml-4 pt-2">
                          {relatedHistory.map((hist) => {
                            const colors: Record<string, { bg: string, border: string, text: string, dot: string }> = {
                              'Sự cố': { bg: 'bg-red-500/10', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
                              'Thí nghiệm': { bg: 'bg-blue-500/10', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-600' },
                              'Kiểm định': { bg: 'bg-amber-500/10', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
                              'Hiệu chuẩn': { bg: 'bg-purple-500/10', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-500' },
                              'default': { bg: 'bg-blue-500/10', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-600' }
                            };
                            const c = colors[activeTestType] || colors.default;

                            let adaptedTitle = hist.planName || hist.project || 'Biên bản thực hiện nghiệp vụ';
                            if (activeTestType === 'Kiểm định') {
                              adaptedTitle = adaptedTitle.replace(/thí nghiệm/gi, 'Kiểm định');
                            } else if (activeTestType === 'Hiệu chuẩn') {
                              adaptedTitle = adaptedTitle.replace(/thí nghiệm/gi, 'Hiệu chuẩn');
                            }

                            return (
                              <div key={hist.id} className="relative group text-left">
                                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-blue-500 transition-all z-10 shadow-sm">
                                  <div className={`w-2 h-2 rounded-full ${c.dot} group-hover:scale-125 transition-transform`}></div>
                                </div>

                                <div 
                                  onClick={() => setDetailForm({ type: 'test_report', mode: 'view', data: hist })}
                                  className="p-5 bg-white rounded-2xl border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0 space-y-2">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`px-2 py-0.5 rounded text-[7.5pt] font-black uppercase tracking-wider border ${c.bg} ${c.border} ${c.text}`}>
                                          {activeTestType} {hist.type}
                                        </span>
                                        <span className="text-[9.5pt] text-gray-400 font-bold font-mono flex items-center gap-0.5">
                                          <Calendar className="w-3.5 h-3.5" /> {hist.time}
                                        </span>
                                      </div>

                                      <h5 className="text-[12pt] font-black text-gray-700 leading-tight group-hover:text-gray-700 transition-colors">
                                        {adaptedTitle}
                                      </h5>

                                      <div className="flex items-center justify-between text-[10.12pt] font-semibold text-gray-500 pt-1.5 border-t border-gray-50">
                                        <span>Đội thực hiện: <strong className="text-gray-700">{hist.leader || 'Trung tâm Thí nghiệm điện'}</strong></span>
                                        <span className={`px-2 py-0.5 rounded text-[8pt] font-bold ${
                                          hist.result === 'Đạt' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'
                                        }`}>
                                          Kết quả: {hist.result || 'Đạt'}
                                        </span>
                                      </div>


                                    </div>

                                    <div className="pt-2 shrink-0">
                                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/20 shadow-inner">
                <HelpCircle className="w-14 h-14 text-gray-300 animate-bounce duration-1000 mb-2" />
                <h5 className="text-[12pt] font-black text-gray-700 uppercase tracking-wider">Vui lòng chọn thiết bị ở danh sách trái</h5>
                <p className="text-[10pt] text-gray-450 max-w-sm mt-1">Chọn hoặc tìm kiếm bất kỳ một danh mục máy biến áp, máy cắt hay đường dây điện để hiển thị thông tin đo đạc tiêu chuẩn và lịch sử cụ thể.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {showCatalogsConfig && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Overlay background */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setShowCatalogsConfig(false)}
          ></div>
          
          {/* Modal Container */}
          <div className="relative w-full max-w-6xl bg-white rounded-xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-[#164399]" />
                <h3 className="text-[14pt] font-black text-gray-700 tracking-tight">Cấu hình danh sách Hạng mục kiểm tra</h3>
              </div>
              <button 
                onClick={() => setShowCatalogsConfig(false)} 
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Selection bar */}
            <div className="bg-slate-50/50 p-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Category Switches: Thí nghiệm / Kiểm định / Hiệu chỉnh */}
              <div className="md:col-span-5 flex flex-col shrink-0">
                <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-200/50 shadow-inner leading-none w-fit">
                  {(['Thí nghiệm', 'Kiểm định', 'Hiệu chuẩn'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setConfigTestType(type)}
                      className={`px-5 py-1.5 text-[9.5pt] rounded-full transition-all font-bold tracking-tight text-center cursor-pointer ${
                        configTestType === type 
                          ? 'bg-[#164399] text-white shadow' 
                          : 'text-slate-500 hover:text-slate-850 hover:bg-white/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cấp điện áp combo -> Đặt trước Loại thiết bị */}
              <div className="md:col-span-3 flex flex-col">
                <select
                  value={configVoltage}
                  onChange={(e) => {
                    const nextVolt = e.target.value;
                    setConfigVoltage(nextVolt);
                    const opts = getDeviceOptionsForVoltage(nextVolt);
                    if (!opts.find(o => o.value === configDevType)) {
                      setConfigDevType(opts[0].value);
                    }
                  }}
                  className="w-full px-4 py-2 text-[10.5pt] font-bold text-gray-750 outline-none bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm cursor-pointer"
                >
                  <option value="500kV">500kV</option>
                  <option value="220kV">220kV</option>
                  <option value="110kV">110kV</option>
                  <option value="35kV">35kV</option>
                  <option value="22kV">22kV</option>
                  <option value="6kV">6kV</option>
                  <option value="0.4kV">0.4kV</option>
                </select>
              </div>

              {/* Group selection dropdown -> Loại thiết bị */}
              <div className="md:col-span-4 flex flex-col">
                <select
                  value={configDevType}
                  onChange={(e) => setConfigDevType(e.target.value)}
                  className="w-full px-4 py-2 text-[10.5pt] font-bold text-gray-750 outline-none bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm cursor-pointer"
                >
                  {getDeviceOptionsForVoltage(configVoltage).map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Bar */}
            <div className="px-8 py-3 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
              <span className="text-[9.5pt] text-gray-500 font-bold">
                Cấu hình đang hiển thị: <span className="text-[#164399] font-black">{configTestType} - {configDevType} - {configVoltage}</span>
              </span>
              <button
                onClick={() => {
                  setEditingStdItem(null);
                  setNewStdName('');
                  setNewStdUnit('');
                  setNewStdLimitMin('');
                  setNewStdLimitMax('');
                  setNewStdStandard('');
                  setNewStdValueType('Số');
                  setNewStdNote('');
                  const catKey = `${configTestType}-${configDevType}`;
                  const currentList = standardsMap[catKey] || [];
                  setNewStdSTT(String(currentList.length + 1));
                  setShowAddEditModal(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#164399] border border-blue-200 rounded-full font-bold transition-all shadow-sm text-[9.5pt] active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Thêm hạng mục
              </button>
            </div>

            {/* Scrollable List area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {/* Standards List */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#f0f4fa] sticky top-0 z-20 text-[#164399] font-black text-[9pt] uppercase tracking-wider text-left border-b border-gray-200">
                      <tr>
                        <th className="px-2 py-3 w-10 text-center">STT</th>
                        <th className="px-6 py-3 w-[50%]">Tên hạng mục kiểm tra</th>
                        <th className="px-4 py-3 text-center w-36">ĐVT & Kiểu đo</th>
                        <th className="px-4 py-3 text-center w-44">Giới hạn</th>
                        <th className="px-4 py-3 w-32">Tiêu chuẩn</th>
                        <th className="px-6 py-3 w-24 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[10pt] font-semibold text-gray-750">
                      {(standardsMap[`${configTestType}-${configDevType}`] || []).length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-gray-400 italic">
                            Chưa có hạng mục kiểm tra nào được cấu hình cho cặp Loại hình & Loại thiết bị này.
                          </td>
                        </tr>
                      ) : (
                        (standardsMap[`${configTestType}-${configDevType}`] || []).map((std, idx) => (
                          <tr key={std.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-1 py-3 text-center font-mono font-bold text-gray-400">{idx + 1}</td>
                            <td className="px-6 py-3 font-bold text-slate-800 leading-snug">
                              <div>{std.name}</div>
                              {std.note && (
                                <div className="text-[8.5pt] text-slate-400 font-normal italic mt-1">Ghi chú: {std.note}</div>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col items-center justify-center gap-1.5">
                                <span className="bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded font-bold font-mono text-slate-600 text-[8.5pt] shadow-xs">
                                  ĐVT: {std.unit || '-'}
                                </span>
                                <span className={`text-[8.5pt] font-black uppercase px-2 py-0.5 rounded border select-none ${
                                  std.valueType === 'Có/Không' ? 'bg-indigo-50 text-indigo-600 border-indigo-150/40' :
                                  std.valueType === 'Text' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                  'bg-blue-50 text-blue-600 border-blue-105'
                                }`}>
                                  Kiểu: {std.valueType || 'Số'}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="px-2.5 py-1 bg-blue-50/80 text-blue-800 rounded-full text-[9.5pt] font-mono font-bold border border-[#164399]/20 shadow-xs select-none">
                                {renderLimitValue(std.limit, std.limitMin, std.limitMax)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-500 font-bold">{std.standard}</td>
                            <td className="px-6 py-3 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => {
                                    setEditingStdItem(std);
                                    setNewStdName(std.name);
                                    setNewStdUnit(std.unit === '-' ? '' : std.unit);
                                    setNewStdLimitMin(std.limitMin === '-' || std.limitMin === undefined ? '' : std.limitMin);
                                    setNewStdLimitMax(std.limitMax === '-' || std.limitMax === undefined ? '' : std.limitMax);
                                    setNewStdStandard(std.standard === 'TCVN' ? '' : std.standard);
                                    setNewStdValueType(std.valueType || 'Số');
                                    setNewStdNote(std.note || '');
                                    setNewStdSTT(String(idx + 1));
                                    setShowAddEditModal(true);
                                  }}
                                  className="p-1.5 text-blue-600 border border-transparent hover:border-blue-200 hover:bg-blue-50/50 rounded-lg transition-all cursor-pointer"
                                  title="Sửa hạng mục"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStandardItem(std.id)}
                                  className="p-1.5 text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50/50 rounded-lg transition-all cursor-pointer"
                                  title="Xóa hạng mục"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2 columns, 1 row for Docs & Images config */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200/60 pt-6">
                
                {/* Reference Documents Column */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                      <FileText className="w-5 h-5 text-blue-600" /> Tài liệu tham chiếu ({ (docsMap[`${configTestType}-${configDevType}-${configVoltage}`] || []).length })
                    </h4>
                    <button
                      onClick={() => {
                        setSearchDocQuery('');
                        setSelectedDocCategory('all');
                        setShowLibraryModal(true);
                      }}
                      className="px-4 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-[8.5pt] font-black uppercase rounded-full transition-all cursor-pointer flex items-center gap-1.5 animate-fade-in"
                    >
                      + từ Thư viện
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {(() => {
                      const activeDocIds = docsMap[`${configTestType}-${configDevType}-${configVoltage}`] || [];
                      if (activeDocIds.length === 0) {
                        return (
                          <div className="py-8 text-center text-gray-400 italic bg-gray-50/50 rounded-xl border border-dashed border-gray-100 text-[9.5pt]">
                            Chưa liên kết tài liệu tham chiếu nào.
                          </div>
                        );
                      }
                      return activeDocIds.map((docId) => {
                        const doc = DOCUMENT_LIBRARY.find(d => d.id === docId);
                        if (!doc) return null;
                        return (
                          <div 
                            key={doc.id} 
                            onClick={() => handleDocPreview(doc)}
                            className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100 group hover:border-slate-300 hover:bg-white transition-all cursor-pointer shadow-xs"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm animate-fade-in transition-transform group-hover:scale-105">
                                {getDocIcon(doc)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[9.5pt] font-bold text-gray-800 line-clamp-1 group-hover:text-[#164399] transition-colors text-left">{doc.name}</p>
                                <p className="text-[8.5pt] text-slate-400 font-medium tracking-tight text-left mt-0.5">Nguyễn Văn A | 15/06/2025 | {doc.size}</p>
                              </div>
                            </div>
                            <div className="flex items-center shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => handleRemoveDocFromConfig(doc.id)}
                                className="p-1.5 hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-xl transition-colors cursor-pointer"
                                title="Gỡ tài liệu"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Illustration Images Column */}
                <div className="space-y-4">
                  <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                    <Camera className="w-5 h-5 text-orange-500" /> Hình ảnh minh họa ({ (imagesMap[`${configTestType}-${configDevType}-${configVoltage}`] || []).length })
                  </h4>

                  <div className="space-y-4">
                    {/* Images Grid */}
                    <div className="grid grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                      {(() => {
                        const activeImages = imagesMap[`${configTestType}-${configDevType}-${configVoltage}`] || [];
                        if (activeImages.length === 0) {
                          return (
                            <div className="col-span-full py-8 text-center text-gray-455 italic bg-gray-50/50 rounded-xl border border-dashed border-gray-100 text-[9.5pt]">
                              Chưa có hình ảnh minh họa nào.
                            </div>
                          );
                        }
                        return activeImages.map((img, idx) => (
                          <div key={idx} className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group relative shadow-sm hover:shadow-md transition-all duration-300">
                            <img 
                              src={img} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-zoom-in" 
                              referrerPolicy="no-referrer" 
                              onClick={() => handleImgPreview(img, activeImages, idx)} 
                              alt="" 
                            />
                            <div 
                              className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity shadow"
                              onClick={(e) => { e.stopPropagation(); handleRemoveImageFromConfig(img); }}
                              title="Xóa hình ảnh"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        ));
                      })()}
                    </div>

                    {/* Add Image Uploader */}
                    <div className="pt-1">
                      <FileUploader 
                        type="image" 
                        mode="add" 
                        onFileSelect={handleAddImageToConfig} 
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Sub-modal 1: Add/Edit Standard Item Popup */}
      {showAddEditModal && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowAddEditModal(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-white rounded-xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
              <h4 className="text-[12pt] font-black text-gray-700 tracking-tight">
                {editingStdItem ? 'Cập nhật hạng mục kiểm tra' : 'Thêm mới hạng mục kiểm tra'}
              </h4>
              <button 
                onClick={() => setShowAddEditModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Tên hạng mục <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newStdName}
                  onChange={(e) => setNewStdName(e.target.value)}
                  placeholder="e.g. Đo điện trở cách điện cuộn dây"
                  className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"
                />
              </div>
              
              {/* STT and ĐVT Side-by-Side right after Tên hạng mục */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Số thứ tự (STT)</label>
                  <input
                    type="number"
                    min="1"
                    value={newStdSTT}
                    onChange={(e) => setNewStdSTT(e.target.value)}
                    placeholder="e.g. 1"
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Đơn vị (ĐVT)</label>
                  <input
                    type="text"
                    value={newStdUnit}
                    onChange={(e) => setNewStdUnit(e.target.value)}
                    placeholder="e.g. MΩ, Ω, %"
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Kiểu đo (Kiểu giá trị đo) and Tiêu chuẩn: placed before Limit (Giới hạn) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Kiểu giá trị đo (Kiểu Đo)</label>
                  <select
                    value={newStdValueType}
                    onChange={(e) => setNewStdValueType(e.target.value as any)}
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none cursor-pointer"
                  >
                    <option value="Số">Số (Numeric)</option>
                    <option value="Text">Văn bản (Text)</option>
                    <option value="Có/Không">Có / Không (Boolean)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Tiêu chuẩn</label>
                  <input
                    type="text"
                    value={newStdStandard}
                    onChange={(e) => setNewStdStandard(e.target.value)}
                    placeholder="e.g. IEC 62271"
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Limits block (Giới hạn Dưới & Giới hạn Trên) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Giới hạn Dưới</label>
                  <input
                    type="text"
                    value={newStdLimitMin}
                    onChange={(e) => setNewStdLimitMin(e.target.value)}
                    placeholder="e.g. ≥ 10"
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Giới hạn Trên</label>
                  <input
                    type="text"
                    value={newStdLimitMax}
                    onChange={(e) => setNewStdLimitMax(e.target.value)}
                    placeholder="e.g. ≤ 100"
                    className="w-full px-4 py-2 text-[10pt] font-semibold bg-white border border-gray-200 rounded-lg shadow-sm focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider ml-1">Ghi chú</label>
                <textarea
                  value={newStdNote}
                  onChange={(e) => setNewStdNote(e.target.value)}
                  placeholder="e.g. Ghi chú tiêu chuẩn phụ hoặc điều kiện kiểm tra đặc biệt"
                  rows={4}
                  className="w-full px-4 py-3 text-[10pt] font-semibold bg-white border border-gray-200 rounded-xl shadow-sm focus:border-blue-400 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowAddEditModal(false)}
                className="px-4.5 py-1.5 border border-gray-250 bg-white hover:bg-slate-100 text-gray-600 font-bold rounded-lg text-[9pt] transition-colors cursor-pointer select-none"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveStandardItem}
                disabled={!newStdName.trim()}
                className="px-5 py-1.5 bg-[#164399] hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-lg text-[9pt] transition-all shadow-sm cursor-pointer select-none"
              >
                Lưu hạng mục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reusable Sub-modal 2: Choose document from Library modal */}
      <DocumentLibraryModal
        isOpen={showLibraryModal}
        onClose={() => setShowLibraryModal(false)}
        selectedIds={
          libraryTarget === 'hm'
            ? hmAttachedDocs.map(d => d.id)
            : libraryTarget === 'ts'
            ? tsAttachedDocs.map(d => d.id)
            : (docsMap[`${configTestType}-${configDevType}-${configVoltage}`] || [])
        }
        headerConfigLabel={
          libraryTarget === 'hm'
            ? 'Danh mục tài liệu mẫu cho Hạng mục'
            : libraryTarget === 'ts'
            ? 'Danh mục tài liệu mẫu cho Thông số đo'
            : `${configTestType} - ${configDevType} - ${configVoltage}`
        }
        onToggleDoc={(doc) => {
          if (libraryTarget === 'hm') {
            const exists = hmAttachedDocs.find(d => d.id === doc.id);
            if (exists) {
              setHmAttachedDocs(prev => prev.filter(d => d.id !== doc.id));
            } else {
              setHmAttachedDocs(prev => [...prev, doc]);
            }
          } else if (libraryTarget === 'ts') {
            const exists = tsAttachedDocs.find(d => d.id === doc.id);
            if (exists) {
              setTsAttachedDocs(prev => prev.filter(d => d.id !== doc.id));
            } else {
              setTsAttachedDocs(prev => [...prev, doc]);
            }
          } else {
            const configKey = `${configTestType}-${configDevType}-${configVoltage}`;
            const currentDocs = docsMap[configKey] || [];
            if (currentDocs.includes(doc.id)) {
              handleRemoveDocFromConfig(doc.id);
            } else {
              handleAddDocToConfig(doc.id);
            }
          }
        }}
      />

      {/* Pop-up Chọn thông số đo kỹ thuật */}
      {showAddTsFromListModal && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowAddTsFromListModal(false)}
          ></div>
          <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-250 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#eaf0fa] text-[#154194] rounded-xl shrink-0">
                  <ListPlus className="w-5 h-5 animate-none" />
                </div>
                <div className="text-left">
                  <h3 className="text-[12.5pt] font-black text-gray-700 tracking-tight leading-tight">Chọn thông số đo từ Danh sách mẫu</h3>
                  <p className="text-[8.5pt] text-slate-400 font-medium mt-0.5">Liên kết nhanh các thông số đo kiểm kỹ thuật của loại thiết bị vào hạng mục: <span className="font-extrabold text-[#164399] underline">{tlhm_selectedCatalog?.name}</span></p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddTsFromListModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Filter controls row */}
            <div className="p-3 bg-slate-50/60 border-b border-gray-200/85 grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
              <div className="flex flex-col gap-1">
                <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Cấp điện áp</label>
                <select 
                  value={tsListVoltageFilter}
                  onChange={(e) => setTsListVoltageFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500"
                >
                  <option value="Tất cả">Tất cả cấp điện áp</option>
                  <option value="110kV">Cấp 110kV</option>
                  <option value="220kV">Cấp 220kV</option>
                  <option value="500kV">Cấp 500kV</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Loại thiết bị</label>
                <select 
                  value={tsListDeviceTypeFilter}
                  onChange={(e) => setTsListDeviceTypeFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500"
                >
                  <option value="Tất cả">Tất cả thiết bị</option>
                  <option value="MBA">Máy biến áp (MBA)</option>
                  <option value="MC">Máy cắt (MC)</option>
                  <option value="TI">Biến dòng điện (TI)</option>
                  <option value="TU">Biến điện áp (TU)</option>
                  <option value="CSV">Chống sét van (CSV)</option>
                  <option value="DCL">Dao cách ly (DCL)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8pt] font-black text-slate-500 uppercase tracking-wider ml-1">Tìm kiếm nhanh</label>
                <div className="relative">
                  <input
                    type="text"
                    value={tsListSearchQuery}
                    onChange={(e) => setTsListSearchQuery(e.target.value)}
                    placeholder="Nhập tên thông số kỹ thuật..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-250 rounded-lg text-[9pt] font-bold focus:outline-none focus:border-blue-500 placeholder-slate-400"
                  />
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Content Table list */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-slate-50/20">
              <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-slate-150">
                <thead className="bg-[#eaf0fa] text-[#154194] leading-none select-none border-b border-gray-250">
                  <tr>
                    <th className="px-4 py-3 w-12 text-center text-[8pt] font-black uppercase tracking-wider">Chọn</th>

<th className="px-3 py-3 w-16 text-center text-[8pt] font-black uppercase tracking-wider">STT</th>
                    <th className="px-4 py-3 text-[8pt] font-black uppercase tracking-wider">Tên thông số đo kỹ thuật</th>
                    <th className="px-3 py-3 w-24 text-center text-[8pt] font-black uppercase tracking-wider">Đơn vị</th>
                    <th className="px-3 py-3 w-28 text-center text-[8pt] font-black uppercase tracking-wider">Kiểu nhập</th>
                    <th className="px-3 py-3 w-36 text-center text-[8pt] font-black uppercase tracking-wider">Giới hạn tiêu chuẩn</th>
                    <th className="px-3 py-3 w-16 text-center text-[8pt] font-black uppercase tracking-wider">Cấp áp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 text-[9pt] font-semibold text-gray-800">
                  {MASTER_PARAMS_TEMPLATE.filter(item => {
                    const matchesVol = tsListVoltageFilter === 'Tất cả' || item.voltage === tsListVoltageFilter;
                    const matchesDev = tsListDeviceTypeFilter === 'Tất cả' || item.deviceType === tsListDeviceTypeFilter;
                    const matchesQuery = !tsListSearchQuery.trim() || item.name.toLowerCase().includes(tsListSearchQuery.toLowerCase().trim());
                    return matchesVol && matchesDev && matchesQuery;
                  }).length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-400 italic bg-slate-50/25">
                        Không tìm thấy thông số mẫu nào phù hợp với bộ lọc hiện tại.
                      </td>
                    </tr>
                  ) : (
                    MASTER_PARAMS_TEMPLATE.filter(item => {
                      const matchesVol = tsListVoltageFilter === 'Tất cả' || item.voltage === tsListVoltageFilter;
                      const matchesDev = tsListDeviceTypeFilter === 'Tất cả' || item.deviceType === tsListDeviceTypeFilter;
                      const matchesQuery = !tsListSearchQuery.trim() || item.name.toLowerCase().includes(tsListSearchQuery.toLowerCase().trim());
                      return matchesVol && matchesDev && matchesQuery;
                    }).map((item, index) => {
                      const isChecked = tsListSelectedIds.includes(item.id);
                      return (
                        <tr 
                          key={item.id}
                          onClick={() => {
                            if (isChecked) {
                              setTsListSelectedIds(prev => prev.filter(x => x !== item.id));
                            } else {
                              setTsListSelectedIds(prev => [...prev, item.id]);
                            }
                          }}
                          className={`cursor-pointer transition-colors ${isChecked ? 'bg-blue-50/35 hover:bg-blue-50/50' : 'hover:bg-slate-50/50 bg-white'}`}
                        >
                          <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setTsListSelectedIds(prev => [...prev, item.id]);
                                } else {
                                  setTsListSelectedIds(prev => prev.filter(x => x !== item.id));
                                }
                              }}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                          </td>
                          <td className="px-3 py-3.5 text-center font-mono font-bold text-slate-400">{index + 1}</td>
                          <td className="px-4 py-3.5 text-left font-bold text-slate-755 leading-snug">{item.name}</td>
                          <td className="px-3 py-3.5 text-center font-mono font-bold text-slate-500">{item.unit}</td>
                          <td className="px-3 py-3.5 text-center font-bold text-blue-705 bg-blue-50/20">{item.measureType}</td>
                          <td className="px-3 py-3.5 text-center font-semibold text-[#164399] bg-slate-50/50">{item.limit} ({item.standard})</td>
                          <td className="px-3 py-3.5 text-center font-mono text-slate-505">{item.voltage}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer with counts & apply */}
            <div className="px-6 py-4 bg-slate-50 border-t border-gray-200 flex justify-between items-center shrink-0">
              <span className="text-[8.5pt] font-bold text-slate-500 italic">
                Đã chọn <span className="font-extrabold text-[#164399]">{tsListSelectedIds.length}</span> thông số đo kỹ thuật tiêu chuẩn
              </span>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowAddTsFromListModal(false)}
                  className="px-4.5 py-1.5 border border-gray-250 bg-white hover:bg-slate-100 text-gray-600 font-bold rounded-lg text-[9pt] transition-colors cursor-pointer select-none"
                >
                  Bỏ qua
                </button>
                <button
                  onClick={handleAddTsFromTemplateList}
                  disabled={tsListSelectedIds.length === 0}
                  className="px-5 py-1.5 bg-[#164399] hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-lg text-[9pt] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer select-none"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" /> Liên kết thông số ({tsListSelectedIds.length})
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Lightbox Image Preview Modal */}
      {previewImgUrl && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
            onClick={() => setPreviewImgUrl(null)}
          ></div>
          <div className="relative max-w-5xl max-h-[90vh] bg-transparent rounded-xl overflow-hidden flex flex-col items-center justify-center animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setPreviewImgUrl(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={previewImgUrl} 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10" 
              referrerPolicy="no-referrer"
              alt="Preview" 
            />
          </div>
        </div>
      )}

      {/* Lightbox Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setPreviewDoc(null)}
          ></div>
          <div className="relative w-full max-w-2xl bg-white rounded-xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                  {getDocIcon(previewDoc)}
                </div>
                <div className="text-left">
                  <h4 className="text-[11.5pt] font-black text-gray-700 tracking-tight leading-tight line-clamp-1">{previewDoc.name}</h4>
                  <p className="text-[8.5pt] text-slate-400 font-medium mt-0.5">Phân loại: {previewDoc.type || 'Tài liệu kỹ thuật'}</p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Document details */}
            <div className="p-6 overflow-y-auto space-y-4 text-left flex-1 custom-scrollbar">
              <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[8pt] font-black uppercase text-gray-400 tracking-wider">Thông số tài liệu</span>
                  <div className="flex items-center gap-4 text-[9.5pt] font-semibold text-slate-700">
                    <div>Mã số: <span className="text-[#164399]">{previewDoc.code || 'N/A'}</span></div>
                    <div className="text-gray-300">|</div>
                    <div>Dung lượng: <span className="text-slate-600">{previewDoc.size || '0 KB'}</span></div>
                  </div>
                </div>
                <button 
                  onClick={() => console.log(`Starting file download: ${previewDoc.name}`)}
                  className="bg-[#164399] hover:bg-blue-800 text-white font-bold text-[9pt] px-4 py-2 rounded-full transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Tải về máy
                </button>
              </div>

              <div className="border border-slate-150 rounded-lg p-6 bg-slate-50/20 font-sans space-y-3">
                <h5 className="font-bold text-gray-700 text-[10.5pt] border-b border-dashed border-slate-200 pb-2">NỘI DUNG TÀI LIỆU</h5>
                <p className="text-[9.5pt] text-slate-600 leading-relaxed">
                  Tài liệu hướng dẫn kỹ thuật này mô tả chi tiết phương pháp lập danh mục kiểm tra thử nghiệm, đo lường và hiệu chuẩn cho thiết bị tương ứng:
                </p>
                <ul className="list-disc pl-5 text-[9.5pt] text-slate-600 space-y-1 relative">
                  <li>Khảo sát đặc tính kỹ thuật định mức vận hành thực tế tại trạm 110kV.</li>
                  <li>Hướng dẫn các bước lắp đặt chuẩn kỹ thuật, quy trình vận hành thử và nghiệm thu định kỳ.</li>
                  <li>Các quy định an toàn tuyệt đối khi đấu nối và kiểm chuẩn trong tủ điều khiển rơle bảo vệ.</li>
                </ul>
                <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-2xl text-[9pt] text-amber-850 flex gap-2.5 items-start mt-4">
                  <span className="font-extrabold shrink-0">Lưu ý:</span>
                  <p className="font-medium">Chỉ được phép thực hiện thao tác thử nghiệm khi thiết bị đã được ngắt nguồn ly hợp mạch lực cao áp hoàn toàn, hoàn trả phiếu an toàn và có tiếp đất tin cậy.</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-full text-[10pt] transition-colors cursor-pointer"
              >
                Đóng
              </button>
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
