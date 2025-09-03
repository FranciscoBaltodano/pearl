'use client'

import { Award, Calendar, CheckCircle, Globe, Shield, Smartphone, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from './ui/card'

export default function Features() {
  const t = useTranslations("Features")

  return (
    <div>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#18428c] mb-6">{t("title")}</h2>
            <p className="text-xl text-[#18428c]/70">{t("subtitle")}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: t("items.smartphone.title"),
                description: t("items.smartphone.description"),
                features: [
                  t("items.smartphone.features.0"),
                  t("items.smartphone.features.1"),
                  t("items.smartphone.features.2")
                ]
              },
              {
                icon: Shield,
                title: t("items.shield.title"),
                description: t("items.shield.description"),
                features: [
                  t("items.shield.features.0"),
                  t("items.shield.features.1"),
                  t("items.shield.features.2")
                ]
              },
              {
                icon: TrendingUp,
                title: t("items.trending.title"),
                description: t("items.trending.description"),
                features: [
                  t("items.trending.features.0"),
                  t("items.trending.features.1"),
                  t("items.trending.features.2")
                ]
              },
              {
                icon: Globe,
                title: t("items.globe.title"),
                description: t("items.globe.description"),
                features: [
                  t("items.globe.features.0"),
                  t("items.globe.features.1"),
                  t("items.globe.features.2")
                ]
              },
              {
                icon: Calendar,
                title: t("items.calendar.title"),
                description: t("items.calendar.description"),
                features: [
                  t("items.calendar.features.0"),
                  t("items.calendar.features.1"),
                  t("items.calendar.features.2")
                ]
              },
              {
                icon: Award,
                title: t("items.award.title"),
                description: t("items.award.description"),
                features: [
                  t("items.award.features.0"),
                  t("items.award.features.1"),
                  t("items.award.features.2")
                ]
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-[#d6ecd2]/30"
              >
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
