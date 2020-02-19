import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  };
  render() {
    const { categoryName } = this.props;
    console.log(categoryName);
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("categoryName", {
            initialValue: categoryName
          })(<Input />)}
        </Form.Item>
      </Form>
    );
  }
}
const wrapUpdateForm = Form.create()(UpdateForm);
export default wrapUpdateForm;
