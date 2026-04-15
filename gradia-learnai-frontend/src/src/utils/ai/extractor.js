// 키워드 추출

export const extractKeywords = async (text) => {
  try {
    const response = await fetch('http://localhost:8080/api/ai/keywords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text }),
    });
    const data = await response.json();
    return data.keywords; 
  } catch (error) {
    console.error("Keywords Error:", error);
    return "키워드 추출에 실패했습니다.";
  }
};