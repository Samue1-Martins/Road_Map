import cors from 'cors'
import express from 'express';
import sequelize from './config/sequelize.js';
import { routes } from './routes/index.routes.js';


const app = express();
const port = process.env.PORT || 7000;

app.use(express.json())
app.use(cors())
app.use(routes);

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados realizada.')
        return sequelize.sync();
    })
    .catch(error => {
        console.error('Conexão com o banco de dados mal sucedida:', error)
    });

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})

