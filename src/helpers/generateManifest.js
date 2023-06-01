import path from 'path'

export const generateManifest = (file,qualities) => {
  const lines = [
    "#EXTM3U",
    "#EXT-X-VERSION:3",
    `#EXT-X-STREAM-INF:BANDWIDTH=${qualities[0].bitrate},RESOLUTION=${qualities[0].resolution},NAME=${qualities[0].name}`,
    `${path.parse(file.originalname).name}_${qualities[0].name}.m3u8`,
    `#EXT-X-STREAM-INF:BANDWIDTH=${qualities[1].bitrate},RESOLUTION=${qualities[1].resolution},NAME=${qualities[1].name}`,
    `${path.parse(file.originalname).name}_${qualities[1].name}.m3u8`,
    `#EXT-X-STREAM-INF:BANDWIDTH=${qualities[2].bitrate},RESOLUTION=${qualities[2].resolution},NAME=${qualities[2].name}`,
    `${path.parse(file.originalname).name}_${qualities[2].name}.m3u8`,
  ];

  return lines.join("\n");
}

