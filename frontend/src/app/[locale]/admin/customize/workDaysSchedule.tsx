import { useCompanyStore } from "@/stores/company-store"
import { CompanyType, DaySchedule } from "@/types"
import { DAYS_OF_WEEK } from "@/utils"

export default function WorkDaysSchedule() {
  const { company, update } = useCompanyStore()

  const schedule = company?.schedule || {}

  const updateDaySchedule = (dayKey: string, field: "enabled" | "opens_at" | "closes_at", value: boolean | string) => {
    if (!company) return

    const currentSchedule = schedule[dayKey] || { enabled: false, opens_at: "08:00", closes_at: "18:00" }
    const newSchedule = {
      ...schedule,
      [dayKey]: {
        ...currentSchedule,
        [field]: value,
      },
    }

    update({
      ...company,
      schedule: newSchedule,
    } as CompanyType)
  }

  return (
    <div className="w-full space-y-3">
      <label className="block text-sm font-medium text-gray-700">Working Days</label>
      <div className="space-y-2">
        {DAYS_OF_WEEK.map((day) => {
          const daySchedule: DaySchedule = schedule[day.value] || {
            enabled: false,
            opens_at: "08:00",
            closes_at: "18:00",
          }

          return (
            <div
              key={day.value}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                daySchedule.enabled
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2 min-w-[140px]">
                <input
                  type="checkbox"
                  checked={daySchedule.enabled}
                  onChange={(e) => updateDaySchedule(day.value, "enabled", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className={`text-sm font-medium ${daySchedule.enabled ? "text-gray-900" : "text-gray-500"}`}>
                  {day.label}
                </span>
              </div>
              {daySchedule.enabled && (
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm text-gray-600">→</span>
                  <input
                    type="time"
                    value={daySchedule.opens_at}
                    onChange={(e) => updateDaySchedule(day.value, "opens_at", e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                  <span className="text-sm text-gray-600">-</span>
                  <input
                    type="time"
                    value={daySchedule.closes_at}
                    onChange={(e) => updateDaySchedule(day.value, "closes_at", e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

