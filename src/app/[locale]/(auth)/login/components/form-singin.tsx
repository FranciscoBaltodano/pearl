"use client";

import LogoPearl from "@/components/logo-pearl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginFormSchema } from "@/zod/login/login";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { signIn } from "@/api/server";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type LoginFormType = z.infer<typeof loginFormSchema>;

export default function FormSingIn() {
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setServerError("");
    
    startTransition(async () => {
      try {
        await signIn(data);
        
        toast.success("¡Inicio de sesión exitoso!");
        window.location.href = '/';
        
      } catch (error) {
        console.error("Login error:", error);
        
        let errorMessage = "Error al iniciar sesión";
        
        if (error instanceof Error) {
          if (error.message.includes("Invalid login credentials")) {
            errorMessage = "Credenciales inválidas. Verifica tu email y contraseña.";
          } else if (error.message.includes("Email not confirmed")) {
            errorMessage = "Por favor confirma tu email antes de iniciar sesión.";
          } else if (error.message.includes("Too many requests")) {
            errorMessage = "Demasiados intentos. Intenta de nuevo más tarde.";
          } else {
            errorMessage = error.message;
          }
        }
        
        setServerError(errorMessage);
        toast.error(errorMessage);
      }
    });
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
              Bienvenido a <span className="font-bold">Pearl</span>
            </h1>
          </div>
          
          {serverError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="w-full">
              <Label
                className="block text-md font-medium mb-1"
                htmlFor="correo"
              >
                Correo Electrónico
              </Label>
              <Input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Ingresa tu correo electrónico"
                disabled={isPending}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.email?.message}
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
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isPending}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="pb-4">
              <Link
                href="#"
                className="text-sm text-[#18428C] hover:underline float-right"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="m-10 flex flex-col gap-2">
              <div>
                <Button 
                  type="submit"
                  className="w-full bg-[#18428C] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#18428C]/90 transition duration-300 cursor-pointer disabled:opacity-50" 
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </div>
              <div className="text-center text-sm text-gray-600">
                <span>¿No tienes una cuenta? </span>
              </div>
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white text-[#18428C] font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer border border-[#18428C] hover:bg-gray-50"
                  disabled={isPending}
                >
                  <Link href="/signup">
                    Registrarse
                  </Link>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
