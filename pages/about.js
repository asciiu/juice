import { Row, Col } from 'antd';
import Layout from '../components/layout'

// quotes from https://www.goodreads.com/author/quotes/73092.Meister_Eckhart?page=2
export default () => (
  <Layout>
    <Row>
      <Col span={4}>
        <p>“The most powerful prayer, one well-nigh omnipotent, and the worthiest work of all is the outcome of a quiet mind. The quieter it is the more powerful, the worthier, the deeper, the more telling and more perfect the prayer is. To the quiet mind all things are possible. What is a quiet mind? A quiet mind is one which nothing weighs on, nothing worries, which, free from ties and from all self-seeking, is wholly merged into the will of God and dead to its own.”</p> 
        <p>- Meister Eckhart</p>
      </Col>
    </Row>
  </Layout>
)