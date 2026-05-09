'use client';

import React from 'react';
import DesktopIcon from './DesktopIcon';
import { Github, Linkedin, Twitter, Mail, FileText } from 'lucide-react';
import { useSettings } from '@/hooks/useData';

const DesktopIcons: React.FC = () => {
  const { settings } = useSettings();

  const icons = [
    {
      id: 'github',
      icon: <Github strokeWidth={1.5} />,
      label: 'GitHub',
      href: settings?.socialLinks?.github,
      color: 'text-zinc-400'
    },
    {
      id: 'linkedin',
      icon: <Linkedin strokeWidth={1.5} />,
      label: 'LinkedIn',
      href: settings?.socialLinks?.linkedin,
      color: 'text-blue-400'
    },
    {
      id: 'twitter',
      icon: <Twitter strokeWidth={1.5} />,
      label: 'Twitter',
      href: settings?.socialLinks?.twitter,
      color: 'text-sky-400'
    },
    {
      id: 'email',
      icon: <Mail strokeWidth={1.5} />,
      label: 'Email',
      href: settings?.socialLinks?.email ? `mailto:${settings.socialLinks.email}` : undefined,
      color: 'text-rose-400'
    },
    {
      id: 'resume',
      icon: <FileText strokeWidth={1.5} />,
      label: 'Resume',
      href: settings?.resumeUrl,
      color: 'text-emerald-400'
    }
  ];

  return (
    <div className="absolute top-12 right-6 z-10 flex flex-col gap-6 items-end">
      {icons.map((icon) => (
        (icon.href || icon.id === 'resume') && (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            href={icon.href}
            color={icon.color}
          />
        )
      ))}
    </div>
  );
};

export default DesktopIcons;
