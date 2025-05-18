# 파일 업로드 기반 텍스트 분석 API (키워드 추출 및 요약 기능)

import json
from flask import Blueprint, request, jsonify, Response
from modules.file_handler import extract_text # 파일에서 텍스트 추출 함수
from modules.keyword_extractor import extract_keywords # 텍스트에서 키워드 추출 함수
from modules.summarizer import summarize_text # 텍스트 요약 함수

# 'analyze'라는 이름의 Flask Blueprint 생성
analyze_bp = Blueprint('analyze', __name__)

# '/analyze' 경로로 POST 요청이 들어오면 실행되는 함수
@analyze_bp.route('/analyze', methods=['POST'])
def analyze() :
    # 요청에 파일이 없으면 에러 반환
    if 'file' not in request.files :
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    # 파일이 선택되지 않은 경우 에러 반환
    if file.filename == '' :
        return jsonify({'error': 'No selected file'}), 400

    try:
        text = extract_text(file.stream, file.filename) # 파일에서 텍스트 추출
        keywords = extract_keywords(text) # 텍스트에서 키워드 추출
        summary = summarize_text(text) # 텍스트 요약

        # JSON 형태로 결과 반환 (텍스트, 키워드, 요약)
        return Response(json.dumps({
            'text': text,
            'keywords': keywords,
            'summary': summary
        }, ensure_ascii=False), mimetype='application/json')

    except Exception as e :
        # 처리 중 에러 발생 시 에러 메시지 반환
        return jsonify({'error': f'Failed to extract text: {str(e)}'}), 500
