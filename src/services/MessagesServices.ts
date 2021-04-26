import { getCustomRepository } from "typeorm"
import { MessagesRepository } from "../repositories/MessagesRepository"

interface IMessageCreate {
    admin_id?: string,
    user_id: string,
    text: string,
}


class MessagesServices {

    private messagesRepository: MessagesRepository

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository)
    }

    async create({ admin_id, user_id, text} : IMessageCreate) {
     
/**
 * 
        const userExists = await repository.findOne({email,})

        if (userExists) {
            return userExists
        }
 */

        const message = this.messagesRepository.create({ admin_id, user_id, text})
    
        await this.messagesRepository.save(message)

        return message
    }

    async listByUser(user_id: string) {
        // const list = await messagesRepository.find({user_id,})
        const list = await this.messagesRepository.find({
            where: {user_id},
            relations: ["user"]
        })

    }
    
}

export { MessagesServices }
