// components/ui/FormField.tsx
import { AlertCircle } from "lucide-react";
import React from "react";

/**
 * Propriedades do componente FormField.
 *
 * @interface FormFieldProps
 * @property {string} label - O rótulo do campo de formulário.
 * @property {string} id - O identificador único do campo de formulário.
 * @property {string | null} [error] - Mensagem de erro a ser exibida, se houver.
 * @property {boolean} [required] - Indica se o campo é obrigatório.
 * @property {React.ReactNode} children - Os elementos filhos a serem renderizados dentro do campo.
 * @property {string} [className] - Classes CSS adicionais para estilização customizada.
 */
interface FormFieldProps {
  label: string;
  id: string;
  error?: string | null;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente de campo de formulário que encapsula inputs com label, mensagens de erro e indicador de campo obrigatório.
 *
 * @component
 * @example
 * ```tsx
 * <FormField
 *   label="CEP"
 *   id="cep-input"
 *   error="CEP inválido"
 *   required={true}
 * >
 *   <Input placeholder="00000-000" />
 * </FormField>
 * ```
 *
 * @param {string} label - Texto do rótulo (label) do campo
 * @param {string} id - Identificador único do campo, vinculado ao atributo htmlFor do label
 * @param {string} [error] - Mensagem de erro a ser exibida abaixo do campo quando houver validação falha
 * @param {boolean} [required] - Indica se o campo é obrigatório, exibindo um asterisco vermelho ao lado do label
 * @param {React.ReactNode} children - Elemento de input ou qualquer componente a ser renderizado dentro do campo
 * @param {string} [className] - Classes CSS adicionais para personalização do container do campo
 *
 * @returns {JSX.Element} Componente de campo de formulário completo com label, input e mensagem de erro
 *
 * @remarks
 * - Mensagens de erro são exibidas com animação de entrada (fade-in e slide-in)
 * - O ícone de alerta (AlertCircle) é exibido automaticamente quando há erro
 * - Estilos base utilizam Tailwind CSS com tema em tons de cinza (slate) e vermelho para erros
 * - Campos obrigatórios são sinalizados visualmente com asterisco vermelho
 */
export const FormField = ({
  label,
  id,
  error,
  required,
  children,
  className,
}: FormFieldProps) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-slate-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {children}

      {error && (
        <p className="mt-1 flex items-center gap-1 text-sm text-red-500 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

