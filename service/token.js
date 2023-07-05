const jwt = require('jsonwebtoken')
const TokenModel = require('../model/token')

exports.generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn:'30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn:'30d'})
    return {accessToken,refreshToken}
}

exports.saveToken = async(id, refreshToken) => {
    const tokenData = await TokenModel.find(id, null)
    if (tokenData) {
        tokenData.refreshtoken = refreshToken
        TokenModel.save(tokenData)
        return
    }

    await TokenModel.create(id, refreshToken)
}

exports.removeToken = async(refreshToken) => {
    return await TokenModel.delete(refreshToken)
}

exports.validateRToken = (refreshToken) => {
    try {
        const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const token = TokenModel.find(null, refreshToken)
        if (token && userData) {
            return userData
        }
        return undefined
    } catch (e) {
        throw {status: 401, message: "Unauthorized: please login again"}
    }
}

exports.validateAToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    } catch (e) {
        throw {status: 401, message: "Unauthorized to this page"}
    }
}