import MultiStepForm from "../components/Midleware/MultiStepForm";
import Resume from "../components/ResumePrview";
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import SummaryForm from '../components/SummaryForm';
import SkillsForm from '../components/SkillsForm';
import EducationForm from '../components/EducationForm';
import EmploymentHistoryForm from '../components/Employmenthistory';
import LanguageForm from '../components/LanguageForm';
import TemplateSelector from '../components/TemplateSelector';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">CV Maker</h1>
              <p className="text-sm text-gray-600 hidden sm:block">Create your professional resume in minutes</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>📄</span>
              <span className="hidden sm:inline">Professional Resume Builder</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 min-h-[calc(100vh-8rem)]">
          {/* Left Form Panel */}
          <div className="w-full lg:max-w-2xl">
            <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 lg:px-6 py-4">
                <h2 className="text-white font-semibold text-lg">Build Your Resume</h2>
                <p className="text-blue-100 text-sm hidden sm:block">Fill out the sections below to create your professional CV</p>
              </div>
              <div className="p-4 lg:p-6 overflow-y-auto max-h-[50vh] lg:max-h-[calc(100vh-12rem)]">
                <MultiStepForm />
              </div>
            </div>
          </div>

          {/* Right Resume Preview Panel */}
          <div className="flex-1">
            <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 lg:px-6 py-4">
                <h2 className="text-white font-semibold text-lg">Live Preview</h2>
                <p className="text-gray-200 text-sm hidden sm:block">See your resume update in real-time</p>
              </div>
              <div className="p-4">
                <TemplateSelector />
              </div>
              <div className="overflow-y-auto max-h-[50vh] lg:max-h-[calc(100vh-16rem)]">
                <Resume />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Next.js, Tailwind CSS, and modern web technologies</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
