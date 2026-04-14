// 개념 정의

export const defineConcepts = async (text) => {
  try {
    const response = await fetch('http://localhost:8080/api/ai/define', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text }),
    });
    const data = await response.json();
    return data.definitions; 
  } catch (error) {
    console.error("Definer Error:", error);
    return "개념 정의에 실패했습니다.";
  }
};