// 문서 요약

export const summarizeText = async (text) => {
  try {
    const response = await fetch('http://localhost:8080/api/ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text }),
    });
    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error("Summarizer Error:", error);
    return "문서 요약에 실패했습니다.";
  }
};