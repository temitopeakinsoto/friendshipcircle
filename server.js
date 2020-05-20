const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const app = express()

// DB config
const db = require('./config/keys').mongoURI

mongoose.connect(db)
.then(() => {
    console.log("mongoose connected")
})
.catch(e => {
    console.log(e)
})

app.get('/', (req, res) => {
    res.send("Welcome to our home route")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})