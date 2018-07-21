import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'


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


ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
        <App></App>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
registerServiceWorker();