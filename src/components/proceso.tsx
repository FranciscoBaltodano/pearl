'use client'

import { Badge, Brain, Compass, MapPin, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Procesos() {
  const t = useTranslations('Procesos')

  return (
    <div>
      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3f7ade]/10 to-[#18428c]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#18428c]/10 text-[#18428c] border-[#18428c]/20 text-lg px-6 py-2">
              {t('badge')}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-[#18428c] mb-6">
              {t('title')}
            </h2>
            <p className="text-xl text-[#18428c]/70 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: t('steps.share.title'),
                description: t('steps.share.description'),
                icon: Users,
                color: "from-[#3f7ade] to-[#18428c]"
              },
              {
                step: "02", 
                title: t('steps.ai.title'),
                description: t('steps.ai.description'),
                icon: Brain,
                color: "from-[#18428c] to-[#3f7ade]"
              },
              {
                step: "03",
                title: t('steps.customize.title'),
                description: t('steps.customize.description'),
                icon: Compass,
                color: "from-green-500 to-emerald-600"
              },
              {
                step: "04",
                title: t('steps.travel.title'),
                description: t('steps.travel.description'),
                icon: MapPin,
                color: "from-amber-500 to-orange-600"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group relative">
                <div className="relative mb-8">
                  <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-black shadow-lg">
                    {step.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#3f7ade]/30 to-[#18428c]/30"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-[#18428c] mb-4">{step.title}</h3>
                <p className="text-[#18428c]/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
