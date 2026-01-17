import { UseFormRegister, FieldErrors } from "react-hook-form"
import FormFields from "@/components/formFields"
import { CompanyFormData } from "../schemas"

interface Step2ContactInfoProps {
  register: UseFormRegister<CompanyFormData>
  errors: FieldErrors<CompanyFormData>
}

export default function Step2ContactInfo({ register, errors }: Step2ContactInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-lg font-semibold">Informações de Contato</h3>
      <FormFields.UncontrolledTextField
        id="phone"
        label="Telefone *"
        placeholder="(00) 00000-0000"
        register={register}
        error={errors.phone?.message}
      />
      <div className="relative">
        <label className="block pl-1 text-sm font-medium text-gray-700">
          Endereço *
        </label>
        <textarea
          id="address"
          rows={3}
          placeholder="Rua, número, bairro, cidade - UF"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 transition focus:ring-2 focus:ring-red-500 focus:outline-none"
          {...register("address")}
        />
        {errors.address && (
          <small className="mt-1 text-red-500">{errors.address.message}</small>
        )}
      </div>
    </div>
  )
}

