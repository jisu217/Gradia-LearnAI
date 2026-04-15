import React from 'react';
// 커스텀 훅 임포트
import { useFileHandler } from './hooks/useFileHandler';
import { useLearningSession } from './hooks/useLearningSession';

// 컴포넌트 임포트
import FileUpload from './components/FileUpload';
import LearningHistory from './components/LearningHistory';
import StepContent from './components/Step/StepContent';
import MemoBox from './components/Memo/MemoBox'; 
import './App.css';

const App = () => {
  // 1. 파일 핸들링 로직
  const { uploadedFile, loading, handleFileUpload, resetFileState } = useFileHandler();
  
  // 2. 학습 세션 로직 (memos, setMemos 추가 추출)
  const { 
    currentStep, setCurrentStep, analysisData, 
    learningHistory, setLearningHistory, starredItems, 
    toggleStar, saveProgress,
    memos, setMemos 
  } = useLearningSession(uploadedFile);

  // 뒤로가기 핸들러
  const handleBack = () => {
    if (currentStep) setCurrentStep(null);
    else resetFileState();
  };

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 fade-in">
            Gradia-LearnAI
          </h1>

          <FileUpload 
            onFileUpload={handleFileUpload} 
            uploadedFile={uploadedFile}
            loading={loading}
          />

          {!uploadedFile ? (
            <LearningHistory 
              history={learningHistory}
              onClearHistory={() => setLearningHistory([])}
            />
          ) : (
            <div className="fade-in">
              <StepContent
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                analysisData={analysisData}
                starredItems={starredItems}
                toggleStar={toggleStar}
                saveProgress={saveProgress}
                onBack={handleBack} 
                loading={loading}
              />
              
              {/* MemoBox에 필요한 Props 전달 */}
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