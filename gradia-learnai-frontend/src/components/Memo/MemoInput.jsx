// 메모 작성 컴포넌트

import React from 'react';
import { MessageSquare, X, Save } from 'lucide-react';

const MemoInput = ({ memoContent, setMemoContent, onSave, onClose }) => {
  return (
    <div className="mt-4 bg-white border-2 border-purple-200 rounded-lg p-4 shadow-md slide-up">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <MessageSquare size={18} />
          메모 작성
        </h4>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
          <X size={20} />
        </button>
      </div>

      <textarea
        value={memoContent}
        onChange={(e) => setMemoContent(e.target.value)}
        placeholder="학습 내용에 대한 메모를 자유롭게 작성해보세요."
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows="4"
      />

      <div className="flex gap-2 mt-3">
        <button
          onClick={onSave}
          className="memo-success flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
        >
          <Save size={16} />
          메모 저장
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default MemoInput;