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
import { ReportDetailView } from '../modules/thi-nghiem/components/ReportDetailView';
import { BranchSelectionPopup } from '../shared/components/layout/BranchSelectionPopup';

import { DesignTooltip } from './DesignTooltip';
import { YeuCauThiNghiemScreen } from '../modules/thi-nghiem/yeu-cau-thi-nghiem/YeuCauThiNghiemScreen';
import { KetQuaThiNghiemScreen } from '../modules/thi-nghiem/ket-qua-thi-nghiem/KetQuaThiNghiemScreen';
import { DanhMucThiNghiemScreen } from '../modules/thi-nghiem/danh-muc-thi-nghiem/DanhMucThiNghiemScreen';
import { IncidentModule } from '../modules/su-co/thong-tin-su-co/ThongTinSuCoScreen';
import { DeviceModule } from '../modules/thiet-bi/thong-tin-thiet-bi/ThongTinThietBiScreen';
import { SoDoThietBiScreen } from '../modules/thiet-bi/SoDoThietBiScreen';
import { ThietBiDuPhongScreen } from '../modules/thiet-bi/ThietBiDuPhongScreen';

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
  "Điện lực Thành phố Hưng Yên": "ĐL THANH PHO",
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
  const [tempDevicePath, setTempDevicePath] = useState<string[]>(["Điện lực Thành phố Hưng Yên"]);
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

  const lastInstance = useMemo(() => {
    // Find the last instance name in the path (even indices)
    for (let i = devicePath.length - 1; i >= 0; i--) {
      if (i % 2 === 0 && devicePath[i]) return devicePath[i];
    }
    return "Đơn vị";
  }, [devicePath]);

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
  const [deviceFilterTypes, setDeviceFilterTypes] = useState<string[]>(['']);
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [approvalDecision, setApprovalDecision] = useState<'approve' | 'reject' | null>(null);
  const [approvalComment, setApprovalComment] = useState('');
  
  const [testingFilterStatus, setTestingFilterStatus] = useState(['Mới', 'Đang thực hiện', 'Đã hoàn thành', 'Kế hoạch']);
  const [testingFilterType, setTestingFilterType] = useState(['Định kỳ', 'Đột xuất', 'CBM', 'Sau sự cố']);
  const [testingSearch, setTestingSearch] = useState('');
  const [showTestingFilter, setShowTestingFilter] = useState(false);

  
  const [incidentDetailTab, setIncidentDetailTab] = useState<'detail' | 'reduction' | 'tracking'>('detail');
  const [previewContent, setPreviewContent] = useState<any | null>(null);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [previewPage, setPreviewPage] = useState(1);
  const [previewImageIdx, setPreviewImageIdx] = useState(0);

  useEffect(() => {
    if (previewContent) {
      setPreviewZoom(1);
      setPreviewPage(1);
      setPreviewImageIdx(previewContent.currentIndex || 0);
    }
  }, [previewContent]);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    isDanger?: boolean;
    icon?: any;
  } | null>(null);

  useEffect(() => {
    if (detailForm && detailForm.type === 'device' && detailForm.mode === 'view') {
      const currentDevice = devicePath[devicePath.length - 1];
      if (detailForm.data !== currentDevice) {
        setDetailForm({ ...detailForm, data: currentDevice });
      }
    }
  }, [devicePath, detailForm]);

  const [isDuPhongEditing, setIsDuPhongEditing] = useState(false);
  const isEditing = (detailForm && (detailForm.mode === 'add' || detailForm.mode === 'edit')) || isDuPhongEditing;

  const getFormTitle = () => {
    if (!detailForm) return null;
    const type = detailForm.type;
    const mode = detailForm.mode;
    const deviceName = devicePath[devicePath.length - 1];

    if (type === 'device') {
      const devName = (typeof detailForm.data === 'string' ? detailForm.data : '') || deviceName;
      if (mode === 'view') return <><span className="text-gray-700">Chi tiết thiết bị -</span> <span className="text-blue-600 font-extrabold ml-1.5">{devName}</span></>;
      if (mode === 'add') return <><span className="text-gray-700">Thêm mới -</span> <span className="text-blue-600 font-extrabold ml-1.5">Thiết bị thuộc {deviceName}</span></>;
      if (mode === 'edit') return <><span className="text-gray-700">Cập nhật thiết bị -</span> <span className="text-blue-600 font-extrabold ml-1.5">{devName}</span></>;
    } else if (type === 'testing_plan') {
      const docType = 'Phiếu yêu cầu thí nghiệm';
      const branchName = detailForm.data?.unit || deviceName || 'Chi nhánh';
      
      if (mode === 'add') return <><span className="text-[#164399]">Thêm mới {docType} -</span> <span className="text-blue-600 font-extrabold ml-1.5">{branchName}</span></>;
      return <><span className="text-[#164399]">Chi tiết - {docType} -</span> <span className="text-blue-600 font-extrabold ml-1.5">{branchName}</span></>;
    } else if (type === 'testing_catalog') {
      const deviceName = detailForm.data?.device || 'Thiết bị mới';
      const label = mode === 'view' ? 'Chi tiết thiết lập -' : mode === 'add' ? 'Thiết lập Thiết bị mới -' : 'Cập nhật thiết lập -';
      return <><span className="text-[#164399]">{label}</span> <span className="text-blue-600 font-extrabold ml-1.5">{deviceName}</span></>;
    } else if (type === 'test_report') {
      const deviceName = detailForm.data?.device || 'Thiết bị';
      const label = mode === 'view' ? 'Chi tiết Biên bản -' : mode === 'add' ? 'Tạo mới Biên bản -' : 'Cập nhật Biên bản -';
      return <><span className="text-[#164399]">{label}</span> <span className="text-blue-600 font-extrabold ml-1.5">{deviceName}</span></>;
    } else {
      const label = mode === 'view' ? 'Chi tiết Sự cố của -' : mode === 'add' ? 'Thêm mới Sự cố của -' : 'Cập nhật Sự cố của -';
      return <><span className="text-[#164399]">{label}</span> <span className="text-blue-600 font-extrabold ml-1.5">{lastInstance}</span></>;
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
              // Selecting branch in breadcrumb/location popup should NOT change dashboardBranch (Top Bar)
              // Only changing top bar unit manually should change it if needed.
              setDevicePath([branch]);
            }}
          />
          {activeSubMenu && activeSubMenu !== 'Sơ đồ thiết bị' && activeSubMenu !== 'Thiết bị dự phòng' && activeSubMenu !== 'Yêu cầu thí nghiệm' && activeSubMenu !== 'Kế hoạch thí nghiệm' && (
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
              setActiveMenu={setActiveMenu}
            />
          )}

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
                    onClick={() => {
                      if (detailForm.type === 'device' && typeof detailForm.data === 'string') {
                        const lastItem = devicePath[devicePath.length - 1];
                        if (lastItem === detailForm.data && devicePath.length > 2) {
                          setDevicePath(prev => prev.slice(0, -2));
                        }
                      }
                      setDetailForm(null);
                    }} 
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                  </button>
                  <div className="flex flex-col">
                    <h2 className="text-[12pt] font-bold leading-tight whitespace-normal break-words">
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
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setDetailForm({ ...detailForm, mode: 'edit' })} 
                        className="p-2.5 bg-blue-50 hover:bg-blue-100 hover:scale-105 text-[#164399] rounded-xl border border-transparent transition-all cursor-pointer shadow-sm duration-150 flex items-center justify-center shrink-0" 
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDetailForm({ ...detailForm, mode: 'add' })} 
                        className="p-2.5 bg-emerald-50 hover:bg-emerald-100 hover:scale-105 text-[#10B981] rounded-xl border border-transparent transition-all cursor-pointer duration-150 flex items-center justify-center shrink-0 shadow-sm" 
                        title="Copy"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {(detailForm.type === 'testing_plan' || detailForm.type === 'testing_catalog' || !detailForm.data?.status || (detailForm.data.status !== 'Đã duyệt' && detailForm.data.status !== 'Từ chối')) && (
                        <button 
                          onClick={() => { setConfirmAction({ title: 'Xác nhận xóa', message: 'Bạn có chắc chắn muốn xóa hồ sơ phiếu này không?', onConfirm: () => { setDetailForm(null); } }); }} 
                          className="p-2.5 bg-red-50 hover:bg-red-100 hover:scale-105 text-red-650 rounded-xl border border-transparent transition-all cursor-pointer duration-150 flex items-center justify-center shrink-0 shadow-sm" 
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
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
                    setPreviewContent={setPreviewContent}
                  />
                ) : detailForm.type === 'test_report' ? (
                  <ReportDetailView 
                    detailForm={detailForm}
                    setDetailForm={setDetailForm}
                    config={config}
                    setPreviewContent={setPreviewContent}
                  />
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-blue-50/20">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Column 1: Info (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4 h-full">
                            {detailForm.type === 'device' ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                                  {/* Cột trái: Tên thiết bị (chiều cao bằng 2 dòng Cấp điện áp + Mã thiết bị) và Trạng thái thiết bị */}
                                  <div className="flex flex-col gap-4 justify-between h-full">
                                    {/* Ô Tên thiết bị */}
                                    <div className="flex flex-col justify-start space-y-1.5 bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex-1 min-h-[114px]">
                                      <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-wider">Tên thiết bị</label>
                                      {detailForm.mode === 'view' ? (
                                        <div className="text-[14pt] font-extrabold text-[#000000] leading-tight pt-1 pr-2">
                                          {detailForm.data || "Chưa có tên"}
                                        </div>
                                      ) : (
                                        <textarea 
                                          rows={2}
                                          defaultValue={detailForm.data || ""} 
                                          onChange={(e) => {
                                            setDetailForm({ ...detailForm, data: e.target.value });
                                          }}
                                          className="w-full px-3 py-1.5 text-[12pt] font-extrabold rounded-[10px] transition-all text-slate-800 bg-white border border-gray-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-left"
                                        />
                                      )}
                                    </div>

                                    {/* Ô Trạng thái thiết bị phía dưới Tên thiết bị */}
                                    <div className="bg-[#f0f4f8]/70 p-4 rounded-xl border border-[#e2edf8] flex items-center justify-between h-[52px] shrink-0">
                                      <span className="text-[10pt] font-bold text-gray-400 uppercase tracking-wider shrink-0">Trạng thái thiết bị</span>
                                      <div className="flex-1 min-w-0 flex justify-end">
                                        <select 
                                          disabled={detailForm.mode === 'view'}
                                          defaultValue="Đang vận hành"
                                          className={`px-3 py-1 text-[11pt] font-black text-green-600 rounded-[6px] transition-all appearance-none cursor-pointer ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none text-right' : 'bg-white border border-gray-250 focus:border-blue-500 text-left w-full max-w-[150px]'}`}
                                        >
                                          <option>Đang vận hành</option>
                                          <option>Dự phòng</option>
                                          <option>Sửa chữa</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Cột phải: Cấp điện áp, Mã thiết bị, Loại thiết bị */}
                                  <div className="bg-[#f0f4f8]/70 p-4 rounded-xl border border-[#e2edf8] flex flex-col gap-3 justify-between h-full">
                                    {/* Hàng 1: Cấp điện áp */}
                                    <div className="flex items-center justify-between border-b border-white pb-1.5 h-[36px]">
                                      <span className="text-[10pt] font-bold text-gray-400 uppercase tracking-wider shrink-0">Cấp điện áp</span>
                                      <div className="flex-1 min-w-0 flex justify-end">
                                        <select 
                                          disabled={detailForm.mode === 'view'}
                                          defaultValue="110kV"
                                          className={`px-3 py-1 text-[11pt] font-black text-amber-700 rounded-[6px] transition-all appearance-none cursor-pointer ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none text-right' : 'bg-white border border-gray-250 focus:border-blue-500 text-left w-full max-w-[150px]'}`}
                                        >
                                          <option>110kV</option>
                                          <option>220kV</option>
                                          <option>500kV</option>
                                          <option>35kV</option>
                                          <option>22kV</option>
                                        </select>
                                      </div>
                                    </div>

                                    {/* Hàng 2: Mã thiết bị - Text màu Đỏ */}
                                    <div className="flex items-center justify-between border-b border-white pb-1.5 h-[36px]">
                                      <span className="text-[10pt] font-bold text-gray-400 uppercase tracking-wider shrink-0">Mã thiết bị</span>
                                      <div className="flex-1 min-w-0 flex justify-end">
                                        <input 
                                          type="text" 
                                          defaultValue="TB-PCHY-001" 
                                          readOnly={detailForm.mode === 'view'}
                                          className={`px-3 py-1 text-[11pt] font-black text-red-600 rounded-[6px] transition-all ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none text-right' : 'bg-white border border-gray-250 focus:border-blue-500 text-left w-full max-w-[150px]'}`}
                                        />
                                      </div>
                                    </div>

                                    {/* Hàng 3: Loại thiết bị */}
                                    <div className="flex items-center justify-between h-[36px]">
                                      <span className="text-[10pt] font-bold text-gray-400 uppercase tracking-wider shrink-0">Loại thiết bị</span>
                                      <div className="flex-1 min-w-0 flex justify-end">
                                        <select 
                                          disabled={detailForm.mode === 'view'}
                                          defaultValue="Máy cắt"
                                          className={`px-3 py-1 text-[11pt] font-black text-[#164399] rounded-[6px] transition-all appearance-none cursor-pointer ${detailForm.mode === 'view' ? 'bg-transparent border-transparent focus:outline-none text-right' : 'bg-white border border-gray-250 focus:border-blue-500 text-left w-full max-w-[150px]'}`}
                                        >
                                          <option>Máy cắt</option>
                                          <option>Biến áp</option>
                                          <option>Dao cách ly</option>
                                          <option>Biến dòng</option>
                                          <option>Chống sét van</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2 flex items-center justify-between bg-gray-100/80 p-3 rounded-xl border border-slate-200/50 mt-4 mb-2">
                                  <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                    <Settings className="w-5 h-5 text-slate-500" /> THÔNG SỐ KỸ THUẬT
                                  </h4>
                                </div>
                             <div className="grid grid-cols-2 gap-4">
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
                               <label className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest pl-1">Mô tả chi tiết</label>
                               <textarea 
                                 rows={3}
                                 readOnly={detailForm.mode === 'view'}
                                 className={`w-full px-4 py-3 text-[11.5pt] rounded-xl transition-all border text-left resize-none ${detailForm.mode === 'view' ? 'bg-gray-100/60 border-gray-200/50 text-slate-700' : 'bg-white border-gray-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800'}`}
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
                  <div className="lg:col-span-5 bg-white shadow-sm rounded-xl border border-gray-100 p-6 space-y-8 h-fit">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                  <Camera className="w-5 h-5 text-orange-500" /> HÌNH ẢNH MINH HỌA
                                </h4>
                             </div>
                          <div className="grid grid-cols-2 gap-3">
                            {(() => {
                              const images = [1, 2, 3, 4]; // Mock images
                              return (
                                <>
                                  {images.map((imgId) => (
                                    <div 
                                      key={imgId} 
                                      onClick={() => {
                                        setPreviewImageIdx(imgId - 1);
                                        setPreviewContent({
                                          type: 'image',
                                          imagesList: [1, 2, 3, 4].map(id => `https://picsum.photos/seed/${detailForm.type}-${id}/400/300`),
                                          name: `HÌNH ẢNH MINH HỌA ${detailForm.data || 'THIẾT BỊ'}`
                                        });
                                      }}
                                      className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group relative shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                                    >
                                      <img src={`https://picsum.photos/seed/${detailForm.type}-${imgId}/400/300`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-zoom-in" referrerPolicy="no-referrer" alt="" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                  <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                {detailForm.mode !== 'view' && (
                                  <div 
                                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                                    onClick={(e) => { e.stopPropagation(); }}
                                  >
                                          <Trash2 className="w-3.5 h-3.5" />
                                  </div>
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
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                          <FileText className="w-5 h-5 text-blue-500" /> TÀI LIỆU ĐÍNH KÈM
                        </h4>
                     </div>
                          <div className="space-y-2">
                            {[1].map(i => (
                              <div 
                                key={i} 
                                onClick={() => {
                                  setPreviewContent({
                                    type: 'document',
                                    name: 'Tai_lieu_ho_so_PMIS_001.pdf',
                                    fileCode: 'DOC-PMIS-171'
                                  });
                                }}
                                className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md hover:bg-slate-50 transition-all cursor-pointer group"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="p-2.5 bg-white rounded-xl text-[#164399] shadow-sm border border-slate-100 group-hover:text-amber-500 transition-colors">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="text-[10.5pt] font-bold text-slate-700 group-hover:text-[#164399] transition-colors truncate">Tai_lieu_001.pdf</p>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[8pt] text-slate-400 font-bold uppercase">1.2 MB</span>
                                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                      <span className="text-[8pt] text-slate-400 font-medium">10/06/2026</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors" title="Tải xuống">
                                    <Download className="w-4 h-4" />
                                  </button>
                                  {detailForm.mode !== 'view' && (
                                    <button className="p-1.5 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors rounded-[20%] border-none cursor-pointer" title="Xóa">
<Trash2 className="w-4 h-4" />
</button>
                                  )}
                                </div>
                              </div>
                            ))}
                            <FileUploader 
                               type="document" 
                               mode={detailForm.mode} 
                               onFileSelect={(files) => console.log('Selected documents:', files)} 
                            />
                          </div>
                        </div>

                        {/* Thống kê nghiệp vụ */}
                        <div className="space-y-4 pt-4 border-t border-gray-100/60 mt-4">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                              <BarChart2 className="w-5 h-5 text-purple-500" /> THỐNG KÊ NGHIỆP VỤ
                            </h4>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-red-50/85 p-3.5 rounded-xl border border-red-100/60 shadow-xs">
                               <p className="text-[10pt] font-bold text-red-700/80 mb-1">Sự cố</p>
                               <p className="text-[15pt] font-black text-red-650">2</p>
                            </div>
                            <div className="bg-sky-50/85 p-3.5 rounded-xl border border-sky-100/60 shadow-xs">
                               <p className="text-[10pt] font-bold text-sky-700/80 mb-1">Sửa chữa</p>
                               <p className="text-[15pt] font-black text-sky-650">3</p>
                            </div>
                            <div className="bg-purple-50/85 p-3.5 rounded-xl border border-purple-100/60 shadow-xs">
                               <p className="text-[10pt] font-bold text-purple-700/80 mb-1">Thí nghiệm</p>
                               <p className="text-[15pt] font-black text-purple-650">10</p>
                            </div>
                            <div className="bg-amber-50/85 p-3.5 rounded-xl border border-amber-100/60 shadow-xs">
                               <p className="text-[10pt] font-bold text-amber-700/80 mb-1">Công việc</p>
                               <p className="text-[15pt] font-black text-amber-700">1</p>
                            </div>
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
              {activeSubMenu === 'Sơ đồ thiết bị' ? (
                <SoDoThietBiScreen 
                  setActiveSubMenu={setActiveSubMenu}
                  setDetailForm={setDetailForm}
                  setPreviewContent={setPreviewContent}
                  devicePath={devicePath}
                  setDevicePath={setDevicePath}
                />
              ) : activeSubMenu === 'Danh sách thiết bị' ? (
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
              ) : activeSubMenu === 'Thiết bị dự phòng' ? (
                <ThietBiDuPhongScreen 
                  setActiveSubMenu={setActiveSubMenu}
                  devicePath={devicePath}
                  onEditingChange={setIsDuPhongEditing}
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
              ) : (activeSubMenu === 'Danh mục thiết bị thí nghiệm' || activeSubMenu === 'Danh mục thí nghiệm' || activeSubMenu === 'Thiết lập thí nghiệm' || activeSubMenu === 'Thiết lập hạng mục' || activeSubMenu === 'Thiết lập thiết bị') ? (
                <DanhMucThiNghiemScreen 
                  setActiveSubMenu={setActiveSubMenu} 
                  setDetailForm={setDetailForm} 
                  devicePath={devicePath}
                  setPreviewContent={setPreviewContent}
                  activeSubMenu={activeSubMenu}
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
            <div className="h-full overflow-y-auto bg-[#F2F5F9] p-6 pb-20 custom-scrollbar">
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
                  <h3 className="font-bold text-[12pt] text-gray-700 flex items-center gap-2">
                    {activeForm.type === 'Xem' && <Eye className="w-5 h-5 text-blue-500" />}
                    {activeForm.type === 'Sự cố' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                    {activeForm.type === 'Công việc' && <Wrench className="w-5 h-5 text-orange-500" />}
                    {activeForm.type === 'Thông số' && <Activity className="w-5 h-5 text-green-500" />}
                    {activeForm.type === 'Xem' ? 'Thông tin thiết bị' : 
                     activeForm.type === 'Sự cố' ? 'Danh sách sự cố' : 
                     activeForm.type === 'Công việc' ? 'Kết quả công việc' : 'Giám sát thông số'}
                  </h3>
                  <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors" onClick={() => setActiveForm(null)}>
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
                      setConfirmAction({
                        title: 'Đã lưu thành công',
                        message: 'Dữ liệu thông tin thiết bị đã được cập nhật và đồng bộ lên cổng PMIS lưới điện thành công!',
                        onConfirm: () => {
                          setConfirmAction(null);
                          setActiveForm(null);
                        },
                        isDanger: false
                      });
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
            <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setPreviewContent(null)}>
              <div 
                className={`relative flex flex-col bg-white rounded-xl overflow-hidden shadow-2xl max-h-[92vh] transition-all duration-300 ${
                  previewContent.type === 'image' ? 'w-[80vw] max-w-[80vw]' : 'w-[75vw] max-w-[75vw]'
                }`}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 shrink-0">
                  <h3 className="text-[12pt] font-black text-gray-700 tracking-tight truncate pr-4 uppercase flex items-center gap-2">
                    {previewContent.type === 'image' ? (
                      <>
                        <Camera className="w-5 h-5 text-orange-500 shrink-0" />
                        {(() => {
                          let rName = previewContent.imagesList ? `MINH HỌA` : (previewContent.name || 'MINH HỌA');
                          rName = rName.replace(/(\(.*?\)|\[.*?\])/g, '').trim();
                          return rName.toUpperCase().startsWith('HÌNH ẢNH') ? rName.toUpperCase() : `HÌNH ẢNH ${rName.toUpperCase()}`;
                        })()}
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                        XEM NỘI DUNG TỆP ONLINE
                      </>
                    )}
                  </h3>
                  <button 
                    className="p-1.5 hover:bg-gray-200/60 rounded-lg transition-colors"
                    onClick={() => setPreviewContent(null)}
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Main Preview Container */}
                <div className="flex-1 overflow-hidden flex flex-col bg-slate-100">
                  {previewContent.type === 'image' ? (
                    <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-[55vh] bg-slate-950 transition-colors">
                      {/* Left Arrow */}
                      {previewContent.imagesList && previewContent.imagesList.length > 1 && (
                        <button 
                          onClick={() => {
                            setPreviewImageIdx(prev => (prev - 1 + previewContent.imagesList.length) % previewContent.imagesList.length);
                            setPreviewZoom(1);
                          }}
                          className="absolute left-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all shadow-md z-10 hover:scale-105 active:scale-95 border border-white/10"
                        >
                          <ChevronLeft className="w-5 h-5 font-black" />
                        </button>
                      )}

                      {/* Display Image with Scale Zoom */}
                      <div className="w-full h-[65vh] overflow-auto custom-scrollbar flex items-center justify-center p-2 bg-slate-950">
                        <img 
                          src={previewContent.imagesList ? previewContent.imagesList[previewImageIdx] : previewContent.url} 
                          alt="Preview" 
                          style={{ transform: `scale(${previewZoom})`, transformOrigin: 'center center' }}
                          className="max-w-full max-h-full object-contain transition-transform duration-250 ease-out shadow-lg" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>

                      {/* Right Arrow */}
                      {previewContent.imagesList && previewContent.imagesList.length > 1 && (
                        <button 
                          onClick={() => {
                            setPreviewImageIdx(prev => (prev + 1) % previewContent.imagesList.length);
                            setPreviewZoom(1);
                          }}
                          className="absolute right-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all shadow-md z-10 hover:scale-105 active:scale-95 border border-white/10"
                        >
                          <ChevronRight className="w-5 h-5 font-black" />
                        </button>
                      )}
                    </div>
                  ) : (
                    /* Simulated Interactive Document Page Viewer */
                    <div className="flex-1 overflow-auto bg-slate-200/50 p-6 flex flex-col items-center">
                      <div 
                        style={{ width: `${640 * previewZoom}px`, minHeight: '800px' }}
                        className="bg-white shadow-xl border border-gray-200/70 p-10 space-y-6 text-left relative overflow-hidden transition-all duration-300 rounded"
                      >
                        {/* Interactive Page rendered based on state previewPage (1-5) */}
                        {previewPage === 1 && (
                          <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-start justify-between border-b border-slate-250/50 pb-4">
                              <div className="text-gray-400 font-mono text-[7.5pt] font-black uppercase">
                                KHỐI: KỸ THUẬT & AN TOÀN EVN
                              </div>
                              <div className="text-right text-gray-400 font-mono text-[7.5pt] font-black uppercase">
                                PMIS-DOC-{previewContent.fileCode || 'REF-2026'}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-left leading-tight">
                                <p className="text-[7.5pt] font-extrabold uppercase text-slate-800">TẬP ĐOÀN ĐIỆN LỰC VIỆT NAM</p>
                                <p className="text-[7.5pt] font-semibold text-slate-600">Ban quản lý Kỹ thuật lưới điện</p>
                              </div>
                              <div className="text-right leading-tight">
                                <p className="text-[7.5pt] font-extrabold uppercase text-slate-800">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                                <p className="text-[7.5pt] font-bold text-slate-700 text-center">Độc lập - Tự do - Hạnh phúc</p>
                              </div>
                            </div>
                            <div className="pt-8 text-center space-y-2">
                               <h2 className="text-[14pt] font-black text-[#164399] tracking-wider uppercase">TIÊU CHUẨN KỸ THUẬT VÀ QUY TRÌNH KIỂM KIỆT CHẤT LƯỢNG</h2>
                               <p className="text-[10pt] font-bold text-slate-800 italic underline text-center">
                                 "{previewContent.name || 'Tài liệu hướng dẫn kỹ thuật'}"
                               </p>
                            </div>
                            <div className="pt-8 space-y-4 text-[10pt] text-slate-705 leading-relaxed font-medium">
                               <p className="font-bold text-[10.5pt] text-slate-850">Chương I: Quy định chung và phạm vi trách nhiệm</p>
                               <p><strong>Điều 1. Phạm vi điều chỉnh</strong>: Văn bản quy định chi tiết các tiêu chí đo đạc thực tế, chuẩn mức an toàn điện áp, bảo trì dự phòng, và quy phạm hòa lưới dành riêng cho các thiết bị phân kho, lưới trạm biến áp, máy cắt, dao cách ly lưới truyền tải trực thuộc Trung tâm Điều độ Hệ thống Điện Quốc gia.</p>
                               <p><strong>Điều 2. Quy chuẩn trích dẫn</strong>: Tuân thủ Nghị định số 14/2014/NĐ-CP hướng dẫn Luật Điện lực về an toàn điện và Thông tư số 33/2015/TT-BCT.</p>
                               <p><strong>Điều 3. Trách nhiệm thực thi</strong>: Kỹ sư trưởng, trưởng kíp vận hành, điều độ viên chịu trách nhiệm đo đạc, kiểm tra nhật ký và cập nhật báo cáo lên hệ thống PMIS định kỳ hàng tuần.</p>
                            </div>
                          </div>
                        )}

                        {previewPage === 2 && (
                          <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-start justify-between border-b border-slate-250/50 pb-4">
                              <span className="text-gray-400 font-mono text-[7.5pt] font-black">PHỤ LỤC 01A / EVN-KỸ THUẬT</span>
                              <span className="text-gray-400 font-mono text-[7.5pt] font-black">TRANG 2 / 5</span>
                            </div>
                            <h3 className="text-[12pt] font-black text-gray-700 border-l-4 border-blue-600 pl-3">BẢNG TIÊU CHUẨN THÔNG SỐ VÀ ĐỊNH MỨC GIỚI HẠN</h3>
                            <p className="text-[10pt] text-gray-600 font-medium">Chỉ số giới hạn vận hành an toàn cho phép áp dụng thử nghiệm lưới trạm TBA 110kV:</p>
                            
                            <table className="w-full text-left border border-gray-200 mt-4 text-[9.5pt]">
                              <thead>
                                <tr className="bg-slate-50 text-slate-800 border-b border-gray-200 font-black">
                                  <th className="p-2 border-r border-gray-200 text-center">STT</th>
                                  <th className="p-2 border-r border-gray-200">Thông số kiểm tra</th>
                                  <th className="p-2 border-r border-gray-200 text-center">Tiêu chuẩn</th>
                                  <th className="p-2 text-center">Khuyến nghị Biên độ</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-250/50 font-semibold text-slate-700">
                                <tr className="hover:bg-slate-50">
                                  <td className="p-2 border-r border-gray-250 text-center">1</td>
                                  <td className="p-2 border-r border-gray-250">Điện trở cách điện cuộn dây</td>
                                  <td className="p-2 border-r border-gray-250 text-center">≥ 1000 MΩ</td>
                                  <td className="p-2 text-center text-emerald-600 font-black">ĐẠT</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                  <td className="p-2 border-r border-gray-250 text-center">2</td>
                                  <td className="p-2 border-r border-gray-250">Tổn hao điện môi khí SF6 (tan δ)</td>
                                  <td className="p-2 border-r border-gray-250 text-center font-mono">≤ 0.5 %</td>
                                  <td className="p-2 text-center text-emerald-600 font-black">ĐẠT</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                  <td className="p-2 border-r border-gray-250 text-center">3</td>
                                  <td className="p-2 border-r border-gray-250">Hàm lượng ẩm trong dầu MBA</td>
                                  <td className="p-2 border-r border-gray-250 text-center font-mono">≤ 15 ppm</td>
                                  <td className="p-2 text-center text-emerald-600 font-black">ĐẠT</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                  <td className="p-2 border-r border-gray-250 text-center">4</td>
                                  <td className="p-2 border-r border-gray-250">Điện áp thử nghiệm xoay chiều</td>
                                  <td className="p-2 border-r border-gray-250 text-center">95 kV / 1 min</td>
                                  <td className="p-2 text-center text-emerald-600 font-black">ĐẠT</td>
                                </tr>
                              </tbody>
                            </table>
                            
                            <div className="text-[9pt] bg-amber-50 text-amber-800 p-3 rounded-lg border border-amber-200 font-bold leading-relaxed mt-4">
                              ⚠️ *GHI CHÚ QUANG TRỌNG*: Trong trường hợp tổn hao điện môi tan δ vượt quá 0.8% hoặc điện trở sụt giảm dưới 500 MΩ, lập tức dừng hòa lưới và kích hoạt chế độ khóa khẩn cấp để xử lý cô lập bảo dưỡng màng lọc dầu.
                            </div>
                          </div>
                        )}

                        {previewPage === 3 && (
                          <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-start justify-between border-b border-slate-250/50 pb-4">
                              <span className="text-gray-400 font-mono text-[7.5pt] font-black">PHỤ LỤC 01B / EVN-KỸ THUẬT</span>
                              <span className="text-gray-400 font-mono text-[7.5pt] font-black">TRANG 3 / 5</span>
                            </div>
                            <h3 className="text-[12pt] font-black text-gray-700 border-l-4 border-blue-600 pl-3">CHỈ TIÊU KỸ THUẬT VÀ ĐO ĐẠC KIỂM TRA ĐỊNH KỲ</h3>
                            <div className="pt-4 space-y-4 text-[10pt] text-slate-705 leading-relaxed font-medium">
                              <p><strong>1. Thử nghiệm định kỳ hàng quý:</strong> Thực hiện chụp sóng dao động hành trình tiếp điểm máy cắt SF6, đo điện trở tiếp xúc (micro-ohm) lõi dẫn điện chính để đảm bảo tổn hao phát nóng khớp nối nằm dưới biên độ giới hạn an toàn 50 micro-ohm.</p>
                              <p><strong>2. Kiểm tra nhiệt độ tiếp xúc bằng camera hồng ngoại:</strong> Tiến hành quét nhiệt toàn trạm 15 ngày/lần vào khung giờ phụ tải cao (11h00 - 14h00 hoặc 18h30 - 21h30). Báo cáo khẩn cấp nếu độ lệch nhiệt độ giữa các pha vượt quá 5°C.</p>
                              <p><strong>3. Vệ sinh sứ cách điện và siết lực kẹp cực:</strong> Kết hợp cùng lịch cắt điện công tác đường dây để làm sạch bụi bẩn tích tụ trên chuỗi sứ cách điện silicon/ceramic nhằm triệt tiêu dòng rò văng tia lửa điện phóng hồ quang.</p>
                            </div>
                          </div>
                        )}

                        {previewPage === 4 && (
                          <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-start justify-between border-b border-slate-250/50 pb-4">
                              <span className="text-gray-400 font-mono text-[7.5pt] font-black">PHỤ LỤC 01C / EVN-KỸ THUẬT</span>
                              <span className="text-gray-400 font-mono text-[7.5pt] font-black">TRANG 4 / 5</span>
                            </div>
                            <h3 className="text-[12pt] font-black text-gray-700 border-l-4 border-blue-600 pl-3">BIỆN PHÁP AN TOÀN VÀ PHÒNG NGỪA SỰ CỐ</h3>
                            <div className="pt-4 space-y-4 text-[10pt] text-slate-705 leading-relaxed font-semibold italic text-slate-600">
                              <p>"Mọi kỹ sư hiện trường bắt buộc tuân thủ nguyên tắc 5 bước an toàn cơ bản trước khi mở cửa khoang tủ điều khiển trung tâm hoặc tiếp xúc cơ khí lưỡi dao cách ly:"</p>
                              <ul className="list-decimal pl-5 space-y-2 text-[9.5pt] not-italic font-medium text-slate-700">
                                <li>Kiểm tra trạng thái máy cắt đã mở hoàn toàn và hiển thị chỉ thị cơ khí 'OFF'.</li>
                                <li>Cắt nguồn điều khiển AC/DC và nguồn khởi động khí nén.</li>
                                <li>Treo biển cảnh báo cấm đóng điện 'CẤM KHỞI ĐỘNG - CÓ NGƯỜI ĐANG LÀM VIỆC' tại tay quay liên động cơ khí.</li>
                                <li>Thực hiện nối đất tiếp địa lưu động hai đầu chạm công tác bằng sào chuyên dụng.</li>
                                <li>Thiết lập rào chắn an toàn cô lập khu lân cận mang điện áp cao.</li>
                              </ul>
                            </div>
                          </div>
                        )}

                        {previewPage === 5 && (
                          <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-start justify-between border-b border-slate-250/50 pb-4">
                              <span className="text-gray-400 font-mono text-[7.5pt] font-black">BAN KỸ THUẬT EVN</span>
                              <span className="text-gray-400 font-mono text-[7.5pt] font-black">TRANG 5 / 5</span>
                            </div>
                            <h3 className="text-[12pt] font-black text-gray-700 border-l-4 border-blue-600 pl-3">XÁC NHẬN PHÊ DUYỆT & KÝ TÊN THẦM ĐỊNH</h3>
                            <p className="text-[10pt] text-slate-600 font-medium leading-relaxed">Tài liệu đã được nghiên cứu, hiệu đính và chính thức ban hành áp dụng đồng bộ trên toàn bộ mạng lưới truyền tải lưới điện EVN. Các chi nhánh Grid, Công ty thí nghiệm điện chịu trách nhiệm triển khai huấn luyện sát hạch định kỳ hàng năm.</p>
                            
                            <div className="grid grid-cols-3 gap-4 pt-16 text-center text-[9.5pt]">
                              <div className="space-y-1">
                                <p className="font-bold text-slate-800 uppercase text-[8pt]">NGƯỜI LẬP BIỂU</p>
                                <p className="text-[7.5pt] text-gray-400 font-bold italic">(Ký, ghi rõ họ tên)</p>
                                <div className="h-20 flex items-center justify-center font-mono font-bold text-blue-500 italic text-[11pt]">
                                  Lê Văn Hoàng
                                </div>
                                <p className="font-extrabold text-slate-700 text-[8pt]">Kỹ sư Trưởng Trạm</p>
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-slate-800 uppercase text-[8pt]">THẨM ĐỊNH BAN KỸ THUẬT</p>
                                <p className="text-[7.5pt] text-gray-400 font-bold italic">(Ký, ghi rõ họ tên)</p>
                                <div className="h-20 flex items-center justify-center font-mono font-bold text-blue-500 italic text-[11pt]">
                                  Trần Minh Đạt
                                </div>
                                <p className="font-extrabold text-slate-700 text-[8pt]">Trưởng phòng Giám sát</p>
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-slate-800 uppercase text-[8pt]">LÃNH ĐẠO PHÊ DUYỆT</p>
                                <p className="text-[7.5pt] text-gray-400 font-bold italic">(Ký, đóng dấu hoặc chữ ký số)</p>
                                <div className="h-20 flex flex-col items-center justify-center font-mono font-bold text-red-600 italic leading-none border border-red-200 rounded p-1 bg-red-50/50 scale-90 mx-auto w-28">
                                  <span className="text-[6.5pt] font-black uppercase tracking-tighter not-italic text-gray-700">EVN SIGNED</span>
                                  <span className="text-[8.5pt] font-black py-0.5">Ngô Sỹ Hội</span>
                                  <span className="text-[5.5pt] font-bold not-italic text-gray-400">10/04/2026 09:15</span>
                                </div>
                                <p className="font-extrabold text-slate-700 text-[8pt]">Phó Giám đốc Kỹ thuật</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls for Both Options */}
                <div className="flex items-center gap-4 py-3.5 px-6 bg-slate-50 border-t border-slate-200/50 justify-between shrink-0 select-none">
                  {/* Zoom controls */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setPreviewZoom(z => Math.max(0.5, z - 0.2))}
                      className="p-2 bg-white border border-gray-250 rounded-lg hover:bg-gray-100 text-gray-700 active:scale-95 transition-all"
                      title="Thu nhỏ"
                    >
                      <ZoomOut className="w-4.5 h-4.5 font-bold" />
                    </button>
                    <span className="font-mono text-[9.5pt] font-black text-gray-500 w-11 text-center">{Math.round(previewZoom * 100)}%</span>
                    <button 
                      onClick={() => setPreviewZoom(z => Math.min(2.5, z + 0.2))}
                      className="p-2 bg-white border border-gray-250 rounded-lg hover:bg-gray-100 text-gray-700 active:scale-95 transition-all"
                      title="Phóng to"
                    >
                      <ZoomIn className="w-4.5 h-4.5 font-bold" />
                    </button>
                    <button 
                      onClick={() => setPreviewZoom(1)}
                      className="p-2 bg-white border border-gray-250 rounded-lg hover:bg-gray-100 text-gray-500 active:scale-95 transition-all"
                      title="Reset kích thước"
                    >
                      <RefreshCw className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Middle Page navigation OR Image List Indices */}
                  {previewContent.type === 'image' ? (
                    previewContent.imagesList && previewContent.imagesList.length > 1 && (
                      <div className="text-[10pt] font-black text-slate-700 bg-blue-50/50 px-3.5 py-1 rounded-lg border border-blue-200/55 font-mono shadow-sm">
                        Hình ảnh {previewImageIdx + 1} / {previewContent.imagesList.length}
                      </div>
                    )
                  ) : (
                    /* Page Index for Document PDF */
                    <div className="flex items-center gap-2">
                      <button 
                        disabled={previewPage === 1}
                        onClick={() => setPreviewPage(p => Math.max(1, p - 1))}
                        className="p-2 bg-white border border-gray-250 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-gray-700 active:scale-95 transition-all"
                        title="Trang trước"
                      >
                        <ChevronLeft className="w-4.5 h-4.5" />
                      </button>
                      <span className="text-[10.5pt] font-black pointer-events-none px-2 font-mono text-[#164399]">
                        {previewPage} / 5
                      </span>
                      <button 
                        disabled={previewPage === 5}
                        onClick={() => setPreviewPage(p => Math.min(5, p + 1))}
                        className="p-2 bg-white border border-gray-250 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-gray-700 active:scale-95 transition-all"
                        title="Trang sau"
                      >
                        <ChevronRight className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  )}

                  {/* Right Download Button */}
                  <div>
                    <button 
                      onClick={() => {
                        const currentUrl = (previewContent.type === 'image' && previewContent.imagesList) 
                          ? previewContent.imagesList[previewImageIdx] 
                          : (previewContent.url || '#');
                        const link = document.createElement('a');
                        link.href = currentUrl;
                        link.download = previewContent.type === 'image' 
                          ? `PMIS_HinhAnh_${previewImageIdx + 1}.jpg` 
                          : `${previewContent.name || 'Tai_lieu_PMIS'}.pdf`;
                        link.click();
                      }}
                      className="p-2 bg-[#164399] hover:bg-blue-800 text-white rounded-lg transition-all shadow-sm active:scale-95"
                      title="Tải về tệp tin"
                    >
                      <Download className="w-4.5 h-4.5" />
                    </button>
                  </div>
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
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${confirmAction.isDanger ? 'bg-red-50' : 'bg-blue-50'}`}>
                    {confirmAction.icon || (confirmAction.isDanger ? <AlertTriangle className="w-6 h-6 text-red-500" /> : <AlertTriangle className="w-6 h-6 text-blue-500" />)}
                  </div>
                  <h3 className="text-[14pt] font-bold text-gray-700 mb-2">{confirmAction.title}</h3>
                  <p className="text-[12pt] text-gray-600 leading-relaxed whitespace-pre-line">
                    {confirmAction.message}
                  </p>
                </div>
                <div className="flex border-t border-gray-100">
                  <button 
                    onClick={() => setConfirmAction(null)}
                    className="flex-1 px-6 py-4 text-[12pt] font-bold text-gray-500 hover:bg-gray-50 transition-colors border-r border-gray-100"
                  >
                    {confirmAction.cancelLabel || 'Không'}
                  </button>
                  <button 
                    onClick={() => {
                      confirmAction.onConfirm();
                      setConfirmAction(null);
                    }}
                    className={`flex-1 px-6 py-4 text-[12pt] font-bold transition-colors ${confirmAction.isDanger ? 'text-red-600 hover:bg-red-50' : 'text-blue-600 hover:bg-blue-50'}`}
                  >
                    {confirmAction.confirmLabel || 'Có'}
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
