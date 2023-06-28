import express from 'express'

import { authenticateJWT } from '../../middleware/jwtAuthenticate.js'
import { getVideo, getVideos, uploadVideo , playVideo} from '../../controllers/videos.js'
import { upload } from '../../middleware/multerUpload.js'

import validate from '../../middleware/validation.js'
import { videoSchema } from '../../schemaValidator/videoSchema.js'

const videoRouter = express.Router()

videoRouter.get('/', authenticateJWT, getVideos)
videoRouter.post('/upload', authenticateJWT, upload.single('video'), validate({ body: videoSchema }), uploadVideo)

videoRouter.get('/play/:video_id/:filename',authenticateJWT, playVideo)

videoRouter.get('/:id', authenticateJWT, getVideo)

export default videoRouter
