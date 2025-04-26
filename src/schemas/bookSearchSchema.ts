import { z } from "zod";

export type searchFormData = z.infer<typeof bookSearchSchema>;

export const bookSearchSchema = z.object({
  author: z.string(),
  publisher: z.string(),
  genre: z.string(),
});
