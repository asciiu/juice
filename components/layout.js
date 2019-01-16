import { Layout, Menu } from 'antd';
import NavLink from './navLink'

const { Header, Content, Footer } = Layout;

const thing = ({item, key, keyPath}) => {
  console.log(key)
}

const layout = (props) => (
  <nav>
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          onClick={thing}
        >
          <Menu.Item key="index" style={{float: 'left'}}><NavLink href="/" passHref>yuice</NavLink></Menu.Item>
          <Menu.Item key="bet" style={{float: 'left'}}><NavLink href="/bet" passHref>bet</NavLink></Menu.Item>
          <Menu.Item key="about" style={{float: 'left'}}><NavLink href="/about" passHref>about</NavLink></Menu.Item>
          <Menu.Item key="signup" style={{float: 'right'}}><NavLink href="/signup" passHref>signup</NavLink></Menu.Item>
          <Menu.Item key="login" style={{float: 'right'}}><NavLink href="/login" passHref>login</NavLink></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        yuice ©2019 Created by Axl Codes 
      </Footer>
    </Layout>
    <style jsx>{`
      #components-layout-demo-top .logo {
        width: 120px;
        height: 31px;
        background: rgba(255,255,255,.2);
        margin: 16px 24px 16px 0;
        float: left;
      }
    `}</style>
  </nav>
)

export default layout