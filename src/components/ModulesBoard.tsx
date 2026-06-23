import React, { useState, useEffect } from 'react';
import { Module, UserConfig, ALL_MODULES } from '../data';
import { EvnLogo } from './EvnLogo';
import { Settings } from 'lucide-react';
import { ConfigModal } from './ConfigModal';
import { bgImage, modulesImage } from '../assets/images';

interface ModulesBoardProps {
  config: UserConfig;
  onUpdateConfig: (newConfig: UserConfig) => void;
  onModuleSelect: (moduleId: string) => void;
}

const Hexagon = ({ module, onClick, size = 'normal', priority = false }: { module: Module; onClick: () => void; size?: 'normal' | 'large', priority?: boolean, key?: any }) => {
  const dimensions = size === 'large' ? 'w-72 h-64' : 'w-56 h-48';
  const titleSize = size === 'large' ? 'text-3xl' : 'text-xl';
  const subtitleSize = size === 'large' ? 'text-lg' : 'text-sm';
  const [loaded, setLoaded] = useState(false);

  return (
    <div 
      className={`relative ${dimensions} drop-shadow-[0_7px_7px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105 group`}
      onClick={onClick}
    >
      {/* Border layer */}
      <div 
        className="absolute inset-0 bg-[#FFFFFF] group-hover:bg-[#FFFF00] transition-colors duration-300" 
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
      ></div>
      {/* Image layer (inset 6px for ~5pt border) */}
      <div 
        className="absolute inset-[6px] bg-gray-900 transition-colors duration-300 overflow-hidden" 
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
      >
        <div className={`absolute inset-0 bg-gray-800 animate-pulse ${loaded ? 'hidden' : 'block'}`}></div>
        <img 
          src={module.imageUrl} 
          alt={module.title} 
          referrerPolicy="no-referrer"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-90 group-hover:opacity-60' : 'opacity-0'}`} 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
           <span className={`font-bold ${titleSize} text-white transition-all duration-300 tracking-wide`}>{module.title}</span>
           <span className={`font-medium ${subtitleSize} text-gray-200 transition-all duration-300 mt-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 overflow-hidden`}>{module.subtitle}</span>
        </div>
      </div>
    </div>
  );
};

const SecondaryCard = ({ module, onClick }: { module: Module; onClick: () => void, key?: any }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group w-32 flex-shrink-0" onClick={onClick}>
      <div className="w-full h-20 rounded-lg border-2 border-white/30 overflow-hidden relative drop-shadow-sm group-hover:border-[#F59A23] group-hover:shadow-[0_0_15px_rgba(245,154,35,0.4)] transition-all duration-300 bg-gray-800">
        <div className={`absolute inset-0 bg-gray-700 animate-pulse ${loaded ? 'hidden' : 'block'}`}></div>
        <img 
          src={module.imageUrl} 
          alt={module.title} 
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${loaded ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`} 
        />
      </div>
      <div className="text-center w-full px-1">
        <div className="text-white group-hover:text-[#F59A23] transition-colors duration-300 font-bold text-xs tracking-wide">{module.title}</div>
        <div className="text-white/80 group-hover:text-[#F59A23]/80 transition-colors duration-300 text-[10px] mt-0.5 line-clamp-2 leading-tight">{module.subtitle}</div>
      </div>
    </div>
  );
};

export const ModulesBoard = ({ config, onUpdateConfig, onModuleSelect }: ModulesBoardProps) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = modulesImage;
    img.onload = () => setBgLoaded(true);
  }, []);

  const mainModules = config.mainModuleIds.map(id => ALL_MODULES.find(m => m.id === id)!);
  const secondaryModules = config.secondaryModuleIds.map(id => ALL_MODULES.find(m => m.id === id)!);

  const handleModuleClick = (module: Module) => {
    if (module.id === 'm3') {
      onModuleSelect(module.id);
    } else {
      setToastMessage(`Hệ thống đang đồng bộ dữ liệu thời gian thực cho module "${module.title}"!`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-[#1a2b4c]">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url("${modulesImage}")` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Header */}
      <header className="z-10 w-full p-6 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <EvnLogo className="w-16 h-16" />
          <div className="text-white">
            <h1 className="text-2xl font-bold tracking-wider flex items-center gap-1.5 drop-shadow-md">
              <span className="text-white">EVN</span>
              <span className="text-red-500 italic">NPC</span>
            </h1>
            <h2 className="text-lg font-medium text-white/90 drop-shadow-md">CÔNG TY ĐIỆN LỰC HƯNG YÊN</h2>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="text-right">
            <div className="font-bold text-xl text-white drop-shadow-md">{config.fullName}</div>
            <div className="text-sm text-white/80 drop-shadow-md">{config.department}</div>
          </div>
          <img 
            src={config.avatarUrl} 
            alt="Avatar" 
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full border-2 border-white/80 shadow-md"
          />
          <button 
            onClick={() => setIsConfigOpen(true)}
            className="text-white/70 hover:text-white transition-colors mt-1"
            title="Cấu hình Module"
          >
            <Settings className="w-8 h-8 drop-shadow-md" />
          </button>
        </div>
      </header>

      {/* Main Content - Hexagons */}
      <main className="flex-1 z-10 flex items-center justify-center pb-10">
        {mainModules.length === 4 ? (
          <div className="relative w-[850px] h-[550px] flex items-center justify-center">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <Hexagon module={mainModules[0]} onClick={() => handleModuleClick(mainModules[0])} size="normal" priority={true} />
            </div>
            <div className="absolute top-1/2 left-12 -translate-y-1/2 z-20">
              <Hexagon module={mainModules[1]} onClick={() => handleModuleClick(mainModules[1])} size="large" priority={true} />
            </div>
            <div className="absolute top-1/2 right-12 -translate-y-1/2 z-20">
              <Hexagon module={mainModules[2]} onClick={() => handleModuleClick(mainModules[2])} size="large" priority={true} />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
              <Hexagon module={mainModules[3]} onClick={() => handleModuleClick(mainModules[3])} size="normal" priority={true} />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8 max-w-5xl">
            {mainModules.map(m => (
              <Hexagon key={m.id} module={m} onClick={() => handleModuleClick(m)} priority={true} />
            ))}
            {mainModules.length === 0 && (
              <div className="text-white/80 text-xl font-medium drop-shadow-md">Chưa có module nổi bật nào được chọn.</div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Content - Secondary Modules */}
      <footer className="z-10 w-full bg-[#164399]/50 hover:bg-[#164399] transition-colors duration-300 p-4 shadow-[0_-4px_15px_rgba(0,0,0,0.15)]">
        <div className="flex items-start justify-center gap-4 overflow-x-auto custom-scrollbar">
          {secondaryModules.map(m => (
            <SecondaryCard key={m.id} module={m} onClick={() => handleModuleClick(m)} />
          ))}
          {secondaryModules.length === 0 && (
            <div className="text-white/70 text-sm w-full text-center py-4">Không có module phụ.</div>
          )}
        </div>
      </footer>

      {/* Config Modal */}
      <ConfigModal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
        config={config}
        onSave={onUpdateConfig}
      />

      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] bg-[#164399]/90 border border-[#164399]/40 text-white font-semibold text-[10pt] px-6 py-4 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
