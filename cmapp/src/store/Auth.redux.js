import { getUserDataApi } from '../api/user'
// 登陆页面的权限验证
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const GETUSER_DATA = 'GETUSER_DATA'


const initState = { isAuth: false, user: '未知用户' }

export function auth(state = initState, action) {
    console.log(state, action)
    switch (action.type) {
        case LOGIN:
            return { ...state, isAuth: true }
        case LOGOUT:
            return { ...state, isAuth: false }
        case GETUSER_DATA:
            return { ...state, user:action.payload.user}
        default:
            return state
    }
}


export function getUserData() {
    return dispatch => {
        getUserDataApi().then(res => {
            dispatch(userData(res.data))
        })
    }

}

export function userData(data) {
    return { type: GETUSER_DATA, payload: data }
}

export function login() {
    return { type: LOGIN }
}

export function logout() {
    return { type: LOGOUT }
}