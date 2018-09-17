import React, { Component } from 'react'
// import io from 'socket.io-client'
import { InputItem, List, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendmsg, recvMsg } from '../../redux/chat.redux'
// const scoket = io('ws://localhost:9093')

@connect(
    state => state,
    { getMsgList, sendmsg, recvMsg }
)
export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '', msg: [] }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        if (this.props.chat.chatmsg.length == 0) {
            this.props.getMsgList()
            this.props.recvMsg()
        }

        // scoket.on('recmsg', (data) => {
        //     console.log(data)
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })

    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleSubmit() {
        // console.log(this.state.text)
        // scoket.emit('sendmsg', { text: this.state.text })
        // this.setState({ text: '' })
        //发送消息
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendmsg({ from, to, msg })
        this.setState({ text: '' })
    }
    render() {
        const userid = this.props.match.params.user
        const Item = List.Item
        console.log(userid, this.props.chat.users)
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        return (
            <div className="chat-page">
                <NavBar mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[userid]['name']}
                </NavBar>
                {this.props.chat.chatmsg.map((v, k) => {
                    console.log(v.from)
                    var avatarImg = require(`../img/${users[v.from].avatar}.png`)
                    var html = v.from == userid ? '' : 'chat-me'
                    var avatar = v.from == userid ? '' : avatarImg
                    if (v.from !== userid) {
                        return <List key={k}>
                            <Item extra={<img src={avatar} />} className={html}>{v.content}</Item>
                        </List>
                    } else {
                        return <List key={k}>
                            <Item thumb={avatarImg} className={html}>{v.content}</Item>
                        </List>
                    }

                    //  <p key={k}>{html}{v.content}?</p>
                })}
                <div className='fix-bottom'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => this.handleChange('text', v)}
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                        >信息</InputItem>
                    </List>
                </div>
            </div>

        )
    }
}
