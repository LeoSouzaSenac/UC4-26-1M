# 02. Criando um projeto TypeScript do zero

## O que vamos construir?

Um projeto simples que recebe código TypeScript, transforma esse código em JavaScript e executa o programa no terminal.

Ao final, bastará usar:

```bash
npm start
```

Vamos entender cada arquivo e comando antes de avançar.

## 1. O que precisamos instalar?

- **Node.js:** permite executar JavaScript fora do navegador, como no terminal.
- **npm:** ferramenta que acompanha a instalação comum do Node.js e permite instalar os pacotes do projeto.
- **Visual Studio Code (VS Code):** editor no qual escreveremos os arquivos.

Um pacote é um conjunto de arquivos que adiciona uma ferramenta ou um recurso ao projeto.

Se o Node.js ainda não estiver instalado, obtenha a versão LTS no [site oficial](https://nodejs.org/). LTS indica uma versão com suporte por um período maior.

Após instalar, feche e abra novamente o terminal. Confira:

```bash
node --version
npm --version
```

Execute um comando por vez. Cada um deve mostrar um número de versão. Os números podem ser diferentes entre computadores.

> Os comandos desta aula devem ser digitados no terminal. Os exemplos TypeScript devem ser escritos nos arquivos `.ts`.

## 2. Criar e abrir a pasta

No terminal, execute um comando por vez:

```bash
mkdir projeto-animais
cd projeto-animais
```

- `mkdir projeto-animais`: cria a pasta.
- `cd projeto-animais`: entra na pasta.

Abra essa pasta no VS Code pelo menu **Arquivo > Abrir Pasta**. Depois, abra o terminal integrado pelo menu **Terminal > Novo Terminal**.

Confira se o terminal está dentro de `projeto-animais`. Os próximos comandos devem ser executados nessa pasta.

## 3. Criar o package.json

Execute:

```bash
npm init -y
```

- `npm init`: inicia as informações do projeto.
- `-y`: aceita as respostas padrão, sem fazer cada pergunta.

Isso cria o arquivo **`package.json`**.

Pense nele como uma ficha do projeto. Ele guarda informações como nome, versão, pacotes instalados e comandos de execução.

### O que é JSON?

JSON é um formato de texto usado para guardar dados organizados. Neste arquivo:

- as chaves e os textos usam aspas duplas;
- `:` separa uma chave do seu valor;
- vírgulas separam os itens;
- não pode haver vírgula depois do último item;
- não escrevemos comentários com `//`.

Por isso, vamos explicar o `package.json` fora do código.

## 4. Instalar o TypeScript

Execute:

```bash
npm install -D typescript @types/node
```

| Parte | O que faz |
| --- | --- |
| `npm install` | Instala os pacotes informados. |
| `-D` | Registra os pacotes como ferramentas usadas no desenvolvimento. |
| `typescript` | Instala o compilador que verifica o TypeScript e gera JavaScript. |
| `@types/node` | Fornece ao TypeScript as descrições de tipos dos recursos do Node.js. |

O compilador do TypeScript é chamado de **`tsc`**. Compilar, nesta aula, significa verificar o código e gerar uma versão em JavaScript.

### O que surgiu na pasta?

| Item | Para que serve |
| --- | --- |
| `node_modules` | Guarda os pacotes instalados. Não precisamos editar seu conteúdo. |
| `package-lock.json` | Registra as versões resolvidas na instalação para ajudar a repetir a mesma instalação. |
| `devDependencies` no `package.json` | Lista os pacotes instalados com `-D`. |

Não copie a pasta `node_modules` para outros projetos. Em uma cópia deste projeto, com os arquivos de configuração presentes, use `npm install` para instalar os pacotes.

## 5. Criar o tsconfig.json

O nome correto é **`tsconfig.json`**.

Execute:

```bash
npx tsc --init
```

- `npx`: permite executar uma ferramenta; neste projeto, encontra o `tsc` instalado localmente.
- `tsc`: executa o compilador do TypeScript.
- `--init`: pede a criação do arquivo de configuração.

O arquivo gerado pode ter muitas opções. Para esta aula, **substitua todo o conteúdo de `tsconfig.json`** por:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "nodenext",
    "target": "esnext",
    "types": ["node"],
    "strict": false,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  },
  "include": ["src"]
}

```

Essa configuração foi escolhida para um programa de terminal executado com uma versão recente do Node.js.

### O que cada parte significa?

| Opção | Explicação simples |
| --- | --- |
| `compilerOptions` | Agrupa as configurações do compilador. |
| `target: "NODENEXT"` | Define a versão de JavaScript que será gerada. Não é a versão do TypeScript. |
| `module: "NodeNext"` | Faz o TypeScript seguir as regras de módulos do Node.js. Módulos permitem dividir código entre arquivos. |
| `rootDir: "./src"` | Indica a pasta-base dos nossos arquivos de código. |
| `outDir: "./build"` | Indica onde serão salvos os arquivos JavaScript gerados. |
| `strict: true` | Ativa verificações mais cuidadosas para ajudar a encontrar erros. |
| `noEmitOnError: true` | Impede a geração de novos arquivos JavaScript quando há erros de compilação. Não apaga arquivos antigos. |
| `types: ["node"]` | Inclui as descrições de tipos do Node.js instaladas antes. |
| `include` | Escolhe os arquivos que entram inicialmente na compilação. |

Em `src/**/*.ts`, `**` permite procurar também nas subpastas e `*.ts` seleciona arquivos com a extensão `.ts`.

O `./` indica um caminho a partir da pasta atual. No `tsconfig.json`, os caminhos são considerados a partir da pasta desse arquivo.

## 6. Criar o primeiro programa

No explorador de arquivos do VS Code:

1. Crie uma pasta chamada `src`.
2. Dentro dela, crie `index.ts`.
3. Escreva:

```typescript
// nome guarda um texto.
const nome: string = "Pipoca";

// energia guarda um número.
const energia: number = 50;

// console.log mostra informações no terminal.
console.log("Nome:", nome);
console.log("Energia:", energia);
```

O nome `index.ts` é uma escolha comum para o arquivo inicial. Ele não é obrigatório por regra da linguagem. Se mudarmos o nome, precisaremos ajustar o comando que o executa.

## 7. Configurar o script start

Um **script** no `package.json` é um comando salvo com um nome.

Abra `package.json` e encontre a parte `"scripts"`. Substitua esse bloco por:

```json
"scripts": {
  "start": "npx tsc && node ./dist/index.js"
}
```

**Atenção:** esse trecho é apenas uma parte do `package.json`. Ele deve ficar dentro das chaves principais do arquivo. Preserve as outras informações, principalmente `devDependencies`.

### Exemplo da organização do arquivo

Um `package.json` mínimo, antes de instalar os pacotes, poderia ser:

```json
{
  "name": "projeto-animais",
  "version": "1.0.0",
  "private": true,
  "type": "commonjs",
  "description": "Projeto para aprender TypeScript",
  "scripts": {
    "start": "npx tsc && node ./dist/index.js"
  }
}
```

**Não substitua seu arquivo instalado por esse exemplo**, pois ele não contém a lista dos pacotes. Use-o para entender a posição das partes. No seu arquivo, acrescente `"private": true` e `"type": "commonjs"` no nível principal se esses campos ainda não existirem.

| Campo | Para que serve |
| --- | --- |
| `name` | Nome do projeto. Prefira letras minúsculas, sem espaços e sem acentos. |
| `version` | Versão do seu projeto, não do Node.js ou do TypeScript. |
| `private: true` | Evita publicar o projeto por engano no registro do npm. Não coloca senha nos arquivos. |
| `type: "commonjs"` | Define o formato de módulos usado nos arquivos `.js` deste projeto. Combina com a configuração `NodeNext` escolhida acima. |
| `description` | Uma descrição curta do projeto. |
| `scripts` | Guarda os comandos que podemos executar pelo npm. |
| `devDependencies` | Guarda os pacotes de desenvolvimento e suas versões. Foi acrescentado pela instalação. |

O `npm init -y` pode criar outros campos, como `main`, `license` e `author`. Não precisamos modificá-los para esta aula. O campo `main` não escolhe o arquivo executado por `npm start`: quem faz isso aqui é o comando do script `start`.

### Entendendo o comando inteiro

```bash
npx tsc && node ./build/index.js
```

1. `npx tsc` lê o `tsconfig.json`, verifica os arquivos e gera JavaScript.
2. `&&` significa: execute a próxima parte somente se a anterior terminar com sucesso.
3. `node ./build/index.js` executa o arquivo JavaScript gerado.

O `tsc` já fica disponível dentro dos scripts do npm. Por isso, `tsc && node ./build/index.js` também funcionaria. Mantivemos `npx tsc` para acompanhar a forma apresentada no PDF.

## 8. Executar o projeto

Salve os arquivos e execute:

```bash
npm start
```

Resultado esperado:

```text
Nome: Pipoca
Energia: 50
```

Após a primeira execução bem-sucedida:

| Caminho | Conteúdo |
| --- | --- |
| `src/index.ts` | Código que você escreve e edita. |
| `build/index.js` | JavaScript gerado pelo TypeScript. |
| `package.json` | Informações, pacotes e comandos do projeto. |
| `package-lock.json` | Registro das versões da instalação. |
| `tsconfig.json` | Configurações da compilação. |
| `node_modules/` | Pacotes instalados. |

**Edite `src/index.ts`, salve e execute `npm start` novamente.** Não edite `build/index.js`: seu conteúdo pode ser substituído na próxima compilação.

Esse script não reinicia o programa sozinho quando você salva.

## 9. Por que agora usamos apenas npx tsc?

Antes da configuração, você pode ter usado:

```bash
npx tsc index.ts
```

Quando passamos arquivos diretamente dessa forma, o compilador não usa o `tsconfig.json` do projeto.

Nesta aula, usamos:

```bash
npx tsc
```

Assim, o compilador encontra o `tsconfig.json` e segue as opções que definimos, incluindo a pasta `build`.

## 10. Vários exercícios no mesmo projeto

Como sugerido no PDF, você pode criar `src/index1.ts`, `src/index2.ts` e `src/index3.ts` e configurar:

```json
"scripts": {
  "start": "npx tsc && node ./build/index.js",
  "start1": "npx tsc && node ./build/index1.js",
  "start2": "npx tsc && node ./build/index2.js",
  "start3": "npx tsc && node ./build/index3.js"
}
```

Para executar o primeiro exercício:

```bash
npm run start1
```

Para os outros, use `npm run start2` ou `npm run start3`.

O `npm start` tem uma forma curta própria. Para os nomes personalizados, use `npm run` seguido do nome.

**Dois cuidados:**

- `npx tsc` verifica todos os arquivos incluídos. Um erro em `index2.ts` pode impedir a execução de `start1`.
- Arquivos sem `import` ou `export` podem compartilhar nomes no TypeScript. Para manter exercícios independentes, coloque `export {};` no início de cada arquivo. Essa linha faz o arquivo ser tratado como um módulo próprio. Não precisamos aprofundar módulos agora.

## 11. Problemas comuns

| Problema | O que conferir |
| --- | --- |
| `node` ou `npm` não é reconhecido | Confira a instalação do Node.js e abra um novo terminal. |
| O npm não encontra `package.json` | Entre na pasta do projeto com `cd`. |
| `Missing script: start` | Confira se `start` está dentro de `scripts` e salve o arquivo. |
| Erro ao ler `package.json` | Confira aspas duplas, vírgulas e chaves. JSON não aceita comentários. |
| Nenhum arquivo foi encontrado | Confira se existe `src/index.ts` e se ele foi salvo. |
| `build/index.js` não foi encontrado | Confira o nome do arquivo e os erros mostrados na compilação. |
| O resultado não mudou | Salve o `.ts` e execute `npm start` novamente. |
| Erro de tipos no código | Leia a mensagem, corrija a linha indicada e execute novamente. |

## 12. Prática

1. Altere o nome para `Rex`.
2. Altere a energia para `80`.
3. Execute `npm start` e confira o resultado.
4. Troque temporariamente `80` por `"oitenta"`, mantendo o tipo `number`.
5. Execute e observe o erro de tipo.
6. Corrija o valor e execute novamente.
- [Documentação oficial: configuração do TypeScript](https://www.typescriptlang.org/pt/tsconfig/)
- [Documentação oficial: criação do package.json](https://docs.npmjs.com/creating-a-package-json-file/)

**Anterior:** [01. Paradigmas e orientação a objetos](01-paradigmas-e-orientacao-a-objetos.md).

**Próximo:** [03. Primeiros passos com classes](03-primeiros-passos-com-classes.md).
