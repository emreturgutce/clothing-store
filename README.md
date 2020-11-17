![Deploy](https://github.com/emreturgutce/clothing-store/workflows/Deploy%20Workflow/badge.svg) [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs) [![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde)

## Clothing Store

Clothing Store is an open-source GraphQL API that can handle user registrations, payments, orders. I built this API using Node.js, TypeGraphQL ,TypeORM. You can access it here: (you are not going to see anything fancy it is just an API but you can send some requests as shown in the [GraphQL API section](#GraphQL-API) down below) [https://clothing-store-app.herokuapp.com/](https://clothing-store-app.herokuapp.com/)

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

### GraphQL API

#### Get Hello World Message For Testing

##### Request

```api
  POST /graphql
```

```bash
  curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{ \"query\": \"{ hello }\"}' \
    https://clothing-store-app.herokuapp.com/graphql
```

##### Response

```
  HTTP/1.1 200 OK
  Date: Tue, 17 Nov 2020 14:03:40 GMT
  Status: 200 OK
  Connection: keep-alive
  Content-Type: application/json
  Content-Length: 2

  {
    "data": {
      "hello": "hello world"
    }
  }
```

#### Register User

##### Request

```api
  POST /graphql
```

```bash
  curl \
    -i \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{ \"query\": \"mutation registerUser($data: RegisterInput)
            register(data: $data) {
              id
              email
            }
          \",
          \"variables\": {
            \"data\": {
              \"email\": \"test123@mail.com\",
              \"password\": \"123456\"
            }
          }
        }' \
    https://clothing-store-app.herokuapp.com/graphql
```

##### Response

```
  HTTP/1.1 200 OK
  Date: Tue, 17 Nov 2020 14:03:40 GMT
  Status: 200 OK
  Connection: keep-alive
  Content-Type: application/json
  Content-Length: 2

  {
    "data": {
      "register": {
        "id": "bb329677-24a0-4157-b2af-ae47efca7dc3",
        "email": "test123@mail.com"
      }
    }
  }
```
