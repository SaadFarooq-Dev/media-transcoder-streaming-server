import path from 'path'
import fs from 'fs'
import { generateHLS } from "../helpers/generateHLS.js";
import VideoModel from '../models/Video.js';
import { generateManifest } from "../helpers/generateManifest.js";
import { transcodeVideo } from '../helpers/transcodeVideo.js';
import { qualities } from '../utils/constants/qualities.js';

export const uploadVideo = async (req, res, next) => {
  const { file } = req
  const { newExt, resolution } = req.body
  const outputDir = "videos/";
  const fileOriginalName = path.parse(file.originalname).name
  const manifestFileName = `${fileOriginalName}.m3u8`;

  try {
    const newFileData = await transcodeVideo(file, newExt, resolution)
    const generateHLSPromises = qualities.map((quality) => generateHLS(newFileData, outputDir, quality));

    await Promise.all(generateHLSPromises)
    console.log("All HLS playlists generated successfully.");

    const manifestContent = generateManifest(file, qualities);
    const manifestPath = path.join(outputDir, manifestFileName);
    fs.writeFileSync(manifestPath, manifestContent);

    const video = await VideoModel.create({
      name: fileOriginalName,
      userId: req.user.id,
      resolution: resolution,
      url: manifestPath,
      ext: path.extname(file.originalname),
      newExt: newExt
    })

    console.log("Manifest file generated successfully.");

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
