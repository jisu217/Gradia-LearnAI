// 파일 업로드 후, 키워드 추출 - 개념 정의 - 개념 설명 - 문서 요약

import { extractTextFromFile } from './fileReader';
import { validateFile } from './fileValidator';

import { extractKeywords } from '../ai/extractor';
import { generateSummary } from '../ai/summarizer';
import { createDefinition } from '../ai/definer';
import { createExplanation } from '../ai/explainer';

export const processFile = async (file) => {
  try {
    // 파일 검증
    const validation = validateFile(file);

    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    // 파일 → 텍스트
    const text = await extractTextFromFile(file);

    // 1. 키워드 추출
    const keywords = extractKeywords(text);

    const concepts = keywords.map(keyword => ({
      keyword,
      definition: createDefinition(keyword), // 2. 개념 정의
      explanation: createExplanation(keyword) // 3. 개념 설명
    }));

    // 4. 문서 요약
    const summary = generateSummary(text);

    // 최종 반환
    return {
      text,
      keywords,
      concepts,
      summary
    };

  } catch (error) {
    console.error('File processing error:', error);
    throw new Error(error.message || '파일 처리 중 오류가 발생했습니다.');
  }
};