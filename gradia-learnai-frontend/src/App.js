// 메인 앱 컴포넌트 

import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import LearningHistory from './components/LearningHistory';
import StepContent from './components/StepContent';
import MemoBox from './components/MemoBox';
import { useLocalStorage } from './hooks/useLocalStorage';
import { processFile } from './utils/fileProcessor';
import './App.css';

const App = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [analysisData, setAnalysisData] = useState({
    keywords: [],
    concepts1: [],
    concepts2: [],
    summary: ''
  });
  const [loading, setLoading] = useState(false);
  
  // LocalStorage hooks
  const [learningHistory, setLearningHistory] = useLocalStorage('learningHistory', []);
  const [starredItems, setStarredItems] = useLocalStorage('starredItems', []);
  const [memos, setMemos] = useLocalStorage('memos', []);

  // File upload handler
  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['txt', 'pdf'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('txt 또는 pdf 파일만 업로드 가능합니다.');
      return;
    }

    setUploadedFile(file);
    setLoading(true);
    setCurrentStep(null);

    try {
      const result = await processFile(file);
      setExtractedText(result.text);
      setAnalysisData(result.analysis);
    } catch (error) {
      console.error('파일 처리 중 오류:', error);
      alert('파일 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Save learning progress
  const saveProgress = (step) => {
    const progressData = {
      id: Date.now(),
      filename: uploadedFile?.name || 'Unknown',
      step: step,
      timestamp: new Date().toISOString(),
      keywords: analysisData.keywords.slice(0, 5),
      summary: analysisData.summary.slice(0, 100) + (analysisData.summary.length > 100 ? '...' : '')
    };
    
    setLearningHistory(prev => [...prev, progressData]);
    alert(`${step}단계 학습 이력이 저장되었습니다.`);
  };

  // Toggle star for items
  const toggleStar = (item, type) => {
    const key = `${type}-${item}`;
    setStarredItems(prev => {
      if (prev.includes(key)) {
        return prev.filter(starred => starred !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  // Reset to home
  const resetToHome = () => {
    setUploadedFile(null);
    setCurrentStep(null);
    setExtractedText('');
    setAnalysisData({
      keywords: [],
      concepts1: [],
      concepts2: [],
      summary: ''
    });
  };

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 fade-in">
            Gradia-LearnAI
          </h1>

          {/* File Upload Section */}
          <FileUpload 
            onFileUpload={handleFileUpload} 
            uploadedFile={uploadedFile}
            loading={loading}
          />

          {/* Main Content */}
          {!uploadedFile ? (
            /* Learning History Section */
            <LearningHistory 
              history={learningHistory}
              onClearHistory={() => setLearningHistory([])}
            />
          ) : (
            /* Steps Section */
            <div className="fade-in">
              <StepContent
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                analysisData={analysisData}
                starredItems={starredItems}
                toggleStar={toggleStar}
                saveProgress={saveProgress}
                onBack={currentStep ? () => setCurrentStep(null) : resetToHome}
                loading={loading}
              />
              
              {/* Memo Section */}
              <MemoBox
                uploadedFile={uploadedFile}
                memos={memos}
                setMemos={setMemos}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;