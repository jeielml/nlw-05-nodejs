import { Request, Response } from "express"
import { MessagesServices } from "../services/MessagesServices";

class MessagesController {
    async create(request: Request, response: Response): Promise<Response> {
        const { admin_id, user_id, text} = request.body

        const service = new MessagesServices()
     
        try {
            const settings =  await service.create({admin_id, user_id, text})

            return response.json(settings)
        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }    
    }

    async showByUser(request: Request, response: Response) {
        const { id } = request.params
        const service = new MessagesServices()
        const list = await service.listByUser(id)
        return response.json(list)
    }
}

export { MessagesController }