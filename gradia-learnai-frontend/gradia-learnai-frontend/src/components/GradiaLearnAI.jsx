import React, { useState } from 'react';
import { Upload, FileText, Image, Type, Layers, Zap, ChevronRight, Book, Sparkles, X, Check, History, StickyNote, AlertCircle, Download, ArrowLeft, ChevronDown, ChevronUp, Lightbulb, Award, Target } from 'lucide-react';

export default function GradiaLearnAI() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [learningMode, setLearningMode] = useState('keyword');
  const [difficulty, setDifficulty] = useState('normal'); // easy, normal, advanced
  const [generatedContent, setGeneratedContent] = useState(null);
  const [activeTab, setActiveTab] = useState('content'); // content, quiz, memo, history
  const [highlights, setHighlights] = useState([]);
  const [memos, setMemos] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [expandedCode, setExpandedCode] = useState(false);
  const [learningHistory, setLearningHistory] = useState([
    { date: '2025-01-05', topic: 'Python 변수', mode: '종합 모드', score: 85 },
    { date: '2025-01-04', topic: 'JavaScript 기초', mode: '문장 모드', score: 92 },
    { date: '2025-01-03', topic: 'HTML 구조', mode: '설명 모드', score: 78 }
  ]);

  const learningModes = [
    { id: 'keyword', name: '키워드 모드', icon: Zap, description: '핵심 용어만 추출', color: 'blue' },
    { id: 'explanation', name: '설명 모드', icon: Book, description: '키워드 + 간단한 설명', color: 'green' },
    { id: 'sentence', name: '문장 모드', icon: Type, description: '완전한 문장으로 학습', color: 'purple' },
    { id: 'full', name: '종합 모드', icon: Layers, description: '전체 내용 + 예제', color: 'orange' }
  ];

  const quizData = [
    { id: 1, question: '변수란 무엇인가요?', options: ['데이터 저장 공간', '함수', '조건문', '반복문'], correct: 0 },
    { id: 2, question: '함수의 주요 목적은?', options: ['데이터 저장', '코드 재사용', '화면 출력', '입력 받기'], correct: 1 },
    { id: 3, question: 'if문의 역할은?', options: ['반복', '조건 분기', '함수 정의', '변수 선언'], correct: 1 }
  ];

  const confusionPoints = [
    { keyword: '변수', warning: '변수명은 숫자로 시작할 수 없어요' },
    { keyword: '함수', warning: '함수는 정의 후 호출해야 실행됩니다' }
  ];

  const handleFileUpload = (file) => {
    const newFile = {
      id: Date.now(),
      name: file || '강의자료.pdf',
      type: file ? 'file' : 'pdf',
      uploadDate: new Date().toLocaleDateString(),
      processed: false
    };
    setUploadedFiles([newFile, ...uploadedFiles]);
    setShowUploadModal(false);
  };

  const processFile = (file) => {
    setSelectedFile(file);
    setTimeout(() => {
      setGeneratedContent({
        keyword: ['변수', '함수', '조건문', '반복문', '배열'],
        explanation: [
          { term: '변수', desc: '데이터를 저장하는 공간' },
          { term: '함수', desc: '특정 작업을 수행하는 코드 묶음' },
          { term: '조건문', desc: '조건에 따라 다른 코드 실행' }
        ],
        sentence: [
          '변수는 프로그래밍에서 데이터를 저장하고 참조하기 위해 사용됩니다.',
          '함수를 사용하면 코드의 재사용성을 높이고 유지보수를 쉽게 할 수 있습니다.',
          '조건문은 if, else를 사용하여 프로그램의 흐름을 제어합니다.'
        ],
        full: {
          summary: '이 강의는 프로그래밍의 기초 개념을 다룹니다.',
          sections: ['변수와 자료형', '함수 정의', '제어문'],
          examples: [
            { step: 1, title: '변수 선언', code: 'let x = 10;' },
            { step: 2, title: '조건문', code: 'if (x > 5) {\n  console.log("크다");\n}' },
            { step: 3, title: '함수 정의', code: 'function add(a, b) {\n  return a + b;\n}' }
          ]
        }
      });
      setUploadedFiles(uploadedFiles.map(f => 
        f.id === file.id ? { ...f, processed: true } : f
      ));
    }, 1500);
  };

  const addMemo = (text) => {
    setMemos([...memos, { id: Date.now(), text, timestamp: new Date().toLocaleTimeString() }]);
  };

  const toggleHighlight = (item) => {
    if (highlights.includes(item)) {
      setHighlights(highlights.filter(h => h !== item));
    } else {
      setHighlights([...highlights, item]);
    }
  };

  const checkQuiz = () => {
    const score = quizData.reduce((acc, q) => {
      return acc + (quizAnswers[q.id] === q.correct ? 1 : 0);
    }, 0);
    alert(`점수: ${score}/${quizData.length} (${Math.round(score/quizData.length*100)}%)`);
    setLearningHistory([{
      date: new Date().toLocaleDateString(),
      topic: selectedFile?.name || '학습자료',
      mode: learningModes.find(m => m.id === learningMode)?.name,
      score: Math.round(score/quizData.length*100)
    }, ...learningHistory]);
  };

  const goToPreviousMode = () => {
    const modes = ['keyword', 'explanation', 'sentence', 'full'];
    const currentIndex = modes.indexOf(learningMode);
    if (currentIndex > 0) {
      setLearningMode(modes[currentIndex - 1]);
    }
  };

  const downloadSummary = () => {
    alert('학습 요약 카드를 다운로드합니다! (PDF/이미지)');
  };

  const renderContent = () => {
    if (!generatedContent) return null;

    const difficultyMultiplier = difficulty === 'easy' ? 0.6 : difficulty === 'advanced' ? 1.5 : 1;

    switch(learningMode) {
      case 'keyword':
        return (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">추출된 키워드</h3>
            <div className="flex flex-wrap gap-2">
              {generatedContent.keyword.slice(0, Math.ceil(generatedContent.keyword.length * difficultyMultiplier)).map((keyword, idx) => (
                <span 
                  key={idx}
                  onClick={() => toggleHighlight(keyword)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                    highlights.includes(keyword)
                      ? 'bg-yellow-200 text-yellow-900'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-orange-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-orange-900">혼동 포인트</p>
                  {confusionPoints.map((point, idx) => (
                    <p key={idx} className="text-xs text-orange-700 mt-1">
                      <strong>{point.keyword}:</strong> {point.warning}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'explanation':
        return (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">키워드 설명</h3>
            <div className="space-y-2">
              {generatedContent.explanation.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleHighlight(item.term)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    highlights.includes(item.term)
                      ? 'bg-yellow-100 border-2 border-yellow-400'
                      : 'bg-green-50 border-2 border-transparent hover:border-green-200'
                  }`}
                >
                  <p className="text-sm font-semibold text-green-900">{item.term}</p>
                  <p className="text-sm text-green-700 mt-1">{item.desc}</p>
                  <button 
                    className="text-xs text-green-600 hover:text-green-800 mt-2 flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`${item.term}에 대한 추가 설명을 요청합니다...`);
                    }}
                  >
                    <Lightbulb size={12} />
                    다시 설명 요청
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'sentence':
        return (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">학습 문장</h3>
            <div className="space-y-2">
              {generatedContent.sentence.map((sentence, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleHighlight(sentence)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    highlights.includes(sentence)
                      ? 'bg-yellow-100 border-2 border-yellow-400'
                      : 'bg-purple-50 border-2 border-transparent hover:border-purple-200'
                  }`}
                >
                  <p className="text-sm text-purple-900">{sentence}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'full':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">요약</h3>
              <p className="text-sm text-gray-700 p-3 bg-orange-50 rounded-lg">
                {generatedContent.full.summary}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">주요 섹션</h3>
              <div className="space-y-1">
                {generatedContent.full.sections.map((section, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-orange-600" />
                    {section}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">예제 코드 (단계별)</h3>
                <button
                  onClick={() => setExpandedCode(!expandedCode)}
                  className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  {expandedCode ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {expandedCode ? '접기' : '모두 보기'}
                </button>
              </div>
              <div className="space-y-2">
                {generatedContent.full.examples.slice(0, expandedCode ? undefined : 1).map((example, idx) => (
                  <div key={idx}>
                    <p className="text-xs text-gray-600 mb-1">Step {example.step}: {example.title}</p>
                    <pre className="p-3 bg-gray-900 text-gray-100 rounded-lg text-xs overflow-x-auto">
                      {example.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-gray-700" size={24} />
              <h1 className="text-xl font-bold text-gray-900">Gradia-LearnAI</h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={downloadSummary}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors"
              >
                <Download size={16} />
                요약 다운로드
              </button>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Upload size={18} />
                자료 업로드
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 왼쪽: 업로드된 파일 목록 */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900">내 학습 자료</h2>
              </div>
              <div className="p-4">
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-8">
                    <Upload className="mx-auto text-gray-300 mb-2" size={32} />
                    <p className="text-xs text-gray-500">자료를 업로드하세요</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {uploadedFiles.map(file => (
                      <div
                        key={file.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedFile?.id === file.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => !file.processed && processFile(file)}
                      >
                        <div className="flex items-start gap-2">
                          <FileText size={18} className="text-gray-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.uploadDate}</p>
                            {file.processed && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                                처리완료
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 난이도 선택 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target size={16} />
                난이도 조절
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'easy', label: '쉬움', desc: '기초 개념만' },
                  { id: 'normal', label: '보통', desc: '표준 학습' },
                  { id: 'advanced', label: '심화', desc: '고급 내용' }
                ].map(level => (
                  <button
                    key={level.id}
                    onClick={() => setDifficulty(level.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      difficulty === level.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-medium">{level.label}</p>
                    <p className="text-xs opacity-80">{level.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 중앙: 학습 콘텐츠 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 학습 모드 선택 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900">학습 난이도 선택</h2>
                {learningMode !== 'keyword' && (
                  <button
                    onClick={goToPreviousMode}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft size={14} />
                    이전 단계
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {learningModes.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setLearningMode(mode.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      learningMode === mode.id
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <mode.icon size={18} className="mb-2 text-gray-600" />
                    <p className="text-xs font-semibold text-gray-900">{mode.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'content', label: '학습 내용', icon: Book },
                  { id: 'quiz', label: '미니 퀴즈', icon: Award },
                  { id: 'memo', label: '메모장', icon: StickyNote },
                  { id: 'history', label: '학습 이력', icon: History }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-gray-900 border-b-2 border-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === 'content' && (
                  selectedFile && generatedContent ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-sm font-semibold text-gray-900">생성된 학습 자료</h2>
                          <p className="text-xs text-gray-500 mt-1">{selectedFile.name}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          learningMode === 'keyword' ? 'bg-blue-100 text-blue-700' :
                          learningMode === 'explanation' ? 'bg-green-100 text-green-700' :
                          learningMode === 'sentence' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {learningModes.find(m => m.id === learningMode)?.name}
                        </span>
                      </div>
                      {renderContent()}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles className="mx-auto text-gray-300 mb-3" size={40} />
                      <p className="text-sm text-gray-500">왼쪽에서 자료를 선택하세요</p>
                      <p className="text-xs text-gray-400 mt-1">AI가 자동으로 학습 콘텐츠를 생성합니다</p>
                    </div>
                  )
                )}

                {activeTab === 'quiz' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900">이해도 체크 퀴즈</h3>
                    {quizData.map((q, idx) => (
                      <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 mb-3">
                          {idx + 1}. {q.question}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((option, optIdx) => (
                            <label key={optIdx} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`quiz-${q.id}`}
                                onChange={() => setQuizAnswers({...quizAnswers, [q.id]: optIdx})}
                                className="text-gray-900"
                              />
                              <span className="text-sm text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={checkQuiz}
                      className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      채점하기
                    </button>
                  </div>
                )}

                {activeTab === 'memo' && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="메모를 입력하세요..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value) {
                            addMemo(e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      {memos.map(memo => (
                        <div key={memo.id} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                          <p className="text-sm text-gray-900">{memo.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{memo.timestamp}</p>
                        </div>
                      ))}
                      {memos.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-8">아직 메모가 없습니다</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900">학습 기록</h3>
                    <div className="space-y-2">
                      {learningHistory.map((record, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900">{record.topic}</p>
                            <span className="text-xs text-gray-600">{record.date}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{record.mode}</span>
                            <span className={`text-xs font-semibold ${
                              record.score >= 80 ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              {record.score}점
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 오른쪽: 보조 기능 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 하이라이트 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">하이라이트</h3>
              {highlights.length > 0 ? (
                <div className="space-y-2">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="px-3 py-2 bg-yellow-100 rounded-lg text-sm text-gray-900">
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">클릭해서 중요한 부분을 표시하세요</p>
              )}
            </div>

            {/* AI 추천 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 text-white">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                다음 추천 주제
              </h3>
              <div className="space-y-2 text-xs">
                <p>• 배열과 객체 다루기</p>
                <p>• 고급 함수 활용법</p>
                <p>• 비동기 프로그래밍</p>
              </div>
            </div>

            {/* 학습 가이드 */}
            {generatedContent && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <ChevronRight size={16} />
                  추천 학습 순서
                </h3>
                <div className="space-y-2 text-xs">
                  {learningModes.map((mode, idx) => (
                    <div key={mode.id} className="flex items-center gap-2 text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span>{mode.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 업로드 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">자료 업로드</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleFileUpload('강의노트.pdf')}
                className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <FileText size={24} className="text-gray-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">PDF / 문서 업로드</p>
                  <p className="text-xs text-gray-500">강의안, 교재, 노트 등</p>
                </div>
              </button>

              <button
                onClick={() => handleFileUpload('강의사진.jpg')}
                className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Image size={24} className="text-gray-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">이미지 업로드</p>
                  <p className="text-xs text-gray-500">칠판 사진, 필기 등</p>
                </div>
              </button>

              <button
                onClick={() => handleFileUpload('직접입력.txt')}
                className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Type size={24} className="text-gray-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">직접 입력</p>
                  <p className="text-xs text-gray-500">텍스트 직접 작성</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}