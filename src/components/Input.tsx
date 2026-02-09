import { cn } from "@/utils/classNameMerge";
import React from "react";

/**
 * Propriedades do componente Input.
 *
 * @interface InputProps
 * @extends {React.ComponentProps<"input">}
 *
 * @property {React.ReactNode} [suffix] - Elemento React a ser exibido como sufixo do input.
 * @property {boolean} [hasError] - Indica se o input está em estado de erro.
 * @property {boolean} [readOnly] - Indica se o input é somente leitura.
 * @property {boolean} [isLoading] - Indica se o input está em estado de carregamento.
 */
interface InputProps extends React.ComponentProps<"input"> {
  suffix?: React.ReactNode;
  hasError?: boolean;
  readOnly?: boolean;
  isLoading?: boolean;
}

/**
 * Componente de input reutilizável com suporte a ícones, estados de erro, loading e readonly.
 *
 * @component
 * @example
 * ```tsx
 * <Input
 *   placeholder="Digite seu CEP"
 *   suffix={<SearchIcon />}
 *   hasError={false}
 *   isLoading={false}
 * />
 * ```
 *
 * @param {string} [className] - Classes CSS adicionais para customização do input
 * @param {React.ReactNode} [suffix] - Ícone ou elemento a ser exibido no lado direito do input
 * @param {boolean} [hasError] - Indica se o input está em estado de erro, aplicando estilos visuais correspondentes
 * @param {boolean} [readOnly] - Define se o input é somente leitura, desabilitando interações
 * @param {boolean} [isLoading] - Indica estado de carregamento, definindo o atributo aria-busy
 * @param {React.Ref<HTMLInputElement>} ref - Referência para o elemento input nativo
 *
 * @returns {JSX.Element} Componente de input estilizado com funcionalidades adicionais
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, suffix, hasError, readOnly, isLoading, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          readOnly={readOnly}
          aria-busy={isLoading}
          aria-invalid={hasError}
          className={cn(
            // Estilos Base
            "w-full px-4 py-3 rounded-lg border bg-slate-50 outline-none transition-all",
            "placeholder:text-slate-400 text-slate-900",
            // Estilos de Foco
            !readOnly &&
              "focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent",
            // Estilos de Desabilitado
            readOnly &&
              "bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed",
            // Estilos de Erro
            hasError && "border-red-300 focus:ring-red-200 bg-red-50",
            // Ajuste de padding se houver ícone
            suffix && "pr-10",
            className,
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

