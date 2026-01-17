"use client"
import { motion } from "framer-motion"
import { IconType } from "react-icons/lib"

export default function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: IconType
  title: string
  description: string
  index: number
}) {
  const Icon = icon

  return (
    <motion.div
      className="group relative flex flex-col items-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-red-200 transition-all duration-300 shadow-md hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      <motion.div
        className="relative z-10 mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
          <Icon size={32} className="text-white" />
        </div>
      </motion.div>

      <div className="relative z-10 text-center">
        <h3 className="mb-3 text-xl font-semibold min-h-[3rem] flex items-center justify-center text-gray-900 group-hover:text-red-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

