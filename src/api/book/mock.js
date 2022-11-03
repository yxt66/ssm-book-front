//mock API
import mockRequests from '../mock.js'
export const reqGetBookType=()=>mockRequests.get('/booktype')
export const reqGetBorrow=()=>mockRequests.get('/borrow')
export const reqGerReader=()=>mockRequests.get('/reader')
//mock user API

export const reqUserLogin=(data)=> mockRequests({url:'/queryUser',data,method:'post'})
export const reqgetUserInfo=(data)=> mockRequests({url:'/getUserInfo',data,method:'post'})
