import request from './request'

export function getUserDataApi(){
    return request({
        url:'json',
        method: 'get'
    })
}