import path from 'path'
import fs from 'fs'
import { generateHLS } from "../helpers/generateHLS.js";
import { generateManifest } from "../helpers/generateManifest.js";


export const uploadVideo = async (req, res, next) => {
  const { file } = req

    const outputDir = "videos/";

    const qualities = [
      { resolution: "854x480", bitrate: "1500k", name: "480p" },
      { resolution: "1280x720", bitrate: "3000k", name: "720p" },
      { resolution: "1920x1080", bitrate: "5000k", name: "1080p" },
    ];

    const manifestFileName = `${path.parse(file.originalname).name}.m3u8`;

    const generateHLSPromises = qualities.map((quality) => generateHLS(file, outputDir, quality));

    Promise.all(generateHLSPromises)
      .then(() => {
        console.log("All HLS playlists generated successfully.");

        const manifestContent = generateManifest(file,qualities);
        const manifestPath = path.join(outputDir, manifestFileName);
        fs.writeFileSync(manifestPath, manifestContent);

        console.log("Manifest file generated successfully.");

        res.status(200).json("Video Processed!")
      })
      .catch((error) => {
        console.error("Error generating HLS playlists:", error);
        res.status(500).json({ mfg: "Error in messafe" })
      });
}

