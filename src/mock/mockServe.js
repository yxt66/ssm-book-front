import Mock from 'mockjs'

import booktype from './booktype.json'
import borrow from './borrow.json'
import reader from './reader.json'
Mock.mock('/mock/booktype', { code: 200, data: booktype })
Mock.mock('/mock/borrow', { code: 200, data: borrow })
Mock.mock('/mock/reader', { code: 200, data: reader })

// mock  user
const userInfo = {
    userName: 'admin',
    password: '123456',
    userName1:'editor',
    meta: {
        code: '200',
        message: '操作成功',
        roles: 'admin',
        token: 'admin'
    },
    meta1: {
        code: '200',
        message: '操作成功',
        roles: 'editor',
        token: 'editor'
    },
    error: {
        code: '201',
        message: '失败'
    }
};
const tokens = {
    roles1:{
        token: 'admin',
        userInfo: {
            userName: 'admin',
            roles: 'admin',
        }
    },
    roles2:{
        token: 'editor',
        userInfo: {
            userName: 'editor',
            roles: 'editor',
        }
    }
   
}
Mock.mock('/mock/queryUser', req => {
    // const { username, password } = JSON.parse(req.body);
    console.log(req);
    console.log(req.body)
    //得把req.body解析成json才能解构出值来
    // const {userName} = req.body;
    const { userName, password } = JSON.parse(req.body);
    if (userName == userInfo.userName && password == userInfo.password) {
        return userInfo.meta;
    } else if (userName == userInfo.userName1 && password == userInfo.password){
        return userInfo.meta1;
    }
    else {
        return userInfo.error
    }
})
Mock.mock('/mock/getUserInfo', req => {
    console.log(req)
    console.log(req.body)
    //得把req.body解析成json才能解构出值来
   
    if(req.body == tokens.roles1.token){
      return {code:'200',userInfo:tokens.roles1.userInfo}
    }else if (req.body == tokens.roles2.token){
      return {code:'200',userInfo:tokens.roles2.userInfo}
    }
    else {
        // return {data:'201',userInfo:''}
        return {code:'201',userInfo:''}
    }

})