"use client";

import LogoPearl from "@/components/logo-pearl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SingUpFormSchema } from "@/zod/singup/singup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { setRoleUser, updateUsuario, verifyUser } from "@/api/signup";
import { signUpWithEmailAndPassword } from "@/api/server";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type SignUpFormType = z.infer<typeof SingUpFormSchema>

export default function FormSingUp() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SingUpFormSchema),
    defaultValues: {
      correo: '',
      nombre: '',
      apellido: '',
      dni: '',
      fecha_nacimiento: '',
      telefono: '',
      password: '', 
      confirm: ''
    }
  })

 async function onSubmit(data: SignUpFormType) {
    startTransition(async () => {
      try {
        const { error: verifyError } = await verifyUser({ correo: data.correo })
        if (verifyError) {
          console.error('❌ Error verificando usuario:', verifyError)
          toast.error(verifyError.message)
          return
        }

        const { userCreate, errorUserCreate } = await signUpWithEmailAndPassword({
          email: data.correo,
          password: data.password,
          confirm: data.confirm
        })
        
        if (errorUserCreate) {
          console.error('❌ Error en Auth:', errorUserCreate)
          toast.error(errorUserCreate.message)
          return
        }

        if (!userCreate?.user?.id) {
          console.error('❌ No se obtuvo ID del usuario')
          toast.error('Error al crear usuario en la autenticación')
          return
        }

        console.log('✅ Usuario creado en Auth:', userCreate)
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (data.nombre || data.apellido || data.telefono) {
          const {  errorUsuario } = await updateUsuario({ 
            id: userCreate.user.id,
            data: {
              nombre: data.nombre
              // apellido: data.apellido,
              // telefono: data.telefono
            }
          })

          if (errorUsuario) {
            console.error('Error actualizando usuario:', errorUsuario)
            toast.warning('Usuario creado, pero hubo un problema actualizando los datos adicionales')
          }
        }

        const { data: setRole, error: errorSetRole } = await setRoleUser({
          id: userCreate.user.id,
          rol: 2
        })

        if (errorSetRole) {
          console.error('Error asignando rol:', errorSetRole)
          toast.error('Usuario creado, pero hubo un error asignando el rol')
          return
        }

        if (!setRole) {
          toast.error('Error al asignar el rol')
          return
        }

        toast.success('Usuario creado exitosamente. Revisa tu correo para confirmar tu cuenta.')
        
        // redirigir a login 
        router.push('/login')
        
      } catch (error) {
        console.error('Error en el registro:', error)
        toast.error('Error inesperado durante el registro')
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-row w-full">
      <div className="w-1/2 hidden md:flex">imagen de fondo</div>
      {/* <div className="hidden md:flex w-1/2 bg-cover bg-gray-900 bg-opacity-50 bg-center bg-[url('https://kcjyuqaumdfgijiinuoa.supabase.co/storage/v1/object/public/images/landing/sing_in.webp')]"></div> */}

      <div className="w-full md:w-1/2 relative flex items-center justify-center">
        <div className="w-full max-w-md p-8 z-10">
          <div className="flex flex-col items-center mb-4">
            <LogoPearl className="w-60" />
            <h1 className="text-4xl font-normal text-[#18428C] text-center mb-6">
              Registrate en <span className="font-bold">Pearl</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="">
              <Label
                className="block text-md font-medium mb-1"
                htmlFor="nombre"
              >
                Nombre
              </Label>
              <Input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="nombre"
                placeholder="Ingresa tu nombre completo"
                autoComplete="nombre"
                autoCorrect="off"
                disabled={isPending}
                {...register('nombre')}
              />
              {errors.nombre && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.nombre?.message}
                </p>
              )}
            </div>
            <div className="">
              <Label
                className="block text-md font-medium mb-1"
                htmlFor="correo"
              >
                Correo Electrónico
              </Label>
              <Input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="correo"
                placeholder="Ingresa tu correo electrónico"
                autoComplete="correo"
                autoCorrect="off"
                disabled={isPending}
                {...register('correo')}
              />
              {errors.correo && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.correo?.message}
                </p>
              )}
            </div>
            <div>
              <Label
                className="block text-md font-medium mb-1"
                htmlFor="password"
              >
                Contraseña
              </Label>
              <Input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                autoComplete="password"
                autoCorrect="off"
                disabled={isPending}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div>
              <Label
                className="block text-md font-medium mb-1"
                htmlFor="password"
              >
                Confirmar Contraseña
              </Label>
              <Input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="confirm"
                placeholder="Ingresa tu contraseña nuevamente"
                autoComplete="confirm"
                autoCorrect="off"
                disabled={isPending}
                {...register('confirm')}
              />
              {errors.confirm && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.confirm?.message}
                </p>
              )}
            </div>
            {/* <div className="pb-4">
                <a
                    href="#"
                    className="text-sm text-[#18428C] hover:underline float-right"
                >
                    ¿Olvidaste tu contraseña?
                </a>
            </div> */}
            <div className="m-10 flex flex-col gap-2">
              <div>
                <Button
                  disabled={isPending}
                  className="w-full bg-[#18428C] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#18428C]/90 transition duration-300 cursor-pointer"

                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                  )}
                  Registrarse
                </Button>
              </div>
              <div className="text-center text-sm text-gray-600">
                <span>¿Ya tienes una cuenta? </span>
              </div>
              <div>
                <Button
                  className="w-full bg-[#18428C] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#18428C]/90 transition duration-300 cursor-pointer"
                  type="submit"
                >
                  Iniciar Sesion
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
