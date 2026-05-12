import React, { useState, useRef } from 'react';
import { Plus, Upload } from 'lucide-react';

interface FileUploaderProps {
  type: 'image' | 'document';
  onFileSelect: (files: FileList) => void;
  mode: 'view' | 'edit' | 'add';
}

export const FileUploader = ({ 
  type, 
  onFileSelect, 
  mode 
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (mode === 'view') return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const accept = type === 'image' ? 'image/*' : '.doc,.docx,.xls,.xlsx,.pdf,.csv,.txt,.rar,.zip';

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`relative cursor-pointer transition-all border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 min-h-[120px] ${
        isDragging ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500'
      }`}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        multiple 
        accept={accept}
        onChange={(e) => e.target.files && onFileSelect(e.target.files)}
      />
      {type === 'image' ? (
        <>
          <Plus className="w-8 h-8 mb-2" />
          <span className="text-[12pt] font-bold">Tải ảnh lên</span>
        </>
      ) : (
        <>
          <Upload className="w-8 h-8 mb-2" />
          <span className="text-[12pt] font-bold">Tải tài liệu lên</span>
        </>
      )}
      <p className="text-[10pt] mt-1 opacity-60">Kéo thả file vào đây</p>
    </div>
  );
};
