import type { ViaCepSuccess } from "@/schemas/viaCepResponse.schema"
import type { AddressData } from "@/types"

/**
 * Mapeia a resposta da API ViaCEP para o formato da aplicação
 * @param data - Dados retornados pela API ViaCEP
 * @returns Dados mapeados para os nomes dos campos do formulário
 */
export function mapViaCepToAddressData(data: ViaCepSuccess): AddressData {
  return {
    logradouro: data.logradouro,
    cidade: data.localidade,
    estado: data.uf,
  }
}