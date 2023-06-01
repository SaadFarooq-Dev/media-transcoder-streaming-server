import { Worker } from 'bullmq'
import { VideoProcess } from '../../queues/videoQueue.js';

export const hlsProcessingQueueProcessor = async (queueName) => {
  new Worker(queueName, async (job) => {
    const data = await VideoProcess(job.data)
    return { jobId: `This is the return value of job (${job.id})`, data: data };
  });
}
export const hlsTranscodingQueueProcessor = async (queueName) => {
  new Worker(queueName, async (job) => {
    console.log("I was in this job");
    return { jobId: `This is the return value of job (${job.id})` };
  });
}
