const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chart'

mongoose.connect(DB_URL,{ useNewUrlParser: true });
mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
})


const models = {
	user:{
		'user':{type:String, 'require':true},
		'pwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		//头像
		'avatar':{'type':String},
		// 个人简介或者职位简介
		'desc':{'type':String},
		// 职位名
		'title':{'type':String},
		// 如果你是boss 还有两个字段
		'company':{'type':String},
		'money':{'type':String}
	},
	chat:{
		'chatid':{'type':String,'require':true},
		'read':{'type':Boolean,default:false},
		'from':{type:String, 'require':true},
		'to':{type:String, 'require':true},
		'content':{type:String, 'require':true,default:''},
		'create_time':{'type':Number,default:new Date().getTime()}
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}


