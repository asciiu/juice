import { Button, Layout, Menu, Modal } from 'antd';
import NavLink from './navLink'
import Login from './forms/login'
import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout;

export default class JuiceLayout extends React.Component{
  state = { 
    loading: false,
    visible: false 
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
    console.log(e);
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render = () => {
    const { loading } = this.state;

    return (
      <span>
        <Modal
            title="Login"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={[
              <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                Login 
              </Button>,
            ]}
          >
            <Login/>
        </Modal>
        <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="index" style={{float: 'left'}}><NavLink href="/" passHref>yuice</NavLink></Menu.Item>
              <Menu.Item key="bet" style={{float: 'left'}}><NavLink href="/bet" passHref>bet</NavLink></Menu.Item>
              <Menu.Item key="about" style={{float: 'left'}}><NavLink href="/about" passHref>about</NavLink></Menu.Item>
              <Menu.Item key="signup" style={{float: 'right'}}><NavLink href="/signup" passHref>signup</NavLink></Menu.Item>
              <Menu.Item key="login" style={{float: 'right', background: '#001529'}}>
                <Button type="primary" onClick={this.showModal}>
                  login
                </Button>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            yuice ©2019 Created by Axl Codes 
          </Footer>
        </Layout>
      </span>
    )
  }
}