import prisma from '../db/index.js';
import { Queue as QueueItem } from '@prisma/client';

export type Payload = {
  typename: string
  data: Buffer
}

export type Item = {
  channel: string
  payload: Payload
  enqueuedAt: Date
}

export type SubscriptionHandler = (item: Item) => void;

interface Queue {

  enqueue(channel: string, payload: any): void

  dequeue(): Promise<Array<Item>>

  subscribe(channels: string[], onSubscribe: SubscriptionHandler): void
}

const enqueue = (channel: string, payload: any) => {

  const serializedPayload = JSON.stringify({ typename: typeof payload, data: payload })

  prisma.queue.create({
    data: {
      channel: channel,
      payload: Buffer.from(serializedPayload, 'utf-8'),
    }
  })
    .then((item: any) => console.debug("Enqueued item ", item))
    .catch((err: any) => {
      console.error("Failed to enqueue item: ", err);
    })
}

const dequeue = async () => {
  const queueItems = await prisma.$queryRaw<QueueItem[]>`
    DELETE FROM
      queue
    USING (
      SELECT * FROM queue LIMIT 10 FOR UPDATE SKIP LOCKED
    ) q
    WHERE q.id = queue.id RETURNING queue.*;
  `

  return queueItems?.map(item => {
    return {
      channel: item.channel,
      payload: JSON.parse(item.payload.toString('utf-8')),
      enqueuedAt: item.enqueuedAt,
    }
  }) || []
}

const subscriptions: Map<string, Array<SubscriptionHandler>> = new Map();

const subscribe = (channels: string[], onSubscribe: SubscriptionHandler) => {
  channels.forEach(channel => subscriptions.set(channel, [...subscriptions.get(channel) || [], onSubscribe]))
}

const queue: Queue = {
  enqueue,
  dequeue,
  subscribe,
}

export default queue;

// setup dequeue on startup
let poller: NodeJS.Timer | undefined = undefined;
export const initializeQueue = () => {
  poller = setInterval(async () => {
    dequeue()
      .then(items => {
        console.log("Received ", items?.length, " items")
        items.forEach(item => {
          console.log("Processing item: ", item);
          subscriptions.get(item.channel)?.forEach(handler => handler(item));
        })
      })
      .catch(error => {
        console.error("Error dequeuing...", error);
      })
  }, 100);
}

export const stopQueueGracefully = async () => {
  if (poller) {
    clearInterval(poller);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}
