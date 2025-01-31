export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  resumes: Resume[];
}

export interface ResumeSection<T = object> {
  id: string;
  label: string;
  icon: React.ComponentType;
  schema: z.ZodSchema<T>;
  defaultValue: T;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface AISuggestion {
  suggestion: string;
  reasoning: string;
  implementationExample?: string;
} 