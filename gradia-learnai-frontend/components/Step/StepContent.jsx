// 메인 컨테이너

import React from 'react';
import { Search, Brain, BookOpen, FileText } from 'lucide-react';
import StepList from './StepList';
import StepDetail from './StepDetail';

const StepContent = ({ currentStep, setCurrentStep, analysisData, starredItems, toggleStar, saveProgress, onBack, loading }) => {

  const steps = [
    { id: 1, title: '키워드 추출', icon: <Search size={20} />, 
    content: analysisData.keywords.map(kw => ({ text: kw, type: 'keyword' })), 
    description: '문서의 흐름을 파악하기 위해 핵심 키워드를 확인해 보세요.' },

    { id: 2, title: '개념 정의', icon: <Brain size={20} />, 
    content: analysisData.concepts1.map(c => ({ text: `${c.keyword}: ${c.definition}`, type: 'concept1' })), 
    description: '본격적인 학습 전, 용어들의 명확한 기초 정의를 통해 기반을 다져보세요.' },
    
    { id: 3, title: '개념 설명', icon: <BookOpen size={20} />, 
    content: analysisData.concepts2.map(c => ({ text: `${c.keyword}: ${c.explanation}`, type: 'concept2' })), 
    description: '상세한 설명을 읽으며 개념을 깊이 있게 이해해 보세요.' },
   
    { id: 4, title: '문서 요약', icon: <FileText size={20} />, 
    content: analysisData.summary ? [{ text: analysisData.summary, type: 'summary' }] : [], 
    description: '전체 내용을 요약된 문장으로 훑어보며 학습을 마무리해 보세요.' }
  ];

  if (loading) return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="loading-spinner mx-auto mb-4"></div>
      <p className="text-gray-600">문서를 분석하고 있습니다...</p>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!currentStep ? (
        <StepList 
          steps={steps} 
          onStepClick={setCurrentStep} 
          onBack={onBack} 
          onSave={saveProgress} 
        />
      ) : (
        <StepDetail 
          stepData={steps.find(s => s.id === currentStep)}
          isLast={currentStep === steps.length}
          starredItems={starredItems}
          onToggleStar={toggleStar}
          onBack={() => setCurrentStep(null)}
          onNext={() => setCurrentStep(currentStep + 1)}
          onSave={saveProgress}
        />
      )}
    </div>
  );
};

export default StepContent;