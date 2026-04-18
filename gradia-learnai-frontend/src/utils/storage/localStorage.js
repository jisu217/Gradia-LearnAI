// 데이터 저장/조회/삭제 wrapper

const PREFIX = 'app_';

// 값 저장
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(PREFIX + key, serializedValue);
  } catch (error) {
    console.error('localStorage set error:', error);
  }
};

// 값 가져오기
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(PREFIX + key);

    if (item === null) return defaultValue;

    return JSON.parse(item);
  } catch (error) {
    console.error('localStorage get error:', error);
    return defaultValue;
  }
};

// 특정 값 삭제
export const removeItem = (key) => {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch (error) {
    console.error('localStorage remove error:', error);
  }
};

// 앱 prefix 붙은 데이터만 전체 삭제
export const clearStorage = () => {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('localStorage clear error:', error);
  }
};