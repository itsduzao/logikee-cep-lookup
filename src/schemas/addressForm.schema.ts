import { z } from 'zod'

export const addressFormSchema = z.object({
  /* validação de cep formato (00000-000) */
  cep: z.string().length(9).regex(/^\d{5}-\d{3}$/),
  logradouro: z.string(),
  estado: z.string(),
  cidade: z.string(),
  numero: z.string().min(1),
  complemento: z.string().optional()
})

export type AddressForm = z.infer<typeof addressFormSchema>