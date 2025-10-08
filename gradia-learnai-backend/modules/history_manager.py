# 학습 이력(키워드, 요약) 저장 및 관리 모듈

import json
import os

HISTORY_FILE = 'learning_history.json'  # 학습 이력을 저장할 JSON 파일 이름

# 학습 이력을 파일에서 불러오는 함수
def load_learning_history():
    if not os.path.exists(HISTORY_FILE):
        return []  # 파일이 없으면 빈 리스트 반환

    with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)  # JSON 파일을 파이썬 리스트로 읽어옴

# 학습 이력을 파일에 저장하는 함수
def save_learning_history(filename, keywords, summary):
    history = load_learning_history()  # 기존 학습 이력 불러오기

    # 같은 파일명이 이미 존재하면 업데이트
    for item in history:
        if item['filename'] == filename:
            item['keywords'] = keywords
            item['summary'] = summary
            break
    else:
        # 없으면 새 항목 추가
        history.append({'filename': filename, 'keywords': keywords, 'summary': summary})

    # 변경된 내용을 JSON 파일로 저장
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, ensure_ascii=False, indent=2)

# 학습 이력 파일 자체를 삭제하는 함수
def delete_learning_history():
    if os.path.exists(HISTORY_FILE):
        os.remove(HISTORY_FILE)  # 파일이 존재하면 삭제

