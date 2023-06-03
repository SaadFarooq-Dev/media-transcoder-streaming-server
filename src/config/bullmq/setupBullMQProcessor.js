import { Worker } from 'bullmq'
import { transcodeVideo } from '../../helpers/transcodeVideo.js';
import { VideoProcess } from '../../queues/videoQueue.js';
import { redisOptions } from '../../utils/constants/redis.js';

export const hlsProcessingQueueProcessor = async (queueName) => {
  new Worker(queueName, async (job) => {
    const values = await job.getChildrenValues();
    const key = Object.keys(values)[0];
    const newFileData = values[key];
    job.data.newFileData = newFileData
    const data = await VideoProcess(job.data)
    return { jobId: `This is the return value of job (${job.id})`, data: data };
  }, { connection: redisOptions });
}

export const hlsTranscodingQueueProcessor = async (queueName) => {
  new Worker(queueName, async (job) => {
    const newFileData = await transcodeVideo(job.data)
    console.log("transcoding queue completed");
    return newFileData
  }, { connection: redisOptions });
}
