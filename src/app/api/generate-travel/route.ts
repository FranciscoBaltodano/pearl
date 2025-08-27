// // app/api/generate-travel/route.ts
// import { generateObject } from 'ai';
// import { z } from 'zod';
// import { google } from '@ai-sdk/google';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     const { selectedTags } = await req.json();

//     if (!selectedTags.destination || selectedTags.activities.length === 0) {
//       return NextResponse.json(
//         { error: 'Faltan datos requeridos' }, 
//         { status: 400 }
//       );
//     }

//     const prompt = `Genera una recomendación de viaje personalizada con estas preferencias:
//       - Tipo de destino: ${selectedTags.destination}
//       - Actividades preferidas: ${selectedTags.activities.join(', ')}
//       - Duración: ${selectedTags.duration}
//       - Presupuesto: ${selectedTags.budget}
//       - Tipo de viajero: ${selectedTags.travelers}

//       Genera una recomendación completa incluyendo 5 URLs(no ficticias, usa fuentes como unsplash) de imágenes del lugar recomendado, actividades detalladas y consejos prácticos.`;

//     const { object } = await generateObject({
//       model: google('gemini-1.5-flash'),
//       system: 'Eres un experto consultor de viajes. Generas recomendaciones personalizadas, específicas y prácticas para turistas. Incluye destinos reales y consejos útiles.',
//       prompt: prompt,
//       schema: z.object({
//         destinoRecomendado: z.string(),
//         descripcion: z.string(),
//         actividades: z.array(z.string()),
//         consejosPracticos: z.array(z.string()),
//         mejorEpoca: z.string(),
//         presupuestoEstimado: z.string(),
//         imagenesUrls: z.array(z.string()).length(5).describe("5 URLs de imágenes del destino recomendado")
//       }),
//     });

//     return NextResponse.json({ recommendation: object });

//   } catch (error) {
//     console.error('Error generating recommendation:', error);
//     return NextResponse.json(
//       { error: 'Error interno del servidor' }, 
//       { status: 500 }
//     );
//   }
// }

// app/api/generate-travel/route.ts
import { generateObject } from 'ai';
import { z } from 'zod';
import { google } from '@ai-sdk/google';
import { NextRequest, NextResponse } from 'next/server';

// Función para obtener imágenes de Unsplash
async function fetchUnsplashImages(destinoRecomendado: string, tipoDestino: string) {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not configured, using fallback URLs');
    return generateFallbackImages(tipoDestino);
  }

  const keywords = {
    playa: 'beach ocean tropical paradise',
    montaña: 'mountain landscape nature hiking',
    ciudad: 'city urban architecture downtown',
    campo: 'countryside rural fields pastoral',
    desierto: 'desert sand dunes arid landscape',
    selva: 'forest jungle tropical rainforest'
  };

  // Combinar el destino específico con keywords del tipo de destino
  const searchQuery = `${destinoRecomendado} ${keywords[tipoDestino as keyof typeof keywords] || 'travel destination'}`;

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=5&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          'Accept-Version': 'v1'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }

    const data = await response.json();
    
    // Extraer URLs de las imágenes en tamaño regular
    type UnsplashPhoto = { urls: { regular: string } };
    let imageUrls = (data.results as UnsplashPhoto[]).map((photo) => photo.urls.regular);

    // Si no hay suficientes imágenes específicas, buscar con términos más generales
    if (imageUrls.length < 5) {
      const genericQuery = keywords[tipoDestino as keyof typeof keywords] || 'travel';
      const fallbackResponse = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(genericQuery)}&per_page=${5 - imageUrls.length}&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            'Accept-Version': 'v1'
          }
        }
      );

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        type UnsplashPhoto = { urls: { regular: string } };
        const additionalUrls = (fallbackData.results as UnsplashPhoto[]).map((photo) => photo.urls.regular);
        imageUrls = [...imageUrls, ...additionalUrls];
      }
    }

    // Completar con URLs de fallback si aún no hay suficientes
    while (imageUrls.length < 5) {
      imageUrls.push(`https://source.unsplash.com/400x300/?${tipoDestino}&${imageUrls.length + 1}`);
    }

    return imageUrls.slice(0, 5);

  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return generateFallbackImages(tipoDestino);
  }
}

// Función para generar URLs de fallback
function generateFallbackImages(tipoDestino: string) {
  const keywords = {
    playa: 'beach',
    montaña: 'mountain',
    ciudad: 'city',
    campo: 'countryside',
    desierto: 'desert',
    selva: 'forest'
  };

  const keyword = keywords[tipoDestino as keyof typeof keywords] || 'travel';
  
  return Array.from({ length: 5 }, (_, i) => 
    `https://source.unsplash.com/400x300/?${keyword}&${i + 1}`
  );
}

export async function POST(req: NextRequest) {
  try {
    const { selectedTags } = await req.json();

    if (!selectedTags.destination || selectedTags.activities.length === 0) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' }, 
        { status: 400 }
      );
    }

    const prompt = `Genera una recomendación de viaje personalizada con estas preferencias:
      - Tipo de destino: ${selectedTags.destination}
      - Actividades preferidas: ${selectedTags.activities.join(', ')}
      - Duración: ${selectedTags.duration}
      - Presupuesto: ${selectedTags.budget}
      - Tipo de viajero: ${selectedTags.travelers}

      Proporciona un destino específico y real (nombre de ciudad, región o lugar específico), una descripción detallada, actividades concretas y consejos prácticos. NO incluyas URLs de imágenes, solo información del destino.`;

    // Paso 1: Generar recomendación con Google AI
    const { object } = await generateObject({
      model: google('gemini-1.5-flash'),
      system: 'Eres un experto consultor de viajes. Generas recomendaciones personalizadas, específicas y prácticas para turistas. Recomienda destinos reales y específicos con nombres de lugares concretos.',
      prompt: prompt,
      schema: z.object({
        destinoRecomendado: z.string().describe("Nombre específico del destino recomendado (ciudad, región o lugar)"),
        descripcion: z.string(),
        actividades: z.array(z.string()),
        consejosPracticos: z.array(z.string()),
        mejorEpoca: z.string(),
        presupuestoEstimado: z.string()
      }),
    });

    // Paso 2: Obtener imágenes específicas del destino recomendado usando Unsplash
    const imagenesUrls = await fetchUnsplashImages(object.destinoRecomendado, selectedTags.destination);

    // Paso 3: Combinar la recomendación con las imágenes
    const finalRecommendation = {
      ...object,
      imagenesUrls
    };

    return NextResponse.json({ recommendation: finalRecommendation });

  } catch (error) {
    console.error('Error generating recommendation:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}