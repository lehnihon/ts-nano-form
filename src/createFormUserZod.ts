import { z } from "zod";

export const userSchemaZod = z.object({
  name: z.string().trim().min(1),
  document: z.string().trim().min(1),
  data: z.array(
    z.object({
      image: z.string().trim().min(1),
    })
  ),
});
