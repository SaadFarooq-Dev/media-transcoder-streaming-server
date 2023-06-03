import express from 'express'
import passport from 'passport'

import { loginUser, registerUser, verifyToken } from '../../controllers/auth.js'
import { authenticateJWT } from '../../middleware/jwtAuthenticate.js'
import validate from '../../middleware/validation.js'
import { userSchema } from '../../schemaValidator/userSchema.js'

const authRouter = express.Router()

authRouter.post('/signup', validate({ body: userSchema }), registerUser)
authRouter.get('/verify', authenticateJWT, verifyToken)
authRouter.post('/login', passport.authenticate('login', { session: false, failWithError: true }), loginUser)

export default authRouter
