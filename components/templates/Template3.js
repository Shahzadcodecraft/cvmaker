'use client';
import React from 'react';
import { Mail, Phone, User, Briefcase, GraduationCap, Code, Globe, Circle } from 'lucide-react';

const Template3 = ({ data }) => {
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
      id="resume-template-3"
      className="bg-white text-gray-800 p-8 max-w-4xl mx-auto shadow-xl border border-gray-200"
      style={{ fontFamily: "'Geist Sans', sans-serif", lineHeight: '1.6' }}
    >
      {/* Header with colored background */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-lg mb-8 -mx-8 -mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {personalDetails.firstName} {personalDetails.lastName}
            </h1>
            <h2 className="text-xl text-emerald-100">
              {personalDetails.jobTitle}
            </h2>
          </div>
          <div className="text-right text-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-emerald-100" />
              <span>{personalDetails.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-100" />
              <span>{personalDetails.phone}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {professionalSummary && (
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">About Me</h3>
          </div>
          <p className="text-gray-700 leading-relaxed pl-11 border-l-4 border-emerald-200 ml-4 whitespace-pre-wrap break-words overflow-wrap-anywhere">
            {professionalSummary}
          </p>
        </section>
      )}

      {/* Experience */}
      {employmentHistory && employmentHistory.length > 0 && employmentHistory[0].company && (
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
          </div>
          <div className="pl-11 ml-4">
            {employmentHistory.map((job, i) => (
              <div key={i} className="relative mb-6 border-l-4 border-emerald-200 pl-6">
                <div className="absolute w-3 h-3 bg-emerald-600 rounded-full -left-2 top-2"></div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2 flex-wrap">
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="font-bold text-lg text-gray-900 break-words">{job.position}</h4>
                      <p className="text-emerald-600 font-medium break-words">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full whitespace-nowrap">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  {job.description && (
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">{job.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && education[0].school && (
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Education</h3>
          </div>
          <div className="pl-11 ml-4 space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-400">
                <h4 className="font-bold text-gray-900 text-lg break-words">{edu.degree}</h4>
                <p className="text-emerald-700 font-medium break-words">{edu.fieldOfStudy}</p>
                <p className="text-gray-700 break-words">{edu.school}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Skills */}
        {skills && skills.length > 0 && skills[0].skill && (
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
                <Code className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Skills</h3>
            </div>
            <div className="pl-11 ml-4 space-y-2">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center">
                  <Circle className="w-2 h-2 text-emerald-500 flex-shrink-0 mr-3" fill="currentColor" />
                  <span className="text-gray-700 break-words">{s.skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && languages[0].language && (
          <section>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Languages</h3>
            </div>
            <div className="pl-11 ml-4 space-y-2">
              {languages.map((lang, i) => (
                <div key={i} className="flex justify-between items-center flex-wrap">
                  <span className="text-gray-700 font-medium break-words">{lang.language}</span>
                  <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded whitespace-nowrap">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template3;
