# Transformers 라이브러리를 활용한 텍스트 요약 함수 구현

from transformers import pipeline

# Hugging Face Transformers 라이브러리의 요약 파이프라인 초기화
summarizer = pipeline("summarization")

# 긴 텍스트를 받아서 적절한 크기로 나누고 각 부분을 요약한 후 합치는 함수
def summarize_text(text) :
    max_chunk_size = 512 # 긴 텍스트를 받아서 적절한 크기로 나누고 각 부분을 요약한 후 합치는 함수
    # 입력 텍스트를 max_chunk_size 단위로 분할
    text_chunks = [text[i:i + max_chunk_size] for i in range(0, len(text), max_chunk_size)]

    summary = ""
    # 각 텍스트 청크에 대해 요약을 수행하고 결과를 이어붙임
    for chunk in text_chunks :
        summary += summarizer(chunk, max_length=150, min_length=30, do_sample=False)[0]['summary_text']

    return summary
