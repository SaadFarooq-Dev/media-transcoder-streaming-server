import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import connectDB from './config/db.js'
import _initializePassport from './config/passport.js'
import errorHandler from './middleware/errorHandler.js'
import router from './routes.js'

import { initializeBullMQ, serverAdapter } from './config/bullmq/bullmq.js'


connectDB()

initializeBullMQ()

const app = express()

app.use(cors('*'))
app.use(morgan('tiny'))
app.use(express.json({ extended: false }))


app.use('/', router)
app.use("/admin", serverAdapter.getRouter());

app.use(errorHandler)

export default app

