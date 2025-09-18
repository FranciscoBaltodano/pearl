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
import {  useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
// import { usePathname } from "@/i18n/navigation";


type SignUpFormType = z.infer<typeof SingUpFormSchema>

export default function FormSingUp() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const t = useTranslations('singup');
  // const locale = useLocale();
  // const pathname = usePathname();

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

        toast.success(t('success_message'))
        
        // Redirigir a login con el locale actual
        router.push('/')
        
      } catch (error) {
        console.error('Error en el registro:', error)
        toast.error(t('error_message'))
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-row w-full">
      <div className="w-1/2 hidden md:flex justify-center items-center">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full max-w-2xl pl-5"
        >
          <CarouselContent>
            <CarouselItem key={1}>
              <div className="p-1">
                <Card className="bg-blue-900">
                  <CardContent className="flex flex-col text-white aspect-square items-center justify-center p-6">
                    <div className="flex flex-row items-center gap-2 mb-2">
                      <span className="text-4xl">🛡️</span>
                      <h3 className="text-4xl font-bold">
                        Cobertura de Viajes
                      </h3>
                    </div>
                    <p className="text-lg text-center opacity-90">
                      Pólizas confiables para que viajes con total seguridad en
                      cualquier parte del mundo.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            <CarouselItem key={2}>
              <div className="p-1">
                <Card className="bg-red-700">
                  <CardContent className="flex flex-col text-white aspect-square items-center justify-center p-6">
                    <div className="flex flex-row items-center gap-2 mb-2">
                      <span className="text-4xl">📍</span>
                      <h3 className="text-4xl font-bold">
                        Recorridos Inteligentes
                      </h3>
                    </div>
                    <p className="text-lg text-center opacity-90">
                      Descubre sugerencias personalizadas de rutas y destinos,
                      optimizadas para tu viaje.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            <CarouselItem key={3}>
              <div className="p-1">
                <Card className="bg-green-700">
                  <CardContent className="flex flex-col text-white aspect-square items-center justify-center p-6">
                    <div className="flex flex-row items-center gap-2 mb-2">
                      <span className="text-4xl">💳</span>
                      <h3 className="text-4xl font-bold">
                        Beneficios Exclusivos
                      </h3>
                    </div>
                    <p className="text-lg text-center opacity-90">
                      Accede a descuentos, promociones y ventajas únicas por
                      estar afiliado a PEARL.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      </div>
      <div className="w-full md:w-1/2 relative flex items-center justify-center">
        <div className="w-full max-w-md p-8 z-10">
          <div className="flex flex-col items-center mb-4">
            <LogoPearl className="w-60" />
            <h1 className="text-4xl font-normal text-[#18428C] text-center mb-6">
              {t("title")} <span className="font-bold">Pearl</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="">
              <Label
                className="block text-md font-medium mb-1"
                htmlFor="nombre"
              >
                {t("name_label")}
              </Label>
              <Input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="nombre"
                placeholder={t("name_placeholder")}
                autoComplete="nombre"
                autoCorrect="off"
                disabled={isPending}
                {...register("nombre")}
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
                {t("email_label")}
              </Label>
              <Input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="correo"
                placeholder={t("email_placeholder")}
                autoComplete="correo"
                autoCorrect="off"
                disabled={isPending}
                {...register("correo")}
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
                {t("password_label")}
              </Label>
              <Input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                placeholder={t("password_placeholder")}
                autoComplete="password"
                autoCorrect="off"
                disabled={isPending}
                {...register("password")}
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
                {t("confirm_password_label")}
              </Label>
              <Input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="confirm"
                placeholder={t("confirm_password_placeholder")}
                autoComplete="confirm"
                autoCorrect="off"
                disabled={isPending}
                {...register("confirm")}
              />
              {errors.confirm && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.confirm?.message}
                </p>
              )}
            </div>
            <div className="m-10 flex flex-col gap-2">
              <div>
                <Button
                  disabled={isPending}
                  className="w-full bg-[#18428C] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#18428C]/90 transition duration-300 cursor-pointer"
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                  )}
                  {t("register_button")}
                </Button>
              </div>
              <div className="text-center text-sm text-gray-600">
                <span>{t("already_have_account")} </span>
              </div>
              <div>
                <Link href={`/login`} passHref>
                  <Button
                    className="w-full bg-[#18428C] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#18428C]/90 transition duration-300 cursor-pointer"
                    type="button"
                  >
                    {t("login_button")}
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}