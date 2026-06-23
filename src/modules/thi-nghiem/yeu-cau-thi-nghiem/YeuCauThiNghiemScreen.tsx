import React, { useState } from 'react';
import { 
  ArrowLeft, Filter, Plus, Search, User, Database, Zap, Clock, 
  ExternalLink, Calendar, ClipboardList, FileText, Eye, Activity, 
  Lock, ArrowRight, ListChecks, History, ChevronLeft, ChevronRight,
  Send, MessageSquare, CheckSquare, Check, X, Box
} from 'lucide-react';
import { MOCK_TESTING_PLANS } from '../constants';
import { capitalizeBusinessName } from '../../../shared/utils';

// Mock list of available devices for custom registration in the popup
const AVAILABLE_MOCK_DEVICES = [
  { id: 'MBA-T3', name: 'Máy biến áp T3 Phố Nối 110kV', type: 'Máy biến áp', nextDue: '2026-06-15' },
  { id: 'MC-173', name: 'Máy cắt xoay chiều 173', type: 'Máy cắt', nextDue: '2026-06-20' },
  { id: 'TI-173', name: 'Biến dòng bảo vệ 173', type: 'Biến dòng', nextDue: '2026-06-20' },
  { id: 'TU-173', name: 'Biến điện áp đo lường 173', type: 'Biến điện áp', nextDue: '2026-06-20' },
  { id: 'DCL-173-1', name: 'Dao cách ly phân đoạn 173-1', type: 'Dao cách ly', nextDue: '2026-06-22' },
  { id: 'CSV-173', name: 'Chống sét van cao áp 173', type: 'Chống sét van', nextDue: '2026-06-18' },
];

interface YeuCauThiNghiemScreenProps {
  setActiveSubMenu: (menu: string | null) => void;
  setDetailForm: (form: any) => void;
  activeSubMenu: string;
  devicePath: string[];
  activeUnit: string;
}

export const YeuCauThiNghiemScreen = ({
  setActiveSubMenu,
  setDetailForm,
  activeSubMenu,
  devicePath,
  activeUnit
}: YeuCauThiNghiemScreenProps) => {
  // Option Switches state
  const [viewType, setViewType] = useState<'phieu' | 'thiet_bi'>('phieu');
  const [ticketFilter, setTicketFilter] = useState<'chua_xn' | 'tat_ca'>('chua_xn');
  const [deviceFilter, setDeviceFilter] = useState<string>('Tất cả');
  const [hasPlanFilter, setHasPlanFilter] = useState<'Chưa Kế hoạch' | 'Có Kế hoạch'>('Chưa Kế hoạch');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState<string>('Tất cả');

  // Overrides and dynamic plans/devices states
  const [deviceApprovalOverrides, setDeviceApprovalOverrides] = useState<Record<string, string>>({});
  const [selectedGlobalDeviceIds, setSelectedGlobalDeviceIds] = useState<string[]>([]);
  const [addedPlans, setAddedPlans] = useState<any[]>([]);
  const [addedDevicesByPlanId, setAddedDevicesByPlanId] = useState<Record<number, any[]>>({});

  // Popup states for custom device selection
  const [showCustomDeviceSelection, setShowCustomDeviceSelection] = useState(false);
  const [popupUnit, setPopupUnit] = useState('Điện lực Thành phố Hưng Yên');
  const [popupTicket, setPopupTicket] = useState('new');
  const [popupSelectedDeviceIds, setPopupSelectedDeviceIds] = useState<string[]>([]);
  const [popupError, setPopupError] = useState<string | null>(null);

  const [showTestingFilter, setShowTestingFilter] = useState(false);
  const [selectedTestingPlanId, setSelectedTestingPlanId] = useState<number | null>(MOCK_TESTING_PLANS[0]?.id || null);
  const [previewTab, setPreviewTab] = useState<'info' | 'devices' | 'history'>('info');
  const [deviceTabFilter, setDeviceTabFilter] = useState<'all' | 'cho_duyet' | 'bp_ct_duyet' | 'bp_ct_khong_duyet'>('all');
  const [deviceSearchText, setDeviceSearchText] = useState('');
  const [deviceStatusSelectFilter, setDeviceStatusSelectFilter] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const [deviceTabPage, setDeviceTabPage] = useState(1);

  React.useEffect(() => {
    setDeviceTabPage(1);
  }, [selectedTestingPlanId, deviceTabFilter, deviceSearchText, deviceStatusSelectFilter]);

  // Auto expand filter bar when viewType is 'thiet_bi'
  React.useEffect(() => {
    if (viewType === 'thiet_bi') {
      setShowTestingFilter(false);
    }
  }, [viewType]);

  // Filter Bar state
  const [filterUnitState, setFilterUnitState] = useState('Tất cả đơn vị');
  const [fromDateState, setFromDateState] = useState('');
  const [toDateState, setToDateState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Comment thread state for "Ý kiến trao đổi"  
  const [planComments, setPlanComments] = useState<Record<number, Array<{ id: number, user: string, role: string, time: string, content: string }>>>(() => {
    const saved = localStorage.getItem('yeu_cau_plan_comments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore and fallback
      }
    }
    return {
      1: [
        { id: 1, user: 'Nguyễn Kế Hoạch', role: 'Cán bộ lập hồ sơ', time: '10/04/2026 08:45', content: 'Kính trình lãnh đạo duyệt phương án thí nghiệm định kỳ MBA T1 Phố Nối.' },
        { id: 2, user: 'Phạm Duyệt Vốn', role: 'Trưởng phòng Kỹ thuật', time: '10/04/2026 11:30', content: 'Đồng ý phương án cắt điện phía 110kV. Chú ý chỉ đạo đội thi công chuẩn bị đầy đủ dụng cụ an toàn.' },
        { id: 3, user: 'Lê Văn Thắng', role: 'Đội trưởng Thí nghiệm', time: '11/04/2026 09:15', content: 'Đội đã sẵn sàng nhân lực và vật tư thiết bị cho đợt kiểm định này.' }
      ],
      2: [
        { id: 1, user: 'Lê Văn Đo', role: 'Cán bộ kỹ thuật', time: '18/05/2026 10:00', content: 'Đã cập nhật danh sách thiết bị cần thí nghiệm sau sự cố phóng điện chuỗi sứ.' },
        { id: 2, user: 'Trần Văn Duyệt', role: 'Lãnh đạo đơn vị', time: '18/05/2026 15:45', content: 'Cần phân tích kỹ nguyên nhân phóng điện và đo điện trở tiếp xúc của MC 171 trước khi đóng lại.' }
      ],
      3: [
        { id: 1, user: 'Hoàng Văn Yêu', role: 'Cán bộ Trạm', time: '22/05/2026 10:30', content: 'MBA T2 có mỡ ẩm tăng nhẹ, đề nghị bố trí thí nghiệm đột xuất lấy mẫu dầu phân tích khí.' }
      ]
    };
  });
  const [newCommentText, setNewCommentText] = useState('');

  // Helpers
  const getPlanApprovalLevels = (plan: any) => {
    // Return CN / CT status based on plan status
    if (plan.status === 'Đã duyệt' || plan.status === 'Đang thực hiện') {
      return { bp: 'CN đã XN', ct: 'CT đã XN' };
    } else if (plan.status === 'Đang duyệt' || plan.status === 'Đã tiếp nhận') {
      return { bp: 'CN đã XN', ct: 'CT chưa XN' };
    } else if (plan.status === 'Từ chối' || plan.status === 'Không duyệt') {
      return { bp: 'CN đã XN', ct: 'CT không duyệt' };
    } else {
      return { bp: 'CN chưa XN', ct: null };
    }
  };

  const getDeviceApprovalStatus = (plan: any, deviceIndex: number) => {
    const dev = plan.devices?.[deviceIndex];
    if (dev) {
      const key = `${plan.id}-${dev.id}`;
      if (deviceApprovalOverrides[key]) {
        return deviceApprovalOverrides[key];
      }
    }
    if (plan.status === 'Đã duyệt' || plan.status === 'Đang thực hiện') {
      // Small variety: reject final device in plan 5, else approve
      if (plan.id === 5 && deviceIndex === (plan.devices?.length || 0) - 1) {
        return 'Không duyệt';
      }
      return 'Đã duyệt';
    } else if (plan.status === 'Mới lập' || plan.status === 'Đang lập') {
      return 'Chờ duyệt';
    } else {
      if (deviceIndex === 0) return 'Đã duyệt';
      if (deviceIndex === 1) return 'Chờ duyệt';
      return 'Không duyệt';
    }
  };

  const getDeviceDvdkStatus = (plan: any, dev: any, idx: number) => {
    const key = `${plan?.id}-${dev?.id}`;
    if (deviceApprovalOverrides[key] === 'Đã duyệt') return 'ĐVĐK Duyệt';
    if (deviceApprovalOverrides[key] === 'Không duyệt') return 'ĐVĐK Không Duyệt';
    if (dev?.dvdkStatus) return dev.dvdkStatus;
    const baseStatus = getDeviceApprovalStatus(plan || {}, idx);
    if (baseStatus === 'Đã duyệt') return 'ĐVĐK Duyệt';
    if (baseStatus === 'Không duyệt') return 'ĐVĐK Không Duyệt';
    return 'Chờ duyệt';
  };

  const getDeviceDvtnStatus = (plan: any, dev: any, idx: number) => {
    const key = `${plan?.id}-${dev?.id}`;
    if (deviceApprovalOverrides[key] === 'Đã duyệt') return 'ĐVTN Duyệt';
    if (deviceApprovalOverrides[key] === 'Không duyệt') return 'ĐVTN Không Duyệt';
    if (dev?.dvtnStatus) return dev.dvtnStatus;
    const baseStatus = getDeviceApprovalStatus(plan || {}, idx);
    if (baseStatus === 'Đã duyệt') return 'ĐVTN Duyệt';
    if (baseStatus === 'Không duyệt') return 'ĐVTN Không Duyệt';
    return 'Chờ duyệt';
  };

  // Base enriched list of plans with device status and dynamic branch title/unit switching
  const enrichedPlans = React.useMemo(() => {
    const combinedPlans = [...MOCK_TESTING_PLANS, ...addedPlans];
    return combinedPlans.map(plan => {
      const extraDevicesForPlan = addedDevicesByPlanId[plan.id] || [];
      const mergedDevices = [...plan.devices, ...extraDevicesForPlan];

      const devicesWithApprovals = mergedDevices.map((dev, idx) => ({
        ...dev,
        approvalStatus: getDeviceApprovalStatus(plan, idx)
      }));

      let updatedUnit = plan.unit;
      let updatedTitle = plan.title;

      if (activeUnit && activeUnit !== "Tổng công ty Điện lực Miền Bắc") {
        if (activeUnit !== "Công ty Điện lực Hưng Yên") {
          // If the plan is normally for TP HY, map its unit to the selected branch
          if (plan.unit === 'Điện lực Thành phố Hưng Yên' || plan.unit === 'Điện lực TP Hưng Yên') {
            updatedUnit = activeUnit;
          }
          const shortName = activeUnit.replace("Điện lực ", "");
          updatedTitle = plan.title
            .replace(/Thành phố Hưng Yên/g, shortName)
            .replace(/TP Hưng Yên/g, shortName);
        }
      }

      return {
        ...plan,
        unit: updatedUnit,
        title: updatedTitle,
        devices: devicesWithApprovals
      };
    });
  }, [MOCK_TESTING_PLANS, addedPlans, addedDevicesByPlanId, activeUnit, deviceApprovalOverrides]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [devicePath, activeUnit, viewType, ticketFilter, deviceFilter, filterUnitState, fromDateState, toDateState, searchQuery]);

  // Last location path check from tree
  const lastInstance = React.useMemo(() => {
    for (let i = devicePath.length - 1; i >= 0; i--) {
      if (i % 2 === 0 && devicePath[i]) return devicePath[i];
    }
    return "";
  }, [devicePath]);

  // Unified Filter Engine
  const filteredPlans = React.useMemo(() => {
    let result = enrichedPlans;

    // Filter by Active Unit
    if (activeUnit && activeUnit !== "Công ty Điện lực Hưng Yên" && activeUnit !== "Tổng công ty Điện lực Miền Bắc") {
       result = result.filter(p => p.unit === activeUnit);
    }
    
    // Filter by Filter Bar Unit
    if (filterUnitState && filterUnitState !== 'Tất cả đơn vị') {
       result = result.filter(p => p.unit === filterUnitState);
    }

    // Filter by Date From / Date To (binds to p.createdDate 'YYYY-MM-DD')
    if (fromDateState) {
       result = result.filter(p => p.createdDate >= fromDateState);
    }
    if (toDateState) {
       result = result.filter(p => p.createdDate <= toDateState);
    }

    // Filter by Search text
    if (searchQuery) {
       const q = searchQuery.toLowerCase();
       result = result.filter(p => 
         p.code.toLowerCase().includes(q) || 
         p.title.toLowerCase().includes(q) ||
         p.creator?.toLowerCase().includes(q) ||
         p.devices.some(d => d.name.toLowerCase().includes(q))
       );
    }

    // Filter by Location Path
    if (lastInstance) {
       result = result.filter(p => 
         p.title.toLowerCase().includes(lastInstance.toLowerCase()) || 
         p.devices.some(d => d.name.toLowerCase().includes(lastInstance.toLowerCase()))
       );
    }

    // Filter by View "Xem theo phiếu" category switch
    if (viewType === 'phieu' && ticketFilter === 'chua_xn') {
       result = result.filter(p => {
         const isConfirmed = p.status === 'Đã duyệt' || p.status === 'Đã xác nhận' || p.status === 'Đang thực hiện';
         return !isConfirmed;
       });
    }

    // Handlers fallback to prevent full zero filters on initial demo triggers
    if (result.length === 0 && lastInstance) {
       return enrichedPlans;
    }

    return result;
  }, [enrichedPlans, activeUnit, filterUnitState, fromDateState, toDateState, searchQuery, lastInstance, viewType, ticketFilter]);

  // Flattened device inventory
  const flattenedDevices = React.useMemo(() => {
    const list: any[] = [];
    filteredPlans.forEach(plan => {
      (plan.devices || []).forEach((dev: any) => {
        let matchStatus = deviceFilter === 'Tất cả' || dev.approvalStatus === deviceFilter;
        let matchType = deviceTypeFilter === 'Tất cả' || dev.type === deviceTypeFilter;
        
        const hasPlanStr = String(plan.id) + String(dev.id || dev.name);
        const hasPlanHash = hasPlanStr.split('').reduce((a,b) => a+b.charCodeAt(0), 0);
        const hasPlanAssigned = hasPlanHash % 3 === 0;
        const mockPrevDate = dev.nextDue ? dev.nextDue.replace('2026', '2025').replace('2027', '2026') : '2025-05-15';
        const mockNextDate = dev.nextDue || plan.startDate || '2026-05-15';

        let matchHasPlan = true;
        if (hasPlanFilter === 'Chưa Kế hoạch') matchHasPlan = !hasPlanAssigned;
        if (hasPlanFilter === 'Có Kế hoạch') matchHasPlan = !!hasPlanAssigned;

        if (matchStatus && matchType && matchHasPlan) {
          dev.hasPlan = hasPlanAssigned;
          dev.prevDate = mockPrevDate;
          dev.nextDate = mockNextDate;
          list.push({
            ...dev,
            globalId: `${plan.id}-${dev.id || dev.name}`,
            planId: plan.id,
            planCode: plan.code,
            planTitle: plan.title,
            planUnit: plan.unit || 'Điện lực Thành phố Hưng Yên',
            planStartDate: plan.startDate,
            planCreator: plan.creator,
            fullPlan: plan
          });
        }
      });
    });

    // Sort by Đơn vị đăng ký (planUnit) first, then Ngày phiếu yêu cầu mới nhất (planStartDate descending)
    return list.sort((a, b) => {
      const unitComp = (a.planUnit || '').localeCompare(b.planUnit || '', 'vi');
      if (unitComp !== 0) return unitComp;
      return (b.planStartDate || '').localeCompare(a.planStartDate || '');
    });
  }, [filteredPlans, deviceFilter, deviceTypeFilter, hasPlanFilter]);

  // Selected ticket binding
  const selectedPlan = React.useMemo(() => {
    const plan = filteredPlans.find(p => p.id === selectedTestingPlanId);
    return plan || filteredPlans[0] || enrichedPlans[0];
  }, [filteredPlans, enrichedPlans, selectedTestingPlanId]);

  React.useEffect(() => {
    if (filteredPlans.length > 0 && (!selectedTestingPlanId || !filteredPlans.find(p => p.id === selectedTestingPlanId))) {
      setSelectedTestingPlanId(filteredPlans[0].id);
    }
  }, [filteredPlans]);

  // Pagination bounds
  const itemsPerPage = 10;
  const totalCount = viewType === 'phieu' ? filteredPlans.length : flattenedDevices.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedPlans = React.useMemo(() => {
    return filteredPlans.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPlans, startIndex]);

  const paginatedDevices = React.useMemo(() => {
    return flattenedDevices.slice(startIndex, startIndex + itemsPerPage);
  }, [flattenedDevices, startIndex]);

  // Comment Handlers
  const handleAddComment = () => {
    if (!newCommentText.trim() || !selectedPlan) return;
    
    const planId = selectedPlan.id;
    const currentComments = planComments[planId] || [];
    
    const timeFormatted = new Date().toLocaleString('vi-VN', {
      hour: '2-digit', 
      minute: '2-digit', 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });

    const newComment = {
      id: Date.now(),
      user: 'Nguyễn Văn A',
      role: 'Cán bộ kỹ thuật',
      time: timeFormatted,
      content: newCommentText.trim()
    };

    const updated = {
      ...planComments,
      [planId]: [...currentComments, newComment]
    };

    setPlanComments(updated);
    localStorage.setItem('yeu_cau_plan_comments', JSON.stringify(updated));
    setNewCommentText('');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden text-[12pt]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSubMenu(null)} className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex flex-col text-left">
              <h2 className="text-[12pt] font-semibold flex items-center gap-2 leading-[1.5]">
                <span className="text-[#555555]">Thí nghiệm</span>
                <span className="font-bold text-[#164399]">- Danh sách yêu cầu thí nghiệm</span>
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Options Switch Panel (Pre-Filter position on Header bar) */}
            <div className="flex items-center gap-2">
              {/* Option switch with 2 types: "Phiếu YC" (blue icon) | "Thiết bị" (emerald icon) */}
              <div className="flex bg-gray-100 p-0.5 rounded-full border border-gray-200 select-none items-center h-10 shrink-0">
                <button 
                  type="button"
                  onClick={() => {
                    setViewType('phieu');
                    setShowTestingFilter(false);
                    setFilterUnitState('Tất cả đơn vị');
                    setFromDateState('');
                    setToDateState('');
                    setSearchQuery('');
                    setTicketFilter('tat_ca');
                  }}
                  className={`flex items-center justify-center px-4 h-full cursor-pointer text-[8.5pt] font-black uppercase tracking-wider rounded-xl transition-all ${
                    viewType === 'phieu' ? 'bg-white text-[#164399] shadow-xs' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <FileText className={`w-4 h-4 mr-1.5 ${viewType === 'phieu' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>Phiếu YC</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setViewType('thiet_bi')}
                  className={`flex items-center justify-center px-4 h-full cursor-pointer text-[8.5pt] font-black uppercase tracking-wider rounded-xl transition-all ${
                    viewType === 'thiet_bi' ? 'bg-white text-[#164399] shadow-xs' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Database className={`w-4 h-4 mr-1.5 ${viewType === 'thiet_bi' ? 'text-teal-600' : 'text-gray-400'}`} />
                  <span>Thiết bị</span>
                </button>
              </div>
            </div>

            {/* Filter Toggle */}
            <button 
              onClick={() => setShowTestingFilter(!showTestingFilter)}
              className={`w-10 h-10 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                showTestingFilter 
                  ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>

            {/* Add action */}
            <button 
              onClick={() => {
                if (viewType === 'thiet_bi') {
                  setPopupSelectedDeviceIds([]);
                  setPopupUnit(activeUnit && activeUnit !== "Tổng công ty Điện lực Miền Bắc" && activeUnit !== "Công ty Điện lực Hưng Yên" ? activeUnit : 'Điện lực Thành phố Hưng Yên');
                  setPopupTicket('new');
                  setShowCustomDeviceSelection(true);
                } else {
                  setDetailForm({ type: 'testing_plan', mode: 'add', data: { category: activeSubMenu === 'Yêu cầu thí nghiệm' ? 'Yêu cầu' : 'Kế hoạch' } });
                }
              }}
              className="px-4 h-10 bg-[#164399] text-white rounded-lg whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      {showTestingFilter && (
        <div className="bg-white px-6 pb-4 shrink-0 -mt-2">
          <div className="p-4 bg-gray-50 rounded-[10pt] border border-gray-100 grid grid-cols-1 md:grid-cols-5 gap-4 animate-in slide-in-from-top-2 text-left">
            {/* Column 1: Moved Unit hither and title changed */}
            <div className="space-y-1 text-left">
              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest block ml-0.5">ĐƠN VỊ ĐĂNG KÝ</label>
              <select 
                value={filterUnitState}
                onChange={(e) => setFilterUnitState(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-[8px] px-2.5 py-1 text-[9.5pt] outline-none font-normal h-9 focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
              >
                <option value="Tất cả đơn vị">Tất cả đơn vị</option>
                <option value="Điện lực Thành phố Hưng Yên">Điện lực Thành phố Hưng Yên</option>
                <option value="Điện lực Khoái Châu">Điện lực Khoái Châu</option>
                <option value="Điện lực Kim Động">Điện lực Kim Động</option>
                <option value="Điện lực Ân Thi">Điện lực Ân Thi</option>
                <option value="Điện lực Tiên Lữ">Điện lực Tiên Lữ</option>
                <option value="Điện lực Phù Cừ">Điện lực Phù Cừ</option>
                <option value="Điện lực Mỹ Hào">Điện lực Mỹ Hào</option>
                <option value="Điện lực Yên Mỹ">Điện lực Yên Mỹ</option>
                <option value="Điện lực Văn Giang">Điện lực Văn Giang</option>
                <option value="Điện lực Văn Lâm">Điện lực Văn Lâm</option>
                <option value="Công ty Dịch vụ điện lực">Công ty Dịch vụ điện lực</option>
                <option value="Xí nghiệp 110kV">Xí nghiệp 110kV</option>
                <option value="Xí nghiệp Thí nghiệm">Xí nghiệp Thí nghiệm</option>
              </select>
            </div>

            {/* Column 2: View-specific switches relocated here */}
            <div className="space-y-1 text-left">
              {viewType === 'phieu' ? (
                <>
                  <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest block ml-0.5">Trạng thái phiếu</label>
                  <div className="flex bg-gray-200/50 p-0.5 rounded-full border border-gray-200 select-none h-9 items-center">
                    <button 
                      type="button"
                      onClick={() => setTicketFilter('chua_xn')}
                      className={`flex-1 h-full cursor-pointer text-[8pt] font-black uppercase tracking-wider rounded-[6px] flex items-center justify-center transition-all ${
                        ticketFilter === 'chua_xn' ? 'bg-white text-orange-600 shadow-xs' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      CHƯA XN
                    </button>
                    <button 
                      type="button"
                      onClick={() => setTicketFilter('tat_ca')}
                      className={`flex-1 h-full cursor-pointer text-[8pt] font-black uppercase tracking-wider rounded-[6px] flex items-center justify-center transition-all ${
                        ticketFilter === 'tat_ca' ? 'bg-white text-[#164399] shadow-xs' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Tất cả
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest block ml-0.5">Loại thiết bị</label>
                  <select 
                    value={deviceTypeFilter}
                    onChange={(e) => setDeviceTypeFilter(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-[8px] px-2.5 py-1 text-[9.5pt] outline-none font-normal h-9 focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
                  >
                    <option value="Tất cả">Tất cả loại thiết bị</option>
                    <option value="Máy biến áp">Máy biến áp</option>
                    <option value="Máy cắt">Máy cắt</option>
                    <option value="Biến dòng">Biến dòng</option>
                    <option value="Biến điện áp">Biến điện áp</option>
                  </select>
                </>
              )}
            </div>

            {/* Column 3: Date From Picker */}
            <div className="space-y-1 text-left">
              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest block ml-0.5">Từ ngày</label>
              <input 
                type="date"
                value={fromDateState}
                onChange={(e) => setFromDateState(e.target.value)}
                className="w-full bg-white border border-gray-200 text-black rounded-[8px] px-2.5 py-1 outline-none font-normal text-[9.5pt] h-9 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all cursor-pointer font-sans shadow-2xs hover:bg-gray-50/50"
              />
            </div>

            {/* Column 4: Date To Picker */}
            <div className="space-y-1 text-left">
              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest block ml-0.5">Đến ngày</label>
              <input 
                type="date"
                value={toDateState}
                onChange={(e) => setToDateState(e.target.value)}
                className="w-full bg-white border border-gray-200 text-black rounded-[8px] px-2.5 py-1 outline-none font-normal text-[9.5pt] h-9 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all cursor-pointer font-sans shadow-2xs hover:bg-gray-50/50"
              />
            </div>

            {/* Column 5: Search bar */}
            <div className="space-y-1 text-left">
              <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest block ml-0.5">Tìm kiếm</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tên, mã, nội dung..." 
                  className="w-full pl-9 pr-4 py-1 bg-white border border-gray-200 rounded-[8px] outline-none font-normal text-[9.5pt] h-9 focus:border-sky-400 focus:ring-1 focus:ring-sky-100" 
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Card List */}
        <div className={`${viewType === 'phieu' ? 'w-1/2' : 'w-full'} border-r border-gray-100 flex flex-col bg-gray-50/20`}>
          <div className={`flex-1 ${viewType === 'phieu' ? 'overflow-y-auto space-y-3 p-4' : 'flex flex-col p-4'} custom-scrollbar`}>
            {viewType === 'phieu' ? (
              // Ticket mode
              paginatedPlans.map((plan) => {
                // Devices classification
                let approvedCount = 0;
                let pendingCount = 0;
                let rejectedCount = 0;
                plan.devices.forEach((d) => {
                  const status = getDeviceApprovalStatus(d, plan.id);
                  if (status === 'Đã duyệt') approvedCount++;
                  else if (status === 'Không duyệt') rejectedCount++;
                  else pendingCount++;
                });

                return (
                  <div 
                    key={plan.id}
                    onClick={() => setSelectedTestingPlanId(plan.id)}
                    onDoubleClick={() => setDetailForm({ type: 'testing_plan', mode: 'view', data: plan })}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden select-none ${
                      selectedTestingPlanId === plan.id 
                        ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                        : 'bg-white border-gray-100 hover:border-blue-100/60 shadow-sm'
                    }`}
                  >
                    {selectedTestingPlanId === plan.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#164399]"></div>
                    )}
                    
                    {/* Header item: Created Date & Unit / Department */}
                    <div className="flex justify-between items-start mb-2.5 group-hover:translate-x-1 transition-transform">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Ngày lập phiếu badge without border - Red text */}
                        <span className="text-[8.5pt] font-extrabold uppercase text-red-600 tracking-wider font-mono px-2.5 py-1 bg-red-50/50 rounded-full">
                          {plan.createdDate || '12/04/2026'}
                        </span>
                        {/* Chi nhánh / Bộ phận badge styled Blue */}
                        <span className="px-2.5 py-1 rounded-[6px] text-[8.5pt] font-extrabold tracking-tight bg-blue-50 text-blue-600 max-w-[180px] truncate">
                          {plan.unit || 'Điện lực TP Hưng Yên'}
                        </span>
                      </div>
 
                      {/* 1-Level Approval Status */}
                      <div className="flex items-center gap-1 flex-wrap">
                        {(() => {
                          const isConfirmed = plan.status === 'Đã duyệt' || plan.status === 'Đã xác nhận' || plan.status === 'Đang thực hiện';
                          return (
                            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[8.5pt] font-black uppercase tracking-wider leading-normal ${
                              isConfirmed 
                                ? 'bg-emerald-50 text-emerald-700' 
                                : 'bg-amber-50 text-amber-600'
                            }`}>
                              {isConfirmed ? 'Đã xác nhận' : 'Chưa xác nhận'}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                    
                    {/* Plan Title (Tên phiếu chi tiết không in đậm - font-medium) */}
                    <h3 className={`text-[11.5pt] font-normal mb-2.5 line-clamp-2 leading-snug transition-all whitespace-normal break-words ${
                      selectedTestingPlanId === plan.id ? 'text-[#164399]' : 'text-gray-700 group-hover:text-blue-600 group-hover:translate-x-1'
                    }`}>
                      {plan.title.replace(/Yêu cầu |Kế hoạch /g, '')}
                    </h3>
 
                    {/* Equipment stats bar with gray-colored stats and relocated code badge */}
                    <div className="flex items-center justify-between text-[9pt] font-medium pt-2.5 border-t border-gray-100 mt-1 flex-wrap gap-2">
                       <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Outage-free code badge placed down into stats row - gray styled with no border */}
                        <span className="text-[8pt] font-extrabold uppercase text-gray-500 font-mono tracking-wider px-2.5 py-1 bg-gray-50 rounded-full mr-0.5">
                          {plan.code}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-gray-500 px-2.5 py-1 bg-gray-50 rounded-full text-[8pt] font-medium">
                          {approvedCount} Đã duyệt
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-gray-500 px-2.5 py-1 bg-gray-50 rounded-full text-[8pt] font-medium">
                          {pendingCount} Chờ duyệt
                        </span>
                        {rejectedCount > 0 && (
                          <span className="inline-flex items-center gap-1.5 text-red-600 px-2.5 py-1 bg-red-50 rounded-full text-[8pt] font-medium">
                            {rejectedCount} Không duyệt
                          </span>
                        )}
                       </div>
                       <span className="text-[9pt] font-normal text-gray-400">
                         Người lập: <span className="font-bold text-gray-600">{plan.creator ? plan.creator.split(' ').slice(-2).join(' ') : ''}</span>
                       </span>
                    </div>
                  </div>
                );
              })
            ) : (
                <>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-[9.5pt] mb-3 flex items-center justify-between p-2.5">
                  
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        
                        <select 
                          value={deviceFilter}
                          onChange={(e) => setDeviceFilter(e.target.value)}
                          className="bg-white border border-blue-200 text-[#164399] rounded-[6px] px-2.5 py-1 text-[9pt] outline-none font-bold h-8 focus:border-blue-400 min-w-[140px] shadow-sm"
                        >
                          <option value="Tất cả">Tất cả</option>
                          <option value="Chờ duyệt">Chờ duyệt</option>
                          <option value="Đã duyệt">Đã duyệt</option>
                          <option value="Không duyệt">Không duyệt</option>
                        </select>
                        <div className="flex bg-slate-100 p-0.5 rounded-full border border-slate-200 ml-2">
                          <button 
                            onClick={() => setHasPlanFilter('Chưa Kế hoạch')}
                            className={`px-3 py-1 rounded-full text-[8.5pt] font-base font-bold transition-all ${hasPlanFilter === 'Chưa Kế hoạch' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            Chưa Kế hoạch
                          </button>
                          <button 
                            onClick={() => setHasPlanFilter('Có Kế hoạch')}
                            className={`px-3 py-1 rounded-full text-[8.5pt] font-base font-bold transition-all ${hasPlanFilter === 'Có Kế hoạch' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            Có Kế hoạch
                          </button>
                        </div>
                      </div>
                      {selectedGlobalDeviceIds.length > 0 && (
                        <span className="text-[9pt] text-[#164399]/70 font-medium pl-2 hidden sm:inline">
                          | Đã chọn {selectedGlobalDeviceIds.length} thiết bị
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                       {hasPlanFilter === 'Chưa Kế hoạch' && deviceFilter === 'Đã duyệt' && (
                          <button className="px-4 h-8 bg-[#164399] hover:bg-blue-800 text-white rounded-lg flex items-center gap-1.5 text-[9pt] font-bold shadow-sm whitespace-nowrap transition-colors mr-2">
                              <Plus className="w-4 h-4" /> Lập KH từ các TB này
                          </button>
                       )}
                       <button
                        type="button"
                        disabled={selectedGlobalDeviceIds.length === 0}
                        onClick={() => {
                          const nextOverrides = { ...deviceApprovalOverrides };
                          selectedGlobalDeviceIds.forEach(id => {
                            nextOverrides[id] = 'Đã duyệt';
                          });
                          setDeviceApprovalOverrides(nextOverrides);
                          setSelectedGlobalDeviceIds([]);
                        }}
                        className={`px-3 py-1.5 rounded-full font-black text-[8.5pt] uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm border cursor-pointer ${selectedGlobalDeviceIds.length === 0 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200'}`}
                      >
                         <Check className="w-3.5 h-3.5" strokeWidth={3} /> DUYỆT
                      </button>
                      <button
                        type="button"
                        disabled={selectedGlobalDeviceIds.length === 0}
                        onClick={() => {
                          const nextOverrides = { ...deviceApprovalOverrides };
                          selectedGlobalDeviceIds.forEach(id => {
                            nextOverrides[id] = 'Không duyệt';
                          });
                          setDeviceApprovalOverrides(nextOverrides);
                          setSelectedGlobalDeviceIds([]);
                        }}
                        className={`px-3 py-1.5 rounded-full font-black text-[8.5pt] uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm border cursor-pointer ${selectedGlobalDeviceIds.length === 0 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200'}`}
                      >
                         <X className="w-3.5 h-3.5" strokeWidth={3} /> KHÔNG DUYỆT
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-[9.5pt] relative flex flex-col flex-1 min-h-0">
                    <div className="overflow-auto block flex-1 custom-scrollbar">
                      <table className="w-full relative">
                    <thead className="bg-[#f0f4fa] sticky top-0 z-10 text-[#164399] font-black text-[9pt] uppercase tracking-wider text-left border-b border-gray-200 shadow-xs">
                      <tr>
                        <th className="py-3 px-4 w-12 text-center text-[#164399]/80 cursor-pointer hover:bg-black/5" title="Chọn tất cả để duyệt/không duyệt">
                           <input 
                             type="checkbox" 
                             checked={paginatedDevices.length > 0 && paginatedDevices.every(d => selectedGlobalDeviceIds.includes(d.globalId))}
                             onChange={(e) => {
                               if (e.target.checked) {
                                 const newIds = new Set(selectedGlobalDeviceIds);
                                 paginatedDevices.forEach(d => newIds.add(d.globalId));
                                 setSelectedGlobalDeviceIds(Array.from(newIds));
                               } else {
                                 const toRemove = new Set(paginatedDevices.map(d => d.globalId));
                                 setSelectedGlobalDeviceIds(selectedGlobalDeviceIds.filter(id => !toRemove.has(id)));
                               }
                             }}
                             className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                           />
                        </th>
                        <th className="py-3 px-2 border-r border-[#164399]/10">Ngày YC</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Thiết bị</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Loại kỳ</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10 text-center">Đã có KH</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Gần nhất</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Tiếp theo</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Loại kiểm tra</th>
                        <th className="py-3 px-4 border-r border-[#164399]/10">Phiếu yêu cầu</th>
                        <th className="py-3 px-4 text-center">Phê duyệt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginatedDevices.map((dev, idx) => {
                         const prevUnit = idx > 0 ? paginatedDevices[idx - 1].planUnit : null;
                         const showGroup = prevUnit !== dev.planUnit;
                         const unitDevices = paginatedDevices.filter(d => d.planUnit === dev.planUnit);

                         let dvdk = getDeviceDvdkStatus(dev.fullPlan, dev, 0) || '';
                         let dvtn = getDeviceDvtnStatus(dev.fullPlan, dev, 0) || '';

                         const isRejected = String(dvdk).includes('Không') || String(dvtn).includes('Không');

                         return (
                            <React.Fragment key={dev.globalId}>
                               {showGroup && (
                                   <tr className="bg-slate-100 border-y border-slate-200">
                                      <td colSpan={10} className="py-2 px-4 shadow-inner">
                                          <div className="flex gap-2 items-center text-[9.5pt] font-black text-gray-800">
                                             <Box className="w-4 h-4 text-gray-500" />
                                             <span className="uppercase">{dev.planUnit || 'Đơn vị'}</span>
                                             <span className="text-gray-400 font-medium">({unitDevices.length} thiết bị)</span>
                                          </div>
                                      </td>
                                   </tr>
                               )}
                               <tr className={`group transition-colors cursor-pointer ${selectedGlobalDeviceIds.includes(dev.globalId) ? 'bg-blue-50/50' : 'hover:bg-slate-50/70'} ${isRejected ? 'opacity-80' : ''}`}
                                   onClick={() => {
                                      if (selectedGlobalDeviceIds.includes(dev.globalId)) {
                                          setSelectedGlobalDeviceIds(selectedGlobalDeviceIds.filter(id => id !== dev.globalId));
                                      } else {
                                          setSelectedGlobalDeviceIds([...selectedGlobalDeviceIds, dev.globalId]);
                                      }
                                   }}
                               >
                                  <td className="py-3 px-4 text-center" onClick={e => e.stopPropagation()}>
                                    <input 
                                      type="checkbox" 
                                      checked={selectedGlobalDeviceIds.includes(dev.globalId)}
                                      onChange={(e) => {
                                        if (e.target.checked) setSelectedGlobalDeviceIds([...selectedGlobalDeviceIds, dev.globalId]);
                                        else setSelectedGlobalDeviceIds(selectedGlobalDeviceIds.filter(id => id !== dev.globalId));
                                      }}
                                      className="rounded border-gray-300 cursor-pointer w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                  </td>
                                  <td className={`py-3 px-2 font-mono text-[9pt] font-medium ${isRejected ? 'text-gray-500' : 'text-blue-600'} whitespace-nowrap text-center`}>
                                     {dev.fullPlan?.createdDate || '12/04/2026'}
                                  </td>
                                  <td className="py-3 px-4 text-left">
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-1.5 mb-1">
                                        <span className={`text-[7.5pt] font-mono font-medium px-1.5 py-0.5 rounded border border-gray-100 bg-gray-50 text-gray-500 min-w-[50px] text-center ${isRejected ? 'bg-gray-100 text-gray-500 border-gray-300' : 'bg-gray-50 text-gray-400 border-gray-100'}`} title="Mã thiết bị">{dev.id || 'PM-001'}</span>
                                        <span className={`text-[7.5pt] font-medium border px-1.5 py-0.5 rounded border-gray-100 bg-gray-50 text-gray-400 ${isRejected ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-gray-50 text-gray-400 border-gray-100'}`} title="Loại thiết bị">{dev.type || 'Thiết bị'}</span>
                                      </div>
                                      <div className={`font-extrabold text-[9.5pt] leading-tight ${isRejected ? 'text-gray-600' : 'text-[#164399]'}`}>{dev.name}</div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className={`font-bold px-2 py-0.5 rounded text-[8.5pt] ${isRejected ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-[#164399]'}`}>
                                      {dev.fullPlan?.type === 'Đột xuất' ? 'ĐỘT XUẤT' : 'ĐỊNH KỲ'}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                      <input type="checkbox" disabled checked={!!dev.hasPlan} className="w-4 h-4 rounded border-gray-300 text-emerald-600 text-opacity-70 disabled:opacity-70" />
                                  </td>
                                  <td className="py-3 px-4 whitespace-nowrap text-gray-500 text-[8.5pt] font-mono">
                                      {dev.prevDate}
                                  </td>
                                  <td className="py-3 px-4 whitespace-nowrap text-blue-600 text-[8.5pt] font-mono font-bold">
                                      {dev.nextDate}
                                  </td>
                                  <td className={`py-3 px-4 italic text-[9pt] ${isRejected ? 'text-gray-500' : 'text-gray-700'}`}>
                                      {dev.testType || (idx % 3 === 0 ? 'Kiểm định' : idx % 2 === 0 ? 'Kiểm định' : 'Thí nghiệm')}
                                  </td>
                                  <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                                      <div className="flex flex-col text-left">
                                         <button 
                                            onClick={() => {
                                               setDetailForm({ type: 'testing_plan', mode: 'view', data: dev.fullPlan });
                                            }}
                                            className={`text-[9pt] font-black uppercase text-left hover:underline ${isRejected ? 'text-gray-600 hover:text-gray-800' : 'text-sky-600 hover:text-sky-800'}`}
                                         >
                                            {dev.planCode}
                                         </button>
                                      </div>
                                  </td>
                                  <td className="py-3 px-4 space-y-1 text-center bg-gray-50/50">
                                    <div className="flex justify-center flex-col gap-1 items-center">
                                      {(() => {
                                        let dvdkText = 'ĐVĐK CHỜ DUYỆT';
                                        let dvdkStyle = 'bg-amber-50 text-amber-600 border border-amber-100 font-normal';
                                        if (dvdk === 'ĐVĐK Duyệt' || dvdk.toUpperCase().includes('DUYỆT')) {
                                          dvdkText = 'ĐVĐK DUYỆT';
                                          dvdkStyle = 'bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold';
                                        } else if (dvdk === 'ĐVĐK Không Duyệt' || dvdk.toUpperCase().includes('KHÔNG')) {
                                          dvdkText = 'KHÔNG DUYỆT';
                                          dvdkStyle = 'bg-red-50 text-red-600 border border-red-100 font-bold';
                                        }

                                        let dvtnText = 'ĐVTN CHỜ DUYỆT';
                                        let dvtnStyle = 'bg-amber-50 text-amber-600 border border-amber-100 font-normal';
                                        if (dvtn === 'ĐVTN Duyệt' || dvtn.toUpperCase().includes('DUYỆT')) {
                                          dvtnText = 'ĐVTN DUYỆT';
                                          dvtnStyle = 'bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold';
                                        } else if (dvtn === 'ĐVTN Không Duyệt' || dvtn.toUpperCase().includes('KHÔNG')) {
                                          dvtnText = 'KHÔNG DUYỆT';
                                          dvtnStyle = 'bg-red-50 text-red-600 border border-red-100 font-bold';
                                        }

                                        return (
                                          <>
                                            <span className={`text-[7.5pt] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full inline-block text-center w-[125px] border ${dvdkStyle}`}>
                                               {dvdkText}
                                            </span>
                                            <span className={`text-[7.5pt] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full inline-block text-center w-[125px] border ${dvtnStyle}`}>
                                               {dvtnText}
                                            </span>
                                          </>
                                        );
                                      })()}

                                    </div>
                                  </td>
                               </tr>
                            </React.Fragment>
                         );
                      })}
                    </tbody>
                  </table>
                    </div>
                  </div>
                </>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="py-4 border-t border-gray-200 flex items-center justify-between container-paging shrink-0 bg-white px-6">
              <span className="text-[8.5pt] font-black text-gray-700 uppercase tracking-wider">
                Xem {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalCount)} / {totalCount} {viewType === 'phieu' ? 'phiếu' : 'thiết bị'}
              </span>
              <div className="flex items-center gap-1">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="p-1.5 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-gray-500 border-none bg-transparent"
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
                  className="p-1.5 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-gray-500 border-none bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Quick Content */}
        {viewType === 'phieu' && (
          <div className="w-1/2 flex flex-col bg-white overflow-hidden">
            {selectedPlan ? (
              <>
              {/* Tabs list (Kết quả thí nghiệm has been removed) */}
              <div className="flex border-b border-gray-100 bg-white shrink-0">
                {[
                  { id: 'info', label: 'Thông tin chung' },
                  { id: 'devices', label: 'Danh sách thiết bị' },
                  { id: 'history', label: 'Ý kiến trao đổi' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setPreviewTab(tab.id as any)}
                    className={`flex-1 h-12 text-[12pt] font-bold transition-all relative ${
                      previewTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                    {previewTab === tab.id && (
                      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content rendering */}
              <div className={`flex-1 custom-scrollbar ${previewTab === 'devices' || previewTab === 'history' ? 'overflow-hidden flex flex-col p-6' : 'overflow-y-auto p-6'}`}>
                 {previewTab === 'info' && (() => {
                  return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4 text-left">
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-3 mb-1 text-left">
                            <span className="text-[10pt] font-black text-red-600 font-mono tracking-wider bg-red-50 px-2 py-0.5 rounded border border-red-200">{selectedPlan.code}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-[10pt] font-black text-gray-700 uppercase tracking-widest">{selectedPlan.unit || 'Điện lực Thành phố Hưng Yên'}</span>
                          </div>
                          <h4 className="text-[18pt] font-black text-gray-700 leading-tight whitespace-normal break-words text-left">{selectedPlan.title.replace(/Kế hoạch /g, '')}</h4>
                        </div>
                        <button 
                           onClick={() => setDetailForm({ type: 'testing_plan', mode: 'view', data: selectedPlan })}
                           className="px-6 py-2 bg-blue-50 text-[#164399] rounded-lg font-bold text-[10pt] whitespace-nowrap hover:bg-blue-100 transition-all flex items-center gap-2 whitespace-nowrap border border-blue-100"
                        >
                           <Eye className="w-4 h-4" /> Xem
                        </button>
                      </div>

                      {/* Merged Info Box without title */}
                      <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-5 text-left">
                           <div className="space-y-5">
                                {/* Row 1: Ngày khởi tạo, Người lập hồ sơ & Trạng thái xác nhận */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                   <div>
                                      <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Ngày khởi tạo</label>
                                      <div className="flex items-center gap-2">
                                         <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                         </div>
                                         <span className="text-[11pt] font-black text-gray-700">{selectedPlan.createdDate || '12/04/2026'}</span>
                                      </div>
                                   </div>
                                   <div>
                                      <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Người lập hồ sơ</label>
                                      <div className="flex items-center gap-2">
                                         <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0 font-black text-[9pt]">
                                            {selectedPlan.creator?.[0] || 'A'}
                                         </div>
                                         <span className="text-[11pt] font-black text-gray-700">{selectedPlan.creator || 'Nguyễn Văn A'}</span>
                                      </div>
                                   </div>
                                   <div>
                                      <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block mb-1">Trạng thái xác nhận</label>
                                      <div>
                                         {(() => {
                                            const isConfirmed = selectedPlan.status === 'Đã duyệt' || selectedPlan.status === 'Đã xác nhận' || selectedPlan.status === 'Đang thực hiện';
                                            return (
                                               <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8pt] font-black uppercase tracking-widest border leading-none mt-1 ${
                                                  isConfirmed 
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-3xs' 
                                                    : 'bg-amber-50 text-amber-600 border-amber-100 shadow-3xs'
                                               }`}>
                                                  {isConfirmed ? 'ĐÃ XÁC NHẬN' : 'CHƯA XÁC NHẬN'}
                                               </span>
                                            );
                                         })()}
                                      </div>
                                   </div>
                                </div>
                           </div>
                      </div>

                      {/* Thống kê thiết bị theo 2 dòng trạng thái của ĐVĐK và ĐVTN */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl space-y-4 select-none">
                        <h5 className="text-[9.5pt] font-black text-gray-700 uppercase tracking-widest flex items-center gap-1.5 pl-0.5 text-left">
                          <ListChecks className="w-4.5 h-4.5 text-blue-600 inline mr-1" /> Thống kê thiết bị thí nghiệm
                        </h5>
                        <div className="space-y-3.5 text-left animate-in fade-in">
                          {/* Row 1: ĐVĐK (Đơn vị đăng ký) */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-none border border-slate-100">
                            <div className="flex flex-col text-left shrink-0">
                              <span className="text-[10pt] font-extrabold text-[#164399] leading-tight">Đơn vị đăng ký</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[8.5pt] font-bold text-gray-550 bg-slate-50 px-2.5 py-1 rounded-full">
                                Tổng: {selectedPlan.devices.length}
                              </span>
                              <span className="text-[8.5pt] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                Duyệt: {selectedPlan.devices.filter((d, i) => getDeviceDvdkStatus(selectedPlan, d, i) === 'ĐVĐK Duyệt').length}
                              </span>
                              <span className="text-[8.5pt] font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                                Không Duyệt: {selectedPlan.devices.filter((d, i) => getDeviceDvdkStatus(selectedPlan, d, i) === 'ĐVĐK Không Duyệt').length}
                              </span>
                              <span className="text-[8.5pt] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                Chờ duyệt: {selectedPlan.devices.filter((d, i) => getDeviceDvdkStatus(selectedPlan, d, i) === 'Chờ duyệt').length}
                              </span>
                            </div>
                          </div>
                          
                          {/* Row 2: ĐVTN (Đơn vị thí nghiệm) */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-none border border-slate-100">
                            <div className="flex flex-col text-left shrink-0">
                              <span className="text-[10pt] font-extrabold text-[#164399] leading-tight">Đơn vị thí nghiệm</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[8.5pt] font-bold text-gray-550 bg-slate-50 px-2.5 py-1 rounded-full">
                                Tổng: {selectedPlan.devices.length}
                              </span>
                              <span className="text-[8.5pt] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                Duyệt: {selectedPlan.devices.filter((d, i) => getDeviceDvtnStatus(selectedPlan, d, i) === 'ĐVTN Duyệt').length}
                              </span>
                              <span className="text-[8.5pt] font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                                Không Duyệt: {selectedPlan.devices.filter((d, i) => getDeviceDvtnStatus(selectedPlan, d, i) === 'ĐVTN Không Duyệt').length}
                              </span>
                              <span className="text-[8.5pt] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                Chờ duyệt: {selectedPlan.devices.filter((d, i) => getDeviceDvtnStatus(selectedPlan, d, i) === 'Chờ duyệt').length}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#f0f4fa] p-6 rounded-2xl border border-blue-50 space-y-4 text-left">
                          <h4 className="text-[10pt] font-black text-gray-700 flex items-center gap-2 mb-2">
                             <ListChecks className="w-4 h-4" /> Mô tả yêu cầu
                          </h4>
                          <p className="text-[11.5pt] font-medium text-gray-700 leading-relaxed">
                            "{selectedPlan.description || 'Thực hiện công tác thí nghiệm định kỳ các thiết bị theo quy trình kỹ thuật hiện hành của EVN.'}"
                          </p>
                      </div>

                      {/* Thông tin người cập nhật, ngày cập nhật mới nhất phía dưới cùng */}
                      <div className="flex items-center justify-between text-[8.5pt] text-gray-400 font-bold border-t border-gray-100 pt-4 mt-4 select-none">
                        <div className="flex items-center gap-1.5">
                          <span>Người cập nhật:</span>
                          <span className="text-gray-650 font-extrabold">{selectedPlan.creator || 'Nguyễn Văn A'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-row-reverse">
                          <span className="text-gray-650 font-extrabold">{selectedPlan.updatedDate || selectedPlan.createdDate || '12/04/2026 14:35'}</span>
                          <span>Cập nhật mới nhất:</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {previewTab === 'devices' && (() => {
                  const getDeviceDetailsStatus = (dev: any, plan: any) => {
                    if (dev.approvalStatus === 'Đã duyệt') {
                      return { bp: 'CN duyệt', ct: 'CT duyệt' };
                    } else if (dev.approvalStatus === 'Không duyệt') {
                      if (dev.id && dev.id.includes('171')) {
                        return { bp: 'CN duyệt', ct: 'CT không duyệt' };
                      }
                      return { bp: 'CN không duyệt', ct: 'CT không duyệt' };
                    } else if (dev.approvalStatus === 'Chờ duyệt') {
                      return { bp: 'CN chưa XN', ct: 'Chờ duyệt' };
                    }
                    
                    if (plan.status === 'Đã duyệt' || plan.status === 'Đang thực hiện') {
                      return { bp: 'CN duyệt', ct: 'CT duyệt' };
                    } else if (plan.status === 'Đang duyệt' || plan.status === 'Đã tiếp nhận') {
                      return { bp: 'CN duyệt', ct: 'Chờ duyệt' };
                    } else {
                      return { bp: 'Chờ duyệt', ct: 'Chờ duyệt' };
                    }
                  };

                  const getDeviceTestingInfo = (dev: any, plan: any) => {
                    const nextDate = dev.nextDue || plan.startDate || '15/05/2026';
                    const prevDate = nextDate.includes('-')
                      ? nextDate.replace(/^2026/, '2025').replace(/^2027/, '2026')
                      : nextDate.replace(/\/2026/, '/2025');

                    let periodType = 'Định kỳ';
                    if (plan.type === 'Đột xuất') {
                      periodType = 'Đột xuất';
                    } else if (plan.type === 'Sau sự cố') {
                      periodType = 'Sau lắp đặt';
                    } else if (dev.id && dev.id.includes('DH')) {
                      periodType = 'Trước lắp đặt';
                    }

                    let testType = 'Thí nghiệm';
                    if (dev.type === 'Thiết bị đo' || dev.name.toLowerCase().includes('đo') || dev.name.toLowerCase().includes('hồ')) {
                      testType = 'Kiểm định';
                    } else if (dev.type === 'Biến dòng' || dev.type === 'Biến áp' || dev.type === 'Máy biến áp' || dev.type === 'Trạm') {
                      testType = 'Thí nghiệm và Kiểm định';
                    } else if ((dev.id && dev.id.includes('MC')) || dev.type === 'Máy cắt') {
                      testType = 'Thí nghiệm và Hiệu chuẩn';
                    }

                    return { prevDate, nextDate, periodType, testType };
                  };

                  const getDeviceIcon = (type: string) => {
                    const t = (type || '').toLowerCase();
                    if (t.includes('biến áp') || t.includes('trạm')) return <Database className="w-4 h-4" />;
                    if (t.includes('máy cắt') || t.includes('đóng cắt')) return <Zap className="w-4 h-4" />;
                    if (t.includes('biến dòng') || t.includes('biến điện áp') || t.includes('tu') || t.includes('ti')) return <Activity className="w-4 h-4" />;
                    if (t.includes('đo') || t.includes('đồng hồ') || t.includes('công tơ') || t.includes('chỉ thị')) return <Clock className="w-4 h-4" />;
                    return <Database className="w-4 h-4" />;
                  };

                  const filteredTabDevices = selectedPlan.devices.filter((dev, idx) => {
                    // Search bar filtering matching name, type, or PMIS-DEV id
                    if (deviceSearchText) {
                      const searchStr = deviceSearchText.toLowerCase();
                      const nameMatch = (dev.name || '').toLowerCase().includes(searchStr);
                      const typeMatch = (dev.type || '').toLowerCase().includes(searchStr);
                      const idMatch = `PMIS-DEV-00${idx + 1}`.toLowerCase().includes(searchStr);
                      if (!nameMatch && !typeMatch && !idMatch) {
                        return false;
                      }
                    }

                    // Dropdown filtering
                    if (deviceStatusSelectFilter && deviceStatusSelectFilter !== 'Tất cả') {
                      const dvdk = getDeviceDvdkStatus(selectedPlan, dev, idx);
                      const dvtn = getDeviceDvtnStatus(selectedPlan, dev, idx);

                      if (deviceStatusSelectFilter === 'Chờ duyệt') {
                        return dvdk === 'Chờ duyệt' || dvtn === 'Chờ duyệt';
                      }
                      if (deviceStatusSelectFilter === 'ĐVĐK Duyệt') {
                        return dvdk === 'ĐVĐK Duyệt';
                      }
                      if (deviceStatusSelectFilter === 'ĐVTN Duyệt') {
                        return dvtn === 'ĐVTN Duyệt';
                      }
                      if (deviceStatusSelectFilter === 'Không Duyệt') {
                        return dvdk === 'ĐVĐK Không Duyệt' || dvtn === 'ĐVTN Không Duyệt';
                      }
                    }
                    return true;
                  });

                  // Device tab level pagination (10 items per page)
                  const devicesPerPage = 10;
                  const totalDeviceTabPages = Math.ceil(filteredTabDevices.length / devicesPerPage) || 1;
                  const currentDeviceTabPage = Math.min(deviceTabPage, totalDeviceTabPages);
                  const startIndexDeviceTab = (currentDeviceTabPage - 1) * devicesPerPage;
                  const paginatedTabDevices = filteredTabDevices.slice(startIndexDeviceTab, startIndexDeviceTab + devicesPerPage);

                  return (
                    <div className="flex-1 flex flex-col overflow-hidden text-left animate-in fade-in duration-400">
                      {/* Search and Dropdown Filter Row */}
                      <div className="flex flex-col sm:flex-row gap-3 mb-4 shrink-0 select-none">
                        {/* Quick Device Search search bar */}
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Tìm nhanh thiết bị (mã, tên)..."
                            value={deviceSearchText}
                            onChange={(e) => {
                              setDeviceSearchText(e.target.value);
                              setDeviceTabPage(1);
                            }}
                            className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-[9.5pt] font-medium outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-left bg-white placeholder-gray-405"
                          />
                          {deviceSearchText && (
                            <button
                              type="button"
                              onClick={() => {
                                setDeviceSearchText('');
                                setDeviceTabPage(1);
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-750 font-bold"
                            >
                              ×
                            </button>
                          )}
                        </div>

                        {/* Listbox Status select field */}
                        <div className="w-full sm:w-[210px] relative">
                          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <select
                            value={deviceStatusSelectFilter}
                            onChange={(e) => {
                              setDeviceStatusSelectFilter(e.target.value);
                              setDeviceTabPage(1);
                            }}
                            className="w-full pl-9 pr-8 py-2 border border-gray-205 rounded-lg text-[9.5pt] font-black outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-left bg-white text-gray-750 appearance-none cursor-pointer"
                          >
                            <option value="Tất cả">Tất cả</option>
                            <option value="Chờ duyệt">Chờ duyệt</option>
                            <option value="ĐVĐK Duyệt">ĐVĐK Duyệt</option>
                            <option value="ĐVTN Duyệt">ĐVTN Duyệt</option>
                            <option value="Không Duyệt">Không Duyệt</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[8pt]">
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Elegant modern table structure based on checking list table */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar select-none bg-white rounded-2xl border border-gray-100 min-h-0">
                        <table className="w-full text-left border-collapse min-w-[550px]">
                          <thead className="sticky top-0 z-20 bg-slate-50 shadow-2xs">
                            <tr className="border-b border-[#164399]/5 text-[8.5pt] font-black text-[#164399] uppercase tracking-widest bg-slate-50/80">
                              <th className="p-3 pl-4">Thông tin thiết bị</th>
                              <th className="p-3 text-right">Kỳ kiểm tra</th>
                              <th className="p-3 text-right pr-4">Phê duyệt</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {paginatedTabDevices.map((dev, i) => {
                              const { bp, ct } = getDeviceDetailsStatus(dev, selectedPlan);
                              const { prevDate, nextDate, periodType, testType } = getDeviceTestingInfo(dev, selectedPlan);
                              return (
                                <tr key={dev.id || i} className="hover:bg-slate-50/50 transition-all font-medium text-gray-755">
                                  <td className="p-3 pl-4">
                                    <div className="flex flex-col text-left min-w-0">
                                      <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-[8.5pt] font-mono font-bold text-red-600">
                                          PMIS-DEV-00{(startIndexDeviceTab + i + 1)}
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-[8.5pt] text-gray-700 font-bold uppercase tracking-tight">
                                          {dev.type}
                                        </span>
                                      </div>
                                      <p className="text-[10.5pt] font-black text-gray-800 truncate mb-1">{capitalizeBusinessName(dev.name)}</p>
                                      <p className="text-[8.5pt] text-gray-600 italic font-bold text-left">{testType}</p>
                                    </div>
                                  </td>
                                  <td className="p-3 pr-4">
                                    <div className="text-[8.5pt] leading-tight space-y-1 my-0.5 flex flex-col items-end w-full">
                                      <div className="text-gray-500 font-medium flex items-center gap-1.5 justify-end">
                                        <span className="text-gray-400">Gần nhất:</span>
                                        <span className="inline-block text-center font-normal text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200 w-[110px]">{prevDate || '---'}</span>
                                      </div>
                                      <div className="text-gray-500 font-medium flex items-center gap-1.5 justify-end">
                                        <span className="text-gray-400">Tiếp theo:</span>
                                        <span className="inline-block text-center font-bold text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded border border-blue-200 w-[110px]">{nextDate || '---'}</span>
                                      </div>
                                      <div className="text-gray-500 font-medium flex items-center gap-1.5 justify-end">
                                        <span className="text-gray-400 font-medium">Loại kỳ:</span>
                                        <span className="inline-block text-center text-gray-700/90 bg-[#f0f4fa] px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-[#164399]/15 text-[7.5pt] w-[110px]">{periodType}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-right pr-4 whitespace-nowrap">
                                    <div className="flex flex-col gap-1.5 items-end justify-center">
                                      {/* Đơn vị đăng ký status badge */}
                                      {(() => {
                                        const globalIdx = startIndexDeviceTab + i;
                                        const rawDvdk = getDeviceDvdkStatus(selectedPlan, dev, globalIdx);
                                        const rawDvtn = getDeviceDvtnStatus(selectedPlan, dev, globalIdx);
                                        
                                        let dvdkText = 'ĐVĐK CHỜ DUYỆT';
                                        let dvdkStyle = 'bg-amber-50 text-amber-600 border border-amber-100 font-normal';
                                        if (rawDvdk === 'ĐVĐK Duyệt' || rawDvdk.toUpperCase().includes('DUYỆT')) {
                                          dvdkText = 'ĐVĐK DUYỆT';
                                          dvdkStyle = 'bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold';
                                        } else if (rawDvdk === 'ĐVĐK Không Duyệt' || rawDvdk.toUpperCase().includes('KHÔNG')) {
                                          dvdkText = 'KHÔNG DUYỆT';
                                          dvdkStyle = 'bg-red-50 text-red-600 border border-red-100 font-bold';
                                        }

                                        let dvtnText = 'ĐVTN CHỜ DUYỆT';
                                        let dvtnStyle = 'bg-amber-50 text-amber-600 border border-amber-100 font-normal';
                                        if (rawDvtn === 'ĐVTN Duyệt' || rawDvtn.toUpperCase().includes('DUYỆT')) {
                                          dvtnText = 'ĐVTN DUYỆT';
                                          dvtnStyle = 'bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold';
                                        } else if (rawDvtn === 'ĐVTN Không Duyệt' || rawDvtn.toUpperCase().includes('KHÔNG')) {
                                          dvtnText = 'KHÔNG DUYỆT';
                                          dvtnStyle = 'bg-red-50 text-red-600 border border-red-100 font-bold';
                                        }

                                        return (
                                          <>
                                            <span className={`text-[7.5pt] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full inline-block text-center w-[125px] border ${dvdkStyle}`}>
                                               {dvdkText}
                                            </span>
                                            <span className={`text-[7.5pt] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full inline-block text-center w-[125px] border ${dvtnStyle}`}>
                                               {dvtnText}
                                            </span>
                                          </>
                                        );
                                      })()}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Device Tab Pagination Controls - Fix pagination without border lines */}
                      {totalDeviceTabPages > 1 && (
                        <div className="flex items-center justify-between pt-3 mt-2 text-[9pt] font-bold shrink-0">
                           <span className="text-gray-400 font-medium">
                              Xem {(startIndexDeviceTab + 1)} - {Math.min(startIndexDeviceTab + devicesPerPage, filteredTabDevices.length)} / {filteredTabDevices.length} thiết bị
                           </span>
                           <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={currentDeviceTabPage <= 1}
                                onClick={() => setDeviceTabPage(prev => Math.max(1, prev - 1))}
                                className={`p-1 bg-transparent rounded-xl text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer h-7 w-7 flex items-center justify-center border-none`}
                              >
                                 <ChevronLeft className="w-4 h-4" />
                              </button>
                              {[...Array(totalDeviceTabPages)].map((_, idx) => {
                                 const p = idx + 1;
                                 return (
                                    <button
                                      key={p}
                                      type="button"
                                      onClick={() => setDeviceTabPage(p)}
                                      className={`w-7 h-7 text-center rounded-full text-[8.5pt] font-black select-none border-none ${
                                        currentDeviceTabPage === p
                                          ? 'bg-blue-100 text-[#164399]'
                                          : 'bg-transparent text-gray-500 hover:text-gray-850 cursor-pointer hover:bg-gray-100'
                                      }`}
                                    >
                                       {p}
                                    </button>
                                 );
                              })}
                              <button
                                type="button"
                                disabled={currentDeviceTabPage >= totalDeviceTabPages}
                                onClick={() => setDeviceTabPage(prev => Math.min(totalDeviceTabPages, prev + 1))}
                                className={`p-1 bg-transparent rounded-xl text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer h-7 w-7 flex items-center justify-center border-none`}
                              >
                                 <ChevronRight className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {previewTab === 'history' && (
                  <div className="animate-in slide-in-from-right duration-500 text-left flex flex-col h-full min-h-0 relative">
                    {/* Header of opinions thread - Clean and remove Ý KIẾN TRÌNH DUYỆT and fix typo Ý ý kiến */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 flex-shrink-0">
                       <h5 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1">
                          <MessageSquare className="w-4.5 h-4.5 text-blue-500" /> Ý kiến trao đổi ({ (planComments[selectedPlan.id] || []).length })
                       </h5>
                    </div>

                    {/* Timeline box */}
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar py-3 min-h-0">
                      {(planComments[selectedPlan.id] || []).length === 0 ? (
                        <div className="py-8 text-center text-gray-400 italic font-medium">Chưa có ý kiến nào trao đổi cho hồ sơ này.</div>
                      ) : (
                        (planComments[selectedPlan.id] || []).map((item) => {
                          const isCurrentUser = item.user === 'Nguyễn Văn A';
                          return (
                            <div key={item.id} className={`flex gap-3 text-left ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                              {/* Avatar or Circle badge with initial */}
                              <div className={`w-8 h-8 rounded-full font-extrabold text-[9pt] flex items-center justify-center shrink-0 shadow-xs mt-0.5 ${
                                isCurrentUser ? 'bg-indigo-50 border border-indigo-200 text-indigo-650' : 'bg-blue-50 border border-blue-200 text-blue-600'
                              }`}>
                                {item.user[0] || 'U'}
                              </div>
                              
                              {/* Comment bubble */}
                              <div className={`max-w-[85%] flex-1 rounded-2xl p-3 shadow-2xs space-y-1 transition-all text-left ${
                                isCurrentUser 
                                  ? 'bg-blue-50/80 border border-blue-200/60 shadow-xs' 
                                  : 'bg-slate-50 border border-slate-200/70 shadow-xs'
                              }`}>
                                <div className="flex items-baseline justify-between gap-2 flex-wrap text-left">
                                  <p className="text-[9.5pt] font-black text-gray-800 text-left">
                                    {item.user} <span className="text-gray-450 font-medium text-[8pt]">({item.role})</span>
                                  </p>
                                  <span className="text-[8pt] text-gray-400 font-bold font-mono">{item.time}</span>
                                </div>
                                <p className="text-[10pt] text-gray-750 leading-normal whitespace-pre-wrap break-words text-left">{item.content}</p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Unified Comment Input (Nền trắng, Fix vị trí cố định, các ô thẳng hàng) */}
                    <div className="pt-3 border-t border-gray-150 shrink-0 bg-white mt-auto">
                      <div className="flex gap-3 bg-white p-1 rounded-xl border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm items-center">
                        <textarea 
                          rows={1}
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          onKeyDown={(e) => {
                             if (e.key === 'Enter' && !e.shiftKey) {
                               e.preventDefault();
                               handleAddComment();
                             }
                          }}
                          placeholder="Nhập nội dung ý kiến đóng góp, thảo luận..."
                          className="flex-1 resize-none py-2.5 px-3.5 rounded-lg text-[9.5pt] focus:outline-none bg-white placeholder:text-slate-400 transition-colors border-none"
                        />
                        <button 
                          onClick={handleAddComment}
                          className="h-10 px-5 bg-[#164399] text-white hover:bg-blue-800 transition-colors font-bold text-[9.5pt] rounded-lg cursor-pointer shadow-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 m-1"
                        >
                           <Send className="w-4 h-4" /> Gửi
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-12 text-center bg-white">
              <ClipboardList className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-[12pt] font-bold">Chọn một yêu cầu/kế hoạch từ danh sách bên trái để xem thông tin nhanh.</p>
            </div>
          )}
        </div>
        )}
      </div>

      {/* Pop-up Chọn Thiết bị Thí nghiệm (Designed exclusively for Testing submodule) */}
      {showCustomDeviceSelection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 backdrop-blur-[2px] select-none">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#164399] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5" />
                <h3 className="text-[12.5pt] font-black uppercase tracking-wide">Chọn Thiết bị Thí nghiệm</h3>
              </div>
              <button 
                onClick={() => setShowCustomDeviceSelection(false)} 
                className="p-1 hover:bg-white/10 rounded-xl transition-colors text-white animate-pulse"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 text-left">
              {popupError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-[9pt] font-semibold p-3 rounded-xl animate-in fade-in duration-150">
                  {popupError}
                </div>
              )}
              {/* Item 1: Đơn vị đăng ký */}
              <div className="space-y-1.5">
                <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest block">Đơn vị đăng ký</label>
                <select
                  value={popupUnit}
                  onChange={(e) => {
                    setPopupUnit(e.target.value);
                    setPopupTicket('new'); // Reset ticket on unit change
                  }}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-[10pt] font-semibold text-gray-800 outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-100"
                >
                  <option value="Điện lực Thành phố Hưng Yên">Điện lực Thành phố Hưng Yên</option>
                  <option value="Công ty Dịch vụ điện lực">Công ty Dịch vụ điện lực</option>
                  <option value="Xí nghiệp 110kV">Xí nghiệp 110kV</option>
                  <option value="Xí nghiệp Thí nghiệm">Xí nghiệp Thí nghiệm</option>
                </select>
              </div>

              {/* Item 2: Chọn Phiếu yêu cầu */}
              <div className="space-y-1.5">
                <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest block">Chọn Phiếu yêu cầu thí nghiệm</label>
                <select
                  value={popupTicket}
                  onChange={(e) => setPopupTicket(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-[10pt] font-semibold text-gray-800 outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-100"
                >
                  <option value="new">-- Tạo phiếu yêu cầu bổ sung --</option>
                  {enrichedPlans
                    .filter(p => p.status !== 'Đã duyệt' && p.status !== 'Đã xác nhận' && p.status !== 'Đang thực hiện')
                    .filter(p => !popupUnit || p.unit === popupUnit)
                    .map(p => (
                      <option key={p.id} value={p.id}>
                        {p.code} - {p.title.substring(0, 32)}...
                      </option>
                    ))
                  }
                </select>
              </div>

              {/* Item 3: Danh sách Thiết bị hỗ trợ */}
              <div className="space-y-2">
                <label className="text-[9pt] font-black text-gray-400 uppercase tracking-widest block">Danh sách thiết bị kiểm định</label>
                <div className="border border-slate-100 rounded-2xl max-h-[160px] overflow-y-auto custom-scrollbar bg-slate-50 p-2.5 space-y-2">
                  {AVAILABLE_MOCK_DEVICES.map((dev) => {
                    const isChecked = popupSelectedDeviceIds.includes(dev.id);
                    return (
                      <label 
                        key={dev.id} 
                        className={`flex items-start gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
                          isChecked 
                            ? 'bg-blue-50/50 text-[#164399] font-bold' 
                            : 'hover:bg-slate-200/40 text-gray-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPopupSelectedDeviceIds([...popupSelectedDeviceIds, dev.id]);
                            } else {
                              setPopupSelectedDeviceIds(popupSelectedDeviceIds.filter(id => id !== dev.id));
                            }
                          }}
                          className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                        />
                        <div className="flex-1 text-left">
                          <p className="text-[9.5pt] leading-tight font-extrabold">{dev.name}</p>
                          <div className="flex gap-2 text-[8pt] text-gray-400 font-mono mt-0.5">
                            <span>Lớp: {dev.type}</span>
                            <span>|</span>
                            <span>Hạn kiểm định: {dev.nextDue}</span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100 shrink-0">
              <button
                onClick={() => setShowCustomDeviceSelection(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-gray-500 font-bold rounded-lg text-[9.5pt] transition-all cursor-pointer h-10"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  if (popupSelectedDeviceIds.length === 0) {
                    setPopupError('Vui lòng chọn ít nhất một thiết bị!');
                    setTimeout(() => setPopupError(null), 3500);
                    return;
                  }

                  if (popupTicket === 'new') {
                    // Create additional request form
                    const newPlanId = 100 + addedPlans.length;
                    const newPlan = {
                      id: newPlanId,
                      code: `PYC bổ sung-${newPlanId}`,
                      title: `Yêu cầu thí nghiệm bổ sung thiết bị - ${popupUnit}`,
                      unit: popupUnit,
                      status: 'Chưa xác nhận',
                      createdDate: new Date().toLocaleDateString('vi-VN'),
                      creator: 'Nguyễn Văn A',
                      devices: popupSelectedDeviceIds.map(id => {
                        const d = AVAILABLE_MOCK_DEVICES.find(item => item.id === id);
                        return {
                          id: d?.id || id,
                          name: d?.name || id,
                          type: d?.type || 'Thiết bị phụ',
                          nextDue: d?.nextDue || '2026-06-30',
                          approvalStatus: 'Chờ duyệt'
                        };
                      })
                    };
                    setAddedPlans(prev => [...prev, newPlan]);
                    setSelectedTestingPlanId(newPlanId);
                  } else {
                    // Append to existing
                    const targetPlanId = Number(popupTicket);
                    const newDevices = popupSelectedDeviceIds.map(id => {
                      const d = AVAILABLE_MOCK_DEVICES.find(item => item.id === id);
                      return {
                        id: `${d?.id || id}-${Date.now()}`,
                        name: d?.name || id,
                        type: d?.type || 'Thiết bị phụ',
                        nextDue: d?.nextDue || '2026-06-30',
                        approvalStatus: 'Chờ duyệt'
                      };
                    });
                    setAddedDevicesByPlanId(prev => ({
                      ...prev,
                      [targetPlanId]: [...(prev[targetPlanId] || []), ...newDevices]
                    }));
                    setSelectedTestingPlanId(targetPlanId);
                  }
                  setShowCustomDeviceSelection(false);
                }}
                className="px-5 py-2 bg-[#164399] hover:bg-blue-800 text-white font-bold rounded-lg text-[9.5pt] transition-all shadow-sm cursor-pointer h-10"
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
