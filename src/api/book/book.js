//图书管理模块API

import requests from '../ajax.js';
export const reqUserLogin = (data)=>requests({url:'/queryUser',data,method:'post'});
export const reqqueryUserList = (data)=>requests({url:'/queryUserList',data,method:'post'});

export const reqDelUser = (data) => requests({url:'/delUserById',data,method:'post'})
export const reqqueryBookList=(data) => requests({url:'/queryBookList',data,method:'post'})
export const requpdateUserByName =(data) => requests({url:'/updateUserByName',data,method:'post'})
export const reqdelBook = (data) => requests({url:'/delBook',data,method:'post'})

export const reqqueryBook = (data) =>requests({url:'/queryBookList',data,method:'post'})

export const reqAddBookOrUpdata = (data)=>{
    if(data.id){
        return requests({url:'/updateBook',data,method:'post'})
    }else {
        return requests({url:'/addBook',data,method:'post'})
    }
}
export const reqAddOrEditUser = (data) => {
    if(data.id){
        return requests({url:'/updateUserById',data,method:'post'})
    }else {
        return requests({url:'/addUser',data,method:'post'});
    }
}
//读者借阅记录
export const reqqueryReaderRecord =(data) =>requests({url:'/queryReaderRecord',data,method:'post'})
//读者续费
export const requpdateStates = (data)=> requests({url:'/updateStates',data,method:'post'})
//读者归还书籍
export const reqreturnBook = (data) => requests({url:'/returnBook',data,method:'post'})
//查询用户借阅记录
export const reqqueryRecord =(data) => requests({url:'/queryRecord',data,method:'post'})
//删除用户借阅记录
export const reqdeleteRecord = (data) => requests({url:'/deleteRecord',data,method:'post'})
//读者借书
export const reqborBook = (data) => requests({url:'/borBook',data,method:'post'})
//读者列表
export const reqselectMember = data => requests({url:'/selectMember',data,method:'post'})