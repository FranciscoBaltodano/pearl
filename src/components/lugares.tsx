"use client";

import { ArrowRight, Badge, Clock, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Lugares() {
  const [currentDestination, setCurrentDestination] = useState(0);
  const destinations = [
    {
      name: "Tokio, Japón",
      image:
        "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      description: "Tecnología, cultura tradicional y gastronomía única",
      price: "Desde $1,200",
      duration: "7-14 días",
      category: "Cultura",
    },
    {
      name: "Santorini, Grecia",
      image:
        "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      description: "Atardeceres mágicos y arquitectura cicládica",
      price: "Desde $800",
      duration: "5-10 días",
      category: "Romance",
    },
    {
      name: "Machu Picchu, Perú",
      image:
        "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      description: "Historia ancestral y paisajes montañosos",
      price: "Desde $600",
      duration: "4-8 días",
      category: "Aventura",
    },
    {
      name: "Maldivas",
      image:
        "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      description: "Paraíso tropical con aguas cristalinas",
      price: "Desde $2,000",
      duration: "5-12 días",
      category: "Lujo",
    },
    {
      name: "Islandia",
      image:
        "https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      description: "Auroras boreales y paisajes volcánicos",
      price: "Desde $1,500",
      duration: "6-10 días",
      category: "Naturaleza",
    },
  ];

  useEffect(() => {
      const destinationInterval = setInterval(() => {
        setCurrentDestination((prev) => (prev + 1) % destinations.length);
      }, 4000);
  
      return () => {
        clearInterval(destinationInterval);
      };
    }, []);

  return (
    <div>
      <section id="destinos" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#3f7ade]/10 text-[#3f7ade] border-[#3f7ade]/20 text-lg px-6 py-2">
              Destinos Populares
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-[#18428c] mb-6">
              Explora el Mundo con IA
            </h2>
            <p className="text-xl text-[#18428c]/70 max-w-3xl mx-auto">
              Descubre destinos únicos seleccionados por nuestra IA según tus
              preferencias y sueños de viaje.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${currentDestination * 100}%)`,
                }}
              >
                {destinations.map((destination, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <div
                      className="h-96 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${destination.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex justify-between items-end">
                          <div>
                            <Badge className="mb-3 bg-[#3f7ade] text-white">
                              {destination.category}
                            </Badge>
                            <h3 className="text-3xl font-bold mb-2">
                              {destination.name}
                            </h3>
                            <p className="text-lg mb-4 opacity-90">
                              {destination.description}
                            </p>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <DollarSign className="w-5 h-5 mr-1" />
                                <span className="font-semibold">
                                  {destination.price}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-1" />
                                <span>{destination.duration}</span>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-white text-[#18428c] hover:bg-[#d6ecd2]">
                            Explorar
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {destinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDestination(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentDestination
                      ? "bg-[#3f7ade] scale-125"
                      : "bg-[#3f7ade]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
