const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const app = express();
const bodyParser = require('body-parser')
const db = require('./config/keys').mongoURI
const router = require('./routes/api/user')
const profiles = require('./routes/api/profile')
mongoose.connect(db)
    .then(() => {
        console.log('mongodb connected')
    })
    .catch((err) => {
        console.log(err)
    })

// passport 初始化
app.use(passport.initialize())
require("./config/passport")(passport)

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 引入user api
app.use('/api/users', router)
app.use('/api/profiles', profiles)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})