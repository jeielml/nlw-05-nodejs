import { Connection, getCustomRepository } from "typeorm"
import { Connections } from "../entities/Connections"
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

    async findByUserId (user_id: string) {
        const connection = await this.connectionsRepository.findOne({
            where: {user_id},
            relations: ["user"]
        })

        return connection
    }

    async findAllWithoutAdmin() {
        const connections = await this.connectionsRepository.find({
            where: {admin_id: null},
            relations: ["user"]
        })

        return connections
    }

    async findBySocketId (socket_id: string) {
        const connection = await this.connectionsRepository.findOne({
            where: {socket_id},
            relations: ["user"]
        })

        return connection
    }

    async updateAdminId(user_id: any, admin_id: string) {
        await this.connectionsRepository
        .createQueryBuilder()
        .update(Connections)
        .set({ admin_id })
        .where("user_id = :user_id", {user_id})
        .execute()
    }
    
}

export { ConnectionsServices }
