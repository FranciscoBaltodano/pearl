"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Bike,
  Building2,
  Camera,
  Check,
  Coffee,
  Compass,
  Gamepad2,
  MapPin,
  Mountain,
  Music,
  Palette,
  Plane,
  ShoppingBag,
  Star,
  TreePine,
  Utensils,
  Waves,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

interface Activity {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

const activities: Activity[] = [
  {
    id: "beach",
    name: "Playa y Sol",
    icon: <Waves className="w-8 h-8" />,
    description: "Relajarse en playas paradisíacas",
    category: "Naturaleza",
  },
  {
    id: "mountains",
    name: "Montañas",
    icon: <Mountain className="w-8 h-8" />,
    description: "Senderismo y paisajes montañosos",
    category: "Aventura",
  },
  {
    id: "photography",
    name: "Fotografía",
    icon: <Camera className="w-8 h-8" />,
    description: "Capturar momentos únicos",
    category: "Arte",
  },
  {
    id: "gastronomy",
    name: "Gastronomía",
    icon: <Utensils className="w-8 h-8" />,
    description: "Descubrir sabores locales",
    category: "Cultura",
  },
  {
    id: "adventure",
    name: "Deportes Extremos",
    icon: <Plane className="w-8 h-8" />,
    description: "Actividades llenas de adrenalina",
    category: "Aventura",
  },
  {
    id: "nature",
    name: "Naturaleza",
    icon: <TreePine className="w-8 h-8" />,
    description: "Explorar parques y reservas",
    category: "Naturaleza",
  },
  {
    id: "architecture",
    name: "Arquitectura",
    icon: <Building2 className="w-8 h-8" />,
    description: "Admirar edificios históricos",
    category: "Cultura",
  },
  {
    id: "exploration",
    name: "Exploración",
    icon: <Compass className="w-8 h-8" />,
    description: "Descubrir lugares ocultos",
    category: "Aventura",
  },
  {
    id: "landmarks",
    name: "Monumentos",
    icon: <MapPin className="w-8 h-8" />,
    description: "Visitar sitios emblemáticos",
    category: "Cultura",
  },
  {
    id: "art",
    name: "Arte y Museos",
    icon: <Palette className="w-8 h-8" />,
    description: "Sumergirse en el arte local",
    category: "Arte",
  },
  {
    id: "music",
    name: "Música y Shows",
    icon: <Music className="w-8 h-8" />,
    description: "Disfrutar de espectáculos",
    category: "Entretenimiento",
  },
  {
    id: "shopping",
    name: "Compras",
    icon: <ShoppingBag className="w-8 h-8" />,
    description: "Explorar mercados y tiendas",
    category: "Entretenimiento",
  },
  {
    id: "cycling",
    name: "Ciclismo",
    icon: <Bike className="w-8 h-8" />,
    description: "Recorrer en bicicleta",
    category: "Deporte",
  },
  {
    id: "entertainment",
    name: "Entretenimiento",
    icon: <Gamepad2 className="w-8 h-8" />,
    description: "Parques temáticos y diversión",
    category: "Entretenimiento",
  },
  {
    id: "cafes",
    name: "Cafés y Bares",
    icon: <Coffee className="w-8 h-8" />,
    description: "Ambiente local y bebidas",
    category: "Social",
  },
  {
    id: "luxury",
    name: "Experiencias Premium",
    icon: <Star className="w-8 h-8" />,
    description: "Lujo y exclusividad",
    category: "Premium",
  },
];

export default function ActivitySelection() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const toggleActivity = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleContinue = () => {
    if (selectedActivities.length > 0) {
      console.log("Actividades seleccionadas:", selectedActivities);
      // Aquí iría la navegación a la página de recomendaciones
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-800 via-secondary to-accent">
      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
            ¿Qué te gusta hacer en vacaciones?
          </h1>
          <p className="text-light text-lg">
            Selecciona todas las actividades que disfrutas
          </p>
        </div>
      </div>

      {/* Activities List */}
      <div className="px-4 pb-32">
        <div className="space-y-3">
          {activities.map((activity) => {
            const isSelected = selectedActivities.includes(activity.id);
            return (
              <Card
                key={activity.id}
                className={`cursor-pointer transition-all duration-300 active:scale-95 ${
                  isSelected
                    ? "bg-white shadow-lg ring-2 ring-white/50"
                    : "bg-white/90 hover:bg-white shadow-md"
                }`}
                onClick={() => toggleActivity(activity.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 p-3 rounded-full transition-colors ${
                        isSelected
                          ? "bg-primary-800 text-white"
                          : "bg-accent text-white"
                      }`}
                    >
                      {activity.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-primary-800 truncate">
                          {activity.name}
                        </h3>
                        {isSelected && (
                          <div className="flex-shrink-0 w-6 h-6 bg-primary-800 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {activity.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {activity.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4">
        {selectedActivities.length > 0 && (
          <div className="mb-3">
            <p className="text-center text-sm text-gray-600 mb-2">
              {selectedActivities.length} actividad
              {selectedActivities.length !== 1 ? "es" : ""} seleccionada
              {selectedActivities.length !== 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap justify-center gap-1 max-h-16 overflow-y-auto">
              {selectedActivities.slice(0, 6).map((activityId) => {
                const activity = activities.find((a) => a.id === activityId);
                return activity ? (
                  <Badge
                    key={activityId}
                    variant="default"
                    className="bg-primary-800 text-white text-xs"
                  >
                    {activity.name}
                  </Badge>
                ) : null;
              })}
              {selectedActivities.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{selectedActivities.length - 6} más
                </Badge>
              )}
            </div>
          </div>
        )}

        <Button
          onClick={handleContinue}
          disabled={selectedActivities.length === 0}
          size="lg"
          className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedActivities.length > 0 ? (
            <div className="flex items-center justify-center space-x-2">
              <span>Ver Recomendaciones</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          ) : (
            "Selecciona al menos una actividad"
          )}
        </Button>
      </div>
    </div>
  );
}
