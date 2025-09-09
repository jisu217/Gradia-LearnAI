// 파일 처리 로직

import { extractKeywords } from './keywordExtractor';
import { generateSummary } from './summarizer';

export const processFile = async (file) => {
  try {
    const text = await extractTextFromFile(file);
    const analysis = await analyzeText(text);
    
    return {
      text,
      analysis
    };
  } catch (error) {
    console.error('File processing error:', error);
    throw new Error('파일 처리 중 오류가 발생했습니다.');
  }
};

const extractTextFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileType = file.name.split('.').pop().toLowerCase();
    
    if (fileType === 'txt') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file, 'UTF-8');
    } 
    else if (fileType === 'pdf') {
      // PDF 처리는 브라우저에서 제한적이므로 간단한 구현
      // 실제 프로덕션에서는 PDF.js 라이브러리 사용 권장
      const reader = new FileReader();
      reader.onload = (e) => {
        // PDF 바이너리에서 텍스트 추출 시뮬레이션
        const text = "PDF 파일이 업로드되었습니다. 실제 환경에서는 PDF.js 라이브러리를 사용하여 텍스트를 추출합니다.";
        resolve(text);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    }
    else {
      reject(new Error('지원하지 않는 파일 형식입니다.'));
    }
  });
};

const analyzeText = async (text) => {
  try {
    // 키워드 추출
    const keywords = extractKeywords(text);
    
    // 개념 1 생성 (키워드 + 정의)
    const concepts1 = keywords.map(keyword => ({
      keyword,
      definition: `${keyword}는 해당 문서에서 핵심적인 개념으로 사용됩니다. 이에 대한 정의를 학습합니다.`
    }));
    
    // 개념 2 생성 (키워드 + 설명)
    const concepts2 = keywords.map(keyword => ({
      keyword,
      explanation: `${keyword}는(은) 문서의 주요 주제를 형성하는 중요한 요소입니다.`
    }));
    
    // 요약 생성
    const summary = generateSummary(text);
    
    return {
      keywords,
      concepts1,
      concepts2,
      summary
    };
  } catch (error) {
    console.error('Text analysis error:', error);
    throw new Error('텍스트 분석 중 오류가 발생했습니다.');
  }
};

// 파일 크기 검증
export const validateFileSize = (file, maxSize = 10 * 1024 * 1024) => { // 10MB
  return file.size <= maxSize;
};

// 파일 타입 검증
export const validateFileType = (file, allowedTypes = ['txt', 'pdf']) => {
  const fileType = file.name.split('.').pop().toLowerCase();
  return allowedTypes.includes(fileType);
};

// 파일 유효성 종합 검사
export const validateFile = (file) => {
  const errors = [];
  
  if (!validateFileType(file)) {
    errors.push('지원하지 않는 파일 형식입니다. (txt, pdf만 지원)');
  }
  
  if (!validateFileSize(file)) {
    errors.push('파일 크기가 10MB를 초과합니다.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};