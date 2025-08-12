import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextRequest } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { object } = await generateObject({
      model: google('gemini-2.5-pro'),
      system: 'Eres un experto consultor de viajes...',
      prompt: body.prompt,
      schema: z.object({
        destinoRecomendado: z.string(),
        descripcion: z.string(),
        actividades: z.array(z.string()),
        consejosPracticos: z.array(z.string()),
        mejorEpoca: z.string(),
        presupuestoEstimado: z.string()
      }),
    });

    return Response.json(object);
  } catch {
    return Response.json({ error: 'Error generating recommendation' }, { status: 500 });
  }
}