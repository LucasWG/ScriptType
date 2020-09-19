import { Router } from 'express'

import { checkJwt } from './libs/jwt'
import { checkRole } from './libs/checkRole'

import { loginController } from './useCases/Login'
import { registerController } from './useCases/Register'
import { deleteUserController } from './useCases/DeleteUser'

const router = Router()

router.get('/', (request, response) => response.status(200).json({ project: 'ScriptType - SOLID' }))

// USER
router.delete('/user/delete', checkJwt, checkRole(['USER']), (request, response) => deleteUserController.handle(request, response))

// AUTH
router.post('/login', (request, response) => loginController.handle(request, response))
router.post('/register', (request, response) => registerController.handle(request, response))

export { router }