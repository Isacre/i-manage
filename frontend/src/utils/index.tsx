/**
 * @description Cookie utils
 * @returns Cookie utils (get, set, delete)
 */
export const Cookie = {
  get: (name: string) => {
    if (typeof window !== "undefined") {
      const value = `; ${document?.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) {
        return parts.pop()?.split(";").shift()
      }
    }
  },
  set: (name: string, value: string) => {
    if (typeof window !== "undefined") {
      document.cookie = `${name}=${value}; path=/; secure; max-age=3600`
    }
  },
  delete: (name: string) => {
    if (typeof window !== "undefined") {
      document.cookie = `${name}=; path=/; secure; max-age=0`
    }
  },
}

/**
 * @description Calculate how many days are left until the next work day
 * @param today - Day of the week (0-6)
 * @param workDays - Days the company works
 * @returns Difference in days
 */
export function calcWeekDayDiff(today: number, workDays: number[]) {
  let diff = 0
  const weekdays = [0, 1, 2, 3, 4, 5, 6]

  if (workDays.indexOf(today) !== -1) {
    return 0
  }

  for (let i = today; workDays.indexOf(weekdays[i]) === -1; i++) {
    if (i === 6) {
      i = 0
    }
    diff += 1
  }
  return diff
}


export const DAYS_OF_WEEK = [
  { value: "0", label: "Segunda-feira" },
  { value: "1", label: "Terça-feira" },
  { value: "2", label: "Quarta-feira" },
  { value: "3", label: "Quinta-feira" },
  { value: "4", label: "Sexta-feira" },
  { value: "5", label: "Sábado" },
  { value: "6", label: "Domingo" },
]

export const TIMEZONE_OPTIONS = [
  { value: "America/Sao_Paulo", label: "Brasília (GMT-3)" },
  { value: "America/Manaus", label: "Manaus (GMT-4)" },
  { value: "America/Rio_Branco", label: "Rio Branco (GMT-5)" },
  { value: "America/Fortaleza", label: "Fortaleza (GMT-3)" },
]

export   const DEFAULT_SCHEDULE = {
  "0": { enabled: true, opens_at: "08:00", closes_at: "18:00" },
  "1": { enabled: true, opens_at: "08:00", closes_at: "18:00" },
  "2": { enabled: true, opens_at: "08:00", closes_at: "18:00" },
  "3": { enabled: true, opens_at: "08:00", closes_at: "18:00" },
  "4": { enabled: true, opens_at: "08:00", closes_at: "18:00" },
  "5": { enabled: false, opens_at: "08:00", closes_at: "18:00" },
  "6": { enabled: false, opens_at: "08:00", closes_at: "18:00" },
}
