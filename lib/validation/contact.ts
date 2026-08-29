import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(80, 'Name must be 80 characters or less'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be 100 characters or less'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(5000, 'Message must be 5000 characters or less'),
  website: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
