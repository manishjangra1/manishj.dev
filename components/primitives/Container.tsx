import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps {
  well: 'wide' | 'page' | 'prose';
  children: React.ReactNode;
  as?: 'div' | 'section' | 'article' | 'nav' | 'header' | 'footer' | 'main';
  className?: string;
  id?: string;
}

const wellWidths = {
  wide: 'max-w-[1280px]',
  page: 'max-w-[1120px]',
  prose: 'max-w-[720px]',
};

export function Container({
  well,
  children,
  as: Component = 'div',
  className,
  id,
  ...props
}: ContainerProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      id={id}
      className={cn(
        'mx-auto w-full px-[20px] md:px-[32px] lg:px-[48px]',
        wellWidths[well],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;
