import React from 'react'

import { connect } from 'react-redux'

import App from '../App';
import { logout,getUserData } from '../store/Auth.redux'

import { Button } from '../../node_modules/antd-mobile';
import { Route, Link, Switch,Redirect } from 'react-router-dom'

function pageOne() { return <h2>页面2</h2> }
function pageTwo() { return <h2>页面3</h2> }


// 获取所有组件参数
class TestRouter extends React.Component {
    render() {
        console.log(this.props)
        return <h2>当前url{this.props.location.pathname}</h2>
    }
}

@connect(
    state => state.auth,
    { logout,getUserData }
)
class Dashboard extends React.Component {
    render() {
        const matchUrl = this.props.match.path
        console.log(matchUrl)
        const redirectToLogin = <Redirect to='/login'></Redirect>
        const app = (
            <div>
                <ul>
                    <li> <Link to={`${matchUrl}`}>主页</Link> </li>
                    <li> <Link to={`${matchUrl}\/two`}>2页面</Link> </li>
                    <li> <Link to={`${matchUrl}/thi`}>3页面</Link> </li>
                    <li> <Link to={`${matchUrl}/test`}>3页面</Link> </li>
                    <Button onClick={this.props.logout}>退出登陆</Button>
                    <Button onClick={this.props.getUserData}>获取用户数据</Button>
                </ul>
                <Switch>
                    {/* 只会render命中的第一个路由 */}
                    <Route path={`${matchUrl}`} exact component={App}></Route>
                    <Route path={`${matchUrl}/two`} component={pageOne}></Route>
                    <Route path={`${matchUrl}/thi`} component={pageTwo}></Route>
                    <Route path="/Dashboard/:params" component={TestRouter}></Route>
                </Switch>

                {/* <App /> */}
            </div>
        )
        return this.props.isAuth ? app : redirectToLogin
    }
}


export default Dashboard