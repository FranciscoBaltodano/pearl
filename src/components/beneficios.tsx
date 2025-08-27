"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Brain, Globe, Zap, Shield } from "lucide-react";

export default function Beneficios() {
  const t = useTranslations("Beneficios");
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: t("features.ia.title"),
      description: t("features.ia.description"),
      details: t("features.ia.details"),
    },
    {
      icon: Globe,
      title: t("features.global.title"),
      description: t("features.global.description"),
      details: t("features.global.details"),
    },
    {
      icon: Zap,
      title: t("features.instant.title"),
      description: t("features.instant.description"),
      details: t("features.instant.details"),
    },
    {
      icon: Shield,
      title: t("features.safe.title"),
      description: t("features.safe.description"),
      details: t("features.safe.details"),
    },
  ];

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 6000);

    return () => {
      clearInterval(featureInterval);
    };
  }, [features.length]);

  return (
    <div>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3f7ade]/5 to-[#18428c]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#18428c] mb-4">
              {t("title")}
            </h2>
          </div>

          <div className="relative h-96 overflow-hidden rounded-3xl bg-gradient-to-r from-white to-[#d6ecd2] shadow-2xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute inset-0 p-12 flex items-center justify-between transition-all duration-1000 ${
                  index === currentFeature
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#3f7ade] to-[#18428c] rounded-2xl flex items-center justify-center mr-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#18428c] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[#3f7ade] font-semibold">
                        {feature.details}
                      </p>
                    </div>
                  </div>
                  <p className="text-xl text-[#18428c]/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="w-64 h-64 bg-gradient-to-br from-[#3f7ade]/20 to-[#18428c]/20 rounded-full flex items-center justify-center ml-12">
                  <feature.icon className="w-32 h-32 text-[#3f7ade]/50" />
                </div>
              </div>
            ))}

            {/* Progress indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFeature
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
