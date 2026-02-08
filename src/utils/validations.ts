/**
 * Aplica uma máscara de formatação em um CEP (Código de Endereçamento Postal).
 * 
 * @param cep - O CEP a ser formatado (pode conter ou não caracteres especiais)
 * @returns O CEP formatado no padrão XXXXX-XXX. Se o CEP tiver 5 ou menos dígitos,
 * retorna o CEP sanitizado sem a máscara
 * 
 * @example
 * ```typescript
 * maskCEP('12345678') // retorna '12345-678'
 * maskCEP('12345') // retorna '12345'
 * ```
 */
export function maskCEP(cep: string): string {
  const sanitizedCEP = sanitizeCEP(cep)

  if (sanitizedCEP.length <= 5) return sanitizedCEP

  const maskedCEP = sanitizedCEP.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9)

  return maskedCEP
}

/**
 * Remove todos os caracteres não numéricos de uma string de CEP.
 * @param cep - A string do CEP a ser sanitizada
 * @returns O CEP contendo apenas dígitos numéricos
 * @example
 * ```ts
 * sanitizeCEP("12345-678") // returns "12345678"
 * sanitizeCEP("12.345-678") // returns "12345678"
 * ```
 */
export function sanitizeCEP(cep: string): string {
  return cep.replace(/\D/g, "")
}