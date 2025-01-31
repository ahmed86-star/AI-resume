import { create } from 'zustand';
import { Resume } from '@/types';

interface ResumeStore {
  currentResume: Resume | null;
  resumes: Resume[];
  setCurrentResume: (resume: Resume) => void;
  addResume: (resume: Resume) => void;
  updateResume: (resume: Resume) => void;
  deleteResume: (id: string) => void;
  saveResume: (resumeData: Resume) => Promise<void>;
  loadResumes: () => Promise<void>;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  currentResume: null,
  resumes: [],
  setCurrentResume: (resume) => set({ currentResume: resume }),
  addResume: (resume) =>
    set((state) => ({ resumes: [...state.resumes, resume] })),
  updateResume: (resume) =>
    set((state) => ({
      resumes: state.resumes.map((r) => (r.id === resume.id ? resume : r)),
    })),
  deleteResume: (id) =>
    set((state) => ({
      resumes: state.resumes.filter((r) => r.id !== id),
    })),
  saveResume: async (resumeData) => {
    const response = await fetch('/api/resumes/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });
    
    if (response.ok) {
      const newResume = await response.json();
      set((state) => ({
        resumes: [...state.resumes, newResume],
        currentResume: newResume,
      }));
    }
  },
  loadResumes: async () => {
    const response = await fetch('/api/resumes');
    const resumes = await response.json();
    set({ resumes });
  },
})); 