# 07. Interfaces em TypeScript — por que elas são úteis?

## O que vamos aprender?

- Entender **qual problema uma interface resolve**, antes de aprender sua sintaxe.
- Criar uma `interface` em seu próprio arquivo.
- Utilizar `implements` e descobrir o que acontece se uma classe não cumprir o contrato.
- Escrever uma função que aceita **objetos de classes diferentes** sem precisar conhecer cada classe.
- Trabalhar com `export` e `import` em **arquivos separados, desde o primeiro exemplo**.
- Criar classes que implementam mais de uma interface.

**Pré-requisitos:** classes, objetos, métodos, construtores e noções de herança e encapsulamento. 

> **Ideia central da aula:** Uma interface permite que o programa confie que objetos diferentes possuem as operações necessárias. Não importa qual classe criou o objeto: importa o que ele sabe fazer.

## 1. Primeiro, o problema: sem interface

Imagina que estamos criando um jogo. Temos um `Guerreiro`, que ataca com espada, e um `Mago`, que lança magia.

**Estrutura dos arquivos:**

```text
src/
└── 01-sem-interface/
    ├── Guerreiro.ts
    ├── Mago.ts
    └── index.ts
```

### Arquivo `Guerreiro.ts`

```typescript
export class Guerreiro {
  constructor(public nome: string) {}

  atacar(): void {
    console.log(`${this.nome} ataca com a espada!`);
  }
}
```

### Arquivo `Mago.ts`

```typescript
export class Mago {
  constructor(public nome: string) {}

  lancarMagia(): void {
    console.log(`${this.nome} lança uma bola de fogo!`);
  }
}
```

### Arquivo `index.ts`

```typescript
import { Guerreiro } from "./Guerreiro";
import { Mago } from "./Mago";

const guerreiro = new Guerreiro("Arthur");
const mago = new Mago("Merlin");

guerreiro.atacar();
mago.lancarMagia();
```

**Resultado esperado:**

```text
Arthur ataca com a espada!
Merlin lança uma bola de fogo!
```

Até aqui, tudo funciona. Mas imagine que nosso jogo tenha **20 tipos de personagens** e que cada um tenha um nome diferente para seu método de ataque.

**Pergunta para a turma:** como podemos criar uma função única que mande *qualquer atacante* atacar? Se cada classe usa um nome diferente, a função teria de conhecer as particularidades de cada uma.

> **O problema não é que o código atual esteja errado.** O problema é que ainda não combinamos uma forma comum de dizer: "esse objeto sabe atacar".

---

## 2. A solução: um contrato chamado `Atacante`

Vamos combinar que **todo objeto que queremos tratar como atacante precisa ter um método `atacar(): void`**.

Isso é exatamente o que uma interface pode expressar.

**Estrutura dos arquivos:**

```text
src/
└── 02-com-interface/
    ├── Atacante.ts
    ├── Guerreiro.ts
    ├── Mago.ts
    └── index.ts
```

### Arquivo `Atacante.ts`

```typescript
export interface Atacante {
  atacar(): void;
}
```

Vamos traduzir:

| Código | Significado |
| --- | --- |
| `interface` | Estamos definindo um contrato (um formato exigido). |
| `Atacante` | Nome do contrato, escolhido por nós. |
| `atacar(): void` | Quem cumprir esse contrato precisa ter um método `atacar` sem retorno útil. |
| `export` | Permite importar essa interface em outros arquivos. |

**Importante:** a interface **não ensina como atacar**. Ela apenas exige que exista o método. Cada classe decide o que esse método faz.

### Arquivo `Guerreiro.ts`

```typescript
import type { Atacante } from "./Atacante";

export class Guerreiro implements Atacante {
  constructor(public nome: string) {}

  atacar(): void {
    console.log(`${this.nome} ataca com a espada!`);
  }
}
```

### Arquivo `Mago.ts`

```typescript
import type { Atacante } from "./Atacante";

export class Mago implements Atacante {
  constructor(public nome: string) {}

  atacar(): void {
    console.log(`${this.nome} lança uma bola de fogo!`);
  }
}
```

**O que mudou?** O mago continua lançando magia, mas agora chama essa operação de `atacar()`. Assim, os dois possuem uma operação em comum, mesmo que realizem ações diferentes.

A expressão `implements Atacante` significa: **"esta classe se compromete a cumprir o contrato Atacante"**.

`import type` importa apenas uma definição de tipo. Por enquanto, basta saber que usamos essa forma para importar interfaces, porque interfaces servem para verificar tipos e não existem como objetos em tempo de execução.

### Arquivo `index.ts`

```typescript
import type { Atacante } from "./Atacante";
import { Guerreiro } from "./Guerreiro";
import { Mago } from "./Mago";

function executarAtaque(personagem: Atacante): void {
  personagem.atacar();
}

const guerreiro = new Guerreiro("Arthur");
const mago = new Mago("Merlin");

executarAtaque(guerreiro);
executarAtaque(mago);
```

**Resultado esperado:**

```text
Arthur ataca com a espada!
Merlin lança uma bola de fogo!
```

### Esse é o momento mais importante da aula

Olha a função:

```typescript
function executarAtaque(personagem: Atacante): void {
  personagem.atacar();
}
```

Ela não recebeu um `Guerreiro`. Não recebeu um `Mago`. Recebeu **qualquer objeto que cumpra o contrato `Atacante`**.

Por isso, se amanhã criarmos um dragão que também saiba atacar, **não precisamos reescrever `executarAtaque()`**. Esse é um benefício concreto: menos dependência de classes específicas e mais facilidade para acrescentar tipos novos.

### Teste importante: e se esquecer o método?

Experimente **apagar temporariamente** `atacar()` de `Mago.ts` e tente compilar com `npm run aula2`.

O TypeScript apontará que `Mago` não implementa corretamente `Atacante`, porque falta o método exigido. **A interface ajuda a detectar esse erro antes de executar o programa.** Depois, restaure o método.

---

## 3. Uma interface pode ser útil até para classes sem parentesco

**Aqui está outra vantagem que os alunos precisam enxergar:** um `Guerreiro`, um `Dragao` e uma `Torre` não precisam pertencer à mesma família de classes.

Uma torre não é uma pessoa. Um dragão não é um guerreiro. Mas **todos podem atacar**.

**Arquivos deste exemplo:**

```text
src/
└── 03-varios-tipos/
    ├── Atacante.ts
    ├── Guerreiro.ts
    ├── Dragao.ts
    ├── Torre.ts
    └── index.ts
```

### Arquivo `Atacante.ts`

```typescript
export interface Atacante {
  atacar(): void;
}
```

### Arquivo `Guerreiro.ts`

```typescript
import type { Atacante } from "./Atacante";

export class Guerreiro implements Atacante {
  constructor(public nome: string) {}

  atacar(): void {
    console.log(`${this.nome} golpeia com a espada!`);
  }
}
```

### Arquivo `Dragao.ts`

```typescript
import type { Atacante } from "./Atacante";

export class Dragao implements Atacante {
  atacar(): void {
    console.log("O dragão cospe fogo!");
  }
}
```

### Arquivo `Torre.ts`

```typescript
import type { Atacante } from "./Atacante";

export class Torre implements Atacante {
  atacar(): void {
    console.log("A torre dispara uma flecha!");
  }
}
```

### Arquivo `index.ts`

```typescript
import type { Atacante } from "./Atacante";
import { Guerreiro } from "./Guerreiro";
import { Dragao } from "./Dragao";
import { Torre } from "./Torre";

const atacantes: Atacante[] = [
  new Guerreiro("Arthur"),
  new Dragao(),
  new Torre()
];

for (const atacante of atacantes) {
  atacante.atacar();
}
```

**Resultado esperado:**

```text
Arthur golpeia com a espada!
O dragão cospe fogo!
A torre dispara uma flecha!
```

**Por que `Atacante[]` funciona?** Porque a lista exige objetos que possuam `atacar(): void`. Ela não precisa conter somente objetos de uma mesma classe.

**Pergunta para a turma:** por que seria estranho obrigar `Torre` a herdar de uma classe chamada `Personagem`? A interface evita essa herança artificial: ela descreve **uma capacidade**, não uma relação de família.

---

## 4. Uma classe pode cumprir mais de um contrato

Um paladino pode atacar **e** curar. Uma poção pode curar, mas não precisa atacar.

**Estrutura:**

```text
src/
└── 04-multiplas-interfaces/
    ├── Atacante.ts
    ├── Curavel.ts
    ├── Paladino.ts
    ├── Pocao.ts
    └── index.ts
```

### Arquivo `Atacante.ts`

```typescript
export interface Atacante {
  atacar(): void;
}
```

### Arquivo `Curavel.ts`

```typescript
export interface Curavel {
  curar(): void;
}
```

### Arquivo `Paladino.ts`

```typescript
import type { Atacante } from "./Atacante";
import type { Curavel } from "./Curavel";

export class Paladino implements Atacante, Curavel {
  atacar(): void {
    console.log("Paladino ataca com a espada!");
  }

  curar(): void {
    console.log("Paladino usa uma magia de cura!");
  }
}
```

### Arquivo `Pocao.ts`

```typescript
import type { Curavel } from "./Curavel";

export class Pocao implements Curavel {
  curar(): void {
    console.log("A poção recupera a vida!");
  }
}
```

### Arquivo `index.ts`

```typescript
import type { Atacante } from "./Atacante";
import type { Curavel } from "./Curavel";
import { Paladino } from "./Paladino";
import { Pocao } from "./Pocao";

function iniciarCombate(atacante: Atacante): void {
  atacante.atacar();
}

function aplicarCura(alvo: Curavel): void {
  alvo.curar();
}

const paladino = new Paladino();
const pocao = new Pocao();

iniciarCombate(paladino);
aplicarCura(paladino);
aplicarCura(pocao);
```

**Resultado esperado:**

```text
Paladino ataca com a espada!
Paladino usa uma magia de cura!
A poção recupera a vida!
```

Uma classe pode implementar **várias interfaces**. Isso é útil para descrever capacidades independentes: atacar, curar, voar, salvar dados, imprimir informações etc.

---

## 5. Interface não é herança de classe

| Herança com `extends` | Interface com `implements` |
| --- | --- |
| A subclasse pode herdar código e atributos de uma classe-base. | A interface define o formato que precisa ser cumprido, sem fornecer código executável. |
| Normalmente representa uma relação do tipo **"é um"**. | Frequentemente representa uma capacidade do tipo **"sabe fazer"**. |
| Uma classe TypeScript estende no máximo **uma classe**. | Uma classe pode implementar **várias interfaces**. |

Uma classe pode usar **`extends` e `implements` ao mesmo tempo**, mas isso fica para uma atividade futura. Nesta aula, o foco é entender primeiro por que contratos são úteis.

### Uma observação técnica para não criar uma ideia errada

TypeScript usa **tipagem estrutural**: se um objeto já possui os métodos exigidos por uma interface, ele pode ser aceito como aquele tipo **mesmo sem escrever `implements`**. Escrever `implements` continua sendo útil porque deixa o compromisso explícito e pede ao compilador que confira a classe durante sua declaração.

Também não é necessário criar uma interface para cada classe. Se ninguém precisa depender de um contrato compartilhado, uma interface pode ser desnecessária.

---

## 6. Erros comuns

| Erro | Como corrigir |
| --- | --- |
| Criar `Atacante.ts` e esquecer `export`. | Escreva `export interface Atacante`. |
| Esquecer o `import` na classe. | Use `import type { Atacante } from "./Atacante";`. |
| Escrever `implements Atacante` mas esquecer `atacar()`. | Implemente o método exigido, com assinatura compatível. |
| Escrever código de execução dentro da interface. | Interfaces descrevem tipos; a implementação fica na classe. |
| Chamar `atacante.lancarMagia()` quando a variável está tipada como `Atacante`. | O contrato só garante `atacar()`. |
| Achar que interface cria um objeto. | Objetos são criados com classes ou outros valores; interfaces não existem em tempo de execução. |
| Criar todas as classes dentro de `index.ts`. | Deixe cada classe e interface em seu arquivo e importe no `index.ts`. |

---

## 7. Exercícios práticos — sempre com arquivos separados

### Atividade 1 — Criar um contrato de voo

Na pasta `src/05-exercicios/`:

1. Crie `Voador.ts` com uma interface `Voador` que exige `voar(): void`.
2. Crie `Passaro.ts` com uma classe `Passaro implements Voador`.
3. Crie `Aviao.ts` com uma classe `Aviao implements Voador`.
4. Em `index.ts`, importe os arquivos, crie uma lista `Voador[]` e faça todos voarem com `for...of`.

**Objetivo:** compreender como a mesma lista pode aceitar classes diferentes porque ambas cumprem o contrato.

### Atividade 2 — O erro é parte do aprendizado

Comente o método `voar()` da classe `Aviao` e execute `npm run exercicios`.

- O que o compilador reclama?
- Por que isso ajuda um time trabalhando num projeto maior?
- Restaure o método para continuar.

### Atividade 3 — Adicionar um novo tipo sem alterar a função

Crie `Drone.ts`, implementando `Voador`. Adicione um drone à lista de `index.ts` **sem alterar o código do laço `for...of`**.

**Objetivo:** verificar, na prática, por que a interface facilita adicionar classes novas.

### Atividade 4 — Dois contratos (desafio)

Crie `Nadador.ts` com a interface `Nadador` e o método `nadar(): void`. Depois, crie `Pato.ts` que implemente **`Voador` e `Nadador`**. Em `index.ts`, teste as duas ações e explique por que não precisamos fazer `Pato` herdar de `Passaro` ou `Peixe` para expressar essas capacidades.

---

## 8. Perguntas de revisão

1. Qual era o problema do primeiro exemplo, quando Guerreiro usava `atacar()` e Mago usava `lancarMagia()`?
2. O que a interface `Atacante` garante?
3. Quem escreve o código de `atacar()`: a interface ou a classe?
4. Por que uma `Torre` pode fazer parte da lista `Atacante[]`?
5. Para que serve `implements`?
6. Por que usamos `import type` para importar a interface?
7. Qual é a vantagem de uma classe poder implementar duas interfaces?
8. Uma interface serve para compartilhar o código de um método entre classes?

## Para lembrar

**Interface é um combinado:** "se tu quer que teu objeto seja usado aqui, ele precisa oferecer estas operações".

- `interface`: declara o contrato.
- `implements`: declara que a classe se compromete a cumpri-lo.
- `export` / `import type`: compartilham definições entre arquivos.
- Uma função que recebe `Atacante` pode trabalhar com diferentes classes que atendam ao contrato.
- **A interface não cria comportamento; ela descreve o comportamento esperado.**

**Próxima aula:** Classes abstratas — quando, além de exigir comportamentos, queremos compartilhar código entre subclasses.

**Referência:** [TypeScript Handbook — Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) e [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html).
