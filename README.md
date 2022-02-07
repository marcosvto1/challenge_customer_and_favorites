# Desafio Wishlist Luizalabs

### Requisitos
1. Docker instalado
2. (Opcional) Insomnia 
   1.  https://insomnia.rest/download


## Etapas para executar este projeto:

1. Clonar o projeto
1. Executar `npm i` 
2. Executar `docker-compose up` para subir o banco de dados
3. Executar `npm run dev`
3. em outra aba no terminal podemos rodar os teste `npm run test`

## Testes

Observação: não foi realizada cobertura  de teste para todo projeto

## API

Caso deseja usar uma collection já com todas as requisições, basta importa collection para o insomnia 

local:  `docs/wishlist_collection_insomina`

### Login

Requisição **POST**

`http://localhost:3001/api/auth`

payload JSON:

```json
{
	"email": "admin@admin.com",
	"password": "admin"
}
```

Retorno Exemplo:

​	`{accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJhZG1pbmlzdHJhZG9yIiwiZW1haWwiOiJhZG1pbkBhZG1pbi"}`

### Customers

Para todo requisição de customers será necessário passar token de acesso via headers

Exemplo:

`x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJhZG1pbmlzdHJhZG9yIiwiZW1haWwiOiJhZG1pbkBhZG1pbi  `

| Ação                          | **URL**                                 | **VERBO**  |
| ----------------------------- | --------------------------------------- | ---------- |
| **A1:** Criar um novo cliente | http://localhost:3001/api/customers     | **POST**   |
| **A2:** Listar um cliente     | http://localhost:3001/api/customers/:id | **GET**    |
| **A3**: Remover um cliente    | http://localhost:3001/api/customers/:id | **DELETE** |
| **A4:** Atualizar um cliente  | http://localhost:3001/api/customers/:id | **PUT**    |

Para as ações de **A1** e **A4** é necessário enviar o seguinte payload listado abaixo:

```json
{
 	"name": "Informe aqui nome do cliente",
	"email": "Informe aqui email do cleinte"
}
```

### Wishlist

Para todo requisição de wishlist será necessário passar token de acesso via headers

| Ação                                               | URL                                              | VERBO    |
| -------------------------------------------------- | ------------------------------------------------ | -------- |
| **A1:** Adicionar Produto na lista de desejo       | http://localhost:3001/api/customers/:id/wishlist | **POST** |
| **A2:** Lista todas os produtos da lista de desejo | http://localhost:3001/api/customers/:id/wishlist | **GET**  |



Para a ação  **A1**: enviar como payload o seguinte item:

```json
{
	"productId": "349c98ae-1748-70a1-2b20-ee65b7cdde2c" 
}
```

