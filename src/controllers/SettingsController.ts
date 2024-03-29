import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { SettingsServices } from "../services/SettingsServices";

class SettingsController {
    async create(request: Request, response: Response) {
        const { chat, username } = request.body

        const settingsRepository = getCustomRepository(SettingsRepository)

        const userAlreadyExists = await settingsRepository.findOne({username,})

        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }

        const settingsService = new SettingsServices()
     
        const settings =  await settingsService.create({chat, username})
    
        return response.json(settings)
    }

    async findByUserName(request: Request, response: Response) {
        const { username } = request.body
       
        const settingsService = new SettingsServices()

        const settings =  await settingsService.findByUserName(username)
      
        return response.json(settings)
    }

    async update(request: Request, response: Response) {
        const { username } = request.params
        const { chat } = request.body
       
        const settingsService = new SettingsServices()

        const settings =  await settingsService.update(username, chat)
      
        return response.json(settings)
    }
}

export { SettingsController }