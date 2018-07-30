const mongoose = require('mongoose')

// 创建数据库连接
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chart'

mongoose.connect(DB_URL,{ useNewUrlParser: true });
mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
})

// //创建数据库的模型
// const User = mongoose.model('user',new mongoose.Schema({
//     user:{type:String,require:true},
//     age:{type:Number,require:true}
// }))

const model = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String},
        // 个人简介
        'des':{type:String},
        // 职位
        'title':{type:String},
        // boss  多余的字段
        'company':{type:String},
        'money':{type:String},

    },
    chat:{}
}

// 
for(let m in model){
    mongoose.model(m,new mongoose.Schema(model[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}