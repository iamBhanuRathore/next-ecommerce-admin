import * as z from "zod";

export const storeFormSchema = z.object({
  name: z.string().min(1),
});
