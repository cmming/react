import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal, Toast } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'



@connect(
    state => state.user,
    { logoutSubmit }
)
export default class User extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        const alert = Modal.alert;
        // browserCookie.erase('userid');
        alert('Delete', '确认退出吗？', [
            { text: '取消', onPress: () => Toast.info('取消退出', 1) },
            {
                text: '确认', onPress: () => {
                    browserCookie.erase('userid')
                    Toast.info('退出成功', 1)
                    window.location.href = window.location.href
                    this.props.logoutSubmit()
                }
            },
        ])
        console.log('logout')
    }
    render() {
        const Item = List.Item;
        const Brief = Item.Brief;

        return this.props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${this.props.avatar}.png`)} alt="" />}
                    title={this.props.user}
                    message={this.props.type === 'boss' ? this.props.company : null}
                />
                <List
                    renderHeader={() => '简介'}
                >
                    <Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {this.props.mony ? <Brief>薪资：{this.props.mony}</Brief> : null}
                    </Item>
                </List>
                <p>用户中心</p>

                <WhiteSpace></WhiteSpace>

                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={this.props.redirectTo}></Redirect>
    }
}
