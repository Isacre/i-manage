"use client"
import { IoClose } from "react-icons/io5"
import { IoArrowBack } from "react-icons/io5"
import * as s from "./styles"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
  isOpen: boolean
  setOpen: Function
  title: string
  children: React.ReactNode
  returnFunction?: () => void
  loadingDependencies?: any[]
}

export default function Modal({ isOpen, setOpen, title, children, returnFunction, loadingDependencies }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Bloquear scroll do body quando modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      // Salvar o scroll atual
      const scrollY = window.scrollY
      // Adicionar overflow-hidden ao body
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    } else {
      // Restaurar o scroll quando fechar
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1)
      }
    }

    // Cleanup
    return () => {
      if (isOpen) {
        const scrollY = document.body.style.top
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflow = ""
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || "0") * -1)
        }
      }
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const modalContent = (
    <div 
      className={s.wrapperStyle} 
      style={{ zIndex: 99999 }}
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      <div 
        className={s.backgroundStyle} 
        style={{ zIndex: 99998 }}
        onClick={() => setOpen(false)} 
      />
      <div 
        className={s.modalContentStyle}
        style={{ zIndex: 100000 }}
      >
        <div className={s.modalHeaderStyle}>
          <h3 id="modal-title" className="flex items-center gap-2">
            {returnFunction && <IoArrowBack className="cursor-pointer" size={24} onClick={() => returnFunction()} />}
            {title}
          </h3>
          <button onClick={() => setOpen(false)} className={s.modalCloseButtonStyle}>
            <IoClose size={24} />
          </button>
        </div>
        <main className="max-h-[80vh] overflow-y-auto bg-gray-200 p-4 shadow-inner">
          {loadingDependencies?.some((item) => item) ? <div>Loading...</div> : children}
        </main>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
