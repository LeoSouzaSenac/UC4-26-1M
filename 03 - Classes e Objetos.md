# 03. Primeiros passos com classes em TypeScript

## O que vamos aprender?

- Criar uma classe.
- Definir atributos e seus tipos.
- Criar objetos com `new`.
- Usar `this`.
- Escrever métodos com e sem retorno.
- Usar um construtor para receber os dados iniciais.

**Pré-requisito:** ter concluído [02. Criando um projeto TypeScript](02-projeto-typescript.md).

> O PDF de referência trabalha funções tipadas, parâmetros opcionais, valores padrão e configuração do projeto. Ele ainda não apresenta classes. Esta aula retoma essa base e começa o próximo assunto.

## Como acompanhar os exemplos

Use o arquivo `src/index.ts` do projeto anterior e execute com `npm start`.

**Cada bloco identificado como “exemplo completo” substitui o conteúdo anterior de `src/index.ts`.** Os trechos menores servem para explicar partes do código. Não cole todos os exemplos de classes no mesmo arquivo, pois alguns repetem o nome `Animal`.

## 1. Relembrando: função com tipos

No PDF, uma função recebe dois números e devolve um número. Em português, podemos escrever:

```typescript
function somar(a: number, b: number): number {
  // return devolve o resultado para quem chamou a função.
  return a + b;
}

const resultado: number = somar(10, 5);
console.log(resultado); // 15
```

- `a: number` e `b: number`: os parâmetros devem receber números.
- `: number` após os parênteses: a função devolve um número.
- `return`: devolve o resultado.

**Parâmetro** é o nome que usamos na função para receber um valor. Ao chamar `somar(10, 5)`, os valores `10` e `5` são enviados para `a` e `b`.

Vamos usar essa mesma ideia de tipos nos métodos de uma classe.

## 2. O que é uma classe?

Uma classe define uma estrutura usada para criar objetos.

No nosso jogo, todo animal terá:

- um nome;
- uma espécie;
- uma quantidade de energia;
- algumas ações, como comer e brincar.

Vamos chamar essa classe de `Animal`.

Por costume, o nome de uma classe começa com letra maiúscula. Para nomes com mais de uma palavra, podemos escrever `ContaBancaria` ou `PersonagemDoJogo`.

### Começando pela estrutura

```typescript
class Animal {
  // Os atributos e os métodos serão escritos aqui.
}
```

A palavra `class` inicia a classe. As chaves delimitam o espaço onde escreveremos seus atributos e métodos.

## 3. Adicionar atributos

**Atributos são os dados que cada objeto terá.**

```typescript
class Animal {
  nome: string = "Sem nome";
  especie: string = "Não informada";
  energia: number = 50;
}
```

Vamos ler o primeiro atributo:

```typescript
nome: string = "Sem nome";
```

| Parte | Significado |
| --- | --- |
| `nome` | Nome do atributo. |
| `: string` | Esse atributo guarda um texto. |
| `= "Sem nome"` | Valor inicial. |

Em `energia: number = 50`, o atributo guarda um número e começa com o valor `50`.

Nesta primeira versão, todos os animais começam com os mesmos valores. Depois, aprenderemos a receber os dados na criação.

## 4. Criar o primeiro objeto

### Exemplo completo 1: criar e acessar um objeto

```typescript
class Animal {
  nome: string = "Sem nome";
  especie: string = "Não informada";
  energia: number = 50;
}

// new Animal() cria um objeto a partir da classe Animal.
const animal1 = new Animal();

// O ponto permite acessar os atributos desse objeto.
animal1.nome = "Pipoca";
animal1.especie = "Capivara";

console.log(animal1.nome);
console.log(animal1.especie);
console.log(animal1.energia);
```

Execute:

```bash
npm start
```

Resultado esperado:

```text
Pipoca
Capivara
50
```

### Entendendo new Animal()

- `new`: pede a criação de um novo objeto.
- `Animal`: indica a classe usada.
- `()`: permite enviar os dados de criação. Por enquanto, não estamos enviando nenhum.
- `animal1`: guarda uma referência para o objeto criado, permitindo acessá-lo depois.

Esse processo também é chamado de **instanciar uma classe**. Isso significa criar um objeto a partir dela.

### Por que conseguimos alterar um atributo usando const?

`const` impede trocar a referência guardada em `animal1` por outra. Ela não impede alterar os atributos do objeto.

Por isso, `animal1.nome = "Pipoca"` é permitido. Já `animal1 = new Animal()` não seria permitido nessa variável declarada com `const`.

## 5. Dois objetos da mesma classe

Depois da classe, poderíamos escrever:

```typescript
const animal1 = new Animal();
animal1.nome = "Pipoca";

const animal2 = new Animal();
animal2.nome = "Rex";

console.log(animal1.nome); // Pipoca
console.log(animal2.nome); // Rex
```

Cada chamada de `new Animal()` cria um novo objeto. Mudar o nome de `animal1` não muda o nome de `animal2`.

**Classe é a definição. Objeto é cada animal que criamos a partir dela.**

## 6. Adicionar um método

Um método é uma função escrita como parte da classe. Vamos criar a ação de comer.

### Exemplo completo 2: um método que altera um atributo

```typescript
class Animal {
  nome: string = "Sem nome";
  especie: string = "Não informada";
  energia: number = 50;

  // Dentro da classe, não escrevemos function antes do método.
  comer(): void {
    // Aumenta em 10 a energia do animal que recebeu a ação.
    this.energia = this.energia + 10;
  }
}

const animal1 = new Animal();
animal1.nome = "Pipoca";

console.log(animal1.energia); // 50

// Os parênteses executam o método.
animal1.comer();

console.log(animal1.energia); // 60
```

### O que significa void?

`void` informa que esse método não devolve um valor com `return`.

Ele realiza uma ação, que é aumentar a energia. Não precisamos guardar um resultado em uma variável para isso acontecer.

### O que significa this?

**Nas chamadas que estamos usando, `this` representa o objeto que recebeu a chamada do método.**

Quando executamos `animal1.comer()`, `this.energia` acessa a energia de `animal1`.

Quando executamos `animal2.comer()`, `this.energia` acessa a energia de `animal2`.

Na linha:

```typescript
this.energia = this.energia + 10;
```

1. O programa lê a energia atual.
2. Soma 10.
3. Guarda o resultado no atributo `energia` daquele objeto.

## 7. Receber os dados com constructor

Até agora, criamos um animal e preenchemos seus dados depois.

Podemos receber esses dados no momento da criação usando o **construtor**.

**O construtor é executado automaticamente quando usamos `new` para criar um objeto da classe.** Sua função aqui será preencher os atributos iniciais.

### Exemplo completo 3: criar animais com seus dados

```typescript
class Animal {
  // Estes atributos pertencem a cada objeto.
  nome: string;
  especie: string;
  energia: number;

  constructor(nome: string, especie: string, energia: number) {
    // À esquerda: o atributo do objeto.
    // À direita: o parâmetro recebido pelo construtor.
    this.nome = nome;
    this.especie = especie;
    this.energia = energia;
  }
}

// Os valores são enviados na mesma ordem dos parâmetros.
const animal1 = new Animal("Pipoca", "Capivara", 50);
const animal2 = new Animal("Rex", "Cachorro", 80);

console.log(animal1.nome); // Pipoca
console.log(animal1.energia); // 50
console.log(animal2.nome); // Rex
console.log(animal2.energia); // 80
```

### Entendendo this.nome = nome

Mesmo que os nomes sejam iguais, são duas coisas diferentes:

| Escrita | O que representa |
| --- | --- |
| `this.nome` | O atributo que fica guardado no objeto. |
| `nome` | O parâmetro que recebeu o texto enviado na criação. |

Quando escrevemos `new Animal("Pipoca", "Capivara", 50)`, o parâmetro `nome` recebe `"Pipoca"`. A linha `this.nome = nome` guarda esse texto no atributo do novo objeto.

Os parâmetros deixam de ser necessários após a criação, mas os valores guardados nos atributos continuam disponíveis no objeto.

**No construtor, não escrevemos `function` nem um tipo de retorno como `: void`.**

## 8. Juntar atributos, construtor e métodos

Agora vamos montar um exemplo com três ações:

- `comer`: aumenta a energia;
- `brincar`: usa energia;
- `obterResumo`: devolve um texto com os dados do animal.

### Exemplo completo 4: versão para praticar

```typescript
class Animal {
  nome: string;
  especie: string;
  energia: number;

  constructor(nome: string, especie: string, energia: number) {
    this.nome = nome;
    this.especie = especie;
    this.energia = energia;
  }

  comer(): void {
    this.energia = this.energia + 10;
  }

  brincar(): void {
    // Só permite brincar quando há pelo menos 20 de energia.
    if (this.energia >= 20) {
      this.energia = this.energia - 20;
      console.log(this.nome + " brincou!");
    } else {
      console.log(this.nome + " precisa descansar.");
    }
  }

  obterResumo(): string {
    // Devolve um texto. Quem chamar decide o que fazer com ele.
    return this.nome + " | " + this.especie + " | Energia: " + this.energia;
  }
}

const animal1 = new Animal("Pipoca", "Capivara", 50);
const animal2 = new Animal("Rex", "Cachorro", 80);

console.log(animal1.obterResumo());
animal1.comer();
animal1.brincar();
console.log(animal1.obterResumo());

// As ações anteriores foram feitas somente em animal1.
console.log(animal2.obterResumo());
```

Resultado esperado:

```text
Pipoca | Capivara | Energia: 50
Pipoca brincou!
Pipoca | Capivara | Energia: 40
Rex | Cachorro | Energia: 80
```

### Acompanhe a energia de Pipoca

| Momento | Conta | Energia |
| --- | --- | --- |
| Criação | Valor recebido pelo construtor. | 50 |
| Depois de comer | 50 + 10 | 60 |
| Depois de brincar | 60 - 20 | 40 |

Rex continua com 80 porque nenhum método foi chamado nele.

Neste exemplo inicial, ainda não limitamos a energia máxima nem verificamos a energia recebida no construtor. Se o jogo exigir energia entre 0 e 100, precisaremos acrescentar essas regras.

## 9. Mostrar e retornar são coisas diferentes

Compare:

```typescript
mostrarNome(): void {
  console.log(this.nome);
}
```

Esse método mostra o nome imediatamente no terminal.

```typescript
obterNome(): string {
  return this.nome;
}
```

Esse método entrega o texto para quem o chamou. Assim, podemos guardar o valor:

```typescript
// Este trecho pressupõe que obterNome foi adicionado à classe.
const nomeDoAnimal: string = animal1.obterNome();
console.log(nomeDoAnimal);
```

`console.log` mostra uma informação. `return` devolve um valor e encerra aquela execução do método.

## 10. Ligação com os parâmetros do PDF

Métodos também podem receber parâmetros, como as funções do PDF.

Por exemplo, poderíamos **substituir** o método `comer` por:

```typescript
comer(quantidade: number = 10): void {
  this.energia = this.energia + quantidade;
}
```

Chamadas possíveis:

```typescript
animal1.comer();   // Não recebeu um valor: usa 10.
animal1.comer(25); // Recebeu 25: usa 25.
```

O `= 10` define um **valor padrão**, usado quando não enviamos o valor ou enviamos `undefined`.

Também poderíamos adicionar à classe um método com parâmetro opcional:

```typescript
apresentar(apelido?: string): void {
  if (apelido === undefined) {
    console.log("Nome:", this.nome);
  } else {
    console.log("Apelido:", apelido);
  }
}
```

- `?` indica que o parâmetro pode ser omitido.
- Se for omitido, seu valor será `undefined`.
- Verificamos isso antes de decidir qual mensagem mostrar.

Chamadas possíveis:

```typescript
animal1.apresentar();        // Mostra o nome do animal.
animal1.apresentar("Pipo"); // Mostra o apelido enviado.
```

Esses trechos são complementos. Primeiro, faça o exemplo completo 4 funcionar. Depois, experimente as alterações.

## 11. Erros comuns

| Erro | Como corrigir |
| --- | --- |
| Escrever `function comer()` dentro da classe | Escreva `comer(): void`. |
| Escrever apenas `energia` dentro do método | Use `this.energia` para acessar o atributo do objeto. |
| Esquecer os parênteses em `animal1.comer` | Use `animal1.comer()` para executar a ação. |
| Passar `"50"` onde o construtor espera `number` | Use `50`, sem aspas. |
| Declarar um atributo sem preencher seu valor | Dê um valor inicial ou preencha no construtor. A configuração `strict` ajuda a encontrar isso. |
| Colar várias versões de `class Animal` juntas | Use um exemplo completo por vez no arquivo. |
| Alterar o `.ts` e executar apenas o `.js` antigo | Salve e use `npm start` para compilar e executar novamente. |

## 12. Exercícios guiados

### Atividade 1: criar mais um animal

Use o exemplo completo 4.

1. Crie um terceiro animal, com nome, espécie e energia escolhidos por você.
2. Mostre seu resumo.
3. Faça somente esse animal comer.
4. Mostre os resumos dos três animais.
5. Confira qual energia mudou.

### Atividade 2: adicionar a ação dormir

Dentro da classe, crie um método chamado `dormir`.

Regras:

- não precisa receber dados;
- não precisa devolver um valor;
- deve aumentar a energia do objeto em 30.

Depois, chame o método em um animal e mostre sua energia antes e depois.

**Dica:** use o método `comer` como referência.

### Atividade 3: praticar o retorno

Crie um método chamado `temEnergiaParaBrincar`.

Regras:

- deve retornar `boolean`, que representa `true` ou `false`;
- deve retornar `true` quando a energia for maior ou igual a 20;
- deve retornar `false` quando a energia for menor que 20.

**Dica:** a comparação `this.energia >= 20` já produz um resultado booleano.

Crie um animal com 10 de energia e outro com 30. Mostre o retorno do método para cada um.

### Atividade 4: explicar o código

Responda com suas palavras:

1. Qual é a classe do exemplo?
2. Quais são seus atributos?
3. O que acontece quando usamos `new`?
4. Para que serve o construtor?
5. O que `this.energia` representa em `animal1.comer()`?
6. Qual é a diferença entre um método `: void` e um método `: string`?

## Para lembrar

| Elemento | Função |
| --- | --- |
| `class` | Define uma classe. |
| Atributo | Guarda um dado de cada objeto. |
| Método | Define uma função da classe. |
| `new` | Cria um novo objeto. |
| `constructor` | Recebe e prepara os dados iniciais na criação. |
| `this` | Nas chamadas desta aula, permite acessar o próprio objeto que está sendo usado. |
| `void` | Indica que o método não devolve um valor com `return`. |
| `return` | Devolve um valor para quem chamou o método. |

## Referências

Material-base para a revisão de funções e configuração: *Aula #4 - Aprofundamento em TypeScript*, Prof. Vitor Hugo Lopes. Os exemplos de classes foram criados para dar continuidade ao estudo.

- [Documentação oficial do TypeScript: classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

**Anterior:** [02. Criando um projeto TypeScript](02-projeto-typescript.md).
