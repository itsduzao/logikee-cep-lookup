import { z } from 'zod'

export const addressFormSchema = z.object({
  cep: z.string()
    .min(1, { error: "CEP é obrigatório" })
    .regex(/^\d{5}-\d{3}$/, { error: "CEP deve conter o formato 00000-000." }),
  logradouro: z.string(),
  estado: z.string(),
  cidade: z.string(),
  numero: z.string().min(1, { error: "Número é obrigatório" }).max(20, { error: "Número muito longo." }),
  complemento: z.string().max(100, { error: "Complemento muito longo." }).optional()
})

export type AddressForm = z.infer<typeof addressFormSchema>