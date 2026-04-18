import { useState } from 'react';
import { processFile } from '../utils/file/fileProcessor';

export const useFileHandler = () => { // 상태 준비
  const [uploadedFile, setUploadedFile] = useState(null); // 파일
  const [extractedText, setExtractedText] = useState(''); // 파일에서 뽑아낸 텍스트
  const [loading, setLoading] = useState(false); // 처리 여부

  // 파일 업로드 함수
  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploadedFile(file);
    setLoading(true);

    try { // 파일 읽기 
      const content = await processFile(file);
      setExtractedText(content);
    } catch (error) {
      alert('파일 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  // 초기화 함수
  const resetFileState = () => {
    setUploadedFile(null);
    setExtractedText('');
  };

  return { uploadedFile, extractedText, loading, handleFileUpload, resetFileState };
};