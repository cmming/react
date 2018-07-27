import { getUserInfoApi } from '../api/user'

const GET_USER_INFO = 'GET_USER_INFO'

const initState = { isAuth: false, user: '未知用户', code: '' }


export function auth(state = initState, action) {
    switch (action.type) {
        case GET_USER_INFO:
            return { ...state, user: action.payload.user }
        default:
            return state
    }
}

export function getUserData() {
    return dispatch => {
        getUserInfoApi().then(res => {
            dispatch(userData(res.data))
        })
    }

    // return new Promise((resolve, reject) => {
    //     dispatch => {
    //         getUserInfoApi().then(res => {
    //             dispatch(userData(res.data))
    //             resolve()
    //         })
    //     }
    // })


}

export function userData(data) {
    return { type: GET_USER_INFO, payload: data }
}
