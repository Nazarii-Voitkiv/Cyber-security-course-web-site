import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must not exceed 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    )
});

export const contentUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must not exceed 200 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(10000, 'Content must not exceed 10000 characters'),
  isPublished: z.boolean()
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ContentUpdateInput = z.infer<typeof contentUpdateSchema>;
