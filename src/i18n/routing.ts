import { defineRouting } from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['es', 'en', 'de', 'it', 'fr'],
 
  defaultLocale: 'es',
  
  pathnames: {
    '/': '/',
    '/login': '/login',
    '/singup': '/singup',
    '/test': '/test',
    '/profile': '/profile',
    '/chat': '/chat',
    '/wishlist': '/wishlist',
    '/trips': '/trips',
  }
});