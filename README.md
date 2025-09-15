# systematic
## Visão Geral
Uma interface de usuário nova e aprimorada para a ferramenta de estudo sistemático [StArt](https://www.lapes.ufscar.br/resources/tools-1/start-1). Ajuda pesquisadores a criar, desenvolver e organizar seus estudos sistemáticos de forma fácil.
Utilizado por [systematic](https://github.com/pet-ads/systematic) como front-end.

## Como instalar e executar
O Systematic está sendo desenvolvido usando **Node.js** com o framework **React**.
Para executar o front-end, você precisará baixar e instalar o [Node.js e o gerenciador de pacotes npm](https://nodejs.org/en/download/prebuilt-installer) que vem com ele.

Para trabalhar no projeto, você precisará de uma IDE (ex: [VS Code](https://code.visualstudio.com/)).
Em seguida, você pode baixar ou clonar a aplicação e abrir o projeto nela.

Depois disso, você deve abrir um terminal na pasta em que o projeto está (ou clicar no botão de terminal em sua IDE).

Embora seja possível instalar as dependências e executar o projeto com os comandos `npm install` e `npm run dev`, **é preferível que você utilize os scripts disponíveis no repositório**, que automatizam o processo.

Existem duas maneiras recomendadas de fazer isso:

**Importante:** Os scripts a seguir foram feitos para ambientes Linux, mas funcionam perfeitamente no Windows se você usar o **Git Bash** como terminal.

**1. Usando PNPM:**
```bash
./scripts/pnpm-install.sh
./scripts/run-pnpm.sh
````

**2. Usando Yarn:**

```bash
./scripts/yarn-install.sh
./scripts/run.sh
```

Pronto\! Agora o front-end está rodando em `http://localhost:5173`. Basta abrir esse endereço em seu navegador para ver o projeto em execução. Certifique-se de manter o terminal que está executando o servidor aberto enquanto utiliza o site.

## Requisições

Para executar requisições para o back-end, você também deve executá-lo. As instruções para isso estão localizadas no repositório do [systematic](https://github.com/pet-ads/systematic).

## Estrutura de Pastas

Ao trabalhar neste projeto, por favor, tente seguir a estrutura de pastas indicada no arquivo `folder-structure.txt`. Isso permite uma fácil compreensão do que qualquer arquivo pode fazer e ajuda outros desenvolvedores a trabalhar no projeto.

## Licença

Este projeto é desenvolvido sob a licença [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.pt-br.html).

## Equipe de Desenvolvimento

Desenvolvido com :heart: por [PET/ADS @IFSP São Carlos](http://petads.paginas.scl.ifsp.edu.br/).
