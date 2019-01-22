import { Button, Layout, Menu, Modal } from 'antd';
import {withRouter} from 'next/router'
import LoginModalle from './forms/login'
import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout;

const headerLink = ({ children, router, href }) => {
  const style = {
    marginRight: 10,
    color: router.pathname === href? 'red' : 'white'
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

const HeaderLink = withRouter(headerLink)

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
    const contentStyle = { padding: '50px' }
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
              <Menu.Item key="index" style={leftMenuStyle}><HeaderLink href="/" passHref>yuice</HeaderLink></Menu.Item>
              <Menu.Item key="bet" style={leftMenuStyle}><HeaderLink href="/bet" passHref>bet</HeaderLink></Menu.Item>
              <Menu.Item key="commandments" style={leftMenuStyle}><HeaderLink href="/commands" passHref>commandments</HeaderLink></Menu.Item>
              <Menu.Item key="signup" style={rightMenuStyle}><HeaderLink href="/signup" passHref>signup</HeaderLink></Menu.Item>
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
            palis ©2019 Created by The Jester  
          </Footer>
        </Layout>
      </span>
    )
  }
}