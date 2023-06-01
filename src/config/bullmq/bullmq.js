import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/dist/src/queueAdapters/bullMQ.js'

import { Queue as QueueMQ, Worker } from 'bullmq'
import { VideoProcess } from '../../queues/videoQueue.js';
const redisOptions = {
  port: 6379,
  host: 'localhost',
  password: '',
  tls: false,
};

const createQueueMQ = (name) => new QueueMQ(name, { connection: redisOptions });

async function setupBullMQProcessor(queueName) {

  new Worker(queueName, async (job) => {

    const data = await VideoProcess(job.data)

    return { jobId: `This is the return value of job (${job.id})`, data: data };
  });
}

export const exampleBullMq = createQueueMQ('ExampleBullMQ');

export const serverAdapter = new ExpressAdapter();

export const initializeBullMQ = () => {
  serverAdapter.setBasePath('/admin');
  createBullBoard({
    queues: [new BullMQAdapter(exampleBullMq)],
    serverAdapter,
  });
  setupBullMQProcessor(exampleBullMq.name);

}
