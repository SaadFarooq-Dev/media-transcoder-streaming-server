import { generateHLS } from "../helpers/generateHLS.js";
import { generateManifest } from "../helpers/generateManifest.js";
import fs from 'fs'
import path from 'path'
import VideoModel from "../models/Video.js";

export const VideoProcess = async ({ video, newFileData, outputDir, qualities, file, manifestFileName }) => {

  try {
    const generateHLSPromises = qualities.map((quality) => generateHLS(newFileData, outputDir, quality));

    await Promise.all(generateHLSPromises)
    console.log("All HLS playlists generated successfully.");

    const manifestContent = generateManifest(file, qualities);
    const manifestPath = path.join(outputDir, manifestFileName);
    fs.writeFileSync(manifestPath, manifestContent);

    const data = await VideoModel.findByIdAndUpdate(video._id, {
      url: manifestPath,
    }, { new: true })
    console.log("Manifest file generated successfully.");
    return data
  } catch (error) {
    return error
  }
}

