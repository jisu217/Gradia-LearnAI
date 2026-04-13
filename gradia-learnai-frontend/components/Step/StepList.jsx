// 1~4단계 선택 메뉴 화면

import React from 'react';
import { ChevronLeft, Save } from 'lucide-react';

const StepList = ({ steps, onStepClick, onBack, onSave }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
        학습 단계를 선택하세요.
      </h3>
      
      {steps.map(step => (
        <button
          key={step.id}
          onClick={() => onStepClick(step.id)}
          disabled={step.content.length === 0}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left flex items-center gap-4 disabled:opacity-50 transform hover:scale-105"
        >
          <div className="text-2xl">{step.icon}</div>
          <div className="flex-1">
            <div className="font-semibold text-lg">{step.title}</div>
            <div className="text-blue-100 text-sm">{step.description}</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
            {step.content.length}개 항목
          </div>
        </button>
      ))}

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
          <ChevronLeft size={16} /> 처음으로
        </button>
        <button onClick={() => onSave('전체')} className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
          <Save size={16} /> 저장
        </button>
      </div>
    </div>
  );
};

export default StepList;