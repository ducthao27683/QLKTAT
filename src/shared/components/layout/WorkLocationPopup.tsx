import React from 'react';
import { Network, X, Star, ChevronDown, Clock } from 'lucide-react';
import { formatDevicePath, getDeviceTypes, getDeviceInstances } from '../../utils';
import { GroupedDeviceColumn } from '../common/GroupedDeviceColumn';

interface WorkLocationPopupProps {
  showDeviceTreePopup: boolean;
  setShowDeviceTreePopup: (show: boolean) => void;
  tempDevicePath: string[];
  setTempDevicePath: React.Dispatch<React.SetStateAction<string[]>>;
  deviceFavorites: string[][];
  setDeviceFavorites: React.Dispatch<React.SetStateAction<string[][]>>;
  deviceHistory: string[][];
  setDeviceHistory: React.Dispatch<React.SetStateAction<string[][]>>;
  setDevicePath: React.Dispatch<React.SetStateAction<string[]>>;
  setDeviceFormCurrentPage: (page: number) => void;
}

export const WorkLocationPopup = ({
  showDeviceTreePopup,
  setShowDeviceTreePopup,
  tempDevicePath,
  setTempDevicePath,
  deviceFavorites,
  setDeviceFavorites,
  deviceHistory,
  setDeviceHistory,
  setDevicePath,
  setDeviceFormCurrentPage
}: WorkLocationPopupProps) => {
  const [showDeviceFavorites, setShowDeviceFavorites] = React.useState(false);
  const [showDeviceHistory, setShowDeviceHistory] = React.useState(false);

  if (!showDeviceTreePopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-[90vw] h-[90vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-[12pt] text-[#164399] flex items-center gap-2">
            <Network className="w-5 h-5" />
            Chọn Vị trí/Thiết bị làm việc
          </h3>
          <button className="p-1 hover:bg-gray-200 rounded-full transition-colors" onClick={() => setShowDeviceTreePopup(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-3 border-b border-gray-200 bg-white flex items-center justify-between relative">
          <div className="font-medium text-blue-700 text-[12pt] flex-1 truncate pr-4 flex items-center gap-1.5">
            <span className="text-gray-400">Đang chọn:</span>
            {tempDevicePath.length > 0 ? (
              tempDevicePath.filter((_, i) => i % 2 === 0).map((part, i, arr) => (
                <React.Fragment key={i}>
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{part}</span>
                  {i < arr.length - 1 && <span className="text-gray-300">/</span>}
                </React.Fragment>
              ))
            ) : (
              <span className="text-gray-400 italic">Chưa chọn vị trí/thiết bị</span>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <div className="relative group">
              <button 
                className={`p-1.5 rounded transition-colors ${deviceFavorites.some(f => JSON.stringify(f) === JSON.stringify(tempDevicePath)) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`} 
                title="Ưa thích"
                onClick={() => {
                  const exists = deviceFavorites.some(f => JSON.stringify(f) === JSON.stringify(tempDevicePath));
                  if (exists) {
                    setDeviceFavorites(prev => prev.filter(f => JSON.stringify(f) !== JSON.stringify(tempDevicePath)));
                  } else {
                    setDeviceFavorites(prev => [tempDevicePath, ...prev].slice(0, 10));
                  }
                }}
              >
                <Star className={`w-5 h-5 ${deviceFavorites.some(f => JSON.stringify(f) === JSON.stringify(tempDevicePath)) ? 'fill-yellow-500' : ''}`} />
              </button>
              
              <button 
                className="p-1.5 rounded transition-colors text-gray-400 hover:text-blue-500" 
                title="Danh sách ưa thích"
                onClick={() => setShowDeviceFavorites(!showDeviceFavorites)}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showDeviceFavorites && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" /> Ưa thích ({deviceFavorites.length}/10)
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {deviceFavorites.length > 0 ? deviceFavorites.map((fav, idx) => (
                      <div key={idx} className="px-4 py-3 hover:bg-yellow-50 cursor-pointer border-b border-gray-50 flex justify-between items-start group" onClick={() => { setTempDevicePath(fav); setShowDeviceFavorites(false); }}>
                        <div className="text-[12pt] text-gray-700 whitespace-normal break-words pr-2 leading-relaxed">{formatDevicePath(fav)}</div>
                        <button 
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeviceFavorites(prev => prev.filter(f => JSON.stringify(f) !== JSON.stringify(fav)));
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )) : <div className="p-4 text-[12pt] text-gray-500 italic text-center">Chưa có mục ưa thích nào</div>}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                className="p-1.5 hover:bg-blue-50 rounded transition-colors text-gray-400 hover:text-blue-500" 
                title="Lịch sử"
                onClick={() => setShowDeviceHistory(!showDeviceHistory)}
              >
                <Clock className="w-5 h-5" />
              </button>
              {showDeviceHistory && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" /> Lịch sử chọn ({deviceHistory.length}/10)
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {deviceHistory.length > 0 ? deviceHistory.map((hist, idx) => (
                      <div key={idx} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 flex justify-between items-start" onClick={() => { setTempDevicePath(hist); setShowDeviceHistory(false); }}>
                        <div className="text-[12pt] text-gray-700 whitespace-normal break-words pr-2 leading-relaxed">{formatDevicePath(hist)}</div>
                      </div>
                    )) : <div className="p-4 text-[12pt] text-gray-500 italic text-center">Chưa có lịch sử</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex overflow-x-auto p-4 gap-4 bg-gray-100 custom-scrollbar" onClick={() => { setShowDeviceHistory(false); setShowDeviceFavorites(false); }}>
          {/* Cấp 1: Đơn vị/Nhóm */}
          <GroupedDeviceColumn 
            hideHeader={true}
            typeOptions={getDeviceTypes([])}
            selectedType={tempDevicePath[1] || "Tất cả"}
            onSelectType={(opt) => {
              const newPath = [...tempDevicePath];
              newPath[1] = opt;
              // Reset further levels
              setTempDevicePath(newPath.slice(0, 2));
            }}
            instanceOptions={getDeviceInstances([], tempDevicePath[1] || "Tất cả")}
            selectedInstance={tempDevicePath[0]}
            onSelectInstance={(opt) => {
              const newPath = [...tempDevicePath];
              newPath[0] = opt;
              if (newPath.length < 2) newPath[1] = "Tất cả";
              setTempDevicePath(newPath.slice(0, 2));
            }}
          />

          {/* Cấp 2: Công trình/Trạm/DZ */}
          {tempDevicePath.length >= 2 && tempDevicePath[0] && (
            <GroupedDeviceColumn 
              hideHeader={true}
              typeOptions={getDeviceTypes(tempDevicePath.slice(0, 2))}
              selectedType={tempDevicePath[3] || "Tất cả"}
              onSelectType={(opt) => {
                const newPath = [...tempDevicePath.slice(0, 2)];
                newPath[2] = tempDevicePath[2] || ""; // Keep instance if exists
                newPath[3] = opt;
                setTempDevicePath(newPath.slice(0, 4));
              }}
              instanceOptions={getDeviceInstances(tempDevicePath.slice(0, 2), tempDevicePath[3] || "Tất cả")}
              selectedInstance={tempDevicePath[2]}
              onSelectInstance={(opt) => {
                const newPath = [...tempDevicePath.slice(0, 2)];
                newPath[2] = opt;
                newPath[3] = tempDevicePath[3] || "Tất cả";
                setTempDevicePath(newPath.slice(0, 4));
              }}
            />
          )}

          {/* Cấp 3: Thành phần/Ngăn lộ */}
          {tempDevicePath.length >= 4 && tempDevicePath[2] && (
            <GroupedDeviceColumn 
              hideHeader={true}
              typeOptions={getDeviceTypes(tempDevicePath.slice(0, 4))}
              selectedType={tempDevicePath[5] || "Tất cả"}
              onSelectType={(opt) => {
                const newPath = [...tempDevicePath.slice(0, 4)];
                newPath[4] = tempDevicePath[4] || "";
                newPath[5] = opt;
                setTempDevicePath(newPath.slice(0, 6));
              }}
              instanceOptions={getDeviceInstances(tempDevicePath.slice(0, 4), tempDevicePath[5] || "Tất cả")}
              selectedInstance={tempDevicePath[4]}
              onSelectInstance={(opt) => {
                const newPath = [...tempDevicePath.slice(0, 4)];
                newPath[4] = opt;
                newPath[5] = tempDevicePath[5] || "Tất cả";
                setTempDevicePath(newPath.slice(0, 6));
              }}
            />
          )}

          {/* Cấp 4: Thiết bị chi tiết */}
          {tempDevicePath.length >= 6 && tempDevicePath[4] && (
            <GroupedDeviceColumn 
              hideHeader={true}
              typeOptions={getDeviceTypes(tempDevicePath.slice(0, 6))}
              selectedType={tempDevicePath[7] || "Tất cả"}
              onSelectType={(opt) => {
                const newPath = [...tempDevicePath.slice(0, 6)];
                newPath[6] = tempDevicePath[6] || "";
                newPath[7] = opt;
                setTempDevicePath(newPath.slice(0, 8));
              }}
              instanceOptions={getDeviceInstances(tempDevicePath.slice(0, 6), tempDevicePath[7] || "Tất cả")}
              selectedInstance={tempDevicePath[6]}
              onSelectInstance={(opt) => {
                const newPath = [...tempDevicePath.slice(0, 6)];
                newPath[6] = opt;
                newPath[7] = tempDevicePath[7] || "Tất cả";
                setTempDevicePath(newPath.slice(0, 8));
              }}
            />
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-3">
          <button 
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors" 
            onClick={() => setShowDeviceTreePopup(false)}
          >
            Hủy
          </button>
          <button 
            className="px-5 py-2 bg-[#164399] hover:bg-blue-800 text-white rounded-lg font-medium transition-colors shadow-sm" 
            onClick={() => {
              setDevicePath(tempDevicePath);
              setDeviceFormCurrentPage(1);
              setShowDeviceTreePopup(false);
              setDeviceHistory(prev => {
                const filtered = prev.filter(h => JSON.stringify(h) !== JSON.stringify(tempDevicePath));
                return [tempDevicePath, ...filtered].slice(0, 10);
              });
            }}
          >
            Chọn
          </button>
        </div>
      </div>
    </div>
  );
};
