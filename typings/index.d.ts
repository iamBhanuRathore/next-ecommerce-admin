import * as z from "zod";

import {
  billingStoreFormSchema,
  categoryStoreFormSchema,
  settingStoreFormSchema,
} from "@/lib/Validations/formSchema";

export type SettingsFormValuesType = z.infer<typeof settingStoreFormSchema>;
export type BillingsFormValuesType = z.infer<typeof billingStoreFormSchema>;
export type CategoriesFormValuesType = z.infer<typeof categoryStoreFormSchema>;

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
