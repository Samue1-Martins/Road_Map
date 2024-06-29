import cors from 'cors'
import express from 'express';
import sequelize from './config/sequelize.js';
import { User } from './models/user.models.js';
import { routes } from './routes/index.routes.js';
import { ERROR } from './shared/messages.js';

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json())
app.use(cors())
app.use(routes);

app.get('/teste', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.post('/users2', async (req, res) => {

    const { name, email } = req.body

    try {
        const userAlreadyExist = await User.findOne({
            where: {
                name,
                email
            }
        })

        if (userAlreadyExist) {
            return res.status(400).json({error: `Usuario ${ERROR.ALREADY_EXIST}` }) 
        }

        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        return error
    }

});

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

