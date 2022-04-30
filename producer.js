const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'app-producer',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

process.on('SIGINT', function () {
  console.log('DISCONNECTED');
  producer.disconnect();
  process.exit();
});

async function main() {
  let i = 0;
  await producer.connect();

  setInterval(() => {
    console.log('SEND', i);

    producer.send({
      topic: 'test-topc',
      messages: [{ value: `${i}` }],
    });

    i++;
  }, 3000);
}

main().catch(console.error);
