import ffmpegPath from "@ffmpeg-installer/ffmpeg"
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'

ffmpeg.setFfmpegPath(ffmpegPath.path);

export const generateHLS = (hlsPath, newFileData, quality) => {

  const outputFileName = `output_${quality.name}.m3u8`;
  const outputPath = path.join(hlsPath, outputFileName);


  const inputFilePath = newFileData.transcodePath;

  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .addOptions([
        "-profile:v baseline",
        "-level 3.0",
        "-start_number 0",
        "-hls_time 10",
        "-hls_list_size 0",
        "-f hls",
        `-vf scale=${quality.resolution}`,
        `-b:v ${quality.bitrate}`,
      ])
      .output(outputPath)
      .on("end", () => {
        console.log(`HLS playlist generated for ${quality.name}`);
        resolve();
      })
      .on("error", (error) => {
        console.error(`Error generating HLS playlist for ${quality.name}:`, error);
        reject(error);
      })
      .run();
  });
}
