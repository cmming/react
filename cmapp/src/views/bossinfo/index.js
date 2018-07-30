import React, { Component } from 'react'

import AvatarSelector from '../../component/avatarSelector/index'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { updateInfo } from '../../store/user'



@connect(
    state => state.user,
    { updateInfo }
)
export default class Bossinfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarImg: '',
            title: '',
            company: '',
            money: '',
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
                <NavBar mode='dark'>BOSS完善信息页</NavBar>
                <AvatarSelector selectAvatar={(imgName => {
                    this.setState({
                        avatarImg: imgName
                    })
                })}></AvatarSelector>
                <InputItem onChange={v => this.handleChangeVal('title', v)}>职位</InputItem>
                <InputItem onChange={v => this.handleChangeVal('company', v)}>公司名称</InputItem>
                <InputItem onChange={v => this.handleChangeVal('money', v)}>职位薪资</InputItem>
                <TextareaItem title="职位要求" rows={3} autoHeight onChange={v => this.handleChangeVal('desc', v)}></TextareaItem>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}