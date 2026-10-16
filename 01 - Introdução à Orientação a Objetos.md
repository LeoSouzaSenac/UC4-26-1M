# 01. Paradigmas e orientação a objetos

## O que vamos aprender?

- O que significa a palavra paradigma na programação.
- O que é programação orientada a objetos.
- Como reconhecer objetos, atributos e métodos.
- Qual é a diferença entre uma classe e um objeto.

Não é necessário decorar todos os nomes agora, fique tranquilo. Primeiro, procure entender os exemplos.

## 1. O que é um paradigma?

**Um paradigma de programação é uma maneira de organizar o código e pensar na solução de um problema.**

Imagine que você precisa organizar uma biblioteca. Você pode separar os livros por assunto, por autor ou por título. O objetivo continua sendo organizar os livros, mas a forma de fazer isso muda.

Na programação, também existem diferentes formas de organizar uma solução.

| Forma de programar | Ideia inicial |
| --- | --- |
| Programação procedural | Dividir o trabalho em passos e funções. |
| Programação orientada a objetos | Organizar o programa em objetos que possuem dados e ações. |
| Programação funcional | Usar funções para transformar dados, procurando evitar mudanças nos dados originais. |

Essas explicações são um primeiro contato. Cada forma tem outros detalhes que podem ser estudados depois.

**Uma mesma linguagem pode permitir mais de um paradigma.** TypeScript permite trabalhar com funções e também com objetos e classes. Um mesmo programa pode combinar essas formas.

## 2. Um problema simples: cuidar de um animal

Vamos imaginar um jogo em que você tem que cuidar de animais num zoológico.

Cada animal precisa ter algumas informações:

- nome;
- espécie;
- energia.

Cada animal também pode realizar ações:

- comer;
- brincar;
- dormir.

Na orientação a objetos, podemos reunir as informações e as ações de cada animal em um objeto.

## 3. O que é exatamente orientação a objetos?

**Programação orientada a objetos (POO) é uma forma de organizar o código usando objetos que reúnem dados/atributos (as coisas que aquele objeto tem) e ações/métodos (as coisas que aquele objeto faz).**

Um objeto representa algo que importa para o programa. Pode ser um animal, um aluno, uma conta bancária, um produto ou um personagem.

Também pode representar algo que pode ser mais "abstrato", como uma reserva ou uma partida de um jogo.

No nosso exemplo:

| Parte do programa | O que representa |
| --- | --- |
| Um animal chamado Pipoca | Um objeto. |
| Nome, espécie e energia | Dados desse objeto. |
| Comer, brincar e dormir | Ações desse objeto. |

Os objetos também podem trabalhar juntos. Por exemplo: em um sistema de biblioteca, um aluno pode fazer um empréstimo de um livro.

## 4. O que são atributos?

**Atributos são os dados de um objeto.** Em TypeScript, você também verá esses dados sendo chamados de propriedades.

Exemplo de um animal:

| Atributo | Valor |
| --- | --- |
| nome | Pipoca |
| especie | Capivara |
| energia | 50 |

Outro animal pode ter os mesmos tipos de atributos, mas valores diferentes:

| Atributo | Valor |
| --- | --- |
| nome | Rex |
| especie | Cachorro |
| energia | 80 |

Os dois animais têm nome, espécie e energia. Cada um guarda os seus próprios valores.

## 5. O que são métodos?

**Métodos são funções que pertencem a um objeto ou a uma classe.** Neste início, vamos usá-los para representar ações dos objetos.

Por exemplo, a ação de comer pode aumentar a energia de um animal.

Se Pipoca está com 50 de energia e come, sua energia pode passar para 60.

Se Rex está com 80 de energia, ele continua com 80. Alimentar Pipoca não alimenta Rex automaticamente.

Isso ajuda a entender uma ideia importante: cada objeto pode manter seu próprio estado. **Estado é o conjunto dos valores que o objeto possui naquele momento.**

## 6. Um primeiro exemplo em TypeScript

Leia o código sem se preocupar em decorar a escrita:

```typescript
// Criamos um objeto que representa um animal.
const animal = {
  nome: "Pipoca",
  especie: "Capivara",
  energia: 50,

  // Esta função pertence ao objeto. Por isso, é um método.
  comer(): void {
    // Neste exemplo, this representa o animal que recebeu a ação.
    this.energia = this.energia + 10;
  }
};

// O ponto permite acessar uma informação do objeto.
console.log(animal.nome); // Pipoca
console.log(animal.energia); // 50

// Os parênteses executam o método.
animal.comer();

console.log(animal.energia); // 60
```

O objeto reúne os dados do animal e uma ação que usa esses dados.

O `void` informa que o método não devolve um valor com `return`. Mesmo assim, ele realiza uma ação: altera a energia.

## 7. E o que é uma classe?

**Uma classe é uma definição usada para criar objetos com uma estrutura e comportamentos em comum.**

Podemos pensar nela como uma ficha-modelo:

- todo animal terá nome;
- todo animal terá espécie;
- todo animal terá energia;
- todo animal poderá comer.

A classe define essa estrutura. Os objetos são os animais criados a partir dela.

| Classe | Objetos que poderíamos criar |
| --- | --- |
| Animal | Pipoca, Rex e Mimi. |
| Produto | Um caderno e uma mochila cadastrados na loja. |
| Aluno | Ana e Bruno cadastrados na escola. |

Um objeto criado a partir de uma classe também é chamado de **instância**. Por enquanto, entenda instância como “um objeto criado a partir daquela classe”.

**É possível criar objetos sem classes**, como fizemos no exemplo anterior. Nas próximas aulas, usaremos classes para praticar essa forma de organização.

## 8. Por que usar essa forma de organizar?

Imagine um jogo com 30 animais. Escrever manualmente a estrutura e os métodos de cada um pode gerar muita repetição.

Uma classe permite definir a estrutura uma vez e criar vários animais. Cada animal terá seus próprios dados e poderá usar os métodos definidos na classe.

Isso pode ajudar a:

- manter informações relacionadas no mesmo lugar;
- reaproveitar código;
- localizar as ações de cada parte do programa;
- organizar programas que crescem com o tempo.

Criar classes, sozinho, não garante que um programa fique bem organizado. Precisamos escolher dados e ações que façam sentido juntos.

## 9. Vamos conferir se você entendeu?

Imagine um sistema de uma cantina.

1. Cite dois tipos de objeto que poderiam existir nesse sistema.
2. Escolha um deles e escreva três atributos.
3. Escreva duas ações que esse objeto poderia realizar.
4. Explique com suas palavras a diferença entre uma classe e um objeto.

### Uma possível resposta para parte da atividade

Um objeto poderia ser um produto.

- Atributos: nome, preço e quantidade em estoque.
- Ações: aumentar o estoque e alterar o preço.

Existem outras respostas possíveis. O importante é conseguir explicar a relação entre os dados e as ações escolhidas.

## Para lembrar

| Palavra | Significado nesta aula |
| --- | --- |
| Paradigma | Uma maneira de pensar e organizar o código. |
| Objeto | Uma parte do programa que reúne dados e ações relacionadas. |
| Atributo | Um dado do objeto. |
| Método | Uma função que pertence ao objeto ou à classe. |
| Classe | Uma definição usada para criar objetos. |
| Instância | Um objeto criado a partir de uma classe. |

**Próximo material:** [02. Criando um projeto TypeScript](02-projeto-typescript.md).
