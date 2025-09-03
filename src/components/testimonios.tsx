'use client'

import { Badge, ChevronLeft, ChevronRight, MapIcon, Quote, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Testimonios() {
  const t = useTranslations("Testimonials")
  const testimonials = t.raw("items") as {
    name: string
    role: string
    content: string
    rating: number
    avatar: string
    location: string
  }[]

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(testimonialInterval);
    };
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div>
      <section id="testimonios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#d6ecd2]/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/20 text-lg px-6 py-2">
              {t("badge")}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-[#18428c] mb-6">
              {t("title")}
            </h2>
            <p className="text-xl text-[#18428c]/70 max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-12">
                    <div className="text-center">
                      <Quote className="w-12 h-12 text-[#3f7ade] mx-auto mb-6" />
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-2xl text-[#18428c] mb-8 leading-relaxed font-medium italic">
                        {testimonial.content}
                      </p>
                      <div className="flex items-center justify-center">
                        <Image 
                          src={testimonial.avatar}
                          width={500}
                          height={500}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mr-6 object-cover shadow-lg"
                        />
                        <div className="text-left">
                          <h4 className="text-xl font-bold text-[#18428c]">{testimonial.name}</h4>
                          <p className="text-[#3f7ade] font-medium">{testimonial.role}</p>
                          <p className="text-[#18428c]/60 text-sm flex items-center mt-1">
                            <MapIcon className="w-4 h-4 mr-1" />
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#3f7ade] hover:bg-[#d6ecd2] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#3f7ade] hover:bg-[#d6ecd2] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Progress indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-[#3f7ade] scale-125' : 'bg-[#3f7ade]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
