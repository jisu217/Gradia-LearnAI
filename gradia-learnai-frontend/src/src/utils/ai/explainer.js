// 개념 설명

export const explainConcepts = async (text) => {
  try {
    const response = await fetch('http://localhost:8080/api/ai/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text }),
    });
    const data = await response.json();
    return data.explanation; 
  } catch (error) {
    console.error("Explainer Error:", error);
    return "개념 설명에 실패했습니다.";
  }
};