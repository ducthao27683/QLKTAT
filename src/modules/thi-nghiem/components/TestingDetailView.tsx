import React from 'react';
import { 
  Check, Share2, MessageSquare, CheckCircle, Lock, Eye, Zap, ListChecks, Database, 
  Trash2, Box, History, Camera, FileText, Download, Plus, KeyRound,
  ChevronRight, ChevronLeft, Calendar, Clock, User, ArrowRight, Activity, Settings, CheckCircle2,
  LayoutGrid, Home, Send, Edit, Search, X
} from 'lucide-react';
import { EvnLogo } from '../../../components/EvnLogo';
import { FileUploader } from '../../../components/FileUploader';
import { capitalizeBusinessName } from '../../../shared/utils';
import { TestingStandardsConfig } from './TestingStandardsConfig';
import { DocumentLibraryModal } from '../../../shared/components/common/DocumentLibraryModal';

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

const getDeviceVoltage = (deviceObj: any) => {
  if (!deviceObj) return '110kV';
  if (deviceObj.voltage) return deviceObj.voltage;
  const text = `${deviceObj.device || ''} ${deviceObj.location || ''} ${deviceObj.path || ''}`.toLowerCase();
  if (text.includes('110kv') || text.includes('110 kv')) return '110kV';
  if (text.includes('220kv') || text.includes('220 kv')) return '220kV';
  if (text.includes('35kv') || text.includes('35 kv')) return '35kV';
  if (text.includes('22kv') || text.includes('22 kv')) return '22kV';
  if (text.includes('500kv') || text.includes('500 kv')) return '500kV';
  if (text.includes('6kv') || text.includes('6 kv')) return '6kV';
  if (text.includes('0.4kv') || text.includes('0.4 kv') || text.includes('0,4kv')) return '0.4kV';
  return '110kV';
};

const addMonthsToDate = (dateStr: string, monthsStr: string): string => {
  if (!dateStr) return '';
  const months = parseInt(monthsStr) || 12;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  date.setMonth(date.getMonth() + months);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const computeTestingStatus = (nextTestStr: string) => {
  if (!nextTestStr) return { label: 'Chưa đến hạn', colorClass: 'text-green-700 bg-green-50 border-green-250' };
  const nextDate = new Date(nextTestStr);
  if (isNaN(nextDate.getTime())) {
    return { label: 'Chưa đến hạn', colorClass: 'text-green-700 bg-green-50 border-green-250' };
  }
  const currentDate = new Date('2026-06-16');
  nextDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  
  const diffTime = nextDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { 
      label: 'Quá hạn', 
      colorClass: 'text-red-700 bg-red-100 border-red-300 font-extrabold uppercase' 
    };
  } else if (diffDays <= 10) {
    return { 
      label: 'Đến hạn 10 Ng', 
      colorClass: 'text-rose-700 bg-rose-100 border-rose-300 font-extrabold uppercase animate-pulse' 
    };
  } else if (diffDays <= 20) {
    return { 
      label: 'Đến hạn 20 Ng', 
      colorClass: 'text-orange-700 bg-orange-100 border-orange-300 font-extrabold uppercase' 
    };
  } else if (diffDays <= 30) {
    return { 
      label: 'Đến hạn 1 Th', 
      colorClass: 'text-amber-700 bg-amber-100 border-amber-300 font-extrabold uppercase' 
    };
  } else {
    return { 
      label: 'Chưa đến hạn', 
      colorClass: 'text-green-700 bg-green-50 border-green-300 font-extrabold uppercase' 
    };
  }
};

const getStandardsForType = (type: string) => {
  const t = type?.toUpperCase() || 'MBA';
  if (t === 'MBA' || t === 'MÁY BIẾN ÁP' || t === 'TRẠM') {
    return [
      { id: 'S1', name: 'Đo điện trở cách điện cuộn dây (R60)', unit: 'MΩ', limit: '≥ 2005', standard: 'TCVN 1985-2015' },
      { id: 'S2', name: 'Đo tỷ số biến áp (Tỉ số biến)', unit: '%', limit: '≤ 0.5', standard: 'IEC 60076' },
      { id: 'S3', name: 'Đo điện trở một chiều các cuộn dây', unit: 'mΩ', limit: '≤ 13.0', standard: 'IEEE C57.152' },
      { id: 'S4', name: 'Thử độ bền điện môi dầu cách điện', unit: 'kV', limit: '≥ 35', standard: 'TCVN 7447' },
      { id: 'S5', name: 'Đo chiết suất & hàm lượng ẩm dầu', unit: 'ppm', limit: '≤ 15', standard: 'IEC 60076-1' }
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

interface TestingDetailViewProps {
  detailForm: any;
  setDetailForm: (form: any) => void;
  activeSubMenu: string | null;
  setActiveSubMenu: (submenu: string) => void;
  devicePath: string[];
  config: any;
  setShowApprovalPopup: (show: boolean) => void;
  setShowDeviceSelection: (show: boolean) => void;
  setShowDeviceParams: (val: any) => void;
  setConfirmAction: (action: any) => void;
  setPreviewContent?: (val: any) => void;
}

export const TestingDetailView = ({
  detailForm,
  setDetailForm,
  activeSubMenu,
  setActiveSubMenu,
  devicePath,
  config,
  setShowApprovalPopup,
  setShowDeviceSelection,
  setShowDeviceParams,
  setConfirmAction,
  setPreviewContent
}: TestingDetailViewProps) => {
  const [showHistory, setShowHistory] = React.useState(false);
  const [activeFormTab, setActiveFormTab] = React.useState<'general' | 'devices' | 'safety_attachments'>('general');
  const [detailDeviceSearchText, setDetailDeviceSearchText] = React.useState('');
  const [detailDeviceStatusSelectFilter, setDetailDeviceStatusSelectFilter] = React.useState('Tất cả');
  const [selectedDeviceIndices, setSelectedDeviceIndices] = React.useState<number[]>([]);
  const [detailDeviceFilter, setDetailDeviceFilter] = React.useState<'all' | 'cho_duyet' | 'bp_ct_duyet' | 'bp_ct_khong_duyet'>('all');
  const [activeCatalogTab, setActiveCatalogTab] = React.useState<'general' | 'standards' | 'history'>('general');
  const [isDocLibraryOpen, setIsDocLibraryOpen] = React.useState(false);
  const [newComment, setNewComment] = React.useState("");
  const [comments, setComments] = React.useState<any[]>([]);
  const [detailDevicesPage, setDetailDevicesPage] = React.useState(1);
  const [localDocs, setLocalDocs] = React.useState<any[]>([
    { id: 'initial-1', name: 'Phuong_an_thi_nghiem_MBA_T1.pdf', size: '2.4 MB', author: 'Nguyễn Văn A' },
    { id: 'initial-2', name: 'Bien_ban_kiem_dinh_chan_su_110kv.pdf', size: '1.8 MB', author: 'Vũ Văn Mới' }
  ]);

  const handleFormDocPreview = (name: string, size?: string) => {
    if (setPreviewContent) {
      setPreviewContent({
        type: 'file',
        url: '#',
        name: name,
        fileCode: 'DOC-PLAN-01',
        fileDate: '15/06/2026',
        fileSize: size || '2.4 MB',
        fileName: name
      });
    }
  };

  const handleFormImgPreview = (imgUrl: string) => {
    if (setPreviewContent) {
      setPreviewContent({
        type: 'image',
        url: imgUrl,
        name: 'HÌNH ẢNH HIỆN TRƯỜNG',
        imagesList: [
          `https://picsum.photos/seed/test-v3-1/400/300`,
          `https://picsum.photos/seed/test-v3-2/400/300`
        ],
        currentIndex: imgUrl.includes('test-v3-2') ? 1 : 0
      });
    }
  };

  const handleToggleDoc = (doc: any) => {
    setLocalDocs(prev => {
      const exists = prev.some(d => d.id === doc.id || d.name === doc.name);
      if (exists) {
        return prev.filter(d => d.id !== doc.id && d.name !== doc.name);
      } else {
        return [...prev, {
          id: doc.id,
          name: doc.name,
          size: doc.size,
          author: 'Hệ thống'
        }];
      }
    });
  };

  const handleDeleteDoc = (docIdOrName: string) => {
    setLocalDocs(prev => prev.filter(d => d.id !== docIdOrName && d.name !== docIdOrName));
  };

  if (!detailForm) return null;

  const isTestingPlan = detailForm.type === 'testing_plan';
  const isTestingCatalog = detailForm.type === 'testing_catalog';

  if (!isTestingPlan && !isTestingCatalog) return null;

  return (
    <>
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/30 flex flex-col">
        {isTestingPlan && (
          <div className="sticky top-0 z-25 bg-white border-b border-gray-100 shrink-0 w-full px-6 flex select-none">
            {
            [
              { id: 'general', label: 'Thông tin chung' },
              { id: 'devices', label: 'Danh sách thiết bị đăng ký' },
              ...(detailForm.mode === 'view' ? [{ id: 'history', label: 'Ý kiến & Lịch sử' }] : [])
            ].map(tab => {
              const isActive = activeFormTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveFormTab(tab.id as any);
                  }}
                  className={`flex-1 h-12 text-center text-[12pt] font-bold transition-all relative cursor-pointer select-none ${
                    isActive 
                      ? 'text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
        )}

        {isTestingCatalog && (
          <div className="sticky top-0 z-25 bg-white border-b border-gray-100 shrink-0 w-full px-6 flex select-none">
            {[
              { id: 'general', label: 'Thông tin chung' },
              { id: 'standards', label: 'Hạng mục kiểm tra' },
              ...(detailForm.mode === 'view' ? [{ id: 'history', label: 'Lịch sử kiểm tra' }] : [])
            ].map(tab => {
              const isActive = activeCatalogTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCatalogTab(tab.id as any)}
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
        )}

        <div className={`flex-1 flex flex-col ${isTestingPlan && activeFormTab === 'devices' ? 'p-0 pt-2 h-full' : 'p-6 space-y-6'}`}>
          {/* Main Content Grid */}
          <div className="flex-1 flex flex-col min-h-0">
            {((isTestingPlan && activeFormTab === 'general') || (isTestingCatalog && activeCatalogTab === 'general')) && (
              <div className="space-y-6 lg:col-span-2 w-full animate-in fade-in duration-300">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8 min-h-fit">
                  {isTestingPlan ? (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="bg-red-50/70 text-red-700 font-mono font-black text-[10.5pt] uppercase px-3 py-1 rounded-lg border border-red-100/50">
                            {detailForm.data?.code || (activeSubMenu === 'Yêu cầu thí nghiệm' ? 'YC' : 'KH') + '-TN-2026-XXX'}
                          </span>
                          
                          {/* Single Plan Status Badge: Chưa xác nhận / Đã xác nhận */}
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8pt] font-black uppercase tracking-widest leading-none border ${
                            detailForm.data?.status === 'Đã duyệt'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-3xs'
                              : 'bg-amber-50 text-amber-600 border-amber-100 shadow-3xs'
                          }`}>
                            {detailForm.data?.status === 'Đã duyệt' ? 'ĐÃ XÁC NHẬN' : 'CHƯA XÁC NHẬN'}
                          </span>
                        </div>
                        
                        <input 
                          type="text"
                          value={(detailForm.data?.title || `${devicePath[devicePath.length - 1] || 'Thiết bị'} - ${new Date().getFullYear()}`).replace(/Kế hoạch/g, 'Đăng ký')} 
                          onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, title: e.target.value } })}
                          readOnly={detailForm.mode === 'view'}
                          placeholder={`Nhập tiêu đề hồ sơ...`}
                          className={`w-full text-[14pt] font-black rounded-xl transition-all text-[#164399] leading-tight ${
                            detailForm.mode === 'view' 
                              ? 'bg-transparent border-transparent px-0 py-0.5 focus:outline-none' 
                              : 'bg-slate-50 border border-slate-200 px-4 py-2.5 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none'
                          }`}
                        />
                        
                        {/* Compact space-divider */}
                        <div className="border-t border-slate-100/60 my-2 select-none"></div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                         {/* LEFT COLUMN */}
                         <div className="space-y-6">
                                    {/* Merged Info and Confirmations Box */}
                                   <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-5 text-left">
                                       {/* Row 1: Ngày lập, người lập, và các nút Phê duyệt */}
                                       <div>
                                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-lg border border-slate-100 shadow-3xs w-full">
                                             <div className="flex flex-wrap items-center gap-4">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                   <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                                                   <span className="text-[9.5pt] font-bold text-gray-400">Ngày lập:</span>
                                                   <span className="text-[10pt] font-black text-gray-800">{detailForm.data?.createdDate || '12/04/2026'}</span>
                                                </div>
                                                <div className="hidden sm:block text-gray-200">|</div>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                   <User className="w-4 h-4 text-blue-500 shrink-0" />
                                                   <span className="text-[9.5pt] font-bold text-gray-400">Người lập:</span>
                                                   <span className="text-[10pt] font-black text-gray-800">{detailForm.data?.creator || 'Nguyễn Văn A'}</span>
                                                </div>
                                             </div>

                                             {/* Buttons on the SAME line */}
                                             <div className="flex items-center gap-2">
                                               {(!detailForm.data?.status || detailForm.data?.status === 'Khởi tạo') && (
                                                 <button 
                                                   type="button"
                                                   onClick={() => {
                                                     setDetailForm({ 
                                                       ...detailForm, 
                                                       data: { ...detailForm.data, status: 'Chờ xác nhận' } 
                                                     });
                                                     setConfirmAction?.({
                                                       title: 'Đăng ký thành công',
                                                       message: 'Đã gửi thông báo đăng ký phiếu yêu cầu!',
                                                       onConfirm: () => {}
                                                     });
                                                   }}
                                                   className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[8.5pt] font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-blue-700 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                                                 >
                                                   <Send className="w-3.5 h-3.5" /> Đăng ký
                                                 </button>
                                               )}
                                               
                                               {detailForm.data?.status === 'Chờ xác nhận' && (
                                                 <button 
                                                   type="button"
                                                   onClick={() => {
                                                     setDetailForm({ 
                                                       ...detailForm, 
                                                       data: { ...detailForm.data, status: 'Đã duyệt' } 
                                                     });
                                                     setConfirmAction?.({
                                                       title: 'Thành công',
                                                       message: 'Phiếu đã chuyển sang Đã xác nhận!',
                                                       onConfirm: () => {}
                                                     });
                                                   }}
                                                   className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[8.5pt] font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-emerald-700 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                                                 >
                                                   <Check className="w-3.5 h-3.5" strokeWidth={3} /> Xác nhận
                                                 </button>
                                               )}

                                               {detailForm.data?.status === 'Đã duyệt' && (
                                                 <button 
                                                   type="button"
                                                   onClick={() => {
                                                     setDetailForm({ 
                                                       ...detailForm, 
                                                       data: { ...detailForm.data, status: 'Chờ xác nhận' } 
                                                     });
                                                     setConfirmAction?.({
                                                       title: 'Thành công',
                                                       message: 'Phiếu đã chuyển sang Chưa xác nhận!',
                                                       onConfirm: () => {}
                                                     });
                                                   }}
                                                   className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-[8.5pt] font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-amber-600 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                                                 >
                                                   <Check className="w-3.5 h-3.5" strokeWidth={3} /> Hủy Xác nhận
                                                 </button>
                                               )}
                                             </div>
                                          </div>
                                       </div>
                                    </div>

                                    {/* Configuration Section (Stats + Description) */}
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 text-left">
                                       
                                       {/* Statistics section */}
                                       <div className="space-y-3">
                                          <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2 pl-1">
                                            <LayoutGrid className="w-4.5 h-4.5 text-blue-500" /> Thống kê thiết bị
                                          </h4>
                                          {(() => {
                                             const devicesList = detailForm.data?.devices || [];
                                             const isApprovedAll = detailForm.data?.status === 'Đã duyệt';
                                             const isRejectedAll = detailForm.data?.status === 'Không duyệt';

                                             const dvdkDuyet = devicesList.filter((d: any) => d.status === 'Đã duyệt' || d.status === 'Đã xong' || isApprovedAll).length;
                                             const dvdkKhongDuyet = devicesList.filter((d: any) => d.status === 'Không duyệt' || isRejectedAll).length;
                                             const dvdkChoDuyet = devicesList.length - dvdkDuyet - dvdkKhongDuyet;

                                             const dvtnDuyet = devicesList.filter((d: any) => d.status === 'Đã duyệt' || d.status === 'Đã xong').length;
                                             const dvtnKhongDuyet = devicesList.filter((d: any) => d.status === 'Không duyệt').length;
                                             const dvtnChoDuyet = devicesList.length - dvtnDuyet - dvtnKhongDuyet;

                                             return (
                                                <div className="bg-transparent pt-3 space-y-3 pb-2 border-b border-gray-100">
                                                  {/* Row 1: ĐVĐK */}
                                                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 bg-transparent pb-3 border-b border-gray-100">
                                                    <div className="flex flex-col text-left shrink-0">
                                                      <span className="text-[9.5pt] font-extrabold text-[#164399] leading-tight">Đơn vị đăng ký</span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                      <span className="text-[8.5pt] font-bold text-gray-550 bg-slate-50 px-2.5 py-1 rounded-full">
                                                        Tổng: {devicesList.length}
                                                      </span>
                                                      <span className="text-[8.5pt] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                                        Duyệt: {dvdkDuyet}
                                                      </span>
                                                      <span className="text-[8.5pt] font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                                                        Không duyệt: {dvdkKhongDuyet}
                                                      </span>
                                                      <span className="text-[8.5pt] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                                        Chờ duyệt: {dvdkChoDuyet}
                                                      </span>
                                                    </div>
                                                  </div>

                                                  {/* Row 2: ĐVTN */}
                                                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 bg-transparent pb-0 border-none">
                                                    <div className="flex flex-col text-left shrink-0">
                                                      <span className="text-[9.5pt] font-extrabold text-[#164399] leading-tight">Đơn vị thí nghiệm</span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                      <span className="text-[8.5pt] font-bold text-gray-550 bg-slate-50 px-2.5 py-1 rounded-full">
                                                        Tổng: {devicesList.length}
                                                      </span>
                                                      <span className="text-[8.5pt] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                                        Duyệt: {dvtnDuyet}
                                                      </span>
                                                      <span className="text-[8.5pt] font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                                                        Không duyệt: {dvtnKhongDuyet}
                                                      </span>
                                                      <span className="text-[8.5pt] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                                        Chờ duyệt: {dvtnChoDuyet}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                             );
                                          })()}
                                       </div>

                                       {/* Description box */}
                                       <div className="space-y-3 pt-2">
                                          <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2 pl-1">
                                            <ListChecks className="w-4.5 h-4.5 text-blue-500" /> Nội dung thực hiện
                                          </h4>
                                          <textarea 
                                            rows={4}
                                            value={detailForm.data?.description || "Thực hiện công tác thí nghiệm định kỳ theo quy trình kỹ thuật hiện hành."} 
                                            onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, description: e.target.value } })}
                                            readOnly={detailForm.mode === 'view'}
                                            className="w-full p-4 text-[10.5pt] font-medium leading-relaxed rounded-[1.2rem] transition-all bg-gray-50 border border-transparent focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-inner resize-none"
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 {/* RIGHT COLUMN (50% width) - Documents & Images */}
                                 <div className="space-y-6">
                                    {/* Attached documents */}
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-left">
                                       <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                          <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                            <FileText className="w-5 h-5 text-red-500" /> TÀI LIỆU ĐÍNH KÈM
                                          </h4>
                                          {detailForm.mode !== 'view' && (
                                            <button
                                              type="button"
                                              onClick={() => setIsDocLibraryOpen(true)}
                                              className="px-3 py-1 bg-blue-50 text-[#164399] rounded-full text-[8.5pt] font-black hover:bg-blue-100 transition-all border border-blue-100 flex items-center gap-1 cursor-pointer"
                                            >
                                              <Plus className="w-3.5 h-3.5 text-[#164399]" /> Từ thư viện
                                            </button>
                                          )}
                                       </div>
                                       <div className="space-y-3">
                                         {localDocs.map((doc, idx) => (
                                           <div 
                                             key={doc.id || idx} 
                                             className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg border border-gray-100 group hover:border-slate-300 hover:bg-white transition-all cursor-pointer shadow-xs" 
                                             onClick={() => handleFormDocPreview(doc.name, doc.size)}
                                           >
                                              <div className="flex items-center gap-2.5 min-w-0">
                                                 <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm animate-fade-in transition-transform group-hover:scale-105">
                                                   <FileText className="w-4.5 h-4.5 text-red-500" />
                                                 </div>
                                                 <div className="min-w-0 flex flex-col text-left">
                                                   <p className="text-[9.5pt] font-bold text-gray-800 line-clamp-1 group-hover:text-[#164399] transition-colors text-left">{doc.name}</p>
                                                   <p className="text-[8.5pt] text-slate-400 font-medium tracking-tight text-left mt-0.5">{doc.author} | 15/06/2026 | {doc.size}</p>
                                                 </div>
                                              </div>
                                              {detailForm.mode !== 'view' && (
                                                <div className="flex items-center shrink-0 ml-2" onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id || doc.name); }}>
                                                  <button className="p-1.5 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors rounded-[20%] border-none cursor-pointer">
<Trash2 className="w-4 h-4" />
</button>
                                                </div>
                                              )}
                                           </div>
                                         ))}
                                         {detailForm.mode !== 'view' && (
                                           <FileUploader type="document" mode={detailForm.mode} onFileSelect={() => {}} />
                                         )}
                                       </div>
                                    </div>

                            {/* Illustrative images */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-left">
                               <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                  <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                    <Camera className="w-5 h-5 text-orange-500" /> HÌNH ẢNH MINH HỌA
                                  </h4>
                                </div>
                               <div className="space-y-4">
                                  {/* Images Grid */}
                                  <div className="grid grid-cols-2 gap-3">
                                     {[1, 2].map(i => (
                                       <div 
                                         key={i} 
                                         className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group relative shadow-sm hover:shadow-md transition-all duration-300"
                                         onClick={() => handleFormImgPreview(`https://picsum.photos/seed/test-v3-${i}/400/300`)}
                                       >
                                          <img 
                                            src={`https://picsum.photos/seed/test-v3-${i}/400/300`} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-zoom-in" 
                                            referrerPolicy="no-referrer" 
                                            alt="" 
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                          </div>
                                          {detailForm.mode !== 'view' && (
                                            <div 
                                              className="absolute top-1.5 right-1.5 p-1 bg-red-50 text-white rounded-xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity shadow"
                                              onClick={(e) => { e.stopPropagation(); }}
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </div>
                                          )}
                                       </div>
                                     ))}
                                  </div>
                                  
                                  {detailForm.mode !== 'view' && (
                                    <div className="pt-2">
                                      <FileUploader 
                                        type="image" 
                                        mode={detailForm.mode} 
                                        onFileSelect={() => {}} 
                                      />
                                    </div>
                                  )}
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  ) : (
                    /* CATALOG/DEVICE STATIC INFO VIEW WITHOUT TITLE LABELS */
                    <div className="grid lg:grid-cols-5 gap-6 items-start">
                      {/* Left Column: Device Info, Docs and Images (60%) */}
                      <div className="space-y-6 w-full flex flex-col lg:col-span-3">
                        <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                           <div className="flex flex-col gap-1">
                              <span className="bg-slate-100 text-slate-600 font-mono font-bold text-[10pt] uppercase px-2.5 py-1.5 rounded-lg border border-slate-200 block w-fit shadow-xs select-none">
                                {detailForm.data?.voltage || getDeviceVoltage(detailForm.data)}
                              </span>
                           </div>
                           <div className="flex flex-col gap-1">
                              <span className="bg-red-50 text-red-600 font-mono font-bold text-[10pt] uppercase px-2.5 py-1.5 rounded-lg border border-red-100 block w-fit shadow-xs">
                                {detailForm.data?.code || 'PD-MBA-001'}
                              </span>
                           </div>
                           <div className="flex flex-col gap-1">
                              <div className="bg-blue-50 text-[#164399]/95 font-bold text-[9.5pt] uppercase px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-2 w-fit transition-all hover:bg-blue-100 shadow-xs">
                                 <Box className="w-4 h-4 opacity-70" /> 
                                 {detailForm.mode === 'add' ? (
                                   <select 
                                     value={detailForm.data?.type || 'MBA'}
                                     onChange={(e) => setDetailForm({ ...detailForm, data: { ...detailForm.data, type: e.target.value } })}
                                     className="bg-transparent border-none outline-none focus:ring-0 font-bold uppercase text-[#164399] p-0 text-[10pt]"
                                   >
                                      <option value="MBA">Máy biến áp</option>
                                      <option value="MC">Máy cắt</option>
                                      <option value="TI">Biến dòng</option>
                                      <option value="TU">Biến điện áp</option>
                                      <option value="CSV">Chống sét van</option>
                                      <option value="ĐD">Đường dây</option>
                                   </select>
                                 ) : (
                                   <span className="font-bold">{normalizeType(detailForm.data?.type) || 'Máy biến áp'}</span>
                                 )}
                              </div>
                           </div>
                        </div>

                        <div className="space-y-1">
                          {detailForm.mode === 'add' ? (
                            <textarea 
                              rows={1}
                              value={detailForm.data?.device || ""} 
                              onChange={(e) => setDetailForm({...detailForm, data: {...detailForm.data, device: e.target.value}})}
                              placeholder="Nhập tên thiết bị..."
                              className="w-full px-0 py-1 text-[13pt] font-black rounded-lg transition-all text-[#164399] leading-tight resize-none bg-transparent border-b border-gray-200 focus:border-[#164399] focus:ring-0"
                            />
                          ) : (
                            <div className="space-y-1">
                              <div className="text-[13pt] font-black text-[#164399] leading-tight select-text py-1 text-left">
                                {detailForm.data?.device || ""}
                              </div>
                              {detailForm.mode === 'view' && (
                                <div className="space-y-2 mt-4 pt-3 border-t border-dashed border-gray-100 text-left">
                                  <label className="text-[8pt] font-black text-gray-400 uppercase tracking-widest block font-sans">Biên bản thí nghiệm gần nhất</label>
                                  <div className="space-y-1.5">
                                    {[
                                      { code: 'BBTN-2026-X12', title: 'Thí nghiệm định kỳ máy biến áp T1', date: '15/05/2026', status: 'ĐẠT' },
                                      { code: 'BBTN-2025-X04', title: 'Thí nghiệm kiểm định định kỳ mẫu dầu máy biến áp', date: '12/04/2025', status: 'ĐẠT' }
                                    ].map((report, rIdx) => (
                                      <div
                                        key={rIdx}
                                        onClick={() => setActiveSubMenu('Kết quả thí nghiệm')}
                                        className="group flex items-center justify-between p-2 rounded-xl bg-slate-50/50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer shadow-xs"
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                                          <div className="flex flex-col min-w-0 text-left">
                                            <span className="text-[9.5pt] font-black text-[#164399] group-hover:underline truncate">{report.code}</span>
                                            <span className="text-[8.5pt] font-medium text-gray-500 truncate leading-snug">{report.title}</span>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                          <span className="text-[8.5pt] font-bold font-mono text-gray-400">{report.date}</span>
                                          <span className="text-[8pt] font-black px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase font-mono">
                                            {report.status}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Left Column Part 2: Documents and Images */}
                          {/* DOCUMENTS SECTION */}
                          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-left">
                             <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                  <FileText className="w-5 h-5 text-red-500" /> TÀI LIỆU KIỂM TRA
                                </h4>
                             </div>
                             <div className="space-y-3">
                               {localDocs.map((doc, idx) => (
                                 <div 
                                   key={doc.id || idx} 
                                   className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg border border-gray-100 group hover:border-slate-300 hover:bg-white transition-all cursor-pointer shadow-xs" 
                                   onClick={() => handleFormDocPreview(doc.name, doc.size)}
                                 >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                       <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                         <FileText className="w-4.5 h-4.5 text-red-500" />
                                       </div>
                                       <div className="min-w-0 flex flex-col text-left">
                                         <p className="text-[9.5pt] font-bold text-gray-800 line-clamp-1 group-hover:text-[#164399] transition-colors text-left">{doc.name}</p>
                                         <p className="text-[8.5pt] text-slate-400 font-medium tracking-tight text-left mt-0.5">{doc.author} | 15/06/2026 | {doc.size}</p>
                                        </div>
                                     </div>
                                     {detailForm.mode !== 'view' && (
                                       <div className="flex items-center shrink-0 ml-2" onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id || doc.name); }}>
                                         <button className="p-1.5 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors rounded-[20%] border-none cursor-pointer">
<Trash2 className="w-4 h-4" />
</button>
                                       </div>
                                     )}
                                  </div>
                                ))}
                                {detailForm.mode !== 'view' && (
                                  <FileUploader type="document" mode={detailForm.mode} onFileSelect={() => {}} />
                                )}
                              </div>
                           </div>

                          {/* IMAGES SECTION */}
                          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-left">
                             <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                                  <Camera className="w-5 h-5 text-orange-500" /> HÌNH ẢNH KIỂM TRA
                                </h4>
                             </div>
                             <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                   {[1, 2].map(i => (
                                     <div 
                                       key={i} 
                                       className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group relative shadow-sm hover:shadow-md transition-all duration-300"
                                       onClick={() => handleFormImgPreview(`https://picsum.photos/seed/test-v3-${i}/400/300`)}
                                     >
                                        <img 
                                          src={`https://picsum.photos/seed/test-v3-${i}/400/300`} 
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-zoom-in" 
                                          referrerPolicy="no-referrer" 
                                          alt="" 
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                          <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        {detailForm.mode !== 'view' && (
                                          <div 
                                            className="absolute top-1.5 right-1.5 p-1 bg-red-50 text-white rounded-xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity shadow"
                                            onClick={(e) => { e.stopPropagation(); }}
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </div>
                                        )}
                                     </div>
                                   ))}
                                </div>
                                {detailForm.mode !== 'view' && (
                                  <div className="pt-2">
                                    <FileUploader type="image" mode={detailForm.mode} onFileSelect={() => {}} />
                                  </div>
                                )}
                             </div>
                          </div>
                      </div>

                      {/* Right Column: Configuration (40%) */}
                      <div className="space-y-6 lg:col-span-2">
                  {/* Selector for enabled forms in Column 2 */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 relative text-left">
                     
                     <div className="flex gap-3 flex-wrap">
                       {['Thí nghiệm', 'Kiểm định', 'Hiệu chuẩn'].map(formName => {
                         const enabledList = detailForm.data?.enabledForms || ['Thí nghiệm', 'Kiểm định'];
                         const isEnabled = enabledList.includes(formName);
                         return (
                           <label key={formName} className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg border transition-all ${isEnabled ? 'bg-[#164399]/10 border-[#164399]/20 text-[#164399] font-black' : 'bg-white border-gray-150/70 text-gray-400 hover:bg-slate-50'}`}>
                             <input
                               type="checkbox"
                               disabled={detailForm.mode === 'view'}
                               checked={isEnabled}
                               onChange={(e) => {
                                 if (detailForm.mode === 'view') return;
                                 const currentEnabled = detailForm.data?.enabledForms || ['Thí nghiệm', 'Kiểm định'];
                                 const newEnabled = e.target.checked 
                                   ? [...currentEnabled, formName] 
                                   : currentEnabled.filter((f: string) => f !== formName);
                                 if (newEnabled.length === 0) return;
                                 setDetailForm({
                                   ...detailForm,
                                   data: {
                                     ...detailForm.data,
                                     enabledForms: newEnabled
                                   }
                                 });
                               }}
                               className="w-4 h-4 text-[#164399] rounded border-gray-300 focus:ring-[#164399] cursor-pointer"
                             />
                             <span className="text-[10pt]">{formName}</span>
                           </label>
                         );
                       })}
                     </div>
                  </div>

                  {(detailForm.data?.enabledForms || ['Thí nghiệm', 'Kiểm định']).map(formName => {
                    const formConfig = detailForm.data?.configByForm?.[formName] || {
                      interval: formName === 'Thí nghiệm' ? (detailForm.data?.interval || '24 tháng') : formName === 'Kiểm định' ? '36 tháng' : '12 tháng',
                      subtype: formName === 'Thí nghiệm' ? (detailForm.data?.testTypeOption || 'Định kỳ') : 'Định kỳ',
                      lastTest: formName === 'Thí nghiệm' ? (detailForm.data?.lastTest || '2024-05-15') : '2024-08-10',
                      nextTest: '',
                      status: 'Chưa đến hạn',
                    };

                    // Auto initialize nextTest
                    if (!formConfig.nextTest && formConfig.lastTest) {
                      formConfig.nextTest = addMonthsToDate(formConfig.lastTest, formConfig.interval);
                    }

                    const updateFormConfig = (field: string, value: string) => {
                      const currentConfigByForm = detailForm.data?.configByForm || {};
                      const updatedFormConfig = {
                        ...formConfig,
                        [field]: value
                      };
                      if (field === 'interval' || field === 'lastTest') {
                        updatedFormConfig.nextTest = addMonthsToDate(
                          updatedFormConfig.lastTest || '2024-05-15',
                          updatedFormConfig.interval || '24 tháng'
                        );
                      }
                      setDetailForm({
                        ...detailForm,
                        data: {
                          ...detailForm.data,
                          configByForm: {
                            ...currentConfigByForm,
                            [formName]: updatedFormConfig
                          }
                        }
                      });
                    };

                    const statusInfo = computeTestingStatus(formConfig.nextTest || addMonthsToDate(formConfig.lastTest || '2024-05-15', formConfig.interval || '24 tháng'));

                    return (
                      <div key={formName} className="p-6 bg-slate-50/50 rounded-2xl border border-gray-100 space-y-4 shadow-sm text-left relative animate-in fade-in duration-300">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <h4 className="text-[10.5pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                            <Settings className="w-4.5 h-4.5 text-[#164399]" /> Cấu hình {formName} ĐỊNH KỲ
                          </h4>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 text-left">
                          <div className="space-y-1">
                            <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">NGÀY GẦN NHẤT</label>
                            <input 
                              type="date" 
                              value={formConfig.lastTest || '2024-05-15'} 
                              onChange={(e) => updateFormConfig('lastTest', e.target.value)}
                              disabled={detailForm.mode === 'view'}
                              className={`w-full px-3 py-1.5 text-[10pt] font-bold rounded-lg bg-white ${
                                detailForm.mode === 'view' 
                                  ? 'border-transparent shadow-none pointer-events-none appearance-none font-black' 
                                  : 'border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm font-black'
                              } disabled:bg-white text-gray-700 transition-all`} 
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">Chu kỳ định kỳ</label>
                            <select 
                              disabled={detailForm.mode === 'view'}
                              value={formConfig.interval}
                              onChange={(e) => updateFormConfig('interval', e.target.value)}
                              className={`w-full px-3 py-1.5 text-[10pt] font-bold rounded-lg bg-white ${
                                detailForm.mode === 'view' 
                                  ? 'border-transparent shadow-none pointer-events-none appearance-none font-black' 
                                  : 'border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm font-black'
                              } disabled:bg-white transition-all`}
                            >
                              <option value="12 tháng">12 tháng</option>
                              <option value="18 tháng">18 tháng</option>
                              <option value="24 tháng">24 tháng</option>
                              <option value="36 tháng">36 tháng</option>
                              <option value="48 tháng">48 tháng</option>
                              <option value="72 tháng">72 tháng</option>
                            </select>
                          </div>

                          

                          <div className="space-y-1 mt-4 col-span-full flex gap-4 h-[60px] max-w-[66%]">
                            <div className="flex-1 space-y-1">
                              <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">Ngày tiếp theo</label>
                              <input 
                                type="date" 
                                value={formConfig.nextTest || addMonthsToDate(formConfig.lastTest || '2024-05-15', formConfig.interval || '24 tháng')} 
                                onChange={(e) => updateFormConfig('nextTest', e.target.value)}
                                disabled={detailForm.mode === 'view'}
                                className={`w-full px-3 py-1.5 text-[10pt] font-bold rounded-lg bg-white ${
                                  detailForm.mode === 'view' 
                                    ? 'border-transparent shadow-none pointer-events-none appearance-none font-black' 
                                    : 'border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-sm font-black'
                                } disabled:bg-white text-gray-700 transition-all`} 
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <label className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest ml-1 font-sans">Trạng thái hạn</label>
                              <div className={`w-full px-3 py-1 text-[9pt] rounded-full border flex items-center justify-center font-black h-[34px] shadow-sm select-none ${statusInfo.colorClass}`}>
                                {statusInfo.label}
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

              {isTestingCatalog && activeCatalogTab === 'general' && detailForm.mode === 'add' && false && (
                <div className="space-y-8 mt-6 animate-in fade-in duration-300">
                  {/* IMAGES SECTION */}
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                     <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                          <Camera className="w-5 h-5 text-orange-500" /> HÌNH ẢNH MINH HỌA
                        </h4>
                     </div>
                     <div className="space-y-4">
                        {/* Images Grid */}
                        <div className="grid grid-cols-2 gap-3">
                           {[1, 2].map(i => (
                             <div 
                               key={i} 
                               className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group relative shadow-sm hover:shadow-md transition-all duration-300"
                               onClick={() => handleFormImgPreview(`https://picsum.photos/seed/test-v3-${i}/400/300`)}
                             >
                                <img 
                                  src={`https://picsum.photos/seed/test-v3-${i}/400/300`} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-zoom-in" 
                                  referrerPolicy="no-referrer" 
                                  alt="" 
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                  <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                {detailForm.mode !== 'view' && (
                                  <div 
                                    className="absolute top-1.5 right-1.5 p-1 bg-red-50 text-white rounded-xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity shadow"
                                    onClick={(e) => { e.stopPropagation(); }}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </div>
                                )}
                             </div>
                           ))}
                        </div>
                        
                        {detailForm.mode !== 'view' && (
                          <div className="pt-2">
                            <FileUploader 
                              type="image" 
                              mode={detailForm.mode} 
                              onFileSelect={() => {}} 
                            />
                          </div>
                        )}
                     </div>
                  </div>

                  {/* DOCUMENTS SECTION */}
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                     <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                          <FileText className="w-5 h-5 text-red-500" /> TÀI LIỆU ĐÍNH KÈM
                        </h4>
                        {detailForm.mode !== 'view' && (
                          <button
                            type="button"
                            onClick={() => setIsDocLibraryOpen(true)}
                            className="px-3 py-1 bg-blue-50 text-[#164399] rounded-full text-[8.5pt] font-black hover:bg-blue-100 transition-all border border-blue-100 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#164399]" /> Từ thư viện
                          </button>
                        )}
                     </div>
                     <div className="space-y-3">
                       {localDocs.map((doc, idx) => (
                         <div 
                           key={doc.id || idx} 
                           className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg border border-gray-100 group hover:border-slate-300 hover:bg-white transition-all cursor-pointer shadow-xs" 
                           onClick={() => handleFormDocPreview(doc.name, doc.size)}
                         >
                            <div className="flex items-center gap-2.5 min-w-0">
                               <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                 <FileText className="w-4.5 h-4.5 text-red-500" />
                               </div>
                               <div className="min-w-0 flex flex-col text-left">
                                 <p className="text-[9.5pt] font-bold text-gray-800 line-clamp-1 group-hover:text-[#164399] transition-colors text-left">{doc.name}</p>
                                  <p className="text-[8.5pt] text-slate-400 font-medium tracking-tight text-left mt-0.5">{doc.author} | 15/06/2026 | {doc.size}</p>
                                </div>
                             </div>
                             {detailForm.mode !== 'view' && (
                               <div className="flex items-center shrink-0 ml-2" onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id || doc.name); }}>
                                 <button className="p-1.5 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors rounded-[20%] border-none cursor-pointer">
<Trash2 className="w-4 h-4" />
</button>
                               </div>
                             )}
                          </div>
                        ))}
                        {detailForm.mode !== 'view' && (
                          <FileUploader type="document" mode={detailForm.mode} onFileSelect={() => {}} />
                        )}
                      </div>
                   </div>
                </div>
             )}

            </div>
          )}

             {((isTestingPlan && (activeFormTab === 'devices')) || (isTestingCatalog && activeCatalogTab === 'general')) && (
               <div className={`space-y-8 ${(isTestingPlan && activeFormTab === 'devices') ? 'flex flex-col h-full inset-0 animate-in fade-in duration-300' : ''}`}>
                {isTestingPlan && activeFormTab === 'devices' && (
                  /* DEVICE LIST IN GENERAL TAB */
                  <div className="bg-white h-full flex flex-col pt-4">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 select-none px-6 md:px-8">
                       {/* Left side: Quick Search and Status Filter Selection */}
                       <div className="flex flex-wrap items-center gap-3 flex-1">
                         <div className="relative w-full max-w-sm">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                           <input
                             type="text"
                             placeholder="Tìm nhanh thiết bị..."
                             value={detailDeviceSearchText}
                             onChange={(e) => {
                               setDetailDeviceSearchText(e.target.value);
                               setDetailDevicesPage(1);
                             }}
                             className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[9.5pt] font-medium outline-none focus:border-blue-500 bg-white placeholder-slate-400"
                           />
                         </div>
                         <div className="w-[180px] relative">
                           <select
                             value={detailDeviceStatusSelectFilter}
                             onChange={(e) => {
                               setDetailDeviceStatusSelectFilter(e.target.value);
                               setDetailDevicesPage(1);
                             }}
                             className="w-full pl-3 pr-8 py-2 border border-slate-250 rounded-lg text-[9.5pt] font-bold outline-none bg-white text-gray-755 appearance-none cursor-pointer"
                           >
                             <option value="Tất cả">Tất cả</option>
                             <option value="Chờ duyệt">Chờ duyệt</option>
                             <option value="ĐVĐK Duyệt">ĐVĐK Duyệt</option>
                             <option value="ĐVTN Duyệt">ĐVTN Duyệt</option>
                             <option value="Không Duyệt">Không Duyệt</option>
                           </select>
                           <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</span>
                         </div>
                       </div>

                       {/* Right side: Actions based on Mode */}
                       <div className="flex items-center gap-2">
                         {detailForm.mode !== 'view' ? (
                           <button 
                             onClick={() => setShowDeviceSelection(true)}
                             className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full font-black text-[9pt] hover:bg-blue-105 transition-all flex items-center gap-1 shadow-sm border border-blue-100 cursor-pointer"
                           >
                             <Plus className="w-4 h-4" /> THÊM TB
                           </button>
                         ) : (
                           <div className="flex items-center gap-2">
                             {selectedDeviceIndices.length > 0 && (
                               <span className="text-[8.5pt] text-[#164399] font-black mr-1 bg-blue-50 px-2 py-1 rounded-full">
                                 Đã chọn {selectedDeviceIndices.length} TB
                               </span>
                             )}
                             <button
                               type="button"
                               disabled={selectedDeviceIndices.length === 0}
                               onClick={() => {
                                 const rawDevices = detailForm.data?.devices || [];
                                 const nextDevices = [...rawDevices];
                                 selectedDeviceIndices.forEach(globalIdx => {
                                   if (nextDevices[globalIdx]) {
                                     nextDevices[globalIdx] = {
                                       ...nextDevices[globalIdx],
                                       status: 'Đã duyệt'
                                     };
                                   }
                                 });
                                 setDetailForm({
                                   ...detailForm,
                                   data: { ...detailForm.data, devices: nextDevices }
                                 });
                                 setSelectedDeviceIndices([]);
                                 setConfirmAction?.({
                                   title: 'Xác nhận phê duyệt',
                                   message: `Bạn có chắc chắn muốn DUYỆT ${selectedDeviceIndices.length} thiết bị đã chọn?`,
                                   confirmLabel: 'ĐỒNG Ý',
                                   cancelLabel: 'HỦY',
                                   onConfirm: () => {
                                     const rawDevices = detailForm.data?.devices || [];
                                     const nextDevices = [...rawDevices];
                                     selectedDeviceIndices.forEach(globalIdx => {
                                       if (nextDevices[globalIdx]) {
                                         nextDevices[globalIdx] = {
                                           ...nextDevices[globalIdx],
                                           status: 'Đã duyệt'
                                         };
                                       }
                                     });
                                     setDetailForm({
                                       ...detailForm,
                                       data: { ...detailForm.data, devices: nextDevices }
                                     });
                                     setSelectedDeviceIndices([]);
                                   }
                                 });
                               }}
                               className={`px-3 py-1.5 rounded-full font-black text-[8.5pt] uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm border cursor-pointer ${
                                 selectedDeviceIndices.length > 0
                                   ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-250 animate-pulse'
                                   : 'bg-gray-50 text-gray-400 border-gray-150 cursor-not-allowed'
                               }`}
                             >
                               <Check className="w-3.5 h-3.5" strokeWidth={3} /> DUYỆT
                             </button>
                             <button
                               type="button"
                               disabled={selectedDeviceIndices.length === 0}
                               onClick={() => {
                                 setConfirmAction?.({
                                   title: 'Xác nhận trạng thái',
                                   message: `Bạn có chắc chắn KHÔNG DUYỆT ${selectedDeviceIndices.length} thiết bị đã chọn?`,
                                   confirmLabel: 'ĐỒNG Ý',
                                   cancelLabel: 'HỦY',
                                   isDanger: true,
                                   onConfirm: () => {
                                     const rawDevices = detailForm.data?.devices || [];
                                     const nextDevices = [...rawDevices];
                                     selectedDeviceIndices.forEach(globalIdx => {
                                       if (nextDevices[globalIdx]) {
                                         nextDevices[globalIdx] = {
                                           ...nextDevices[globalIdx],
                                           status: 'Không duyệt'
                                         };
                                       }
                                     });
                                     setDetailForm({
                                       ...detailForm,
                                       data: { ...detailForm.data, devices: nextDevices }
                                     });
                                     setSelectedDeviceIndices([]);
                                   }
                                 });
                               }}
                               className={`px-3 py-1.5 rounded-full font-black text-[8.5pt] uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm border cursor-pointer ${
                                 selectedDeviceIndices.length > 0
                                   ? 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200'
                                   : 'bg-gray-55/70 text-gray-400 border-gray-150 cursor-not-allowed'
                               }`}
                             >
                               <X className="w-3.5 h-3.5" strokeWidth={3} /> KHÔNG DUYỆT
                             </button>
                           </div>
                         )}
                       </div>
                     </div>

                    {(() => {
                      const rawDevices = detailForm.data?.devices || [];
                      
                      // 1. Filter rawDevices by status and search text
                      const filteredDevices = rawDevices.map((dev: any, originalIndex: number) => ({ ...dev, originalIndex })).filter((item: any) => {
                        if (detailDeviceSearchText) {
                          const s = detailDeviceSearchText.toLowerCase();
                          const nameMatch = item.name?.toLowerCase().includes(s);
                          const idMatch = item.id?.toLowerCase().includes(s) || `PMIS-${item.id}`.toLowerCase().includes(s);
                          const typeMatch = item.type?.toLowerCase().includes(s);
                          if (!nameMatch && !idMatch && !typeMatch) return false;
                        }

                        if (detailDeviceStatusSelectFilter !== 'Tất cả') {
                          const status = (item.status || 'Chờ duyệt').toLowerCase();
                          if (detailDeviceStatusSelectFilter === 'Chờ duyệt') {
                            return status === 'chờ duyệt' || status === 'cho_duyet';
                          }
                          if (detailDeviceStatusSelectFilter === 'ĐVĐK Duyệt' || detailDeviceStatusSelectFilter === 'ĐVTN Duyệt') {
                            return status.includes('duyệt') && !status.includes('không');
                          }
                          if (detailDeviceStatusSelectFilter === 'Không Duyệt') {
                            return status.includes('không');
                          }
                        }
                        return true;
                      });

                      const totalDetailPages = Math.ceil(filteredDevices.length / 20) || 1;
                      const currentDetailPage = Math.min(detailDevicesPage, totalDetailPages);
                      const startIdxDetail = (currentDetailPage - 1) * 20;
                      const paginatedDetailDevices = filteredDevices.slice(startIdxDetail, startIdxDetail + 20);

                      const getDeviceIcon = (type: string, isRejected: boolean) => {
                        const t = type?.toUpperCase();
                        if (isRejected) return <Box className="w-4.5 h-4.5 text-gray-400" />;
                        if (t === 'MBA' || t === 'MÁY BIẾN ÁP') return <Activity className="w-4.5 h-4.5 text-blue-600" />;
                        if (t === 'MC' || t === 'MÁY CẮT') return <Zap className="w-4.5 h-4.5 text-amber-500" />;
                        if (t === 'TI' || t === 'BIẾN DÒNG') return <Database className="w-4.5 h-4.5 text-indigo-500" />;
                        if (t === 'TU' || t === 'BIẾN ĐIỆN ÁP') return <Settings className="w-4.5 h-4.5 text-slate-500" />;
                        return <Box className="w-4.5 h-4.5 text-emerald-500" />;
                      };

                      const getPrevDate = (nextDate: string) => {
                        if (!nextDate) return '15/05/2025';
                        if (nextDate.includes('-')) {
                          return nextDate.replace(/^2026/, '2025').replace(/^2027/, '2026');
                        }
                        return nextDate.replace(/\/2026/, '/2025');
                      };

                      const hasBranch = detailForm.data?.hasBranchApproval !== false;
                      const isPendingApproval = detailForm.data?.status === 'Đang duyệt';

                      return (
                        <div className="flex-1 flex flex-col min-h-0 bg-white">
                          <div className="flex-1 overflow-y-auto w-full custom-scrollbar px-6">
                            <table className="w-full text-left border-separate border-spacing-0 min-w-[900px]">
                              <thead className="sticky top-0 z-20 text-[#164399] font-black text-[9pt] uppercase tracking-wider text-left bg-white">
                                <tr className="text-[#164399] text-[8.5pt] font-black uppercase tracking-wider bg-[#f0f4fa] [&>th:first-child]:rounded-tl-2xl [&>th:last-child]:rounded-tr-2xl [&>th]:border-b [&>th]:border-gray-200">
                                  {detailForm.mode === 'view' && (
                                    <th className="py-3 px-6 text-center w-[40px]">
                                      <input
                                        type="checkbox"
                                        checked={
                                          paginatedDetailDevices.length > 0 &&
                                          paginatedDetailDevices.every((dev: any) => selectedDeviceIndices.includes(dev.originalIndex))
                                        }
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            const allIdxs = paginatedDetailDevices.map((dev: any) => dev.originalIndex);
                                            setSelectedDeviceIndices(Array.from(new Set([...selectedDeviceIndices, ...allIdxs])));
                                          } else {
                                            const filteredIdxs = paginatedDetailDevices.map((dev: any) => dev.originalIndex);
                                            setSelectedDeviceIndices(selectedDeviceIndices.filter(idx => !filteredIdxs.includes(idx)));
                                          }
                                        }}
                                        className="w-4 h-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500 cursor-pointer"
                                      />
                                    </th>
                                  )}
                                  <th className={`py-3 ${detailForm.mode === 'view' ? 'px-4' : 'px-8'}`}>Thiết bị</th>
                                  <th className="py-3 px-4">Loại kỳ</th>
                                  <th className="py-3 px-4">Ngày KT gần nhất</th>
                                  <th className="py-3 px-4">Ngày KT tiếp theo</th>
                                  <th className="py-3 px-5">Loại kiểm tra</th>
                                  {detailForm.mode === 'view' && (
                                    <>
                                      <th className="py-3 px-2 text-center w-[110px]">ĐVĐK DUYỆT</th>
                                      <th className="py-3 px-2 text-center w-[110px]">ĐVTN DUYỆT</th>
                                    </>
                                  )}
                                  {detailForm.mode !== 'view' && (
                                    <th className="py-3 px-8 text-center w-[160px]">Thao tác</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {paginatedDetailDevices.map((dev: any, idx: number) => {
                                  const status = dev.status || 'Chờ duyệt';
                                  
                                  // Dynamic approval calculations
                                  const isApproved = detailForm.data?.status === 'Đã duyệt' || status === 'Đã duyệt' || status === 'Đã xong' || status === 'Đạt' || status === 'Đã hoàn thành';
                                  const isRejected = detailForm.data?.status === 'Không duyệt' || status === 'Không duyệt' || status === 'Không đạt';

                                  let cnText = 'ĐVĐK CHỜ DUYỆT';
                                  let cnStyle = 'bg-amber-50/50 text-amber-500/80 border-amber-100/40 font-normal';

                                  if (isApproved) {
                                    cnText = 'ĐVĐK DUYỆT';
                                    cnStyle = 'bg-emerald-50/50 text-emerald-500/80 border-emerald-100/40 font-bold';
                                  } else if (isRejected) {
                                    cnText = 'KHÔNG DUYỆT';
                                    cnStyle = 'bg-red-50/50 text-red-500/80 border-red-100/40 font-bold';
                                  } else if (isPendingApproval) {
                                    cnText = 'ĐVĐK DUYỆT';
                                    cnStyle = 'bg-emerald-50/50 text-emerald-500/80 border-emerald-100/40 font-bold';
                                  }

                                  let ctText = 'ĐVTN CHỜ DUYỆT';
                                  let ctStyle = 'bg-amber-100/25 text-amber-500/80 border-amber-100/30 font-normal';

                                  if (isApproved) {
                                    ctText = 'ĐVTN DUYỆT';
                                    ctStyle = 'bg-emerald-100/25 text-emerald-500/80 border-emerald-100/30 font-bold';
                                  } else if (isRejected) {
                                    ctText = 'KHÔNG DUYỆT';
                                    ctStyle = 'bg-red-100/25 text-red-500/80 border-red-100/30 font-bold';
                                  } else if (detailForm.data?.status === 'Đang duyệt') {
                                    ctText = 'ĐVTN CHỜ DUYỆT';
                                    ctStyle = 'bg-amber-100/25 text-amber-500/80 border-amber-100/30 font-normal';
                                  }

                                  const prevDate = getPrevDate(dev.date || dev.nextDue || '15/05/2026');

                                  return (
                                    <tr key={idx} className={`hover:bg-blue-50/50 transition-colors group ${selectedDeviceIndices.includes(dev.originalIndex) ? 'bg-blue-50/30' : ''}`}>
                                      {detailForm.mode === 'view' && (
                                        <td className="py-3 px-6 text-center w-[40px]">
                                          <input
                                            type="checkbox"
                                            checked={selectedDeviceIndices.includes(dev.originalIndex)}
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                setSelectedDeviceIndices([...selectedDeviceIndices, dev.originalIndex]);
                                              } else {
                                                setSelectedDeviceIndices(selectedDeviceIndices.filter(i => i !== dev.originalIndex));
                                              }
                                            }}
                                            className="w-4 h-4 rounded border-slate-300 text-blue-650 focus:ring-blue-500 cursor-pointer"
                                          />
                                        </td>
                                      )}
                                      
                                      {/* Consolidated Device Info Column */}
                                      <td className={`py-3 ${detailForm.mode === 'view' ? 'px-4' : 'px-8'}`}>
                                        <div className="flex items-center gap-3">
                                          <div className={`w-8 h-8 rounded-full ${isRejected ? 'bg-gray-100 border border-gray-200' : 'bg-slate-50 border border-slate-100'} flex items-center justify-center shrink-0`}>
                                            {getDeviceIcon(dev.type || 'MBA', isRejected)}
                                          </div>
                                          <div className="flex flex-col text-left min-w-0">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                              <span className={`text-[8.5pt] font-mono font-bold ${isRejected ? 'text-gray-400' : 'text-red-600'}`}>
                                                PMIS-{dev.id || `TB-${dev.originalIndex}`}
                                              </span>
                                              <span className={`${isRejected ? 'text-gray-200' : 'text-gray-300'}`}>|</span>
                                              <span className={`text-[8.5pt] font-bold uppercase tracking-tight ${isRejected ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {normalizeType(dev.type || 'MBA')}
                                              </span>
                                            </div>
                                            <div 
                                              onClick={() => setShowDeviceParams?.(dev)}
                                              className={`text-[10pt] font-black transition-colors cursor-pointer text-left truncate max-w-[280px] ${isRejected ? 'text-gray-400 hover:text-gray-500' : 'text-gray-800 hover:text-blue-600'}`}
                                            >
                                              {dev.name}
                                            </div>
                                          </div>
                                        </div>
                                      </td>

                                      {/* Period Type Column */}
                                      <td className="py-3 px-4">
                                        {detailForm.mode !== 'view' ? (
                                          <select
                                            value={dev.periodType || 'Định kỳ'}
                                            onChange={(e) => {
                                              const rawDevicesList = detailForm.data?.devices || [];
                                              const nextDevices = [...rawDevicesList];
                                              nextDevices[dev.originalIndex] = {
                                                ...dev,
                                                periodType: e.target.value
                                              };
                                              setDetailForm({
                                                ...detailForm,
                                                data: { ...detailForm.data, devices: nextDevices }
                                              });
                                            }}
                                            className={`text-[9pt] font-semibold border rounded-full px-2 py-1 cursor-pointer outline-none focus:ring-1 ${isRejected ? 'text-gray-400 bg-gray-50 border-gray-100' : 'text-sky-700 bg-sky-50 border-sky-100 focus:ring-sky-500'}`}
                                          >
                                            <option value="Định kỳ">Định kỳ</option>
                                            <option value="Đột xuất">Đột xuất</option>
                                            <option value="Trước lắp đặt">Trước lắp đặt</option>
                                            <option value="Sau sửa chữa">Sau sửa chữa</option>
                                          </select>
                                        ) : (
                                          <span className={`inline-flex px-2 py-0.5 border rounded-full text-[8.5pt] font-extrabold whitespace-nowrap uppercase ${isRejected ? 'bg-gray-50 text-gray-400 border-gray-100' : 'bg-sky-50/75 text-sky-700 border-sky-100/50'}`}>
                                            {dev.periodType || 'Định kỳ'}
                                          </span>
                                        )}
                                      </td>

                                      {/* Closest Last Test (read-only) */}
                                      <td className="py-3 px-4">
                                        <span className={`text-[9pt] font-bold bg-transparent px-2 py-0.5 font-mono ${isRejected ? 'text-gray-400' : 'text-gray-500'}`}>
                                          {prevDate}
                                        </span>
                                      </td>

                                      {/* Next Due Test Date (editable) */}
                                      <td className="py-3 px-4">
                                        {detailForm.mode !== 'view' ? (
                                          <input
                                            type="date"
                                            value={dev.date || dev.nextDue || ''}
                                            onChange={(e) => {
                                              const rawDevicesList = detailForm.data?.devices || [];
                                              const nextDevices = [...rawDevicesList];
                                              nextDevices[dev.originalIndex] = {
                                                ...dev,
                                                date: e.target.value,
                                                nextDue: e.target.value
                                              };
                                              setDetailForm({
                                                ...detailForm,
                                                data: { ...detailForm.data, devices: nextDevices }
                                              });
                                            }}
                                            className="text-[9.5pt] font-bold font-mono text-blue-600 bg-blue-50/50 border border-blue-100 rounded-full px-2 py-0.5 w-[130px] text-center"
                                          />
                                        ) : (
                                          <span className="text-[9.5pt] font-black font-mono text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100/30">
                                            {dev.date || dev.nextDue || '15/05/2026'}
                                          </span>
                                        )}
                                      </td>

                                      {/* Test Type Select Menu */}
                                      <td className="py-3 px-5">
                                        {detailForm.mode !== 'view' ? (
                                          <select
                                            value={dev.testType || 'Thí nghiệm'}
                                            onChange={(e) => {
                                              const rawDevicesList = detailForm.data?.devices || [];
                                              const nextDevices = [...rawDevicesList];
                                              nextDevices[dev.originalIndex] = {
                                                ...dev,
                                                testType: e.target.value
                                              };
                                              setDetailForm({
                                                ...detailForm,
                                                data: { ...detailForm.data, devices: nextDevices }
                                              });
                                            }}
                                            className="text-[9pt] font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg p-1 px-2 cursor-pointer outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                                          >
                                            <option value="Thí nghiệm">Thí nghiệm</option>
                                            <option value="TN & KĐ">TN & KĐ</option>
                                            <option value="Kiểm định">Kiểm định</option>
                                            <option value="Hiệu chuẩn">Hiệu chuẩn</option>
                                          </select>
                                        ) : (
                                          <span className="text-[9.5pt] italic text-gray-700 block text-left">
                                            {dev.testType || 'Thí nghiệm'}
                                          </span>
                                        )}
                                      </td>

                                      {/* Dual Level Approvals Badge Column */}
                                      {detailForm.mode === 'view' && (
                                      <>
                                      <td className="py-3 px-2 text-center">
                                        <div className="flex justify-center flex-col gap-1 items-center">
                                          {hasBranch ? (
                                            <div className={`text-[7.5pt] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full inline-block ${cnText.includes('KHÔNG') || cnText.includes('không') ? 'bg-red-50 text-red-600 border border-red-100' : cnText.includes('CHỜ') || cnText.includes('chờ') ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                              {cnText}
                                            </div>
                                          ) : <span className="text-gray-300">-</span>}
                                        </div>
                                      </td>
                                      <td className="py-3 px-2 text-center">
                                        <div className="flex justify-center flex-col gap-1 items-center">
                                          <div className={`text-[7.5pt] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full inline-block ${ctText.includes('KHÔNG') || ctText.includes('không') ? 'bg-red-50 text-red-600 border border-red-100' : ctText.includes('CHỜ') || ctText.includes('chờ') ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                            {ctText}
                                          </div>
                                        </div>
                                      </td>
                                      </>
                                      )}

                                      {/* Action items */}
                                      {detailForm.mode !== 'view' && (
                                      <td className="py-3 px-4">
                                        <div className="flex items-center justify-center gap-1.5 min-h-[28px]">
                                          {isPendingApproval ? (
                                            <>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const rawDevicesList = detailForm.data?.devices || [];
                                                  const nextDevices = [...rawDevicesList];
                                                  nextDevices[dev.originalIndex] = {
                                                    ...dev,
                                                    status: 'Đã duyệt'
                                                  };
                                                  setDetailForm({
                                                    ...detailForm,
                                                    data: { ...detailForm.data, devices: nextDevices }
                                                  });
                                                }}
                                                className="px-2 py-1.5 text-blue-600 hover:bg-blue-50 shadow-none border-none rounded-full text-[8.5pt] font-black transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap bg-transparent outline-none"
                                              >
                                                <Check className="w-3.5 h-3.5" strokeWidth={3} /> Duyệt
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const rawDevicesList = detailForm.data?.devices || [];
                                                  const nextDevices = [...rawDevicesList];
                                                  nextDevices[dev.originalIndex] = {
                                                    ...dev,
                                                    status: 'Không duyệt'
                                                  };
                                                  setDetailForm({
                                                    ...detailForm,
                                                    data: { ...detailForm.data, devices: nextDevices }
                                                  });
                                                }}
                                                className="px-2 py-1.5 text-red-600 hover:bg-red-50 shadow-none border-none rounded-full text-[8.5pt] font-black transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap bg-transparent outline-none"
                                              >
                                                <X className="w-3.5 h-3.5" strokeWidth={3} /> Không duyệt
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button 
                                                type="button"
                                                onClick={() => setShowDeviceParams?.(dev)}
                                                className="p-1 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded cursor-pointer transition-colors"
                                                title="Hiệu chỉnh thông số"
                                              >
                                                <Edit className="w-4 h-4" />
                                              </button>
                                              <button 
                                                type="button"
                                                onClick={() => {
                                                  const rawDevicesList = detailForm.data?.devices || [];
                                                  const nextDevices = rawDevicesList.filter((_: any, dIdx: number) => dIdx !== dev.originalIndex);
                                                  setDetailForm({
                                                    ...detailForm,
                                                    data: { ...detailForm.data, devices: nextDevices }
                                                  });
                                                  setSelectedDeviceIndices(selectedDeviceIndices.filter(prevIdx => prevIdx !== dev.originalIndex));
                                                }}
                                                className="p-1 hover:bg-rose-50 text-gray-400 hover:text-rose-600 rounded cursor-pointer transition-colors"
                                                title="Xóa"
                                              >
                                                <Trash2 className="w-4 h-4" />
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </td>
                                      )}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          {/* Pagination Footer */}
                          {totalDetailPages > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4 px-6 pb-4 bg-white mt-auto shrink-0">
                              <span className="text-[9pt] font-semibold text-gray-400">
                                Hiển thị {startIdxDetail + 1} - {Math.min(startIdxDetail + 20, filteredDevices.length)} của {filteredDevices.length} thiết bị
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={currentDetailPage === 1}
                                  onClick={() => setDetailDevicesPage(p => Math.max(1, p - 1))}
                                  className="p-1 px-2.5 rounded text-gray-500 hover:bg-slate-50 disabled:opacity-40 font-bold text-[9pt] flex items-center gap-1 cursor-pointer transition-colors border-none bg-transparent"
                                >
                                  <ChevronLeft className="w-4 h-4" /> Trước
                                </button>
                                {[...Array(totalDetailPages)].map((_, pIdx) => {
                                  const pNum = pIdx + 1;
                                  return (
                                    <button
                                      type="button"
                                      key={pNum}
                                      onClick={() => setDetailDevicesPage(pNum)}
                                      className={`w-7 h-7 rounded text-[9pt] font-semibold transition-all cursor-pointer border-none ${
                                        currentDetailPage === pNum 
                                          ? 'bg-blue-100 text-[#164399] font-black' 
                                          : 'text-gray-500 hover:bg-slate-50'
                                      }`}
                                    >
                                      {pNum}
                                    </button>
                                  );
                                })}
                                <button
                                  type="button"
                                  disabled={currentDetailPage === totalDetailPages}
                                  onClick={() => setDetailDevicesPage(p => Math.min(totalDetailPages, p + 1))}
                                  className="p-1 px-2.5 rounded text-gray-500 hover:bg-slate-50 disabled:opacity-40 font-bold text-[9pt] flex items-center gap-1 cursor-pointer transition-colors border-none bg-transparent"
                                >
                                  Sau <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })()}
                </div>
              )}


               </div>
             )}

              {/* ATTACHED DOCUMENTS & PICTURES IN ATTACHMENTS TAB */}
              
             {isTestingPlan && activeFormTab === 'history' && (
                <div className="animate-in fade-in duration-300 flex-1 flex flex-col h-full bg-slate-50 relative p-6">
                  <div className="absolute inset-0 right-1/2 border-r border-slate-200 pointer-events-none"></div>
                  
                  <div className="grid grid-cols-2 gap-12 h-full flex-1 min-h-0 relative z-10 w-full max-w-7xl mx-auto">
                    {/* Left Column: Messages/Comments */}
                    <div className="space-y-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        <h4 className="text-[10.5pt] font-black text-gray-700 uppercase tracking-wider font-sans">
                          TRAO ĐỔI Ý KIẾN
                        </h4>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
                        {/* Sample Message 1 */}
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200 shadow-sm">
                            <span className="text-blue-700 font-bold text-[10pt]">A</span>
                          </div>
                          <div className="flex flex-col gap-1.5 flex-1 mt-1 pb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="font-bold text-[9.5pt] text-slate-800">Nguyễn Văn A</span>
                              <span className="text-[8pt] text-slate-400 font-medium">10 phút trước</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl rounded-tl-none border border-slate-200 shadow-sm text-[9.5pt] text-slate-700 leading-relaxed font-medium hover:border-slate-300 transition-colors">
                              Cần bổ sung thêm thông tin về MBA 110kV trạm Ninh Bình trước khi phê duyệt. Các thông số ở mục 2 đang bị thiếu.
                            </div>
                          </div>
                        </div>

                        {/* Sample Message 2 */}
                        <div className="flex gap-4 flex-row-reverse">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200 shadow-sm text-emerald-700 font-bold text-[10pt]">
                            B
                          </div>
                          <div className="flex flex-col gap-1.5 flex-1 items-end mt-1 pb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[8pt] text-slate-400 font-medium">Vừa xong</span>
                              <span className="font-bold text-[9.5pt] text-slate-800">Trần Thị B</span>
                            </div>
                            <div className="bg-[#164399]/5 p-4 rounded-lg rounded-tr-none border border-blue-100 shadow-sm text-[9.5pt] text-slate-800 leading-relaxed font-medium hover:border-blue-200 transition-colors">
                              Đã cập nhật theo yêu cầu. Anh vui lòng kiểm tra lại.
                            </div>
                          </div>
                        </div>

                        {/* Custom comments list mapping */}
                        {comments.map((comment) => (
                          <div key={comment.id} className="flex gap-4 flex-row-reverse animate-in fade-in slide-in-from-bottom-2 duration-305">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 border border-blue-700 shadow-sm font-bold text-[10pt]">
                              T
                            </div>
                            <div className="flex flex-col gap-1.5 flex-1 items-end mt-1 pb-4">
                              <div className="flex items-baseline gap-2">
                                <span className="text-[8pt] text-slate-400 font-medium">{comment.time}</span>
                                <span className="font-bold text-[9.5pt] text-slate-800">{comment.user}</span>
                              </div>
                              <div className="bg-blue-600 text-white p-4 rounded-xl rounded-tr-none border border-blue-700 shadow-sm text-[9.5pt] leading-relaxed font-semibold text-left">
                                {comment.text}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                                            {/* Comment Input */}
                      <div className="shrink-0 pt-4 bg-slate-50 border-t border-slate-200">
                        <div className="flex gap-3 bg-slate-100 p-2 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-inner">
                          <textarea 
                            rows={2}
                            value={newComment}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  if (!newComment.trim()) return;
                                  setComments([...comments, { id: Date.now(), user: 'Tôi', text: newComment, time: 'Vừa xong' }]);
                                  setNewComment("");
                                }
                            }}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Nhập ý kiến trao đổi..." 
                            className="flex-1 resize-none p-2 rounded-lg text-[9.5pt] focus:outline-none bg-transparent placeholder:text-slate-400 transition-colors"
                          ></textarea>
                          <button 
                            onClick={() => {
                              if (!newComment.trim()) return;
                              setComments([...comments, { id: Date.now(), user: 'Tôi', text: newComment, time: 'Vừa xong' }]);
                              setNewComment("");
                            }}
                            className="h-full px-6 bg-[#164399] text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" /> Gửi
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Timeline / History */}
                    <div className="space-y-6 flex flex-col h-full pl-6">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <History className="w-5 h-5 text-emerald-600" />
                        <h4 className="text-[10.5pt] font-black text-gray-700 uppercase tracking-wider font-sans">
                          LỊCH SỬ THAO TÁC
                        </h4>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto custom-scrollbar pl-2 pb-4">
                        <div className="relative border-l border-slate-200 ml-4 space-y-8 pb-10">
                          
                          {/* Timeline Item 1 */}
                          <div className="relative pl-8">
                            <div className="absolute -left-3 top-0.5 w-6 h-6 rounded-full border-[3px] border-white bg-slate-200 flex items-center justify-center"></div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[9.5pt] text-slate-800">Nguyễn Văn A</span>
                                <span className="text-slate-400 text-[8pt] font-medium">đã tạo phiếu này</span>
                              </div>
                              <span className="text-slate-400 text-[8pt] font-medium">15/06/2026 09:30</span>
                            </div>
                          </div>

                          {/* Timeline Item 2 */}
                          <div className="relative pl-8">
                            <div className="absolute -left-3 top-0.5 w-6 h-6 rounded-full border-[3px] border-white bg-blue-500 flex items-center justify-center"></div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[9.5pt] text-slate-800">Trần Thị B</span>
                                <span className="text-slate-400 text-[8pt] font-medium">đã yêu cầu phê duyệt</span>
                              </div>
                              <span className="text-slate-400 text-[8pt] font-medium">16/06/2026 14:20</span>
                            </div>
                          </div>

                          {/* Timeline Item 3 */}
                          <div className="relative pl-8">
                            <div className="absolute -left-[14px] top-0 w-7 h-7 rounded-full border-[3px] border-white bg-emerald-500 shadow-xs flex items-center justify-center">
                              <CheckCircle className="text-white w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[9.5pt] text-emerald-700">Lãnh đạo đơn vị</span>
                                <span className="text-slate-500 text-[8pt] font-bold">đã DUYỆT</span>
                              </div>
                              <span className="text-slate-400 text-[8pt] font-medium">17/06/2026 10:00</span>
                              <div className="mt-1 bg-white p-3 rounded-xl border border-slate-200 shadow-3xs inline-block">
                                <p className="text-[9pt] font-medium text-slate-700">Ghi chú: Đồng ý thực hiện theo kế hoạch.</p>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             )}

              {isTestingPlan && activeFormTab === 'safety_attachments' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* IMAGES SECTION */}
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                     <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                          <Camera className="w-5 h-5 text-orange-500" /> HÌNH ẢNH MINH HỌA
                        </h4>
                     </div>
                     <div className="space-y-4">
                        {/* Images Grid */}
                        <div className="grid grid-cols-2 gap-3">
                           {[1, 2].map(i => (
                             <div 
                               key={i} 
                               className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group relative shadow-sm hover:shadow-md transition-all duration-300"
                               onClick={() => handleFormImgPreview(`https://picsum.photos/seed/test-v3-${i}/400/300`)}
                             >
                                <img 
                                  src={`https://picsum.photos/seed/test-v3-${i}/400/300`} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-zoom-in" 
                                  referrerPolicy="no-referrer" 
                                  alt="" 
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                  <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                {detailForm.mode !== 'view' && (
                                  <div 
                                    className="absolute top-1.5 right-1.5 p-1 bg-red-50 text-white rounded-xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity shadow"
                                    onClick={(e) => { e.stopPropagation(); }}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </div>
                                )}
                             </div>
                           ))}
                        </div>
                        
                        {detailForm.mode !== 'view' && (
                          <div className="pt-2">
                            <FileUploader 
                              type="image" 
                              mode={detailForm.mode} 
                              onFileSelect={() => {}} 
                            />
                          </div>
                        )}
                     </div>
                  </div>

                  {/* DOCUMENTS SECTION (Styled exactly like configuration details section) */}
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                     <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h4 className="text-[10pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2 pl-1 font-sans">
                          <FileText className="w-5 h-5 text-red-500" /> TÀI LIỆU ĐÍNH KÈM
                        </h4>
                        {detailForm.mode !== 'view' && (
                          <button
                            type="button"
                            onClick={() => setIsDocLibraryOpen(true)}
                            className="px-3 py-1 bg-blue-50 text-[#164399] rounded-full text-[8.5pt] font-black hover:bg-blue-100 transition-all border border-blue-100 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#164399]" /> Từ thư viện
                          </button>
                        )}
                     </div>
                     <div className="space-y-3">
                       {localDocs.map((doc, idx) => (
                         <div 
                           key={doc.id || idx} 
                           className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg border border-gray-100 group hover:border-slate-300 hover:bg-white transition-all cursor-pointer shadow-xs" 
                           onClick={() => handleFormDocPreview(doc.name, doc.size)}
                         >
                            <div className="flex items-center gap-2.5 min-w-0">
                               <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm animate-fade-in transition-transform group-hover:scale-105">
                                 <FileText className="w-4.5 h-4.5 text-red-500" />
                               </div>
                               <div className="min-w-0 flex flex-col text-left">
                                 <p className="text-[9.5pt] font-bold text-gray-800 line-clamp-1 group-hover:text-[#164399] transition-colors text-left">{doc.name}</p>
                                 <p className="text-[8.5pt] text-slate-400 font-medium tracking-tight text-left mt-0.5">{doc.author} | 15/06/2026 | {doc.size}</p>
                               </div>
                            </div>
                            {detailForm.mode !== 'view' && (
                              <div className="flex items-center shrink-0 ml-2" onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id || doc.name); }}>
                                <button className="p-1.5 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors rounded-[20%] border-none cursor-pointer">
<Trash2 className="w-4 h-4" />
</button>
                              </div>
                            )}
                         </div>
                       ))}
                       {detailForm.mode !== 'view' && (
                         <FileUploader type="document" mode={detailForm.mode} onFileSelect={() => {}} />
                       )}
                     </div>
                  </div>
                </div>
              )}

            {isTestingCatalog && activeCatalogTab === 'standards' && (
              <TestingStandardsConfig
                mode={detailForm.mode}
                deviceType={detailForm.data?.type}
                enabledForms={detailForm.data?.enabledForms}
                standardsUse={detailForm.data?.standardsUse}
                standardsNotes={detailForm.data?.standardsNotes}
                onUpdateStandardsUse={(formName, usedStates) => {
                  setDetailForm({
                    ...detailForm,
                    data: {
                      ...detailForm.data,
                      standardsUse: {
                        ...(detailForm.data?.standardsUse || {}),
                        [formName]: usedStates
                      }
                    }
                  });
                }}
                onUpdateStandardsNotes={(formName, notesStates) => {
                  setDetailForm({
                    ...detailForm,
                    data: {
                      ...detailForm.data,
                      standardsNotes: {
                        ...(detailForm.data?.standardsNotes || {}),
                        [formName]: notesStates
                      }
                    }
                  });
                }}
              />
            )}


            {isTestingCatalog && activeCatalogTab === 'history' && detailForm.mode === 'view' && (
              <div className="lg:col-span-2 space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto w-full text-left">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 flex-wrap gap-2">
                    <h3 className="text-[12pt] font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <History className="w-5 h-5 text-blue-600" /> Lịch sử thực hiện thí nghiệm & kiểm định
                    </h3>
                    <span className="text-[8.5pt] font-black px-3 py-1 rounded-full border bg-blue-50 text-blue-750 border-blue-200 font-mono uppercase">
                      {detailForm.data?.code || 'PD-MBA-001'}
                    </span>
                  </div>

                  <div className="relative pl-8 border-l-2 border-slate-100 space-y-8 ml-4 pt-2">
                    {[
                      { type: 'Thí nghiệm', date: '15/05/2026 10:30', content: 'Thực hiện phép đo điện trở một chiều và tỉ số biến thế định kỳ cuộn dây 110kV', operator: 'Đội Thí nghiệm thiết bị (Vũ Văn Mới)', result: 'ĐẠT TIÊU CHUẨN', code: 'BBTN-2026-003' },
                      { type: 'Kiểm định', date: '21/04/2025 14:15', content: 'Thực hiện kiểm định điện môi dầu máy cuộn cao áp máy biến áp định kỳ', operator: 'Trung tâm Thí nghiệm Điện miền Bắc', result: 'ĐẠT TIÊU CHUẨN', code: 'KD-2025-059' },
                      { type: 'Thí nghiệm', date: '11/05/2024 09:12', content: 'Thí nghiệm trước đóng điện đại tu phục hồi bọc báng sứ ngăn lộ lắp MBA', operator: 'Trần Thế Vinh', result: 'ĐẠT TIÊU CHUẨN', code: 'BBTN-2024-001' },
                    ].map((item, idx) => (
                      <div key={idx} className="relative z-10 pl-4 animate-in fade-in slide-in-from-left duration-500">
                        <div className="absolute -left-[54px] top-1 w-9 h-9 rounded-full border-4 border-white flex items-center justify-center bg-[#164399] text-white shadow-md">
                          <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                        </div>
                        <div className="p-6 bg-slate-50/55 rounded-2xl border border-gray-100 hover:shadow-lg transition-all space-y-3">
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[8.5pt] font-black tracking-widest uppercase text-blue-700 bg-blue-105 px-2.5 py-0.5 rounded border border-blue-200">
                                {item.type}
                              </span>
                              <span className="text-[9pt] font-black text-gray-400 font-mono">#{item.code}</span>
                            </div>
                            <span className="text-[9.5pt] font-black text-gray-400 font-mono flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-gray-400" /> {item.date}
                            </span>
                          </div>
                          <p className="text-[11.5pt] font-black text-gray-800 leading-snug">{item.content}</p>
                          
                          <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-100/70 text-[9pt] flex-wrap">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-700 font-bold uppercase tracking-tight">Nhân viên:</span>
                              <span className="text-gray-700 font-black">{item.operator}</span>
                            </div>
                            <div className="flex items-center gap-1 p-1 px-3 bg-emerald-50 text-emerald-800 border-emerald-200 border rounded-xl font-mono font-black text-[8.5pt]">
                              {item.result}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
      </div>
    </div>
  </div>

      {/* History Popup */}
      {showHistory && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowHistory(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
             <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h3 className="text-[14pt] font-black text-gray-700 tracking-tight">Lịch sử trình duyệt hồ sơ</h3>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                   <Plus className="w-6 h-6 text-gray-400 rotate-45" />
                </button>
             </div>
             <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-6 relative before:absolute before:left-[17px] before:top-4 before:bottom-0 before:w-0.5 before:bg-gray-100">
                   {(detailForm.data?.history || [
                     { id: 1, type: 'Lập lần 1', user: 'Vũ Văn Mới', time: '2026-05-24 08:30', note: 'Khởi tạo hồ sơ kế hoạch định kỳ' },
                     { id: 2, type: 'Trình duyệt', user: 'Vũ Văn Mới', time: '2026-05-24 09:00', note: 'Kính trình lãnh đạo phê duyệt phương án' },
                   ]).map((item: any) => (
                     <div key={item.id} className="relative z-10 pl-10">
                       <div className={`absolute left-0 top-1.5 w-9 h-9 rounded-full border-4 border-white flex items-center justify-center shadow-md ${
                         item.type.includes('Duyệt') ? 'bg-green-500 text-white' : 
                         item.type.includes('Không duyệt') ? 'bg-red-500 text-white' : 
                         item.type.includes('Trình') ? 'bg-blue-500 text-white' : 
                         'bg-gray-600 text-white'
                       }`}>
                         <Check className="w-4 h-4" />
                       </div>
                       <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[9pt] font-black tracking-widest text-blue-600">{item.type}</span>
                             <span className="text-[9pt] font-bold text-gray-400 font-mono">{item.time}</span>
                          </div>
                          <p className="text-[12pt] font-black text-gray-800">{item.user}</p>
                          <p className="text-[10pt] text-gray-500 font-medium mt-1 leading-snug">"{item.note}"</p>
                       </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Document Library Technical Overlay popup */}
      <DocumentLibraryModal
        isOpen={isDocLibraryOpen}
        onClose={() => setIsDocLibraryOpen(false)}
        selectedIds={localDocs.map(d => d.id)}
        onToggleDoc={handleToggleDoc}
        headerConfigLabel="THƯ VIỆN TÀI LIỆU KỸ THUẬT"
      />
    </>
  );
};
