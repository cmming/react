import React from 'react';

import { Button, List } from 'antd-mobile';

import { connect } from 'react-redux'
import { addNum, addNumAnsy } from './react.redux'

import './redux'

// const mapStatetoProps = (state) => {
//   return { num: state }
// }

// const actionCreators = { addNum, addNumAnsy }

// App = connect(mapStatetoProps, actionCreators)(App)
@connect(
  state => ({ num: state.counter,auth:state.auth }), { addNum, addNumAnsy }
)
class App extends React.Component {
  render() {
    const name = 'chmi'
    return (
      <div>
        <h2>hello,{this.props.auth.user}!</h2>
        <Button onClick={this.props.addNum}>添加</Button>
        <Button onClick={this.props.addNumAnsy}>延迟添加</Button>
        <h2>数字为：{this.props.num}</h2>
        <Age age="26"></Age>
        <Demof age1="33"></Demof>
        <Likes></Likes>
        <Reduxdemo></Reduxdemo>
      </div>
    )
  }
}

// 组件的首字母必须为 大写字母
class Age extends React.Component {
  render() {
    return <h2>age:{this.props.age}</h2>
  }
}

function Demof(props) {
  return <h2>age:{props.age1}</h2>
}

class Likes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: ['music', 'movie']
    }
  }
  addItem() {
    return this.setState({ items: [...this.state.items, '12' + Math.random()] })
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.addItem()}> 添加</Button>
        {/* <button onClick = {this.addItem}> 添加</button> */}
        <List
          renderHeader={() => { '爱好' }}
        >
          {this.state.items.map((v, k) => {
            return <List.Item key={k}>{v}</List.Item>
          })}
        </List>
      </div>
    )
  }
}

// 使用redux 的组件

class Reduxdemo extends React.Component {
  render() {
    const store = this.props
    console.log(store)
    // const num = store.getState()
    return <h1>1</h1>
  }
}

export default App;
