import { Button, Form, Icon, Input, Checkbox, Modal } from 'antd';
import {withRouter} from 'next/router'

const link = ({ children, router, href, onCancel }) => {
  const handleClick = (e) => {
    e.preventDefault()
    // perhaps this should be done in the LoginForm somehow?
    // close the login modal if forgot was pressed and path is already /forgot
    if (href === "/forgot" && router.pathname === "/forgot") {
      onCancel()
    } else {
      router.push(href)
    }
  }

  return (
    <a href={href} onClick={handleClick} >
      {children}
    </a>
  )
}
  
const Link = withRouter(link)

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
    const hintStyle = { color: 'rgba(0,0,0,.25)' }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="mail" style={hintStyle} />} placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input prefix={<Icon type="lock" style={hintStyle} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <div><Checkbox>Remember me</Checkbox></div>
          )}
          <Link href="/forgot" passHref onCancel={this.props.onCancel}>Forgot password</Link>
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
    const { loading, onLogin, visible } = this.props

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
            onCancel={this.handleCancel}
          />
        </Modal>
    )
  }
}
  