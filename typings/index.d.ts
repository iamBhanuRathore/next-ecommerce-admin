import * as z from "zod";

import {
  billingStoreFormSchema,
  settingStoreFormSchema,
} from "@/lib/Validations/formSchema";

export type SettingsFormValuesType = z.infer<typeof settingStoreFormSchema>;
export type BillingsFormValuesType = z.infer<typeof billingStoreFormSchema>;

export type BillboardCloumnType = {
  id: string;
  label: string;
  createdAt: string;
};
