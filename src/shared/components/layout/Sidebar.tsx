import React, { useState } from 'react';
import { ChevronDown, Star, Clock } from 'lucide-react';
import { MENU_ITEMS } from '../../constants';

interface SidebarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  activeSubMenu: string | null;
  setActiveSubMenu: (subMenu: string | null) => void;
  isEditing?: boolean;
}

export const Sidebar = ({
  isMenuOpen,
  setIsMenuOpen,
  activeMenu,
  setActiveMenu,
  activeSubMenu,
  setActiveSubMenu,
  isEditing
}: SidebarProps) => {
  const [isThietLapExpanded, setIsThietLapExpanded] = useState(true);
  return (
    <aside 
      className={`bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide transition-all duration-300 flex-shrink-0 z-10 flex flex-col ${
        isMenuOpen ? 'w-64' : 'w-0 opacity-0 md:w-[100px] md:opacity-100'
      } ${isEditing ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className="py-3 flex-1">
        {MENU_ITEMS.map((item) => (
          <React.Fragment key={item.id}>
            {item.id === 'tien-ich' && <div className="my-2 border-t border-gray-200"></div>}
            <div className="mb-1">
              <button 
                className={`w-full flex items-center px-4 py-2.5 hover:bg-[#f6f8fc] hover:text-[#555555] transition-colors group ${
                  activeMenu === item.id ? 'bg-[#f6f8fc] font-bold text-blue-600' : 'text-gray-700'
                } ${!isMenuOpen ? 'justify-center md:flex-col md:py-3 md:gap-1' : 'justify-between'}`}
                onClick={() => {
                  if (!isMenuOpen) {
                    setIsMenuOpen(true);
                    setActiveMenu(item.id);
                  } else {
                    setActiveMenu(activeMenu === item.id ? null : item.id);
                  }
                }}
                title={!isMenuOpen ? item.title : undefined}
              >
                <div className={`flex items-center ${!isMenuOpen ? 'justify-center flex-col gap-1' : 'gap-4'}`}>
                  <div className={`${activeMenu === item.id ? 'text-blue-600' : ''} ${!isMenuOpen ? 'group-hover:scale-125 group-hover:text-blue-600 transition-all duration-300' : ''}`}>
                    {item.icon}
                  </div>
                  {isMenuOpen && <span className={`text-secondary ${activeMenu === item.id ? 'text-blue-600 font-bold' : ''}`}>{item.title}</span>}
                  {!isMenuOpen && <span className={`text-[12pt] font-bold hidden md:block text-center leading-tight mt-1 group-hover:text-blue-600 transition-colors duration-300 ${activeMenu === item.id ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>{item.title}</span>}
                </div>
                {isMenuOpen && (
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeMenu === item.id ? 'rotate-180' : ''}`} />
                )}
              </button>
              
              {isMenuOpen && activeMenu === item.id && (
                <div className="bg-gray-50 py-1">
                  {item.id === 'thi-nghiem' ? (
                    (() => {
                      const isThietLapActive = activeSubMenu === 'Thiết lập hạng mục' || activeSubMenu === 'Thiết lập thiết bị' || activeSubMenu === 'Thiết lập thí nghiệm';
                      return (
                        <div className="flex flex-col">
                          {/* Parent group: Thiết lập thí nghiệm (Level 2) */}
                          <div className="flex flex-col">
                            <button
                              onClick={() => {
                                setIsThietLapExpanded(!isThietLapExpanded);
                              }}
                              className={`w-full text-left pl-8 pr-4 py-2.5 text-secondary flex items-center justify-between transition-all duration-200 ${
                                isThietLapActive 
                                  ? 'text-[#164399] font-black bg-blue-50/55' 
                                  : 'text-gray-650 hover:text-blue-700 hover:font-bold hover:bg-blue-50/50'
                              }`}
                            >
                              <span className="text-[11pt]">Thiết lập thí nghiệm</span>
                              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isThietLapExpanded ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* Level 3 items con: Thiết lập hạng mục, Thiết lập thiết bị */}
                            {isThietLapExpanded && (
                              <div className="pl-4 border-l border-gray-200 ml-10 my-1 space-y-1">
                                <button
                                  onClick={() => {
                                    setActiveSubMenu('Thiết lập hạng mục');
                                    setIsMenuOpen(false);
                                  }}
                                  className={`w-full text-left py-1.5 px-3 rounded-l-md transition-all duration-200 block text-[9pt] ${
                                    activeSubMenu === 'Thiết lập hạng mục'
                                      ? 'text-blue-600 font-bold bg-blue-100/45 border-r-2 border-blue-600'
                                      : 'text-gray-500 hover:text-blue-600 hover:bg-[#eaeef6]/40 font-medium'
                                  }`}
                                >
                                  Thiết lập hạng mục
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveSubMenu('Thiết lập thiết bị');
                                    setIsMenuOpen(false);
                                  }}
                                  className={`w-full text-left py-1.5 px-3 rounded-l-md transition-all duration-200 block text-[9pt] ${
                                    activeSubMenu === 'Thiết lập thiết bị' || activeSubMenu === 'Thiết lập thí nghiệm'
                                      ? 'text-blue-600 font-bold bg-blue-100/45 border-r-2 border-blue-600'
                                      : 'text-gray-500 hover:text-blue-600 hover:bg-[#eaeef6]/40 font-medium'
                                  }`}
                                >
                                  Thiết lập thiết bị
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Remaining sub-items of thi-nghiem at Level 2 */}
                           {['Yêu cầu thí nghiệm', 'Kết quả thí nghiệm'].map((subItem, sIdx) => (
                            <button
                              key={sIdx}
                              className={`w-full text-left pl-8 pr-4 py-2.5 text-secondary transition-all duration-200 ${
                                activeSubMenu === subItem
                                  ? 'text-blue-700 font-bold bg-blue-50'
                                  : 'text-gray-650 hover:text-blue-700 hover:font-bold hover:bg-blue-50'
                              }`}
                              onClick={() => {
                                setActiveSubMenu(subItem);
                                setIsMenuOpen(false);
                              }}
                            >
                              {subItem}
                            </button>
                          ))}
                        </div>
                      );
                    })()
                  ) : (
                    item.subItems.map((subItem, idx) => (
                      <button 
                        key={idx}
                        className={`w-full text-left pl-8 pr-4 py-2.5 text-secondary transition-all duration-200 ${
                          activeSubMenu === subItem 
                            ? 'text-blue-700 font-bold bg-blue-50' 
                            : 'text-gray-600 hover:text-blue-700 hover:font-bold hover:bg-blue-50'
                        }`}
                        onClick={() => {
                          setActiveSubMenu(subItem);
                          setIsMenuOpen(false);
                        }}
                      >
                        {subItem}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {isMenuOpen && (
        <div className="mt-auto border-t border-gray-150 p-3 bg-gray-100/40 space-y-4 rounded-xl m-3 border border-gray-150 shadow-3xs">
          <div>
            <h4 className="text-[7.5pt] font-black text-gray-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500/10" /> Mở nhiều nhất
            </h4>
            <div className="space-y-0.5">
              <button 
                onClick={() => {
                  setActiveMenu('thiet-bi');
                  setActiveSubMenu('Sơ đồ thiết bị');
                }}
                className="w-full text-left text-slate-650 hover:bg-white hover:text-blue-600 py-1 px-2.5 rounded-lg transition-all truncate text-[8.2pt] font-semibold block"
              >
                Sơ đồ thiết bị
              </button>
              <button 
                onClick={() => {
                  setActiveMenu('su-co');
                  setActiveSubMenu('Danh sách sự cố');
                }}
                className="w-full text-left text-slate-650 hover:bg-white hover:text-blue-600 py-1 px-2.5 rounded-lg transition-all truncate text-[8.2pt] font-semibold block"
              >
                Danh sách sự cố
              </button>
              <button 
                onClick={() => {
                  setActiveMenu('cong-viec');
                  setActiveSubMenu('Sổ vận hành');
                }}
                className="w-full text-left text-slate-650 hover:bg-white hover:text-blue-600 py-1 px-2.5 rounded-lg transition-all truncate text-[8.2pt] font-semibold block"
              >
                Sổ vận hành
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-[7.5pt] font-black text-gray-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-500" /> Mở gần đây
            </h4>
            <div className="space-y-0.5">
              <button 
                onClick={() => {
                  setActiveMenu('bao-cao');
                  setActiveSubMenu('Báo cáo quản trị đơn vị');
                }}
                className="w-full text-left text-slate-650 hover:bg-white hover:text-blue-600 py-1 px-2.5 rounded-lg transition-all truncate text-[8.2pt] font-semibold block"
              >
                Báo cáo quản trị đơn vị
              </button>
              <button 
                onClick={() => {
                  setActiveMenu('thong-so');
                  setActiveSubMenu('Giám sát thông số');
                }}
                className="w-full text-left text-slate-650 hover:bg-white hover:text-blue-600 py-1 px-2.5 rounded-lg transition-all truncate text-[8.2pt] font-semibold block"
              >
                Giám sát thông số
              </button>
              <button 
                onClick={() => {
                  setActiveMenu('scbd');
                  setActiveSubMenu('Sửa chữa theo CBM/RCM');
                }}
                className="w-full text-left text-slate-650 hover:bg-white hover:text-blue-600 py-1 px-2.5 rounded-lg transition-all truncate text-[8.2pt] font-semibold block"
              >
                Thực hiện CBM
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
