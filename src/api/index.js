//包含应用中所有接口请求函数的模块，每个函数的返回值都是promise
import ajax from "./ajax";
// import jsonp from "jsonp";
// import {message} from 'antd';
//登录接口
// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }
const BASE = "";
//登录接口
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");
//获取一级或某个二级分类列表
export const reqCategory=(parentId)=>ajax(BASE+'/manage/category/list',{parentId})
//添加分类
export const addCategory=(parentId,categoryName)=>ajax(BASE+'/manage/category/add',{parentId,categoryName},"POST")
//根据分类ID获取分类
export const getCategoryById=(categoryId)=>ajax(BASE+'/manage/category/info',{categoryId})
//更新商品分类
export const updateCategory=({categoryId,categoryName})=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},"POST")