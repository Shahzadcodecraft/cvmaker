  'use client';

  import React from 'react';
  import {
    Accordion,
    AccordionPanel,
    AccordionTitle,
    AccordionContent,
  } from 'flowbite-react';
  import { Trash } from 'lucide-react';
  import { useSelector, useDispatch } from 'react-redux';
  import { setEducation } from './redux/resumeSlice'; // Adjust path if needed

  const EducationForm = ({ onBack, onNext }) => {
    const dispatch = useDispatch();
    const education = useSelector((state) => state.resume.education);

    const handleChange = (index, e) => {
      const { name, value } = e.target;
      // Create new array with new updated object at index (immutable update)
      const updated = education.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      );
      dispatch(setEducation(updated));
    };

    const addEducation = () => {
      dispatch(
        setEducation([
          ...education,
          { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' },
        ])
      );
    };

    const removeEducation = (index) => {
      if (index === 0) return; // keep first row
      const updated = education.filter((_, i) => i !== index);
      dispatch(setEducation(updated));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (onNext) onNext(); // data is stored in Redux already
    };

    return (
      <Accordion collapseAll>
        <AccordionPanel>
          <AccordionTitle className="pl-3 text-lg font-semibold text-gray-800">🎓 Education</AccordionTitle>
          <AccordionContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Educational Background
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Add your educational qualifications, starting with the most recent.
                </p>
              </div>
              
              {education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg flex flex-col gap-4 flex-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <input
                        name="school"
                        value={edu.school}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="University of California, Berkeley"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                        <input
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="Bachelor of Science"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                        <input
                          name="fieldOfStudy"
                          value={edu.fieldOfStudy}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="Computer Science"
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
                          value={edu.startDate}
                          onChange={(e) => handleChange(index, e)}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                          type="month"
                          name="endDate"
                          value={edu.endDate}
                          onChange={(e) => handleChange(index, e)}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors mt-2"
                      title="Remove education"
                    >
                      <Trash size={20} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addEducation}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium py-2 px-4 hover:bg-green-50 rounded-lg transition-colors"
              >
                <span>+</span> Add another education
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
  };

  export default EducationForm;
