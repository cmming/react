import React from 'react';
import ReactDOM from 'react-dom';


import registerServiceWorker from './registerServiceWorker';
// compose 函数合并
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './store/reducers'

import { Provider } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'


import login from './views/login'
import Register from './views/register'
import AuthRoute from './component/authroute/index'
import './style/style.css'
import Bossinfo from './views/bossinfo/index'
import Switch from '../node_modules/_react-router-dom@4.3.1@react-router-dom/Switch';


// 配合浏览器的插件使用
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => { }
))

function boss() {
    return (
        <h2>boss</h2>
    )
}

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/bossinfo" component={Bossinfo}></Route>
                    <Route path="/login" component={login}></Route>
                    <Route path="/register" component={Register}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
registerServiceWorker();