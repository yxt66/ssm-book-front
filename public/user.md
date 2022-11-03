userLogin(){
    try catch
    const{userName,password} = this;
    await userName&password&&&&this.$store.dispatch('userLogin',{userName,password});
    this.$router.push('/home')
}
const state = {
    token:''
};
const munication = {
    SET_TOKEN(state,token){
        state.token=token
    }
}
const actions = {
    async userLogin({commit},data){
        let result = await requserLogin(data);
        if(result.code == 200){
            commit('SET_TOKEN',result.token);
            return "ok"
        }else {
            return Promise.reject(new Error("faile"))
        }
    }
}
const getters = {
}
//token 获取用户信息
//在组件挂载的时候获取用户信息,this.getUserInfo()
//请求拦截器前配置请求头token
if(store.state.user.token){
    config.headers.token =store.state.user.token }
}
//在header组件通过计算属性 用v-if控制显示和隐藏
computed:{
    userName(){
        return this.$store.state.user.
    }
}
<p v-if="!userName"></p>
<p v-else></p>
//本地持久化TOKEN
localStorage.setItem('TOKEN',result.data.token);
//token.js
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token);
}
封装后调用:setToken(result.token)
state{
    token:localStorage.getItem('TOKEN')
    //封装后调用:引入调用
    token:getToken()
}
封装
export const getToken = () =>{
    return localStorage.getItem('TOKEN')
}
//问题登录了还能去login和getInfo问题在app.vue要登录刷新了才能生效
//退出 想服务器发请求 清除服务器的token
logout(){
    让mutations把用户信息清空
}
封装
export const removeToken = ()=> {
    return localStorage.removeItem('TOKEN')
}