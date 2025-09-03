'use client'

import { CheckCircle, ChevronRight, Headphones, Heart, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from './ui/button'

export default function Ayuda() {
  const t = useTranslations('Ayuda')

  return (
    <div>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3f7ade]/20 to-[#18428c]/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold text-[#18428c] mb-6">
              {t('title')}
            </h2>
            <p className="text-xl text-[#18428c]/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#3f7ade] to-[#18428c] hover:from-[#18428c] hover:to-[#3f7ade] text-white text-xl px-12 py-6 h-auto group shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {t('cta.start')}
                <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white text-xl px-12 py-6 h-auto transform hover:scale-105 transition-all duration-300"
              >
                <Headphones className="w-6 h-6 mr-3" />
                {t('cta.expert')}
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-[#18428c]/60">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>{t('trust.secure')}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>{t('trust.noCommitment')}</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                <span>{t('trust.satisfaction')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
