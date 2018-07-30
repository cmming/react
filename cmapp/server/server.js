const express = require('express')
// const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParase = require('cookie-parser');

const UserRouter = require('./user')


//创建数据库连接
// const DB_URL = 'mongodb://127.0.0.1:27017/imooc'

// mongoose.connect(DB_URL,{ useNewUrlParser: true });
// mongoose.connection.on('connected',function(){
//     console.log('mongo connect success')
// })

// //创建数据库的模型
// const User = mongoose.model('user',new mongoose.Schema({
//     user:{type:String,require:true},
//     age:{type:Number,require:true}
// }))

//添加数据
// User.create({
//     user:'xiaoming123',
//     age:16
// },(err,doc)=>{
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })
//修改 update

// User.update({'user':'xiaohua'},{'$set':{age:26}},function(err,doc){
//     console.log(doc)
// })

// // 删除
// User.remove({'user':'xiaohua1'},function(err,doc){
//     console.log(doc)
// })


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());
app.use(cookieParase());

app.use('/user', UserRouter)

// app.get('/', (req, res) => {
//     res.send('<h1>chmi</h1>')
// })

// app.get('/json',(req,res)=>{
//     // User.find({},(err,doc)=>{
//     //     res.json(doc)
//     // })
//     res.json({user:'陈明',age:'25'})
// })

app.listen(9094, () => {
    console.log('node app start port 9094')
})