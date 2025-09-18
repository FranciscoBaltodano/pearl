import { z } from "zod";

export const SingUpFormSchema = z.object({
  correo: z
    .string({ message: 'El correo es requerido' })
    .min(1, 'El correo es obligatorio')
    .email('Debe ser un correo válido'),
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido: z.string().optional(),
  dni: z.string().optional(),
  fecha_nacimiento: z.string().optional(),
  telefono: z.string().optional(),
  genero: z.string().optional(),
  avatar_url: z.string().optional(),
  password: z
    .string({ message: 'La contraseña es requerida' })
    .min(1, 'La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirm: z
    .string({ message: 'La confirmación es requerida' })
    .min(1, 'La confirmación de la contraseña es obligatoria')
}).refine((data) => data.password === data.confirm, {
  message: "Las contraseñas no coinciden",
  path: ["confirm"], 
});
