# spaCy를 활용한 명사 기반 키워드 추출 함수 구현

import spacy
import json

# 영어 spaCy 모델 불러오기
nlp = spacy.load("en_core_web_sm")

# 텍스트에서 명사와 고유명사를 키워드로 추출하는 함수
def extract_keywords(text) :
    doc = nlp(text)
    keywords = set()

    # 길이가 4자 이상인 명사/고유명사만 추출 (중복 제거용 set 사용)
    for token in doc :
        if token.pos_ in ['NOUN', 'PROPN'] and len(token.text) > 3 :
            keywords.add(token.text.lower())

    print(json.dumps(list(keywords), ensure_ascii=False, indent=2))

    return list(keywords)
