import ffmpegPath from "@ffmpeg-installer/ffmpeg"
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import fs from 'fs'

import { supportedCodecs } from "../utils/constants/supportedCodecs.js";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export const transcodeVideo = ({ fileName, transcodePath, filePath, newExt, resolution }) => {
  return new Promise((resolve, reject) => {
    const codecInfo = supportedCodecs.find((codec) => codec.extensions.includes(newExt));

    if (!codecInfo) {
      reject(`Unsupported file extension: ${newExt}`);
      return;
    }

    const directory = path.dirname(transcodePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    ffmpeg(filePath)
      .addInputOption('-v error')
      .output(transcodePath)
      .videoCodec(codecInfo.videoCodec)
      .audioCodec(codecInfo.audioCodec)
      .size(resolution)

      .on("error", function (err) {
        reject(err);
      })

      .on("end", function () {
        ffmpeg(filePath)
          .screenshots({
            timestamps: ["10%"],
            folder: directory,
            filename: `${fileName}.png`,
            size: "1080x?",
          })
          .on("error", function (err) {
            reject(err);
          })
          .on("end", function (data) {
            resolve({ fileName, transcodePath });
          });
      })
      .run();
  });
}
