import path from 'path'

import VideoModel from '../models/Video.js';
import { transcodeVideo } from '../helpers/transcodeVideo.js';
import { qualities } from '../utils/constants/qualities.js';
import { Hls_Processing_Queue } from '../config/bullmq/initializeBullQueues.js';

export const uploadVideo = async (req, res, next) => {
  const { file } = req
  const { newExt, resolution } = req.body
  const outputDir = "videos/";
  const fileOriginalName = path.parse(file.originalname).name
  const manifestFileName = `${fileOriginalName}.m3u8`;

  try {
    const newFileData = await transcodeVideo(file, newExt, resolution)

    const video = await VideoModel.create({
      name: fileOriginalName,
      userId: req.user.id,
      resolution: resolution,
      url: '',
      ext: path.extname(file.originalname),
      newExt: newExt
    })

    await Hls_Processing_Queue.add('Add', { video, newFileData, outputDir, qualities, file, manifestFileName });

    return res.status(200).json({ data: video })
  }
  catch (error) {
    next(error)
  }
}

export const getVideo = async (req, res, next) => {
  try {
    const video = await VideoModel.findById(req.params.id)
    if (video) {
      return res.status(200).json(video)
    }
    return res.status(400).json({ errors: [{ message: 'No such document exists for the given Id' }] })
  } catch (error) {
    next(error)
  }
}

export const getVideos = async (req, res, next) => {
  try {
    const video = await VideoModel.find({ userId: req.user.id })
    if (video) {
      return res.status(200).json(video)
    }
    return res.status(400).json({ errors: [{ message: 'No such document exists for the given Id' }] })
  } catch (error) {
    next(error)
  }
}
