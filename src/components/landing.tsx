"use client";

import { Button } from '@/components/ui/button';
import {
  MapPin,
  Users,
  Sparkles,
  Heart,
  ArrowRight,
  Camera,
  Headphones,
  Play,
} from 'lucide-react';
import Footer from './footer';
import Planes from './planes';
import Testimonios from './testimonios';
import Features from './features';
import Procesos from './proceso';
import Categorias from './categorias';
import Lugares from './lugares';
import Beneficios from './beneficios';
import Navbar from './navbar';
import Ayuda from './ayuda';
import { useTranslations } from 'next-intl';

export default function LandingPage() {
  const t = useTranslations('Landing');
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d6ecd2] via-white to-[#d6ecd2]">
      <Navbar/>
      <section id="inicio" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3f7ade]/10 to-[#18428c]/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#d6ecd2] to-white backdrop-blur-sm border border-[#3f7ade]/20 rounded-full px-6 py-3 mb-8 shadow-lg animate-bounce">
              <Sparkles className="w-5 h-5 text-[#3f7ade]" />
              <span className="text-sm font-semibold text-[#18428c]">{t('title')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#18428c] mb-8 leading-tight">
              {t('subtitle')}
              <span className="bg-gradient-to-r from-[#3f7ade] to-[#18428c] bg-clip-text text-transparent block mt-2 animate-pulse"> {t('ai')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#18428c]/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t('description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#3f7ade] to-[#18428c] hover:from-[#18428c] hover:to-[#3f7ade] text-white text-xl px-12 py-6 h-auto group shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Play className="w-6 h-6 mr-3" />
                {t('planButton')}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white text-xl px-12 py-6 h-auto transform hover:scale-105 transition-all duration-300"
              >
                <Camera className="w-6 h-6 mr-3" />
                {t('demoButton')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "50K+", label: t('stats.travelers'), icon: Users },
                { number: "15K+", label: t('stats.destinations'), icon: MapPin },
                { number: "98%", label: t('stats.satisfaction'), icon: Heart },
                { number: "24/7", label: t('stats.support'), icon: Headphones }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#3f7ade] to-[#18428c] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#18428c] mb-2">{stat.number}</div>
                  <div className="text-[#18428c]/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 left-10 w-24 h-24 bg-gradient-to-r from-[#3f7ade]/30 to-[#18428c]/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-64 right-16 w-32 h-32 bg-gradient-to-r from-[#d6ecd2]/50 to-[#3f7ade]/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-[#18428c]/30 to-[#3f7ade]/30 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      <Beneficios/>
      <Lugares/>
      <Categorias/>
      <Procesos/>
      <Features/>
      <Testimonios/>
      <Planes/>
      <Ayuda/>
      <Footer/>
    </div>
  );
}
