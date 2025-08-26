// app/api/generate-travel/route.ts
import { generateObject } from 'ai';
import { z } from 'zod';
import { google } from '@ai-sdk/google';
import { NextRequest, NextResponse } from 'next/server';

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
      
      Incluye un destino específico, actividades detalladas y consejos prácticos.`;

    const { object } = await generateObject({
      model: google('gemini-1.5-flash'),
      system: 'Eres un experto consultor de viajes. Generas recomendaciones personalizadas, específicas y prácticas para turistas. Incluye destinos reales y consejos útiles.',
      prompt: prompt,
      schema: z.object({
        destinoRecomendado: z.string(),
        descripcion: z.string(),
        actividades: z.array(z.string()),
        consejosPracticos: z.array(z.string()),
        mejorEpoca: z.string(),
        presupuestoEstimado: z.string()
      }),
    });

    return NextResponse.json({ recommendation: object });

  } catch (error) {
    console.error('Error generating recommendation:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}