import React, { useEffect, useRef } from 'react';
import { 
  Menu, Search, Bell, Bug, User, LayoutDashboard, Star, Clock, X, ChevronDown
} from 'lucide-react';
import { UserConfig } from '../../../data';
import { DesignTooltip } from '../../../components/DesignTooltip';
import { EvnLogo } from '../../../components/EvnLogo';
import { Notification } from '../../types';
import { SearchPopup } from './SearchPopup';

interface HeaderProps {
  config: UserConfig;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onBack: () => void;
  setActiveMenu: (menu: string | null) => void;
  setActiveSubMenu: (subMenu: string | null) => void;
  searchTags: string[];
  setSearchTags: (tags: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSearchPopup: boolean;
  setShowSearchPopup: (show: boolean) => void;
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  favorites: string[][];
  setFavorites: React.Dispatch<React.SetStateAction<string[][]>>;
  history: string[][];
  notifications: Notification[];
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
  activeTagIndex: number | null;
  setActiveTagIndex: (index: number | null) => void;
  filteredOptions: string[];
  handleSelectOption: (option: string) => void;
  handleSearchSubmit: () => void;
  toggleFavorite: (search: string[], e: React.MouseEvent) => void;
  loadSearch: (search: string[]) => void;
  isEditing?: boolean;
  currentBranch?: string;
  onOpenDeviceTreePopup?: () => void;
}

export const Header = ({
  config,
  isMenuOpen,
  setIsMenuOpen,
  onBack,
  setActiveMenu,
  setActiveSubMenu,
  searchTags,
  setSearchTags,
  searchQuery,
  setSearchQuery,
  showSearchPopup,
  setShowSearchPopup,
  showFavorites,
  setShowFavorites,
  showHistory,
  setShowHistory,
  favorites,
  setFavorites,
  history,
  notifications,
  showNotifications,
  setShowNotifications,
  showUserMenu,
  setShowUserMenu,
  activeTagIndex,
  setActiveTagIndex,
  filteredOptions,
  handleSelectOption,
  handleSearchSubmit,
  toggleFavorite,
  loadSearch,
  isEditing,
  currentBranch,
  onOpenDeviceTreePopup
}: HeaderProps) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchPopup(false);
      }
    };

    if (showSearchPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchPopup, setShowSearchPopup]);

  return (
    <header className={`flex items-center justify-between h-14 bg-white border-b border-gray-200 shrink-0 z-[100] ${isEditing ? 'pointer-events-none opacity-50' : ''}`}>
      {/* Logo Container */}
      <div 
        className={`flex items-center shrink-0 h-full border-r border-gray-100 bg-white shadow-[2px_0_4px_rgba(0,0,0,0.02)] transition-all duration-300 relative overflow-hidden ${isMenuOpen ? 'w-64 px-4' : 'w-[100px] justify-center'}`}
      >
        <div className="flex items-center gap-1.5 cursor-pointer group whitespace-nowrap" onClick={onBack} title="Quay lại Modules Board">
          <EvnLogo className={`${isMenuOpen ? 'w-10 h-10' : 'w-8 h-8'} transition-all duration-300 group-hover:scale-110`} />
          <div className="flex flex-col flex-1 min-w-0">
            <span className={`font-black tracking-tighter transition-all duration-300 ${isMenuOpen ? 'text-[12pt]' : 'text-[12pt]'}`}>
              <span className="text-[#164399]">PMIS</span>
              {isMenuOpen && <span className="ml-0.5 text-red-600 italic">Lưới</span>}
            </span>
            {isMenuOpen && <span className="text-[7pt] font-black text-gray-400 opacity-60 uppercase tracking-widest leading-none mt-0.5">v2.0.4 - 2026</span>}
          </div>
        </div>
      </div>

      {/* Toggle & Title Area */}
      <div className="flex items-center gap-3 pl-4 h-full">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1.5 hover:bg-blue-50 rounded-lg transition-all text-gray-600 hover:text-blue-600 active:scale-95"
          title={isMenuOpen ? "Thu gọn menu" : "Mở rộng menu"}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="h-4 w-px bg-gray-200"></div>
        <div className="flex items-center gap-2">
           <div 
             className="flex items-center gap-1.5 font-bold text-gray-400 cursor-pointer hover:text-gray-600 transition-all group px-3 py-1 hover:bg-gray-50 rounded-lg"
             onClick={onOpenDeviceTreePopup}
           >
             <span className="text-[9.5pt] uppercase tracking-widest opacity-80 group-hover:opacity-100">{currentBranch || "CÔNG TY ĐIỆN LỰC HƯNG YÊN"}</span>
             <ChevronDown className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 group-hover:translate-y-0.5 transition-all" />
           </div>
        </div>
      </div>

      <div className="flex-1 px-4 relative flex items-center min-w-0" ref={searchContainerRef}>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3 group shrink-0" 
          title="Thông tin nhanh"
          onClick={() => { setActiveMenu(null); setActiveSubMenu(null); }}
        >
          <LayoutDashboard className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
        </button>
        <div className="flex items-stretch w-full max-w-lg h-9">
          <div 
            className="flex-1 flex items-center rounded-l-full px-4 bg-gray-100 hover:bg-gray-200 cursor-text relative h-full transition-colors overflow-hidden"
            onClick={() => setShowSearchPopup(true)}
          >
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <div className="flex-1 flex items-center gap-1.5 overflow-hidden no-scrollbar py-1">
              {searchTags.length > 0 ? (
                <>
                  {searchTags.map((tag, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9.5pt] font-bold whitespace-nowrap transition-all ${
                        idx % 2 === 0 ? 'bg-blue-100 text-[#164399] border border-blue-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTagIndex(idx);
                        setShowSearchPopup(true);
                      }}
                    >
                      {tag}
                      <X 
                        className="w-3.5 h-3.5 hover:text-red-500 cursor-pointer" 
                        onClick={(e) => {
                          e.stopPropagation();
                          const newTags = searchTags.filter((_, i) => i !== idx);
                          setSearchTags(newTags);
                        }}
                      />
                    </div>
                  ))}
                  {searchQuery && (
                    <span className="text-[10pt] text-gray-700 font-medium whitespace-nowrap italic ml-1">
                      {searchQuery}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-gray-500 text-[10pt] font-medium select-none">Bạn muốn làm gì?</span>
              )}
            </div>
          </div>
          <div className="relative h-full flex shrink-0">
            <DesignTooltip id="btn_luu_tim_kiem">
              <button className="bg-gray-100 hover:bg-gray-200 px-3 h-full transition-colors flex items-center justify-center relative border-l border-white/50" title="Lưu tìm kiếm" onClick={() => {setShowFavorites(!showFavorites); setShowHistory(false); setShowSearchPopup(false);}}>
                <Star className={`w-4 h-4 ${showFavorites ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
              </button>
            </DesignTooltip>
            {showFavorites && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2 text-[11pt]">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Tìm kiếm ưa thích ({favorites.length}/10)
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {favorites.length > 0 ? favorites.map((fav, idx) => (
                    <div key={idx} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 flex justify-between items-start group" onClick={() => loadSearch(fav)}>
                      <div className="text-[11pt] text-gray-700 pr-2 whitespace-normal break-words leading-relaxed font-medium">{fav?.join?.(' > ') || ""}</div>
                      <button className="text-yellow-500 hover:text-gray-400 transition-colors mt-0.5 shrink-0" onClick={(e) => toggleFavorite(fav, e)} title="Bỏ ưa thích">
                        <Star className="w-4 h-4 fill-yellow-500" />
                      </button>
                    </div>
                  )) : <div className="p-4 text-[11pt] font-medium text-gray-500 italic text-center">Chưa có mục ưa thích nào</div>}
                </div>
              </div>
            )}
          </div>
          <div className="relative h-full flex shrink-0">
            <DesignTooltip id="btn_lich_su_tim_kiem">
              <button className="bg-gray-100 hover:bg-gray-200 px-3 h-full rounded-r-full transition-colors flex items-center justify-center relative border-l border-white/50" title="Lịch sử tìm kiếm" onClick={() => {setShowHistory(!showHistory); setShowFavorites(false); setShowSearchPopup(false);}}>
                <Clock className={`w-4 h-4 ${showHistory ? 'text-blue-500' : 'text-gray-600'}`} />
              </button>
            </DesignTooltip>
            {showHistory && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2 text-[11pt]">
                  <Clock className="w-4 h-4 text-blue-500" /> Lịch sử tìm kiếm
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {history.length > 0 ? history.map((hist, idx) => {
                    const isFav = favorites.some(f => JSON.stringify(f) === JSON.stringify(hist));
                    return (
                    <div key={idx} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 flex justify-between items-start" onClick={() => loadSearch(hist)}>
                      <div className="text-[11pt] text-gray-700 whitespace-normal break-words pr-2 leading-relaxed font-medium">{hist?.join?.(' > ') || ""}</div>
                      <button className={`${isFav ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'} transition-colors mt-0.5 shrink-0`} onClick={(e) => { e.stopPropagation(); if (isFav) toggleFavorite(hist, e); else setFavorites(prev => [hist, ...prev].slice(0, 10)); }} title={isFav ? "Bỏ ưa thích" : "Thêm vào ưa thích"}>
                        <Star className={`w-4 h-4 ${isFav ? 'fill-yellow-500' : ''}`} />
                      </button>
                    </div>
                  )}) : <div className="p-4 text-[11pt] text-gray-500 italic text-center font-medium">Chưa có lịch sử tìm kiếm</div>}
                </div>
              </div>
            )}
          </div>
        </div>

        {showSearchPopup && (
          <SearchPopup 
            searchTags={searchTags}
            setSearchTags={setSearchTags}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTagIndex={activeTagIndex}
            setActiveTagIndex={setActiveTagIndex}
            filteredOptions={filteredOptions}
            handleSelectOption={handleSelectOption}
            handleSearchSubmit={handleSearchSubmit}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </div>

      <div className="flex items-center gap-1 pr-4">
        <DesignTooltip id="btn_bao_loi">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" title="Báo lỗi">
            <Bug className="w-6 h-6 text-gray-600" />
          </button>
        </DesignTooltip>
        <div className="relative">
          <DesignTooltip id="btn_thong_bao">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" 
              title="Thông báo"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </DesignTooltip>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] overflow-hidden flex flex-col max-h-[32rem]">
              <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 text-[12pt]">Thông báo</h3>
                <span className="text-[12pt] text-blue-600 hover:underline cursor-pointer">Đánh dấu đã đọc</span>
              </div>
              <div className="overflow-y-auto custom-scrollbar flex-1">
                {notifications.map(n => (
                  <div key={n.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-blue-50/50' : ''}`}>
                    <div className="flex gap-3">
                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[12pt] truncate ${!n.read ? 'font-semibold text-[#555555]' : 'text-gray-600'}`}>{n.title}</p>
                        <p className="text-[12pt] text-gray-500 mt-1 line-clamp-2">{n.desc}</p>
                        <p className="text-[12pt] text-gray-400 mt-1.5">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-100 text-center bg-gray-50">
                <DesignTooltip id="btn_xem_tat_ca_thong_bao">
                  <button className="text-[10pt] text-gray-400 hover:text-blue-600 hover:font-bold transition-all">Xem tất cả</button>
                </DesignTooltip>
              </div>
            </div>
          )}
        </div>
        <div className="relative ml-2">
          <button 
            className="w-8 h-8 rounded-full overflow-hidden border border-gray-200"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img src={config.avatarUrl} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                <img src={config.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <div className="font-medium text-[#555555] text-[12pt]">{config.fullName}</div>
                  <div className="text-[12pt] text-gray-500">{config.username}</div>
                </div>
              </div>
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[12pt] text-gray-700">Quản lý tài khoản</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-secondary text-gray-700">Cài đặt</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-secondary text-gray-700" onClick={onBack}>Quay lại Modules Board</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-secondary text-gray-700">Đăng xuất</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
