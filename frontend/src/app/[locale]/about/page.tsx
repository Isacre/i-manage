"use server"
import iManageLogo from "@/assets/logo/imanagelogo.png"
import Image from "next/image"
import HeroSection from "./components/HeroSection"
import ValueSection from "./components/ValueSection"
import FeaturesSection from "./components/FeaturesSection"
import StatsSection from "./components/StatsSection"
import CTASection from "./components/CTASection"

export default async function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Logo section */}
      <section className="mx-auto max-w-7xl pt-8 pb-4">
        <div className="flex justify-center">
          <Image src={iManageLogo} width={120} height={120} alt="iManage Logo" className="pb-4" />
        </div>
      </section>

      {/* Hero Section with Video */}
      <HeroSection />

      {/* Value Proposition Section */}
      <ValueSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  )
}
