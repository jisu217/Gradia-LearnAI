// 파일 유효성 검사

export const validateFileSize = (file, maxSize = 10 * 1024 * 1024) => {
  return file.size <= maxSize;
};

export const validateFileType = (file, allowedTypes = ['txt', 'pdf']) => {
  const fileType = file.name.split('.').pop().toLowerCase();
  return allowedTypes.includes(fileType);
};

export const validateFile = (file) => {
  const errors = [];

  if (!validateFileType(file)) {
    errors.push('txt, pdf 파일만 지원됩니다.');
  }

  if (!validateFileSize(file)) {
    errors.push('파일 크기는 10MB 이하여야 합니다.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};