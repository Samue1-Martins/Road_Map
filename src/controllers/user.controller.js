import { User } from "../models/user.models.js";
import { ERROR, SUCCESS } from "../shared/messages.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const emailAlreadyExist = await User.findOne({ where: { email } });

        if (emailAlreadyExist) {
            return res.status(400).json({ error: `Email ${ERROR.ALREADY_EXIST}` });
        };

        const SALT_ROUNDS = 10
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        });

        return res.status(201).json({
            message: `Usuário ${SUCCESS.CREATED}`
        });

    } catch (error) {
        console.error('[ERRO] createUser:', error)
        return res.status(500).json({ message: 'Erro interno no servidor:', error });
    };
};


export const controlLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(401).json({ error: 'Email ou senha incorretas' })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).json({ error: 'Email ou senha incorreta' })
        }

        const SECRET_KEY = process.env.JWT_SECRET

        const token = jwt.sign(
            { id: user.id },
            SECRET_KEY,
            { expiresIn: '1h' })

        const userResponse = user.toJSON();
        delete userResponse.password;

        return res.status(200).json(
            {
                token,
                user: userResponse
            });

    } catch (error) {
        console.error('[ERRO] controlLoginUser:', error);
        return res.status(500).json({ error: 'Erro ao fazer login' });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });

        if (!users) {
            return res.status(404).json({ message: 'Não há usuários cadastrados.' })
        }

        return res.status(200).json(users);
    }
    catch (error) {
        console.log('ERRO getRoadMaps:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error('[ERRO] getUserById:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: `Usuário ${ERROR.NOT_FOUND}` });
        };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        await user.update(updateData);

        const userResponse = user.toJSON();
        delete userResponse.password;

        return res.json({
            message: 'Usuário atualizado com sucesso',
            user: userResponse
        });

    } catch (error) {
        console.error('[ERRO] updatePassword:', error);
        return res.status(500).json({ message: 'Erro no serivdor:', error });
    };
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res
                .status(404)
                .json({ message: `Usuário ${ERROR.NOT_FOUND}` })
        };

        await user.destroy();
        return res.json({ message: `Usuário ${SUCCESS.DELETED}` });

    } catch (error) {
        console.error('[ERRO] deletedRoadMap', error)
        return res.status(500).json({ message: 'Erro interno no serivdor:', error })
    }
};