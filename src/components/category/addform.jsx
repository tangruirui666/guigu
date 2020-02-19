import React, { Component } from "react";
import {Form,Input,Select} from 'antd'
const { Option } = Select
 class AddForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form>
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue:"",
          })(
            <Select
            onChange={this.handleSelectChange}
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
             initialValue:"",
          })(
            <Input/>,
          )}
        </Form.Item>
        </Form>
        
        
    )
  }
}
const wrapAddForm= Form.create()(AddForm);
export default wrapAddForm