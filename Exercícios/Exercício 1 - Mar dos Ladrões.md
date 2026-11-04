# 🏴‍☠️ O Mar dos Ladrões — Herança, Encapsulamento e Polimorfismo em TypeScript

## 1. Contexto

O Mar dos Ladrões é um mundo repleto de ilhas, tesouros escondidos, batalhas navais e tripulações piratas. Nesse cenário, você deverá desenvolver um sistema em TypeScript para representar diferentes tipos de navios piratas.

Cada navio possui características próprias, como capacidade de tripulação, velocidade e resistência, além de comportamentos que o diferenciam dos demais.

O objetivo é utilizar os conceitos de **herança, encapsulamento e polimorfismo** para construir um sistema organizado, reutilizável e que represente as diferenças entre os navios.

## 2. Classe `Navio`

Crie uma classe chamada `Navio`, que será a classe principal do sistema. Ela deverá possuir as seguintes propriedades:

- `nome`: nome do navio.
- `capacidadeTripulacao`: quantidade máxima de tripulantes.
- `vida`: quantidade atual de pontos de vida do navio.
- `velocidade`: velocidade máxima do navio.
- `canhoes`: quantidade de canhões disponíveis.

Utilize modificadores de acesso adequados para proteger as propriedades e controlar como elas podem ser acessadas pelas outras classes.

A classe também deverá possuir os seguintes métodos:

- `navegar()`: apresenta uma mensagem informando que o navio está navegando.
- `atacar()`: apresenta uma mensagem informando que o navio está atacando com seus canhões.
- `receberDano(dano: number)`: reduz os pontos de vida do navio de acordo com o dano recebido. A vida não poderá ficar abaixo de zero.
- `exibirInformacoes()`: apresenta as informações principais do navio.

## 3. Classes especializadas

Crie três classes que herdem de `Navio`: `Bergantim`, `Chalupa` e `Galeao`.

Cada classe deverá possuir características e comportamentos próprios.

### 3.1. Classe `Bergantim`

O bergantim é um navio equilibrado, adequado para explorar os mares e enfrentar outros piratas.

Características:

- Capacidade para até 20 tripulantes.
- Velocidade alta.
- Resistência intermediária.
- Quantidade intermediária de canhões.

Comportamentos específicos:

- Sobrescreva o método `navegar()` para apresentar uma mensagem indicando que o bergantim aproveita seus ventos favoráveis para navegar rapidamente.
- Sobrescreva o método `atacar()` para apresentar uma mensagem indicando que o bergantim realiza uma sequência rápida de disparos.

### 3.2. Classe `Chalupa`

A chalupa é uma embarcação pequena, ágil e ideal para explorar ilhas, fugir de inimigos e transportar pequenas tripulações.

Características:

- Capacidade para até 10 tripulantes.
- Velocidade muito alta.
- Resistência baixa.
- Poucos canhões.

Comportamentos específicos:

- Sobrescreva o método `navegar()` para apresentar uma mensagem indicando que a chalupa utiliza sua agilidade para realizar manobras rápidas.
- Sobrescreva o método `atacar()` para apresentar uma mensagem indicando que a chalupa dispara seus poucos canhões e tenta escapar rapidamente.
- Crie um método exclusivo chamado `explorarIlha()`, que apresenta uma mensagem informando que a tripulação está explorando uma ilha em busca de tesouros.

### 3.3. Classe `Galeao`

O galeão é uma embarcação enorme, resistente e fortemente armada, ideal para batalhas navais de grande escala.

Características:

- Capacidade para até 50 tripulantes.
- Velocidade baixa.
- Resistência alta.
- Grande quantidade de canhões.

Comportamentos específicos:

- Sobrescreva o método `navegar()` para apresentar uma mensagem indicando que o galeão avança lentamente pelo mar.
- Sobrescreva o método `atacar()` para apresentar uma mensagem indicando que o galeão dispara uma poderosa salva de canhões.
- Crie um método exclusivo chamado `repararNavio()`, que recupera parte dos pontos de vida do galeão sem ultrapassar sua vida máxima.

## 4. Aplicando o encapsulamento

As propriedades dos navios não devem ser modificadas livremente de qualquer lugar do programa.

Utilize os modificadores `private`, `protected` e `public` de maneira adequada para controlar o acesso aos atributos e métodos.

Implemente mecanismos para consultar ou modificar as informações necessárias, respeitando as regras do sistema.

Considere as seguintes regras:

- A vida atual não pode ser negativa.
- A vida atual não pode ultrapassar a vida máxima do navio.
- O dano recebido não pode ser negativo.
- A quantidade de canhões e a capacidade da tripulação devem respeitar os valores definidos para cada tipo de navio.
- As classes especializadas devem conseguir acessar os atributos protegidos que forem necessários para implementar seus comportamentos.

Você poderá criar propriedades e métodos adicionais caso sejam necessários para garantir essas regras.

## 5. Aplicando a herança e o polimorfismo

As classes `Bergantim`, `Chalupa` e `Galeao` devem herdar as características comuns da classe `Navio`, evitando a repetição desnecessária de código.

Utilize a sobrescrita de métodos para implementar comportamentos específicos em cada classe.

O polimorfismo deverá ser demonstrado por meio de uma coleção de navios. Essa coleção deverá permitir armazenar objetos de diferentes tipos utilizando o tipo `Navio`.

Ao percorrer essa coleção e chamar os métodos `navegar()`, `atacar()` e `exibirInformacoes()`, cada objeto deverá executar o comportamento correspondente à sua própria classe.

## 6. Arquivo `Main.ts`

Crie um arquivo chamado `Main.ts` para testar o funcionamento de todo o sistema.

Nesse arquivo, realize as seguintes operações:

1. Crie pelo menos um objeto de cada tipo de navio: bergantim, chalupa e galeão.
2. Exiba as informações de cada navio.
3. Faça cada navio navegar e atacar, verificando as diferenças entre os comportamentos.
4. Utilize o método `receberDano()` para simular ataques contra diferentes navios.
5. Consulte os pontos de vida após os ataques.
6. Utilize o método `explorarIlha()` da chalupa.
7. Utilize o método `repararNavio()` do galeão e verifique a recuperação dos pontos de vida.
8. Crie uma coleção do tipo `Navio[]` contendo os diferentes tipos de navios.
9. Percorra essa coleção utilizando um laço de repetição e invoque os métodos comuns. Observe como o comportamento muda de acordo com o tipo de cada objeto.
10. Teste situações inválidas, como aplicar dano negativo ou tentar ultrapassar a vida máxima, garantindo que as regras de encapsulamento sejam respeitadas.

Organize o código em arquivos separados, mantendo cada classe em seu próprio arquivo:

- `Navio.ts`
- `Bergantim.ts`
- `Chalupa.ts`
- `Galeao.ts`
- `Main.ts`

Utilize os conceitos de orientação a objetos para construir um sistema que represente os diferentes navios piratas e suas particularidades no Mar dos Ladrões.
