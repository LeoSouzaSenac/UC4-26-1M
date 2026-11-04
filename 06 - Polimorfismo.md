# 04. Polimorfismo em TypeScript

## O que vamos aprender?

- Entender o que significa **polimorfismo** na Programação Orientada a Objetos.
- Relembrar rapidamente o que é **herança**.
- Criar classes que compartilham um método com comportamentos diferentes.
- Usar `extends`, `super` e a sobrescrita de métodos.
- Guardar objetos de classes diferentes em uma mesma lista.
- Perceber por que o polimorfismo facilita a criação de jogos e sistemas.

**Pré-requisito:** ter concluído [03. Primeiros passos com classes em TypeScript](03-classes-typescript.md), especialmente os exemplos de classes, construtores e métodos.

> **Ideia principal da aula:** diferentes objetos podem receber o mesmo comando e responder de maneiras diferentes.

## Como acompanhar os exemplos

Use o arquivo `src/index.ts` do projeto TypeScript e execute os exemplos com:

```bash
npm start
```

**Cada bloco identificado como “exemplo completo” substitui todo o conteúdo anterior de `src/index.ts`.** Não cole todos os exemplos no mesmo arquivo, porque os nomes de algumas classes se repetem.

## 1. Primeiro: o que significa polimorfismo?

A palavra **polimorfismo** significa, de forma simplificada, **muitas formas**.

Imagine um jogo com três animais:

- Um cachorro faz **au au**.
- Um gato faz **miau**.
- Uma vaca faz **muuu**.

Todos sabem fazer uma ação chamada `emitirSom()`. Mas o resultado dessa ação é diferente em cada animal.

Em programação, queremos conseguir escrever:

```typescript
animal.emitirSom();
```

Sem precisar perguntar a toda hora se o animal é cachorro, gato ou vaca.

**Polimorfismo é justamente a possibilidade de usar uma mesma operação em objetos diferentes e obter o comportamento adequado a cada objeto.**

## 2. Revisão rápida: herança

Na aula 03, criamos objetos usando a classe `Animal`. Agora queremos criar tipos mais específicos de animais sem repetir tudo.

Podemos definir uma classe geral `Animal` e criar uma classe `Cachorro` que **herda** dela.

### Exemplo completo 1: herança

```typescript
class Animal {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  apresentar(): void {
    console.log("Meu nome é " + this.nome);
  }
}

// Cachorro herda os atributos e métodos de Animal.
class Cachorro extends Animal {
}

const cachorro = new Cachorro("Rex");
cachorro.apresentar();
```

Resultado esperado:

```text
Meu nome é Rex
```

### O que aconteceu?

- `class Animal`: define a classe mais geral.
- `class Cachorro extends Animal`: cria uma classe que herda de `Animal`.
- `extends`: significa que `Cachorro` aproveita os recursos disponíveis da classe `Animal`.
- `new Cachorro("Rex")`: cria um objeto da classe `Cachorro`.
- `cachorro.apresentar()`: funciona porque `Cachorro` herdou esse método.

**Atenção:** herança e polimorfismo não são a mesma coisa. A herança permite aproveitar e especializar uma classe. O polimorfismo permite usar objetos diferentes por meio de uma operação comum.

## 3. O mesmo método, comportamentos diferentes

Vamos dar à classe `Animal` um método chamado `emitirSom()`.

Depois, cada classe filha vai **sobrescrever** esse método para produzir seu próprio som.

### Exemplo completo 2: nosso primeiro polimorfismo

```typescript
class Animal {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  emitirSom(): void {
    console.log("Som de animal desconhecido");
  }
}

class Cachorro extends Animal {
  override emitirSom(): void {
    console.log(this.nome + " faz: Au au!");
  }
}

class Gato extends Animal {
  override emitirSom(): void {
    console.log(this.nome + " faz: Miau!");
  }
}

class Vaca extends Animal {
  override emitirSom(): void {
    console.log(this.nome + " faz: Muuu!");
  }
}

const cachorro = new Cachorro("Rex");
const gato = new Gato("Mingau");
const vaca = new Vaca("Mimosa");

cachorro.emitirSom();
gato.emitirSom();
vaca.emitirSom();
```

Resultado esperado:

```text
Rex faz: Au au!
Mingau faz: Miau!
Mimosa faz: Muuu!
```

### Por que isso é importante?

Veja que **o nome do método é exatamente o mesmo** nas três classes: `emitirSom()`.

O que muda é o código executado. Quando chamamos `cachorro.emitirSom()`, o cachorro late. Quando chamamos `gato.emitirSom()`, o gato mia.

| Objeto | Método chamado | Comportamento |
| --- | --- | --- |
| `cachorro` | `emitirSom()` | Mostra `Au au!` |
| `gato` | `emitirSom()` | Mostra `Miau!` |
| `vaca` | `emitirSom()` | Mostra `Muuu!` |

### O que significa `override`?

A palavra `override` indica que estamos **substituindo a implementação de um método herdado**.

Por exemplo:

```typescript
class Gato extends Animal {
  override emitirSom(): void {
    console.log(this.nome + " faz: Miau!");
  }
}
```

A classe `Animal` já possui `emitirSom()`. A classe `Gato` mantém o mesmo nome de método, mas escreve uma nova versão dele.

> `override` ajuda o TypeScript a encontrar erros, como tentar sobrescrever um método que não existe na classe pai. Na configuração comum do TypeScript, ele não é obrigatório, mas vamos usá-lo para deixar a intenção clara.

## 4. Agora vem a parte mais importante

Até agora, chamamos os métodos de cada animal separadamente. Isso funciona, mas imagine um jogo com **100 animais**.

Seria trabalhoso escrever `emitirSom()` para cada variável.

Como `Cachorro`, `Gato` e `Vaca` são tipos de `Animal`, podemos colocar todos em uma lista do tipo `Animal[]`.

### Exemplo completo 3: polimorfismo na prática

```typescript
class Animal {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  emitirSom(): void {
    console.log("Som de animal desconhecido");
  }
}

class Cachorro extends Animal {
  override emitirSom(): void {
    console.log(this.nome + " faz: Au au!");
  }
}

class Gato extends Animal {
  override emitirSom(): void {
    console.log(this.nome + " faz: Miau!");
  }
}

class Vaca extends Animal {
  override emitirSom(): void {
    console.log(this.nome + " faz: Muuu!");
  }
}

// A lista aceita qualquer objeto que seja um Animal.
const animais: Animal[] = [
  new Cachorro("Rex"),
  new Gato("Mingau"),
  new Vaca("Mimosa"),
  new Cachorro("Bolinha")
];

// O mesmo comando funciona para todos os objetos.
for (const animal of animais) {
  animal.emitirSom();
}
```

Resultado esperado:

```text
Rex faz: Au au!
Mingau faz: Miau!
Mimosa faz: Muuu!
Bolinha faz: Au au!
```

### Vamos entender a lista

```typescript
const animais: Animal[] = [
  new Cachorro("Rex"),
  new Gato("Mingau")
];
```

- `const animais`: cria a variável que guarda a lista.
- `: Animal[]`: indica que os elementos da lista podem ser tratados como objetos do tipo `Animal`.
- `new Cachorro(...)` e `new Gato(...)`: criam objetos de classes diferentes que herdam de `Animal`.

Agora observe:

```typescript
for (const animal of animais) {
  animal.emitirSom();
}
```

O `for...of` percorre a lista, pegando um animal por vez. A cada repetição, chamamos o **mesmo método**.

**O programa executa a versão de `emitirSom()` correspondente ao objeto real.** Se o objeto é um gato, executa a versão de `Gato`. Se é um cachorro, executa a versão de `Cachorro`.

É aqui que o polimorfismo se torna especialmente útil: **o código que percorre a lista não precisa saber qual animal está recebendo o comando**.

## 5. Usando `super` para aproveitar o método original

Às vezes, não queremos substituir completamente o comportamento da classe pai. Queremos executar o código original **e depois acrescentar algo**.

Para isso, podemos usar `super`.

### Exemplo completo 4: chamar o método da classe pai

```typescript
class Personagem {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  atacar(): void {
    console.log(this.nome + " iniciou um ataque!");
  }
}

class Guerreiro extends Personagem {
  override atacar(): void {
    super.atacar(); // Executa o método da classe pai.
    console.log("O guerreiro atacou com uma espada!");
  }
}

class Mago extends Personagem {
  override atacar(): void {
    super.atacar();
    console.log("O mago lançou uma bola de fogo!");
  }
}

const personagens: Personagem[] = [
  new Guerreiro("Arthur"),
  new Mago("Merlin")
];

for (const personagem of personagens) {
  personagem.atacar();
}
```

Resultado esperado:

```text
Arthur iniciou um ataque!
O guerreiro atacou com uma espada!
Merlin iniciou um ataque!
O mago lançou uma bola de fogo!
```

Na linha `super.atacar()`, chamamos a implementação de `atacar()` da classe `Personagem`. Em seguida, executamos o comportamento específico do guerreiro ou do mago.

**Não confunda:** `this` acessa o objeto atual; `super` permite acessar membros da classe pai.

## 6. Uma função que aceita vários tipos de objeto

O polimorfismo também funciona fora das listas. Podemos criar uma função que recebe `Animal` e chamar essa função com um cachorro ou gato.

**Trecho complementar:** use este código **depois** das classes do exemplo completo 3.

```typescript
function apresentarAnimal(animal: Animal): void {
  console.log("Vamos ouvir " + animal.nome + ":");
  animal.emitirSom();
}

apresentarAnimal(new Cachorro("Toby"));
apresentarAnimal(new Gato("Luna"));
```

Resultado esperado:

```text
Vamos ouvir Toby:
Toby faz: Au au!
Vamos ouvir Luna:
Luna faz: Miau!
```

Repare que a função `apresentarAnimal()` não possui um `if` para cada espécie. Ela simplesmente usa `emitirSom()`.

## 7. E se a classe filha não sobrescrever o método?

Nesse caso, ela usa o método herdado da classe pai.

Por exemplo, se criarmos:

```typescript
class Passaro extends Animal {
}
```

E executarmos:

```typescript
const passaro = new Passaro("Piu");
passaro.emitirSom();
```

Resultado esperado:

```text
Som de animal desconhecido
```

Isso acontece porque `Passaro` não criou uma nova versão de `emitirSom()`.

## 8. Erros comuns

| Erro | Como corrigir |
| --- | --- |
| Achar que herança e polimorfismo são a mesma coisa | Herança compartilha/especializa recursos; polimorfismo permite comportamentos diferentes por uma operação comum. |
| Esquecer o `extends Animal` na classe filha | Escreva `class Gato extends Animal`. |
| Usar nomes diferentes, como `latir()` e `miar()`, quando queremos uma operação comum | Defina e sobrescreva o método `emitirSom()` nas classes. |
| Escrever `override emitirSom` sem parênteses | Escreva `override emitirSom(): void { ... }`. |
| Achar que `override` cria um método totalmente novo | Ele indica a sobrescrita de um método já declarado na classe pai. |
| Usar `super.atacar()` sem ter uma implementação de `atacar()` na classe pai | Confira se a classe pai realmente define o método. |
| Colar todos os exemplos completos juntos | Substitua o código anterior por um exemplo completo de cada vez. |
| Esperar que `Animal[]` aceite objetos sem o formato necessário | Os objetos precisam ser compatíveis com o tipo `Animal`. |

## 9. Exercícios guiados

### Atividade 1: acrescentar um novo animal

Use o **exemplo completo 3**.

1. Crie a classe `Pato`, que herda de `Animal`.
2. Sobrescreva o método `emitirSom()` para mostrar `Quack quack!` junto ao nome.
3. Crie um pato chamado `Donald`.
4. Adicione o pato à lista `animais`.
5. Execute e confira se o `for...of` funciona **sem nenhuma modificação**.

**Dica:** use a classe `Gato` como referência e altere apenas o necessário.

### Atividade 2: novos personagens no jogo

Use o **exemplo completo 4**.

1. Crie uma classe `Arqueiro` que herda de `Personagem`.
2. Sobrescreva `atacar()`.
3. Dentro do método, chame `super.atacar()`.
4. Depois, mostre a mensagem `O arqueiro disparou uma flecha!`.
5. Adicione um `Arqueiro` à lista `personagens` e execute.

**Objetivo:** criar um novo personagem sem alterar o `for...of`.

### Atividade 3: desafio — batalha de personagens

Crie um novo exemplo com:

- uma classe `Personagem` com os atributos `nome: string` e `vida: number`;
- um construtor para preencher nome e vida;
- um método `usarHabilidade(): void` na classe pai;
- duas classes filhas, `Guerreiro` e `Mago`, com versões diferentes de `usarHabilidade()`;
- uma lista `Personagem[]` com pelo menos **quatro personagens**;
- um `for...of` para fazer todos usarem suas habilidades.

**Regras:** o guerreiro deve mostrar uma mensagem de ataque físico, e o mago deve mostrar uma mensagem de magia. O método chamado pelo laço deve ter exatamente o mesmo nome para todos.

**Extra (opcional):** crie uma terceira classe, `Curandeiro`, cuja habilidade recupera vida. Depois, mostre a vida antes e depois.

### Atividade 4: responda com suas palavras

1. O que significa polimorfismo?
2. Qual é a função de `extends`?
3. O que significa sobrescrever um método?
4. Para que serve `override`?
5. Por que `Animal[]` pode guardar objetos `Cachorro` e `Gato` nos nossos exemplos?
6. O que acontece quando chamamos `animal.emitirSom()` dentro do `for...of`?
7. Qual é a diferença entre `this` e `super`?
8. Por que o polimorfismo ajuda quando queremos adicionar novos tipos de personagem em um jogo?

## Para lembrar

| Elemento | Função |
| --- | --- |
| **Polimorfismo** | Permite que objetos diferentes respondam de formas diferentes à mesma operação. |
| **Herança** | Permite criar uma classe a partir de outra. |
| `extends` | Indica de qual classe outra classe herda. |
| **Sobrescrita** | Cria uma implementação específica de um método herdado. |
| `override` | Indica explicitamente uma sobrescrita e ajuda a verificar erros. |
| `super` | Permite acessar a implementação da classe pai. |
| `Animal[]` | Representa uma lista de objetos compatíveis com `Animal`. |
| `for...of` | Percorre os elementos de uma lista, um de cada vez. |

**Resumo final:** se todos os personagens sabem `atacar()`, podemos mandar todos atacarem com o mesmo comando. Cada personagem decide *como* atacar por meio da implementação da própria classe. Isso é polimorfismo.

## Referências

- [Documentação oficial do TypeScript: classes, herança e sobrescrita](https://www.typescriptlang.org/docs/handbook/2/classes.html)

**Anterior:** [03. Primeiros passos com classes em TypeScript](03-classes-typescript.md).
