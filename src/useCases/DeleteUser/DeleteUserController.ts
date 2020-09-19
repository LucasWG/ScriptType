import { Request, Response } from 'express'
import { DeleteUserUseCase } from './DeleteUserUseCase'

export class DeleteUserController {

	constructor(
		private deleteUserUseCase: DeleteUserUseCase
	) { }

	async handle(request: Request, response: Response): Promise<Response> {
		const { sub } = response.locals.jwtPayload

		try {
			await this.deleteUserUseCase.execute({ sub })

			return response.status(200).send()
		} catch (err) {
			return response.status(401).json({ message: err.message || 'Unexpected error.' })
		}
	}
}