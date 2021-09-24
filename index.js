const express = require('express')

const authRoute = require('./routes/auth')

const app = express()

// Middleware
app.use('/api/user', authRoute)

app.listen(3000, () => console.log(`Server up and running...`))