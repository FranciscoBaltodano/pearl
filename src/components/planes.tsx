'use client'

import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'

export default function Planes() {
  return (
    <div>
              {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#18428c] mb-6">Planes para Cada Aventurero</h2>
            <p className="text-xl text-[#18428c]/70">Elige el plan perfecto para tus necesidades de viaje</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Explorador",
                price: "Gratis",
                description: "Perfecto para comenzar tu aventura",
                features: ["3 itinerarios por mes", "Destinos básicos", "Soporte por email", "App móvil"],
                color: "border-[#3f7ade]/30",
                buttonStyle: "border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white"
              },
              {
                name: "Aventurero",
                price: "$19/mes",
                description: "Para viajeros frecuentes",
                features: ["Itinerarios ilimitados", "Todos los destinos", "Soporte prioritario", "Guías locales", "Descuentos exclusivos"],
                color: "border-[#18428c] shadow-2xl scale-105",
                buttonStyle: "bg-gradient-to-r from-[#3f7ade] to-[#18428c] text-white",
                popular: true
              },
              {
                name: "Nómada Pro",
                price: "$49/mes",
                description: "Para profesionales del viaje",
                features: ["Todo de Aventurero", "Concierge personal", "Experiencias VIP", "Seguros premium", "API access"],
                color: "border-[#3f7ade]/30",
                buttonStyle: "border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white"
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} hover:scale-105 transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#3f7ade] to-[#18428c] text-white px-4 py-1">
                      Más Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-[#18428c] mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-[#3f7ade] mb-2">{plan.price}</div>
                  <p className="text-[#18428c]/70 mb-8">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center text-[#18428c]">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.buttonStyle}`}>
                    Comenzar Ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
