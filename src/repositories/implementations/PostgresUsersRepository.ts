import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'
import { User } from '../../entities/User'
import { IUserSerialized, IUsersRepository } from '../IUsersRepository'

export class PostgresUsersRepository implements IUsersRepository {
	private prisma = new PrismaClient()

	async findById(userId: string): Promise<IUserSerialized> {
		const user = await this.prisma.user
			.findOne({
				where: { id: userId },
				select: {
					id: true,
					email: true,
					profile: true,
					createdAt: true,
					updatedAt: true
				}
			})
			.finally(async () => await this.prisma.$disconnect())

		return user
	}

	async findByEmail(email: string, password?: boolean): Promise<IUserSerialized> {
		const user = await this.prisma.user
			.findOne({
				where: { email },
				select: {
					id: true,
					email: true,
					password: password || false,
					profile: true,
					createdAt: true,
					updatedAt: true
				}
			})
			.finally(async () => await this.prisma.$disconnect())

		return user
	}

	async createUser(user: User): Promise<void> {
		await this.prisma.user
			.create({ data: { ...user, profile: { create: { id: v4() } } } })
			.finally(async () => await this.prisma.$disconnect())
	}

	async deleteUser(userId: string): Promise<void> {
		await this.prisma.profile.delete({ where: { userId } })

		await this.prisma.user.delete({ where: { id: userId } }).finally(async () => await this.prisma.$disconnect())
	}
}