'use client';
import React from 'react';

const Template1 = ({ data }) => {
  const {
    personalDetails,
    education,
    skills,
    employmentHistory,
    languages,
    professionalSummary,
  } = data;


  return (
    <div
      id="resume-template-1"
      className="bg-white text-gray-800 p-8 max-w-4xl mx-auto shadow-xl border border-gray-200"
      style={{ fontFamily: "'Geist Sans', sans-serif", lineHeight: '1.6' }}
    >
      {/* Header */}
      <header className="text-center pb-8 mb-8 border-b-2 border-gray-300">
        <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">
          {personalDetails.firstName} {personalDetails.lastName}
        </h1>
        <h2 className="text-2xl font-medium text-blue-600 mb-4 uppercase tracking-wide">
          {personalDetails.jobTitle}
        </h2>
        <div className="flex justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">📧</span>
            <span>{personalDetails.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">📱</span>
            <span>{personalDetails.phone}</span>
          </div>
        </div>
      </header>

      {/* Summary */}
      {professionalSummary && (
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify bg-gray-50 p-4 rounded-lg whitespace-pre-wrap break-words overflow-wrap-anywhere">
            {professionalSummary}
          </p>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && education[0].school && (
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 text-lg">{edu.degree}</h4>
                <p className="text-blue-600 font-medium">{edu.fieldOfStudy}</p>
                <p className="text-gray-700 font-medium">{edu.school}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && skills[0].skill && (
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {s.skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Employment History */}
      {employmentHistory && employmentHistory.length > 0 && employmentHistory[0].company && (
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide">
            Employment History
          </h3>
          <div className="space-y-6">
            {employmentHistory.map((job, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{job.position}</h4>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                {job.description && (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && languages[0].language && (
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide">
            Languages
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((lang, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-900">{lang.language}</span>
                <span className="text-sm text-blue-600 ml-2">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Template1;
