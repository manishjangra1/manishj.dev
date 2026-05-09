'use client';

import { useData } from '@/contexts/DataContext';

export const useProjects = () => {
  const { projects, isLoading, error } = useData();
  return { projects, isLoading, error };
};

export const useSkills = () => {
  const { skills, isLoading, error } = useData();
  
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return { skills, groupedSkills, isLoading, error };
};

export const useExperience = () => {
  const { experience, isLoading, error } = useData();
  return { experience, isLoading, error };
};

export const useBlog = () => {
  const { blogPosts, isLoading, error } = useData();
  return { blogPosts, isLoading, error };
};

export const useSettings = () => {
  const { settings, isLoading, error } = useData();
  return { settings, isLoading, error };
};
