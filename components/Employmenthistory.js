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
import { setEmploymentHistory } from './redux/resumeSlice'; // Adjust path accordingly

export default function EmploymentHistoryForm({ onBack, onNext }) {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.resume.employmentHistory);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = jobs.map((job, i) =>
      i === index ? { ...job, [name]: value } : job
    );
    dispatch(setEmploymentHistory(updated));
  };

  const addJob = () => {
    dispatch(
      setEmploymentHistory([
        ...jobs,
        { company: '', position: '', startDate: '', endDate: '', description: '' },
      ])
    );
  };

  const removeJob = (index) => {
    if (jobs.length === 1) return; // keep at least one
    const updated = jobs.filter((_, i) => i !== index);
    dispatch(setEmploymentHistory(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) onNext(); // data is managed in Redux
  };

  return (
    <Accordion collapseAll>
      <AccordionPanel>
        <AccordionTitle className="pl-3 text-lg font-semibold text-gray-800">💼 Employment History</AccordionTitle>
        <AccordionContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Work Experience
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Add your work experience, starting with your most recent position.
              </p>
            </div>
            
            {jobs.map((job, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg flex flex-col gap-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Google Inc."
                        value={job.company}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        name="position"
                        placeholder="Senior Software Engineer"
                        value={job.position}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="month"
                        name="startDate"
                        value={job.startDate}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="month"
                        name="endDate"
                        value={job.endDate}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                    <textarea
                      name="description"
                      placeholder="Describe your key responsibilities, achievements, and impact in this role..."
                      value={job.description}
                      onChange={(e) => handleChange(index, e)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeJob(index)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors mt-2"
                    title="Remove job"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addJob}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium py-2 px-4 hover:bg-green-50 rounded-lg transition-colors"
            >
              <span>+</span> Add another job
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
