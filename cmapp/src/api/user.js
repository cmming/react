import request from './request'


export function userRegister(data) {
    console.log(data)
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}
export function userLogin(data) {
    console.log(data)
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function userInfo(data) {
    console.log(data)
    return request({
        url: '/user/info',
        method: 'get'
    })
}

export function userDataUpdate(data) {
    console.log(data)
    return request({
        url: '/user/update',
        method: 'post'
    })
}
