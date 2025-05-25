# Flask Blueprint 기반 학습 이력 관리 API 구현

from flask import Blueprint, jsonify
from modules.history_manager import load_learning_history, delete_learning_history

# 'history' 관련 요청을 처리할 Blueprint 생성
history_bp = Blueprint('history', __name__)

# GET 요청으로 저장된 학습 이력을 조회하는 라우트
@history_bp.route('/history', methods=['GET'])
def get_history() :
    history = load_learning_history() # JSON 파일에서 이력 불러오기
    return jsonify(history) # 이력을 JSON 형태로 응답

# POST 요청으로 저장된 학습 이력을 삭제하는 라우트
@history_bp.route('/history/delete', methods=['POST'])
def delete_history() :
    delete_learning_history() # 이력을 JSON 형태로 응답
    return jsonify({'message': '학습 이력 삭제 완료'}) # 결과 메시지 반환