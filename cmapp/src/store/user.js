import { userInfo, userRegister, userLogin, userDataUpdate } from '../api/user'
import { getRedirectPath } from '../util'

const GET_USER_INFO = 'GET_USER_INFO'
const AUTU_SUCCESS = 'AUTU_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'


const initState = { msg: '', type: '', user: '未知用户', isDirectTo: '' }


export function user(state = initState, action) {
    switch (action.type) {
        case GET_USER_INFO:
            return { ...state, user: action.payload.user, type: action.payload.type }
        case AUTU_SUCCESS:
            return { ...state, msg: '', isDirectTo: getRedirectPath(action.payload), ...action.payload }
        case ERROR_MSG:
            return { ...state, msg: '', msg: action.msg }
        default:
            return state
    }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}


function authSuccess(data) {
    return { type: AUTU_SUCCESS, payload: data }
}

export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd) {
        return errorMsg('用户名或密码必须输入')
    }
    console.log({ user, pwd, repeatpwd, type })
    if (pwd != repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {
        var objRes = { user, pwd, type }
        userRegister({ user, pwd, repeatpwd, type })
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess({ user: res.data.data.user, type: res.data.data.type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }).catch(err => {
                dispatch(errorMsg('请求错误'))
            })
    }
}

export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg('用户名或密码必须输入')
    }
    return dispatch => {
        var objRes = { user, pwd }
        userLogin({ user, pwd })
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess({ user: res.data.data.user, type: res.data.data.type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }).catch(err => {
                dispatch(errorMsg('请求错误'))
            })
    }
}


export function userData(data) {
    console.log(data)
    return { type: GET_USER_INFO, payload: data }
}

export function updateInfo(data) {
    return dispatch => {
        userDataUpdate(data)
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess({ user: res.data.data.user, type: res.data.data.type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }).catch(err => {
                dispatch(errorMsg('请求错误'))
            })
    }
}
