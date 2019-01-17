import { Row, Col } from 'antd';
import Layout from '../components/layout'
import Signup from '../components/forms/signup'

export default () => (
  <Layout>
    <Row>
      <Col span={12} offset={4}>
        <Signup/>
      </Col>
    </Row>
  </Layout>
)