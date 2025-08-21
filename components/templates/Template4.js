'use client';
import React from 'react';

const Template4 = ({ data }) => {
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
      id="resume-template-4"
      className="bg-white text-gray-800 p-8 max-w-4xl mx-auto shadow-xl border border-gray-200"
      style={{ fontFamily: "'Geist Sans', sans-serif", lineHeight: '1.6' }}
    >
      {/* Minimalist Header */}
      <header className="border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-2">
          {personalDetails.firstName} <span className="font-bold">{personalDetails.lastName}</span>
        </h1>
        <h2 className="text-lg text-gray-600 mb-4 font-light tracking-wide">
          {personalDetails.jobTitle}
        </h2>
        <div className="flex gap-6 text-sm text-gray-600">
          <span>{personalDetails.email}</span>
          <span>•</span>
          <span>{personalDetails.phone}</span>
        </div>
      </header>

      {/* Summary */}
      {professionalSummary && (
        <section className="mb-10">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
            Summary
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap break-words overflow-wrap-anywhere">
            {professionalSummary}
          </p>
        </section>
      )}

      {/* Experience */}
      {employmentHistory && employmentHistory.length > 0 && employmentHistory[0].company && (
        <section className="mb-10">
          <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-widest">
            Experience
          </h3>
          <div className="space-y-8">
            {employmentHistory.map((job, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{job.position}</h4>
                  <span className="text-sm text-gray-500 font-light">
                    {job.startDate} – {job.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 font-medium">{job.company}</p>
                {job.description && (
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && education[0].school && (
        <section className="mb-10">
          <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-widest">
            Education
          </h3>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                  <span className="text-sm text-gray-500 font-light">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-600 font-medium">{edu.fieldOfStudy}</p>
                <p className="text-gray-700">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-12">
        {/* Skills */}
        {skills && skills.length > 0 && skills[0].skill && (
          <section>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
              Skills
            </h3>
            <div className="space-y-2">
              {skills.map((s, i) => (
                <div key={i} className="text-gray-700 text-sm">
                  {s.skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && languages[0].language && (
          <section>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">
              Languages
            </h3>
            <div className="space-y-2">
              {languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-700">{lang.language}</span>
                  <span className="text-gray-500 font-light">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template4;
