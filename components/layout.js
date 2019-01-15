import Nav from './nav'
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const layout = (props) => (
  <span>
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1" style={{float: 'left'}}>yuice</Menu.Item>
          <Menu.Item key="2" style={{float: 'left'}}>bet</Menu.Item>
          <Menu.Item key="3" style={{float: 'left'}}>about</Menu.Item>
          <Menu.Item key="4" style={{float: 'right'}}>login</Menu.Item>
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
      }`}
    </style>
  </span>
)

export default layout