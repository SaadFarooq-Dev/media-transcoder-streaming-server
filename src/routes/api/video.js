import express from 'express'

import { authenticateJWT } from '../../middleware/jwtAuthenticate.js'
import { uploadVideo } from '../../controllers/videos.js'
import { upload } from '../../middleware/multerUpload.js'

// import validate from '../../middleware/validation.js'
// import { userSchema } from '../../schemaValidator/userSchema.js'

const videoRouter = express.Router()

videoRouter.post('/upload', authenticateJWT, upload.single('video'), uploadVideo)

export default videoRouter
