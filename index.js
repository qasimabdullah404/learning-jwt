require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => console.log('Connected to MongoDB'))

const authRoute = require('./routes/auth')
const welcomeRoute = require('./routes/welcome')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/welcome', welcomeRoute)

app.listen(PORT, () => console.log(`Server up and running on ${PORT}...`))