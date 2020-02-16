import React, { Component } from "react";
import "./login.less";
//注意图片导入方式
import logo from "./images/logo.png";
import { Form, Icon, Input, Button } from "antd";
import { reqLogin } from "../../api";

/*
登录的路由组件
*/
class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        reqLogin(username, password)
          .then(response => {
            console.log("成功了");
          })
          .catch(err => {
            console.log("失败了");
          });
      }
    });
  };
  // 对于密码表单自定义校验规则

  validator = (rule, value, callback) => {
    if (!value) {
      callback("密码不能为空！");
    } else if (value.length < 4) {
      callback("密码长度必须大于4");
    } else if (value.length > 8) {
      callback("密码长度必须小于8");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码必须是英文、数字或下划线组成");
    } else {
      callback();
    }
  };
  render() {
    const form = this.props.form;
    const { getFieldDecorator } = form;
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
              {getFieldDecorator("username", {
                // 声明式验证
                rules: [
                  { required: true, message: "Please input your username!" },
                  { min: 4, message: "最少输入4个字符" },
                  { max: 8, message: "最多输入8个字符" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文、数字或下划线组成"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                //自定义验证
                rules: [{ validator: this.validator }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
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
const WrapLogin = Form.create()(Login);
export default WrapLogin;
