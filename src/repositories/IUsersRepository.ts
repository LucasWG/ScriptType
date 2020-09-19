import { Profile } from '@prisma/client'
import { User } from '../entities/User'

export interface IUserSerialized {
	id: string
	email: string
	password?: string
	profile?: Profile
	createdAt: Date
	updatedAt: Date
}

export interface IUsersRepository {
	findById(userId: string): Promise<IUserSerialized>
	findByEmail(email: string, password?: boolean): Promise<IUserSerialized>
	createUser(user: User): Promise<void>
	deleteUser(userId: string): Promise<void>
}