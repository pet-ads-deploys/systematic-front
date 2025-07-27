# Arquitetura do Projeto

Bem-vindos(as) ao projeto! Este documento tem como objetivo apresentar a estrutura e a arquitetura do nosso codebase, facilitando a compreensão e a contribuição de novos desenvolvedores.

## Visão Geral

Nosso projeto é um aplicativo **React (com TypeScript)**, construído com **Vite** para um ambiente de desenvolvimento rápido e otimizado. A estrutura de pastas reflete uma organização por **domínio/funcionalidade** (no diretório `features`) e por **tipo de componente/recurso** (nos diretórios `components` e `shared`), visando modularidade, reusabilidade e manutenibilidade.

## Estrutura de Diretórios Principal

```plaintext
├── arch.txt               // Arquivo de arquitetura (este documento)
├── folder-structure.txt   // Estrutura de pastas gerada
├── index.html             // Ponto de entrada HTML da aplicação
├── LICENSE                // Licença do projeto
├── package.json           // Dependências e scripts do projeto
├── package-lock.json      // Lockfile de dependências
├── README.md              // Informações gerais do projeto
├── scripts                // Scripts auxiliares (e.g., para execução, instalação)
├── src                    // Código fonte da aplicação
├── tsconfig.json          // Configurações do TypeScript para o projeto
├── tsconfig.node.json     // Configurações do TypeScript para o ambiente Node.js
├── vite.config.ts         // Configurações do Vite
└── yarn.lock              // Lockfile do Yarn
```

## Detalhamento do Diretório `src`

O diretório `src` é o coração do nosso projeto, onde reside todo o código fonte da aplicação.

### 1. `src/App.tsx`

O componente **`App.tsx`** é o componente raiz da nossa aplicação React, responsável por orquestrar a exibição das diferentes partes da aplicação.

### 2. `src/assets`

Este diretório armazena todos os **recursos estáticos** da aplicação, como ícones e imagens.

### 3. `src/components`

Aqui você encontrará **componentes React reusáveis** que são genéricos e não estão atrelados a uma funcionalidade específica. Pense neles como blocos de construção básicos, como botões, inputs e elementos de feedback.

### 4. `src/features`

Este é o diretório mais importante para entender a **estrutura por domínio**. A ideia principal aqui é **separar o código por funcionalidade ou domínio de negócio**.

Cada subdiretório dentro de `features` (como `auth`, `landing`, `review`, `user`) representa uma **funcionalidade principal e independente** da aplicação. Dentro de cada uma dessas "features", você encontrará todo o código relacionado a ela: seus próprios componentes, hooks, serviços de API, páginas e tipos. Isso garante que a lógica e a interface de uma funcionalidade estejam **agrupadas em um só lugar**, facilitando a localização, o desenvolvimento e a manutenção. Por exemplo, tudo o que se refere à **autenticação** está em `src/features/auth`, e as etapas da **revisão sistemática** estão em `src/features/review`.

### 5. `src/infrastructure`

Este diretório contém a **camada de infraestrutura**, como as configurações de clientes HTTP (`axiosClient.tsx`).

### 6. `src/legacy`

Este diretório contém **código mais antigo** ou que está sendo refatorado/substituído. É importante ter cautela ao modificar arquivos aqui, pois podem ser partes de funcionalidades que estão em transição e serão eventualmente movidas ou removidas.

### 7. `src/mocks`

Contém **dados mockados** usados para desenvolvimento e testes, simulando respostas de API ou dados de componentes.

### 8. `src/routes.tsx`

Define as **rotas da aplicação**, mapeando URLs para os componentes de página correspondentes, direcionando o fluxo de navegação.

### 9. Outros arquivos em `src`

* **`index.css`**: Estilos globais da aplicação.
* **`main.tsx`**: Ponto de entrada principal do aplicativo React.
* **`vite-env.d.ts`**: Arquivo de declaração de tipo para o ambiente Vite.

---

## Como Navegar e Contribuir

1. **Entenda a Funcionalidade**: Para onde sua mudança se destina? Ela se encaixa em `auth`, `landing`, `review` ou `user`?
2. **Comece pelas Páginas**: Para entender o fluxo de uma funcionalidade, comece pelos arquivos `index.tsx` dentro dos subdiretórios `pages` daquela `feature`.
3. **Componentes Reusáveis**: Se um componente pode ser usado em várias partes da aplicação e não está diretamente ligado a uma funcionalidade específica, ele provavelmente pertence a `src/components`.
4. **Lógica Específica da Funcionalidade**: Hooks, serviços de API, tipos e validações que são específicos de uma `feature` devem residir dentro do diretório dessa `feature`.
5. **Legado**: Seja cauteloso ao interagir com o diretório `legacy`. Se você precisa refatorar algo de lá, considere migrá-lo para a estrutura de `features` ou `components` conforme apropriado.
