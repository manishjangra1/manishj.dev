'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[]; // Legacy field
  link?: string; // Legacy field
  github?: string; // Legacy field
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  isCurrentlyWorking: boolean;
  order: number;
  content?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: string;
  proficiency: number;
  order: number;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean; // UI alias
  current?: boolean; // DB field
  description: string[];
  technologies?: string[];
  logo?: string;
  order: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export interface Settings {
  siteTitle: string;
  siteDescription: string;
  heroText: string;
  aboutText: string;
  aboutImage?: string;
  resumeUrl?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    portfolio?: string;
  };
}

interface DataContextType {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  blogPosts: BlogPost[];
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [projectsRes, skillsRes, experienceRes, blogRes, settingsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/experience'),
        fetch('/api/blog'),
        fetch('/api/settings'),
      ]);

      const [projectsData, skillsData, experienceData, blogData, settingsData] = await Promise.all([
        projectsRes.json(),
        skillsRes.json(),
        experienceRes.json(),
        blogRes.json(),
        settingsRes.json(),
      ]);

      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setSkills(Array.isArray(skillsData) ? skillsData : []);
      setExperience(Array.isArray(experienceData) ? experienceData : []);
      setBlogPosts(Array.isArray(blogData) ? blogData : []);
      setSettings(settingsData);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to sync data with the simulation engine.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider
      value={{
        projects,
        skills,
        experience,
        blogPosts,
        settings,
        isLoading,
        error,
        refreshData: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
