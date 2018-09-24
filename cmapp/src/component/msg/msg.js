import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
import { getMsgList, sendmsg, recvMsg, readMsg } from '../../redux/chat.redux'


@connect(
    state => state,
    { getMsgList, sendmsg, recvMsg, readMsg }
)
export default class Msg extends Component {

    render() {
        const userid = this.props.user._id
        const Item = List.Item
        const Brief = Item.Brief;
        const msgGroup = {}
        const allUser = this.props.chat.users
        if (this.props.chat.chatmsg.length) {
            this.props.chat.chatmsg.forEach(v => {
                msgGroup[v.chatid] = msgGroup[v.chatid] || []
                msgGroup[v.chatid].push(v)
            });
            console.log(msgGroup, Object.values(msgGroup))

        }
        const chartList = Object.values(msgGroup).sort((a, b) => {
            var a_last = a[a.length - 1].create_time
            var b_last = b[b.length - 1].create_time
            console.log(a_last, b_last)
            return b_last - a_last
        })
        console.log(chartList)

        return (
            chartList.length ? (<div>
                <List>
                    {chartList.map(v => {
                        var LastItem = v[v.length - 1]
                        const lastUserIdKey = LastItem.from === userid ? LastItem.to : LastItem.from
                        const unReadNum = v.filter(vi => (!vi.read) && (vi.to === userid)).length
                        console.log(v.filter(vi => (!vi.read) && (vi.to === userid)))
                        return ((
                            <Item
                                extra={<Badge text={unReadNum}></Badge>}
                                thumb={require(`../img/${allUser[lastUserIdKey].avatar}.png`)}
                                key={v[v.length - 1]._id}
                                arrow={'horizontal'}
                                onClick={() => {
                                    this.props.history.push(`/chat/${lastUserIdKey}`)
                                }}
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
