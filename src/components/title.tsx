"use client";
import { useEffect, useState } from "react";
import LogoPearl from "./logo-pearl";

export default function HeroTitle() {
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationDone(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div
        className={`flex flex-col items-center justify-center transition-all duration-[1000ms] ease-out ${
          animationDone ? "h-auto py-8" : "h-screen"
        }`}
      >
        <LogoPearl className={`${animationDone ? "w-52" : "w-20"}`} />
        <h1 className="text-[60px] font-bold text-blue-900 mb-2">PEARL</h1>
      </div>
    </div>
  );
}
