## Clothing Store

E-commerce app with Node.js, Express, GraphQL, TypeGraphQL, TypeORM

### Requirements

##### With Docker

If using docker you need to create a **.env.docker** file and fill it with values as specified in the **.env.example** file.

<br>

##### Without Docker

If not using docker you need to have postgres and redis running in your system. After that you need to create a **.env** file and fill it with values as specified in the **.env.example** file.

### Installation

```bash
  git clone https://github.com/emreturgutce/clothing-store.git
```

<br>

##### With Docker

```bash
  docker-compose up
```

##### Without Docker

```bash
  yarn start:dev
  // Or
  npm run start:dev
```
