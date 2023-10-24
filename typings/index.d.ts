import * as z from "zod";

import {
  billingStoreFormSchema,
  categoryStoreFormSchema,
  colorStoreFormSchema,
  settingStoreFormSchema,
  sizeStoreFormSchema,
} from "@/lib/Validations/formSchema";

export type SettingsFormValuesType = z.infer<typeof settingStoreFormSchema>;
export type BillingsFormValuesType = z.infer<typeof billingStoreFormSchema>;
export type CategoriesFormValuesType = z.infer<typeof categoryStoreFormSchema>;
export type SizesFormValuesType = z.infer<typeof sizeStoreFormSchema>;
export type ColorsFormValuesType = z.infer<typeof colorStoreFormSchema>;

export type BillboardCloumnType = {
  id: string;
  label: string;
  createdAt: string;
};
export type CategoryCloumnType = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};
export type SizeCloumnType = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};
export type ColorCloumnType = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};
export type ProductCloumnType = {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
  size: string;
  color: string;
  createdAt: string;
};
