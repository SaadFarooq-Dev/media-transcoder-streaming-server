import { Queue as QueueMQ, FlowProducer } from 'bullmq'
import { redisOptions } from '../utils/constants/redis.js';
import { initializeBullQueues, Hls_Processing_Queue,Hls_Transcoding_Queue } from './bullmq/initializeBullQueues.js';
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from '@bull-board/api/dist/src/queueAdapters/bullMQ.js'
import { serverAdapter } from './bullmq/serverAdapter.js';

export const createQueueMQ = (name) => new QueueMQ(name, { connection: redisOptions });
export const flowProducer = (name) => new FlowProducer({connection: redisOptions});

export const _initlializeBullMQ = () => {
  serverAdapter.setBasePath('/admin');
  createBullBoard({
    queues: [new BullMQAdapter(Hls_Processing_Queue), new BullMQAdapter(Hls_Transcoding_Queue) ],
    serverAdapter,
  });
  initializeBullQueues()
}

