const TokenService = require('../service/token')

exports.user = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw {status: 401, message: "Unauthorized to this page"}
    }
    const accessToken = authHeader.split(" ")[1]    
    const userData = TokenService.validateAToken(accessToken)
    
    if (!userData) {
        throw {status: 401, message: "Unauthorized to this page"}
    }
    req.user = userData
    next() 
}
