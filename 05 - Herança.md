
# 04. Herança em TypeScript

## O que vamos aprender?

- Entender o que significa **herança** na programação orientada a objetos.
- Identificar uma **classe mãe** e uma **classe filha**.
- Usar `extends` para aproveitar atributos e métodos de outra classe.
- Usar `super()` para chamar o construtor da classe mãe.
- Criar métodos próprios nas classes filhas.
- Sobrescrever um método simples.
- Praticar com personagens de um jogo.

**Pré-requisito:** 03. Primeiros passos com classes em TypeScript. É importante saber o que são classes, objetos, atributos, métodos, `constructor`, `new` e `this`.

## Como acompanhar os exemplos

Abra o projeto TypeScript das aulas anteriores. Para cada **exemplo completo**, substitua o conteúdo do arquivo `src/index.ts` e execute:

```bash
npm start
```

**Não cole todos os exemplos completos no mesmo arquivo:** algumas classes aparecem mais de uma vez.

## 1. Qual é o problema de repetir código?

Imagine um jogo com dois tipos de personagens: guerreiro e mago.

### Exemplo completo 1: duas classes com código repetido

```typescript
class Guerreiro {
  nome: string;
  vida: number;

  constructor(nome: string, vida: number) {
    this.nome = nome;
    this.vida = vida;
  }

  apresentar(): void {
    console.log("Eu sou " + this.nome + ".");
  }
}

class Mago {
  nome: string;
  vida: number;

  constructor(nome: string, vida: number) {
    this.nome = nome;
    this.vida = vida;
  }

  apresentar(): void {
    console.log("Eu sou " + this.nome + ".");
  }
}

const guerreiro = new Guerreiro("Seu Zé", 100);
const mago = new Mago("Merlino", 60);

guerreiro.apresentar();
mago.apresentar();
```

**Resultado esperado:**

```text
Eu sou Seu Zé.
Eu sou Merlino.
```

Perceba que `Guerreiro` e `Mago` repetem `nome`, `vida`, o construtor e `apresentar()`.

**Pergunta:** e se criássemos dez profissões diferentes? Precisaríamos copiar esse código dez vezes?

## 2. O que é herança?

**Herança permite que uma classe aproveite atributos e métodos de outra classe.**

- **Classe mãe (ou classe base):** guarda o que os personagens têm em comum.
- **Classe filha (ou subclasse):** herda essas características e pode adicionar outras.

Neste jogo, `Personagem` será a classe mãe. `Guerreiro` e `Mago` serão as classes filhas.

```text
               Personagem
                /      \
           Guerreiro   Mago
```

Os dois continuam sendo personagens, mas cada um pode ter suas próprias habilidades.

## 3. Nossa primeira herança: `extends`

A palavra `extends` indica de qual classe estamos herdando.

### Exemplo completo 2: herdando atributos e métodos

```typescript
class Personagem {
  nome: string;
  vida: number;

  constructor(nome: string, vida: number) {
    this.nome = nome;
    this.vida = vida;
  }

  apresentar(): void {
    console.log("Eu sou " + this.nome + ".");
  }
}

// Guerreiro herda as características de Personagem.
class Guerreiro extends Personagem {
}

// Mago também herda de Personagem.
class Mago extends Personagem {
}

const guerreiro = new Guerreiro("Seu Zé", 100);
const mago = new Mago("Merlino", 60);

console.log(guerreiro.vida);
guerreiro.apresentar();
mago.apresentar();
```

**Resultado esperado:**

```text
100
Eu sou Seu Zé.
Eu sou Merlino.
```

Observe que **não escrevemos** `nome`, `vida` ou `apresentar()` novamente dentro de `Guerreiro` e `Mago`. As classes filhas aproveitaram o que já existia em `Personagem`.

### Lendo a linha `class Guerreiro extends Personagem`

| Parte | Significado |
| --- | --- |
| `class Guerreiro` | Estamos criando a classe `Guerreiro`. |
| `extends` | Indica que haverá herança. |
| `Personagem` | É a classe mãe da qual `Guerreiro` herda. |

## 4. Uma classe filha pode ter seu próprio método

Herdar não significa que todos os personagens farão exatamente as mesmas coisas.

### Exemplo completo 3: habilidades diferentes

```typescript
class Personagem {
  nome: string;
  vida: number;

  constructor(nome: string, vida: number) {
    this.nome = nome;
    this.vida = vida;
  }

  apresentar(): void {
    console.log("Eu sou " + this.nome + ".");
  }
}

class Guerreiro extends Personagem {
  usarEspada(): void {
    console.log(this.nome + " atacou com a espada!");
  }
}

class Mago extends Personagem {
  lancarMagia(): void {
    console.log(this.nome + " lançou uma bola de fogo!");
  }
}

const guerreiro = new Guerreiro("Seu Zé", 100);
const mago = new Mago("Merlino", 60);

guerreiro.apresentar();
guerreiro.usarEspada();
mago.apresentar();
mago.lancarMagia();
```

**Resultado esperado:**

```text
Eu sou Seu Zé.
Seu Zé atacou com a espada!
Eu sou Merlino.
Merlino lançou uma bola de fogo!
```

- `apresentar()` é **herdado** de `Personagem`.
- `usarEspada()` é **próprio** de `Guerreiro`.
- `lancarMagia()` é **próprio** de `Mago`.

**Atenção:** `guerreiro.lancarMagia()` daria erro, porque esse método não foi criado em `Guerreiro` nem herdado de `Personagem`.

## 5. E se a classe filha precisar de um novo atributo?

Um mago também pode ter `mana`. Para recebê-la no momento da criação, vamos escrever um construtor na classe filha.

### Exemplo completo 4: usando `super()`

```typescript
class Personagem {
  nome: string;
  vida: number;

  constructor(nome: string, vida: number) {
    this.nome = nome;
    this.vida = vida;
  }

  apresentar(): void {
    console.log(this.nome + " tem " + this.vida + " de vida.");
  }
}

class Mago extends Personagem {
  mana: number;

  constructor(nome: string, vida: number, mana: number) {
    // Chama o constructor da classe mãe.
    super(nome, vida);

    // Depois, preenche o atributo próprio do Mago.
    this.mana = mana;
  }

  mostrarMana(): void {
    console.log(this.nome + " tem " + this.mana + " de mana.");
  }
}

const mago = new Mago("Merlino", 60, 120);

mago.apresentar();
mago.mostrarMana();
```

**Resultado esperado:**

```text
Merlino tem 60 de vida.
Merlino tem 120 de mana.
```

### Por que usamos `super(nome, vida)`?

O construtor de `Personagem` já sabe preencher `nome` e `vida`. Em vez de repetir esse código, o construtor de `Mago` chama o da classe mãe:

```typescript
super(nome, vida);
```

Depois, a classe filha preenche seu atributo exclusivo:

```typescript
this.mana = mana;
```

**Regra importante:** quando uma classe filha declara seu próprio construtor, deve chamar `super()` antes de usar `this`.

## 6. Uma classe filha também pode mudar um método herdado

Às vezes queremos que `Mago` se apresente de um jeito diferente dos demais personagens. Isso se chama **sobrescrita de método** (*override*).

### Exemplo completo 5: sobrescrevendo um método

```typescript
class Personagem {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  apresentar(): void {
    console.log("Meu nome é " + this.nome + ".");
  }
}

class Guerreiro extends Personagem {
  override apresentar(): void {
    console.log("Eu sou " + this.nome + ", o guerreiro!");
  }
}

const personagem = new Personagem("Pipoca");
const guerreiro = new Guerreiro("Seu Zé");

personagem.apresentar();
guerreiro.apresentar();
```

**Resultado esperado:**

```text
Meu nome é Pipoca.
Eu sou Seu Zé, o guerreiro!
```

O nome do método continua `apresentar()`, mas `Guerreiro` cria uma versão própria. A palavra `override` deixa essa intenção explícita e ajuda o TypeScript a verificar se existe um método correspondente na classe mãe.

Na aula de **polimorfismo**, entenderemos por que essa ideia é tão útil.

## 7. Erros comuns

| Erro | Como corrigir |
| --- | --- |
| Escrever `class Mago Personagem` | Use `class Mago extends Personagem`. |
| Repetir todos os atributos herdados | Declare na filha apenas o que é próprio dela. |
| Criar um construtor na filha e esquecer `super()` | Chame `super(...)` antes de acessar `this`. |
| Tentar usar `lancarMagia()` em um `Guerreiro` | Use apenas métodos disponíveis naquele tipo. |
| Esquecer os parênteses em `mago.apresentar` | Para executar, use `mago.apresentar()`. |
| Colar vários exemplos completos juntos | Execute um exemplo de cada vez. |

## 8. Exercícios guiados

### Atividade 1: criar um arqueiro

Use o **exemplo completo 3**.

1. Crie `class Arqueiro extends Personagem`.
2. Adicione o método `atirarFlecha(): void`.
3. Faça esse método mostrar `<nome> disparou uma flecha!`.
4. Crie um arqueiro chamado `Robin` com 80 de vida.
5. Execute `apresentar()` e `atirarFlecha()`.

**Dica:** faça como no método `usarEspada()` de `Guerreiro`.

### Atividade 2: mais um atributo

Use o **exemplo completo 4**.

1. Crie `Guerreiro extends Personagem`.
2. Adicione um atributo `forca: number`.
3. Crie um construtor que receba `nome`, `vida` e `forca`.
4. Use `super(nome, vida)`.
5. Adicione `mostrarForca(): void` para mostrar a força do guerreiro.
6. Crie `new Guerreiro("Seu Zé", 100, 25)` e teste.

### Atividade 3: apresentação especial

Use o **exemplo completo 5**.

1. Crie `class Mago extends Personagem`.
2. Sobrescreva `apresentar()` com `override`.
3. Mostre a mensagem `Eu sou <nome>, o mago!`.
4. Crie um guerreiro e um mago e execute `apresentar()` nos dois.

### Atividade 4: explique com suas palavras

1. O que é uma classe mãe?
2. O que significa `extends`?
3. Qual é a vantagem de herdar em vez de repetir código?
4. Para que serve `super()` no construtor da classe filha?
5. Uma classe filha pode ter métodos que não existem na classe mãe?
6. O que acontece quando uma classe filha sobrescreve um método?

## Para lembrar

| Elemento | Função |
| --- | --- |
| `extends` | Faz uma classe herdar de outra. |
| Classe mãe | Guarda características e comportamentos compartilhados. |
| Classe filha | Aproveita o que herdou e pode acrescentar características. |
| `super(...)` | Chama o construtor da classe mãe. |
| `this` | Acessa atributos e métodos do objeto atual. |
| `override` | Indica que a classe filha sobrescreve um método herdado. |


## Referências

- [Documentação oficial do TypeScript: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
