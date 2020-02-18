import React, { Component } from "react";
import "./index.less";
import memoryUtils from "../../util/memoryUtils";
import storageUtils from "../../util/storageUtils";
import LinkButton from "../linkbutton";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";
import { formatDate } from "../../util/dataUtils";
import menuList from "../../config/menuConfig";
//左侧导航栏组件
class Header extends Component {
  state = {
    currenttime: formatDate(Date.now())
  };
  logout = () => {
    console.log(this);
    Modal.confirm({
      title: "确认退出吗",
      //   改为箭头函数，用外部的this，否则this为undefined
      onOk: () => {
        //先从local中删除登录者
        storageUtils.removeUser();
        memoryUtils.user = {};
        //跳转到登录页面
        console.log("OK");
        this.props.history.replace("/login");
        console.log(this);
      }
    });
  };
  getTime = () => {
    setInterval(() => {
      const currenttime = formatDate(Date.now());
      this.setState({ currenttime });
    }, 1000);
  };
  getTitle = () => {
    const path = this.props.location.pathname;
    console.log(path);
    let title;
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };
  //第一次render()之后执行，一般执行异步操作
  componentDidMount() {
    this.getTime();
  }

  render() {
    //获取登录者名字
    const username = memoryUtils.user.username;
    const { currenttime } = this.state;
    const title = this.getTitle();
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎{username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currenttime}</span>
            <img
              src="http://api.map.baidu.com/images/weather/night/duoyun.png"
              alt=""
            />
            <span>晴</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
