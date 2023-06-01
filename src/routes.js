import { Router } from 'express'

import authRouter from './routes/api/auth.js'
import videoRouter from './routes/api/video.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/video', videoRouter)

router.get('/', async (req, res) => {
  res.status(200).send('Api Running')
  }
)

export default router
