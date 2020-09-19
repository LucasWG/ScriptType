import { Request, Response } from 'express'
import { RegisterUseCase } from './RegisterUseCase'

export class RegisterController {

    constructor(
        private registerUseCase: RegisterUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body

        try {
            const token = await this.registerUseCase.execute({ email, password })

            return response.status(200).json({ token })
        } catch (err) {
            return response.status(400).json({ ...err || 'Unexpected error.' })
        }
    }
}