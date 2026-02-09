// components/ui/FormField.tsx
import { AlertCircle } from "lucide-react";
import React from "react";

/**
 * Propriedades do componente FormField.
 *
 * @interface FormFieldProps
 * @property {string} label - O rótulo descritivo do campo de formulário
 * @property {string} id - O identificador único do campo, vinculado ao input através de htmlFor
 * @property {string | null} [error] - Mensagem de erro de validação a ser exibida, se houver
 * @property {boolean} [required] - Indica se o campo é obrigatório, exibindo asterisco vermelho
 * @property {React.ReactNode} children - Elemento de input a ser renderizado (geralmente o componente Input)
 * @property {string} [className] - Classes CSS adicionais para personalização do container
 * @property {string} [description] - Texto de ajuda opcional a ser exibido abaixo do label
 */
interface FormFieldProps {
  label: string;
  id: string;
  error?: string | null;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  description?: string;
}

/**
 * Componente de campo de formulário acessível que encapsula inputs com label,
 * mensagens de erro e indicadores visuais de obrigatoriedade.
 *
 * @component
 * @example
 * ```tsx
 * <FormField
 *   label="CEP"
 *   id="cep-input"
 *   error="CEP inválido"
 *   required={true}
 *   description="Digite o CEP no formato 00000-000"
 * >
 *   <Input placeholder="00000-000" />
 * </FormField>
 * ```
 *
 * @param {FormFieldProps} props - Propriedades do componente
 * @param {string} props.label - Texto do rótulo (label) do campo
 * @param {string} props.id - Identificador único do campo, vinculado ao atributo htmlFor do label
 * @param {string} [props.error] - Mensagem de erro a ser exibida quando houver validação falha
 * @param {boolean} [props.required] - Indica se o campo é obrigatório (exibe asterisco vermelho)
 * @param {React.ReactNode} props.children - Elemento de input ou componente filho a ser renderizado
 * @param {string} [props.className] - Classes CSS adicionais para personalização do container
 * @param {string} [props.description] - Texto de ajuda opcional exibido abaixo do label
 *
 * @returns {JSX.Element} Componente de campo de formulário completo e acessível
 *
 * @remarks
 * **Acessibilidade:**
 * - Usa `aria-describedby` para vincular mensagens de erro ao input
 * - Usa `aria-live="polite"` para anunciar erros dinamicamente a leitores de tela
 * - Exibe asterisco vermelho com classe `.sr-only` para indicar obrigatoriedade acessível
 *
 * **Estilos:**
 * - Mensagens de erro são exibidas com animação de entrada (fade-in e slide-in)
 * - Ícone de alerta (AlertCircle) é exibido automaticamente quando há erro
 * - Utiliza TailwindCSS com tema em tons de cinza (slate) e vermelho para erros
 *
 * **Validação:**
 * - Campos obrigatórios são sinalizados visualmente e semanticamente
 * - Erros são vinculados ao input através de IDs únicos para acessibilidade
 */
export const FormField = ({
  label,
  id,
  error,
  required,
  children,
  className,
  description,
}: FormFieldProps) => {
  // IDs únicos para acessibilidade
  const errorId = `${id}-error`;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className={className}>
      {/* Label acessível com indicador de obrigatoriedade */}
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-slate-700"
      >
        {label}{" "}
        {required && (
          <>
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(obrigatório)</span>
          </>
        )}
      </label>

      {/* Clone do children (Input) com atributos ARIA */}
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<any>, {
          "aria-invalid": !!error,
          "aria-describedby": error
            ? errorId
            : descriptionId
              ? descriptionId
              : undefined,
        })}

      {/* Texto de ajuda opcional */}
      {description && (
        <p id={descriptionId} className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      )}

      {/* Mensagem de erro acessível */}
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="mt-1.5 flex items-center gap-1 text-sm text-red-500 animate-in fade-in slide-in-from-top-1"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

