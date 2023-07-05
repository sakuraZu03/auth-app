const db = require('../database/db')
const UserService = require('../service/user')
const UserModel = require('../model/user')
const { validationResult } = require('express-validator')

// username, email, password
exports.registration = async (req, res, next) => {
    const errors = validationResult(req) 
    if (!errors.isEmpty()) {
        throw {status:400, message:'invalid input values', ...errors}        
    }

    const { email, username, password } = req.body
    const results = await UserService.get(null, email, null)
    if (results !== undefined) {
        throw {status: 400, message:"This user already exists"}
    } 
    
    const userdata = await UserService.create(email, username, password)    
    res.cookie('refreshToken', userdata.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    res.status(200).json(userdata)
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const userData = await UserService.login(email, password)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    res.status(200).send(userData)
}

exports.logout = async (req, res) => {
    const {refreshToken} = req.cookies
    const token = await UserService.logout(refreshToken)
    res.clearCookie('refreshToken')
    res.status(200).json(token)
}

exports.refresh = async(req, res) => {
    const {refreshToken} = req.cookies
    const userData = await UserService.refresh(refreshToken)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    res.status(200).send(userData)
}

exports.activate = async(req,res) => {
    const link = req.params.link
    const status = await UserService.activate(link)
    
    if (status = 403) {
        throw {error: 403,message:"Link expired/used"}
    }
    
    return res.redirect(process.env.CLIENT_URL+"/activation")
}

exports.get_by_id = async (req,res) => {
    let id = req.params.id
    const userData = await UserModel.get(id,null, null)
    delete userData.password
    res.status(200).send(userData)
}