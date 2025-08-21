'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTemplate } from './redux/resumeSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TemplateSelector = () => {
  const dispatch = useDispatch();
  const currentTemplate = useSelector((state) => state.resume.currentTemplate);
  
  const templates = [
    { id: 1, name: 'Classic Professional', description: 'Clean and traditional layout' },
    { id: 2, name: 'Modern Sidebar', description: 'Two-column design with dark sidebar' },
    { id: 3, name: 'Creative Timeline', description: 'Colorful design with timeline elements' },
    { id: 4, name: 'Minimalist', description: 'Simple and elegant typography' },
  ];

  const handlePrevTemplate = () => {
    const newTemplate = currentTemplate === 1 ? templates.length : currentTemplate - 1;
    dispatch(setCurrentTemplate(newTemplate));
  };

  const handleNextTemplate = () => {
    const newTemplate = currentTemplate === templates.length ? 1 : currentTemplate + 1;
    dispatch(setCurrentTemplate(newTemplate));
  };

  const currentTemplateInfo = templates.find(t => t.id === currentTemplate);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevTemplate}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          title="Previous Template"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="text-center flex-1 mx-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentTemplateInfo?.name}
          </h3>
          <p className="text-sm text-gray-600">
            {currentTemplateInfo?.description}
          </p>
          <div className="flex justify-center mt-2 space-x-1">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => dispatch(setCurrentTemplate(template.id))}
                className={`w-3 h-3 rounded-full transition-colors ${
                  template.id === currentTemplate
                    ? 'bg-blue-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={template.name}
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={handleNextTemplate}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          title="Next Template"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;
