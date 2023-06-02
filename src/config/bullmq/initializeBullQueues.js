import { createQueueMQ, flowProducer } from "../bullmq.js";
import { hlsProcessingQueueProcessor, hlsTranscodingQueueProcessor } from "./setupBullMQProcessor.js";

export const Hls_Processing_Queue = createQueueMQ('Hls_Processing_Queue');
export const Hls_Transcoding_Queue = createQueueMQ('Hls_Transcoding_Queue');

export const flwo = flowProducer('flow-queue-processor')

export const initializeBullQueues = () => {

  hlsProcessingQueueProcessor(Hls_Processing_Queue.name);
  hlsTranscodingQueueProcessor(Hls_Transcoding_Queue.name);
}
