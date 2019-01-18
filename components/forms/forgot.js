import { Button, Form, Icon, Input } from 'antd';

class ForgotForm extends React.Component {
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
      <span>
      <p>Send a reset password link to your registered email.</p>
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your registered email!' }],
          })(
            <Input prefix={<Icon type="mail" style={hintStyle} />} placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      </span>
    );
  }
}
  
const WrappedForgotForm = Form.create({ name: 'forget_email' })(ForgotForm);
export default WrappedForgotForm