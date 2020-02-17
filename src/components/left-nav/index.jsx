import React,{Component} from 'react';
import './index.less';
//引入图片的方式
import logo from './images/logo.png'
import {Link} from 'react-router-dom'

//左侧导航栏组件
export default class LeftNav extends Component {
    render(){
        return (
            <Link to="/" className="leftnav">
               <header className="leftnav-header">
                   <img src={logo} alt=""/>
                   <h4>硅谷后台</h4>
               </header>
            </Link>
        )
    }
}