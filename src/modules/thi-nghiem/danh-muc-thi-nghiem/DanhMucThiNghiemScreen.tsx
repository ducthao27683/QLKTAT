import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Plus, ListChecks, MoreVertical, Edit, Copy, Shield, Trash2, 
  FileText, Database, ChevronLeft, ChevronRight, Settings, ExternalLink, Box, 
  Activity, Filter, X, Check, Calendar, Clock, AlertCircle, MapPin, Building2, 
  Network, Binary, History, CheckCircle2, AlertTriangle, HelpCircle, Wrench, Zap, Eye
} from 'lucide-react';
import { MOCK_TESTING_CATALOG, MOCK_TESTING_DATA } from '../constants';
import { capitalizeBusinessName } from '../../../shared/utils';

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
        bg: isSelected ? 'bg-gray-150' : 'bg-gray-50',
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
}

export const DanhMucThiNghiemScreen = ({
  setActiveSubMenu,
  setDetailForm,
  devicePath
}: DanhMucThiNghiemScreenProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'standards' | 'history'>('info');
  const [selectedCatId, setSelectedCatId] = useState<number | null>(MOCK_TESTING_CATALOG[0]?.id || null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const itemsPerPage = 6;
  const availableTypesList = ['Trạm', 'Máy biến áp', 'Máy cắt', 'Biến dòng', 'Biến điện áp', 'Đường dây', 'Chống sét van'];
  const statusColors: Record<string, string> = {
    'Quá hạn': 'bg-red-50 text-red-600 border border-red-100',
    'Đến hạn': 'bg-amber-50 text-amber-600 border border-amber-100',
    'Sắp đến hạn': 'bg-blue-50 text-blue-600 border border-blue-100',
    'Bình thường': 'bg-green-50 text-green-600 border border-green-100',
  };

  // Filter Catalog Items
  const filteredCats = MOCK_TESTING_CATALOG.filter(cat => {
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
    return MOCK_TESTING_DATA.filter(hist => {
      const histDeviceLower = hist.device.toLowerCase();
      return (
        histDeviceLower.includes(catNameLower) || 
        catNameLower.includes(histDeviceLower) ||
        (catType === 'Trạm' && (hist.device.includes('TBA') || hist.device.includes('Trạm'))) ||
        (catType === 'Máy biến áp' && hist.device.includes('T1'))
      );
    });
  };

  const relatedHistory = getRelatedHistory();

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

  return (
    <div className="bg-[#F8FAFC] flex flex-col h-full overflow-hidden text-[12pt] font-sans">
      
      {/* Dynamic Header exactly matching the Device List layout with absolute premium elements */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0 shadow-sm relative z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveSubMenu(null)} 
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              id="back-button-catalog"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-[12pt] font-semibold flex items-center gap-2 leading-[1.5]">
                <span className="text-[#555555]">Thiết lập</span>
                <span className="font-bold text-[#164399] tracking-tight">- Danh mục thiết bị thí nghiệm</span>
              </h2>
              <span className="text-[10pt] text-gray-400 font-medium leading-[1.5] mt-0.5">
                {devicePath?.join(' / ') || 'Danh mục thí nghiệm lưới điện / Thiết bị'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`p-2 rounded-[10px] border transition-all cursor-pointer ${showFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
              title="Ẩn/Hiện thanh lọc"
              id="toggle-filter-catalog"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setDetailForm({ type: 'testing_catalog', mode: 'add' })}
              className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-[10px] text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm cursor-pointer"
              id="add-catalog-device-btn"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
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
                      <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ECF3FE] text-[#164399] text-[9.5pt] font-black rounded-lg border border-blue-100 uppercase tracking-tighter">
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
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg text-[#164399] transition-all cursor-pointer"
                      title="Chọn loại thiết bị"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                    {showTypeSelector && (
                      <div className="absolute top-full left-0 mt-3 w-60 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[100] py-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                          <p className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest">Chọn loại thiết bị</p>
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
                            className="w-full py-2 bg-[#164399] text-white text-[9.5pt] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-blue-900/10 active:scale-95 transition-all cursor-pointer"
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
          <div className="w-[45%] flex flex-col border-r border-gray-200 overflow-hidden px-6 py-0 bg-slate-50/40 relative z-10">
            <div className="flex-1 overflow-y-auto custom-scrollbar pl-1.5 pr-2 space-y-3 pt-6 pb-6">
              {totalItems === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-white p-6 text-center shadow-inner">
                  <AlertCircle className="w-10 h-10 text-gray-350 mb-2" />
                  <p className="text-[11pt] font-bold text-gray-400">Không tìm thấy thiết bị thí nghiệm</p>
                  <p className="text-[9.5pt] text-gray-450 mt-1">Vui lòng điều chỉnh từ khóa tìm kiếm hoặc lọc thiết bị</p>
                </div>
              ) : (
                paginatedCats.map((cat, idx) => {
                  const isSelected = activeCat?.id === cat.id;
                  const isChild = !!cat.parentId;
                  const visual = getCatItemVisual(cat.type, isSelected);
                  
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
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-l-xl z-20"></div>
                      )}
                      
                      <div className="p-4 flex gap-4">
                        {/* Custom Category Icon Container */}
                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${visual.bg}`}>
                          {visual.icon}
                        </div>

                        {/* Title and metadata */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[8.5pt] font-black tracking-wider font-mono px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-100 uppercase shadow-sm">
                                {cat.code || 'CT-N/A'}
                              </span>
                              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border transition-all ${isSelected ? 'bg-blue-100 border-blue-200 text-[#164399]' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
                                <span className="text-[7.5pt] font-black uppercase tracking-tighter">
                                  {normalizeType(cat.type)}
                                </span>
                              </div>
                            </div>

                            {/* Dropdown Menu actions */}
                            <div className="relative inline-block">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(openMenuId === cat.id ? null : cat.id);
                                }}
                                className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#164399] transition-all active:scale-90 cursor-pointer"
                                id={`actions-trigger-${cat.id}`}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              {openMenuId === cat.id && (
                                <div 
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] py-2 border-blue-100 animate-in fade-in slide-in-from-top-1 duration-200"
                                >
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenMenuId(null);
                                      setDetailForm({ type: 'testing_catalog', mode: 'view', data: cat });
                                    }}
                                    className="w-full text-left px-4 py-2 text-[10pt] font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3 cursor-pointer"
                                  >
                                    <FileText className="w-4 h-4 text-blue-500" /> Xem lý lịch thiết bị
                                  </button>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenMenuId(null);
                                      setDetailForm({ type: 'testing_catalog', mode: 'edit', data: cat });
                                    }}
                                    className="w-full text-left px-4 py-2 text-[10pt] font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3 cursor-pointer"
                                  >
                                    <Edit className="w-4 h-4 text-amber-500" /> Cập nhật thông số
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <h4 className={`text-[11.5pt] font-black mb-1 line-clamp-2 leading-snug transition-colors tracking-tight ${isSelected ? 'text-[#164399]' : 'text-gray-800 group-hover:text-blue-800'}`}>
                            {cat.device}
                          </h4>

                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[8pt] font-bold text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-gray-300" /> {cat.location || 'Chưa định vị'}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                            <span className="text-[8pt] font-bold text-gray-400">
                              Chu kỳ: {cat.interval}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100/70">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[7.5pt] text-gray-400 uppercase font-bold tracking-wider">Hạn tiếp theo</span>
                              <span className="text-[9pt] font-bold text-gray-700 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                {cat.nextDue}
                              </span>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[8pt] font-black uppercase tracking-tight ${statusColors[cat.status] || 'bg-gray-100 text-gray-600'}`}>
                              {cat.status}
                            </span>
                          </div>

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
                <span className="text-[8.5pt] font-black text-gray-400 uppercase tracking-wider">
                  Xem {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} / {totalItems} hồ sơ
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
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
                          className={`w-7 h-7 rounded-lg text-[9pt] font-bold transition-all cursor-pointer ${currentPage === page ? 'bg-[#164399] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
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
                {/* Navigation Tab Header */}
                <div className="flex border-b border-gray-100 bg-white shrink-0 relative z-10">
                  {[
                    { id: 'info', label: 'Thông tin chung' },
                    { id: 'standards', label: 'Hạng mục tiêu chuẩn' },
                    { id: 'history', label: 'Lịch sử thí nghiệm' }
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 h-12 text-[12pt] font-bold transition-all relative cursor-pointer ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span>{tab.label}</span>
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#164399]"></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab content area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/20">
                  
                  {/* TAB 1: GENERAL INFO (Thông tin chung) */}
                  {activeTab === 'info' && (
                    <div className="space-y-8 animate-in fade-in duration-350">
                      
                      {/* Premium Device Card Title Header */}
                      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative overflow-hidden">
                        
                        <div className="space-y-4 flex-1">
                          {/* Top Tag Row */}
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[7.5pt] font-black text-gray-400 uppercase tracking-widest leading-none">Mã thông tin PMIS</span>
                              <span className="bg-red-50 text-red-600 font-mono font-black text-[12pt] uppercase px-3 py-1 rounded shadow-sm border border-red-100 block w-fit mt-1">
                                {activeCat.code || 'PD-MBA-001'}
                              </span>
                            </div>

                            <span className="text-gray-200 mt-2 h-8 w-[1px] bg-gray-200 hidden lg:inline"></span>

                            <div className="flex flex-col gap-0.5">
                              <span className="text-[7.5pt] font-black text-gray-400 uppercase tracking-widest leading-none">Phân loại lưới điện</span>
                              <div className="bg-blue-50 text-[#164399] font-black text-[10pt] uppercase px-3 py-1 rounded-xl border border-blue-100 flex items-center gap-2 w-fit mt-1">
                                {getCatItemVisual(activeCat.type, true).icon}
                                <span>{normalizeType(activeCat.type)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Device Title */}
                          <div className="pt-2">
                            <span className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block">Tên thiết bị trong danh mục</span>
                            <h3 className="text-[17pt] font-black text-[#164399] leading-tight tracking-tight mt-1">
                              {activeCat.device}
                            </h3>
                          </div>

                          {/* Status Indicators */}
                          <div className="flex items-center gap-3 flex-wrap pt-1">
                            <span className={`px-3 py-1 rounded-full text-[9pt] font-black uppercase ${statusColors[activeCat.status]}`}>
                              ● HẠN THÍ NGHIỆM: {activeCat.status.toUpperCase()}
                            </span>
                            <span className="px-3 py-1 rounded-full text-[9pt] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              ĐỘ KHẨN CẤP: {activeCat.urgency || 'Thường'}
                            </span>
                          </div>
                        </div>

                        {/* Top quick actions */}
                        <div className="flex flex-col gap-2 shrink-0 lg:text-right">
                          <button 
                            onClick={() => setDetailForm({ type: 'testing_catalog', mode: 'view', data: activeCat })}
                            className="bg-[#164399] hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/10 active:scale-95 transition-all text-[11pt] flex items-center gap-2 w-fit lg:ml-auto cursor-pointer"
                          >
                            <Eye className="w-4 h-4" /> Xem
                          </button>
                        </div>

                      </div>

                      {/* Technical specifications Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                        
                        {/* Box 1: Frequency and Timing specs */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
                          <h4 className="text-[10pt] font-black text-[#164399] uppercase tracking-wider border-b border-gray-100 pb-2.5 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" /> Chu kỳ & Kế hoạch
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50/50 p-3 rounded-xl border border-gray-100">
                              <span className="text-[8pt] text-gray-400 font-bold uppercase block tracking-wider">Chu kỳ thí nghiệm</span>
                              <span className="text-[12pt] font-black text-gray-800 mt-1 block">
                                {activeCat.interval || '24 tháng'}
                              </span>
                            </div>
                            <div className="bg-slate-50/50 p-3 rounded-xl border border-gray-100">
                              <span className="text-[8pt] text-gray-400 font-bold uppercase block tracking-wider">Mức khẩn kế hoạch</span>
                              <span className={`text-[12pt] font-black mt-1 block uppercase ${activeCat.urgency === 'Cao' || activeCat.urgency === 'Rất cao' ? 'text-red-650' : 'text-gray-700'}`}>
                                {activeCat.urgency || 'Trung bình'}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2.5 pt-2">
                            <div className="flex justify-between items-center text-[10.5pt]">
                              <span className="text-gray-500 font-medium">Lần thí nghiệm gần nhất:</span>
                              <span className="font-bold text-gray-750 font-mono">{activeCat.lastTest}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10.5pt]">
                              <span className="text-gray-500 font-medium">Hạn tiếp theo quy nghị:</span>
                              <span className="font-black text-[#164399] font-mono bg-blue-50/50 px-2 py-0.5 rounded border border-blue-50">{activeCat.nextDue}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10.5pt]">
                              <span className="text-gray-500 font-medium">Trạng thái vận hành hiện thời:</span>
                              <span className="font-bold text-green-600 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Đang giám sát
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Box 2: Location and Administration */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
                          <h4 className="text-[10pt] font-black text-[#164399] uppercase tracking-wider border-b border-gray-100 pb-2.5 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-500" /> Vị trí & Phân cấp Quản lý
                          </h4>

                          <div className="space-y-4">
                            <div>
                              <span className="text-[8pt] text-gray-400 font-bold uppercase block tracking-wider">Trạm biến áp / Trạm phân cấp</span>
                              <span className="text-[11.5pt] font-black text-gray-800 leading-tight block mt-1">
                                {activeCat.location || 'TBA Phố Nối'}
                              </span>
                            </div>

                            <div>
                              <span className="text-[8pt] text-gray-400 font-bold uppercase block tracking-wider">Đơn vị quản lý vận hành</span>
                              <span className="text-[11pt] font-bold text-gray-600 block mt-0.5">
                                Truyền tải điện Khu vực I - Công ty Điện lực EVN
                              </span>
                            </div>

                            <div className="pt-2 flex justify-between items-center text-[10pt] border-t border-gray-100">
                              <span className="text-gray-500 font-medium">Phân nhóm thiết bị:</span>
                              <span className="font-bold text-gray-750 uppercase tracking-tighter bg-slate-100 px-2.5 py-1 rounded-lg">
                                Lưới điện cao thế
                              </span>
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>
                  )}

                  {/* TAB 2: TECHNICAL STANDARDS (Hạng mục đo lường) */}
                  {activeTab === 'standards' && (
                    <div className="space-y-6 animate-in fade-in duration-350">
                      
                      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 bg-slate-50 border-b border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <ListChecks className="w-5 h-5 text-[#164399]" />
                            <h5 className="text-[11pt] font-black text-gray-800 uppercase tracking-tight">Quy chuẩn, tiêu chuẩn đo lường kỹ thuật</h5>
                          </div>
                          <span className="text-[9pt] text-gray-500 font-semibold bg-white border border-gray-200 px-2 py-0.5 rounded">
                            {getStandardItems(activeCat.type).length} phép thử quy định
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead className="bg-[#164399]/5 text-[#164399] text-[9.5pt] font-black uppercase tracking-wider border-b border-gray-200">
                              <tr>
                                <th className="px-6 py-3.5 w-16 text-center">STT</th>
                                <th className="px-6 py-3.5">Hạng mục kiểm định kỹ thuật</th>
                                <th className="px-4 py-3.5 text-center">ĐVT</th>
                                <th className="px-6 py-3.5 text-center">Trị số giới hạn cho phép</th>
                                <th className="px-6 py-3.5">Tiêu chuẩn viện dẫn</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-[10.5pt] font-medium text-gray-750">
                              {getStandardItems(activeCat.type).map((std, i) => (
                                <tr key={std.id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="px-6 py-3.5 text-center font-mono font-bold text-gray-400">{i + 1}</td>
                                  <td className="px-6 py-3.5 font-bold text-gray-800 leading-tight">{std.name}</td>
                                  <td className="px-4 py-3.5 text-center text-gray-500 font-mono font-bold">{std.unit}</td>
                                  <td className="px-6 py-3.5 text-center">
                                    <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-lg text-[9pt] font-mono font-black border border-red-100">
                                      {std.limit}
                                    </span>
                                  </td>
                                  <td className="px-6 py-3.5 fonts-sans text-gray-400 font-bold text-[9.5pt]">{std.standard}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#164399] shrink-0 mt-0.5" />
                        <div className="text-[10pt] text-slate-650 leading-relaxed font-bold">
                          💡 <span className="text-[#164399]">LƯU Ý:</span> Các trị số quy chuẩn trên tuân thủ nghiêm ngặt theo quy định vận hành của Tập đoàn Điện lực Việt Nam (EVN). Khi thực tế trị số đo đạc đo lường nằm ngoài giới hạn cho phép, thiết bị phải lập tức lập biên phản cảnh báo sửa chữa hoặc từ chối vận hành đóng điện.
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 3: TESTING HISTORIES (Lịch sử thí nghiệm) */}
                  {activeTab === 'history' && (
                    <div className="space-y-6 animate-in fade-in duration-350">
                      
                      {relatedHistory.length === 0 ? (
                        <div className="py-12 bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center p-6 text-center shadow-sm">
                          <History className="w-10 h-10 text-gray-300 mb-2" />
                          <h6 className="text-[11pt] font-bold text-gray-500">Chưa ghi nhận lịch sử đo đạc thí nghiệm trên hệ thống</h6>
                          <p className="text-[9.5pt] text-gray-400 max-w-sm mt-1">Các chu kỳ kiểm tra đo lường cũ chưa được ghi chép, hoặc thiết bị mới được cấu hình.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {relatedHistory.map((hist) => (
                            <div 
                              key={hist.id} 
                              className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 hover:shadow-md transition-all shadow-sm relative group overflow-hidden"
                            >
                              {/* Top row */}
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="bg-[#164399]/5 text-[#164399] text-[9pt] font-black uppercase px-2.5 py-1 rounded-lg border border-blue-100">
                                    Thí nghiệm {hist.type}
                                  </span>
                                  <span className="text-gray-300">|</span>
                                  <span className="text-[9.5pt] font-mono text-gray-550 flex items-center gap-1 font-bold">
                                    <Calendar className="w-4 h-4 text-gray-400" /> {hist.time}
                                  </span>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-[8.5pt] font-black uppercase tracking-tight ${
                                  hist.result === 'Đạt' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-650 border border-red-100'
                                }`}>
                                  KẾT QUẢ: {hist.result || 'K/S'}
                                </span>
                              </div>

                              {/* Title / Description */}
                              <div>
                                <h5 className="text-[12pt] font-black text-gray-800 leading-tight group-hover:text-[#164399] transition-colors">
                                  {hist.planName || hist.project || 'Báo cáo thí nghiệm đo đạc định kỳ'}
                                </h5>
                                <p className="text-[10pt] text-gray-400 uppercase font-bold mt-1 tracking-wider">Đo đạc trên: {hist.device}</p>
                              </div>

                              {/* Technical Details Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-3 border-t border-gray-100 text-[10.5pt] font-medium text-gray-700">
                                <div className="flex justify-between">
                                  <span className="text-gray-400 font-bold">Đội trưởng thực hiện:</span>
                                  <span className="font-bold text-gray-750">{hist.leader || 'Liên doanh Kỹ thuật'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400 font-bold">Trưởng nhóm giám sát:</span>
                                  <span className="font-bold text-gray-750">{hist.team?.split(' - ')[0] || 'Phòng Kỹ thuật'}</span>
                                </div>
                              </div>

                              {/* Sub items test records if present */}
                              {hist.items && hist.items.length > 0 && (
                                <div className="bg-slate-50/60 rounded-xl p-3 border border-gray-100 space-y-2 mt-2">
                                  <span className="text-[8pt] text-gray-400 font-bold uppercase tracking-wider block">Trị số đo đạc thực tế:</span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[9.5pt]">
                                    {hist.items.map((item, idx) => (
                                      <div key={idx} className="flex justify-between items-center bg-white border border-gray-200 px-2.5 py-1 rounded-lg">
                                        <span className="text-gray-500 font-semibold truncate max-w-[170px]">{item.name}</span>
                                        <span className="font-mono font-black text-gray-850">
                                          {item.value} {item.unit}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Action to drill report details */}
                              <div className="flex justify-end pt-2">
                                <button 
                                  onClick={() => setDetailForm({ type: 'test_report', mode: 'view', data: hist })}
                                  className="text-[10pt] font-black text-[#164399] hover:text-blue-800 flex items-center gap-1.5 cursor-pointer"
                                >
                                  Xem Biên bản chi tiết <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              </div>

                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/20 shadow-inner">
                <HelpCircle className="w-14 h-14 text-gray-300 animate-bounce duration-1000 mb-2" />
                <h5 className="text-[12pt] font-black text-gray-400 uppercase tracking-wider">Vui lòng chọn thiết bị ở danh sách trái</h5>
                <p className="text-[10pt] text-gray-450 max-w-sm mt-1">Chọn hoặc tìm kiếm bất kỳ một danh mục máy biến áp, máy cắt hay đường dây điện để hiển thị thông tin đo đạc tiêu chuẩn và lịch sử cụ thể.</p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
