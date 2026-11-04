
# 05. Encapsulamento em TypeScript

## O que vamos aprender?

- Entender por que não é bom deixar todos os atributos livres para alteração.
- Conhecer `public`, `private` e `protected`.
- Criar **métodos comuns** chamados `getNome()`, `setNome()`, `getVida()` e `setVida()`.
- Aprender a ler um dado privado e alterá-lo com regras.
- Usar encapsulamento em exemplos com personagens de RPG.

**Pré-requisitos:** 03. Classes e objetos e 04. Herança em TypeScript. Esta aula usa classes, atributos, construtores, métodos e, em um exemplo, `extends`.

## Como acompanhar os exemplos

Em cada **exemplo completo**, substitua todo o conteúdo de `src/index.ts` e execute:

```bash
npm start
```

**Importante:** nesta aula, usamos **apenas métodos comuns** chamados `getNome()`, `setNome()` etc. Não vamos usar as palavras-chave especiais `get` e `set` do TypeScript.

## 1. O problema: mudar um atributo sem controle

### Exemplo completo 1: vida negativa

```typescript
class Personagem {
  nome: string;
  vida: number;

  constructor(nome: string, vida: number) {
    this.nome = nome;
    this.vida = vida;
  }
}

const heroi = new Personagem("Seu Zé", 100);

console.log(heroi.vida); // 100

// O código de fora da classe pode colocar qualquer valor.
heroi.vida = -500;

console.log(heroi.vida); // -500
```

**Resultado esperado:**

```text
100
-500
```

No nosso jogo, isso é um problema: não queremos que a vida de um personagem fique negativa por uma alteração direta.

## 2. O que é encapsulamento?

**Encapsulamento é controlar como os dados de um objeto são acessados e modificados.**

Imagine uma máquina de refrigerantes: você aperta os botões disponíveis, mas não mexe diretamente nas peças internas. Com um objeto, podemos fazer algo parecido: esconder alguns dados e oferecer **métodos** para trabalhar com eles.

## 3. `public`: qualquer parte do programa pode acessar

O modificador `public` permite usar um atributo ou método de fora da classe.

```typescript
class Personagem {
  public nome: string = "Seu Zé";
}

const heroi = new Personagem();
console.log(heroi.nome); // Seu Zé
heroi.nome = "Zé Wars";
```

Quando não indicamos um modificador, um membro de classe no TypeScript é `public` por padrão.

## 4. `private`: acesso apenas dentro da classe

Para impedir mudanças diretas, podemos usar `private`.

### Exemplo completo 2: protegendo a vida

```typescript
class Personagem {
  private vida: number;

  constructor(vida: number) {
    this.vida = vida;
  }

  mostrarVida(): void {
    console.log("Vida: " + this.vida);
  }
}

const heroi = new Personagem(100);
heroi.mostrarVida();

// Não funciona: o TypeScript avisa que vida é private.
// heroi.vida = -500;
```

**Resultado esperado:**

```text
Vida: 100
```

Dentro da classe, `this.vida` continua funcionando. Fora dela, o TypeScript impede acessar diretamente o atributo `private` durante a verificação de tipos.

**Observação:** `private` do TypeScript controla o acesso no código tipado; ele não é a mesma coisa que o campo privado de JavaScript escrito com `#`.

## 5. Como ler um atributo privado? `getVida()`

Podemos criar um **método público** que devolve o valor do atributo privado.

### Exemplo completo 3: nosso primeiro `get`

```typescript
class Personagem {
  private vida: number;

  constructor(vida: number) {
    this.vida = vida;
  }

  // Método comum com o nome getVida.
  public getVida(): number {
    return this.vida;
  }
}

const heroi = new Personagem(100);

const vidaAtual: number = heroi.getVida();
console.log(vidaAtual);
```

**Resultado esperado:**

```text
100
```

### Lendo `getVida(): number`

| Parte | Significado |
| --- | --- |
| `getVida` | Nome que escolhemos para o método. |
| `()` | Chamamos o método usando parênteses. |
| `: number` | O método devolve um número. |
| `return this.vida` | Entrega o valor armazenado no objeto. |

**Atenção:** `getVida()` não é um comando especial da linguagem. É um método comum que recebeu esse nome por convenção. Poderíamos chamá-lo `obterVida()`, mas nesta aula usaremos o padrão `get...()`.

## 6. Como alterar um atributo privado? `setVida()`

Um método `setVida()` pode receber um novo valor, verificar se ele é permitido e só então alterar o atributo.

### Exemplo completo 4: `getVida()` e `setVida()` juntos

```typescript
class Personagem {
  private vida: number;

  constructor(vida: number) {
    // Começamos com vida válida.
    if (vida >= 0 && vida <= 100) {
      this.vida = vida;
    } else {
      this.vida = 100;
    }
  }

  public getVida(): number {
    return this.vida;
  }

  public setVida(novaVida: number): void {
    // Só aceita valores de 0 até 100.
    if (novaVida >= 0 && novaVida <= 100) {
      this.vida = novaVida;
    } else {
      console.log("Valor de vida inválido!");
    }
  }
}

const heroi = new Personagem(100);

console.log(heroi.getVida());

heroi.setVida(70);
console.log(heroi.getVida());

heroi.setVida(-500);
console.log(heroi.getVida());
```

**Resultado esperado:**

```text
100
70
Valor de vida inválido!
70
```

Quando tentamos passar `-500`, o método recusa o valor. A vida continua em `70`.

### Comparando os dois métodos

| Método | O que faz? | Exemplo de uso |
| --- | --- | --- |
| `getVida()` | **Lê** o valor da vida e devolve um número. | `heroi.getVida()` |
| `setVida(70)` | **Tenta alterar** a vida seguindo uma regra. | `heroi.setVida(70)` |

O prefixo `get` costuma indicar leitura; `set` costuma indicar alteração. **Ambos fazem parte do nome do método**, sem significado especial para o TypeScript.

## 7. Praticando com `getNome()` e `setNome()`

### Exemplo completo 5: nome protegido

```typescript
class Pessoa {
  private nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(novoNome: string): void {
    // Remove espaços do começo e do fim.
    const nomeLimpo = novoNome.trim();

    if (nomeLimpo.length >= 2) {
      this.nome = nomeLimpo;
    } else {
      console.log("O nome precisa ter pelo menos 2 letras!");
    }
  }
}

const pessoa = new Pessoa("Leo");

console.log(pessoa.getNome());
pessoa.setNome("Seu Zé");
console.log(pessoa.getNome());
pessoa.setNome("A");
console.log(pessoa.getNome());
```

**Resultado esperado:**

```text
Leo
Seu Zé
O nome precisa ter pelo menos 2 letras!
Seu Zé
```

Observe que usamos **parênteses** nas chamadas:

```typescript
pessoa.setNome("Seu Zé");
console.log(pessoa.getNome());
```

Isso acontece porque `getNome` e `setNome` são **métodos comuns**.

## 8. Encapsulamento também pode proteger as ações

Nem todo atributo precisa ter um setter. Se a regra do jogo diz que a vida só pode mudar por dano ou cura, podemos expor `receberDano()` e `curar()` no lugar de `setVida()`.

### Exemplo completo 6: mudanças pelas ações do jogo

```typescript
class Personagem {
  private nome: string;
  private vida: number;

  constructor(nome: string) {
    this.nome = nome;
    this.vida = 100;
  }

  public getNome(): string {
    return this.nome;
  }

  public getVida(): number {
    return this.vida;
  }

  public receberDano(dano: number): void {
    if (dano <= 0) {
      console.log("O dano precisa ser positivo.");
      return;
    }

    this.vida = Math.max(0, this.vida - dano);
  }

  public curar(cura: number): void {
    if (cura <= 0) {
      console.log("A cura precisa ser positiva.");
      return;
    }

    this.vida = Math.min(100, this.vida + cura);
  }
}

const heroi = new Personagem("Seu Zé");

console.log(heroi.getNome() + ": " + heroi.getVida());
heroi.receberDano(40);
console.log(heroi.getVida());
heroi.curar(15);
console.log(heroi.getVida());
```

**Resultado esperado:**

```text
Seu Zé: 100
60
75
```

Aqui, `Math.max(0, ...)` impede a vida de ficar abaixo de zero, e `Math.min(100, ...)` impede que passe de 100.

**Ideia importante:** encapsular não significa criar `get` e `set` para tudo. Significa permitir somente os acessos e as alterações que fazem sentido.

## 9. `protected`: acesso pela classe e pelas filhas

Como vimos herança na aula anterior, podemos comparar `private` com `protected`.

### Exemplo completo 7: um método da classe filha

```typescript
class Personagem {
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  public getNome(): string {
    return this.nome;
  }
}

class Guerreiro extends Personagem {
  public gritar(): void {
    // A classe filha pode acessar o atributo protected.
    console.log(this.nome + " gritou: Pela vitória!");
  }
}

const guerreiro = new Guerreiro("Seu Zé");

guerreiro.gritar();
console.log(guerreiro.getNome());

// Não funciona fora da classe:
// console.log(guerreiro.nome);
```

**Resultado esperado:**

```text
Seu Zé gritou: Pela vitória!
Seu Zé
```

Se `nome` fosse `private`, a classe filha não poderia acessá-lo diretamente com `this.nome`. Nesse caso, poderia utilizar o método público `getNome()`.

## 10. Resumo dos modificadores

| Modificador | Dentro da própria classe | Na classe filha | Fora da classe |
| --- | --- | --- | --- |
| `public` | Sim | Sim | Sim |
| `private` | Sim | Não diretamente | Não |
| `protected` | Sim | Sim | Não |

Essas regras se referem à verificação de acesso do TypeScript.

## 11. Erros comuns

| Erro | Correção |
| --- | --- |
| `console.log(pessoa.nome)` quando `nome` é `private` | Use `pessoa.getNome()`. |
| `pessoa.nome = "Zé"` quando `nome` é `private` | Use `pessoa.setNome("Zé")`, se existir. |
| `console.log(pessoa.getNome)` para mostrar o texto | Use `console.log(pessoa.getNome())`. |
| Escrever `setNome = "Zé"` | Chame o método: `setNome("Zé")`. |
| Criar um setter e aceitar qualquer valor | Faça a validação antes de alterar o atributo. |
| Esquecer o `this` dentro da classe | Use `this.nome` para acessar o atributo. |
| Usar `get nome()` nesta aula | Aqui usamos somente `getNome()` como método comum. |

## 12. Exercícios guiados

### Atividade 1: encapsular um cachorro

Crie uma classe `Cachorro` com:

1. `private nome: string` e `private idade: number`.
2. Um construtor que receba `nome` e `idade`.
3. `getNome(): string` e `getIdade(): number`.
4. `setNome(novoNome: string): void`.
5. `setIdade(novaIdade: number): void`, aceitando somente idades entre 0 e 30.
6. Três objetos diferentes para testar os métodos.

**Dica:** use o **exemplo completo 5** para o nome e o **exemplo completo 4** para a idade.

### Atividade 2: energia de personagem

Crie uma classe `Personagem` com `private energia: number`.

1. O construtor deve iniciar a energia em 50.
2. Crie `getEnergia(): number`.
3. Crie `setEnergia(novaEnergia: number): void` que só aceite valores de 0 a 100.
4. Teste `setEnergia(80)` e `setEnergia(200)`.
5. Mostre o resultado de `getEnergia()` depois de cada tentativa.

### Atividade 3: conta bancária simplificada

Crie uma classe `ContaBancaria` com `private saldo: number`, começando em zero.

1. Crie `getSaldo(): number`.
2. Crie `depositar(valor: number): void` que só aceite valores positivos.
3. Crie `sacar(valor: number): void` que não permita sacar mais do que o saldo.
4. Teste um depósito de 100, um saque de 30 e um saque de 200.
5. Mostre o saldo depois de cada operação.

**Desafio:** perceba que essa classe **não precisa** de um método `setSaldo()`.

### Atividade 4: perguntas para responder

1. O que é encapsulamento?
2. Qual a diferença entre `public` e `private`?
3. Por que `getNome()` pode ler um atributo privado?
4. Por que `setIdade()` deve verificar o valor recebido?
5. `getNome()` é uma palavra-chave especial do TypeScript ou um nome de método?
6. Qual é a diferença entre `private` e `protected`?
7. Toda classe precisa ter getters e setters para todos os atributos?

## Para lembrar

| Elemento | Função |
| --- | --- |
| `public` | Permite acesso de fora da classe. |
| `private` | Restringe o acesso à própria classe. |
| `protected` | Permite acesso na classe e nas subclasses. |
| `getNome()` | Método comum que pode devolver o nome. |
| `setNome(valor)` | Método comum que pode validar e modificar o nome. |
| `return` | Devolve um valor para quem chamou o método. |
| `this` | Acessa o atributo ou método do objeto atual. |


## Referências

- [Documentação oficial do TypeScript: Classes e modificadores de acesso](https://www.typescriptlang.org/docs/handbook/2/classes.html)
