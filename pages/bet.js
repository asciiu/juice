import { Row, Col } from 'antd';
import Layout from '../components/layout'
import SimpleBetForm from '../components/forms/simpleBetForm'

export default () => (
  <Layout>
    <Row>
      <Col span={6} >
        <p>This is a staight bet. Your opponent needs to bet the same amount as you.</p> 
        <p>An example of this type of bet would be when you want to bet your friend 
          0.0003 BTC if the Detroit Lions make it to the super bowl this year. There is 
          no time limit as both of you will determine when the bet ends.</p>
      </Col>
      <Col span={12} offset={0}>
        <SimpleBetForm />
      </Col>
    </Row>
  </Layout>
)
