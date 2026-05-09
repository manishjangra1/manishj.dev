'use client';

import React from 'react';
import DesktopIcon from './DesktopIcon';
import { Github, Linkedin, Twitter, Mail, FileText } from 'lucide-react';
import { useSettings } from '@/hooks/useData';

const DesktopIcons: React.FC = () => {
  const { settings } = useSettings();
  const constraintsRef = React.useRef(null);

  const icons = [
    {
      id: 'github',
      icon: <Github strokeWidth={1.5} />,
      label: 'GitHub',
      href: settings?.socialLinks?.github,
      color: 'text-zinc-400',
      top: 100,
      right: 24
    },
    {
      id: 'linkedin',
      icon: <Linkedin strokeWidth={1.5} />,
      label: 'LinkedIn',
      href: settings?.socialLinks?.linkedin,
      color: 'text-blue-400',
      top: 200,
      right: 24
    },
    {
      id: 'twitter',
      icon: <Twitter strokeWidth={1.5} />,
      label: 'Twitter',
      href: settings?.socialLinks?.twitter,
      color: 'text-sky-400',
      top: 300,
      right: 24
    },
    {
      id: 'email',
      icon: <Mail strokeWidth={1.5} />,
      label: 'Email',
      href: settings?.socialLinks?.email ? `mailto:${settings.socialLinks.email}` : undefined,
      color: 'text-rose-400',
      top: 400,
      right: 24
    },
    {
      id: 'resume',
      icon: <FileText strokeWidth={1.5} />,
      label: 'Resume',
      href: settings?.resumeUrl,
      color: 'text-emerald-400',
      top: 500,
      right: 24
    }
  ];

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {icons.map((icon) => (
        (icon.href || icon.id === 'resume') && (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            href={icon.href}
            color={icon.color}
            top={icon.top}
            right={icon.right}
          />
        )
      ))}
    </div>
  );
};

export default DesktopIcons;
