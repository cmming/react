const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const _filter = { pwd: 0 }

Router.get('/info', function (req, res) {
    const user_id = req.cookies.userid
    console.log(user_id)
    if (!user_id) {
        return res.json({ code: 1, msg: '用户没有登陆' })
    }
    
    User.findOne({ _id: user_id }, _filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '用户不存在请重新登陆' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
})

// 注册功能
Router.post('/register', function (req, res) {
    console.log(req.body)
    const { user, pwd, repeatpwd, type } = req.body
    console.log(user)
    User.findOne({ user }, (err, doc) => {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' })
        }
        UserModel = new User({ user, pwd: md5Pwd(pwd), type })

        UserModel.save(((e,d)=>{
            if(e){
                return res.json({code:1,msg:'注册失败'})
            }
            const {user,type,_id} = d
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        }))
        // User.create({ user, pwd: md5Pwd(pwd), type }, (e, d) => {
        //     if (e) {
        //         return res.json({ code: 1, msg: '用户创建失败' })
        //     }
        //     return res.json({ code: 0 })
        // })
    })

})

Router.post('/login', function (req, res) {
    const { user, pwd } = req.body
    // User.remove({},function(e,d){})
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或密码错误' })
        }
        res.cookie('userid', doc._id)
        console.log(doc)
        return res.json({ code: 0, data: doc })
    })
})

Router.get('/list', function (req, res) {
    // User.remove({},function(e,d){})
    User.find({}, (err, doc) => {
        return res.json(doc)
    })
})

function md5Pwd(pwd) {
    const salt = '!@#qwe!@#chmikey'

    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router 