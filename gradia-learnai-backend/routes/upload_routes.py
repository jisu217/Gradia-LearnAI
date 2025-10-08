from flask import Blueprint, request, jsonify, session
import os
from werkzeug.utils import secure_filename

upload_routes = Blueprint('upload_routes', __name__)

# 업로드 저장 폴더 및 허용 확장자
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

# 확장자 검사 함수
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 업로드 처리
@upload_routes.route('/upload', methods=['POST'])
def upload_file():
    # 파일 유무 확인
    if 'file' not in request.files:
        return jsonify({'error': '파일이 포함되어 있지 않습니다.'}), 400

    file = request.files['file']

    # 파일명 유효성 검사
    if not file or file.filename.strip() == '':
        return jsonify({'error': '파일명이 없습니다.'}), 400

    # 확장자 확인
    if not allowed_file(file.filename):
        return jsonify({'error': '허용되지 않는 파일 형식입니다.'}), 400

    # 보안 처리된 파일명
    filename = secure_filename(file.filename)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # 저장 폴더 없으면 생성
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    try:
        file.save(file_path)
        session['uploaded_file'] = file_path
        return jsonify({'message': '업로드 성공', 'filename': filename}), 200
    except Exception as e:
        return jsonify({'error': f'파일 저장 실패: {str(e)}'}), 500

