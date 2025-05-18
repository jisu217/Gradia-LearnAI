# 문서 파일(PDF, DOCX) 텍스트 추출 함수

from PyPDF2 import PdfReader
import docx

def extract_text(file_stream, filename) :
    # 파일 확장자가 .pdf인 경우
    if filename.endswith('.pdf') :
        reader = PdfReader(file_stream) # PdfReader를 사용하여 PDF 파일 읽기
        text = ""
        for page in reader.pages : # PDF의 각 페이지에서 텍스트 추출하여 누적
            text += page.extract_text()
        return text # 전체 텍스트 반환

    # 파일 확장자가 .docx인 경우
    elif filename.endswith('.docx') :
        doc = docx.Document(file_stream) # python-docx의 Document로 DOCX 파일 읽기
        return "\n".join([para.text for para in doc.paragraphs]) # 문서 내 모든 문단의 텍스트를 줄바꿈으로 연결하여 반환

    else: # 지원하지 않는 파일 형식인 경우
        raise ValueError("Unsupported file format.")
