// import { generateObject } from "ai";
// import { z } from 'zod';
// import { google } from "@ai-sdk/google";

// export default async function ContentChat() {

//   const { object } = await generateObject({
//     model: google("gemini-1.5-flash"),
//     system:
//       'You are a professional writer. ' +
//       'You write simple, clear, and concise content.',
//     prompt: "Dame una receta de chocoflan",
//     schema: z.object({
//         name: z.string(),
//         ingredients: z.array(z.string()),
//         pasos: z.array(z.string()),
//     }),
//   });

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>
//       <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
//         <p className="text-gray-700">{object?.name}</p>
//         <h2 className="text-xl font-bold mt-4">Ingredients</h2>
//         <ul className="list-disc list-inside">
//           {object?.ingredients.map((ingredient, index) => (
//             <li key={index} className="text-gray-700">{ingredient}</li>
//           ))}
//         </ul>
//         <h2 className="text-xl font-bold mt-4">Steps</h2>
//         <ol className="list-decimal list-inside">
//           {object?.pasos.map((step, index) => (
//             <li key={index} className="text-gray-700">{step}</li>
//           ))}
//         </ol>
//       </div>
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import { MapPin, Calendar, Star } from 'lucide-react';

// Tipos
interface SelectedTags {
  destination: string;
  activities: string[];
  duration: string;
  budget: string;
  travelers: string;
}

interface Recommendation {
  destinoRecomendado: string;
  descripcion: string;
  actividades: string[];
  consejosPracticos: string[];
  mejorEpoca: string;
  presupuestoEstimado: string;
}

export default function TourismGenerator() {
  const [selectedTags, setSelectedTags] = useState<SelectedTags>({
    destination: '',
    activities: [],
    duration: '',
    budget: '',
    travelers: ''
  });

  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const destinationTypes = [
    { id: 'playa', label: 'Playa', icon: '🏖️' },
    { id: 'montaña', label: 'Montaña', icon: '⛰️' },
    { id: 'ciudad', label: 'Ciudad', icon: '🏙️' },
    { id: 'campo', label: 'Campo', icon: '🌾' },
    { id: 'desierto', label: 'Desierto', icon: '🏜️' },
    { id: 'selva', label: 'Selva', icon: '🌿' }
  ];

  const activities = [
    { id: 'aventura', label: 'Aventura', icon: '🎢' },
    { id: 'relajacion', label: 'Relajación', icon: '🧘' },
    { id: 'cultura', label: 'Cultural', icon: '🏛️' },
    { id: 'gastronomia', label: 'Gastronomía', icon: '🍽️' },
    { id: 'naturaleza', label: 'Naturaleza', icon: '🌲' },
    { id: 'deportes', label: 'Deportes', icon: '⚽' },
    { id: 'fotografia', label: 'Fotografía', icon: '📸' },
    { id: 'vida-nocturna', label: 'Vida Nocturna', icon: '🌙' }
  ];

  const durations = ['1-2 días', '3-5 días', '1 semana', '2+ semanas'];
  const budgets = ['Económico', 'Medio', 'Premium', 'Lujo'];
  const travelerTypes = ['Solo', 'Pareja', 'Familia', 'Amigos', 'Grupo'];

  const handleActivityToggle = (activityId: string) => {
    setSelectedTags(prev => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter(id => id !== activityId)
        : [...prev.activities, activityId]
    }));
  };

  const generateRecommendation = async () => {
    if (!selectedTags.destination || selectedTags.activities.length === 0) {
      alert('Por favor selecciona al menos un tipo de destino y una actividad');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate-travel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedTags }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (error) {
      console.error('Error generating recommendation:', error);
      alert('Error al generar la recomendación. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSelection = () => {
    setSelectedTags({
      destination: '',
      activities: [],
      duration: '',
      budget: '',
      travelers: ''
    });
    setRecommendation(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌍 Generador de Viajes IA
          </h1>
          <p className="text-gray-600">Selecciona tus preferencias y recibe recomendaciones personalizadas</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel de Selección */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <MapPin className="mr-2 text-blue-500" />
              Personaliza tu viaje
            </h2>

            {/* Tipo de Destino */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Tipo de destino</h3>
              <div className="grid grid-cols-2 gap-2">
                {destinationTypes.map(dest => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setSelectedTags(prev => ({...prev, destination: dest.id}))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTags.destination === dest.id 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <span className="text-2xl block">{dest.icon}</span>
                    <span className="text-sm font-medium">{dest.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actividades */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Actividades de interés</h3>
              <div className="grid grid-cols-2 gap-2">
                {activities.map(activity => (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => handleActivityToggle(activity.id)}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      selectedTags.activities.includes(activity.id)
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <span className="text-lg block">{activity.icon}</span>
                    <span className="text-xs font-medium">{activity.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Opciones adicionales */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Duración</label>
                <select 
                  value={selectedTags.duration}
                  onChange={(e) => setSelectedTags(prev => ({...prev, duration: e.target.value}))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar...</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Presupuesto</label>
                <select 
                  value={selectedTags.budget}
                  onChange={(e) => setSelectedTags(prev => ({...prev, budget: e.target.value}))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar...</option>
                  {budgets.map(budget => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tipo de viajero</label>
                <select 
                  value={selectedTags.travelers}
                  onChange={(e) => setSelectedTags(prev => ({...prev, travelers: e.target.value}))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar...</option>
                  {travelerTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={generateRecommendation}
                disabled={isLoading}
                type="button"
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {isLoading ? '🔄 Generando...' : '✨ Generar Recomendación'}
              </button>
              
              <button
                onClick={resetSelection}
                type="button"
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                🔄
              </button>
            </div>
          </div>

          {/* Panel de Resultados */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Star className="mr-2 text-yellow-500" />
              Tu recomendación
            </h2>

            {!recommendation && !isLoading && (
              <div className="text-center text-gray-500 py-12">
                <Calendar className="mx-auto mb-4 w-16 h-16 text-gray-300" />
                <p>Selecciona tus preferencias y genera una recomendación personalizada</p>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Creando tu recomendación perfecta...</p>
              </div>
            )}

            {recommendation && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-700 mb-2">
                    📍 {recommendation.destinoRecomendado}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {recommendation.descripcion}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center">
                    🎯 Actividades recomendadas
                  </h4>
                  <ul className="space-y-2">
                    {recommendation.actividades?.map((activity, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center">
                    💡 Consejos prácticos
                  </h4>
                  <ul className="space-y-2">
                    {recommendation.consejosPracticos?.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4 border-t">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-800">🗓️ Mejor época</h5>
                    <p className="text-blue-700">{recommendation.mejorEpoca}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium text-green-800">💰 Presupuesto estimado</h5>
                    <p className="text-green-700">{recommendation.presupuestoEstimado}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}