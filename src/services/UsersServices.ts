import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"

interface IUserCreate {
    username: string
}


class UsersServices {

    async create(email: string) {
        const repository = getCustomRepository(UsersRepository)
     
        const userExists = await repository.findOne({email,})

        if (userExists) {
            return userExists
        }

        const user = repository.create({email})
    
        await repository.save(user)

        return user
    }
    
}

export { UsersServices }
