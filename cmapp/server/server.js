const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const model = require('./model')
const Chat = model.getModel('chat')

const io = require('socket.io')(server)
io.on('connection', function (client) {
	// client.on('event', function (data) { });
	// client.on('disconnect', function () { });
	client.on('sendmsg', (data) => {
		console.log(data)
		const { from, to, msg } = data
		const chatid = [from, to].sort().join('_')
		Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
			console.log(data)
			// io.emit('recmsg', data)
			io.emit('recmsg', Object.assign({}, doc._doc))
		})

	})
});

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
server.listen(9093, function () {
	console.log('Node app start at port 9093')
})



