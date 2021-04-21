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


