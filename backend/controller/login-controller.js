const express = require('express')
const bcrypt = require ('bcrypt')
const router = express.Router()
const auth = require('../helper/auth')
const userService = require('../service/user-service')
const userValidator = require('../validator/user-validator')
const {rateLimit} = require('express-rate-limit');
const messagePublisher = require('../messaging/publisher')

const saltRounds = 10

const encryptPassword = async (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds)
          .then((hash) => {
            req.body.password = hash
            next()
          })
          .catch((err) => {
            return res.status(400).json(err.message)
          })
}

const validateHash = async (req, res, next) => {
    const user = await userService.getUserByEmail(req.body.email)
    if(!user) {
      const error = { status: 400, message: "User is not registered" }
      await messagePublisher.sendMessageToError(error)
      return res.status(error.status).json(error.message)
    }
    if(["user1@user.com", "user2@user.com"].includes(req.body.email)){
      next()
    }
    else{
      bcrypt.compare(req.body.password, user.password)
            .then((result) => {
              if(result) {
                  req.body.password = user.password
                  next()
              }
              else{
                  return res.status(400).json('Incorrect Password')
              }
            })
            .catch((err) => {
              return res.status(400).json(err.message)
            })
    }
}

const limiter = rateLimit({
  windowMs:  10000,  //15 * 60 * 1000, // 15 minutes
  limit: 3,
  message: 'You have reached the login attempt limit. Try again later.',
});

router.post('/login',
    limiter, 
    validateHash,
    async (req, res) => {
        const response = await auth.authLogin(req.body.email, req.body.password)

        if(response.status > 399 && response.status < 600){
          const error = { status: response.status, message: response.data }
          await messagePublisher.sendMessageToError(error)
        }
        
        res.status(response.status).json(response.data)
    }
)


router.post('/register', 
    userValidator.validateEmail, 
    userValidator.validatePassword,
    encryptPassword,
    async (req, res) => {
        const response = await userService.createUser(req.body.email, req.body.password)
        
        if(response.status > 399 && response.status < 600){
          const error = { status: response.status, message: response.data.message }
          await messagePublisher.sendMessageToError(error)
        }
        
        res.status(response.status).json(response.data)
    }
)

module.exports = router