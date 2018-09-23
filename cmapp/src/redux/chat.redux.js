import axios from 'axios'
import io from 'socket.io-client'
const scoket = io('ws://localhost:9093')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'


const initState = {
    chatmsg: [],
    unread: 0,
    users: {}
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, chatmsg: action.payload.msgs, users: action.payload.users, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length }
        case MSG_RECV:
            const n = action.userid === action.payload.to ? 1 : 0
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n }
        // case MSG_READ:
        default:
            return state
    }
}

function msgList(msgs, users, userid) {
    return { 'type': 'MSG_LIST', payload: { msgs, users, userid } }
}

function msgRecv(msgs, userid) {
    return { 'type': 'MSG_RECV', payload: msgs, userid }
}


export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsgs')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}

export function sendmsg({ from, to, msg }) {
    return dispatch => {
        scoket.emit('sendmsg', { from, to, msg })
    }
}

export function recvMsg() {
    return (dispatch, getState) => {
        scoket.on('recmsg', (data) => {
            console.log(data)
            // this.setState({
            //     msg: [...this.state.msg, data.text]
            // })
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}