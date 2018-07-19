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


ReactDOM.render(
    (<Provider>
        <App store={store} />
    </Provider>),
    document.getElementById('root'));
registerServiceWorker();