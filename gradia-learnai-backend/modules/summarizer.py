# 긴 텍스트를 요약하는 모듈 (HuggingFace Transformers summarization 사용)

from transformers import pipeline

# 사전 학습된 요약 파이프라인 로드
summarizer = pipeline("summarization")

# 텍스트 요약 함수
def summarize_text(text):
    max_chunk_size = 512  # 한 번에 처리할 최대 토큰 길이 (모델 한계 고려)

    # 긴 텍스트를 max_chunk_size 단위로 분할
    text_chunks = [text[i:i + max_chunk_size] for i in range(0, len(text), max_chunk_size)]

    summary = ""
    for chunk in text_chunks:
        # 각 청크를 요약하고 결과에서 'summary_text'만 추출하여 이어붙임
        summary += summarizer(chunk, max_length=150, min_length=30, do_sample=False)[0]['summary_text']

    return summary  # 전체 요약 반환
