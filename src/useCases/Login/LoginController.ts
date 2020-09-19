import { Request, Response } from 'express'
import { LoginUseCase } from './LoginUseCase'

export class LoginController {

    constructor(
        private loginUseCase: LoginUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body

        try {
            const result = await this.loginUseCase.execute({ email, password })

            return response.status(200).json(result)
        } catch (err) {
            return response.status(401).json({ ...err || 'Unexpected error.' })
        }
    }
}