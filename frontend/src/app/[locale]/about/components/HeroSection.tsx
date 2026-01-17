"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "@radix-ui/themes"
import { useTranslations } from "next-intl"
import RegisterCompanyButton from "./RegisterCompanyButton"
export default function HeroSection() {
  const t = useTranslations("About")
  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video - YouTube embed como background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute inset-0 w-full h-full scale-150"
            src="https://www.youtube.com/embed/hOgVAYpHPCc?si=pkmG7hc_-Pr8ouvp&autoplay=1&mute=1&loop=1&playlist=hOgVAYpHPCc&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=0"
            title="Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            style={{ 
              pointerEvents: "none",
              transform: "scale(1.5)",
              transformOrigin: "center center"
            }}
          />
        </div>
        
        {/* Overlay gradient para melhorar legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        
        {/* Animated overlay elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="mb-6 text-4xl font-bold sm:text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.rich("header", {
              bold: (chunks) => (
                <motion.span
                  className="bg-gradient-to-r from-red-400 via-red-500 to-red-400 bg-clip-text text-transparent drop-shadow-lg"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  {chunks}
                </motion.span>
              ),
            })}
          </motion.h1>

          <motion.p
            className="mb-10 text-lg sm:text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("description")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <RegisterCompanyButton />
            <Link href={demoUrl || "#"}>
              <Button
                className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg"
                variant="outline"
                style={{ cursor: "pointer" }}
                size="lg"
              >
                {t("secondary_button")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

