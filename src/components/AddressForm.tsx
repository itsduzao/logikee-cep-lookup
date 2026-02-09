import { useCepLookup } from "@/hooks/useCepQuery";
import { useDebounce } from "@/hooks/useDebounce";
import {
  addressFormSchema,
  type AddressFormData,
} from "@/schemas/addressForm.schema";
import { maskCEP } from "@/utils/cep";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import { Loader2, MapPin } from "lucide-react";
import { useEffect, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "./FormField";
import { Input } from "./Input";

export default function AddressForm() {
  // Estados locais
  const {
    data,
    isLoading,
    error: apiError,
    fetchAddress,
    reset,
  } = useCepLookup();

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset: resetState,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      cep: "",
      logradouro: "",
      cidade: "",
      estado: "",
      numero: "",
      complemento: "",
    },
  });

  // Watch + Debounce
  const cepValue = watch("cep");
  const debouncedCep = useDebounce(cepValue, 500);

  // Busca automática quando o CEP estiver completo
  useEffect(() => {
    if (debouncedCep && debouncedCep.length === 9) {
      fetchAddress(debouncedCep);
    }
  }, [debouncedCep]);

  // Insere os dados nos campos readOnly
  useEffect(() => {
    if (data) {
      setValue("logradouro", data.logradouro);
      setValue("cidade", data.cidade);
      setValue("estado", data.estado);
    }
  }, [data, setValue]);

  // Limpa todos os campos durante a busca
  useEffect(() => {
    if (isLoading) {
      setValue("logradouro", "");
      setValue("cidade", "");
      setValue("estado", "");
      setValue("numero", "");
      setValue("complemento", "");
    }
  }, [isLoading, setValue]);

  // Handler de máscara
  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const masked = maskCEP(e.target.value);
    setValue("cep", masked);
  };

  // Submit handler
  const onSubmit = (formData: AddressFormData) => {
    console.log("Dados do formulário:", formData);
    alert("Endereço cadastrado com sucesso!\n\nDados no console.");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
      {/* Container que agrupa card + rodapé */}
      <div className="w-full max-w-2xl">
        {/* Card do formulário */}
        <main>
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
              <MapPin className="w-6 h-6 text-emerald-400" />
              <div>
                <h1 className="text-xl font-bold">Cadastro de Endereço</h1>
                <p className="text-slate-400 text-sm">
                  Informe o CEP para preenchimento automático
                </p>
              </div>
            </div>

            {/* Formulário */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* CEP */}
              <FormField
                label="CEP"
                id="cep"
                error={errors.cep?.message || apiError}
                required
                className="col-span-1 md:col-span-2"
              >
                <Input
                  id="cep"
                  {...register("cep")}
                  placeholder="00000-000"
                  maxLength={9}
                  onChange={handleCepChange}
                  isLoading={isLoading}
                  hasError={!!errors.cep || !!apiError}
                  suffix={
                    isLoading && <Loader2 className="animate-spin w-5 h-5" />
                  }
                />
              </FormField>

              {apiError && (
                <div role="alert" aria-live="polite" className="sr-only">
                  {apiError}
                </div>
              )}

              {/* Logradouro */}
              <FormField
                label="Logradouro"
                id="logradouro"
                error={errors.logradouro?.message}
                className="col-span-1 md:col-span-2"
              >
                <Input
                  id="logradouro"
                  {...register("logradouro")}
                  readOnly
                  tabIndex={-1}
                  isLoading={isLoading}
                  placeholder={isLoading ? "Carregando..." : ""}
                />
              </FormField>

              {/* Cidade */}
              <FormField
                label="Cidade"
                id="cidade"
                error={errors.cidade?.message}
              >
                <Input
                  id="cidade"
                  {...register("cidade")}
                  readOnly
                  tabIndex={-1}
                  isLoading={isLoading}
                  placeholder={isLoading ? "Carregando..." : ""}
                />
              </FormField>

              {/* Estado */}
              <FormField
                label="Estado"
                id="estado"
                error={errors.estado?.message}
              >
                <Input
                  id="estado"
                  {...register("estado")}
                  readOnly
                  tabIndex={-1}
                  isLoading={isLoading}
                  placeholder={isLoading ? "Carregando..." : ""}
                />
              </FormField>

              <div className="col-span-1 md:col-span-2 h-px bg-slate-100 my-2" />

              {/* Número */}
              <FormField
                label="Número"
                id="numero"
                error={errors.numero?.message}
                required
              >
                <Input
                  id="numero"
                  {...register("numero")}
                  placeholder="Ex: 123"
                  hasError={!!errors.numero}
                />
              </FormField>

              {/* Complemento */}
              <FormField
                label="Complemento"
                id="complemento"
                description="Opcional"
                error={errors.complemento?.message}
              >
                <Input
                  id="complemento"
                  {...register("complemento")}
                  placeholder="Ex: Apto 101"
                />
              </FormField>

              {/* Botão de Submit */}
              <div className="col-span-1 md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  aria-busy={isSubmitting}
                  aria-label={
                    isSubmitting ? "Salvando endereço" : "Confirmar endereço"
                  }
                  className={clsx(
                    "w-full py-4 rounded-lg font-bold text-white transition-all shadow-md",
                    "bg-slate-900 hover:bg-slate-800 hover:shadow-lg active:scale-[0.99]",
                    "disabled:opacity-70 disabled:cursor-not-allowed",
                  )}
                >
                  <span className={isSubmitting ? "sr-only" : undefined}>
                    {isSubmitting
                      ? "Salvando dados do endereço..."
                      : "Confirmar Endereço"}
                  </span>
                  {isSubmitting && (
                    <Loader2 className="inline-block ml-2 animate-spin w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Informação adicional */}
        <footer className="mt-6 text-center text-sm text-slate-500">
          <p>
            Dados fornecidos pela API{" "}
            <a
              href="https://viacep.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 underline transition-colors"
            >
              ViaCEP
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

