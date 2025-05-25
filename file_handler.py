from flask import Flask, request, jsonify
import os
import uuid
import datetime
from werkzeug.utils import secure_filename
import PyPDF2

app = Flask(__name__)

# 설정
UPLOAD_FOLDER = 'uploads'
HISTORY_FOLDER = 'history'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}
MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# 폴더 없으면 생성
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(HISTORY_FOLDER, exist_ok=True)

# 확장자 검사 함수
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 학습 이력 저장 함수
def save_history(filename, text):
    log_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    history_filename = f"{HISTORY_FOLDER}/{filename}.log"
    with open(history_filename, 'w', encoding='utf-8') as f:
        f.write(f"[업로드 시간]: {log_time}\n")
        f.write(f"[파일명]: {filename}\n")
        f.write(f"[텍스트 길이]: {len(text)}자\n")
        f.write(f"[텍스트 내용]:\n{text}\n")

# 파일 업로드 라우트
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': '파일이 없습니다.'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': '파일 이름이 없습니다.'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'txt 또는 pdf 파일만 업로드 가능합니다.'}), 400

    original_filename = secure_filename(file.filename)
    ext = original_filename.rsplit('.', 1)[1].lower()
    unique_id = str(uuid.uuid4())[:8]
    saved_filename = f"{original_filename.rsplit('.', 1)[0]}_{unique_id}.{ext}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], saved_filename)

    try:
        file.save(filepath)

        # 텍스트 추출
        text = ''
        if ext == 'pdf':
            try:
                with open(filepath, 'rb') as f:
                    reader = PyPDF2.PdfReader(f)
                    for page in reader.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + '\n'
            except Exception as e:
                return jsonify({'error': f'PDF 처리 중 오류: {str(e)}'}), 500

        elif ext == 'txt':
            with open(filepath, 'r', encoding='utf-8') as f:
                text = f.read()

        # 학습 이력 저장
        save_history(saved_filename, text)

        return jsonify({
            'message': f'{ext.upper()} 파일 업로드 및 처리 완료',
            'filename': saved_filename,
            'text': text
        })

    except Exception as e:
        return jsonify({'error': f'파일 저장 또는 처리 중 오류: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

