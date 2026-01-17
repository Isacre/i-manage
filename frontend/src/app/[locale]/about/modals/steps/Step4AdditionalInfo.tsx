import { UseFormRegister, FieldErrors } from "react-hook-form"
import FormFields from "@/components/formFields"
import { CompanyFormData } from "../schemas"

interface Step4AdditionalInfoProps {
  register: UseFormRegister<CompanyFormData>
  errors: FieldErrors<CompanyFormData>
}

export default function Step4AdditionalInfo({ register, errors }: Step4AdditionalInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-lg font-semibold">Informações Adicionais</h3>
      <div className="relative">
        <label className="block pl-1 text-sm font-medium text-gray-700">
          Palavras-chave (separadas por vírgula)
        </label>
        <input
          id="keywords"
          type="text"
          placeholder="ex: beleza, cabelo, manicure, pedicure"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
          {...register("keywords")}
        />
        <p className="mt-1 text-xs text-gray-500">
          Palavras-chave ajudam clientes a encontrarem sua empresa
        </p>
        {errors.keywords && (
          <small className="mt-1 text-red-500">{errors.keywords.message}</small>
        )}
      </div>
      <FormFields.FileField
        id="image"
        label="Logo da Empresa (opcional)"
        register={register}
        error={errors.image?.message as string}
        accept="image/*"
      />
      <FormFields.FileField
        id="banner"
        label="Banner da Empresa (opcional)"
        register={register}
        error={errors.banner?.message as string}
        accept="image/*"
      />
    </div>
  )
}

