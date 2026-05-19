import React, { useState } from 'react';
import { ArrowLeft, Plus, Filter, Search } from 'lucide-react';
import { MOCK_TESTING_CATALOG } from '../constants';

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
                <select className="px-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-bold text-gray-700 focus:outline-none focus:border-blue-500 shadow-sm min-w-[150px] appearance-none">
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
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[10pt] font-bold focus:outline-none focus:border-blue-500 transition-all shadow-sm"
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
            <thead className="bg-[#f8fafc] text-gray-500 font-bold uppercase tracking-widest text-[10pt] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Tên thiết bị</th>
                <th className="px-6 py-4">Chu kỳ TN</th>
                <th className="px-6 py-4">Lần TN cuối</th>
                <th className="px-6 py-4">Hạn TN tiếp</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
                <th className="px-6 py-4 text-center">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_TESTING_CATALOG.map((cat) => (
                <tr 
                  key={cat.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setDetailForm({ type: 'testing_catalog', mode: 'view', data: cat })}
                >
                  <td className="px-6 py-4 font-bold text-gray-800">{cat.device}</td>
                  <td className="px-6 py-4 text-gray-500 font-bold">{cat.interval}</td>
                  <td className="px-6 py-4 text-gray-400 font-bold">{cat.lastTest}</td>
                  <td className="px-6 py-4 text-[#164399] font-black">{cat.nextDue}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10pt] font-black uppercase ${
                      cat.status === 'Quá hạn' ? 'bg-red-100 text-red-600' : 
                      cat.status === 'Đến hạn' ? 'bg-orange-100 text-orange-600' :
                      cat.status === 'Sắp đến hạn' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10pt] font-bold ${cat.urgency === 'Rất cao' ? 'text-red-500' : cat.urgency === 'Cao' ? 'text-orange-500' : 'text-gray-400'}`}>
                      Mức độ: {cat.urgency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
