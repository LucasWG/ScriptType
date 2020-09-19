import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { DeleteUserUseCase } from './DeleteUserUseCase'
import { DeleteUserController } from './DeleteUserController'

const postgresUsersRepository = new PostgresUsersRepository()

const deleteUserUseCase = new DeleteUserUseCase(postgresUsersRepository)

const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserController }