//包含应用中所有接口请求函数的模块，每个函数的返回值都是promise
import ajax from "./ajax";
// import jsonp from "jsonp";
// import {message} from 'antd';
//登录接口
// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }
const BASE = "";
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");
