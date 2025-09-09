// localStorage 관리

import { useState, useEffect } from 'react';

// localStorage를 React state와 동기화하는 커스텀 훅
export const useLocalStorage = (key, initialValue) => {
  // localStorage에서 값을 가져오는 함수
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // state 초기화
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // 값을 설정하는 함수
  const setValue = (value) => {
    try {
      // 함수가 전달된 경우 현재 값을 인자로 호출
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // state 업데이트
      setStoredValue(valueToStore);
      
      // localStorage에 저장
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      
      // 다른 탭에서도 변경사항을 알리기 위해 storage 이벤트 발생
      window.dispatchEvent(new Event('localStorage'));
      
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 다른 탭에서 localStorage 변경을 감지
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key || e.type === 'localStorage') {
        setStoredValue(getStoredValue());
      }
    };

    // storage 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorage', handleStorageChange);

    // cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};

// localStorage 관련 유틸리티 함수들
export const localStorageUtils = {
  // 모든 앱 데이터 삭제
  clearAppData: () => {
    const keys = ['learningHistory', 'starredItems', 'memos'];
    keys.forEach(key => {
      window.localStorage.removeItem(key);
    });
    window.dispatchEvent(new Event('localStorage'));
  },

  // 데이터 내보내기 (JSON 형태)
  exportData: () => {
    const data = {
      learningHistory: JSON.parse(window.localStorage.getItem('learningHistory') || '[]'),
      starredItems: JSON.parse(window.localStorage.getItem('starredItems') || '[]'),
      memos: JSON.parse(window.localStorage.getItem('memos') || '[]'),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  // 데이터 가져오기
  importData: (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.learningHistory) {
        window.localStorage.setItem('learningHistory', JSON.stringify(data.learningHistory));
      }
      if (data.starredItems) {
        window.localStorage.setItem('starredItems', JSON.stringify(data.starredItems));
      }
      if (data.memos) {
        window.localStorage.setItem('memos', JSON.stringify(data.memos));
      }
      
      window.dispatchEvent(new Event('localStorage'));
      return { success: true, message: '데이터를 성공적으로 가져왔습니다.' };
    } catch (error) {
      return { success: false, message: '잘못된 데이터 형식입니다.' };
    }
  },

  // localStorage 사용량 확인
  getStorageInfo: () => {
    const keys = ['learningHistory', 'starredItems', 'memos'];
    const info = {};
    let totalSize = 0;

    keys.forEach(key => {
      const value = window.localStorage.getItem(key);
      const size = value ? new Blob([value]).size : 0;
      info[key] = {
        items: value ? JSON.parse(value).length : 0,
        size: `${(size / 1024).toFixed(2)} KB`
      };
      totalSize += size;
    });

    info.total = `${(totalSize / 1024).toFixed(2)} KB`;
    return info;
  }
};