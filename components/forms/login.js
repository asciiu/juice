import { Button, Form, Icon, Input, Checkbox, Modal } from 'antd';
import Link from '../link'

class LoginForm extends React.Component {
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.reset()
        this.props.onLogin(e)
      } 
    });
  }

  reset = () => {
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <div><Checkbox>Remember me</Checkbox></div>
          )}
          <a className="login-form-forgot" href="/forgot">Forgot password</a>
          <span> or </span><Link href="/signup" passHref>register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}
  
const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default class LoginModalle extends React.Component {

  handleLogin = (e) => {
    this.loginForm.handleSubmit(e)
  }

  handleCancel = (e) => {
    this.loginForm.reset()
    this.props.onCancel(e)
  }
  
  render() {
    const { loading, onLogin, visible } = this.props;
    return (
        <Modal
          title="Login"
          visible={visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="login" type="primary" loading={loading} onClick={this.handleLogin}>
              Login 
            </Button>
          ]}
        >
          <WrappedLoginForm 
            onRef={ref => (this.loginForm = ref)} 
            onLogin={onLogin} 
          />
        </Modal>
    )
  }
}
  