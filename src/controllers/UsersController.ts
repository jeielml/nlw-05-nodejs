import { Request, Response } from "express"
import { UsersServices } from "../services/UsersServices";

class UserController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, } = request.body

        const service = new UsersServices()
     
        try {
            const settings =  await service.create(email)

            return response.json(settings)
        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }    
    }
}

export { UserController }