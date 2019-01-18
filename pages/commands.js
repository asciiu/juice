import { Row, Col, Carousel } from 'antd';
import Layout from '../components/layout'
import "./commands.less"

function onChange(a, b, c) {
  console.log(a, b, c);
}

const hintStyle = { color: 'rgba(0,0,0,.3)' }

// quotes from https://www.goodreads.com/author/quotes/73092.Meister_Eckhart?page=2
export default () => (
  <span>
  <Layout>
    <Row>
      <Col span={4} offset={2} style={hintStyle}>
        <p>“If the only prayer you said was thank you, that would be enough.”</p> 
        <p>- Meister Eckhart</p>
      </Col>
      <Col span={12} offset={2}>
        <Carousel>
          <div>
            <h1>1st Commandment</h1>
            <p>Be good to each other. Respect one another. There is virtue in humility. 
            Thrive to show good sportsmanship at all times no matter the 
            circustances. Don't be a sore looser.</p> 
            <p>Your profile score will be determined by your other community members. 
            People will be rewarded on basis of good behavior.</p>
          </div>
          <div>
            <h1>2nd Commandment</h1>
            <p>Bet responsibly. Don't bet more than you can looose.</p>
          </div>
        </Carousel>
      </Col>
    </Row>
  </Layout>
  </span>
)