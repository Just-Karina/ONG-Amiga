# ONG-Alimentos

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
inicial (8 pontos em Goiânia) só é inserida quando a tabela está vazia, então
não duplica a cada reinício.

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