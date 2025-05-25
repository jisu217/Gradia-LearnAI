import os
import json
from flask import Blueprint, session, jsonify, Response
from modules.file_handler import extract_text
from modules.keyword_extractor import extract_keywords
from modules.summarizer import summarize_text

# 분석 관련 API들을 묶을 Blueprint 생성
analyze_bp = Blueprint('analyze', __name__)

# 세션에 저장된 업로드된 파일 경로를 가져와서 텍스트를 추출하는 함수
def get_uploaded_text():
    # 세션에서 업로드된 파일 경로 가져오기
    file_path = session.get('uploaded_file')
    # 파일 경로가 없거나 실제 파일이 존재하지 않으면 None 반환
    if not file_path or not os.path.exists(file_path):
        return None

    try:
        # 파일을 바이너리 모드로 열어 텍스트 추출 함수 호출
        text = extract_text(open(file_path, 'rb'), file_path)
        return text
    except Exception as e:
        # 예외 발생 시 콘솔에 오류 메시지 출력 후 None 반환
        print(f"텍스트 추출 중 오류 발생: {e}")
        return None

# 1. 키워드 추출 API
@analyze_bp.route('/analyze/keywords', methods=['GET'])
def analyze_keywords():
    # 업로드된 파일에서 텍스트 추출
    text = get_uploaded_text()
    if text is None:
        # 파일이 없으면 400 에러와 메시지 반환
        return jsonify({'error': '업로드된 파일이 없습니다.'}), 400

    # 텍스트에서 키워드 추출 함수 호출
    keywords = extract_keywords(text)
    # 키워드를 JSON 형태로 반환
    return jsonify({'keywords': keywords})

# 2. 개념 1 (예시) API: 키워드 + 정의
@analyze_bp.route('/analyze/concept1', methods=['GET'])
def analyze_concept1():
    text = get_uploaded_text()
    if text is None:
        return jsonify({'error': '업로드된 파일이 없습니다.'}), 400

    keywords = extract_keywords(text)
    # 임의로 키워드별 '정의' 문장 생성
    concepts = [f"{kw}란 무엇인가에 대해 설명합니다." for kw in keywords]
    return jsonify({'concepts': concepts})

# 3. 개념 2 (예시) API: 키워드 + 간단 설명
@analyze_bp.route('/analyze/concept2', methods=['GET'])
def analyze_concept2():
    text = get_uploaded_text()
    if text is None:
        return jsonify({'error': '업로드된 파일이 없습니다.'}), 400

    keywords = extract_keywords(text)
    # 임의로 키워드별 간단 설명 생성
    concepts = [f"{kw}은(는) 중요한 개념입니다." for kw in keywords]
    return jsonify({'concepts': concepts})

# 4. 텍스트 요약 API
@analyze_bp.route('/analyze/summary', methods=['GET'])
def analyze_summary():
    text = get_uploaded_text()
    if text is None:
        return jsonify({'error': '업로드된 파일이 없습니다.'}), 400

    # 텍스트 요약 함수 호출
    summary = summarize_text(text)
    # 요약 결과 JSON으로 반환
    return jsonify({'summary': summary})
