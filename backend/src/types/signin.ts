import { z } from "zod";

export const signinBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});
