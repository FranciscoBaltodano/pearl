// 'use client'

// import { useState } from 'react';
// import { Button } from '@/components/ui/button'
// import { Link, useRouter, usePathname } from '@/i18n/navigation';
// import { useTranslations, useLocale } from 'next-intl';

// import React from "react";
// import LogoPearl from "./logo-pearl";
// import { Menu, X, Globe } from 'lucide-react';

// // Definir los idiomas disponibles
// const locales = [
//   { code: 'es', name: 'Español', flag: '🇪🇸' },
//   { code: 'en', name: 'English', flag: '🇺🇸' },
//   { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
//   { code: 'it', name: 'Italiano', flag: '🇮🇹' },
//   { code: 'fr', name: 'Français', flag: '🇫🇷' }
// ];

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  
//   // Hooks de next-intl
//   const t = useTranslations('navbar');
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleLanguageChange = (newLocale: string) => {
//     router.replace(pathname, { locale: newLocale });
//     setIsLanguageMenuOpen(false);
//   };

//   const currentLocale = locales.find(l => l.code === locale);

//   return (
//     <div>
//       <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-[#3f7ade]/20 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <LogoPearl className="w-20" />
//               <span className="text-2xl font-bold bg-gradient-to-r from-[#18428c] to-[#3f7ade] bg-clip-text text-transparent">
//                 Pearl
//               </span>
//             </div>

//             <div className="hidden md:flex items-center space-x-8">
//               <a
//                 href="#inicio"
//                 className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
//               >
//                 {t('home')}
//               </a>
//               <a
//                 href="#caracteristicas"
//                 className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
//               >
//                 {t('features')}
//               </a>
//               <a
//                 href="#destinos"
//                 className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
//               >
//                 {t('destinations')}
//               </a>
//               <a
//                 href="#como-funciona"
//                 className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
//               >
//                 {t('how-it-works')}
//               </a>
//               <a
//                 href="#testimonios"
//                 className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
//               >
//                 {t('testimonials')}
//               </a>

//               {/* Selector de idioma */}
//               <div className="relative">
//                 <button
//                   onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//                   className="flex items-center space-x-1 text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
//                   aria-label="Cambiar idioma"
//                 >
//                   <Globe className="w-4 h-4" />
//                   <span>{currentLocale?.flag}</span>
//                   <span className="text-sm">{currentLocale?.code.toUpperCase()}</span>
//                 </button>

//                 {isLanguageMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
//                     {locales.map((lang) => (
//                       <button
//                         key={lang.code}
//                         onClick={() => handleLanguageChange(lang.code)}
//                         className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 transition-colors ${
//                           locale === lang.code ? 'bg-blue-50 text-[#3f7ade] font-medium' : 'text-gray-700'
//                         }`}
//                       >
//                         <span>{lang.flag}</span>
//                         <span>{lang.name}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <Button asChild variant="outline" className="border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white transition-colors">
//                 <Link href="/login">
//                   {t('login')}
//                 </Link>
//               </Button>
//               <Button className="bg-gradient-to-r from-[#3f7ade] to-[#18428c] hover:from-[#18428c] hover:to-[#3f7ade] text-white shadow-lg transition-all duration-300">
//                 {t('start-free')}
//               </Button>
//             </div>

//             <button
//               className="md:hidden text-[#18428c] hover:text-[#3f7ade] transition-colors"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-[#3f7ade]/20">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <a
//                 href="#inicio"
//                 className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {t('home')}
//               </a>
//               <a
//                 href="#caracteristicas"
//                 className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {t('features')}
//               </a>
//               <a
//                 href="#destinos"
//                 className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {t('destinations')}
//               </a>
//               <a
//                 href="#como-funciona"
//                 className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {t('how-it-works')}
//               </a>
//               <a
//                 href="#testimonios"
//                 className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {t('testimonials')}
//               </a>

//               {/* Selector de idioma móvil */}
//               <div className="px-3 py-2">
//                 <div className="mb-2 text-sm font-medium text-[#18428c]">{t('language')}</div>
//                 <div className="grid grid-cols-2 gap-2">
//                   {locales.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => {
//                         handleLanguageChange(lang.code);
//                         setIsMenuOpen(false);
//                       }}
//                       className={`px-3 py-2 text-sm rounded-md flex items-center space-x-2 transition-colors ${
//                         locale === lang.code 
//                           ? 'bg-[#3f7ade] text-white' 
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       <span>{lang.flag}</span>
//                       <span>{lang.code.toUpperCase()}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="px-3 py-2 space-y-2">
//                 <Button 
//                   asChild
//                   variant="outline"
//                   className="w-full border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <Link href="/login">{t('login')}</Link>
//                 </Button>
//                 <Button 
//                   className="w-full bg-gradient-to-r from-[#3f7ade] to-[#18428c] text-white transition-all duration-300"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {t('start-free')}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// }

'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Link,  usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

import React from "react";
import LogoPearl from "./logo-pearl";
import { Menu, X, Globe } from 'lucide-react';

// Definir los idiomas disponibles
const locales = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  
  // Hooks de next-intl
  const t = useTranslations('navbar');
  const locale = useLocale();
  // const router = useRouter();
  const pathname = usePathname();

  // Función corregida para cambio de idioma
  const handleLanguageChange = (newLocale: string) => {
    // Cerrar el menú inmediatamente
    setIsLanguageMenuOpen(false);
    setIsMenuOpen(false);
    
    // Usar push en lugar de replace para evitar problemas de hidratación
    // router.push(pathname, { locale: newLocale });
      // Usar window.location como último recurso
  const currentPath = pathname;
  window.location.href = `/${newLocale}${currentPath}`;

  };

  const currentLocale = locales.find(l => l.code === locale);

  return (
    <div>
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
              <a
                href="#testimonios"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                {t('testimonials')}
              </a>

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

              <Button asChild variant="outline" className="border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white transition-colors">
                <Link href="/login">
                  {t('login')}
                </Link>
              </Button>
              <Button className="bg-gradient-to-r from-[#3f7ade] to-[#18428c] hover:from-[#18428c] hover:to-[#3f7ade] text-white shadow-lg transition-all duration-300">
                {t('start-free')}
              </Button>
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
    </div>
  );
}