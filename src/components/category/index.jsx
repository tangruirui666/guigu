import React, { Component } from "react";
import { Card, Button, Icon, Table, message } from "antd";
import LinkButton from "../linkbutton";
import { reqCategory } from "../../api";
export default class Category extends Component {
  state = {
    categoryList: []
  };
  categoryColumn = () => {
    this.columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },

      {
        title: "操作",
        render: () => (
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        )
      }
    ];
  };
  getCategoryList = async () => {
    const result = await reqCategory("0");
    console.log(result);
    if (result.status === 0) {
      const categoryList = result.data;
      this.setState({categoryList})
    } else {
      message.error("请求列表数据失败");
    }
  };
  //为第一次render()准备数据
  componentWillMount() {
    this.categoryColumn();
  }
  //异步请求数据
  componentDidMount() {
    this.getCategoryList();
  }
  render() {
    const columns = this.columns;
    const { categoryList } = this.state;
    const title = "一级分类列表";
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    );

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table dataSource={categoryList} columns={columns} bordered />;
        </Card>
      </div>
    );
  }
}
