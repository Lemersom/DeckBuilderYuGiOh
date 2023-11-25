const jwt = require('jsonwebtoken')
const userService = require('../service/user-service')
const UserModel = require('../model/User')

module.exports = {
    authLogin: async function(email, password) {
        const userResponse = await userService.getUserByEmail(email)
        if(userResponse instanceof UserModel) {
            if(userResponse.password === password) {
                const token = jwt.sign({userId: userResponse.id}, process.env.JWT_SECRET, { expiresIn: '1h' })

                return({ status: 200, data: token, userId: userResponse.id })
            }
            else{
                return {status: 400, data: "Incorrect Password"}
            }
        }
        else {
            return { status: 404, data: "User is not registered" }
        }
    }
}