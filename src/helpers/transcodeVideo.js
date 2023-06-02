import ffmpegPath from "@ffmpeg-installer/ffmpeg"
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'

import { supportedCodecs } from "../utils/constants/supportedCodecs.js";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export const transcodeVideo = ({file, newExt, resolution}) => {
  return new Promise((resolve, reject) => {
    const codecInfo = supportedCodecs.find((codec) => codec.extensions.includes(newExt));
    const fileName = `${path.parse(file.originalname).name}.${newExt}`
    if (!codecInfo) {
      reject(`Unsupported file extension: ${newExt}`);
      return;
    }

    const outputFilePath = `transcoded/${fileName}`;
    ffmpeg(file.path)
      .addInputOption('-v error')
      .output(outputFilePath)
      .videoCodec(codecInfo.videoCodec)
      .audioCodec(codecInfo.audioCodec)
      .size(resolution)

      .on("error", function (err) {
        reject(err);
      })

      .on("end", function () {
        ffmpeg(file.path)
          .screenshots({
            timestamps: ["10%"],
            folder: "./transcoded",
            filename: `${file.filename}.${newExt}.png`,
            size: "1080x?",
          })
          .on("error", function (err) {
            reject(err);
          })
          .on("end", function (data) {
            resolve({fileName,outputFilePath});
          });
      })
      .run();
  });
}
