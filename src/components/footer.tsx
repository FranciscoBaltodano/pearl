'use client';

import { Award, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import LogoPearlSecond from "./logo-secondary";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <div>
      <footer className="bg-gradient-to-br from-[#18428c] to-[#3f7ade] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <LogoPearlSecond className="w-24" />
                <span className="text-3xl font-bold">Pearl</span>
              </div>
              <p className="text-white/80 leading-relaxed text-lg">
                {t("description")}
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">{t("platform.title")}</h3>
              <ul className="space-y-3">
                {[
                  "howItWorks",
                  "destinations",
                  "pricing",
                  "api",
                  "integrations",
                ].map((key) => (
                  <li key={key}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                    >
                      {t(`platform.${key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">{t("support.title")}</h3>
              <ul className="space-y-3">
                {[
                  "helpCenter",
                  "contact",
                  "blog",
                  "status",
                  "community",
                ].map((key) => (
                  <li key={key}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                    >
                      {t(`support.${key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">{t("legal.title")}</h3>
              <ul className="space-y-3">
                {[
                  "privacy",
                  "terms",
                  "cookies",
                  "security",
                  "compliance",
                ].map((key) => (
                  <li key={key}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                    >
                      {t(`legal.${key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              {t("copyright")}
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-white/70">
                  {t("award")}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-white/70">
                  {t("certificate")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
