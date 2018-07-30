import React from 'react'

import Logo from '../../component/logo/index'

import { Toast, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

import {connect} from 'react-redux'
import { login } from '../../store/user'
import { Redirect } from 'react-router-dom'
import AuthRoute from '../../component/authroute/index'


@connect(
    state => state.user,
    { login }
)
class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
    }
    register() {
        this.props.history.push('/register')
    }
    login() {
        console.log(this.props,this.state)
        this.props.login(this.state)    
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
        return (
            <div>
                <AuthRoute></AuthRoute>
                {this.props.isDirectTo ? <Redirect to={this.props.isDirectTo} /> : null}
                <Logo></Logo>
                <h2 >登陆页面</h2>
                <WingBlank>
                    <InputItem onChange={v => this.handleChangeVal('user', v)}>用户</InputItem>
                    <WhiteSpace />
                    <InputItem onChange={v => this.handleChangeVal('pwd', v)}>密码</InputItem>

                    <WhiteSpace />
                    <Button type="primary" onClick={this.login}>登陆</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>

            </div>
        )
    }
}

export default Login