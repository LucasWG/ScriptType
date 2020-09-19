import { validate } from 'class-validator'
import { User } from '../../entities/User'
import { IMailProvider } from '../../providers/IMailProvider'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IRegisterRequestDTO } from './RegisterDTO'
import { hashSync } from 'bcrypt'
import { generateJwT } from '../../libs/jwt'

export class RegisterUseCase {

    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) { }

    async execute(data: IRegisterRequestDTO) {
        let { email, password } = data

        email = email.toLowerCase()

        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if (userAlreadyExists)
            throw { error: 'E-mail already registered!' }

        const user = new User({ email, password: password })

        const errors = await validate(user, { validationError: { target: false } })

        if (errors.length > 0)
            throw { errors }

        user.password = await new Promise<string>(r => r(hashSync(user.password, 9)))

        await this.usersRepository.createUser(user)

        delete user.password
        delete user.email

        // await this.mailProvider.sendMail({
        //     to: {
        //         name: email.split('@')[0],
        //         email: email,
        //     },
        //     from: {
        //         name: 'Equipe do Meu App',
        //         email: 'equipe@meuapp.com',
        //     },
        //     subject: 'Seja bem-vindo à plataforma',
        //     body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        // })

        return await generateJwT(user.id)
    }
}