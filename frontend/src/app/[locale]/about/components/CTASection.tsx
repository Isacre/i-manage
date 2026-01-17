"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import RegisterCompanyButton from "./RegisterCompanyButton"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  const t = useTranslations("About")

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/20 mb-6"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-8 h-8 text-red-500" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t("footer.title")}
          </h2>
          <p className="mb-10 text-lg md:text-xl text-gray-300 leading-relaxed">
            {t("footer.subtitle")}
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Voltar ao topo e cadastrar minha empresa</Button>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
