import cors from 'cors'
import express from 'express';
import sequelize from './config/sequelize.js';
import { routes } from './routes/index.routes.js';

import './models/associations.js';

const app = express();
const port = process.env.PORT || 7000;
let server;

app.use(express.json());
app.use(cors());
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
})
app.use(routes);

async function inicializeServer() {
    try {

        if (!process.env.JWT_SECRET) {
            console.error('[INICIALIZER SERVER] ERRO FATAL: A variável JWT_SECRET não está definida no arquivo .env!');
            process.exit(1);
        }

        console.log('[SERVER] Tentando conectar ao banco de dados.')

        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida.')

        await sequelize.sync({ force: true });
        console.log('Sincronização com o banco de dados realizada.')

        server = app.listen(port, () => {
            console.log(`Servidor rodando na porta http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Conexão com o banco de dados mal sucedida:', error);
        process.exit(1);
    };
}

function gracefulShutdown(signal) {
    console.log('\n[SERVER] Sinal ${signal} recebido. Iniciando encerramento.')

    const timeout = setTimeout(() => {
        console.error('O encerramento está demorando muito. Forçando parada.')
        process.exit(1);
    }, 10000)

    if (server) {
        server.close(async () => {
            console.log('[SERVER] Servidor HTTP fechado. Fechando conexão com o banco de dados.')
            try {
                await sequelize.close();
                console.log('Conexão com o banco de dados encerrada.')
                clearTimeout(timeout);
                process.exit(0)
            } catch (dbError) {
                console.error('Erro ao fechar conexão com o banco:', dbError);
                process.exit(1);
            }
        })
    } else {
        process.exit(0)
    }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

inicializeServer();