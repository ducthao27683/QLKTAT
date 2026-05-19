import React from 'react';
import { Camera, FileText, Trash2 } from 'lucide-react';
import { EvnLogo } from '../../../../components/EvnLogo';
import { FileUploader } from '../../../../components/FileUploader';

interface DeviceDetailFormProps {
  detailForm: any;
  setDetailForm: (form: any) => void;
}

export const DeviceDetailForm = ({
  detailForm,
  setDetailForm
}: DeviceDetailFormProps) => {
  const isView = detailForm.mode === 'view';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Column 1: Info */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-500 uppercase">Tên thiết bị</label>
              <input 
                type="text" 
                defaultValue={detailForm.data || ""} 
                readOnly={isView}
                className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Mã thiết bị</label>
                <input 
                  type="text" 
                  defaultValue="TB-001" 
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] font-bold rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Trạng thái</label>
                <select 
                  disabled={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all appearance-none ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                >
                  <option>Đang vận hành</option>
                  <option>Dự phòng</option>
                  <option>Sửa chữa</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Ngày vận hành</label>
                <input 
                  type="date" 
                  defaultValue="2020-01-01"
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Mã liên kết khác</label>
                <input 
                  type="text" 
                  defaultValue="-"
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Số S/N</label>
                <input 
                  type="text" 
                  defaultValue="SN-123456"
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Mã CMIS</label>
                <input 
                  type="text" 
                  defaultValue="CMIS-001"
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Số thẻ TSCD</label>
                <input 
                  type="text" 
                  defaultValue="3001"
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Góc lái</label>
                <input 
                  type="text" 
                  defaultValue="0.0"
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Khoảng cách vị trí</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Tiếp địa</label>
                <input 
                  type="text" 
                  defaultValue="RC1"
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10pt] font-bold text-gray-500 uppercase">Khu vực</label>
                <input 
                  type="text" 
                  defaultValue="Đồng bằng"
                  readOnly={isView}
                  className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10pt] font-bold text-gray-500 uppercase">Mô tả chi tiết</label>
              <textarea 
                rows={3}
                readOnly={isView}
                className={`w-full px-3 py-2 text-[12pt] rounded-lg transition-all ${isView ? 'bg-transparent border-transparent focus:outline-none resize-none' : 'bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                placeholder="Nhập mô tả..."
              />
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
                        <img src={`https://picsum.photos/seed/device-${imgId}/400/225`} alt="Image" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
