import { UseFormWatch } from "react-hook-form"
import { CompanyFormData } from "../schemas"
import { DAYS_OF_WEEK } from "@/utils"

interface Step5SummaryProps {
  watch: UseFormWatch<CompanyFormData>
  defaultSchedule: Record<string, { enabled: boolean; opens_at: string; closes_at: string }>
}

export default function Step5Summary({ watch, defaultSchedule }: Step5SummaryProps) {
  const formData = watch()
  const watchedSchedule = watch("schedule") || defaultSchedule

  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-lg font-semibold">Resumo do Cadastro</h3>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="space-y-3">
          <div>
            <span className="font-semibold">Nome da Empresa:</span> {formData.name}
          </div>
          <div>
            <span className="font-semibold">Identificador:</span> {formData.identifier}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {formData.email}
          </div>
          <div>
            <span className="font-semibold">Telefone:</span> {formData.phone}
          </div>
          <div>
            <span className="font-semibold">Endereço:</span> {formData.address}
          </div>
          <div>
            <span className="font-semibold">Horários de Funcionamento:</span>
            <div className="mt-2 space-y-1 pl-4">
              {Object.entries(watchedSchedule || {})
                .filter(([_, schedule]) => schedule?.enabled)
                .map(([dayKey, schedule]) => {
                  const day = DAYS_OF_WEEK.find((d) => d.value === dayKey)
                  return (
                    <div key={dayKey} className="text-sm">
                      <span className="font-medium">{day?.label}:</span> {schedule.opens_at} às {schedule.closes_at}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Revise as informações acima e clique em "Confirmar Cadastro" para finalizar.
      </p>
    </div>
  )
}

