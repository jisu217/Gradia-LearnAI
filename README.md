```
gradia-learnai-frontend
├── node_modules/
├── public/
└── src/
    ├── components/
    │   ├── Memo/
    │   │   ├── MemoBox.jsx
    │   │   ├── MemoInput.jsx
    │   │   ├── MemoItem.jsx
    │   │   └── MemoList.jsx
    │   └── Step/
    │       ├── StepContent.jsx
    │       ├── StepDetail.jsx
    │       ├── StepItem.jsx
    │       └── StepList.jsx
    ├── FileUpload.jsx
    ├── LearningHistory.jsx
    ├── hooks/
    │   ├── useFileHandler.js
    │   ├── useLearningSession.js
    │   └── useLocalStorage.js
    ├── utils/
    │   ├── ai/
    │   │   ├── definer.js
    │   │   ├── explainer.js
    │   │   ├── extractor.js
    │   │   └── summarizer.js
    │   ├── file/
    │   │   ├── fileProcessor.js
    │   │   ├── fileReader.js
    │   │   └── fileValidator.js
    │   └── storage/
    │       ├── localStorage.js
    │   └─── fileProcessor.js
    │   └─── keywordExtractor.js
    │   └─── summarizer.js
    ├── App.js
    └── 
```
```
gradia-learnai-backend/
├── src/main/java/com/gradia/learnai/
│   ├── GradiaLearnaiApplication.java
│   │
│   ├── config/
│   │   ├── CorsConfig.java
│   │   └── WebConfig.java
│   │
│   ├── controller/
│   │   ├── FileController.java
│   │   ├── LearningSessionController.java
│   │   ├── MemoController.java
│   │   └── AiController.java
│   │
│   ├── service/
│   │   ├── FileService.java
│   │   ├── LearningSessionService.java
│   │   ├── MemoService.java
│   │   └── AiService.java
│   │
│   ├── repository/
│   │   ├── LearningSessionRepository.java
│   │   └── MemoRepository.java
│   │
│   ├── entity/
│   │   ├── LearningSession.java
│   │   └── Memo.java
│   │
│   └── dto/
│       ├── AiRequestDto.java
│       ├── AiResponseDto.java
│       ├── MemoRequestDto.java
│       ├── MemoResponseDto.java
│       ├── SessionRequestDto.java
│       └── SessionResponseDto.java
│
├── src/main/resources/
│   └── application.yml
│
└── build.gradle
```
