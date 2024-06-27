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
            
            if (userAlreadyExist) {
                return `Usuario ${ERRORS.ALREADY_EXIST}`
            }

            const newUser = await UserService.create({
                name, email, password
            });
            return newUser;;
        } catch (error) {
            return error
        }
    }
    async getAllUserService() {
        return await UserService.findAll();
    }
}

