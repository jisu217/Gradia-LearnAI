import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useLearningSession = (uploadedFile) => {
  const [currentStep, setCurrentStep] = useState(null); // 현재 학습 단계
  const [analysisData, setAnalysisData] = useState({ // AI 분석 결과(키워드 추출, 개념 정의, 개념 설명, 문서 요약 등) 저장소
    keywords: [], concepts1: [], concepts2: [], summary: ''
  });
  
  const [learningHistory, setLearningHistory] = useLocalStorage('learningHistory', []); // 학습 기록
  const [starredItems, setStarredItems] = useLocalStorage('starredItems', []); // 키워드 및 개념에 대한 즐겨찾기 상태 저장
  
  // 메모 데이터 저장
  const [memos, setMemos] = useLocalStorage('memos', []);

  const saveProgress = (step) => {
    const progressData = {
      id: Date.now(),
      filename: uploadedFile?.name || 'Unknown',
      step,
      timestamp: new Date().toISOString(),
      keywords: analysisData.keywords.slice(0, 5),
      summary: analysisData.summary.slice(0, 100) + (analysisData.summary.length > 100 ? '...' : '')
    };
    setLearningHistory(prev => [...prev, progressData]);
  };

  const toggleStar = (item, type) => {
    const key = `${type}-${item}`;
    setStarredItems(prev => prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]);
  };

  return {
    currentStep, setCurrentStep, 
    analysisData, setAnalysisData,
    learningHistory, setLearningHistory,
    starredItems, toggleStar, saveProgress,
    memos, setMemos
  };
};