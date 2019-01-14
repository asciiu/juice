import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import React from 'react';
import Layout from '../components/layout'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Item
        label="Title"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Wager"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 12, offset: 5 }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    );
  }
}

export default () => (
  <Layout>
    <RegistrationForm/>
  </Layout>
)
