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
  const cleaned = sanitizeCEP(cep)

  if (cleaned.length <= 5) return cleaned

  return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
}

/**
 * Valida se um CEP possui o formato correto (8 dígitos)
 * @param cep - CEP a ser validado (pode conter ou não formatação)
 * @returns true se o CEP é válido, false caso contrário
 * @example
 * isValidCepFormat('12345-678') // true
 * isValidCepFormat('12345678') // true
 * isValidCepFormat('123') // false
 */
export function isValidCepFormat(cep: string): boolean {
  const cleaned = sanitizeCEP(cep);
  return cleaned.length === 8;
}