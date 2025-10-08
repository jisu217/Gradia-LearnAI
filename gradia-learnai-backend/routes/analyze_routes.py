import os
import json
from flask import Blueprint, session, jsonify
from modules.file_handler import extract_text
from modules.keyword_extractor import extract_keywords
from modules.summarizer import summarize_text

# 분석 관련 API들을 묶는 Blueprint 생성
analyze_bp = Blueprint('analyze', __name__)

# 세션에 저장된 업로드된 파일 경로를 사용해 텍스트 추출
def get_uploaded_text():
    file_path = session.get('uploaded_file')
    if not file_path or not os.path.exists(file_path):
        return None

    try:
        with open(file_path, 'rb') as f:
            return extract_text(f, file_path)
    except Exception as e:
        print(f"[오류] 텍스트 추출 중 문제 발생: {e}")
        return None

# 1. 키워드 추출 API
@analyze_bp.route('/analyze/keywords', methods=['GET'])
def analyze_keywords():
    text = get_uploaded_text()
    if text is None:
        return jsonify({'error': '업로드된 파일이 없습니다.'}), 400

    keywords = extract_keywords(text)
    return jsonify({'keywords': keywords})

# 2. 개념 1 API: 키워드 + 정의 (예시 템플릿)
@analyze_bp.route('/analyze/concept1', methods=['GET'])
def analyze_concept1():
    text = get_uploaded_text()
    if text is None:
        return jsonify({'error': '업로드된 파일이 없습니다.'}), 400

    keywords = extract_keywords(text)
    concepts = [
        {
            'keyword': kw,
            'definition': f"{kw}는 해당 문서에서 핵심적인 개념으로 사용됩니다. 이에 대한 정의를 학습합니다."
        }
        for kw in keywords
    ]
    return jsonify({'concepts': concepts})

# 3. 개념 2 API: 키워드 + 간단 설명 (예시 템플릿)
@analyze_bp.route('/analyze/concept2', methods=['GET'])
def analyze_concept2():
    text = get_uploaded_text()
    if text is None:
        return jsonify({'error': '업로드된 파일이 없습니다.'}), 400

    keywords = extract_keywords(text)
    concepts = [
        {
            'keyword': kw,
            'explanation': f"{kw}는(은) 문서의 주요 주제를 형성하는 중요한 요소입니다."
        }
        for kw in keywords
    ]
    return jsonify({'concepts': concepts})

# 4. 텍스트 요약 API
@analyze_bp.route('/analyze/summary', methods=['GET'])
def analyze_summary():
    text = get_uploaded_text()
    if text is None:
        return jsonify({'error': '업로드된 파일이 없습니다.'}), 400

    summary = summarize_text(text)
    return jsonify({'summary': summary})

