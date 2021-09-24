require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => console.log('Connected to MongoDB'))

const authRoute = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use('/api/user', authRoute)

app.listen(3000, () => console.log(`Server up and running on ${PORT}...`))