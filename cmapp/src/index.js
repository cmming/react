import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore} from 'redux'
import {counter} from './react.redux'

const store = createStore(counter)
 
// function render() {
//     ReactDOM.render(<App store={store}/>, document.getElementById('root'));
// }
ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();

// render();

store.subscribe(()=>{
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
})
