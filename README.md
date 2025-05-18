# 📑🤖 Gradia-LearnAI
Gradia-LearnAI (Gradual + Idea + AI + Learn: 점진적 학습을 돕는 AI 프로젝트)

1. 주제
AI를 활용하여 문서를 분석하고 키워드를 추출한 후, 점진적으로 학습할 수 있도록 도와주는 학습 보조 프로그램 개발

2. 기획 동기 및 배경
현대 사회에서는 방대한 양의 문서를 읽고 학습해야 하는 상황이 많음. -> 긴 문서는 학습자의 집중력을 떨어뜨리며 중요한 내용을 효율적으로 정리하는 데 어려움.
기존 요약 AI는 한 번에 모든 내용을 압축해 제공하지만, 학습자가 점진적으로 내용을 이해하고 암기할 수 있도록 돕지는 않음.
이 프로젝트는 AI를 활용하여 핵심 키워드를 중심으로 단계적으로 내용을 학습할 수 있도록 하며, 학습자가 새로운 개념을 점진적으로 익히는 과정에서 효율적인 학습을 가능하게 함.

3. 차별성
점진적 학습 시스템 – 한 번에 모든 내용을 요약하는 것이 아닌 핵심 키워드부터 시작해 점진적으로 세부 내용을 확장하며 학습 가능
개인 맞춤형 학습 – 학습자의 진행도를 저장하고, (부족한 부분을 보완할 수 있도록 유동적으로 학습 경로를 조정)
(반복 학습 및 테스트 기능 – 키워드와 연관된 내용을 점검하고 학습자가 기억하고 있는지 확인하는 기능 추가)

4. 다이어그램
1. User (사용자)
문서 파일 업로드 (예: PDF, TXT 등)
분석 결과 확인 (키워드, 요약)
AI가 문서를 이해하지 못했을 경우 재학습 요청 또는 이전 단계로 돌아가기
학습 이력 저장 or 삭제
2. App (Gradia-LearnAI)
파일 검증 (형식 & 용량 체크)
허용되지 않은 파일 형식 → 오류 메시지 반환
용량 초과 → 오류 메시지 반환
파일 처리
텍스트 추출
spaCy를 사용해 키워드 분석
Hugging Face transformers로 문서 요약
결과 반환 & 학습 관리
AI가 문서를 이해하지 못했을 경우 → 재학습 요청 or 이전 단계로 복귀
학습 이력 저장 or 삭제
3. DB (데이터베이스)
업로드된 파일 정보 저장 (파일명, 업로드 시간 등)
추출된 키워드 및 요약본 저장
사용자의 학습 진행 상태 저장
사용자가 요청 시 학습 이력 삭제
   
6. 사용 언어
Python (주요 라이브러리: transformers, spaCy, NLTK, PyTorch/TensorFlow)

10. 기대 효과
긴 문서를 효과적으로 학습할 수 있는 AI 기반 시스템 제공
단계별 학습을 통해 기억 유지 및 이해도 향상
개인 맞춤형 학습으로 효율성 극대화

Gradia-LearnAI/
│── main.py          # 실행 파일
│── requirements.txt # 필요한 라이브러리 목록
│── modules/
│    ├── file_handler.py  # 파일 유효성 검사
│    ├── text_extractor.py # 문서에서 텍스트 추출
│    ├── keyword_extractor.py # 텍스트 주요 키워드 추출
│    ├── summarizer.py # AI 활용 텍스트 요약
│    ├── db_handler.py # # 애플리케이션에서 학습 이력과 관련된 데이터베이스 기능 처리
│── data/
│    ├── sample.pdf  # 테스트용 파일
│── README.md  # 프로젝트 설명

[사용자] ← 파일 업로드 (PDF / DOCX)
   │
   ▼
[Flask API: analyze.py]  ← 분석 요청 (/analyze)
   │
   ├── ① [파일 텍스트 추출]
   │       └── modules/file_handler.py
   │       └── extract_text(file, filename)
   │       └── ➡ PDF → 텍스트
   │           ➡ DOCX → 텍스트
   │
   ├── ② [키워드 추출]
   │       └── modules/keyword_extractor.py
   │       └── extract_keywords(text)
   │       └── ➡ spaCy로 명사 / 고유명사 추출
   │
   ├── ③ [텍스트 요약]
   │       └── modules/summarizer.py
   │       └── summarize_text(text)
   │       └── ➡ Transformers로 요약 생성
   │
   ▼
[결과 반환]
   └── text (전체 내용)
   └── keywords (핵심 키워드 목록)
   └── summary (요약된 내용)

