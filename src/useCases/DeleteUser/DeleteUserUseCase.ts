import { DeleteUserDTO } from './DeleteUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'

export class DeleteUserUseCase {

	constructor(
		private usersRepository: IUsersRepository
	) { }

	async execute(data: DeleteUserDTO) {
		let { sub } = data

		const user = await this.usersRepository.findById(sub)

		if (!user)
			throw new Error()

		await this.usersRepository.deleteUser(sub)
	}
}