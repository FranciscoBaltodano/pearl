'use client'

import { Briefcase, Building, Camera, Coffee, Heart, Mountain, TreePine, Waves } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from './ui/card'

export default function Categorias() {
  return (
    <div>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#d6ecd2]/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#18428c] mb-6">Viaja Según Tu Estilo</h2>
            <p className="text-xl text-[#18428c]/70">Nuestra IA se adapta a cualquier tipo de aventura que busques</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Mountain, title: "Aventura", description: "Montañismo, trekking y deportes extremos", color: "from-green-500 to-emerald-600" },
              { icon: Building, title: "Urbano", description: "Ciudades, cultura y vida nocturna", color: "from-[#3f7ade] to-[#18428c]" },
              { icon: Waves, title: "Playa", description: "Sol, arena y deportes acuáticos", color: "from-cyan-500 to-blue-600" },
              { icon: TreePine, title: "Naturaleza", description: "Bosques, parques y vida silvestre", color: "from-green-600 to-lime-500" },
              { icon: Coffee, title: "Gastronómico", description: "Sabores locales y experiencias culinarias", color: "from-amber-500 to-orange-600" },
              { icon: Camera, title: "Fotográfico", description: "Paisajes únicos para capturar", color: "from-purple-500 to-pink-600" },
              { icon: Heart, title: "Romántico", description: "Escapadas perfectas en pareja", color: "from-rose-500 to-red-600" },
              { icon: Briefcase, title: "Negocios", description: "Combina trabajo con experiencias locales", color: "from-slate-600 to-gray-700" }
            ].map((category, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg hover:shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#18428c] mb-3">{category.title}</h3>
                  <p className="text-[#18428c]/70">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
