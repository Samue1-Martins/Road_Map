import { User } from "../models/user.models.js"
import { UserService } from "../services/user/user.service.js"
import { ERROR, SUCCESS } from "../shared/messages.js"

const instanceServiceUser = new UserService();

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = await instanceServiceUser.createUserService(name, email, password);
    return res
        .status(201)
        .json({
            message: "Novo usuário criado com sucesso!",
            newUser
        })
}

const getAllUser = async (req, res) => {
    const users = instanceServiceUser.getAllUserService();
    return res.json({ users });
}

const getUserByName = async (req, res) => {
    const { name } = req.body;
    const UserFindName = await User.findOne({
        where: {
            name
        }
    })
    return res.json({ UserFindName })
}

const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    const userAlreadyExist = await User.findOne({
        where: {
            id
        }
    })

    if (userAlreadyExist) {
        return res.json({ message: `Usuário ${ERROR.NOT_FOUND}` })
    }

    await User.update({ password: newPassword }, {
        where: {
            id
        }
    })
    const messageUpdate = await User.findByPk(id)
    return res.json({ messageUpdate })
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    await User.destroy({
        where: {
            id
        }
    })
    return res.json({
        message: `Usuário ${SUCCESS.DELETED}`
    })
}

export { createUser, getAllUser, getUserByName, updatePassword, deleteUser }