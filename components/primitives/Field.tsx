'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface FieldProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  control: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  autocomplete: string;
  spellcheck?: boolean;
  error?: string;
  helper?: string;
  disabled?: boolean;
  className?: string;
}

export function Field({
  id,
  name,
  label,
  required = false,
  control,
  value,
  onChange,
  placeholder,
  autocomplete,
  spellcheck,
  error,
  helper,
  disabled = false,
  className,
}: FieldProps) {
  const isError = Boolean(error);
  const describedById = isError ? `${id}-error` : helper ? `${id}-helper` : undefined;

  const controlClasses = cn(
    'w-full px-[12px] py-[10px] text-[14px] text-[var(--color-text)] bg-[var(--color-bg-elevated)]',
    'rounded-[var(--radius-md)] border border-[var(--color-border-strong)]',
    'placeholder:text-[var(--color-text-muted)] placeholder:not-italic',
    'transition-colors duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
    'hover:border-[var(--color-text-muted)]',
    'focus:border-[var(--color-text)] focus:outline-[var(--focus-ring-width)] focus:outline-[var(--color-focus)] focus:outline-offset-[var(--focus-ring-offset)]',
    isError && 'border-[var(--color-error)] bg-[var(--color-error-bg)] focus:border-[var(--color-error)]',
    disabled && 'cursor-not-allowed bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border)]',
    control === 'textarea' ? 'min-h-[144px] resize-y py-[12px]' : 'h-[40px]'
  );

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <label
        htmlFor={id}
        className="mb-[8px] text-[12px] font-medium tracking-[0.04em] text-[var(--color-text-secondary)] select-none"
      >
        {label}
        {required && (
          <span className="ml-1 text-[var(--color-text-muted)] font-normal">
            (required)
          </span>
        )}
      </label>

      {control === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autocomplete}
          spellCheck={spellcheck}
          disabled={disabled}
          aria-invalid={isError ? 'true' : undefined}
          aria-describedby={describedById}
          className={controlClasses}
        />
      ) : (
        <input
          id={id}
          type={control}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autocomplete}
          spellCheck={spellcheck}
          disabled={disabled}
          aria-invalid={isError ? 'true' : undefined}
          aria-describedby={describedById}
          className={controlClasses}
        />
      )}

      {isError ? (
        <p
          id={`${id}-error`}
          aria-live="polite"
          className="mt-[8px] text-[13px] text-[var(--color-error)] leading-[1.45]"
        >
          {error}
        </p>
      ) : helper ? (
        <p
          id={`${id}-helper`}
          className="mt-[8px] text-[13px] text-[var(--color-text-muted)] leading-[1.45]"
        >
          {helper}
        </p>
      ) : null}
    </div>
  );
}

export default Field;
