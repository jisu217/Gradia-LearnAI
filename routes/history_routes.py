from flask import Blueprint, jsonify
from modules.history_manager import load_learning_history, delete_learning_history

# 학습 이력 관련 요청을 처리할 Blueprint 생성
history_bp = Blueprint('history', __name__)

# [GET] 학습 이력 전체 조회
@history_bp.route('/history', methods=['GET'])
def get_history():
    try:
        history = load_learning_history()
        return jsonify({'history': history})
    except Exception as e:
        return jsonify({'error': f'학습 이력 불러오기 실패: {str(e)}'}), 500

# [POST] 학습 이력 전체 삭제
@history_bp.route('/history/delete', methods=['POST'])
def delete_history():
    try:
        delete_learning_history()
        return jsonify({'message': '학습 이력 삭제 완료'})
    except Exception as e:
        return jsonify({'error': f'학습 이력 삭제 실패: {str(e)}'}), 500
