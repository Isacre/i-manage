"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { 
  Menu, 
  Clock, 
  MessageCircle, 
  MapPin,
  ArrowRight 
} from "lucide-react"

const values = [
  {
    icon: Menu,
    key: "menu",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    key: "time",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    key: "support",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    key: "data",
    gradient: "from-orange-500 to-red-500",
  },
]

export default function ValueSection() {
  const t = useTranslations("About.values")

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Por que escolher o iManage?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforme a gestão do seu negócio com soluções inteligentes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.key}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative h-full p-8 bg-white rounded-2xl border border-gray-200 hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <motion.div
                    className={`relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 transition-all">
                      {t(`${value.key}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {t(`${value.key}.description`)}
                    </p>
                    
                    <motion.div
                      className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-red-600"
                      whileHover={{ x: 5 }}
                    >
                    </motion.div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

