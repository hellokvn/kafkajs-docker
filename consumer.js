const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'app-consumer',
  brokers: ['kafka:29092'],
});

const consumer = kafka.consumer({ groupId: 'date-group' });

process.on('SIGINT', function () {
  console.log('DISCONNECTED');
  consumer.disconnect();
  process.exit();
});

async function main() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topc', fromBeginning: false });

  await consumer.run({
    async eachMessage({ topic, partition, message }) {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
}

main().catch(console.error);
