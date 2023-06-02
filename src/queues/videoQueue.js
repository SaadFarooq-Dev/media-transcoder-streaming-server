import fs from 'fs'
import path from 'path'

import { generateHLS } from "../helpers/generateHLS.js";
import { generateManifest } from "../helpers/generateManifest.js";
import VideoModel from "../models/Video.js";

export const VideoProcess = async ({ video_id, hlsPath, newFileData, qualities, manifestFileName }) => {

  try {
    const directory = path.dirname(`${hlsPath}/.temp`);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const generateHLSPromises = qualities.map((quality) => generateHLS(hlsPath, newFileData, quality));

    await Promise.all(generateHLSPromises)
    console.log("All HLS playlists generated successfully.");

    const manifestContent = generateManifest(qualities);
    const manifestPath = path.join(hlsPath, manifestFileName);
    fs.writeFileSync(manifestPath, manifestContent);

    const data = await VideoModel.findByIdAndUpdate(video_id, {
      url: manifestPath,
    }, { new: true })
    console.log("Manifest file generated successfully.");
    return data
  } catch (error) {
    return error
  }
}

