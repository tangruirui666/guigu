// 能发送异步ajax请求的函数模块，封装axios库，函数的返回值是promise对象
import axios from "axios";
import {message} from 'antd';
export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    //发送异步请求
    if (type === "GET") {
      //发get请求
      promise = axios.get(url, {
        //配置对象
        params: data //指定请求参数
      });
    } else {
      //发post请求
      promise = axios.post(url, data);
    }
    //请求成功的回调
    promise.then(response=>{
      resolve(response.data)
      //请求失败的回调
    }).catch(error=>{
      message.error('请求失败了'+error.message)
    })
  });
}
