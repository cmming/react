import React, { Component } from 'react'

import AvatarSelector from '../../component/avatarSelector/index'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { updateInfo } from '../../store/user'
import { Redirect } from 'react-router-dom'



@connect(
    state => state.user,
    { updateInfo }
)
export default class Geniusinfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: '',
            title: '',
            desc: ''
        }
        this.save = this.save.bind(this)
    }
    handleChangeVal(key, val) {
        this.setState({
            [key]: val
        })
    }
    save() {
        this.props.updateInfo(this.state)
    }
    render() {
        return (
            <div>
                {this.props.isDirectTo ? <Redirect to={this.props.isDirectTo} /> : null}
                <NavBar mode='dark'>牛人完善信息页</NavBar>
                <AvatarSelector selectAvatar={(imgName => {
                    this.setState({
                        avatar: imgName
                    })
                })}></AvatarSelector>
                <InputItem onChange={v => this.handleChangeVal('title', v)}>求职岗位</InputItem>
                <TextareaItem title="个人介绍" rows={3} autoHeight onChange={v => this.handleChangeVal('desc', v)}></TextareaItem>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}