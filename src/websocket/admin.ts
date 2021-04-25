import { io } from "../http";
import { ConnectionsServices } from "../services/ConnectionsServices";

io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsServices() 

    const allConnecntionsWithoutAdmin = await connectionsService.findAllWithoutAdmin()

    console.log(allConnecntionsWithoutAdmin)
    io.emit("admin_list_all_users", allConnecntionsWithoutAdmin)

})