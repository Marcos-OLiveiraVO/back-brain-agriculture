## Description
Repository for the Brain Agriculture project.
The entire project can be run locally using Docker + Docker Compose.

I chose to use Clean Architecture and DDD principles, such as entity-driven development and well-defined business rules. The project follows a strong modular structure.

All document validations are handled using well-tested libraries, avoiding manual logic. Exceptions follow the NestJS standard, throwing specific and mapped HTTP exceptions for each error case.

Each module is responsible for its own functionality and is isolated from the others. Want to add a new feature in producer? You only need to modify the producer module.
## Important

The challenge description was somewhat ambiguous.
What it seemed to ask for was a single endpoint with a JSON like this:

```json
CPF or CNPJ
Producer name
Farm name (property)
City
State
Total farm area (in hectares)
Farmable area (in hectares)
Vegetation area (in hectares)
Harvests (e.g., 2021 Harvest, 2022 Harvest)
Crops planted (e.g., Soybeans in 2021, Corn in 2021, Coffee in 2022)
```

However, I chose a modular approach.

### Modular structure

The project is divided into modules (producer, farm, etc.) with their own use cases, entities, and controllers. This decision was made to:

- Ensure clear separation of concerns.
- Make the project easier to maintain and scale.
- Increase internal cohesion and reduce coupling between features.

With this structure, the project is fully scalable. As mentioned earlier, if you want to add feature "X" to module "Y", the other modules don't need to know about it.

## Module Folder Structure

```
└── ModuleName
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

**All features were separated into their respective issues and branches in an organized way.**

![alt text](image-2.png)

## Other Features Implemented:

- 1 - Swagger – Full API documentation with Swagger.
- 2 - Docker – Docker integration running locally.
- 3 - PostgreSQL – PostgreSQL as the database.
- 4 - ORM – Prisma as the ORM.
- 5 - Tests – Automated unit tests.
- 6 - Mock Data – Usage of mocked data for testing.

Use Cases:

- Create producer
- Delete producer
- Update producer
- Create farm
- Create harvest for the farm
- Create crop for a harvest
- Fetch dashboard statistics
- Update farm
- Update harvest
- Remove crop from harvest
- Remove farm from producer
- Remove harvest from farm

## Tables Planned and Implemented:
All tables were planned in Miro and implemented using Prisma schema, with proper migration history.

![alt text](image.png)

## Planned Business Rules and Use Cases in Miro:
Flowcharts and rules planned visually in Miro before implementation.

![alt text](image-1.png)

## Project setup

Run the following command to install dependencies:

```bash
$ yarn
```

The project use:
- **Node.js** - v22.14.0 
- **Yarn** - v1.22.22


## Running the project:
You can run the project with the command below. Make sure to create the **.env.dev** and **.env** files containing the database URL in this format:


```DATABASE_URL="postgresql://postgres:user@db:senha/brain-agriculture"```

Make sure the credentials match those in the **docker-compose.dev.yml**.
To avoid confusion, I included the **.env.dev** file in version control.

```bash
$ yarn dev
```

Once Docker and the database are running, you’ll probably need to run the migrations to create the tables:

```bash
$ yarn db:migrate
```

[Screencast from 2025-05-28 19-04-09.webm](https://github.com/user-attachments/assets/e597660f-9aa2-41c3-ab56-4034e4cd8d35)

## Api documentation - Swagger
Full API documentation is available via Swagger. Every route and its expected data is mapped there.
Use tools like 4devs to generate valid data if needed.

Access it at: **http://localhost:5000/api**

[Screencast from 2025-05-28 19-07-47.webm](https://github.com/user-attachments/assets/5a63e02b-5c8d-408e-b0f5-4fd731930cc4)

## Running automated testes:
Unit tests were written to cover the business rules (use cases), achieving 100% coverage of them.

```bash
$ yarn test:unit
```
[Screencast from 2025-05-29 10-17-51.webm](https://github.com/user-attachments/assets/27f8fe63-129c-434f-b9ca-688b6ba69660)


## Miro

Before writing any code, I took time to plan the application using Miro, a tool I regularly use to structure flows and features visually.

Link: [Miro](https://miro.com/welcomeonboard/UTJlK0NlOE4vUWtyTTl6NmFIaVdmb0djY3gyUllrMW9SQzhBVkdZemhsZWs4T0o1QXRkMzdndEhnNnVTYmhqZTV6ckJ3eW9HNUxYU0ZWL3ZneFhBd2xMbWY1OXI3SFkwS253YlF4VDZtN0NTblN3cHpiMUxDZzhzRmVjbFd4YldyVmtkMG5hNDA3dVlncnBvRVB2ZXBnPT0hdjE=?share_link_id=258833236902)

## Project author:

- Author - [Marcos Oliveira](https://www.linkedin.com/in/marcos-oliveiraaa/)
