import { io } from "../http";
import { ConnectionsServices } from "../services/ConnectionsServices";
import { MessagesServices } from "../services/MessagesServices";

io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsServices() 
    const  messagesService = new MessagesServices() 

    const allConnecntionsWithoutAdmin = await connectionsService.findAllWithoutAdmin()

    io.emit("admin_list_all_users", allConnecntionsWithoutAdmin)

    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const {user_id} = params
        
        const allMessages = await messagesService.listByUser(user_id)

        callback(allMessages)
    })

    socket.on("admin_send_message", async params => {
        const { user_id, text } = params

        await messagesService.create({
            admin_id: socket.id, 
            user_id, 
            text
        })

        const {socket_id} = await connectionsService.findByUserId(user_id)

        console.log("socket_id", socket_id)
        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id,
        })

    })
})