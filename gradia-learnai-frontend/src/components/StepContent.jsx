// 단계별 학습 UI 컴포넌트
import React from 'react';
import { ChevronLeft, Save, Star, Search, Brain, FileText, BookOpen } from 'lucide-react';

// StepContent 컴포넌트 정의
const StepContent = ({ 
  currentStep,      // 현재 선택된 학습 단계 (1~4)
  setCurrentStep,   // 단계 변경 함수
  analysisData,     // 분석된 문서 데이터 (키워드, 개념, 요약 등)
  starredItems,     // 즐겨찾기된 항목 리스트
  toggleStar,       // 즐겨찾기 추가/제거 함수
  saveProgress,     // 진행 상황 저장 함수
  onBack,           // 이전 화면(예: 파일 선택)으로 돌아가는 함수
  loading           // 로딩 상태 여부
}) => {

  // 각 학습 단계를 정의한 배열
  const steps = [
    {
      id: 1,
      title: '키워드 추출',
      icon: <Search size={20} />, // 돋보기 아이콘
      content: analysisData.keywords.map(kw => ({ text: kw, type: 'keyword' })), // 키워드 목록
      description: '문서에서 추출된 핵심 키워드들입니다.'
    },
    {
      id: 2,
      title: '개념 정의',
      icon: <Brain size={20} />, // 뇌 아이콘
      content: analysisData.concepts1.map(c => ({ 
        text: `${c.keyword}: ${c.definition}`,  // "키워드: 정의" 형식으로 표시
        type: 'concept1' 
      })),
      description: '키워드들의 정의와 설명입니다.'
    },
    {
      id: 3,
      title: '개념 설명',
      icon: <BookOpen size={20} />, // 책 아이콘
      content: analysisData.concepts2.map(c => ({ 
        text: `${c.keyword}: ${c.explanation}`, // "키워드: 설명" 형식
        type: 'concept2' 
      })),
      description: '키워드들에 대한 상세 설명입니다.'
    },
    {
      id: 4,
      title: '문서 요약',
      icon: <FileText size={20} />, // 문서 아이콘
      content: analysisData.summary ? [{ text: analysisData.summary, type: 'summary' }] : [], // 요약 내용
      description: '전체 문서의 요약 내용입니다.'
    }
  ];

  // 현재 단계의 데이터 찾기
  const currentStepData = steps.find(step => step.id === currentStep);

  // 로딩 중일 때 보여줄 화면
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
        /* --- [1] 단계 선택 화면 --- */
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
            학습 단계를 선택하세요.
          </h3>
          
          {/* 각 단계 버튼 출력 */}
          {steps.map(step => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}              // 클릭 시 해당 단계로 이동
              disabled={step.content.length === 0}                // 데이터 없으면 비활성화
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {/* 단계 아이콘 */}
              <div className="text-2xl">{step.icon}</div>

              {/* 단계 제목 및 설명 */}
              <div className="flex-1">
                <div className="font-semibold text-lg">{step.title}</div>
                <div className="text-blue-100 text-sm">{step.description}</div>
                {step.content.length === 0 && (
                  <div className="text-yellow-200 text-xs mt-1">데이터가 없습니다.</div>
                )}
              </div>

              {/* 항목 개수 표시 */}
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                {step.content.length}개 항목
              </div>
            </button>
          ))}

          {/* 하단 버튼: 처음으로 / 전체 저장 */}
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
              저장하기
            </button>
          </div>
        </div>
      ) : (
        /* --- [2] 현재 단계 화면 --- */
        <div className="slide-up">
          {/* 단계 제목 영역 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="text-2xl">{currentStepData.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-gray-600">{currentStepData.description}</p>
            </div>
          </div>
          
          {/* 단계별 내용 */}
          {currentStepData.content.length > 0 ? (
            <div className="space-y-3 mb-6">
              {currentStepData.content.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* 본문 텍스트 */}
                  <span className="flex-1 text-gray-800 leading-relaxed">
                    {item.text}
                  </span>

                  {/* 즐겨찾기 버튼 */}
                  <button
                    onClick={() => toggleStar(item.text, item.type)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      starredItems.includes(`${item.type}-${item.text}`)
                        ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                        : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-50'
                    }`}
                    title={starredItems.includes(`${item.type}-${item.text}`) ? "즐겨찾기 제거" : "즐겨찾기 추가"}
                  >
                    {/* 별 아이콘 (채워짐 여부로 표시) */}
                    <Star 
                      size={18} 
                      fill={starredItems.includes(`${item.type}-${item.text}`) ? 'currentColor' : 'none'} 
                    />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            // 데이터 없을 때 표시
            <div className="text-center py-8 text-gray-500">
              <FileText size={48} className="mx-auto mb-3 text-gray-300" />
              <p>해당 단계의 데이터가 없습니다.</p>
            </div>
          )}

          {/* 하단 버튼: 이전 / 다음 / 저장 */}
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft size={16} />
              이전으로
            </button>
            
            {/* 다음 단계로 이동 (마지막 단계는 숨김) */}
            {currentStep < steps.length && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                다음 단계 ▶️
              </button>
            )}
            
            {/* 현재 단계 저장 */}
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

// 컴포넌트 내보내기
export default StepContent;
