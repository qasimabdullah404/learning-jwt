const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations')

router.post('/register', async (req, res) => {
    // Check Validations
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Check if user already exists
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email already exists! Please login.')

    // Password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
            const saveUser = await newUser.save()
            res.send(saveUser)
    } catch (error) {
            res.status(400).send(error)
    }
})

router.post('/login', async (req, res) => {
    // Check Validations
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Check if user exists
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('User not found! Please register.')

    // Check if password is valid
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Wrong email or password.')

    // Create and assign a token.
    const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: process.env.AUTH_TOKEN_EXPIRY.toString()})
    return res.header('auth-token', token).send(token)
})

module.exports = router