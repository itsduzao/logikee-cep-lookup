import { z } from 'zod'

export const viaCepResponseSchema = z.union([
  z.object({
    logradouro: z.string(),
    localidade: z.string(),
    uf: z.string(),
  }),
  z.object({ erro: z.literal(true) })
])

export type ViaCepResponse = z.infer<typeof viaCepResponseSchema>