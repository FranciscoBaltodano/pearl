# Next.js + Shadcn + Supabase + OpenAI Template

Esta es una plantilla moderna para crear aplicaciones web utilizando Next.js 15, Shadcn UI,  Supabase como backend y OpenAI para integrar la IA. La plantilla incluye una configuración optimizada para desarrollo rápido y una experiencia de usuario moderna.

## Características

- ⚡️ Next.js 15 con App Router
- 🎨 Shadcn UI para componentes hermosos y accesibles
- 🔐 Autenticación con Supabase
- 🎯 TypeScript para un desarrollo más seguro
- 🎨 Tailwind CSS para estilos
- 🧠 OpenAI para integrar la IA
- 🚀 Optimizado para desarrollo con Turbopack

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://docs.docker.com/get-docker/) - Para ejecutar Supabase localmente
- [Supabase CLI](https://supabase.com/docs/guides/cli) - Para gestionar tu proyecto Supabase

## Getting Started

1. **Configuración del Proyecto Supabase (Opcional pero recomendado)**

   Edita el archivo `supabase/config.toml` para cambiar el nombre del proyecto según tus necesidades.

2. **Inicializar Supabase**

   ```bash
   supabase init
   supabase start
   ```

   > ⚠️ **Nota importante**: Si tienes un contenedor de Docker con otro proyecto de Supabase corriendo, recibirás un error. En ese caso, ejecuta:
   > ```bash
   > supabase stop --project-id <nombre-contenedor>
   > ```
   > Y luego vuelve a ejecutar `supabase start`

3. **Configurar Variables de Entorno**

   Renombra el archivo `.env.example` a `.env.local`:

   ```bash
   mv .env.example .env.local
   ```

   Después de iniciar Supabase, actualiza los siguientes valores en tu archivo `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=<API URL de Supabase>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<Anon Key de Supabase>
   ```

   Puedes encontrar estos valores en la salida del comando `supabase start`.

4. **Instalar Dependencias**

   ```bash
   npm install
   # o
   pnpm install
   # o
   yarn install
   ```

5. **Iniciar el Servidor de Desarrollo**

   ```bash
   npm run dev
   # o
   pnpm dev
   # o
   yarn dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Tecnologías Principales

- [Next.js](https://nextjs.org/) - Framework de React
- [Shadcn UI](https://ui.shadcn.com/) - Componentes de UI
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [OpenAI](https://platform.openai.com/docs/overview) - API de Inteligencia Artificial
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Licencia

MIT
