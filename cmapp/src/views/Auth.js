import React from 'react'


import { connect } from 'react-redux'

import { login,getUserData} from '../store/Auth.redux'
import { Button } from '../../node_modules/antd-mobile';
import { Redirect } from 'react-router-dom'

@connect(
    state => state.auth,
    { login,getUserData }
)
class Auth extends React.Component {
    componentDidMount(){
        // this.props.getUserData()
    }

    render() {
        const redirectDashboard = <Redirect to='/Dashboard'></Redirect>
        const app = (
            <div>
                <h2>没有登陆！</h2>
                <Button onClick={this.props.login}>登陆</Button>
            </div>
        )
        return this.props.isAuth ? redirectDashboard : app
    }
}


export default Auth