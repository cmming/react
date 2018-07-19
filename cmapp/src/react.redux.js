const ADD_NUM = '加数字'
const DEL_NUM = '减数字'


// reducer
export function counter(state = 0,action){
    switch(action.type){
        case'加数字':
        return state+1
        case'加数字':
        return state+1
        case '减数字':
        return state-1
        default:
        return 10;
    }
}


// action creator
export function addNum(){
    return {type:ADD_NUM}
}

export function delNum(){
    return {type:DEL_NUM}
}

export function addNumAnsy(){
    return dispatch=>{
        setTimeout(()=>{
            dispatch(addNum())
        },2000)
    } 
}