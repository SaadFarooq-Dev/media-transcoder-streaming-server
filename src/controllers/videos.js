import path from 'path'
import fs, { createReadStream } from 'fs'

import VideoModel from '../models/Video.js';
import { qualities } from '../utils/constants/qualities.js';
import { flwo, Hls_Processing_Queue, Hls_Transcoding_Queue } from '../config/bullmq/initializeBullQueues.js';

export const uploadVideo = async (req, res, next) => {
  const { file } = req
  const { newExt, resolution } = req.body
  const outputDir = "videos/";
  const fileOriginalName = path.parse(file.originalname).name
  const manifestFileName = `${fileOriginalName}.m3u8`;

  try {

    const video = await VideoModel.create({
      name: fileOriginalName,
      userId: req.user.id,
      resolution: resolution,
      url: '',
      ext: path.extname(file.originalname),
      newExt: newExt
    })

    await flwo.add({
      name: Hls_Processing_Queue.name,
      queueName: Hls_Processing_Queue.name,
      data: { video, outputDir, qualities, file, manifestFileName },
      children: [
        { name: Hls_Transcoding_Queue.name, data: { file, newExt, resolution }, queueName: Hls_Transcoding_Queue.name },
      ],
    });

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

export const playVideo = (req, res, next) => {

  const extractedPart = req.url.split('/play')[1];
  const filePath = './videos' + extractedPart;

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }

    const videoStream = createReadStream(filePath);
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'application/vnd.apple.mpegurl',
      'Content-Length': stat.size,
    });
    videoStream.pipe(res);
  });
}
