import { z } from "zod"

// Schema de validação para horários por dia
export const dayScheduleSchema = z
  .object({
    enabled: z.boolean(),
    opens_at: z.string(),
    closes_at: z.string(),
  })
  .refine(
    (data) => {
      if (!data.enabled) return true // Não valida se o dia está desabilitado
      const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/
      return timeRegex.test(data.opens_at) && timeRegex.test(data.closes_at)
    },
    {
      message: "Formato de hora inválido (use HH:MM)",
      path: ["opens_at"],
    }
  )
  .refine((data) => {
    if (!data.enabled) return true // Não valida se o dia está desabilitado
    const opens = data.opens_at.split(":")
    const closes = data.closes_at.split(":")
    const opensMinutes = parseInt(opens[0]) * 60 + parseInt(opens[1])
    const closesMinutes = parseInt(closes[0]) * 60 + parseInt(closes[1])
    return closesMinutes > opensMinutes
  }, {
    message: "Hora de fechamento deve ser posterior à hora de abertura",
    path: ["closes_at"],
  })

// Schema de validação
export const companySchema = z.object({
  // Etapa 1
  name: z.string().min(1, "Nome da empresa é obrigatório"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  identifier: z.string()
    .min(3, "Identificador deve ter pelo menos 3 caracteres")
    .max(64, "Identificador deve ter no máximo 64 caracteres")
    .regex(/^[a-z0-9-]+$/, "Identificador deve conter apenas letras minúsculas, números e hífens"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  
  // Etapa 2
  phone: z.string().min(10, "Telefone inválido"),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  
  // Etapa 3
  timezone: z.string().min(1, "Fuso horário é obrigatório"),
  schedule: z.record(z.string(), dayScheduleSchema).refine(
    (data) => {
      // Valida que pelo menos um dia está habilitado
      return Object.values(data).some((day) => day.enabled)
    },
    {
      message: "Selecione pelo menos um dia de funcionamento",
      path: ["schedule"],
    }
  ),
  
  // Etapa 4
  keywords: z.string().optional(),
  image: z.any().optional(),
  banner: z.any().optional(),
})

export type CompanyFormData = z.infer<typeof companySchema>

