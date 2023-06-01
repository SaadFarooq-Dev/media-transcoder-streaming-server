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
  qualities: [
    {
      resolution: { type: String, required: true },
      bitrate: { type: String, required: true },
      name: { type: String, required: true }
    }
  ],
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const VideoModel = mongoose.model('Video', VideoSchema)

export default VideoModel
