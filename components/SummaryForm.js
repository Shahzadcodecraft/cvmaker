'use client';

import React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfessionalSummary } from './redux/resumeSlice'; // Adjust import path as needed

export default function SummaryForm({ onBack, onNext }) {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.resume.professionalSummary);

  const handleChange = (e) => {
    dispatch(setProfessionalSummary(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) onNext(); // data is saved in Redux
  };

  return (
    <Accordion collapseAll>
      <AccordionPanel>
        <AccordionTitle className="pl-3 text-lg font-semibold text-gray-800">📝 Professional Summary</AccordionTitle>
        <AccordionContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Summary
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Write 2-4 energetic sentences highlighting your key achievements, skills, and career motivation.
              </p>
              <textarea
                rows={6}
                value={summary}
                onChange={handleChange}
                placeholder="Experienced software engineer with 5+ years developing scalable web applications. Led cross-functional teams to deliver high-impact projects, increasing user engagement by 40%. Passionate about clean code and innovative solutions that drive business growth."
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                style={{
                  whiteSpace: 'normal',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word',
                }}
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Next Step →
              </button>
            </div>
          </form>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  );
}
