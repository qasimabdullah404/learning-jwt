const express = require('express')
const router = express.Router()

const verify = require('./verifyToken')

// A protected route
router.get('/', verify, (req, res) => {
    res.json({message: "Welcome to JWT learning! You are visiting a protected route becuase you are signed in."})
})

module.exports = router