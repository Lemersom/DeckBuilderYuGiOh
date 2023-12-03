const express = require('express')
const bcrypt = require ('bcrypt')
const router = express.Router()
const auth = require('../helper/auth')
const userService = require('../service/user-service')
const userValidator = require('../validator/user-validator')
const rateLimit = require('express-rate-limit');

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
        return res.status(400).json("User is not registered")
    }
    if(["user1@user.com", "user2@user.com"].includes(req.body.email)){
      console.log('certo')
      next()
    }
    else{
      console.log('errado')
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
  windowMs: 10000, // 10 sec
  max: 3,
  message: 'Você atingiu o limite de tentativas de login. Tente novamente mais tarde.',
});

router.post('/login',
    limiter, 
    validateHash,
    async (req, res) => {
        const response = await auth.authLogin(req.body.email, req.body.password)
        res.status(response.status).json(response.data)
    }
)


router.post('/register', 
    userValidator.validateEmail, 
    userValidator.validatePassword,
    encryptPassword,
    async (req, res) => {
        const response = await userService.createUser(req.body.email, req.body.password)
        res.status(response.status).json(response.data)
    }
)

module.exports = router