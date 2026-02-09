import {
  viaCepResponseSchema,
  type ViaCepError,
  type ViaCepResponse,
} from "@/schemas/viaCepResponse.schema";
import type { CepQueryState } from "@/types";
import { isValidCepFormat, sanitizeCEP } from "@/utils/cep";
import { mapViaCepToAddressData } from "@/utils/mappers";
import { useState } from "react";

/**
 * Type guard para verificar se a resposta da API é um erro
 */
function isViaCepError(data: ViaCepResponse): data is ViaCepError {
  return "erro" in data && (data.erro === true || data.erro === "true");
}

/**
 * Hook customizado para buscar dados de endereço via API ViaCEP
 *
 * @returns Objeto contendo:
 * - data: Dados do endereço retornados pela API
 * - isLoading: Indica se há uma requisição em andamento
 * - error: Mensagem de erro, caso ocorra
 * - fetchAddress: Função para buscar o endereço por CEP
 * - reset: Função para limpar o estado
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, fetchAddress } = useCepLookup();
 *
 * // Buscar endereço
 * await fetchAddress('12345-678');
 * ```
 */
export function useCepLookup() {
  const [state, setState] = useState<CepQueryState>({
    data: null,
    isLoading: false,
    error: null,
  });

  /**
   * Busca dados do endereço na API ViaCEP
   * @param cep - CEP a ser buscado (com ou sem formatação)
   */
  const fetchAddress = async (cep: string) => {
    // Limpa e valida o CEP antes de fazer a requisição
    const cleanedCep = sanitizeCEP(cep);

    if (!isValidCepFormat(cleanedCep)) {
      setState({
        data: null,
        isLoading: false,
        error: "CEP inválido. Digite um CEP com 8 dígitos.",
      });
      return;
    }

    // Inicia o loading state
    setState({
      data: null,
      isLoading: true,
      error: null,
    });

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanedCep}/json/`,
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP. Tente novamente.");
      }

      const rawData = await response.json();

      const parseResult = viaCepResponseSchema.safeParse(rawData);

      if (!parseResult.success) {
        console.error("❌ Resposta da API inválida:", parseResult.error);
        throw new Error("Resposta da API em formato inesperado");
      }

      const data = parseResult.data;

      if (isViaCepError(data)) {
        setState({
          data: null,
          isLoading: false,
          error: "CEP não encontrado. Verifique o número digitado.",
        });
        return;
      }

      const mappedData = mapViaCepToAddressData(data);

      setState({
        data: mappedData,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState({
        data: null,
        isLoading: false,
        error:
          err instanceof Error
            ? err.message
            : "Erro ao buscar CEP. Verifique sua conexão.",
      });
    }
  };

  /**
   * Reseta o estado do hook para os valores iniciais
   */
  const reset = () => {
    setState({
      data: null,
      isLoading: false,
      error: null,
    });
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    fetchAddress,
    reset,
  };
}

