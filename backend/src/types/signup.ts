import { z } from "zod";

export const signupBodySchema = z.object({
  email: z.string().min(3).max(100),
  password: z.string().min(3).max(100),
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
});
