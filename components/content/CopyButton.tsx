'use client';

import React, { useState } from 'react';
import { IconButton } from '@/components/primitives/IconButton';

export interface CopyButtonProps {
  value: string;
  onCopied?: () => void;
  className?: string;
}

export function CopyButton({
  value,
  onCopied,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (onCopied) {
        onCopied();
      }
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Ignore copy error in untrusted contexts
    }
  };

  return (
    <IconButton
      label={copied ? 'Copied to clipboard' : 'Copy email address'}
      icon={copied ? 'check' : 'copy'}
      size="sm"
      onPress={handleCopy}
      className={className}
    />
  );
}

export default CopyButton;
