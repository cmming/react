import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import Dashboard from './views/Dashboard'
import Auth from './views/Auth'
import registerServiceWorker from './registerServiceWorker';
// compose 函数合并
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './store/reducers'

import { Provider } from 'react-redux'


import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'


// 配合浏览器的插件使用
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => { }
))

console.log(store.getState())

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    {/* 只会render命中的第一个路由 */}
                    <Route path="/login" exact component={Auth}></Route>
                    <Route path="/Dashboard" component={Dashboard}></Route>
                    <Redirect to="/login"></Redirect>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
registerServiceWorker();