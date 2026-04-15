// 파일을 읽어 텍스트를 추출

export const extractTextFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileType = file.name.split('.').pop().toLowerCase();

    if (fileType === 'txt') {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.onerror = reject;

      reader.readAsText(file, 'UTF-8');
    } 

    else if (fileType === 'pdf') {
      const reader = new FileReader();

      reader.onload = () => {
        resolve("PDF 파일이 업로드되었습니다.");
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    } 

    else {
      reject(new Error('지원하지 않는 파일 형식입니다.'));
    }
  });
};