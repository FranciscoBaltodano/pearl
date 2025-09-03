'use client'

import { Badge, CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export default function Planes() {
  const t = useTranslations('Planes')

  const plans = [
    {
      name: t('explorador.name'),
      price: t('explorador.price'),
      description: t('explorador.description'),
      features: [
        t('explorador.features.0'),
        t('explorador.features.1'),
        t('explorador.features.2'),
        t('explorador.features.3'),
      ],
      color: "border-[#3f7ade]/30",
      buttonStyle: "border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white"
    },
    {
      name: t('aventurero.name'),
      price: t('aventurero.price'),
      description: t('aventurero.description'),
      features: [
        t('aventurero.features.0'),
        t('aventurero.features.1'),
        t('aventurero.features.2'),
        t('aventurero.features.3'),
        t('aventurero.features.4'),
      ],
      color: "border-[#18428c] shadow-2xl scale-105",
      buttonStyle: "bg-gradient-to-r from-[#3f7ade] to-[#18428c] text-white",
      popular: true
    },
    {
      name: t('nomada.name'),
      price: t('nomada.price'),
      description: t('nomada.description'),
      features: [
        t('nomada.features.0'),
        t('nomada.features.1'),
        t('nomada.features.2'),
        t('nomada.features.3'),
        t('nomada.features.4'),
      ],
      color: "border-[#3f7ade]/30",
      buttonStyle: "border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white"
    }
  ]

  return (
    <div>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#18428c] mb-6">
              {t('title')}
            </h2>
            <p className="text-xl text-[#18428c]/70">{t('subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} hover:scale-105 transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#3f7ade] to-[#18428c] text-white px-4 py-1">
                      {t('popular')}
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
                    {t('cta')}
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
