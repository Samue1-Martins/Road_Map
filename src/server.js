import express from 'express';
import sequelize from './config/sequelize.js';
import User from './models/user.models.js';

const app = express();
const port = process.env.PORT || 7000;

sequelize.authenticate()
    .then(() =>{
        console.log('Conexão com o banco de dados realizada.')
        return sequelize.sync();
    })
    .catch(error => {
        console.error('Conexão com o banco de dados mal sucedida:', error)
    });

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})