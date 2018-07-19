import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// compose 函数合并
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { counter } from './react.redux'
// import { addNum, addNumAnsy } from './react.redux'

import { Provider } from 'react-redux'


import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'


// 配合浏览器的插件使用
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => { }
))

// function render() {
//     ReactDOM.render(<App store={store}/>, document.getElementById('root'));
// }
// ReactDOM.render(<App store={store} addNum={addNum} addNumAnsy={addNumAnsy} />, document.getElementById('root'));
// registerServiceWorker();

// render();
// 添加事件订阅
// store.subscribe(()=>{
//     ReactDOM.render(<App store={store} addNum={addNum} addNumAnsy={addNumAnsy} />, document.getElementById('root'));
// })

function pageOne() { return <h2>页面2</h2> }
function pageTwo() { return <h2>页面3</h2> }



// 获取所有组件参数
class TestRouter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)
        return <h2>当前url{this.props.location.pathname}</h2>
    }
}


ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <ul>
                    <li> <Link to='/' >主页</Link> </li>
                    <li> <Link to='/two'>2页面</Link> </li>
                    <li> <Link to='/thi'>3页面</Link> </li>
                    <li> <Link to='/test'>3页面</Link> </li>
                </ul>
                <Switch>
                    {/* 只会render命中的第一个路由 */}
                    <Route path="/" exact component={App}></Route>
                    <Route path="/two" component={pageOne}></Route>
                    <Route path="/thi" component={pageTwo}></Route>
                    <Route path="/:params" component={TestRouter}></Route>
                </Switch>

                {/* <App /> */}
            </div>

        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
registerServiceWorker();