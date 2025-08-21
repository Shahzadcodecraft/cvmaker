'use client';

import React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from 'flowbite-react';
import { Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguages } from './redux/resumeSlice'; // Adjust path accordingly

export default function LanguagesForm({ onBack, onNext }) {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.resume.languages);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    // Use map to create new array immutably and update only the target language object
    const updated = languages.map((lang, i) =>
      i === index ? { ...lang, [name]: value } : lang
    );
    dispatch(setLanguages(updated));
  };

  const addLanguage = () => {
    dispatch(setLanguages([...languages, { language: '', proficiency: '' }]));
  };

  const removeLanguage = (index) => {
    if (languages.length === 1) return;
    const updated = languages.filter((_, i) => i !== index);
    dispatch(setLanguages(updated));
  };

  return (
    <Accordion collapseAll>
      <AccordionPanel>
        <AccordionTitle className="pl-3 text-lg font-semibold text-gray-800">🌍 Languages</AccordionTitle>
        <AccordionContent>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Language Proficiency
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Add languages you speak and your proficiency level.
              </p>
            </div>
            
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <input
                      type="text"
                      name="language"
                      placeholder="English, Spanish, French..."
                      value={lang.language}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
                    <select
                      name="proficiency"
                      value={lang.proficiency}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select proficiency</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Basic">Basic</option>
                    </select>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors mt-6"
                      title="Remove language"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addLanguage}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium py-2 px-4 hover:bg-green-50 rounded-lg transition-colors"
            >
              <span>+</span> Add another language
            </button>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">You are all set! Review your resume and download as PDF.</p>
                <button
                  type="button"
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  ✓ Complete Resume
                </button>
              </div>
            </div>
          </form>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  );
}
