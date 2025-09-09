// 단계별 학습 UI

import React from 'react';
import { ChevronLeft, Save, Star, Search, Brain, FileText, BookOpen } from 'lucide-react';

const StepContent = ({ 
  currentStep, 
  setCurrentStep, 
  analysisData, 
  starredItems, 
  toggleStar, 
  saveProgress, 
  onBack, 
  loading 
}) => {
  const steps = [
    {
      id: 1,
      title: '🔍 키워드 추출',
      icon: <Search size={20} />,
      content: analysisData.keywords.map(kw => ({ text: kw, type: 'keyword' })),
      description: '문서에서 추출된 핵심 키워드들입니다.'
    },
    {
      id: 2,
      title: '🧠 개념 정의',
      icon: <Brain size={20} />,
      content: analysisData.concepts1.map(c => ({ 
        text: `${c.keyword}: ${c.definition}`, 
        type: 'concept1' 
      })),
      description: '키워드들의 정의와 설명입니다.'
    },
    {
      id: 3,
      title: '📝 개념 설명',
      icon: <BookOpen size={20} />,
      content: analysisData.concepts2.map(c => ({ 
        text: `${c.keyword}: ${c.explanation}`, 
        type: 'concept2' 
      })),
      description: '키워드들에 대한 상세 설명입니다.'
    },
    {
      id: 4,
      title: '📄 문서 요약',
      icon: <FileText size={20} />,
      content: analysisData.summary ? [{ text: analysisData.summary, type: 'summary' }] : [],
      description: '전체 문서의 요약 내용입니다.'
    }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-gray-600">문서를 분석하고 있습니다...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!currentStep ? (
        /* Step Selection */
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
            학습 단계를 선택하세요
          </h3>
          
          {steps.map(step => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              disabled={step.content.length === 0}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              <div className="text-2xl">{step.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{step.title}</div>
                <div className="text-blue-100 text-sm">{step.description}</div>
                {step.content.length === 0 && (
                  <div className="text-yellow-200 text-xs mt-1">데이터가 없습니다</div>
                )}
              </div>
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                {step.content.length}개 항목
              </div>
            </button>
          ))}

          <div className="flex gap-3 mt-6">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft size={16} />
              처음으로
            </button>
            <button
              onClick={() => saveProgress('전체')}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              전체 저장
            </button>
          </div>
        </div>
      ) : (
        /* Current Step Content */
        <div className="slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-2xl">{currentStepData.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-gray-600">{currentStepData.description}</p>
            </div>
          </div>
          
          {currentStepData.content.length > 0 ? (
            <div className="space-y-3 mb-6">
              {currentStepData.content.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="flex-1 text-gray-800 leading-relaxed">
                    {item.text}
                  </span>
                  <button
                    onClick={() => toggleStar(item.text, item.type)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      starredItems.includes(`${item.type}-${item.text}`)
                        ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                        : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-50'
                    }`}
                    title={starredItems.includes(`${item.type}-${item.text}`) ? "즐겨찾기 제거" : "즐겨찾기 추가"}
                  >
                    <Star 
                      size={18} 
                      fill={starredItems.includes(`${item.type}-${item.text}`) ? 'currentColor' : 'none'} 
                    />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText size={48} className="mx-auto mb-3 text-gray-300" />
              <p>해당 단계의 데이터가 없습니다.</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft size={16} />
              이전으로
            </button>
            
            {currentStep < steps.length && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                다음 단계 ▶️
              </button>
            )}
            
            <button
              onClick={() => saveProgress(`${currentStep}단계`)}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepContent;