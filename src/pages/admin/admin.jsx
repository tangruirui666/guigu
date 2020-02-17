import React, { Component } from "react";
import memoryUtils from "../../util/memoryUtils";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
const { Footer, Sider, Content } = Layout;
/*
管理的路由组件
*/
export default class Admin extends Component {
  render() {
    //获取memoryUtils中的user
    const user = memoryUtils.user;
    //!user表示未登录，所以为空
    if (!user) {
      //在render中跳转是使用Redirect组件
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{height:'100%'}}>
        <Sider><LeftNav/></Sider>
        <Layout>
          <Header></Header>
          <Content style={{backgroundColor:'#fff'}}>Content</Content>
          <Footer style={{textAlign:'center'}}>推荐使用谷歌浏览器</Footer>
        </Layout>
      </Layout>
    );
  }
}
