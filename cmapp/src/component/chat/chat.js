import React, { Component } from 'react'
import io from 'socket.io-client'
import { InputItem, List } from 'antd-mobile'
const scoket = io('ws://localhost:9093')

export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '', msg: [] }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        scoket.on('recmsg', (data) => {
            console.log(data)
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })

    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleSubmit() {
        console.log(this.state.text)
        scoket.emit('sendmsg', { text: this.state.text })
        this.setState({ text: '' })
    }
    render() {
        return (
            <div>
                {this.state.msg.map((v, k) => {
                    return <p key={k}>{v}</p>
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
