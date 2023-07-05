const express = require('express')
const userController = require('../controller/userController')
const api = express.Router()
const {body} = require('express-validator')
const auth = require('../middlewares/auth')

const use = fn => async (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch(next)
}

api.post('/user/register',
    body("email").isEmail(),
    body("password").isLength({min:6, max: 128}),
    use(userController.registration))

api.post('/user/login',  use(userController.login))

api.get('/user/logout', use(userController.logout))

api.get('/user/activate/:link', use(userController.activate))

api.get('/user/refresh', use(userController.refresh))

api.get('/user/:id', auth.user, use(userController.get_by_id))

api.get('/test', async (req,res) => {
    res.status(200).json({"message":"qweqewq"})
})

module.exports = api