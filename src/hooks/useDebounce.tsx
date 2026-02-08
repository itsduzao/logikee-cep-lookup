import { useEffect, useState } from 'react'

/**
 * Hook que retorna um valor "debounced" (atrasado).
 * Útil para evitar chamadas excessivas de API durante digitação.
 * 
 * @param value - O valor a ser "debounced"
 * @param delay - Tempo de atraso em milissegundos
 * @returns O valor atrasado
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("")
 * const debouncedSearch = useDebounce(searchTerm, 500)
 * 
 * useEffect(() => {
 *   // Busca API apenas após 500ms sem digitar
 *   fetchAPI(debouncedSearch)
 * }, [debouncedSearch])
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timerID)
    }
  }, [value, delay])

  return debouncedValue
}