Gradia-LearnAI Frontend
스마트 학습 도구 - 문서 분석 및 학습 지원 React 애플리케이션
🚀 주요 기능
📁 파일 업로드

지원 형식: TXT, PDF
파일 크기: 최대 10MB
실시간 검증: 파일 타입 및 크기 자동 검증

🔍 텍스트 분석

키워드 추출: 문서의 핵심 키워드 자동 추출
개념 정의: 추출된 키워드에 대한 정의 생성
개념 설명: 키워드의 상세 설명 제공
문서 요약: 전체 문서의 핵심 내용 요약

⭐ 학습 도구

즐겨찾기: 중요한 내용에 별표 표시
학습 진도 저장: 단계별 학습 진행 상황 저장
메모 기능: 개인 학습 메모 작성 및 관리
학습 이력: 과거 학습 기록 조회

💾 데이터 관리

로컬 저장: 브라우저 localStorage 활용
데이터 지속성: 브라우저 재시작 후에도 데이터 유지
크로스 탭 동기화: 여러 탭 간 데이터 동기화

🛠 기술 스택

Frontend: React 18, JavaScript (ES6+)
Styling: Tailwind CSS
Icons: Lucide React
Storage: Browser localStorage
Build Tool: Create React App

📂 프로젝트 구조
src/
├── components/          # React 컴포넌트
│   ├── FileUpload.jsx   # 파일 업로드 컴포넌트
│   ├── LearningHistory.jsx # 학습 이력 컴포넌트
│   ├── StepContent.jsx  # 단계별 내용 컴포넌트
│   └── MemoBox.jsx      # 메모 관리 컴포넌트
├── utils/              # 유틸리티 함수
│   ├── fileProcessor.js # 파일 처리 로직
│   ├── keywordExtractor.js # 키워드 추출 알고리즘
│   └── summarizer.js    # 텍스트 요약 알고리즘
├── hooks/              # 커스텀 훅
│   └── useLocalStorage.js # localStorage 관리 훅
├── App.jsx             # 메인 앱 컴포넌트
├── App.css             # 글로벌 스타일
└── index.js            # 애플리케이션 진입점
🚦 시작하기
설치
bash# 프로젝트 클론
git clone [repository-url]
cd gradia-learnai-frontend

# 의존성 설치
npm install
개발 서버 실행
bashnpm start
브라우저에서 http://localhost:3000으로 접속
빌드
bashnpm run build
📖 사용 방법
1. 파일 업로드

"📁 파일 업로드" 버튼 클릭
TXT 또는 PDF 파일 선택
파일 분석 완료 대기

2. 학습 단계

🔍 키워드 추출: 문서의 핵심 키워드 확인
🧠 개념 정의: 키워드 정의 학습
📝 개념 설명: 키워드 설명 학습
📄 문서 요약: 전체 내용 요약 확인

3. 학습 도구 활용

별표(⭐): 중요한 내용에 즐겨찾기 표시
저장(💾): 현재 학습 진도 저장
메모: 개인 학습 노트 작성

🔧 커스터마이징
키워드 추출 알고리즘 수정
src/utils/keywordExtractor.js에서 키워드 추출 로직을 수정할 수 있습니다.
요약 알고리즘 수정
src/utils/summarizer.js에서 텍스트 요약 알고리즘을 수정할 수 있습니다.
스타일 커스터마이징

src/App.css: 전역 스타일
Tailwind CSS 클래스를 사용한 컴포넌트별 스타일링

🤝 기여하기

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request

📝 라이선스
This project is licensed under the MIT License.
🙏 감사인사

React
Tailwind CSS
Lucide React

🚀 향후 계획

 PDF 텍스트 추출 개선 (PDF.js 통합)
 AI 기반 키워드 추출 (OpenAI API 연동)
 다국어 지원
 클라우드 저장소 연동
 학습 통계 및 분석 기능
 모바일 앱 버전


문의사항이나 버그 신고는 Issues를 통해 연락주세요! 🐛