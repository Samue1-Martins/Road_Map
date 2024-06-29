import { User } from "../../models/user.models.js";

export class UserService {
    async createUserService(name, email, password) {
        try {
            await User.sync();
            const userAlreadyExist = await User.findOne({
                where: {
                    name,
                    email
                }
            });
            
            // if (userAlreadyExist) {
            //     return `Usuario ${ERROR.ALREADY_EXIST}`
            // }

            if (userAlreadyExist) {
                return res
                .status(400)
                .json({error: `${ERROR.ALREADY_EXIST}` }) 
            }

            const newUser = await User.create({
                name, email, password
            });
            return newUser;
        } catch (error) {
            return error
        }
    }
    async getAllUserService() {
        return await User.findAll();
    }
}

