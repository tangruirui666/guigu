import React, { Component } from "react";
import memoryUtils from "../../util/memoryUtils";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Home from "../../components/home";
import Category from "../../components/category";
import Product from "../../components/product";
import User from "../../components/user";
import Role from "../../components/role";
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
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ margin:20,backgroundColor: "#fff" }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/user" component={User}></Route>
              <Route path="/role" component={Role}></Route>
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>推荐使用谷歌浏览器</Footer>
        </Layout>
      </Layout>
    );
  }
}
