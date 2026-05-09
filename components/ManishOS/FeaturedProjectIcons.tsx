'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';
import { useProjects } from '@/hooks/useData';
import DesktopIcon from './DesktopIcon';

const FeaturedProjectIcons: React.FC = () => {
  const { openApp, setSelectedProjectId } = useOS();
  const { projects } = useProjects();

  const featuredProjects = projects.filter(p => p.featured);

  if (featuredProjects.length === 0) return null;

  const handleClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    openApp('projectDetail');
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {featuredProjects.map((project, index) => (
        <DesktopIcon
          key={project._id}
          label={project.title}
          image={project.image}
          showStar={true}
          onClick={() => handleClick(project._id)}
          top={100 + index * 120}
          right={144} // Aligned with social media icons column
        />
      ))}
    </div>
  );
};

export default FeaturedProjectIcons;
