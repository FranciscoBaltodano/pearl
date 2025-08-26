"use client";

import LogoPearl from "@/components/logo-pearl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Link from "next/link";

export default function FormSingUp() {
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
          <form className="space-y-4">
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
                name="nombre"
                placeholder="Ingresa tu nombre completo"
              />
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
                name="correo"
                placeholder="Ingresa tu correo electrónico"
              />
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
                name="password"
                placeholder="Ingresa tu contraseña"
              />
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
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña nuevamente"
              />
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
                  className="w-full bg-[#18428C] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#18428C]/90 transition duration-300 cursor-pointer"
                  type="submit"
                >
                  Registrate
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
