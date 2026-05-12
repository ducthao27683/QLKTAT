import React, { useState, useRef } from 'react';
import { Edit, Save, X } from 'lucide-react';

interface DesignSpec {
  whatName: string;
  whatType: string;
  whatSource: string;
  styleSort: string;
  styleFormat: string;
  valueView: string;
  valueAdd: string;
  howEvents: string;
  howActions: string;
  whenVisible: string;
  whenEnabled: string;
}

const DEFAULT_SPEC: DesignSpec = {
  whatName: 'Tên control',
  whatType: 'Loại control',
  whatSource: 'Không có nguồn',
  styleSort: 'Mặc định',
  styleFormat: 'Mặc định',
  valueView: 'Giá trị mặc định',
  valueAdd: 'Giá trị trống',
  howEvents: 'Không có',
  howActions: 'Không có',
  whenVisible: 'Luôn hiện',
  whenEnabled: 'Luôn thao tác được'
};

export const DesignTooltip: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const [spec, setSpec] = useState<DesignSpec>(() => {
    const saved = localStorage.getItem(`design_spec_${id}`);
    return saved ? JSON.parse(saved) : DEFAULT_SPEC;
  });
  const [tempSpec, setTempSpec] = useState<DesignSpec>(spec);

  const handleSave = () => {
    setSpec(tempSpec);
    localStorage.setItem(`design_spec_${id}`, JSON.stringify(tempSpec));
    setIsEditing(false);
  };

  const updateCoords = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom,
        left: rect.left + rect.width / 2
      });
    }
  };

  return (
    <div 
      ref={triggerRef}
      className="relative inline-block w-full"
      onMouseEnter={() => {
        if (!isEditing) {
          updateCoords();
          setShowTooltip(true);
        }
      }}
      onMouseLeave={() => !isEditing && setShowTooltip(false)}
    >
      {children}
      
      {(showTooltip || isEditing) && (
        <div 
          className="fixed z-[99999] pt-2 w-[400px] -translate-x-1/2 pointer-events-auto"
          style={{ top: coords.top, left: coords.left }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="bg-white border border-blue-200 shadow-2xl rounded-lg overflow-hidden text-left text-sm font-sans">
          <div className="bg-blue-50 px-3 py-2 border-b border-blue-100 flex justify-between items-center">
            <span className="font-bold text-blue-800">Đặc tả thiết kế</span>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800">
                <Edit className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="text-green-600 hover:text-green-800">
                  <Save className="w-4 h-4" />
                </button>
                <button onClick={() => { setIsEditing(false); setTempSpec(spec); setShowTooltip(false); }} className="text-red-600 hover:text-red-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="p-3 max-h-[400px] overflow-y-auto custom-scrollbar text-[12px]">
            {!isEditing ? (
              <div className="space-y-2 text-gray-700 font-normal">
                <p><span className="font-bold">WHAT:</span> {spec.whatName} | {spec.whatType} | {spec.whatSource}</p>
                <p><span className="font-bold">STYLE:</span> {spec.styleSort} | {spec.styleFormat}</p>
                <p><span className="font-bold">VALUE:</span> Xem: {spec.valueView} | Thêm: {spec.valueAdd}</p>
                <p><span className="font-bold">HOW:</span> {spec.howEvents} &rarr; {spec.howActions}</p>
                <p><span className="font-bold">WHEN:</span> Hiện: {spec.whenVisible} | Bật: {spec.whenEnabled}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Tên gọi</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.whatName} onChange={e => setTempSpec({...tempSpec, whatName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Loại control</label>
                  <select 
                    className="w-full border p-1 rounded font-normal" 
                    value={tempSpec.whatType} 
                    onChange={e => setTempSpec({...tempSpec, whatType: e.target.value})}
                  >
                    <option value="Label">Label</option>
                    <option value="Button">Button</option>
                    <option value="Icon">Icon</option>
                    <option value="Text Input">Text Input</option>
                    <option value="Date Input">Date Input</option>
                    <option value="Number Input">Number Input</option>
                    <option value="Combobox">Combobox</option>
                    <option value="Listbox">Listbox</option>
                    <option value="TextArea">TextArea</option>
                    <option value="Checkbox">Checkbox</option>
                    <option value="Radio Button">Radio Button</option>
                    <option value="File Browser">File Browser</option>
                    <option value="Image Thumbnails">Image Thumbnails</option>
                    <option value="Files">Files</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Nguồn dữ liệu</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.whatSource} onChange={e => setTempSpec({...tempSpec, whatSource: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Sắp xếp</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.styleSort} onChange={e => setTempSpec({...tempSpec, styleSort: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Định dạng</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.styleFormat} onChange={e => setTempSpec({...tempSpec, styleFormat: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Giá trị (Xem)</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.valueView} onChange={e => setTempSpec({...tempSpec, valueView: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Giá trị (Thêm)</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.valueAdd} onChange={e => setTempSpec({...tempSpec, valueAdd: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Sự kiện</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.howEvents} onChange={e => setTempSpec({...tempSpec, howEvents: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Hành động</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.howActions} onChange={e => setTempSpec({...tempSpec, howActions: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Điều kiện hiện</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.whenVisible} onChange={e => setTempSpec({...tempSpec, whenVisible: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500">Điều kiện bật</label>
                  <input className="w-full border p-1 rounded font-normal" value={tempSpec.whenEnabled} onChange={e => setTempSpec({...tempSpec, whenEnabled: e.target.value})} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
  );
};
