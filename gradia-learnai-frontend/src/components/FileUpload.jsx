// 파일 업로드 컴포넌트
// 사용자가 TXT 또는 PDF 파일을 업로드할 수 있도록 UI 제공
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ onFileUpload, uploadedFile, loading }) => {
  // 숨겨진 파일 input 참조
  const fileInputRef = useRef(null);

  // 파일 선택 시 호출되는 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 첫 번째 파일만 선택
    if (file) {
      onFileUpload(file); // 부모 컴포넌트에 파일 전달
    }
  };

  // 업로드 버튼 클릭 시 숨겨진 input 클릭
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 slide-up">
      {/* 실제 파일 input은 숨김 */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf" // 허용 파일 확장자
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* 파일 업로드 버튼 */}
      <button
        onClick={handleUploadClick}
        disabled={loading} // 처리 중이면 비활성화
        className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
      >
        {loading ? (
          // 파일 처리 중일 때 표시
          <>
            <div className="loading-spinner"></div>
            <span>파일 처리중...</span>
          </>
        ) : (
          // 기본 업로드 버튼 UI
          <>
            <Upload size={24} />
            <span className="text-lg font-medium">파일 업로드</span>
          </>
        )}
      </button>

      {/* 선택된 파일 정보 표시 */}
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
      
      {/* 파일 형식 안내 */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        지원 형식: TXT, PDF (최대 10MB)
      </div>
    </div>
  );
};

export default FileUpload;
