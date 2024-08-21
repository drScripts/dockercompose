const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9093', 'kafka3:9094']
});

const consumer = kafka.consumer({ groupId: 'test-group',  });

const run = async () => {
  // Connect the consumer
  await consumer.connect();
  console.log('Consumer connected');

  // Subscribe to the topic
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });
  console.log('Subscribed to topic');

  // Run the consumer
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });

  // Handle errors
  consumer.on('consumer.crash', async ({ payload }) => {
    console.error('Consumer crashed', payload.error);
    await consumer.disconnect();
    process.exit(1);
  });
};

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down consumer');
  await consumer.disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

run().catch(e => {
  console.error(`[example/consumer] ${e.message}`, e);
  process.exit(1);
});
