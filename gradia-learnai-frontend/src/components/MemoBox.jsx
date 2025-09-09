// 메모 기능 UI

import React, { useState } from 'react';
import { MessageSquare, X, Save, Trash2 } from 'lucide-react';

const MemoBox = ({ uploadedFile, memos, setMemos }) => {
  const [showMemoBox, setShowMemoBox] = useState(false);
  const [memoContent, setMemoContent] = useState('');

  const saveMemo = () => {
    if (!memoContent.trim()) {
      alert('메모 내용을 입력하세요.');
      return;
    }
    
    const newMemo = {
      id: Date.now(),
      content: memoContent.trim(),
      filename: uploadedFile?.name || 'Unknown',
      timestamp: new Date().toISOString()
    };
    
    setMemos(prev => [...prev, newMemo]);
    setMemoContent('');
    setShowMemoBox(false);
    
    // Success feedback
    const button = document.querySelector('.memo-success');
    if (button) {
      button.textContent = '저장 완료!';
      setTimeout(() => {
        button.textContent = '메모 저장';
      }, 2000);
    }
  };

  const deleteMemo = (memoId) => {
    if (window.confirm('이 메모를 삭제하시겠습니까?')) {
      setMemos(prev => prev.filter(memo => memo.id !== memoId));
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const currentFileMemos = memos.filter(memo => memo.filename === uploadedFile?.name);

  return (
    <div className="mt-6">
      {/* Memo Toggle Button */}
      <button
        onClick={() => setShowMemoBox(!showMemoBox)}
        className="bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
      >
        <MessageSquare size={18} />
        <span className="font-medium">메모 작성</span>
        {currentFileMemos.length > 0 && (
          <span className="bg-purple-700 rounded-full px-2 py-1 text-xs">
            {currentFileMemos.length}
          </span>
        )}
      </button>
      
      {/* Memo Input Box */}
      {showMemoBox && (
        <div className="mt-4 bg-white border-2 border-purple-200 rounded-lg p-4 shadow-md slide-up">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare size={18} />
              메모 작성
            </h4>
            <button
              onClick={() => setShowMemoBox(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <textarea
            value={memoContent}
            onChange={(e) => setMemoContent(e.target.value)}
            placeholder="학습 내용에 대한 메모를 자유롭게 작성해보세요..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="4"
          />
          
          <div className="flex gap-2 mt-3">
            <button
              onClick={saveMemo}
              className="memo-success flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              메모 저장
            </button>
            <button
              onClick={() => {
                setMemoContent('');
                setShowMemoBox(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}
      
      {/* Saved Memos Display */}
      {currentFileMemos.length > 0 && (
        <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 shadow-md fade-in">
          <h4 className="font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <MessageSquare size={18} />
            저장된 메모
            <span className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600">
              {currentFileMemos.length}개
            </span>
          </h4>
          
          <div className="max-h-48 overflow-y-auto space-y-3">
            {currentFileMemos.slice().reverse().map(memo => (
              <div 
                key={memo.id} 
                className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-400 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="text-gray-800 flex-1 leading-relaxed">
                    {memo.content}
                  </p>
                  <button
                    onClick={() => deleteMemo(memo.id)}
                    className="ml-3 text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                    title="메모 삭제"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>📄 {memo.filename}</span>
                  <span>{formatDate(memo.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
          
          {currentFileMemos.length >= 10 && (
            <div className="text-center mt-3">
              <button
                onClick={() => {
                  if (window.confirm('이 파일의 모든 메모를 삭제하시겠습니까?')) {
                    setMemos(prev => prev.filter(memo => memo.filename !== uploadedFile?.name));
                  }
                }}
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                전체 메모 삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoBox;