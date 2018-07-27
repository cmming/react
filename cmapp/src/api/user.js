import request from './request'

export function getUserInfoApi() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}