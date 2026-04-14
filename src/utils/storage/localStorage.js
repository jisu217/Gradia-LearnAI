// 읽기
export const getItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

// 저장
export const setItem = (key, value) => {
  try {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }

    window.dispatchEvent(new Event('app-storage-change'));
  } catch (e) {
    console.warn(e);
  }
};

// 삭제
export const removeItem = (key) => {
  localStorage.removeItem(key);
  window.dispatchEvent(new Event('app-storage-change'));
};


// 전체 데이터 삭제
export const clearAppData = () => {
  const keys = ['learningHistory', 'starredItems', 'memos'];

  keys.forEach((key) => {
    localStorage.removeItem(key);
  });

  window.dispatchEvent(new Event('app-storage-change'));
};


// 데이터 내보내기
export const exportData = () => {
  const data = {
    learningHistory: getItem('learningHistory', []),
    starredItems: getItem('starredItems', []),
    memos: getItem('memos', []),
    exportDate: new Date().toISOString(),
  };

  return JSON.stringify(data, null, 2);
};


// 데이터 불러오기
export const importData = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);

    if (data.learningHistory) setItem('learningHistory', data.learningHistory);
    if (data.starredItems) setItem('starredItems', data.starredItems);
    if (data.memos) setItem('memos', data.memos);

    return { success: true, message: '데이터 불러오기 성공' };
  } catch {
    return { success: false, message: 'JSON 형식 오류' };
  }
};


// 모니터링
export const getStorageInfo = () => {
  const keys = ['learningHistory', 'starredItems', 'memos'];
  const info = {};
  let total = 0;

  keys.forEach((key) => {
    const value = localStorage.getItem(key);
    const size = value ? new Blob([value]).size : 0;

    info[key] = {
      items: value ? JSON.parse(value).length : 0,
      size: `${(size / 1024).toFixed(2)} KB`,
    };

    total += size;
  });

  info.total = `${(total / 1024).toFixed(2)} KB`;

  return info;
};