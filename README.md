# Criar Checkout

Cria uma sessão de checkout que pode ser usada para redirecionar o usuário para a página de pagamento.

---

## 1. Endpoint

```
POST https://emot34fjb7.execute-api.us-east-1.amazonaws.com/v1/checkout
```

---

## 2. Headers obrigatórios

| Header | Tipo | Descrição |
|---|---|---|
| `x-user-id` | string | ID do usuário no Chronos Pay |
| `x-public-key` | string | Public Key do Mercado Pago |

**Exemplo**

```
x-user-id: <YOUR_USER_ID>
x-public-key: <YOUR_PUBLIC_KEY_MP>
```

---

## 3. Body da Requisição

```json
{
  "transaction_amount": "1000",
  "description": "Pedido #1042 - Plano Pro",
  "payer": {
    "first_name": "<FIRST_NAME>",
    "last_name": "<LAST_NAME>"
  }
}
```

**Campos**

| Campo | Tipo | Descrição |
|---|---|---|
| `transaction_amount` | string | Valor da transação |
| `description` | string | Descrição do pagamento |
| `payer.first_name` | string | Nome do pagador |
| `payer.last_name` | string | Sobrenome do pagador |

---

## 4. Resposta da API

```json
{
  "checkout_id": "chk_123456789"
}
```

**Campos**

| Campo | Descrição |
|---|---|
| `checkout_id` | ID da sessão de checkout |

---

## 5. Redirecionamento para o Checkout

Após receber o `checkout_id`, redirecione o usuário para a página de pagamento.

**URL do Checkout**

```
https://checkout.chronospay.ufersa.dev.br/{PUBLIC_ID}/{CHECKOUT_ID}
```

**Exemplo**

```
https://checkout.chronospay.ufersa.dev.br/your_public_id_here/chk_123456789
```

---

## 6. Exemplo em React

```tsx
import axios from "axios";
import { useEffect, useState } from "react";

const PUBLIC_ID = "your_public_id_here";

export default function CheckoutPage() {
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  useEffect(() => {
    if (checkoutId) {
      window.location.href = `https://checkout.chronospay.ufersa.dev.br/${PUBLIC_ID}/${checkoutId}`;
    }
  }, [checkoutId]);

  async function createCheckout() {
    try {
      const response = await axios.post(
        "https://emot34fjb7.execute-api.us-east-1.amazonaws.com/v1/checkout",
        {
          transaction_amount: "1000",
          description: "Pedido #1042 - Plano Pro",
          payer: {
            first_name: "<FIRST_NAME>",
            last_name: "<LAST_NAME>",
          },
        },
        {
          headers: {
            "x-user-id": "<YOUR_USER_ID>",
            "x-public-key": "<YOUR_PUBLIC_KEY_MP>",
          },
        }
      );

      setCheckoutId(response.data.checkout_id);
    } catch (error) {
      console.error("Erro ao criar checkout:", error);
    }
  }

  return (
    <button onClick={createCheckout}>
      Pagar
    </button>
  );
}
```

---

## 7. Fluxo de Integração

1. Cliente chama `createCheckout`
2. API cria uma sessão de checkout
3. API retorna `checkout_id`
4. Frontend redireciona para:
```
checkout.chronospay.ufersa.dev.br/{PUBLIC_ID}/{CHECKOUT_ID}
```
5. Usuário realiza o pagamento