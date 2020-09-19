import { IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator'
// import { Profile } from '@prisma/client'
import { v4 } from 'uuid'

export class User {
	public readonly id: string

	@IsEmail()
	@IsNotEmpty()
	public email: string

	@MinLength(8)
	@MaxLength(17)
	@IsNotEmpty()
	public password: string

	// public profile?: Profile

	constructor(props: Omit<User, 'id'>, id?: string) {
		Object.assign(this, props)

		if (!id)
			this.id = v4()
	}
}