// 선택된 단계의 상세 내용 화면

import React from 'react';
import { ChevronLeft, Save, FileText, ChevronRight } from 'lucide-react';
import StepItem from './StepItem';

const StepDetail = ({ stepData, isLast, starredItems, onToggleStar, onBack, onNext, onSave }) => {
  return (
    <div className="slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-2xl">{stepData.icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{stepData.title}</h3>
          <p className="text-sm text-gray-600">{stepData.description}</p>
        </div>
      </div>
      
      {stepData.content.length > 0 ? (
        <div className="space-y-3 mb-6">
          {stepData.content.map((item, index) => (
            <StepItem 
              key={index}
              item={item}
              isStarred={starredItems.includes(`${item.type}-${item.text}`)}
              onToggleStar={onToggleStar}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <FileText size={48} className="mx-auto mb-3 text-gray-300" />
          <p>해당 단계의 데이터가 없습니다.</p>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
          <ChevronLeft size={16} /> 이전 단계
        </button>
        {!isLast && (
          <button onClick={onNext} className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
            다음 단계 <ChevronRight size={16} />
          </button>
        )}
        <button onClick={() => onSave(`${stepData.id}단계`)} className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
          <Save size={16} /> 저장
        </button>
      </div>
    </div>
  );
};

export default StepDetail;