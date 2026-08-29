'use client';

import React, { useState } from 'react';
import { Field } from '@/components/primitives/Field';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/lib/utils';

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot field
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormProps {
  values?: ContactFormValues;
  errors?: Partial<Record<keyof ContactFormValues, string>>;
  status?: ContactFormStatus;
  onChange?: (values: ContactFormValues) => void;
  onSubmit?: (e: React.FormEvent) => void;
  fullWidthSubmit?: boolean;
  className?: string;
}

export function ContactForm({
  values: controlledValues,
  errors: controlledErrors,
  status: controlledStatus,
  onChange,
  onSubmit,
  fullWidthSubmit = false,
  className,
}: ContactFormProps) {
  const [internalValues, setInternalValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [internalStatus, setInternalStatus] = useState<ContactFormStatus>('idle');
  const [internalErrors, setInternalErrors] = useState<Record<string, string>>({});
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

  const values = controlledValues || internalValues;
  const status = controlledStatus || internalStatus;
  const errors = controlledErrors || internalErrors;

  const handleFieldChange = (field: keyof ContactFormValues, val: string) => {
    const nextValues = { ...values, [field]: val };
    if (errors[field]) {
      setInternalErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (onChange) {
      onChange(nextValues);
    } else {
      setInternalValues(nextValues);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
      return;
    }

    // Client-side field validation before submitting
    const newErrors: Record<string, string> = {};
    if (!values.name.trim()) newErrors.name = 'Name is required';
    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!values.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setInternalErrors(newErrors);
      return;
    }

    setInternalStatus('submitting');
    setServerErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) {
          setInternalErrors(data.fieldErrors);
        }
        setServerErrorMessage(data.error || 'Could not send message. Please try again or email directly.');
        setInternalStatus('error');
        return;
      }

      setInternalStatus('success');
      setInternalErrors({});
      setInternalValues({ name: '', email: '', message: '', website: '' });

      // Revert button text after 4s
      setTimeout(() => {
        setInternalStatus('idle');
      }, 4000);
    } catch (err) {
      console.error('Contact form submission error:', err);
      setServerErrorMessage('Could not send message. Email me directly.');
      setInternalStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn('flex flex-col gap-[20px]', className)}
    >
      {/* Honeypot field for bot spam trap (invisible to human users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          value={values.website || ''}
          onChange={(e) => handleFieldChange('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        id="contact-name"
        name="name"
        label="Name"
        required={true}
        control="text"
        value={values.name}
        onChange={(e) => handleFieldChange('name', e.target.value)}
        autocomplete="name"
        error={errors.name}
        placeholder="Your name"
        disabled={status === 'submitting'}
      />

      <Field
        id="contact-email"
        name="email"
        label="Email"
        required={true}
        control="email"
        value={values.email}
        onChange={(e) => handleFieldChange('email', e.target.value)}
        autocomplete="email"
        error={errors.email}
        placeholder="you@example.com"
        disabled={status === 'submitting'}
      />

      <Field
        id="contact-message"
        name="message"
        label="Message"
        required={true}
        control="textarea"
        value={values.message}
        onChange={(e) => handleFieldChange('message', e.target.value)}
        autocomplete="off"
        spellcheck={true}
        error={errors.message}
        placeholder="How can I help?"
        disabled={status === 'submitting'}
      />

      <div className="pt-[4px] flex flex-col items-start gap-[12px]">
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={status === 'submitting'}
          loadingText="Sending…"
          disabled={status === 'submitting'}
          className={cn(
            'w-full sm:w-auto',
            fullWidthSubmit && 'w-full'
          )}
        >
          {status === 'success' ? 'Sent' : 'Send'}
        </Button>

        {status === 'success' && (
          <p className="text-[14px] text-[var(--color-success)] font-medium">
            Message sent. I will reply by email.
          </p>
        )}

        {status === 'error' && (
          <p className="text-[14px] text-[var(--color-error)] font-medium">
            {serverErrorMessage || 'Could not send. Email me directly.'}
          </p>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
