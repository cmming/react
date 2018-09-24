import React, { Component } from 'react'
// import io from 'socket.io-client'
import { InputItem, List, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendmsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util';
// const scoket = io('ws://localhost:9093')

@connect(
    state => state,
    { getMsgList, sendmsg, recvMsg, readMsg }
)
export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '', msg: [], isShowEmoji: false }
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
    componentWillUnmount() {
        var from = this.props.match.params.user
        this.props.readMsg(from)
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
    fixCarousel() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        })
    }
    render() {
        var emoji = '👣 👀 👂 👃 👅 👄 💋 👓 👔 👕 👖 👗 👘 👙 👚 👛 👜 👝 🎒 💼 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💅 💍 🌂 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠 😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😇 😐 😑 😶 😏 😣 😥 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠'.split(' ').map(v => ({ text: v }))
        const userid = this.props.match.params.user
        const Item = List.Item
        console.log(userid, this.props.chat.users)
        const chatId = getChatId(userid, this.props.user._id)
        const chatMsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatId)
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
                {chatMsgs.map((v, k) => {
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
                            extra={<div>
                                <span style={{ marginRight: 15 }} onClick={() => {
                                    this.setState({ isShowEmoji: !this.state.isShowEmoji })
                                    this.fixCarousel()
                                }}>😀
                                </span>
                                <span onClick={() => this.handleSubmit()}>发送</span>
                            </div>}
                        >

                        </InputItem>
                    </List>
                    {this.state.isShowEmoji ? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(el) => {
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                    /> : null}

                </div>
            </div>

        )
    }
}
