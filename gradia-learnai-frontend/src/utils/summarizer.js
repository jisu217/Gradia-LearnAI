// 텍스트 요약 생성 유틸리티 (추출적 요약 방식)

export const generateSummary = (text, options = {}) => {
  const {
    maxSentences = 3,
    minSentenceLength = 10,
    maxSentenceLength = 200
  } = options;

  if (!text || text.trim().length === 0) {
    return '요약할 내용이 없습니다.';
  }

  try {
    // 문장 분리 및 전처리
    const sentences = extractSentences(text);
    
    if (sentences.length === 0) {
      return '문장을 추출할 수 없습니다.';
    }

    if (sentences.length <= maxSentences) {
      return sentences.join(' ');
    }

    // 문장별 점수 계산
    const sentenceScores = calculateSentenceScores(sentences, text);
    
    // 상위 문장들 선택
    const topSentences = selectTopSentences(sentences, sentenceScores, maxSentences);
    
    // 원본 순서대로 정렬
    const orderedSentences = reorderSentences(sentences, topSentences);
    
    return orderedSentences.join(' ').trim();
    
  } catch (error) {
    console.error('Summary generation error:', error);
    return '요약 생성 중 오류가 발생했습니다.';
  }
};

const extractSentences = (text) => {
  // 문장 분리 정규표현식 (한국어 고려)
  const sentenceRegex = /[.!?]+\s*|[.!?]$/g;
  
  return text
    .split(sentenceRegex)
    .map(sentence => sentence.trim())
    .filter(sentence => 
      sentence.length >= 10 && 
      sentence.length <= 200 &&
      !isHeaderOrFooter(sentence)
    );
};

const isHeaderOrFooter = (sentence) => {
  // 제목, 날짜, 페이지 번호 등을 필터링
  const patterns = [
    /^(제|chapter|\d+\.)/i,  // 제목 패턴
    /^\d+\s*페이지/,         // 페이지 번호
    /^\d{4}[.-]\d{1,2}[.-]\d{1,2}/, // 날짜 패턴
    /^(참고|reference|bibliography)/i, // 참고문헌
  ];
  
  return patterns.some(pattern => pattern.test(sentence));
};

const calculateSentenceScores = (sentences, fullText) => {
  const scores = sentences.map((sentence, index) => {
    let score = 0;
    
    // 1. 문장 위치 점수 (시작과 끝 부분에 가중치)
    const positionScore = calculatePositionScore(index, sentences.length);
    
    // 2. 단어 빈도 점수
    const frequencyScore = calculateFrequencyScore(sentence, fullText);
    
    // 3. 문장 길이 점수 (너무 짧거나 길지 않은 문장 선호)
    const lengthScore = calculateLengthScore(sentence);
    
    // 4. 숫자/데이터 포함 점수
    const dataScore = calculateDataScore(sentence);
    
    // 5. 키워드 포함 점수
    const keywordScore = calculateKeywordScore(sentence, fullText);
    
    score = positionScore * 0.15 + 
            frequencyScore * 0.30 + 
            lengthScore * 0.15 + 
            dataScore * 0.15 + 
            keywordScore * 0.25;
    
    return { index, score, sentence };
  });
  
  return scores;
};

const calculatePositionScore = (index, totalSentences) => {
  // 첫 번째와 마지막 부분에 높은 점수
  if (index < totalSentences * 0.3) {
    return 1.0;
  } else if (index > totalSentences * 0.7) {
    return 0.8;
  } else {
    return 0.5;
  }
};

const calculateFrequencyScore = (sentence, fullText) => {
  const sentenceWords = extractWords(sentence);
  const allWords = extractWords(fullText);
  const wordFreq = {};
  
  // 전체 텍스트의 단어 빈도 계산
  allWords.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  // 문장 내 단어들의 평균 빈도
  let totalScore = 0;
  sentenceWords.forEach(word => {
    totalScore += wordFreq[word] || 0;
  });
  
  return sentenceWords.length > 0 ? totalScore / sentenceWords.length : 0;
};

const calculateLengthScore = (sentence) => {
  const length = sentence.length;
  // 50-150 글자 사이의 문장에 높은 점수
  if (length >= 50 && length <= 150) {
    return 1.0;
  } else if (length >= 30 && length <= 200) {
    return 0.7;
  } else {
    return 0.3;
  }
};

const calculateDataScore = (sentence) => {
  // 숫자, 퍼센트, 데이터가 포함된 문장에 가점
  const dataPatterns = [
    /\d+[%％]/,           // 퍼센트
    /\d+[개명건번회차]/,    // 개수 단위
    /\d{4}년/,            // 년도
    /\$\d+|\d+원|\d+달러/,  // 금액
  ];
  
  const hasData = dataPatterns.some(pattern => pattern.test(sentence));
  return hasData ? 1.0 : 0.5;
};

const calculateKeywordScore = (sentence, fullText) => {
  // 간단한 키워드 추출 및 점수 계산
  const keywords = extractImportantWords(fullText);
  const sentenceWords = extractWords(sentence);
  
  let keywordCount = 0;
  sentenceWords.forEach(word => {
    if (keywords.includes(word)) {
      keywordCount++;
    }
  });
  
  return sentenceWords.length > 0 ? keywordCount / sentenceWords.length : 0;
};

const extractWords = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
};

const extractImportantWords = (text) => {
  const words = extractWords(text);
  const wordFreq = {};
  
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  // 상위 20% 빈도 단어들을 키워드로 선정
  const sortedWords = Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a);
  
  const keywordCount = Math.ceil(sortedWords.length * 0.2);
  return sortedWords.slice(0, keywordCount).map(([word]) => word);
};

const selectTopSentences = (sentences, sentenceScores, maxSentences) => {
  return sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences);
};

const reorderSentences = (originalSentences, selectedSentences) => {
  const indices = selectedSentences
    .map(s => s.index)
    .sort((a, b) => a - b);
  
  return indices.map(index => originalSentences[index]);
};

// 요약 품질 평가
export const evaluateSummary = (summary, originalText) => {
  const summaryLength = summary.length;
  const originalLength = originalText.length;
  const compressionRatio = summaryLength / originalLength;
  
  // 요약 통계
  const stats = {
    compressionRatio,
    summaryLength,
    originalLength,
    sentenceCount: summary.split(/[.!?]+/).length - 1,
    readabilityScore: calculateReadabilityScore(summary)
  };
  
  return stats;
};

const calculateReadabilityScore = (text) => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = extractWords(text);
  
  if (sentences.length === 0 || words.length === 0) return 0;
  
  const avgWordsPerSentence = words.length / sentences.length;
  const avgCharsPerWord = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  
  // 간단한 가독성 점수 (낮을수록 읽기 쉬움)
  return avgWordsPerSentence * avgCharsPerWord / 10;
};