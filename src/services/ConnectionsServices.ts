import { getCustomRepository } from "typeorm"
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"


interface IConnectionCreate {
    socket_id: string,
    user_id: string,
    admin_id?: string,
    id?: string
}


class ConnectionsServices {

    private connectionsRepository: ConnectionsRepository

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository)
    }

    async create({socket_id, user_id, admin_id, id} : IConnectionCreate) {

        const connection = this.connectionsRepository.create({
            socket_id, 
            user_id, 
            admin_id, 
            id
        })
    
        await this.connectionsRepository.save(connection)

        return connection
    }

    // async listByUser(user_id: string) {
    //     const list = await this.connectionsRepository.find({
    //         where: {user_id},
    //         relations: ["user"]
    //     })

    //     return list
    // }
    
}

export { ConnectionsServices }
