import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userData } from '../../store/user'

import { userInfo } from '../../api/user'

@withRouter
@connect(
    state => state.user,
    { userData }
)
class AuthRoute extends React.Component {

    componentDidMount() {


        // this.props.getUserData()

        userInfo().then(res => {
            if (res.data.code !== 0) {
                const pathname = this.props.location.pathname
                const whiteList = ['/login', '/register']

                if (whiteList.indexOf(pathname) > -1) {
                    this.props.history.push(pathname)
                    // return null
                }
                
            } else {
                this.props.userData(res.data.data)
                this.props.history.push('/' + this.props.type + 'info')
            }
        })


    }
    //是否登陆
    //现在的url 是否为login
    // if(){}
    //用户的type
    //用户是否完善个人信息
    render() {
        return null
    }
}

export default AuthRoute
