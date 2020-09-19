import { Request, Response, NextFunction } from 'express'
import JwT from 'jsonwebtoken'

export const generateJwT = (id: string) => new Promise((resolve, reject) => {
	const payload = { iss: process.env.JWT_NAME, sub: id }

	JwT.sign(
		payload,
		process.env.JWT_SECRET as string,
		{ algorithm: 'HS256', expiresIn: '1h' },
		(err, token) => {
			if (err)
				return reject('ERR_INVALID_TOKEN')
			return resolve(token)
		}
	)
})

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers['authorization']

	if (!authorization) return res.status(401).json({ tokenError: 'No token provided' })

	const parts = authorization.split(' ')

	if (!(parts.length === 2)) return res.status(401).json({ tokenError: 'Token error' })

	const [schema, token] = parts

	if (!/^Bearer$/i.test(schema)) return res.status(401).json({ tokenError: 'Token malformatted' })

	JwT.verify(token, <string>process.env.JWT_SECRET, (err, jwtPayload: any) => {
		if (err) return res.status(401).json({ tokenError: err.message })

		if (jwtPayload.iss !== process.env.JWT_NAME || jwtPayload.sub === undefined)
			return res.status(401).json({ tokenError: 'PayLoad broken' })

		res.locals.jwtPayload = jwtPayload

		return next()
	})
}