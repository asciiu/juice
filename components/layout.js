import { Button, Layout, Menu, Modal } from 'antd';
import NavLink from './navLink'
import LoginModalle from './forms/login'
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

  handleLogin = (e) => {
    this.setState({ loading: true });
    setTimeout(() => {
      // close the modal in 3000 ms
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render = () => {
    const { loading, visible } = this.state;
    const rightMenuStyle = {
      float: 'right',
      background: '#001529'
    }
    const leftMenuStyle = {
      float: 'left',
      background: '#001529'
    }
    const menuStyle = { lineHeight: '64px' }
    const contentStyle = { padding: '0 50px' }
    const footerStyle = { textAlign: 'center' } 

    return (
      <span>
        <LoginModalle 
          visible={ visible } 
          loading={ loading }
          onCancel={this.handleCancel}
          onLogin={this.handleLogin}
        />
        <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={menuStyle}
            >
              <Menu.Item key="index" style={leftMenuStyle}><NavLink href="/" passHref>yuice</NavLink></Menu.Item>
              <Menu.Item key="bet" style={leftMenuStyle}><NavLink href="/bet" passHref>bet</NavLink></Menu.Item>
              <Menu.Item key="about" style={leftMenuStyle}><NavLink href="/about" passHref>about</NavLink></Menu.Item>
              <Menu.Item key="signup" style={rightMenuStyle}><NavLink href="/signup" passHref>signup</NavLink></Menu.Item>
              <Menu.Item key="login" style={rightMenuStyle}>
                <Button type="primary" onClick={this.showModal}>
                  login
                </Button>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={contentStyle}>
            {this.props.children}
          </Content>
          <Footer style={footerStyle}>
            yuice ©2019 Created by Axl Codes 
          </Footer>
        </Layout>
      </span>
    )
  }
}