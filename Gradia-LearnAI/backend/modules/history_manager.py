# 학습 이력(키워드, 요약) 저장 및 관리 모듈

import json
import os

HISTORY_FILE = 'learning_history.json'

# 학습 이력을 파일에서 불러오는 함수
def load_learning_history() :
    if not os.path.exists(HISTORY_FILE) :
        return [] # 파일이 없으면 빈 리스트 반환

    with open(HISTORY_FILE, 'r', encoding='utf-8') as f :
        return json.load(f) # JSON 파일을 파이썬 리스트로 읽어옴


# 학습 이력을 파일에 저장하는 함수
def save_learning_history(filename, keywords, summary) :
    history = load_learning_history() # 기존 학습 이력 불러오기

    # 이미 해당 파일명으로 저장된 이력이 있는지 확인
    for item in history :
        if item['filename'] == filename :
            # 있으면 기존 데이터 업데이트
            item['keywords'] = keywords
            item['summary'] = summary
            break
    else :
        # 없으면 새 항목으로 추가
        history.append({'filename': filename, 'keywords': keywords, 'summary': summary})

    # 변경된 학습 이력을 다시 JSON 파일에 저장
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f :
        json.dump(history, f, ensure_ascii=False, indent=2)


# 학습 이력을 담은 JSON 파일 자체를 삭제하는 함수
def delete_learning_history() :
    if os.path.exists(HISTORY_FILE) :
        os.remove(HISTORY_FILE) # 파일이 있으면 삭제
