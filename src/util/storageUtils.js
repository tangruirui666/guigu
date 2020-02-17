import store from 'store'
const USER_KEY='user_key'
//不用原生的localStroage，可以用store库，更具兼容性 yarn add store 语法也更加简洁
export default {
    //保存
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user));
    store.set(USER_KEY,user)
    
  },
  //获取
  getUser() {
    //   return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY)||{}
  },
  //删除
  removeUser() {
    //   localStorage.removeItem(USER_KEY)
    return store.remove(USER_KEY)
  }
};
