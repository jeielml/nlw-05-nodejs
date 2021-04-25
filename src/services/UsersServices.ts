import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"

interface IUserCreate {
    username: string
}


class UsersServices {

    private usersRepository: UsersRepository

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository)
    }

    async create(email: string) {
     
        const userExists = await this.usersRepository.findOne({email,})

        if (userExists) {
            return userExists
        }

        const user = this.usersRepository.create({email})
    
        await this.usersRepository.save(user)

        return user
    }

    async findByEmail(email: string) {
        return await this.usersRepository.findOne({email,})
    }
    
}

export { UsersServices }
