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
import { setSkills } from './redux/resumeSlice'; // Adjust path as necessary

export default function SkillsForm({ onBack, onNext }) {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills);

  const handleChange = (index, e) => {
    const { value } = e.target;
    // Immutable update: create new array and new object for the changed skill
    const updated = skills.map((skill, i) =>
      i === index ? { skill: value } : skill
    );
    dispatch(setSkills(updated));
  };

  const addSkill = () => {
    dispatch(setSkills([...skills, { skill: '' }]));
  };

  const removeSkill = (index) => {
    if (skills.length === 1) return;
    const updated = skills.filter((_, i) => i !== index);
    dispatch(setSkills(updated));
  };

  return (
    <Accordion collapseAll>
      <AccordionPanel>
        <AccordionTitle className="pl-3 text-lg font-semibold text-gray-800">🛠️ Skills</AccordionTitle>
        <AccordionContent>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Technical Skills
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Add your technical skills, programming languages, tools, and technologies.
              </p>
              <div className="space-y-3">
                {skills.map((s, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="e.g., JavaScript, React, Python, Adobe Photoshop"
                      value={s.skill}
                      onChange={(e) => handleChange(index, e)}
                      className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove skill"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={addSkill}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium py-2 px-4 hover:bg-green-50 rounded-lg transition-colors"
            >
              <span>+</span> Add another skill
            </button>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={onNext}
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
