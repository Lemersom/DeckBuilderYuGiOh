const jwt = require('jsonwebtoken')

module.exports = {
    validateToken: async function(req, res, next) {
        let token = req.headers['authorization']
        if(!token){
            token = ''
        }
        token = token.split('Bearer ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
            if(error){
                res.status(403).json("Access denied - Invalid token")
                return
            }
            req.userId = payload.userId
            next()
        })
    }
}