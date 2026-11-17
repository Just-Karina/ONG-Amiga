# API de Pontos de Coleta e Distribuição

API REST em Spring Boot para cadastrar e consultar pontos de coleta e distribuição de uma ONG, com carga inicial de pontos em Goiânia.

## Tecnologias

- Java + Spring Boot
- Spring Web
- Spring Data JPA
- H2 (gravando em arquivo)
- Lombok
- springdoc-openapi (Swagger)
- spring-boot-starter-validation
- Front-end: Expo e React Native (web e mobile)

## Estrutura do projeto

O projeto é dividido em duas partes:

- **back-end-api**: API REST desenvolvida com Java e Spring Boot.
- **front-end**: aplicação web/mobile desenvolvida com Expo e React Native.

## Requisitos

- Java 21
- Maven Wrapper
- Node.js e npm, para executar o front-end
- Android Studio ou Expo Go (para testar no Android)

Para testar em um celular físico, troque o endereço no arquivo `front-end/.env` (variável de ambiente `EXPO_PUBLIC_SERVIDOR_URL`) pelo IP da máquina na rede local, por exemplo `http://192.168.0.10:8080`. O back-end deve estar em execução antes de utilizar as funcionalidades que dependem da API.

## Executando o back-end

Abra um terminal na pasta do projeto e execute:

```bash
cd back-end-api
./mvnw spring-boot:run
```

No Windows (PowerShell), use `.\mvnw spring-boot:run`.

A API fica disponível em `http://localhost:8080`.

O banco H2 grava em arquivo (`./data/ongdb`), então os dados continuam salvos depois de reiniciar. A carga inicial (8 pontos em Goiânia) só é inserida se a tabela estiver vazia, por isso não duplica a cada reinício.

## Links úteis

| Recurso | URL |
|---|---|
| Swagger UI | http://localhost:8080/swagger-ui/index.html |
| Documentação OpenAPI (JSON) | http://localhost:8080/v3/api-docs |
| Console do H2 | http://localhost:8080/h2-console |

Console do H2: JDBC URL `jdbc:h2:file:./data/ongdb`, usuário `sa`, senha em branco.

## Modelo

**Ponto**

| Campo | Tipo | Observação |
|---|---|---|
| id | UUID | gerado automaticamente |
| nome | texto | obrigatório |
| endereco | texto | obrigatório |
| bairro | texto | obrigatório |
| horario | texto | obrigatório, ex.: "Seg a Sex, 8h às 17h" |
| tipo | texto | obrigatório, `coleta` ou `distribuição` |

Exemplo de corpo para POST e PUT:

```json
{
  "nome": "Ponto Central",
  "endereco": "Av. Goiás, 100",
  "bairro": "Setor Central",
  "horario": "Seg a Sex, 8h às 17h",
  "tipo": "coleta"
}
```

## Endpoints

Base: `http://localhost:8080/api/v1/pontos`

| Método | URL | Descrição | Respostas |
|---|---|---|---|
| GET | `/api/v1/pontos` | Lista todos os pontos | 200 |
| GET | `/api/v1/pontos/{id}` | Busca um ponto pelo id | 200, 404 |
| POST | `/api/v1/pontos` | Cadastra um ponto | 201, 400 |
| PUT | `/api/v1/pontos/{id}` | Atualiza um ponto | 200, 400, 404 |
| DELETE | `/api/v1/pontos/{id}` | Remove um ponto | 204, 404 |

Regras:
- `nome`, `endereco`, `bairro`, `horario` e `tipo` são obrigatórios e não podem ser vazios. Se algum faltar, a API responde 400 e nada é gravado.
- GET, PUT e DELETE com id inexistente respondem 404.
- A API devolve sempre `PontoResponseDTO`, nunca a entidade.

## Prints do Swagger

### GET /api/v1/pontos (200)

![GET lista](prints/get-lista-200.png)

### GET /api/v1/pontos/{id} (200)

![GET por id](prints/get-id-200.png)

### GET /api/v1/pontos/{id} com id inexistente (404)

![GET por id 404](prints/get-id-404.png)

### POST /api/v1/pontos (201)

![POST 201](prints/post-201.png)

### POST /api/v1/pontos com campo vazio (400)

![POST 400](prints/post-400.png)

### PUT /api/v1/pontos/{id} (200)

![PUT 200](prints/put-200.png)

### PUT /api/v1/pontos/{id} com id inexistente (404)

![PUT 404](prints/put-404.png)

### DELETE /api/v1/pontos/{id} (204)

![DELETE 204](prints/delete-204.png)

## Executando o front-end

Em outro terminal, com o back-end já em execução:

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

O endereço da API é definido na variável `EXPO_PUBLIC_SERVIDOR_URL` do arquivo `front-end/.env`. O CORS da API está liberado (`@CrossOrigin`) para permitir esse acesso.
