const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'tmii-background-process',
    brokers: ['kafka1:9092', 'kafka2:9093', 'kafka3:9094'],
});

const admin = kafka.admin();

const topics = [
    { topic: "order_paid", numPartitions: 1, replicationFactor: 3 },
    { topic: "order_foc_approved", numPartitions: 1, replicationFactor: 3 },
    { topic: "order_foc_rejected", numPartitions: 1, replicationFactor: 3 },
    { topic: "order_rejected", numPartitions: 1, replicationFactor: 3 },
    { topic: "order_wait_approval", numPartitions: 1, replicationFactor: 3 },
    { topic: "otp_requested", numPartitions: 1, replicationFactor: 3 },
    { topic: "ota_ticket_created", numPartitions: 1, replicationFactor: 3 },
];

const createTopics = async () => {
    await admin.connect();
    try {
        await admin.createTopics({
            topics,
            waitForLeaders: true,
        });
        console.log('Topics created successfully');
    } catch (error) {
        console.error('Error creating topics:', error);
    } finally {
        await admin.disconnect();
    }
};

createTopics().catch(console.error);
