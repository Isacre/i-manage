import { UseFormRegister, FieldErrors } from "react-hook-form"
import FormFields from "@/components/formFields"
import { CompanyFormData } from "../schemas"

interface Step1BasicInfoProps {
  register: UseFormRegister<CompanyFormData>
  errors: FieldErrors<CompanyFormData>
}

export default function Step1BasicInfo({ register, errors }: Step1BasicInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-lg font-semibold">Informações Básicas</h3>
      <FormFields.UncontrolledTextField
        id="name"
        label="Nome da Empresa *"
        placeholder="Digite o nome da empresa"
        register={register}
        error={errors.name?.message}
      />
      <FormFields.UncontrolledTextField
        id="identifier"
        label="Identificador Único *"
        placeholder="exemplo-empresa-123"
        register={register}
        error={errors.identifier?.message}
      />
      <p className="text-xs text-gray-500">
        O identificador será usado na URL da sua empresa. Apenas letras minúsculas, números e hífens.
      </p>
      <div className="relative">
        <label className="block pl-1 text-sm font-medium text-gray-700">
          Descrição *
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Descreva sua empresa..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
          {...register("description")}
        />
        {errors.description && (
          <small className="mt-1 text-red-500">{errors.description.message}</small>
        )}
      </div>
      <FormFields.UncontrolledTextField
        id="email"
        label="Email *"
        type="email"
        placeholder="seu@email.com"
        register={register}
        error={errors.email?.message}
        autoComplete="new-email"
      />
      <FormFields.UncontrolledTextField
        id="password"
        label="Senha *"
        type="password"
        placeholder="Mínimo 8 caracteres"
        register={register}
        error={errors.password?.message}
        autoComplete="new-password"

      />
    </div>
  )
}

