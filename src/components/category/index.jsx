import React, { Component } from "react";
import { Card, Button, Icon, Table, message ,Modal} from "antd";
import LinkButton from "../linkbutton";
import { reqCategory } from "../../api";
export default class Category extends Component {
  state = {
    //一级分类数据
    categoryList: [],
    //二级分类数据
    subCategoryList: [],
    //当前需要显示的分类列表的parentId
    parentId: "0",
    //父分类id
    parentName: "",
    loading: false,
    showStatus:0,//默认为0，1表示打开添加的表单，2表示打开修改的表单,0表示不显示
  };
  categoryColumn = () => {
    const { parentId } = this.state;
    console.log(this.parentId);
    this.columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },

      {
        title: "操作",
        // rowObj是当前对象
        render: rowObj => (
          <span>
            <LinkButton onClick={this.updateCategory}>修改分类</LinkButton>
            {/* //如何向回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数并传入数据
             如果onClick={this.showSubCategory(rowObj)会立即调用，而我们需要的是点击时候调用} */}
            {this.parentId === "0" ? (
              <LinkButton
                onClick={() => {
                  this.showSubCategory(rowObj);
                }}
              >
                查看子分类
              </LinkButton>
            ) : null}
            <LinkButton
              onClick={() => {
                this.showSubCategory(rowObj);
              }}
            >
              查看子分类
            </LinkButton>
          </span>
        )
      }
    ];
  };
  getCategoryList = async () => {
    //发送请求前，显示加载框
    this.setState({ loading: true });
    const { parentId } = this.state;
    const result = await reqCategory(parentId);
    this.setState({ loading: false });
    console.log(result);
    if (result.status === 0) {
      //取出分类数组，可能一级可能二级
      const category = result.data;
      if (parentId === "0") {
        //更新一级分类状态
        this.setState({ categoryList: category });
      } else {
        //更新二级分类状态
        this.setState({ subCategoryList: category });
      }
    } else {
      message.error("请求列表数据失败");
    }
  };
  //点击获取二级数据
  showSubCategory = rowObj => {
    console.log("rowObj", rowObj);

    this.setState(
      {
        //在setState之后不能立即获取最新状态，因为setState()是异步更新状态的
        parentId: rowObj._id,
        parentName: rowObj.name
      },
      () => {
        //在状态更新并且重新render()后执行
        this.getCategoryList();
        console.log(this.state.parentId, "()");
      }
    );
    // console.log(this.state.parentId,'()');
    //获取二级分类数据并显示
  };
  //点击一级分类列表渲染数据
  showCategroy=()=>{
    this.setState({
      subCategoryList:[],
      parentId:'0',
      parentName:''
    })
  }
  //点击添加弹出添加表单的框
  addCategory=()=>{
    this.setState({
      showStatus:1
    })
  }
  //点击修改分类弹窗弹出表单
  updateCategory=()=>{
    this.setState({
      showStatus:2
    })
  }
  handleCancel=()=>{
    this.setState({
      showStatus:0
    })
  }
  //点击添加表单确定添加
  addCate =()=>{
    console.log(this)
  }
  //点击修改表单确定修改
  changeCategory=()=>{
    console.log(this)
  }
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
    const {
      categoryList,
      subCategoryList,
      parentId,
      loading,
      parentName,
      showStatus
    } = this.state;
    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategroy}>一级分类列表</LinkButton>
          <Icon type="arrow-right" style={{marginRight:5}}></Icon>
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.addCategory}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    );

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            dataSource={parentId === "0" ? categoryList : subCategoryList}
            columns={columns}
            bordered
            rowKey="_id"
            loading={loading}
          />
          ;
        </Card>
        {/* 添加的表单 */}
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCate}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        {/* 修改的表单 */}
        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.changeCategory}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
