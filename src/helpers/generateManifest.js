import path from 'path'

export const generateManifest = (qualities) => {
  const lines = [
    "#EXTM3U",
    "#EXT-X-VERSION:3",
    `#EXT-X-STREAM-INF:BANDWIDTH=${qualities[0].bitrate},RESOLUTION=${qualities[0].resolution},NAME=${qualities[0].name}`,
    `output_${qualities[0].name}.m3u8`,
    `#EXT-X-STREAM-INF:BANDWIDTH=${qualities[1].bitrate},RESOLUTION=${qualities[1].resolution},NAME=${qualities[1].name}`,
    `output_${qualities[1].name}.m3u8`,
    `#EXT-X-STREAM-INF:BANDWIDTH=${qualities[2].bitrate},RESOLUTION=${qualities[2].resolution},NAME=${qualities[2].name}`,
    `output_${qualities[2].name}.m3u8`,
  ];

  return lines.join("\n");
}

