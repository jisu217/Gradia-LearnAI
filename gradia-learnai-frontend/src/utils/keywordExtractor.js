// 영어와 한국어 텍스트에서 키워드를 추출하는 유틸리티

// 불용어 리스트 (한국어)
const KOREAN_STOPWORDS = new Set([
  '그', '그것', '그녀', '그들', '이', '이것', '저', '저것', '우리', '당신',
  '그러나', '그런데', '하지만', '그리고', '또한', '또', '및', '와', '과',
  '은', '는', '이', '가', '을', '를', '에', '에서', '로', '으로', '의',
  '도', '만', '부터', '까지', '처럼', '같이', '보다', '더', '가장',
  '있다', '없다', '이다', '아니다', '하다', '되다', '같다', '다르다'
]);

// 불용어 리스트 (영어)
const ENGLISH_STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'between', 'among', 'is', 'are',
  'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
  'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can',
  'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
]);

export const extractKeywords = (text) => {
  if (!text || text.trim().length === 0) {
    return [];
  }

  try {
    // 텍스트 전처리
    const cleanedText = preprocessText(text);
    
    // 단어 빈도 계산
    const wordFreq = calculateWordFrequency(cleanedText);
    
    // 키워드 추출 및 정렬
    const keywords = selectKeywords(wordFreq);
    
    return keywords;
  } catch (error) {
    console.error('Keyword extraction error:', error);
    return [];
  }
};

const preprocessText = (text) => {
  // 소문자 변환 및 특수문자 제거
  return text
    .toLowerCase()
    .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ' ') // 영어, 숫자, 한글만 유지
    .replace(/\s+/g, ' ') // 연속된 공백을 하나로
    .trim();
};

const calculateWordFrequency = (text) => {
  const words = text.split(/\s+/);
  const wordFreq = {};
  
  words.forEach(word => {
    // 단어 길이 필터링 (너무 짧거나 긴 단어 제외)
    if (word.length < 2 || word.length > 20) return;
    
    // 불용어 필터링
    if (isStopword(word)) return;
    
    // 숫자만 있는 단어 제외
    if (/^\d+$/.test(word)) return;
    
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  return wordFreq;
};

const isStopword = (word) => {
  // 한국어 불용어 검사
  if (KOREAN_STOPWORDS.has(word)) return true;
  
  // 영어 불용어 검사
  if (ENGLISH_STOPWORDS.has(word)) return true;
  
  return false;
};

const selectKeywords = (wordFreq) => {
  // 빈도순으로 정렬
  const sortedWords = Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .map(([word]) => word);
  
  // 상위 15개 키워드 선택 (중복 제거)
  const keywords = [...new Set(sortedWords)].slice(0, 15);
  
  return keywords;
};

// 키워드의 중요도 점수 계산 (TF-IDF 간소화 버전)
export const calculateKeywordScore = (keyword, text, allTexts = [text]) => {
  const words = text.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  // Term Frequency (TF)
  const tf = words.filter(word => word === keyword.toLowerCase()).length / totalWords;
  
  // Inverse Document Frequency (IDF) - 간소화
  const documentsWithTerm = allTexts.filter(doc => 
    doc.toLowerCase().includes(keyword.toLowerCase())
  ).length;
  const idf = Math.log(allTexts.length / (documentsWithTerm || 1));
  
  return tf * idf;
};

// 키워드 클러스터링 (유사한 키워드들을 그룹화)
export const clusterKeywords = (keywords) => {
  const clusters = {};
  
  keywords.forEach(keyword => {
    let clustered = false;
    
    // 기존 클러스터에서 유사한 키워드 찾기
    Object.keys(clusters).forEach(clusterKey => {
      if (calculateSimilarity(keyword, clusterKey) > 0.7) {
        clusters[clusterKey].push(keyword);
        clustered = true;
      }
    });
    
    // 새로운 클러스터 생성
    if (!clustered) {
      clusters[keyword] = [keyword];
    }
  });
  
  return clusters;
};

// 단어 간 유사도 계산 (간단한 문자열 유사도)
const calculateSimilarity = (word1, word2) => {
  const longer = word1.length > word2.length ? word1 : word2;
  const shorter = word1.length > word2.length ? word2 : word1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

// 레벤슈타인 거리 계산
const levenshteinDistance = (str1, str2) => {
  const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
};