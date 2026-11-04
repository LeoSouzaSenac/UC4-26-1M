# Polimorfismo em TypeScript

## 📌 O que é Polimorfismo?

O termo **polimorfismo** significa **“muitas formas”**.
Na **Programação Orientada a Objetos (POO)**, polimorfismo é a capacidade de objetos de diferentes classes (que têm um **mesmo ancestral**) responderem de maneiras diferentes ao **mesmo método**.

👉 Ou seja, **o mesmo método** pode ter **diferentes implementações**, dependendo da classe que o chama.

---

## 📌 Exemplo 1:

```typescript
// Classe base
export class Animal {
    falar(): void {
        console.log("O animal faz um som.");
    }
}

// Subclasses sobrescrevendo o método falar
export class Cachorro extends Animal {
    falar(): void {
        console.log("O cachorro late");
    }
}

export class Gato extends Animal {
    falar(): void {
        console.log("O gato mia");
    }
}

// Testando polimorfismo
const animais: Animal[] = [new Cachorro(), new Gato(), new Animal()];

animais.forEach(animal => {
    animal.falar(); 
});
```

✅ Saída:

```
O cachorro late
O gato mia
O animal faz um som.
```

Note que o método chamado foi sempre `falar()`, mas cada classe respondeu de um jeito diferente.

---

## 📌 Exemplo 2:
```typescript
// Classe base
export class Funcionario {
    calcularSalario(): number {
        return 1000; // salário base
    }
}

// Subclasse: Desenvolvedor
export class Desenvolvedor extends Funcionario {
    calcularSalario(): number {
        return 3000; // salário específico do desenvolvedor
    }
}

// Subclasse: Gerente
export class Gerente extends Funcionario {
    calcularSalario(): number {
        return 5000; // salário específico do gerente
    }
}

// Testando polimorfismo
const funcionarios: Funcionario[] = [
    new Funcionario(),
    new Desenvolvedor(),
    new Gerente()
];

funcionarios.forEach(func => {
    console.log(`Salário: R$ ${func.calcularSalario()}`);
});
```

✅ Saída:

```
Salário: R$ 1000
Salário: R$ 3000
Salário: R$ 5000
```

---

## 📊 Comparação com e sem polimorfismo

| Sem polimorfismo                                                                | Com polimorfismo                                                 |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Precisamos de **muitos `if/else`** para verificar o tipo e decidir o que fazer. | Cada classe **sabe como se comportar** ao sobrescrever o método. |
| Código difícil de manter.                                                       | Código organizado e extensível.                                  |
| Baixa flexibilidade.                                                            | Alta flexibilidade.                                              |

---

## ✨ Vantagens do Polimorfismo

* Permite **usar o mesmo método** em diferentes classes com **comportamentos distintos**.
* Facilita a **extensão do código** (novas classes podem ser adicionadas sem mudar o código existente).
* Mantém o código **organizado e limpo**, evitando `if/else` desnecessários.

---

## 📝 Exercícios

1. Crie uma classe `Veiculo` com um método `mover()`.
   Depois crie as subclasses `Carro` e `Bicicleta`, cada uma sobrescrevendo o método para mostrar uma mensagem diferente.
   Teste criando uma lista de veículos e chamando `mover()` para todos.

2. Crie uma classe `Pagamento` com um método `processar()`.
   Depois crie `CartaoCredito` e `Boleto`, cada um implementando a lógica do pagamento de forma diferente.
   Crie um array de pagamentos e processe todos usando polimorfismo.

---

## 📌 Resumindo

* O **polimorfismo** permite que **métodos com o mesmo nome tenham comportamentos diferentes** em classes distintas.
* Em TypeScript, o polimorfismo acontece principalmente por meio de **herança e sobrescrita de métodos**.
* É um dos **4 pilares da POO**, junto com **abstração, encapsulamento e herança**.

---

👉 Use polimorfismo quando quiser trabalhar com **objetos diferentes de forma uniforme**, mas mantendo **comportamentos específicos em cada classe**.
