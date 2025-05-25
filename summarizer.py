from transformers import pipeline

summarizer = pipeline("summarization")

def summarize_text(text):
    max_chunk_size = 512
    text_chunks = [text[i:i + max_chunk_size] for i in range(0, len(text), max_chunk_size)]
    summary = ""
    for chunk in text_chunks:
        summary += summarizer(chunk, max_length=150, min_length=30, do_sample=False)[0]['summary_text']
    return summary
