![Deploy](https://github.com/emreturgutce/clothing-store/workflows/Deploy%20Workflow/badge.svg) [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs) [![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde) 

## Clothing Store

Clothing Store is an open-source GraphQL API that can handle user registrations, payments, orders. I built this API using Node.js, TypeGraphQL ,TypeORM. You can access it here: [https://clothing-store-gql.herokuapp.com/](https://clothing-store-gql.herokuapp.com/)

### Requirements

##### With Docker

If using docker you need to create a **.env.docker** file and fill it with values as specified in the **.env.example** file.


##### Without Docker

If not using docker you need to have postgres and redis running in your system. After that you need to create a **.env** file and fill it with values as specified in the **.env.example** file.

### Installation

```bash
  git clone https://github.com/emreturgutce/clothing-store.git
```

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
