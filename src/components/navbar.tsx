'use client'

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button'
import { Link,  usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

import React from "react";
import LogoPearl from "./logo-pearl";
import { Menu, X, Globe, LogOut, User, Heart, Plane } from 'lucide-react';
import { signOut } from '@/api/server';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { AnimatePresence, motion } from "framer-motion";

// Definir los idiomas disponibles
const locales = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];


// const pages = [
//   { ruta: "Inicio", href: "/", current: true },
//   { ruta: "Nosotros", href: "/nosotros", current: false },
//   { ruta: "Servicios", href: "/servicios", current: false },
// ]

export default function Navbar({ user }: { user: { nombre: string, avatar_url: string } | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter()

  const handleLanguageChange = (newLocale: string) => {
    setIsLanguageMenuOpen(false);
    setIsMenuOpen(false);
    
  const currentPath = pathname;
  window.location.href = `/${newLocale}${currentPath}`;

  };

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const handleToggle = (event: React.MouseEvent) => {
    event?.stopPropagation()
    setIsOpen(prev => !prev)
  }

  const isLandingPage = pathname === "/"
  const hiddenRoutes = ["/login", "/singup", "/forgot", "/reset", "/emailUpdated", "/administrador" , "/administrador/administradores", "/administrador/clientes", "/administrador/productos", "/payment-success"];

  const isHidden = hiddenRoutes.includes(pathname);

  const currentLocale = locales.find(l => l.code === locale);

  useEffect(() => {
    if (!isLandingPage) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLandingPage])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => { document.removeEventListener("click", handleClickOutside) }
  }, [isOpen])

  return (
    <header
    className={`${isLandingPage
      ? "bg-transparent fixed transition-colors duration-300 w-full"
      : "bg-background shadow-md sticky"
      } top-0 z-20 ${isScrolled ? "bg-white shadow-md text-gray-900" : ""} ${isHidden ? "hidden" : ""}`}
    >
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-[#3f7ade]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <LogoPearl className="w-20" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#18428c] to-[#3f7ade] bg-clip-text text-transparent">
                Pearl
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#inicio"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                {t('home')}
              </a>
              <a
                href="#caracteristicas"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                {t('features')}
              </a>
              <a
                href="#destinos"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                {t('destinations')}
              </a>
              <a
                href="#como-funciona"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                {t('how-it-works')}
              </a>
              {/* <a
                href="#testimonios"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                {t('testimonials')}
              </a> */}
                <Link 
                  href="/test"
                  className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
                >
                  {t('testimonials')}
                </Link>

              {/* Selector de idioma */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex items-center space-x-1 text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
                  aria-label="Cambiar idioma"
                  type="button"
                >
                  <Globe className="w-4 h-4" />
                  <span>{currentLocale?.flag}</span>
                  <span className="text-sm">{currentLocale?.code.toUpperCase()}</span>
                </button>

                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    {locales.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 transition-colors ${
                          locale === lang.code ? 'bg-blue-50 text-[#3f7ade] font-medium' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 md:hidden group hover:text-custom-blue"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="h-5 w-5 group-hover:text-custom-blue transition-colors" />
                </Button>
                {!user ? (
                  <div className='flex space-x-2'>
                    <Button asChild variant="outline" className="border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white transition-colors">
                      <Link href="/login">
                        {t('login')}
                      </Link>
                    </Button>
                    <Button className="bg-gradient-to-r from-[#3f7ade] to-[#18428c] hover:from-[#18428c] hover:to-[#3f7ade] text-white shadow-lg transition-all duration-300">
                      <Link href="/singup">
                        {t('start-free')}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="relative inline-block text-left">
                    {/* Contenedor flex para alinear los botones y el avatar en una fila */}
                    <div className="flex items-center">
                      <Button asChild variant="ghost" size="icon" className="group hover:text-custom-blue mx-2">
                        <Link href="/wishlist">
                          <Heart className="h-5 w-5 *:group-hover:text-custom-blue transition-colors" />
                        </Link>
                      </Button>

                      {/* Avatar y nombre de usuario */}
                      <button
                        onClick={handleToggle}
                        className="flex items-center cursor-pointer focus:outline-none px-2"
                      >
                        <div className="flex items-center space-x-2 cursor-pointer">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar_url} className="image-cover" />
                            <AvatarFallback>
                              {user.nombre.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="">{user.nombre}</span>
                        </div>
                      </button>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          ref={dropdownRef}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-max p-1 bg-white rounded-lg shadow-2xl ring-1 ring-gray-200 focus:outline-none z-20"
                        >
                          <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-2 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-150 ease-in-out"
                          >
                            <User className="mr-2 h-4 w-4" />
                            Perfil
                          </Link>
                          <Link
                            href="/wishlist"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-2 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-150 ease-in-out"
                          >
                            <Plane className="mr-2 h-4 w-4" />
                            Mis Viajes
                          </Link>
                          <button
                            onClick={() => {
                              setIsOpen(false)
                              handleLogout()
                            }}
                            className="flex items-center w-full px-2 py-2 text-sm hover:bg-gray-100 rounded-md transition-all duration-150 ease-in-out"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Cerrar Sesión
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            <button
              className="md:hidden text-[#18428c] hover:text-[#3f7ade] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              type="button"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-[#3f7ade]/20">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#inicio"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </a>
              <a
                href="#caracteristicas"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('features')}
              </a>
              <a
                href="#destinos"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('destinations')}
              </a>
              <a
                href="#como-funciona"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('how-it-works')}
              </a>
              <a
                href="#testimonios"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('testimonials')}
              </a>

              {/* Selector de idioma móvil */}
              <div className="px-3 py-2">
                <div className="mb-2 text-sm font-medium text-[#18428c]">{t('language')}</div>
                <div className="grid grid-cols-2 gap-2">
                  {locales.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`px-3 py-2 text-sm rounded-md flex items-center space-x-2 transition-colors ${
                        locale === lang.code 
                          ? 'bg-[#3f7ade] text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2 space-y-2">
                <Button 
                  asChild
                  variant="outline"
                  className="w-full border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/login">{t('login')}</Link>
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-[#3f7ade] to-[#18428c] text-white transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('start-free')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}