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
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Guardar los últimos 5 destinos recomendados
let lastDestinations: string[] = [];

const recommendationSchema = z.object({
  destinoRecomendado: z.array(z.string()).describe('Nombres específicos de los destinos recomendados'),
  descripcion: z.string(),
  actividades: z.array(z.string()),
  consejosPracticos: z.array(z.string()),
  mejorEpoca: z.string(),
  presupuestoEstimado: z.string(),
  itinerario: z.array(z.object({
    dia: z.number(),
    destino: z.string(),
    actividades: z.array(z.string()),
    descripcion: z.string(),
    imagenesUrls: z.array(z.string()).optional()
  })).optional()
});

// Función para obtener imágenes de Unsplash
async function fetchUnsplashImages(destinoRecomendado: string[], tipoDestino: string) {
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

    const isMultiDayTrip = selectedTags.duration === '3-5 días' || 
                          selectedTags.duration === '1 semana' || 
                          selectedTags.duration === '2+ semanas';

    // Crear lista de exclusión
    const excluded = lastDestinations.length > 0 ? lastDestinations.join(', ') : 'ninguno';

    // Prompt dinámico con restricción de los últimos 5 destinos
    let prompt = `Genera una recomendación de viaje personalizada con estas preferencias:
      - Tipo de destino: ${selectedTags.destination}
      - Actividades preferidas: ${selectedTags.activities.join(', ')}
      - Duración: ${selectedTags.duration}
      - Presupuesto: ${selectedTags.budget}
      - Tipo de viajero: ${selectedTags.travelers}
      - País: ${selectedTags.country || 'cualquier país'}

      IMPORTANTE:`;

    if (isMultiDayTrip) {
      prompt += `
      - Para esta duración, recomienda entre 3 y 5 destinos diferentes que sean relativamente cercanos entre sí.
      - Los destinos deben formar una ruta lógica y coherente.
      - Incluye un itinerario detallado por día con actividades específicas para cada destino.
      - Los destinos deben ser reales, específicos${selectedTags.country ? ` ubicados en ${selectedTags.country}` : ''} y diferentes a los últimos destinos sugeridos: [${excluded}].`;
    } else {
      prompt += `
      - - El destino recomendado debe ser real, específico${selectedTags.country ? ` ubicado en ${selectedTags.country}` : ''} y diferente a los últimos destinos sugeridos: [${excluded}].`;
    }

    prompt += `
      - Nunca repitas destinos de esa lista de exclusión.
      - Proporciona una descripción detallada, actividades concretas y consejos prácticos.
      - NO incluyas URLs de imágenes, solo información del destino.`;

    // Paso 1: Generar recomendación con Google AI
    const { object } = await generateObject({
      model: google('gemini-1.5-flash'),
      system: isMultiDayTrip 
        ? 'Eres un experto consultor de viajes. Para viajes de múltiples días, creas rutas con 3-5 destinos cercanos entre sí, con itinerarios detallados por día. Proporciona el nombre exacto de cada destino para buscar imágenes. Nunca repites lugares incluidos en una lista de exclusión.'
        : 'Eres un experto consultor de viajes. Recomiendas destinos reales, específicos y prácticos. Nunca repites lugares incluidos en una lista de exclusión.',
      prompt,
      schema: recommendationSchema,
    });

    // Obtener imágenes
    let imagenesUrls: string[] = [];
    let itinerarioConImagenes = object.itinerario;

    if (isMultiDayTrip && object.itinerario) {
      // Para viajes múltiples: obtener imágenes para cada destino del itinerario
      itinerarioConImagenes = await Promise.all(
        object.itinerario.map(async (dia) => {
          const imagenesDia = await fetchUnsplashImages([dia.destino], selectedTags.destination);
          return { ...dia, imagenesUrls: imagenesDia };
        })
      );
      
      // Usar las imágenes del primer día como imágenes principales
      imagenesUrls = itinerarioConImagenes[0]?.imagenesUrls || [];
    } else {
      // Para viajes cortos: obtener imágenes normalmente
      imagenesUrls = await fetchUnsplashImages(object.destinoRecomendado, selectedTags.destination);
    }

    // Guardar en historial
    object.destinoRecomendado.forEach(destino => {
      lastDestinations.unshift(destino);
    });
    
    if (lastDestinations.length > 5) {
      lastDestinations = lastDestinations.slice(0, 5);
    }

    return NextResponse.json({
      recommendation: { 
        ...object, 
        imagenesUrls,
        itinerario: itinerarioConImagenes 
      },
    });
  } catch (error) {
    console.error('Error generating recommendation:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}