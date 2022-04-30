const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'app-producer',
  brokers: ['kafka:29092'],
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
    console.log('SEND', `${host} ${i}`);

    producer.send({
      topic: 'current-date',
      messages: [{ value: `${host} ${i}` }],
    });

    i++;
  }, 3000);
}

main().catch(console.error);
