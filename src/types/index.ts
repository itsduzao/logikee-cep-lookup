export interface AddressData {
  logradouro: string
  cidade: string
  estado: string
}

export interface CepQueryState {
  data: AddressData | null;
  isLoading: boolean;
  error: string | null;
}