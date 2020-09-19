import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ILoginRequestDTO } from './LoginDTO'
import { generateJwT } from '../../libs/jwt'
import { compareSync } from 'bcrypt'

export class LoginUseCase {

    constructor(
        private usersRepository: IUsersRepository
    ) { }

    async execute(data: ILoginRequestDTO) {
        if (!(data.email && data.password))
            throw { message: 'Fill in all fields' }

        const user = await this.usersRepository
            .findByEmail(data.email.toLowerCase(), true)

        if (!user)
            throw { message: 'invalid email or password!' }

        const cPassword =
            await new Promise<boolean>(r => r(compareSync(data.password, user.password)))

        if (!cPassword)
            throw { message: 'invalid email or password!' }

        delete user.password

        return {
            // ...user,
            token: await generateJwT(user.id)
        }
    }
}