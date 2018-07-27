import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getUserData } from '../../store/user'

import { getUserInfoApi } from '../../api/user'

@withRouter
@connect(
    state => state.auth,
    { getUserData }
)
class AuthRoute extends React.Component {

    componentDidMount() {
        const pathname = this.props.location.pathname
        const whiteList = ['/login', '/register']
        if (whiteList.indexOf(pathname) > -1) {
            return null
        }

        // this.props.getUserData()

        getUserInfoApi().then(res => {
            if (res.data.code !== 200) {
                this.props.history.push('/login')
            }
        })

        // .then(res=>{
        //     console.log(this.props)
        // })


    }
    //是否登陆
    //现在的url 是否为login
    // if(){}
    //用户的type
    //用户是否完善个人信息
    render() {
        return (
            <div>
                判断跳转 11{this.props.code}
            </div>
        )
    }
}

export default AuthRoute
