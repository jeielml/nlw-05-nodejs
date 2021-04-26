import { Socket } from "socket.io";
import { http, io } from "../http";
import { ConnectionsServices } from "../services/ConnectionsServices";
import { MessagesServices } from "../services/MessagesServices";
import { UsersServices } from "../services/UsersServices";

interface IParams {
    text: string,
    email: string
}
io.on("connect", (socket) => {
    const connectionsService =  new ConnectionsServices()
    const usersServices =  new UsersServices()
    const messagesServices = new MessagesServices()

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id
        const {text , email} = params as IParams
        let user_id = null 

        const userExists = await usersServices.findByEmail(email)

        if(!userExists) {
            const user = await usersServices.create(email)
            user_id = user.id
            await connectionsService.create({
                socket_id, 
                user_id
            })
        } else {
            user_id = userExists.id
            const connection = await connectionsService.findByUserId(userExists.id)
            if(!connection){
                await connectionsService.create({
                    socket_id, 
                    user_id
                })
            } else {
                connection.socket_id = socket_id
                await connectionsService.create(connection)
            }
        }

        await messagesServices.create({
            text, 
            user_id
        })

        const allMessages = await messagesServices.listByUser(user_id)

        socket.emit("client_list_all_messages", allMessages)

        const allUsers = await connectionsService.findAllWithoutAdmin()
        io.emit("admin_list_all_users", allUsers)
    })

    socket.on("client_send_to_admin", async params => {
        const {text, socket_admin_id } = params

        const socket_id = socket.id
        const {user_id} =  await connectionsService.findBySocketId(socket_id)

        const message = await messagesServices.create({
            text,
            user_id
        })

        io.to(socket_admin_id).emit("admin_recieve_message", {
            message,
            socket_id,
        })
    })
})