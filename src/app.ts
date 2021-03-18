import 'reflect-metadata'
import createConnection from './database'
import express from 'express'
import cors from 'cors'
import { router } from './routes'

createConnection()

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
export { app }
