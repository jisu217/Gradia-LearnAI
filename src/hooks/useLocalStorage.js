import { useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/storage/localStorage';

export const useLocalStorage = (key, initialValue) => {
  // 1. 초기값 설정
  const [value, setValue] = useState(() => getItem(key, initialValue));
  
  // 2. 상태 업데이트 함수
  const updateValue = (newValue) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;

    setValue(valueToStore);
    setItem(key, valueToStore);
  };

  // 3. 외부 변경 사항 동기화
  useEffect(() => {
    const sync = (e) => {
      if (!e.key || e.key === key || e.type === 'app-storage-change') {
        setValue(getItem(key, initialValue));
      }
    };

    window.addEventListener('storage', sync);
    window.addEventListener('app-storage-change', sync);

    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('app-storage-change', sync);
    };
  }, [key]);
   
  return [value, updateValue];
};