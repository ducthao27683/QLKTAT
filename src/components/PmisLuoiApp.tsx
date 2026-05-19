import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Menu, Search, Bell, Bug, User, 
  Cpu, Activity, ClipboardList, AlertTriangle, 
  Wrench, BarChart2, Layers, Shield, Home, Package, MapPin, Circle,
  ChevronDown, ChevronLeft, ArrowLeft, Clock, Star, Calendar, Minus, Check, Filter, AlertCircle, CheckCircle2, Clock3, FileWarning,
  Network, ZoomIn, ZoomOut, Plus, Copy, Share2, Map, MoreVertical, Trash2, Edit, Lock, Key, RefreshCw, Move, X, LayoutDashboard, List, GitMerge, ListChecks, ExternalLink,
  Zap, GitCommit, Database, Server, Battery, Box, Archive, Eye, ChevronRight, FileText, FileX, History, Settings, FlaskConical, Maximize2, Minimize2, ChevronUp, Hash, KeyRound,
  MessageSquare, Download, Upload, Camera, Image, PlayCircle, Info, Printer, ShieldQuestion, File
} from 'lucide-react';
import { EvnLogo } from './EvnLogo';
import { UserConfig } from '../data';
import { Header } from '../shared/components/layout/Header';
import { Sidebar } from '../shared/components/layout/Sidebar';
import { BreadcrumbBar } from '../shared/components/layout/BreadcrumbBar';
import { WorkLocationPopup } from '../shared/components/layout/WorkLocationPopup';
import { Dashboard } from '../shared/components/layout/Dashboard';
import { FileUploader } from './FileUploader';
import { TestingDialogs } from '../modules/thi-nghiem/components/TestingDialogs';
import { TestingDetailView } from '../modules/thi-nghiem/components/TestingDetailView';
import { BranchSelectionPopup } from '../shared/components/layout/BranchSelectionPopup';

import { DesignTooltip } from './DesignTooltip';
import { YeuCauThiNghiemScreen } from '../modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen';
import { KetQuaThiNghiemScreen } from '../modules/thi-nghiem/ket-qua-thi-nghiem/KetQuaThiNghiemScreen';
import { DanhMucThiNghiemScreen } from '../modules/thi-nghiem/danh-muc-thi-nghiem/DanhMucThiNghiemScreen';
import { IncidentModule } from '../modules/su-co/thong-tin-su-co/ThongTinSuCoScreen';
import { DeviceModule } from '../modules/thiet-bi/thong-tin-thiet-bi/ThongTinThietBiScreen';

import { 
  MENU_ITEMS, 
  BRANCHES
} from '../shared/constants';
import { DEVICE_TYPE_COLORS } from '../modules/thiet-bi/constants';
import { MOCK_NOTIFICATIONS } from '../shared/components/layout/constants';
import {
  MOCK_CHART_DATA_EQ_CURRENT,
  MOCK_CHART_DATA_EQ_LAST_MONTH,
  MOCK_CHART_DATA_EQ_LAST_YEAR,
  MOCK_CHART_DATA_INCIDENT_3_MONTHS,
  MOCK_CHART_DATA_3
} from '../modules/dashboard/constants';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Label
} from 'recharts';
import { formatNumber, getDeviceDetails, getDetailedType, getDeviceTreeChildren, getDeviceTypes, getDeviceInstances, getNextOptions } from '../shared/utils';
import CSKH_ICON from '../assets/CSKH.png';

interface PmisLuoiAppProps {
  config: UserConfig;
  onBack: () => void;
}

const VOLTAGES = ["500kV", "220kV", "110kV", "<110kV"];

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
  const [dashboardBranch, setDashboardBranch] = useState("Công ty Điện lực Hưng Yên");
  const [showBranchTreePopup, setShowBranchTreePopup] = useState(false);
  
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
  const [showDeviceFilterList, setShowDeviceFilterList] = useState(false);
  const [deviceFilterStatuses, setDeviceFilterStatuses] = useState<string[]>(['Đang vận hành']);
  const [deviceFormMenuOpen, setDeviceFormMenuOpen] = useState(false);
  const [childSearch, setChildSearch] = useState('');
  const [deviceFormTab, setDeviceFormTab] = useState<'info' | 'tracking' | 'reports'>('info');
  const [deviceFormCurrentPage, setDeviceFormCurrentPage] = useState(1);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeviceSelection, setShowDeviceSelection] = useState(false);
  const [showRecordCreation, setShowRecordCreation] = useState(false);
  const [showDeviceParams, setShowDeviceParams] = useState<any>(null);

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
  const [testingResultViewMode, setTestingResultViewMode] = useState<'plan' | 'device'>('plan');
  const [testingPlanDetailTab, setTestingPlanDetailTab] = useState<'plan-info' | 'device-list' | 'outage' | 'approval'>('plan-info');
  const [testingViewMode, setTestingViewMode] = useState<'plan' | 'request'>('plan');
  const [selectedAvailableDevices, setSelectedAvailableDevices] = useState<string[]>([]);
  const [selectedPlanDevices, setSelectedPlanDevices] = useState<{id: string, name: string, type: string}[]>([
    { id: '1', name: 'Máy cắt 171', type: 'Máy cắt' },
    { id: '2', name: 'Biến dòng 171-A', type: 'Biến dòng' },
  ]);
  const [deviceSearchQuery, setDeviceSearchQuery] = useState('');
  const [deviceFilterTypes, setDeviceFilterTypes] = useState<string[]>(['MBA', 'MC']);
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [approvalDecision, setApprovalDecision] = useState<'approve' | 'reject' | null>(null);
  const [approvalComment, setApprovalComment] = useState('');
  
  const [testingFilterStatus, setTestingFilterStatus] = useState(['Mới', 'Đang thực hiện', 'Đã hoàn thành', 'Kế hoạch']);
  const [testingFilterType, setTestingFilterType] = useState(['Định kỳ', 'Đột xuất', 'CBM', 'Sau sự cố']);
  const [testingSearch, setTestingSearch] = useState('');
  const [showTestingFilter, setShowTestingFilter] = useState(false);

  
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
      const isReq = detailForm.data?.category === 'Yêu cầu' || (!detailForm.data?.category && activeSubMenu === 'Yêu cầu thí nghiệm');
      const textSuffix = isReq ? 'Yêu cầu thí nghiệm' : 'Kế hoạch thí nghiệm';
      
      if (mode === 'add') return <><span className="text-gray-900">Thêm mới</span> <span className="text-[#164399]">{textSuffix}</span></>;
      if (mode === 'edit') return <><span className="text-gray-900">Cập nhật</span> <span className="text-[#164399]">{textSuffix}</span></>;
      return <><span className="text-gray-900">Chi tiết</span> <span className="text-[#164399]">{textSuffix}</span></>;
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
      <Header
        config={config}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onBack={onBack}
        setActiveMenu={setActiveMenu}
        setActiveSubMenu={setActiveSubMenu}
        searchTags={searchTags}
        setSearchTags={setSearchTags}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearchPopup={showSearchPopup}
        setShowSearchPopup={setShowSearchPopup}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        favorites={favorites}
        setFavorites={setFavorites as any}
        history={history}
        notifications={MOCK_NOTIFICATIONS as any}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        filteredOptions={filteredOptions}
        handleSelectOption={handleSelectOption}
        handleSearchSubmit={handleSearchSubmit}
        toggleFavorite={toggleFavorite}
        loadSearch={loadSearch}
        isEditing={isEditing}
        currentBranch={selectedBranch}
        onOpenDeviceTreePopup={() => setShowBranchTreePopup(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <Sidebar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activeSubMenu={activeSubMenu}
          setActiveSubMenu={(subMenu) => {
            setActiveSubMenu(subMenu);
            setIsMenuOpen(false);
            if (detailForm?.mode === 'view') setDetailForm(null);
          }}
          isEditing={isEditing}
        />

        {/* Main Frame */}
        <div className="flex-1 flex flex-col overflow-hidden w-full relative">
          <BranchSelectionPopup
            showBranchTreePopup={showBranchTreePopup}
            setShowBranchTreePopup={setShowBranchTreePopup}
            selectedBranch={selectedBranch}
            setSelectedBranch={(branch) => {
              setSelectedBranch(branch);
              // Also update dashboardBranch to stay in sync if needed, 
              // but user said choosing in dash shouldn't affect global. 
              // Usually global should affect dash as a default/starting point.
              setDashboardBranch(branch);
              setDevicePath([branch]);
            }}
          />
          <BreadcrumbBar
            isEditing={isEditing}
            devicePath={devicePath}
            setDevicePath={setDevicePath}
            setTempDevicePath={setTempDevicePath}
            setShowDeviceTreePopup={setShowDeviceTreePopup}
            setDeviceFormCurrentPage={setDeviceFormCurrentPage}
            activeBreadcrumbDropdown={activeBreadcrumbDropdown}
            setActiveBreadcrumbDropdown={setActiveBreadcrumbDropdown}
            breadcrumbSearch={breadcrumbSearch}
            setBreadcrumbSearch={setBreadcrumbSearch}
            setDetailForm={setDetailForm}
            detailForm={detailForm}
            setActiveSubMenu={setActiveSubMenu}
          />

          <WorkLocationPopup
            showDeviceTreePopup={showDeviceTreePopup}
            setShowDeviceTreePopup={setShowDeviceTreePopup}
            tempDevicePath={tempDevicePath}
            setTempDevicePath={setTempDevicePath}
            deviceFavorites={deviceFavorites}
            setDeviceFavorites={setDeviceFavorites as any}
            deviceHistory={deviceHistory}
            setDeviceHistory={setDeviceHistory as any}
            setDevicePath={setDevicePath}
            setDeviceFormCurrentPage={setDeviceFormCurrentPage}
          />

          <main className="flex-1 overflow-hidden bg-[#F9F9F9] w-full">
          {detailForm ? (
            <div key={detailForm.type === 'device' ? detailForm.data : (detailForm.data?.id || 'new')} className="bg-white h-full flex flex-col overflow-hidden">
              <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setDetailForm(null)} 
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                  </button>
                  <div className="flex flex-col">
                    <h2 className="text-[12pt] font-bold leading-tight">
                      {getFormTitle()}
                    </h2>
                  </div>
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
                        className="p-2 text-[#164399] hover:bg-blue-50 rounded-lg transition-all border border-gray-200" 
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
                      {(!detailForm.data?.status || (detailForm.data.status !== 'Đã duyệt' && detailForm.data.status !== 'Từ chối')) && (
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
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col">
                {detailForm.type === 'testing_plan' || detailForm.type === 'testing_catalog' ? (
                  <TestingDetailView 
                    detailForm={detailForm}
                    setDetailForm={setDetailForm}
                    activeSubMenu={activeSubMenu}
                    setActiveSubMenu={setActiveSubMenu}
                    devicePath={devicePath}
                    config={config}
                    setShowApprovalPopup={setShowApprovalPopup}
                    setShowDeviceSelection={setShowDeviceSelection}
                    setShowDeviceParams={setShowDeviceParams}
                    setConfirmAction={setConfirmAction}
                  />
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Column 1: Info (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4 h-full">
                       {detailForm.type === 'device' ? (
                         <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10pt] font-bold text-gray-500 uppercase">Mã thiết bị</label>
                                <input 
                                  type="text" 
                                  defaultValue="TB-PCHY-001" 
                                  readOnly={detailForm.mode === 'view'}
                                  className={`w-full px-3 py-2 text-[12pt] font-black rounded-[10px] transition-all text-red-600 ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10pt] font-bold text-gray-500 uppercase">Tên thiết bị</label>
                                <input 
                                  type="text" 
                                  defaultValue={detailForm.data || ""} 
                                  readOnly={detailForm.mode === 'view'}
                                  className={`w-full px-3 py-2 text-[12pt] font-black rounded-[10px] transition-all text-[#164399] uppercase ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                />
                              </div>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Loại thiết bị</label>
                                 <select 
                                   disabled={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] font-bold rounded-[10px] transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 >
                                   <option>Máy cắt</option>
                                   <option>Biến áp</option>
                                   <option>Dao cách ly</option>
                                   <option>Biến dòng</option>
                                 </select>
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Trạng thái</label>
                                 <select 
                                   disabled={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] font-bold rounded-[10px] transition-all appearance-none ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
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
                                   className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Mã liên kết khác</label>
                                 <input 
                                   type="text" 
                                   defaultValue="-"
                                   readOnly={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Số S/N</label>
                                 <input 
                                   type="text" 
                                   defaultValue="SN-123456"
                                   readOnly={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Mã CMIS</label>
                                 <input 
                                   type="text" 
                                   defaultValue="CMIS-001"
                                   readOnly={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Số thẻ TSCD</label>
                                 <input 
                                   type="text" 
                                   defaultValue="3001"
                                   readOnly={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Góc lái</label>
                                 <input 
                                   type="text" 
                                   defaultValue="0.0"
                                   readOnly={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Khoảng cách vị trí</label>
                                 <input 
                                   type="text" 
                                   defaultValue="0"
                                   readOnly={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-500 uppercase">Tiếp địa</label>
                                 <input 
                                   type="text" 
                                   defaultValue="RC1"
                                   readOnly={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest">Khu vực</label>
                                 <input 
                                   type="text" 
                                   defaultValue="Đồng bằng"
                                   readOnly={detailForm.mode === 'view'}
                                   className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 />
                               </div>
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest">Mô tả chi tiết</label>
                               <textarea 
                                 rows={3}
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-3 py-2 text-[12pt] rounded-[10px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                 placeholder="Nhập mô tả..."
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
                                 className="w-full px-3 py-2 text-[12pt] font-bold rounded-[10px] transition-all bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
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

                  {/* Column 2: Images & Attachments (5 cols) */}
                  <div className="lg:col-span-5 bg-gray-50/50 rounded-xl border border-gray-100 p-6 space-y-8 h-fit">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Camera className="w-3.5 h-3.5" />
                          Hình ảnh liên quan
                        </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {(() => {
                              const images = [1, 2, 3, 4]; // Mock images
                              return (
                                <>
                                  {images.map((imgId) => (
                                    <div key={imgId} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group">
                                      <img src={`https://picsum.photos/seed/${detailForm.type}-${imgId}/400/225`} alt="Image" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                      {detailForm.mode !== 'view' && (
                                        <button className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                  {detailForm.mode !== 'view' && (
                                    <div className="col-span-2">
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
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
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
            <div className="bg-white h-full flex flex-col overflow-hidden">
              {activeSubMenu === 'Danh sách thiết bị' ? (
                <DeviceModule 
                  devicePath={devicePath}
                  setDevicePath={setDevicePath}
                  setActiveSubMenu={setActiveSubMenu}
                  childSearch={childSearch}
                  setChildSearch={setChildSearch}
                  deviceFormCurrentPage={deviceFormCurrentPage}
                  setDeviceFormCurrentPage={setDeviceFormCurrentPage}
                  deviceFormTab={deviceFormTab as any}
                  setDeviceFormTab={setDeviceFormTab as any}
                  deviceFormMenuOpen={deviceFormMenuOpen}
                  setDeviceFormMenuOpen={setDeviceFormMenuOpen}
                  setDetailForm={setDetailForm}
                  setPreviewContent={setPreviewContent}
                  setConfirmAction={setConfirmAction}
                  getDeviceDetails={getDeviceDetails}
                />
              ) : (activeSubMenu === 'Yêu cầu thí nghiệm' || activeSubMenu === 'Kế hoạch thí nghiệm') ? (
                <YeuCauThiNghiemScreen 
                  setActiveSubMenu={setActiveSubMenu} 
                  setDetailForm={setDetailForm}
                  activeSubMenu={activeSubMenu}
                  devicePath={devicePath}
                  activeUnit={selectedBranch}
                />
              ) : activeSubMenu === 'Kết quả thí nghiệm' ? (
                <KetQuaThiNghiemScreen 
                  setActiveSubMenu={setActiveSubMenu} 
                  setPreviewContent={setPreviewContent} 
                  setDetailForm={setDetailForm}
                  devicePath={devicePath}
                  activeUnit={selectedBranch}
                />
              ) : activeSubMenu === 'Danh mục thiết bị thí nghiệm' ? (
                <DanhMucThiNghiemScreen 
                  setActiveSubMenu={setActiveSubMenu} 
                  setDetailForm={setDetailForm} 
                  devicePath={devicePath}
                />
              ) : activeSubMenu === 'Danh sách sự cố' ? (
                <IncidentModule 
                  setActiveSubMenu={setActiveSubMenu}
                  devicePath={devicePath}
                  incidentViewMode={incidentViewMode as any}
                  setIncidentViewMode={setIncidentViewMode as any}
                  incidentPeriod={incidentPeriod}
                  setIncidentPeriod={setIncidentPeriod}
                  incidentFromDate={incidentFromDate}
                  setIncidentFromDate={setIncidentFromDate}
                  incidentToDate={incidentToDate}
                  setIncidentToDate={setIncidentToDate}
                  showIncidentFilter={showIncidentFilter}
                  setShowIncidentFilter={setShowIncidentFilter}
                  incidentFilterType={incidentFilterType}
                  setIncidentFilterType={setIncidentFilterType}
                  incidentFilterVoltage={incidentFilterVoltage}
                  setIncidentFilterVoltage={setIncidentFilterVoltage}
                  incidentFilterStatus={incidentFilterStatus}
                  setIncidentFilterStatus={setIncidentFilterStatus}
                  incidentSearch={incidentSearch}
                  setIncidentSearch={setIncidentSearch}
                  selectedIncidentId={selectedIncidentId}
                  setSelectedIncidentId={setSelectedIncidentId}
                  incidentDetailTab={incidentDetailTab as any}
                  setIncidentDetailTab={setIncidentDetailTab as any}
                  setDetailForm={setDetailForm}
                  setPreviewContent={setPreviewContent}
                  setConfirmAction={setConfirmAction}
                  selectedBranch={selectedBranch}
                />
              ) : (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <button 
                      onClick={() => setActiveSubMenu(null)}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="flex flex-col">
                      <h2 className="text-[12pt] font-semibold flex items-center gap-2 leading-[1.5]">
                        <span className="text-[#555555]">{activeMenu && (MENU_ITEMS.find(m => m.id === activeMenu)?.title || 'PMIS')}</span>
                        <span className="font-bold text-[#164399]">- {activeSubMenu}</span>
                      </h2>
                    </div>
                  </div>
                  <div className="text-gray-500 flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-lg">
                    Nội dung form {activeSubMenu} sẽ được thiết kế sau...
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto bg-[#F2F5F9] p-6 pb-20 custom-scrollbar">
              <Dashboard 
                config={config}
                selectedBranch={dashboardBranch}
                setSelectedBranch={setDashboardBranch}
                setActiveSubMenu={setActiveSubMenu}
                setSelectedIncidentId={setSelectedIncidentId}
                setActiveForm={setActiveForm}
              />
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
                     activeForm.type === 'Sự cố' ? 'Danh sách sự cố' : 
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

           <TestingDialogs 
             showApprovalPopup={showApprovalPopup}
             setShowApprovalPopup={setShowApprovalPopup}
             showDeviceSelection={showDeviceSelection}
             setShowDeviceSelection={setShowDeviceSelection}
             showRecordCreation={showRecordCreation}
             setShowRecordCreation={setShowRecordCreation}
             showDeviceParams={showDeviceParams}
             setShowDeviceParams={setShowDeviceParams}
             detailForm={detailForm}
             setDetailForm={setDetailForm}
             devicePath={devicePath}
             selectedPlanDevices={selectedPlanDevices}
             setSelectedPlanDevices={setSelectedPlanDevices}
             deviceSearchQuery={deviceSearchQuery}
             setDeviceSearchQuery={setDeviceSearchQuery}
             deviceTypeFilter={deviceFilterTypes[0] || ''}
             setDeviceTypeFilter={(val: string) => setDeviceFilterTypes([val])}
             config={config}
           />

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
