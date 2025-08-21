import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
  },
  education: [{ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
  skills: [{ skill: '' }],
  employmentHistory: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
  languages: [{ language: '', proficiency: '' }],
  professionalSummary: '',
  currentTemplate: 1,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setPersonalDetails(state, action) {
      state.personalDetails = action.payload;
    },
    setEducation(state, action) {
      state.education = action.payload;
    },
    setEmploymentHistory(state, action) {
      state.employmentHistory = action.payload;
    },
    setSkills(state, action) {
      state.skills = action.payload;
    },
    setLanguages(state, action) {
      state.languages = action.payload;
    },
    setProfessionalSummary(state, action) {
      state.professionalSummary = action.payload;
    },
    setCurrentTemplate(state, action) {
      state.currentTemplate = action.payload;
    },
  },
});

export const {
  setPersonalDetails,
  setEducation,
  setEmploymentHistory,
  setSkills,
  setLanguages,
  setProfessionalSummary,
  setCurrentTemplate,
} = resumeSlice.actions;

export default resumeSlice.reducer;
