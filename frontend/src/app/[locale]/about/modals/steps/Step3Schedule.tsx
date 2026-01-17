import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form"
import FormFields from "@/components/formFields"
import { CompanyFormData } from "../schemas"
import { DAYS_OF_WEEK, TIMEZONE_OPTIONS } from "@/utils"

interface Step3ScheduleProps {
  register: UseFormRegister<CompanyFormData>
  errors: FieldErrors<CompanyFormData>
  watch: UseFormWatch<CompanyFormData>
  setValue: UseFormSetValue<CompanyFormData>
  defaultSchedule: Record<string, { enabled: boolean; opens_at: string; closes_at: string }>
}

export default function Step3Schedule({ 
  register, 
  errors, 
  watch, 
  setValue, 
  defaultSchedule 
}: Step3ScheduleProps) {
  const watchedSchedule = watch("schedule") || defaultSchedule

  const toggleDayEnabled = (dayKey: string) => {
    const current = watchedSchedule[dayKey] || { enabled: false, opens_at: "08:00", closes_at: "18:00" }
    setValue(`schedule.${dayKey}`, {
      ...current,
      enabled: !current.enabled,
    })
  }

  const updateDaySchedule = (dayKey: string, field: "opens_at" | "closes_at", value: string) => {
    const current = watchedSchedule[dayKey] || { enabled: true, opens_at: "08:00", closes_at: "18:00" }
    setValue(`schedule.${dayKey}`, {
      ...current,
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-lg font-semibold">Horários de Funcionamento</h3>
      <FormFields.SelectField
        id="timezone"
        label="Fuso Horário *"
        register={register}
        options={TIMEZONE_OPTIONS}
        error={errors.timezone?.message}
      />
      <div className="space-y-3">
        <label className="block pl-1 text-sm font-medium text-gray-700 mb-2">
          Configure os horários para cada dia da semana
        </label>
        {DAYS_OF_WEEK.map((day) => {
          const daySchedule = watchedSchedule[day.value] || { enabled: false, opens_at: "08:00", closes_at: "18:00" }
          const dayError = errors.schedule?.[day.value]
          return (
            <div
              key={day.value}
              className={`rounded-lg border p-4 transition-all ${
                daySchedule.enabled
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={daySchedule.enabled}
                    onChange={() => toggleDayEnabled(day.value)}
                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className={`text-sm font-medium ${daySchedule.enabled ? "text-gray-900" : "text-gray-500"}`}>
                    {day.label}
                  </span>
                </label>
              </div>
              {daySchedule.enabled && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Abertura</label>
                    <input
                      type="time"
                      value={daySchedule.opens_at}
                      onChange={(e) => updateDaySchedule(day.value, "opens_at", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                    {dayError?.opens_at && (
                      <small className="mt-1 text-red-500 text-xs">{dayError.opens_at.message}</small>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Fechamento</label>
                    <input
                      type="time"
                      value={daySchedule.closes_at}
                      onChange={(e) => updateDaySchedule(day.value, "closes_at", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                    {dayError?.closes_at && (
                      <small className="mt-1 text-red-500 text-xs">{dayError.closes_at.message}</small>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {errors.schedule && typeof errors.schedule === "object" && "message" in errors.schedule && (
          <small className="mt-1 text-red-500">{errors.schedule.message as string}</small>
        )}
      </div>
    </div>
  )
}

