import { prismaMock } from '../db/singleton.js'
import queue from './queue.js'

test('should enqueue then dequeue', async () => {
  // Setup
  const payload = {
    field1: "x",
    field2: "y",
  }

  const channel = 'abc'
  const item = {
    id: 1,
    channel: channel,
    payload: Buffer.from(JSON.stringify({ typename: typeof payload, data: payload }), 'utf-8'),
    enqueuedAt: new Date(),
  }

  prismaMock.queue.create.mockResolvedValue(item)
  prismaMock.$queryRaw.mockResolvedValue([item])

  // Run the test
  queue.enqueue(channel, payload);

  // Verify
  await expect(queue.dequeue()).resolves.toHaveLength(1)
})
