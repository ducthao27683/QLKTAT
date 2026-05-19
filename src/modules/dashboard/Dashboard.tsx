import React from 'react';
import { 
  Cpu, Activity, ClipboardList, AlertTriangle, 
  BarChart2, Database, Network, GitCommit, Box, Bell, ChevronDown, Wrench
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Label
} from 'recharts';
import { UserConfig } from '../../data';
import { DesignTooltip } from '../../components/DesignTooltip';
import { formatNumber } from '../../shared/utils';
import { BRANCHES } from '../../shared/constants';
import CSKH_ICON from '../../assets/CSKH.png';

interface DashboardProps {
  config: UserConfig;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  branchMultiplier: number;
  currentChartDataEqCurrent: any[];
  currentChartDataEqLastMonth: any[];
  currentChartDataEqLastYear: any[];
  currentChartDataIncident3Months: any[];
  dynamicIncidentList: any[];
  dynamicCbmList: any[];
  currentChartData3: any[];
  setActiveSubMenu: (menu: string) => void;
}

export const Dashboard = ({
  config,
  selectedBranch,
  setSelectedBranch,
  branchMultiplier,
  currentChartDataEqCurrent,
  currentChartDataEqLastMonth,
  currentChartDataEqLastYear,
  currentChartDataIncident3Months,
  dynamicIncidentList,
  dynamicCbmList,
  currentChartData3,
  setActiveSubMenu
}: DashboardProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-start bg-white p-4 rounded-xl shadow-sm border border-gray-100 group">
        <div className="flex items-center gap-4">
          <img src={CSKH_ICON} alt="CSKH" className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover bg-blue-50 group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
          <div>
            <h2 className="text-[12pt] font-bold text-[#164399] flex items-center gap-2 group-hover:text-blue-700 transition-colors duration-300">
              Xin chào, {config.fullName}!
            </h2>
            <p className="text-secondary text-gray-500 mt-1">
              Bạn có: <span 
                className="hover:underline cursor-pointer transition-all duration-300"
                onClick={() => setActiveSubMenu('Kết quả công việc')}
              ><span className="text-red-600 font-bold">05</span> <span className="text-secondary">công việc đang xử lý</span></span> - <span 
                className="hover:underline cursor-pointer transition-all duration-300"
                onClick={() => setActiveSubMenu('Thiết lập công việc')}
              ><span className="text-red-600 font-bold">03</span> <span className="text-secondary">công việc sắp đến kỳ thực hiện</span></span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[12pt] text-gray-500 font-medium">Đơn vị:</span>
          <div className="relative">
            <DesignTooltip id="select_don_vi">
              <select 
                className="appearance-none bg-white border border-gray-300 text-gray-700 text-[12pt] font-normal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-4 pr-10 py-2.5 shadow-sm outline-none cursor-pointer hover:bg-gray-50 transition-colors"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option>Công ty Điện lực Hưng Yên</option>
                {BRANCHES.map(b => <option key={b}>{b}</option>)}
              </select>
            </DesignTooltip>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
            <Cpu className="w-7 h-7 text-green-500 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-gray-500 text-secondary font-medium mb-1">Đang vận hành</div>
            <div className="text-prominent font-bold text-green-600 hover:scale-110 transition-transform cursor-default">{1245 * branchMultiplier} <span className="text-secondary font-normal text-gray-400">thiết bị</span></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
            <Wrench className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-gray-500 text-secondary font-medium mb-1">Đang bảo trì</div>
            <div className="text-prominent font-bold text-[#164399] hover:scale-110 transition-transform cursor-default">{84 * branchMultiplier} <span className="text-secondary font-normal text-gray-400">thiết bị</span></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
            <AlertTriangle className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-gray-500 text-secondary font-medium mb-1">Đang gặp sự cố</div>
            <div className="text-prominent font-bold text-red-600 hover:scale-110 transition-transform cursor-default">{12 * branchMultiplier} <span className="text-secondary font-normal text-gray-400">thiết bị</span></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
            <ClipboardList className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-gray-500 text-secondary font-medium mb-1">Công việc cần xử lý</div>
            <div className="text-prominent font-bold text-[#555555] hover:scale-110 transition-transform cursor-default">{36 * branchMultiplier} <span className="text-secondary font-normal text-gray-400">nhiệm vụ</span></div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
          <DesignTooltip id="title_thong_ke_thiet_bi">
            <h3 className="text-gray-500 font-bold mb-4 flex items-center gap-2 uppercase text-[12pt]">
              <BarChart2 className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              Thống kê thiết bị
            </h3>
          </DesignTooltip>
          <div className="h-64 group-hover:scale-[1.02] transition-transform duration-300 flex gap-4">
            <div className="flex-1 text-center relative flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentChartDataEqCurrent}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      className="cursor-pointer"
                    >
                      {currentChartDataEqCurrent.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} className="hover:filter hover:drop-shadow-lg transition-all duration-300" />
                      ))}
                      <Label 
                        value={formatNumber(currentChartDataEqCurrent.reduce((sum, item) => sum + item.value, 0))} 
                        position="center" 
                        className="text-prominent font-bold fill-gray-800 hover:fill-blue-600 transition-colors cursor-default"
                      />
                    </Pie>
                    <Tooltip formatter={(value: number) => formatNumber(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <h4 className="text-secondary font-bold text-gray-600 mt-2">Tháng này năm nay</h4>
            </div>
            <div className="flex-1 text-center relative flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentChartDataEqLastMonth}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      className="cursor-pointer"
                    >
                      {currentChartDataEqLastMonth.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} className="hover:filter hover:drop-shadow-lg transition-all duration-300" />
                      ))}
                      <Label 
                        value={formatNumber(currentChartDataEqLastMonth.reduce((sum, item) => sum + item.value, 0))} 
                        position="center" 
                        className="text-prominent font-bold fill-gray-800 hover:fill-blue-600 transition-colors cursor-default"
                      />
                    </Pie>
                    <Tooltip formatter={(value: number) => formatNumber(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <h4 className="text-secondary font-bold text-gray-600 mt-2">Số liệu tháng trước</h4>
            </div>
            <div className="flex-1 text-center relative flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentChartDataEqLastYear}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      className="cursor-pointer"
                    >
                      {currentChartDataEqLastYear.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} className="hover:filter hover:drop-shadow-lg transition-all duration-300" />
                      ))}
                      <Label 
                        value={formatNumber(currentChartDataEqLastYear.reduce((sum, item) => sum + item.value, 0))} 
                        position="center" 
                        className="text-prominent font-bold fill-gray-800 hover:fill-blue-600 transition-colors cursor-default"
                      />
                    </Pie>
                    <Tooltip formatter={(value: number) => formatNumber(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <h4 className="text-secondary font-bold text-gray-600 mt-2">Cùng kỳ năm trước</h4>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="flex gap-6 text-[12pt] font-medium text-gray-500">
              {currentChartDataEqCurrent.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
          <DesignTooltip id="title_su_co_3_thang">
            <h3 className="text-gray-500 font-bold mb-4 flex items-center gap-2 uppercase text-[12pt]">
              <AlertTriangle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
              Sự cố 3 tháng gần nhất
            </h3>
          </DesignTooltip>
          <div className="h-64 group-hover:scale-[1.02] transition-transform duration-300">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentChartDataIncident3Months} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13.3 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13.3 }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} />
                <Bar dataKey="thietBi" name="Thiết bị" fill="#9333ea" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                <Bar dataKey="duongDay" name="Đường dây" fill="#991b1b" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                <Bar dataKey="tram" name="Trạm" fill="#f97316" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity cursor-pointer" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <DesignTooltip id="title_su_co_moi_nhat">
              <h3 className="text-gray-500 font-bold flex items-center gap-2 uppercase text-[12pt]">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Sự cố mới nhất
              </h3>
            </DesignTooltip>
            <div className="flex items-center gap-4 ml-auto">
              <DesignTooltip id="btn_xem_tat_ca_su_co">
                <button className="text-[10pt] text-gray-400 hover:text-blue-600 hover:font-bold transition-all whitespace-nowrap">Xem tất cả</button>
              </DesignTooltip>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {dynamicIncidentList.map((item) => (
              <div key={item.id} className="p-4 hover:bg-[#f6f8fc] transition-colors cursor-pointer flex gap-4 items-start group/card">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                  {item.type === 'Trạm' && <Database className="w-6 h-6 text-blue-500" />}
                  {item.type === 'Đường dây' && <Network className="w-6 h-6 text-green-500" />}
                  {item.type === 'Nút' && <GitCommit className="w-6 h-6 text-orange-500" />}
                  {item.type === 'Thiết bị' && <Box className="w-6 h-6 text-purple-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[#555555] text-[12pt] truncate pr-2 group-hover/card:text-blue-600 transition-colors">{item.title}</span>
                    <span className="text-[10pt] text-gray-500 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-[12pt] text-gray-600 line-clamp-1" title={item.desc}>{item.desc.length > 100 ? item.desc.substring(0, 97) + '...' : item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <DesignTooltip id="title_chi_dao_cbm">
              <h3 className="text-gray-500 font-bold flex items-center gap-2 uppercase text-[12pt]">
                <Wrench className="w-5 h-5 text-orange-500" />
                Chỉ đạo xử lý tồn tại CBM
              </h3>
            </DesignTooltip>
            <div className="flex items-center gap-4 ml-auto">
              <DesignTooltip id="btn_xem_tat_ca_cbm">
                <button className="text-[10pt] text-gray-400 hover:text-blue-600 hover:font-bold transition-all whitespace-nowrap">Xem tất cả</button>
              </DesignTooltip>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {dynamicCbmList.map((item) => (
              <div key={item.id} className="p-4 hover:bg-blue-50/80 transition-all cursor-pointer flex items-start gap-4 group/card hover:shadow-md">
                <div className="w-16 shrink-0 flex flex-col items-center group-hover/card:scale-110 transition-transform">
                  <div className="w-12 h-12 border border-gray-200 bg-white rounded-[10px] flex flex-col items-center justify-center shadow-sm group-hover/card:border-blue-300 group-hover/card:shadow-md transition-all border-t-2 border-t-[#164399]">
                    <span className="text-[7pt] text-[#164399] font-bold uppercase tracking-wider mb-0.5">Ngày</span>
                    <span className="text-secondary font-bold text-[#164399] leading-none text-[14pt]">{item.date.split('/')[0]}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1 items-center gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[#555555] text-[12pt] group-hover/card:text-blue-600 transition-colors truncate">{item.title}</span>
                      <span className="text-secondary px-2 py-0.5 rounded bg-gray-100 text-gray-500 shrink-0">{item.type}</span>
                    </div>
                    <span className={`text-[7pt] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 whitespace-nowrap ${
                      item.status === 'Đã hoàn thành' || item.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                      item.status === 'Chờ duyệt' ? 'bg-yellow-100 text-yellow-700' :
                      item.status === 'Mới tạo' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{item.status === 'Đã hoàn thành' ? 'Hoàn thành' : item.status}</span>
                  </div>
                  <p className="text-[12pt] text-gray-600 line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
          <DesignTooltip id="title_khoi_luong_cong_viec">
            <h3 className="text-gray-500 font-bold mb-4 flex items-center gap-2 uppercase text-[12pt]">
              <Activity className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
              Khối lượng công việc
            </h3>
          </DesignTooltip>
          <div className="h-64 group-hover:scale-[1.02] transition-transform duration-300">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentChartData3} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} tick={{fontSize: 10, fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} tickCount={8} />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
                <Line type="monotone" dataKey="anToan" name="An toàn" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="vanHanh" name="Vận hành" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="suaChua" name="Công việc" stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="thiNghiem" name="Thí nghiệm" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <DesignTooltip id="title_thong_bao_he_thong">
              <h3 className="text-gray-500 font-bold flex items-center gap-2 uppercase text-[12pt]">
                <Bell className="w-5 h-5 text-blue-500" />
                Thông báo hệ thống
              </h3>
            </DesignTooltip>
          </div>
          <div className="divide-y divide-gray-100 flex-1 overflow-y-auto custom-scrollbar">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 hover:bg-[#f6f8fc] transition-colors flex gap-3 cursor-pointer">
                <div className="mt-0.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-[12pt] text-[#555555] font-medium line-clamp-2">Cập nhật phiên bản PMIS Lưới v2.4.5</p>
                  <span className="text-secondary text-gray-500 mt-1 block">Hôm qua</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
