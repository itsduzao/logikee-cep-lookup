import { z } from 'zod'

export const viaCepSuccessSchema = z.object({
  logradouro: z.string(),
  localidade: z.string(),
  uf: z.string(),
})

export const viaCepErrorSchema = z.object({
  erro: z.literal(true)
})

// Schema unificado para validação
export const viaCepResponseSchema = z.union([
  viaCepSuccessSchema,
  viaCepErrorSchema
])

export type ViaCepSuccess = z.infer<typeof viaCepSuccessSchema>
export type ViaCepError = z.infer<typeof viaCepErrorSchema>
export type ViaCepResponse = z.infer<typeof viaCepResponseSchema>