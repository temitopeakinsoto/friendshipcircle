const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const app = express()

const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

// DB config
const db = require('./config/keys').mongoURI

mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("mongoose connected")
})
.catch(e => {
    console.log(e)
})

app.get('/', (req, res) => {
    res.send("Welcome to our home route")
})

//User routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})