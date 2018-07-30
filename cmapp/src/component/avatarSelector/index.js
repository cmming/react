import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'

export default class AvatarSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const avatatImgs = ['boy', 'bull', 'chick'].map(v => ({
            icon: require(`./img/${v}.png`),
            text: v
        }))

        const gridHeader = this.state.icon ?
            (<div>
                <span>已选择图片</span>
                <img style={{ width: 20 }} src={this.state.icon} alt="" />
            </div>) : (<div>
                <span>请选择图片</span>
            </div>)

        return (
            <div>
                <List renderHeader={()=>
                    gridHeader
                }>
                    <Grid data={avatatImgs} columnNum="5" onClick={(elm) => {
                        this.setState(elm)
                        this.props.selectAvatar(elm.text)
                    }}></Grid>
                    avatarSelector
                </List>
            </div>
        )
    }
}
