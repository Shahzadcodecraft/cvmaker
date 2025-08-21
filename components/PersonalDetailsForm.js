'use client';

import React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { setPersonalDetails } from './redux/resumeSlice'; // Adjust path as needed

export default function PersonalDetailsForm({ onNext }) {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.resume.personalDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setPersonalDetails({ ...details, [name]: value }));
  };

  return (
    <Accordion collapseAll>
      <AccordionPanel>
        <AccordionTitle className="pl-3 text-lg font-semibold text-gray-800">👤 Personal Details</AccordionTitle>
        <AccordionContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={details.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={details.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={details.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={details.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="e.g., Software Engineer, Marketing Manager"
                value={details.jobTitle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => onNext()}
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
