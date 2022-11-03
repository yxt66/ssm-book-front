import { reqqueryBookList ,reqdelBook, reqaddBook, requpdataBook} from "@/api/book/book";

const state = {

};
const mutations = {
  GETBOOKLIST(state,bookList){
    state.bookList=bookList;
  },
  GETTOTAL(state,total){
    state.total=total
  }
};
const actions = {
  async queryBookList({ commit }, data) {
    let result = await reqqueryBookList(data);
    if(result.code == 200){
      commit("GETBOOKLIST",result.data.rows);
      commit("GETTOTAL",result.data.total);
      console.log(result.data.rows)
    };
   
  },
  async delBook({commit},data){
    let result = await reqdelBook(data);
    console.log(data)
    console.log(result)
    if(result.status == 200){
      return {"code":200}
    }
  },
  async updateBook({commit},data){
    let result = await requpdataBook(data);
    if(result.status == 200){
      return {"code":200}
    }
  },
  async queryBook({commit},data){
    let result = await reqqueryBookList(data);
    console.log(result)
    console.log(result.data.rows)
    commit("GETBOOK",result.data.rows);
    }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
