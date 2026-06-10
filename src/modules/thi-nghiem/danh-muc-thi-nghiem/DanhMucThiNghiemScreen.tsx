import React, { useState } from 'react';
import { ArrowLeft, Plus, Filter, Search, Zap, Activity, Shield, Binary, GitCommit, Settings, Box, Database, Home, Network, Building2, Radio } from 'lucide-react';
import { MOCK_TESTING_CATALOG } from '../constants';
import { capitalizeBusinessName } from '../../../shared/utils';

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

const getTypeIcon = (type: string) => {
  const normType = normalizeType(type);
  switch (normType) {
    case 'Trạm': return <Building2 className="w-4 h-4" />;
    case 'Đường dây': return <Network className="w-4 h-4" />;
    case 'Máy cắt': return <Zap className="w-4 h-4" />;
    case 'Máy biến áp': return <Box className="w-4 h-4" />;
    case 'Biến dòng': return <Activity className="w-4 h-4" />;
    case 'Biến điện áp': return <Binary className="w-4 h-4" />;
    case 'Dao cách ly': return <GitCommit className="w-4 h-4" />;
    case 'Chống sét van': return <Shield className="w-4 h-4" />;
    default: return <Database className="w-4 h-4" />;
  }
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

  return (
    <div className="flex-1 flex flex-col overflow-hidden text-[12pt]">
      <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0 font-sans">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSubMenu(null)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-[12pt] font-semibold flex items-center gap-2 leading-[1.5]">
                <span className="text-[#555555]">Thiết lập</span>
                <span className="font-bold text-[#164399]">- Danh mục thiết bị thí nghiệm</span>
              </h2>
              <span className="text-[10pt] text-gray-400 font-medium leading-[1.5] mt-0.5">
                {devicePath?.join(' / ')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`p-2 rounded-[10px] border transition-all ${showFilter ? 'bg-blue-50 border-blue-200 text-[#164399] shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
              title="Ẩn/Hiện thanh lọc"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setDetailForm({ type: 'testing_catalog', mode: 'add' })}
              className="flex items-center gap-2 px-4 py-2 bg-[#164399] text-white rounded-[10px] text-[12pt] font-bold hover:bg-blue-800 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Thêm thiết bị
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-[10px] animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9pt] font-bold text-gray-400 uppercase">Trạng thái</label>
                <select className="px-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-normal text-gray-700 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-100 shadow-sm min-w-[150px] appearance-none">
                  <option>Tất cả</option>
                  <option>Sắp đến hạn</option>
                  <option>Quá hạn</option>
                  <option>Bình thường</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[300px]">
              <label className="text-[9pt] font-bold text-gray-400 uppercase">Tìm nhanh thiết bị</label>
              <div className="relative group/search">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-blue-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Nhập tên thiết bị, mã nội bộ..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-normal focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-100 transition-all shadow-sm"
                />
              </div>
            </div>
            <button className="text-[10pt] font-bold text-blue-600 hover:underline">Xóa tất cả bộ lọc</button>
          </div>
        )}
      </div>
      <div className="flex-1 p-6 bg-gray-50/30 overflow-y-auto custom-scrollbar">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-[12pt]">
          <table className="w-full text-left">
            <thead className="bg-[#f8fafc] text-gray-500 font-bold uppercase tracking-widest text-[9pt] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Thiết bị thí nghiệm</th>
                <th className="px-6 py-4">Chu kỳ TN</th>
                <th className="px-6 py-4">Lần TN cuối</th>
                <th className="px-6 py-4">Hạn TN tiếp</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_TESTING_CATALOG.map((cat) => {
                const isChild = !!(cat as any).parentId;
                return (
                  <tr 
                    key={cat.id} 
                    className={`hover:bg-gray-50 transition-colors cursor-pointer group ${isChild ? 'bg-gray-50/30' : ''}`}
                    onClick={() => setDetailForm({ type: 'testing_catalog', mode: 'view', data: cat })}
                  >
                    <td className={`px-6 py-4 ${isChild ? 'pl-12 opacity-60' : ''}`}>
                      <div className="flex items-center gap-2 mb-1.5 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold text-[9pt] uppercase px-1.5 py-0.5 rounded shadow-sm ${isChild ? 'bg-gray-100 text-gray-400 border border-gray-200' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                            {cat.code || 'N/A'}
                          </span>
                          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-all ${isChild ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-blue-50 border-blue-100 text-[#164399]'}`}>
                            <span className={isChild ? 'opacity-40' : 'opacity-70'}>{getTypeIcon(cat.type)}</span>
                            <span className="text-[8pt] font-black uppercase tracking-tighter">
                              {normalizeType(cat.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className={`font-black transition-colors whitespace-normal break-words leading-tight ${isChild ? 'text-gray-500 text-[11pt]' : 'text-gray-800 text-[12pt] group-hover:text-blue-600'}`}>{cat.device}</p>
                      <p className={`text-[9pt] font-bold uppercase mt-1 tracking-widest ${isChild ? 'text-gray-400' : 'text-gray-400'}`}>{cat.location || 'N/A'}</p>
                    </td>
                    <td className={`px-6 py-4 font-normal text-[10pt] ${isChild ? 'text-gray-400' : 'text-gray-500'}`}>{cat.interval}</td>
                    <td className={`px-6 py-4 font-normal text-[10pt] ${isChild ? 'text-gray-400' : 'text-gray-400'}`}>{cat.lastTest}</td>
                    <td className={`px-6 py-4 font-normal text-[10pt] ${isChild ? 'text-blue-400' : 'text-[#164399]'}`}>{cat.nextDue}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[9pt] font-black uppercase ${
                        isChild ? 'opacity-60 grayscale' : ''
                      } ${
                        cat.status === 'Quá hạn' ? 'bg-red-100 text-red-600' : 
                        cat.status === 'Đến hạn' ? 'bg-orange-100 text-orange-600' :
                        cat.status === 'Sắp đến hạn' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {cat.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
