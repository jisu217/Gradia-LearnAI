// 개별 메모 아이템

import React from 'react';
import { Trash2 } from 'lucide-react';

const MemoItem = ({ memo, onDelete, formatDate }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-400 hover:bg-gray-100 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <p className="text-gray-800 flex-1 leading-relaxed">{memo.content}</p>
        <button
          onClick={() => onDelete(memo.id)}
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
  );
};

export default MemoItem;