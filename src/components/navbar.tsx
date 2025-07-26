'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button'

import React from "react";
import LogoPearl from "./logo-pearl";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-[#3f7ade]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-[#3f7ade] to-[#18428c] rounded-xl flex items-center justify-center shadow-lg">
                <Plane className="w-6 h-6 text-white" />
              </div> */}
              <LogoPearl className="w-20" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#18428c] to-[#3f7ade] bg-clip-text text-transparent">
                Pearl
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#inicio"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                Inicio
              </a>
              <a
                href="#caracteristicas"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                Características
              </a>
              <a
                href="#destinos"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                Destinos
              </a>
              <a
                href="#como-funciona"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                Cómo Funciona
              </a>
              <a
                href="#testimonios"
                className="text-[#18428c] hover:text-[#3f7ade] transition-colors font-medium"
              >
                Testimonios
              </a>
              <Button
                variant="outline"
                className="border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white hover:cursor-pointer"
              >
                Iniciar Sesión
              </Button>
              <Button className="bg-gradient-to-r from-[#3f7ade] to-[#18428c] hover:from-[#18428c] hover:to-[#3f7ade] text-white shadow-lg hover:cursor-pointer">
                Comenzar Gratis
              </Button>
            </div>

            <button
              className="md:hidden text-[#18428c]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-[#3f7ade]/20">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#inicio"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium"
              >
                Inicio
              </a>
              <a
                href="#caracteristicas"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium"
              >
                Características
              </a>
              <a
                href="#destinos"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium"
              >
                Destinos
              </a>
              <a
                href="#como-funciona"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium"
              >
                Cómo Funciona
              </a>
              <a
                href="#testimonios"
                className="block px-3 py-2 text-[#18428c] hover:text-[#3f7ade] font-medium"
              >
                Testimonios
              </a>
              <div className="px-3 py-2 space-y-2 hover:cursor-pointer">
                <Button
                  variant="outline"
                  className="w-full border-[#3f7ade] text-[#3f7ade] hover:bg-[#3f7ade] hover:text-white cursor-pointer"
                >
                  Iniciar Sesión
                </Button>
                <Button className="w-full bg-gradient-to-r from-[#3f7ade] to-[#18428c] text-white">
                  Comenzar Gratis
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
