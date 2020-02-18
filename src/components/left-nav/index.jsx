import React, { Component } from "react";
import "./index.less";
//引入图片的方式
import logo from "./images/logo.png";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;

//左侧导航栏组件
class LeftNav extends Component {
  getMenuNode = menuList => {
    //reduce遍历数组
    return menuList.reduce((pre, item) => {
      const path = this.props.location.pathname;
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        const cItem = item.children.find(citem => {
          return citem.key === path;
        });
        if (cItem) {
          this.openKey = item.key;
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {/* 递归 */}
            {this.getMenuNode(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  }
  // 在第一次render()之前执行一次，为第一个render()准备数据 
  // componentWillMount() {
  //   this.menuNodes= this.getMenuNode(menuList);
  // }
  // map遍历数组
  // getMenuNode = menuList => {
  //   return menuList.map(item => {
  //     if (!item.children) {
  //       return (
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //             <Icon type={item.icon} />
  //             <span>{item.title}</span>
  //           </Link>
  //         </Menu.Item>
  //       );
  //     } else {
  //       return (
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //           {/* 递归 */}
  //           {this.getMenuNode(item.children)}
  //         </SubMenu>
  //       );
  //     }
  //   });
  // };
  render() {
    this.getMenuNode(menuList)
    //获取当前请求的路由路径
    const path = this.props.location.pathname;
    const openKey = this.openKey;
    // console.log(path);
    return (
      <div className="leftnav">
        <Link to="/">
          <header className="leftnav-header">
            <img src={logo} alt="" />
            <h4>硅谷后台</h4>
          </header>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {this.getMenuNode(menuList)}
        </Menu>
      </div>
    );
  }
}
//withRouter为高阶组件，可以将非路由组件LeftNav转化为路由组件。同时赋予其三个属性值。history match location
export default withRouter(LeftNav);
