import { getCustomRepository } from "typeorm"
import { MessagesRepository } from "../repositories/MessagesRepository"

interface IMessageCreate {
    admin_id?: string,
    user_id: string,
    text: string,
}


class MessagesServices {

    async create({ admin_id, user_id, text} : IMessageCreate) {
        const repository = getCustomRepository(MessagesRepository)
     
/**
 * 
        const userExists = await repository.findOne({email,})

        if (userExists) {
            return userExists
        }
 */

        const message = repository.create({ admin_id, user_id, text})
    
        await repository.save(message)

        return message
    }
    
}

export { MessagesServices }
