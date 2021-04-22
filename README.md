# nlw-05-nodejs
NLW 05 - NodeJS



------------
# Aula 2

### Formas de trabalhar com Banco de dados

* porsager/postgres

* Knex: query builder - rdms driver

* Frameworks ORM > TypeORM: `http://typeorm.io`

* Sequelize: `http://sequelize.org`

#### Instalando o Type ORM

```ssh
yarn add typeorm reflect-metadata sqlite3
```

#### Criando migrations

```ssh
yarn typeorm migration:create -n CreateSettings
```
#### Rodando migrations

```ssh
yarn typeorm migration:run
```

#### Revertendo migrations

```ssh
yarn typeorm migration:revert
```


### COnfigurando db connector

* sqlite

Se usa Ubuntu, primeiramente instalar o sqlite `sudo apt install sqlite`

  * Instalar o Plugin do Sqlite com VS > Ctlr + Shift + P > Open SQLite DB

* Beekeeper studio:https://snapcraft.io/install/beekeeper-studio/ubuntu 

----

## Criando entidade

* Adicionado lib uuid
```ssh
yarn add uuid
```

* Adicionando tipagens uuid
```ssh
yarn add @types/uuid -D
```

## Criando Repositório e Fazendo a requisição

```ssh
curl --location --request POST 'localhost:3333/settings' \
--header 'Content-Type: application/json' \
--data-raw '{
    "chat":true,
    "username":"admin"
}'
```


----
Código:  `embuscadoproximonivel`


----
----

# Aula 3


- Criação do Service e tratamento de erro ao criar usuário já existente

## Criação da tabela de usuários

```ssh
yarn typeorm migration:create -n CreateUsers
```

```ssh
yarn typeorm migration:run
```

## Criação da tabela de mensagens

```ssh
yarn typeorm migration:create -n CreateMessages
```

```ssh
yarn typeorm migration:run
```

## Criando os recusos de mensagens

Para gerar o admin_id >  https://www.uuidgenerator.net/version4


----
## Requisições:

----
* Create `Settings`
```ssh
curl --location --request POST 'localhost:3333/settings' \
--header 'Content-Type: application/json' \
--data-raw '{
    "chat":true,
    "username":"admin"
}'
```
```json
{
    "id": "ff3f3467-26e3-40cd-9aef-e8556a3368e2",
    "username": "admin",
    "chat": true,
    "updated_at": "2021-04-21T18:07:31.000Z",
    "created_at": "2021-04-21T18:07:31.000Z"
}
```

* Create User
```ssh
curl --location --request POST 'localhost:3333/settings' \
--header 'Content-Type: application/json' \
--data-raw '{
    "chat":true,
    "username":"admin"
}'
```
```json
{
    "id": "ff3f3467-26e3-40cd-9aef-e8556a3368e2",
    "username": "admin",
    "chat": true,
    "updated_at": "2021-04-21T18:07:31.000Z",
    "created_at": "2021-04-21T18:07:31.000Z"
}
```

* Create message 1

```ssh
curl --location --request POST 'localhost:3333/messages' \
--header 'Content-Type: application/json' \
--data-raw '{
    "admin_id":null,
    "text": "Minha mensagem",
    "user_id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5"
}'
```
```json
{
    "id": "af23432e-6700-4a29-a743-abb109e05474",
    "admin_id": null,
    "user_id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5",
    "text": "Minha mensagem",
    "created_at": "2021-04-22T10:40:33.000Z"
}
```

* Create message 2

Para gerar o admin_id >  https://www.uuidgenerator.net/version4

```ssh
curl --location --request POST 'localhost:3333/messages' \
--header 'Content-Type: application/json' \
--data-raw '{
    "admin_id":"4ebf814f-4510-43ba-a36b-037bb1e596b1",
    "text": "Minha mensagem",
    "user_id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5"
}'
```
```json
{
    "id": "9c881d6b-e421-4f11-8ad8-492a09a04be5",
    "admin_id": "4ebf814f-4510-43ba-a36b-037bb1e596b1",
    "user_id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5",
    "text": "Minha mensagem",
    "created_at": "2021-04-22T10:46:40.000Z"
}
```

* Listando mensagens
```ssh
curl --location --request GET 'localhost:3333/messages/95ed6f2a-8dab-491e-9ab9-15dc918744d5' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"admin@admin.com"
}'
```

```json
[
    {
        "id": "af23432e-6700-4a29-a743-abb109e05474",
        "admin_id": null,
        "user_id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5",
        "text": "Minha mensagem",
        "created_at": "2021-04-22T10:40:33.000Z"
    },
    {
        "id": "9c881d6b-e421-4f11-8ad8-492a09a04be5",
        "admin_id": "4ebf814f-4510-43ba-a36b-037bb1e596b1",
        "user_id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5",
        "text": "Minha mensagem",
        "created_at": "2021-04-22T10:46:40.000Z"
    }
]
```


* Listando mensagens após inclusão do objeto usuário no payload da mensagem
```ssh
curl --location --request GET 'localhost:3333/messages/95ed6f2a-8dab-491e-9ab9-15dc918744d5' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"admin@admin.com"
}'
```

```json
[
    {
        "id": "af23432e-6700-4a29-a743-abb109e05474",
        "admin_id": null,
        "user_id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5",
        "text": "Minha mensagem",
        "created_at": "2021-04-22T10:40:33.000Z",
        "user": {
            "id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5",
            "email": "admin@admin.com",
            "created_at": "2021-04-21T18:07:34.000Z"
        }
    },
    {
        "id": "9c881d6b-e421-4f11-8ad8-492a09a04be5",
        "admin_id": "4ebf814f-4510-43ba-a36b-037bb1e596b1",
        "user_id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5",
        "text": "Minha mensagem",
        "created_at": "2021-04-22T10:46:40.000Z",
        "user": {
            "id": "95ed6f2a-8dab-491e-9ab9-15dc918744d5",
            "email": "admin@admin.com",
            "created_at": "2021-04-21T18:07:34.000Z"
        }
    }
]
```

