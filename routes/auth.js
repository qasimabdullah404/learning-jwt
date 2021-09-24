const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations')

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email already exists! Please login.')

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

router.post('/login', (req, res) => {
    res.send('Login!!!')
})

module.exports = router