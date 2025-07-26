'use client'

import { Award, Calendar, CheckCircle, Globe, Shield, Smartphone, TrendingUp } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from './ui/card'

export default function Features() {
  return (
    <div>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#18428c] mb-6">Tecnología de Vanguardia</h2>
            <p className="text-xl text-[#18428c]/70">Características avanzadas que hacen la diferencia</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "App Móvil Inteligente",
                description: "Accede a tu itinerario offline, recibe notificaciones inteligentes y actualiza planes sobre la marcha.",
                features: ["Modo offline", "Notificaciones push", "Sincronización en tiempo real"]
              },
              {
                icon: Shield,
                title: "Seguridad Avanzada",
                description: "Monitoreo 24/7 de condiciones globales, alertas de seguridad y asistencia de emergencia.",
                features: ["Alertas en tiempo real", "Asistencia 24/7", "Seguros de viaje"]
              },
              {
                icon: TrendingUp,
                title: "Optimización de Precios",
                description: "IA que encuentra las mejores ofertas y predice fluctuaciones de precios para maximizar tu presupuesto.",
                features: ["Predicción de precios", "Alertas de ofertas", "Comparación automática"]
              },
              {
                icon: Globe,
                title: "Red Global",
                description: "Conexiones con guías locales, experiencias auténticas y recomendaciones de residentes.",
                features: ["Guías locales", "Experiencias únicas", "Cultura auténtica"]
              },
              {
                icon: Calendar,
                title: "Flexibilidad Total",
                description: "Modifica fechas, destinos y actividades con sugerencias inteligentes que se adaptan a cambios.",
                features: ["Cambios flexibles", "Sugerencias adaptativas", "Reprogramación automática"]
              },
              {
                icon: Award,
                title: "Programa de Recompensas",
                description: "Gana puntos con cada viaje, desbloquea experiencias exclusivas y accede a descuentos especiales.",
                features: ["Puntos por viaje", "Experiencias VIP", "Descuentos exclusivos"]
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-[#d6ecd2]/30">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#3f7ade] to-[#18428c] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#18428c] mb-4">{feature.title}</h3>
                  <p className="text-[#18428c]/70 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-[#3f7ade] font-medium">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
