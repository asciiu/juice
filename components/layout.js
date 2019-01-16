import { Button, Layout, Menu, Modal } from 'antd';
import NavLink from './navLink'

const { Header, Content, Footer } = Layout;

export default class JuiceLayout extends React.Component{
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleNav = (item, key, keyPath) => {

  }

  render = () => {
    return (
      <nav>
        <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
        <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
              onClick={this.onNav}
            >
              <Menu.Item key="index" style={{float: 'left'}}><NavLink href="/" passHref>yuice</NavLink></Menu.Item>
              <Menu.Item key="bet" style={{float: 'left'}}><NavLink href="/bet" passHref>bet</NavLink></Menu.Item>
              <Menu.Item key="about" style={{float: 'left'}}><NavLink href="/about" passHref>about</NavLink></Menu.Item>
              <Menu.Item key="signup" style={{float: 'right'}}><NavLink href="/signup" passHref>signup</NavLink></Menu.Item>
              <Menu.Item key="login" style={{float: 'right'}}> 
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
        <style jsx>{`
          .ant-menu-item-selected {
            background: #001529;
          }
        `}</style>
      </nav>
    )
  }
}