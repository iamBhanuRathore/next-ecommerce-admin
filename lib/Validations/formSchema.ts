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
