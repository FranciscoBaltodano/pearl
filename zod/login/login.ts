import { z } from "zod";

export const loginFormSchema = z.object({
  correo: z
    .string({ message: '' })
    .min(1, 'El correo es obligatorio'),
  password: z.string({ message: '' }).min(6, { message: '' }).max(30, { message: '' })
});
