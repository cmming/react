import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'


@connect(
    state => state
)
export default class Msg extends Component {

    render() {
        const userid = this.props.user._id
        const Item = List.Item
        const Brief = Item.Brief;
        const msgGroup = {}
        const allUser = this.props.chat.users
        console.log(this.props)
        if (this.props.chat.chatmsg.length) {
            this.props.chat.chatmsg.forEach(v => {
                msgGroup[v.chatid] = msgGroup[v.chatid] || []
                msgGroup[v.chatid].push(v)
            });
            console.log(msgGroup, Object.values(msgGroup))

        }
        const chartList = Object.values(msgGroup)
        console.log(chartList)

        return (
            chartList.length ? (<div>
                <List>
                    {chartList.map(v => {
                        var LastItem = v[v.length - 1]
                        const lastUserIdKey = LastItem.from === userid ? LastItem.to : LastItem.from
                        const unReadNum = v.filter(v => !v.read && v.to === userid).length
                        console.log(lastUserIdKey, allUser)
                        return ((
                            <Item
                                extra={<Badge text={unReadNum}></Badge>}
                                thumb={require(`../img/${allUser[lastUserIdKey].avatar}.png`)}
                                key={v[v.length - 1]._id}
                            >
                                {LastItem.content}

                                <Brief>{allUser[lastUserIdKey].name}</Brief>
                            </Item>
                        ))
                    }
                    )}
                </List>
            </div>) : null

        )
    }
}
