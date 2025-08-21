'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTemplate } from './redux/resumeSlice';
import { Download, Loader2 } from 'lucide-react';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import Template4 from './templates/Template4';

const ResumePrview = () => {
  const {
    personalDetails,
    education,
    skills,
    employmentHistory,
    languages,
    professionalSummary,
    currentTemplate,
  } = useSelector((state) => state.resume);

  const dispatch = useDispatch();
  const [isGenerating, setIsGenerating] = useState(false);

  const resumeData = {
    personalDetails,
    education,
    skills,
    employmentHistory,
    languages,
    professionalSummary,
  };

  const renderTemplate = () => {
    switch (currentTemplate) {
      case 1:
        return <Template1 data={resumeData} />;
      case 2:
        return <Template2 data={resumeData} />;
      case 3:
        return <Template3 data={resumeData} />;
      case 4:
        return <Template4 data={resumeData} />;
      default:
        return <Template1 data={resumeData} />;
    }
  };

  const getCurrentTemplateId = () => {
    return `resume-template-${currentTemplate}`;
  };

  const handleDownload = async () => {
    console.log(`Downloading Template ${currentTemplate} PDF`);
    setIsGenerating(true);
    
    // Find the download button more specifically
    const downloadBtn = document.querySelector('[data-download-btn]');
    const originalText = downloadBtn?.textContent;
    
    if (downloadBtn) {
      downloadBtn.textContent = 'Generating PDF...';
      downloadBtn.disabled = true;
    }
    
    // Debug: Check what templates are available
    const allTemplates = document.querySelectorAll('[id*="resume-template"]');
    console.log('All available templates:', Array.from(allTemplates).map(t => ({ id: t.id, visible: t.offsetHeight > 0 })));
    
    // Verify the selected template element exists
    const templateElement = document.getElementById(getCurrentTemplateId());
    if (!templateElement) {
      alert(`Template ${currentTemplate} not found. Available templates: ${Array.from(allTemplates).map(t => t.id).join(', ')}`);
      setIsGenerating(false);
      if (downloadBtn && originalText) {
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
      }
      return;
    }
    
    try {
      // Method 1: Try html2canvas + jsPDF
      await generatePDFWithCanvas();
      
    } catch (canvasError) {
      console.warn('Canvas method failed, trying fallback:', canvasError);
      
      try {
        // Method 2: Fallback to text-based PDF
        await generateTextPDF();
        
      } catch (fallbackError) {
        console.error('All PDF methods failed:', fallbackError);
        
        // Method 3: Simple browser print as last resort
        try {
          await generateSimplePDF();
        } catch (simpleError) {
          console.error('Simple PDF method also failed:', simpleError);
          alert('PDF generation failed. Please check your browser console for details and try refreshing the page.');
        }
      }
    } finally {
      // Always restore button state
      setIsGenerating(false);
      if (downloadBtn && originalText) {
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
      }
    }
  };
  
  const generatePDFWithCanvas = async () => {
    // Skip html2canvas and use the text-based PDF directly since canvas is failing
    console.log('Canvas method consistently failing, using text-based PDF generation...');
    throw new Error('Canvas method skipped - using text fallback');
  };
  
  const generateTextPDF = async () => {
    const jsPDFModule = await import('jspdf');
    const jsPDF = jsPDFModule.default;
    
    const doc = new jsPDF('p', 'mm', 'a4');
    let yPosition = 15;
    const lineHeight = 5.5;
    const margin = 15;
    const pageHeight = 285; // Reduced to force single page
    
    // Template-specific color schemes
    const templateColors = {
      1: { primary: [41, 98, 255], secondary: [100, 116, 139], accent: [239, 246, 255] },
      2: { primary: [29, 78, 216], secondary: [55, 65, 81], accent: [219, 234, 254] },
      3: { primary: [5, 150, 105], secondary: [55, 65, 81], accent: [209, 250, 229] },
      4: { primary: [75, 85, 99], secondary: [107, 114, 128], accent: [249, 250, 251] }
    };
    
    const colors = templateColors[currentTemplate] || templateColors[1];
    
    // Optimized space management - no new pages, compress content instead
    const checkSpace = (requiredSpace = lineHeight) => {
      if (yPosition + requiredSpace > pageHeight) {
        // Compress spacing instead of adding new page
        yPosition = Math.min(yPosition, pageHeight - requiredSpace - 5);
      }
    };
    
    // Template-specific header styling
    const name = `${personalDetails.firstName} ${personalDetails.lastName}`.trim();
    
    // Compact header for all templates
    if (name) {
      if (currentTemplate === 1) {
        // Template 1: Compact centered header
        doc.setFillColor(...colors.accent);
        doc.rect(0, yPosition - 3, 210, 18, 'F');
        doc.setTextColor(...colors.primary);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text(name, 105, yPosition + 6, { align: 'center' });
        yPosition += 12;
        
        if (personalDetails.jobTitle) {
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(personalDetails.jobTitle.toUpperCase(), 105, yPosition, { align: 'center' });
          yPosition += 8;
        }
      } else if (currentTemplate === 2 || currentTemplate === 3) {
        // Templates 2 & 3: Compact colored header
        doc.setFillColor(...colors.primary);
        doc.rect(0, yPosition - 3, 210, 18, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text(name, margin, yPosition + 6);
        yPosition += 12;
        
        if (personalDetails.jobTitle) {
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          doc.text(personalDetails.jobTitle, margin, yPosition);
          yPosition += 8;
        }
      } else {
        // Template 4: Minimalist
        doc.setTextColor(...colors.primary);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'light');
        const nameParts = name.split(' ');
        if (nameParts.length > 1) {
          doc.text(nameParts[0], margin, yPosition);
          doc.setFont('helvetica', 'bold');
          doc.text(nameParts.slice(1).join(' '), margin + doc.getTextWidth(nameParts[0] + ' '), yPosition);
        } else {
          doc.text(name, margin, yPosition);
        }
        yPosition += 8;
        
        if (personalDetails.jobTitle) {
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(...colors.secondary);
          doc.text(personalDetails.jobTitle.toUpperCase(), margin, yPosition);
          yPosition += 6;
        }
      }
    }
    
    // Compact contact info
    if (personalDetails.email || personalDetails.phone) {
      checkSpace(6);
      doc.setTextColor(...colors.secondary);
      doc.setFontSize(9);
      doc.text(`${personalDetails.email} | ${personalDetails.phone}`, margin, yPosition);
      yPosition += 8;
    }
    
    // Compact section header function
    const addSectionHeader = (title) => {
      checkSpace(8);
      doc.setTextColor(...colors.primary);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin, yPosition);
      
      if (currentTemplate !== 4) {
        doc.setDrawColor(...colors.primary);
        doc.setLineWidth(0.3);
        doc.line(margin, yPosition + 1, 190, yPosition + 1);
      }
      yPosition += 6;
    };
    
    // Professional Summary
    if (professionalSummary && professionalSummary.trim()) {
      addSectionHeader(currentTemplate === 1 ? 'PROFESSIONAL SUMMARY' : 'About Me');
      
      doc.setTextColor(...colors.secondary);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const summaryLines = doc.splitTextToSize(professionalSummary, 170);
      summaryLines.forEach(line => {
        checkSpace();
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      yPosition += 4;
    }
    
    // Education (Full Width)
    if (education && education.length > 0 && education[0].school) {
      addSectionHeader('EDUCATION');
      
      education.forEach(edu => {
        if (edu.school) {
          checkSpace(12);
          doc.setTextColor(...colors.primary);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          const eduText = doc.splitTextToSize(`${edu.degree}${edu.fieldOfStudy ? ' IN ' + edu.fieldOfStudy : ''}`, 170);
          eduText.forEach(line => {
            doc.text(line, margin, yPosition);
            yPosition += 4;
          });
          
          doc.setTextColor(...colors.secondary);
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          const schoolText = doc.splitTextToSize(edu.school, 170);
          schoolText.forEach(line => {
            doc.text(line, margin, yPosition);
            yPosition += 4;
          });
          
          doc.setFontSize(8);
          doc.text(`${edu.startDate} - ${edu.endDate}`, margin, yPosition);
          yPosition += 6;
        }
      });
      yPosition += 3;
    }
    
    // Skills (Full Width after Education)
    if (skills && skills.length > 0 && skills[0].skill) {
      addSectionHeader('SKILLS');
      
      doc.setTextColor(...colors.secondary);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      // Professional multi-column layout for skills
      const skillsPerRow = 3;
      let currentCol = 0;
      const colWidth = 56;
      
      skills.forEach((skill, index) => {
        if (skill.skill) {
          checkSpace(5);
          doc.text(`• ${skill.skill}`, margin + (currentCol * colWidth), yPosition);
          
          currentCol++;
          if (currentCol >= skillsPerRow) {
            currentCol = 0;
            yPosition += 5;
          }
        }
      });
      if (currentCol > 0) yPosition += 5;
      yPosition += 3;
    }
    
    // Employment History (Full Width)
    if (employmentHistory && employmentHistory.length > 0 && employmentHistory[0].company) {
      addSectionHeader(currentTemplate === 1 ? 'EMPLOYMENT HISTORY' : 'Experience');
      
      employmentHistory.forEach(job => {
        if (job.company) {
          checkSpace(15);
          doc.setTextColor(...colors.primary);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(job.position, margin, yPosition);
          yPosition += 4;
          
          doc.setTextColor(...colors.secondary);
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.text(`${job.company} | ${job.startDate} - ${job.endDate}`, margin, yPosition);
          yPosition += 4;
          
          if (job.description && job.description.trim()) {
            const descLines = doc.splitTextToSize(job.description, 170);
            descLines.slice(0, 2).forEach(line => { // Limit to 2 lines
              checkSpace();
              doc.text(line, margin, yPosition);
              yPosition += lineHeight;
            });
          }
          yPosition += 3;
        }
      });
    }
    
    // Languages (Professional format)
    if (languages && languages.length > 0 && languages[0].language) {
      addSectionHeader('LANGUAGES');
      
      doc.setTextColor(...colors.secondary);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      // Professional multi-column layout for languages
      const langsPerRow = 2;
      let currentCol = 0;
      const colWidth = 85;
      
      languages.forEach((lang, index) => {
        if (lang.language) {
          checkSpace(5);
          const langText = `• ${lang.language} - ${lang.proficiency}`;
          doc.text(langText, margin + (currentCol * colWidth), yPosition);
          
          currentCol++;
          if (currentCol >= langsPerRow) {
            currentCol = 0;
            yPosition += 5;
          }
        }
      });
      if (currentCol > 0) yPosition += 5;
    }
    
    const filename = name ? `${name.replace(/\s+/g, '_')}_Template${currentTemplate}_CV.pdf` : `Template${currentTemplate}_CV.pdf`;
    doc.save(filename);
    console.log(`Template ${currentTemplate} PDF generated with unique styling`);
  };

  const generateSimplePDF = async () => {
    const jsPDFModule = await import('jspdf');
    const jsPDF = jsPDFModule.default;
    
    const templateId = getCurrentTemplateId();
    const element = document.getElementById(templateId);
    
    if (!element) {
      throw new Error('Template element not found for simple PDF generation');
    }
    
    // Get all text content from the template
    const textContent = element.innerText || element.textContent || '';
    
    if (!textContent.trim()) {
      throw new Error('No text content found in template');
    }
    
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const lineHeight = 7;
    let yPosition = margin;
    
    // Split content into lines
    const lines = textContent.split('\n').filter(line => line.trim());
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    lines.forEach((line, index) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      const trimmedLine = line.trim();
      if (trimmedLine) {
        // Split long lines
        const splitLines = doc.splitTextToSize(trimmedLine, pageWidth - (2 * margin));
        splitLines.forEach(splitLine => {
          if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(splitLine, margin, yPosition);
          yPosition += lineHeight;
        });
      }
    });
    
    const name = `${personalDetails.firstName} ${personalDetails.lastName}`.trim();
    const filename = name ? `${name.replace(/\s+/g, '_')}_Simple_CV.pdf` : 'Simple_CV.pdf';
    
    doc.save(filename);
    console.log('Simple PDF generated successfully');
  };

  return (
    <div className="h-full w-full flex flex-col items-center p-4 bg-gray-100 overflow-y-auto">
      <div className="flex justify-around w-full max-w-4xl mb-4">
        <button
          onClick={() => dispatch(setCurrentTemplate(1))}
          className={`px-4 py-2 rounded-lg ${currentTemplate === 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
        >
          Template 1
        </button>
        <button
          onClick={() => dispatch(setCurrentTemplate(2))}
          className={`px-4 py-2 rounded-lg ${currentTemplate === 2 ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
        >
          Template 2
        </button>
        <button
          onClick={() => dispatch(setCurrentTemplate(3))}
          className={`px-4 py-2 rounded-lg ${currentTemplate === 3 ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
        >
          Template 3
        </button>
        <button
          onClick={() => dispatch(setCurrentTemplate(4))}
          className={`px-4 py-2 rounded-lg ${currentTemplate === 4 ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
        >
          Template 4
        </button>
      </div>
      <div id="resume-container" className="w-full max-w-4xl">
        {renderTemplate()}
      </div>
      <button
        onClick={handleDownload}
        data-download-btn
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Download PDF
      </button>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-container, #resume-container * {
            visibility: visible;
          }
          #resume-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          #resume h4 { font-size: 14px !important; margin-bottom: 4px !important; }
          #resume p { font-size: 12px !important; margin-bottom: 4px !important; }
          #resume section { margin-bottom: 16px !important; }
        }
      `}</style>
    </div>
  );
};

export default ResumePrview;
