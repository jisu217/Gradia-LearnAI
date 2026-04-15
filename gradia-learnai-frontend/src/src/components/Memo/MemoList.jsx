// 메모 리스트 컨테이너

import React from 'react';
import { MessageSquare } from 'lucide-react';
import MemoItem from './MemoItem';

const MemoList = ({ memos, onDelete, onClearAll, formatDate }) => {
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 shadow-md fade-in">
      <h4 className="font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <MessageSquare size={18} />
        저장된 메모
        <span className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600">
          {memos.length}개
        </span>
      </h4>

      <div className="max-h-48 overflow-y-auto space-y-3">
        {memos.slice().reverse().map(memo => (
          <MemoItem 
            key={memo.id} 
            memo={memo} 
            onDelete={onDelete} 
            formatDate={formatDate} 
          />
        ))}
      </div>

      {memos.length >= 10 && (
        <div className="text-center mt-3">
          <button
            onClick={onClearAll}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            전체 메모 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoList;