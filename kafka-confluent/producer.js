const { Kafka } = require('kafkajs');

// Define Kafka broker connection details
const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['kafka1:9092', 'kafka2:9093', 'kafka3:9094']
});

// Create a producer instance
const producer = kafka.producer();

// Function to produce messages
const produceMessage = async () => {
    try {
        // Connect the producer to the brokers
        await producer.connect();


        for (let index = 1; index <= 10; index++) {

            // Send the message to a specified topic
            await producer.send({
                topic: 'order_paid',
                messages: [
                    {
                        value: `Message-${index}`
                    }
                ],
            });

            console.log('Message sent successfully');

        }
    } catch (error) {
        console.error('Error producing message:', error);
    } finally {
        // Disconnect the producer from the brokers
        await producer.disconnect();
    }
};

// Execute the produceMessage function
produceMessage().catch(console.error);
