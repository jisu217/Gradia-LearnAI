// 부모 컨테이너

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import MemoInput from './MemoInput';
import MemoList from './MemoList';

const MemoBox = ({ uploadedFile, memos, setMemos }) => {
  const [showMemoBox, setShowMemoBox] = useState(false);
  const [memoContent, setMemoContent] = useState('');

  const currentFileMemos = memos.filter(memo => memo.filename === uploadedFile?.name);

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
  };

  const deleteMemo = (memoId) => {
    if (window.confirm('이 메모를 삭제하시겠습니까?')) {
      setMemos(prev => prev.filter(memo => memo.id !== memoId));
    }
  };

  const clearAllMemos = () => {
    if (window.confirm('이 파일의 모든 메모를 삭제하시겠습니까?')) {
      setMemos(prev => prev.filter(memo => memo.filename !== uploadedFile?.name));
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('ko-KR', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="mt-6">
      {/* 토글 버튼 */}
      <button
        onClick={() => setShowMemoBox(!showMemoBox)}
        className="bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 shadow-md"
      >
        <MessageSquare size={18} />
        <span className="font-medium">메모 작성</span>
        {currentFileMemos.length > 0 && (
          <span className="bg-purple-700 rounded-full px-2 py-1 text-xs">
            {currentFileMemos.length}
          </span>
        )}
      </button>

      {/* 입력 섹션 */}
      {showMemoBox && (
        <MemoInput 
          memoContent={memoContent}
          setMemoContent={setMemoContent}
          onSave={saveMemo}
          onClose={() => setShowMemoBox(false)}
        />
      )}

      {/* 리스트 섹션 */}
      {currentFileMemos.length > 0 && (
        <MemoList 
          memos={currentFileMemos}
          onDelete={deleteMemo}
          onClearAll={clearAllMemos}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default MemoBox;