import * as z from "zod";

export const storeFormSchema = z.object({
  name: z.string().min(1),
});

export const settingStoreFormSchema = z.object({
  name: z.string().min(1),
});
export const billingStoreFormSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});
export const categoryStoreFormSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});
export const sizeStoreFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
export const colorStoreFormSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(4)
    .regex(/^#/, { message: "String must be a Valid hex Code" }),
});
export const productStoreFormSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string().min(1) }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});
