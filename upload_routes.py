from flask import Blueprint, request, jsonify, session
import os
from werkzeug.utils import secure_filename

# Blueprint 생성: 업로드 관련 라우트를 모듈화해서 관리
upload_routes = Blueprint('upload_routes', __name__)

# 업로드 파일 저장 폴더 경로
UPLOAD_FOLDER = 'uploads'

# 허용할 파일 확장자 집합 (txt, pdf만 허용)
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

# 파일 확장자가 허용된 형식인지 확인하는 함수
def allowed_file(filename):
    # '.'이 파일명에 포함되어 있고, 마지막 '.' 이후 확장자가 허용 리스트에 있으면 True 반환
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# '/upload' 경로, POST 메서드로 파일 업로드 처리
@upload_routes.route('/upload', methods=['POST'])
def upload_file():
    # 클라이언트가 보낸 요청에 'file' 키가 없으면 오류 반환
    if 'file' not in request.files:
        return jsonify({'error': '파일이 없습니다.'}), 400

    file = request.files['file']

    # 파일명이 빈 문자열이면 오류 반환
    if file.filename == '':
        return jsonify({'error': '파일명이 없습니다.'}), 400

    # 파일이 있고, 허용된 확장자일 경우 처리
    if file and allowed_file(file.filename):
        # 보안 상 문제없는 파일명으로 변경 (예: ../../ 문제 방지)
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)  # 저장할 전체 경로 생성

        # 지정된 경로에 파일 저장
        file.save(file_path)

        # Flask 세션에 업로드된 파일 경로 저장 (사용자별 세션 유지용)
        session['uploaded_file'] = file_path

        # 성공 메시지와 함께 저장된 파일명 반환
        return jsonify({'message': '업로드 성공', 'filename': filename}), 200
    else:
        # 허용되지 않은 파일 확장자일 경우 오류 반환
        return jsonify({'error': '허용되지 않는 파일 형식입니다.'}), 400

