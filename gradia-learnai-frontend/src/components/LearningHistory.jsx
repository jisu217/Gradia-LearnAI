// 학습 이력 UI

import React from 'react';
import { BookOpen, Trash2 } from 'lucide-react';

const LearningHistory = ({ history, onClearHistory }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-center flex items-center gap-2 text-gray-800">
          <BookOpen size={20} />
          학습 이력
        </h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-red-500 hover:text-red-700 transition-colors p-2"
            title="전체 삭제"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="border-t-2 border-blue-500 pt-4">
        {history.length > 0 ? (
          <div className="max-h-48 overflow-y-auto border rounded-lg p-3 bg-gray-50">
            <div className="space-y-3">
              {history.slice(-10).reverse().map((item, index) => (
                <div 
                  key={item.id || index} 
                  className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400 fade-in"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800 truncate flex-1">
                      📄 {item.filename}
                    </h4>
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {item.step}단계
                    </span>
                  </div>

                  {item.keywords && item.keywords.length > 0 && (
                    <div className="text-xs text-gray-600 mb-1">
                      <span className="font-medium">키워드:</span> {item.keywords.join(', ')}
                    </div>
                  )}

                  {item.summary && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">요약:</span> {item.summary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">저장된 학습 이력이 없습니다.</p>
            <p className="text-sm text-gray-400">파일을 업로드하고 학습을 시작해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHistory;