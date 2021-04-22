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

    async listByUser(user_id: string) {
        const messagesRepository = getCustomRepository(MessagesRepository)

        const list = await messagesRepository.find({user_id,})
        // const list = await messagesRepository.find({
        //     where: {user_id},
        //     relations: ["user"]
        // })

        return list
    }
    
}

export { MessagesServices }
