import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider'
import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { RegisterController } from './RegisterController'
import { RegisterUseCase } from './RegisterUseCase'

const postgresUsersRepository = new PostgresUsersRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const registerUseCase = new RegisterUseCase(postgresUsersRepository, mailtrapMailProvider)

const registerController = new RegisterController(registerUseCase)

export { registerController }