import React from 'react'

import Logo from '../../component/logo/index'

import {  InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }
    register() {
        this.props.history.push('/register')
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <h2 >登陆页面</h2>
                <WingBlank>
                    <InputItem>用户</InputItem>
                    <WhiteSpace />
                    <InputItem>密码</InputItem>

                    <WhiteSpace />
                    <Button type="primary">登陆</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>

            </div>
        )
    }
}

export default Login