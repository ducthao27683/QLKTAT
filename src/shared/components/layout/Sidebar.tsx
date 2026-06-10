import React from 'react';
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
                  activeMenu === item.id ? 'bg-[#f6f8fc] font-medium text-[#555555]' : 'text-gray-700'
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
                  {isMenuOpen && <span className="text-secondary">{item.title}</span>}
                  {!isMenuOpen && <span className="text-[12pt] font-bold hidden md:block text-center leading-tight mt-1 text-gray-400 group-hover:text-blue-600 transition-colors duration-300">{item.title}</span>}
                </div>
                {isMenuOpen && (
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeMenu === item.id ? 'rotate-180' : ''}`} />
                )}
              </button>
              
              {isMenuOpen && activeMenu === item.id && (
                <div className="bg-gray-50 py-1">
                  {item.subItems.map((subItem, idx) => (
                    <button 
                      key={idx}
                      className={`w-full text-left pl-14 pr-4 py-2.5 text-secondary transition-all duration-200 ${
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
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {isMenuOpen && (
        <div className="mt-auto border-t border-gray-200 py-4 px-4 space-y-5">
          <div>
            <h4 className="text-secondary font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Star className="w-3.5 h-3.5" /> Mở nhiều nhất
            </h4>
            <div className="space-y-1">
              <button 
                onClick={() => {
                  setActiveMenu('thiet-bi');
                  setActiveSubMenu('Sơ đồ thiết bị');
                }}
                className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate"
              >
                Sơ đồ thiết bị
              </button>
              <button 
                onClick={() => {
                  setActiveMenu('su-co');
                  setActiveSubMenu('Danh sách sự cố');
                }}
                className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate"
              >
                Danh sách sự cố
              </button>
              <button 
                onClick={() => {
                  setActiveMenu('cong-viec');
                  setActiveSubMenu('Sổ vận hành');
                }}
                className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate"
              >
                Sổ vận hành
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-secondary font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Mở gần đây
            </h4>
            <div className="space-y-1">
              <button className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate">Báo cáo quản trị đơn vị</button>
              <button className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate">Giám sát thông số</button>
              <button className="w-full text-left text-secondary text-gray-600 hover:bg-[#f6f8fc] hover:text-blue-600 py-1.5 px-2 rounded transition-colors truncate">Thực hiện CBM</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
