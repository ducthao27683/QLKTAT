import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, Copy, Trash2, Edit, Search, Filter, CheckCircle2, Clock, X, Check, 
  Calendar, ArrowLeft, AlertCircle, Info, FileText, Eye, Cpu, Camera, Activity,
  Database, Save, RefreshCw, XCircle, ArrowRight, ListChecks, History, Zap, Settings, Star, ClipboardList,
  Download, BookOpen, ChevronRight, ChevronLeft, ChevronDown
} from 'lucide-react';
import { capitalizeBusinessName } from '../../shared/utils';
import { FileUploader } from '../../components/FileUploader';
import { DocumentLibraryModal } from '../../shared/components/common/DocumentLibraryModal';

const getDeviceIcon = (itemType: string, size = "w-4 h-4") => {
  switch (itemType) {
    case 'Máy biến áp': return <Zap className={`${size} text-amber-500`} />;
    case 'Máy cắt SF6': return <RefreshCw className={`${size} text-emerald-500`} />;
    case 'Dao cách ly': return <Settings className={`${size} text-blue-500`} />;
    case 'Biến điện áp TU':
    case 'Biến dòng điện TI': return <Database className={`${size} text-indigo-500`} />;
    case 'Chống sét van': return <AlertCircle className={`${size} text-rose-500`} />;
    case 'Tủ Recloser': return <Cpu className={`${size} text-[#164399]`} />;
    default: return <Info className={`${size} text-gray-500`} />;
  }
};

const renderDeviceIcon = (itemType: string) => {
  return (
    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
      {getDeviceIcon(itemType)}
    </div>
  );
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Đã duyệt':
    case 'Duyệt':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[7.5pt] font-black uppercase tracking-wider bg-green-50 text-green-600 border border-green-200/80 shadow-xs">Đã duyệt</span>
      );
    case 'Không duyệt':
    case 'Từ chối':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[7.5pt] font-black uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/60 shadow-xs">
          Không duyệt
        </span>
      );
    case 'Đăng ký':
    case 'Đã đăng ký':
    case 'Chờ duyệt':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[7.5pt] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200/80 shadow-xs">
          Đăng ký
        </span>
      );
    case 'Xác nhận':
    case 'Đã xác nhận':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[7.5pt] font-black uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200 shadow-xs">
          Xác nhận
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[7.5pt] font-black uppercase tracking-wider bg-slate-50 text-slate-550 border border-slate-200/60 shadow-xs">
          Dự thảo
        </span>
      );
  }
};

interface SpareItem {
  id: string;
  code: string;
  name: string;
  normQty: number; // Định mức dự phòng
  runningQty: number; // Số lượng đang vận hành
  proposedQty: number; // Số lượng đề xuất dự phòng xin cấp
  approvedQty?: number; // Số lượng duyệt cấp chính thức
}

interface RegistrationTicket {
  id: string;
  requestingUnit: string;
  requestDate: string;
  status: 'Dự thảo' | 'Đăng ký' | 'Đã duyệt' | 'Không duyệt';
  notes: string;
  items: SpareItem[];
  attachments?: {name: string; size: string}[];
  approvalComment?: string;
  approver?: string;
  approvalDate?: string;
}

// Predefined available spare materials/devices catalog
const DEVICE_CATALOG: Omit<SpareItem, 'proposedQty' | 'approvedQty'>[] = [
  { id: 'M-01', code: 'MBA-110-63', name: 'Máy biến áp lực 110kV - 63MVA', normQty: 2, runningQty: 12 },
  { id: 'M-02', code: 'MBA-110-40', name: 'Máy biến áp lực 110kV - 40MVA', normQty: 1, runningQty: 8 },
  { id: 'M-03', code: 'MC-110-SF6', name: 'Máy cắt khí SF6 110kV', normQty: 5, runningQty: 48 },
  { id: 'M-04', code: 'DCL-110-3P', name: 'Dao cách ly 110kV 3 pha ngoài trời', normQty: 8, runningQty: 92 },
  { id: 'M-05', code: 'TU-110', name: 'Máy biến điện áp dòng TU 110kV', normQty: 12, runningQty: 144 },
  { id: 'M-06', code: 'TI-110', name: 'Máy biến dòng điện dòng TI 110kV', normQty: 12, runningQty: 144 },
  { id: 'M-07', code: 'CSV-110-OUT', name: 'Chống sét van 110kV ngoài trời', normQty: 18, runningQty: 216 },
  { id: 'M-08', code: 'REC-22', name: 'Tủ hợp bộ tự đóng lại Recloser 22kV', normQty: 10, runningQty: 85 },
  { id: 'M-09', code: 'FCO-22', name: 'Cầu chì tự rơi FCO 22kV', normQty: 50, runningQty: 450 },
  { id: 'M-10', code: 'KH-110', name: 'Cuộn kháng điện xoay chiều 110kV', normQty: 2, runningQty: 4 }
];

const PRESET_TICKETS: RegistrationTicket[] = [
  {
    id: 'YCDK-2026-001',
    requestingUnit: 'Điện lực Mỹ Hào',
    requestDate: '2026-05-10',
    status: 'Đã duyệt',
    notes: 'Đăng ký bổ sung thiết bị dự phòng phục vụ trước mùa mưa bão năm 2026 cho các TBA 110kV quản lý',
    items: [
      { id: 'M-03', code: 'MC-110-SF6', name: 'Máy cắt khí SF6 110kV', normQty: 5, runningQty: 48, proposedQty: 2, approvedQty: 2 },
      { id: 'M-07', code: 'CSV-110-OUT', name: 'Chống sét van 110kV ngoài trời', normQty: 18, runningQty: 216, proposedQty: 6, approvedQty: 6 }
    ],
    approver: 'Nguyễn Văn Hải (Phó Giám đốc kỹ thuật)',
    approvalComment: 'Đồng ý cấp đủ vật tư dự phòng phục vụ bão số 2 theo kế hoạch phòng chống thiên tai (PCTT&TKCN) đã duyệt.',
    approvalDate: '2026-05-12'
  },
  {
    id: 'YCDK-2026-002',
    requestingUnit: 'Điện lực Văn Lâm',
    requestDate: '2026-05-18',
    status: 'Không duyệt',
    notes: 'Đăng ký dự trữ khẩn cấp đề phòng sự cố hỏng hóc máy biến thế do quá tải mùa nóng kéo dài tại KCN Phố Nối A',
    items: [
      { id: 'M-01', code: 'MBA-110-63', name: 'Máy biến áp lực 110kV - 63MVA', normQty: 2, runningQty: 12, proposedQty: 1, approvedQty: 0 }
    ],
    approver: 'Trần Minh Đức (Trưởng phòng Kỹ thuật)',
    approvalComment: 'Hiện tại quỹ kho dự phòng tổng của Công ty không còn dự trữ MBA dòng 63MVA nhàn rỗi. Phòng kỹ thuật đã có phương án điều tiết mạch vòng, tạm thời không phê duyệt cấp mới.',
    approvalDate: '2026-05-20'
  },
  {
    id: 'YCDK-2026-003',
    requestingUnit: 'Điện lực Thành phố Hưng Yên',
    requestDate: '2026-06-01',
    status: 'Đăng ký',
    notes: 'Cung cấp thiết bị dự phòng đóng cắt nhanh tại lộ 372 trạm 110kV E28.1 nhằm đảm bảo độ tin cậy lưới điện',
    items: [
      { id: 'M-04', code: 'DCL-110-3P', name: 'Dao cách ly 110kV 3 pha ngoài trời', normQty: 8, runningQty: 92, proposedQty: 1, approvedQty: 0 },
      { id: 'M-08', code: 'REC-22', name: 'Tủ hợp bộ tự đóng lại Recloser 22kV', normQty: 10, runningQty: 85, proposedQty: 2, approvedQty: 0 }
    ]
  },
  {
    id: 'YCDK-2026-004',
    requestingUnit: 'Điện lực Văn Giang',
    requestDate: '2026-06-08',
    status: 'Dự thảo',
    notes: 'Bản nháp đề xuất dự trữ thiết bị FCO và cách ly nhánh rẽ trục chính lộ 172 phục vụ cải tạo lưới',
    items: [
      { id: 'M-09', code: 'FCO-22', name: 'Cầu chì tự rơi FCO 22kV', normQty: 50, runningQty: 450, proposedQty: 10 }
    ]
  }
];

const getDeviceType = (item: { code: string; name: string }) => {
  if (item.code.startsWith('MBA')) return 'Máy biến áp';
  if (item.code.startsWith('MC')) return 'Máy cắt SF6';
  if (item.code.startsWith('DCL')) return 'Dao cách ly';
  if (item.code.startsWith('TU')) return 'Biến điện áp TU';
  if (item.code.startsWith('TI')) return 'Biến dòng điện TI';
  if (item.code.startsWith('CSV')) return 'Chống sét van';
  if (item.code.startsWith('REC')) return 'Tủ Recloser';
  if (item.code.startsWith('FCO')) return 'Cầu chì tự rơi';
  if (item.code.startsWith('KH')) return 'Cuộn kháng';
  return 'Thiết bị phụ trợ';
};

const getTicketUpdaterName = (ticket: any) => {
  if (ticket.approver) {
    return ticket.approver.split(' (')[0];
  }
  if (ticket.requestingUnit.includes('Mỹ Hào')) return 'Phạm Minh Hải';
  if (ticket.requestingUnit.includes('Văn Lâm')) return 'Nguyễn Tiến Đạt';
  if (ticket.requestingUnit.includes('Thành phố') || ticket.requestingUnit.includes('Hưng Yên')) return 'Trần Quốc Tuấn';
  if (ticket.requestingUnit.includes('Văn Giang')) return 'Vũ Ngọc Anh';
  return 'Lê Đắc Thắng';
};

const parseApprover = (approverStr?: string) => {
  if (!approverStr) return { name: 'Chưa cập nhật', title: '' };
  const match = approverStr.match(/([^(]+)\s*\(([^)]+)\)/);
  if (match) {
    return {
      name: match[1].trim(),
      title: match[2].trim()
    };
  }
  return { name: approverStr, title: '' };
};

export const ThietBiDuPhongScreen = ({ 
  setActiveSubMenu,
  devicePath,
  onEditingChange
}: { 
  setActiveSubMenu?: (menu: string | null) => void;
  devicePath?: string[];
  onEditingChange?: (isEditing: boolean) => void;
}) => {
  // Main state holding registration records
  const [tickets, setTickets] = useState<RegistrationTicket[]>(PRESET_TICKETS);
  
  // App filters and views
  const [roleMode, setRoleMode] = useState<'requester' | 'manager'>('requester');
  const [filterStatus, setFilterStatus] = useState<string>('Tất cả'); // Standard switcher handles "Tất cả" vs "Chờ duyệt"
  const [showFilter, setShowFilter] = useState(false);
  
  // Specific filters
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterUnit, setFilterUnit] = useState('Tất cả');
  const [filterRegistrationStatus, setFilterRegistrationStatus] = useState('Tất cả');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Selected item inside Master-Detail view
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(PRESET_TICKETS[0]?.id || null);
  const [previewTab, setPreviewTab] = useState<'info' | 'devices' | 'history'>('info');

  // Nested filters and pagination inside 'devices' tab
  const [deviceVoltageFilter, setDeviceVoltageFilter] = useState<string>('Tất cả');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState<string>('Tất cả');
  const [deviceSearchKeyword, setDeviceSearchKeyword] = useState<string>('');
  const [deviceCurrentPage, setDeviceCurrentPage] = useState<number>(1);

  useEffect(() => {
    setDeviceCurrentPage(1);
  }, [selectedTicketId, deviceVoltageFilter, deviceTypeFilter, deviceSearchKeyword]);

  // Form attachment states and Library modal state
  const [formDocs, setFormDocs] = useState<{name: string; size: string}[]>([]);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [librarySearchKeyword, setLibrarySearchKeyword] = useState('');
  const [libraryCategory, setLibraryCategory] = useState('all');

  // Form management overlay (add, edit, view)
  const [formOverlay, setFormOverlay] = useState<{
    mode: 'add' | 'edit' | 'view' | 'approve';
    data: RegistrationTicket;
  } | null>(null);

  useEffect(() => {
    if (onEditingChange) {
      const isEditing = formOverlay !== null && (formOverlay.mode === 'add' || formOverlay.mode === 'edit');
      onEditingChange(isEditing);
    }
  }, [formOverlay, onEditingChange]);

  useEffect(() => {
    return () => {
      if (onEditingChange) {
        onEditingChange(false);
      }
    };
  }, [onEditingChange]);

  // Device inclusion sub-modal
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [modalSearchKeyword, setModalSearchKeyword] = useState('');
  const [modalTypeFilter, setModalTypeFilter] = useState('Tất cả');
  const [modalVoltageFilter, setModalVoltageFilter] = useState('Tất cả');

  // Floating notifications banner
  const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'error', text: string } | null>(null);

  // File download and visual preview states
  const [previewingFile, setPreviewingFile] = useState<{name: string, size: string} | null>(null);

  const handleDownloadFile = (fileName: string) => {
    const fileContent = `Đây là nội dung giả lập của tài liệu: ${fileName}\nCục Điều tiết Điện lực - Tổng Công ty Điện lực Miền Bắc (EVNNPC).\nTài liệu này chứa thông tin bảo mật của hệ thống truyền tải lưới điện EVN.`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerAlert('success', `Tải về tài liệu thành công: ${fileName}`);
  };

  const triggerAlert = (type: 'success' | 'info' | 'error', text: string) => {
    setAlert({ type, text });
    setTimeout(() => setAlert(null), 4000);
  };

  // Switch role reset
  const handleRoleSwitch = (role: 'requester' | 'manager') => {
    setRoleMode(role);
    setFilterStatus('Tất cả');
    // Select first ticket matching visibility rules
    const vis = tickets.filter(t => role === 'manager' ? t.status !== 'Dự thảo' : true);
    if (vis.length > 0) {
      setSelectedTicketId(vis[0].id);
    }
  };

  // Filter logic containing status switcher ("Tất cả" vs "Chờ duyệt"), dates, unit & search keywords
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      // Role configuration visibility rules
      if (roleMode === 'manager') {
        if (t.status === 'Dự thảo') return false;
      }

      // Rounded 50% Switch Box status mapping
      if (filterStatus === 'Chờ duyệt') {
        if (t.status !== 'Đăng ký') return false;
      } else if (filterStatus !== 'Tất cả') {
        if (t.status !== filterStatus) return false;
      }

      // Keyword search
      if (searchKeyword.trim() !== '') {
        const kw = searchKeyword.toLowerCase();
        const matchesId = t.id.toLowerCase().includes(kw);
        const matchesUnit = t.requestingUnit.toLowerCase().includes(kw);
        const matchesNotes = t.notes.toLowerCase().includes(kw);
        const matchesItems = t.items.some(item => item.name.toLowerCase().includes(kw) || item.code.toLowerCase().includes(kw));
        if (!matchesId && !matchesUnit && !matchesNotes && !matchesItems) return false;
      }

      // Date ranges filters
      if (filterStartDate) {
        if (t.requestDate < filterStartDate) return false;
      }
      if (filterEndDate) {
        if (t.requestDate > filterEndDate) return false;
      }

      // Unit filter (sub-branches of Công ty Điện lực Hưng Yên)
      if (filterUnit !== 'Tất cả') {
        if (t.requestingUnit !== filterUnit) return false;
      }

      // Registration/Status filter
      if (filterRegistrationStatus !== 'Tất cả') {
        if (t.status !== filterRegistrationStatus) return false;
      }

      return true;
    });
  }, [tickets, roleMode, filterStatus, searchKeyword, filterStartDate, filterEndDate, filterUnit, filterRegistrationStatus]);

  const selectedTicket = useMemo(() => {
    const found = filteredTickets.find(t => t.id === selectedTicketId);
    return found || filteredTickets[0] || null;
  }, [filteredTickets, selectedTicketId]);

  // Handle standard buttons
  const handleOpenForm = (mode: 'add' | 'edit' | 'view' | 'approve', ticketToUse?: RegistrationTicket) => {
    if (mode === 'add') {
      const units = [
        'Điện lực Thành phố Hưng Yên',
        'Điện lực Mỹ Hào',
        'Điện lực Văn Lâm',
        'Điện lực Văn Giang',
        'Xưởng 110kV Hưng Yên'
      ];
      let activeLoc = 'Điện lực Thành phố Hưng Yên';
      if (devicePath) {
        for (const p of devicePath) {
          const match = units.find(u => p.includes(u) || u.includes(p));
          if (match) {
            activeLoc = match;
            break;
          }
        }
      }
      const nextNum = tickets.length + 1;
      const paddedNum = String(nextNum).padStart(3, '0');
      const nextId = `YCDK-2026-${paddedNum}`;
      setFormDocs([]);
      setFormOverlay({
        mode: 'add',
        data: {
          id: nextId,
          requestingUnit: activeLoc,
          requestDate: new Date().toISOString().split('T')[0],
          status: 'Dự thảo',
          notes: '',
          items: [],
          attachments: []
        }
      });
    } else {
      const target = ticketToUse || selectedTicket;
      if (!target) return;
      
      // Clone deeply to avoid modifying inline states directly
      const cloned = JSON.parse(JSON.stringify(target));
      
      // For approval mode, pre-fill approval entries nicely
      if (mode === 'approve') {
        cloned.items = cloned.items.map((it: any) => ({
          ...it,
          approvedQty: it.approvedQty !== undefined && it.approvedQty >= 0 ? it.approvedQty : it.proposedQty
        }));
        cloned.approvalComment = cloned.approvalComment || 'Đồng ý duyệt cấp thiết bị phục vụ ứng phó định mức sản xuất tối ưu.';
      }

      setFormOverlay({
        mode,
        data: cloned
      });
    }
  };

  // Remove individual tickets
  const handleDeleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
    triggerAlert('success', `Đã xóa phiếu đăng ký dự phòng ${id} thành công.`);
    setSelectedTicketId(null);
  };

  // Submit flow inside Form
  const handleSaveForm = (isSubmit: boolean) => {
    if (!formOverlay) return;
    const { mode, data } = formOverlay;
    
    if (data.items.length === 0) {
      triggerAlert('error', "Vui lòng chọn ít nhất 1 loại thiết bị dự phòng đăng ký.");
      return;
    }

    if (!data.notes.trim()) {
      triggerAlert('error', "Vui lòng nhập lý giải chi tiết nhu cầu cấp bách/giải trình.");
      return;
    }

    const updatedTicket: RegistrationTicket = {
      ...data,
      status: isSubmit ? 'Đăng ký' : 'Dự thảo',
      attachments: formDocs
    };

    setTickets(prev => {
      const exists = prev.some(t => t.id === updatedTicket.id);
      if (exists) {
        return prev.map(t => t.id === updatedTicket.id ? updatedTicket : t);
      } else {
        return [updatedTicket, ...prev];
      }
    });

    setFormOverlay(null);
    setSelectedTicketId(updatedTicket.id);
    
    if (isSubmit) {
      triggerAlert('success', `Đã gửi phê duyệt phiếu ${updatedTicket.id} thành công! Hệ thống đã kích hoạt email trình ký.`);
    } else {
      triggerAlert('success', `Đã lưu bản nháp phiếu ${updatedTicket.id} thành công.`);
    }
  };

  // Corporate decision processing
  const handleProcessDecision = (decision: 'Đã duyệt' | 'Không duyệt') => {
    if (!formOverlay) return;
    const { data } = formOverlay;

    const finalResult: RegistrationTicket = {
      ...data,
      status: decision,
      approver: 'Nguyễn Thanh Tùng (Phó Giám đốc Công ty Điện lực Hưng Yên)',
      approvalDate: new Date().toISOString().split('T')[0]
    };

    setTickets(prev => prev.map(t => t.id === finalResult.id ? finalResult : t));
    setFormOverlay(null);
    setSelectedTicketId(finalResult.id);
    triggerAlert('success', `Phê duyệt thành công! Trực tiếp gửi thông báo kết quả (${decision.toUpperCase()}) về đơn vị ${finalResult.requestingUnit} tức thời.`);
  };

  // Sub-items change logic
  const handleItemProposedChange = (itemId: string, val: string) => {
    if (!formOverlay) return;
    const qty = parseInt(val) || 1;
    setFormOverlay({
      ...formOverlay,
      data: {
        ...formOverlay.data,
        items: formOverlay.data.items.map(it => it.id === itemId ? { ...it, proposedQty: qty } : it)
      }
    });
  };

  const handleItemApprovedChange = (itemId: string, val: string) => {
    if (!formOverlay) return;
    const qty = parseInt(val) || 0;
    setFormOverlay({
      ...formOverlay,
      data: {
        ...formOverlay.data,
        items: formOverlay.data.items.map(it => it.id === itemId ? { ...it, approvedQty: qty } : it)
      }
    });
  };

  const handleRemoveDeviceFromForm = (itemId: string) => {
    if (!formOverlay) return;
    setFormOverlay({
      ...formOverlay,
      data: {
        ...formOverlay.data,
        items: formOverlay.data.items.filter(it => it.id !== itemId)
      }
    });
  };

  // Nested selection search filter catalog (filters out devices already selected to satisfy user requirement 4)
  const getDeviceVoltage = (item: { code: string; name: string }) => {
    if (item.code.includes('110') || item.name.includes('110kV')) return '110kV';
    if (item.code.includes('22') || item.name.includes('22kV')) return '22kV';
    if (item.code.includes('35') || item.name.includes('35kV')) return '35kV';
    return '22kV';
  };

  const getDeviceTypesByVoltage = (voltage: string) => {
    if (voltage === '110kV') {
      return ['Tất cả', 'Máy biến áp', 'Máy cắt SF6', 'Dao cách ly', 'Biến điện áp TU', 'Biến dòng điện TI', 'Chống sét van', 'Cuộn kháng'];
    } else if (voltage === '22kV') {
      return ['Tất cả', 'Tủ Recloser', 'Cầu chì tự rơi'];
    }
    return ['Tất cả', 'Máy biến áp', 'Máy cắt SF6', 'Dao cách ly', 'Biến điện áp TU', 'Biến dòng điện TI', 'Chống sét van', 'Tủ Recloser', 'Cầu chì tự rơi', 'Cuộn kháng'];
  };

  const filteredCatalogDevices = useMemo(() => {
    return DEVICE_CATALOG.filter(d => {
      if (formOverlay && formOverlay.data.items.some(it => it.id === d.id)) {
        return false;
      }
      const v = getDeviceVoltage(d);
      if (modalVoltageFilter !== 'Tất cả' && v !== modalVoltageFilter) {
        return false;
      }
      const deviceType = getDeviceType(d);
      if (modalTypeFilter !== 'Tất cả' && deviceType !== modalTypeFilter) return false;
      
      if (modalSearchKeyword.trim() !== '') {
        const kw = modalSearchKeyword.toLowerCase();
        return d.name.toLowerCase().includes(kw) || d.code.toLowerCase().includes(kw);
      }
      return true;
    });
  }, [modalSearchKeyword, modalVoltageFilter, modalTypeFilter, formOverlay?.data.items]);

  // Selection toggle checkbox
  const handleSelectModalDevice = (device: any, isSelected: boolean) => {
    if (!formOverlay) return;
    
    if (isSelected) {
      // Add if not present
      const alreadyHas = formOverlay.data.items.some(it => it.id === device.id);
      if (!alreadyHas) {
        const newItem: SpareItem = {
          ...device,
          proposedQty: device.runningQty,
          approvedQty: 0
        };
        setFormOverlay({
          ...formOverlay,
          data: {
            ...formOverlay.data,
            items: [...formOverlay.data.items, newItem]
          }
        });
      }
    } else {
      // Remove
      setFormOverlay({
        ...formOverlay,
        data: {
          ...formOverlay.data,
          items: formOverlay.data.items.filter(it => it.id !== device.id)
        }
      });
    }
  };

  const handleSelectAllModalDevices = (checked: boolean) => {
    if (!formOverlay) return;
    if (checked) {
      const currentSelectedIds = new Set(formOverlay.data.items.map(it => it.id));
      const itemsToAdd = filteredCatalogDevices
        .filter(device => !currentSelectedIds.has(device.id))
        .map(device => ({
          ...device,
          proposedQty: device.runningQty || 1,
          approvedQty: 0
        }));
      setFormOverlay({
        ...formOverlay,
        data: {
          ...formOverlay.data,
          items: [...formOverlay.data.items, ...itemsToAdd]
        }
      });
    } else {
      const filteredIds = new Set(filteredCatalogDevices.map(device => device.id));
      setFormOverlay({
        ...formOverlay,
        data: {
          ...formOverlay.data,
          items: formOverlay.data.items.filter(it => !filteredIds.has(it.id))
        }
      });
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Dự thảo': return 'bg-slate-50 text-slate-500 border-slate-200';
      case 'Đăng ký':
      case 'Đã đăng ký':
      case 'Chờ duyệt': return 'bg-amber-50 text-amber-600 border-amber-200/80';
      case 'Đã duyệt':
      case 'Duyệt': return 'bg-green-50 text-green-600 border border-green-200/80';
      case 'Không duyệt': return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'Xác nhận':
      case 'Đã xác nhận': return 'bg-orange-50 text-orange-600 border border-orange-200';
      default: return 'bg-[#f8fafc] text-slate-500 border-slate-200';
    }
  };

  // Render Full-Screen Form when formOverlay is active
  if (formOverlay) {
    const isEditOrAdd = formOverlay.mode === 'add' || formOverlay.mode === 'edit';
    const isApprove = formOverlay.mode === 'approve';
    const isView = formOverlay.mode === 'view';

    const handleCopyCurrentTicket = () => {
      const nextNum = tickets.length + 1;
      const paddedNum = String(nextNum).padStart(3, '0');
      const nextId = `YCDK-2026-${paddedNum}`;
      const copiedTicketList = formOverlay.data.items.map(it => ({
        ...it,
        approvedQty: undefined
      }));
      
      setFormOverlay({
        mode: 'edit',
        data: {
          id: nextId,
          requestingUnit: formOverlay.data.requestingUnit,
          requestDate: new Date().toISOString().split('T')[0],
          status: 'Dự thảo',
          notes: `[Sao chép] ${formOverlay.data.notes}`,
          items: copiedTicketList
        }
      });
      
      triggerAlert('success', 'Nhân bản đăng ký thành công (đặt ở trạng thái Sửa)!');
    };

    return (
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden text-[12pt] animate-in fade-in duration-200">
        {/* Form Header matching Yêu cầu thí nghiệm split view styling */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm text-left">
          <div className="flex items-center gap-4 text-left">
            <button 
              onClick={() => setFormOverlay(null)} 
              className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
              title="Quay lại danh sách"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col text-left">
              <h2 className="text-[12pt] font-semibold flex items-center gap-2 leading-tight">
                <span className="text-[#555555]">
                  {formOverlay.mode === 'add' ? 'Thêm mới' : formOverlay.mode === 'edit' ? 'Cập nhật' : formOverlay.mode === 'approve' ? 'Phê duyệt' : 'Chi tiết'}
                </span>
                <span className="font-bold text-[#164399]">
                  - Đăng ký thiết bị dự phòng
                </span>
                {formOverlay.mode !== 'add' && (
                  <span className="text-blue-600 font-extrabold">({formOverlay.data.id})</span>
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditOrAdd && (
              <>
                <button 
                  onClick={() => {
                    if (formOverlay.mode === 'add') {
                      setFormOverlay(null);
                    } else {
                      setFormOverlay({ ...formOverlay, mode: 'view' });
                    }
                  }}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-650 rounded-[10px] text-[10pt] font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                  Hủy
                </button>
                <button 
                  onClick={() => handleSaveForm(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-gray-200 rounded-[10px] text-[10pt] font-bold transition-all shadow-sm"
                >
                  Lưu nháp
                </button>
                <button 
                  onClick={() => handleSaveForm(true)}
                  className="px-4 py-2 bg-[#164399] hover:bg-blue-800 text-white rounded-[10px] text-[10pt] font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <Check className="w-4 h-4 font-black" />
                  Đăng ký
                </button>
              </>
            )}

            {isView && (
              <>
                <button 
                  onClick={handleCopyCurrentTicket}
                  className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-full transition-all flex items-center justify-center cursor-pointer border-none"
                  title="Sao chép"
                >
                  <Copy className="w-4.5 h-4.5" />
                </button>
                {(formOverlay.data.status === 'Dự thảo' || formOverlay.data.status === 'Không duyệt') && (
                  <button 
                    onClick={() => setFormOverlay({ 
                      ...formOverlay, 
                      mode: 'edit',
                      data: { ...formOverlay.data, status: 'Dự thảo' }
                    })}
                    className="p-2 text-blue-600 hover:text-blue-700 transition-all flex items-center justify-center cursor-pointer border-none bg-transparent"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                )}
                {formOverlay.data.status === 'Đăng ký' && (
                  <button 
                    onClick={() => setFormOverlay({ ...formOverlay, mode: 'approve' })}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[10px] text-[10pt] font-bold transition-all flex items-center gap-2 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Phê duyệt cấp thiết bị
                  </button>
                )}
              </>
            )}

            {isApprove && (
              <>
                <button 
                  onClick={() => setFormOverlay({ ...formOverlay, mode: 'view' })}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-500 rounded-[10px] text-[10pt] font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                  Quay lại
                </button>
                <button 
                  onClick={() => handleProcessDecision('Không duyệt')}
                  className="px-4 py-2 bg-rose-50 text-red-700 border border-rose-200 rounded-[10px] text-[10pt] font-bold hover:bg-rose-100 transition-all font-sans"
                >
                  Không duyệt
                </button>
                <button 
                  onClick={() => handleProcessDecision('Đã duyệt')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[10px] text-[10pt] font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 font-black" />
                  Duyệt
                </button>
              </>
            )}
          </div>
        </div>

        {/* Form Body - Split Grid Layout exactly matching Yêu cầu thí nghiệm */}
        <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30 text-left">
          <div className="flex-1 flex flex-col lg:flex-row gap-5 w-full mx-auto p-4 overflow-hidden items-stretch lg:px-5 max-w-full">
            
            {/* Column 1: Core Registration Info (Width 42% as requested) */}
            <div className="w-full lg:w-[42%] flex flex-col overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
                
                {/* Ticket code header styling */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-extrabold uppercase text-[8.5pt] tracking-widest">Mã phiếu:</span>
                    <span className="bg-red-50 text-red-700 rounded-lg px-2.5 py-1 font-mono font-bold text-[10pt]">
                      {formOverlay.data.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-extrabold uppercase text-[8.5pt] tracking-widest">Trạng thái duyệt:</span>
                    {getStatusBadge(formOverlay.data.status)}
                  </div>
                </div>

                {/* 1. Chọn Đơn vị (Đưa lên trước ghi chú) */}
                <div className="space-y-2">
                  <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest pl-1 block">Đơn vị đăng ký</label>
                  {isEditOrAdd ? (
                    <select
                      value={formOverlay.data.requestingUnit}
                      onChange={(e) => setFormOverlay({
                        ...formOverlay,
                        data: { ...formOverlay.data, requestingUnit: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 text-[11pt] font-bold text-gray-800 rounded-[12px] bg-white border border-gray-200 focus:border-[#164399] focus:ring-4 focus:ring-blue-50/20 shadow-sm cursor-pointer outline-none"
                    >
                      <option value="Điện lực Hưng Yên">Điện lực Hưng Yên</option>
                      <option value="Điện lực Thành phố Hưng Yên">Điện lực Thành phố Hưng Yên</option>
                      <option value="Điện lực Mỹ Hào">Điện lực Mỹ Hào</option>
                      <option value="Điện lực Văn Lâm">Điện lực Văn Lâm</option>
                      <option value="Điện lực Văn Giang">Điện lực Văn Giang</option>
                      <option value="Xưởng 110kV Hưng Yên">Xưởng 110kV Hưng Yên</option>
                    </select>
                  ) : (
                    <div className="w-full px-3.5 py-2.5 text-[11pt] font-bold rounded-[12px] bg-slate-50 border border-gray-100 text-gray-800">
                      {formOverlay.data.requestingUnit}
                    </div>
                  )}
                </div>

                {/* 2. Ngày và Ô người tạo (Dòng chọn Ngày và Ô người tạo) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest pl-1 block">Ngày đăng ký</label>
                    {isEditOrAdd ? (
                      <input
                        type="date"
                        value={formOverlay.data.requestDate}
                        onChange={(e) => setFormOverlay({
                          ...formOverlay,
                          data: { ...formOverlay.data, requestDate: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 text-[11pt] font-bold text-gray-800 rounded-[12px] bg-white border border-gray-200 focus:border-[#164399] focus:ring-4 focus:ring-blue-50/20 shadow-sm cursor-pointer outline-none"
                      />
                    ) : (
                      <div className="w-full px-3.5 py-2.5 text-[11pt] font-bold rounded-[12px] bg-slate-50 border border-gray-100 text-gray-800 font-mono">
                        {formOverlay.data.requestDate}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest pl-1 block">Người tạo</label>
                    <div className="w-full px-3.5 py-2.5 text-[11pt] font-bold rounded-[12px] bg-slate-50 border border-gray-100 text-[#164399]">
                      {getTicketUpdaterName(formOverlay.data)}
                    </div>
                  </div>
                </div>

                {/* 5. Ý kiến phê duyệt (Đưa lên trước Ghi chú) */}
                {(isApprove || formOverlay.data.approvalDate) && (
                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <h4 className="text-[10pt] font-black text-gray-700 flex items-center gap-2 pb-2 border-b border-indigo-100">
                      <CheckCircle2 className="w-5 h-5 text-indigo-650" /> Ý kiến lãnh đạo duyệt
                    </h4>
                    
                    {isApprove ? (
                      <div className="space-y-2">
                        <textarea 
                          value={formOverlay.data.approvalComment || ''}
                          onChange={(e) => setFormOverlay({
                            ...formOverlay,
                            data: { ...formOverlay.data, approvalComment: e.target.value }
                          })}
                          placeholder="Nhập thông tin chỉ đạo"
                          rows={3}
                          className="w-full p-3.5 rounded-[12px] text-[11pt] font-medium bg-white border border-indigo-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 shadow-inner outline-none leading-relaxed"
                        />
                      </div>
                    ) : (() => {
                      const appInfo = parseApprover(formOverlay.data.approver);
                      return (
                        <div className="space-y-4 text-left">
                          <div className="grid grid-cols-2 gap-4 text-[10pt] text-gray-500 font-bold font-sans">
                            <div>
                              <span className="text-[8.5pt] text-gray-400 uppercase block">Cán bộ phê duyệt</span>
                              <div className="flex flex-col">
                                <span className="text-gray-800 font-bold">{appInfo.name}</span>
                                {appInfo.title && (
                                  <span className="text-[8.5pt] text-gray-405 font-normal mt-0.5 leading-snug">{appInfo.title}</span>
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="text-[8.5pt] text-gray-400 uppercase block">Thời gian phê duyệt</span>
                              <span className="text-gray-800 font-black font-mono">{formOverlay.data.approvalDate}</span>
                            </div>
                          </div>
                          <div className="pt-2">
                            <span className="text-[8.5pt] text-gray-400 block uppercase font-sans">Nội dung chỉ đạo phê duyệt</span>
                            <p className="text-[10.5pt] font-normal text-slate-700 leading-relaxed not-italic">
                              {formOverlay.data.approvalComment || 'Đã duyệt trực tuyến qua PMIS.'}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 3. Cuối cùng là Nhập Ghi chú với Text màu đen và không in đậm */}
                <div className="space-y-2 pt-6 border-t border-gray-200">
                  <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest pl-1 block">Ghi chú</label>
                  {isEditOrAdd ? (
                    <textarea 
                      rows={4}
                      value={formOverlay.data.notes || ""} 
                      onChange={(e) => setFormOverlay({ ...formOverlay, data: { ...formOverlay.data, notes: e.target.value } })}
                      placeholder="Nhập ghi chú chi tiết về nhu cầu đăng ký thiết bị dự phòng..."
                      className="w-full px-3.5 py-2.5 text-[11pt] font-normal text-black bg-white border border-gray-200 rounded-[12px] focus:border-[#164399] focus:ring-4 focus:ring-blue-50/20 transition-all outline-none resize-none leading-relaxed"
                    />
                  ) : (
                    <div className="w-full px-3.5 py-2.5 text-[11pt] font-normal text-black bg-slate-50 border border-gray-100 rounded-[12px] min-h-[100px] whitespace-pre-line leading-relaxed pb-3">
                      {formOverlay.data.notes || "Không có ghi chú nào."}
                    </div>
                  )}
                </div>

                {/* 4. Tài liệu đính kèm (cho chung vào khung thông tin chung) */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <label className="text-[10pt] font-black text-gray-400 uppercase tracking-widest pl-1 block flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#164399]" /> Tài liệu đính kèm
                    </label>
                    {isEditOrAdd && (
                      <button
                        type="button"
                        onClick={() => {
                          setLibrarySearchKeyword('');
                          setShowLibraryModal(true);
                        }}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-[10px] font-black text-[8.5pt] hover:bg-blue-100 transition-all flex items-center gap-1 shadow-sm border-none cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Từ Thư Viện
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {formDocs.map((file, fIdx) => (
                      <div key={fIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-slate-100/50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm border border-slate-100">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <p 
                              onClick={() => {
                                setPreviewingFile(file);
                              }}
                              className="text-[10.5pt] font-bold text-[#164399] hover:underline cursor-pointer leading-tight text-left break-all"
                            >
                              {file.name}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{file.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {isEditOrAdd && (
                            <button 
                              type="button"
                              onClick={() => {
                                setFormDocs(prev => prev.filter((_, i) => i !== fIdx));
                                triggerAlert('info', `Đã xóa tài liệu đính kèm: ${file.name}`);
                              }}
                              className="p-1.5 text-red-500 hover:text-red-700 bg-red-50/50 hover:bg-red-100/50 border border-red-150 rounded-xl transition-colors cursor-pointer"
                              title="Xóa tài liệu"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {formDocs.length === 0 && (
                      <span className="text-[9.5pt] font-extrabold text-gray-400 italic block py-2 text-center">Chưa có tài liệu đính kèm nào</span>
                    )}
                    
                    {isEditOrAdd && (
                      <FileUploader 
                        type="document" 
                        mode={formOverlay.mode} 
                        onFileSelect={(files) => {
                          const newFiles = Array.from(files).map(f => ({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` }));
                          setFormDocs(prev => [...prev, ...newFiles]);
                          triggerAlert('success', `Đã tải lên ${newFiles.length} tệp tài liệu.`);
                        }} 
                      />
                    )}
                  </div>
                </div>

              </div>
            </div>

              {/* Column 2: Selected spare materials bento cards (Width 58%) */}
              <div className="w-full lg:w-[58%] flex flex-col overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex-1 flex flex-col overflow-hidden p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                      <Database className="w-5 h-5 text-[#164399]" /> DANH SÁCH THIẾT BỊ ĐĂNG KÝ ({(formOverlay.data.items || []).length})
                    </h4>
                    {isEditOrAdd && (
                      <button 
                        onClick={() => {
                          setModalSearchKeyword('');
                          setShowDeviceModal(true);
                        }}
                        className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-[10px] font-black text-[9pt] hover:bg-blue-100 transition-all flex items-center gap-1 shadow-sm border-none cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> THÊM
                      </button>
                    )}
                  </div>

                  {/* Device table listing for extreme compactness and easy input - dynamically stretched */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 border border-gray-100 rounded-lg">
                  {(formOverlay.data.items || []).length > 0 ? (
                    <table className="w-full text-left border-collapse text-[9.5pt]">
                      <thead className="sticky top-0 z-20 shadow-sm bg-[#f0f4fa]">
                        <tr className="bg-[#ecf2fa] border-b border-[#164399]/10 text-[#164399] font-extrabold uppercase tracking-wider text-[8pt] font-sans">
                          <th className="py-2.5 px-3 w-12 text-center bg-[#ecf2fa]">STT</th>
                          <th className="py-2.5 px-3 bg-[#ecf2fa]">Thông tin thiết bị</th>
                          <th className="py-2.5 px-3 text-center w-20 bg-[#ecf2fa]">SLVH</th>
                          <th className="py-2.5 px-3 text-center w-28 bg-[#ecf2fa]">SL Đề xuất</th>
                          {(isApprove || formOverlay.data.approvalDate) && (
                            <th className="py-2.5 px-3 text-center w-28 bg-[#ecf2fa]">Duyệt cấp</th>
                          )}
                          {isEditOrAdd && (
                            <th className="py-2.5 px-3 text-center w-12 bg-[#ecf2fa]">Xóa</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-bold text-slate-700">
                        {(formOverlay.data.items || []).map((it, idx) => (
                          <tr key={it.id || idx} className="group hover:bg-slate-50/50 transition-all">
                            {/* STT */}
                            <td className="py-3 px-3 text-center text-gray-400 font-mono text-[9pt]">{idx + 1}</td>

                            {/* Thông tin thiết bị */}
                            <td className="py-2.5 px-3">
                              <div className="flex flex-col text-left">
                                {/* Cấp điện áp, Loại thiết bị, Mã thiết bị (Màu xám nhạt và cỡ chữ nhỏ) */}
                                <div className="flex items-center gap-1.5 text-[8.5pt] text-gray-400 font-normal">
                                  <span>{getDeviceVoltage(it)}</span>
                                  <span className="text-gray-300">•</span>
                                  <span>{getDeviceType(it)}</span>
                                  <span className="text-gray-300">•</span>
                                  <span className="font-mono">{it.code}</span>
                                </div>
                                {/* Tên thiết bị màu Xám đậm, khi lướt chuột thì màu xanh Blue cơ bản */}
                                <span className="text-[10pt] font-medium text-slate-700 leading-snug mt-1 transition-all duration-155 group-hover:font-extrabold group-hover:text-blue-500 block">
                                  {it.name}
                                </span>
                              </div>
                            </td>

                            {/* SLVH */}
                            <td className="py-2 px-3 text-center bg-blue-50/20 font-mono text-blue-700 text-[10pt] font-black">
                              {it.runningQty}
                            </td>

                            {/* SL Đề xuất */}
                            <td className="py-2 px-3 text-center bg-amber-50/20">
                              {isEditOrAdd ? (
                                <div className="flex items-center justify-center gap-1 bg-white border border-amber-200 focus-within:border-amber-400 rounded-lg p-1 shadow-sm max-w-[105px] mx-auto transition-all">
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      const nextVal = Math.max(1, it.proposedQty - 1);
                                      handleItemProposedChange(it.id, String(nextVal));
                                    }}
                                    className="w-6 h-6 flex items-center justify-center rounded bg-amber-50 text-amber-800 hover:bg-amber-100/80 text-[10pt] font-extrabold transition-colors cursor-pointer select-none"
                                  >
                                    -
                                  </button>
                                  <input 
                                    id={`proposed-qty-input-${idx}`}
                                    type="number"
                                    min="1"
                                    value={it.proposedQty}
                                    onChange={(e) => handleItemProposedChange(it.id, e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'ArrowUp') {
                                        e.preventDefault();
                                        const prev = document.getElementById(`proposed-qty-input-${idx - 1}`) as HTMLInputElement;
                                        if (prev) { prev.focus(); prev.select(); }
                                      } else if (e.key === 'ArrowDown') {
                                        e.preventDefault();
                                        const next = document.getElementById(`proposed-qty-input-${idx + 1}`) as HTMLInputElement;
                                        if (next) { next.focus(); next.select(); }
                                      }
                                    }}
                                    className="w-10 h-6 text-center font-mono font-black text-amber-800 bg-transparent border-none outline-none p-0 focus:bg-amber-50/30 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[11.5pt] cursor-text"
                                  />
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      const nextVal = it.proposedQty + 1;
                                      handleItemProposedChange(it.id, String(nextVal));
                                    }}
                                    className="w-6 h-6 flex items-center justify-center rounded bg-amber-50 text-amber-800 hover:bg-amber-100/80 text-[10pt] font-extrabold transition-colors cursor-pointer select-none"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <span className="font-mono text-amber-700 text-[10.5pt] font-black">{it.proposedQty}</span>
                              )}
                            </td>

                            {/* Duyệt cấp */}
                            {(isApprove || formOverlay.data.approvalDate) && (
                              <td className="py-2 px-3 text-center bg-emerald-50/20">
                                {isApprove ? (
                                  <div className="flex items-center justify-center gap-1 bg-white border border-emerald-200 rounded-lg p-0.5 shadow-sm max-w-[85px] mx-auto">
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const currentVal = it.approvedQty !== undefined ? it.approvedQty : it.proposedQty;
                                        const nextVal = Math.max(0, currentVal - 1);
                                        handleItemApprovedChange(it.id, String(nextVal));
                                      }}
                                      className="w-5 h-5 flex items-center justify-center rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[9pt] font-extrabold transition-colors cursor-pointer select-none"
                                    >
                                      -
                                    </button>
                                    <input 
                                      type="number"
                                      min="0"
                                      value={it.approvedQty !== undefined ? it.approvedQty : it.proposedQty}
                                      onChange={(e) => handleItemApprovedChange(it.id, e.target.value)}
                                      className="w-7 h-5 text-center font-mono font-black text-emerald-700 bg-transparent border-none outline-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[9.5pt]"
                                    />
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const currentVal = it.approvedQty !== undefined ? it.approvedQty : it.proposedQty;
                                        const nextVal = currentVal + 1;
                                        handleItemApprovedChange(it.id, String(nextVal));
                                      }}
                                      className="w-5 h-5 flex items-center justify-center rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[9pt] font-extrabold transition-colors cursor-pointer select-none"
                                    >
                                      +
                                    </button>
                                  </div>
                                ) : (
                                  <span className="font-mono text-emerald-700 text-[10pt] font-black">
                                    {it.approvedQty !== undefined ? it.approvedQty : it.proposedQty}
                                  </span>
                                )}
                              </td>
                            )}

                            {/* Xóa */}
                            {isEditOrAdd && (
                              <td className="py-2 px-3 text-center">
                                <button 
                                  onClick={() => handleRemoveDeviceFromForm(it.id)}
                                  className="p-1 px-1.5 hover:bg-red-50 text-red-650 hover:text-red-750 bg-red-50/50 hover:bg-red-100/50 border border-red-100 transition-colors rounded-full cursor-pointer"
                                  title="Loại bỏ thiết bị"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400 bg-slate-50/10">
                      <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <span className="text-[10pt] font-black uppercase text-slate-500 block">Chưa đăng ký thiết bị nào</span>
                      <p className="text-[8.5pt] text-gray-400 mt-1">Bấm vào nút "THÊM" để bổ sung vật tư định mức cần dự phòng khẩn cấp</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* HIGH-FIDELITY 2-COLUMN DEVICE SELECTION POPUP */}
        {showDeviceModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-6xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
              
              {/* Header section with active unit/branch breadcrumbs */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-blue-50/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#164399] text-white rounded-lg animate-none shrink-0">
                    <Plus className="w-5 h-5 font-black" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[14pt] font-black text-gray-700 leading-tight">Chọn THIẾT BỊ</h3>
                  </div>
                </div>
                <button onClick={() => setShowDeviceModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Main content split panel */}
              <div className="flex-1 flex overflow-hidden min-h-0 bg-white">
                
                {/* Left Column: available to select (65%) */}
                <div className="flex-1 flex flex-col ">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      {/* Shortened Voltage Filter Dropdown */}
                      <div className="w-[140px] relative text-left shrink-0">
                        <select
                          value={modalVoltageFilter}
                          onChange={(e) => {
                            setModalVoltageFilter(e.target.value);
                            setModalTypeFilter('Tất cả');
                          }}
                          className="w-full bg-white border border-gray-200 text-[10pt] font-semibold text-gray-700 h-10 px-3 pr-8 rounded-[10px] shadow-sm focus:ring-1 focus:ring-blue-500/10 focus:border-[#164399] outline-none appearance-none cursor-pointer"
                        >
                          <option value="Tất cả">Cấp điện áp: Tất cả</option>
                          <option value="110kV">110kV</option>
                          <option value="35kV">35kV</option>
                          <option value="22kV">22kV</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 w-6 flex items-center justify-center text-gray-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Device Type Filter Dropdown */}
                      <div className="w-[180px] relative text-left shrink-0">
                        <select
                          value={modalTypeFilter}
                          onChange={(e) => setModalTypeFilter(e.target.value)}
                          className="w-full bg-white border border-gray-200 text-[10pt] font-semibold text-gray-700 h-10 px-3 pr-8 rounded-[10px] shadow-sm focus:ring-1 focus:ring-blue-500/10 focus:border-[#164399] outline-none appearance-none cursor-pointer"
                        >
                          {getDeviceTypesByVoltage(modalVoltageFilter).map((typeOpt) => (
                            <option key={typeOpt} value={typeOpt}>
                              {typeOpt === 'Tất cả' ? 'Loại thiết bị: Tất cả' : typeOpt}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 w-6 flex items-center justify-center text-gray-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Fast search keyword textbox taking rest of space */}
                      <div className="flex-1 relative">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input 
                          type="text" 
                          placeholder="Tìm nhanh theo mã VTTB, tên thiết bị..." 
                          value={modalSearchKeyword}
                          onChange={(e) => setModalSearchKeyword(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 h-10 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-medium outline-none placeholder:text-gray-400 shadow-sm focus:ring-1 focus:ring-blue-500/15 focus:border-blue-600 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Left Available Table rows selection */}
                  <div className="flex-1 overflow-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-[#ecf2fa] text-[#164399] text-[9pt] font-black uppercase tracking-wider sticky top-0 z-10 border-b border-[#164399]/10">
                        <tr>
                          <th className="px-6 py-3 w-16 text-center bg-[#ecf2fa] select-none">
                            <label className="flex items-center justify-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="rounded text-[#164399] focus:ring-[#164399] cursor-pointer" 
                                checked={filteredCatalogDevices.length > 0 && filteredCatalogDevices.every(device => formOverlay && formOverlay.data.items.some(it => it.id === device.id))}
                                onChange={(e) => handleSelectAllModalDevices(e.target.checked)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </label>
                          </th>
                          <th className="px-4 py-3 bg-[#ecf2fa]">Thông tin thiết bị</th>
                          <th className="px-4 py-3 text-center bg-[#ecf2fa] w-28">SL Vận hành</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredCatalogDevices.map(device => {
                          const isChecked = formOverlay.data.items.some(it => it.id === device.id);
                          return (
                            <tr 
                              key={device.id}
                              className={`group transition-all cursor-pointer ${
                                isChecked 
                                  ? 'bg-blue-50/70 border-l-4 border-l-[#164399]/85 text-[#164399] font-bold shadow-xs' 
                                  : 'hover:bg-slate-50/50 border-l-4 border-l-transparent'
                              }`}
                              onClick={() => handleSelectModalDevice(device, !isChecked)}
                            >
                              <td className="px-6 py-4 text-center">
                                <input 
                                  type="checkbox" 
                                  className="rounded text-[#164399] focus:ring-[#164399]" 
                                  checked={isChecked} 
                                  onChange={() => {}} 
                                />
                              </td>
                              <td className="px-4 py-3 text-left animate-none">
                                 {/* 8pt gray layout for code and types metadata */}
                                 <div className="flex flex-wrap items-center gap-1.5 text-[8pt] text-gray-400 font-medium select-none">
                                    <span>{getDeviceVoltage(device)}</span>
                                    <span className="text-gray-355 font-normal select-none">•</span>
                                    <span>{getDeviceType(device)}</span>
                                    <span className="text-gray-355 font-normal select-none">•</span>
                                    <span className="font-mono text-gray-405">PMIS-{device.code}</span>
                                 </div>
                                 {/* Tên viết không in đậm 10pt, lướt chuột thì in đậm và Blue cơ bản */}
                                 <p className="text-[10pt] font-normal text-slate-705 leading-snug mt-1 transition-all duration-150 group-hover:font-extrabold group-hover:text-blue-600">
                                    {device.name}
                                 </p>
                              </td>
                              {/* Cột SL Vận hành: khi lướt chuột thì tăng kích cỡ chữ 2pt và có màu Green */}
                              <td className="px-4 py-3 text-center font-mono font-black text-[10pt] text-slate-500 group-hover:text-[12pt] group-hover:text-emerald-600 transition-all duration-150 select-none">
                                 {device.runningQty}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Column: Selected list display (40%) */}
                <div className="w-[40%] flex flex-col bg-gray-50/50 border-l border-gray-100 text-left">
                  <div className="px-6 py-4 bg-[#f0f4fa] border-b border-gray-100 flex items-center justify-between shrink-0">
                     <h4 className="text-[11pt] font-black text-gray-700 uppercase tracking-widest">Đã chọn ({formOverlay.data.items.length})</h4>
                     <button 
                       onClick={() => {
                         setFormOverlay({
                           ...formOverlay,
                           data: { ...formOverlay.data, items: [] }
                         });
                       }} 
                       className="text-[10pt] font-bold text-red-500 hover:underline cursor-pointer border-none bg-transparent"
                     >
                       Xóa tất cả
                     </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
                     {formOverlay.data.items.map(dev => (
                       <div key={dev.id} className="p-3 bg-white rounded-lg border border-gray-150 shadow-sm flex items-center justify-between group transition-all duration-150 hover:border-blue-200 hover:bg-slate-50/50 animate-in slide-in-from-right-2">
                          <div className="flex items-center gap-3">
                             <div className="flex flex-col text-left">
                                {/* Match Available design exactly: 8pt gray block metadata */}
                                <div className="flex flex-wrap items-center gap-1.5 text-[8pt] text-gray-400 font-medium select-none">
                                   <span>{getDeviceVoltage(dev)}</span>
                                   <span className="text-gray-300 font-normal select-none">•</span>
                                   <span>{getDeviceType(dev)}</span>
                                   <span className="text-gray-300 font-normal select-none">•</span>
                                   <span className="font-mono text-gray-444 font-semibold">PMIS-{dev.code}</span>
                                </div>
                                {/* Match Available design exactly: 10pt normal name, bold blue on hover */}
                                <p className="text-[10pt] font-normal text-slate-705 leading-snug mt-1 transition-all duration-150 group-hover:font-extrabold group-hover:text-blue-600 whitespace-normal break-words">
                                  {dev.name}
                                </p>
                             </div>
                          </div>
                          <button 
                            onClick={() => handleSelectModalDevice(dev, false)}
                            className="p-1.5 text-red-500 hover:text-red-750 hover:bg-red-50 rounded-xl transition-all flex-none shrink-0 border-none bg-transparent cursor-pointer"
                          >
                             <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                       </div>
                     ))}
                     {formOverlay.data.items.length === 0 && (
                        <div className="p-10 text-center text-gray-300 italic flex flex-col items-center justify-center h-full opacity-50">
                           <Plus className="w-8 h-8 mb-2" />
                           Chọn thiết bị từ danh sách cột bên trái
                        </div>
                     )}
                  </div>
                </div>

              </div>

              {/* Bottom confirmation actions */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <span className="text-[11pt] text-gray-500 font-bold">
                  Tổng số cấp thiết bị đăng ký: <span className="text-[#164399] font-black">{formOverlay.data.items.length}</span>
                </span>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowDeviceModal(false)}
                    className="px-5 py-2.5 bg-white border border-gray-100 rounded-lg font-bold text-[10pt] hover:bg-gray-50 text-gray-605 transition-all font-sans"
                  >
                    Hủy
                  </button>
                  <button 
                    onClick={() => setShowDeviceModal(false)}
                    className="px-6 py-2.5 bg-[#164399] hover:bg-blue-800 text-white rounded-lg font-bold text-[10pt] transition-all"
                  >
                    Xong
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Reusable SYSTEM REFERENCE LIBRARY POPUP IN DETAIL VIEW */}
        <DocumentLibraryModal
          isOpen={showLibraryModal}
          onClose={() => setShowLibraryModal(false)}
          selectedIds={formDocs.map(fd => fd.name)}
          customDocumentsPool={[
            { id: 'DP1', name: 'Quy_trinh_kiem_tra_van_hanh_may_bien_ap_evn.pdf', category: 'evn', type: 'Quy trình EVN', size: '2.4 MB', code: 'EVN-QT-01', desc: 'Quy trình phối hợp vận hành máy biến áp lực của EVN' },
            { id: 'DP2', name: 'Huong_dan_bao_tri_may_cat_ABB_SF6_110kV.pdf', category: 'nsx', type: 'Sách HD NSX', size: '4.1 MB', code: 'ABB-SF6', desc: 'Sách hướng dẫn bảo dưỡng dòng máy cắt khí SF6 ABB' },
            { id: 'DP3', name: 'Tieu_chuan_thiet_ke_va_lap_dat_luoi_dien_110kV.pdf', category: 'standard', type: 'Tiêu chuẩn', size: '5.2 MB', code: 'TCVN-110kV', desc: 'Tiêu chuẩn quốc gia về lắp đặt trạm phân phối cao áp' },
            { id: 'DP4', name: 'Datasheet_va_catalogue_dao_cach_ly_SIEMENS.pdf', category: 'nsx', type: 'Bản vẽ & NSX', size: '1.8 MB', code: 'SIE-DCL', desc: 'Thông số kỹ thuật dòng dao cách ly Siemens chính hãng' },
            { id: 'DP5', name: 'Quy_chuan_ky_thuan_quoc_gia_an_toan_dien.pdf', category: 'standard', type: 'Tiêu chuẩn', size: '3.6 MB', code: 'QCVN-2020', desc: 'Quy chuẩn an toàn quốc gia khi thao tác luồng điện lớn' },
            { id: 'DP6', name: 'Bien_ban_kiem_dinh_chat_luong_dau_may_bien_ap.docx', category: 'template', type: 'Mẫu biên bản', size: '450 KB', code: 'BM-DK-DAU', desc: 'Mẫu văn bản thử nghiệm độ chịu lực và điện học của dầu' },
            { id: 'DP7', name: 'Quy_trinh_xu_ly_su_co_luoi_truyen_tai_quoc_gia.pdf', category: 'evn', type: 'Quy trình EVN', size: '1.2 MB', code: 'EVN-SUTAI', desc: 'Quy chế khắc phục sự cố khẩn cấp trên hệ thống truyền tải' }
          ]}
          onToggleDoc={(doc) => {
            const isAttached = formDocs.some(fd => fd.name === doc.name);
            if (isAttached) {
              setFormDocs(prev => prev.filter(fd => fd.name !== doc.name));
              triggerAlert('info', `Đã gỡ tài liệu khỏi phiếu: ${doc.name}`);
            } else {
              setFormDocs(prev => [...prev, { name: doc.name, size: doc.size }]);
              triggerAlert('success', `Đã đính kèm tài liệu: ${doc.name}`);
            }
          }}
        />

        {/* HIGH-FIDELITY DOCUMENT PREVIEW MODAL */}
        {previewingFile && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 animate-in fade-in duration-200 text-left">
            <div className="relative w-full max-w-4xl h-[85vh] bg-slate-100 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
              
              {/* Modal Header */}
              <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#164399] flex items-center justify-center shrink-0 border border-blue-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[7.5pt] font-black text-gray-700 uppercase tracking-widest block">Chi tiết tài liệu hồ sơ</span>
                    <span className="text-[11pt] font-black text-slate-800 tracking-tight block">{previewingFile.name} ({previewingFile.size})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDownloadFile(previewingFile.name)}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg text-[8.5pt] font-bold flex items-center gap-1.5 shadow-sm border-none cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Tải về máy
                  </button>
                  <button 
                    onClick={() => setPreviewingFile(null)}
                    className="p-2 hover:bg-slate-150 text-slate-400 hover:text-slate-700 transition-colors rounded-xl border-none cursor-pointer bg-transparent"
                    title="Đóng bản xem thử"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Document body viewport matching real content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center bg-slate-200">
                {previewingFile.name.endsWith('.pdf') ? (
                  /* PDF Canvas simulator mimicking EVN official stamp paper */
                  <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-300 min-h-[900px] flex flex-col justify-between font-serif relative text-slate-850 select-none text-[11pt] leading-normal">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex justify-between items-start text-center text-[10pt] font-bold font-sans">
                        <div>
                          <p className="uppercase tracking-tight text-gray-700 text-[8.5pt]">TỔNG CÔNG TY ĐIỆN LỰC MIỀN BẮC</p>
                          <p className="uppercase tracking-tight text-gray-700 underline text-[9.5pt]">CÔNG TY ĐIỆN LỰC HƯNG YÊN</p>
                          <p className="text-[8pt] text-gray-400 font-normal mt-1 italic">Số: 284/QĐ-PCHY-VT</p>
                        </div>
                        <div>
                          <p className="uppercase tracking-tight text-gray-700 text-[8.5pt]">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                          <p className="font-bold underline text-gray-800 text-[10.5pt]">Độc lập - Tự do - Hạnh phúc</p>
                          <p className="text-[8.5pt] text-gray-400 font-normal mt-1 italic">Hưng Yên, ngày 18 tháng 02 năm 2026</p>
                        </div>
                      </div>

                      {/* Stamp decoration */}
                      <div className="absolute right-16 top-48 w-24 h-24 rounded-2xl border-4 border-red-600/35 flex items-center justify-center rotate-12 select-none pointer-events-none">
                        <span className="text-red-600/40 font-bold uppercase text-[6pt] text-center tracking-tight leading-3 font-sans">
                          PC HƯNG YÊN<br />★<br />ĐÃ KIỂM DUYỆT
                        </span>
                      </div>

                      {/* Title */}
                      <div className="text-center pt-8 space-y-2">
                        <h2 className="text-[14pt] font-extrabold uppercase tracking-tight text-gray-700 font-sans">KẾ HOẠCH DỰ PHÒNG THIẾT BỊ KHẨN CẤP</h2>
                        <p className="text-[10pt] text-gray-600 italic font-sans">(Phục vụ công tác cấp bão, chống sét và liên thông kho tài sản EVNNPC năm 2026)</p>
                      </div>

                      {/* Content section */}
                      <div className="space-y-4 pt-4 text-justify font-sans text-gray-800 text-[9.5pt]">
                        <p className="indent-8 font-semibold">Căn cứ Quyết định số 1492/QĐ-EVNNPC của Tổng công ty Điện lực Miền Bắc ban hành về quy chế quản lý vật tư dự trữ định mức sự cố lưới điện truyền tải và trung hạ thế khu vực.</p>
                        <p className="indent-8">Xét đề xuất của Phòng Vật tư - Thiết bị Công ty Điện lực Hưng Yên và Ban Quản lý Xưởng 110kV nhằm đảm bảo vận hành liên tục hệ thống truyền tải, thay thế nhanh sắm mới lắp đặt chống sét van, cuộn kháng và máy cắt SF6 bị sự cố suy giảm cách điện.</p>
                        
                        <div className="p-4 bg-slate-50/50 rounded-2xl border border-dashed border-gray-200 mt-4 space-y-3 font-sans">
                          <h4 className="font-bold text-gray-700 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#164399]" /> MỤC TIÊU & CHỈ TIÊU KỸ THUẬT:</h4>
                          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[9pt]">
                            <li>Ưu tiên tối ưu hóa định mức luân chuyển tại chỗ cho năm chi nhánh Điện lực trực thuộc.</li>
                            <li>Dự trữ khẩn cấp bù 15 tủ hạ thế, 4 bộ máy cắt dầu SF6, chống sét van 35kV thông số lắp đặt đồng bộ.</li>
                            <li>Nghiêm cấm lãng phí phân bổ sai lệch nhu cầu của các Điện lực khu vực.</li>
                          </ul>
                        </div>

                        <p className="indent-8">Lãnh đạo các đơn vị trực thuộc có trách nhiệm rà soát kiểm thử chất lượng trước khi nhận bàn giao kỹ thuật từ kho trung tâm...</p>
                      </div>
                    </div>

                    {/* Signatures */}
                    <div className="grid grid-cols-2 text-center text-[10pt] pt-12 font-sans font-medium text-gray-850">
                      <div>
                        <p className="font-bold text-gray-400 uppercase text-[8.5pt]">NƠI NHẬN</p>
                        <ul className="text-left text-[8pt] text-gray-500 pl-8 list-none mt-2 space-y-1 italic">
                          <li>- Như Điều 3;</li>
                          <li>- EVNNPC (báo cáo);</li>
                          <li>- Lưu hồ sơ VP, VT.</li>
                        </ul>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="font-bold uppercase tracking-wide">GIÁM ĐỐC CÔNG TY</p>
                        <p className="text-[8pt] text-gray-400 italic mt-1">(Đã phê ký điện tử qua hệ thống PMIS eVN)</p>
                        <div className="h-16"></div>
                        <p className="font-bold text-[#164399] uppercase text-[10.5pt] tracking-tight">Nguyễn Danh Duyên</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Excel spreadsheet viewport mockup styled with lines and cell inputs */
                  <div className="w-full bg-white rounded-lg shadow-lg border border-slate-300 overflow-hidden flex flex-col font-mono text-[8pt] text-slate-800 animate-in zoom-in-95">
                    <div className="bg-slate-100 border-b border-gray-200 p-2 text-slate-400 font-sans font-bold flex items-center gap-2">
                      <span className="text-gray-700 bg-emerald-600 text-white rounded px-2.5 py-0.5 text-[7pt] uppercase tracking-wider font-extrabold flex items-center gap-1">Sheets Simulator</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-slate-650 truncate max-w-xs">{previewingFile.name} (Bảng 1 - Phân tích định mức)</span>
                    </div>
                    
                    {/* Grid layout Excel columns */}
                    <div className="flex-1 overflow-auto max-h-[60vh]">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#f0f4fa] text-[#164399] font-extrabold text-center border-b border-[#164399]/10 select-none">
                            <th className="p-1 px-2 border-r border-gray-200 bg-[#f0f4fa] w-8"></th>
                            <th className="p-1.5 border-r border-[#cbd5e1] text-left uppercase tracking-wider min-w-[120px]">Mã PMIS</th>
                            <th className="p-1.5 border-r border-[#cbd5e1] text-left uppercase tracking-wider min-w-[280px]">Mô tả chi tiết hạng mục</th>
                            <th className="p-1.5 border-r border-[#cbd5e1] uppercase tracking-wider w-24">SLVH (Bộ)</th>
                            <th className="p-1.5 border-r border-[#cbd5e1] uppercase tracking-wider w-24">Định mức</th>
                            <th className="p-1.5 border-r border-[#cbd5e1] uppercase tracking-wider w-24">Đề xuất cấp</th>
                            <th className="p-1.5 uppercase tracking-wider w-28 bg-emerald-50/20 text-[#164399]">Trọng số ưu tiên</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 text-[8.5pt]">
                          {[
                            { code: 'FCO-35kV', name: 'Cầu chì tự rơi FCO 35kV polymer chịu tải 100A', running: 12, norm: 15, proposed: 3, priority: 'Rất cao (Sự cố)' },
                            { code: 'CSV-35kV', name: 'Chống sét van 35kV cấp khí bảo vệ lưới ngoài trời', running: 45, norm: 50, proposed: 5, priority: 'Cao' },
                            { code: 'MC-SF6-110', name: 'Máy cắt dầu SF6 cách điện rắn thương hiệu Siemens', running: 4, norm: 4, proposed: 0, priority: 'Trung bình' },
                            { code: 'MC-110-AL', name: 'Cuộn kháng san điện áp 110kV lõi dầu kín', running: 1, norm: 2, proposed: 1, priority: 'Cao (Nhập khẩu)' },
                            { code: 'THT-250', name: 'Tủ hạ thế đo đếm ngoài trời đồng bộ áp-tô-mát 250A', running: 8, norm: 12, proposed: 4, priority: 'Trung bình' },
                            { code: 'MBA-110-100', name: 'Máy biến áp phân phối Amorphous tiết kiệm điện 100kVA', running: 6, norm: 8, proposed: 2, priority: 'Khẩn cấp' }
                          ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 text-left">
                              <td className="p-1 text-center bg-slate-50 text-gray-400 font-sans text-[7.5pt] select-none font-bold">{idx + 1}</td>
                              <td className="p-2 font-semibold text-red-600">{row.code}</td>
                              <td className="p-2 text-slate-800 font-sans font-semibold truncate max-w-sm" title={row.name}>{row.name}</td>
                              <td className="p-2 text-center font-bold text-blue-600 bg-blue-50/5 font-mono">{row.running}</td>
                              <td className="p-2 text-center font-mono text-gray-500">{row.norm}</td>
                              <td className="p-2 text-center font-bold text-amber-700 bg-amber-50/10 font-mono">{row.proposed}</td>
                              <td className="p-2 text-center text-emerald-800 font-extrabold bg-emerald-50/10 font-sans text-[8pt]">{row.priority}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-slate-50 p-2.5 border-t border-gray-200 text-gray-400 text-left font-sans text-[7.5pt] font-semibold">
                      * Ghi chú: Dữ liệu phân tích tự động kéo trực từ cơ sở dữ liệu định mức sự cố lưới điện Hưng Yên.
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-end shrink-0">
                <button 
                  onClick={() => setPreviewingFile(null)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-bold text-[9pt] uppercase tracking-wide cursor-pointer transition-colors border-none"
                >
                  Đóng
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden text-[12pt]">
      
      {/* 1. Header with exact requested layout and structure */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {setActiveSubMenu && (
              <button onClick={() => setActiveSubMenu(null)} className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <div className="flex flex-col">
              <h2 className="text-[12pt] font-semibold flex items-center gap-2 leading-[1.5]">
                <span className="text-[#555555]">Thiết bị</span>
                <span className="font-bold text-[#164399]">- Danh sách đăng ký thiết bị dự phòng</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter Toggle Button */}
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-all cursor-pointer shrink-0 ${showFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
            >
              <Filter className="w-5 h-5" />
            </button>

            {/* Switch box formatted strictly with rounded-50% pill style containing "Tất cả" vs "Chờ duyệt" */}
            <div className="flex bg-gray-100 border border-gray-200 rounded-full shadow-inner h-10 w-fit font-bold select-none shrink-0 items-center overflow-hidden">
              <button 
                type="button"
                onClick={() => setFilterStatus('Tất cả')}
                className={`h-full px-5 text-[8.5pt] font-black tracking-wider transition-all uppercase flex items-center justify-center cursor-pointer rounded-full ${filterStatus === 'Tất cả' ? 'bg-[#164399] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Tất cả
              </button>
              <button 
                type="button"
                onClick={() => setFilterStatus('Chờ duyệt')}
                className={`h-full px-5 text-[8.5pt] font-black tracking-wider transition-all uppercase flex items-center justify-center cursor-pointer rounded-full ${filterStatus === 'Chờ duyệt' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Chờ duyệt
              </button>
            </div>

            {/* Standard aligned Add New button */}
            <button 
              onClick={() => handleOpenForm('add')}
              className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white hover:bg-blue-800 rounded-[10px] font-bold transition-all shadow-sm text-[10pt] cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
          </div>
        </div>

        {/* 2. Hidden filters container, matching Yêu cầu thí nghiệm design layout */}
        {showFilter && (
          <div className="mt-4 p-4 bg-gray-50 rounded-[10pt] border border-gray-100 grid grid-cols-1 md:grid-cols-5 gap-4 animate-in slide-in-from-top-2 text-left">
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Đơn vị chi nhánh</label>
              <select 
                value={filterUnit}
                onChange={(e) => setFilterUnit(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-[10px] px-3 py-1.5 outline-none font-normal text-[10pt] focus:border-sky-400 focus:ring-1 focus:ring-sky-100 cursor-pointer"
              >
                <option value="Tất cả">Tất cả chi nhánh</option>
                <option value="Điện lực Thành phố Hưng Yên">Điện lực Thành phố Hưng Yên</option>
                <option value="Điện lực Mỹ Hào">Điện lực Mỹ Hào</option>
                <option value="Điện lực Văn Lâm">Điện lực Văn Lâm</option>
                <option value="Điện lực Văn Giang">Điện lực Văn Giang</option>
                <option value="Xưởng 110kV Hưng Yên">Xưởng 110kV Hưng Yên</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Trạng thái</label>
              <select 
                value={filterRegistrationStatus}
                onChange={(e) => setFilterRegistrationStatus(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-[10px] px-3 py-1.5 outline-none font-normal text-[10pt] focus:border-sky-450 focus:ring-1 focus:ring-sky-100 cursor-pointer"
              >
                <option value="Tất cả">Tất cả trạng thái</option>
                <option value="Dự thảo">Dự thảo</option>
                <option value="Đăng ký">Đăng ký (Chờ duyệt)</option>
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Không duyệt">Không duyệt</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Từ ngày</label>
              <input 
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-[10px] px-3 py-1.5 outline-none font-normal text-[10pt] focus:border-sky-400 focus:ring-1 focus:ring-sky-100 cursor-pointer" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Đến ngày</label>
              <input 
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-[10px] px-3 py-1.5 outline-none font-normal text-[10pt] focus:border-sky-400 focus:ring-1 focus:ring-sky-100 cursor-pointer" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-400 uppercase">Tìm kiếm nhanh</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Mã phiếu, Ghi chú..." 
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-[10px] outline-none font-normal text-[10pt] focus:border-sky-400 focus:ring-1 focus:ring-sky-100" 
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating alert banners */}
      {alert && (
        <div className="mx-6 mt-4 p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2.5 shadow-md animate-in slide-in-from-top duration-300 z-50 shrink-0 text-left">
          <div className="p-1 rounded-lg shrink-0 bg-blue-100 text-blue-600">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-0.5">
            <span className="text-[8pt] font-black text-gray-700 block uppercase tracking-wider font-sans">Thông báo từ hệ thống</span>
            <p className="text-[9pt] font-bold text-slate-705 leading-tight">{alert.text}</p>
          </div>
          <button onClick={() => setAlert(null)} className="p-1 hover:bg-slate-200/50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. Master-Detail Layout (50% left card listing, 50% right quick preview / tabs) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN: Card List (Width 50%) */}
        <div className="w-1/2  flex flex-col bg-gray-50/20 text-left">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  onDoubleClick={() => handleOpenForm(ticket.status === 'Dự thảo' && roleMode === 'requester' ? 'edit' : 'view', ticket)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                    selectedTicketId === ticket.id 
                      ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                      : 'bg-white border-gray-100 hover:border-blue-100/60 shadow-sm'
                  }`}
                >
                  {selectedTicketId === ticket.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#164399]"></div>
                  )}

                  <div className="flex justify-between items-start mb-2 group-hover:translate-x-1 transition-transform">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9pt] font-black uppercase tracking-wider font-mono px-2 py-0.5 rounded-[10px] transition-all border ${
                        selectedTicketId === ticket.id
                          ? 'bg-red-50 text-red-600 border-red-200/60 shadow-xs'
                          : 'bg-transparent text-slate-400 border-gray-200/60 group-hover:text-slate-500 group-hover:border-slate-305'
                      }`}>
                        {ticket.id}
                      </span>
                      <span className={`text-[8.5pt] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-[10px] transition-all border ${
                        selectedTicketId === ticket.id
                          ? 'bg-blue-50 text-blue-500 border-blue-200/60 shadow-xs'
                          : 'bg-transparent text-slate-400 border-gray-200/60 group-hover:text-slate-500 group-hover:border-slate-305'
                      }`}>
                        {ticket.requestingUnit}
                      </span>
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>

                  <h3 className={`text-[11.5pt] font-normal text-slate-750 mb-3 line-clamp-2 leading-tight transition-all whitespace-normal break-words ${
                    selectedTicketId === ticket.id ? 'text-[#164399]' : 'text-slate-800 group-hover:text-blue-600 group-hover:translate-x-1'
                  }`}>
                    {ticket.notes}
                  </h3>

                  <div className="flex items-center justify-between text-[9pt] font-bold pt-3 border-t border-gray-50 mt-1">
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="flex items-center gap-1 uppercase font-mono text-[#8c5738] font-bold">
                        <Calendar className="w-3.5 h-3.5 text-[#8c5738]" />
                        {ticket.requestDate}
                      </div>
                      <div className="flex items-center gap-1 text-[#164399] uppercase font-mono">
                        <Database className="w-3.5 h-3.5" />
                        {ticket.items.length} Thiết bị
                      </div>
                      {ticket.attachments && ticket.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-slate-500 uppercase font-mono">
                          <FileText className="w-3.5 h-3.5" />
                          {ticket.attachments.length} T.Liệu
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {ticket.status === 'Dự thảo' && roleMode === 'requester' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenForm('edit', ticket);
                          }}
                          className="p-1 text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg cursor-pointer shadow-sm transition-colors flex items-center justify-center shrink-0"
                          title="Sửa đăng ký"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <span className="text-[10pt] font-normal not-italic"><span className="text-gray-400">Người cập nhật: </span><span className="text-gray-600">{getTicketUpdaterName(ticket)}</span></span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center py-20 bg-white rounded-2xl border border-gray-100">
                <AlertCircle className="w-12 h-12 mb-2 text-slate-300" />
                <p className="text-[10pt] font-black uppercase">Không tìm thấy Đăng ký nào</p>
                <p className="text-[9pt] font-medium text-slate-400">Thử thay đổi bộ lọc hoặc thêm phiếu mới</p>
              </div>
            )}
          </div>
          
          {/* Aligned pagination indicators exactly matching left column */}
          <div className="py-2 border-t border-gray-200 flex items-center justify-between container-paging shrink-0 bg-white px-6">
            <span className="text-[8.5pt] font-semibold text-gray-400 uppercase tracking-wider select-none">
              Xem 1 - {filteredTickets.length} / {filteredTickets.length} bản ghi
            </span>
            <div className="flex items-center gap-1">
              <button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1 px-1">
                <button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                  1
                </button>
              </div>
              <button className="p-1 px-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Content view with tabs (Width 50%) */}
        <div className="w-1/2 flex flex-col bg-white overflow-hidden text-left">
          {selectedTicket ? (
            <>
              {/* Header Tab Toggles */}
              <div className="flex border-b border-gray-100 shrink-0 bg-white">
                {[
                  { id: 'info', label: 'Thông tin chung' },
                  { id: 'devices', label: 'Thiết bị đăng ký' },
                  { id: 'history', label: 'Lịch sử trình duyệt' }
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

              {/* Tab Display Area */}
              <div className={`flex-1 ${previewTab === 'devices' ? 'flex flex-col overflow-hidden p-0' : 'overflow-y-auto custom-scrollbar p-6'}`}>
                
                {/* TAB 1: GENERAL INFO (Thông tin chung) */}
                {previewTab === 'info' && (
                  <div className="space-y-6 animate-in fade-in duration-300 text-left">
                    <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10pt] font-black text-red-600 font-mono tracking-wider bg-red-50 px-2.5 py-0.5 rounded-[10px] border border-red-200/60 uppercase">{selectedTicket.id}</span>
                          <span className="text-[10pt] font-black text-blue-500 bg-blue-50 px-2.5 py-0.5 rounded-[10px] border border-blue-200/60 uppercase tracking-widest">{selectedTicket.requestingUnit}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {/* VIEW button always available */}
                        <button 
                          onClick={() => handleOpenForm('view', selectedTicket)}
                          className="px-5 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-[12pt] hover:bg-blue-100 transition-all flex items-center gap-2 border border-blue-100 shadow-sm cursor-pointer"
                        >
                          <Eye className="w-4 h-4" /> Xem
                        </button>
                        
                        {/* Short Edit Icon instead of Edit Draft button as requested */}
                        {roleMode === 'requester' && selectedTicket.status === 'Dự thảo' && (
                          <button 
                            onClick={() => handleOpenForm('edit', selectedTicket)}
                            className="p-2.5 text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg cursor-pointer shadow-sm transition-colors flex items-center justify-center shrink-0"
                            title="Sửa đăng ký"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}

                        {/* APPROVAL shortcut if manager role matches */}
                        {roleMode === 'manager' && selectedTicket.status === 'Đăng ký' && (
                          <button 
                            onClick={() => handleOpenForm('approve', selectedTicket)}
                            className="px-5 py-2 bg-[#164399] text-white rounded-lg font-bold text-[10pt] hover:bg-[#164399]/90 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Thống duyệt cấp
                          </button>
                        )}
                      </div>
                    </div>

                    {/* High-Fidelity Unified Information block */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-200 flex-wrap gap-2">
                        <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#164399]" /> Thông tin phiếu đăng ký
                        </h4>
                        <div>
                          {getStatusBadge(selectedTicket.status)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-left text-[10pt]">
                        <div className="space-y-1">
                          <span className="text-gray-400 font-bold block uppercase text-[8pt] tracking-wider">Thời gian lập</span>
                          <div className="flex items-center gap-2 text-gray-800 font-extrabold">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="font-mono">{selectedTicket.requestDate}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-gray-400 font-normal block uppercase text-[8pt] tracking-wider not-italic">Người đăng ký</span>
                          <div className="text-gray-600 font-normal text-[10.5pt] not-italic">
                            {getTicketUpdaterName(selectedTicket)}
                          </div>
                        </div>

                        <div className="space-y-1 md:col-span-2 pt-3 border-t border-gray-200 text-[10pt]">
                          <span className="text-gray-400 font-bold block uppercase text-[8pt] tracking-wider mb-1">Ghi chú</span>
                          <p className="text-gray-750 font-normal leading-relaxed whitespace-pre-wrap mb-4">{selectedTicket.notes || "Không có ghi chú"}</p>
                        </div>

                        <div className="space-y-2 md:col-span-2 pt-3 border-t border-gray-200 text-[10pt]">
                          <span className="text-gray-400 font-bold block uppercase text-[8pt] tracking-wider mb-1.5 font-sans">Tài liệu hồ sơ đính kèm ({[
                            { name: 'Ke_hoach_du_phat_thiet_bi_2026.pdf', size: '1.4 MB' },
                            { name: 'Bang_ke_dinh_muc_du_phong_xuong_110kV.xlsx', size: '850 KB' }
                          ].length})</span>
                          
                          <div className="flex flex-col gap-3">
                            {[
                              { name: 'Ke_hoach_du_phat_thiet_bi_2026.pdf', size: '1.4 MB' },
                              { name: 'Bang_ke_dinh_muc_du_phong_xuong_110kV.xlsx', size: '850 KB' }
                            ].map((file, fIdx) => (
                              <div key={fIdx} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200 hover:bg-[#ECF3FE]/20 hover:border-blue-200 transition-all text-left">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <FileText className="w-5 h-5 text-[#164399] shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <button 
                                      onClick={() => setPreviewingFile(file)}
                                      className="text-[10pt] font-black text-[#164399] hover:text-blue-700 hover:underline block text-left w-full truncate cursor-pointer"
                                      title="Xem hồ sơ trực quan"
                                    >
                                      {file.name}
                                    </button>
                                    <span className="text-[7.5pt] text-gray-400 font-extrabold uppercase block mt-0.5">Nguyễn Văn A | {file.size}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Standard Approved comment banner */}
                    {selectedTicket.approvalDate && (
                      <div className={`p-5 rounded-2xl border ${selectedTicket.status === 'Đã duyệt' ? 'bg-emerald-50/40 border-emerald-100' : 'bg-red-50/40 border-red-100'} space-y-3`}>
                        <h4 className={`text-[9.5pt] font-black flex items-center gap-1.5 ${selectedTicket.status === 'Đã duyệt' ? 'text-emerald-700' : 'text-red-700'}`}>
                          {selectedTicket.status === 'Đã duyệt' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          KẾT QUẢ PHÊ DUYỆT TỪ LÃNH ĐẠO CÔNG TY
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-[10pt] font-bold text-gray-600">
                          <div>
                            <span className="text-[8pt] text-gray-400 uppercase block">Cán bộ ký duyệt</span>
                            <span className="text-gray-800 font-extrabold">{selectedTicket.approver}</span>
                          </div>
                          <div>
                            <span className="text-[8pt] text-gray-400 uppercase block">Ngày phê ký duyệt</span>
                            <span className="text-gray-800 font-extrabold font-mono">{selectedTicket.approvalDate}</span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                          <span className="text-[8pt] text-gray-400 uppercase block mb-1">Nội dung chỉ đạo phê duyệt</span>
                          <p className="text-[10pt] text-gray-700 font-medium italic">"{selectedTicket.approvalComment}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: SPARE DEVICES LIST (Thiết bị đăng ký) */}
                {previewTab === 'devices' && (() => {
                  const getItemVoltage = (item: any) => {
                    const str = (item.code + " " + item.name).toUpperCase();
                    if (str.includes('110KV') || str.includes('110 KV')) return '110kV';
                    if (str.includes('35KV') || str.includes('35 KV')) return '35kV';
                    if (str.includes('22KV') || str.includes('22 KV')) return '22kV';
                    if (str.includes('6KV') || str.includes('6 KV') || str.includes(' 6K ') || str.includes(' 6 ')) return '6kV';
                    return '<6kV';
                  };

                  const getItemCategory = (item: any) => {
                    const code = (item.code || "").toUpperCase();
                    const name = (item.name || "").toUpperCase();
                    if (code.startsWith('MBA') || name.includes('BIẾN ÁP') || name.includes('MÁY BIẾN ÁP')) return 'Máy biến áp';
                    if (code.startsWith('MC') || code.startsWith('REC') || name.includes('MÁY CẮT') || name.includes('RECLOSER')) return 'Máy cắt';
                    if (code.startsWith('DCL') || name.includes('DAO CÁCH LY')) return 'Dao cách ly';
                    if (code.startsWith('TI') || name.includes('BIẾN DÒNG')) return 'Biến dòng';
                    if (code.startsWith('TU') || name.includes('BIẾN ĐIỆN ÁP')) return 'Biến điện áp';
                    return 'Khác';
                  };

                  const base = [...selectedTicket.items];
                  const candidates = [
                    { id: 'M-11', code: 'MBA-110-40', name: 'Máy biến áp lực 110kV - 40MVA Dongfang', normQty: 3, runningQty: 18, proposedQty: 1 },
                    { id: 'M-12', code: 'MC-35-VAC', name: 'Máy cắt chân không VCB 35kV ABB', normQty: 12, runningQty: 84, proposedQty: 3 },
                    { id: 'M-13', code: 'DCL-35-3P', name: 'Dao cách ly 35kV 3 pha ngoài trời', normQty: 15, runningQty: 110, proposedQty: 4 },
                    { id: 'M-14', code: 'TI-35-OUT', name: 'Máy biến dòng TI 35kV đúc Epoxy', normQty: 24, runningQty: 168, proposedQty: 8 },
                    { id: 'M-15', code: 'TU-110-VT', name: 'Biến điện áp cảm ứng TU 110kV', normQty: 6, runningQty: 42, proposedQty: 2 },
                    { id: 'M-16', code: 'TU-22-EPOXY', name: 'Biến điện áp TU 22kV đúc khô', normQty: 20, runningQty: 150, proposedQty: 5 },
                    { id: 'M-17', code: 'DCL-22-299', name: 'Dao cách ly phân đoạn Polyme 22kV', normQty: 30, runningQty: 240, proposedQty: 6 },
                    { id: 'M-18', code: 'MC-22-SF6', name: 'Máy cắt Auto-recloser Entec 22kV', normQty: 8, runningQty: 60, proposedQty: 2 },
                    { id: 'M-19', code: 'FCO-35', name: 'Cầu chì tự rơi FCO 35kV sứ', normQty: 40, runningQty: 310, proposedQty: 12 },
                    { id: 'M-20', code: 'CSV-35-OUT', name: 'Chống sét van ZnO 35kV ngoài trời', normQty: 15, runningQty: 120, proposedQty: 4 },
                    { id: 'M-21', code: 'MBA-22-250', name: 'Máy biến áp phân phối 22/0.4kV - 250kVA', normQty: 5, runningQty: 42, proposedQty: 1 },
                    { id: 'M-22', code: 'MC-6-OIL', name: 'Máy cắt dầu hợp bộ kháng dòng 6kV', normQty: 4, runningQty: 24, proposedQty: 1 },
                    { id: 'M-23', code: 'TI-6-INNER', name: 'Biến dòng chân đế Epoxy 6kV', normQty: 15, runningQty: 90, proposedQty: 3 },
                    { id: 'M-24', code: 'MCCB-400', name: 'MCCB 3 pha 400A LS Hàn Quốc', normQty: 25, runningQty: 180, proposedQty: 5 },
                    { id: 'M-25', code: 'TU-6-DRY', name: 'Biến điện áp TU đúc sấy khô 6kV', normQty: 12, runningQty: 75, proposedQty: 2 }
                  ];

                  candidates.forEach(cand => {
                    if (!base.some(b => b.id === cand.id)) {
                      base.push({
                        ...cand,
                        approvedQty: selectedTicket.status === 'Đã duyệt' ? cand.proposedQty : 0
                      });
                    }
                  });

                  const matchedItems = base.filter(it => {
                    const v = getItemVoltage(it);
                    const c = getItemCategory(it);
                    const matchesVoltage = deviceVoltageFilter === 'Tất cả' || v === deviceVoltageFilter;
                    const matchesType = deviceTypeFilter === 'Tất cả' || c === deviceTypeFilter;
                    return matchesVoltage && matchesType;
                  });

                  const devicesPerPage = 10;
                  const totalDevicePages = Math.ceil(matchedItems.length / devicesPerPage) || 1;
                  const currentDevicePage = Math.min(deviceCurrentPage, totalDevicePages);
                  const startIndex = (currentDevicePage - 1) * devicesPerPage;
                  const paginatedDevices = matchedItems.slice(startIndex, startIndex + devicesPerPage);

                  return (
                    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
                      {/* Fixed Top filter controls */}
                      <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-3 shrink-0 shadow-xs">
                        {/* Shortened Voltage Filter Dropdown */}
                        <div className="relative text-left flex-none w-[130px]">
                          <select
                            value={deviceVoltageFilter}
                            onChange={(e) => setDeviceVoltageFilter(e.target.value)}
                            className="w-full bg-white border border-gray-200 text-[10pt] font-extrabold text-gray-700 h-10 px-3 pr-8 rounded-[10px] shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none appearance-none cursor-pointer"
                          >
                            <option value="Tất cả" className="font-bold">Điện áp: Tất cả</option>
                            {['110kV', '35kV', '22kV', '6kV', '<6kV'].map((vOpt) => (
                              <option key={vOpt} value={vOpt} className="font-bold">
                                {vOpt}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                            <ChevronRight className="w-4 h-4 rotate-90" />
                          </div>
                        </div>

                        {/* Device Type Dropdown */}
                        <div className="relative text-left flex-1 max-w-[200px]">
                          <select
                            value={deviceTypeFilter}
                            onChange={(e) => setDeviceTypeFilter(e.target.value)}
                            className="w-full bg-white border border-gray-200 text-[10pt] font-extrabold text-gray-700 h-10 px-4 pr-10 rounded-[10px] shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none appearance-none cursor-pointer"
                          >
                            <option value="Tất cả" className="font-bold">Loại thiết bị: Tất cả</option>
                            {['Máy biến áp', 'Máy cắt', 'Dao cách ly', 'Biến dòng', 'Biến điện áp', 'Khác'].map((catOpt) => (
                              <option key={catOpt} value={catOpt} className="font-bold">
                                {catOpt}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                            <ChevronRight className="w-4 h-4 rotate-90" />
                          </div>
                        </div>

                        {/* Quick Search Input with no title, flex-1 */}
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={deviceSearchKeyword}
                            onChange={(e) => setDeviceSearchKeyword(e.target.value)}
                            placeholder="Tìm kiếm nhanh thiết bị..."
                            className="w-full bg-white border border-gray-200 text-[10pt] font-medium text-gray-700 h-10 pl-10 pr-4 rounded-[10px] shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none placeholder:text-gray-400"
                          />
                          <div className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none">
                            <Search className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Scrollable devices list */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
                        {paginatedDevices.length > 0 ? (
                          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full relative">
                            <div className="overflow-auto flex-1 custom-scrollbar">
                              <table className="w-full relative">
                                <thead className="bg-[#f0f4fa] sticky top-0 z-10 text-[#164399] font-black text-[9pt] uppercase tracking-wider text-left border-b border-gray-200 shadow-xs">
                                  <tr>
                                    <th className="py-3 px-4 text-center w-12 ">STT</th>
                                    <th className="py-3 px-4 ">Thiết bị</th>
                                    <th className="py-3 px-4 text-center ">SL Vận hành</th>
                                    <th className="py-3 px-4 text-center ">SL Đề xuất</th>
                                    {selectedTicket.status === 'Đã duyệt' && <th className="py-3 px-4 text-center ">Duyệt cấp</th>}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {paginatedDevices.map((it, idx) => {
                                    const vTag = getItemVoltage(it);
                                    const cTag = getItemCategory(it);
                                    const rawRunning = it.runningQty !== undefined ? it.runningQty : (it.normQty !== undefined ? it.normQty * 4 : 10);
                                    const slVanHanh = Math.max(rawRunning, it.proposedQty || 0);
                                    return (
                                      <tr key={idx} className="hover:bg-slate-50/70 transition-all group">
                                        <td className="py-3 px-4 text-center text-gray-400 font-mono text-[9pt]">{startIndex + idx + 1}</td>
                                        <td className="py-3 px-4 flex flex-col gap-1 text-left">
                                          <div className="flex flex-wrap items-center gap-1.5 text-[8pt] text-gray-400 font-medium select-none">
                                            <span>{vTag}</span>
                                            <span className="text-gray-300 font-normal select-none">•</span>
                                            <span>{cTag}</span>
                                            <span className="text-gray-300 font-normal select-none">•</span>
                                            <span className="font-mono text-gray-400">PMIS-{it.code}</span>
                                          </div>
                                          {/* Dòng Tên thiết bị cỡ chữ 10pt, không in đậm. Lướt chuột qua thì nổi màu blue-600 và in đậm */}
                                          <p className="text-[10pt] font-normal text-[#164399] leading-tight mt-1 transition-all duration-150 group-hover:text-blue-600 group-hover:font-extrabold whitespace-normal break-words">
                                            {it.name}
                                          </p>
                                        </td>
                                        {/* Các ô Số lượng tăng cỡ chữ lên 2pt khi lướt chuột qua (from 10pt to 12pt) */}
                                        <td className="py-3 px-4 text-center text-[10pt] font-bold text-gray-500 transition-all duration-150 group-hover:text-[12pt]">
                                          {slVanHanh}
                                        </td>
                                        <td className="py-3 px-4 text-center text-[10pt] font-bold text-gray-900 transition-all duration-150 group-hover:text-[12pt]">
                                          {it.proposedQty}
                                        </td>
                                        {selectedTicket.status === 'Đã duyệt' && (
                                          <td className="py-3 px-4 text-center text-[10pt] font-bold text-emerald-600 transition-all duration-150 group-hover:text-[12pt]">
                                            {it.approvedQty || 0}
                                          </td>
                                        )}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>

                            {/* Reduced height pagination bar */}
                            <div className="p-2 bg-[#f4f7fc] border-t border-gray-150 flex items-center justify-between shrink-0 font-sans text-gray-600">
                              <span className="text-[9.5pt] font-bold text-gray-500">
                                Bản ghi: <span className="text-gray-500 font-black">{startIndex + 1}</span> - <span className="text-gray-500 font-black">{Math.min(startIndex + devicesPerPage, matchedItems.length)}</span> / <span className="text-gray-500 font-black">{matchedItems.length}</span>
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  disabled={currentDevicePage === 1}
                                  onClick={() => setDeviceCurrentPage(Math.max(1, currentDevicePage - 1))}
                                  className="p-1.5 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-gray-500 border-none bg-transparent"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <div className="flex items-center gap-1 px-1">
                                  {[...Array(totalDevicePages)].map((_, i) => {
                                    const page = i + 1;
                                    return (
                                      <button 
                                        key={page}
                                        type="button"
                                        onClick={() => setDeviceCurrentPage(page)}
                                        className={`w-7 h-7 rounded-full text-[9pt] font-bold transition-all cursor-pointer border-none ${currentDevicePage === page ? 'bg-blue-100 text-[#164399]' : 'text-gray-500 hover:bg-gray-100'}`}
                                      >
                                        {page}
                                      </button>
                                    );
                                  })}
                                </div>
                                <button 
                                  type="button"
                                  disabled={currentDevicePage === totalDevicePages}
                                  onClick={() => setDeviceCurrentPage(Math.min(totalDevicePages, currentDevicePage + 1))}
                                  className="p-1.5 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-gray-500 border-none bg-transparent"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-12 text-center">
                            <ClipboardList className="w-12 h-12 mb-3 opacity-20" />
                            <p className="text-[10pt] font-bold">Không tìm thấy thiết bị nào khớp với bộ lọc.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}


                {/* TAB 3: APPROVAL TIMELINE - 5. Các tính năng Lịch sử phê duyệt đồng nhất thiết kế */}
                {previewTab === 'history' && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2 text-left">
                       <h5 className="text-[10pt] font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-500" /> Lịch sử trình duyệt
                       </h5>
                       <span className="text-[9pt] font-bold text-gray-400">Số bước: 3</span>
                    </div>

                    <div className="relative pl-8 border-l-2 border-slate-100 space-y-6 ml-4 pt-2 text-left">
                      {[
                        { 
                          time: selectedTicket.approvalDate ? `${selectedTicket.approvalDate} 16:15` : '--/--/-- --:--', 
                          action: selectedTicket.status === 'Đã duyệt' ? 'Phê duyệt, cấp phép phân kho' : selectedTicket.status === 'Không duyệt' ? 'Từ chối cấp phép' : 'Chờ thẩm định cấp', 
                          user: selectedTicket.approver || 'Lãnh đạo Ban Quản lý Kỹ thuật', 
                          status: selectedTicket.status === 'Đã duyệt' ? 'Đã duyệt' : selectedTicket.status === 'Không duyệt' ? 'Từ chối' : 'Chờ duyệt' 
                        },
                        { 
                          time: `${selectedTicket.requestDate} 08:30`, 
                          action: 'Trình duyệt hồ sơ lên Công ty', 
                          user: 'Nguyễn Thanh Tùng (Phó Giám đốc)', 
                          status: 'Đăng ký' 
                        },
                        { 
                          time: `${selectedTicket.requestDate} 08:10`, 
                          action: 'Khởi tạo hồ sơ, lập danh mục thiết bị định mức đề xuất', 
                          user: 'Trần Văn Đức (Ban Kỹ thuật)', 
                          status: 'Dự thảo' 
                        }
                      ].map((step, sIdx) => {
                        const colors: Record<string, { bg: string, border: string, text: string, dot: string }> = {
                          'Đã duyệt': { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', dot: 'bg-green-600' },
                          'Từ chối': { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', dot: 'bg-rose-500' },
                          'Chờ duyệt': { bg: 'bg-amber-50', border: 'border-amber-200/80', text: 'text-amber-600', dot: 'bg-amber-500' },
                          'Đăng ký': { bg: 'bg-amber-100/60', border: 'border-amber-200/80', text: 'text-amber-700', dot: 'bg-amber-600' },
                          'Dự thảo': { bg: 'bg-slate-50', border: 'border-slate-200/60', text: 'text-slate-500', dot: 'bg-slate-500' }
                        };
                        const c = colors[step.status] || colors['Dự thảo'];

                        return (
                          <div key={sIdx} className="relative group text-left">
                            {/* circular dot */}
                            <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-blue-500 transition-all z-10 shadow-sm">
                              <div className={`w-2 h-2 rounded-full ${c.dot} group-hover:scale-125 transition-transform`}></div>
                            </div>

                            {/* card container */}
                            <div className="p-4 bg-white rounded-2xl border border-gray-200 hover:shadow-md hover:border-blue-300 hover:bg-slate-50/25 transition-all relative">
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap pb-1">
                                  {/* Status badge rounded 50 */}
                                  <span className={`px-2.5 py-0.5 rounded-[50px] text-[7.5pt] font-black uppercase tracking-wider border ${c.bg} ${c.border} ${c.text}`}>
                                    {step.status}
                                  </span>
                                  {/* Date Blue basic color */}
                                  <span className="text-[9pt] text-blue-500 font-bold font-mono">{step.time}</span>
                                </div>
                                {/* Content not bold */}
                                <p className="text-[10.5pt] text-slate-700 font-medium leading-relaxed">
                                  {step.action}
                                </p>

                                {sIdx === 0 && selectedTicket.approvalComment && (
                                  <p className="mt-2 text-[9.5pt] bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed font-normal">
                                    <span className="text-gray-500 font-medium">Ý kiến phê duyệt: </span>
                                    <span className="text-[#164399]/90 font-medium">"{selectedTicket.approvalComment}"</span>
                                  </p>
                                )}

                                <div className="flex items-center justify-between gap-2 text-[8.5pt] mt-2 pt-2 border-t border-gray-100 flex-wrap">
                                  <div />
                                  <div className="flex items-center gap-1 text-right">
                                    {/* Performed by key style light-gray */}
                                    <span className="text-gray-400 font-semibold uppercase text-[8pt]">Thực hiện:</span>
                                    {(() => {
                                      const val = step.user || 'Hệ thống';
                                      const match = val.match(/^([^\(]+)(?:\((.+)\))?/);
                                      if (match) {
                                        const name = match[1].trim();
                                        const title = match[2] ? match[2].trim() : '';
                                        if (title) {
                                          return (
                                            <span className="text-right text-[8.5pt]">
                                              <span className="text-[#164399] font-black">{name}</span>{' '}
                                              <span className="text-gray-450 font-normal">({title})</span>
                                            </span>
                                          );
                                        }
                                      }
                                      if (val === 'Hệ thống' || val === 'Lãnh đạo đơn vị' || val === 'Kỹ sư Trạm' || val === 'Lãnh đạo Ban Quản lý Kỹ thuật') {
                                        return <span className="text-gray-450 font-normal">{val}</span>;
                                      }
                                      return <span className="text-[#164399] font-black">{val}</span>;
                                    })()}
                                  </div>
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
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-12 text-center">
              <ClipboardList className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-[11pt] font-bold">Vui lòng chọn một phiếu Đăng ký dự phòng bên trái để hiển thị thông tin xử lý.</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. HIGH FIDELITY OVERLAY FOR CREATE / EDIT / VIEW / ACTION MODAL FORMS */}
      {formOverlay && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100 text-left animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-gray-100 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8pt] font-black uppercase tracking-wider text-gray-700">
                    {formOverlay.mode === 'add' ? 'Thêm mới phiếu đăng ký' : 'Chi tiết phiếu đăng ký'}
                  </span>
                  <h3 className="text-[12pt] font-black text-gray-700 tracking-tight flex items-center gap-1.5">
                    <span className="text-gray-500 font-medium">{formOverlay.mode === 'add' ? 'Thêm mới' : 'Chi tiết'} - </span>
                    <span className="font-bold text-[#164399]">Đăng ký thiết bị dự phòng</span>
                    {formOverlay.mode !== 'add' && (
                      <span className="text-blue-600 font-extrabold">({formOverlay.data.id})</span>
                    )}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setFormOverlay(null)}
                className="p-1.5 hover:bg-slate-200/50 rounded-xl text-slate-400 hover:text-slate-600 transition-all"
              >
                <X className="w-5 h-5 font-bold" />
              </button>
            </div>

            {/* Modal Body Scroll area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Top Row: Units, Dates, and Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Select requesting Unit */}
                <div className="flex flex-col gap-1">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest pl-1">Đơn vị đề xuất đăng ký</label>
                  <select
                    disabled={formOverlay.mode === 'view' || formOverlay.mode === 'approve'}
                    value={formOverlay.data.requestingUnit}
                    onChange={(e) => setFormOverlay({
                      ...formOverlay,
                      data: { ...formOverlay.data, requestingUnit: e.target.value }
                    })}
                    className="w-full text-[10pt] font-bold text-slate-700 bg-white border border-slate-200 rounded-[10px] py-2 px-3 focus:bg-white focus:ring-1 focus:ring-[#164399] transition-all outline-none disabled:bg-gray-50/70 disabled:text-gray-500"
                  >
                    <option value="Điện lực Thành phố Hưng Yên">Điện lực Thành phố Hưng Yên</option>
                    <option value="Điện lực Mỹ Hào">Điện lực Mỹ Hào</option>
                    <option value="Điện lực Văn Lâm">Điện lực Văn Lâm</option>
                    <option value="Điện lực Văn Giang">Điện lực Văn Giang</option>
                    <option value="Xưởng 110kV Hưng Yên">Xưởng 110kV Hưng Yên</option>
                  </select>
                </div>

                {/* Registration Date */}
                <div className="flex flex-col gap-1">
                  <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest pl-1">Ngày lập yêu cầu</label>
                  <input
                    type="date"
                    disabled={formOverlay.mode === 'view' || formOverlay.mode === 'approve'}
                    value={formOverlay.data.requestDate}
                    onChange={(e) => setFormOverlay({
                      ...formOverlay,
                      data: { ...formOverlay.data, requestDate: e.target.value }
                    })}
                    className="w-full text-[10pt] font-bold text-slate-700 bg-white border border-slate-200 rounded-[10px] py-2 px-3 focus:bg-white outline-none disabled:bg-gray-50/70 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Justifications Notes notes */}
              <div className="flex flex-col gap-1">
                <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest pl-1">
                  Lý do chi tiết giải trình để đề xuất thiết bị dự phòng
                </label>
                <textarea
                  disabled={formOverlay.mode === 'view' || formOverlay.mode === 'approve'}
                  value={formOverlay.data.notes}
                  onChange={(e) => setFormOverlay({
                    ...formOverlay,
                    data: { ...formOverlay.data, notes: e.target.value }
                  })}
                  placeholder="Gõ báo cáo giải trình lý do sắm cấp hoặc bổ sung thiết bị dự phòng (Phục vụ phòng chống thiên tai, sửa chữa lớn, thay thế đột xuất do tải cao...)"
                  rows={2}
                  className="w-full text-[10pt] font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:ring-1 focus:ring-[#164399] outline-none disabled:bg-gray-50/70 disabled:text-gray-500 leading-relaxed"
                />
              </div>

              {/* Selected Spare Items list / grid nested */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-[9.5pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                    <Database className="w-4 h-4 text-[#164399]" />
                    CHI TIẾT DANH MỤC THIẾT BỊ ĐỀ XUẤT ({formOverlay.data.items.length})
                  </span>

                  {(formOverlay.mode === 'add' || formOverlay.mode === 'edit') && (
                    <button 
                      onClick={() => {
                        setModalSearchKeyword('');
                        setShowDeviceModal(true);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 hover:bg-blue-105 text-[#164399] border border-blue-200 text-[8.5pt] font-black rounded-xl transition-all shadow-sm shrink-0 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" /> Chọn thiết bị định mức
                    </button>
                  )}
                </div>

                {formOverlay.data.items.length > 0 ? (
                  <div className="border border-gray-100 rounded-lg overflow-hidden shadow-inner">
                    <table className="w-full text-left border-collapse text-[9pt]">
                      <thead className="sticky top-0 z-10 shadow-sm bg-[#f0f4fa]">
                        <tr className="bg-[#ecf2fa] border-b border-[#164399]/10 text-[#164399] font-black uppercase tracking-wider text-[8pt]">
                          <th className="py-2.5 px-4 w-12 text-center bg-[#ecf2fa]">STT</th>
                          <th className="py-2.5 px-3 bg-[#ecf2fa]">Thông tin thiết bị</th>
                          <th className="py-2.5 px-3 text-center w-20 bg-[#ecf2fa]">SLVH</th>
                          <th className="py-2.5 px-3 text-center w-28 bg-[#ecf2fa]">SL Đề xuất</th>
                          <th className="py-2.5 px-3 text-center w-24 bg-[#ecf2fa]">SL Định mức</th>
                          {(formOverlay.mode === 'approve' || formOverlay.data.approvalDate) && (
                            <th className="py-2.5 px-3 text-center w-28 bg-[#ecf2fa]">Duyệt cấp thực tế</th>
                          )}
                          {(formOverlay.mode === 'add' || formOverlay.mode === 'edit') && (
                            <th className="py-2.5 px-3 text-center w-12 bg-[#ecf2fa]">Xóa</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-bold text-slate-700">
                        {formOverlay.data.items.map((it, idx) => (
                          <tr key={it.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 px-4 text-center text-gray-400 font-mono">{idx + 1}</td>
                            <td className="py-3 px-3">
                              <div className="flex flex-col text-left">
                                {/* Cấp điện áp, Loại thiết bị, Mã thiết bị (Màu xám nhạt và cỡ chữ nhỏ) */}
                                <div className="flex flex-wrap items-center gap-1.5 text-[8.5pt] text-gray-400 font-normal">
                                  <span>{getDeviceVoltage(it)}</span>
                                  <span className="text-gray-300">•</span>
                                  <span>{getDeviceType(it)}</span>
                                  <span className="text-gray-300">•</span>
                                  <span className="font-mono">{it.code}</span>
                                </div>
                                {/* Tên thiết bị màu Xám đậm, khi lướt chuột lên dòng thì Tên thiết bị màu Blue cơ bản */}
                                <p className="text-[10pt] font-medium text-slate-700 leading-snug mt-1 transition-all duration-150 group-hover:font-extrabold group-hover:text-blue-500">
                                  {it.name}
                                </p>
                              </div>
                            </td>
                            
                            {/* SLVH */}
                            <td className="py-3 px-3 text-center bg-blue-50/30 text-gray-600 font-mono">{it.runningQty}</td>
                            
                            {/* SL Đề xuất */}
                            <td className="py-2 px-3 text-center bg-amber-50/30">
                              {(formOverlay.mode === 'add' || formOverlay.mode === 'edit') ? (
                                <input 
                                  type="number"
                                  min="1"
                                  value={it.proposedQty}
                                  onChange={(e) => handleItemProposedChange(it.id, e.target.value)}
                                  className="w-16 p-1 text-center font-mono font-black text-amber-700 bg-white border border-amber-200 rounded-lg shadow-sm outline-none"
                                />
                              ) : (
                                <span className="font-mono text-amber-700 font-black">{it.proposedQty}</span>
                              )}
                            </td>

                            {/* SL Định mức */}
                            <td className="py-3 px-3 text-center bg-blue-50/20 text-gray-400 font-mono">{it.normQty}</td>

                            {(formOverlay.mode === 'approve' || formOverlay.data.approvalDate) && (
                              <td className="py-2 px-3 text-center bg-emerald-50/30">
                                {formOverlay.mode === 'approve' ? (
                                  <input 
                                    type="number"
                                    min="0"
                                    max={it.proposedQty}
                                    value={it.approvedQty !== undefined ? it.approvedQty : it.proposedQty}
                                    onChange={(e) => handleItemApprovedChange(it.id, e.target.value)}
                                    className="w-16 p-1 text-center font-mono font-black text-emerald-700 bg-white border border-emerald-300 rounded-lg shadow-sm outline-none"
                                  />
                                ) : (
                                  <span className="font-mono text-emerald-700 font-black">{it.approvedQty || 0}</span>
                                )}
                              </td>
                            )}

                            {(formOverlay.mode === 'add' || formOverlay.mode === 'edit') && (
                              <td className="py-2 px-3 text-center">
                                <button 
                                  onClick={() => handleRemoveDeviceFromForm(it.id)}
                                  className="p-1 hover:bg-red-50 text-red-600 hover:text-red-700 bg-red-50/50 hover:bg-red-100/50 border border-red-100 transition-colors rounded"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                    <AlertCircle className="w-8 h-8 text-slate-350 mx-auto mb-2" />
                    <span className="text-[9pt] font-black uppercase">Chưa chọn thiết bị nào trong danh sách</span>
                    <p className="text-[8.5pt] text-gray-400/80 mt-1">Vui lòng bấm vào "Chọn thiết bị định mức" để thêm thiết bị vào phiếu đăng ký dự trữ</p>
                  </div>
                )}
              </div>

              {/* Manager Feedback Form overlay inside viewState */}
              {formOverlay.mode === 'approve' && (
                <div className="p-5 bg-indigo-50/50 border border-indigo-200 rounded-2xl space-y-3.5">
                  <h4 className="text-[9.5pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5" /> Ý KIẾN CHỈ ĐẠO CẤP QUẢN LÝ (PHÊ DUYỆT)
                  </h4>
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest pl-1">Nội dung giải trình phê ký & định lượng điều tiết</label>
                    <textarea 
                      value={formOverlay.data.approvalComment || ''}
                      onChange={(e) => setFormOverlay({
                        ...formOverlay,
                        data: { ...formOverlay.data, approvalComment: e.target.value }
                      })}
                      placeholder="Nếu ghi giảm số lượng thực tế xin hãy ghi rõ lý do điều tiết mạch vòng kho hoặc tối ưu định ngạch..."
                      rows={2}
                      className="w-full text-[10pt] font-semibold text-slate-700 bg-white border border-indigo-200 rounded-lg py-2 px-3 focus:ring-1 focus:ring-indigo-600 outline-none" 
                    />
                  </div>
                </div>
              )}

              {formOverlay.data.approvalDate && formOverlay.mode !== 'approve' && (
                <div className="p-5 bg-slate-50 border border-gray-200 rounded-2xl space-y-3">
                  <h4 className="text-[9.5pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <History className="w-4 h-4 text-[#164399]" /> NHẬN XÉT PHÊ KÝ CHI TIẾT
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-[10pt] text-gray-600 font-bold">
                    <div>
                      <span className="text-[8pt] text-gray-400 block uppercase">Đại diện Công ty:</span>
                      <span className="text-gray-800 font-black">{formOverlay.data.approver}</span>
                    </div>
                    <div>
                      <span className="text-[8pt] text-gray-400 block uppercase">Thời khắc phê ký:</span>
                      <span className="text-gray-800 font-black font-mono">{formOverlay.data.approvalDate}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-[8pt] text-gray-400 block uppercase mb-1">Nội dung ý kiến:</span>
                    <p className="text-[10pt] text-gray-700 italic">"{formOverlay.data.approvalComment}"</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <button 
                onClick={() => setFormOverlay(null)}
                className="px-5 py-2 hover:bg-slate-200/50 text-slate-600 rounded-full font-bold text-[10pt] transition-colors"
              >
                Đóng lại
              </button>

              <div className="flex items-center gap-2">
                {/* Save options for requester draft */}
                {(formOverlay.mode === 'add' || formOverlay.mode === 'edit') && (
                  <>
                    <button 
                      onClick={() => handleSaveForm(false)}
                      className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full font-bold text-[10pt] transition-all border border-slate-300"
                    >
                      Lưu nháp
                    </button>
                    <button 
                      onClick={() => handleSaveForm(true)}
                      className="px-5 py-2 bg-[#164399] hover:bg-blue-800 text-white rounded-lg font-bold text-[10pt] transition-all shadow-md"
                    >
                      Nộp đăng ký
                    </button>
                  </>
                )}

                {/* Confirm option for manager review */}
                {formOverlay.mode === 'approve' && (
                  <>
                    <button 
                      onClick={() => handleProcessDecision('Không duyệt')}
                      className="px-5 py-2 bg-red-100 border border-red-200 text-red-700 hover:bg-red-200 rounded-full font-bold text-[10pt] transition-all cursor-pointer"
                    >
                      Không duyệt
                    </button>
                    <button 
                      onClick={() => handleProcessDecision('Đã duyệt')}
                      className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-[10pt] transition-all shadow-md font-sans cursor-pointer"
                    >
                      Duyệt
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* NESTED MULTI-SELECT DEVICE POPUP (Chọn thiết bị vào danh sách đăng ký) */}
      {showDeviceModal && formOverlay && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col border border-gray-200 text-left">
            
            {/* Modal Sub header */}
            <div className="px-5 py-4 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[7.5pt] font-black text-gray-700 uppercase tracking-wider block">Thiết bị chuẩn PMIS</span>
                <span className="text-[11pt] font-black text-slate-800 tracking-tight block">Khai thác danh mục dự trữ chuẩn</span>
              </div>
              <button 
                onClick={() => setShowDeviceModal(false)}
                className="p-1 text-slate-400 hover:bg-slate-200/50 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Input Search */}
            <div className="p-4 border-b border-gray-100 bg-white space-y-3 shrink-0">
              {/* 2 selection filters: Voltage and Device Type based on Voltage */}
              <div className="grid grid-cols-2 gap-3 pb-1">
                <div className="relative text-left">
                  <select
                    value={modalVoltageFilter}
                    onChange={(e) => {
                      setModalVoltageFilter(e.target.value);
                      setModalTypeFilter('Tất cả');
                    }}
                    className="w-full bg-white border border-slate-200 text-[9.5pt] font-semibold text-slate-700 h-10 px-3 pr-8 rounded-[10px] shadow-sm focus:ring-1 focus:ring-blue-500/10 focus:border-[#164399] outline-none appearance-none cursor-pointer"
                  >
                    <option value="Tất cả">Cấp điện áp: Tất cả</option>
                    <option value="110kV">110kV</option>
                    <option value="22kV">22kV</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative text-left">
                  <select
                    value={modalTypeFilter}
                    onChange={(e) => setModalTypeFilter(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-[9.5pt] font-semibold text-slate-700 h-10 px-3 pr-8 rounded-[10px] shadow-sm focus:ring-1 focus:ring-blue-500/10 focus:border-[#164399] outline-none appearance-none cursor-pointer"
                  >
                    {getDeviceTypesByVoltage(modalVoltageFilter).map((typeOpt) => (
                      <option key={typeOpt} value={typeOpt}>
                        {typeOpt === 'Tất cả' ? 'Loại thiết bị: Tất cả' : typeOpt}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Fast keyword search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Gõ tìm kiếm mã hoặc tên sản phẩm thiết bị..."
                  value={modalSearchKeyword}
                  onChange={(e) => setModalSearchKeyword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-[10px] text-[9.5pt] outline-none bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#164399] transition-all"
                />
              </div>
            </div>

            {/* Sub-body scroll items with interactive checkbox */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50/40">
              {filteredCatalogDevices.length > 0 ? (
                filteredCatalogDevices.map(device => {
                  const isChecked = formOverlay.data.items.some(it => it.id === device.id);
                  return (
                    <div 
                      key={device.id}
                      onClick={() => handleSelectModalDevice(device, !isChecked)}
                      className={`p-3.5 bg-white border rounded-[10px] hover:border-blue-300 hover:bg-slate-50/50 cursor-pointer transition-all flex items-center justify-between gap-3 group/devrow ${isChecked ? 'border-blue-600 bg-blue-50/20' : 'border-gray-200 shadow-sm'}`}
                    >
                      <div className="flex-1 min-w-0 font-sans text-left">
                        {/* Cấp điện áp, Loại thiết bị, Mã thiết bị (Màu xám nhạt và cỡ chữ nhỏ) */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[10pt] text-slate-400 font-semibold">
                          <span>{getDeviceVoltage(device)}</span>
                          <span className="text-slate-300 font-normal">•</span>
                          <span>{getDeviceType(device)}</span>
                          <span className="text-slate-300 font-normal">•</span>
                          <span className="font-mono">PMIS-{device.code}</span>
                        </div>
                        {/* Tên thiết bị màu Xám đậm, khi lướt chuột lên dòng thì Tên thiết bị màu Blue cơ bản */}
                        <p className="text-[12pt] font-bold text-slate-700 leading-snug mt-1 transition-colors duration-150 group-hover/devrow:text-blue-600">
                          {device.name}
                        </p>
                        {/* Định mức & SL Vận hành: SL Vận hành màu Blue cơ bản */}
                        <div className="flex items-center gap-3 text-[8pt] text-slate-450 mt-1 font-semibold">
                          <span>Định mức: <strong className="text-slate-600 font-mono">{device.normQty}</strong></span>
                          <span className="text-gray-300">•</span>
                          <span>SL Vận hành: <strong className="text-blue-600 font-mono font-bold">{device.runningQty}</strong></span>
                        </div>
                      </div>

                      {/* Pill style Checkbox */}
                      <div className={`p-1.5 rounded-full border w-6 h-6 flex items-center justify-center shrink-0 transition-colors ${isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-transparent group-hover/devrow:border-blue-300'}`}>
                        <Check className="w-3 h-3 font-bold" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-400 text-[10pt] font-semibold">
                  Không tìm thấy thiết bị nào khớp với từ khóa tìm kiếm...
                </div>
              )}
            </div>

            {/* Sub-footer submit */}
            <div className="p-4 bg-slate-50 border-t border-gray-200 flex items-center justify-between text-[8.5pt] font-black text-slate-400 uppercase select-none shrink-0">
              <span>Đã thêm ({formOverlay.data.items.length}) loại</span>
              <button 
                onClick={() => setShowDeviceModal(false)}
                className="px-4 py-2 bg-[#164399] hover:bg-blue-800 text-white rounded-[10px] uppercase font-bold text-[8.5pt]"
              >
                Xác nhận xong
              </button>
            </div>

          </div>
        </div>
      )}

      {/* HIGH-FIDELITY DOCUMENT PREVIEW MODAL */}
      {previewingFile && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[400] flex items-center justify-center p-4 animate-in fade-in duration-200 text-left">
          <div className="relative w-full max-w-4xl h-[85vh] bg-slate-100 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#164399] flex items-center justify-center shrink-0 border border-blue-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[7.5pt] font-black text-gray-700 uppercase tracking-widest block">Chi tiết tài liệu hồ sơ</span>
                  <span className="text-[11pt] font-black text-slate-800 tracking-tight block">{previewingFile.name} ({previewingFile.size})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleDownloadFile(previewingFile.name)}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg text-[8.5pt] font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" shrink-0="true" /> Tải về máy
                </button>
                <button 
                  onClick={() => setPreviewingFile(null)}
                  className="p-2 hover:bg-slate-150 text-slate-400 hover:text-slate-700 transition-colors rounded-xl"
                  title="Đóng bản xem thử"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document body viewport matching real content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center bg-slate-200">
              {previewingFile.name.endsWith('.pdf') ? (
                /* PDF Canvas simulator mimicking EVN official stamp paper */
                <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-300 min-h-[900px] flex flex-col justify-between font-serif relative text-slate-850 select-none text-[11pt] leading-normal">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start text-center text-[10pt] font-bold font-sans">
                      <div>
                        <p className="uppercase tracking-tight text-gray-700 text-[8.5pt]">TỔNG CÔNG TY ĐIỆN LỰC MIỀN BẮC</p>
                        <p className="uppercase tracking-tight text-gray-700 underline text-[9.5pt]">CÔNG TY ĐIỆN LỰC HƯNG YÊN</p>
                        <p className="text-[8pt] text-gray-400 font-normal mt-1 italic">Số: 284/QĐ-PCHY-VT</p>
                      </div>
                      <div>
                        <p className="uppercase tracking-tight text-gray-700 text-[8.5pt]">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                        <p className="font-bold underline text-gray-800 text-[10.5pt]">Độc lập - Tự do - Hạnh phúc</p>
                        <p className="text-[8.5pt] text-gray-400 font-normal mt-1 italic">Hưng Yên, ngày 18 tháng 02 năm 2026</p>
                      </div>
                    </div>

                    {/* Stamp decoration */}
                    <div className="absolute right-16 top-48 w-24 h-24 rounded-2xl border-4 border-red-600/35 flex items-center justify-center rotate-12 select-none pointer-events-none">
                      <span className="text-red-600/40 font-bold uppercase text-[6pt] text-center tracking-tight leading-3 font-sans">
                        PC HƯNG YÊN<br />★<br />ĐÃ KIỂM DUYỆT
                      </span>
                    </div>

                    {/* Title */}
                    <div className="text-center pt-8 space-y-2">
                      <h2 className="text-[14pt] font-extrabold uppercase tracking-tight text-gray-700 font-sans">KẾ HOẠCH DỰ PHÒNG THIẾT BỊ KHẨN CẤP</h2>
                      <p className="text-[10pt] text-gray-600 italic font-sans">(Phục vụ công tác cấp bão, chống sét và liên thông kho tài sản EVNNPC năm 2026)</p>
                    </div>

                    {/* Content section */}
                    <div className="space-y-4 pt-4 text-justify font-sans text-gray-800 text-[9.5pt]">
                      <p className="indent-8 font-semibold">Căn cứ Quyết định số 1492/QĐ-EVNNPC của Tổng công ty Điện lực Miền Bắc ban hành về quy chế quản lý vật tư dự trữ định mức sự cố lưới điện truyền tải và trung hạ thế khu vực.</p>
                      <p className="indent-8">Xét đề xuất của Phòng Vật tư - Thiết bị Công ty Điện lực Hưng Yên và Ban Quản lý Xưởng 110kV nhằm đảm bảo vận hành liên tục hệ thống truyền tải, thay thế nhanh sắm mới lắp đặt chống sét van, cuộn kháng và máy cắt SF6 bị sự cố suy giảm cách điện.</p>
                      
                      <div className="p-4 bg-slate-50/50 rounded-2xl border border-dashed border-gray-200 mt-4 space-y-3 font-sans">
                        <h4 className="font-bold text-gray-700 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#164399]" /> MỤC TIÊU & CHỈ TIÊU KỸ THUẬT:</h4>
                        <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[9pt]">
                          <li>Ưu tiên tối ưu hóa định mức luân chuyển tại chỗ cho năm chi nhánh Điện lực trực thuộc.</li>
                          <li>Dự trữ khẩn cấp bù 15 tủ hạ thế, 4 bộ máy cắt dầu SF6, chống sét van 35kV thông số lắp đặt đồng bộ.</li>
                          <li>Nghiêm cấm lãng phí phân bổ sai lệch nhu cầu của các Điện lực khu vực.</li>
                        </ul>
                      </div>

                      <p className="indent-8">Lãnh đạo các đơn vị trực thuộc có trách nhiệm rà soát kiểm thử chất lượng trước khi nhận bàn giao kỹ thuật từ kho trung tâm...</p>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="grid grid-cols-2 text-center text-[10pt] pt-12 font-sans font-medium text-gray-850">
                    <div>
                      <p className="font-bold text-gray-400 uppercase text-[8.5pt]">NƠI NHẬN</p>
                      <ul className="text-left text-[8pt] text-gray-500 pl-8 list-none mt-2 space-y-1 italic">
                        <li>- Như Điều 3;</li>
                        <li>- EVNNPC (báo cáo);</li>
                        <li>- Lưu hồ sơ VP, VT.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="font-bold uppercase tracking-wide">GIÁM ĐỐC CÔNG TY</p>
                      <p className="text-[8pt] text-gray-400 italic mt-1">(Đã phê ký điện tử qua hệ thống PMIS eVN)</p>
                      <div className="h-16"></div>
                      <p className="font-bold text-[#164399] uppercase text-[10.5pt] tracking-tight">Nguyễn Danh Duyên</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Excel spreadsheet viewport mockup styled with lines and cell inputs */
                <div className="w-full bg-white rounded-lg shadow-lg border border-slate-300 overflow-hidden flex flex-col font-mono text-[8pt] text-slate-800">
                  <div className="bg-slate-100 border-b border-gray-200 p-2 text-slate-400 font-sans font-bold flex items-center gap-2">
                    <span className="text-gray-700 bg-emerald-600 text-white rounded px-2.5 py-0.5 text-[7pt] uppercase tracking-wider font-extrabold flex items-center gap-1">Sheets Simulator</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-slate-650 truncate max-w-xs">{previewingFile.name} (Bảng 1 - Phân tích định mức)</span>
                  </div>
                  
                  {/* Grid layout Excel columns */}
                  <div className="flex-1 overflow-auto max-h-[60vh]">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#f0f4fa] text-[#164399] font-extrabold text-center border-b border-[#164399]/10 select-none">
                          <th className="p-1 px-2 border-r border-gray-200 bg-[#f0f4fa] w-8"></th>
                          <th className="p-1.5 border-r border-[#cbd5e1] text-left uppercase tracking-wider min-w-[120px]">Mã PMIS</th>
                          <th className="p-1.5 border-r border-[#cbd5e1] text-left uppercase tracking-wider min-w-[280px]">Mô tả chi tiết hạng mục</th>
                          <th className="p-1.5 border-r border-[#cbd5e1] uppercase tracking-wider w-24">SLVH (Bộ)</th>
                          <th className="p-1.5 border-r border-[#cbd5e1] uppercase tracking-wider w-24">Định mức</th>
                          <th className="p-1.5 border-r border-[#cbd5e1] uppercase tracking-wider w-24">Đề xuất cấp</th>
                          <th className="p-1.5 uppercase tracking-wider w-28 bg-emerald-50/20 text-[#164399]">Trọng số ưu tiên</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 text-[8.5pt]">
                        {[
                          { code: 'FCO-35kV', name: 'Cầu chì tự rơi FCO 35kV polymer chịu tải 100A', running: 12, norm: 15, proposed: 3, priority: 'Rất cao (Sự cố)' },
                          { code: 'CSV-35kV', name: 'Chống sét van 35kV cấp khí bảo vệ lưới ngoài trời', running: 45, norm: 50, proposed: 5, priority: 'Cao' },
                          { code: 'MC-SF6-110', name: 'Máy cắt dầu SF6 cách điện rắn thương hiệu Siemens', running: 4, norm: 4, proposed: 0, priority: 'Trung bình' },
                          { code: 'MC-110-AL', name: 'Cuộn kháng san điện áp 110kV lõi dầu kín', running: 1, norm: 2, proposed: 1, priority: 'Cao (Nhập khẩu)' },
                          { code: 'THT-250', name: 'Tủ hạ thế đo đếm ngoài trời đồng bộ áp-tô-mát 250A', running: 8, norm: 12, proposed: 4, priority: 'Trung bình' },
                          { code: 'MBA-110-100', name: 'Máy biến áp phân phối Amorphous tiết kiệm điện 100kVA', running: 6, norm: 8, proposed: 2, priority: 'Khẩn cấp' }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 text-left">
                            <td className="p-1 text-center bg-slate-50  text-gray-400 font-sans text-[7.5pt] select-none font-bold">{idx + 1}</td>
                            <td className="p-2  font-semibold text-red-600">{row.code}</td>
                            <td className="p-2  text-slate-800 font-sans font-semibold truncate max-w-sm" title={row.name}>{row.name}</td>
                            <td className="p-2  text-center font-bold text-blue-600 bg-blue-50/5 font-mono">{row.running}</td>
                            <td className="p-2  text-center font-mono text-gray-500">{row.norm}</td>
                            <td className="p-2  text-center font-bold text-amber-700 bg-amber-50/10 font-mono">{row.proposed}</td>
                            <td className="p-2 text-center text-emerald-800 font-extrabold bg-emerald-50/10 font-sans text-[8pt]">{row.priority}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-slate-50 p-2.5 border-t border-gray-200 text-gray-400 text-left font-sans text-[7.5pt] font-semibold">
                    * Ghi chú: Dữ liệu phân tích tự động kéo trực từ cơ sở dữ liệu định mức sự cố lưới điện Hưng Yên.
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-end shrink-0">
              <button 
                onClick={() => setPreviewingFile(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-bold text-[9pt] uppercase tracking-wide cursor-pointer transition-colors"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Reusable SYSTEM REFERENCE LIBRARY POPUP */}
      <DocumentLibraryModal
        isOpen={showLibraryModal}
        onClose={() => setShowLibraryModal(false)}
        selectedIds={formDocs.map(fd => fd.name)}
        customDocumentsPool={[
          { id: 'DP1', name: 'Quy_trinh_kiem_tra_van_hanh_may_bien_ap_evn.pdf', category: 'evn', type: 'Quy trình EVN', size: '2.4 MB', code: 'EVN-QT-01', desc: 'Quy trình phối hợp vận hành máy biến áp lực của EVN' },
          { id: 'DP2', name: 'Huong_dan_bao_tri_may_cat_ABB_SF6_110kV.pdf', category: 'nsx', type: 'Sách HD NSX', size: '4.1 MB', code: 'ABB-SF6', desc: 'Sách hướng dẫn bảo dưỡng dòng máy cắt khí SF6 ABB' },
          { id: 'DP3', name: 'Tieu_chuan_thiet_ke_va_lap_dat_luoi_dien_110kV.pdf', category: 'standard', type: 'Tiêu chuẩn', size: '5.2 MB', code: 'TCVN-110kV', desc: 'Tiêu chuẩn quốc gia về lắp đặt trạm phân phối cao áp' },
          { id: 'DP4', name: 'Datasheet_va_catalogue_dao_cach_ly_SIEMENS.pdf', category: 'nsx', type: 'Bản vẽ & NSX', size: '1.8 MB', code: 'SIE-DCL', desc: 'Thông số kỹ thuật dòng dao cách ly Siemens chính hãng' },
          { id: 'DP5', name: 'Quy_chuan_ky_thuan_quoc_gia_an_toan_dien.pdf', category: 'standard', type: 'Tiêu chuẩn', size: '3.6 MB', code: 'QCVN-2020', desc: 'Quy chuẩn an toàn quốc gia khi thao tác luồng điện lớn' },
          { id: 'DP6', name: 'Bien_ban_kiem_dinh_chat_luong_dau_may_bien_ap.docx', category: 'template', type: 'Mẫu biên bản', size: '450 KB', code: 'BM-DK-DAU', desc: 'Mẫu văn bản thử nghiệm độ chịu lực và điện học của dầu' },
          { id: 'DP7', name: 'Quy_trinh_xu_ly_su_co_luoi_truyen_tai_quoc_gia.pdf', category: 'evn', type: 'Quy trình EVN', size: '1.2 MB', code: 'EVN-SUTAI', desc: 'Quy chế khắc phục sự cố khẩn cấp trên hệ thống truyền tải' }
        ]}
        onToggleDoc={(doc) => {
          const isAttached = formDocs.some(fd => fd.name === doc.name);
          if (isAttached) {
            setFormDocs(prev => prev.filter(fd => fd.name !== doc.name));
            triggerAlert('info', `Đã gỡ tài liệu khỏi phiếu: ${doc.name}`);
          } else {
            setFormDocs(prev => [...prev, { name: doc.name, size: doc.size }]);
            triggerAlert('success', `Đã đính kèm tài liệu: ${doc.name}`);
          }
        }}
      />

    </div>
  );
};
