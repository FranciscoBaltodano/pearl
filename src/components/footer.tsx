"use client";

import React from "react";
import LogoPearlSecond from "./logo-secondary";
import { Award, Shield } from "lucide-react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-gradient-to-br from-[#18428c] to-[#3f7ade] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <LogoPearlSecond className="w-24" />
                <span className="text-3xl font-bold">Pearl</span>
              </div>
              <p className="text-white/80 leading-relaxed text-lg">
                Revolucionando la forma en que planificas y vives tus viajes con
                el poder de la inteligencia artificial más avanzada del mundo.
              </p>
              {/* <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
                  (social) => (
                    <div
                      key={social}
                      className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer group"
                    >
                      <span className="text-white text-sm font-bold group-hover:scale-110 transition-transform">
                        {social[0]}
                      </span>
                    </div>
                  )
                )}
              </div> */}
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Plataforma</h3>
              <ul className="space-y-3">
                {[
                  "Cómo Funciona",
                  "Destinos",
                  "Precios",
                  "API Developers",
                  "Integraciones",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Soporte</h3>
              <ul className="space-y-3">
                {[
                  "Centro de Ayuda",
                  "Contacto",
                  "Blog de Viajes",
                  "Estado del Sistema",
                  "Comunidad",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Legal</h3>
              <ul className="space-y-3">
                {[
                  "Privacidad",
                  "Términos de Uso",
                  "Cookies",
                  "Seguridad",
                  "Compliance",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              © 2025 Pearl. Todos los derechos reservados. Hecho con ❤️ para
              viajeros.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-white/70">
                  Mejor App de Viajes 2024
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-white/70">
                  Certificado ISO 27001
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
