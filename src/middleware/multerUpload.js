import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, 'upload_at_' + Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({storage: storage});
