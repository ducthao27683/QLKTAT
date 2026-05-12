import React from 'react';
import { Camera, FileText, Trash2 } from 'lucide-react';
import { EvnLogo } from '../../EvnLogo';
import { FileUploader } from '../common/FileUploader';

interface IncidentDetailFormProps {
  detailForm: any;
  devicePath: string[];
}

export const IncidentDetailForm = ({
  detailForm,
  devicePath
}: IncidentDetailFormProps) => {
  const isView = detailForm.mode === 'view';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Column 1: Info */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-500 uppercase">Thiết bị xảy ra sự cố</label>
              {isView ? (
                <input 
                  type="text" 
                  defaultValue={detailForm.data?.device || ""} 
                  readOnly={true}
                  className="w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all bg-transparent border-transparent focus:outline-none"
                />
              ) : (
                <select 
                  className="w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
                  defaultValue={detailForm.data?.device || ""}
                >
                  <option value="">-- Chọn thiết bị --</option>
                  {(() => {
                    const parent = devicePath[devicePath.length - 1];
                    return [
                      `${parent} - Thiết bị 1`,
                      `${parent} - Thiết bị 2`,
                      `${parent} - Thiết bị 3`,
                      `${parent} - Thiết bị 4`,
                    ].map(d => <option key={d} value={d}>{d}</option>);
                  })()}
                </select>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-500 uppercase">Diễn biến sự cố</label>
              <textarea 
                rows={4}
                defaultValue={detailForm.data?.description || ""} 
                readOnly={isView}
                className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-500 uppercase">Nguyên nhân</label>
              <textarea 
                rows={3}
                defaultValue={detailForm.data?.cause || ""} 
                readOnly={isView}
                className={`w-full px-3 py-2 text-[12pt] text-purple-600 rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Thời điểm</label>
                <input 
                  type="datetime-local" 
                  defaultValue={detailForm.data?.time?.replace(' ', 'T') || new Date().toISOString().slice(0, 16)} 
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Trạng thái</label>
                <select 
                  disabled={isView}
                  defaultValue={detailForm.data?.status || "Mới tạo"}
                  className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all appearance-none ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                >
                  <option>Mới tạo</option>
                  <option>Đang xử lý</option>
                  <option>Đã hoàn thành</option>
                  <option>Chờ duyệt</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Images & Attachments */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Camera className="w-3.5 h-3.5" />
            Hình ảnh liên quan
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {(() => {
              const images = [1, 2]; // Mock images
              const displayImages = [...images];
              if (displayImages.length % 2 !== 0) {
                displayImages.push(-1); // Placeholder
              }
              return (
                <>
                  {displayImages.map((imgId, idx) => (
                    imgId === -1 ? (
                      <div key={`placeholder-${idx}`} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-200 flex items-center justify-center">
                        <div className="scale-75 opacity-40">
                          <EvnLogo />
                        </div>
                      </div>
                    ) : (
                      <div key={imgId} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={`https://picsum.photos/seed/incident-${imgId}/400/225`} alt="Image" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        {!isView && (
                          <button className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )
                  ))}
                  {!isView && (
                    <div className={images.length % 2 === 0 ? "col-span-2" : ""}>
                      <FileUploader 
                        type="image" 
                        mode={detailForm.mode} 
                        onFileSelect={(files) => console.log('Selected images:', files)} 
                      />
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[12pt] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Tài liệu đính kèm
          </h4>
          <div className="space-y-2">
            {[1].map(i => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12pt] font-bold text-gray-700">Tai_lieu_001.pdf</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">1.2 MB</p>
                  </div>
                </div>
                {!isView && (
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <FileUploader 
              type="document" 
              mode={detailForm.mode} 
              onFileSelect={(files) => console.log('Selected documents:', files)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
