'use client'

import { Brain, Globe, Shield, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Beneficios() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "IA Avanzada",
      description:
        "Algoritmos de machine learning que aprenden de tus preferencias para sugerencias cada vez más precisas y personalizadas.",
      details: "Procesamos más de 50 millones de datos de viaje diariamente",
    },
    {
      icon: Globe,
      title: "Destinos Globales",
      description:
        "Acceso a más de 15,000 destinos en todo el mundo con información actualizada en tiempo real y reseñas verificadas.",
      details: "Cobertura en 195 países con datos locales actualizados",
    },
    {
      icon: Zap,
      title: "Planificación Instantánea",
      description:
        "Genera itinerarios completos en segundos, optimizados para tu tiempo, presupuesto y preferencias específicas.",
      details: "Respuesta promedio de 3.2 segundos para itinerarios completos",
    },
    {
      icon: Shield,
      title: "Viajes Seguros",
      description:
        "Monitoreo 24/7 de condiciones de seguridad, alertas en tiempo real y asistencia de emergencia global.",
      details: "Red de soporte en más de 100 países",
    },
  ];

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 6000);

    return () => {
      clearInterval(featureInterval);
    };
  }, []);

  return (
    <div>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3f7ade]/5 to-[#18428c]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#18428c] mb-4">
              Características que Nos Hacen Únicos
            </h2>
          </div>

          <div className="relative h-96 overflow-hidden rounded-3xl bg-gradient-to-r from-white to-[#d6ecd2] shadow-2xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute inset-0 p-12 flex items-center justify-between transition-all duration-1000 ${
                  index === currentFeature
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#3f7ade] to-[#18428c] rounded-2xl flex items-center justify-center mr-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#18428c] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[#3f7ade] font-semibold">
                        {feature.details}
                      </p>
                    </div>
                  </div>
                  <p className="text-xl text-[#18428c]/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="w-64 h-64 bg-gradient-to-br from-[#3f7ade]/20 to-[#18428c]/20 rounded-full flex items-center justify-center ml-12">
                  <feature.icon className="w-32 h-32 text-[#3f7ade]/50" />
                </div>
              </div>
            ))}

            {/* Progress indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFeature
                      ? "bg-[#3f7ade] scale-125"
                      : "bg-[#3f7ade]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
