const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const port = process.env.PORT || 5000


const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

//passport midddleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport)

//routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})