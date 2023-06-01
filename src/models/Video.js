import mongoose from 'mongoose'

const { Schema } = mongoose

const VideoSchema = new Schema({
  name: {
    type: String,
    max: 255,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  resolution: {
    type: String,
    required: true
  },
  url: {
    type: String,
  },
  ext:{
    type: String,
    required: true
  },
  newExt: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const VideoModel = mongoose.model('Video', VideoSchema)

export default VideoModel
