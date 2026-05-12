import { useState } from 'react';
import { Module, UserConfig, ALL_MODULES } from '../data';
import { Settings, X, Plus, Minus, ArrowUp, ArrowDown } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: UserConfig;
  onSave: (newConfig: UserConfig) => void;
}

export const ConfigModal = ({ isOpen, onClose, config, onSave }: ConfigModalProps) => {
  const [mainIds, setMainIds] = useState<string[]>(config.mainModuleIds);
  const [secIds, setSecIds] = useState<string[]>(config.secondaryModuleIds);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...config,
      mainModuleIds: mainIds,
      secondaryModuleIds: secIds,
    });
    onClose();
  };

  const moveToMain = (id: string) => {
    if (mainIds.length >= 4) {
      alert("Chỉ được chọn tối đa 4 module nổi bật.");
      return;
    }
    setSecIds(secIds.filter(mId => mId !== id));
    setMainIds([...mainIds, id]);
  };

  const moveToSec = (id: string) => {
    setMainIds(mainIds.filter(mId => mId !== id));
    setSecIds([...secIds, id]);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newIds = [...mainIds];
    [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
    setMainIds(newIds);
  };

  const moveDown = (index: number) => {
    if (index === mainIds.length - 1) return;
    const newIds = [...mainIds];
    [newIds[index + 1], newIds[index]] = [newIds[index], newIds[index + 1]];
    setMainIds(newIds);
  };

  const getModule = (id: string) => ALL_MODULES.find(m => m.id === id)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] border border-white/40">
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            Cấu hình Module hiển thị
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex gap-6 flex-col md:flex-row">
          {/* Main Modules Column */}
          <div className="flex-1 bg-blue-50/50 rounded-lg p-4 border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-blue-900">Module Nổi Bật</h3>
              <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded-full">{mainIds.length}/4</span>
            </div>
            <div className="space-y-3">
              {mainIds.map((id, index) => {
                const m = getModule(id);
                return (
                  <div key={id} className="flex items-center justify-between bg-white/80 p-3 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <img src={m.imageUrl} alt="" referrerPolicy="no-referrer" className="w-10 h-10 rounded object-cover" />
                      <div>
                        <div className="font-medium text-sm text-gray-800">{m.title}</div>
                        <div className="text-xs text-gray-500">{m.subtitle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className={`p-1.5 rounded-md transition-colors ${index === 0 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-100'}`}
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => moveDown(index)}
                        disabled={index === mainIds.length - 1}
                        className={`p-1.5 rounded-md transition-colors ${index === mainIds.length - 1 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-100'}`}
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => moveToSec(id)}
                        className="p-1.5 text-red-500 hover:bg-red-100 rounded-md transition-colors ml-1"
                        title="Chuyển xuống Module Phụ"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {mainIds.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  Chưa có module nổi bật
                </div>
              )}
            </div>
          </div>

          {/* Secondary Modules Column */}
          <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Module Phụ</h3>
              <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{secIds.length}</span>
            </div>
            <div className="space-y-3">
              {secIds.map(id => {
                const m = getModule(id);
                return (
                  <div key={id} className="flex items-center justify-between bg-white/80 p-3 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <img src={m.imageUrl} alt="" referrerPolicy="no-referrer" className="w-10 h-10 rounded object-cover" />
                      <div>
                        <div className="font-medium text-sm text-gray-800">{m.title}</div>
                        <div className="text-xs text-gray-500">{m.subtitle}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => moveToMain(id)}
                      disabled={mainIds.length >= 4}
                      className={`p-1.5 rounded-md transition-colors ${mainIds.length >= 4 ? 'text-gray-300 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`}
                      title="Chuyển lên Module Nổi Bật"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
              {secIds.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  Không còn module phụ
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200/50 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-5 py-2 text-gray-700 hover:bg-gray-200/80 rounded-md font-medium transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors shadow-sm"
          >
            Lưu cấu hình
          </button>
        </div>
      </div>
    </div>
  );
};
