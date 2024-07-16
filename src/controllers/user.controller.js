import { User } from "../models/user.models.js";
import { ERROR, SUCCESS } from "../shared/messages.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";


const SALT_ROUNDS = 10

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const userAlreadyExist = await User.findOne({
            where: {
                name,
                email
            }
        });
        if (userAlreadyExist) {
            return res
                .status(400)
                .json({ error: `Usuário ${ERROR.ALREADY_EXIST}` });
        };
        const newUser = await User.create({
            name, 
            email,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no servidor:', error });
    };
};

const getAllUser = async (req, res) => {
    const users = await User.findAll();
    return res.json({ users });
};

const getUserByName = async (req, res) => {
    const { name } = req.body;
    const UserFindName = await User.findOne({
        where: {
            name
        }
    });
    return res.json({ UserFindName });
}

const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { password: newPassword } = req.body;
    try {
        const user = await User.findOne({
            where: {
                id
            }
        });
        if (!user) {
            return res
                .status(404)
                .json({ message: `Usuário ${ERROR.NOT_FOUND}` });
        };
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.update({ password: hashedPassword }, {
            where: {
                id
            }
        });
        const updatedUser = await User.findByPk(id);
        return res.json({ message: `Senha atualizada com sucesso!`, user: updatedUser });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Erro no serivdor:', error });
    };
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({
        where: {
            id
        }
    });
    if (!user) {
        return res
            .status(404)
            .json({ message: `Usuário ${ERROR.NOT_FOUND}` })
    };
    await User.destroy({
        where: {
            id
        }
    });
    return res.json({ message: `Usuário ${SUCCESS.DELETED}` });
};

const controlLoginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ error: 'Senha incorreta' })
        }

        const SECRET_KEY = 'Ej{F&(;59cDq=HeU@~z7#m'
        const token = jsonwebtoken.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' })
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } })

    // Encontra o usuário pelo email

    // const user = await User.findOne({ where: { email, password } });

    // if (!user) {
    //     return res.status(404).json({ error: 'Usuário não encontrado ou senha incorreta!' });
    // }

    // res.json({ user: { id: user.id, email: user.email, name: user.name } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }

}

export { createUser, getAllUser, getUserByName, updatePassword, deleteUser, controlLoginUser }