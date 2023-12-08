const amqp = require('amqplib/callback_api')

const LOG_QUEUE = 'logs'
const ERROR_QUEUE = 'errors'

const connectToRabbitMQ = () => {
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://localhost:5672', (err, conn) => {
        if (err) {
            reject(err);
        } 
        else {
            conn.createChannel((err, ch) => {
            if (err) {
                conn.close();
                reject(err);
            } else {
                resolve({ connection: conn, channel: ch });
            }
            });
        }
        });
    });
}

async function sendMessageToQueue(queue, message) {
    try {
        const { connection, channel } = await connectToRabbitMQ();

        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        console.log(`(RabbitMQ) Message sent to ${queue}: ${JSON.stringify(message)}`);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('(RabbitMQ) Error:', error);
    }
}

module.exports = {
    sendMessageToLog: async function(log) {
        await sendMessageToQueue(LOG_QUEUE, log)
    },

    sendMessageToError: async function(error) {
        await sendMessageToQueue(ERROR_QUEUE, error)
    },
}