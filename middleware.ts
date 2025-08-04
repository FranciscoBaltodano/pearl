
// middleware.ts - Middleware actualizado para usar routing config
import createMiddleware from 'next-intl/middleware';
import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";
import { routing } from '@/i18n/routing';

// Crear middleware de next-intl
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Debug
  console.log('🔍 URL:', request.url);
  console.log('🔍 Pathname:', request.nextUrl.pathname);
  
  // Ejecutar middleware de Supabase
  const supabaseResponse = await updateSession(request);
  
  // Ejecutar middleware de internacionalización
  const intlResponse = intlMiddleware(request);
  
  // Si ambos tienen respuesta, combinar
  if (supabaseResponse && intlResponse) {
    // Supabase response con headers de intl
    const response = new Response(supabaseResponse.body, {
      status: supabaseResponse.status,
      statusText: supabaseResponse.statusText,
      headers: supabaseResponse.headers
    });
    
    // Copiar headers importantes de intl
    intlResponse.headers.forEach((value, key) => {
      if (key === 'x-middleware-request-x-pathname' || key === 'location') {
        response.headers.set(key, value);
      }
    });
    
    return response;
  }
  
  // Si solo uno tiene respuesta, devolver esa
  return intlResponse || supabaseResponse;
}

export const config = {
  // CRÍTICO: Usar matcher que incluya rutas localizadas
  matcher: [
    // Incluir root y rutas con locale
    '/',
    '/(es|en)/:path*',
    // Excluir archivos estáticos y APIs
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
