const bcrypt = require('bcrypt')
const uuid = require('uuid')
const MailService = require('./mail')
const TokenService = require('./token')
const UserModel = require('../model/user')

// username, email, password

exports.get = async (id,email) => {
    return UserModel.get(id,email)
}

exports.create = async (email, username, password) => {
    const salt = await bcrypt.genSalt(10)    
    //hash password with salt
    const hashPassword = await bcrypt.hash(password, salt)
    //create random activaion link
    const activationLink = uuid.v4()
    // query to our database
    const user = (await UserModel.create({email, username, password: hashPassword, activationLink}))
    delete user.password
    const tokens = TokenService.generateToken(user)
    await TokenService.saveToken(user.id, tokens.refreshToken)
    return {...tokens,user: user }
}

exports.activate = async (activationLink) => {
    const user = await UserModel.get(null,null,activationLink)
    if (!user) {
        return 403
    }w
    await UserModel.activate(user.id) 
    return 302
}

exports.login = async (email, password) => {
    const user = await UserModel.get(null, email, null) 
    if (!user) {
        throw {status: 404, message:"user not found"}
    }

    const isEqual = await bcrypt.compare(password,user.password)
    if (!isEqual) {
        throw {status: 400, message: "incorrect user data"}
    }
    delete user.password 
    const tokens = TokenService.generateToken(user)
    await TokenService.saveToken(user.id, tokens.refreshToken)
    return {...tokens, user}
}

exports.logout = async (refreshToken) => {
    return await TokenService.removeToken(refreshToken)
}

exports.refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw {status: 401, message:"User not authorized"}
    }
    const token = TokenService.validateRToken(refreshToken)
    if (!token) {
        throw {status: 401, message:"Unauthorized to refresh tokens"}
    }

    const user = await UserModel.get(token.id, null, null) 
    delete user.password 
    const tokens = TokenService.generateToken(user)
    await TokenService.saveToken(user.id, tokens.refreshToken)
    return {...tokens, user}
}