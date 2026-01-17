"use client"
import { useTranslations } from "next-intl"
import { FaCalendar, FaGlobe, FaUsers } from "react-icons/fa"
import FeatureCard from "./FeatureCard"

export default function FeaturesSection() {
  const t = useTranslations("About")

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Funcionalidades que fazem a diferença
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar seu negócio com eficiência
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <FeatureCard 
            icon={FaCalendar} 
            title={t("features.booking.title")} 
            description={t("features.booking.description")} 
            index={0}
          />
          <FeatureCard 
            icon={FaUsers} 
            title={t("features.team.title")} 
            description={t("features.team.description")} 
            index={1}
          />
          <FeatureCard 
            icon={FaGlobe} 
            title={t("features.whiteLabel.title")} 
            description={t("features.whiteLabel.description")} 
            index={2}
          />
        </div>
      </div>
    </section>
  )
}

