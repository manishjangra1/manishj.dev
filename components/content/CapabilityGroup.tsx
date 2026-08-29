import React from 'react';
import { cn } from '@/lib/utils';

export interface CapabilityGroupProps {
  label: string;
  items: string[];
  index?: number;
  className?: string;
}

export function CapabilityGroup({
  label,
  items,
  index = 0,
  className,
}: CapabilityGroupProps) {
  const indexStr = String(index + 1).padStart(2, '0');

  return (
    <div
      className={cn(
        'bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none',
        'hover:border-[var(--color-border-strong)] hover:shadow-sm transition-all duration-150',
        'flex flex-col justify-between h-full group',
        className
      )}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider">
              {indexStr} //
            </span>
            <h3 className="font-mono text-[12px] font-bold tracking-[0.12em] uppercase text-[var(--color-text)]">
              {label}
            </h3>
          </div>
          <span className="font-mono text-[11px] text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-0.5 border border-[var(--color-border)] rounded-none">
            {items.length} tools
          </span>
        </div>

        {/* Skill Items List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
          {items.map((item) => (
            <div
              key={item}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 bg-[var(--color-surface)]/40',
                'border border-[var(--color-border)]/60 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]',
                'rounded-none transition-all duration-150'
              )}
            >
              <span className="w-1.5 h-1.5 bg-[var(--color-text-muted)] group-hover:bg-[var(--color-text)] shrink-0 transition-colors" />
              <span className="text-[13px] font-medium text-[var(--color-text)] truncate">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CapabilityGroup;

