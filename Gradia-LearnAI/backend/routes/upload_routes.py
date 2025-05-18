# Flask 기반 파일 업로드 처리 기능 구현

from flask import Blueprint, request, render_template, jsonify
from werkzeug.utils import secure_filename
import os

# 'upload' 관련 요청을 처리할 Blueprint 생성
upload_bp = Blueprint('upload', __name__)
# 업로드된 파일을 저장할 폴더 경로
UPLOAD_FOLDER = '../uploads'
# 업로드 가능한 허용 파일 확장자 정의
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

# 파일 확장자가 허용된 것인지 확인하는 함수
def allowed_file(filename) :
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 루트 경로 ('/') 접속 시 업로드 HTML 페이지 렌더링
@upload_bp.route('/')
def index() :
    return render_template('upload.html')

# 실제 파일 업로드를 처리하는 라우트
@upload_bp.route('/upload', methods=['POST'])
def upload_file() :
    # 업로드 요청에 'file' 파트가 없는 경우 오류 반환
    if 'file' not in request.files:
        return jsonify({'error': '파일이 없습니다.'}), 400

    file = request.files['file']

    # 파일 이름이 비어 있는 경우 오류 반환
    if file.filename == '' :
        return jsonify({'error': '파일 이름이 없습니다.'}), 400

    # 허용되지 않은 확장자의 경우 오류 반환
    if not allowed_file(file.filename) :
        return jsonify({'error': '허용되지 않는 파일 형식입니다.'}), 400

    # 보안 처리를 통해 안전한 파일 이름 생성 후 파일 저장
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # 업로드 성공 메시지와 파일명 반환
    return jsonify({'message': '파일 업로드 성공!', 'filename': filename}), 200
