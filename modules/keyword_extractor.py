# 영어 텍스트에서 명사(NOUN, 고유명사 PROPN)를 추출하여 키워드 리스트로 반환하는 모듈

import spacy

# spaCy의 영어 모델 로드
nlp = spacy.load("en_core_web_sm")

# 키워드 추출 함수
def extract_keywords(text):
    doc = nlp(text)  # 입력된 텍스트를 spaCy로 분석
    keywords = set()  # 중복 제거를 위한 set 사용

    # 문서의 각 토큰(단어) 순회
    for token in doc:
        # 명사 또는 고유명사이며, 길이가 3자 초과인 경우만 키워드로 선택
        if token.pos_ in ['NOUN', 'PROPN'] and len(token.text) > 3:
            keywords.add(token.text.lower())  # 소문자로 통일하여 추가

    return list(keywords)  # 최종 키워드를 리스트로 변환하여 반환
