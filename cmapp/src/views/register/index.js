import React from 'react'

import Logo from '../../component/logo/index'
import { Toast, List, InputItem, WingBlank, WhiteSpace, Button, Radio, Flex } from 'antd-mobile';

import { connect } from 'react-redux'
import { register } from '../../store/user'
import { Redirect } from 'react-router-dom'


@connect(
    state => state.user,
    { register }
)
class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }

    login() {
        this.props.history.push('/login')
    }
    register() {
        this.props.register(this.state)
        if (this.props.msg) {
            Toast.fail(this.props.msg, 1);
        }
    }
    handleChangeVal(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const RadioItem = Radio.RadioItem;


        return (
            <div>
                {this.props.isDirectTo ? <Redirect to={this.props.isDirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <h2>注册页面</h2>
                    <InputItem onChange={v => this.handleChangeVal('user', v)}>用户</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        placeholder="密码必须包含数字和字母"
                        value={this.state.pwd}
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={v => this.handleChangeVal('pwd', v)}
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' placeholder="确认密码" onChange={v => this.handleChangeVal('repeatpwd', v)}>确认密码</InputItem>
                    <WhiteSpace />
                    <List>
                        <RadioItem onChange={() => this.handleChangeVal('type', 'genius')} checked={this.state.type === 'genius'}>牛人</RadioItem>
                        <WhiteSpace />
                        <RadioItem onChange={() => this.handleChangeVal('type', 'boss')} checked={this.state.type === 'boss'}>BOSS</RadioItem>
                    </List>

                    {/* <Flex style={{ padding: '15px' }}>
                        <Flex.Item style={{ padding: '15px 0', color: '#888', flex: 'none' }}>Radio demo(dustomized style)</Flex.Item>
                        <Flex.Item>
                            <Radio className="my-radio" onChange={e => console.log('checkbox', e)}>Agree</Radio>
                        </Flex.Item>
                    </Flex> */}
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.login}>已有账号，去登陆</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register