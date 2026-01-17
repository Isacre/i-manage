"use client"
import React, { useState, useEffect } from "react"
import { UseFormRegister } from "react-hook-form"
import Image from "next/image"

interface Props {
  id: string
  label?: string
  register: UseFormRegister<any>
  error?: string
  currentImageUrl?: string
  accept?: string
}

// Função auxiliar para detectar se o arquivo é HEIC/HEIF
const isHeicFile = (file: File): boolean => {
  const fileName = file.name.toLowerCase()
  const fileType = file.type.toLowerCase()
  return (
    fileName.endsWith(".heic") ||
    fileName.endsWith(".heif") ||
    fileType === "image/heic" ||
    fileType === "image/heif"
  )
}

export default function FileField({ id, label, register, error, currentImageUrl, accept = "image/*" }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)

  // Limpar URL do preview quando o componente desmontar
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Limpar preview quando currentImageUrl mudar (quando uma nova imagem é carregada externamente)
  useEffect(() => {
    if (currentImageUrl && previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }, [currentImageUrl])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      setPreviewUrl(null)
      return
    }

    // Se for HEIC, converter para JPEG
    if (isHeicFile(file)) {
   

      setIsConverting(true)
      try {
        if (typeof window !== 'undefined') {
          const heic2any = require('heic2any');
  
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.9,
          })
          
          // heic2any pode retornar um array ou um único Blob
          const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob
          
          // Criar URL para preview
          const url = URL.createObjectURL(blob)
          setPreviewUrl(url)
        }
      } catch (error) {
        console.error("Erro ao converter HEIC:", error)
        // Se falhar, tenta usar o FileReader normal
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } finally {
        setIsConverting(false)
      }
    } else {
      // Para outros formatos, usa FileReader normalmente
      // Limpar URL anterior se existir (para arquivos HEIC convertidos)
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="block pl-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Loading state */}
      {isConverting && (
        <div className="mb-2">
          <p className="mb-1 text-sm text-gray-600">Convertendo imagem HEIC...</p>
          <div className="flex h-32 w-32 items-center justify-center rounded-lg border border-gray-300 bg-gray-100">
            <div className="text-sm text-gray-500">Aguarde...</div>
          </div>
        </div>
      )}

      {/* Current image preview */}
      {(currentImageUrl || previewUrl) && !isConverting && (
        <div className="mb-2">
          <p className="mb-1 text-sm text-gray-600">Current image:</p>
          <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-300">
            <Image
              src={previewUrl || `${process.env.NEXT_PUBLIC_MEDIA_FETCHING_URL}${currentImageUrl}`}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* File input */}
      <input
        id={id}
        type="file"
        accept={accept.includes("*") ? "image/*,.heic,.heif" : accept}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
        {...register(id)}
        onChange={handleFileChange}
      />
      <p className="mt-1 text-xs text-gray-500">
        Formatos suportados: JPG, PNG, HEIC, HEIF
      </p>
      {error && <small className="mt-1 text-red-500">{error}</small>}
    </div>
  )
}
