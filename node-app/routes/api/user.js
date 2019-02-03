const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const router = express.Router();
const User = require('../../models/user');
const secret = require('../../config/keys').secretOrKey;
const expiresTime = require('../../config/keys').expiresTime;
/** 
* 注册 /register
* @param { Object } 注册信息
* @return user
*/ 
router.post('/register', (req, res) => {
    let request = req.body
    User.findOne({email: request.email})
        .then((user) => {
            if(user) {
                return res.status(400).json({msg: '邮箱已被注册!'})
            }
            const newUser = new User({
                name: request.name,
                email: request.email,
                password: request.password,
                identity: request.identity
            })
            newUser.save()
                .then((user) => res.json(user))
                .catch(err => {
                    res.status(400).json({msg: '注册出错,请重试'});
                    console.log(err)
                })
        })
})

/** 
* 登录 /login
* @param { Object } 登陆的信息
* @return 登录装填
*/ 
router.post('/login', (req, res) => {
    let request = req.body
    User.findOne({email: request.email, password: request.password})
        .then((isMatch) => {
            if(!isMatch) {
                return res.status(400).json({msg: '用户名或密码错误!'})
            }
            const rule = {
                id: isMatch.id,
                name: isMatch.name,
                identity: isMatch.identity
            }
            jwt.sign(rule, secret, {expiresIn: expiresTime}, (err, token) => {
                if(err) throw err;
                return res.json({
                    msg: "登陆成功~",
                    token: "Bearer " + token
                })
            })
        })
})

/** 
* 验证token /current
* @param { Object } 登陆的信息
* @return 登录装填
*/ 
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})


module.exports = router