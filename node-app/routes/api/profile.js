
const express = require('express');

const passport = require('passport')
const router = express.Router();
const Profile = require('../../models/profile');

/** 
* POST 新增数据信息
* @param { Object } 数据信息
* @return user
*/ 
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    let profile = req.body
    new Profile(profile).save()
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
})

/** 
* GET 获取所有数据信息
* @param { Object } 数据信息
* @return {Array} 数据信息
*/ 
router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.find()
        .then(result => {
            if(!result) return res.json({ msg: '',list: []})
            return res.json({
                msg: '',
                list: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({msg: '获取信息失败,请重试'})
        })
})

/** 
* GET 获取单个数据信息
* @param { Object } 数据信息
* @return {Array} 数据信息
*/ 
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let profile = req.params
    Profile.findById(profile.id)
        .then(result => {
            if(!result) return res.json({ msg: '找不到对应的数据信息'})
            return res.json({
                msg: '',
                profile: result
            })
        })
        .catch(err => console.log(err))
})

/** 
* POST 编辑单个数据信息
* @param { Object } 数据信息
* @return { Object } 编辑成功的信息
*/ 
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let profileFields = {
        type: req.body.type,
        describe: req.body.describe,
        income: req.body.income,
        expend: req.body.expend,
        cash: req.body.cash,
        remark: req.body.remark
    }
    Profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set: profileFields},
        {new: true}
    )
        .then(result => {
            if(!result) return res.json({ msg: '编辑失败!'})
            return res.json({msg: '更新成功~'})
        })
        .catch(err => console.log(err))
})

/** 
* POST 删除单个数据信息
* @param { Object } 数据信息
* @return { Object } 删除成功的信息
*/ 
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndDelete({_id: req.params.id})
        .then(result => {
            if(!result) return res.json({ msg: '删除失败!'})
            return res.json({msg: '没找到对应的信息'})
        })
        .catch(err => console.log(err))
})


module.exports = router