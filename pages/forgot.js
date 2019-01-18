import { Row, Col } from 'antd';
import Layout from '../components/layout'
import Forgot from '../components/forms/forgot'

export default () => (
  <Layout>
    <Row>
      <Col span={8} offset={8}>
        <Forgot/>
      </Col>
    </Row>
  </Layout>
)