## Descrição
Repositório referente ao projeto Brain Agriculture.
Todo o projeto pode ser executado localmente utilizando Docker + Docker Compose.

Optei por utilizar conceitos de Arquitetura Limpa e DDD, como desenvolvimento orientado a entidades e regras de negócio bem definidas. O projeto segue firmemente o conceito de modularização.

Toda a validação de documentos é feita com bibliotecas testadas, evitando lógicas manuais. As exceções seguem o padrão do NestJS, lançando HTTP exceptions específicas e mapeadas para cada caso de erro.

Cada módulo é responsável por suas funcionalidades e é isolado dos demais. Deseja adicionar uma nova funcionalidade em producer? Você só precisa alterar o próprio módulo de producer.

## Importante

A descrição do desafio era um pouco ambígua.
O que deu a entender foi que seria necessário um único endpoint com o seguinte JSON:

```json
CPF ou CNPJ
Nome do produtor
Nome da fazenda (propriedade)
Cidade
Estado
Área total da fazenda (em hectares)
Área agricultável (em hectares)
Área de vegetação (em hectares)
Safras (ex: Safra 2021, Safra 2022)
Culturas plantadas (ex.: Soja na Safra 2021, Milho na Safra 2021, Café na Safra 2022)
```

No entanto, optei por uma abordagem modularizada.

### Estrutura modular

Dividi o projeto em módulos (`producer`, `farm`, etc) com seus próprios casos de uso, entidades e controllers. Essa decisão foi tomada para:

- Garantir uma separação clara de responsabilidades.
- Facilitar a manutenção e a escalabilidade do projeto.
- Aumentar a coesão interna e diminuir o acoplamento entre funcionalidades.

Com essa estrutura, o projeto é totalmente escalável. Como dito anteriormente, se você deseja adicionar a funcionalidade "X" no módulo "Y", os demais módulos não precisam saber da implementação.

## Estrutura de Pastas dos Módulos

```
└── NomeDoMódulo
    └── application
        └── entities
        └── use-cases
        └── interfaces
    └── infra
        └── database
            └── repositories
        └── http
            └── controllers
            └── viewModels
        └── adapters
            └── dtos
            └── mappers
    └── tests
        └── e2e
        └── inMemoryRepository
        └── unit
        └── mockData
```

**Todas as funcionalidades foram separadas em suas respectivas issues e branches, de forma organizada.**

![alt text](image-2.png)

## Demais Funcionalidades implementadas:

- 1 - **Swagger** - Integração com swagger para documentação da api e rotas.
- 2 - **Docker** - Integração com docker rodando em ambiente local
- 3 - **PostgreSQL** - Utilização do banco de dados postgresql
- 4 - **ORM** - Utilização do ORM prisma
- 5 - **Testes** - Criação de testes automatizados (unitario)
- 6 - **Dados Mockados** - Uso de dados mockados para os testes.

  Além dos casos de uso:
    - 1 - **Criar** producer.
    - 2 - **Deletar** producer.
    - 3 - **Atualizar** producer.
    - 4 - **Criar** propriedade rural.
    - 5 - **Criar** safra para a propriedade rural.
    - 6 - **Criar** criar cultura plantavel para a safra.
    - 7 - **Buscar** estatisticas para o dashboard.
    - 8 - **Atualizar** propriedade rural.
    - 9 - **Atualizar** safra
    - 11 - **Remover** cultura plantavel da safra
    - 12 - **Remover** a propriedade rural do produtor.
    - 13 - **Remover** a safra da propriedade rural.

## Tabelas planejadas no miro e implementadas:
Todas as tabelas no miro, foram implementadas via schema do prisma e com devido historico de migrations.

![alt text](image.png)

## Fluxo de regras de negocios e casos de uso que planejei no miro:
Fluxo que planei no miro, para ser implementado

![alt text](image-1.png)

## Setup do projeto

Execute o seguinte comando para instalar as dependências:

```bash
$ yarn
```

## Rodando o projeto
Voce pode rodar o projeto usando o comando abaixo, além disso se certifica de criar o arquivo '.env.dev' e '.env' ambos contendo a url do banco nesse formato: DATABASE_URL="postgresql://postgres:user@db:senha/brain-agriculture"

```bash
$ yarn dev
```

[Screencast from 2025-05-28 19-04-09.webm](https://github.com/user-attachments/assets/e597660f-9aa2-41c3-ab56-4034e4cd8d35)

## Doumentação da api - Swagger
Realizei a documentação da api toda no swagger, cada rota é seus dados estão mapeados lá, caso necessario use o 4dev, para gerar dados validos.
A rota de acesso é 'http://localhost:5000/api'

[Screencast from 2025-05-28 19-07-47.webm](https://github.com/user-attachments/assets/5a63e02b-5c8d-408e-b0f5-4fd731930cc4)

## Rodando os testes automatizados
Fiz a criação dos testes automatizados, Unitarios, pois acho que são a base, com eles consegui cobrir 100% dos casos de uso(que são as regras de negocio)

```bash
$ yarn test:unit
```
[Screencast from 2025-05-29 10-17-51.webm](https://github.com/user-attachments/assets/27f8fe63-129c-434f-b9ca-688b6ba69660)


## Miro

Antes de escrever qualquer linha de código, parei para planejar a aplicação no Miro, ferramenta que costumo usar para estruturar funcionalidades e fluxos de forma visual.

O link pode ser encontrado aqui: [Miro](https://miro.com/welcomeonboard/UTJlK0NlOE4vUWtyTTl6NmFIaVdmb0djY3gyUllrMW9SQzhBVkdZemhsZWs4T0o1QXRkMzdndEhnNnVTYmhqZTV6ckJ3eW9HNUxYU0ZWL3ZneFhBd2xMbWY1OXI3SFkwS253YlF4VDZtN0NTblN3cHpiMUxDZzhzRmVjbFd4YldyVmtkMG5hNDA3dVlncnBvRVB2ZXBnPT0hdjE=?share_link_id=258833236902)

## Autor do projeto

- Author - [Marcos Oliveira](https://www.linkedin.com/in/marcos-oliveiraaa/)
