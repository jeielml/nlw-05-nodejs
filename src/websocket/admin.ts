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
})