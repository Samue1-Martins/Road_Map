import { User } from "../models/user.models.js";
import { ERROR, SUCCESS } from "../shared/messages.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
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
        const newUser = await User.create(req.body);
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

export { createUser, getAllUser, getUserByName, updatePassword, deleteUser }