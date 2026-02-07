# Architecture & Design Document (ARCH.md)

## 1. Visão Geral (Overview)

Aplicação frontend para consulta de endereços via API ViaCEP. O foco é uma experiência de usuário fluida, com validação rigorosa e preenchimento automático de campos, mantendo a integridade dos dados através de campos somente leitura para informações provenientes da API.

## 2. Tech Stack

- **Core:** React 19 (com React Compiler para otimização automática).
- **Forms:** `react-hook-form` (manipulação de estado de alta performance).
- **Validation:** `zod` (esquema de validação tipado e integrado ao formulário).
- **Styling:** TailwindCSS (utilitários para design responsivo e consistente).
- **HTTP Client:** Fetch API nativa.

## 3. Padrões de Arquitetura (Architecture Patterns)

O projeto utiliza uma separação clara entre componentes de interface, lógica de negócio e validação:

- **/src/components**: Componentes de UI atômicos (Inputs, Buttons, FormField).
- **/src/hooks**: Hooks customizados para lógica de busca e integração (ex: `useCep`).
- **/src/schemas**: Definições de contratos de dados e validações (Zod).
- **/src/utils**: Funções auxiliares (máscaras de input e formatadores).

## 4. Princípios de Desenvolvimento

- **SOLID (SRP):** Cada componente/hook tem uma única responsabilidade.
- **Clean Code:** Código legível, nomes semânticos e funções concisas.
- **DRY (Don't Repeat Yourself):** Abstração de padrões repetitivos em componentes reutilizáveis.
- **KISS (Keep It Simple):** Implementação direta e eficiente, evitando sobrecarga de bibliotecas desnecessárias.

## 5. Experiência do Usuário (UX) & Qualidade

- **Design & Usabilidade:**
  - Interface limpa e responsiva com **TailwindCSS**.
  - Feedback visual de estados (loading, erro, sucesso).
  - Foco em acessibilidade (uso de labels, aria-attributes e estados `readOnly` visíveis).
- **Padrões de Documentação:**
  - **Comentários Funcionais:** Código comentado explicando o "porquê" de lógicas complexas.
  - **Auto-documentação:** Código escrito para ser compreensível por si só através de clareza nomenclatural.

## 6. Regras de Negócio e Validação

O formulário segue o esquema Zod com as seguintes obrigatoriedades:

- **CEP:** Máscara `00000-000`, obrigatório e com validação de formato.
- **Logradouro, Cidade, Estado:** Preenchidos via API e bloqueados para edição (`readOnly`).
- **Número:** Obrigatório (mínimo de 1 caractere).
- **Complemento:** Campo opcional.

## 7. Fluxo de Execução

1. Usuário digita o CEP e a aplicação aplica a máscara em tempo real.
2. Ao atingir o formato válido, o Hook `useCep` realiza a chamada à API.
3. Em caso de sucesso, os campos de endereço são populados via `setValue`.
4. Em caso de erro ou CEP não encontrado, os campos são limpos e um erro é sinalizado ao usuário.
