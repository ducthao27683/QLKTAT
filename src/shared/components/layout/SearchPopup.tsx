import React from 'react';
import { Search, ChevronRight, Check } from 'lucide-react';

interface SearchPopupProps {
  searchTags: string[];
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  activeTagIndex: number | null;
  setActiveTagIndex: React.Dispatch<React.SetStateAction<number | null>>;
  filteredOptions: string[];
  handleSelectOption: (option: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  favorites: string[][];
  setFavorites: React.Dispatch<React.SetStateAction<string[][]>>;
}

export const SearchPopup: React.FC<SearchPopupProps> = ({
  searchTags,
  setSearchTags,
  searchQuery,
  setSearchQuery,
  activeTagIndex,
  setActiveTagIndex,
  filteredOptions,
  handleSelectOption,
  handleSearchSubmit
}) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden text-left">
      <div className="p-4 border-b border-gray-100">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit(e);
            }} 
            className="flex gap-2"
          >
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-[12pt] font-medium focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
            placeholder="Nhập từ khóa tìm kiếm (VD: 171, MBA...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="px-4 py-2 bg-[#164399] text-white rounded-lg hover:bg-blue-800 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((opt, i) => (
            <button
              key={i}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50/50 last:border-0"
              onClick={() => handleSelectOption(opt)}
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[12pt] text-gray-700 font-medium">{opt}</span>
              {searchTags[activeTagIndex ?? searchTags.length - 1] === opt && (
                <Check className="w-4 h-4 text-green-500 ml-auto" />
              )}
            </button>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 text-[12pt]">
            Không tìm thấy kết quả phù hợp.
          </div>
        )}
      </div>
    </div>
  );
};
