const amqp = require('amqplib')
const logDAO = require('../DAO/log-dao')

const QUEUE_NAME = 'logs'

module.exports = {
    logMessage: {},

    sendMessage: async function(log) {
        let connection;
        try {
            connection = await amqp.connect('amqp://localhost')
            const channel = await connection.createChannel()

            await channel.assertQueue(QUEUE_NAME, { durable: false })
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(log)))

            this.logMessage = log

            setTimeout(async () => {
                await connection.close()
            }, 1000)
        }
        catch (err) {
            console.log("Error sending message: " + err)
        }
        finally {
            if(connection) {
                await connection.close
            }
        }
    },

    receiveMessage: async function() {
        try {
            const connection = await amqp.connect('amqp://localhost')
            const channel = await connection.createChannel()

            await channel.assertQueue(QUEUE_NAME, { durable: false })
            channel.consume(QUEUE_NAME, async (msg) => {
                if(msg) {
                    await logDAO.create(this.logMessage.search, this.logMessage.userEmail, this.logMessage.date)
                    channel.ack(msg)
                }
            })
        }
        catch(err) {
            console.log("Error receiving message: " + err)
        }
    }
}