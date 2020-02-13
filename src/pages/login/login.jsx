import React, { Component } from "react";
import "./login.less";
//注意图片导入方式
import logo from "./images/logo.png";
import { Form, Icon, Input, Button } from "antd";
/*
登录的路由组件
*/
export default class Login extends Component {
  handleSubmit = () => {};
  render() {
    return (
      <div className="login">
        <header className="login_header">
          <img src={logo} alt="logo" />
          <h2>React项目：后台管理系统</h2>
        </header>
        <section className="login_contain">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
