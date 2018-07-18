import {createStore} from 'redux'


function counter(state = 0,action){
    switch(action.type){
        case'add':
        return state+1
        case 'del':
        return state-1
        default:
        return 10;
    }
}

const store = createStore(counter)


const init = store.getState()

console.log(init)

store.dispatch({type:'add'})

console.log(store.getState())

store.dispatch({type:'add'})

console.log(store.getState())

store.dispatch({type:'del'})

console.log(store.getState())


// 添加时间订阅

function listener(){
    const curent = store.getState()

    console.log(`当前值为${curent}`)
}

store.subscribe(listener)

store.dispatch({type:'add'})

console.log(store.getState())

store.dispatch({type:'add'})

console.log(store.getState())

store.dispatch({type:'del'})

console.log(store.getState())