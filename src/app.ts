import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { resolve } from 'path'

import { router } from './routes'

const app = express()
const port = process.env.PORT || 3333

app.disable('x-powered-by')

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(resolve(__dirname, '..', 'public')))

app.use(router)

export { app, port }