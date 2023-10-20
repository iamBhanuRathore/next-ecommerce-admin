import * as z from "zod";

import { settingStoreFormSchema } from "@/lib/Validations/formSchema";

export type SettingsFormValues = z.infer<typeof settingStoreFormSchema>;
