# Sales api - em finalização

Projeto elaborado com o intuito de por em prática minhas habilidades

## Dependencies

Para rodar o projeto, execute o script npm install ou yarn para instalar as dependências :

- Node.js;
- Express;
- Typescript;
- ESLint;
- Prettier;
- Celebrate;
- Multer;
- CORS;
- JWT;
- BCrypt;
- Nodemailer;
- Handlebars;
- Postgres;
- Redis;
- TypeORM;
- Docker;

## Running

Execute o comando abaixo em seu terminal:

```
 docker-compose up
```

## ormconfig example - altere conforme as necessidades :

```
[
  {
    "type": "postgres",
    "host": "db",
    "port": 5432,
    "username": "postgres",
    "password": "salesapi",
    "database": "salesapi",
    "entities": ["./src/modules/entities/*.ts"],
    "migrations": ["./src/shared/database/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/shared/database/migrations/"
    }
  }
]


```

## .env config :

```
API_PORT=3333
APPWEB_URL=http://localhost:3333
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASS=

# Mail config: ethereal(development) or ses(production)
MAIL_DRIVER=ses

# AWS CREDENTIALS

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

#Storage Config: disk or s3

STORAGE_DRIVER=disk

```

## Endpoints

- Docs - `/api-docs`
- Products - `/products`
- Users - `/users`
- Sessions - `/sessions`
- Forgot Password - `/password/forgot`
- Reset Password - `/password/reset`
- Profile - `/profile`

## Features

- [x] Docker
- [x] Postgres
- [x] TypeORM
- [x] Authentication
- [x] User password management
- [x] Redis
