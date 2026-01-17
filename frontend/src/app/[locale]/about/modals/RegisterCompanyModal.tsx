"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "@/components/modal"
import { StepIndicator, StepNavigation } from "@/components/steps"
import { useSteps } from "@/hooks/useSteps"
import { companySchema, CompanyFormData } from "./schemas"
import Step1BasicInfo from "./steps/Step1BasicInfo"
import Step2ContactInfo from "./steps/Step2ContactInfo"
import Step3Schedule from "./steps/Step3Schedule"
import Step4AdditionalInfo from "./steps/Step4AdditionalInfo"
import Step5Summary from "./steps/Step5Summary"
import { DEFAULT_SCHEDULE } from "@/utils"
import { registerCompany, getTokens, getUserData } from "@/services/auth"
import { uploadImage } from "@/services/company"
import { toast } from "react-toastify"
import { useLocale } from "next-intl"
import { Cookie } from "@/utils"
import { useUserStore } from "@/stores/user-store"
import { useState } from "react"

interface Props {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

export default function RegisterCompanyModal({ isOpen, setOpen }: Props) {
  const locale = useLocale()
  const { update } = useUserStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    getValues,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    mode: "onChange",
    defaultValues: {
      timezone: "America/Sao_Paulo",
      schedule: DEFAULT_SCHEDULE,
    },
  })

  const totalSteps = 5
  const { currentStep, nextStep, previousStep } = useSteps({
    initialStep: 1,
    totalSteps,
  })

  async function handleNext() {
    let fieldsToValidate: (keyof CompanyFormData)[] = []

    if (currentStep === 1) {
      fieldsToValidate = ["name", "description", "identifier", "email", "password"]
    } else if (currentStep === 2) {
      fieldsToValidate = ["phone", "address"]
    } else if (currentStep === 3) {
      fieldsToValidate = ["timezone", "schedule"]
    } else if (currentStep === 4) {
      fieldsToValidate = ["keywords"]
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      nextStep()
    }
  }

  async function onSubmit(data: CompanyFormData) {
    setIsSubmitting(true)
    try {
      // Fazer upload das imagens se existirem
      let imageUrl: string | undefined = undefined
      let bannerUrl: string | undefined = undefined

      const imageValue = getValues("image") as FileList | File | undefined
      const bannerValue = getValues("banner") as FileList | File | undefined
      
      const imageFile = imageValue instanceof FileList 
        ? imageValue[0] 
        : imageValue instanceof File 
        ? imageValue 
        : undefined
      
      const bannerFile = bannerValue instanceof FileList 
        ? bannerValue[0] 
        : bannerValue instanceof File 
        ? bannerValue 
        : undefined

      if (imageFile) {
        try {
          const imageResponse = await uploadImage(imageFile, "company_images")
          imageUrl = imageResponse.url
        } catch (error) {
          console.error("Erro ao fazer upload da imagem:", error)
          toast.error("Erro ao fazer upload da logo")
          setIsSubmitting(false)
          return
        }
      }

      if (bannerFile) {
        try {
          const bannerResponse = await uploadImage(bannerFile, "company_banners")
          bannerUrl = bannerResponse.url
        } catch (error) {
          console.error("Erro ao fazer upload do banner:", error)
          toast.error("Erro ao fazer upload do banner")
          setIsSubmitting(false)
          return
        }
      }

      const formData: any = {
        name: data.name,
        description: data.description,
        phone: data.phone,
        email: data.email,
        password: data.password,
        timezone: data.timezone,
        identifier: data.identifier,
        address: data.address,
        keywords: data.keywords
          ? data.keywords.split(",").map((k) => k.trim()).filter((k) => k.length > 0)
          : [],
        schedule: data.schedule,
      }

      // Adicionar URLs das imagens se existirem
      if (imageUrl) {
        formData.image = imageUrl
      }
      if (bannerUrl) {
        formData.banner = bannerUrl
      }

      // Registrar a empresa
      await registerCompany(formData)

      // Fazer login automático
      try {
        const tokens = await getTokens({
          email: data.email,
          password: data.password,
        })
        
        Cookie.set("access", tokens.access)
        Cookie.set("refresh", tokens.refresh)

        // Buscar dados do usuário
        const userData = await getUserData()
        update(userData)

        toast.success("Empresa cadastrada com sucesso!")
        setOpen(false)

        // Redirecionar para o painel do admin
        if (userData.company) {
          const newSubdomain = userData.company.identifier
          const newUrl = `http://${newSubdomain}.localhost:3000/${locale}/admin/employees`
          window.location.href = newUrl
        }
      } catch (loginError) {
        console.error("Erro ao fazer login:", loginError)
        toast.error("Empresa cadastrada, mas houve erro ao fazer login. Por favor, faça login manualmente.")
        setOpen(false)
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar empresa:", error)
      const errorMessage = error.response?.data?.message || "Erro ao cadastrar empresa"
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  function renderStepContent() {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo register={register} errors={errors} />

      case 2:
        return <Step2ContactInfo register={register} errors={errors} />

      case 3:
        return (
          <Step3Schedule
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            defaultSchedule={DEFAULT_SCHEDULE}
          />
        )

      case 4:
        return <Step4AdditionalInfo register={register} errors={errors} />

      case 5:
        return <Step5Summary watch={watch} defaultSchedule={DEFAULT_SCHEDULE} />

      default:
        return null
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      title={`Cadastro de Empresa - Etapa ${currentStep} de ${totalSteps}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        {renderStepContent()}
        <StepNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={previousStep}
          onNext={handleNext}
          onCancel={() => setOpen(false)}
          submitLabel={isSubmitting ? "Cadastrando..." : "Confirmar Cadastro"}
          isSubmitting={isSubmitting}
        />
      </form>
    </Modal>
  )
}

