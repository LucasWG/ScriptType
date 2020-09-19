import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

export const checkRole = (roles: Array<string>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const prisma = new PrismaClient()
		const { iss, sub } = res.locals.jwtPayload

		if (iss !== process.env.JWT_NAME || sub === undefined)
			return res.status(401).send()

		const user = await prisma.user
			.findOne({ where: { id: sub }, select: { role: true } })
			.finally(async () => await prisma.$disconnect())

		if (user === null) return res.status(401).send()

		if (user.role === "ADMIN")
			next()
		else if (roles.indexOf(user.role) > -1)
			next()
		else
			return res.status(401).send()
	}
}