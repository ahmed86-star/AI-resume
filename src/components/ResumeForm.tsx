'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo, Education, Experience, Project, Skill } from '@/types';
import { FiUser, FiBook, FiBriefcase, FiAward, FiCode, FiFileText, FiPlus, FiTrash2 } from 'react-icons/fi';
import AISuggestions from './AISuggestions';
import { debug as configDebug } from '@/config/debug';

// Update debug function parameters
const debug = (label: string, data: unknown, extra?: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEBUG] ${label}:`, JSON.parse(JSON.stringify(data)), extra || '');
  }
};

export default function ResumeForm() {
  // State management with debug logging
  const [activeSection, setActiveSection] = React.useState('personal');
  const [personalInfo, setPersonalInfo] = React.useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  });
  const [summary, setSummary] = React.useState('');
  const [experiences, setExperiences] = React.useState<Experience[]>([{
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    highlights: [''],
  }]);
  const [education, setEducation] = React.useState<Education[]>([{
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
  }]);
  const [skills, setSkills] = React.useState<Skill[]>([{
    category: '',
    items: [''],
  }]);
  const [projects, setProjects] = React.useState<Project[]>([{
    name: '',
    description: '',
    technologies: [''],
    link: '',
  }]);

  // Debug effect to log state changes
  React.useEffect(() => {
    debug('components', 'ResumeForm State Update', {
      activeSection,
      personalInfo,
      experiences: experiences.length,
      education: education.length
    });
  }, [activeSection, personalInfo, summary, experiences, education, skills, projects]);

  // Error boundary for state updates
  const safeSetState = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    try {
      setter(value);
    } catch (error) {
      console.error('State update error:', error);
      debug('Failed State Update', value);
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: FiUser },
    { id: 'summary', label: 'Professional Summary', icon: FiFileText },
    { id: 'experience', label: 'Experience', icon: FiBriefcase },
    { id: 'education', label: 'Education', icon: FiBook },
    { id: 'skills', label: 'Skills', icon: FiCode },
    { id: 'projects', label: 'Projects', icon: FiAward },
  ];

  const renderSectionContent = () => {
    try {
      switch (activeSection) {
        case 'personal':
          return (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                  <p className="text-gray-500 mt-1">Add your personal details</p>
                </div>
                <AISuggestions content="" section="personal" />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  {Object.entries(personalInfo).map(([key, value]) => {
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    const inputType = key === 'email' ? 'email' : key === 'phone' ? 'tel' : key === 'linkedin' || key === 'website' ? 'url' : 'text';
                    
                    return (
                      <div key={key}>
                        <label 
                          htmlFor={key}
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          {label}
                        </label>
                        <div className="relative">
                          <input
                            id={key}
                            type={inputType}
                            value={value}
                            onChange={(e) => {
                              debug(`Updating ${key}`, e.target.value);
                              safeSetState(setPersonalInfo, {
                                ...personalInfo,
                                [key]: e.target.value
                              });
                            }}
                            placeholder={`Enter your ${label.toLowerCase()}`}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
                          />
                          {key === 'fullName' && (
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                              <FiUser className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    All fields are required unless marked optional
                  </div>
                  <div className="flex space-x-4">
                    <button 
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors rounded-xl hover:bg-gray-50"
                      aria-label="Clear all fields"
                      onClick={() => {
                        debug('Clearing all fields', {});
                        safeSetState(setPersonalInfo, {
                          fullName: '',
                          email: '',
                          phone: '',
                          location: '',
                          linkedin: '',
                          website: '',
                        });
                      }}
                    >
                      Clear All
                    </button>
                    <button 
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                      aria-label="Save and continue to next section"
                      onClick={() => {
                        debug('Saving and continuing', personalInfo);
                        setActiveSection('summary');
                      }}
                    >
                      Save & Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'summary':
          return (
            <div className="space-y-6">
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Summary
                </label>
                <textarea
                  id="summary"
                  rows={6}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Write a compelling professional summary..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
              <AISuggestions content={summary} section="summary" />
            </div>
          );

        case 'experience':
          return (
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Experience {index + 1}</h3>
                    {experiences.length > 1 && (
                      <button
                        onClick={() => setExperiences(experiences.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-600"
                        aria-label={`Delete experience ${index + 1}`}
                        title={`Delete experience ${index + 1}`}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...experiences];
                          newExp[index].company = e.target.value;
                          setExperiences(newExp);
                        }}
                        placeholder="e.g., Google"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => {
                          const newExp = [...experiences];
                          newExp[index].position = e.target.value;
                          setExperiences(newExp);
                        }}
                        placeholder="e.g., Senior Software Engineer"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExp = [...experiences];
                          newExp[index].startDate = e.target.value;
                          setExperiences(newExp);
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => {
                          const newExp = [...experiences];
                          newExp[index].endDate = e.target.value;
                          setExperiences(newExp);
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Achievements
                      </label>
                      {exp.highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={highlight}
                            onChange={(e) => {
                              const newExp = [...experiences];
                              newExp[index].highlights[hIndex] = e.target.value;
                              setExperiences(newExp);
                            }}
                            placeholder="e.g., Led a team of 5 developers..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          />
                          <button
                            onClick={() => {
                              const newExp = [...experiences];
                              newExp[index].highlights = exp.highlights.filter((_, i) => i !== hIndex);
                              setExperiences(newExp);
                            }}
                            className="text-red-500 hover:text-red-600 px-2"
                            aria-label="Remove achievement"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newExp = [...experiences];
                          newExp[index].highlights.push('');
                          setExperiences(newExp);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <FiPlus className="w-4 h-4" /> Add Achievement
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setExperiences([...experiences, {
                  company: '',
                  position: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  highlights: [''],
                }])}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Experience</span>
              </button>
            </div>
          );

        case 'education':
          return (
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Education {index + 1}</h3>
                    {education.length > 1 && (
                      <button
                        onClick={() => setEducation(education.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-600"
                        aria-label={`Delete education ${index + 1}`}
                        title={`Delete education ${index + 1}`}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        School/University
                      </label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => {
                          const newEdu = [...education];
                          newEdu[index].school = e.target.value;
                          setEducation(newEdu);
                        }}
                        placeholder="e.g., Harvard University"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...education];
                          newEdu[index].degree = e.target.value;
                          setEducation(newEdu);
                        }}
                        placeholder="e.g., Bachelor of Science"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => {
                          const newEdu = [...education];
                          newEdu[index].field = e.target.value;
                          setEducation(newEdu);
                        }}
                        placeholder="e.g., Computer Science"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => {
                          const newEdu = [...education];
                          newEdu[index].gpa = e.target.value;
                          setEducation(newEdu);
                        }}
                        placeholder="e.g., 3.8/4.0"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => {
                          const newEdu = [...education];
                          newEdu[index].startDate = e.target.value;
                          setEducation(newEdu);
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date (or Expected)
                      </label>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => {
                          const newEdu = [...education];
                          newEdu[index].endDate = e.target.value;
                          setEducation(newEdu);
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setEducation([...education, {
                  school: '',
                  degree: '',
                  field: '',
                  startDate: '',
                  endDate: '',
                  gpa: '',
                  description: '',
                }])}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Education</span>
              </button>
            </div>
          );

        case 'skills':
          return (
            <div className="space-y-8">
              {skills.map((skillGroup, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Skill Category {index + 1}</h3>
                    {skills.length > 1 && (
                      <button
                        onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-600"
                        aria-label={`Delete skill category ${index + 1}`}
                        title={`Delete skill category ${index + 1}`}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {/* Add skill fields */}
                </div>
              ))}
              <button
                onClick={() => setSkills([...skills, { category: '', items: [''] }])}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Skill Category</span>
              </button>
            </div>
          );

        case 'projects':
          return (
            <div className="space-y-8">
              {projects.map((project, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Project {index + 1}</h3>
                    {projects.length > 1 && (
                      <button
                        onClick={() => setProjects(projects.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-600"
                        aria-label={`Delete project ${index + 1}`}
                        title={`Delete project ${index + 1}`}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {/* Add project fields */}
                </div>
              ))}
              <button
                onClick={() => setProjects([...projects, {
                  name: '',
                  description: '',
                  technologies: [''],
                  link: '',
                }])}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Project</span>
              </button>
            </div>
          );

        default:
          console.error('Unknown section:', activeSection);
          return null;
      }
    } catch (error) {
      console.error('Error in renderSectionContent:', error);
      debug('Render Error', error);
      return <div>An error occurred while rendering this section. Please try again.</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
            <div className="p-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
              <h2 className="text-xl font-bold">Resume Builder</h2>
              <p className="text-blue-100 text-sm mt-1">Build your professional resume</p>
            </div>
            <div className="p-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      debug('Switching to section:', section.id);
                      setActiveSection(section.id);
                    }}
                    aria-label={`Switch to ${section.label} section`}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 mb-2 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 shadow-md'
                        : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      activeSection === section.id
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{section.label}</span>
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="activePill"
                        className="ml-auto w-2 h-2 rounded-full bg-blue-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-9">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {renderSectionContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 