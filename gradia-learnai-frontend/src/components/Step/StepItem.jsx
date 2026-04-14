// 리스트의 개별 항목: 별표 기능 포함

import React from 'react';
import { Star } from 'lucide-react';

const StepItem = ({ item, isStarred, onToggleStar }) => {
  return (
    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
      <span className="flex-1 text-gray-800 leading-relaxed">
        {item.text}
      </span>
      <button
        onClick={() => onToggleStar(item.text, item.type)}
        className={`p-2 rounded-full transition-all duration-200 ${
          isStarred
            ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
            : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-50'
        }`}
      >
        <Star size={18} fill={isStarred ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
};

export default StepItem;