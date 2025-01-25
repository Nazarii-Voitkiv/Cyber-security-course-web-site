import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters')
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
