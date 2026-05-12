import React from 'react';
import { Search, Star } from 'lucide-react';

interface SearchPopupProps {
  searchTags: string[];
  setSearchTags: (tags: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTagIndex: number | null;
  setActiveTagIndex: (index: number | null) => void;
  filteredOptions: string[];
  handleSelectOption: (option: string) => void;
  handleSearchSubmit: () => void;
  favorites: string[][];
  setFavorites: React.Dispatch<React.SetStateAction<string[][]>>;
}

export const SearchPopup = ({
  searchTags,
  setSearchTags,
  searchQuery,
  setSearchQuery,
  activeTagIndex,
  setActiveTagIndex,
  filteredOptions,
  handleSelectOption,
  handleSearchSubmit,
  favorites,
  setFavorites
}: SearchPopupProps) => {
  const currentSearchState = [...searchTags];
  if (searchQuery) currentSearchState.push(searchQuery);
  const isCurrentFavorite = favorites.some(f => JSON.stringify(f) === JSON.stringify(currentSearchState));

  return (
    <div className="absolute top-full left-12 right-12 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[999] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
          {searchTags.map((tag, idx) => (
            <div 
              key={idx} 
              className={`flex items-center text-[12pt] px-3 py-1.5 rounded-md border cursor-pointer shadow-sm transition-colors ${activeTagIndex === idx ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
              onClick={() => setActiveTagIndex(idx)}
            >
              <span>{tag}</span>
              <button 
                className="ml-2 text-blue-400 hover:text-blue-800" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setSearchTags(searchTags.slice(0, idx));
                  setActiveTagIndex(null);
                }}
              >
                &times;
              </button>
            </div>
          ))}
          {searchTags.length === 0 && <span className="text-[12pt] text-gray-400 italic py-1.5">Chưa có thẻ nào được chọn</span>}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-shadow">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Nhập từ khóa" 
              className="w-full py-2.5 outline-none bg-transparent text-gray-700 text-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && searchQuery === '' && searchTags.length > 0) {
                  setSearchTags(searchTags.slice(0, -1));
                }
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              autoFocus
            />
          </div>
          <button 
            className={`px-3 rounded-lg border transition-colors flex items-center justify-center ${isCurrentFavorite ? 'bg-yellow-50 border-yellow-200 text-yellow-500' : 'bg-white border-gray-300 text-gray-400 hover:text-yellow-500 hover:border-yellow-300'}`}
            onClick={(e) => {
              e.stopPropagation();
              if (currentSearchState.length === 0) return;
              if (isCurrentFavorite) {
                setFavorites(prev => prev.filter(f => JSON.stringify(f) !== JSON.stringify(currentSearchState)));
              } else {
                setFavorites(prev => [currentSearchState, ...prev].slice(0, 10));
              }
            }}
            title={isCurrentFavorite ? "Bỏ ưa thích" : "Thêm vào ưa thích"}
          >
            <Star className={`w-5 h-5 ${isCurrentFavorite ? 'fill-yellow-500' : ''}`} />
          </button>
          <button 
            className="bg-[#164399] hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
            onClick={handleSearchSubmit}
          >
            OK
          </button>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto py-2">
        <div className="px-4 py-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          Gợi ý từ điển
        </div>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((suggestion, idx) => (
            <div 
              key={idx} 
              className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-gray-700 transition-colors"
              onClick={() => handleSelectOption(suggestion)}
            >
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Search className="w-3 h-3 text-gray-500" />
              </div>
              <span className="font-medium text-[12pt]">{suggestion}</span>
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-gray-500 italic text-center">Không tìm thấy kết quả phù hợp</div>
        )}
      </div>
    </div>
  );
};
