package com.gradia.learnai.util;

import com.gradia.learnai.exception.FileProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Slf4j
@Component
public class PdfExtractor {

    public String extractText(String filePath) throws IOException {
        File file = new File(filePath);
        
        try (PDDocument document = PDDocument.load(file)) {
            if (document.isEncrypted()) {
                throw new FileProcessingException("암호화된 PDF 파일은 지원하지 않습니다.");
            }

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            log.debug("PDF 텍스트 추출 완료: {} 페이지", document.getNumberOfPages());

            return text;
        } catch (IOException e) {
            log.error("PDF 텍스트 추출 실패: {}", filePath, e);
            throw new FileProcessingException("PDF 파일에서 텍스트를 추출할 수 없습니다.", e);
        }
    }
}