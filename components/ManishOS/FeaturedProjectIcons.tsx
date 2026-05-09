'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';
import { useProjects } from '@/hooks/useData';
import DesktopIcon from './DesktopIcon';

const FeaturedProjectIcons: React.FC = () => {
  const { openApp, setSelectedProjectId, isMobile } = useOS();
  const { projects } = useProjects();

  const featuredProjects = projects.filter(p => p.featured);

  if (featuredProjects.length === 0) return null;

  const handleClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    openApp('projectDetail');
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {featuredProjects.map((project, index) => {
        // On mobile, align from bottom to top using 'bottom' property
        const pos = isMobile ? {
          bottom: 120 + (featuredProjects.length - 1 - index) * 75,
          right: 75
        } : {
          top: 100 + index * 120,
          right: 144
        };

        return (
          <DesktopIcon
            key={project._id}
            label={project.title}
            image={project.image}
            showStar={true}
            onClick={() => handleClick(project._id)}
            {...pos}
          />
        );
      })}
    </div>
  );
};

export default FeaturedProjectIcons;
