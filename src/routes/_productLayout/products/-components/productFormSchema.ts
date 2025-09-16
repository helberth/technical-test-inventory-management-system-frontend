import * as z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const productFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be under 100 characters'),
  description: z.string().max(1000, 'Description must be under 1000 characters').optional(),
  price: z.coerce.number().min(0.01, 'Price must be at least $0.01').max(1000000, 'Price must be under $1,000,000'),
  quantity: z.coerce.number().int('Quantity must be an integer').min(0, 'Quantity cannot be negative').max(1000000, 'Quantity too large'),
  image: z
    .union([
      z.string().url().startsWith('https://').or(z.literal('')),
      z.instanceof(File).optional().nullable(),
      z.null(),
    ])
    .optional(),
  imageUrl: z.string().optional(),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'Max file size is 5MB.',
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
    }),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
