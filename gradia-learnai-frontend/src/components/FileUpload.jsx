// 파일 업로드 UI

import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ onFileUpload, uploadedFile, loading }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 slide-up">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        onClick={handleUploadClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
      >
        {loading ? (
          <>
            <div className="loading-spinner"></div>
            <span>파일 처리중...</span>
          </>
        ) : (
          <>
            <Upload size={24} />
            <span className="text-lg font-medium">📁 파일 업로드</span>
          </>
        )}
      </button>

      {uploadedFile && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg fade-in">
          <div className="text-sm text-gray-600 text-center">
            <span className="font-medium">선택된 파일:</span> {uploadedFile.name}
          </div>
          <div className="text-xs text-gray-500 text-center mt-1">
            크기: {(uploadedFile.size / 1024).toFixed(1)} KB
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        지원 형식: TXT, PDF (최대 10MB)
      </div>
    </div>
  );
};

export default FileUpload;