const amqp = require('amqplib/callback_api')
require('dotenv').config({path: __dirname + '../../.env'})
const logDAO = require('../DAO/log-dao')
const errorDAO = require('../DAO/error-dao')

const LOG_QUEUE = "logs"
const ERROR_QUEUE = "errors"

const connectAndConsumeRabbitMQ = (queue, dataHandler) => {
    amqp.connect('amqp://localhost:5672', (err, conn) => {
        if(err) {
            console.log("(RabbitMQ) Error Connecting Consumer: ", err)
            return
        }
        console.log(`(RabbitMQ) Consumer Connected ${queue}`)
        
        conn.createChannel((err, ch) => {
            if(err) {
                console.log("(RabbitMQ) Error Creating Channel: ", err)
                return
            }
            console.log(`(RabbitMQ) Channel Created ${queue}`)

            ch.assertQueue(queue, {durable: false})
            ch.prefetch(1)
            ch.consume(queue, async (msg) => {
                try {
                    const message = JSON.parse(msg.content.toString())
                    await dataHandler(message)
                }
                catch(err) {
                    console.log(`(RabbitMQ) Error Handling ${queue} Message: ${err}`)
                }
                finally {
                    ch.ack(msg)
                }
            })
        })
    })
}

connectAndConsumeRabbitMQ(LOG_QUEUE, async (logMsg) => {
    console.log(`(RabbitMQ) Log Message Received: search: ${logMsg.search} userEmail: ${logMsg.userEmail} date: ${logMsg.date}`)
    await logDAO.create(logMsg.search, logMsg.userEmail, logMsg.date)
})

connectAndConsumeRabbitMQ(ERROR_QUEUE, async (errorMsg) => {
    console.log(`(RabbitMQ) Error Message Received: status: ${errorMsg.status} message: ${errorMsg.message}`);
    await errorDAO.newError(errorMsg.status, errorMsg.message);
});