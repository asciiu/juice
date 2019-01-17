import { Row, Col } from 'antd';
import Layout from '../components/layout'
import SimpleBetForm from '../components/forms/simpleBetForm'

export default () => (
  <Layout>
    <Row>
      <Col span={12} offset={6}>
        <SimpleBetForm />
      </Col>
    </Row>
  </Layout>
)
