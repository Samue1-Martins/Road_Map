# Road Maps

 Introdução ao Projeto: API de Cadastro de Usuários e Criação de Roteiros para Vídeos <br><br>
Visão Geral <br><br>
Este projeto é uma API desenvolvida com Node.js, Express e Sequelize, destinada a fornecer funcionalidades de gerenciamento de usuários e criação de roteiros para vídeos.<br><br>
A API permite que os usuários se cadastrem, façam login e, uma vez autenticados, possam criar, visualizar, editar e excluir roteiros detalhados para seus vídeos. <br>
Este sistema é ideal para criadores de conteúdo que desejam organizar suas ideias e estruturas de vídeo de maneira eficaz.

Tecnologias Utilizadas




  
## Tecnologias utilizadas

  - Node.js: Ambiente de execução JavaScript no lado do servidor. <br>
  - Express: Framework para Node.js que facilita a criação de aplicações web e APIs.<br>
  - PostgreSQL: Sistema de gerenciamento de banco de dados relacional robusto e escalável. <br>
  - Sequelize: ORM (Object-Relational Mapping) que simplifica as interações com o banco de dados PostgreSQL. <br>
  - bcrypt: Biblioteca para criptografar senhas antes de armazená-las no banco de dados.
  
## Funcionalidades
Cadastro de Usuários:<br>

Endpoint para registrar novos usuários no sistema.<br>
- Criptografia de senhas para garantir a segurança.

Gerenciamento de Roteiros:<br>
- Endpoints para criação, visualização, edição e exclusão de roteiros de vídeos.<br>
- Cada usuário pode criar múltiplos roteiros.<br>
- Os roteiros contêm detalhes estruturados, como títulos, cenas e descrições.<br><br>

## Rodando Projeto localmente

Clone o projeto

```bash
  git clone https://github.com/Samue1-Martins/Road_Map.git
```

Entre na pasta diretório do projeto

```bash
  cd Road_Map
```

Instale todas as dependências

```bash
npm install
```

Tenha o postgress instalado e crie um banco de dados no Postgress com o mesmo nome roadmap

```bash
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

const dbName = 'nome_do_banco_de_dados'; //roadmap//

sequelize.query(`CREATE DATABASE ${dbName};`)
  .then(() => {
    console.log(`Banco de dados ${dbName} criado com sucesso.`);
  })
  .catch(err => {
    console.error(`Erro ao criar o banco de dados: ${err}`);
  })
  .finally(() => {
    sequelize.close();
  });
```

Inicie a API

```bash
  npm run dev
```
Configure o novo banco de dados ao projeto 

```bash
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nome_do_banco_de_dados', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

export default sequelize;
```

Escolha as rotas e faça os cadastros como preferir.
