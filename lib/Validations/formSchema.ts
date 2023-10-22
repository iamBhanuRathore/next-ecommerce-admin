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
