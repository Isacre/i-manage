"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import RegisterCompanyModal from "../modals/RegisterCompanyModal"

export default function RegisterCompanyButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        variant="destructive"
        style={{ cursor: "pointer" }}
        onClick={() => setIsModalOpen(true)}
        size="lg"
      >
        Quero cadastrar minha empresa
      </Button>
      <RegisterCompanyModal isOpen={isModalOpen} setOpen={setIsModalOpen} />
    </>
  )
}

