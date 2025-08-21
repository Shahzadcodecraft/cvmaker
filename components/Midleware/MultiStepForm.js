"use client";


import React, { useState } from "react";
import PersonalDetailsForm from "../PersonalDetailsForm";
import EducationForm from "../EducationForm";
import SummaryForm from "../SummaryForm";
import EmploymentHistoryForm from "../Employmenthistory";
import SkillsForm from "../SkillsForm";
import LanguagesForm from "../LanguageForm";


export default function MultiStepForm() {
  const [step, setStep] = useState(0);

  const forms = [
    PersonalDetailsForm,
    SummaryForm, 
    EducationForm,
    EmploymentHistoryForm,
    SkillsForm,
    LanguagesForm,
     
  ];

  
  const CurrentForm = forms[step];

  const nextStep = () => {
    if (step < forms.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <CurrentForm onNext={nextStep} onBack={prevStep} />
    </div>
  );
}