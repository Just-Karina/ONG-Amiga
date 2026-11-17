# ONG-Amiga

O projeto é dividido em duas partes:

- **back-end-api**: API REST desenvolvida com Java e Spring Boot.
- **front-end**: aplicação web/mobile desenvolvida com Expo e React Native.

## Requisitos

- Java 21
- Maven Wrapper
- Node.js e npm, para executar o front-end
- Android Studio/Expo Go (para testar no Android)

Para testar em um celular físico, troque o endereço no arquivo
`front-end/.env` (variável de ambiente `EXPO_PUBLIC_SERVIDOR_URL`) pelo IP da
máquina na rede local, por exemplo `http://192.168.0.10:8080`. O back-end deve
estar em execução antes de utilizar as funcionalidades que dependem da API.

## Executando o back-end

Abra um terminal na pasta do projeto e execute:

```bash
cd back-end-api
.\mvnw spring-boot:run
```

A API fica disponível em:

```text
http://localhost:8080
```

O banco H2 é persistido em arquivo em `back-end-api/data/ongdb.mv.db`. A carga
inicial (30 pontos em Goiânia) insere apenas os pontos que ainda não existem
(verificação pelo nome), então não duplica a cada reinício.

## Swagger

Documentação interativa:

- [Swagger UI](http://localhost:8080/swagger-ui/index.html)
- [OpenAPI JSON](http://localhost:8080/v3/api-docs)

![Swagger com os endpoints da API](./.docs/swagger-endpoints.png)

## Endpoints

Todos os endpoints usam o prefixo `/api/v1/pontos`.

| Método | URL | Resposta esperada |
|---|---|---|
| GET | `/api/v1/pontos` | `200 OK` com a lista de pontos |
| GET | `/api/v1/pontos/filtro?filtro=&page=0&size=10` | `200 OK` com uma página de pontos (`content` + `page`) |
| GET | `/api/v1/pontos/{id}` | `200 OK` com um ponto, ou `404 Not Found` |
| POST | `/api/v1/pontos` | `201 Created` com o ponto criado, ou `400 Bad Request` |
| PUT | `/api/v1/pontos/{id}` | `200 OK` com o ponto atualizado, `400 Bad Request` ou `404 Not Found` |
| DELETE | `/api/v1/pontos/{id}` | `204 No Content`, ou `404 Not Found` |

### Exemplo de requisição

O campo `tipo` aceita `coleta` ou `distribuição`.

```json
{
  "nome": "Ponto Central",
  "endereco": "Av. Goiás, 100",
  "bairro": "Setor Central",
  "horario": "Seg a Sex, 8h às 17h",
  "tipo": "coleta"
}
```

### Respostas documentadas

#### POST /api/v1/pontos com campos vazios

![Swagger com o corpo da requisição POST com campos vazios](./.docs/swagger-post-requisicao.png)

#### Erro de validação — 400 Bad Request

Ocorre quando `nome`, `endereco`, `bairro`, `horario` ou `tipo` estão vazios no
POST ou no PUT. Nada é gravado no banco.

![Swagger retornando 400 para um ponto inválido](./.docs/swagger-400.png)

```json
{
  "status": 400,
  "erro": "Dados inválidos",
  "campos": {
    "tipo": "tipo é obrigatório",
    "horario": "horario é obrigatório",
    "endereco": "endereco é obrigatório",
    "bairro": "bairro é obrigatório",
    "nome": "nome é obrigatório"
  }
}
```

#### Ponto inexistente — 404 Not Found

Ocorre no GET, PUT ou DELETE de um UUID que não existe.

![Swagger retornando 404 para um ponto inexistente](./.docs/swagger-404.png)

```json
{
  "status": 404,
  "erro": "Ponto não encontrado: f0d24902-54e8-4825-a824-7236d9491dfe"
}
```

## Busca paginada

```text
GET /api/v1/pontos/filtro?filtro=...&page=0&size=10&sort=nome,asc
```

Devolve uma página de pontos, no mesmo formato do filtro de produtos da
Compre Bem.

| Parâmetro | Descrição |
|---|---|
| `filtro` | Texto procurado no **nome** ou no **bairro**, sem diferenciar maiúsculas de minúsculas. Sem ele, devolve todos os pontos. |
| `page` | Número da página, começando em `0`. |
| `size` | Quantidade de itens por página. Padrão: `10`. |
| `sort` | Ordenação no formato `campo,direção`. Padrão: `nome`. Exemplo: `sort=bairro,asc`. |

A resposta usa o formato `content` + `page`
(`spring.data.web.pageable.serialization-mode=via_dto`):

- `content`: os pontos da página (`PontoResponseDTO`).
- `page.size`: itens por página.
- `page.number`: número da página atual (começa em 0).
- `page.totalElements`: total de pontos encontrados.
- `page.totalPages`: total de páginas.

> Nos exemplos abaixo, os `id` são UUIDs gerados pelo banco e os itens
> omitidos aparecem como `...`.

### 1. Sem filtro

Devolve todos os pontos, 10 por página, ordenados por nome.

```bash
curl "http://localhost:8080/api/v1/pontos/filtro"
```

```json
{
  "content": [
    {
      "id": "9a1f3c52-7b0e-4c1a-8d55-1e2f7a6b9c01",
      "nome": "Ponto Aeroporto",
      "endereco": "Rua 15, 300",
      "bairro": "Setor Aeroporto",
      "horario": "Seg a Sex, 8h às 17h",
      "tipo": "coleta"
    },
    {
      "id": "c4d2e8a1-0f63-4b7d-9a12-3b5c8e7f2d02",
      "nome": "Ponto Alto da Glória",
      "endereco": "Rua Pires de Campos, 45",
      "bairro": "Alto da Glória",
      "horario": "Seg a Sáb, 9h às 17h",
      "tipo": "distribuição"
    },
    ...
  ],
  "page": {
    "size": 10,
    "number": 0,
    "totalElements": 30,
    "totalPages": 3
  }
}
```

### 2. Filtrando por bairro

Busca `campinas` (maiúsculas não importam) no nome ou no bairro.

```bash
curl "http://localhost:8080/api/v1/pontos/filtro?filtro=CAMPINAS"
```

```json
{
  "content": [
    {
      "id": "5e7b9d03-2a4c-4f18-b6d9-0c1a3e5f7b05",
      "nome": "Ponto Campinas",
      "endereco": "Av. Anhanguera, 3000",
      "bairro": "Campinas",
      "horario": "Seg a Sex, 8h às 17h",
      "tipo": "coleta"
    }
  ],
  "page": {
    "size": 10,
    "number": 0,
    "totalElements": 1,
    "totalPages": 1
  }
}
```

### 3. Pedindo a segunda página

`page=1` devolve os itens 11 a 20.

```bash
curl "http://localhost:8080/api/v1/pontos/filtro?page=1&size=10"
```

```json
{
  "content": [
    {
      "id": "e1a8c6b4-9d27-4e30-a5f1-7b3d9c2e4a11",
      "nome": "Ponto Funcionários",
      "endereco": "Rua 26, 140",
      "bairro": "Setor dos Funcionários",
      "horario": "Seg a Sex, 8h às 17h",
      "tipo": "distribuição"
    },
    {
      "id": "2f6d4b8a-1c93-4a57-8e0b-5d7f1a3c9e12",
      "nome": "Ponto Jardim América",
      "endereco": "Av. América, 600",
      "bairro": "Jardim América",
      "horario": "Seg a Sáb, 8h às 18h",
      "tipo": "coleta"
    },
    ...
  ],
  "page": {
    "size": 10,
    "number": 1,
    "totalElements": 30,
    "totalPages": 3
  }
}
```

### Trocando a ordenação

```bash
curl "http://localhost:8080/api/v1/pontos/filtro?sort=bairro,asc"
```

## Tecnologias e organização

- Spring Web MVC
- Spring Data JPA
- H2 em arquivo
- Lombok
- Bean Validation
- springdoc OpenAPI / Swagger
- Pacotes `entity`, `repository`, `service`, `controller`, `dto` e `config`

O CORS está liberado para permitir o consumo da API pelo front-end.

## Executando o front-end

Em outro terminal:

```bash
cd front-end
npm install
npm start
```

Depois, escolha uma das opções exibidas pelo Expo:

- `w`: executar no navegador
- `a`: executar no Android
- escanear o QR Code pelo aplicativo Expo Go

Também é possível executar diretamente no navegador:

```bash
npm run web
```

Ou no Android:

```bash
npm run android
```

O front-end está configurado para acessar a API em:

```text
http://localhost:8080
```